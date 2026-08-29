"use client";

export default function ContributeSection() {
  const items = [
    {
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
          <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
        </svg>
      ),
      label: "Connect",
      desc: "Meet like-minded individuals and grow your network.",
      color: "#22C55E",
    },
    {
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
          <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
          <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
          <path d="M12 9v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
        </svg>
      ),
      label: "Contribute",
      desc: "Make a difference by contributing to real world solutions.",
      color: "#FF7518",
    },
    {
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
        </svg>
      ),
      label: "Collaborate",
      desc: "Work together on impactful open source projects.",
      color: "#22C55E",
    },
  ];

  return (
    <section
      className="contribute-section"
      style={{
        background: "#080808",
        padding: "50px clamp(32px, 8vw, 120px) 70px",
        borderTop: "1px solid rgba(255,255,255,0.03)",
      }}
    >
      <div
        style={{
          width: "100%",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "20px",
        }}
      >
        {items.map((item, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "18px",
              background: "#0d0d0d",
              border: "1px solid rgba(255, 255, 255, 0.05)",
              borderRadius: "4px",
              padding: "24px 22px",
              cursor: "pointer",
              position: "relative",
              transition: "all 0.2s ease",
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
                borderTop: `2px solid ${item.color}`,
                borderLeft: `2px solid ${item.color}`,
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
                borderBottom: `2px solid ${item.color}`,
                borderRight: `2px solid ${item.color}`,
                pointerEvents: "none",
              }}
            />

            {/* Icon Box */}
            <div
              style={{
                width: "44px",
                height: "44px",
                borderRadius: "8px",
                background: `${item.color}15`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: item.color,
                flexShrink: 0,
              }}
            >
              {item.icon}
            </div>

            {/* Text */}
            <div>
              <div
                style={{
                  fontWeight: 700,
                  fontSize: "17px",
                  color: "#ffffff",
                  marginBottom: "4px",
                }}
              >
                {item.label}
              </div>
              <div
                style={{
                  fontSize: "13px",
                  color: "#6b7280",
                  lineHeight: 1.45,
                }}
              >
                {item.desc}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
