import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function LeaderboardLoading() {
  return (
    <div className="min-h-screen bg-[var(--bg)] flex flex-col font-sans text-white">
      <Navbar />
      <div style={{ height: '96px', width: '100%', flexShrink: 0 }} aria-hidden="true" />
      
      <main className="flex-grow flex flex-col items-center px-6" style={{ margin: '0 auto', maxWidth: '1000px', width: '100%', paddingBottom: '96px', paddingTop: '24px' }}>
        
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '64px' }}>
          <h1 style={{ fontSize: '40px', fontWeight: 800, marginBottom: '12px', letterSpacing: '-0.02em' }}>
            Community <span style={{ color: 'var(--orange)' }}>Leaderboard</span>
          </h1>
          <p style={{ color: '#9ca3af', fontSize: '15px' }}>
            Celebrating our top contributors and open source champions
          </p>
        </div>

        {/* Top 3 Skeleton */}
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-end', gap: '24px', marginBottom: '48px', width: '100%', flexWrap: 'wrap' }}>
          {[2, 1, 3].map((rank, idx) => (
            <div 
              key={idx}
              style={{
                background: 'rgba(255,255,255,0.02)',
                border: rank === 1 ? '1px solid var(--orange)' : '1px solid rgba(255,255,255,0.05)',
                borderRadius: '16px',
                padding: rank === 1 ? '40px 32px' : '32px 24px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                width: rank === 1 ? '280px' : '240px',
                position: 'relative'
              }}
              className="animate-pulse"
            >
              <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'rgba(255,255,255,0.1)', marginBottom: '24px' }}></div>
              <div style={{ width: '40px', height: '24px', background: 'rgba(255,255,255,0.1)', borderRadius: '4px', marginBottom: '8px' }}></div>
              <div style={{ width: '120px', height: '18px', background: 'rgba(255,255,255,0.1)', borderRadius: '4px', marginBottom: '4px' }}></div>
              <div style={{ width: '80px', height: '12px', background: 'rgba(255,255,255,0.05)', borderRadius: '4px', marginBottom: '24px' }}></div>
              <div style={{ width: '60px', height: '32px', background: 'rgba(255,255,255,0.1)', borderRadius: '4px', marginBottom: '16px' }}></div>
              <div style={{ width: '100px', height: '14px', background: 'rgba(255,255,255,0.1)', borderRadius: '4px', marginBottom: '24px' }}></div>
              <div style={{ width: '100%', height: '40px', background: 'rgba(255,255,255,0.1)', borderRadius: '8px' }}></div>
            </div>
          ))}
        </div>

        {/* Search Bar Skeleton */}
        <div style={{ width: '100%', maxWidth: '500px', marginBottom: '48px' }} className="animate-pulse">
          <div style={{ width: '100%', height: '56px', borderRadius: '12px', background: 'rgba(255,255,255,0.05)' }}></div>
        </div>

        {/* List Skeletons */}
        <div style={{ width: '100%', maxWidth: '800px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {[...Array(6)].map((_, i) => (
            <div 
              key={i}
              style={{
                background: 'rgba(255,255,255,0.02)',
                border: '1px solid rgba(255,255,255,0.05)',
                borderRadius: '12px',
                padding: '16px 24px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '16px'
              }}
              className="animate-pulse"
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '24px', flex: 1, minWidth: '200px' }}>
                <div style={{ width: '24px', height: '24px', background: 'rgba(255,255,255,0.1)', borderRadius: '4px' }}></div>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(255,255,255,0.1)' }}></div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <div style={{ width: '120px', height: '16px', background: 'rgba(255,255,255,0.1)', borderRadius: '4px' }}></div>
                  <div style={{ width: '80px', height: '12px', background: 'rgba(255,255,255,0.05)', borderRadius: '4px' }}></div>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
                <div style={{ width: '40px', height: '24px', background: 'rgba(255,255,255,0.1)', borderRadius: '4px' }}></div>
                <div style={{ width: '40px', height: '24px', background: 'rgba(255,255,255,0.1)', borderRadius: '4px' }}></div>
                <div style={{ width: '80px', height: '32px', background: 'rgba(255,255,255,0.1)', borderRadius: '6px' }}></div>
              </div>
            </div>
          ))}
        </div>

      </main>

      <Footer />
    </div>
  );
}
