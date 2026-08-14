"use client";
export default function ContributeSection() {
  const items = [
    {
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>
        </svg>
      ),
      label: "Connect",
      desc: "Meet like-minded individuals and grow your network.",
      color: "#22C55E",
    },
    {
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"></path>
          <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"></path>
          <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"></path>
          <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"></path>
        </svg>
      ),
      label: "Contribute",
      desc: "Make a difference by contributing to real world solutions.",
      color: "#FF6000",
    },
    {
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
        </svg>
      ),
      label: "Collaborate",
      desc: "Work together on impactful open source projects.",
      color: "#22C55E",
    },
  ];

  return (
    <section
      style={{
        background: "transparent",
        padding: "60px 24px",
      }}
    >
      <div
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "24px",
        }}
      >
        {items.map((item, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: "20px",
              background: "rgba(12, 12, 12, 0.7)",
              backdropFilter: "blur(12px)",
              borderRadius: "8px",
              padding: "32px 28px",
              position: "relative",
              cursor: "pointer",
              transition: "all 0.25s ease",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.transform = "translateY(-3px)";
              (e.currentTarget as HTMLElement).style.boxShadow = `0 8px 30px ${item.color}15`;
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
                borderTop: `2px solid ${item.color}`,
                borderLeft: `2px solid ${item.color}`,
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
                borderBottom: `2px solid ${item.color}`,
                borderRight: `2px solid ${item.color}`,
                borderBottomRightRadius: "8px",
              }}
            />

            <div
              style={{
                width: "48px",
                height: "48px",
                borderRadius: "12px",
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
            <div>
              <div style={{ fontWeight: 700, fontSize: "18px", color: "#fff", marginBottom: "8px", letterSpacing: "-0.5px" }}>
                {item.label}
              </div>
              <div style={{ fontSize: "14px", color: "#9ca3af", lineHeight: 1.5 }}>{item.desc}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
