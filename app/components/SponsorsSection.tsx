"use client";

export default function SponsorsSection() {
  return (
    <section
      id="sponsors"
      style={{
        background: "#080808",
        padding: "100px 24px",
      }}
    >
      <div style={{ maxWidth: "860px", margin: "0 auto", textAlign: "center" }}>
        {/* Tag */}
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
            &lt; OUR PARTNERS &gt;
          </span>
        </div>

        {/* Heading */}
        <h2
          style={{
            fontSize: "clamp(30px, 4.5vw, 48px)",
            fontWeight: 800,
            letterSpacing: "-0.5px",
            lineHeight: 1.2,
            marginBottom: "16px",
          }}
        >
          <span style={{ color: "#ffffff" }}>Building the </span>
          <span style={{ color: "#22C55E" }}>Future</span>
          <br />
          <span style={{ color: "#ffffff" }}>with Amazing </span>
          <span style={{ color: "#FF6000" }}>Partners</span>
        </h2>

        <p
          style={{
            color: "#9ca3af",
            fontSize: "15px",
            lineHeight: 1.6,
            marginBottom: "56px",
            maxWidth: "520px",
            margin: "0 auto 56px",
          }}
        >
          We are proud to be supported by industry leaders who believe in the power of open source in India.
        </p>

        {/* Main Sponsors Container Box */}
        <div
          style={{
            background: "#111111",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: "20px",
            padding: "48px 32px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "36px",
          }}
        >
          {/* Platinum */}
          <div>
            <div
              style={{
                fontSize: "13px",
                fontWeight: 700,
                color: "#e5e7eb",
                letterSpacing: "1px",
                marginBottom: "20px",
              }}
            >
              Platinum Sponsors
            </div>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <div
                style={{
                  background: "linear-gradient(135deg, #0d3b66 0%, #001e3d 100%)",
                  border: "1px solid rgba(255,255,255,0.15)",
                  borderRadius: "14px",
                  padding: "16px 44px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 8px 24px rgba(0,0,0,0.5)",
                }}
              >
                {/* VW Emblem */}
                <svg width="60" height="60" viewBox="0 0 100 100" fill="none">
                  <circle cx="50" cy="50" r="46" stroke="#ffffff" strokeWidth="4" />
                  <circle cx="50" cy="50" r="41" stroke="#ffffff" strokeWidth="2" />
                  <path d="M26 32 L42 76 L50 56 L58 76 L74 32" stroke="#ffffff" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M36 32 L50 64 L64 32" stroke="#ffffff" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </div>
          </div>

          {/* Gold */}
          <div>
            <div
              style={{
                fontSize: "12px",
                fontWeight: 700,
                color: "#FF6000",
                letterSpacing: "1.5px",
                textTransform: "uppercase",
                marginBottom: "16px",
              }}
            >
              Gold Sponsors
            </div>
            <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
              <div
                style={{
                  background: "#181818",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: "10px",
                  padding: "12px 32px",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  color: "#ffffff",
                  fontWeight: 700,
                  fontSize: "15px",
                }}
              >
                <span style={{ color: "#ef4444", fontSize: "18px" }}>●</span> Balsamiq
              </div>
              <div
                style={{
                  background: "#181818",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: "10px",
                  padding: "12px 32px",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  color: "#ffffff",
                  fontWeight: 700,
                  fontSize: "15px",
                }}
              >
                <span style={{ color: "#f97316", fontSize: "18px" }}>✦</span> Postman
              </div>
            </div>
          </div>

          {/* Silver */}
          <div>
            <div
              style={{
                fontSize: "11.5px",
                fontWeight: 700,
                color: "#9ca3af",
                letterSpacing: "1.5px",
                textTransform: "uppercase",
                marginBottom: "16px",
              }}
            >
              Silver Sponsors
            </div>
            <div style={{ display: "flex", gap: "14px", justifyContent: "center", flexWrap: "wrap" }}>
              {["Slack", "McDonald's", "Docker"].map((sponsor) => (
                <div
                  key={sponsor}
                  style={{
                    background: "#181818",
                    border: "1px solid rgba(255,255,255,0.06)",
                    borderRadius: "8px",
                    padding: "10px 24px",
                    color: "#d1d5db",
                    fontWeight: 600,
                    fontSize: "13.5px",
                  }}
                >
                  {sponsor}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
