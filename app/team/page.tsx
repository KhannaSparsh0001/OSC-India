"use client";

import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import TeamCard from "../components/TeamCard";

const teamMembers = [
  { name: "Deb Mukherjee", role: "Role", linkedinUrl: "#" },
  { name: "Dev Agarwal", role: "Role", linkedinUrl: "#" },
  { name: "Priyansh Narang", role: "Role", linkedinUrl: "#" },
  { name: "Eswaramuthu M", role: "Role", linkedinUrl: "#" },
  { name: "Aratrik Bandyopadhyay", role: "Role", linkedinUrl: "#" },
  { name: "Yejarla Srinivas", role: "Role", linkedinUrl: "#" },
  { name: "Annapoorna SJ", role: "Role", linkedinUrl: "#" },
  { name: "Abhijna Laxmi", role: "Role", linkedinUrl: "#" },
  { name: "Durgeshwar Kumar Shaw", role: "Role", linkedinUrl: "#" },
  { name: "Kunam Santosh Reddy", role: "Role", linkedinUrl: "#" },
  { name: "Shiwani Dodke", role: "Role", linkedinUrl: "#" },
  { name: "Sakshi Chaturvedi", role: "Role", linkedinUrl: "#" },
  { name: "Rumaysa Khalid Yadwad", role: "Role", linkedinUrl: "#" },
  { name: "Aryan Kumar", role: "Role", linkedinUrl: "#" },
  { name: "Ananyaa", role: "Role", linkedinUrl: "#" },
  { name: "Miloni Panchal", role: "Role", linkedinUrl: "#" },
  { name: "Simrithi S", role: "Role", linkedinUrl: "#" },
  { name: "Anurag Adarsh", role: "Role", linkedinUrl: "#" },
];

export default function TeamPage() {
  return (
    <div className="min-h-screen bg-[var(--bg)] flex flex-col font-sans">
      <Navbar />
      {/* Spacer to clear the fixed Navbar */}
      <div style={{ height: '96px', width: '100%', flexShrink: 0 }} aria-hidden="true" />
      
      <main className="flex-grow px-6 py-12" style={{ margin: '0 auto', maxWidth: '1280px', width: '100%' }}>
        {/* Header Section */}
        <div style={{ textAlign: 'center', marginBottom: '64px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight" style={{ marginBottom: '12px' }}>
            Meet Our <span className="text-[var(--orange)]">Team</span>
          </h1>
          <p className="text-base md:text-lg text-[var(--text-secondary)]" style={{ maxWidth: '600px', textAlign: 'center' }}>
            Dedicated professionals working together to build the future of open source collaboration
          </p>
        </div>

        {/* Team Grid */}
        <div 
          style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 220px), 1fr))', 
            gap: '24px',
            justifyItems: 'center',
            paddingBottom: '80px'
          }}
        >
          {teamMembers.map((member, index) => (
            <TeamCard 
              key={index} 
              name={member.name} 
              role={member.role} 
              linkedinUrl={member.linkedinUrl} 
            />
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
