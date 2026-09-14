"use server";

import fs from "fs";
import path from "path";
import { revalidatePath } from "next/cache";
import { createAdminClient } from "@/lib/supabase/admin";
import { verifyAdminSession } from "@/lib/auth/admin-auth";
import { createClient } from "@/lib/supabase/server";
import { extractRepoSlug, OFFICIAL_COMPETITION_REPO_SLUGS, getGitHubAuthHeaders } from "@/lib/utils/github-helpers";

export interface ProjectItem {
  id: string;
  title: string;
  description: string;
  githubUrl: string;
  language: string;
  accentColor: string;
  stars?: string;
  forks?: string;
  openIssues?: string;
  unassignedIssues?: string;
  created_at?: string;
}

export interface NewProjectInput {
  title: string;
  description?: string;
  githubUrl: string;
  language?: string;
  accentColor?: string;
  stars?: string;
  forks?: string;
}

const DEFAULT_PROJECTS: ProjectItem[] = [
  {
    id: "662dbbb3-6e77-42ef-99af-57273a1c36e1",
    title: "Truxify – Broker-Free Freight Marketplace",
    description: "Truxify is an open-source, broker-free freight marketplace connecting manufacturers directly with truck drivers. It addresses broker commissions, empty return trips, inefficient truck discovery, payment delays, and limited shipment visibility through ML-powered matching, route optimization, live tracking, blockchain-based escrow, voice AI, and automation.",
    githubUrl: "https://github.com/KanishJebaMathewM/Truxify",
    language: "Flutter",
    accentColor: "#FF7518",
    stars: "23",
    forks: "113",
  },
  {
    id: "ce0a4ddd-a220-4f05-bf3a-24b949761c40",
    title: "Customer Segmentation and Churn Prediction",
    description: "An end-to-end Machine Learning and Predictive Analytics pipeline that identifies customer behavior patterns and predicts churn risks. It uses K-Means clustering for customer segmentation and a Random Forest classifier for churn prediction, with model optimization and evaluation using ROC-AUC and confusion matrix analysis.",
    githubUrl: "https://github.com/abhaycs24/CBSOT_SIP_PROJECT-1-",
    language: "Python",
    accentColor: "#3b82f6",
    stars: "0",
    forks: "0",
  },
  {
    id: "7c93a1c9-b8f4-4bce-ba8b-a18032728165",
    title: "AdapTQ",
    description: "AdapTQ is a production-grade C++17 KV cache quantization engine for Large Language Model inference on edge and memory-constrained systems.",
    githubUrl: "https://github.com/l3tchupkt/adaptq",
    language: "C++",
    accentColor: "#a855f7",
    stars: "3",
    forks: "0",
  },
  {
    id: "775d868d-332d-42c8-ad8d-a5c0f7041464",
    title: "Bolcap",
    description: "Bolcap is an AI-powered video captioning system featuring viral-moment clipping and a Hinglish caption engine. It uses Whisper for word-level transcription, natural Hinglish romanization, customizable animated captions, and exports burned MP4 or alpha-overlay MOV files.",
    githubUrl: "https://github.com/AdityaPainuli/clippings-vids",
    language: "Python",
    accentColor: "#ef4444",
    stars: "0",
    forks: "0",
  },
  {
    id: "f6cc1cbd-b614-4415-9abb-c5316d3b95ff",
    title: "Air Quality Intelligence Platform",
    description: "A local-first, open-source data engineering and analytics platform for real-time air-quality monitoring, anomaly detection, and near-term PM2.5 forecasting. It ingests data from OpenAQ and Open-Meteo, validates and processes sensor data, detects pollution anomalies, trains forecasting models, and provides results through an API and interactive dashboard.",
    githubUrl: "https://github.com/AseemPrasad/Air-Quality-Intelligence",
    language: "Python",
    accentColor: "#10b981",
    stars: "0",
    forks: "0",
  },
  {
    id: "585baad7-e2ca-46aa-bc1d-12d1040abb9e",
    title: "EcoVision",
    description: "EcoVision is an AI-based environmental monitoring project that uses computer vision and data analysis to identify waste, monitor environmental conditions, and promote proper waste management. It aims to support cleaner surroundings through smart, technology-driven environmental solutions.",
    githubUrl: "https://github.com/Sushmitha-2007/Eco-vision",
    language: "Python",
    accentColor: "#22c55e",
    stars: "1",
    forks: "0",
  },
  {
    id: "9f889e2e-df21-4901-b349-cde7943b689d",
    title: "SecureFlow",
    description: "SecureFlow integrates with GitHub through a GitHub App and webhooks to analyze pull requests for security issues. Its AI engine uses Groq's Llama 3.1 to analyze code diffs and provide security findings, explanations, and remediation steps through a centralized dashboard.",
    githubUrl: "https://github.com/GauravKarakoti/Secureflow",
    language: "TypeScript",
    accentColor: "#6366f1",
    stars: "4",
    forks: "45",
  },
  {
    id: "86052217-73a6-4f0a-80b1-3288fd3e4388",
    title: "LawSaathi-RAG",
    description: "LawSaathi-RAG benchmarks different Retrieval-Augmented Generation architectures for Indian legal question answering. It evaluates retrieval approaches such as BM25 and dense retrieval to determine their effectiveness for Indian legal document QA, with reproducible code, datasets, and evaluation results.",
    githubUrl: "https://github.com/SidakSethi-Singh/LawSathi-Rag",
    language: "Python",
    accentColor: "#eab308",
    stars: "1",
    forks: "0",
  },
  {
    id: "89e45dfc-04fa-4f20-8686-ced183db0de4",
    title: "AI Product Factory",
    description: "AI Product Factory is an open-source agentic platform that helps developers and non-technical founders transform product ideas into implementation-ready software projects. It connects AI models, generates evidence-backed plans, designs architectures, and coordinates specialized AI agents to generate, test, and improve applications.",
    githubUrl: "https://github.com/logeshv586-code/AIproductfactory",
    language: "TypeScript",
    accentColor: "#ec4899",
    stars: "0",
    forks: "0",
  },
  {
    id: "f61fb2ac-2858-4965-a3c6-e24ee653384b",
    title: "InnoVision",
    description: "InnoVision is an AI-powered learning platform that dynamically generates structured and engaging courses from any topic. It aims to overcome limitations of traditional courses by providing a flexible and adaptive learning experience powered by AI and machine learning.",
    githubUrl: "https://github.com/ItsVikasA/Innovision-Open-Source",
    language: "JavaScript",
    accentColor: "#38bdf8",
    stars: "0",
    forks: "1",
  },
  {
    id: "db1a69c6-e71d-4ba8-87ff-922af70bc5bc",
    title: "CreatorOS",
    description: "CreatorOS is an open-source all-in-one dashboard for creators to manage their business from a single platform. It combines bio links, DM automation, CRM, analytics, and content planning, reducing the need to use multiple separate creator tools.",
    githubUrl: "https://github.com/aashutoshkumarbhardwaj/CreatorOs",
    language: "JavaScript",
    accentColor: "#f43f5e",
    stars: "28",
    forks: "54",
  },
  {
    id: "28593cc9-2bda-4cab-b139-9c748ffcd434",
    title: "JugaadLang",
    description: "JugaadLang is a modern programming language designed with Hindi keywords for Indian developers. It provides an alternative programming experience where developers can write code using familiar Hindi terminology.",
    githubUrl: "https://github.com/JugaadLang/jugaadlang",
    language: "Python",
    accentColor: "#f97316",
    stars: "10",
    forks: "21",
  },
  {
    id: "513cc16c-ecb2-4723-84a8-ed66f217aaf8",
    title: "AI Stock Analyzer",
    description: "A web-based stock analysis application built with React and Flask. It provides interactive stock visualizations and uses machine learning-based techniques for stock price prediction and analysis.",
    githubUrl: "https://github.com/SrigadaAkshayKumar/stock",
    language: "Python",
    accentColor: "#14b8a6",
    stars: "32",
    forks: "89",
  },
  {
    id: "3a31685f-daff-4b73-aaa2-817c2abda189",
    title: "WalletWise",
    description: "WalletWise is a comprehensive financial guidance platform designed to help students, early-career professionals, and other users manage their finances. Beyond basic expense tracking, it combines behavioral insights, predictive analytics, and real-time financial advisory features to help users make better financial decisions.",
    githubUrl: "https://github.com/SoumyaMishra-7/WalletWise",
    language: "JavaScript",
    accentColor: "#10b981",
    stars: "17",
    forks: "59",
  },
  {
    id: "d77fa34f-61da-44b5-828b-c4da597f9c3a",
    title: "Dockfleet",
    description: "Dockfleet is a free and open-source, local-first orchestration tool that helps solo developers and small teams run and manage multiple projects on a single machine or VPS using Docker containers.",
    githubUrl: "https://github.com/pratyushjha06/Dockfleet",
    language: "Python",
    accentColor: "#0284c7",
    stars: "8",
    forks: "3",
  },
  {
    id: "103bf228-a981-40d3-98dd-19ff4da0fda8",
    title: "TCalc — AI Coding Context & Token Intelligence Toolkit",
    description: "TCalc is an open-source, local-first developer toolkit for understanding and optimizing AI coding context and token usage. It analyzes repositories, estimates token consumption, identifies token-heavy files, recommends AI models, estimates context fit and cost, generates repository maps, and integrates with tools such as Cursor, Claude Code, Continue, Cline, Roo, and MCP-compatible clients while keeping source code local.",
    githubUrl: "https://github.com/Sandesh13fr/TCalc",
    language: "TypeScript",
    accentColor: "#8b5cf6",
    stars: "1",
    forks: "0",
  },
  {
    id: "114895df-f5da-4eea-b3f6-00c5c27f9e72",
    title: "AtomicBinding",
    description: "AtomicBinding is a dual-source content platform where documentation lives in Git while application content is managed through a custom CMS. Both sources are normalized into a single typed content graph consumed by one frontend, with six build gates providing validation and quality control between the content graph and production.",
    githubUrl: "https://github.com/SrishtiSonam/AtomicBinding",
    language: "TypeScript",
    accentColor: "#06b6d4",
    stars: "0",
    forks: "0",
  },
];

const LOCAL_STORAGE_FILE = path.join(process.cwd(), "data", "custom-projects.json");

function readLocalCustomProjects(): ProjectItem[] {
  try {
    if (fs.existsSync(LOCAL_STORAGE_FILE)) {
      const raw = fs.readFileSync(LOCAL_STORAGE_FILE, "utf-8");
      return JSON.parse(raw) as ProjectItem[];
    }
  } catch (err) {
    console.error("Error reading custom projects file:", err);
  }
  return [];
}

function writeLocalCustomProjects(projects: ProjectItem[]): void {
  try {
    const dir = path.dirname(LOCAL_STORAGE_FILE);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(LOCAL_STORAGE_FILE, JSON.stringify(projects, null, 2), "utf-8");
  } catch (err) {
    console.error("Error writing custom projects file:", err);
  }
}

/**
 * Validates admin permissions for project modifications.
 */
async function checkAdminAuth(): Promise<boolean> {
  const isAdminSession = await verifyAdminSession();
  if (isAdminSession) return true;

  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return false;

    const admin = createAdminClient();
    const { data: profile } = await admin
      .from("profiles")
      .select("role")
      .eq("user_id", user.id)
      .maybeSingle();

    return Boolean(profile && (profile.role === "admin" || profile.role === "project-admin"));
  } catch {
    return false;
  }
}

interface DbProjectRow {
  id: string | number;
  name?: string;
  title?: string;
  description?: string | null;
  github_repo_url?: string | null;
  github_url?: string | null;
  githubUrl?: string | null;
  language?: string | null;
  accent_color?: string | null;
  accentColor?: string | null;
  stars?: string | number | null;
  forks?: string | number | null;
  created_at?: string;
}

/**
 * Parses a database row from public.projects into a clean ProjectItem.
 * Extracts title from `name`, repo from `github_repo_url`, and extra metadata from embedded comment or columns.
 */
function parseProjectFromDb(row: DbProjectRow): ProjectItem {
  let cleanDesc = row.description || "";
  let language = "TypeScript";
  let accentColor = "#FF7518";
  let stars = "0";
  let forks = "0";
  let openIssues = "0";
  let unassignedIssues = "0";

  if (row.language) language = row.language;
  if (row.accent_color || row.accentColor) accentColor = row.accent_color || row.accentColor || "#FF7518";
  if (row.stars) stars = String(row.stars);
  if (row.forks) forks = String(row.forks);

  const metaMatch = cleanDesc.match(/<!--meta:(.*?)-->/);
  if (metaMatch) {
    try {
      const parsed = JSON.parse(metaMatch[1]);
      if (parsed.language) language = parsed.language;
      if (parsed.accentColor) accentColor = parsed.accentColor;
      if (parsed.stars) stars = String(parsed.stars);
      if (parsed.forks) forks = String(parsed.forks);
      if (parsed.openIssues !== undefined) openIssues = String(parsed.openIssues);
      if (parsed.unassignedIssues !== undefined) unassignedIssues = String(parsed.unassignedIssues);
      cleanDesc = cleanDesc.replace(/<!--meta:(.*?)-->/, "").trim();
    } catch {
      // ignore parse error
    }
  }

  return {
    id: String(row.id),
    title: row.name || row.title || "Project",
    description: cleanDesc,
    githubUrl: row.github_repo_url || row.github_url || row.githubUrl || "#",
    language,
    accentColor,
    stars,
    forks,
    openIssues,
    unassignedIssues,
    created_at: row.created_at,
  };
}

/**
 * Fetches all active projects directly from the Supabase database.
 * When DB is reachable, it is the single source of truth (including an empty list).
 */
export async function getProjects(): Promise<ProjectItem[]> {
  try {
    const admin = createAdminClient();
    const { data, error } = await admin
      .from("projects")
      .select("*");

    // When the database query succeeds (error is null and data is an array):
    // Even if data is empty ([]), that is the database reality (e.g. all projects were deleted).
    if (!error && Array.isArray(data)) {
      const projects = data.map(parseProjectFromDb);
      // Synchronize local cache to mirror database state exactly
      writeLocalCustomProjects(projects);
      return projects;
    }

    if (error) {
      console.warn("Supabase notice when querying projects table:", error.message);
    }
  } catch (err) {
    console.warn("Notice: reading projects table from Supabase failed:", err);
  }

  // Fallback to local store ONLY if the database connection / network failed
  const localProjects = readLocalCustomProjects();
  if (localProjects.length > 0) {
    return localProjects;
  }

  return DEFAULT_PROJECTS;
}

// Module-level cache for repo slugs (10-minute TTL to prevent repeated DB reads during high sync volume)
let _slugCache: Set<string> | null = null;
let _slugCacheAt = 0;
const SLUG_CACHE_TTL_MS = 10 * 60 * 1000;

export async function invalidateSlugCache(): Promise<void> {
  _slugCache = null;
  _slugCacheAt = 0;
}

/**
 * Fetches the set of allowed GitHub repository slugs directly from the active projects.
 * Guarantees 100% parity with the projects displayed in the /projects section.
 * PRs will ONLY be accepted if their repository slug is present in this set.
 */
export async function getDbAllowedRepoSlugs(): Promise<Set<string>> {
  if (_slugCache && Date.now() - _slugCacheAt < SLUG_CACHE_TTL_MS) {
    return _slugCache;
  }

  // Always include the exact official 17 competition repositories
  const allowed = new Set<string>(OFFICIAL_COMPETITION_REPO_SLUGS);
  try {
    const projects = await getProjects();
    for (const p of projects) {
      const slug = extractRepoSlug(p.githubUrl);
      if (slug) {
        allowed.add(slug.toLowerCase());
      }
    }
  } catch (err) {
    console.warn("Exception deriving allowed slugs from getProjects:", err);
  }

  _slugCache = allowed;
  _slugCacheAt = Date.now();
  return allowed;
}

export interface DiscoveredProjectResult {
  success: boolean;
  topic: string;
  totalFound: number;
  addedCount: number;
  updatedCount: number;
  projects: ProjectItem[];
  error?: string;
}

const LANGUAGE_COLORS: Record<string, string> = {
  TypeScript: "#3178c6",
  JavaScript: "#f7df1e",
  Python: "#3b82f6",
  Rust: "#dea584",
  Go: "#00add8",
  Java: "#b07219",
  "C++": "#a855f7",
  C: "#555555",
  Dart: "#00b4ab",
  Flutter: "#FF7518",
  Kotlin: "#a97bff",
  Swift: "#f05138",
  Ruby: "#701516",
  PHP: "#4f5d95",
  HTML: "#e34c26",
  CSS: "#563d7c",
};

interface GitHubSearchRepoItem {
  id: number;
  name: string;
  full_name: string;
  html_url: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  topics?: string[];
  owner?: {
    login: string;
    type?: string;
    avatar_url?: string;
  };
}

// In-memory discovery cache with 30-minute TTL to protect GitHub Search API limits (30 req/min)
let _discoveryCache: { timestamp: number; topic: string; result: DiscoveredProjectResult } | null = null;
const DISCOVERY_CACHE_TTL_MS = 30 * 60 * 1000;

/**
 * Discovers and ingests participating repositories dynamically using GitHub's Search API.
 * Maintainers simply add the topic tag (default: 'osci-2026') to their repository settings.
 *
 * Query format: topic:{topic} fork:false
 * Auto-upserts newly discovered repositories into public.projects and synchronizes the local cache.
 */
export async function discoverProjectsByTopic(
  topic = "osci-2026",
  forceRefresh = false
): Promise<DiscoveredProjectResult> {
  const cleanTopic = topic.trim().toLowerCase().replace(/^#/, "");

  if (
    !forceRefresh &&
    _discoveryCache &&
    _discoveryCache.topic === cleanTopic &&
    Date.now() - _discoveryCache.timestamp < DISCOVERY_CACHE_TTL_MS
  ) {
    return _discoveryCache.result;
  }

  const headers = getGitHubAuthHeaders();
  const searchUrl = `https://api.github.com/search/repositories?q=topic:${encodeURIComponent(cleanTopic)}+fork:false&sort=updated&order=desc&per_page=100`;

  let githubItems: GitHubSearchRepoItem[] = [];

  try {
    const res = await fetch(searchUrl, {
      headers,
      next: { revalidate: 0 },
    });

    if (!res.ok) {
      const errText = await res.text().catch(() => "");
      console.warn(`Notice: GitHub repository search for topic "${cleanTopic}" failed (${res.status}): ${errText}`);
      const fallbackProjects = await getProjects();
      const failResult: DiscoveredProjectResult = {
        success: false,
        topic: cleanTopic,
        totalFound: 0,
        addedCount: 0,
        updatedCount: 0,
        projects: fallbackProjects,
        error: `GitHub API error (${res.status}): ${res.statusText}`,
      };
      return failResult;
    }

    const data = await res.json();
    if (Array.isArray(data.items)) {
      githubItems = data.items;
    }
  } catch (err: unknown) {
    console.warn("Notice: Exception querying GitHub Search API for topic repos:", err);
    const fallbackProjects = await getProjects();
    return {
      success: false,
      topic: cleanTopic,
      totalFound: 0,
      addedCount: 0,
      updatedCount: 0,
      projects: fallbackProjects,
      error: err instanceof Error ? err.message : "Search API request failed",
    };
  }

  let addedCount = 0;
  let updatedCount = 0;

  try {
    const admin = createAdminClient();

    // Fetch existing projects from database to match by repo slug
    const { data: dbRows, error: dbErr } = await admin
      .from("projects")
      .select("*");

    if (dbErr) {
      console.warn("Notice: Querying projects for topic discovery:", dbErr.message);
    }

    const existingBySlug = new Map<string, DbProjectRow>();
    for (const row of (dbRows as DbProjectRow[]) || []) {
      const slug = extractRepoSlug(row.github_repo_url || row.github_url || row.githubUrl);
      if (slug) {
        existingBySlug.set(slug, row);
      }
    }

    const newProjectsToInsert: Array<{
      name: string;
      github_repo_url: string;
      description: string;
    }> = [];

    for (const item of githubItems) {
      const slug = extractRepoSlug(item.html_url);
      if (!slug) continue;

      const lang = item.language || "TypeScript";
      const accentColor = LANGUAGE_COLORS[lang] || "#FF7518";
      const stars = String(item.stargazers_count ?? 0);
      const forks = String(item.forks_count ?? 0);
      const rawDesc = item.description || "Community open source project participating in OSC India.";
      const metaPayload = {
        language: lang,
        accentColor,
        stars,
        forks,
      };
      const dbDescription = `${rawDesc.trim()}\n<!--meta:${JSON.stringify(metaPayload)}-->`;

      if (!existingBySlug.has(slug)) {
        // New project discovered!
        newProjectsToInsert.push({
          name: item.name,
          github_repo_url: item.html_url,
          description: dbDescription,
        });
        addedCount++;
      } else {
        // Existing project: update stars/forks if changed
        const existing = existingBySlug.get(slug)!;
        const currentMeta = parseProjectFromDb(existing);
        if (currentMeta.stars !== stars || currentMeta.forks !== forks) {
          try {
            await admin
              .from("projects")
              .update({ description: dbDescription, updated_at: new Date().toISOString() })
              .eq("id", existing.id);
            updatedCount++;
          } catch {
            // Non-critical update
          }
        }
      }
    }

    if (newProjectsToInsert.length > 0) {
      const { error: insertErr } = await admin
        .from("projects")
        .insert(newProjectsToInsert);

      if (insertErr) {
        console.warn("Notice: Inserting discovered projects:", insertErr.message);
      }
    }

    // Invalidate caches so callers get fresh allowed repo slugs and project lists
    await invalidateSlugCache();
  } catch (syncErr) {
    console.warn("Notice: Ingesting discovered projects to Supabase:", syncErr);
  }

  const allProjects = await getProjects();

  // Revalidate public pages
  try {
    revalidatePath("/projects");
    revalidatePath("/admin");
  } catch {}

  const finalResult: DiscoveredProjectResult = {
    success: true,
    topic: cleanTopic,
    totalFound: githubItems.length,
    addedCount,
    updatedCount,
    projects: allProjects,
  };

  _discoveryCache = {
    timestamp: Date.now(),
    topic: cleanTopic,
    result: finalResult,
  };

  return finalResult;
}

/**
 * Creates and registers a new project directly in the Supabase database.
 * Syncs with local JSON cache and automatically triggers page revalidation.
 */
export async function createProjectAction(
  input: NewProjectInput
): Promise<{ success: boolean; project?: ProjectItem; error?: string }> {
  const isAuthorized = await checkAdminAuth();
  if (!isAuthorized) {
    return { success: false, error: "Unauthorized. Admin credentials required to add projects." };
  }

  if (!input.title || !input.title.trim()) {
    return { success: false, error: "Project title is required." };
  }

  let cleanGithub = (input.githubUrl || "").trim();
  if (cleanGithub && !cleanGithub.startsWith("http://") && !cleanGithub.startsWith("https://")) {
    cleanGithub = `https://github.com/${cleanGithub.replace(/^@/, "")}`;
  }

  const metaPayload = {
    language: (input.language || "TypeScript").trim(),
    accentColor: (input.accentColor || "#FF7518").trim(),
    stars: input.stars?.trim() || "0",
    forks: input.forks?.trim() || "0",
  };

  const userDesc = (input.description || "").trim() || "Community open source project participating in OSC India.";
  const dbDescription = `${userDesc}\n<!--meta:${JSON.stringify(metaPayload)}-->`;

  let createdProject: ProjectItem;

  try {
    const admin = createAdminClient();
    const { data, error } = await admin
      .from("projects")
      .insert({
        name: input.title.trim(),
        github_repo_url: cleanGithub || "https://github.com/open-source-connect-01",
        description: dbDescription,
      })
      .select()
      .single();

    if (error) {
      console.error("Failed to insert project into Supabase DB:", error);
      return { success: false, error: `Database error: ${error.message}` };
    }

    createdProject = parseProjectFromDb(data);
  } catch (err: unknown) {
    console.error("Database project creation exception:", err);
    return { success: false, error: err instanceof Error ? err.message : "Failed to save project to database." };
  }

  // Also sync to local backup
  const currentLocal = readLocalCustomProjects();
  writeLocalCustomProjects([createdProject, ...currentLocal.filter((p) => p.id !== createdProject.id)]);

  await invalidateSlugCache();
  revalidatePath("/projects");
  revalidatePath("/admin");

  return { success: true, project: createdProject };
}

/**
 * Permanently deletes a project directly from the Supabase database.
 */
export async function deleteProjectAction(
  projectId: string
): Promise<{ success: boolean; error?: string }> {
  const isAuthorized = await checkAdminAuth();
  if (!isAuthorized) {
    return { success: false, error: "Unauthorized. Admin credentials required to delete projects." };
  }

  if (!projectId || !projectId.trim()) {
    return { success: false, error: "Project ID is required." };
  }

  const cleanId = projectId.trim();
  const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(cleanId);

  try {
    const admin = createAdminClient();

    // 1. Clean up associated contributions if any to satisfy foreign key constraints
    if (isUuid) {
      try {
        await admin.from("contributions").delete().eq("project_id", cleanId);
      } catch (e) {
        console.warn("Notice: cleaning linked contributions for project:", e);
      }
    }

    // 2. Permanently delete from Supabase database
    if (isUuid) {
      const { error } = await admin
        .from("projects")
        .delete()
        .eq("id", cleanId);

      if (error) {
        console.error("Failed to delete project from Supabase DB:", error);
        return { success: false, error: `Database error: ${error.message}` };
      }
    } else {
      // If not a UUID, delete by matching repo url or name
      const { error } = await admin
        .from("projects")
        .delete()
        .or(`github_repo_url.eq.${cleanId},name.eq.${cleanId}`);

      if (error) {
        console.error("Failed to delete project by repo/name from DB:", error);
      }
    }
  } catch (err: unknown) {
    console.error("Database project deletion exception:", err);
    return { success: false, error: err instanceof Error ? err.message : "Failed to delete project from database." };
  }

  // 3. Keep local backup cache synchronized
  const localCustom = readLocalCustomProjects();
  const filtered = localCustom.filter(
    (p) => p.id !== cleanId && p.githubUrl !== cleanId && p.title.toLowerCase() !== cleanId.toLowerCase()
  );
  writeLocalCustomProjects(filtered);

  await invalidateSlugCache();
  revalidatePath("/projects");
  revalidatePath("/admin");

  return { success: true };
}

/**
 * Permanently removes ALL projects from the Supabase database and local store.
 * Strictly restricted to authorized administrators.
 */
export async function deleteAllProjectsAction(): Promise<{ success: boolean; count?: number; error?: string }> {
  const isAuthorized = await checkAdminAuth();
  if (!isAuthorized) {
    return { success: false, error: "Unauthorized. Admin credentials required to delete projects." };
  }

  try {
    const admin = createAdminClient();

    // 1. Clean up linked contributions to prevent foreign key issues
    try {
      await admin.from("contributions").delete().not("project_id", "is", null);
    } catch (e) {
      console.warn("Notice: cleaning linked contributions:", e);
    }

    // 2. Permanently delete all records from projects table in Supabase
    const { data, error } = await admin
      .from("projects")
      .delete()
      .not("id", "is", null)
      .select();

    if (error) {
      console.error("Failed to delete all projects from Supabase DB:", error);
      return { success: false, error: `Database error: ${error.message}` };
    }

    // 3. Clear local backup cache completely
    writeLocalCustomProjects([]);

    await invalidateSlugCache();
    revalidatePath("/projects");
    revalidatePath("/admin");

    return { success: true, count: data ? data.length : 0 };
  } catch (err: unknown) {
    console.error("Database deleteAllProjectsAction exception:", err);
    return { success: false, error: err instanceof Error ? err.message : "Failed to delete all projects from database." };
  }
}
