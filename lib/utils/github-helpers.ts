export type DifficultyLevel = "easy" | "medium" | "hard" | "expert";

export const DIFFICULTY_POINTS: Record<DifficultyLevel, number> = {
  easy: 10,
  medium: 20,
  hard: 30,
  expert: 50,
};

/** Points awarded to a project-admin for every OSCI'26-labelled PR they merge. */
export const MERGER_POINTS = 5;

export const DIFFICULTY_RANK: Record<DifficultyLevel, number> = {
  easy: 1,
  medium: 2,
  hard: 3,
  expert: 4,
};

/**
 * Official open source competition repository URLs.
 * Contributions are strictly calculated ONLY from PRs merged into these repositories.
 */
export const OFFICIAL_COMPETITION_REPOS = [
  "https://github.com/Sandesh13fr/TCalc",
  "https://github.com/SrishtiSonam/AtomicBinding",
  "https://github.com/JugaadLang/jugaadlang",
  "https://github.com/SoumyaMishra-7/WalletWise",
  "https://github.com/SrigadaAkshayKumar/stock",
  "https://github.com/Sushmitha-2007/Eco-vision",
  "https://github.com/KanishJebaMathewM/Truxify",
  "https://github.com/AdityaPainuli/clippings-vids",
  "https://github.com/l3tchupkt/adaptq",
  "https://github.com/SidakSethi-Singh/LawSathi-Rag",
  "https://github.com/logeshv586-code/AIproductfactory",
  "https://github.com/GauravKarakoti/Secureflow",
  "https://github.com/abhaycs24/CBSOT_SIP_PROJECT-1-",
  "https://github.com/pratyushjha06/Dockfleet",
  "https://github.com/aashutoshkumarbhardwaj/CreatorOs",
  "https://github.com/ItsVikasA/Innovision-Open-Source",
  "https://github.com/AseemPrasad/Air-Quality-Intelligence",
] as const;

/**
 * Normalized lowercase "owner/repo" slugs for all 17 official competition repositories.
 */
export const OFFICIAL_COMPETITION_REPO_SLUGS = new Set([
  "sandesh13fr/tcalc",
  "srishtisonam/atomicbinding",
  "jugaadlang/jugaadlang",
  "soumyamishra-7/walletwise",
  "srigadaakshaykumar/stock",
  "sushmitha-2007/eco-vision",
  "kanishjebamathewm/truxify",
  "adityapainuli/clippings-vids",
  "l3tchupkt/adaptq",
  "sidaksethi-singh/lawsathi-rag",
  "logeshv586-code/aiproductfactory",
  "gauravkarakoti/secureflow",
  "abhaycs24/cbsot_sip_project-1-",
  "pratyushjha06/dockfleet",
  "aashutoshkumarbhardwaj/creatoros",
  "itsvikasa/innovision-open-source",
  "aseemprasad/air-quality-intelligence",
]);

/**
 * Validates whether a given repo slug or URL is an official competition repository.
 */
export function isAllowedCompetitionRepo(repoSlugOrUrl?: string | null): boolean {
  if (!repoSlugOrUrl) return false;
  const slug = extractRepoSlug(repoSlugOrUrl);
  return Boolean(slug && OFFICIAL_COMPETITION_REPO_SLUGS.has(slug));
}

/**
 * Normalizes a GitHub handle or URL into a clean username
 */
export function normalizeGitHubHandle(handle: string): string {
  if (!handle) return "";
  return handle
    .trim()
    .replace(/^@+/, "")
    .replace(/^https?:\/\/github\.com\//i, "")
    .replace(/\/+$/, "")
    .trim();
}

/**
 * Returns whether an issue or PR has the official competition label (OSCI'26 / OSCI26).
 */
export function hasOsci26Label(item?: { labels?: Array<{ name: string } | string> } | null): boolean {
  if (!item) return false;
  const labels = item.labels || [];
  return labels.some((l) => {
    const name = (typeof l === "string" ? l : l.name || "").toLowerCase().trim();
    return /osci[- ']?26|osci[- ']?2026/i.test(name);
  });
}

/**
 * Detects difficulty level from labels, title, and body.
 * Prioritizes maintainer labels first, then explicit tags in titles or bodies.
 */
export function detectDifficulty(item: { title?: string; body?: string | null; labels?: Array<{ name: string } | string> }): DifficultyLevel {
  const labelNames = (item.labels || [])
    .map((l) => (typeof l === "string" ? l : l.name || "").toLowerCase())
    .join(" ");

  // 1. Expert / Level 4 (50 pts)
  if (
    /expert|level[- :_]?4\b|lvl[- :_]?4\b|level4|lvl4|difficulty[- :_]+expert/i.test(labelNames)
  ) {
    return "expert";
  }

  // 2. Hard / Level 3 (30 pts)
  if (
    /hard\b|difficulty[- :_]+hard|level[- :_]?3\b|lvl[- :_]?3\b|level3|lvl3|advanced|complex/i.test(labelNames)
  ) {
    return "hard";
  }

  // 3. Medium / Level 2 (20 pts)
  if (
    /medium|med\b|intermediate|mid\b|difficulty[- :_]+medium|level[- :_]?2\b|lvl[- :_]?2\b|level2|lvl2/i.test(labelNames)
  ) {
    return "medium";
  }

  // 4. Easy / Level 1 (10 pts)
  if (
    /easy|beginner|starter|good[ -]?first[ -]?issue|difficulty[- :_]+easy|level[- :_]?1\b|lvl[- :_]?1\b|level1|lvl1/i.test(labelNames)
  ) {
    return "easy";
  }

  // Check title & body
  const fullText = `${item.title || ""} ${item.body || ""}`.toLowerCase();
  if (/\[expert\]|\(expert\)|level[- :_]?4\b|lvl[- :_]?4\b|level4|lvl4|difficulty:\s*expert/i.test(fullText)) {
    return "expert";
  }
  if (/\[hard\]|\(hard\)|level[- :_]?3\b|lvl[- :_]?3\b|level3|lvl3|difficulty:\s*hard|\bhard\b/i.test(fullText)) {
    return "hard";
  }
  if (/\[medium\]|\(medium\)|\[med\]|\(med\)|level[- :_]?2\b|lvl[- :_]?2\b|level2|lvl2|difficulty:\s*medium|\bmedium\b/i.test(fullText)) {
    return "medium";
  }
  if (/\[easy\]|\(easy\)|level[- :_]?1\b|lvl[- :_]?1\b|level1|lvl1|good[ -]?first[ -]?issue|difficulty:\s*easy|\beasy\b/i.test(fullText)) {
    return "easy";
  }

  return "easy";
}

/**
 * Extracts linked issue numbers from PR title or description (e.g., Fixes #123, Closes #45)
 */
export function extractLinkedIssueNumbers(text?: string | null): number[] {
  if (!text) return [];
  const regex = /(?:close[sd]?|fix(?:e[sd])?|resolve[sd]?)\s+#(\d+)/gi;
  const numbers: number[] = [];
  let match;
  while ((match = regex.exec(text)) !== null) {
    const num = parseInt(match[1], 10);
    if (!isNaN(num) && !numbers.includes(num)) {
      numbers.push(num);
    }
  }
  return numbers;
}

/**
 * Extracts a normalized "owner/repo" slug from a GitHub URL or string.
 * Supports:
 * - https://api.github.com/repos/owner/repo
 * - https://github.com/owner/repo
 * - https://github.com/owner/repo/pull/123
 * - owner/repo
 */
export function extractRepoSlug(urlOrSlug?: string | null): string | null {
  if (!urlOrSlug) return null;
  const trimmed = urlOrSlug.trim();
  if (!trimmed || trimmed === "#") return null;

  // 1. Match api.github.com/repos/owner/repo
  const apiMatch = trimmed.match(/api\.github\.com\/repos\/([^\/\s#?]+)\/([^\/\s#?]+)/i);
  if (apiMatch) {
    const owner = apiMatch[1];
    const repo = apiMatch[2].replace(/\.git$/i, "").replace(/\/+$/, "");
    return `${owner}/${repo}`.toLowerCase();
  }

  // 2. Match github.com/owner/repo (ignoring sub-paths like /pull/..., /issues/...)
  const webMatch = trimmed.match(/github\.com\/([^\/\s#?]+)\/([^\/\s#?]+)/i);
  if (webMatch) {
    const owner = webMatch[1];
    if (!["orgs", "users", "search", "settings", "repos"].includes(owner.toLowerCase())) {
      const repo = webMatch[2].replace(/\.git$/i, "").replace(/\/+$/, "");
      return `${owner}/${repo}`.toLowerCase();
    }
  }

  // 3. Match raw "owner/repo"
  const clean = trimmed.replace(/^@+/, "").replace(/\.git$/i, "").replace(/\/+$/, "");
  const parts = clean.split("/").filter(Boolean);
  if (parts.length === 2 && !parts[0].includes(":") && !parts[1].includes(":")) {
    return `${parts[0]}/${parts[1]}`.toLowerCase();
  }

  return null;
}

// Module-level token pool for round-robin rotation across multiple GitHub PATs
let cachedTokenPool: string[] | null = null;
let tokenRotationIndex = 0;

export function getTokenPool(): string[] {
  if (cachedTokenPool !== null) {
    return cachedTokenPool;
  }
  const pool: string[] = [];
  for (let i = 1; i <= 5; i++) {
    const t = process.env[`GITHUB_ACCESS_TOKEN_${i}`]?.trim();
    if (t && !pool.includes(t)) pool.push(t);
  }
  const legacy = (process.env.GITHUB_ACCESS_TOKEN || process.env.GITHUB_PAT)?.trim();
  if (legacy && !pool.includes(legacy)) pool.push(legacy);

  cachedTokenPool = pool;
  return pool;
}

/**
 * Returns GitHub API headers with optimal rate-limiting:
 * Prioritizes a round-robin token pool (GITHUB_ACCESS_TOKEN_1..5, GITHUB_ACCESS_TOKEN/PAT)
 * to multiply the 5,000 req/hr API quota across available tokens.
 * Falls back automatically to GitHub OAuth App Basic Auth (AUTH_GITHUB_ID/SECRET).
 */
export function getGitHubAuthHeaders(): Record<string, string> {
  const pool = getTokenPool();
  const headers: Record<string, string> = {
    Accept: "application/vnd.github.v3+json",
    "User-Agent": "OSC-India-Sync-Engine",
  };

  if (pool.length > 0) {
    const token = pool[tokenRotationIndex % pool.length];
    tokenRotationIndex = (tokenRotationIndex + 1) % pool.length;
    headers.Authorization = `Bearer ${token}`;
  } else {
    const clientId = process.env.GITHUB_ID || process.env.AUTH_GITHUB_ID;
    const clientSecret = process.env.GITHUB_SECRET || process.env.AUTH_GITHUB_SECRET;
    if (clientId && clientSecret) {
      headers.Authorization = `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString("base64")}`;
    }
  }
  return headers;
}
