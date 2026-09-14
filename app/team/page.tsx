"use client";

import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import TeamCard from "../components/TeamCard";

const teamMembers = [
  { name: "Sparsh Khanna", role: "Program Manager", linkedinUrl: "https://www.linkedin.com/in/khannasparsh/", imageUrl: "/team/sparsh_khanna.png" },
  { name: "Gulam Shaikh", role: "Program Manager", linkedinUrl: "https://www.linkedin.com/in/gulam-shaikh/", imageUrl: "/team/gulam_shaikh.jpg" },
  { name: "Adrisha Biswas", role: "Program Manager", linkedinUrl: "https://www.linkedin.com/in/adrisha-biswas/", imageUrl: "/team/adrisha_biswas.png" },
  { name: "Krishna Dev Pathak", role: "Community Manager", linkedinUrl: "https://www.linkedin.com/in/krishna-dev-pathak-157937320/", imageUrl: "/team/krishna_dev_pathak.jpg" },
  { name: "Shashwat Gupta", role: "Community Manager", linkedinUrl: "https://www.linkedin.com/in/shashwatg22/", imageUrl: "/team/shashwat_gupta.png" },
  { name: "Aryan Pandey", role: "Manager", linkedinUrl: "https://www.linkedin.com/in/aryan-pandey-pyx/", imageUrl: "/team/aryan_pandey.jpeg" },
  { name: "Abhradip Pal", role: "Next.js Developer", linkedinUrl: "https://www.linkedin.com/in/abhradip-pal-159a20313/", imageUrl: "/team/abhradip_pal.jpg" },
  { name: "Agniva Mukherjee", role: "YT streamer and Next.js developer", linkedinUrl: "https://www.linkedin.com/in/agniva-mukherjee-a09042267/", imageUrl: "/team/agniva_mukherjee.jpg" },
  { name: "Ansika Singh", role: "Developer", linkedinUrl: "https://www.linkedin.com/in/ansika-singh-992b22388/", imageUrl: "/team/ansika_singh.png" },
  { name: "Yejarla Srinivas", role: "Ui Ux Designer", linkedinUrl: "https://www.linkedin.com/in/yejarla-srinivas/", imageUrl: "/team/yejarla_srinivas.jpg" },
  { name: "Himanish Chatterjee", role: "Designer", linkedinUrl: "https://www.linkedin.com/in/himanish-chatterjee-153a50327/", imageUrl: "/team/himanish_chatterjee.png" },
  { name: "Souvik Das", role: "Graphic Designer", linkedinUrl: "https://www.linkedin.com/in/souvikdas12102005/", imageUrl: "/team/souvik_das.png" },
  { name: "Jahaan Gauri", role: "Community Manager", linkedinUrl: "https://www.linkedin.com/in/jahaan-gauri-705182349/", imageUrl: "/team/jahaan_gauri.png" },
  { name: "Pallavi M", role: "Event Host Manager", linkedinUrl: "https://www.linkedin.com/in/pallavi-m-ise/", imageUrl: "/team/pallavi_m.jpg" },
  { name: "Ishita Zope", role: "Partnership and Collaboration", linkedinUrl: "https://www.linkedin.com/in/ishita-zope/", imageUrl: "/team/ishita_zope.jpg" },
  { name: "Sania Khanna", role: "Content Creator", linkedinUrl: "https://www.linkedin.com/in/saniakhanna/", imageUrl: "/team/sania_khanna.png" },
  { name: "Adrishikhar Chowdhury", role: "Technical Content Writer", linkedinUrl: "https://www.linkedin.com/in/adrishikhar-chowdhury/", imageUrl: "/team/adrishikhar_chowdhury.png" }
];

export default function TeamPage() {
  return (
    <div className="min-h-screen bg-[var(--bg)] flex flex-col font-sans">
      <Navbar />
      {/* Spacer to clear the fixed Navbar */}
      <div style={{ height: '96px', width: '100%', flexShrink: 0 }} aria-hidden="true" />
      
      <main className="flex-grow pt-12 pb-24 md:pb-32" style={{ margin: '0 auto', maxWidth: '1280px', width: '100%', paddingLeft: 'clamp(20px, 5vw, 64px)', paddingRight: 'clamp(20px, 5vw, 64px)', overflowX: 'hidden', boxSizing: 'border-box' }}>
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
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 justify-items-center w-full" style={{ marginBottom: '64px' }}>
          {teamMembers.map((member, index) => (
            <TeamCard 
              key={index} 
              name={member.name} 
              role={member.role} 
              linkedinUrl={member.linkedinUrl} 
              imageUrl={member.imageUrl}
              priority={index < 5}
            />
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
