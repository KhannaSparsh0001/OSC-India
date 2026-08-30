import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function BadgeLoading() {
  return (
    <div className="min-h-screen bg-[var(--bg)] flex flex-col font-sans">
      <Navbar />
      <div style={{ height: '96px', width: '100%', flexShrink: 0 }} aria-hidden="true" />
      
      <main className="flex-grow flex flex-col items-center py-12" style={{ margin: '0 auto', maxWidth: '1280px', width: '100%', paddingBottom: '96px', paddingLeft: 'clamp(20px, 5vw, 64px)', paddingRight: 'clamp(20px, 5vw, 64px)', overflowX: 'hidden', boxSizing: 'border-box' }}>
        
        {/* Header Skeleton */}
        <div style={{ textAlign: 'center', marginBottom: '64px', display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }} className="animate-pulse">
          <div style={{ width: '120px', height: '24px', borderRadius: '20px', background: 'rgba(255,255,255,0.05)', marginBottom: '16px' }} />
          <div style={{ width: '320px', height: '48px', borderRadius: '8px', background: 'rgba(255,255,255,0.1)', marginBottom: '16px' }} />
          <div style={{ width: '400px', height: '20px', borderRadius: '4px', background: 'rgba(255,255,255,0.05)' }} />
        </div>

        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 justify-center items-center lg:items-start w-full max-w-[1000px]">
          
          {/* LEFT: Badge Skeleton */}
          <div className="w-full flex flex-col items-center flex-1 box-border animate-pulse" style={{ minWidth: 0, maxWidth: '100%' }}>
            <div style={{ width: '100%', maxWidth: '368px', height: '24px', background: 'rgba(255,255,255,0.05)', borderRadius: '4px', marginBottom: '24px' }} />
            
            <div style={{ width: '100%', maxWidth: '320px', aspectRatio: '320 / 460', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '8% 6%' }}>
              <div style={{ width: '140px', height: '60px', background: 'rgba(255,255,255,0.1)', borderRadius: '8px', marginBottom: '8%' }} />
              <div style={{ width: '45%', aspectRatio: '1/1', background: 'rgba(255,255,255,0.1)', borderRadius: '50%', marginBottom: '8%' }} />
              <div style={{ width: '120px', height: '24px', background: 'rgba(255,255,255,0.1)', borderRadius: '4px', marginBottom: '4%' }} />
              <div style={{ width: '80px', height: '20px', background: 'rgba(255,255,255,0.05)', borderRadius: '12px' }} />
            </div>
          </div>

          {/* RIGHT: Form Skeleton */}
          <div className="w-full flex flex-col flex-1 max-w-[480px] box-border animate-pulse" style={{ minWidth: 0 }}>
            <div style={{ width: '200px', height: '36px', background: 'rgba(255,255,255,0.1)', borderRadius: '6px', marginBottom: '12px' }} />
            <div style={{ width: '320px', height: '40px', background: 'rgba(255,255,255,0.05)', borderRadius: '4px', marginBottom: '32px' }} />

            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <div style={{ width: '100%', height: '56px', background: 'rgba(255,255,255,0.05)', borderRadius: '12px' }} />
              <div style={{ width: '100%', height: '140px', background: 'rgba(255,255,255,0.05)', borderRadius: '16px' }} />
              <div style={{ display: 'flex', gap: '12px', marginTop: '16px' }}>
                <div style={{ flex: 1, height: '52px', background: 'rgba(255,255,255,0.1)', borderRadius: '12px' }} />
                <div style={{ flex: 1, height: '52px', background: 'rgba(255,255,255,0.05)', borderRadius: '12px' }} />
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
