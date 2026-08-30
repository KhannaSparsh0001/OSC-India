"use client";
import Link from "next/link";
import React from "react";

function StarIcon({ style, className }: { style?: React.CSSProperties; className?: string }) {
  return (
    <svg
      style={style}
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}

function GitForkIcon({ style, className }: { style?: React.CSSProperties; className?: string }) {
  return (
    <svg
      style={style}
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="18" r="3" />
      <circle cx="6" cy="6" r="3" />
      <circle cx="18" cy="6" r="3" />
      <path d="M18 9v1a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V9" />
      <path d="M12 12v3" />
    </svg>
  );
}

function ExternalLinkIcon({ style, className }: { style?: React.CSSProperties; className?: string }) {
  return (
    <svg
      style={style}
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  );
}

export interface ProjectCardProps {
  title: string;
  description: string;
  language: string;
  stars: string;
  forks: string;
  githubUrl: string;
  accentColor: string; // Hex color string
}

const languageColors: Record<string, string> = {
  "Go": "#06b6d4",         // Cyan
  "Python": "#3b82f6",     // Blue
  "TypeScript": "#3b82f6", // Blue
  "Rust": "#f97316",       // Orange
  "JavaScript": "#eab308", // Yellow
};

export default function ProjectCard({
  title,
  description,
  language,
  stars,
  forks,
  githubUrl,
  accentColor,
}: ProjectCardProps) {
  const dotColor = languageColors[language] || accentColor || "#9ca3af";

  return (
    <div
      style={{
        backgroundColor: "#131315",
        borderRadius: "16px",
        border: "1px solid rgba(255, 255, 255, 0.07)",
        borderTop: `3.5px solid ${accentColor}`,
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        height: "100%",
        padding: "clamp(22px, 5vw, 30px) clamp(20px, 4vw, 28px)",
        transition: "all 0.3s ease",
        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.4)",
      }}
      className="hover:-translate-y-1 hover:shadow-2xl"
    >
      <div>
        {/* Header Icon Box */}
        <div
          style={{
            width: "38px",
            height: "38px",
            borderRadius: "10px",
            backgroundColor: "rgba(255, 255, 255, 0.05)",
            border: "1px solid rgba(255, 255, 255, 0.08)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "clamp(14px, 3vw, 20px)",
          }}
        >
          <GitForkIcon style={{ width: "18px", height: "18px", color: "#e5e7eb" }} />
        </div>

        {/* Title */}
        <h3
          style={{
            fontSize: "clamp(16.5px, 2.5vw, 18px)",
            fontWeight: 700,
            color: "#ffffff",
            marginBottom: "8px",
            letterSpacing: "-0.2px",
            lineHeight: 1.35,
          }}
        >
          {title}
        </h3>

        {/* Description */}
        <p
          style={{
            fontSize: "clamp(13px, 2vw, 13.5px)",
            color: "#9ca3af",
            lineHeight: 1.6,
            marginBottom: "16px",
          }}
        >
          {description}
        </p>

        {/* Tech Language Indicator */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            marginBottom: "clamp(16px, 3.5vw, 24px)",
          }}
        >
          <span
            style={{
              width: "8px",
              height: "8px",
              borderRadius: "50%",
              backgroundColor: dotColor,
              display: "inline-block",
              flexShrink: 0,
            }}
          />
          <span
            style={{
              fontSize: "13px",
              fontWeight: 500,
              color: "#e5e7eb",
            }}
          >
            {language}
          </span>
        </div>
      </div>

      {/* Footer Area: Stats & Link */}
      <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginTop: "auto" }}>
        {/* Stats Row */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            color: "#9ca3af",
            fontSize: "13px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <StarIcon style={{ width: "15px", height: "15px", color: "#9ca3af" }} />
            <span style={{ fontWeight: 500 }}>{stars}</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <GitForkIcon style={{ width: "15px", height: "15px", color: "#9ca3af" }} />
            <span style={{ fontWeight: 500 }}>{forks}</span>
          </div>
        </div>

        {/* View Project Link */}
        <Link
          href={githubUrl}
          target="_blank"
          className="inline-flex items-center gap-1.5 text-[#f97316] hover:text-[#ea580c] text-[13.5px] sm:text-[14px] font-semibold transition-colors w-fit no-underline py-0.5"
        >
          View Project <ExternalLinkIcon style={{ width: "15px", height: "15px" }} />
        </Link>
      </div>
    </div>
  );
}
