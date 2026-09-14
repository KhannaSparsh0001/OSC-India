const { createClient } = require("@supabase/supabase-js");
const fs = require("fs");
const path = require("path");

// 1. Load environment variables from .env.local
const envPath = path.resolve(process.cwd(), ".env.local");
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, "utf8");
  for (const line of envContent.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const [key, ...vals] = trimmed.split("=");
    if (key && !process.env[key]) {
      process.env[key] = vals.join("=").replace(/^["']|["']$/g, "");
    }
  }
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("Missing Supabase credentials in environment.");
  process.exit(1);
}

const admin = createClient(supabaseUrl, supabaseKey, {
  auth: { autoRefreshToken: false, persistSession: false },
});

// 2. Setup GitHub API authentication
const clientId = process.env.GITHUB_ID || process.env.AUTH_GITHUB_ID;
const clientSecret = process.env.GITHUB_SECRET || process.env.AUTH_GITHUB_SECRET;
const token = process.env.GITHUB_ACCESS_TOKEN || process.env.GITHUB_PAT;

const headers = {
  Accept: "application/vnd.github.v3+json",
  "User-Agent": "OSC-India-Backfill-Engine",
};

if (token) {
  headers["Authorization"] = `Bearer ${token}`;
} else if (clientId && clientSecret) {
  headers["Authorization"] = `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString("base64")}`;
}

// 3. Official 17 Competition Repositories
const OFFICIAL_REPOS = [
  "Sandesh13fr/TCalc",
  "SrishtiSonam/AtomicBinding",
  "JugaadLang/jugaadlang",
  "SoumyaMishra-7/WalletWise",
  "SrigadaAkshayKumar/stock",
  "Sushmitha-2007/Eco-vision",
  "KanishJebaMathewM/Truxify",
  "AdityaPainuli/clippings-vids",
  "l3tchupkt/adaptq",
  "SidakSethi-Singh/LawSathi-Rag",
  "logeshv586-code/AIproductfactory",
  "GauravKarakoti/Secureflow",
  "abhaycs24/CBSOT_SIP_PROJECT-1-",
  "pratyushjha06/Dockfleet",
  "aashutoshkumarbhardwaj/CreatorOs",
  "ItsVikasA/Innovision-Open-Source",
  "AseemPrasad/Air-Quality-Intelligence",
];

const DIFFICULTY_POINTS = {
  easy: 10,
  medium: 20,
  hard: 30,
  expert: 50,
};

function normalizeHandle(handle) {
  if (!handle) return "";
  return handle
    .trim()
    .replace(/^@+/, "")
    .replace(/^https?:\/\/github\.com\//i, "")
    .replace(/\/+$/, "")
    .toLowerCase()
    .trim();
}

function detectDifficulty(item) {
  const labelNames = (item.labels || [])
    .map((l) => (typeof l === "string" ? l : l.name || "").toLowerCase())
    .join(" ");

  if (/expert|exp\b|advanced|level[- ]?4/i.test(labelNames)) return "expert";
  if (/hard\b|difficulty[- :]+hard|level[- ]?3/i.test(labelNames)) return "hard";
  if (/medium|med\b|intermediate|mid\b|difficulty[- :]+medium|level[- ]?2/i.test(labelNames)) return "medium";
  if (/easy|beginner|starter|good first issue|level[- ]?1/i.test(labelNames)) return "easy";

  const text = `${item.title || ""} ${item.body || ""}`.toLowerCase();
  if (/expert|advanced|level[- ]?4/i.test(text)) return "expert";
  if (/difficulty:\s*hard|level[- ]?3\b/i.test(text)) return "hard";
  if (/difficulty:\s*medium|level[- ]?2\b/i.test(text)) return "medium";
  if (/difficulty:\s*easy|good first issue|level[- ]?1\b/i.test(text)) return "easy";

  return "easy";
}

async function main() {
  console.log("===============================================================");
  console.log("OSC-INDIA: 10K SCALING & 17-REPO RECALCULATION ENGINE");
  console.log("===============================================================");
  const startTime = Date.now();

  // 1. Fetch all PRs across all 17 repositories (Parallel fetching per repo)
  console.log("\n[1/5] Fetching pull requests across 17 competition repositories...");
  const contributorPrMap = new Map();
  let totalPrs = 0;
  let totalMerged = 0;

  const repoPromises = OFFICIAL_REPOS.map(async (repo) => {
    const slug = repo.toLowerCase();
    const maxPages = slug.includes("truxify") || slug.includes("secureflow") ? 5 : 3;
    const pullsForRepo = [];

    for (let page = 1; page <= maxPages; page++) {
      try {
        const url = `https://api.github.com/repos/${repo}/pulls?state=closed&per_page=100&page=${page}&sort=updated&direction=desc`;
        const res = await fetch(url, { headers, signal: AbortSignal.timeout(10000) });
        if (!res.ok) break;
        const pulls = await res.json();
        if (!Array.isArray(pulls) || pulls.length === 0) break;
        pullsForRepo.push(...pulls);
        if (pulls.length < 100) break;
      } catch (err) {
        break;
      }
    }
    return { repo, slug, pulls: pullsForRepo };
  });

  const repoResults = await Promise.all(repoPromises);

  for (const { repo, slug, pulls } of repoResults) {
    totalPrs += pulls.length;
    let repoMerged = 0;
    for (const pr of pulls) {
      if (!pr.merged_at) continue;
      repoMerged++;
      totalMerged++;
      const author = normalizeHandle(pr.user?.login || "");
      if (!author || author.includes("[bot]") || author === "copilot") continue;

      const diff = detectDifficulty(pr);

      if (!contributorPrMap.has(author)) {
        contributorPrMap.set(author, []);
      }
      const list = contributorPrMap.get(author);
      if (!list.some((p) => p.repoSlug === slug && p.prNumber === pr.number)) {
        list.push({
          repoSlug: slug,
          prNumber: pr.number,
          difficulty: diff,
          points: DIFFICULTY_POINTS[diff],
        });
      }
    }
    console.log(`   ✓ ${repo.padEnd(35)} : ${pulls.length} closed, ${repoMerged} merged`);
  }

  // Deeper page search for major contributors
  const keySearchHandles = ["gauravkarakoti", "kanishjebamathewm", "aditya8369", "janvi-kapoor"];
  for (const h of keySearchHandles) {
    try {
      const q = encodeURIComponent(`is:pr is:merged author:${h} ${OFFICIAL_REPOS.map(r => `repo:${r}`).join(" ")}`);
      const sRes = await fetch(`https://api.github.com/search/issues?q=${q}&per_page=100`, { headers, signal: AbortSignal.timeout(10000) });
      if (sRes.ok) {
        const sData = await sRes.json();
        for (const item of sData.items || []) {
          const repoSlug = (item.repository_url || item.html_url || "").toLowerCase();
          const matchedSlug = OFFICIAL_REPOS.find(r => repoSlug.includes(r.toLowerCase()))?.toLowerCase();
          if (matchedSlug) {
            if (!contributorPrMap.has(h)) contributorPrMap.set(h, []);
            const list = contributorPrMap.get(h);
            if (!list.some(p => p.repoSlug === matchedSlug && p.prNumber === item.number)) {
              const diff = detectDifficulty(item);
              list.push({
                repoSlug: matchedSlug,
                prNumber: item.number,
                difficulty: diff,
                points: DIFFICULTY_POINTS[diff],
              });
            }
          }
        }
      }
    } catch {}
  }

  console.log(`-> Total PRs fetched: ${totalPrs} (${totalMerged} merged).`);
  console.log(`-> Unique author handles found: ${contributorPrMap.size}.`);

  // 2. Fetch all registered users from auth.users
  console.log("\n[2/5] Fetching all registered users from auth.users...");
  let page = 1;
  const allUsers = [];
  while (true) {
    const { data, error } = await admin.auth.admin.listUsers({ page, perPage: 1000 });
    if (error || !data?.users || data.users.length === 0) break;
    allUsers.push(...data.users);
    if (data.users.length < 1000) break;
    page++;
  }
  console.log(`-> Loaded ${allUsers.length} registered users from Supabase Auth.`);

  const knownLinks = {
    "aryankjsr@gmail.com": "arkrly",
  };

  const adminEmails = new Set([
    "sayanghosh1887@gmail.com",
    "sasayanghosh18877@gmail.com",
    (process.env.ADMIN_PORTAL_EMAIL || "").toLowerCase(),
  ].filter(Boolean));

  // 3. Process each user and deduplicate GitHub handles across accounts
  console.log("\n[3/5] Computing scores & resolving GitHub handle uniqueness...");

  // Sort users so that accounts with scores or earlier created_at come first
  allUsers.sort((a, b) => {
    const aScore = Number(a.user_metadata?.score || 0);
    const bScore = Number(b.user_metadata?.score || 0);
    if (bScore !== aScore) return bScore - aScore;
    return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
  });

  const usersToUpsert = [];
  const profilesToUpsert = [];
  const authUpdatesToRun = [];
  const scoredLeaderboard = [];
  const claimedGithubHandles = new Set();
  let totalPointsDistributed = 0;
  let totalPrsCounted = 0;

  for (const user of allUsers) {
    const meta = user.user_metadata || {};
    const identities = user.identities || [];
    const email = (user.email || meta.email || "").toLowerCase().trim();

    let fullName = meta.full_name || meta.name;
    if (!fullName && meta.given_name) {
      fullName = `${meta.given_name} ${meta.family_name || ""}`.trim();
    }
    if (!fullName) {
      fullName = email ? email.split("@")[0] : "Contributor";
    }

    const avatarUrl = meta.avatar_url || meta.picture || null;
    const isSuperAdmin = adminEmails.has(email);
    const role = isSuperAdmin ? "admin" : (meta.role || "contributor");
    const isAdmin = isSuperAdmin || Boolean(meta.is_admin || role === "admin" || role === "project-admin");

    // Resolve candidate GitHub handle
    const userHandles = new Set();
    if (meta.github) userHandles.add(normalizeHandle(meta.github));
    if (meta.user_name) userHandles.add(normalizeHandle(meta.user_name));
    if (meta.preferred_username) userHandles.add(normalizeHandle(meta.preferred_username));
    for (const id of identities) {
      if (id.provider === "github" && id.identity_data) {
        if (id.identity_data.user_name) userHandles.add(normalizeHandle(id.identity_data.user_name));
        if (id.identity_data.preferred_username) userHandles.add(normalizeHandle(id.identity_data.preferred_username));
      }
    }
    if (knownLinks[email]) {
      userHandles.add(normalizeHandle(knownLinks[email]));
    }

    let primaryHandle = Array.from(userHandles)[0] || null;

    // Enforce PostgreSQL UNIQUE constraint: only 1 profile can hold a given github handle
    if (primaryHandle) {
      if (claimedGithubHandles.has(primaryHandle)) {
        console.log(`   [Dedup] Duplicate GitHub handle @${primaryHandle} on ${email}. Kept on primary account, setting to null for secondary account.`);
        primaryHandle = null;
      } else {
        claimedGithubHandles.add(primaryHandle);
      }
    }

    // A. Row for public.users
    usersToUpsert.push({
      id: user.id,
      name: fullName,
      email: email || null,
      image: avatarUrl,
      created_at: user.created_at || new Date().toISOString(),
    });

    // B. Calculate scores strictly for this user's contributions in the 17 repos
    const userPrMap = new Map();
    if (role === "contributor" && !isAdmin && primaryHandle && contributorPrMap.has(primaryHandle)) {
      for (const pr of contributorPrMap.get(primaryHandle)) {
        const key = `${pr.repoSlug}#${pr.prNumber}`;
        if (!userPrMap.has(key)) {
          userPrMap.set(key, pr);
        }
      }
    }

    const prsList = Array.from(userPrMap.values());
    const computedScore = prsList.reduce((sum, p) => sum + p.points, 0);
    const computedPrs = prsList.length;
    const computedRepos = new Set(prsList.map((p) => p.repoSlug)).size;

    if (computedScore > 0) {
      totalPointsDistributed += computedScore;
      totalPrsCounted += computedPrs;
      scoredLeaderboard.push({
        name: fullName,
        email,
        github: primaryHandle,
        score: computedScore,
        prs: computedPrs,
        repos: computedRepos,
      });
    }

    // C. Row for public.profiles
    profilesToUpsert.push({
      user_id: user.id,
      full_name: fullName,
      avatar_url: avatarUrl,
      github: primaryHandle,
      role: role,
      score: computedScore,
      merged_prs: computedPrs,
      projects_count: computedRepos,
      badges_created: Number(meta.badges_created || 0),
    });

    // D. Only queue auth metadata updates if the score changed or contributor is active
    const metaHasChanged =
      meta.score !== computedScore ||
      meta.merged_prs !== computedPrs ||
      meta.projects_count !== computedRepos ||
      (primaryHandle && meta.github !== primaryHandle);

    if (metaHasChanged && (computedScore > 0 || (meta.score || 0) > 0)) {
      authUpdatesToRun.push({
        id: user.id,
        user_metadata: {
          ...meta,
          github: primaryHandle || meta.github || null,
          score: computedScore,
          merged_prs: computedPrs,
          projects_count: computedRepos,
          role: role,
        },
      });
    }
  }

  // 4. Batch Upserts into Database
  console.log(`\n[4/5] Executing high-speed batch database upserts...`);

  // A. Upsert public.users in chunks of 100
  const BATCH_SIZE = 100;
  for (let i = 0; i < usersToUpsert.length; i += BATCH_SIZE) {
    const chunk = usersToUpsert.slice(i, i + BATCH_SIZE);
    const { error: uErr } = await admin.from("users").upsert(chunk, { onConflict: "id" });
    if (uErr) console.warn(`Users chunk ${i}-${i + chunk.length} error:`, uErr.message);
  }
  console.log(`   ✓ Upserted ${usersToUpsert.length} records into public.users`);

  // B. Upsert public.profiles in chunks of 100
  for (let i = 0; i < profilesToUpsert.length; i += BATCH_SIZE) {
    const chunk = profilesToUpsert.slice(i, i + BATCH_SIZE);
    const { error: pErr } = await admin.from("profiles").upsert(chunk, { onConflict: "user_id" });
    if (pErr) console.warn(`Profiles chunk ${i}-${i + chunk.length} error:`, pErr.message);
  }
  console.log(`   ✓ Upserted ${profilesToUpsert.length} records into public.profiles`);

  // C. Update auth metadata for the active contributors
  console.log(`   ✓ Synchronizing auth metadata for ${authUpdatesToRun.length} active contributors...`);
  for (const item of authUpdatesToRun) {
    try {
      await admin.auth.admin.updateUserById(item.id, { user_metadata: item.user_metadata });
    } catch {}
  }

  // 5. Summary & Verification
  console.log("\n[5/5] Recalculation Results (Strictly 17 Competition Repositories):");
  scoredLeaderboard.sort((a, b) => b.score - a.score || b.prs - a.prs);

  console.log("-------------------------------------------------------------------------------------");
  console.log("RANK | CONTRIBUTOR NAME          | GITHUB HANDLE        | SCORE | PRS | REPOS | EMAIL");
  console.log("-------------------------------------------------------------------------------------");
  scoredLeaderboard.forEach((c, idx) => {
    const rank = String(idx + 1).padStart(4, " ");
    const name = c.name.padEnd(25, " ").slice(0, 25);
    const gh = `@${c.github || "none"}`.padEnd(20, " ").slice(0, 20);
    const score = String(c.score).padStart(5, " ");
    const prs = String(c.prs).padStart(3, " ");
    const repos = String(c.repos).padStart(5, " ");
    console.log(`${rank} | ${name} | ${gh} | ${score} | ${prs} | ${repos} | ${c.email}`);
  });
  console.log("-------------------------------------------------------------------------------------");
  console.log(`TOTALS: ${scoredLeaderboard.length} active contributors | ${totalPrsCounted} merged PRs | ${totalPointsDistributed} total points`);

  // 6. Verify direct Postgres query performance
  const dbTestStart = Date.now();
  const { data: dbCheck, count: dbCount, error: dbErr } = await admin
    .from("profiles")
    .select("id, user_id, full_name, github, role, score, merged_prs, projects_count, users!inner(email)", { count: "exact" })
    .order("score", { ascending: false })
    .range(0, 10);

  const dbDuration = Date.now() - dbTestStart;
  console.log(`\n-> Postgres verified in ${dbDuration}ms! Total profiles in DB: ${dbCount}`);
  if (dbErr) {
    console.error("Database query test error:", dbErr);
  } else if (dbCheck && dbCheck.length > 0) {
    console.log(`-> #1 Contributor in DB: ${dbCheck[0]?.full_name} (@${dbCheck[0]?.github}) with ${dbCheck[0]?.score} pts (${dbCheck[0]?.merged_prs} PRs)`);
  }

  const totalDuration = ((Date.now() - startTime) / 1000).toFixed(1);
  console.log(`\n===============================================================`);
  console.log(`✅ COMPLETED FULL RECALCULATION & BACKFILL IN ${totalDuration} SECONDS`);
  console.log(`===============================================================\n`);
}

main().catch(console.error);
