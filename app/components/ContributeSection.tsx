"use client";
export default function ContributeSection() {
  const items = [
    {
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/>
        </svg>
      ),
      label: "Contribute",
      desc: "Push code, fix bugs, build features",
      color: "#f97316",
    },
    {
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>
        </svg>
      ),
      label: "Collaborate",
      desc: "Work with teams across India",
      color: "#16a34a",
    },
    {
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
        </svg>
      ),
      label: "Get Recognized",
      desc: "Earn badges and certificates",
      color: "#f97316",
    },
  ];

  return (
    <section
      style={{
        background: "#0d0d0d",
        padding: "60px 24px",
        borderTop: "1px solid rgba(255,255,255,0.04)",
        borderBottom: "1px solid rgba(255,255,255,0.04)",
      }}
    >
      <div
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "24px",
        }}
      >
        {items.map((item, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "16px",
              background: "#111",
              border: `1px solid ${item.color}20`,
              borderRadius: "10px",
              padding: "20px 24px",
              cursor: "pointer",
              transition: "border-color 0.2s",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = `${item.color}60`;
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = `${item.color}20`;
            }}
          >
            <div
              style={{
                width: "48px",
                height: "48px",
                borderRadius: "10px",
                background: `${item.color}15`,
                border: `1px solid ${item.color}30`,
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
              <div style={{ fontWeight: 700, fontSize: "15px", color: "#fff", marginBottom: "4px" }}>
                {item.label}
              </div>
              <div style={{ fontSize: "13px", color: "#6b7280" }}>{item.desc}</div>
            </div>
            <div style={{ marginLeft: "auto", color: item.color, opacity: 0.6 }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
