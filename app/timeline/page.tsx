"use client";

import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function TimelinePage() {
  const events = [
    {
      status: "upcoming",
      title: "Spring Hackathon",
      date: "March 15, 2026",
      description: "48-hour coding marathon focused on sustainable technology solutions",
      location: "Virtual",
      attendees: "500+"
    },
    {
      status: "upcoming",
      title: "Women in Tech Summit",
      date: "February 28, 2026",
      description: "Celebrating and empowering women leaders in technology",
      location: "San Francisco, CA",
      attendees: "300+"
    },
    {
      status: "past",
      title: "Code for Good Workshop",
      date: "February 14, 2026",
      description: "Building tech solutions for non-profit organizations",
      location: "Virtual",
      attendees: "200+"
    },
    {
      status: "past",
      title: "AI/ML Conference",
      date: "January 20, 2026",
      description: "Exploring the latest advances in artificial intelligence and machine learning",
      location: "New York, NY",
      attendees: "800+"
    },
    {
      status: "past",
      title: "Year End Meetup",
      date: "December 10, 2025",
      description: "Celebrating achievements and planning for the future",
      location: "Virtual",
      attendees: "300+"
    }
  ];

  return (
    <div className="min-h-screen bg-[var(--bg)] flex flex-col font-sans">
      <Navbar />
      {/* Spacer to clear the fixed Navbar */}
      <div style={{ height: '96px', width: '100%', flexShrink: 0 }} aria-hidden="true" />
      
      <main className="flex-grow flex flex-col items-center px-6" style={{ margin: '0 auto', maxWidth: '1000px', width: '100%', paddingBottom: '96px', paddingTop: '48px' }}>
        
        {/* Header Section */}
        <div style={{ textAlign: 'center', marginBottom: 'clamp(40px, 8vw, 80px)', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <h1 style={{ color: 'white', fontSize: 'clamp(32px, 10vw, 48px)', fontWeight: 800, marginBottom: '24px', letterSpacing: '-0.02em', lineHeight: 1.2 }}>
            Event <span style={{ color: 'var(--orange)' }}>Timeline</span>
          </h1>
          <p style={{ color: '#9ca3af', fontSize: 'clamp(14px, 4vw, 16px)', lineHeight: '1.7', maxWidth: '600px', padding: '0 16px' }}>
            Join us at upcoming events and workshops designed to inspire and connect developers
          </p>
        </div>

        {/* Timeline Container */}
        <div style={{ width: '100%', maxWidth: '800px', display: 'flex', flexDirection: 'column', gap: 'clamp(24px, 6vw, 48px)' }}>
          
          {events.map((event, index) => {
            const isLast = index === events.length - 1;
            const isUpcoming = event.status === "upcoming";
            const lineColor = isUpcoming ? "var(--orange)" : "rgba(255,255,255,0.1)";
            const dotColor = isUpcoming ? "var(--orange)" : "rgba(255,255,255,0.15)";
            const borderColor = isUpcoming ? "rgba(255, 96, 0, 0.4)" : "rgba(255, 255, 255, 0.05)";

            return (
              <div 
                key={index} 
                style={{ 
                  position: 'relative', 
                  width: '100%', 
                  background: 'rgba(255,255,255,0.02)', 
                  border: `1px solid ${borderColor}`,
                  borderRadius: '16px',
                  padding: 'clamp(20px, 5vw, 32px)',
                  zIndex: 10
                }}
              >
                {/* The Dot */}
                <div 
                  style={{
                    position: 'absolute',
                    top: '34px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '12px',
                    height: '12px',
                    borderRadius: '50%',
                    background: dotColor,
                    boxShadow: isUpcoming ? '0 0 16px var(--orange)' : 'none',
                    zIndex: 20
                  }}
                />

                {/* Line from top border to dot */}
                {index !== 0 && (
                  <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: '2px', height: '34px', background: lineColor }} />
                )}

                {/* Line to the next card (Gap line) */}
                {!isLast && (
                  <div style={{ position: 'absolute', bottom: 'calc(-1 * clamp(24px, 6vw, 48px))', left: '50%', transform: 'translateX(-50%)', width: '2px', height: 'clamp(24px, 6vw, 48px)', background: lineColor }} />
                )}

                {/* Top Row: Pill & Date */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
                  {isUpcoming ? (
                    <div style={{ background: 'rgba(255,96,0,0.1)', color: 'var(--orange)', padding: '6px 16px', borderRadius: '24px', fontSize: '11px', fontWeight: 800, letterSpacing: '0.05em' }}>
                      UPCOMING
                    </div>
                  ) : (
                    <div /> /* Empty div to push date to right using justify-between */
                  )}
                  
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#9ca3af', fontSize: '13px', fontWeight: 500 }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                    {event.date}
                  </div>
                </div>

                {/* Card Content */}
                <h3 style={{ color: 'white', fontSize: '26px', fontWeight: 800, marginBottom: '12px', letterSpacing: '-0.01em' }}>
                  {event.title}
                </h3>
                <p style={{ color: '#9ca3af', fontSize: '14px', lineHeight: '1.6', marginBottom: '32px', maxWidth: '600px' }}>
                  {event.description}
                </p>

                {/* Info Row & Register Button */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '24px' }}>
                  
                  {/* Info Blocks */}
                  <div style={{ display: 'flex', gap: '32px', flexWrap: 'wrap' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#6b7280', fontSize: '12px', fontWeight: 600 }}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                        Location
                      </div>
                      <div style={{ color: 'white', fontSize: '14px', fontWeight: 600 }}>{event.location}</div>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#6b7280', fontSize: '12px', fontWeight: 600 }}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
                        Attendees
                      </div>
                      <div style={{ color: 'white', fontSize: '14px', fontWeight: 600 }}>{event.attendees}</div>
                    </div>
                  </div>

                  {/* Register Button */}
                  {isUpcoming && (
                    <button 
                      type="button"
                      style={{ background: 'var(--orange)', color: 'white', padding: '12px 24px', borderRadius: '8px', fontSize: '14px', fontWeight: 700, letterSpacing: '0.05em', border: 'none', cursor: 'pointer' }}
                      className="hover:bg-[#ff7a29] transition-colors"
                    >
                      Register Now
                    </button>
                  )}
                  
                </div>

              </div>
            );
          })}

        </div>

      </main>

      <Footer />
    </div>
  );
}
