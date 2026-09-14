const fs = require("fs");
const path = require("path");
const crypto = require("crypto");
const { createClient } = require("@supabase/supabase-js");

// Load .env.local
const envPath = path.resolve(process.cwd(), ".env.local");
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, "utf8");
  for (const line of envContent.split("\n")) {
    const match = line.match(/^([^=]+)=(.*)$/);
    if (match) {
      let val = match[2].trim();
      if (val.startsWith("\"") && val.endsWith("\"")) val = val.slice(1, -1);
      process.env[match[1].trim()] = val;
    }
  }
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!supabaseUrl || !serviceKey) {
  console.error("Missing Supabase configuration");
  process.exit(1);
}

const admin = createClient(supabaseUrl, serviceKey);

// GitHub auth headers
const token = process.env.GITHUB_ACCESS_TOKEN || process.env.GITHUB_PAT;
const headers = {
  Accept: "application/vnd.github.v3+json",
  "User-Agent": "OSC-India-Contributions-Backfill",
};
if (token) {
  headers.Authorization = `Bearer ${token}`;
} else {
  const clientId = process.env.GITHUB_ID || process.env.AUTH_GITHUB_ID;
  const clientSecret = process.env.GITHUB_SECRET || process.env.AUTH_GITHUB_SECRET;
  if (clientId && clientSecret) {
    headers.Authorization = `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString("base64")}`;
  }
}

const DIFFICULTY_POINTS = {
  easy: 10,
  medium: 20,
  hard: 30,
  expert: 50,
};

function hasOsci26Label(pr) {
  const labels = pr.labels || [];
  return labels.some((l) => {
    const name = (typeof l === "string" ? l : l.name || "").toLowerCase().trim();
    return /osci[- ']?26|osci[- ']?2026/i.test(name);
  });
}

async function resolvePrDifficulty(slug, pr, headers, prDetailsCache) {
  // 1. Check explicit maintainer level labels on the PR first
  const labelNames = (pr.labels || [])
    .map((l) => (typeof l === "string" ? l : l.name || "").toLowerCase())
    .join(" ");

  if (/expert|level[- :_]?4\b|lvl[- :_]?4\b|level4|lvl4|difficulty[- :_]+expert/i.test(labelNames)) {
    return "expert";
  }
  if (/hard\b|difficulty[- :_]+hard|level[- :_]?3\b|lvl[- :_]?3\b|level3|lvl3/i.test(labelNames)) {
    return "hard";
  }
  if (/medium|med\b|intermediate|mid\b|difficulty[- :_]+medium|level[- :_]?2\b|lvl[- :_]?2\b|level2|lvl2/i.test(labelNames)) {
    return "medium";
  }
  if (/easy|beginner|starter|good[ -]?first[ -]?issue|difficulty[- :_]+easy|level[- :_]?1\b|lvl[- :_]?1\b|level1|lvl1/i.test(labelNames)) {
    return "easy";
  }

  // 2. Check title or body keywords
  const fullText = `${pr.title || ""} ${pr.body || ""}`.toLowerCase();
  if (/\[expert\]|\(expert\)|level[- :_]?4\b|difficulty:\s*expert/i.test(fullText)) return "expert";
  if (/\[hard\]|\(hard\)|level[- :_]?3\b|difficulty:\s*hard/i.test(fullText)) return "hard";
  if (/\[medium\]|\(medium\)|\[med\]|\(med\)|level[- :_]?2\b|difficulty:\s*medium/i.test(fullText)) return "medium";
  if (/\[easy\]|\(easy\)|level[- :_]?1\b|good[ -]?first[ -]?issue|difficulty:\s*easy/i.test(fullText)) return "easy";

  // 3. Fetch PR additions + deletions to accurately determine difficulty by code change size
  const prCacheKey = `${slug}#${pr.number}`;
  let additions = pr.additions;
  let deletions = pr.deletions;

  if (additions === undefined || deletions === undefined) {
    if (prDetailsCache && prDetailsCache.has(prCacheKey)) {
      const cached = prDetailsCache.get(prCacheKey);
      additions = cached.additions;
      deletions = cached.deletions;
    } else {
      try {
        const detailRes = await fetch(`https://api.github.com/repos/${slug}/pulls/${pr.number}`, { headers });
        if (detailRes.ok) {
          const detail = await detailRes.json();
          additions = detail.additions || 0;
          deletions = detail.deletions || 0;
          if (prDetailsCache) prDetailsCache.set(prCacheKey, { additions, deletions });
        }
      } catch {
        additions = 0;
        deletions = 0;
      }
    }
  }

  const totalLines = (additions || 0) + (deletions || 0);
  if (totalLines >= 800) return "expert"; // 50 pts
  if (totalLines >= 250) return "hard";   // 30 pts
  if (totalLines >= 50) return "medium";  // 20 pts
  return "easy";                          // 10 pts
}

function normalizeGitHubHandle(handle) {
  if (!handle) return "";
  let clean = handle.trim();
  clean = clean.replace(/^https?:\/\/github\.com\//i, "");
  clean = clean.replace(/^@+/, "");
  clean = clean.split(/[/?#]/)[0].trim();
  return clean.toLowerCase();
}

async function main() {
  console.log("=== Strictly Purged OSCI'26 Sweep for public.contributions & public.leaderboard_stats ===");

  // 1. Fetch official 17 projects
  const { data: projects, error: pErr } = await admin.from("projects").select("id, name, github_repo_url");
  if (pErr || !projects) {
    console.error("Failed to load projects:", pErr);
    process.exit(1);
  }

  const projectMap = new Map(); // exactSlug -> project
  const repoOwnerMap = new Map(); // exactSlug -> ownerHandle
  const adminHandles = new Set();

  for (const p of projects) {
    // Preserve exact case for GitHub API requests
    const exactSlug = p.github_repo_url.replace(/^https?:\/\/github\.com\//i, "").replace(/\/+$/, "");
    projectMap.set(exactSlug, p);
    const owner = exactSlug.split("/")[0].toLowerCase().trim();
    repoOwnerMap.set(exactSlug, owner);
    adminHandles.add(owner);
  }
  console.log(`Loaded ${projectMap.size} official projects from database.`);

  // 2. Fetch all profiles & build handle -> profile mapping
  const { data: profiles, error: profErr } = await admin.from("profiles").select("*");
  if (profErr || !profiles) {
    console.error("Failed to load profiles:", profErr);
    process.exit(1);
  }

  const handleToProfile = new Map();
  for (const prof of profiles) {
    const handle = normalizeGitHubHandle(prof.github);
    if (handle) {
      handleToProfile.set(handle, prof);
    }
  }

  // Ensure all 17 project admins have a profile with role = 'project-admin'
  for (const adminHandle of adminHandles) {
    let prof = handleToProfile.get(adminHandle);
    if (!prof) {
      const newId = crypto.randomUUID();
      const name = adminHandle.charAt(0).toUpperCase() + adminHandle.slice(1);
      const { data: created } = await admin.from("profiles").insert({
        id: newId,
        user_id: newId,
        full_name: name,
        github: adminHandle,
        role: "project-admin",
        score: 0,
        merged_prs: 0,
        projects_count: 1,
        badges_created: 0,
        tech_stack: [],
      }).select("*").maybeSingle();
      if (created) {
        prof = created;
        handleToProfile.set(adminHandle, prof);
        console.log("Created project-admin profile for:", adminHandle);
      }
    } else if (prof.role !== "project-admin") {
      await admin.from("profiles").update({ role: "project-admin" }).eq("id", prof.id);
      prof.role = "project-admin";
      console.log("Promoted to project-admin:", adminHandle);
    }
  }

  const defaultFallbackUserId = profiles.find((p) => p.user_id)?.user_id || "2ee0137b-0a3e-4a22-91b7-05c7250f3907";

  // 3. Fast REST API sweep of 17 competition repositories
  const verifiedContributions = [];
  const contributorStats = new Map(); // userId -> { points, mergedCount, repos: Set }
  const projectAdminStats = new Map(); // userId -> { points, mergedCount, repos: Set }
  const prDetailsCache = new Map();

  for (const [exactSlug, project] of projectMap.entries()) {
    console.log(`Scanning repo: ${exactSlug}...`);
    let page = 1;
    let repoOsciPrs = 0;
    const repoOwner = repoOwnerMap.get(exactSlug);
    const adminProf = handleToProfile.get(repoOwner);

    while (page <= 10) {
      try {
        const url = `https://api.github.com/repos/${exactSlug}/pulls?state=closed&per_page=100&page=${page}&sort=updated&direction=desc`;
        const res = await fetch(url, { headers });
        if (!res.ok) {
          console.warn(`Error on ${exactSlug} page ${page}: ${res.status}`);
          break;
        }

        const pulls = await res.json();
        if (!Array.isArray(pulls) || pulls.length === 0) break;

        for (const pr of pulls) {
          if (!pr.merged_at) continue; // Only merged PRs
          
          // STRICT FILTER: Must carry the official competition label OSCI'26 / OSCI26
          if (!hasOsci26Label(pr)) continue;

          const author = normalizeGitHubHandle(pr.user?.login);
          const diff = await resolvePrDifficulty(exactSlug, pr, headers, prDetailsCache);
          const points = DIFFICULTY_POINTS[diff];
          const mergedAt = pr.merged_at || pr.closed_at || new Date().toISOString();

          repoOsciPrs++;

          // Match author profile
          const authorProf = author ? handleToProfile.get(author) : null;
          const authorUserId = authorProf
            ? (authorProf.user_id || authorProf.id)
            : (adminProf ? (adminProf.user_id || adminProf.id) : defaultFallbackUserId);

          // Add to contributions table
          verifiedContributions.push({
            user_id: authorUserId || defaultFallbackUserId,
            project_id: project.id,
            type: "pr",
            github_url: pr.html_url,
            status: "merged",
            points_awarded: points,
            contributed_at: mergedAt,
          });

          // A. Contributor points
          if (authorProf && authorProf.role !== "admin") {
            const uid = authorProf.user_id || authorProf.id;
            if (!contributorStats.has(uid)) {
              contributorStats.set(uid, { points: 0, count: 0, repos: new Set() });
            }
            const st = contributorStats.get(uid);
            st.points += points;
            st.count += 1;
            st.repos.add(exactSlug.toLowerCase());
          }

          // B. Project Admin points (repo owner receives points for all OSCI'26 PRs in their repo)
          if (adminProf) {
            const adminUid = adminProf.user_id || adminProf.id;
            if (!projectAdminStats.has(adminUid)) {
              projectAdminStats.set(adminUid, { points: 0, count: 0, repos: new Set() });
            }
            const ast = projectAdminStats.get(adminUid);
            ast.points += points;
            ast.count += 1;
            ast.repos.add(exactSlug.toLowerCase());
          }
        }

        if (pulls.length < 100) break;
        page++;
      } catch (err) {
        console.error(`Fetch exception for ${exactSlug} page ${page}:`, err.message);
        break;
      }
    }
    console.log(`  -> Found ${repoOsciPrs} verified OSCI'26 merged PRs on ${exactSlug}.`);
  }

  console.log(`\nTotal verified OSCI'26 PRs across all 17 projects: ${verifiedContributions.length}`);

  // 4. PURGE old/irrelevant rows and repopulate public.contributions
  console.log("Purging old/irrelevant rows from public.contributions...");
  await admin.from("contributions").delete().neq("id", "00000000-0000-0000-0000-000000000000");

  console.log(`Inserting ${verifiedContributions.length} verified OSCI'26 contributions...`);
  for (let i = 0; i < verifiedContributions.length; i += 50) {
    const chunk = verifiedContributions.slice(i, i + 50);
    const { error: cErr } = await admin.from("contributions").insert(chunk);
    if (cErr) {
      console.warn(`Chunk ${i} insert error (trying upsert):`, cErr.message);
      await admin.from("contributions").upsert(chunk, { onConflict: "github_url" });
    }
  }

  // 5. Reset and update public.profiles
  console.log("Resetting all profile scores...");
  await admin.from("profiles").update({ score: 0, merged_prs: 0, projects_count: 0 }).neq("id", "00000000-0000-0000-0000-000000000000");

  console.log(`Updating ${contributorStats.size} contributor profiles...`);
  for (const [userId, stats] of contributorStats.entries()) {
    await admin
      .from("profiles")
      .update({
        score: stats.points,
        merged_prs: stats.count,
        projects_count: stats.repos.size,
      })
      .or(`user_id.eq.${userId},id.eq.${userId}`);
  }

  console.log(`Updating ${projectAdminStats.size} project admin profiles...`);
  for (const [adminUid, ast] of projectAdminStats.entries()) {
    await admin
      .from("profiles")
      .update({
        score: ast.points,
        merged_prs: ast.count,
        projects_count: ast.repos.size || 1,
      })
      .or(`user_id.eq.${adminUid},id.eq.${adminUid}`);
  }

  // 6. Update public.leaderboard_stats
  const nowIso = new Date().toISOString();
  const leaderboardStats = [];
  for (const [userId, stats] of contributorStats.entries()) {
    leaderboardStats.push({
      user_id: userId,
      total_points: stats.points,
      current_streak: 1,
      updated_at: nowIso,
    });
  }
  for (const [adminUid, ast] of projectAdminStats.entries()) {
    leaderboardStats.push({
      user_id: adminUid,
      total_points: ast.points,
      current_streak: 1,
      updated_at: nowIso,
    });
  }

  // Upsert leaderboard stats in chunks
  for (let i = 0; i < leaderboardStats.length; i += 100) {
    const chunk = leaderboardStats.slice(i, i + 100);
    const { error: lErr } = await admin.from("leaderboard_stats").upsert(chunk, { onConflict: "user_id" });
    if (lErr) {
      console.error(`Error upserting leaderboard_stats chunk ${i}:`, lErr.message);
    }
  }

  console.log("\n=== Final Verification ===");
  const { count: finalContribs } = await admin.from("contributions").select("*", { count: "exact", head: true });
  console.log(`Total rows in public.contributions: ${finalContribs}`);
  console.log(`Total active contributors/admins on leaderboard: ${leaderboardStats.length}`);
}

main();

