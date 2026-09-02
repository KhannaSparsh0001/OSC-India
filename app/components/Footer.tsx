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
              {/* Social Icons */}
              <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
                {/* LinkedIn */}
                <Link
                  href="https://www.linkedin.com/company/open-source-connect/"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    color: "#9ca3af",
                    transition: "color 0.2s",
                  }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#FF7518")}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "#9ca3af")}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                    <rect x="2" y="9" width="4" height="12"></rect>
                    <circle cx="4" cy="4" r="2"></circle>
                  </svg>
                </Link>

                {/* GitHub */}
                <Link
                  href="https://github.com/Open-Source-Connect/"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    color: "#9ca3af",
                    transition: "color 0.2s",
                  }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#FF7518")}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "#9ca3af")}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                  </svg>
                </Link>

                {/* Instagram */}
                <Link
                  href="https://www.instagram.com/osconnect.official/"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    color: "#9ca3af",
                    transition: "color 0.2s",
                  }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#FF7518")}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "#9ca3af")}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                  </svg>
                </Link>

                {/* X (Twitter) */}
                <Link
                  href="https://x.com/osconnect1"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    color: "#9ca3af",
                    transition: "color 0.2s",
                  }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#FF7518")}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "#9ca3af")}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4l11.733 16h4.267l-11.733 -16z"></path>
                    <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772"></path>
                  </svg>
                </Link>

                {/* YouTube */}
                <Link
                  href="https://www.youtube.com/@open-source-connect"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    color: "#9ca3af",
                    transition: "color 0.2s",
                  }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#FF7518")}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "#9ca3af")}
                >
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33 2.78 2.78 0 0 0 1.94 2c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.33z"></path>
                    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
                  </svg>
                </Link>

                {/* Discord */}
                <Link
                  href="https://discord.com/invite/umEXASsAev"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    color: "#9ca3af",
                    transition: "color 0.2s",
                  }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#FF7518")}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "#9ca3af")}
                >
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z"/>
                  </svg>
                </Link>
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
                {["Newsletter"].map((item) => (
                  <li key={item} style={{ marginBottom: "10px" }}>
                    <Link
                      href="#"
                      style={{
                        fontSize: "13px",
                        color: "#9ca3af",
                        textDecoration: "none",
                        transition: "color 0.2s",
                      }}
                      onMouseEnter={(e) => ((e.target as HTMLElement).style.color = "#FF7518")}
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
                {[
                  { name: "About Us", href: "/about" },
                  { name: "Projects", href: "/projects" },
                  { name: "Timeline", href: "/timeline" },
                  { name: "Leaderboard", href: "/leaderboard" }
                ].map((item) => (
                  <li key={item.name} style={{ marginBottom: "10px" }}>
                    <Link
                      href={item.href}
                      style={{
                        fontSize: "13px",
                        color: "#9ca3af",
                        textDecoration: "none",
                        transition: "color 0.2s",
                      }}
                      onMouseEnter={(e) => ((e.target as HTMLElement).style.color = "#FF7518")}
                      onMouseLeave={(e) => ((e.target as HTMLElement).style.color = "#9ca3af")}
                    >
                      {item.name}
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

    </footer>
  );
}
