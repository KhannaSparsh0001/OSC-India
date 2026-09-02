import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { auth } from "@/auth";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import ActivityMatrix from "../components/ActivityMatrix";
import TechStack from "../components/TechStack";
import { getProviderAccountId } from "./actions";

export default async function DashboardPage() {
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
      tech_stack,
      users ( 
        roles ( name ) 
      )
    `)
    .eq('user_id', session.user.id)
    .single();

  // Fetch leaderboard stats
  const { data: statsData } = await supabase
    .from('leaderboard_stats')
    .select('*')
    .eq('user_id', session.user.id)
    .single();

  // Fetch contributions (for PR count)
  const { count: prCount } = await supabase
    .from('contributions')
    .select('*', { count: 'exact', head: true })
    .eq('user_id', session.user.id)
    .eq('type', 'pr')
    .eq('status', 'merged');

  // @ts-ignore - Supabase types might complain about nested joins
  const roleName = profileData?.users?.roles?.name || 'Contributor';
  const fullName = profileData?.full_name || session.user.name;
  const username = session.user.email ? session.user.email.split('@')[0] : 'user';
  const avatar = profileData?.avatar_url || session.user.image;
  const totalPoints = statsData?.total_points || 0;
  const rank = statsData?.rank || '--';
  const streak = statsData?.current_streak || 0;
  const mergedPRs = prCount || 0;

  // Tech stack from DB
  const techStack = profileData?.tech_stack || [];

  // Fetch providerAccountId for client-side API calls
  const providerAccountId = await getProviderAccountId();

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
              <div style={{ width: '120px', height: '120px', borderRadius: '50%', border: '2px solid var(--orange)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '48px', fontWeight: 800, color: 'white', marginBottom: '20px', position: 'relative', overflow: 'hidden' }}>
                {avatar ? (
                  <img src={avatar} alt={fullName} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                  fullName ? fullName[0] : 'O'
                )}
                <div style={{ position: 'absolute', bottom: '0', right: '0', background: 'var(--bg)', borderRadius: '50%', padding: '4px' }}>
                  <div style={{ width: '24px', height: '24px', background: 'var(--orange)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  </div>
                </div>
              </div>
              <h2 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '4px', textAlign: 'center' }}>{fullName}</h2>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#9ca3af', fontSize: '14px', marginBottom: '24px' }}>
                @{username}
              </div>

              {/* Badges */}
              <div style={{ display: 'flex', gap: '8px', marginBottom: '24px' }}>
                <div style={{ background: 'rgba(255,96,0,0.1)', color: 'var(--orange)', padding: '4px 12px', borderRadius: '16px', fontSize: '12px', fontWeight: 600 }}>{roleName}</div>
                <div style={{ background: 'rgba(255,255,255,0.05)', color: '#9ca3af', padding: '4px 12px', borderRadius: '16px', fontSize: '12px', fontWeight: 600 }}>✓ Verified</div>
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
                  <Link href="/badge" style={{ flex: 1, textDecoration: 'none' }}>
                    <button style={{ width: '100%', background: 'var(--orange)', color: 'white', padding: '10px', borderRadius: '8px', fontSize: '13px', fontWeight: 600, transition: 'all 0.2s', cursor: 'pointer' }}>
                      View Badge
                    </button>
                  </Link>
                </div>
              </div>
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
                     <div style={{ fontSize: '48px', fontWeight: 800 }}>#{rank}</div>
                   </div>
                 </div>
                 <div style={{ textAlign: 'right' }}>
                   <div style={{ fontSize: '24px', fontWeight: 800 }}>{streak}</div>
                   <div style={{ fontSize: '12px', color: '#9ca3af' }}>day streak</div>
                 </div>
               </div>

               {/* Small Stat Pills */}
               <div style={{ display: 'flex', gap: '16px', marginTop: '32px', flexWrap: 'wrap' }}>
                 <div style={{ flex: 1, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '12px', padding: '16px' }}>
                   <div style={{ color: 'var(--orange)', fontSize: '16px', fontWeight: 700, marginBottom: '4px' }}>{totalPoints}</div>
                   <div style={{ color: '#9ca3af', fontSize: '11px' }}>Total Points</div>
                 </div>
                 <div style={{ flex: 1, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '12px', padding: '16px' }}>
                   <div style={{ color: 'var(--orange)', fontSize: '16px', fontWeight: 700, marginBottom: '4px' }}>{mergedPRs}</div>
                   <div style={{ color: '#9ca3af', fontSize: '11px' }}>Merged PRs</div>
                 </div>
               </div>
            </div>

            {/* Bottom Row inside Right Column (Tech Stack + PR Distribution) */}
            <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
              <TechStack initialStack={techStack} providerAccountId={providerAccountId} />
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
          <div style={{ fontSize: '12px', color: '#9ca3af', marginBottom: '16px' }}>Contributions this year</div>
          
          <ActivityMatrix providerAccountId={providerAccountId} />
        </div>

        {/* Back to top */}
        <a href="#" style={{ background: 'rgba(255,255,255,0.05)', color: 'white', padding: '10px 20px', borderRadius: '24px', fontSize: '12px', fontWeight: 600, border: '1px solid rgba(255,255,255,0.1)', textDecoration: 'none' }}>
          ↑ Back to top
        </a>

      </main>

      <Footer />
    </div>
  );
}
