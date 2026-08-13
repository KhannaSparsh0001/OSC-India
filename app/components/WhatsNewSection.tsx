"use client";

export default function WhatsNewSection() {
  const updates = [
    {
      num: "01",
      tag: "Upcoming",
      tagColor: "#FF6000",
      title: "AI Code Review Assistant",
      desc: "Get instant feedback and automated reviews on your pull requests from our AI-powered code reviewer.",
    },
    {
      num: "02",
      tag: "Registration Open",
      tagColor: "#22C55E",
      title: "Student Mentor Program",
      desc: "Connecting university students with seasoned mentors for a structured 3-month open source journey.",
    },
    {
      num: "03",
      tag: "New Feature",
      tagColor: "#FF6000",
      title: "Quality First Leaderboard",
      desc: "Introducing points and badges system based on code quality and sustainability rather than just PR count.",
    },
    {
      num: "04",
      tag: "Initiative",
      tagColor: "#22C55E",
      title: "Women in Open Source",
      desc: "Dedicated tracks, scholarships, and mentorship support for women developers in open source.",
    },
    {
      num: "05",
      tag: "Feature",
      tagColor: "#FF6000",
      title: "Regional Project Discovery",
      desc: "Find and contribute to projects addressing local civic and regional problems across India.",
    },
    {
      num: "06",
      tag: "Web3 / Credential",
      tagColor: "#22C55E",
      title: "Open Source Verifiable Badges",
      desc: "Earn blockchain-verifiable credentials and certificates demonstrating your open source mastery.",
    },
  ];

  return (
    <section
      id="events"
      style={{
        background: "#080808",
        padding: "80px 24px",
      }}
    >
      <div style={{ maxWidth: "1080px", margin: "0 auto" }}>
        {/* Section Tag */}
        <div style={{ marginBottom: "14px" }}>
          <span
            style={{
              fontSize: "13px",
              color: "#FF6000",
              fontWeight: 700,
              letterSpacing: "1.5px",
              textTransform: "uppercase",
            }}
          >
            &lt; WHAT&apos;S NEW &gt;
          </span>
        </div>

        {/* Section Header */}
        <h2
          style={{
            fontSize: "clamp(28px, 4.5vw, 48px)",
            fontWeight: 800,
            letterSpacing: "-0.5px",
            lineHeight: 1.2,
            marginBottom: "16px",
          }}
        >
          <span style={{ color: "#ffffff" }}>What&apos;s New in </span>
          <span style={{ color: "#22C55E" }}>OSCI </span>
          <span style={{ color: "#FF6000" }}>2026</span>
        </h2>

        <p
          style={{
            color: "#9ca3af",
            fontSize: "15px",
            lineHeight: 1.6,
            marginBottom: "40px",
            maxWidth: "600px",
          }}
        >
          Discover upcoming events and milestones that are shaping the open source ecosystem in India this year.
        </p>

        {/* Update Cards List */}
        <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
          {updates.map((update, i) => (
            <div
              key={i}
              className="whats-new-card"
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: "16px",
                padding: "20px 22px",
                borderRadius: "12px",
                background: "#111111",
                border: "1px solid rgba(255,255,255,0.06)",
                cursor: "pointer",
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background = "#171717";
                (e.currentTarget as HTMLElement).style.borderColor = `${update.tagColor}40`;
                (e.currentTarget as HTMLElement).style.transform = "translateX(4px)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background = "#111111";
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.06)";
                (e.currentTarget as HTMLElement).style.transform = "translateX(0)";
              }}
            >
              {/* Left Indicator & Number */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  flexShrink: 0,
                  paddingTop: "2px",
                }}
              >
                <div
                  style={{
                    width: "14px",
                    height: "14px",
                    borderRadius: "50%",
                    border: `2px solid ${update.tagColor}`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <div
                    style={{
                      width: "4px",
                      height: "4px",
                      borderRadius: "50%",
                      background: update.tagColor,
                    }}
                  />
                </div>
                <div
                  style={{
                    fontWeight: 900,
                    fontSize: "22px",
                    color: update.tagColor,
                    letterSpacing: "-0.5px",
                    minWidth: "30px",
                  }}
                >
                  {update.num}
                </div>
              </div>

              {/* Main Text Content */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    marginBottom: "6px",
                    flexWrap: "wrap",
                  }}
                >
                  <h3
                    style={{
                      fontWeight: 700,
                      fontSize: "16px",
                      color: "#ffffff",
                      letterSpacing: "-0.2px",
                      margin: 0,
                    }}
                  >
                    {update.title}
                  </h3>
                  <span
                    style={{
                      fontSize: "11px",
                      fontWeight: 600,
                      color: update.tagColor,
                      background: `${update.tagColor}15`,
                      border: `1px solid ${update.tagColor}35`,
                      padding: "2px 10px",
                      borderRadius: "100px",
                      display: "inline-block",
                    }}
                  >
                    {update.tag}
                  </span>
                </div>
                <p
                  style={{
                    fontSize: "13.5px",
                    color: "#9ca3af",
                    lineHeight: 1.55,
                    margin: 0,
                  }}
                >
                  {update.desc}
                </p>
              </div>

              {/* Right Arrow (hidden on very small screens) */}
              <div
                className="whats-new-arrow"
                style={{
                  color: "#6b7280",
                  display: "flex",
                  alignItems: "center",
                  flexShrink: 0,
                  alignSelf: "center",
                }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 640px) {
          .whats-new-arrow {
            display: none !important;
          }
          .whats-new-card {
            padding: 16px 14px !important;
            gap: 12px !important;
          }
        }
      `}</style>
    </section>
  );
}
