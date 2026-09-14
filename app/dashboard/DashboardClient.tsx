"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";

export interface PRContribution {
  id: string;
  type?: string;
  github_url: string;
  status?: string;
  points_awarded?: number;
  contributed_at?: string;
  title?: string;
  project_name?: string;
}

export interface DayContribution {
  dateStr: string;      // e.g. "Sep 11"
  fullDate: string;     // e.g. "2026-09-11"
  count: number;
  isToday?: boolean;
}

export interface ProjectSummary {
  id: string;
  name: string;
  url?: string;
  prCount: number;
  totalPoints: number;
}

interface DashboardClientProps {
  profile: {
    id: string;
    user_id?: string;
    full_name: string;
    github?: string | null;
    avatar_url?: string | null;
    role: string;
    score: number;
    merged_prs: number;
    projects_count: number;
    badges_created: number;
    tech_stack: string[];
    bio?: string | null;
  };
  isOwnProfile: boolean;
  initialContributions: PRContribution[];
  dailyContributions: DayContribution[];
  managedProjects?: ProjectSummary[];
  contributedProjects?: ProjectSummary[];
  weeklyScore?: number;
  weeklyPRs?: number;
  rank?: number | null;
}

export default function DashboardClient({
  profile,
  isOwnProfile,
  initialContributions,
  dailyContributions: initialDaily,
  managedProjects = [],
  contributedProjects = [],
  weeklyScore = 120,
  weeklyPRs = 12,
  rank = 1,
}: DashboardClientProps) {
  const [techStack, setTechStack] = useState<string[]>(
    profile.tech_stack && profile.tech_stack.length > 0
      ? profile.tech_stack
      : ["TypeScript", "JavaScript", "Python", "Jupyter Notebook", "CSS"]
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [difficultyFilter, setDifficultyFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Selected Day in Daily Contributions (Default to Today or Sep 14)
  const [selectedDayIndex, setSelectedDayIndex] = useState(() => {
    const todayIdx = initialDaily.findIndex((d) => d.isToday);
    return todayIdx !== -1 ? todayIdx : 0;
  });

  // Daily Contributions carousel window index (for < and > navigation)
  const [dailyWindowStart, setDailyWindowStart] = useState(0);

  // Add tech modal state
  const [isAddTechOpen, setIsAddTechOpen] = useState(false);
  const [newTech, setNewTech] = useState("");
  const [isSavingTech, setIsSavingTech] = useState(false);

  const rawRole = profile.role || "contributor";
  const isProjectAdmin = rawRole === "project-admin";
  const roleDisplay = isProjectAdmin ? "Project Admin" : "Contributor";
  const githubUsername = profile.github || "";

  // Visible daily contributions (7 days window)
  const visibleDays = useMemo(() => {
    return initialDaily.slice(dailyWindowStart, dailyWindowStart + 7);
  }, [initialDaily, dailyWindowStart]);

  const handlePrevDays = () => {
    setDailyWindowStart((prev) => Math.max(0, prev - 1));
  };

  const handleNextDays = () => {
    setDailyWindowStart((prev) => Math.min(Math.max(0, initialDaily.length - 7), prev + 1));
  };

  // Helper for difficulty determination
  const getDifficulty = (points?: number) => {
    const p = points || 10;
    if (p >= 50) {
      return {
        label: "Expert",
        color: "#fb923c",
        bg: "#34190c",
        border: "rgba(251, 146, 60, 0.35)",
      };
    }
    if (p >= 30) {
      return {
        label: "Hard",
        color: "#c084fc",
        bg: "#28143a",
        border: "rgba(192, 132, 252, 0.35)",
      };
    }
    if (p >= 20) {
      return {
        label: "Medium",
        color: "#38bdf8",
        bg: "#0c2035",
        border: "rgba(56, 189, 248, 0.35)",
      };
    }
    return {
      label: "Easy",
      color: "#34d399",
      bg: "#0e271d",
      border: "rgba(52, 211, 153, 0.35)",
    };
  };

  // Filtered PR contributions
  const filteredContributions = useMemo(() => {
    return initialContributions.filter((c) => {
      const prMatch = (c.github_url || "").match(/\/pull\/(\d+)/);
      const prNumber = prMatch ? prMatch[1] : "";
      const title = c.title || "";
      const repo = c.project_name || "";
      const matchesSearch =
        searchQuery === "" ||
        title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        repo.toLowerCase().includes(searchQuery.toLowerCase()) ||
        prNumber.includes(searchQuery.replace(/^#/, ""));

      if (!matchesSearch) return false;

      if (difficultyFilter !== "all") {
        const diff = getDifficulty(c.points_awarded).label.toLowerCase();
        if (diff !== difficultyFilter.toLowerCase()) return false;
      }

      return true;
    });
  }, [initialContributions, searchQuery, difficultyFilter]);

  // Paginated PRs
  const totalPages = Math.max(1, Math.ceil(filteredContributions.length / itemsPerPage));
  const displayedContributions = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredContributions.slice(start, start + itemsPerPage);
  }, [filteredContributions, currentPage]);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // Handle Add Tech
  const handleAddTech = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTech.trim()) return;
    const updated = Array.from(new Set([...techStack, newTech.trim()]));
    setIsSavingTech(true);
    try {
      const res = await fetch("/api/profile/tech-stack", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ languages: updated }),
      });
      if (res.ok) {
        setTechStack(updated);
        setNewTech("");
        setIsAddTechOpen(false);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSavingTech(false);
    }
  };

  return (
    <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: "28px" }}>
      {/* =========================================================
          TOP SECTION: Profile Card (Left) + Stats & Tech Stack (Right)
         ========================================================= */}
      <div
        className="dashboard-top-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "300px 1fr",
          gap: "24px",
          width: "100%",
          alignItems: "stretch",
        }}
      >
        {/* LEFT COLUMN: Profile Card */}
        <div
          style={{
            background: "#0d0e12",
            border: "1px solid #1c1e26",
            borderRadius: "20px",
            padding: "28px 20px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            boxSizing: "border-box",
            height: "100%",
          }}
        >
          {/* Avatar with Circular Orange Ring & Verified Badge */}
          <div style={{ position: "relative", width: "104px", height: "104px", marginBottom: "16px" }}>
            <div
              style={{
                width: "104px",
                height: "104px",
                borderRadius: "50%",
                border: "2.5px solid #ff7518",
                overflow: "hidden",
                background: "#12141a",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 0 20px rgba(255, 117, 24, 0.25)",
              }}
            >
              <img
                src={profile.avatar_url || "https://avatars.githubusercontent.com/u/181569773?v=4"}
                alt={profile.full_name}
                style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" }}
              />
            </div>

            {/* Orange Circle Verified Badge */}
            <div
              title="Verified"
              style={{
                position: "absolute",
                bottom: "0px",
                right: "2px",
                width: "26px",
                height: "26px",
                borderRadius: "50%",
                background: "#ff7518",
                border: "2.5px solid #0d0e12",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 2px 6px rgba(0,0,0,0.8)",
                zIndex: 10,
              }}
            >
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#ffffff"
                strokeWidth="3.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
          </div>

          {/* Full Name */}
          <h2
            style={{
              fontSize: "18px",
              fontWeight: 700,
              color: "#ffffff",
              textAlign: "center",
              marginBottom: "4px",
              lineHeight: 1.3,
            }}
          >
            {profile.full_name}
          </h2>

          {/* Handle */}
          <div
            style={{
              fontSize: "13px",
              color: "#8b929e",
              textAlign: "center",
              marginBottom: "16px",
            }}
          >
            @{githubUsername}
          </div>

          {/* Role & Status Pills */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
              flexWrap: "wrap",
              marginBottom: "24px",
              width: "100%",
            }}
          >
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                padding: "5px 14px",
                borderRadius: "9999px",
                fontSize: "11.5px",
                fontWeight: 600,
                background: "#2f190e",
                color: "#ff8c37",
                border: "1px solid rgba(255, 117, 24, 0.35)",
              }}
            >
              {roleDisplay}
            </span>

            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "4px",
                padding: "5px 14px",
                borderRadius: "9999px",
                fontSize: "11.5px",
                fontWeight: 600,
                background: "#0c1c2e",
                color: "#60a5fa",
                border: "1px solid rgba(59, 130, 246, 0.35)",
              }}
            >
              <span>✓</span> Verified
            </span>
          </div>

          {/* Action List Section: ONLY OSCG 2026 ID Card (Edit Profile & Settings removed per user instruction) */}
          <div style={{ width: "100%", display: "flex", flexDirection: "column" }}>
            <Link
              href="/badge"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "14px 16px",
                background: "#12141a",
                border: "1px solid #1f222c",
                borderRadius: "14px",
                textDecoration: "none",
                transition: "all 0.15s ease",
              }}
              className="hover:border-[rgba(255,117,24,0.4)]"
            >
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <div
                  style={{
                    width: "38px",
                    height: "38px",
                    borderRadius: "10px",
                    background: "#2a180c",
                    border: "1px solid rgba(255, 117, 24, 0.25)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#ff7518",
                    flexShrink: 0,
                  }}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                    <line x1="16" y1="2" x2="16" y2="6" />
                    <line x1="8" y1="2" x2="8" y2="6" />
                    <line x1="3" y1="10" x2="21" y2="10" />
                  </svg>
                </div>
                <div style={{ textAlign: "left" }}>
                  <div style={{ fontSize: "13.5px", fontWeight: 700, color: "#ffffff" }}>
                    OSCG 2026 ID Card
                  </div>
                  <div style={{ fontSize: "11px", color: "#8b929e", marginTop: "2px" }}>
                    Official Digital Badge
                  </div>
                </div>
              </div>
              <span style={{ fontSize: "14px", color: "#6b7280", fontWeight: 700 }}>&gt;</span>
            </Link>
          </div>
        </div>

        {/* RIGHT COLUMN: 4 Metric Cards (Row 1) + Managed Project/Contributions & Tech Stack (Row 2) */}
        <div style={{ display: "flex", flexDirection: "column", gap: "20px", width: "100%" }}>
          {/* Row 1: 4 Metric Cards */}
          <div
            className="dashboard-metrics-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: "16px",
              width: "100%",
            }}
          >
            {/* 1. Total Merit Score */}
            <div
              style={{
                background: "#0d0e12",
                border: "1px solid #1c1e26",
                borderRadius: "18px",
                padding: "20px 18px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                minHeight: "140px",
                boxSizing: "border-box",
              }}
            >
              <div>
                <div
                  style={{
                    width: "36px",
                    height: "36px",
                    borderRadius: "10px",
                    background: "#2a180c",
                    border: "1px solid rgba(255, 117, 24, 0.25)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#ff7518",
                    marginBottom: "12px",
                  }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
                    <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
                    <path d="M4 22h16" />
                    <path d="M10 14.66V17c0 .55-.45 1-1 1H8v2h8v-2h-1c-.55 0-1-.45-1-1v-2.34" />
                    <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
                  </svg>
                </div>
                <div style={{ fontSize: "12px", fontWeight: 600, color: "#8b929e", marginBottom: "4px" }}>
                  Total Merit Score
                </div>
                <div style={{ display: "flex", alignItems: "baseline", gap: "6px" }}>
                  <span style={{ fontSize: "28px", fontWeight: 800, color: "#ff7518", lineHeight: 1 }}>
                    {profile.score}
                  </span>
                  <span style={{ fontSize: "12px", color: "#8b929e" }}>pts</span>
                </div>
              </div>
              <div
                style={{
                  fontSize: "12px",
                  fontWeight: 600,
                  color: "#22c55e",
                  display: "flex",
                  alignItems: "center",
                  gap: "4px",
                  marginTop: "8px",
                }}
              >
                <span>↑</span> +{weeklyScore} this week
              </div>
            </div>

            {/* 2. Merged PRs */}
            <div
              style={{
                background: "#0d0e12",
                border: "1px solid #1c1e26",
                borderRadius: "18px",
                padding: "20px 18px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                minHeight: "140px",
                boxSizing: "border-box",
              }}
            >
              <div>
                <div
                  style={{
                    width: "36px",
                    height: "36px",
                    borderRadius: "10px",
                    background: "#2a180c",
                    border: "1px solid rgba(255, 117, 24, 0.25)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#ff7518",
                    marginBottom: "12px",
                  }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="18" cy="18" r="3" />
                    <circle cx="6" cy="6" r="3" />
                    <path d="M13 6h3a2 2 0 0 1 2 2v7" />
                    <line x1="6" y1="9" x2="6" y2="21" />
                  </svg>
                </div>
                <div style={{ fontSize: "12px", fontWeight: 600, color: "#8b929e", marginBottom: "4px" }}>
                  Merged PRs
                </div>
                <div style={{ fontSize: "28px", fontWeight: 800, color: "#ff7518", lineHeight: 1 }}>
                  {profile.merged_prs}
                </div>
              </div>
              <div
                style={{
                  fontSize: "12px",
                  fontWeight: 600,
                  color: "#22c55e",
                  display: "flex",
                  alignItems: "center",
                  gap: "4px",
                  marginTop: "8px",
                }}
              >
                <span>↑</span> +{weeklyPRs} this week
              </div>
            </div>

            {/* 3. Projects */}
            <div
              style={{
                background: "#0d0e12",
                border: "1px solid #1c1e26",
                borderRadius: "18px",
                padding: "20px 18px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                minHeight: "140px",
                boxSizing: "border-box",
              }}
            >
              <div>
                <div
                  style={{
                    width: "36px",
                    height: "36px",
                    borderRadius: "10px",
                    background: "#0c1e30",
                    border: "1px solid rgba(56, 189, 248, 0.25)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#38bdf8",
                    marginBottom: "12px",
                  }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z" />
                  </svg>
                </div>
                <div style={{ fontSize: "12px", fontWeight: 600, color: "#8b929e", marginBottom: "4px" }}>
                  Projects
                </div>
                <div style={{ fontSize: "28px", fontWeight: 800, color: "#38bdf8", lineHeight: 1 }}>
                  {profile.projects_count}
                </div>
              </div>
              <div style={{ fontSize: "12px", color: "#8b929e", marginTop: "8px" }}>
                Active contribution
              </div>
            </div>

            {/* 4. Rank */}
            <Link
              href="/leaderboard"
              style={{
                background: "#0d0e12",
                border: "1px solid #1c1e26",
                borderRadius: "18px",
                padding: "20px 18px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                minHeight: "140px",
                boxSizing: "border-box",
                textDecoration: "none",
                transition: "all 0.15s ease",
              }}
              className="hover:border-[rgba(245,158,11,0.4)] hover:bg-[#121319]"
            >
              <div>
                <div
                  style={{
                    width: "36px",
                    height: "36px",
                    borderRadius: "10px",
                    background: "#281f0b",
                    border: "1px solid rgba(245, 158, 11, 0.25)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#f59e0b",
                    marginBottom: "12px",
                  }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="8" r="6" />
                    <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
                  </svg>
                </div>
                <div style={{ fontSize: "12px", fontWeight: 600, color: "#8b929e", marginBottom: "4px" }}>
                  Rank
                </div>
                <div style={{ fontSize: "28px", fontWeight: 800, color: "#f59e0b", lineHeight: 1 }}>
                  #{rank && rank > 0 ? rank : 1}
                </div>
              </div>
              <div style={{ fontSize: "12px", color: "#8b929e", marginTop: "8px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <span>Leaderboard position</span>
                <span style={{ color: "#f59e0b", fontWeight: 700 }}>&rarr;</span>
              </div>
            </Link>
          </div>

          {/* Row 2: Projects Information (Managed Project for Admin / Contributed Projects for Contributor) + Tech Stack */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
              gap: "16px",
              width: "100%",
            }}
          >
            {/* Project Admin: Managed Project & Repo URL */}
            {isProjectAdmin && managedProjects.length > 0 && (
              <div
                style={{
                  background: "#0d0e12",
                  border: "1px solid #1c1e26",
                  borderRadius: "18px",
                  padding: "20px 22px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  boxSizing: "border-box",
                }}
              >
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
                    <div
                      style={{
                        width: "34px",
                        height: "34px",
                        borderRadius: "8px",
                        background: "#2a180c",
                        border: "1px solid rgba(255, 117, 24, 0.25)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "#ff7518",
                      }}
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <line x1="6" y1="3" x2="6" y2="15" />
                        <circle cx="18" cy="6" r="3" />
                        <circle cx="6" cy="18" r="3" />
                        <path d="M18 9a9 9 0 0 1-9 9" />
                      </svg>
                    </div>
                    <div>
                      <h3 style={{ fontSize: "13.5px", fontWeight: 700, color: "white", margin: 0 }}>
                        Managed Project
                      </h3>
                      <p style={{ fontSize: "11.5px", color: "#8b929e", margin: "2px 0 0 0" }}>
                        Official repository under your management
                      </p>
                    </div>
                  </div>

                  {managedProjects.map((p) => (
                    <div
                      key={p.id}
                      style={{
                        padding: "12px 14px",
                        borderRadius: "12px",
                        background: "#12141a",
                        border: "1px solid #1f222c",
                        marginTop: "8px",
                      }}
                    >
                      <div style={{ fontSize: "14px", fontWeight: 700, color: "#ffffff", marginBottom: "4px" }}>
                        {p.name}
                      </div>
                      {p.url && (
                        <a
                          href={p.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            fontSize: "12px",
                            color: "#ff7518",
                            textDecoration: "none",
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "4px",
                            wordBreak: "break-all",
                          }}
                          className="hover:underline"
                        >
                          <span>{p.url}</span>
                          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                            <polyline points="15 3 21 3 21 9" />
                            <line x1="10" y1="14" x2="21" y2="3" />
                          </svg>
                        </a>
                      )}
                      <div style={{ display: "flex", gap: "10px", marginTop: "8px", flexWrap: "wrap" }}>
                        <span style={{ fontSize: "11px", color: "#8b929e", background: "#181a24", padding: "3px 8px", borderRadius: "6px" }}>
                          {p.prCount} Merged PRs
                        </span>
                        <span style={{ fontSize: "11px", color: "#22c55e", fontWeight: 600, background: "rgba(34, 197, 94, 0.1)", padding: "3px 8px", borderRadius: "6px" }}>
                          +{p.totalPoints} pts awarded
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Contributor: Contributed Projects and Points Earned */}
            {!isProjectAdmin && (
              <div
                style={{
                  background: "#0d0e12",
                  border: "1px solid #1c1e26",
                  borderRadius: "18px",
                  padding: "20px 22px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  boxSizing: "border-box",
                }}
              >
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
                    <div
                      style={{
                        width: "34px",
                        height: "34px",
                        borderRadius: "8px",
                        background: "#0c1e30",
                        border: "1px solid rgba(56, 189, 248, 0.25)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "#38bdf8",
                      }}
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z" />
                      </svg>
                    </div>
                    <div>
                      <h3 style={{ fontSize: "13.5px", fontWeight: 700, color: "white", margin: 0 }}>
                        Contributed Projects
                      </h3>
                      <p style={{ fontSize: "11.5px", color: "#8b929e", margin: "2px 0 0 0" }}>
                        Points earned per project
                      </p>
                    </div>
                  </div>

                  {contributedProjects.length > 0 ? (
                    <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginTop: "8px" }}>
                      {contributedProjects.map((p) => (
                        <div
                          key={p.id}
                          style={{
                            padding: "10px 14px",
                            borderRadius: "10px",
                            background: "#12141a",
                            border: "1px solid #1f222c",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            gap: "8px",
                          }}
                        >
                          <div>
                            <div style={{ fontSize: "13px", fontWeight: 700, color: "#ffffff" }}>
                              {p.name}
                            </div>
                            {p.url && (
                              <a
                                href={p.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{ fontSize: "11px", color: "#8b929e", textDecoration: "none" }}
                                className="hover:underline hover:text-white"
                              >
                                {p.url.replace(/^https?:\/\/github\.com\//i, "")} ↗
                              </a>
                            )}
                          </div>
                          <div style={{ textAlign: "right" }}>
                            <div style={{ fontSize: "13px", fontWeight: 700, color: "#22c55e" }}>
                              +{p.totalPoints} pts
                            </div>
                            <div style={{ fontSize: "11px", color: "#8b929e" }}>
                              {p.prCount} PRs
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div style={{ padding: "16px", background: "#12141a", borderRadius: "10px", border: "1px solid #1f222c", textAlign: "center", marginTop: "8px" }}>
                      <p style={{ fontSize: "12px", color: "#8b929e", margin: "0 0 8px 0" }}>No project contributions yet</p>
                      <Link href="/projects" style={{ fontSize: "12px", color: "#ff7518", textDecoration: "none", fontWeight: 600 }}>Explore Projects →</Link>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Tech Stack Card */}
            <div
              style={{
                background: "#0d0e12",
                border: "1px solid #1c1e26",
                borderRadius: "18px",
                padding: "20px 22px",
                boxSizing: "border-box",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: "16px",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <div
                      style={{
                        width: "34px",
                        height: "34px",
                        borderRadius: "8px",
                        background: "#1b1932",
                        border: "1px solid rgba(129, 140, 248, 0.25)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "#818cf8",
                      }}
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polygon points="12 2 2 7 12 12 22 7 12 2" />
                        <polyline points="2 17 12 22 22 17" />
                        <polyline points="2 12 12 17 22 12" />
                      </svg>
                    </div>
                    <div>
                      <h3 style={{ fontSize: "13.5px", fontWeight: 700, color: "white", margin: 0 }}>
                        Tech Stack
                      </h3>
                      <p style={{ fontSize: "11.5px", color: "#8b929e", margin: "2px 0 0 0" }}>
                        Technologies you work with
                      </p>
                    </div>
                  </div>

                  {isOwnProfile && (
                    <button
                      onClick={() => setIsAddTechOpen(true)}
                      style={{
                        background: "#ff7518",
                        color: "white",
                        fontWeight: 700,
                        fontSize: "12px",
                        padding: "5px 12px",
                        borderRadius: "8px",
                        border: "none",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        gap: "4px",
                        boxShadow: "0 2px 6px rgba(255, 117, 24, 0.3)",
                      }}
                      className="hover:opacity-90"
                    >
                      <span style={{ fontSize: "14px", lineHeight: 1 }}>+</span> Add
                    </button>
                  )}
                </div>

                {/* Skills Pills */}
                <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                  {techStack.map((tech) => (
                    <span
                      key={tech}
                      style={{
                        background: "#14151b",
                        border: "1px solid #232530",
                        color: "#d1d5db",
                        padding: "6px 14px",
                        borderRadius: "8px",
                        fontSize: "12.5px",
                        fontWeight: 500,
                      }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* =========================================================
          MIDDLE SECTION: Your Daily Contributions (Starting Sep 11 with true data)
         ========================================================= */}
      <div
        style={{
          background: "#0d0e12",
          border: "1px solid #1c1e26",
          borderRadius: "20px",
          padding: "24px 28px",
          width: "100%",
          boxSizing: "border-box",
        }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "22px",
            flexWrap: "wrap",
            gap: "12px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
            <div
              style={{
                width: "38px",
                height: "38px",
                borderRadius: "10px",
                background: "#2a180c",
                border: "1px solid rgba(255, 117, 24, 0.25)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#ff7518",
                flexShrink: 0,
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
            </div>
            <div>
              <h3 style={{ fontSize: "16px", fontWeight: 700, color: "white", margin: 0 }}>
                Your Daily Contributions
              </h3>
              <p style={{ fontSize: "12px", color: "#8b929e", margin: "2px 0 0 0" }}>
                Track your progress throughout the program
              </p>
            </div>
          </div>

          {/* Date Range Badge Starting Sep 11 */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              padding: "6px 14px",
              borderRadius: "8px",
              fontSize: "12px",
              fontWeight: 500,
              color: "#d1d5db",
              background: "#12141a",
              border: "1px solid #1f222c",
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
            <span>Sep 11, 2026 &nbsp;—&nbsp; Nov 15, 2026</span>
          </div>
        </div>

        {/* Daily Carousel Container */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px", width: "100%" }}>
          {/* Prev Button */}
          <button
            onClick={handlePrevDays}
            disabled={dailyWindowStart === 0}
            style={{
              width: "36px",
              height: "36px",
              borderRadius: "50%",
              background: "#13141a",
              border: "1px solid #232530",
              color: "#8b929e",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: dailyWindowStart === 0 ? "not-allowed" : "pointer",
              opacity: dailyWindowStart === 0 ? 0.3 : 1,
              flexShrink: 0,
              transition: "all 0.15s ease",
            }}
            aria-label="Previous days"
          >
            &lt;
          </button>

          {/* 7 Days Grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(7, 1fr)",
              gap: "12px",
              flex: 1,
            }}
          >
            {visibleDays.map((day, idx) => {
              const actualIdx = dailyWindowStart + idx;
              const isSelected = selectedDayIndex === actualIdx;
              return (
                <button
                  key={day.fullDate}
                  onClick={() => setSelectedDayIndex(actualIdx)}
                  style={{
                    borderRadius: "14px",
                    padding: "16px 8px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    textAlign: "center",
                    position: "relative",
                    background: isSelected ? "#3a2213" : "#13141a",
                    border: isSelected ? "1.5px solid #d97706" : "1px solid #232530",
                    boxShadow: isSelected ? "0 0 20px rgba(217, 119, 6, 0.25)" : "none",
                    transition: "all 0.15s ease",
                  }}
                >
                  {/* Today Badge */}
                  {day.isToday && (
                    <span
                      style={{
                        fontSize: "10px",
                        fontWeight: 700,
                        color: "#ff7518",
                        textTransform: "uppercase",
                        letterSpacing: "0.05em",
                        marginBottom: "4px",
                      }}
                    >
                      Today
                    </span>
                  )}

                  {/* Date */}
                  <span
                    style={{
                      fontSize: "12px",
                      fontWeight: 600,
                      color: isSelected ? "#fde68a" : "#9ca3af",
                      marginBottom: "4px",
                    }}
                  >
                    {day.dateStr}
                  </span>

                  {/* Count */}
                  <span
                    style={{
                      fontSize: "20px",
                      fontWeight: 800,
                      color: "#ffffff",
                      lineHeight: 1.1,
                      marginBottom: "4px",
                    }}
                  >
                    {day.count}
                  </span>

                  {/* Subtitle */}
                  <span
                    style={{
                      fontSize: "11px",
                      color: isSelected ? "#fed7aa" : "#6b7280",
                    }}
                  >
                    {day.count === 1 ? "contribution" : "contributions"}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Next Button */}
          <button
            onClick={handleNextDays}
            disabled={dailyWindowStart >= initialDaily.length - 7}
            style={{
              width: "36px",
              height: "36px",
              borderRadius: "50%",
              background: "#13141a",
              border: "1px solid #232530",
              color: "#8b929e",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: dailyWindowStart >= initialDaily.length - 7 ? "not-allowed" : "pointer",
              opacity: dailyWindowStart >= initialDaily.length - 7 ? 0.3 : 1,
              flexShrink: 0,
              transition: "all 0.15s ease",
            }}
            aria-label="Next days"
          >
            &gt;
          </button>
        </div>

        {/* Motivational Quote */}
        <div
          style={{
            textAlign: "center",
            fontSize: "12px",
            color: "#6b7280",
            fontStyle: "italic",
            marginTop: "22px",
          }}
        >
          &ldquo;Consistency today, impact tomorrow.&rdquo;
        </div>
      </div>

      {/* =========================================================
          BOTTOM SECTION: PRs Table (Managed Repository PRs)
         ========================================================= */}
      <div
        style={{
          background: "#0d0e12",
          border: "1px solid #1c1e26",
          borderRadius: "20px",
          padding: "24px 28px",
          width: "100%",
          boxSizing: "border-box",
        }}
      >
        {/* Table Header Controls */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "20px",
            flexWrap: "wrap",
            gap: "14px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
            <div
              style={{
                width: "38px",
                height: "38px",
                borderRadius: "10px",
                background: "#2a180c",
                border: "1px solid rgba(255, 117, 24, 0.25)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#ff7518",
                flexShrink: 0,
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="18" cy="18" r="3" />
                <circle cx="6" cy="6" r="3" />
                <path d="M13 6h3a2 2 0 0 1 2 2v7" />
                <line x1="6" y1="9" x2="6" y2="21" />
              </svg>
            </div>
            <div>
              <h3 style={{ fontSize: "16px", fontWeight: 700, color: "white", margin: 0 }}>
                {isProjectAdmin ? "Managed Repository PRs (OSCI'26)" : "Verified PR Contributions"}
              </h3>
              <p style={{ fontSize: "12px", color: "#8b929e", margin: "2px 0 0 0" }}>
                {isProjectAdmin
                  ? "All merged pull requests with the official OSCI'26 label in your managed repository"
                  : "All merged pull requests tracked across official competition repositories"}
              </p>
            </div>
          </div>

          {/* Search & Difficulty Filter */}
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            {/* Search Input */}
            <div style={{ position: "relative" }}>
              <input
                type="text"
                placeholder="Search PRs..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                style={{
                  background: "#14151b",
                  border: "1px solid #232530",
                  borderRadius: "8px",
                  padding: "8px 12px 8px 34px",
                  fontSize: "12px",
                  color: "white",
                  outline: "none",
                  width: "220px",
                }}
              />
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#6b7280"
                strokeWidth="2"
                style={{ position: "absolute", left: "12px", top: "10px" }}
              >
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </div>

            {/* Filter Dropdown */}
            <select
              value={difficultyFilter}
              onChange={(e) => {
                setDifficultyFilter(e.target.value);
                setCurrentPage(1);
              }}
              style={{
                background: "#14151b",
                border: "1px solid #232530",
                borderRadius: "8px",
                padding: "8px 12px",
                fontSize: "12px",
                color: "#d1d5db",
                outline: "none",
                cursor: "pointer",
              }}
            >
              <option value="all">All</option>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
              <option value="expert">Expert</option>
            </select>
          </div>
        </div>

        {/* PRs Data Table */}
        <div style={{ width: "100%", overflowX: "auto" }}>
          <table style={{ width: "100%", textAlign: "left", borderCollapse: "collapse", fontSize: "13px" }}>
            <thead>
              <tr
                style={{
                  borderBottom: "1px solid #1a1d26",
                  color: "#8b929e",
                  fontSize: "12px",
                  fontWeight: 600,
                }}
              >
                <th style={{ padding: "12px 16px", width: "80px" }}>#</th>
                <th style={{ padding: "12px 16px" }}>Title</th>
                <th style={{ padding: "12px 16px" }}>Repository</th>
                <th style={{ padding: "12px 16px" }}>Merged On</th>
                <th style={{ padding: "12px 16px" }}>Points</th>
                <th style={{ padding: "12px 16px" }}>Difficulty</th>
                <th style={{ padding: "12px 16px" }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {displayedContributions.length > 0 ? (
                displayedContributions.map((c) => {
                  const cleanUrl = (c.github_url || "").replace(/^merged:/, "");
                  const prMatch = cleanUrl.match(/\/pull\/(\d+)/);
                  const prNumber = prMatch ? `#${prMatch[1]}` : "#PR";
                  const points = c.points_awarded || 10;
                  const diff = getDifficulty(points);
                  const formattedDate = c.contributed_at
                    ? new Date(c.contributed_at).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })
                    : "Sep 13, 2026";

                  const repoName = c.project_name || "Project";

                  return (
                    <tr
                      key={c.id}
                      style={{
                        borderBottom: "1px solid rgba(255, 255, 255, 0.03)",
                        transition: "background 0.15s ease",
                      }}
                      className="hover:bg-white/[0.02]"
                    >
                      {/* PR Number */}
                      <td style={{ padding: "14px 16px", fontWeight: 700 }}>
                        <a
                          href={cleanUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{ color: "#ff7518", textDecoration: "none" }}
                          className="hover:underline"
                        >
                          {prNumber}
                        </a>
                      </td>

                      {/* Title */}
                      <td
                        style={{
                          padding: "14px 16px",
                          color: "#ffffff",
                          fontWeight: 500,
                          maxWidth: "380px",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                        title={c.title}
                      >
                        {c.title || "Contribution"}
                      </td>

                      {/* Repository */}
                      <td style={{ padding: "14px 16px", color: "#d1d5db" }}>
                        {repoName}
                      </td>

                      {/* Merged On */}
                      <td style={{ padding: "14px 16px", color: "#8b929e", whiteSpace: "nowrap" }}>
                        {formattedDate}
                      </td>

                      {/* Points */}
                      <td style={{ padding: "14px 16px", color: "#22c55e", fontWeight: 600, whiteSpace: "nowrap" }}>
                        +{points}
                      </td>

                      {/* Difficulty Pill */}
                      <td style={{ padding: "14px 16px", whiteSpace: "nowrap" }}>
                        <span
                          style={{
                            display: "inline-block",
                            padding: "3px 12px",
                            borderRadius: "9999px",
                            fontSize: "11px",
                            fontWeight: 600,
                            background: diff.bg,
                            color: diff.color,
                            border: `1px solid ${diff.border}`,
                          }}
                        >
                          {diff.label}
                        </span>
                      </td>

                      {/* Status Pill */}
                      <td style={{ padding: "14px 16px", whiteSpace: "nowrap" }}>
                        <span
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "4px",
                            padding: "3px 12px",
                            borderRadius: "9999px",
                            fontSize: "11px",
                            fontWeight: 600,
                            background: "#0e271d",
                            color: "#34d399",
                            border: "1px solid rgba(52, 211, 153, 0.35)",
                          }}
                        >
                          <span>✓</span> Merged
                        </span>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={7} style={{ padding: "48px 16px", textAlign: "center", color: "#6b7280" }}>
                    No pull requests match your search or filter.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: "20px",
            paddingTop: "16px",
            borderTop: "1px solid #1a1d26",
            flexWrap: "wrap",
            gap: "12px",
          }}
        >
          <div style={{ fontSize: "12px", color: "#8b929e" }}>
            Showing {filteredContributions.length === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1} to{" "}
            {Math.min(currentPage * itemsPerPage, filteredContributions.length)} of{" "}
            {filteredContributions.length} PRs
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            {/* Previous */}
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              style={{
                background: "#14151b",
                border: "1px solid #232530",
                color: currentPage === 1 ? "#4b5563" : "#9ca3af",
                padding: "6px 14px",
                borderRadius: "8px",
                fontSize: "12px",
                fontWeight: 500,
                cursor: currentPage === 1 ? "not-allowed" : "pointer",
                transition: "all 0.15s ease",
              }}
            >
              ← Previous
            </button>

            {/* Page Numbers */}
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              const pageNum = i + 1;
              const isActive = pageNum === currentPage;
              return (
                <button
                  key={pageNum}
                  onClick={() => handlePageChange(pageNum)}
                  style={{
                    width: "32px",
                    height: "32px",
                    borderRadius: "8px",
                    fontSize: "12px",
                    fontWeight: 700,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: isActive ? "#ff7518" : "#14151b",
                    border: isActive ? "1px solid #ff7518" : "1px solid #232530",
                    color: isActive ? "#ffffff" : "#9ca3af",
                    cursor: "pointer",
                    transition: "all 0.15s ease",
                  }}
                >
                  {pageNum}
                </button>
              );
            })}

            {totalPages > 5 && (
              <>
                <span style={{ color: "#6b7280", fontSize: "12px", padding: "0 4px" }}>...</span>
                <button
                  onClick={() => handlePageChange(totalPages)}
                  style={{
                    width: "32px",
                    height: "32px",
                    borderRadius: "8px",
                    fontSize: "12px",
                    fontWeight: 700,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: totalPages === currentPage ? "#ff7518" : "#14151b",
                    border: totalPages === currentPage ? "1px solid #ff7518" : "1px solid #232530",
                    color: totalPages === currentPage ? "#ffffff" : "#9ca3af",
                    cursor: "pointer",
                    transition: "all 0.15s ease",
                  }}
                >
                  {totalPages}
                </button>
              </>
            )}

            {/* Next */}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages || totalPages === 0}
              style={{
                background: "#ff7518",
                border: "none",
                color: "#ffffff",
                padding: "6px 14px",
                borderRadius: "8px",
                fontSize: "12px",
                fontWeight: 700,
                cursor: currentPage === totalPages || totalPages === 0 ? "not-allowed" : "pointer",
                opacity: currentPage === totalPages || totalPages === 0 ? 0.3 : 1,
                transition: "all 0.15s ease",
              }}
            >
              Next →
            </button>
          </div>
        </div>
      </div>

      {/* Add Tech Stack Modal */}
      {isAddTechOpen && (
        <div style={{ position: "fixed", inset: 0, zIndex: 9999, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(0,0,0,0.8)", padding: "16px", backdropFilter: "blur(4px)" }}>
          <div
            style={{ width: "100%", maxWidth: "380px", borderRadius: "18px", padding: "24px", background: "#111319", border: "1px solid #232530", boxShadow: "0 20px 40px rgba(0,0,0,0.8)", color: "white" }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px" }}>
              <h3 style={{ fontSize: "16px", fontWeight: 700, margin: 0 }}>Add Technology</h3>
              <button
                onClick={() => setIsAddTechOpen(false)}
                style={{ background: "transparent", border: "none", color: "#9ca3af", fontSize: "18px", cursor: "pointer" }}
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddTech} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <div>
                <label style={{ fontSize: "12px", color: "#8b929e", marginBottom: "6px", display: "block" }}>Technology / Skill Name</label>
                <input
                  type="text"
                  placeholder="e.g. Next.js, Rust, Docker"
                  value={newTech}
                  onChange={(e) => setNewTech(e.target.value)}
                  style={{ width: "100%", padding: "8px 12px", borderRadius: "8px", background: "#161822", border: "1px solid #282a36", fontSize: "13px", color: "white", outline: "none" }}
                  required
                />
              </div>

              <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px", marginTop: "8px" }}>
                <button
                  type="button"
                  onClick={() => setIsAddTechOpen(false)}
                  style={{ padding: "8px 16px", borderRadius: "8px", fontSize: "12px", fontWeight: 600, color: "#9ca3af", background: "transparent", border: "none", cursor: "pointer" }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSavingTech}
                  style={{ padding: "8px 18px", borderRadius: "8px", fontSize: "12px", fontWeight: 600, color: "white", background: "#ff7518", border: "none", cursor: "pointer", opacity: isSavingTech ? 0.5 : 1 }}
                >
                  {isSavingTech ? "Adding..." : "Add to Stack"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
