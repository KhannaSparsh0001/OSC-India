"use client";
import Link from "next/link";
import Image from "next/image";

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
              <Link href="/" style={{ textDecoration: "none", display: "inline-block", marginBottom: "16px" }}>
                <Image
                  src="/logo.png"
                  alt="Open Source Connect India"
                  width={186}
                  height={48}
                  className="navbar-logo"
                />
              </Link>
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
                      onMouseEnter={(e) => ((e.target as HTMLElement).style.color = "#FF7518")}
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
                      onMouseEnter={(e) => ((e.target as HTMLElement).style.color = "#FF7518")}
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

    </footer>
  );
}
