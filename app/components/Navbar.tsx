"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "About us", href: "#about" },
    { label: "Projects", href: "#projects" },
    { label: "Timeline", href: "#timeline" },
    { label: "Leaderboard", href: "#leaderboard" },
  ];

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        background: scrolled
          ? "rgba(6, 6, 6, 0.85)"
          : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: "none",
        transition: "background 0.3s ease, backdrop-filter 0.3s ease",
      }}
    >
      <div
        style={{
          width: "100%",
          padding: "0 40px",
          display: "grid",
          gridTemplateColumns: "1fr auto 1fr",
          alignItems: "center",
          height: "72px",
        }}
      >
        {/* Logo */}
        <Link href="/" style={{ textDecoration: "none", justifySelf: "start" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <span
              style={{
                fontWeight: 700,
                fontSize: "15px",
                color: "#ffffff",
                letterSpacing: "-0.2px",
              }}
            >
              Open Source Connect India
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "32px",
            justifySelf: "center",
          }}
          className="desktop-nav"
        >
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              style={{
                color: "#9ca3af",
                textDecoration: "none",
                fontSize: "14px",
                fontWeight: 500,
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) =>
                ((e.target as HTMLElement).style.color = "#ffffff")
              }
              onMouseLeave={(e) =>
                ((e.target as HTMLElement).style.color = "#9ca3af")
              }
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div
          style={{ display: "flex", alignItems: "center", justifySelf: "end" }}
          className="desktop-cta"
        >
          <Link
            href="#"
            style={{
              color: "#d1d5db",
              textDecoration: "none",
              fontSize: "14px",
              fontWeight: 500,
              padding: "6px 14px",
              borderRadius: "6px",
              border: "1px solid #FF6000",
              background: "rgba(255,255,255,0.03)",
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => {
              (e.target as HTMLElement).style.borderColor = "#FF6000";
              (e.target as HTMLElement).style.color = "#ffffff";
            }}
            onMouseLeave={(e) => {
              (e.target as HTMLElement).style.borderColor = "rgba(255,255,255,0.15)";
              (e.target as HTMLElement).style.color = "#d1d5db";
            }}
          >
            Sign In
          </Link>
        </div>

        {/* Mobile Hamburger */}
        <button
          className="mobile-menu-btn"
          onClick={() => setMobileOpen(!mobileOpen)}
          style={{
            display: "none",
            background: "none",
            border: "none",
            color: "#fff",
            cursor: "pointer",
            padding: "4px",
          }}
          aria-label="Toggle menu"
        >
          <div
            style={{
              width: "24px",
              height: "2px",
              background: "#fff",
              marginBottom: "5px",
              borderRadius: "2px",
              transition: "transform 0.2s",
              transform: mobileOpen ? "rotate(45deg) translateY(7px)" : "none",
            }}
          />
          <div
            style={{
              width: "24px",
              height: "2px",
              background: "#fff",
              marginBottom: "5px",
              borderRadius: "2px",
              opacity: mobileOpen ? 0 : 1,
              transition: "opacity 0.2s",
            }}
          />
          <div
            style={{
              width: "24px",
              height: "2px",
              background: "#fff",
              borderRadius: "2px",
              transition: "transform 0.2s",
              transform: mobileOpen ? "rotate(-45deg) translateY(-7px)" : "none",
            }}
          />
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div
          style={{
            background: "rgba(10,10,10,0.96)",
            backdropFilter: "blur(16px)",
            padding: "16px 24px 24px",
          }}
          className="mobile-menu"
        >
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              style={{
                display: "block",
                color: "#9ca3af",
                textDecoration: "none",
                fontSize: "15px",
                fontWeight: 500,
                padding: "10px 0",
                borderBottom: "1px solid rgba(255,255,255,0.05)",
              }}
            >
              {link.label}
            </Link>
          ))}
          <div style={{ display: "flex", gap: "12px", marginTop: "16px" }}>
            <Link
              href="#"
              style={{
                color: "#ffffff",
                textDecoration: "none",
                fontSize: "14px",
                fontWeight: 500,
                padding: "8px 18px",
                borderRadius: "6px",
                border: "1px solid rgba(255,255,255,0.2)",
              }}
            >
              Sign In
            </Link>
          </div>
        </div>
      )}

    </nav>
  );
}
