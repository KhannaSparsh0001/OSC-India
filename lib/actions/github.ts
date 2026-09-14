"use server";

import { createAdminClient } from "@/lib/supabase/admin";
import { getDbAllowedRepoSlugs, discoverProjectsByTopic } from "@/lib/actions/projects";
import { revalidatePath } from "next/cache";
import {
  normalizeGitHubHandle,
  detectDifficulty,
  extractLinkedIssueNumbers,
  extractRepoSlug,
  DIFFICULTY_POINTS,
  DIFFICULTY_RANK,
  MERGER_POINTS,
  DifficultyLevel,
  getGitHubAuthHeaders,
} from "@/lib/utils/github-helpers";

interface GitHubIssueItem {
  id?: number;
  number: number;
  title: string;
  body?: string | null;
  html_url: string;
  repository_url?: string;
  labels?: Array<{ name: string }>;
  pull_request?: { url?: string; html_url?: string };
  closed_at?: string;
  created_at?: string;
}

/**
 * Core GitHub Sync Engine Implementation.
 * Queries GitHub Search API for merged PRs authored by the user,
 * filters against the projects in the Supabase database, computes points based on difficulty,
 * and updates public.profiles and auth user_metadata.
 */
export async function syncGitHubContribution(
  userId: string,
  rawHandle: string,
  preFetchedAllowedSlugs?: Set<string>
) {
  const admin = createAdminClient();

  // 1. Normalize handle
  const handle = normalizeGitHubHandle(rawHandle);
  if (!handle) {
    return { success: false, error: "Invalid GitHub username provided." };
  }

  // 2. Check Role & Admin status safely
  let userRole = "contributor";
  let isAdmin = false;

  const { data: userProfile } = await admin
    .from("profiles")
    .select("id, user_id, role, github")
    .eq("user_id", userId)
    .maybeSingle();

  if (userProfile?.role) {
    userRole = userProfile.role;
    isAdmin = userRole === "admin";
  } else {
    const { data: byId } = await admin
      .from("profiles")
      .select("id, user_id, role, github")
      .eq("id", userId)
      .maybeSingle();
    if (byId?.role) {
      userRole = byId.role;
      isAdmin = userRole === "admin";
    } else {
      try {
        const { data: authUser } = await admin.auth.admin.getUserById(userId);
        if (authUser?.user?.user_metadata) {
          userRole = authUser.user.user_metadata.role || "contributor";
          isAdmin = Boolean(authUser.user.user_metadata.is_admin || userRole === "admin");
        }
      } catch {
        // fallback
      }
    }
  }

  // Super admins and mentors do not participate in leaderboard scoring
  if (userRole === "admin" || userRole === "mentor" || isAdmin) {
    return {
      success: true,
      skipped: true,
      role: userRole,
      message: `User is ${userRole}, skipping GitHub contribution scoring.`,
      score: 0,
      merged_prs: 0,
      projects_count: 0,
    };
  }

  // 3. Extract Allowed Repositories strictly from the database (public.projects table)
  const allowedSlugs = preFetchedAllowedSlugs || (await getDbAllowedRepoSlugs());

  // 4. Setup GitHub API headers with OAuth fallback for 5,000 req/hr
  const headers = getGitHubAuthHeaders();

  // Special branch: If user is project-admin, award points for all merged OSCI'26 PRs in their project repo(s)
  if (userRole === "project-admin") {
    try {
      const lowerHandle = handle.toLowerCase();
      // Identify repositories owned/managed by this project admin
      const adminRepoSlugs = Array.from(allowedSlugs).filter((slug) =>
        slug.split("/")[0].toLowerCase() === lowerHandle
      );

      // If no direct repo owner match, include all allowed repos to check for PRs merged by this admin
      const targetRepos = adminRepoSlugs.length > 0 ? adminRepoSlugs : Array.from(allowedSlugs);

      const validMergePRs: Array<{
        repoSlug: string;
        prNumber: number;
        difficulty: DifficultyLevel;
        points: number;
        htmlUrl: string;
        mergedAt: string;
      }> = [];
      const seenPrKeys = new Set<string>();
      const linkedIssuesCache = new Map<string, GitHubIssueItem | null>();

      for (const repoSlug of targetRepos) {
        const isOwner = repoSlug.split("/")[0].toLowerCase() === lowerHandle;
        let page = 1;
        while (page <= 5) {
          const url = `https://api.github.com/repos/${repoSlug}/pulls?state=closed&per_page=100&page=${page}&sort=updated&direction=desc`;
          const res = await fetch(url, { headers, next: { revalidate: 0 } });
          if (!res.ok) break;

          const pulls = await res.json();
          if (!Array.isArray(pulls) || pulls.length === 0) break;

          for (const pr of pulls) {
            if (!pr.merged_at) continue;

            const hasOsciLabel =
              Array.isArray(pr.labels) &&
              pr.labels.some((l: { name: string }) => l.name.toLowerCase() === "osci'26");
            if (!hasOsciLabel) continue;

            const rawMerger = (pr.merged_by?.login || "").toLowerCase();
            const isMergedByThisAdmin = rawMerger === lowerHandle;

            // Project admin gets points if they own the repo OR if they merged the PR
            if (isOwner || isMergedByThisAdmin) {
              const key = `${repoSlug}#${pr.number}`;
              if (!seenPrKeys.has(key)) {
                seenPrKeys.add(key);

                // Detect difficulty (Easy: 10, Medium: 20, Hard: 30, Expert: 50)
                let prDifficulty = detectDifficulty({
                  title: pr.title,
                  body: pr.body,
                  labels: pr.labels,
                });

                // Check linked issues for higher difficulty inheritance
                const linkedNumbers = extractLinkedIssueNumbers(`${pr.title} ${pr.body || ""}`);
                for (const num of linkedNumbers) {
                  const cacheKey = `${repoSlug}#${num}`;
                  const cached = linkedIssuesCache.get(cacheKey);
                  let linkedIssue: GitHubIssueItem | null = cached ?? null;

                  if (cached === undefined) {
                    try {
                      const issueRes = await fetch(
                        `https://api.github.com/repos/${repoSlug}/issues/${num}`,
                        { headers, next: { revalidate: 0 } }
                      );
                      if (issueRes.ok) {
                        linkedIssue = await issueRes.json();
                        linkedIssuesCache.set(cacheKey, linkedIssue);
                      } else {
                        linkedIssuesCache.set(cacheKey, null);
                      }
                    } catch {
                      linkedIssuesCache.set(cacheKey, null);
                    }
                  }

                  if (linkedIssue) {
                    const issueDifficulty = detectDifficulty(linkedIssue);
                    if (DIFFICULTY_RANK[issueDifficulty] > DIFFICULTY_RANK[prDifficulty]) {
                      prDifficulty = issueDifficulty;
                    }
                  }
                }

                const points = DIFFICULTY_POINTS[prDifficulty];
                validMergePRs.push({
                  repoSlug,
                  prNumber: pr.number,
                  difficulty: prDifficulty,
                  points,
                  htmlUrl: pr.html_url,
                  mergedAt: pr.merged_at || pr.closed_at || new Date().toISOString(),
                });
              }
            }
          }

          if (pulls.length < 100) break;
          page++;
        }
      }

      const mergerScore = validMergePRs.reduce((sum, p) => sum + p.points, 0);
      const contributedRepos = new Set(validMergePRs.map((p) => p.repoSlug));

      // Fetch projects to map repoSlug -> project_id
      const { data: dbProjects } = await admin.from("projects").select("id, github_repo_url");
      const projectMap = new Map<string, string>();
      for (const p of dbProjects || []) {
        const slug = p.github_repo_url.replace(/^https?:\/\/github\.com\//i, "").replace(/\/+$/, "").toLowerCase();
        projectMap.set(slug, p.id);
      }

      const contributionsToUpsert = [];
      for (const pr of validMergePRs) {
        const projectId = projectMap.get(pr.repoSlug);
        if (projectId) {
          contributionsToUpsert.push({
            user_id: userId,
            project_id: projectId,
            type: "pr_merge",
            github_url: `merged:${pr.htmlUrl}`,
            status: "merged",
            points_awarded: pr.points,
            contributed_at: pr.mergedAt,
          });
        }
      }

      if (contributionsToUpsert.length > 0) {
        await admin.from("contributions").upsert(contributionsToUpsert, { onConflict: "github_url" });
      }

      await admin.from("leaderboard_stats").upsert(
        {
          user_id: userId,
          total_points: mergerScore,
          current_streak: 1,
          updated_at: new Date().toISOString(),
        },
        { onConflict: "user_id" }
      );

      // Update auth user metadata
      try {
        const { data: userData } = await admin.auth.admin.getUserById(userId);
        if (userData?.user) {
          await admin.auth.admin.updateUserById(userId, {
            user_metadata: {
              ...userData.user.user_metadata,
              github: handle,
              score: mergerScore,
              merged_prs: 0,
              projects_count: contributedRepos.size,
            },
          });
        }
      } catch {}

      // Update profiles table
      try {
        const updateCol = userProfile?.user_id ? "user_id" : "id";
        await admin
          .from("profiles")
          .update({
            github: handle,
            score: mergerScore,
            merged_prs: 0,
            projects_count: contributedRepos.size,
          })
          .eq(updateCol, userId);
      } catch {}

      return {
        success: true,
        handle,
        role: "project-admin",
        score: mergerScore,
        merged_prs: 0,
        projects_count: contributedRepos.size,
        merged_pr_count: validMergePRs.length,
      };
    } catch (adminErr: unknown) {
      console.error("Project Admin sync error:", adminErr);
      return { success: false, error: adminErr instanceof Error ? adminErr.message : "Unknown error during project-admin sync." };
    }
  }

  try {
    // 5. Fetch ALL Merged PRs targeted strictly to the 17 competition projects.
    // GitHub Search API has a URL length limit that silently truncates queries with many repos.
    // To avoid this, split repos into groups of 5 and merge deduplicated results.
    const slugArray = Array.from(allowedSlugs);
    const repoGroups: string[][] = [];
    for (let i = 0; i < slugArray.length; i += 5) {
      repoGroups.push(slugArray.slice(i, i + 5));
    }

    const prItems: GitHubIssueItem[] = [];
    const seenPrIds = new Set<number | string>();

    for (const group of repoGroups) {
      const repoFilter = group.map((s) => `repo:${s}`).join(" ");
      let page = 1;

      while (page <= 10) {
        // Include label:"OSCI'26" to match only official competition PRs
        const prQuery = encodeURIComponent(
          `author:${handle} type:pr is:merged label:"OSCI'26" ${repoFilter}`
        );
        const prResponse = await fetch(
          `https://api.github.com/search/issues?q=${prQuery}&per_page=100&page=${page}`,
          {
            headers,
            next: { revalidate: 0 },
          }
        );

        if (!prResponse.ok) {
          if (prResponse.status === 403 || prResponse.status === 429) {
            const resetTime = prResponse.headers.get("x-ratelimit-reset");
            console.warn(`GitHub Search API rate limit reached during sync for @${handle}. Status: ${prResponse.status}`);
            return {
              success: false,
              rateLimited: true,
              error: "GitHub Search API rate limit exceeded.",
              resetTime: resetTime ? Number(resetTime) : undefined,
            };
          }
          const errText = await prResponse.text();
          console.error(`GitHub PR search error for @${handle} (group ${group.join(",")}):`, errText);
          break; // skip this group on error, continue with next
        }

        const prData = await prResponse.json();
        const items: GitHubIssueItem[] = prData.items || [];

        for (const item of items) {
          const uniqueKey = item.id || `${item.number}-${item.html_url}`;
          if (!seenPrIds.has(uniqueKey)) {
            seenPrIds.add(uniqueKey);
            prItems.push(item);
          }
        }

        // If page had fewer than 100 items, done with this group
        if (items.length < 100) {
          break;
        }

        page++;
      }
    }

    // 6. Filter: Only keep PRs matching the allowed projects in the database
    const validPRs: Array<{
      item: GitHubIssueItem;
      repoSlug: string;
      difficulty: DifficultyLevel;
      points: number;
    }> = [];

    const contributedRepos = new Set<string>();
    const linkedIssuesCache = new Map<string, GitHubIssueItem | null>();

    for (const pr of prItems) {
      let repoSlug = "";
      if (pr.repository_url) {
        repoSlug = pr.repository_url
          .replace(/^https?:\/\/api\.github\.com\/repos\//i, "")
          .replace(/\/+$/, "")
          .toLowerCase();
      }
      if (!repoSlug && pr.html_url) {
        repoSlug = extractRepoSlug(pr.html_url) || "";
      }

      // Only accept PRs on projects that exist in the database
      if (!repoSlug || !allowedSlugs.has(repoSlug)) {
        continue;
      }

      // Base difficulty from PR labels/title/body
      let prDifficulty = detectDifficulty(pr);

      // 7. Linked Issue Inheritance via REST API (uses core 5,000 req/hr rate limit)
      const linkedNumbers = extractLinkedIssueNumbers(`${pr.title} ${pr.body || ""}`);
      for (const num of linkedNumbers) {
        const cacheKey = `${repoSlug}#${num}`;
        const cached = linkedIssuesCache.get(cacheKey);
        let linkedIssue: GitHubIssueItem | null = cached ?? null;

        if (cached === undefined) {
          try {
            const issueRes = await fetch(
              `https://api.github.com/repos/${repoSlug}/issues/${num}`,
              { headers, next: { revalidate: 0 } }
            );
            if (issueRes.ok) {
              linkedIssue = await issueRes.json();
              linkedIssuesCache.set(cacheKey, linkedIssue);
            } else {
              linkedIssuesCache.set(cacheKey, null);
            }
          } catch {
            linkedIssuesCache.set(cacheKey, null);
          }
        }

        if (linkedIssue) {
          const issueDifficulty = detectDifficulty(linkedIssue);
          if (DIFFICULTY_RANK[issueDifficulty] > DIFFICULTY_RANK[prDifficulty]) {
            prDifficulty = issueDifficulty; // Inherit higher difficulty
          }
        }
      }

      contributedRepos.add(repoSlug);
      validPRs.push({
        item: pr,
        repoSlug,
        difficulty: prDifficulty,
        points: DIFFICULTY_POINTS[prDifficulty],
      });
    }

    // 8. Compute Score: sum of points for all valid merged PRs
    let totalScore = 0;
    for (const pr of validPRs) {
      totalScore += pr.points;
    }

    const mergedPrsCount = validPRs.length;
    const projectsCount = contributedRepos.size;

    // 8.5. Upsert individual PRs into public.contributions & update public.leaderboard_stats
    try {
      const { data: dbProjects } = await admin.from("projects").select("id, github_repo_url");
      const projectMap = new Map<string, string>();
      for (const p of dbProjects || []) {
        const slug = p.github_repo_url.replace(/^https?:\/\/github\.com\//i, "").replace(/\/+$/, "").toLowerCase();
        projectMap.set(slug, p.id);
      }

      interface ContributionUpsertRow {
        user_id: string;
        project_id: string;
        type: string;
        github_url: string;
        status: string;
        points_awarded: number;
        contributed_at: string;
      }

      const contributionsToUpsert: ContributionUpsertRow[] = [];
      for (const pr of validPRs) {
        const projectId = projectMap.get(pr.repoSlug);
        if (projectId) {
          contributionsToUpsert.push({
            user_id: userId,
            project_id: projectId,
            type: "pr",
            github_url: pr.item.html_url,
            status: "merged",
            points_awarded: pr.points,
            contributed_at: pr.item.closed_at || pr.item.created_at || new Date().toISOString(),
          });
        }
      }

      if (contributionsToUpsert.length > 0) {
        await admin.from("contributions").upsert(contributionsToUpsert, { onConflict: "github_url" });
      }

      await admin.from("leaderboard_stats").upsert(
        {
          user_id: userId,
          total_points: totalScore,
          current_streak: 1,
          updated_at: new Date().toISOString(),
        },
        { onConflict: "user_id" }
      );
    } catch (contribErr: unknown) {
      console.warn("Notice: saving contributions in syncGitHubContribution:", contribErr instanceof Error ? contribErr.message : "Unknown error");
    }

    // 9. Update Supabase Auth user_metadata (unconditional resilience)
    try {
      const { data: userData } = await admin.auth.admin.getUserById(userId);
      if (userData?.user) {
        await admin.auth.admin.updateUserById(userId, {
          user_metadata: {
            ...userData.user.user_metadata,
            github: handle,
            score: totalScore,
            merged_prs: mergedPrsCount,
            projects_count: projectsCount,
          },
        });
      }
    } catch (authErr) {
      console.warn("Notice: saving synced metrics to auth metadata:", authErr);
    }

    // 10. Update Supabase profiles table for this exact user
    try {
      await admin
        .from("profiles")
        .update({
          github: handle,
          score: totalScore,
          merged_prs: mergedPrsCount,
          projects_count: projectsCount,
        })
        .or(`id.eq.${userId},user_id.eq.${userId}`);
    } catch (dbErr) {
      console.warn("Notice: profile update after GitHub sync:", dbErr);
    }

    return {
      success: true,
      handle,
      score: totalScore,
      merged_prs: mergedPrsCount,
      projects_count: projectsCount,
      breakdown: {
        easy: validPRs.filter((p) => p.difficulty === "easy").length,
        medium: validPRs.filter((p) => p.difficulty === "medium").length,
        hard: validPRs.filter((p) => p.difficulty === "hard").length,
        expert: validPRs.filter((p) => p.difficulty === "expert").length,
      },
    };
  } catch (err: unknown) {
    console.error("GitHub Sync Engine Exception:", err);
    return { success: false, error: err instanceof Error ? err.message : "Unknown error during sync." };
  }
}

/**
 * Fast, repo-centric full sync engine for the 5-hour cron job loop.
 * Rather than making 608 individual Search API queries (which exceeds the 30 req/min limit),
 * this queries closed pull requests directly across the official tracked repositories
 * using the core GitHub REST API (5,000 req/hr rate limit).
 * 
 * Aggregates merged PRs for all contributors across all competition projects in seconds,
 * computes difficulty points and repo counts, and updates all 608 profiles in public.profiles.
 */
export async function syncAllProjectsAndContributors() {
  const admin = createAdminClient();
  const startTime = Date.now();

  // 0. Dynamically discover competition projects tagged with 'osci-2026' via GitHub Topics
  try {
    await discoverProjectsByTopic("osci-2026");
  } catch (discErr) {
    console.warn("Notice: GitHub topic project discovery in sync sweep:", discErr);
  }

  // 1. Fetch allowed projects strictly from database (guaranteed 17 competition repos + discovered repos)
  const allowedSlugs = await getDbAllowedRepoSlugs();
  if (allowedSlugs.size === 0) {
    return { success: false, error: "No tracked projects found in database." };
  }

  // 2. Setup GitHub API headers with OAuth fallback for 5,000 req/hr
  const headers = getGitHubAuthHeaders();

  // 3. Fetch all contributors from auth.users (primary source of truth in production)
  interface SyncAuthUser {
    id: string;
    email?: string;
    user_metadata?: {
      github?: string;
      user_name?: string;
      preferred_username?: string;
      score?: number;
      merged_prs?: number;
      projects_count?: number;
      role?: string;
      is_admin?: boolean;
    };
    identities?: Array<{
      provider?: string;
      identity_data?: {
        user_name?: string;
        preferred_username?: string;
      };
    }>;
  }

  const authUsers: SyncAuthUser[] = [];
  try {
    let page = 1;
    while (true) {
      const { data: pageData, error: authErr } = await admin.auth.admin.listUsers({
        page,
        perPage: 1000,
      });
      if (authErr || !pageData?.users || pageData.users.length === 0) break;
      authUsers.push(...(pageData.users as unknown as SyncAuthUser[]));
      if (pageData.users.length < 1000) break;
      page++;
    }
  } catch (err: unknown) {
    console.warn("Notice: reading auth.users during sync:", err instanceof Error ? err.message : "Unknown error");
  }

  // Pre-load projects to map repo slug -> project_id
  const { data: dbProjects } = await admin.from("projects").select("id, github_repo_url");
  const projectMap = new Map<string, string>();
  for (const p of dbProjects || []) {
    const slug = p.github_repo_url.replace(/^https?:\/\/github\.com\//i, "").replace(/\/+$/, "").toLowerCase();
    projectMap.set(slug, p.id);
  }

  // Pre-load profiles to get exact roles and github handles from DB
  const { data: dbProfiles } = await admin
    .from("profiles")
    .select("id, user_id, role, github, is_admin, email");
  const profileMap = new Map<string, { id: string; user_id?: string; role?: string; github?: string; is_admin?: boolean; email?: string }>();
  for (const prof of dbProfiles || []) {
    if (prof.user_id) profileMap.set(prof.user_id, prof);
    if (prof.id) profileMap.set(prof.id, prof);
  }

  // Map: normalized lowercase github handle -> array of valid merged PR items
  const contributorPrMap = new Map<
    string,
    Array<{
      repoSlug: string;
      prNumber: number;
      difficulty: DifficultyLevel;
      points: number;
      htmlUrl: string;
      mergedAt: string;
    }>
  >();

  // Map: normalized github handle -> PRs merged by this person (for project-admin points)
  const mergerMap = new Map<
    string,
    Array<{ repoSlug: string; prNumber: number; difficulty: DifficultyLevel; points: number; htmlUrl: string; mergedAt: string }>
  >();

  // Map: repoSlug -> all merged PRs with OSCI'26 label in this repo
  const repoPrMap = new Map<
    string,
    Array<{ repoSlug: string; prNumber: number; difficulty: DifficultyLevel; points: number; htmlUrl: string; mergedAt: string }>
  >();

  const linkedIssuesCache = new Map<string, GitHubIssueItem | null>();
  let totalPrsFetched = 0;
  let totalMergedPrsFound = 0;

  function registerPr(
    rawAuthor: string,
    repoSlug: string,
    prNumber: number,
    diff: DifficultyLevel,
    htmlUrl: string,
    mergedAt: string
  ) {
    const authorHandle = normalizeGitHubHandle(rawAuthor || "").toLowerCase();
    if (!authorHandle || authorHandle.includes("[bot]")) return;

    const prPoints = DIFFICULTY_POINTS[diff];

    if (!contributorPrMap.has(authorHandle)) {
      contributorPrMap.set(authorHandle, []);
    }
    const list = contributorPrMap.get(authorHandle)!;
    if (!list.some((p) => p.repoSlug === repoSlug && p.prNumber === prNumber)) {
      totalMergedPrsFound++;
      list.push({
        repoSlug,
        prNumber,
        difficulty: diff,
        points: prPoints,
        htmlUrl,
        mergedAt,
      });
    }

    if (!repoPrMap.has(repoSlug)) {
      repoPrMap.set(repoSlug, []);
    }
    const rList = repoPrMap.get(repoSlug)!;
    if (!rList.some((p) => p.prNumber === prNumber)) {
      rList.push({
        repoSlug,
        prNumber,
        difficulty: diff,
        points: prPoints,
        htmlUrl,
        mergedAt,
      });
    }
  }

  function registerMerge(
    rawMerger: string,
    repoSlug: string,
    prNumber: number,
    diff: DifficultyLevel,
    htmlUrl: string,
    mergedAt: string
  ) {
    const mergerHandle = normalizeGitHubHandle(rawMerger || "").toLowerCase();
    if (!mergerHandle || mergerHandle.includes("[bot]")) return;

    const prPoints = DIFFICULTY_POINTS[diff];

    if (!mergerMap.has(mergerHandle)) {
      mergerMap.set(mergerHandle, []);
    }
    const list = mergerMap.get(mergerHandle)!;
    if (!list.some((m) => m.repoSlug === repoSlug && m.prNumber === prNumber)) {
      list.push({
        repoSlug,
        prNumber,
        difficulty: diff,
        points: prPoints,
        htmlUrl,
        mergedAt,
      });
    }
  }

  // 4. Primary Pass: Fast repo-centric sweep of all 17 competition projects via REST API
  for (const repoSlug of Array.from(allowedSlugs)) {
    try {
      const maxPages = repoSlug === "kanishjebamathewm/truxify" ? 10 : 5;
      let page = 1;
      while (page <= maxPages) {
        const url = `https://api.github.com/repos/${repoSlug}/pulls?state=closed&per_page=100&page=${page}&sort=updated&direction=desc`;
        const res = await fetch(url, { headers, next: { revalidate: 0 } });

        if (!res.ok) {
          if (res.status === 403 || res.status === 429) {
            console.warn(`Rate limit reached on ${repoSlug}: status ${res.status}`);
          }
          break;
        }

        const pulls = await res.json();
        if (!Array.isArray(pulls) || pulls.length === 0) {
          break;
        }

        totalPrsFetched += pulls.length;

        for (const pr of pulls) {
          if (!pr.merged_at) continue;
          const rawAuthor = pr.user?.login;
          if (!rawAuthor) continue;

          // Only count PRs that carry the official competition label OSCI'26 / OSCI26
          const hasOsciLabel = Array.isArray(pr.labels) &&
            pr.labels.some((l: { name: string }) => /osci[- ']?26|osci[- ']?2026/i.test(l.name));
          if (!hasOsciLabel) continue;

          // Detect difficulty from labels, titles & body
          let prDifficulty = detectDifficulty({
            title: pr.title,
            body: pr.body,
            labels: pr.labels,
          });

          // Check linked issues
          const linkedNumbers = extractLinkedIssueNumbers(`${pr.title} ${pr.body || ""}`);
          for (const num of linkedNumbers) {
            const cacheKey = `${repoSlug}#${num}`;
            const cached = linkedIssuesCache.get(cacheKey);
            let linkedIssue: GitHubIssueItem | null = cached ?? null;

            if (cached === undefined) {
              try {
                const issueRes = await fetch(
                  `https://api.github.com/repos/${repoSlug}/issues/${num}`,
                  { headers, next: { revalidate: 0 } }
                );
                if (issueRes.ok) {
                  linkedIssue = await issueRes.json();
                  linkedIssuesCache.set(cacheKey, linkedIssue);
                } else {
                  linkedIssuesCache.set(cacheKey, null);
                }
              } catch {
                linkedIssuesCache.set(cacheKey, null);
              }
            }

            if (linkedIssue) {
              const issueDifficulty = detectDifficulty(linkedIssue);
              if (DIFFICULTY_RANK[issueDifficulty] > DIFFICULTY_RANK[prDifficulty]) {
                prDifficulty = issueDifficulty;
              }
            }
          }

          // Fetch PR additions + deletions if available to refine difficulty by code changes
          let additions = (pr as { additions?: number }).additions;
          let deletions = (pr as { deletions?: number }).deletions;
          if (additions === undefined || deletions === undefined) {
            try {
              const detailRes = await fetch(`https://api.github.com/repos/${repoSlug}/pulls/${pr.number}`, { headers, next: { revalidate: 0 } });
              if (detailRes.ok) {
                const detail = await detailRes.json();
                additions = detail.additions || 0;
                deletions = detail.deletions || 0;
              }
            } catch {
              additions = 0;
              deletions = 0;
            }
          }

          const totalLines = (additions || 0) + (deletions || 0);
          let diffBasedDifficulty: DifficultyLevel = "easy";
          if (totalLines >= 800) diffBasedDifficulty = "expert";
          else if (totalLines >= 250) diffBasedDifficulty = "hard";
          else if (totalLines >= 50) diffBasedDifficulty = "medium";

          if (DIFFICULTY_RANK[diffBasedDifficulty] > DIFFICULTY_RANK[prDifficulty]) {
            prDifficulty = diffBasedDifficulty;
          }

          const prMergedAt = pr.merged_at || pr.closed_at || new Date().toISOString();
          registerPr(rawAuthor, repoSlug, pr.number, prDifficulty, pr.html_url, prMergedAt);

          // Track who merged this PR — project-admins earn difficulty points per PR they merge
          const rawMerger = pr.merged_by?.login;
          if (rawMerger && rawMerger.toLowerCase() !== rawAuthor.toLowerCase()) {
            registerMerge(rawMerger, repoSlug, pr.number, prDifficulty, pr.html_url, prMergedAt);
          }
        }

        if (pulls.length < 100) break;
        page++;
      }
    } catch (repoErr: unknown) {
      console.error(`Error fetching PRs for repo ${repoSlug}:`, repoErr instanceof Error ? repoErr.message : "Unknown error");
    }
  }

  let updatedCount = 0;
  const nowIso = new Date().toISOString();
  const adminEmail = (process.env.ADMIN_PORTAL_EMAIL || "sayanghosh1887@gmail.com").toLowerCase();

  interface ContribRow {
    user_id: string;
    project_id: string;
    type: string;
    github_url: string;
    status: string;
    points_awarded: number;
    contributed_at: string;
  }

  interface LeaderboardStatRow {
    user_id: string;
    total_points: number;
    current_streak: number;
    updated_at: string;
  }

  interface ProfileUpsertRow {
    id: string;
    user_id: string;
    github: string | null;
    score: number;
    merged_prs: number;
    projects_count: number;
  }

  const allContribRows: ContribRow[] = [];
  const allLeaderboardStats: LeaderboardStatRow[] = [];
  const allProfileUpdates: ProfileUpsertRow[] = [];
  const authMetadataQueue: Array<{ userId: string; meta: Record<string, unknown> }> = [];

  // Merge auth.users and public.profiles so every registered contributor in the DB is processed
  const candidateUsersMap = new Map<string, SyncAuthUser>();
  for (const user of authUsers) {
    candidateUsersMap.set(user.id, user);
  }
  for (const prof of dbProfiles || []) {
    const effectiveId = prof.user_id || prof.id;
    if (effectiveId && !candidateUsersMap.has(effectiveId)) {
      candidateUsersMap.set(effectiveId, {
        id: effectiveId,
        email: prof.email || undefined,
        user_metadata: {
          github: prof.github || undefined,
          role: prof.role || "contributor",
          is_admin: prof.is_admin || false,
        },
      });
    }
  }
  const allCandidateUsers = Array.from(candidateUsersMap.values());

  // 6. Aggregate each contributor and compute points
  for (const user of allCandidateUsers) {
    const meta = user.user_metadata || {};
    const prof = profileMap.get(user.id);
    const identities = user.identities || [];
    const role = prof?.role || meta.role || (user.email?.toLowerCase() === adminEmail ? "admin" : "contributor");
    const isAdmin = Boolean(prof?.is_admin || meta.is_admin || role === "admin" || role === "project-admin");

    // Only contributors participate in contributor leaderboard scoring
    if (role !== "contributor" || isAdmin) {
      continue;
    }

    // Collect all handles that belong to this user
    const userHandles = new Set<string>();
    if (prof?.github) userHandles.add(normalizeGitHubHandle(prof.github).toLowerCase());
    if (meta.github) userHandles.add(normalizeGitHubHandle(meta.github).toLowerCase());
    if (meta.user_name) userHandles.add(normalizeGitHubHandle(meta.user_name).toLowerCase());
    if (meta.preferred_username) userHandles.add(normalizeGitHubHandle(meta.preferred_username).toLowerCase());
    for (const id of identities) {
      if (id.provider === "github" && id.identity_data) {
        if (id.identity_data.user_name) userHandles.add(normalizeGitHubHandle(String(id.identity_data.user_name)).toLowerCase());
        if (id.identity_data.preferred_username) userHandles.add(normalizeGitHubHandle(String(id.identity_data.preferred_username)).toLowerCase());
      }
    }

    // Merge all PRs across the user's handles without duplication
    const mergedPrMap = new Map<string, { repoSlug: string; prNumber: number; difficulty: DifficultyLevel; points: number; htmlUrl: string; mergedAt: string }>();
    for (const handle of userHandles) {
      if (handle && contributorPrMap.has(handle)) {
        for (const pr of contributorPrMap.get(handle)!) {
          const key = `${pr.repoSlug}#${pr.prNumber}`;
          if (!mergedPrMap.has(key)) {
            mergedPrMap.set(key, pr);
          }
        }
      }
    }

    const userPrs = Array.from(mergedPrMap.values());
    const computedScore = userPrs.reduce((sum, p) => sum + p.points, 0);
    const computedMergedPrs = userPrs.length;
    const uniqueRepos = new Set(userPrs.map((p) => p.repoSlug));
    const computedProjects = uniqueRepos.size;

    const currentScore = Number(meta.score || 0);
    const currentPrs = Number(meta.merged_prs || 0);
    const currentRepos = Number(meta.projects_count || 0);

    const hasChanged =
      currentScore !== computedScore ||
      currentPrs !== computedMergedPrs ||
      currentRepos !== computedProjects;

    const primaryHandle = prof?.github || meta.github || meta.user_name || Array.from(userHandles)[0] || null;

    // Accumulate individual PR contributions
    if (userPrs.length > 0) {
      for (const p of userPrs) {
        const projId = projectMap.get(p.repoSlug);
        const targetUserId = prof?.user_id || user.id;
        if (projId && p.htmlUrl) {
          allContribRows.push({
            user_id: targetUserId,
            project_id: projId,
            type: "pr",
            github_url: p.htmlUrl,
            status: "merged",
            points_awarded: p.points,
            contributed_at: p.mergedAt,
          });
        }
      }

      const targetUserId = prof?.user_id || user.id;
      allLeaderboardStats.push({
        user_id: targetUserId,
        total_points: computedScore,
        current_streak: 1,
        updated_at: nowIso,
      });
    }

    // Queue profile and auth metadata update if values changed or has score
    if (hasChanged || computedScore > 0) {
      allProfileUpdates.push({
        id: prof?.id || user.id,
        user_id: prof?.user_id || user.id,
        github: primaryHandle,
        score: computedScore,
        merged_prs: computedMergedPrs,
        projects_count: computedProjects,
      });

      authMetadataQueue.push({
        userId: user.id,
        meta: {
          ...meta,
          github: primaryHandle,
          score: computedScore,
          merged_prs: computedMergedPrs,
          projects_count: computedProjects,
        },
      });

      updatedCount++;
    }
  }

  // 7. Project-admin pass: award MERGER_POINTS for each OSCI'26-labelled PR in their repository or merged by them
  for (const user of allCandidateUsers) {
    const meta = user.user_metadata || {};
    const prof = profileMap.get(user.id);
    const identities = user.identities || [];
    const role = prof?.role || meta.role || "contributor";
    // Only process project-admins
    if (role !== "project-admin") continue;

    // Collect all GitHub handles belonging to this admin
    const userHandles = new Set<string>();
    if (prof?.github) userHandles.add(normalizeGitHubHandle(prof.github).toLowerCase());
    if (meta.github) userHandles.add(normalizeGitHubHandle(meta.github).toLowerCase());
    if (meta.user_name) userHandles.add(normalizeGitHubHandle(meta.user_name).toLowerCase());
    if (meta.preferred_username) userHandles.add(normalizeGitHubHandle(meta.preferred_username).toLowerCase());
    for (const id of identities) {
      if (id.provider === "github" && id.identity_data) {
        if (id.identity_data.user_name) userHandles.add(normalizeGitHubHandle(String(id.identity_data.user_name)).toLowerCase());
        if (id.identity_data.preferred_username) userHandles.add(normalizeGitHubHandle(String(id.identity_data.preferred_username)).toLowerCase());
      }
    }

    // Aggregate all PRs this admin gets credit for:
    // 1. All PRs in repositories owned by this admin
    // 2. All PRs merged by this admin in any competition repo
    const mergedByAdmin = new Map<string, { repoSlug: string; prNumber: number; difficulty: DifficultyLevel; points: number; htmlUrl: string; mergedAt: string }>();
    for (const handle of userHandles) {
      // Repos owned by this admin
      for (const [slug, prs] of repoPrMap.entries()) {
        const repoOwner = slug.split("/")[0];
        if (repoOwner === handle) {
          for (const p of prs) {
            const key = `${p.repoSlug}#${p.prNumber}`;
            if (!mergedByAdmin.has(key)) mergedByAdmin.set(key, p);
          }
        }
      }

      // PRs explicitly merged by this admin
      for (const m of mergerMap.get(handle) || []) {
        const key = `${m.repoSlug}#${m.prNumber}`;
        if (!mergedByAdmin.has(key)) mergedByAdmin.set(key, m);
      }
    }

    if (mergedByAdmin.size === 0) continue;

    const userMergePrs = Array.from(mergedByAdmin.values());
    const mergerScore = userMergePrs.reduce((sum, p) => sum + p.points, 0);
    const primaryHandle = prof?.github || meta.github || meta.user_name || Array.from(userHandles)[0] || null;
    const adminProjects = new Set(userMergePrs.map((m) => m.repoSlug));

    const targetAdminUserId = prof?.user_id || user.id;

    // Store each merged PR as a "pr_merge" contribution row
    for (const m of userMergePrs) {
      const projId = projectMap.get(m.repoSlug);
      if (projId && m.htmlUrl) {
        allContribRows.push({
          user_id: targetAdminUserId,
          project_id: projId,
          type: "pr_merge",
          // Unique key: prefix URL so it doesn't collide with the contributor's "pr" row
          github_url: `merged:${m.htmlUrl}`,
          status: "merged",
          points_awarded: m.points,
          contributed_at: m.mergedAt,
        });
      }
    }

    allLeaderboardStats.push({
      user_id: targetAdminUserId,
      total_points: mergerScore,
      current_streak: 1,
      updated_at: nowIso,
    });

    allProfileUpdates.push({
      id: prof?.id || user.id,
      user_id: targetAdminUserId,
      github: primaryHandle,
      score: mergerScore,
      merged_prs: userMergePrs.length,
      projects_count: adminProjects.size,
    });

    authMetadataQueue.push({
      userId: user.id,
      meta: {
        ...meta,
        github: primaryHandle,
        score: mergerScore,
        merged_prs: userMergePrs.length,
        projects_count: adminProjects.size,
      },
    });

    updatedCount++;
  }

  // 8. Perform scalable chunked upserts for contributions & leaderboard_stats
  async function chunkedBatchUpsert(
    table: string,
    rows: unknown[],
    onConflict: string,
    chunkSize = 500
  ) {
    for (let i = 0; i < rows.length; i += chunkSize) {
      const chunk = rows.slice(i, i + chunkSize);
      try {
        const { error: upsertErr } = await admin.from(table).upsert(chunk as never, { onConflict });
        if (upsertErr) {
          console.warn(`Notice: chunked upsert on ${table} error:`, upsertErr.message);
        }
      } catch (err: unknown) {
        console.warn(`Notice: chunked upsert on ${table} failed:`, err instanceof Error ? err.message : "Unknown error");
      }
    }
  }

  if (allContribRows.length > 0) {
    await chunkedBatchUpsert("contributions", allContribRows, "github_url", 500);
  }

  if (allLeaderboardStats.length > 0) {
    await chunkedBatchUpsert("leaderboard_stats", allLeaderboardStats, "user_id", 500);
  }

  // Directly update profiles in public.profiles by id / user_id
  if (allProfileUpdates.length > 0) {
    for (const pUp of allProfileUpdates) {
      const updateData: Record<string, unknown> = {
        score: pUp.score,
        merged_prs: pUp.merged_prs,
        projects_count: pUp.projects_count,
      };
      if (pUp.github) updateData.github = pUp.github;

      try {
        const { error: pErr } = await admin
          .from("profiles")
          .update(updateData)
          .or(`id.eq.${pUp.id},user_id.eq.${pUp.user_id}`);
        if (pErr) {
          console.warn(`Notice: profile update for ${pUp.id} error:`, pErr.message);
        }
      } catch (err: unknown) {
        console.warn(`Notice: profile update for ${pUp.id} failed:`, err instanceof Error ? err.message : "Unknown error");
      }
    }
  }

  // Best-effort non-blocking metadata sync for top 50 changed contributors to stay within function timeout
  const topAuthUpdates = authMetadataQueue.slice(0, 50);
  if (topAuthUpdates.length > 0) {
    await Promise.allSettled(
      topAuthUpdates.map(({ userId, meta }) =>
        admin.auth.admin.updateUserById(userId, { user_metadata: meta }).catch(() => {})
      )
    );
  }

  revalidatePath("/leaderboard");
  revalidatePath("/admin");
  revalidatePath("/dashboard");

  const durationSec = ((Date.now() - startTime) / 1000).toFixed(1);

  return {
    success: true,
    trackedRepos: allowedSlugs.size,
    totalPrsFetched,
    totalMergedPrsFound,
    contributorsProcessed: authUsers.length,
    activeContributorsWithPoints: Array.from(contributorPrMap.keys()).length,
    updatedProfiles: updatedCount,
    duration: `${durationSec}s`,
  };
}

