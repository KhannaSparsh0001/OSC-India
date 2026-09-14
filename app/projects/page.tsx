import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProjectsClient, { ProjectData } from "./ProjectsClient";
import { getProjects } from "@/lib/actions/projects";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";

export const dynamic = "force-dynamic";

interface ProjectMeta {
  tags: string[];
  category: string;
  iconType: string;
  accentColor: string;
  mockupDescription?: string;
  stars?: string;
  forks?: string;
  openIssues?: string;
  unassignedIssues?: string;
}

const PROJECT_META_MAP: Record<string, ProjectMeta> = {
  "Truxify – Broker-Free Freight Marketplace": {
    tags: ["Flutter", "Dart", "Firebase", "AI", "Mobile"],
    category: "Mobile & Web",
    iconType: "truck",
    accentColor: "#FF7518",
    mockupDescription:
      "An open-source, broker-free freight marketplace connecting manufacturers directly with truck drivers. Features real-time tracking, secure payments, and AI-based matching.",
    stars: "30",
    forks: "137",
    openIssues: "1074",
    unassignedIssues: "655",
  },
  "Customer Segmentation and Churn Prediction": {
    tags: ["Python", "Machine Learning", "Data Science"],
    category: "Machine Learning / AI",
    iconType: "chart",
    accentColor: "#a855f7",
    mockupDescription:
      "An end-to-end Machine Learning pipeline that identifies customer behavior patterns and predicts churn risks using clustering and classification models.",
    stars: "6",
    forks: "20",
    openIssues: "16",
    unassignedIssues: "16",
  },
  "AdapTQ": {
    tags: ["C++", "Systems", "LLM", "AI"],
    category: "Systems & Low Level",
    iconType: "cpu",
    accentColor: "#10b981",
    mockupDescription:
      "A production-grade C++17 KV cache quantization engine for LLM inference on edge and memory-constrained systems.",
    stars: "6",
    forks: "12",
    openIssues: "4",
    unassignedIssues: "4",
  },
  "Bolcap": {
    tags: ["Python", "AI/ML", "NLP"],
    category: "Video & Media",
    iconType: "video",
    accentColor: "#ef4444",
    mockupDescription:
      "An AI-powered video captioning system supporting Hinglish with Whisper, custom transcription, and animated captions.",
    stars: "1",
    forks: "5",
    openIssues: "7",
    unassignedIssues: "7",
  },
  "Air Quality Intelligence Platform": {
    tags: ["Python", "Data Engineering", "IoT", "Analytics"],
    category: "Environmental & IoT",
    iconType: "leaf",
    accentColor: "#10b981",
    mockupDescription:
      "A real-time air quality monitoring and forecasting platform using sensor data and ML models. Built for cleaner, healthier communities.",
    stars: "3",
    forks: "13",
    openIssues: "12",
    unassignedIssues: "1",
  },
  "EcoVision": {
    tags: ["Python", "Computer Vision", "Sustainability"],
    category: "Environmental & IoT",
    iconType: "eye",
    accentColor: "#3b82f6",
    mockupDescription:
      "An AI-based environmental monitoring project to identify waste, track pollution and promote cleaner surroundings through computer vision.",
    stars: "5",
    forks: "9",
    openIssues: "4",
    unassignedIssues: "4",
  },
  "SecureFlow": {
    tags: ["TypeScript", "GitHub", "Security", "AI"],
    category: "Security & DevSecOps",
    iconType: "lock",
    accentColor: "#8b5cf6",
    mockupDescription:
      "A security analysis platform for GitHub pull requsets using LLMs. Detects vulnerabilities and suggests fixes.",
    stars: "5",
    forks: "56",
    openIssues: "10",
    unassignedIssues: "0",
  },
  "LawSaathi-RAG": {
    tags: ["Python", "RAG", "NLP", "AI"],
    category: "Machine Learning / AI",
    iconType: "scale",
    accentColor: "#f59e0b",
    mockupDescription:
      "An Indian legal RAG system for question answering with BM25, dense retrieval and reproducible evaluation.",
    stars: "3",
    forks: "8",
    openIssues: "8",
    unassignedIssues: "8",
  },
  "AI Product Factory": {
    tags: ["TypeScript", "AI Agents", "Productivity"],
    category: "Developer Tools & Productivity",
    iconType: "box",
    accentColor: "#ec4899",
    mockupDescription:
      "An open-source agentic platform to turn ideas into production-ready products with AI.",
    stars: "0",
    forks: "7",
    openIssues: "2",
    unassignedIssues: "1",
  },
  "CreatorOS": {
    tags: ["JavaScript", "React", "Next.js", "Analytics"],
    category: "Mobile & Web",
    iconType: "layout",
    accentColor: "#f43f5e",
    mockupDescription:
      "CreatorOS is an open-source all-in-one dashboard for creators to manage their business from a single platform.",
    stars: "37",
    forks: "72",
    openIssues: "13",
    unassignedIssues: "4",
  },
  "AI Stock Analyzer": {
    tags: ["Python", "Flask", "Machine Learning", "FinTech"],
    category: "Data Science & Analytics",
    iconType: "trending-up",
    accentColor: "#14b8a6",
    mockupDescription:
      "A web-based stock analysis application providing interactive stock visualizations and machine learning models for stock price prediction.",
    stars: "36",
    forks: "99",
    openIssues: "9",
    unassignedIssues: "9",
  },
  "Dockfleet": {
    tags: ["Python", "Docker", "DevOps", "Containers"],
    category: "Developer Tools & Productivity",
    iconType: "server",
    accentColor: "#0284c7",
    mockupDescription:
      "A free and open-source, local-first orchestration tool that helps developers run and manage multiple projects on a single VPS using Docker.",
    stars: "11",
    forks: "13",
    openIssues: "2",
    unassignedIssues: "0",
  },
  "AtomicBinding": {
    tags: ["TypeScript", "CMS", "GraphQL", "Documentation"],
    category: "Developer Tools & Productivity",
    iconType: "layers",
    accentColor: "#06b6d4",
    mockupDescription:
      "A dual-source content platform where documentation lives in Git while app content is managed via a CMS into a single typed content graph.",
    stars: "2",
    forks: "3",
    openIssues: "5",
    unassignedIssues: "0",
  },
  "InnoVision": {
    tags: ["JavaScript", "EdTech", "AI/ML", "React"],
    category: "Machine Learning / AI",
    iconType: "brain",
    accentColor: "#38bdf8",
    mockupDescription:
      "An AI-powered learning platform that dynamically generates structured and engaging courses from any topic with adaptive personalization.",
    stars: "4",
    forks: "14",
    openIssues: "19",
    unassignedIssues: "19",
  },
  "JugaadLang": {
    tags: ["Python", "Compiler", "Language Design"],
    category: "Systems & Low Level",
    iconType: "terminal",
    accentColor: "#f97316",
    mockupDescription:
      "A modern programming language designed with Hindi keywords for Indian developers, providing a familiar native terminology coding experience.",
    stars: "17",
    forks: "29",
    openIssues: "4",
    unassignedIssues: "0",
  },
  "WalletWise": {
    tags: ["JavaScript", "FinTech", "Analytics", "React"],
    category: "Mobile & Web",
    iconType: "wallet",
    accentColor: "#10b981",
    mockupDescription:
      "A comprehensive financial guidance platform combining behavioral insights, predictive analytics, and real-time financial advisory.",
    stars: "25",
    forks: "77",
    openIssues: "101",
    unassignedIssues: "19",
  },
  "TCalc — AI Coding Context & Token Intelligence Toolkit": {
    tags: ["TypeScript", "AI Context", "LLM", "MCP"],
    category: "Developer Tools & Productivity",
    iconType: "calculator",
    accentColor: "#8b5cf6",
    mockupDescription:
      "An open-source developer toolkit for understanding and optimizing AI coding context and token usage across LLM editors and MCP clients.",
    stars: "7",
    forks: "7",
    openIssues: "2",
    unassignedIssues: "2",
  },
};

export default async function ProjectsPage() {
  const rawProjects = await getProjects();

  // Fetch viewer profile for Navbar
  const supabase = await createClient();
  const {
    data: { user: currentUser },
  } = await supabase.auth.getUser();

  const admin = createAdminClient();
  let viewerProfile = null;

  if (currentUser) {
    let ownProfile: Record<string, unknown> | null = null;
    const { data: byUserId } = await admin
      .from("profiles")
      .select("*")
      .eq("user_id", currentUser.id)
      .maybeSingle();

    ownProfile = byUserId;

    if (!ownProfile) {
      const { data: byId } = await admin
        .from("profiles")
        .select("*")
        .eq("id", currentUser.id)
        .maybeSingle();
      if (byId) ownProfile = byId;
    }

    const gh =
      (ownProfile?.github as string) ||
      (currentUser.user_metadata?.user_name as string) ||
      (currentUser.user_metadata?.preferred_username as string) ||
      null;

    const fn =
      (ownProfile?.full_name as string) ||
      (currentUser.user_metadata?.full_name as string) ||
      (currentUser.user_metadata?.name as string) ||
      gh ||
      "Contributor";

    const av =
      (ownProfile?.avatar_url as string) ||
      (currentUser.user_metadata?.avatar_url as string) ||
      (currentUser.user_metadata?.picture as string) ||
      (gh ? `https://avatars.githubusercontent.com/${gh}` : null);

    const r = (ownProfile?.role as string) || (currentUser.user_metadata?.role as string) || "contributor";

    viewerProfile = {
      id: (ownProfile?.user_id as string) || (ownProfile?.id as string) || currentUser.id,
      name: fn,
      email: currentUser.email || "",
      avatar: av,
      role: r,
      isAdmin: r === "project-admin",
      github: gh,
    };
  }

  // Enrich raw projects with tags, category, custom icon, and mockup attributes
  const enrichedProjects: ProjectData[] = rawProjects.map((p) => {
    // Lookup metadata by exact title or partial match
    let meta = PROJECT_META_MAP[p.title];
    if (!meta) {
      const entry = Object.entries(PROJECT_META_MAP).find(([key]) =>
        p.title.toLowerCase().includes(key.toLowerCase()) || key.toLowerCase().includes(p.title.toLowerCase())
      );
      if (entry) meta = entry[1];
    }

    const defaultTags = p.language ? [p.language] : ["Open Source"];

    // Prioritize real database stars/forks if available (> 0), else use meta map
    const dbStars = p.stars && p.stars !== "0" ? p.stars : null;
    const dbForks = p.forks && p.forks !== "0" ? p.forks : null;
    const dbOpenIssues = p.openIssues && p.openIssues !== "0" ? p.openIssues : null;
    const dbUnassigned = p.unassignedIssues && p.unassignedIssues !== "0" ? p.unassignedIssues : null;

    return {
      id: p.id,
      title: p.title,
      description: meta?.mockupDescription || p.description,
      githubUrl: p.githubUrl,
      language: p.language,
      accentColor: meta?.accentColor || p.accentColor || "#FF7518",
      stars: dbStars || meta?.stars || p.stars || "0",
      forks: dbForks || meta?.forks || p.forks || "0",
      openIssues: dbOpenIssues || meta?.openIssues || p.openIssues || "0",
      unassignedIssues: dbUnassigned || meta?.unassignedIssues || p.unassignedIssues || "0",
      tags: meta?.tags || defaultTags,
      category: meta?.category || "Developer Tools & Productivity",
      iconType: meta?.iconType || "git-fork",
    };
  });

  // Always place Truxify as the 1st project in the directory
  enrichedProjects.sort((a, b) => {
    const isTruxifyA = a.title.toLowerCase().includes("truxify") || a.githubUrl.toLowerCase().includes("truxify");
    const isTruxifyB = b.title.toLowerCase().includes("truxify") || b.githubUrl.toLowerCase().includes("truxify");
    if (isTruxifyA && !isTruxifyB) return -1;
    if (!isTruxifyA && isTruxifyB) return 1;
    return 0;
  });

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#000000",
        backgroundImage:
          "radial-gradient(ellipse 700px 350px at 85% 10%, rgba(255, 117, 24, 0.1), transparent 75%)",
        backgroundRepeat: "no-repeat",
        display: "flex",
        flexDirection: "column",
        fontFamily: "'Inter', sans-serif",
        color: "#ffffff",
      }}
    >
      <Navbar initialProfile={viewerProfile} />
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
        <ProjectsClient projects={enrichedProjects} />
      </main>

      <Footer />
    </div>
  );
}
