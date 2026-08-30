import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function DashboardLoading() {
  return (
    <div className="min-h-screen bg-[var(--bg)] flex flex-col font-sans text-white">
      <Navbar />
      <div style={{ height: '96px', width: '100%', flexShrink: 0 }} aria-hidden="true" />
      
      <main className="flex-grow flex flex-col items-center" style={{ margin: '0 auto', maxWidth: '1440px', width: '100%', paddingBottom: '96px', paddingTop: '24px', paddingLeft: 'clamp(20px, 5vw, 64px)', paddingRight: 'clamp(20px, 5vw, 64px)', overflowX: 'hidden', boxSizing: 'border-box' }}>
        
        {/* Header Skeleton */}
        <div style={{ width: '100%', marginBottom: '40px' }} className="animate-pulse">
          <div style={{ width: '140px', height: '24px', borderRadius: '16px', background: 'rgba(255,255,255,0.05)', marginBottom: '24px' }} />
          <div style={{ width: '300px', height: '48px', borderRadius: '8px', background: 'rgba(255,255,255,0.1)', marginBottom: '8px' }} />
          <div style={{ width: '200px', height: '20px', borderRadius: '4px', background: 'rgba(255,255,255,0.05)' }} />
        </div>

        {/* Top Grid Area Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 w-full mb-12">
          
          {/* LEFT COLUMN: Profile Skeleton */}
          <div className="md:col-span-1 xl:col-span-1 animate-pulse" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '24px', padding: 'clamp(24px, 4vw, 40px) 24px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{ width: '120px', height: '120px', borderRadius: '50%', background: 'rgba(255,255,255,0.1)', marginBottom: '20px' }} />
              <div style={{ width: '160px', height: '28px', borderRadius: '4px', background: 'rgba(255,255,255,0.1)', marginBottom: '12px' }} />
              <div style={{ width: '100px', height: '16px', borderRadius: '4px', background: 'rgba(255,255,255,0.05)', marginBottom: '24px' }} />
              
              <div style={{ display: 'flex', gap: '8px', marginBottom: '24px' }}>
                <div style={{ width: '80px', height: '24px', borderRadius: '16px', background: 'rgba(255,255,255,0.1)' }} />
                <div style={{ width: '80px', height: '24px', borderRadius: '16px', background: 'rgba(255,255,255,0.05)' }} />
              </div>

              <div style={{ width: '100%', height: '80px', borderRadius: '12px', background: 'rgba(255,255,255,0.05)', marginBottom: '24px' }} />
            </div>
          </div>

          {/* RIGHT COLUMN: Stats Skeleton */}
          <div className="md:col-span-1 xl:col-span-2 animate-pulse" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '24px', padding: 'clamp(20px, 4vw, 32px)', height: '250px' }}>
              <div style={{ width: '120px', height: '16px', borderRadius: '4px', background: 'rgba(255,255,255,0.05)', marginBottom: '16px' }} />
              <div style={{ width: '200px', height: '48px', borderRadius: '8px', background: 'rgba(255,255,255,0.1)' }} />
              
              <div style={{ display: 'flex', gap: '16px', marginTop: '64px' }}>
                <div style={{ flex: 1, height: '80px', borderRadius: '12px', background: 'rgba(255,255,255,0.05)' }} />
                <div style={{ flex: 1, height: '80px', borderRadius: '12px', background: 'rgba(255,255,255,0.05)' }} />
              </div>
            </div>

            <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
              <div style={{ flex: 1, minWidth: '200px', height: '140px', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '24px' }} />
            </div>
          </div>
        </div>

      </main>

      <Footer />
    </div>
  );
}
