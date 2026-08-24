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
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
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
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M3 18v-6a9 9 0 0 1 18 0v6"></path>
          <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"></path>
        </svg>
      ),
    },
    {
      number: "50+",
      label: "Active Projects",
      sublabel: "Building the future",
      color: "#22C55E",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="16 18 22 12 16 6"></polyline>
          <polyline points="8 6 2 12 8 18"></polyline>
        </svg>
      ),
    },
    {
      number: "25+",
      label: "Cities",
      sublabel: "United by code and community",
      color: "#FF6000",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="2" y1="12" x2="22" y2="12"></line>
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
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
          gap: "80px",
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
            <div style={{ width: "6px", height: "6px", backgroundColor: "#FF6000", borderRadius: "50%" }} />
            <span
              style={{
                fontSize: "12px",
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
              fontSize: "clamp(36px, 5vw, 64px)",
              fontWeight: 800,
              lineHeight: 1.05,
              letterSpacing: "-1.5px",
              marginBottom: "24px",
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
              fontSize: "16px",
              lineHeight: 1.6,
              maxWidth: "540px",
              marginBottom: "40px",
            }}
          >
            Open Source Connect India is a community-driven event that brings together developers, designers, and open-source enthusiasts from across the country. Our goal is to foster collaboration, learning, and innovation through projects, workshops, and networking.
          </p>

          {/* Action Buttons */}
          <div style={{ display: "flex", gap: "16px", flexWrap: "wrap", alignItems: "center" }}>
            <Link
              href="#projects"
              style={{
                background: "#FF6000",
                color: "#ffffff",
                padding: "12px 24px",
                borderRadius: "4px",
                textDecoration: "none",
                fontWeight: 600,
                fontSize: "14px",
                display: "inline-flex",
                alignItems: "center",
                gap: "10px",
                boxShadow: "0 4px 16px rgba(255, 96, 0, 0.2)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background = "#e65600";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background = "#FF6000";
              }}
            >
              Know more about us
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </Link>

            <div
              style={{
                background: "rgba(10, 20, 10, 0.5)",
                color: "#9ca3af",
                padding: "10px 20px",
                borderRadius: "4px",
                textDecoration: "none",
                fontWeight: 500,
                fontSize: "14px",
                display: "inline-flex",
                alignItems: "center",
                gap: "10px",
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#22C55E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
              </svg>
              Community since 2022
            </div>
          </div>
        </div>

        {/* Right 2x2 Stats Grid */}
        <div
          className="stats-inner-grid"
          style={{
            display: "grid",
            gap: "24px",
          }}
        >
          {stats.map((stat, i) => (
            <div
              key={i}
              style={{
                background: "rgba(12, 12, 12, 0.7)",
                backdropFilter: "blur(12px)",
                borderRadius: "8px",
                padding: "32px 28px",
                position: "relative",
                transition: "all 0.25s ease",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.transform = "translateY(-3px)";
                (e.currentTarget as HTMLElement).style.boxShadow = `0 8px 30px ${stat.color}15`;
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                (e.currentTarget as HTMLElement).style.boxShadow = "none";
              }}
            >
              {/* Neon Corner Accents matching Figma precisely */}
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "16px",
                  height: "16px",
                  borderTop: `2px solid ${stat.color}`,
                  borderLeft: `2px solid ${stat.color}`,
                  borderTopLeftRadius: "8px",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  bottom: 0,
                  right: 0,
                  width: "16px",
                  height: "16px",
                  borderBottom: `2px solid ${stat.color}`,
                  borderRight: `2px solid ${stat.color}`,
                  borderBottomRightRadius: "8px",
                }}
              />

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: "24px",
                }}
              >
                <div
                  style={{
                    width: "48px",
                    height: "48px",
                    borderRadius: "12px",
                    background: `${stat.color}15`,
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
                    fontSize: "36px",
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
                  fontSize: "16px",
                  fontWeight: 700,
                  color: "#ffffff",
                  marginBottom: "6px",
                }}
              >
                {stat.label}
              </div>
              <div
                style={{
                  fontSize: "13px",
                  color: "#9ca3af",
                  lineHeight: 1.5,
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
            gap: 50px !important;
          }
        }
        @media (min-width: 500px) {
          .stats-inner-grid {
            grid-template-columns: 1fr 1fr !important;
          }
        }
        @media (max-width: 499px) {
          .stats-inner-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
