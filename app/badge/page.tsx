"use client";

import React, { useState, useRef, useEffect, Suspense } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
function ShieldIcon({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg className={className} style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
    </svg>
  );
}

function UploadIcon({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg className={className} style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="17 8 12 3 7 8" />
      <line x1="12" y1="3" x2="12" y2="15" />
    </svg>
  );
}

function UserIcon({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg className={className} style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

function SlidersHorizontalIcon({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg className={className} style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="21" x2="14" y1="4" y2="4" />
      <line x1="10" x2="3" y1="4" y2="4" />
      <line x1="21" x2="12" y1="12" y2="12" />
      <line x1="8" x2="3" y1="12" y2="12" />
      <line x1="21" x2="16" y1="20" y2="20" />
      <line x1="12" x2="3" y1="20" y2="20" />
      <line x1="14" x2="14" y1="2" y2="6" />
      <line x1="8" x2="8" y1="10" y2="14" />
      <line x1="16" x2="16" y1="18" y2="22" />
    </svg>
  );
}

function Undo2Icon({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg className={className} style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 14 4 9l5-5" />
      <path d="M4 9h10.5a5.5 5.5 0 0 1 5.5 5.5v0a5.5 5.5 0 0 1-5.5 5.5H11" />
    </svg>
  );
}

function CheckIcon({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg className={className} style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

import { useSearchParams } from "next/navigation";
import html2canvas from "html2canvas";

function BadgeContent() {
  const searchParams = useSearchParams();
  const person = searchParams.get("person")?.toLowerCase();
  
  let roleText = "CONTRIBUTOR";
  let roleColor = "var(--orange)";
  let roleBg = "rgba(255, 96, 0, 0.1)";
  let roleBorder = "rgba(255, 96, 0, 0.3)";

  if (person === "mentor") {
    roleText = "MENTOR";
    roleColor = "#f59e0b"; // Premium Amber/Gold
    roleBg = "rgba(245, 158, 11, 0.1)";
    roleBorder = "rgba(245, 158, 11, 0.3)";
  } else if (person === "project-admin") {
    roleText = "PROJECT ADMIN";
    roleColor = "#ef4444"; // Crimson Red
    roleBg = "rgba(239, 68, 68, 0.1)";
    roleBorder = "rgba(239, 68, 68, 0.3)";
  }

  const [name, setName] = useState("");
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  
  // Image Controls State
  const [scale, setScale] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isAdjusting, setIsAdjusting] = useState(false);
  
  // Dragging State
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const imageUrl = URL.createObjectURL(file);
      setPhotoUrl(imageUrl);
      
      // Reset transforms
      setScale(1);
      setRotation(0);
      setPosition({ x: 0, y: 0 });
      setIsAdjusting(true);
    }
  };

  const handleDownload = async () => {
    if (badgeRef.current) {
      try {
        const canvas = await html2canvas(badgeRef.current, {
          backgroundColor: null,
          scale: 2, 
          useCORS: true,
        });
        const url = canvas.toDataURL("image/png");
        const link = document.createElement("a");
        link.download = `OSCI-Badge-${name || roleText}.png`;
        link.href = url;
        link.click();
      } catch (err) {
        console.error("Failed to generate badge:", err);
      }
    }
  };

  // Mouse drag handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!photoUrl) return;
    e.preventDefault();
    setIsDragging(true);
    setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setPosition({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y,
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseLeave = () => {
    if (isDragging) setIsDragging(false);
  };

  const resetAdjustments = () => {
    setScale(1);
    setRotation(0);
    setPosition({ x: 0, y: 0 });
  };

  return (
    <div className="min-h-screen bg-[var(--bg)] flex flex-col font-sans">
      <Navbar />
      {/* Spacer to clear the fixed Navbar */}
      <div style={{ height: '96px', width: '100%', flexShrink: 0 }} aria-hidden="true" />
      
      <main className="flex-grow flex flex-col items-center py-12" style={{ margin: '0 auto', maxWidth: '1280px', width: '100%', paddingBottom: '96px', paddingLeft: 'clamp(20px, 5vw, 64px)', paddingRight: 'clamp(20px, 5vw, 64px)', overflowX: 'hidden', boxSizing: 'border-box' }}>
        
        {/* Header Section */}
        <div style={{ textAlign: 'center', marginBottom: '64px', display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
          <div style={{ background: roleBg, border: `1px solid ${roleColor}`, color: roleColor, padding: '4px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: 'bold', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: roleColor }}></div>
            {roleText} Recognition
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight" style={{ marginBottom: '16px', wordBreak: 'break-word' }}>
            {roleText === "CONTRIBUTOR" ? "Contributor" : roleText === "MENTOR" ? "Mentor" : "Project Admin"} <span style={{ color: roleColor }}>Badge</span>
          </h1>
          <p className="text-[var(--text-secondary)] text-[15px]" style={{ maxWidth: '400px', textAlign: 'center', lineHeight: '1.6', padding: '0 16px' }}>
            Create your personalized OSCI badge to celebrate your contribution to open source.
          </p>
        </div>

        {/* Content Layout */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 justify-center items-center lg:items-start w-full max-w-[1000px]">
          
          {/* LEFT: Live Preview */}
          <div className="w-full flex flex-col items-center flex-1 box-border" style={{ minWidth: 0, maxWidth: '100%' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px', width: '100%', maxWidth: '368px' }}>
              <div style={{ flex: '1', height: '1px', background: 'rgba(255,255,255,0.1)' }}></div>
              <span className="text-[11px] font-bold tracking-[0.2em] text-gray-400">LIVE PREVIEW</span>
              <div style={{ flex: '1', height: '1px', background: 'rgba(255,255,255,0.1)' }}></div>
            </div>

            {/* The Badge Itself */}
            <div 
              style={{
                position: 'relative',
                padding: 'clamp(12px, 4vw, 24px)',
                borderRadius: '24px',
                background: 'rgba(255, 255, 255, 0.02)',
                width: '100%',
                maxWidth: '368px',
                display: 'flex',
                justifyContent: 'center'
              }}
            >
              {/* Outer Glow */}
              <div style={{ position: 'absolute', inset: 0, background: roleColor, opacity: 0.15, filter: 'blur(30px)', borderRadius: '24px', zIndex: 0 }}></div>
              
              <div 
                ref={badgeRef}
                className="badge-container"
                style={{
                  position: 'relative',
                  width: '100%',
                  maxWidth: '320px',
                  aspectRatio: '320 / 460',
                  margin: '0 auto',
                  background: 'linear-gradient(180deg, #1c1c1f 0%, #121214 100%)',
                  border: `1px solid ${roleBorder}`,
                  borderRadius: '20px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  padding: '8% 6%',
                  boxShadow: '0 20px 40px rgba(0,0,0,0.5)',
                  zIndex: 1,
                  overflow: 'hidden',
                  boxSizing: 'border-box'
                }}
              >
                {/* Background Accent inside badge */}
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '60%', background: `radial-gradient(ellipse at top, ${roleBg.replace('0.1', '0.3')} 0%, transparent 70%)` }}></div>
                <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '50%', background: `radial-gradient(ellipse at bottom, rgba(255,96,0,0.15) 0%, transparent 70%)` }}></div>

                {/* Badge Header */}
                <div style={{ textAlign: 'center', zIndex: 2, marginBottom: '8%', width: '100%' }}>
                  <h3 style={{ color: 'white', fontWeight: 800, fontSize: 'clamp(18px, 6cqw, 22px)', lineHeight: '1.2' }}>Open Source</h3>
                  <h3 style={{ color: 'white', fontWeight: 800, fontSize: 'clamp(18px, 6cqw, 22px)', lineHeight: '1.2' }}>Connect <span style={{ color: roleColor }}>India</span></h3>
                  <h3 style={{ color: roleColor, fontWeight: 900, fontSize: 'clamp(18px, 6cqw, 22px)', lineHeight: '1.2' }}>2026</h3>
                </div>

                {/* Avatar Container */}
                <div style={{ position: 'relative', width: '45%', marginBottom: '8%', zIndex: 2 }}>
                  <div 
                    style={{
                      width: '100%',
                      aspectRatio: '1/1',
                      flexShrink: 0,
                      borderRadius: '50%',
                      background: '#161618',
                      border: `3px solid ${roleColor}`,
                      boxShadow: `0 0 24px ${roleBg.replace('0.1', '0.4')}`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      overflow: 'hidden',
                      cursor: photoUrl ? (isDragging ? 'grabbing' : 'grab') : 'default'
                    }}
                    onMouseDown={handleMouseDown}
                    onMouseMove={handleMouseMove}
                    onMouseUp={handleMouseUp}
                    onMouseLeave={handleMouseLeave}
                    onTouchStart={(e) => {
                      if (!photoUrl) return;
                      setIsDragging(true);
                      setDragStart({ x: e.touches[0].clientX - position.x, y: e.touches[0].clientY - position.y });
                    }}
                    onTouchMove={(e) => {
                      if (!isDragging) return;
                      setPosition({ x: e.touches[0].clientX - dragStart.x, y: e.touches[0].clientY - dragStart.y });
                    }}
                    onTouchEnd={handleMouseUp}
                  >
                    {photoUrl ? (
                      <img 
                        src={photoUrl} 
                        alt="Avatar" 
                        style={{ 
                          width: '100%', 
                          height: '100%', 
                          objectFit: 'cover',
                          transform: `scale(${scale}) rotate(${rotation}deg) translate(${position.x / scale}px, ${position.y / scale}px)`,
                          transformOrigin: 'center center',
                          pointerEvents: 'none' // Let the container handle mouse events
                        }} 
                      />
                    ) : (
                      <UserIcon style={{ width: '35%', height: '35%', color: '#6b7280' }} />
                    )}
                  </div>
                  
                  {/* The Star/Shield Badge (for Mentor/Admin) */}
                  {(person === 'mentor' || person === 'project-admin') && (
                    <div style={{
                      position: 'absolute',
                      bottom: '2%',
                      right: '2%',
                      width: 'clamp(20px, 6cqw, 28px)',
                      height: 'clamp(20px, 6cqw, 28px)',
                      background: person === 'mentor' ? 'linear-gradient(135deg, #f59e0b, #ea580c)' : 'linear-gradient(135deg, #ef4444, #b91c1c)',
                      border: '2px solid #121214',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: person === 'mentor' ? '0 4px 10px rgba(245,158,11,0.5)' : '0 4px 10px rgba(239,68,68,0.5)',
                      zIndex: 3
                    }}>
                      {person === 'mentor' ? (
                        <svg width="60%" height="60%" viewBox="0 0 24 24" fill="white" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                        </svg>
                      ) : (
                        <svg width="55%" height="55%" viewBox="0 0 24 24" fill="white" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
                        </svg>
                      )}
                    </div>
                  )}
                </div>

                {/* Name */}
                <h2 
                  style={{ 
                    color: 'white', 
                    fontSize: 'clamp(18px, 6cqw, 24px)', 
                    fontWeight: 700, 
                    marginBottom: '4%',
                    textAlign: 'center',
                    zIndex: 2,
                    wordBreak: 'break-word',
                    maxWidth: '100%'
                  }}
                >
                  {name || "Your Name"}
                </h2>

                {/* Role */}
                <div 
                  style={{
                    background: roleBg,
                    border: `1px solid ${roleBorder}`,
                    color: roleColor,
                    padding: '2% 5%',
                    borderRadius: '24px',
                    fontSize: 'clamp(10px, 3.5cqw, 12px)',
                    fontWeight: 800,
                    letterSpacing: '0.05em',
                    zIndex: 2,
                    marginBottom: 'auto'
                  }}
                >
                  {roleText}
                </div>

                {/* Footer updated */}
                <div style={{ zIndex: 2, textAlign: 'center', marginTop: '24px' }}>
                  <div style={{ color: 'gray', fontSize: '10px', fontWeight: 700, letterSpacing: '0.1em' }}>- 2026 -</div>
                  <div style={{ color: 'gray', fontSize: '9px', marginTop: '4px', letterSpacing: '0.05em' }}>Open Source Connect India 2026</div>
                </div>
              </div>
            </div>

            <p style={{ color: 'gray', fontSize: '13px', marginTop: '24px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--orange)' }}></span>
              Your badge updates in real-time
            </p>
          </div>

          {/* RIGHT: Form */}
          <div className="w-full flex flex-col flex-1 max-w-[480px] box-border" style={{ minWidth: 0 }}>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3 tracking-tight">Create Your <span className="text-[var(--orange)]">Badge</span></h2>
            <p className="text-[var(--text-secondary)] text-[14px] mb-8" style={{ lineHeight: '1.6' }}>
              Personalize your badge with your name and photo. Download and share your achievement.
            </p>

            {/* Privacy Notice */}
            <div style={{ background: 'rgba(255, 96, 0, 0.05)', border: '1px solid rgba(255, 96, 0, 0.2)', padding: '16px', borderRadius: '12px', display: 'flex', gap: '16px', marginBottom: '32px' }}>
              <ShieldIcon className="text-[var(--orange)]" style={{ width: '24px', height: '24px', flexShrink: 0 }} />
              <div>
                <h4 style={{ color: 'white', fontSize: '14px', fontWeight: 600, marginBottom: '4px' }}>Privacy First</h4>
                <p style={{ color: 'gray', fontSize: '12px' }}>We don't store your image. Your privacy is our priority.</p>
              </div>
            </div>

            {/* Form using flex styling to avoid Tailwind gap issues */}
            <form style={{ display: 'flex', flexDirection: 'column', gap: '24px', paddingBottom: '32px' }}>
              
              {/* Name Field */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label style={{ color: 'white', fontSize: '12px', fontWeight: 700, letterSpacing: '0.05em', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <UserIcon style={{ width: '14px', height: '14px', color: 'var(--orange)' }} />
                  YOUR NAME <span style={{ color: 'red' }}>*</span>
                </label>
                <input 
                  type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value.slice(0, 30))}
                  placeholder="Enter your full name"
                  className="w-full bg-[#1c1c1f] text-white text-[14px] placeholder-gray-500 rounded-xl border border-[rgba(255,255,255,0.05)] focus:outline-none focus:border-[var(--orange)] focus:ring-1 focus:ring-[var(--orange)] transition-all"
                  style={{ padding: '16px' }}
                />
                <span style={{ color: 'gray', fontSize: '11px', alignSelf: 'flex-start' }}>{name.length}/30 characters</span>
              </div>

              {/* Photo Upload / Adjust Field */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label style={{ color: 'white', fontSize: '12px', fontWeight: 700, letterSpacing: '0.05em', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <UploadIcon style={{ width: '14px', height: '14px', color: 'var(--orange)' }} />
                  YOUR PHOTO <span style={{ color: 'red' }}>*</span>
                </label>
                
                {!photoUrl ? (
                  // Initial Upload Box
                  <div style={{ position: 'relative', width: '100%', height: '140px', background: '#1c1c1f', border: '1px dashed rgba(255, 96, 0, 0.4)', borderRadius: '16px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s', cursor: 'pointer' }} className="hover:border-[var(--orange)] hover:bg-[#252529]">
                    <input 
                      type="file" 
                      accept="image/png, image/jpeg"
                      onChange={handlePhotoUpload}
                      style={{ position: 'absolute', inset: 0, opacity: 0, cursor: 'pointer', width: '100%', height: '100%' }}
                    />
                    <UploadIcon style={{ width: '28px', height: '28px', color: 'var(--orange)', marginBottom: '12px' }} />
                    <p style={{ color: 'white', fontSize: '13px', fontWeight: 500 }}>
                      Drop your photo here or <span style={{ color: 'var(--orange)' }}>browse</span>
                    </p>
                    <p style={{ color: 'gray', fontSize: '11px', marginTop: '4px' }}>JPG or PNG • Auto-cropped to square</p>
                  </div>
                ) : (
                  // Photo Uploaded & Adjustment Tools
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    {/* Compact Status Bar */}
                    <div style={{ background: '#1c1c1f', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '12px', padding: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--bg)', border: '2px solid var(--orange)', overflow: 'hidden' }}>
                          <img src={photoUrl} alt="Thumbnail" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        </div>
                        <div>
                          <p style={{ color: 'var(--orange)', fontSize: '13px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px' }}>
                            <CheckIcon style={{ width: '12px', height: '12px' }} /> Photo uploaded
                          </p>
                          <p style={{ color: 'gray', fontSize: '11px' }}>Ready for your badge</p>
                        </div>
                      </div>
                      <button 
                        type="button" 
                        onClick={() => setIsAdjusting(!isAdjusting)}
                        style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', padding: '6px 12px', borderRadius: '8px', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}
                        className="hover:bg-[rgba(255,255,255,0.1)] transition-colors"
                      >
                        <SlidersHorizontalIcon style={{ width: '14px', height: '14px' }} />
                        {isAdjusting ? 'Close' : 'Adjust'}
                      </button>
                    </div>

                    {/* Advanced Adjust Panel */}
                    {isAdjusting && (
                      <div style={{ background: '#161618', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '16px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        <div>
                          <h4 style={{ color: 'white', fontSize: '15px', fontWeight: 600, marginBottom: '4px' }}>Adjust Your Image</h4>
                          <p style={{ color: 'gray', fontSize: '12px' }}>Fine-tune position and size by dragging the image.</p>
                        </div>

                        {/* Scale Slider */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <label style={{ color: 'gray', fontSize: '12px' }}>Scale</label>
                            <span style={{ color: 'var(--orange)', fontSize: '12px', fontWeight: 600 }}>{scale.toFixed(2)}x</span>
                          </div>
                          <input 
                            type="range" 
                            min="0.5" max="3" step="0.1" 
                            value={scale} 
                            onChange={(e) => setScale(parseFloat(e.target.value))}
                            style={{ width: '100%', accentColor: 'var(--orange)' }}
                          />
                        </div>

                        {/* Rotation Slider */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <label style={{ color: 'gray', fontSize: '12px' }}>Rotation</label>
                            <span style={{ color: 'var(--orange)', fontSize: '12px', fontWeight: 600 }}>{rotation}°</span>
                          </div>
                          <input 
                            type="range" 
                            min="0" max="360" step="1" 
                            value={rotation} 
                            onChange={(e) => setRotation(parseFloat(e.target.value))}
                            style={{ width: '100%', accentColor: 'var(--orange)' }}
                          />
                        </div>

                        {/* Quick Rotate Buttons */}
                        <div style={{ display: 'flex', gap: '8px' }}>
                          {[0, 90, 180, 270].map((deg) => (
                            <button
                              key={deg}
                              type="button"
                              onClick={() => setRotation(deg)}
                              style={{ 
                                flex: '1', 
                                padding: '8px', 
                                borderRadius: '8px', 
                                fontSize: '12px', 
                                fontWeight: 600,
                                background: rotation === deg ? 'var(--orange)' : 'rgba(255,255,255,0.05)',
                                color: rotation === deg ? 'white' : 'gray',
                                border: '1px solid rgba(255,255,255,0.1)',
                              }}
                            >
                              {deg}°
                            </button>
                          ))}
                        </div>

                        {/* Actions */}
                        <div style={{ display: 'flex', gap: '12px', marginTop: '8px' }}>
                          <button 
                            type="button" 
                            onClick={resetAdjustments}
                            style={{ flex: '1', background: 'rgba(255,96,0,0.1)', color: 'var(--orange)', padding: '10px', borderRadius: '8px', fontSize: '13px', fontWeight: 600, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '6px' }}
                          >
                            <Undo2Icon style={{ width: '14px', height: '14px' }} /> Reset All
                          </button>
                          <button 
                            type="button" 
                            onClick={() => setIsAdjusting(false)}
                            style={{ flex: '1', background: 'var(--orange)', color: 'white', padding: '10px', borderRadius: '8px', fontSize: '13px', fontWeight: 600, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '6px' }}
                          >
                            <CheckIcon style={{ width: '14px', height: '14px' }} /> Done
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Main Actions (Upload / Download) */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', marginTop: '16px' }}>
                <div style={{ position: 'relative', flex: '1 1 120px' }}>
                  <input 
                    type="file" 
                    accept="image/png, image/jpeg"
                    onChange={handlePhotoUpload}
                    style={{ position: 'absolute', inset: 0, opacity: 0, cursor: 'pointer', width: '100%', height: '100%', zIndex: 10 }}
                  />
                  <button 
                    type="button"
                    style={{ width: '100%', background: '#1c1c1f', border: '1px solid rgba(255,255,255,0.1)', color: 'white', padding: '16px', borderRadius: '12px', fontSize: '13px', fontWeight: 700, letterSpacing: '0.05em', position: 'relative' }}
                    className="hover:bg-[#252529] transition-colors"
                  >
                    {photoUrl ? "CHANGE IMG" : "UPLOAD IMG"}
                  </button>
                </div>
                
                <button 
                  type="button"
                  onClick={handleDownload}
                  style={{ flex: '1 1 120px', background: 'var(--orange)', color: 'white', padding: '16px', borderRadius: '12px', fontSize: '13px', fontWeight: 700, letterSpacing: '0.05em', boxShadow: '0 8px 20px rgba(255, 96, 0, 0.2)' }}
                  className="hover:bg-[var(--orange-dark)] transition-colors"
                >
                  DOWNLOAD
                </button>
              </div>

            </form>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}

export default function BadgePage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[var(--bg)] flex items-center justify-center text-white">Loading...</div>}>
      <BadgeContent />
    </Suspense>
  );
}
