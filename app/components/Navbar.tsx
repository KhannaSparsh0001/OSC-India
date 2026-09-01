"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

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
    { label: "About us", href: "/about" },
    { label: "Projects", href: "/projects" },
    { label: "Team", href: "/team" },
    { label: "Timeline", href: "/timeline" },
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
        className="navbar-inner"
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
        <Link
          href="/"
          style={{
            textDecoration: "none",
            justifySelf: "start",
            display: "flex",
            alignItems: "center",
          }}
        >
          <Image
            src="/logo.png"
            alt="Open Source Connect India"
            width={186}
            height={48}
            priority
            className="navbar-logo"
          />
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
          {navLinks.map((link) => {
            const isActive = pathname === link.href || (link.href !== "/" && pathname?.startsWith(link.href));
            return (
              <Link
                key={link.label}
                href={link.href}
                className="nav-link-item"
                style={{
                  position: "relative",
                  textDecoration: "none",
                  padding: "8px 0",
                  display: "inline-flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <span
                  style={{
                    color: isActive ? "#ffffff" : "#9ca3af",
                    fontSize: "14px",
                    fontWeight: isActive ? 600 : 500,
                    transition: "color 0.2s ease",
                  }}
                >
                  {link.label}
                </span>
                {/* Orange Underline */}
                <span
                  className="nav-underline"
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: "2.5px",
                    background: "var(--orange)",
                    borderRadius: "2px",
                    transform: isActive ? "scaleX(1)" : "scaleX(0)",
                    transformOrigin: "center",
                    transition: "transform 0.25s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.25s ease",
                    opacity: isActive ? 1 : 0,
                    boxShadow: isActive ? "0 0 8px rgba(255, 117, 24, 0.5)" : "none",
                  }}
                />
              </Link>
            );
          })}
        </div>

        {/* CTA */}
        <div
          style={{ display: "flex", alignItems: "center", justifySelf: "end" }}
          className="desktop-cta"
        >
          <Link
            href="/sign-in"
            style={{
              color: "#d1d5db",
              textDecoration: "none",
              fontSize: "14px",
              fontWeight: 500,
              padding: "6px 14px",
              borderRadius: "6px",
              border: "1px solid #FF7518",
              background: "rgba(255,255,255,0.03)",
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => {
              (e.target as HTMLElement).style.borderColor = "#FF7518";
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
            justifySelf: "end",
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
            padding: "16px 20px 24px",
          }}
          className="mobile-menu"
        >
          {navLinks.map((link) => {
            const isActive = pathname === link.href || (link.href !== "/" && pathname?.startsWith(link.href));
            return (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  color: isActive ? "#ffffff" : "#9ca3af",
                  textDecoration: "none",
                  fontSize: "15px",
                  fontWeight: isActive ? 600 : 500,
                  padding: "12px 8px",
                  borderBottom: "1px solid rgba(255,255,255,0.05)",
                  borderLeft: isActive ? "3px solid var(--orange)" : "3px solid transparent",
                  paddingLeft: isActive ? "12px" : "8px",
                  transition: "all 0.2s ease",
                }}
              >
                <span>{link.label}</span>
                {isActive && (
                  <span
                    style={{
                      width: "6px",
                      height: "6px",
                      borderRadius: "50%",
                      backgroundColor: "var(--orange)",
                      boxShadow: "0 0 8px var(--orange)",
                    }}
                  />
                )}
              </Link>
            );
          })}
          <div style={{ display: "flex", gap: "12px", marginTop: "16px" }}>
            <Link
              href="/sign-in"
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
