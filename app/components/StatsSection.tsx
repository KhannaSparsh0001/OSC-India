"use client";
import Link from "next/link";

export default function StatsSection() {
  const stats = [
    {
      number: "500+",
      label: "Contributors",
      sublabel: "Pan-India Reach",
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
      sublabel: "Active Mentorship",
      color: "#22C55E",
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10" />
          <path d="M12 6v6l4 2" />
        </svg>
      ),
    },
    {
      number: "50+",
      label: "Active Projects",
      sublabel: "Open source repo list",
      color: "#22C55E",
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
          <line x1="8" y1="21" x2="16" y2="21" />
          <line x1="12" y1="17" x2="12" y2="21" />
        </svg>
      ),
    },
    {
      number: "25+",
      label: "Cities",
      sublabel: "Spread across community",
      color: "#FF6000",
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M3 21h18M3 7v14M9 3v18M15 10v11M21 7v14" />
        </svg>
      ),
    },
  ];

  return (
    <section
      id="about"
      style={{
        background: "transparent",
        padding: "80px 24px 120px",
        position: "relative",
        zIndex: 1,
      }}
    >
      <div
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "64px",
          alignItems: "center",
        }}
        className="stats-grid-container"
      >
        {/* Left Info Column */}
        <div>
          {/* Section Tag */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              marginBottom: "16px",
            }}
          >
            <span
              style={{
                fontSize: "13px",
                color: "#FF6000",
                fontWeight: 700,
                letterSpacing: "1.5px",
                textTransform: "uppercase",
              }}
            >
              &lt; ABOUT US &gt;
            </span>
          </div>

          <h2
            style={{
              fontSize: "clamp(32px, 4.5vw, 52px)",
              fontWeight: 800,
              lineHeight: 1.15,
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
              fontSize: "15px",
              lineHeight: 1.7,
              maxWidth: "500px",
              marginBottom: "32px",
            }}
          >
            Join us this August to connect, collaborate, and contribute to open source projects that are shaping the future of technology. Open Source Connect India brings together passionate developers, designers, and innovators across India.
          </p>

          {/* Action Buttons */}
          <div style={{ display: "flex", gap: "14px", flexWrap: "wrap" }}>
            <Link
              href="#projects"
              style={{
                background: "#FF6000",
                color: "#ffffff",
                padding: "12px 24px",
                borderRadius: "8px",
                textDecoration: "none",
                fontWeight: 700,
                fontSize: "14px",
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                boxShadow: "0 4px 16px rgba(255, 96, 0, 0.35)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background = "#e65600";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background = "#FF6000";
              }}
            >
              View Community Stats
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>

            <Link
              href="https://discord.gg"
              target="_blank"
              style={{
                background: "rgba(34, 197, 94, 0.08)",
                color: "#22C55E",
                padding: "12px 24px",
                borderRadius: "8px",
                textDecoration: "none",
                fontWeight: 600,
                fontSize: "14px",
                border: "1px solid rgba(34, 197, 94, 0.3)",
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background = "rgba(34, 197, 94, 0.16)";
                (e.currentTarget as HTMLElement).style.borderColor = "#22C55E";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background = "rgba(34, 197, 94, 0.08)";
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(34, 197, 94, 0.3)";
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <line x1="2" y1="12" x2="22" y2="12" />
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
              </svg>
              Join Discord Server
            </Link>
          </div>
        </div>

        {/* Right 2x2 Stats Grid */}
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
                background: "rgba(17, 17, 17, 0.8)",
                backdropFilter: "blur(12px)",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: "14px",
                padding: "28px 24px",
                position: "relative",
                transition: "all 0.25s ease",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.transform = "translateY(-3px)";
                (e.currentTarget as HTMLElement).style.borderColor = `${stat.color}60`;
                (e.currentTarget as HTMLElement).style.boxShadow = `0 8px 30px ${stat.color}20`;
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.08)";
                (e.currentTarget as HTMLElement).style.boxShadow = "none";
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: "16px",
                }}
              >
                <div
                  style={{
                    width: "42px",
                    height: "42px",
                    borderRadius: "10px",
                    background: `${stat.color}15`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: stat.color,
                    border: `1px solid ${stat.color}30`,
                  }}
                >
                  {stat.icon}
                </div>
                <div
                  style={{
                    fontSize: "32px",
                    fontWeight: 800,
                    color: "#ffffff",
                    letterSpacing: "-1px",
                  }}
                >
                  {stat.number}
                </div>
              </div>

              <div
                style={{
                  fontSize: "15px",
                  fontWeight: 700,
                  color: "#ffffff",
                  marginBottom: "4px",
                }}
              >
                {stat.label}
              </div>
              <div
                style={{
                  fontSize: "13px",
                  color: "#9ca3af",
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
