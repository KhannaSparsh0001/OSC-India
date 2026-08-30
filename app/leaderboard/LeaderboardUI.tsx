"use client";

import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function LeaderboardUI({ users }: { users: any[] }) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredUsers = users.filter(user => 
    (user.name && user.name.toLowerCase().includes(searchQuery.toLowerCase())) || 
    (user.username && user.username.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const filteredTopThree = filteredUsers.slice(0, 3);
  const filteredOthers = filteredUsers.slice(3, 13);

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

        {/* Top 3 Section */}
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-end', gap: '24px', marginBottom: '48px', width: '100%', flexWrap: 'wrap' }}>
          {filteredTopThree.map((user, index) => (
            <div 
              key={user.rank}
              style={{
                background: 'rgba(255,255,255,0.02)',
                border: user.isFirst ? '1px solid var(--orange)' : '1px solid rgba(255,255,255,0.05)',
                borderRadius: '16px',
                padding: user.isFirst ? '40px 32px' : '32px 24px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                width: user.isFirst ? '280px' : '240px',
                boxShadow: user.isFirst ? '0 8px 32px rgba(255,96,0,0.1)' : 'none',
                position: 'relative'
              }}
            >
              {/* Avatar */}
              <div style={{ position: 'relative', marginBottom: '24px' }}>
                <div style={{ width: '80px', height: '80px', borderRadius: '50%', border: '2px solid var(--orange)', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#1c1c1f', overflow: 'hidden' }}>
                  {user.avatar ? (
                    <img src={user.avatar} alt={user.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  ) : (
                    <div style={{ fontSize: '32px' }}>{user.name ? user.name[0] : 'U'}</div>
                  )}
                </div>
                {user.isFirst && (
                  <div style={{ position: 'absolute', top: '-12px', right: '-8px', fontSize: '24px' }}>👑</div>
                )}
              </div>

              {/* Rank */}
              <div style={{ color: 'var(--orange)', fontSize: '24px', fontWeight: 800, marginBottom: '8px' }}>#{user.rank}</div>
              
              {/* Name & Username */}
              <h2 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '4px', textAlign: 'center' }}>{user.name}</h2>
              <div style={{ color: '#9ca3af', fontSize: '12px', marginBottom: '24px' }}>{user.username}</div>

              {/* Points */}
              <div style={{ fontSize: '32px', fontWeight: 800, lineHeight: '1' }}>{user.points}</div>
              <div style={{ color: '#9ca3af', fontSize: '11px', marginBottom: '16px' }}>Points</div>

              {/* PRs */}
              <div style={{ color: 'var(--orange)', fontSize: '14px', fontWeight: 700, marginBottom: '24px' }}>
                {user.prs} Merged PRs
              </div>

              {/* Button */}
              <button style={{ width: '100%', background: 'var(--orange)', color: 'white', padding: '10px', borderRadius: '8px', fontSize: '13px', fontWeight: 700, border: 'none', cursor: 'pointer' }}>
                View Profile
              </button>
            </div>
          ))}
        </div>

        {/* Search Bar */}
        <div style={{ width: '100%', maxWidth: '500px', marginBottom: '48px' }}>
          <input 
            type="text" 
            placeholder="Search by name or username..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ 
              width: '100%', 
              padding: '16px 24px', 
              borderRadius: '12px', 
              background: 'rgba(255,255,255,0.05)', 
              border: '1px solid rgba(255,255,255,0.1)', 
              color: 'white', 
              fontSize: '15px',
              outline: 'none',
              transition: 'all 0.2s'
            }}
            onFocus={(e) => e.target.style.borderColor = 'var(--orange)'}
            onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
          />
        </div>

        {/* List Section (Ranks 4-9) */}
        <div style={{ width: '100%', maxWidth: '800px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {filteredOthers.map((user, index) => (
            <div 
              key={user.rank}
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
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '24px', flex: 1, minWidth: '200px' }}>
                {/* Rank */}
                <div style={{ color: 'var(--orange)', fontSize: '18px', fontWeight: 800, width: '32px' }}>#{user.rank}</div>
                
                {/* Avatar */}
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#1c1c1f', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid rgba(255,255,255,0.1)', overflow: 'hidden' }}>
                  {user.avatar ? (
                    <img src={user.avatar} alt={user.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  ) : (
                    <div style={{ fontSize: '16px' }}>{user.name ? user.name[0] : 'U'}</div>
                  )}
                </div>

                {/* Name & Username */}
                <div>
                  <div style={{ fontSize: '15px', fontWeight: 700 }}>{user.name}</div>
                  <div style={{ color: '#9ca3af', fontSize: '12px' }}>{user.username}</div>
                </div>
              </div>

              {/* Stats & Actions */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '32px', flexWrap: 'wrap' }}>
                
                {/* Points */}
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '16px', fontWeight: 800 }}>{user.points}</div>
                  <div style={{ color: '#9ca3af', fontSize: '10px' }}>Points</div>
                </div>

                {/* PRs */}
                <div style={{ textAlign: 'center' }}>
                  <div style={{ color: 'var(--orange)', fontSize: '16px', fontWeight: 800 }}>{user.prs}</div>
                  <div style={{ color: '#9ca3af', fontSize: '10px' }}>Merged PRs</div>
                </div>

                {/* Button */}
                <button style={{ background: 'var(--orange)', color: 'white', padding: '8px 20px', borderRadius: '6px', fontSize: '12px', fontWeight: 700, border: 'none', cursor: 'pointer' }}>
                  View Profile
                </button>
              </div>

            </div>
          ))}
        </div>

      </main>

      <Footer />
    </div>
  );
}
