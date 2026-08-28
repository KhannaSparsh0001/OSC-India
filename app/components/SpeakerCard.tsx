import React from 'react';
import Link from 'next/link';

interface SpeakerCardProps {
  name: string;
  role: string;
  company: string;
  linkedinUrl?: string;
  twitterUrl?: string;
  imageUrl?: string;
}

export default function SpeakerCard({ name, role, company, linkedinUrl = "#", twitterUrl = "#", imageUrl }: SpeakerCardProps) {
  return (
    <div 
      className="group w-full rounded-[24px] border border-[rgba(255,255,255,0.05)] shadow-lg hover:border-[var(--orange)] transition-colors duration-300"
      style={{ background: 'rgba(255,255,255,0.02)', padding: '32px 24px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
    >
      {/* Avatar Container with Border */}
      <div 
        style={{ 
          width: '120px', 
          height: '120px', 
          borderRadius: '50%',
          border: '3px solid var(--orange)',
          padding: '4px', // Space between border and image
          marginBottom: '24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <div style={{ width: '100%', height: '100%', borderRadius: '50%', background: '#1c1c1f', overflow: 'hidden' }}>
            {imageUrl ? (
                <img src={imageUrl} alt={name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            ) : (
                <div style={{ width: '100%', height: '100%', background: '#252529' }} /> // Placeholder
            )}
        </div>
      </div>

      {/* Text Info */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px', marginBottom: '24px', textAlign: 'center' }}>
        <h3 className="text-[18px] font-bold text-white tracking-tight">{name}</h3>
        <p className="text-[13px] font-semibold text-[var(--orange)] leading-tight">{role}</p>
        <p className="text-[12px] text-gray-400 leading-snug" style={{ maxWidth: '200px' }}>{company}</p>
      </div>

      {/* Social Links */}
      <div style={{ display: 'flex', gap: '12px' }}>
        <Link 
          href={linkedinUrl}
          target="_blank"
          className="flex items-center justify-center text-gray-400 hover:text-white transition-colors"
          style={{ width: '24px', height: '24px' }}
        >
          <svg className="w-[18px] h-[18px]" viewBox="0 0 24 24" fill="currentColor">
            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
          </svg>
        </Link>
        <Link 
          href={twitterUrl}
          target="_blank"
          className="flex items-center justify-center text-gray-400 hover:text-white transition-colors"
          style={{ width: '24px', height: '24px' }}
        >
          <svg className="w-[18px] h-[18px]" viewBox="0 0 24 24" fill="currentColor">
            <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
          </svg>
        </Link>
      </div>
    </div>
  );
}
