"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { fetchNavProfile } from "./navActions";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  const [profile, setProfile] = useState<any>(undefined);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchNavProfile().then((res) => setProfile(res || null));
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
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
        background: scrolled ? "rgba(6, 6, 6, 0.85)" : "transparent",
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
          className="logo-link"
          style={{ textDecoration: "none", justifySelf: "start", display: "flex", alignItems: "center" }}
        >
          <Image src="/logo.png" alt="Open Source Connect India" width={186} height={48} priority className="navbar-logo" />
        </Link>

        {/* Desktop Nav */}
        <div style={{ display: "flex", alignItems: "center", gap: "36px", justifySelf: "center" }} className="desktop-nav">
          {navLinks.map((link) => {
            const isActive = pathname === link.href || (link.href !== "/" && pathname?.startsWith(link.href));
            return (
              <Link
                key={link.label}
                href={link.href}
                className="nav-link-item"
                style={{ position: "relative", textDecoration: "none", padding: "8px 0", display: "inline-flex", flexDirection: "column", alignItems: "center" }}
              >
                <span style={{ color: "#ffffff", fontSize: "16px", fontWeight: isActive ? 600 : 500 }}>{link.label}</span>
                <span
                  className="nav-underline"
                  style={{
                    position: "absolute", bottom: 0, left: 0, right: 0, height: "2.5px", background: "var(--orange)", borderRadius: "2px",
                    transform: isActive ? "scaleX(1)" : "scaleX(0)", transformOrigin: "center",
                    transition: "transform 0.25s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.25s ease",
                    opacity: isActive ? 1 : 0, boxShadow: isActive ? "0 0 8px rgba(255, 117, 24, 0.5)" : "none",
                  }}
                />
              </Link>
            );
          })}
        </div>

        {/* CTA or Avatar Dropdown */}
        <div style={{ display: "flex", alignItems: "center", justifySelf: "end", position: "relative" }} className="desktop-cta" ref={dropdownRef}>
          {profile === undefined ? (
            <div style={{ width: "80px", height: "38px" }} /> // Invisible placeholder matching button height
          ) : profile ? (
            <>
              <button 
                onClick={() => setDropdownOpen(!dropdownOpen)}
                style={{ background: "transparent", border: "2px solid var(--orange)", borderRadius: "50%", padding: "2px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}
              >
                <div style={{ width: "36px", height: "36px", borderRadius: "50%", overflow: "hidden", background: "#1c1c1f", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  {profile.avatar ? (
                    <img src={profile.avatar} alt="Avatar" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  ) : (
                    <span style={{ fontSize: "16px", color: "white" }}>{profile.name?.[0] || "U"}</span>
                  )}
                </div>
              </button>

              {/* Dropdown Menu */}
              {dropdownOpen && (
                <div style={{
                  position: "absolute", top: "56px", right: 0, width: "220px", background: "rgba(15, 15, 15, 0.95)",
                  backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "12px",
                  padding: "8px", display: "flex", flexDirection: "column", gap: "4px", boxShadow: "0 10px 40px rgba(0,0,0,0.5)",
                  animation: "fadeIn 0.2s ease"
                }}>
                  <div style={{ padding: "12px 12px 8px 12px", borderBottom: "1px solid rgba(255,255,255,0.1)", marginBottom: "4px" }}>
                    <div style={{ fontSize: "14px", fontWeight: 600, color: "white", marginBottom: "2px" }}>{profile.name}</div>
                    <div style={{ fontSize: "11px", color: "var(--orange)", fontWeight: 500, letterSpacing: "0.05em", textTransform: "uppercase" }}>{profile.role}</div>
                  </div>
                  
                  <Link href="/dashboard" onClick={() => setDropdownOpen(false)} style={{ padding: "10px 12px", color: "#d1d5db", fontSize: "13px", textDecoration: "none", borderRadius: "6px", display: "flex", alignItems: "center", gap: "8px" }} className="hover:bg-[rgba(255,255,255,0.05)] hover:text-white transition-colors">
                    Dashboard
                  </Link>
                  <Link href="/leaderboard" onClick={() => setDropdownOpen(false)} style={{ padding: "10px 12px", color: "#d1d5db", fontSize: "13px", textDecoration: "none", borderRadius: "6px", display: "flex", alignItems: "center", gap: "8px" }} className="hover:bg-[rgba(255,255,255,0.05)] hover:text-white transition-colors">
                    Leaderboard
                  </Link>
                  
                  <div style={{ height: "1px", background: "rgba(255,255,255,0.1)", margin: "4px 0" }} />
                  
                  <Link href="/api/auth/signout" style={{ padding: "10px 12px", color: "#ef4444", fontSize: "13px", textDecoration: "none", borderRadius: "6px", display: "flex", alignItems: "center", gap: "8px" }} className="hover:bg-[rgba(239,68,68,0.1)] transition-colors">
                    Sign Out
                  </Link>
                </div>
              )}
            </>
          ) : (
            <Link
              href="/sign-in"
              style={{
                color: "#ffffff", textDecoration: "none", fontSize: "15px", fontWeight: 600, padding: "8px 18px",
                borderRadius: "8px", border: "1px solid #FF7518", background: "rgba(255,255,255,0.03)", transition: "all 0.2s",
              }}
              onMouseEnter={(e) => { (e.target as HTMLElement).style.borderColor = "#FF7518"; (e.target as HTMLElement).style.background = "rgba(255, 117, 24, 0.1)"; }}
              onMouseLeave={(e) => { (e.target as HTMLElement).style.borderColor = "#FF7518"; (e.target as HTMLElement).style.background = "rgba(255,255,255,0.03)"; }}
            >
              Sign In
            </Link>
          )}
        </div>

        {/* Mobile Hamburger */}
        <button
          className="mobile-menu-btn"
          onClick={() => setMobileOpen(!mobileOpen)}
          style={{ display: "none", background: "none", border: "none", color: "#fff", cursor: "pointer", padding: "4px", justifySelf: "end" }}
          aria-label="Toggle menu"
        >
          <div style={{ width: "24px", height: "2px", background: "#fff", marginBottom: "5px", borderRadius: "2px", transition: "transform 0.2s", transform: mobileOpen ? "rotate(45deg) translateY(7px)" : "none" }} />
          <div style={{ width: "24px", height: "2px", background: "#fff", marginBottom: "5px", borderRadius: "2px", opacity: mobileOpen ? 0 : 1, transition: "opacity 0.2s" }} />
          <div style={{ width: "24px", height: "2px", background: "#fff", borderRadius: "2px", transition: "transform 0.2s", transform: mobileOpen ? "rotate(-45deg) translateY(-7px)" : "none" }} />
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div style={{ background: "rgba(10,10,10,0.96)", backdropFilter: "blur(16px)", padding: "16px 20px 24px" }} className="mobile-menu">
          {navLinks.map((link) => {
            const isActive = pathname === link.href || (link.href !== "/" && pathname?.startsWith(link.href));
            return (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                style={{
                  display: "flex", alignItems: "center", justifyContent: "space-between", color: "#ffffff", textDecoration: "none",
                  fontSize: "16.5px", fontWeight: isActive ? 600 : 500, padding: "12px 8px", borderBottom: "1px solid rgba(255,255,255,0.05)",
                  borderLeft: isActive ? "3px solid var(--orange)" : "3px solid transparent", paddingLeft: isActive ? "12px" : "8px", transition: "all 0.2s ease",
                }}
              >
                <span>{link.label}</span>
                {isActive && <span style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: "var(--orange)", boxShadow: "0 0 8px var(--orange)" }} />}
              </Link>
            );
          })}
          
          <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginTop: "24px" }}>
            {profile ? (
              <>
                <Link href="/dashboard" onClick={() => setMobileOpen(false)} style={{ color: "#ffffff", textDecoration: "none", fontSize: "16.5px", fontWeight: 500, padding: "12px 8px", borderBottom: "1px solid rgba(255,255,255,0.05)", display: "flex", alignItems: "center", gap: "12px" }}>
                  <img src={profile.avatar} alt="Avatar" style={{ width: "24px", height: "24px", borderRadius: "50%" }} /> Dashboard
                </Link>
                <Link href="/api/auth/signout" style={{ color: "#ef4444", textDecoration: "none", fontSize: "16.5px", fontWeight: 500, padding: "12px 8px" }}>
                  Sign Out
                </Link>
              </>
            ) : (
              <Link href="/sign-in" style={{ color: "#ffffff", textDecoration: "none", fontSize: "15px", fontWeight: 600, padding: "10px 22px", borderRadius: "8px", border: "1px solid rgba(255,255,255,0.2)", textAlign: "center" }}>
                Sign In
              </Link>
            )}
          </div>
        </div>
      )}
      
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes fadeIn { from { opacity: 0; transform: translateY(-10px); } to { opacity: 1; transform: translateY(0); } }
      `}} />
    </nav>
  );
}
