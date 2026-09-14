/**
 * Standalone GitHub Sync Debugger Script
 * Usage: npx tsx scripts/debug-sync.ts <github_username>
 */

import { getDbAllowedRepoSlugs } from "../lib/actions/projects";
import {
  normalizeGitHubHandle,
  detectDifficulty,
  extractLinkedIssueNumbers,
  DIFFICULTY_POINTS,
  DifficultyLevel,
} from "../lib/utils/github-helpers";

async function run() {
  const username = process.argv[2];
  if (!username) {
    console.error("❌ Please provide a GitHub username:\n  npx tsx scripts/debug-sync.ts <username>");
    process.exit(1);
  }

  const handle = normalizeGitHubHandle(username);
  console.log(`\n🔍 Debugging GitHub Sync for handle: "${handle}"`);

  const allowedRepos = await getDbAllowedRepoSlugs();
  console.log(`📋 Tracked Database Projects (${allowedRepos.size}):`);
  allowedRepos.forEach((repo: string) => console.log(`   - ${repo}`));

  const token = process.env.GITHUB_ACCESS_TOKEN || process.env.GITHUB_PAT;
  const headers: Record<string, string> = {
    Accept: "application/vnd.github.v3+json",
    "User-Agent": "OSC-India-Debug-Sync",
  };
  if (token) {
    headers.Authorization = `Bearer ${token}`;
    console.log(`🔑 Using authenticated GitHub Token (High Rate Limit)`);
  } else {
    console.warn(`⚠️ No GITHUB_ACCESS_TOKEN found in environment. Using unauthenticated requests.`);
  }

  // 1. Fetch merged PRs
  const prQuery = encodeURIComponent(`author:${handle} type:pr is:merged`);
  const prUrl = `https://api.github.com/search/issues?q=${prQuery}&per_page=100`;
  console.log(`\n📡 Fetching PRs from: ${prUrl}`);
  const prRes = await fetch(prUrl, { headers });

  if (!prRes.ok) {
    console.error(`❌ GitHub Search Error (${prRes.status}):`, await prRes.text());
    process.exit(1);
  }

  const prData = await prRes.json();
  const prItems = prData.items || [];
  console.log(`✅ Found ${prItems.length} total closed PRs authored by @${handle}`);

  // 2. Fetch closed issues
  const issueQuery = encodeURIComponent(`assignee:${handle} type:issue is:closed`);
  const issueRes = await fetch(`https://api.github.com/search/issues?q=${issueQuery}&per_page=100`, { headers });
  const issueData = issueRes.ok ? await issueRes.json() : { items: [] };
  const issueItems = issueData.items || [];
  console.log(`✅ Found ${issueItems.length} closed assigned issues`);

  const issuesMap = new Map<string, any>();
  for (const issue of issueItems) {
    const slug = issue.repository_url.replace("https://api.github.com/repos/", "").toLowerCase();
    issuesMap.set(`${slug}#${issue.number}`, issue);
  }

  // 3. Filter & calculate scores
  let totalScore = 0;
  const validPRs: any[] = [];
  const contributedRepos = new Set<string>();

  for (const pr of prItems) {
    const repoSlug = pr.repository_url.replace("https://api.github.com/repos/", "").toLowerCase();
    if (!allowedRepos.has(repoSlug)) {
      continue;
    }

    let difficulty: DifficultyLevel = detectDifficulty(pr);
    const linkedNumbers = extractLinkedIssueNumbers(`${pr.title} ${pr.body || ""}`);
    
    let inherited = false;
    for (const num of linkedNumbers) {
      const linked = issuesMap.get(`${repoSlug}#${num}`);
      if (linked) {
        const issueDiff = detectDifficulty(linked);
        const rankMap = { easy: 1, medium: 2, hard: 3, expert: 4 };
        if (rankMap[issueDiff] > rankMap[difficulty]) {
          difficulty = issueDiff;
          inherited = true;
        }
      }
    }

    const points = DIFFICULTY_POINTS[difficulty];
    totalScore += points;
    contributedRepos.add(repoSlug);
    validPRs.push({
      repo: repoSlug,
      title: pr.title,
      number: pr.number,
      difficulty,
      inherited,
      points,
      url: pr.html_url,
    });
  }

  console.log("\n=======================================================");
  console.log(`🎯 SYNC RESULTS FOR @${handle}:`);
  console.log(`   - Eligible Competition PRs: ${validPRs.length}`);
  console.log(`   - Unique Projects: ${contributedRepos.size}`);
  console.log(`   - Total Calculated Score: ${totalScore} pts`);
  console.log("=======================================================");

  validPRs.forEach((pr, idx) => {
    console.log(`\n[${idx + 1}] ${pr.repo} #${pr.number}: "${pr.title}"`);
    console.log(`    Difficulty: ${pr.difficulty.toUpperCase()} (${pr.points} pts) ${pr.inherited ? "[Inherited from Issue]" : ""}`);
    console.log(`    Link: ${pr.url}`);
  });
}

run().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
