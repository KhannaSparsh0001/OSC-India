"use client";

import React, { useState } from "react";

export interface ProjectData {
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
  tags?: string[];
  category?: string;
  iconType?: string;
}

interface ProjectsClientProps {
  projects: ProjectData[];
}

// Icon rendering component matching each project theme
function ProjectIcon({ type, color }: { type?: string; color: string }) {
  const iconStyle = { width: "20px", height: "20px", stroke: color };

  switch (type) {
    case "truck": // Truxify
      return (
        <svg style={iconStyle} viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="1" y="3" width="15" height="13" />
          <polygon points="16 8 20 8 23 11 23 16 16 16 8" />
          <circle cx="5.5" cy="18.5" r="2.5" />
          <circle cx="18.5" cy="18.5" r="2.5" />
        </svg>
      );
    case "chart": // Customer Segmentation
      return (
        <svg style={iconStyle} viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="18" y1="20" x2="18" y2="10" />
          <line x1="12" y1="20" x2="12" y2="4" />
          <line x1="6" y1="20" x2="6" y2="14" />
        </svg>
      );
    case "cpu": // AdapTQ
      return (
        <svg style={iconStyle} viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="4" y="4" width="16" height="16" rx="2" />
          <rect x="9" y="9" width="6" height="6" />
          <line x1="9" y1="1" x2="9" y2="4" />
          <line x1="15" y1="1" x2="15" y2="4" />
          <line x1="9" y1="20" x2="9" y2="23" />
          <line x1="15" y1="20" x2="15" y2="23" />
          <line x1="20" y1="9" x2="23" y2="9" />
          <line x1="20" y1="14" x2="23" y2="14" />
          <line x1="1" y1="9" x2="4" y2="9" />
          <line x1="1" y1="14" x2="4" y2="14" />
        </svg>
      );
    case "video": // Bolcap
      return (
        <svg style={iconStyle} viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="23 7 16 12 23 17 23 7" />
          <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
        </svg>
      );
    case "leaf": // Air Quality
      return (
        <svg style={iconStyle} viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
          <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
        </svg>
      );
    case "eye": // EcoVision
      return (
        <svg style={iconStyle} viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
          <circle cx="12" cy="12" r="3" />
        </svg>
      );
    case "lock": // SecureFlow
      return (
        <svg style={iconStyle} viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
        </svg>
      );
    case "scale": // LawSaathi-RAG
      return (
        <svg style={iconStyle} viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z" />
          <path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z" />
          <path d="M7 21h10" />
          <path d="M12 3v18" />
          <path d="M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2" />
        </svg>
      );
    case "box": // AI Product Factory
      return (
        <svg style={iconStyle} viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="m21 16-9 5-9-5V8l9-5 9 5v8Z" />
          <path d="m3.27 6.96 8.73 4.86 8.73-4.86" />
          <path d="M12 21.75V11.82" />
        </svg>
      );
    case "brain": // InnoVision
      return (
        <svg style={iconStyle} viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 4.44-2.04Z" />
          <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-4.44-2.04Z" />
        </svg>
      );
    case "layout": // CreatorOS
      return (
        <svg style={iconStyle} viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <path d="M3 9h18" />
          <path d="M9 21V9" />
        </svg>
      );
    case "trending-up": // AI Stock Analyzer
      return (
        <svg style={iconStyle} viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
          <polyline points="17 6 23 6 23 12" />
        </svg>
      );
    case "server": // Dockfleet
      return (
        <svg style={iconStyle} viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="2" width="20" height="8" rx="2" ry="2" />
          <rect x="2" y="14" width="20" height="8" rx="2" ry="2" />
          <line x1="6" y1="6" x2="6.01" y2="6" />
          <line x1="6" y1="18" x2="6.01" y2="18" />
        </svg>
      );
    case "layers": // AtomicBinding
      return (
        <svg style={iconStyle} viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="12 2 2 7 12 12 22 7 12 2" />
          <polyline points="2 17 12 22 22 17" />
          <polyline points="2 12 12 17 22 12" />
        </svg>
      );
    case "terminal": // JugaadLang
      return (
        <svg style={iconStyle} viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="4 17 10 11 4 5" />
          <line x1="12" y1="19" x2="20" y2="19" />
        </svg>
      );
    case "wallet": // WalletWise
      return (
        <svg style={iconStyle} viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 12V7H5a2 2 0 0 1 0-4h14v4" />
          <path d="M3 5v14a2 2 0 0 0 2 2h16v-5" />
          <path d="M18 12a2 2 0 0 0 0 4h4v-4Z" />
        </svg>
      );
    case "calculator": // TCalc
      return (
        <svg style={iconStyle} viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="4" y="2" width="16" height="20" rx="2" />
          <line x1="8" y1="6" x2="16" y2="6" />
          <line x1="16" y1="14" x2="16" y2="18" />
          <path d="M16 10h.01" />
          <path d="M12 10h.01" />
          <path d="M8 10h.01" />
          <path d="M12 14h.01" />
          <path d="M8 14h.01" />
          <path d="M12 18h.01" />
          <path d="M8 18h.01" />
        </svg>
      );
    default:
      return (
        <svg style={iconStyle} viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="18" r="3" />
          <circle cx="6" cy="6" r="3" />
          <circle cx="18" cy="6" r="3" />
          <path d="M18 9v1a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V9" />
          <path d="M12 12v3" />
        </svg>
      );
  }
}

export default function ProjectsClient({ projects }: ProjectsClientProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  // Always ensure Truxify is the 1st project
  const orderedProjects = [...projects].sort((a, b) => {
    const isTruxifyA = a.title.toLowerCase().includes("truxify") || a.githubUrl.toLowerCase().includes("truxify");
    const isTruxifyB = b.title.toLowerCase().includes("truxify") || b.githubUrl.toLowerCase().includes("truxify");
    if (isTruxifyA && !isTruxifyB) return -1;
    if (!isTruxifyA && isTruxifyB) return 1;
    return 0;
  });

  // Pagination calculation
  const totalPages = Math.max(1, Math.ceil(orderedProjects.length / itemsPerPage));
  const activePage = Math.min(currentPage, totalPages);
  const startIdx = (activePage - 1) * itemsPerPage;
  const paginatedProjects = orderedProjects.slice(startIdx, startIdx + itemsPerPage);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      const catalogEl = document.getElementById("projects-catalog");
      if (catalogEl) {
        catalogEl.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  };


  return (
    <div style={{ width: "100%", display: "flex", flexDirection: "column" }}>
      {/* =========================================================
          HERO SECTION: Left Title & Actions + Right Illustration
         ========================================================= */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          gap: "40px",
          flexWrap: "wrap",
          marginBottom: "44px",
          width: "100%",
        }}
      >
        {/* Left Column: Heading & Description */}
        <div style={{ flex: 1, minWidth: "300px", maxWidth: "620px" }}>
          {/* Green Pill Badge */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "5px 14px",
              borderRadius: "9999px",
              background: "rgba(16, 185, 129, 0.08)",
              border: "1px solid rgba(16, 185, 129, 0.25)",
              marginBottom: "16px",
            }}
          >
            <span
              style={{
                width: "7px",
                height: "7px",
                borderRadius: "50%",
                background: "#10b981",
                boxShadow: "0 0 8px #10b981",
              }}
            />
            <span
              style={{
                fontSize: "12px",
                fontWeight: 600,
                color: "#10b981",
                letterSpacing: "0.02em",
              }}
            >
              Open Source. Real Impact.
            </span>
          </div>

          {/* Heading */}
          <h1
            style={{
              fontSize: "clamp(38px, 5.5vw, 52px)",
              fontWeight: 800,
              color: "#ffffff",
              letterSpacing: "-0.025em",
              lineHeight: 1.15,
              margin: "0 0 16px 0",
            }}
          >
            Our <span style={{ color: "#ff7518" }}>Projects</span>
          </h1>

          {/* Subtitle */}
          <p
            style={{
              fontSize: "15px",
              color: "#8b929e",
              lineHeight: 1.65,
              margin: "0 0 28px 0",
            }}
          >
            Explore a collection of open source projects built by the OSC India community.
            <br />
            Contribute, learn, and be a part of something bigger.
          </p>

          {/* Action Buttons */}
          <div style={{ display: "flex", alignItems: "center", gap: "14px", flexWrap: "wrap" }}>
            <button
              onClick={() => {
                const el = document.getElementById("projects-catalog");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
              style={{
                padding: "12px 28px",
                borderRadius: "9999px",
                background: "linear-gradient(135deg, #ff7518 0%, #ff5500 100%)",
                color: "#ffffff",
                fontSize: "13.5px",
                fontWeight: 700,
                border: "none",
                cursor: "pointer",
                boxShadow: "0 4px 16px rgba(255, 117, 24, 0.35)",
                transition: "all 0.2s ease",
              }}
              className="hover:scale-[1.02] active:scale-[0.98]"
            >
              Explore Projects
            </button>
          </div>
        </div>

        {/* Right Column: Quote Box & Open Source Graphic */}
        <div
          style={{
            flex: 1,
            minWidth: "300px",
            maxWidth: "480px",
            display: "flex",
            flexDirection: "column",
            gap: "20px",
          }}
        >
          {/* Top Quote Card */}
          <div
            style={{
              background: "rgba(20, 20, 25, 0.6)",
              border: "1px solid rgba(255, 255, 255, 0.08)",
              borderRadius: "16px",
              padding: "16px 22px",
              display: "flex",
              alignItems: "flex-start",
              gap: "12px",
              boxSizing: "border-box",
            }}
          >
            <div
              style={{
                fontSize: "34px",
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
                  fontSize: "13px",
                  fontStyle: "italic",
                  color: "#d1d5db",
                  margin: 0,
                  lineHeight: 1.5,
                }}
              >
                &ldquo;Great projects start with a great community.&rdquo;
              </p>
              <span
                style={{
                  fontSize: "11px",
                  color: "#8b929e",
                  display: "block",
                  textAlign: "right",
                  marginTop: "6px",
                  fontWeight: 500,
                }}
              >
                — OSC India
              </span>
            </div>
          </div>

          {/* Illustration with Floating Tags */}
          <div
            style={{
              position: "relative",
              width: "100%",
              height: "170px",
              borderRadius: "20px",
              background:
                "radial-gradient(ellipse 260px 140px at 50% 50%, rgba(255, 117, 24, 0.08), transparent 75%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {/* Center Stylized Wireframe Code Window */}
            <div
              style={{
                width: "210px",
                height: "110px",
                background: "rgba(18, 20, 26, 0.8)",
                border: "1px solid rgba(255, 255, 255, 0.12)",
                borderRadius: "12px",
                padding: "10px 12px",
                boxShadow: "0 10px 30px rgba(0, 0, 0, 0.5)",
                display: "flex",
                flexDirection: "column",
                gap: "8px",
              }}
            >
              {/* Window dots */}
              <div style={{ display: "flex", gap: "5px", alignItems: "center" }}>
                <span style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#ef4444" }} />
                <span style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#f59e0b" }} />
                <span style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#10b981" }} />
              </div>
              {/* Code lines */}
              <div style={{ display: "flex", flexDirection: "column", gap: "5px", marginTop: "2px" }}>
                <div style={{ width: "45%", height: "5px", borderRadius: "3px", background: "rgba(255, 117, 24, 0.6)" }} />
                <div style={{ width: "70%", height: "5px", borderRadius: "3px", background: "rgba(255, 255, 255, 0.15)" }} />
                <div style={{ width: "55%", height: "5px", borderRadius: "3px", background: "rgba(59, 130, 246, 0.5)" }} />
                <div style={{ width: "80%", height: "5px", borderRadius: "3px", background: "rgba(255, 255, 255, 0.1)" }} />
              </div>
            </div>

            {/* Floating Tag: </> (Top Left) */}
            <div
              style={{
                position: "absolute",
                top: "16px",
                left: "32px",
                padding: "5px 12px",
                borderRadius: "8px",
                background: "#141722",
                border: "1px solid rgba(255, 255, 255, 0.15)",
                fontSize: "11px",
                fontWeight: 600,
                color: "#e5e7eb",
                fontFamily: "monospace",
              }}
            >
              &lt;/&gt;
            </div>

            {/* Floating Tag: Build (Top Right) */}
            <div
              style={{
                position: "absolute",
                top: "22px",
                right: "42px",
                padding: "5px 14px",
                borderRadius: "8px",
                background: "#24180e",
                border: "1px solid rgba(245, 158, 11, 0.35)",
                fontSize: "11.5px",
                fontWeight: 600,
                color: "#f59e0b",
              }}
            >
              Build
            </div>

            {/* Floating Tag: Collaborate (Bottom Left) */}
            <div
              style={{
                position: "absolute",
                bottom: "16px",
                left: "14px",
                padding: "5px 14px",
                borderRadius: "8px",
                background: "#0c2419",
                border: "1px solid rgba(16, 185, 129, 0.4)",
                fontSize: "11.5px",
                fontWeight: 600,
                color: "#10b981",
              }}
            >
              Collaborate
            </div>

            {/* Floating Tag: Open Source (Bottom Right) */}
            <div
              style={{
                position: "absolute",
                bottom: "12px",
                right: "22px",
                padding: "5px 14px",
                borderRadius: "8px",
                background: "#0d1e34",
                border: "1px solid rgba(59, 130, 246, 0.4)",
                fontSize: "11.5px",
                fontWeight: 600,
                color: "#60a5fa",
              }}
            >
              Open Source
            </div>
          </div>
        </div>
      </div>

      {/* Anchor for Smooth Scroll */}
      <div id="projects-catalog" style={{ scrollMarginTop: "100px" }} />


      {/* =========================================================
          PROJECTS CARDS GRID (3 Columns x 3 Rows = 9 per page)
         ========================================================= */}
      {paginatedProjects.length === 0 ? (
        <div
          style={{
            background: "#0d0e12",
            border: "1px dashed #1c1e26",
            borderRadius: "20px",
            padding: "60px 24px",
            textAlign: "center",
            width: "100%",
            boxSizing: "border-box",
            margin: "20px 0 40px",
          }}
        >
          <div
            style={{
              width: "48px",
              height: "48px",
              borderRadius: "50%",
              background: "#181a24",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 16px",
              color: "#8b929e",
            }}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </div>
          <h3 style={{ fontSize: "16px", fontWeight: 700, color: "#ffffff", marginBottom: "6px" }}>
            No projects found
          </h3>
          <p style={{ fontSize: "13px", color: "#8b929e", margin: 0 }}>
            Try adjusting your search terms or filter selections.
          </p>
        </div>
      ) : (
        <div className="projects-catalog-grid" style={{ width: "100%", marginBottom: "36px" }}>
          {paginatedProjects.map((project) => {
            const accent = project.accentColor || "#FF7518";
            const tags = Array.isArray(project.tags) && project.tags.length > 0
              ? project.tags
              : [project.language || "Open Source"];

            const visibleTags = tags.slice(0, 3);
            const extraCount = tags.length > 3 ? tags.length - 3 : 0;

            return (
              <div
                key={project.id || project.githubUrl}
                style={{
                  background: "#0d0e12",
                  border: "1px solid #1c1e26",
                  borderTop: `3.5px solid ${accent}`,
                  borderRadius: "18px",
                  padding: "24px 22px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  boxSizing: "border-box",
                  minHeight: "260px",
                  transition: "all 0.2s ease",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
                }}
                className="hover:-translate-y-1 hover:border-[rgba(255,255,255,0.18)]"
              >
                <div>
                  {/* Header Row: Icon + Title */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "14px",
                      marginBottom: "14px",
                    }}
                  >
                    <div
                      style={{
                        width: "42px",
                        height: "42px",
                        borderRadius: "12px",
                        background: `${accent}18`,
                        border: `1px solid ${accent}35`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      <ProjectIcon type={project.iconType} color={accent} />
                    </div>

                    <h3
                      style={{
                        fontSize: "15.5px",
                        fontWeight: 700,
                        color: "#ffffff",
                        margin: 0,
                        lineHeight: 1.35,
                      }}
                    >
                      {project.title}
                    </h3>
                  </div>

                  {/* Description */}
                  <p
                    style={{
                      fontSize: "12.5px",
                      color: "#8b929e",
                      lineHeight: 1.55,
                      margin: "0 0 16px 0",
                      display: "-webkit-box",
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                    }}
                  >
                    {project.description}
                  </p>

                  {/* Technology Tags */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                      flexWrap: "wrap",
                      marginBottom: "16px",
                    }}
                  >
                    {visibleTags.map((tag) => (
                      <span
                        key={tag}
                        style={{
                          background: "#12141a",
                          border: "1px solid #1e202a",
                          borderRadius: "6px",
                          padding: "3px 9px",
                          fontSize: "11px",
                          fontWeight: 500,
                          color: "#9ca3af",
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                    {extraCount > 0 && (
                      <span
                        style={{
                          background: "#12141a",
                          border: "1px solid #1e202a",
                          borderRadius: "6px",
                          padding: "3px 8px",
                          fontSize: "11px",
                          fontWeight: 600,
                          color: "#8b929e",
                        }}
                      >
                        +{extraCount}
                      </span>
                    )}
                  </div>
                </div>

                {/* Footer Row: Stars, Forks & View Project */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    paddingTop: "14px",
                    borderTop: "1px solid #161822",
                    marginTop: "auto",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "16px",
                      fontSize: "12.5px",
                      color: "#8b929e",
                      fontWeight: 500,
                    }}
                  >
                    {/* Stars */}
                    <div style={{ display: "flex", alignItems: "center", gap: "5px" }} title="Stars">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                      </svg>
                      <span>{project.stars ?? "0"}</span>
                    </div>

                    {/* Forks */}
                    <div style={{ display: "flex", alignItems: "center", gap: "5px" }} title="Forks">
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="18" r="3" />
                        <circle cx="6" cy="6" r="3" />
                        <circle cx="18" cy="6" r="3" />
                        <path d="M18 9v1a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V9" />
                        <path d="M12 12v3" />
                      </svg>
                      <span>{project.forks ?? "0"}</span>
                    </div>

                    {/* Open Issues */}
                    <div style={{ display: "flex", alignItems: "center", gap: "5px" }} title="Open Issues">
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10" />
                        <circle cx="12" cy="12" r="3" />
                      </svg>
                      <span>{project.openIssues ?? "0"}</span>
                    </div>

                    {/* Unassigned Issues */}
                    <div style={{ display: "flex", alignItems: "center", gap: "5px" }} title="Unassigned Issues">
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10" />
                        <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                        <line x1="12" y1="17" x2="12.01" y2="17" />
                      </svg>
                      <span>{project.unassignedIssues ?? "0"}</span>
                    </div>
                  </div>

                  {/* View Project Link */}
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      fontSize: "12.5px",
                      fontWeight: 600,
                      color: accent,
                      textDecoration: "none",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "4px",
                    }}
                    className="hover:underline"
                  >
                    <span>View Project</span>
                    <span>→</span>
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* =========================================================
          PAGINATION & PROJECTS COUNTER
         ========================================================= */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "16px",
          width: "100%",
          paddingTop: "8px",
        }}
      >
        {/* Pagination Buttons */}
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          {/* Prev button */}
          <button
            onClick={() => handlePageChange(activePage - 1)}
            disabled={activePage <= 1}
            style={{
              width: "36px",
              height: "36px",
              borderRadius: "50%",
              background: "#12141a",
              border: "1px solid #1f222c",
              color: "#8b929e",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: activePage <= 1 ? "not-allowed" : "pointer",
              opacity: activePage <= 1 ? 0.35 : 1,
              transition: "all 0.15s ease",
            }}
            aria-label="Previous Page"
          >
            &lt;
          </button>

          {/* Page numbers */}
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => {
            const isSelected = activePage === pageNum;
            return (
              <button
                key={pageNum}
                onClick={() => handlePageChange(pageNum)}
                style={{
                  minWidth: "36px",
                  height: "36px",
                  padding: "0 10px",
                  borderRadius: "8px",
                  background: isSelected ? "#ff7518" : "#12141a",
                  border: isSelected ? "none" : "1px solid #1f222c",
                  color: isSelected ? "#ffffff" : "#8b929e",
                  fontSize: "13px",
                  fontWeight: isSelected ? 700 : 500,
                  cursor: "pointer",
                  transition: "all 0.15s ease",
                }}
                className={!isSelected ? "hover:text-white hover:border-[#ff7518]" : ""}
              >
                {pageNum}
              </button>
            );
          })}

          {/* Next button */}
          <button
            onClick={() => handlePageChange(activePage + 1)}
            disabled={activePage >= totalPages}
            style={{
              width: "36px",
              height: "36px",
              borderRadius: "50%",
              background: "#12141a",
              border: "1px solid #1f222c",
              color: "#8b929e",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: activePage >= totalPages ? "not-allowed" : "pointer",
              opacity: activePage >= totalPages ? 0.35 : 1,
              transition: "all 0.15s ease",
            }}
            aria-label="Next Page"
          >
            &gt;
          </button>
        </div>

        {/* Counter text */}
        <div style={{ fontSize: "13px", color: "#8b929e", fontWeight: 500 }}>
          Showing {paginatedProjects.length > 0 ? startIdx + 1 : 0} –{" "}
          {startIdx + paginatedProjects.length} of {projects.length} projects
        </div>
      </div>
    </div>
  );
}

