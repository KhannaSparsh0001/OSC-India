import React from 'react';
import Link from 'next/link';

interface TeamCardProps {
  name: string;
  role: string;
  linkedinUrl: string;
}

export default function TeamCard({ name, role, linkedinUrl }: TeamCardProps) {
  return (
      <div 
        className="group w-full max-w-full rounded-[24px] border border-[rgba(255,255,255,0.05)] shadow-lg hover:border-[var(--orange)] transition-colors duration-300"
        style={{ background: '#121214', padding: 'clamp(16px, 5vw, 24px)', display: 'flex', flexDirection: 'column', alignItems: 'center', boxSizing: 'border-box', minWidth: 0 }}
      >
      {/* Avatar Placeholder */}
      <div 
        style={{ 
          width: '120px', 
          height: '120px', 
          background: '#1c1c1f', 
          borderRadius: '24px',
          border: '1px solid rgba(255,255,255,0.02)',
          marginBottom: '20px',
          flexShrink: 0
        }} 
      />

      {/* Text Info */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', marginBottom: '20px', textAlign: 'center', width: '100%', minWidth: 0 }}>
        <h3 className="text-[16px] font-bold text-white tracking-tight break-words max-w-full" style={{ wordBreak: 'break-word' }}>{name}</h3>
        <p className="text-[13px] font-semibold text-[var(--orange)] max-w-full truncate">{role}</p>
      </div>

      {/* Social Links (LinkedIn Only) */}
      <Link 
        href={linkedinUrl}
        target="_blank"
        className="flex items-center justify-center bg-[rgba(255,255,255,0.05)] hover:bg-[rgba(255,255,255,0.1)] transition-colors mt-auto"
        style={{ width: '36px', height: '36px', borderRadius: '10px', flexShrink: 0 }}
      >
        <svg className="w-[18px] h-[18px] text-gray-300 group-hover:text-white transition-colors" viewBox="0 0 24 24" fill="currentColor">
          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
        </svg>
      </Link>
    </div>
  );
}
