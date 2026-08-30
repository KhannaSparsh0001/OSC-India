"use client";
import Link from "next/link";

export default function ProjectsSection() {
  const projects = [
    {
      name: "CloudNative Orchestrator",
      language: "Go",
      dotColor: "#06b6d4",
      accentColor: "#22d3ee",
      desc: "A modern container orchestration platform built for scalability and performance",
      stars: "12.5k",
      forks: "2.3k",
    },
    {
      name: "DataFlow Pipeline",
      language: "Python",
      dotColor: "#3b82f6",
      accentColor: "#34d399",
      desc: "Real-time data processing framework with distributed architecture",
      stars: "8.9k",
      forks: "1.5k",
    },
    {
      name: "ReactUI Components",
      language: "TypeScript",
      dotColor: "#3b82f6",
      accentColor: "#f472b6",
      desc: "Comprehensive component library with accessibility-first design",
      stars: "15.2k",
      forks: "3.1k",
    },
    {
      name: "ML Vision Toolkit",
      language: "Python",
      dotColor: "#3b82f6",
      accentColor: "#ef4444",
      desc: "Computer vision library powered by cutting-edge machine learning models",
      stars: "9.8k",
      forks: "1.9k",
    },
    {
      name: "SecureAuth Framework",
      language: "Rust",
      dotColor: "#f97316",
      accentColor: "#3b82f6",
      desc: "Enterprise-grade authentication and authorization solution",
      stars: "6.7k",
      forks: "987",
    },
    {
      name: "DevOps Automation",
      language: "JavaScript",
      dotColor: "#eab308",
      accentColor: "#f97316",
      desc: "Complete CI/CD automation suite for modern development workflows",
      stars: "11.3k",
      forks: "2.4k",
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
          <span
            style={{
              fontSize: "13px",
              color: "#FF6000",
              fontWeight: 700,
              letterSpacing: "1.5px",
              textTransform: "uppercase",
            }}
          >
            &lt; FEATURED WORK &gt;
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
          <span style={{ color: "#ffffff" }}>our</span>
          <br />
          <span style={{ color: "#ffffff" }}>community.</span>
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
                  backgroundColor: "#131315",
                  borderRadius: "16px",
                  border: "1px solid rgba(255, 255, 255, 0.07)",
                  borderTop: `3.5px solid ${project.accentColor}`,
                  padding: "30px 28px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  minHeight: "260px",
                }}
              >
                <div>
                  <div
                    style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "10px",
                      backgroundColor: "rgba(255, 255, 255, 0.05)",
                      border: "1px solid rgba(255, 255, 255, 0.08)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginBottom: "20px",
                    }}
                  >
                    <svg
                      style={{ width: "20px", height: "20px", color: "#e5e7eb" }}
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <circle cx="12" cy="18" r="3" />
                      <circle cx="6" cy="6" r="3" />
                      <circle cx="18" cy="6" r="3" />
                      <path d="M18 9v1a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V9" />
                      <path d="M12 12v3" />
                    </svg>
                  </div>

                  <h3
                    style={{
                      fontSize: "18px",
                      fontWeight: 700,
                      color: "#ffffff",
                      marginBottom: "8px",
                      letterSpacing: "-0.2px",
                      lineHeight: 1.3,
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
                      alignItems: "center",
                      gap: "8px",
                      marginBottom: "24px",
                    }}
                  >
                    <span
                      style={{
                        width: "8px",
                        height: "8px",
                        borderRadius: "50%",
                        backgroundColor: project.dotColor,
                        display: "inline-block",
                      }}
                    />
                    <span
                      style={{
                        fontSize: "13px",
                        fontWeight: 500,
                        color: "#e5e7eb",
                      }}
                    >
                      {project.language}
                    </span>
                  </div>
                </div>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "12px",
                    marginTop: "auto",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "18px",
                      color: "#9ca3af",
                      fontSize: "13.5px",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                      <svg
                        style={{ width: "16px", height: "16px", color: "#9ca3af" }}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                      </svg>
                      <span style={{ fontWeight: 500 }}>{project.stars}</span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                      <svg
                        style={{ width: "16px", height: "16px", color: "#9ca3af" }}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <circle cx="12" cy="18" r="3" />
                        <circle cx="6" cy="6" r="3" />
                        <circle cx="18" cy="6" r="3" />
                        <path d="M18 9v1a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V9" />
                        <path d="M12 12v3" />
                      </svg>
                      <span style={{ fontWeight: 500 }}>{project.forks}</span>
                    </div>
                  </div>

                  <span
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "6px",
                      color: "#f97316",
                      fontWeight: 600,
                      fontSize: "14px",
                    }}
                  >
                    View Project
                    <svg
                      style={{ width: "15px", height: "15px" }}
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                      <polyline points="15 3 21 3 21 9" />
                      <line x1="10" y1="14" x2="21" y2="3" />
                    </svg>
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Subtle Blur & Dim Overlay */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              backdropFilter: "blur(6px)",
              WebkitBackdropFilter: "blur(6px)",
              background: "rgba(10, 10, 10, 0.7)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "16px",
              zIndex: 10,
              borderRadius: "16px",
            }}
          >
            {/* Center Announcement Box */}
            <div
              className="coming-soon-card"
              style={{
                background: "rgba(13, 13, 15, 0.96)",
                border: "1px solid rgba(255, 96, 0, 0.25)",
                borderRadius: "16px",
                padding: "48px 36px",
                maxWidth: "560px",
                width: "100%",
                textAlign: "center",
                boxShadow:
                  "0 24px 80px rgba(0, 0, 0, 0.95), 0 0 40px rgba(255, 96, 0, 0.12)",
                backdropFilter: "blur(16px)",
                position: "relative",
              }}
            >
              {/* Sharp Top-Left L-Bracket */}
              <div
                style={{
                  position: "absolute",
                  top: "-2px",
                  left: "-2px",
                  width: "16px",
                  height: "16px",
                  borderTop: "3px solid #FF6000",
                  borderLeft: "3px solid #FF6000",
                  pointerEvents: "none",
                  borderTopLeftRadius: "6px",
                }}
              />

              {/* Sharp Bottom-Right L-Bracket */}
              <div
                style={{
                  position: "absolute",
                  bottom: "-2px",
                  right: "-2px",
                  width: "16px",
                  height: "16px",
                  borderBottom: "3px solid #FF6000",
                  borderRight: "3px solid #FF6000",
                  pointerEvents: "none",
                  borderBottomRightRadius: "6px",
                }}
              />

              {/* Pulsing Tag */}
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "10px",
                  background: "rgba(255, 96, 0, 0.08)",
                  border: "1px solid rgba(255, 96, 0, 0.35)",
                  padding: "8px 22px",
                  borderRadius: "6px",
                  marginBottom: "24px",
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
                    fontSize: "13px",
                    fontWeight: 800,
                    color: "#FF6000",
                    letterSpacing: "2px",
                    textTransform: "uppercase",
                  }}
                >
                  COMING SOON
                </span>
              </div>

              {/* Title */}
              <h3
                style={{
                  fontSize: "clamp(22px, 3.8vw, 30px)",
                  fontWeight: 800,
                  color: "#ffffff",
                  marginBottom: "16px",
                  letterSpacing: "-0.5px",
                  lineHeight: 1.25,
                }}
              >
                Projects Showcase Launching Soon
              </h3>

              {/* Subtext */}
              <p
                style={{
                  fontSize: "15px",
                  color: "#9ca3af",
                  lineHeight: 1.65,
                  maxWidth: "480px",
                  margin: "0 auto 32px",
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
                    padding: "14px 32px",
                    borderRadius: "10px",
                    textDecoration: "none",
                    fontWeight: 700,
                    fontSize: "15px",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "10px",
                    boxShadow: "0 6px 25px rgba(255, 96, 0, 0.45)",
                    transition: "all 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.background = "#e65600";
                    (e.currentTarget as HTMLElement).style.transform = "translateY(-1px)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.background = "#FF6000";
                    (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                  }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
                    <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
                  </svg>
                  Get Notified on Launch
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

    </section>
  );
}
