"use client";
import Link from "next/link";

export default function Footer() {
  return (
    <footer
      className="footer-section"
      style={{
        background: "#080808",
        borderTop: "1px solid #ea580c",
        padding: "60px clamp(32px, 8vw, 120px) 32px",
      }}
    >
      <div style={{ width: "100%" }}>
        {/* Main Footer Content Grid */}
        <div className="footer-main-grid">
          {/* Left Column: Brand & Resources */}
          <div className="footer-left-col">
            {/* Brand Section */}
            <div style={{ marginBottom: "32px" }}>
              <div
                style={{
                  fontWeight: 700,
                  fontSize: "16px",
                  color: "#ffffff",
                  marginBottom: "16px",
                  letterSpacing: "0.3px",
                }}
              >
                Open Source Connect India
              </div>
              <p
                style={{
                  fontSize: "13px",
                  color: "#9ca3af",
                  lineHeight: 1.6,
                  maxWidth: "320px",
                  marginBottom: "24px",
                }}
              >
                Building the future of technology through collaboration, innovation, and open-source contributions.
              </p>
              {/* Social Icons (Gray squares as per Figma) */}
              <div style={{ display: "flex", gap: "12px" }}>
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    style={{
                      width: "32px",
                      height: "32px",
                      borderRadius: "6px",
                      background: "rgba(255,255,255,0.1)",
                    }}
                  />
                ))}
              </div>
            </div>

          </div>

          {/* Right Columns: Resources, Quick Links & Community */}
          <div className="footer-links-grid">
            {/* Resources Section */}
            <div className="footer-col-item">
              <h4
                style={{
                  fontWeight: 700,
                  fontSize: "13.5px",
                  color: "#ffffff",
                  marginBottom: "16px",
                  letterSpacing: "0.3px",
                }}
              >
                Resources
              </h4>
              <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                {["Blog", "Newsletter"].map((item) => (
                  <li key={item} style={{ marginBottom: "10px" }}>
                    <Link
                      href="#"
                      style={{
                        fontSize: "13px",
                        color: "#9ca3af",
                        textDecoration: "none",
                        transition: "color 0.2s",
                      }}
                      onMouseEnter={(e) => ((e.target as HTMLElement).style.color = "#FF6000")}
                      onMouseLeave={(e) => ((e.target as HTMLElement).style.color = "#9ca3af")}
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Quick Links */}
            <div className="footer-col-item">
              <h4
                style={{
                  fontWeight: 700,
                  fontSize: "13.5px",
                  color: "#ffffff",
                  marginBottom: "16px",
                  letterSpacing: "0.3px",
                }}
              >
                Quick Links
              </h4>
              <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                {["About Us", "Projects", "Timeline", "Leaderboard"].map((item) => (
                  <li key={item} style={{ marginBottom: "10px" }}>
                    <Link
                      href="#"
                      style={{
                        fontSize: "13px",
                        color: "#9ca3af",
                        textDecoration: "none",
                        transition: "color 0.2s",
                      }}
                      onMouseEnter={(e) => ((e.target as HTMLElement).style.color = "#FF6000")}
                      onMouseLeave={(e) => ((e.target as HTMLElement).style.color = "#9ca3af")}
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Community */}
            <div className="footer-col-item">
              <h4
                style={{
                  fontWeight: 700,
                  fontSize: "13.5px",
                  color: "#ffffff",
                  marginBottom: "16px",
                  letterSpacing: "0.3px",
                }}
              >
                Community
              </h4>
              <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                {["Nexfellow", "GitHub", "Forum"].map((item) => (
                  <li key={item} style={{ marginBottom: "10px" }}>
                    <Link
                      href="#"
                      style={{
                        fontSize: "13px",
                        color: "#9ca3af",
                        textDecoration: "none",
                        transition: "color 0.2s",
                      }}
                      onMouseEnter={(e) => ((e.target as HTMLElement).style.color = "#FF6000")}
                      onMouseLeave={(e) => ((e.target as HTMLElement).style.color = "#9ca3af")}
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Divider & Copyright */}
        <div
          className="footer-copyright"
          style={{
            borderTop: "1px solid rgba(255,255,255,0.06)",
            paddingTop: "24px",
            marginTop: "64px",
            textAlign: "center",
          }}
        >
          <p style={{ fontSize: "12px", color: "#9ca3af" }}>
            © 2025 Open Source Connect India. All rights reserved.
          </p>
        </div>
      </div>

      <style>{`
        .footer-main-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 64px;
        }
        .footer-links-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 32px;
        }
        .footer-left-col {
          display: flex;
          flex-direction: column;
        }
        @media (max-width: 768px) {
          .footer-section {
            padding: 40px clamp(24px, 6vw, 32px) 24px !important;
          }
          .footer-main-grid {
            grid-template-columns: 1fr;
            gap: 36px;
          }
          .footer-links-grid {
            grid-template-columns: repeat(3, 1fr);
            gap: 16px;
          }
          .footer-col-item h4 {
            font-size: 12px !important;
          }
          .footer-col-item a {
            font-size: 11px !important;
          }
          .footer-copyright {
            margin-top: 40px !important;
          }
        }
      `}</style>
    </footer>
  );
}
