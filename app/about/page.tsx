"use client";

import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[var(--bg)] flex flex-col font-sans">
      <Navbar />
      {/* Spacer to clear the fixed Navbar */}
      <div style={{ height: "72px", width: "100%", flexShrink: 0 }} aria-hidden="true" />
      
      <main className="about-page-wrapper">
        
        {/* Hero Section */}
        <div style={{ textAlign: "center", marginBottom: "clamp(48px, 8vw, 72px)", display: "flex", flexDirection: "column", alignItems: "center", maxWidth: "800px" }}>
          <h1 style={{ color: "white", fontSize: "clamp(30px, 6vw, 48px)", fontWeight: 800, marginBottom: "16px", letterSpacing: "-0.02em", lineHeight: 1.15 }}>
            About Us
          </h1>
          <p style={{ color: "#9ca3af", fontSize: "clamp(14px, 2.2vw, 16px)", lineHeight: "1.7", marginBottom: "16px" }}>
            Open Source Connect India is an international open-source community initiative committed to fostering collaboration, innovation, and technical excellence. Our initiative unites contributors, developers, designers, and community leaders from around the world to build impactful, scalable, and community-driven solutions.
          </p>
          <p style={{ color: "#9ca3af", fontSize: "clamp(14px, 2.2vw, 16px)", lineHeight: "1.7" }}>
            We focus on creating structured pathways for individuals to explore open-source development through contributor programs, mentorship, industry-aligned workshops, and global networking opportunities.
          </p>
        </div>

        {/* Two-Card Layout */}
        <div className="about-two-col-grid">
          {/* Card 1: Why We Exist */}
          <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "16px", padding: "clamp(22px, 4vw, 36px)" }}>
            <h2 style={{ color: "var(--orange)", fontSize: "clamp(18px, 3.5vw, 22px)", fontWeight: 700, marginBottom: "14px" }}>Why We Exist</h2>
            <p style={{ color: "#9ca3af", fontSize: "clamp(13.5px, 2vw, 15px)", lineHeight: "1.7" }}>
              Open-source is the foundation of modern technology but many talented individuals lack access to the right network, guidance, or global visibility. We aim to bridge that gap by creating a platform where knowledge is shared openly, projects are built collaboratively, and contributors are recognized globally.
            </p>
          </div>

          {/* Card 2: Our Vision */}
          <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "16px", padding: "clamp(22px, 4vw, 36px)" }}>
            <h2 style={{ color: "var(--orange)", fontSize: "clamp(18px, 3.5vw, 22px)", fontWeight: 700, marginBottom: "14px" }}>Our Vision</h2>
            <p style={{ color: "#9ca3af", fontSize: "clamp(13.5px, 2vw, 15px)", lineHeight: "1.7" }}>
              Our vision is to create the world's most inclusive and collaborative open-source ecosystem by uniting 1 million+ contributors across continents. By strengthening global connections and making contribution accessible to all, we aim to empower people to build innovative, community-driven technologies that solve real human problems.
            </p>
          </div>
        </div>

        {/* Our Community Section */}
        <div style={{ textAlign: "center", marginBottom: "clamp(48px, 8vw, 72px)", display: "flex", flexDirection: "column", alignItems: "center", maxWidth: "800px" }}>
          <h2 style={{ color: "white", fontSize: "clamp(24px, 5vw, 32px)", fontWeight: 800, marginBottom: "16px", letterSpacing: "-0.02em", lineHeight: 1.2 }}>
            Our Community
          </h2>
          <p style={{ color: "#9ca3af", fontSize: "clamp(13.5px, 2vw, 15px)", lineHeight: "1.7", marginBottom: "12px" }}>
            We are powered by passionate volunteers, community builders, and leaders from around the world. Each person brings unique ideas, diverse cultural experiences, and a shared commitment to creating impact through open-source.
          </p>
          <p style={{ color: "#9ca3af", fontSize: "clamp(13.5px, 2vw, 15px)", lineHeight: "1.7" }}>
            Together, we turn collaboration into innovation.
          </p>
        </div>

        {/* Our Philosophy Section */}
        <div style={{ textAlign: "center", marginBottom: "clamp(48px, 8vw, 72px)", display: "flex", flexDirection: "column", alignItems: "center", width: "100%" }}>
          <h2 style={{ color: "white", fontSize: "clamp(24px, 5vw, 32px)", fontWeight: 800, marginBottom: "16px", letterSpacing: "-0.02em", lineHeight: 1.2 }}>
            Our Philosophy
          </h2>
          <p style={{ color: "#9ca3af", fontSize: "clamp(13.5px, 2vw, 15px)", lineHeight: "1.7", marginBottom: "32px", maxWidth: "800px" }}>
            We strictly enforce three philosophical tenets across all our hosted projects and initiatives:
          </p>
          
          <div className="about-philosophy-grid">
            
            {/* Tenet 1 */}
            <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "16px", padding: "clamp(20px, 3.5vw, 28px)", textAlign: "left" }}>
              <div style={{ width: "36px", height: "36px", borderRadius: "10px", background: "rgba(255,96,0,0.1)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "16px", color: "var(--orange)", fontWeight: 800, fontSize: "16px" }}>1</div>
              <h3 style={{ color: "white", fontSize: "clamp(16px, 2.5vw, 18px)", fontWeight: 700, marginBottom: "8px" }}>Sustainable Ecosystems</h3>
              <p style={{ color: "#9ca3af", fontSize: "clamp(13px, 1.8vw, 14px)", lineHeight: "1.65" }}>
                Rejecting the "abandonware" trend by providing frameworks for projects to survive independently.
              </p>
            </div>

            {/* Tenet 2 */}
            <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "16px", padding: "clamp(20px, 3.5vw, 28px)", textAlign: "left" }}>
              <div style={{ width: "36px", height: "36px", borderRadius: "10px", background: "rgba(255,96,0,0.1)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "16px", color: "var(--orange)", fontWeight: 800, fontSize: "16px" }}>2</div>
              <h3 style={{ color: "white", fontSize: "clamp(16px, 2.5vw, 18px)", fontWeight: 700, marginBottom: "8px" }}>Transparent Leadership</h3>
              <p style={{ color: "#9ca3af", fontSize: "clamp(13px, 1.8vw, 14px)", lineHeight: "1.65" }}>
                Open decision-making processes and clear pathways to leadership for anyone willing to put in the work.
              </p>
            </div>

            {/* Tenet 3 */}
            <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "16px", padding: "clamp(20px, 3.5vw, 28px)", textAlign: "left" }}>
              <div style={{ width: "36px", height: "36px", borderRadius: "10px", background: "rgba(255,96,0,0.1)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "16px", color: "var(--orange)", fontWeight: 800, fontSize: "16px" }}>3</div>
              <h3 style={{ color: "white", fontSize: "clamp(16px, 2.5vw, 18px)", fontWeight: 700, marginBottom: "8px" }}>Responsible Innovation</h3>
              <p style={{ color: "#9ca3af", fontSize: "clamp(13px, 1.8vw, 14px)", lineHeight: "1.65" }}>
                A heavy emphasis on intellectual property respect and robust cybersecurity practices.
              </p>
            </div>

          </div>
        </div>

        {/* Our Impact Section (Stats) */}
        <div style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center" }}>
          <h2 style={{ color: "white", fontSize: "clamp(24px, 5vw, 32px)", fontWeight: 800, marginBottom: "36px", letterSpacing: "-0.02em", lineHeight: 1.2 }}>
            Our Impact
          </h2>
          <div className="about-stats-grid">
            
            <div style={{ textAlign: "center" }}>
              <div style={{ color: "var(--orange)", fontSize: "clamp(30px, 6vw, 44px)", fontWeight: 800, marginBottom: "6px", lineHeight: 1.1 }}>25,000+</div>
              <div style={{ color: "#9ca3af", fontSize: "clamp(12.5px, 2vw, 14px)", fontWeight: 500 }}>Community Members</div>
            </div>
            
            <div style={{ textAlign: "center" }}>
              <div style={{ color: "var(--orange)", fontSize: "clamp(30px, 6vw, 44px)", fontWeight: 800, marginBottom: "6px", lineHeight: 1.1 }}>60+</div>
              <div style={{ color: "#9ca3af", fontSize: "clamp(12.5px, 2vw, 14px)", fontWeight: 500 }}>Countries</div>
            </div>
            
            <div style={{ textAlign: "center" }}>
              <div style={{ color: "var(--orange)", fontSize: "clamp(30px, 6vw, 44px)", fontWeight: 800, marginBottom: "6px", lineHeight: 1.1 }}>100+</div>
              <div style={{ color: "#9ca3af", fontSize: "clamp(12.5px, 2vw, 14px)", fontWeight: 500 }}>Projects</div>
            </div>

            <div style={{ textAlign: "center" }}>
              <div style={{ color: "var(--orange)", fontSize: "clamp(30px, 6vw, 44px)", fontWeight: 800, marginBottom: "6px", lineHeight: 1.1 }}>50+</div>
              <div style={{ color: "#9ca3af", fontSize: "clamp(12.5px, 2vw, 14px)", fontWeight: 500 }}>Events Hosted</div>
            </div>

          </div>
        </div>

      </main>

      <Footer />
    </div>
  );
}
