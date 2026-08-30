"use client";

import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function DashboardPage() {
  // Dummy data for the contribution matrix (GitHub style)
  const matrixCols = 25; // 25 weeks to fit in the card
  const matrixRows = 7;
  const matrixDots = Array.from({ length: matrixCols * matrixRows }, (_, i) => {
    // Deterministic pseudo-random generation to prevent hydration error
    const val = (i * 9301 + 49297) % 233280 / 233280;
    if (val > 0.85) return 'var(--orange)';
    if (val > 0.7) return 'rgba(255,96,0,0.5)';
    if (val > 0.5) return 'rgba(255,96,0,0.2)';
    return 'rgba(255,255,255,0.05)';
  });

  return (
    <div className="min-h-screen bg-[var(--bg)] flex flex-col font-sans text-white">
      <Navbar />
      <div style={{ height: '96px', width: '100%', flexShrink: 0 }} aria-hidden="true" />
      
      <main className="flex-grow flex flex-col items-center" style={{ margin: '0 auto', maxWidth: '1440px', width: '100%', paddingBottom: '96px', paddingTop: '24px', paddingLeft: 'clamp(20px, 5vw, 64px)', paddingRight: 'clamp(20px, 5vw, 64px)', overflowX: 'hidden', boxSizing: 'border-box' }}>
        
        {/* Header */}
        <div style={{ width: '100%', marginBottom: '40px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(255,96,0,0.1)', color: 'var(--orange)', padding: '4px 12px', borderRadius: '16px', fontSize: '12px', fontWeight: 600, marginBottom: '24px' }}>
            <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--orange)' }} />
            Dashboard Active
          </div>
          <h1 style={{ fontSize: 'clamp(32px, 8vw, 40px)', fontWeight: 800, marginBottom: '8px', letterSpacing: '-0.02em' }}>Command Center</h1>
          <p style={{ color: '#9ca3af', fontSize: '15px' }}>Your open source journey at a glance</p>
        </div>

        {/* Top Grid Area (Profile + Stats) */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 w-full mb-12">
          
          {/* LEFT COLUMN: Profile info */}
          <div className="md:col-span-1 xl:col-span-1" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            
            {/* Main Profile Card */}
            <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '24px', padding: 'clamp(24px, 4vw, 40px) 24px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{ width: '120px', height: '120px', borderRadius: '50%', border: '2px solid var(--orange)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '48px', fontWeight: 800, color: 'white', marginBottom: '20px', position: 'relative' }}>
                O
                <div style={{ position: 'absolute', bottom: '0', right: '0', background: 'var(--bg)', borderRadius: '50%', padding: '4px' }}>
                  <div style={{ width: '24px', height: '24px', background: 'var(--orange)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  </div>
                </div>
              </div>
              <h2 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '4px' }}>Open Source Dev</h2>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#9ca3af', fontSize: '14px', marginBottom: '24px' }}>
                @osdev 
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
              </div>

              {/* Social Icons */}
              <div style={{ display: 'flex', gap: '16px', marginBottom: '24px' }}>
                 <div style={{ width: '36px', height: '36px', background: 'rgba(255,255,255,0.05)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg></div>
                 <div style={{ width: '36px', height: '36px', background: 'rgba(255,255,255,0.05)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg></div>
              </div>

              {/* Badges */}
              <div style={{ display: 'flex', gap: '8px', marginBottom: '24px' }}>
                <div style={{ background: 'rgba(255,96,0,0.1)', color: 'var(--orange)', padding: '4px 12px', borderRadius: '16px', fontSize: '12px', fontWeight: 600 }}>Contributor</div>
                <div style={{ background: 'rgba(255,255,255,0.05)', color: '#9ca3af', padding: '4px 12px', borderRadius: '16px', fontSize: '12px', fontWeight: 600 }}>✓ Verified</div>
              </div>

              {/* Selected Banner */}
              <div style={{ width: '100%', background: 'linear-gradient(to right, rgba(255,96,0,0.15), rgba(255,96,0,0.05))', border: '1px solid rgba(255,96,0,0.2)', borderRadius: '12px', padding: '16px', display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
                <div style={{ width: '40px', height: '40px', background: 'var(--orange)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
                </div>
                <div>
                  <div style={{ fontSize: '14px', fontWeight: 700, color: 'white' }}>You're Selected! 🎉</div>
                  <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.6)' }}>Since December 22, 2025</div>
                </div>
              </div>

              {/* ID Card Banner */}
              <div style={{ width: '100%', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '12px', padding: '16px', marginBottom: '24px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
                  <div style={{ width: '40px', height: '40px', background: 'rgba(255,255,255,0.1)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                     <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--orange)" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                  </div>
                  <div>
                    <div style={{ fontSize: '14px', fontWeight: 700, color: 'white' }}>OSCG 2026 ID Card</div>
                    <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.6)' }}>Your digital credential</div>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button style={{ flex: 1, background: 'rgba(255,255,255,0.05)', color: 'white', padding: '10px', borderRadius: '8px', fontSize: '13px', fontWeight: 600 }}>View</button>
                  <button style={{ flex: 1, background: 'var(--orange)', color: 'white', padding: '10px', borderRadius: '8px', fontSize: '13px', fontWeight: 600 }}>Download</button>
                </div>
              </div>

              <button style={{ width: '100%', background: 'transparent', border: '1px solid rgba(255,255,255,0.1)', color: '#9ca3af', padding: '12px', borderRadius: '8px', fontSize: '14px', fontWeight: 600 }}>
                Explore Projects ↗
              </button>

            </div>
          </div>

          {/* RIGHT COLUMN: Stats & Charts */}
          <div className="md:col-span-1 xl:col-span-2" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            
            {/* Rank Card */}
            <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '24px', padding: 'clamp(20px, 4vw, 32px)', position: 'relative' }}>
               <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '32px' }}>
                 <div>
                   <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#9ca3af', fontSize: '12px', fontWeight: 600, marginBottom: '8px', letterSpacing: '0.05em' }}>
                     <span style={{ color: 'var(--orange)' }}>🏆</span> CURRENT RANK
                   </div>
                   <div style={{ display: 'flex', alignItems: 'baseline', gap: '12px' }}>
                     <div style={{ fontSize: '48px', fontWeight: 800 }}>#50</div>
                     <div style={{ fontSize: '14px', color: '#9ca3af' }}>Top 100%</div>
                   </div>
                 </div>
                 <div style={{ textAlign: 'right' }}>
                   <div style={{ fontSize: '24px', fontWeight: 800 }}>0</div>
                   <div style={{ fontSize: '12px', color: '#9ca3af' }}>day streak</div>
                 </div>
               </div>

               <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                 <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: '#9ca3af' }}>
                   <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: 'var(--orange)' }} />
                   Progress to next rank
                 </div>
                 <div style={{ fontSize: '12px', color: 'white' }}>0 / 200 pts</div>
               </div>

               {/* Progress Bar */}
               <div style={{ width: '100%', height: '8px', background: 'rgba(255,255,255,0.1)', borderRadius: '4px', marginBottom: '12px', overflow: 'hidden' }}>
                 <div style={{ width: '5%', height: '100%', background: 'var(--orange)', borderRadius: '4px' }} />
               </div>
               
               <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px' }}>
                 <div style={{ color: '#9ca3af' }}>0.0% complete</div>
                 <div style={{ color: 'var(--orange)' }}>200 pts to go ↗</div>
               </div>

               {/* Small Stat Pills */}
               <div style={{ display: 'flex', gap: '16px', marginTop: '32px', flexWrap: 'wrap' }}>
                 <div style={{ flex: 1, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '12px', padding: '16px' }}>
                   <div style={{ color: 'var(--orange)', fontSize: '16px', fontWeight: 700, marginBottom: '4px' }}>+0</div>
                   <div style={{ color: '#9ca3af', fontSize: '11px' }}>Weekly</div>
                 </div>
                 <div style={{ flex: 1, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '12px', padding: '16px' }}>
                   <div style={{ color: 'var(--orange)', fontSize: '16px', fontWeight: 700, marginBottom: '4px' }}>0</div>
                   <div style={{ color: '#9ca3af', fontSize: '11px' }}>Active Days</div>
                 </div>
                 <div style={{ flex: 1, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '12px', padding: '16px' }}>
                   <div style={{ color: 'var(--orange)', fontSize: '16px', fontWeight: 700, marginBottom: '4px' }}>0/5</div>
                   <div style={{ color: '#9ca3af', fontSize: '11px' }}>Goals Hit</div>
                 </div>
               </div>
            </div>

            {/* Bottom Row inside Right Column (Tech Stack + PR Distribution) */}
            <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
              
              {/* Tech Stack */}
              <div style={{ flex: 1, minWidth: '200px', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '24px', padding: '24px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', fontWeight: 600, marginBottom: '20px' }}>
                  <span style={{ color: 'var(--orange)' }}>⚡</span> Tech Stack
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {['HTML', 'CSS', 'JavaScript', 'React', 'TypeScript', 'Python', 'Node.js'].map(tech => (
                    <div key={tech} style={{ background: 'rgba(255,255,255,0.05)', padding: '6px 12px', borderRadius: '12px', fontSize: '12px', fontWeight: 500 }}>
                      {tech}
                    </div>
                  ))}
                </div>
              </div>

              {/* PR Distribution */}
              <div style={{ flex: 1, minWidth: '200px', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '24px', padding: '24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <div style={{ fontSize: '14px', fontWeight: 600 }}>PR Distribution</div>
                  <div style={{ fontSize: '12px', color: '#9ca3af' }}>0 total</div>
                </div>
                <div style={{ fontSize: '12px', color: '#9ca3af', marginBottom: '32px' }}>By difficulty level</div>
                
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', height: '60px', paddingBottom: '16px' }}>
                  {/* Dummy bars */}
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--orange)' }} />
                    <div style={{ fontSize: '11px', color: '#9ca3af' }}>Easy</div>
                    <div style={{ fontSize: '12px', fontWeight: 700 }}>0</div>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#3b82f6' }} />
                    <div style={{ fontSize: '11px', color: '#9ca3af' }}>Medium</div>
                    <div style={{ fontSize: '12px', fontWeight: 700 }}>0</div>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#eab308' }} />
                    <div style={{ fontSize: '11px', color: '#9ca3af' }}>Hard</div>
                    <div style={{ fontSize: '12px', fontWeight: 700 }}>0</div>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#ef4444' }} />
                    <div style={{ fontSize: '11px', color: '#9ca3af' }}>Expert</div>
                    <div style={{ fontSize: '12px', fontWeight: 700 }}>0</div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>


        {/* Section Divider */}
        <div style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '16px', margin: '48px 0' }}>
          <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.05)' }} />
          <div style={{ fontSize: '11px', fontWeight: 700, color: '#9ca3af', letterSpacing: '0.1em' }}>ACTIVITY</div>
          <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.05)' }} />
        </div>

        {/* Contribution Activity Section */}
        <div style={{ width: '100%', marginBottom: '24px' }}>
          <h2 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '8px' }}>Contribution Activity</h2>
          <p style={{ color: '#9ca3af', fontSize: '14px' }}>Track your daily contributions and build your streak</p>
        </div>

        <div style={{ width: '100%', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '24px', padding: 'clamp(16px, 4vw, 32px)', marginBottom: '48px', overflowX: 'auto' }}>
          <div style={{ fontSize: '14px', fontWeight: 700, marginBottom: '4px' }}>Activity Matrix</div>
          <div style={{ fontSize: '12px', color: '#9ca3af', marginBottom: '32px' }}>118 contributions in the last 59 days</div>
          
          <div style={{ display: 'flex', gap: '16px', minWidth: '800px' }}>
            {/* Days labels */}
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', fontSize: '11px', color: '#9ca3af', padding: '8px 0', height: '136px' }}>
              <div>Mon</div>
              <div>Wed</div>
              <div>Fri</div>
              <div>Sun</div>
            </div>
            {/* Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: `repeat(${matrixCols}, 16px)`, gridTemplateRows: 'repeat(7, 16px)', gap: '4px' }}>
              {matrixDots.map((color, i) => (
                <div key={i} style={{ width: '16px', height: '16px', borderRadius: '4px', background: color }} />
              ))}
            </div>
          </div>
          
          <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: '8px', marginTop: '24px', fontSize: '11px', color: '#9ca3af' }}>
            Less 
            <div style={{ display: 'flex', gap: '4px' }}>
              <div style={{ width: '12px', height: '12px', borderRadius: '3px', background: 'rgba(255,255,255,0.05)' }} />
              <div style={{ width: '12px', height: '12px', borderRadius: '3px', background: 'rgba(255,96,0,0.2)' }} />
              <div style={{ width: '12px', height: '12px', borderRadius: '3px', background: 'rgba(255,96,0,0.5)' }} />
              <div style={{ width: '12px', height: '12px', borderRadius: '3px', background: 'var(--orange)' }} />
            </div>
            More
          </div>
        </div>

        {/* Section Divider */}
        <div style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '16px', margin: '48px 0' }}>
          <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.05)' }} />
          <div style={{ fontSize: '11px', fontWeight: 700, color: '#9ca3af', letterSpacing: '0.1em' }}>ACHIEVEMENTS</div>
          <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.05)' }} />
        </div>

        {/* Achievements */}
        <div style={{ width: '100%', marginBottom: '24px' }}>
          <h2 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '8px' }}>Your Achievements</h2>
          <p style={{ color: '#9ca3af', fontSize: '14px' }}>Unlock badges and milestones as you contribute</p>
        </div>

        <div style={{ width: '100%', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '24px', padding: 'clamp(16px, 4vw, 32px)', marginBottom: '48px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
            <div style={{ fontSize: '14px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ color: 'var(--orange)' }}>✨</span> Achievements
            </div>
            <div style={{ fontSize: '12px', color: '#9ca3af' }}>0/6 unlocked</div>
          </div>
          
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} style={{ width: '80px', height: '100px', background: 'rgba(255,255,255,0.02)', border: '1px dashed rgba(255,255,255,0.1)', borderRadius: '16px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
                <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.2)' }}>???</div>
              </div>
            ))}
          </div>
        </div>

        {/* Section Divider */}
        <div style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '16px', margin: '48px 0' }}>
          <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.05)' }} />
          <div style={{ fontSize: '11px', fontWeight: 700, color: '#9ca3af', letterSpacing: '0.1em' }}>INSIGHTS</div>
          <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.05)' }} />
        </div>

        {/* Insights */}
        <div style={{ width: '100%', marginBottom: '24px' }}>
          <h2 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '8px' }}>Impact Overview</h2>
          <p style={{ color: '#9ca3af', fontSize: '14px' }}>Your contribution metrics and community impact</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full mb-16">
          
          {/* 2x2 Stats Grid */}
          <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '24px', padding: 'clamp(16px, 4vw, 24px)' }}>
             <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
               <div style={{ fontSize: '14px', fontWeight: 700 }}>Impact Overview</div>
               <div style={{ fontSize: '12px', color: '#9ca3af', display: 'flex', alignItems: 'center', gap: '6px' }}>
                 <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                 22 views
               </div>
             </div>

             <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
               
               <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '16px', padding: '20px', position: 'relative' }}>
                 <div style={{ width: '28px', height: '28px', borderRadius: '8px', background: 'rgba(16,185,129,0.1)', color: '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
                   <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg>
                 </div>
                 <div style={{ fontSize: '24px', fontWeight: 800, marginBottom: '4px' }}>0</div>
                 <div style={{ fontSize: '12px', color: '#9ca3af' }}>Pull Requests</div>
                 <div style={{ fontSize: '10px', color: '#6b7280', marginTop: '2px' }}>0 total</div>
                 <div style={{ position: 'absolute', top: '16px', right: '16px', color: '#6b7280' }}>↗</div>
               </div>

               <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '16px', padding: '20px', position: 'relative' }}>
                 <div style={{ width: '28px', height: '28px', borderRadius: '8px', background: 'rgba(239,68,68,0.1)', color: '#ef4444', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
                   <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>
                 </div>
                 <div style={{ fontSize: '24px', fontWeight: 800, marginBottom: '4px' }}>0</div>
                 <div style={{ fontSize: '12px', color: '#9ca3af' }}>Issues Closed</div>
                 <div style={{ fontSize: '10px', color: '#6b7280', marginTop: '2px' }}>0 open</div>
                 <div style={{ position: 'absolute', top: '16px', right: '16px', color: '#6b7280' }}>↗</div>
               </div>

               <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '16px', padding: '20px', position: 'relative' }}>
                 <div style={{ width: '28px', height: '28px', borderRadius: '8px', background: 'rgba(139,92,246,0.1)', color: '#8b5cf6', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
                   <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                 </div>
                 <div style={{ fontSize: '24px', fontWeight: 800, marginBottom: '4px' }}>0</div>
                 <div style={{ fontSize: '12px', color: '#9ca3af' }}>Commits</div>
                 <div style={{ fontSize: '10px', color: '#6b7280', marginTop: '2px' }}>all time</div>
                 <div style={{ position: 'absolute', top: '16px', right: '16px', color: '#6b7280' }}>↗</div>
               </div>

               <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '16px', padding: '20px', position: 'relative' }}>
                 <div style={{ width: '28px', height: '28px', borderRadius: '8px', background: 'rgba(234,179,8,0.1)', color: '#eab308', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
                   <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>
                 </div>
                 <div style={{ fontSize: '24px', fontWeight: 800, marginBottom: '4px' }}>0</div>
                 <div style={{ fontSize: '12px', color: '#9ca3af' }}>Projects</div>
                 <div style={{ fontSize: '10px', color: '#6b7280', marginTop: '2px' }}>contributed</div>
                 <div style={{ position: 'absolute', top: '16px', right: '16px', color: '#6b7280' }}>↗</div>
               </div>
             </div>
          </div>

          {/* CTA Banner */}
          <div style={{ background: 'rgba(255,96,0,0.05)', border: '1px solid rgba(255,96,0,0.1)', borderRadius: '24px', padding: 'clamp(24px, 4vw, 40px) 24px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
            <div style={{ width: '56px', height: '56px', borderRadius: '16px', background: 'var(--orange)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px', boxShadow: '0 8px 24px rgba(255,96,0,0.3)' }}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"></path></svg>
            </div>
            <h3 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '12px' }}>Ready to Contribute?</h3>
            <p style={{ color: '#9ca3af', fontSize: '14px', lineHeight: '1.6', marginBottom: '24px', maxWidth: '300px' }}>
              Join the open source community and make an impact today
            </p>
            
            <div style={{ display: 'flex', gap: '24px', marginBottom: '32px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: '#9ca3af', fontWeight: 600 }}>
                <span style={{ color: 'var(--orange)' }}>⭐</span> Earn Points
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: '#9ca3af', fontWeight: 600 }}>
                <span style={{ color: 'var(--orange)' }}>📈</span> Rank Up
              </div>
            </div>

            <button style={{ background: 'white', color: 'black', padding: '12px 24px', borderRadius: '12px', fontSize: '14px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px' }}>
              Explore Projects →
            </button>
          </div>

        </div>

        {/* Back to top */}
        <button style={{ background: 'rgba(255,255,255,0.05)', color: 'white', padding: '10px 20px', borderRadius: '24px', fontSize: '12px', fontWeight: 600, border: '1px solid rgba(255,255,255,0.1)', cursor: 'pointer' }} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          ↑ Back to top
        </button>

      </main>

      <Footer />
    </div>
  );
}
