"use client";

import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[var(--bg)] flex flex-col font-sans">
      <Navbar />
      {/* Spacer to clear the fixed Navbar */}
      <div style={{ height: '96px', width: '100%', flexShrink: 0 }} aria-hidden="true" />
      
      <main className="flex-grow flex flex-col items-center px-5 sm:px-8" style={{ margin: '0 auto', maxWidth: '1200px', width: '100%', paddingBottom: '96px', paddingTop: '40px' }}>
        
        {/* Hero Section */}
        <div style={{ textAlign: 'center', marginBottom: '80px', display: 'flex', flexDirection: 'column', alignItems: 'center', maxWidth: '800px' }}>
          <h1 style={{ color: 'white', fontSize: 'clamp(32px, 6vw, 48px)', fontWeight: 800, marginBottom: '24px', letterSpacing: '-0.02em' }}>
            About Us
          </h1>
          <p style={{ color: '#9ca3af', fontSize: '16px', lineHeight: '1.7', marginBottom: '24px' }}>
            Open Source Connect India is an international open-source community initiative committed to fostering collaboration, innovation, and technical excellence. Our initiative unites contributors, developers, designers, and community leaders from around the world to build impactful, scalable, and community-driven solutions.
          </p>
          <p style={{ color: '#9ca3af', fontSize: '16px', lineHeight: '1.7' }}>
            We focus on creating structured pathways for individuals to explore open-source development through contributor programs, mentorship, industry-aligned workshops, and global networking opportunities.
          </p>
        </div>

        {/* Two-Card Layout */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '24px', width: '100%', marginBottom: '80px' }}>
          {/* Card 1: Why We Exist */}
          <div style={{ flex: '1', minWidth: '280px', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '16px', padding: 'clamp(24px, 4vw, 40px)' }}>
            <h2 style={{ color: 'var(--orange)', fontSize: '24px', fontWeight: 700, marginBottom: '20px' }}>Why We Exist</h2>
            <p style={{ color: '#9ca3af', fontSize: '15px', lineHeight: '1.7' }}>
              Open-source is the foundation of modern technology but many talented individuals lack access to the right network, guidance, or global visibility. We aim to bridge that gap by creating a platform where knowledge is shared openly, projects are built collaboratively, and contributors are recognized globally.
            </p>
          </div>

          {/* Card 2: Our Vision */}
          <div style={{ flex: '1', minWidth: '280px', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '16px', padding: 'clamp(24px, 4vw, 40px)' }}>
            <h2 style={{ color: 'var(--orange)', fontSize: '24px', fontWeight: 700, marginBottom: '20px' }}>Our Vision</h2>
            <p style={{ color: '#9ca3af', fontSize: '15px', lineHeight: '1.7' }}>
              Our vision is to create the world's most inclusive and collaborative open-source ecosystem by uniting 1 million+ contributors across continents. By strengthening global connections and making contribution accessible to all, we aim to empower people to build innovative, community-driven technologies that solve real human problems.
            </p>
          </div>
        </div>

        {/* Our Community Section */}
        <div style={{ textAlign: 'center', marginBottom: '80px', display: 'flex', flexDirection: 'column', alignItems: 'center', maxWidth: '800px' }}>
          <h2 style={{ color: 'white', fontSize: 'clamp(26px, 5vw, 32px)', fontWeight: 800, marginBottom: '24px', letterSpacing: '-0.02em' }}>
            Our Community
          </h2>
          <p style={{ color: '#9ca3af', fontSize: '15px', lineHeight: '1.7', marginBottom: '16px' }}>
            We are powered by passionate volunteers, community builders, and leaders from around the world. Each person brings unique ideas, diverse cultural experiences, and a shared commitment to creating impact through open-source.
          </p>
          <p style={{ color: '#9ca3af', fontSize: '15px', lineHeight: '1.7' }}>
            Together, we turn collaboration into innovation.
          </p>
        </div>

        {/* Our Philosophy Section (Injected per user request) */}
        <div style={{ textAlign: 'center', marginBottom: '80px', display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
          <h2 style={{ color: 'white', fontSize: 'clamp(26px, 5vw, 32px)', fontWeight: 800, marginBottom: '24px', letterSpacing: '-0.02em' }}>
            Our Philosophy
          </h2>
          <p style={{ color: '#9ca3af', fontSize: '15px', lineHeight: '1.7', marginBottom: '40px', maxWidth: '800px' }}>
            We strictly enforce three philosophical tenets across all our hosted projects and initiatives:
          </p>
          
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '24px', width: '100%', justifyContent: 'center' }}>
            
            {/* Tenet 1 */}
            <div style={{ flex: '1', minWidth: '280px', maxWidth: '380px', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '16px', padding: '32px', textAlign: 'left' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'rgba(255,96,0,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px', color: 'var(--orange)', fontWeight: 800, fontSize: '18px' }}>1</div>
              <h3 style={{ color: 'white', fontSize: '18px', fontWeight: 700, marginBottom: '12px' }}>Sustainable Ecosystems</h3>
              <p style={{ color: '#9ca3af', fontSize: '14px', lineHeight: '1.7' }}>
                Rejecting the "abandonware" trend by providing frameworks for projects to survive independently.
              </p>
            </div>

            {/* Tenet 2 */}
            <div style={{ flex: '1', minWidth: '280px', maxWidth: '380px', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '16px', padding: '32px', textAlign: 'left' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'rgba(255,96,0,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px', color: 'var(--orange)', fontWeight: 800, fontSize: '18px' }}>2</div>
              <h3 style={{ color: 'white', fontSize: '18px', fontWeight: 700, marginBottom: '12px' }}>Transparent Leadership</h3>
              <p style={{ color: '#9ca3af', fontSize: '14px', lineHeight: '1.7' }}>
                Open decision-making processes and clear pathways to leadership for anyone willing to put in the work.
              </p>
            </div>

            {/* Tenet 3 */}
            <div style={{ flex: '1', minWidth: '280px', maxWidth: '380px', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '16px', padding: '32px', textAlign: 'left' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'rgba(255,96,0,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px', color: 'var(--orange)', fontWeight: 800, fontSize: '18px' }}>3</div>
              <h3 style={{ color: 'white', fontSize: '18px', fontWeight: 700, marginBottom: '12px' }}>Responsible Innovation</h3>
              <p style={{ color: '#9ca3af', fontSize: '14px', lineHeight: '1.7' }}>
                A heavy emphasis on intellectual property respect and robust cybersecurity practices.
              </p>
            </div>

          </div>
        </div>

        {/* Our Impact Section (Stats) */}
        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <h2 style={{ color: 'white', fontSize: 'clamp(26px, 5vw, 32px)', fontWeight: 800, marginBottom: '48px', letterSpacing: '-0.02em' }}>
            Our Impact
          </h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '32px', width: '100%' }}>
            
            <div style={{ textAlign: 'center', flex: '1', minWidth: '130px' }}>
              <div style={{ color: 'var(--orange)', fontSize: 'clamp(36px, 6vw, 48px)', fontWeight: 800, marginBottom: '8px' }}>25,000+</div>
              <div style={{ color: '#9ca3af', fontSize: '14px', fontWeight: 500 }}>Community Members</div>
            </div>
            
            <div style={{ textAlign: 'center', flex: '1', minWidth: '130px' }}>
              <div style={{ color: 'var(--orange)', fontSize: 'clamp(36px, 6vw, 48px)', fontWeight: 800, marginBottom: '8px' }}>60+</div>
              <div style={{ color: '#9ca3af', fontSize: '14px', fontWeight: 500 }}>Countries</div>
            </div>
            
            <div style={{ textAlign: 'center', flex: '1', minWidth: '130px' }}>
              <div style={{ color: 'var(--orange)', fontSize: 'clamp(36px, 6vw, 48px)', fontWeight: 800, marginBottom: '8px' }}>100+</div>
              <div style={{ color: '#9ca3af', fontSize: '14px', fontWeight: 500 }}>Projects</div>
            </div>

            <div style={{ textAlign: 'center', flex: '1', minWidth: '130px' }}>
              <div style={{ color: 'var(--orange)', fontSize: 'clamp(36px, 6vw, 48px)', fontWeight: 800, marginBottom: '8px' }}>50+</div>
              <div style={{ color: '#9ca3af', fontSize: '14px', fontWeight: 500 }}>Events Hosted</div>
            </div>

          </div>
        </div>

      </main>

      <Footer />
    </div>
  );
}
