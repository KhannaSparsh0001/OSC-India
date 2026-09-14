"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";

import { usePathname } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { getClientProfile, signOutClient } from "@/lib/auth/client";

interface NavbarProps {
  initialProfile?: any;
}

export default function Navbar({ initialProfile }: NavbarProps = {}) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  const [profile, setProfile] = useState<any>(initialProfile);
  const [mounted, setMounted] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
    if (!initialProfile) {
      getClientProfile().then((res) => setProfile(res || null));
    }

    const supabase = createClient();
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      if (event === "SIGNED_IN" || event === "USER_UPDATED") {
        getClientProfile().then((res) => setProfile(res || null));
      } else if (event === "SIGNED_OUT") {
        setProfile(null);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [initialProfile]);

  useEffect(() => {
    setDropdownOpen(false);
    setMobileOpen(false);
  }, [pathname]);

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

  const isAuthed = initialProfile !== undefined ? Boolean(profile) : (mounted && Boolean(profile));

  const navLinks = isAuthed
    ? [
        { label: "Dashboard", href: "/dashboard" },
        { label: "Leaderboard", href: "/leaderboard" },
        { label: "Projects", href: "/projects" },
        { label: "Team", href: "/team" },
        { label: "Timeline", href: "/timeline" },
      ]
    : [
        { label: "About us", href: "/about" },
        { label: "Projects", href: "/projects" },
        { label: "Team", href: "/team" },
        { label: "Timeline", href: "/timeline" },
      ];

  return (
    <nav
      className={`navbar-root ${scrolled ? "scrolled" : ""}`}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        paddingTop: scrolled ? "10px" : "18px",
        paddingBottom: scrolled ? "10px" : "14px",
        background: scrolled ? "rgba(6, 6, 6, 0.85)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(255, 255, 255, 0.07)" : "1px solid transparent",
        transition: "background 0.3s ease, backdrop-filter 0.3s ease, padding 0.3s ease, border-color 0.3s ease",
      }}
    >
      <div
        className="navbar-inner"
        style={{
          width: "100%",
          padding: "0 clamp(32px, 8vw, 120px)",
          display: "grid",
          gridTemplateColumns: "1fr auto 1fr",
          alignItems: "center",
          height: "64px",
        }}
      >
        {/* Logo */}
        <Link
          href="/"
          className="logo-link"
          style={{ textDecoration: "none", justifySelf: "start", display: "flex", alignItems: "center" }}
        >
          {/* Desktop full logo with text */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.png" alt="Open Source Connect India" className="navbar-logo hidden md:block" />
          {/* Mobile emblem logo */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/mobile-logo.png"
            alt="Open Source Connect India"
            className="navbar-logo-mobile block md:hidden"
            style={{ width: "36px", height: "36px", objectFit: "contain" }}
          />
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
          {(!mounted && initialProfile === undefined) || profile === undefined ? (
            <div style={{ width: "80px", height: "38px" }} /> // Invisible placeholder matching button height
          ) : profile ? (
            <>
              <button 
                onClick={() => setDropdownOpen(!dropdownOpen)}
                aria-expanded={dropdownOpen}
                aria-label="User profile menu"
                style={{
                  background: "transparent",
                  border: dropdownOpen ? "1.5px solid var(--orange)" : "1.5px solid rgba(255, 255, 255, 0.15)",
                  borderRadius: "50%",
                  padding: "2px",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "border-color 0.15s ease",
                }}
                className="hover:border-white/40 focus:outline-none"
              >
                <div style={{ width: "34px", height: "34px", borderRadius: "50%", overflow: "hidden", background: "#1c1c1f", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  {profile.avatar ? (
                    <img src={profile.avatar} alt={profile.name || "Avatar"} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  ) : (
                    <span style={{ fontSize: "14px", fontWeight: 600, color: "white" }}>{profile.name?.[0] || "U"}</span>
                  )}
                </div>
              </button>

              {/* Minimal Dropdown Menu */}
              {dropdownOpen && (
                <div style={{
                  position: "absolute",
                  top: "50px",
                  right: 0,
                  width: "235px",
                  background: "#111113",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  borderRadius: "10px",
                  padding: "5px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "2px",
                  boxShadow: "0 12px 32px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(255, 255, 255, 0.04)",
                  zIndex: 1000,
                }}>
                  {/* User Profile Header */}
                  <div style={{ display: "flex", alignItems: "center", gap: "10px", padding: "8px 10px 10px 10px" }}>
                    <div style={{ width: "34px", height: "34px", borderRadius: "50%", overflow: "hidden", background: "#1c1c1f", flexShrink: 0, border: "1px solid rgba(255, 255, 255, 0.12)" }}>
                      {profile.avatar ? (
                        <img src={profile.avatar} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                      ) : (
                        <span style={{ fontSize: "14px", fontWeight: 600, color: "white", display: "flex", alignItems: "center", justifyContent: "center", height: "100%" }}>
                          {profile.name?.[0] || "U"}
                        </span>
                      )}
                    </div>
                    <div style={{ minWidth: 0, flex: 1 }}>
                      <div style={{ fontSize: "13.5px", fontWeight: 600, color: "#ffffff", lineHeight: 1.3, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                        {profile.name}
                      </div>
                      {profile.github ? (
                        <a
                          href={`https://github.com/${profile.github}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            fontSize: "12px",
                            color: "#9ca3af",
                            marginTop: "2px",
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "5px",
                            textDecoration: "none",
                            transition: "color 0.15s ease",
                            maxWidth: "100%",
                          }}
                          className="hover:text-white"
                          title={`View @${profile.github} on GitHub`}
                        >
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" style={{ opacity: 0.8, flexShrink: 0 }}>
                            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                          </svg>
                          <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>@{profile.github}</span>
                        </a>
                      ) : (
                        <div style={{ fontSize: "12px", color: "#9ca3af", marginTop: "2px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                          {profile.email}
                        </div>
                      )}
                    </div>
                  </div>

                  <div style={{ height: "1px", background: "rgba(255, 255, 255, 0.08)", margin: "2px 0 4px 0" }} />
                  
                  {/* Menu Items */}
                  <Link
                    href="/dashboard"
                    style={{
                      padding: "7px 10px",
                      color: "#d4d4d8",
                      fontSize: "13px",
                      fontWeight: 500,
                      textDecoration: "none",
                      borderRadius: "6px",
                      display: "flex",
                      alignItems: "center",
                      gap: "9px",
                      transition: "background-color 0.12s ease, color 0.12s ease",
                    }}
                    className="hover:bg-[rgba(255,255,255,0.06)] hover:text-white"
                  >
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.75, flexShrink: 0 }}>
                      <rect width="7" height="9" x="3" y="3" rx="1" />
                      <rect width="7" height="5" x="14" y="3" rx="1" />
                      <rect width="7" height="9" x="14" y="12" rx="1" />
                      <rect width="7" height="5" x="3" y="16" rx="1" />
                    </svg>
                    <span>Dashboard</span>
                  </Link>

                  <Link
                    href="/leaderboard"
                    style={{
                      padding: "7px 10px",
                      color: "#d4d4d8",
                      fontSize: "13px",
                      fontWeight: 500,
                      textDecoration: "none",
                      borderRadius: "6px",
                      display: "flex",
                      alignItems: "center",
                      gap: "9px",
                      transition: "background-color 0.12s ease, color 0.12s ease",
                    }}
                    className="hover:bg-[rgba(255,255,255,0.06)] hover:text-white"
                  >
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.75, flexShrink: 0 }}>
                      <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
                      <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
                      <path d="M4 22h16" />
                      <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
                      <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
                      <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
                    </svg>
                    <span>Leaderboard</span>
                  </Link>

                  <Link
                    href="/badge"
                    style={{
                      padding: "7px 10px",
                      color: "#d4d4d8",
                      fontSize: "13px",
                      fontWeight: 500,
                      textDecoration: "none",
                      borderRadius: "6px",
                      display: "flex",
                      alignItems: "center",
                      gap: "9px",
                      transition: "background-color 0.12s ease, color 0.12s ease",
                    }}
                    className="hover:bg-[rgba(255,255,255,0.06)] hover:text-white"
                  >
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.75, flexShrink: 0 }}>
                      <circle cx="12" cy="8" r="6" />
                      <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
                    </svg>
                    <span>Badge Studio</span>
                  </Link>

                  {profile.isAdmin && (
                    <Link
                      href="/admin"
                      style={{
                        padding: "7px 10px",
                        color: "#d4d4d8",
                        fontSize: "13px",
                        fontWeight: 500,
                        textDecoration: "none",
                        borderRadius: "6px",
                        display: "flex",
                        alignItems: "center",
                        gap: "9px",
                        transition: "background-color 0.12s ease, color 0.12s ease",
                      }}
                      className="hover:bg-[rgba(255,255,255,0.06)] hover:text-white"
                    >
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.75, flexShrink: 0 }}>
                        <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
                      </svg>
                      <span>Admin Portal</span>
                    </Link>
                  )}
                  
                  <div style={{ height: "1px", background: "rgba(255, 255, 255, 0.08)", margin: "4px 0" }} />
                  
                  <button
                    type="button"
                    onClick={async () => {
                      setDropdownOpen(false);
                      await signOutClient("/");
                    }}
                    style={{
                      width: "100%",
                      background: "none",
                      border: "none",
                      padding: "7px 10px",
                      color: "#d4d4d8",
                      fontSize: "13px",
                      fontWeight: 500,
                      borderRadius: "6px",
                      display: "flex",
                      alignItems: "center",
                      gap: "9px",
                      cursor: "pointer",
                      textAlign: "left",
                      transition: "background-color 0.12s ease, color 0.12s ease",
                    }}
                    className="hover:bg-[rgba(239,68,68,0.12)] hover:text-[#f87171]"
                  >
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.75, flexShrink: 0 }}>
                      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                      <polyline points="16 17 21 12 16 7" />
                      <line x1="21" x2="9" y1="12" y2="12" />
                    </svg>
                    <span>Sign Out</span>
                  </button>
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

        {/* Mobile Right Controls: Sign Button + Hamburger Menu matching reference design */}
        <div
          className="mobile-right-controls"
          style={{
            display: "none",
            alignItems: "center",
            gap: "12px",
            justifySelf: "end",
          }}
        >
          {profile ? (
            <Link
              href="/dashboard"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                textDecoration: "none",
              }}
              title="Dashboard"
            >
              <div
                style={{
                  width: "32px",
                  height: "32px",
                  borderRadius: "50%",
                  overflow: "hidden",
                  background: "#1c1c1f",
                  border: "1.5px solid var(--orange)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {profile.avatar ? (
                  <img src={profile.avatar} alt={profile.name || "Avatar"} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                ) : (
                  <span style={{ fontSize: "13px", fontWeight: 600, color: "white" }}>{profile.name?.[0] || "U"}</span>
                )}
              </div>
            </Link>
          ) : (
            <Link
              href="/sign-in"
              className="mobile-sign-btn"
              style={{
                color: "#ffffff",
                textDecoration: "none",
                fontSize: "13.5px",
                fontWeight: 600,
                padding: "6px 14px",
                borderRadius: "8px",
                border: "1.5px solid #FF7518",
                background: "rgba(0, 0, 0, 0.4)",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "all 0.2s ease",
              }}
            >
              Sign
            </Link>
          )}

          {/* Mobile Hamburger */}
          <button
            className="mobile-menu-btn"
            onClick={() => setMobileOpen(!mobileOpen)}
            style={{ background: "none", border: "none", color: "#fff", cursor: "pointer", padding: "4px" }}
            aria-label="Toggle menu"
          >
            <div style={{ width: "22px", height: "2px", background: "#fff", marginBottom: "5px", borderRadius: "2px", transition: "transform 0.2s", transform: mobileOpen ? "rotate(45deg) translateY(7px)" : "none" }} />
            <div style={{ width: "22px", height: "2px", background: "#fff", marginBottom: "5px", borderRadius: "2px", opacity: mobileOpen ? 0 : 1, transition: "opacity 0.2s" }} />
            <div style={{ width: "22px", height: "2px", background: "#fff", borderRadius: "2px", transition: "transform 0.2s", transform: mobileOpen ? "rotate(-45deg) translateY(-7px)" : "none" }} />
          </button>
        </div>
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
                <Link href="/badge" style={{ color: "#ffffff", textDecoration: "none", fontSize: "15px", fontWeight: 500, padding: "12px 8px", borderBottom: "1px solid rgba(255,255,255,0.05)", display: "flex", alignItems: "center", gap: "12px" }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.8 }}>
                    <circle cx="12" cy="8" r="6" />
                    <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
                  </svg>
                  <span>Badge Studio</span>
                </Link>
                {profile.isAdmin && (
                  <Link href="/admin" style={{ color: "#f87171", textDecoration: "none", fontSize: "15px", fontWeight: 500, padding: "12px 8px", borderBottom: "1px solid rgba(255,255,255,0.05)", display: "flex", alignItems: "center", gap: "12px" }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.8 }}>
                      <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
                    </svg>
                    <span>Admin Portal</span>
                  </Link>
                )}
                <button
                  type="button"
                  onClick={async () => {
                    setMobileOpen(false);
                    await signOutClient("/");
                  }}
                  style={{
                    background: "none",
                    border: "none",
                    color: "#a1a1aa",
                    fontSize: "15px",
                    fontWeight: 500,
                    padding: "12px 8px",
                    cursor: "pointer",
                    textAlign: "left",
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                  }}
                  className="hover:text-[#f87171]"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.8 }}>
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                    <polyline points="16 17 21 12 16 7" />
                    <line x1="21" x2="9" y1="12" y2="12" />
                  </svg>
                  <span>Sign Out</span>
                </button>
              </>
            ) : (
              <Link href="/sign-in" style={{ color: "#ffffff", textDecoration: "none", fontSize: "15px", fontWeight: 600, padding: "10px 22px", borderRadius: "8px", border: "1px solid rgba(255,255,255,0.2)", textAlign: "center" }}>
                Sign In
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
