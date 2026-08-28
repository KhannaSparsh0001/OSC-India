"use client";

import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SpeakerCard from "../components/SpeakerCard";

export default function SpeakersPage() {
  const speakers = [
    {
      name: "Olena Yara",
      role: "Founder at Yara Agency",
      company: "Marketing Strategist",
    },
    {
      name: "Dishant Gandhi",
      role: "AI/ML Consultant",
      company: "Ruffalo Noel Levitz",
    },
    {
      name: "Sebastiano Fuccio",
      role: "Founder & CEO | Managing Partner",
      company: "AI Strategy & Sovereign Innovation",
    },
    {
      name: "Nithin S.S",
      role: "Founder of Synapse QA",
      company: "Career & Leadership Strategist",
    },
    {
      name: "Luiz Carneiro",
      role: "Solution Engineer, smapiot GmbH",
      company: "Google Cloud Community Organizer",
    },
    {
      name: "Tarun Gupta",
      role: "Founder & CTO",
      company: "Salesforce Marketing Champion",
    },
    {
      name: "Mesut Durukal",
      role: "Founder and Head of Tokyo Test Fest",
      company: "Technical Quality Engineering & Test Automation Manager",
    },
    {
      name: "Prasad Sawant",
      role: "Co-Founder at LetsUpgrade",
      company: "Leading the AI Mumbai Community",
    },
  ];

  return (
    <div className="min-h-screen bg-[var(--bg)] flex flex-col font-sans">
      <Navbar />
      {/* Spacer to clear the fixed Navbar */}
      <div style={{ height: '96px', width: '100%', flexShrink: 0 }} aria-hidden="true" />
      
      <main className="flex-grow flex flex-col items-center px-6" style={{ margin: '0 auto', maxWidth: '1280px', width: '100%', paddingBottom: '96px', paddingTop: '48px' }}>
        
        {/* Header Section */}
        <div style={{ textAlign: 'center', marginBottom: '64px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <h1 style={{ color: 'white', fontSize: '48px', fontWeight: 800, marginBottom: '24px', letterSpacing: '-0.02em' }}>
            Our <span style={{ color: 'var(--orange)' }}>Speakers</span>
          </h1>
          <p style={{ color: '#9ca3af', fontSize: '16px', lineHeight: '1.7', maxWidth: '600px' }}>
            Learn from industry leaders and innovators shaping the future of technology
          </p>
        </div>

        {/* Speakers Grid */}
        <div 
          style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', 
            gap: '24px', 
            width: '100%' 
          }}
        >
          {speakers.map((speaker, index) => (
            <SpeakerCard 
              key={index}
              name={speaker.name}
              role={speaker.role}
              company={speaker.company}
              linkedinUrl="#"
              twitterUrl="#"
            />
          ))}
        </div>

      </main>

      <Footer />
    </div>
  );
}
