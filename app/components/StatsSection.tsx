"use client";
import Link from "next/link";

export default function StatsSection() {
  const stats = [
    {
      number: "500+",
      label: "Contributors",
      sublabel: "From across the globe",
      color: "#FF6000",
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      ),
    },
    {
      number: "24/7",
      label: "Community Support",
      sublabel: "Always available whenever you need us",
      color: "#22C55E",
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
          <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
        </svg>
      ),
    },
    {
      number: "50+",
      label: "Active Projects",
      sublabel: "Building the future together",
      color: "#22C55E",
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="16 18 22 12 16 6" />
          <polyline points="8 6 2 12 8 18" />
        </svg>
      ),
    },
    {
      number: "25+",
      label: "Cities",
      sublabel: "United by code and community",
      color: "#FF6000",
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10" />
          <line x1="2" y1="12" x2="22" y2="12" />
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
        </svg>
      ),
    },
  ];

  return (
    <section
      id="about"
      style={{
        background: "transparent",
        padding: "60px 24px 100px",
        position: "relative",
        zIndex: 1,
      }}
    >
      <div
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "1.1fr 1fr",
          gap: "64px",
          alignItems: "center",
        }}
        className="stats-grid-container"
      >
        {/* Left Info Column */}
        <div>
          {/* Tag */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              marginBottom: "16px",
            }}
          >
            <div
              style={{
                width: "6px",
                height: "6px",
                borderRadius: "50%",
                background: "#FF6000",
                boxShadow: "0 0 8px #FF6000",
              }}
            />
            <span
              style={{
                fontSize: "12.5px",
                color: "#FF6000",
                fontWeight: 700,
                letterSpacing: "1.5px",
                textTransform: "uppercase",
              }}
            >
              ABOUT US
            </span>
          </div>

          <h2
            style={{
              fontSize: "clamp(34px, 4.8vw, 56px)",
              fontWeight: 800,
              lineHeight: 1.12,
              letterSpacing: "-1px",
              marginBottom: "20px",
            }}
          >
            <span style={{ color: "#ffffff" }}>Building the</span>
            <br />
            <span style={{ color: "#FF6000" }}>Future </span>
            <span style={{ color: "#22C55E" }}>Together</span>
          </h2>

          <p
            style={{
              color: "#9ca3af",
              fontSize: "14.5px",
              lineHeight: 1.7,
              maxWidth: "520px",
              marginBottom: "32px",
            }}
          >
            Open Source Connect India is a community-driven event that brings together developers, designers, and open-source enthusiasts from across the country. Our goal is to foster collaboration, learning, and innovation through projects, workshops, and networking.
          </p>

          {/* Buttons Row */}
          <div style={{ display: "flex", gap: "16px", alignItems: "center", flexWrap: "wrap" }}>
            {/* Know more about us Button */}
            <Link
              href="#projects"
              style={{
                background: "#FF6000",
                color: "#ffffff",
                padding: "12px 24px",
                borderRadius: "4px",
                textDecoration: "none",
                fontWeight: 700,
                fontSize: "14px",
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                boxShadow: "0 4px 16px rgba(255, 96, 0, 0.35)",
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background = "#e65600";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background = "#FF6000";
              }}
            >
              Know more about us
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>

            {/* Community Since 2022 Pill Badge */}
            <div
              style={{
                background: "#141414",
                border: "1px solid rgba(255, 255, 255, 0.08)",
                borderRadius: "4px",
                padding: "8px 18px",
                display: "inline-flex",
                alignItems: "center",
                gap: "12px",
              }}
            >
              <div
                style={{
                  width: "32px",
                  height: "32px",
                  borderRadius: "4px",
                  background: "rgba(34, 197, 94, 0.15)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#22C55E",
                }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
                </svg>
              </div>
              <div>
                <div style={{ fontSize: "12.5px", fontWeight: 700, color: "#ffffff", letterSpacing: "0.2px" }}>
                  Community since 2022
                </div>
                <div style={{ fontSize: "11px", color: "#6b7280" }}>
                  Growing together
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right 2x2 Stats Grid with Sharp Corner L-Brackets */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "20px",
          }}
        >
          {stats.map((stat, i) => (
            <div
              key={i}
              style={{
                background: "#0d0d0d",
                border: "1px solid rgba(255, 255, 255, 0.05)",
                borderRadius: "4px",
                padding: "24px 22px",
                position: "relative",
                transition: "all 0.25s ease",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.12)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.05)";
              }}
            >
              {/* Sharp Top-Left L-Bracket */}
              <div
                style={{
                  position: "absolute",
                  top: "-1px",
                  left: "-1px",
                  width: "12px",
                  height: "12px",
                  borderTop: `2px solid ${stat.color}`,
                  borderLeft: `2px solid ${stat.color}`,
                  pointerEvents: "none",
                }}
              />

              {/* Sharp Bottom-Right L-Bracket */}
              <div
                style={{
                  position: "absolute",
                  bottom: "-1px",
                  right: "-1px",
                  width: "12px",
                  height: "12px",
                  borderBottom: `2px solid ${stat.color}`,
                  borderRight: `2px solid ${stat.color}`,
                  pointerEvents: "none",
                }}
              />

              {/* Top Row: Icon + Number */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: "20px",
                }}
              >
                <div
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "4px",
                    background: `${stat.color}18`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: stat.color,
                  }}
                >
                  {stat.icon}
                </div>
                <div
                  style={{
                    fontSize: "30px",
                    fontWeight: 800,
                    color: stat.color,
                    letterSpacing: "-0.5px",
                  }}
                >
                  {stat.number}
                </div>
              </div>

              {/* Title & Subtext */}
              <div
                style={{
                  fontSize: "15.5px",
                  fontWeight: 700,
                  color: "#ffffff",
                  marginBottom: "6px",
                }}
              >
                {stat.label}
              </div>
              <div
                style={{
                  fontSize: "12.5px",
                  color: "#6b7280",
                  lineHeight: 1.45,
                }}
              >
                {stat.sublabel}
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .stats-grid-container {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
        }
      `}</style>
    </section>
  );
}
