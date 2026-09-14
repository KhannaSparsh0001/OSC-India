"use client";

import React, { useState } from "react";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

interface TimelineEvent {
  phase: string;
  status: "completed" | "active" | "upcoming";
  title: string;
  subtitle?: string;
  date: string;
  duration?: string;
  description: string;
  location: string;
  highlights?: string[];
  ctaText?: string;
  ctaHref?: string;
  secondaryCtaText?: string;
  secondaryCtaHref?: string;
}


export default function TimelinePage() {
  const [filter, setFilter] = useState<"all" | "active-upcoming" | "completed">("all");

  const events: TimelineEvent[] = [
    {
      phase: "PHASE 01",
      status: "completed",
      title: "Registrations Open",
      subtitle: "Nationwide Contributor Registration",
      date: "1st July, 2026",
      description: "Participants from across India can officially register for OSCI’26.",
      location: "Online / Official Portal",
      ctaText: "Sign In / Register",
      ctaHref: "/sign-in",
    },
    {
      phase: "PHASE 02",
      status: "completed",
      title: "Mentor Registration Opens",
      subtitle: "Guiding Open-Source Contributors",
      date: "23rd August, 2026",
      description: "Experienced open-source contributors, industry professionals, and mentors are invited to register as mentors.",
      location: "Virtual / Community Call",
      ctaText: "About the Program",
      ctaHref: "/about",
    },
    {
      phase: "PHASE 03",
      status: "completed",
      title: "Project Admin Registration Opens",
      subtitle: "Open-Source Organization & Repo Onboarding",
      date: "26th August, 2026",
      description: "Open-source organizations, startups, and independent maintainers are invited to onboard their projects.",
      location: "GitHub / Maintainer Portal",
      ctaText: "Admin Portal",
      ctaHref: "/admin",
    },
    {
      phase: "PHASE 04",
      status: "completed",
      title: "OSCI'26 Orientation Session",
      subtitle: "Orientation Session",
      date: "31st August, 2026",
      description:
        "This session introduces Open Source Connect India (OSCI'26), providing participants with an overview of open source, the OSCI'26 initiative, and how they can get started with contributing to real-world projects and communities.",
      location: "Virtual Livestream & Discord",
      ctaText: "Explore Community",
      ctaHref: "/about",
    },
    {
      phase: "PHASE 05",
      status: "active",
      title: "Project Listings Go Live",
      subtitle: "Official Repository Directory Launch",
      date: "10th September, 2026",
      description:
        "Registered projects are published on the platform with detailed descriptions, tech stacks, contribution guidelines, and difficulty levels.",
      location: "OSCI Platform / Projects Directory",
      ctaText: "Explore Projects",
      ctaHref: "/projects",
    },
  ];

  const activeUpcomingCount = events.filter((ev) => ev.status === "active" || ev.status === "upcoming").length;
  const completedCount = events.filter((ev) => ev.status === "completed").length;

  const filteredEvents = events.filter((ev) => {
    if (filter === "all") return true;
    if (filter === "active-upcoming") return ev.status === "active" || ev.status === "upcoming";
    if (filter === "completed") return ev.status === "completed";
    return true;
  });

  return (
    <div className="min-h-screen bg-[var(--bg)] flex flex-col font-sans text-white">
      <Navbar />
      
      {/* Spacer to clear the fixed Navbar */}
      <div style={{ height: "96px", width: "100%", flexShrink: 0 }} aria-hidden="true" />
      
      <main className="flex-grow flex flex-col items-center px-4 sm:px-6" style={{ margin: "0 auto", maxWidth: "1080px", width: "100%", paddingBottom: "110px", paddingTop: "40px" }}>
        
        {/* Header Section */}
        <div style={{ textAlign: "center", marginBottom: "40px", display: "flex", flexDirection: "column", alignItems: "center" }}>
          

          <h1 style={{ color: "white", fontSize: "clamp(32px, 6vw, 52px)", fontWeight: 800, marginBottom: "16px", letterSpacing: "-0.025em", lineHeight: 1.15 }}>
            Program <span style={{ color: "var(--orange)" }}>Timeline</span>
          </h1>
          <p style={{ color: "#9ca3af", fontSize: "clamp(14px, 2.5vw, 16px)", lineHeight: "1.7", maxWidth: "680px", margin: "0 auto" }}>
            The structured pathway of Open Source Connect India 2026. From participant registration and project onboarding to orientation sessions and project directory launch.
          </p>
        </div>


        {/* Filter Tabs */}
        <div style={{
          display: "flex",
          gap: "8px",
          marginBottom: "48px",
          background: "rgba(255, 255, 255, 0.03)",
          border: "1px solid rgba(255, 255, 255, 0.08)",
          padding: "4px",
          borderRadius: "12px",
          flexWrap: "wrap",
          justifyContent: "center"
        }}>
          <button
            type="button"
            onClick={() => setFilter("all")}
            style={{
              background: filter === "all" ? "var(--orange)" : "transparent",
              color: filter === "all" ? "white" : "#9ca3af",
              border: "none",
              padding: "8px 18px",
              borderRadius: "8px",
              fontSize: "13px",
              fontWeight: 600,
              cursor: "pointer",
              transition: "all 0.2s ease"
            }}
          >
            All Phases ({events.length})
          </button>
          <button
            type="button"
            onClick={() => setFilter("active-upcoming")}
            style={{
              background: filter === "active-upcoming" ? "var(--orange)" : "transparent",
              color: filter === "active-upcoming" ? "white" : "#9ca3af",
              border: "none",
              padding: "8px 18px",
              borderRadius: "8px",
              fontSize: "13px",
              fontWeight: 600,
              cursor: "pointer",
              transition: "all 0.2s ease"
            }}
          >
            Active & Upcoming ({activeUpcomingCount})
          </button>
          <button
            type="button"
            onClick={() => setFilter("completed")}
            style={{
              background: filter === "completed" ? "var(--orange)" : "transparent",
              color: filter === "completed" ? "white" : "#9ca3af",
              border: "none",
              padding: "8px 18px",
              borderRadius: "8px",
              fontSize: "13px",
              fontWeight: 600,
              cursor: "pointer",
              transition: "all 0.2s ease"
            }}
          >
            Completed ({completedCount})
          </button>
        </div>

        {/* Left-Rail Modern Timeline Container */}
        <div style={{ position: "relative", width: "100%", maxWidth: "840px" }}>
          
          {/* Continuous Vertical Timeline Spine */}
          <div 
            className="timeline-spine"
            aria-hidden="true"
          />

          {/* Timeline Nodes List */}
          <div style={{ display: "flex", flexDirection: "column", gap: "36px" }}>
            {filteredEvents.map((event, index) => {
              const isActive = event.status === "active";
              const isCompleted = event.status === "completed";

              return (
                <div 
                  key={index} 
                  style={{ 
                    position: "relative", 
                    display: "flex", 
                    alignItems: "flex-start",
                    width: "100%",
                    zIndex: 2
                  }}
                >
                  
                  {/* Timeline Node Marker on the Left Rail */}
                  <div 
                    className={`timeline-marker ${isActive ? "timeline-marker-active" : ""}`}
                    style={{
                      borderRadius: "50%",
                      background: isActive 
                        ? "linear-gradient(135deg, #FF7518 0%, #EA580C 100%)" 
                        : isCompleted 
                          ? "#15803d" 
                          : "#1c1c1f",
                      border: isActive 
                        ? "3px solid #000000" 
                        : isCompleted 
                          ? "3px solid #000000" 
                          : "2px solid rgba(255, 255, 255, 0.15)",
                      boxShadow: isCompleted 
                        ? "0 0 0 4px rgba(34, 197, 94, 0.15)" 
                        : "none",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                      zIndex: 3,
                      marginRight: "clamp(16px, 3vw, 28px)"
                    }}
                  >
                    {isCompleted ? (
                      /* Completed Checkmark */
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    ) : isActive ? (
                      /* Active Sprint Code Icon */
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="16 18 22 12 16 6" />
                        <polyline points="8 6 2 12 8 18" />
                      </svg>
                    ) : (
                      /* Upcoming Calendar / Clock Icon */
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                        <line x1="16" y1="2" x2="16" y2="6" />
                        <line x1="8" y1="2" x2="8" y2="6" />
                        <line x1="3" y1="10" x2="21" y2="10" />
                      </svg>
                    )}
                  </div>

                  {/* Milestone Card */}
                  <div 
                    style={{ 
                      flex: 1,
                      minWidth: 0,
                      background: isActive 
                        ? "linear-gradient(180deg, rgba(255, 117, 24, 0.06) 0%, rgba(255, 255, 255, 0.02) 100%)" 
                        : "rgba(255, 255, 255, 0.02)",
                      border: isActive 
                        ? "1px solid rgba(255, 117, 24, 0.45)" 
                        : isCompleted 
                          ? "1px solid rgba(34, 197, 94, 0.25)" 
                          : "1px solid rgba(255, 255, 255, 0.08)",
                      borderRadius: "18px",
                      padding: "clamp(20px, 4vw, 32px)",
                      boxShadow: isActive ? "0 10px 30px rgba(255, 117, 24, 0.08)" : "none",
                      transition: "border-color 0.2s ease, transform 0.2s ease"
                    }}
                    className="hover:border-white/20 transition-all"
                  >
                    
                    {/* Top Row: Phase + Status Badge + Date */}
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "10px", marginBottom: "18px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                        <span style={{ fontSize: "11px", fontWeight: 800, letterSpacing: "0.1em", color: isActive ? "var(--orange)" : isCompleted ? "#22C55E" : "#9ca3af" }}>
                          {event.phase}
                        </span>
                        
                        {isActive && (
                          <div style={{ background: "rgba(255, 117, 24, 0.15)", color: "var(--orange)", border: "1px solid rgba(255, 117, 24, 0.3)", padding: "3px 10px", borderRadius: "14px", fontSize: "10.5px", fontWeight: 800, display: "inline-flex", alignItems: "center", gap: "6px" }}>
                            <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "var(--orange)", boxShadow: "0 0 8px var(--orange)" }} />
                            LIVE NOW
                          </div>
                        )}
                        {isCompleted && (
                          <div style={{ background: "rgba(34, 197, 94, 0.1)", color: "#22C55E", border: "1px solid rgba(34, 197, 94, 0.25)", padding: "3px 10px", borderRadius: "14px", fontSize: "10.5px", fontWeight: 700 }}>
                            COMPLETED
                          </div>
                        )}
                        {!isActive && !isCompleted && (
                          <div style={{ background: "rgba(255, 255, 255, 0.05)", color: "#9ca3af", border: "1px solid rgba(255, 255, 255, 0.1)", padding: "3px 10px", borderRadius: "14px", fontSize: "10.5px", fontWeight: 600 }}>
                            UPCOMING
                          </div>
                        )}
                      </div>

                      <div style={{ display: "flex", alignItems: "center", gap: "6px", color: "#9ca3af", fontSize: "13px", fontWeight: 500 }}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                          <line x1="16" y1="2" x2="16" y2="6" />
                          <line x1="8" y1="2" x2="8" y2="6" />
                          <line x1="3" y1="10" x2="21" y2="10" />
                        </svg>
                        <span>{event.date}</span>
                        {event.duration && (
                          <>
                            <span style={{ color: "#4b5563" }}>•</span>
                            <span style={{ color: "#6b7280", fontSize: "12px" }}>{event.duration}</span>
                          </>
                        )}
                      </div>
                    </div>

                    {/* Title & Subtitle */}
                    <h2 style={{ color: "white", fontSize: "clamp(20px, 3.5vw, 24px)", fontWeight: 800, marginBottom: "6px", letterSpacing: "-0.015em", lineHeight: 1.25 }}>
                      {event.title}
                    </h2>
                    {event.subtitle && (
                      <div style={{ color: "var(--orange)", fontSize: "13px", fontWeight: 600, marginBottom: "16px" }}>
                        {event.subtitle}
                      </div>
                    )}

                    {/* Description */}
                    <p style={{ color: "#9ca3af", fontSize: "14px", lineHeight: "1.65", marginBottom: "24px" }}>
                      {event.description}
                    </p>

                    {/* Footer Row: Location / Mode & Interactive CTAs */}
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "16px", paddingTop: "18px", borderTop: "1px solid rgba(255, 255, 255, 0.06)" }}>
                      
                      {/* Location / Mode */}
                      <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "#9ca3af", fontSize: "13px" }}>
                        <div style={{ width: "26px", height: "26px", borderRadius: "6px", background: "rgba(255,255,255,0.05)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--orange)" }}>
                          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                            <circle cx="12" cy="10" r="3" />
                          </svg>
                        </div>
                        <span style={{ fontWeight: 600, color: "#d1d5db" }}>{event.location}</span>
                      </div>

                      {/* Action Buttons */}
                      <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                        {event.secondaryCtaText && event.secondaryCtaHref && (
                          <Link href={event.secondaryCtaHref} style={{ textDecoration: "none" }}>
                            <button
                              type="button"
                              style={{
                                background: "rgba(255, 255, 255, 0.05)",
                                border: "1px solid rgba(255, 255, 255, 0.12)",
                                color: "#ffffff",
                                padding: "8px 16px",
                                borderRadius: "8px",
                                fontSize: "13px",
                                fontWeight: 600,
                                cursor: "pointer",
                                transition: "all 0.15s ease"
                              }}
                              className="hover:bg-[rgba(255,255,255,0.1)]"
                            >
                              {event.secondaryCtaText}
                            </button>
                          </Link>
                        )}

                        {event.ctaText && event.ctaHref && (
                          <Link href={event.ctaHref} style={{ textDecoration: "none" }}>
                            <button
                              type="button"
                              style={{
                                background: isActive ? "var(--orange)" : "rgba(255, 255, 255, 0.08)",
                                border: isActive ? "none" : "1px solid rgba(255, 255, 255, 0.15)",
                                color: "#ffffff",
                                padding: "8px 18px",
                                borderRadius: "8px",
                                fontSize: "13px",
                                fontWeight: 700,
                                cursor: "pointer",
                                display: "inline-flex",
                                alignItems: "center",
                                gap: "6px",
                                boxShadow: isActive ? "0 4px 12px rgba(255, 117, 24, 0.25)" : "none",
                                transition: "all 0.15s ease"
                              }}
                              className={isActive ? "hover:bg-[var(--orange-dark)]" : "hover:bg-[rgba(255,255,255,0.15)]"}
                            >
                              {event.ctaText} →
                            </button>
                          </Link>
                        )}
                      </div>

                    </div>

                  </div>

                </div>
              );
            })}
          </div>

        </div>

        {/* Timeline FAQs & Guidelines Section */}
        <div style={{ marginTop: "80px", width: "100%", maxWidth: "840px" }}>
          
          <div style={{ textAlign: "center", marginBottom: "32px" }}>
            <h2 style={{ fontSize: "24px", fontWeight: 800, color: "white", marginBottom: "8px" }}>
              Frequently Asked Questions
            </h2>
            <p style={{ color: "#9ca3af", fontSize: "14px" }}>
              Essential details regarding program participation, scoring, and evaluations
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "16px" }}>
            
            <div style={{ background: "rgba(255, 255, 255, 0.02)", border: "1px solid rgba(255, 255, 255, 0.06)", borderRadius: "14px", padding: "22px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "var(--orange)", fontSize: "14px", fontWeight: 700, marginBottom: "8px" }}>
                <span>🎯</span> How is leaderboard merit scored?
              </div>
              <p style={{ color: "#9ca3af", fontSize: "13px", lineHeight: "1.6", margin: 0 }}>
                Merit points are awarded based on merged pull requests in participating repositories, commit consistency, issue complexity, and code quality reviews by maintainers.
              </p>
            </div>

            <div style={{ background: "rgba(255, 255, 255, 0.02)", border: "1px solid rgba(255, 255, 255, 0.06)", borderRadius: "14px", padding: "22px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "var(--orange)", fontSize: "14px", fontWeight: 700, marginBottom: "8px" }}>
                <span>⚡</span> Can I contribute to multiple projects?
              </div>
              <p style={{ color: "#9ca3af", fontSize: "13px", lineHeight: "1.6", margin: 0 }}>
                Yes! You are encouraged to explore any repository listed in the Projects directory across AI/ML, Cloud Native, Web, and DevTools domains.
              </p>
            </div>

            <div style={{ background: "rgba(255, 255, 255, 0.02)", border: "1px solid rgba(255, 255, 255, 0.06)", borderRadius: "14px", padding: "22px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "var(--orange)", fontSize: "14px", fontWeight: 700, marginBottom: "8px" }}>
                <span>🏆</span> When are swag kits and prizes awarded?
              </div>
              <p style={{ color: "#9ca3af", fontSize: "13px", lineHeight: "1.6", margin: 0 }}>
                Top 10 contributors and featured teams receive cash prizes and physical swag boxes following the National Demo Day and Finale in late October 2026.
              </p>
            </div>

            <div style={{ background: "rgba(255, 255, 255, 0.02)", border: "1px solid rgba(255, 255, 255, 0.06)", borderRadius: "14px", padding: "22px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "var(--orange)", fontSize: "14px", fontWeight: 700, marginBottom: "8px" }}>
                <span>🛡️</span> How do I get my verified contributor badge?
              </div>
              <p style={{ color: "#9ca3af", fontSize: "13px", lineHeight: "1.6", margin: 0 }}>
                You can personalize and download your official OSCI 2026 digital badge anytime via the Badge Studio to share your participation across LinkedIn and Twitter.
              </p>
            </div>

          </div>

        </div>

      </main>

      <Footer />
    </div>
  );
}
