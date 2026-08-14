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
        {/* Section Tag */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "8px",
            marginBottom: "14px",
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
            OUR PARTNERS
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
                  gap: "12px",
                  color: "#ffffff",
                  fontWeight: 700,
                  fontSize: "15px",
                }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <path d="M8 14s1.5 2 4 2 4-2 4-2"></path>
                  <line x1="9" y1="9" x2="9.01" y2="9"></line>
                  <line x1="15" y1="9" x2="15.01" y2="9"></line>
                </svg> Balsamiq
              </div>
              <div
                style={{
                  background: "#181818",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: "10px",
                  padding: "12px 32px",
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  color: "#ffffff",
                  fontWeight: 700,
                  fontSize: "15px",
                }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="#f97316">
                  <path d="M13.527.099C6.955-.744.942 3.9.099 10.473c-.843 6.572 3.8 12.584 10.373 13.428 6.573.843 12.587-3.801 13.428-10.374C24.744 6.955 20.101.943 13.527.099zm2.471 7.485a.855.855 0 0 0-.593.25l-4.453 4.453-.307-.307-.643-.643c4.389-4.376 5.18-4.418 5.996-3.753zm-4.863 4.861l4.44-4.44a.62.62 0 1 1 .847.903l-4.699 4.125-.588-.588zm.33.694l-1.1.238a.06.06 0 0 1-.067-.032.06.06 0 0 1 .01-.073l.645-.645.512.512zm-2.803-.459l1.172-1.172.879.878-1.979.426a.074.074 0 0 1-.085-.039.072.072 0 0 1 .013-.093zm-3.646 6.058a.076.076 0 0 1-.069-.083.077.077 0 0 1 .022-.046h.002l.946-.946 1.222 1.222-2.123-.147zm2.425-1.256a.228.228 0 0 0-.117.256l.203.865a.125.125 0 0 1-.211.117h-.003l-.934-.934-.294-.295 3.762-3.758 1.82-.393.874.874c-1.255 1.102-2.971 2.201-5.1 3.268zm5.279-3.428h-.002l-.839-.839 4.699-4.125a.952.952 0 0 0 .119-.127c-.148 1.345-2.029 3.245-3.977 5.091zm3.657-6.46l-.003-.002a1.822 1.822 0 0 1 2.459-2.684l-1.61 1.613a.119.119 0 0 0 0 .169l1.247 1.247a1.817 1.817 0 0 1-2.093-.343zm2.578 0a1.714 1.714 0 0 1-.271.218h-.001l-1.207-1.207 1.533-1.533c.661.72.637 1.832-.054 2.522zM18.855 6.05a.143.143 0 0 0-.053.157.416.416 0 0 1-.053.45.14.14 0 0 0 .023.197.141.141 0 0 0 .084.03.14.14 0 0 0 .106-.05.691.691 0 0 0 .087-.751.138.138 0 0 0-.194-.033z"/>
                </svg> Postman
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
              <div
                style={{
                  background: "#181818",
                  border: "1px solid rgba(255,255,255,0.06)",
                  borderRadius: "8px",
                  padding: "10px 24px",
                  color: "#d1d5db",
                  fontWeight: 600,
                  fontSize: "13.5px",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="#e5a00d"><path d="M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523A2.528 2.528 0 0 1 0 15.165a2.527 2.527 0 0 1 2.522-2.52h2.52v2.52zM6.313 15.165a2.527 2.527 0 0 1 2.521-2.52 2.527 2.527 0 0 1 2.521 2.52v6.313A2.528 2.528 0 0 1 8.834 24a2.528 2.528 0 0 1-2.521-2.522v-6.313zM8.834 5.042a2.528 2.528 0 0 1-2.521-2.52A2.528 2.528 0 0 1 8.834 0a2.528 2.528 0 0 1 2.521 2.522v2.52H8.834zM8.834 6.313a2.528 2.528 0 0 1 2.521 2.521 2.528 2.528 0 0 1-2.521 2.521H2.522A2.528 2.528 0 0 1 0 8.834a2.528 2.528 0 0 1 2.522-2.521h6.312zM18.956 8.834a2.528 2.528 0 0 1 2.522-2.521A2.528 2.528 0 0 1 24 8.834a2.528 2.528 0 0 1-2.522 2.521h-2.522V8.834zM17.688 8.834a2.528 2.528 0 0 1-2.523 2.521 2.527 2.527 0 0 1-2.52-2.521V2.522A2.527 2.527 0 0 1 15.165 0a2.528 2.528 0 0 1 2.523 2.522v6.312zM15.165 18.956a2.528 2.528 0 0 1 2.523 2.522A2.528 2.528 0 0 1 15.165 24a2.527 2.527 0 0 1-2.52-2.522v-2.522h2.52zM15.165 17.688a2.527 2.527 0 0 1-2.52-2.523 2.526 2.526 0 0 1 2.52-2.52h6.313A2.527 2.527 0 0 1 24 15.165a2.528 2.528 0 0 1-2.522 2.523h-6.313z"/></svg> Slack
              </div>
              <div
                style={{
                  background: "#181818",
                  border: "1px solid rgba(255,255,255,0.06)",
                  borderRadius: "8px",
                  padding: "10px 24px",
                  color: "#d1d5db",
                  fontWeight: 600,
                  fontSize: "13.5px",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="#ffc72c"><path d="M17.243 3.006c2.066 0 3.742 8.714 3.742 19.478H24c0-11.588-3.042-20.968-6.766-20.968-2.127 0-4.007 2.81-5.248 7.227-1.241-4.416-3.121-7.227-5.231-7.227C3.031 1.516 0 10.888 0 22.476h3.014c0-10.763 1.658-19.47 3.724-19.47 2.066 0 3.741 8.05 3.741 17.98h2.997c0-9.93 1.684-17.98 3.75-17.98Z"/></svg> McDonald's
              </div>
              <div
                style={{
                  background: "#181818",
                  border: "1px solid rgba(255,255,255,0.06)",
                  borderRadius: "8px",
                  padding: "10px 24px",
                  color: "#d1d5db",
                  fontWeight: 600,
                  fontSize: "13.5px",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="#2496ed"><path d="M13.983 11.078h2.119a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.119a.185.185 0 00-.185.185v1.888c0 .102.083.185.185.185m-2.954-5.43h2.118a.186.186 0 00.186-.186V3.574a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.185m0 2.716h2.118a.187.187 0 00.186-.186V6.29a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.887c0 .102.082.185.185.186m-2.93 0h2.12a.186.186 0 00.184-.186V6.29a.185.185 0 00-.185-.185H8.1a.185.185 0 00-.185.185v1.887c0 .102.083.185.185.186m-2.964 0h2.119a.186.186 0 00.185-.186V6.29a.185.185 0 00-.185-.185H5.136a.186.186 0 00-.186.185v1.887c0 .102.084.185.186.186m5.893 2.715h2.118a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.185m-2.93 0h2.12a.185.185 0 00.184-.185V9.006a.185.185 0 00-.184-.186h-2.12a.185.185 0 00-.184.185v1.888c0 .102.083.185.185.185m-2.964 0h2.119a.185.185 0 00.185-.185V9.006a.185.185 0 00-.184-.186h-2.12a.186.186 0 00-.186.186v1.887c0 .102.084.185.186.185m-2.92 0h2.12a.185.185 0 00.184-.185V9.006a.185.185 0 00-.184-.186h-2.12a.185.185 0 00-.184.185v1.888c0 .102.082.185.185.185M23.763 9.89c-.065-.051-.672-.51-1.954-.51-.338.001-.676.03-1.01.087-.248-1.7-1.653-2.53-1.716-2.566l-.344-.199-.226.327c-.284.438-.49.922-.612 1.43-.23.97-.09 1.882.403 2.661-.595.332-1.55.413-1.744.42H.751a.751.751 0 00-.75.748 11.376 11.376 0 00.692 4.062c.545 1.428 1.355 2.48 2.41 3.124 1.18.723 3.1 1.137 5.275 1.137.983.003 1.963-.086 2.93-.266a12.248 12.248 0 003.823-1.389c.98-.567 1.86-1.288 2.61-2.136 1.252-1.418 1.998-2.997 2.553-4.4h.221c1.372 0 2.215-.549 2.68-1.009.309-.293.55-.65.707-1.046l.098-.288Z"/></svg> Docker
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
