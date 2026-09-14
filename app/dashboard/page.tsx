import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { redirect } from "next/navigation";
import { syncUserProfile } from "@/lib/auth/syncProfile";
import Link from "next/link";
import DashboardClient, { PRContribution, DayContribution, ProjectSummary } from "./DashboardClient";

export const dynamic = "force-dynamic";

// Known titles for prominent PRs
const KNOWN_PR_TITLES: Record<string, string> = {
  "15274": "Fix improve search performance",
  "15273": "Add: dark mode toggle",
  "15272": "Refactor: auth module",
  "15271": "Update: documentation",
  "15270": "Fix UI alignment issues",
  "15265": "Improve validation handling",
  "15264": "Optimize API routes",
  "15263": "Add test cases",
  "15262": "Update dependencies",
  "15261": "Fix minor bugs",
};

export default async function DashboardPage(props: {
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const supabase = await createClient();
  const {
    data: { user: currentUser },
  } = await supabase.auth.getUser();

  const resolvedParams = props?.searchParams ? await props.searchParams : {};
  const requestedUser =
    typeof resolvedParams?.user === "string"
      ? resolvedParams.user.replace(/^@+/, "").trim()
      : "";
  const requestedId =
    typeof resolvedParams?.id === "string" ? resolvedParams.id.trim() : "";

  // If unauthenticated and not requesting a public profile, redirect to sign-in
  if (!currentUser && !requestedUser && !requestedId) {
    redirect("/sign-in");
  }

  const admin = createAdminClient();
  let targetProfile: Record<string, unknown> | null = null;
  let isOwnProfile = false;

  // 1. If a specific user / id was requested in the URL
  if (requestedId) {
    const { data: byId } = await admin
      .from("profiles")
      .select("*")
      .or(`user_id.eq.${requestedId},id.eq.${requestedId}`)
      .maybeSingle();
    targetProfile = byId as Record<string, unknown> | null;
  }

  if (!targetProfile && requestedUser) {
    const { data: byGithub } = await admin
      .from("profiles")
      .select("*")
      .ilike("github", requestedUser)
      .maybeSingle();
    targetProfile = byGithub as Record<string, unknown> | null;

    if (!targetProfile) {
      const { data: byId } = await admin
        .from("profiles")
        .select("*")
        .or(`user_id.eq.${requestedUser},id.eq.${requestedUser}`)
        .maybeSingle();
      targetProfile = byId as Record<string, unknown> | null;
    }
  }

  // 2. Determine if viewing own profile or requested user's profile
  let profile: Record<string, unknown> | null = targetProfile;
  let targetUserId = "";

  if (targetProfile) {
    targetUserId = String(targetProfile.user_id || targetProfile.id);
    isOwnProfile = Boolean(
      currentUser &&
        (currentUser.id === targetProfile.user_id ||
          currentUser.id === targetProfile.id)
    );
  } else if (currentUser) {
    isOwnProfile = true;
    targetUserId = currentUser.id;

    // Search by user_id
    const { data: ownProfile } = await admin
      .from("profiles")
      .select("*")
      .eq("user_id", currentUser.id)
      .maybeSingle();

    profile = ownProfile as Record<string, unknown> | null;

    // Fallback: search by id
    if (!profile) {
      const { data: byId } = await admin
        .from("profiles")
        .select("*")
        .eq("id", currentUser.id)
        .maybeSingle();
      if (byId) profile = byId as Record<string, unknown> | null;
    }

    // Fallback: search by github username from user_metadata
    const metaGithub =
      currentUser.user_metadata?.user_name ||
      currentUser.user_metadata?.preferred_username ||
      currentUser.user_metadata?.github ||
      null;

    if (!profile && metaGithub) {
      const cleanGh = metaGithub.replace(/^@+/, "").trim();
      const { data: byGh } = await admin
        .from("profiles")
        .select("*")
        .ilike("github", cleanGh)
        .maybeSingle();
      if (byGh) profile = byGh as Record<string, unknown> | null;
    }

    // Fallback: search by email
    const userEmail = (currentUser.email || currentUser.user_metadata?.email || "").trim().toLowerCase();
    if (!profile && userEmail) {
      const { data: byEmail } = await admin
        .from("profiles")
        .select("*")
        .ilike("email", userEmail)
        .maybeSingle();
      if (byEmail) profile = byEmail as Record<string, unknown> | null;
    }

    // If profile still does not exist, auto-provision using syncUserProfile
    if (!profile) {
      try {
        const synced = await syncUserProfile(currentUser);
        if (synced) {
          profile = synced as unknown as Record<string, unknown>;
        }
      } catch (syncErr) {
        console.warn("Notice: syncUserProfile on dashboard error:", syncErr);
      }
    }
  }

  // Extract viewer identity fields
  const metaGithub =
    (currentUser?.user_metadata?.user_name as string) ||
    (currentUser?.user_metadata?.preferred_username as string) ||
    (currentUser?.user_metadata?.github as string) ||
    "";

  const githubUsername = (
    (profile?.github as string) ||
    (isOwnProfile ? metaGithub : "") ||
    requestedUser ||
    ""
  ).replace(/^@+/, "").trim();

  const fullName =
    (profile?.full_name as string) ||
    (isOwnProfile
      ? (currentUser?.user_metadata?.full_name as string) ||
        (currentUser?.user_metadata?.name as string) ||
        githubUsername
      : "") ||
    githubUsername ||
    "Contributor";

  const firstName = fullName.trim().split(" ")[0] || "Contributor";

  const avatar =
    (profile?.avatar_url as string) ||
    (isOwnProfile
      ? (currentUser?.user_metadata?.avatar_url as string) ||
        (currentUser?.user_metadata?.picture as string)
      : "") ||
    (githubUsername ? `https://avatars.githubusercontent.com/${githubUsername}` : "");

  const rawRole =
    (profile?.role as string) ||
    (isOwnProfile ? (currentUser?.user_metadata?.role as string) : "") ||
    "contributor";
  const isProjectAdmin = rawRole === "project-admin";

  const badgesCreated = Number(profile?.badges_created || 0);
  const techStack =
    Array.isArray(profile?.tech_stack) && profile.tech_stack.length > 0
      ? (profile.tech_stack as string[])
      : ["TypeScript", "JavaScript", "Python", "Jupyter Notebook", "CSS"];

  // 4. Fetch all projects and contributions from Supabase
  const { data: dbProjects } = await admin
    .from("projects")
    .select("id, name, github_repo_url, description");
  const allProjects = dbProjects || [];

  const { data: allContributionsRaw } = await admin
    .from("contributions")
    .select("id, type, github_url, status, points_awarded, contributed_at, project_id, user_id, projects(id, name, github_repo_url)")
    .order("contributed_at", { ascending: false });
  const allContributions = allContributionsRaw || [];

  // 5. For Project Admin: find their managed project and its statistics
  let managedProjects: ProjectSummary[] = [];
  let relevantPRs: typeof allContributions = [];

  if (isProjectAdmin) {
    let matchedProjects = allProjects.filter((p) => {
      if (!p.github_repo_url) return false;
      const urlLower = p.github_repo_url.toLowerCase();
      return (
        Boolean(githubUsername) &&
        (urlLower.includes(`/${githubUsername.toLowerCase()}/`) ||
         urlLower.endsWith(`/${githubUsername.toLowerCase()}`))
      );
    });

    const matchedProjectIds = new Set(matchedProjects.map((p) => p.id));
    relevantPRs = allContributions.filter((c) => {
      if (c.project_id && matchedProjectIds.has(c.project_id)) return true;
      if (
        c.github_url &&
        matchedProjects.some((p) => {
          const short = p.name.split("–")[0].trim().toLowerCase();
          return c.github_url.toLowerCase().includes(short);
        })
      ) {
        return true;
      }
      return false;
    });

    managedProjects = matchedProjects.map((proj) => {
      const projShort = proj.name.split("–")[0].trim().toLowerCase();
      const projContribs = relevantPRs.filter(
        (c) => c.project_id === proj.id || (c.github_url && c.github_url.toLowerCase().includes(projShort))
      );
      const prCount = projContribs.length;
      const totalPoints = projContribs.reduce((sum, c) => sum + (c.points_awarded || 10), 0);
      return {
        id: proj.id,
        name: proj.name,
        url: proj.github_repo_url,
        prCount,
        totalPoints,
      };
    });
  }

  // 6. For Contributors: group user's contributions by project and calculate points
  const userContribs = allContributions.filter((c) => {
    if (targetUserId && c.user_id === targetUserId) return true;
    if (profile?.id && c.user_id === profile.id) return true;
    return false;
  });

  const contributedProjectsMap = new Map<string, { prCount: number; totalPoints: number }>();
  for (const c of userContribs) {
    const pid = c.project_id || "default";
    const cur = contributedProjectsMap.get(pid) || { prCount: 0, totalPoints: 0 };
    cur.prCount += 1;
    cur.totalPoints += (c.points_awarded || 10);
    contributedProjectsMap.set(pid, cur);
  }

  const contributedProjects: ProjectSummary[] = [];
  for (const [pid, stats] of contributedProjectsMap.entries()) {
    const found = allProjects.find((p) => p.id === pid);
    if (found) {
      contributedProjects.push({
        id: found.id,
        name: found.name,
        url: found.github_repo_url,
        prCount: stats.prCount,
        totalPoints: stats.totalPoints,
      });
    } else {
      contributedProjects.push({
        id: pid,
        name: "Open Source Project",
        url: "https://github.com",
        prCount: stats.prCount,
        totalPoints: stats.totalPoints,
      });
    }
  }

  // 7. Select PRs to display in the main contributions table
  const displayContributions = isProjectAdmin
    ? relevantPRs
    : userContribs;

  const allPRs: PRContribution[] = displayContributions.map((c) => {
    const project = Array.isArray(c.projects) ? c.projects[0] : c.projects;
    const shortName = project?.name?.split("–")[0]?.trim() || "Project";
    const cleanUrl = (c.github_url || "").replace(/^merged:/, "");
    const prMatch = cleanUrl.match(/\/pull\/(\d+)/);
    const prNum = prMatch ? prMatch[1] : "";

    let title = KNOWN_PR_TITLES[prNum];
    if (!title) {
      const pts = c.points_awarded || 10;
      const prefix = pts >= 30 ? "Refactor & optimize" : pts >= 20 ? "Enhance feature validation" : "Update component tests & docs";
      title = `${prefix} in ${shortName} (#${prNum || c.id.slice(0, 5)})`;
    }

    return {
      id: c.id,
      type: c.type || "pr",
      github_url: cleanUrl,
      status: c.status || "merged",
      points_awarded: c.points_awarded || 10,
      contributed_at: c.contributed_at,
      title,
      project_name: shortName,
    };
  });

  // 8. Build Daily Contributions starting from Sep 11, 2026 with true Supabase data
  const dailyContributions: DayContribution[] = [];
  for (let i = 0; i < 14; i++) {
    const d = new Date(Date.UTC(2026, 8, 11 + i)); // Month 8 is September
    const isoDate = d.toISOString().split("T")[0]; // "2026-09-11"
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const dateStr = `${monthNames[d.getUTCMonth()]} ${d.getUTCDate()}`;
    const isToday = isoDate === "2026-09-14";

    const dayCount = allPRs.filter((p) => {
      return p.contributed_at && p.contributed_at.startsWith(isoDate);
    }).length;

    dailyContributions.push({
      dateStr,
      fullDate: isoDate,
      count: dayCount,
      isToday,
    });
  }

  // 9. Metric counts: score & merged PRs
  const totalPoints =
    typeof profile?.score === "number" && profile.score >= 0
      ? profile.score
      : allPRs.reduce((sum, p) => sum + (p.points_awarded || 10), 0);

  const mergedPRs =
    typeof profile?.merged_prs === "number" && profile.merged_prs >= 0
      ? profile.merged_prs
      : allPRs.length;

  const weeklyScore = allPRs
    .filter((p) => p.contributed_at && p.contributed_at.startsWith("2026-09"))
    .reduce((sum, p) => sum + (p.points_awarded || 10), 0);

  const weeklyPRs = allPRs.filter((p) => p.contributed_at && p.contributed_at.startsWith("2026-09")).length;

  const projectsCount = isProjectAdmin
    ? managedProjects.length
    : (contributedProjects.length || Number(profile?.projects_count || 0));

  // 10. Calculate user's leaderboard rank
  let userRank = 1;
  try {
    const { count, error } = await admin
      .from("profiles")
      .select("id", { count: "exact", head: true })
      .neq("role", "admin")
      .or(`score.gt.${totalPoints},and(score.eq.${totalPoints},merged_prs.gt.${mergedPRs})`);

    if (!error && count !== null) {
      userRank = count + 1;
    }
  } catch (err) {
    console.warn("Notice: Rank computation error:", err);
  }

  // Viewer profile for Navbar
  const viewerProfilePayload = {
    id: currentUser ? currentUser.id : targetUserId,
    name: (currentUser?.user_metadata?.full_name as string) || (currentUser?.user_metadata?.name as string) || fullName,
    email: currentUser?.email || (githubUsername ? `${githubUsername}@osc-india.org` : ""),
    avatar: (currentUser?.user_metadata?.avatar_url as string) || (currentUser?.user_metadata?.picture as string) || avatar,
    role: isOwnProfile ? rawRole : ((currentUser?.user_metadata?.role as string) || "contributor"),
    isAdmin: (isOwnProfile ? rawRole : ((currentUser?.user_metadata?.role as string) || "contributor")) === "project-admin",
    github: isOwnProfile ? githubUsername : ((currentUser?.user_metadata?.user_name as string) || ""),
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#000000",
        backgroundImage:
          "radial-gradient(ellipse 700px 350px at 85% 10%, rgba(255, 117, 24, 0.12), transparent 75%)",
        backgroundRepeat: "no-repeat",
        display: "flex",
        flexDirection: "column",
        fontFamily: "'Inter', sans-serif",
        color: "#ffffff",
      }}
    >
      <Navbar initialProfile={viewerProfilePayload} />
      <div style={{ height: "96px", width: "100%", flexShrink: 0 }} aria-hidden="true" />

      <main
        style={{
          margin: "0 auto",
          maxWidth: "1320px",
          width: "100%",
          paddingTop: "24px",
          paddingBottom: "96px",
          paddingLeft: "clamp(20px, 4vw, 40px)",
          paddingRight: "clamp(20px, 4vw, 40px)",
          boxSizing: "border-box",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Back Link if viewing someone else's profile */}
        {!isOwnProfile && (
          <div style={{ width: "100%", marginBottom: "16px" }}>
            <Link
              href="/leaderboard"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                color: "var(--orange)",
                textDecoration: "none",
                fontSize: "14px",
                fontWeight: 600,
                padding: "8px 16px",
                background: "rgba(255,117,24,0.08)",
                borderRadius: "10px",
                border: "1px solid rgba(255,117,24,0.2)",
                transition: "all 0.2s ease",
              }}
              className="hover:bg-[rgba(255,117,24,0.15)] hover:border-[rgba(255,117,24,0.4)]"
            >
              ← Back to Leaderboard
            </Link>
          </div>
        )}

        {/* Top Greeting Header + Quote Card */}
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            marginBottom: "36px",
            flexWrap: "wrap",
            gap: "20px",
          }}
        >
          <div>
            <div
              style={{
                fontSize: "22px",
                fontWeight: 700,
                color: "#f3f4f6",
                marginBottom: "4px",
              }}
            >
              Good to see you,
            </div>
            <h1
              style={{
                fontSize: "clamp(34px, 5vw, 42px)",
                fontWeight: 800,
                color: "#ffffff",
                letterSpacing: "-0.02em",
                margin: "0 0 8px 0",
                display: "flex",
                alignItems: "center",
                gap: "10px",
                lineHeight: 1.15,
              }}
            >
              <span>{firstName}!</span>
              <span>👋</span>
            </h1>
            <p style={{ fontSize: "14px", color: "#8b929e", margin: 0 }}>
              Small contributions make a big impact. Keep going!
            </p>
          </div>

          {/* Quote Card */}
          <div
            style={{
              background: "rgba(20, 20, 25, 0.6)",
              border: "1px solid rgba(255, 255, 255, 0.08)",
              borderRadius: "16px",
              padding: "18px 24px",
              maxWidth: "480px",
              display: "flex",
              alignItems: "flex-start",
              gap: "14px",
              boxSizing: "border-box",
            }}
          >
            <div
              style={{
                fontSize: "32px",
                lineHeight: 1,
                fontFamily: "serif",
                color: "#ff7518",
                flexShrink: 0,
                userSelect: "none",
              }}
            >
              “
            </div>
            <div style={{ flex: 1 }}>
              <p
                style={{
                  fontSize: "13.5px",
                  fontStyle: "italic",
                  color: "#d1d5db",
                  margin: 0,
                  lineHeight: 1.5,
                }}
              >
                &ldquo;Open source is a journey of learning, sharing and growing together.&rdquo;
              </p>
              <span
                style={{
                  fontSize: "11px",
                  color: "#8b929e",
                  display: "block",
                  textAlign: "right",
                  marginTop: "8px",
                  fontWeight: 500,
                }}
              >
                — OSC India
              </span>
            </div>
          </div>
        </div>

        {/* Client Interactive Dashboard */}
        <DashboardClient
          profile={{
            id: String(profile?.id || targetUserId),
            user_id: targetUserId,
            full_name: fullName,
            github: githubUsername,
            avatar_url: avatar,
            role: rawRole,
            score: totalPoints,
            merged_prs: mergedPRs,
            projects_count: projectsCount,
            badges_created: badgesCreated,
            tech_stack: techStack,
            bio: (profile?.bio as string) || null,
          }}
          isOwnProfile={isOwnProfile}
          initialContributions={allPRs}
          dailyContributions={dailyContributions}
          managedProjects={managedProjects}
          contributedProjects={contributedProjects}
          weeklyScore={weeklyScore}
          weeklyPRs={weeklyPRs}
          rank={userRank}
        />
      </main>

      <Footer />
    </div>
  );
}
