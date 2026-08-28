import React from 'react';
import Link from 'next/link';

interface BlogCardProps {
  id: string;
  title: string;
  description: string;
  category: string;
  date: string;
  readTime: string;
  coverCode: string;
}

export default function BlogCard({ id, title, description, category, date, readTime, coverCode }: BlogCardProps) {
  return (
    <div 
      className="group w-full rounded-[24px] border border-[rgba(255,255,255,0.05)] shadow-lg hover:border-[var(--orange)] transition-colors duration-300"
      style={{ background: 'rgba(255,255,255,0.02)', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}
    >
      {/* Cover Image Placeholder */}
      <div 
        style={{ 
          width: '100%', 
          height: '200px', 
          background: 'var(--orange)', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center' 
        }}
      >
        <span style={{ fontSize: '48px', fontWeight: 900, color: '#121214', letterSpacing: '-0.02em' }}>
          {coverCode}
        </span>
      </div>

      {/* Content Section */}
      <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', flex: 1 }}>
        
        {/* Category Pill */}
        <div style={{ marginBottom: '16px' }}>
          <span style={{ background: 'rgba(255,255,255,0.05)', color: '#9ca3af', padding: '4px 12px', borderRadius: '16px', fontSize: '11px', fontWeight: 600 }}>
            {category}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-white group-hover:text-[var(--orange)] transition-colors" style={{ fontSize: '20px', fontWeight: 800, marginBottom: '12px', lineHeight: '1.4' }}>
          {title}
        </h3>

        {/* Description */}
        <p style={{ color: '#9ca3af', fontSize: '14px', lineHeight: '1.6', marginBottom: '24px', flex: 1 }}>
          {description}
        </p>

        {/* Footer info (Date / Read time) */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', color: '#6b7280', fontSize: '12px', fontWeight: 500, marginBottom: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
            {date}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
            {readTime}
          </div>
        </div>

        {/* Read More Link */}
        <Link 
          href={`/blog/${id}`}
          style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'var(--orange)', fontSize: '13px', fontWeight: 700, textDecoration: 'none' }}
        >
          Read More
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"></path><path d="M12 5l7 7-7 7"></path></svg>
        </Link>
      </div>

    </div>
  );
}
