"use client";
import Link from "next/link";

export default function ProjectsSection() {
  const projects = [
    {
      name: "GovTrack",
      category: "Civic Tech",
      categoryColor: "#22C55E",
      desc: "Open platform tracking government schemes & public fund implementation across Indian states.",
      tags: ["React", "Python", "GraphQL"],
      stars: "1.2k",
      forks: "340",
    },
    {
      name: "HealthSync",
      category: "Healthcare",
      categoryColor: "#FF6000",
      desc: "Decentralized health record sync designed specifically for rural healthcare and Asha workers.",
      tags: ["Next.js", "Rust", "PostgreSQL"],
      stars: "890",
      forks: "120",
    },
    {
      name: "CodeMentor",
      category: "Education",
      categoryColor: "#9ca3af",
      desc: "AI-assisted interactive coding platform and curriculum available in 10+ Indian regional languages.",
      tags: ["Vue.js", "FastAPI", "PyTorch"],
      stars: "2.4k",
      forks: "560",
    },
    {
      name: "GreenTrace",
      category: "Sustainability",
      categoryColor: "#22C55E",
      desc: "Carbon footprint analytics and reporting tool for Indian startups and SMEs in green tech.",
      tags: ["TypeScript", "Node.js", "Docker"],
      stars: "750",
      forks: "95",
    },
    {
      name: "OpenLiteracy",
      category: "Education",
      categoryColor: "#FF6000",
      desc: "Interactive regional language literacy tools, open stories, and digital books for schools.",
      tags: ["Flutter", "Firebase", "Dart"],
      stars: "1.5k",
      forks: "410",
    },
    {
      name: "AIVaani",
      category: "Voice AI",
      categoryColor: "#38BDF8",
      desc: "Open voice dataset, speech-to-text models, and TTS toolkit for 22 scheduled Indian languages.",
      tags: ["Python", "TensorFlow", "WebRTC"],
      stars: "3.1k",
      forks: "820",
    },
  ];

  return (
    <section
      id="projects"
      className="projects-section"
      style={{
        background: "#080808",
        padding: "80px clamp(32px, 8vw, 120px)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div style={{ width: "100%", position: "relative" }}>
        {/* Tag */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            marginBottom: "14px",
          }}
        >
          <div style={{ width: "6px", height: "6px", backgroundColor: "#FF6000", borderRadius: "50%", boxShadow: "0 0 8px #FF6000" }} />
          <span
            style={{
              fontSize: "12px",
              color: "#FF6000",
              fontWeight: 700,
              letterSpacing: "1.5px",
              textTransform: "uppercase",
            }}
          >
            FEATURED WORK
          </span>
        </div>

        {/* Heading */}
        <h2
          style={{
            fontSize: "clamp(28px, 4.5vw, 48px)",
            fontWeight: 800,
            letterSpacing: "-0.5px",
            lineHeight: 1.15,
            marginBottom: "16px",
          }}
        >
          <span style={{ color: "#ffffff" }}>Innovative projects built by </span>
          <span style={{ color: "#22C55E" }}>our</span>
          <br />
          <span style={{ color: "#FF6000" }}>community.</span>
        </h2>

        <p
          style={{
            color: "#9ca3af",
            fontSize: "15px",
            lineHeight: 1.6,
            marginBottom: "40px",
            maxWidth: "520px",
          }}
        >
          Explore projects built by developers across India solving real-world problems through open source collaboration.
        </p>

        {/* Projects Container with Horizontal Alignment on Mobile */}
        <div style={{ position: "relative", width: "100%" }}>
          {/* Projects Cards Container */}
          <div
            className="projects-cards-container"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))",
              gap: "24px",
              opacity: 0.35,
              pointerEvents: "none",
              userSelect: "none",
              filter: "blur(1px)",
            }}
          >
            {projects.map((project, i) => (
              <div
                key={i}
                className="project-card-item"
                style={{
                  background: "#0d0d0d",
                  border: "1px solid rgba(255,255,255,0.06)",
                  borderRadius: "4px",
                  padding: "24px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  minHeight: "260px",
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
                    <div
                      style={{
                        width: "36px",
                        height: "36px",
                        borderRadius: "4px",
                        background: "rgba(255,255,255,0.05)",
                        border: "1px solid rgba(255,255,255,0.1)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontWeight: 700,
                        color: project.categoryColor,
                        fontSize: "14px",
                      }}
                    >
                      {project.name.slice(0, 2)}
                    </div>
                    <span
                      style={{
                        fontSize: "11px",
                        fontWeight: 600,
                        color: project.categoryColor,
                        background: `${project.categoryColor}15`,
                        border: `1px solid ${project.categoryColor}30`,
                        padding: "3px 10px",
                        borderRadius: "2px",
                      }}
                    >
                      {project.category}
                    </span>
                  </div>

                  <h3
                    style={{
                      fontSize: "18px",
                      fontWeight: 700,
                      color: "#ffffff",
                      marginBottom: "8px",
                    }}
                  >
                    {project.name}
                  </h3>

                  <p
                    style={{
                      fontSize: "13.5px",
                      color: "#9ca3af",
                      lineHeight: 1.6,
                      marginBottom: "20px",
                    }}
                  >
                    {project.desc}
                  </p>

                  <div
                    style={{
                      display: "flex",
                      gap: "8px",
                      flexWrap: "wrap",
                      marginBottom: "24px",
                    }}
                  >
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        style={{
                          fontSize: "11.5px",
                          color: "#9ca3af",
                          background: "rgba(255,255,255,0.04)",
                          border: "1px solid rgba(255,255,255,0.08)",
                          padding: "3px 8px",
                          borderRadius: "2px",
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    paddingTop: "16px",
                    borderTop: "1px solid rgba(255,255,255,0.06)",
                    fontSize: "12.5px",
                    color: "#9ca3af",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                    <span style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                      ★ {project.stars}
                    </span>
                    <span style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                      ⑂ {project.forks}
                    </span>
                  </div>
                  <span style={{ color: "#FF6000", fontWeight: 600, fontSize: "12.5px" }}>
                    View Code →
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* "Coming Soon" Overlay Centered Cleanly Over Project Cards */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              backdropFilter: "blur(6px)",
              WebkitBackdropFilter: "blur(6px)",
              background: "rgba(10, 10, 10, 0.65)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "16px",
              zIndex: 10,
              borderRadius: "4px",
            }}
          >
            <div
              className="coming-soon-card"
              style={{
                background: "rgba(14, 14, 14, 0.95)",
                border: "1px solid rgba(255, 96, 0, 0.35)",
                borderRadius: "6px",
                padding: "36px 28px",
                maxWidth: "480px",
                width: "100%",
                textAlign: "center",
                boxShadow:
                  "0 24px 70px rgba(0, 0, 0, 0.9), 0 0 40px rgba(255, 96, 0, 0.15)",
                backdropFilter: "blur(16px)",
                position: "relative",
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
                  borderTop: "2px solid #FF6000",
                  borderLeft: "2px solid #FF6000",
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
                  borderBottom: "2px solid #FF6000",
                  borderRight: "2px solid #FF6000",
                  pointerEvents: "none",
                }}
              />

              {/* Pulsing Tag */}
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  background: "rgba(255, 96, 0, 0.12)",
                  border: "1px solid rgba(255, 96, 0, 0.3)",
                  padding: "6px 16px",
                  borderRadius: "2px",
                  marginBottom: "16px",
                }}
              >
                <div
                  style={{
                    width: "8px",
                    height: "8px",
                    borderRadius: "50%",
                    background: "#FF6000",
                    boxShadow: "0 0 10px #FF6000",
                  }}
                />
                <span
                  style={{
                    fontSize: "12px",
                    fontWeight: 700,
                    color: "#FF6000",
                    letterSpacing: "1.5px",
                    textTransform: "uppercase",
                  }}
                >
                  Coming Soon
                </span>
              </div>

              {/* Title */}
              <h3
                style={{
                  fontSize: "clamp(20px, 4vw, 24px)",
                  fontWeight: 800,
                  color: "#ffffff",
                  marginBottom: "10px",
                  letterSpacing: "-0.5px",
                }}
              >
                Projects Showcase Launching Soon
              </h3>

              {/* Subtext */}
              <p
                style={{
                  fontSize: "13.5px",
                  color: "#9ca3af",
                  lineHeight: 1.6,
                  marginBottom: "24px",
                }}
              >
                We are currently onboarding and curating high-impact open source repositories, civic tech tools, and AI initiatives across India.
              </p>

              {/* Action Button */}
              <div style={{ display: "flex", justifyContent: "center" }}>
                <Link
                  href="https://discord.gg"
                  target="_blank"
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
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.background = "#e65600";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.background = "#FF6000";
                  }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                    <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                  </svg>
                  Get Notified on Launch
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .projects-cards-container {
            display: flex !important;
            flex-direction: row !important;
            overflow-x: auto !important;
            gap: 14px !important;
            scroll-snap-type: x mandatory !important;
            padding-bottom: 8px !important;
            -webkit-overflow-scrolling: touch;
          }
          .project-card-item {
            flex: 0 0 260px !important;
            width: 260px !important;
            min-width: 260px !important;
            scroll-snap-align: start !important;
          }
          .coming-soon-card {
            padding: 28px 18px !important;
          }
          .projects-section {
            padding-top: 20px !important;
          }
        }
      `}</style>
    </section>
  );
}
