import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { auth } from "@/auth";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function BadgePage() {
  const session = await auth();
  if (!session?.user) {
    redirect("/sign-in");
  }

  const supabase = await createClient();
  
  // Fetch profile and role
  const { data: profileData } = await supabase
    .from('profiles')
    .select(`
      full_name, 
      avatar_url, 
      users ( 
        roles ( name ) 
      )
    `)
    .eq('user_id', session.user.id)
    .single();

  // @ts-ignore
  const roleName = profileData?.users?.roles?.name || 'Contributor';
  const fullName = profileData?.full_name || session.user.name;
  const username = session.user.email ? session.user.email.split('@')[0] : 'user';
  const avatar = profileData?.avatar_url || session.user.image;

  return (
    <div className="min-h-screen bg-[var(--bg)] flex flex-col font-sans text-white relative overflow-hidden">
      
      {/* Dynamic Background Glows */}
      <div style={{ position: 'absolute', top: '10%', left: '20%', width: '40vw', height: '40vw', background: 'radial-gradient(circle, rgba(255,96,0,0.15) 0%, transparent 70%)', filter: 'blur(60px)', zIndex: 0, pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: '10%', right: '10%', width: '30vw', height: '30vw', background: 'radial-gradient(circle, rgba(255,255,255,0.05) 0%, transparent 70%)', filter: 'blur(60px)', zIndex: 0, pointerEvents: 'none' }} />

      <Navbar />
      <div style={{ height: '96px', width: '100%', flexShrink: 0 }} aria-hidden="true" />
      
      <main className="flex-grow flex flex-col items-center justify-center relative z-10" style={{ padding: '40px 20px', width: '100%', maxWidth: '1200px', margin: '0 auto' }}>
        
        {/* Back button */}
        <div style={{ width: '100%', marginBottom: '40px' }}>
          <Link href="/dashboard" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: '#9ca3af', textDecoration: 'none', fontSize: '14px', fontWeight: 600, transition: 'color 0.2s' }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
            Back to Dashboard
          </Link>
        </div>

        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <h1 style={{ fontSize: 'clamp(32px, 5vw, 48px)', fontWeight: 800, marginBottom: '16px', letterSpacing: '-0.02em', background: 'linear-gradient(to right, #fff, #a1a1aa)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            Digital Identity
          </h1>
          <p style={{ color: '#9ca3af', fontSize: '16px', maxWidth: '500px', margin: '0 auto' }}>
            Your official Open Source Connect India 2026 badge. Present this at events or share it online.
          </p>
        </div>

        {/* 3D Glassmorphism Badge Card */}
        <div 
          className="group relative"
          style={{ 
            width: '100%', 
            maxWidth: '400px',
            perspective: '1000px',
            marginBottom: '40px'
          }}
        >
          {/* Glowing border effect underneath */}
          <div className="absolute inset-0 rounded-[32px] bg-gradient-to-br from-[var(--orange)] to-transparent opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500" />
          
          <div 
            style={{ 
              position: 'relative',
              background: 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.01) 100%)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255,255,255,0.1)',
              boxShadow: '0 30px 60px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.1)',
              borderRadius: '32px',
              padding: '40px 32px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              overflow: 'hidden',
              transformStyle: 'preserve-3d',
              transition: 'transform 0.5s cubic-bezier(0.23, 1, 0.32, 1)'
            }}
            className="hover:scale-[1.02] hover:-translate-y-2"
          >
            {/* Shimmer effect line */}
            <div style={{ position: 'absolute', top: 0, left: '-100%', width: '50%', height: '100%', background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.1), transparent)', transform: 'skewX(-20deg)', animation: 'shimmer 3s infinite' }} />
            
            {/* OSCI Logo/Header */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', marginBottom: '40px' }}>
              <div style={{ fontSize: '20px', fontWeight: 800, letterSpacing: '-0.05em' }}>
                OSC<span style={{ color: 'var(--orange)' }}>I</span>
              </div>
              <div style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.2em', color: '#9ca3af', background: 'rgba(255,255,255,0.05)', padding: '4px 8px', borderRadius: '12px' }}>
                2026 EDITION
              </div>
            </div>

            {/* Avatar */}
            <div style={{ width: '140px', height: '140px', borderRadius: '50%', border: '3px solid rgba(255,255,255,0.1)', padding: '4px', marginBottom: '24px', position: 'relative' }}>
              <div style={{ width: '100%', height: '100%', borderRadius: '50%', overflow: 'hidden', background: 'var(--bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '48px', fontWeight: 800 }}>
                {avatar ? (
                  <img src={avatar} alt={fullName} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                  fullName ? fullName[0] : 'O'
                )}
              </div>
              
              {/* Verified Check */}
              <div style={{ position: 'absolute', bottom: '8px', right: '8px', background: 'var(--orange)', borderRadius: '50%', width: '28px', height: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '3px solid #1a1a1c' }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
              </div>
            </div>

            {/* User Info */}
            <h2 style={{ fontSize: '28px', fontWeight: 700, marginBottom: '4px', textAlign: 'center', letterSpacing: '-0.02em' }}>{fullName}</h2>
            <div style={{ color: 'var(--orange)', fontSize: '14px', fontWeight: 600, marginBottom: '32px' }}>@{username}</div>

            {/* Role & ID Footer */}
            <div style={{ width: '100%', background: 'rgba(0,0,0,0.3)', borderRadius: '16px', padding: '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', border: '1px solid rgba(255,255,255,0.05)' }}>
              <div>
                <div style={{ fontSize: '10px', color: '#9ca3af', fontWeight: 600, letterSpacing: '0.1em', marginBottom: '4px' }}>ROLE</div>
                <div style={{ fontSize: '14px', fontWeight: 700, color: 'white' }}>{roleName}</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '10px', color: '#9ca3af', fontWeight: 600, letterSpacing: '0.1em', marginBottom: '4px' }}>ID NO.</div>
                <div style={{ fontSize: '14px', fontWeight: 700, fontFamily: 'monospace', color: 'rgba(255,255,255,0.8)' }}>
                  {session.user.id.substring(0, 8).toUpperCase()}
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', justifyContent: 'center' }}>
          <button style={{ background: 'var(--orange)', color: 'white', border: 'none', padding: '14px 28px', borderRadius: '12px', fontSize: '14px', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', transition: 'background 0.2s', boxShadow: '0 4px 14px rgba(255,96,0,0.3)' }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
            Download Pass
          </button>
          <button style={{ background: 'rgba(255,255,255,0.05)', color: 'white', border: '1px solid rgba(255,255,255,0.1)', padding: '14px 28px', borderRadius: '12px', fontSize: '14px', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', transition: 'background 0.2s' }} className="hover:bg-[rgba(255,255,255,0.1)]">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="18" cy="5" r="3"></circle><circle cx="6" cy="12" r="3"></circle><circle cx="18" cy="19" r="3"></circle><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line></svg>
            Share Profile
          </button>
        </div>
        
      </main>

      <Footer />
      
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes shimmer {
          0% { left: -100%; }
          50% { left: 200%; }
          100% { left: 200%; }
        }
      `}} />
    </div>
  );
}
