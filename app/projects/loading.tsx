import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function ProjectsLoading() {
  return (
    <main className="min-h-screen bg-[var(--bg)] flex flex-col">
      <Navbar />

      <div style={{ height: "72px", flexShrink: 0 }} aria-hidden="true" />

      <div className="projects-page-wrapper">
        <div style={{ textAlign: "center", marginBottom: "48px" }} className="animate-pulse">
          <div style={{ width: '240px', height: '48px', borderRadius: '8px', background: 'rgba(255,255,255,0.1)', margin: '0 auto 16px auto' }} />
          <div style={{ width: '400px', height: '20px', borderRadius: '4px', background: 'rgba(255,255,255,0.05)', margin: '0 auto' }} />
        </div>

        <div className="projects-grid" style={{ marginBottom: "40px" }}>
          {[...Array(6)].map((_, i) => (
            <div key={i} className="animate-pulse" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '24px', padding: '32px', height: '240px', display: 'flex', flexDirection: 'column' }}>
              <div style={{ width: '60%', height: '28px', borderRadius: '4px', background: 'rgba(255,255,255,0.1)', marginBottom: '16px' }} />
              <div style={{ width: '90%', height: '16px', borderRadius: '4px', background: 'rgba(255,255,255,0.05)', marginBottom: '8px' }} />
              <div style={{ width: '70%', height: '16px', borderRadius: '4px', background: 'rgba(255,255,255,0.05)', marginBottom: 'auto' }} />
              
              <div style={{ display: 'flex', gap: '16px', marginTop: '24px' }}>
                <div style={{ width: '64px', height: '24px', borderRadius: '12px', background: 'rgba(255,255,255,0.1)' }} />
                <div style={{ width: '64px', height: '24px', borderRadius: '12px', background: 'rgba(255,255,255,0.05)' }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </main>
  );
}
