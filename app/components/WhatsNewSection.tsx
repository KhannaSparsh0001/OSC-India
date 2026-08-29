"use client";

export default function WhatsNewSection() {
  const updates = [
    {
      num: "01",
      tag: "NEW IN 2026",
      tagColor: "#FF7518",
      title: "AI Code Review Assistant",
      desc: "Get intelligent suggestions and automated feedback before opening a pull request.",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
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
      ),
    },
    {
      num: "02",
      tag: "NEW IN 2026",
      tagColor: "#22C55E",
      title: "Verified Contributor Profiles",
      desc: "Showcase your verified contributions and build trust across the community.",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        </svg>
      ),
    },
    {
      num: "03",
      tag: "NEW IN 2026",
      tagColor: "#FF7518",
      title: "Quality-first Leaderboard",
      desc: "Rankings based on impact, consistency and the quality of your contributions.",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <line x1="18" y1="20" x2="18" y2="10" />
          <line x1="12" y1="20" x2="12" y2="4" />
          <line x1="6" y1="20" x2="6" y2="14" />
        </svg>
      ),
    },
    {
      num: "04",
      tag: "NEW IN 2026",
      tagColor: "#22C55E",
      title: "Mentor Connect",
      desc: "Connect and learn from open source mentors through 1:1 sessions and AMAs.",
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
      num: "05",
      tag: "NEW IN 2026",
      tagColor: "#FF7518",
      title: "Smarter Project Discovery",
      desc: "Find projects matched to your skill level, preferred tech stack, and interests.",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
      ),
    },
    {
      num: "06",
      tag: "NEW IN 2026",
      tagColor: "#22C55E",
      title: "Open Source Verifiable Badges",
      desc: "Earn blockchain-verifiable credentials and certificates demonstrating your open source mastery.",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        </svg>
      ),
    },
  ];

  return (
    <section
      id="events"
      className="whats-new-section"
      style={{
        background: "#080808",
        padding: "90px clamp(32px, 8vw, 120px)",
      }}
    >
      <div style={{ width: "100%" }}>
        {/* Section Tag */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            marginBottom: "14px",
          }}
        >
          <div
            style={{
              width: "6px",
              height: "6px",
              borderRadius: "50%",
              background: "#FF7518",
              boxShadow: "0 0 8px #FF7518",
            }}
          />
          <span
            style={{
              fontSize: "12.5px",
              color: "#FF7518",
              fontWeight: 700,
              letterSpacing: "1.5px",
              textTransform: "uppercase",
            }}
          >
            WHAT&apos;S CHANGING
          </span>
        </div>

        {/* Section Header */}
        <h2
          style={{
            fontSize: "clamp(30px, 4.5vw, 50px)",
            fontWeight: 800,
            letterSpacing: "-0.5px",
            lineHeight: 1.15,
            marginBottom: "16px",
          }}
        >
          <span style={{ color: "#ffffff" }}>What&apos;s New in </span>
          <span style={{ color: "#ffffff" }}>OSCI </span>
          <span style={{ color: "#ffffff" }}>2026</span>
        </h2>

        <p
          style={{
            color: "#9ca3af",
            fontSize: "15px",
            lineHeight: 1.6,
            marginBottom: "48px",
            maxWidth: "640px",
          }}
        >
          We&apos;re constantly evolving to create a better, more inclusive and impactful open source experience for everyone.
        </p>

        {/* Update Cards List */}
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          {updates.map((update, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "24px",
              }}
            >
              {/* Ring Indicator */}
              <div
                className="whats-new-indicator"
                style={{
                  width: "14px",
                  height: "14px",
                  borderRadius: "50%",
                  border: `2px solid ${update.tagColor}`,
                  background: "transparent",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
              </div>

              {/* Main Card with Sharp L-Brackets */}
              <div
                className="whats-new-card"
                style={{
                  flex: 1,
                  display: "flex",
                  alignItems: "center",
                  gap: "22px",
                  padding: "22px 28px",
                  borderRadius: "4px",
                  background: "#0d0d0d",
                  border: "1px solid rgba(255, 255, 255, 0.05)",
                  cursor: "pointer",
                  position: "relative",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.background = "#141414";
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(255, 255, 255, 0.12)";
                  (e.currentTarget as HTMLElement).style.transform = "translateX(4px)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.background = "#0d0d0d";
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(255, 255, 255, 0.05)";
                  (e.currentTarget as HTMLElement).style.transform = "translateX(0)";
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
                    borderTop: `2px solid ${update.tagColor}`,
                    borderLeft: `2px solid ${update.tagColor}`,
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
                    borderBottom: `2px solid ${update.tagColor}`,
                    borderRight: `2px solid ${update.tagColor}`,
                    pointerEvents: "none",
                  }}
                />

                {/* Left Number with underline & Icon */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "16px",
                    flexShrink: 0,
                  }}
                >
                  <div
                    style={{
                      fontWeight: 900,
                      fontSize: "30px",
                      color: update.tagColor,
                      letterSpacing: "-1px",
                      borderBottom: `2.5px solid ${update.tagColor}`,
                      paddingBottom: "3px",
                      lineHeight: 1,
                    }}
                  >
                    {update.num}
                  </div>

                  {/* Dark Circle Icon Container */}
                  <div
                    style={{
                      width: "42px",
                      height: "42px",
                      borderRadius: "50%",
                      background: "#161616",
                      border: "1px solid rgba(255, 255, 255, 0.07)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: update.tagColor,
                    }}
                  >
                    {update.icon}
                  </div>
                </div>

                {/* Center Text Content */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                      marginBottom: "6px",
                      flexWrap: "wrap",
                    }}
                  >
                    <h3
                      style={{
                        fontWeight: 700,
                        fontSize: "17px",
                        color: "#ffffff",
                        letterSpacing: "-0.2px",
                        margin: 0,
                      }}
                    >
                      {update.title}
                    </h3>
                    <span
                      style={{
                        fontSize: "10px",
                        fontWeight: 800,
                        color: update.tagColor,
                        border: `1px solid ${update.tagColor}`,
                        background: "transparent",
                        padding: "2px 8px",
                        borderRadius: "2px",
                        letterSpacing: "0.5px",
                        textTransform: "uppercase",
                      }}
                    >
                      {update.tag}
                    </span>
                  </div>
                  <p
                    style={{
                      fontSize: "14px",
                      color: "#9ca3af",
                      lineHeight: 1.55,
                      margin: 0,
                    }}
                  >
                    {update.desc}
                  </p>
                </div>

                {/* Right Arrow */}
                <div
                  style={{
                    color: "#6b7280",
                    display: "flex",
                    alignItems: "center",
                    flexShrink: 0,
                  }}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
}
