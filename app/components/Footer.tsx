"use client";
import Link from "next/link";

export default function Footer() {
  const links = [
    {
      title: "Quick Links",
      items: ["About Us", "Projects", "Events", "Blog", "Mentorship"],
    },
    {
      title: "Community",
      items: ["Contributors", "Leaderboard", "Hall of Fame", "Discord", "GitHub"],
    },
    {
      title: "Resources",
      items: ["Documentation", "Getting Started", "API Reference", "Code of Conduct", "Privacy Policy"],
    },
  ];

  return (
    <footer
      style={{
        background: "#080808",
        borderTop: "1px solid rgba(255, 96, 0, 0.2)",
        padding: "60px 24px 32px",
      }}
    >
      <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
        {/* Main Footer Content Grid */}
        <div className="footer-main-grid">
          {/* Brand Column */}
          <div className="footer-brand-col">
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                marginBottom: "16px",
              }}
            >
              <div
                style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "8px",
                  background: "linear-gradient(135deg, #FF6000, #ea580c)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: 800,
                  fontSize: "14px",
                  color: "#fff",
                }}
              >
                OS
              </div>
              <div>
                <div style={{ fontWeight: 700, fontSize: "14px", color: "#fff" }}>
                  Open Source
                </div>
                <div style={{ fontWeight: 700, fontSize: "14px", color: "#FF6000" }}>
                  Connect India
                </div>
              </div>
            </div>
            <p
              style={{
                fontSize: "13px",
                color: "#6b7280",
                lineHeight: 1.7,
                maxWidth: "300px",
                marginBottom: "20px",
              }}
            >
              India&apos;s premier platform for open-source contributors,
              connecting talent with impactful projects across the nation.
            </p>
            {/* Social Icons */}
            <div style={{ display: "flex", gap: "10px" }}>
              {[
                {
                  label: "GitHub",
                  path: "M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z",
                },
                {
                  label: "Twitter",
                  path: "M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z",
                },
                {
                  label: "LinkedIn",
                  path: "M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z M4 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4z",
                },
              ].map((soc) => (
                <a
                  key={soc.label}
                  href="#"
                  aria-label={soc.label}
                  style={{
                    width: "36px",
                    height: "36px",
                    borderRadius: "8px",
                    background: "#161616",
                    border: "1px solid rgba(255,255,255,0.08)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#6b7280",
                    transition: "all 0.2s",
                    textDecoration: "none",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = "#FF6000";
                    (e.currentTarget as HTMLElement).style.color = "#FF6000";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.08)";
                    (e.currentTarget as HTMLElement).style.color = "#6b7280";
                  }}
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" stroke="none">
                    <path d={soc.path} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Link Columns Grid - Sits side by side on mobile */}
          <div className="footer-links-grid">
            {links.map((col) => (
              <div key={col.title} className="footer-col-item">
                <h4
                  style={{
                    fontWeight: 700,
                    fontSize: "13.5px",
                    color: "#ffffff",
                    marginBottom: "14px",
                    letterSpacing: "0.3px",
                  }}
                >
                  {col.title}
                </h4>
                <ul style={{ listStyle: "none" }}>
                  {col.items.map((item) => (
                    <li key={item} style={{ marginBottom: "8px" }}>
                      <Link
                        href="#"
                        style={{
                          fontSize: "13px",
                          color: "#6b7280",
                          textDecoration: "none",
                          transition: "color 0.2s",
                        }}
                        onMouseEnter={(e) =>
                          ((e.target as HTMLElement).style.color = "#FF6000")
                        }
                        onMouseLeave={(e) =>
                          ((e.target as HTMLElement).style.color = "#6b7280")
                        }
                      >
                        {item}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Divider & Copyright */}
        <div
          style={{
            borderTop: "1px solid rgba(255,255,255,0.06)",
            paddingTop: "24px",
            marginTop: "48px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "12px",
          }}
        >
          <p style={{ fontSize: "12px", color: "#4b5563" }}>
            © 2026 Open Source Connect India. All rights reserved. Made with ❤️ for the Indian developer community.
          </p>
          <div style={{ display: "flex", gap: "16px" }}>
            {["Terms", "Privacy", "Contact"].map((item) => (
              <Link
                key={item}
                href="#"
                style={{
                  fontSize: "12px",
                  color: "#4b5563",
                  textDecoration: "none",
                  transition: "color 0.2s",
                }}
                onMouseEnter={(e) =>
                  ((e.target as HTMLElement).style.color = "#9ca3af")
                }
                onMouseLeave={(e) =>
                  ((e.target as HTMLElement).style.color = "#4b5563")
                }
              >
                {item}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .footer-main-grid {
          display: grid;
          grid-template-columns: 1.4fr 2.6fr;
          gap: 48px;
        }
        .footer-links-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 28px;
        }
        @media (max-width: 900px) {
          .footer-main-grid {
            grid-template-columns: 1fr;
            gap: 36px;
          }
          .footer-links-grid {
            display: grid !important;
            grid-template-columns: repeat(3, 1fr) !important;
            gap: 20px !important;
          }
        }
        @media (max-width: 520px) {
          .footer-links-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 24px 16px !important;
          }
        }
      `}</style>
    </footer>
  );
}
