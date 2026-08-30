"use client";

import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function LeaderboardPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const topThree = [
    { rank: 2, name: "Dipanita Mondal", username: "@Dipanita45", points: 340, prs: 33 },
    { rank: 1, name: "Samrat Saha", username: "@samrat21saha", points: 540, prs: 36, isFirst: true },
    { rank: 3, name: "Vishaal Pillay", username: "@VishaalPillay", points: 300, prs: 12 },
  ];

  const othersList = [
    { rank: 4, name: "Soumyosish Pal", username: "@Soumyosish", points: 290, prs: 24 },
    { rank: 5, name: "Arjun Mehta", username: "@arjun", points: 275, prs: 20 },
    { rank: 6, name: "Priya Sharma", username: "@priyasharma", points: 260, prs: 18 },
    { rank: 7, name: "Rahul Kumar", username: "@rahulk", points: 245, prs: 16 },
    { rank: 8, name: "Sneha Patel", username: "@snehasp", points: 230, prs: 15 },
    { rank: 9, name: "Aditya Singh", username: "@adityasingh", points: 215, prs: 14 },
  ];

  const filteredTopThree = topThree.filter(user => 
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    user.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredOthers = othersList.filter(user => 
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    user.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

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

        {/* Top 3 Section */}
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-end', gap: '24px', marginBottom: '64px', width: '100%', flexWrap: 'wrap' }}>
          {filteredTopThree.map((user) => (
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
                  <div style={{ fontSize: '32px' }}>{user.name[0]}</div>
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

        {/* List Section (Ranks 4-9) */}
        <div style={{ width: '100%', maxWidth: '800px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {filteredOthers.map((user) => (
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
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#1c1c1f', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid rgba(255,255,255,0.1)' }}>
                   <div style={{ fontSize: '16px' }}>{user.name[0]}</div>
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
