"use client";

import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import BlogCard from "../components/BlogCard";

export default function BlogPage() {
  const categories = ["All", "Best Practices", "Tutorial", "Insights", "Security", "Development", "Community"];
  
  const posts = [
    {
      id: "best-practices",
      coverCode: "BP",
      title: "10 Best Practices for Contributing to Open Source",
      description: "Learn how to make meaningful contributions to open source projects and become a valued community member.",
      date: "February 20, 2026",
      readTime: "8 min read",
      category: "Best Practices"
    },
    {
      id: "scalable-apis",
      coverCode: "API",
      title: "Building Scalable APIs with Modern Frameworks",
      description: "A comprehensive guide to designing and implementing scalable API architectures that can handle millions of requests.",
      date: "February 18, 2026",
      readTime: "12 min read",
      category: "Tutorial"
    },
    {
      id: "cloud-native",
      coverCode: "CN",
      title: "The Future of Cloud Native Development",
      description: "Exploring emerging trends and technologies shaping the next generation of cloud-native applications.",
      date: "February 15, 2026",
      readTime: "10 min read",
      category: "Insights"
    },
    {
      id: "securing-projects",
      coverCode: "SEC",
      title: "Securing Your Open Source Projects",
      description: "Essential security practices every open source maintainer should implement to protect their projects.",
      date: "February 12, 2026",
      readTime: "6 min read",
      category: "Security"
    },
    {
      id: "code-review",
      coverCode: "CR",
      title: "Effective Code Review Strategies",
      description: "Transform your code review process with proven strategies that improve code quality and team collaboration.",
      date: "February 10, 2026",
      readTime: "7 min read",
      category: "Development"
    },
    {
      id: "building-community",
      coverCode: "COM",
      title: "Building Community Around Your Project",
      description: "Practical tips for growing and nurturing a thriving community around your open source project.",
      date: "February 8, 2026",
      readTime: "9 min read",
      category: "Community"
    }
  ];

  return (
    <div className="min-h-screen bg-[var(--bg)] flex flex-col font-sans text-white">
      <Navbar />
      <div style={{ height: '96px', width: '100%', flexShrink: 0 }} aria-hidden="true" />
      
      <main className="flex-grow flex flex-col items-center px-6" style={{ margin: '0 auto', maxWidth: '1200px', width: '100%', paddingBottom: '96px', paddingTop: '24px' }}>
        
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <h1 style={{ fontSize: '48px', fontWeight: 800, marginBottom: '16px', letterSpacing: '-0.02em' }}>
            Latest <span style={{ color: 'var(--orange)' }}>Insights</span>
          </h1>
          <p style={{ color: '#9ca3af', fontSize: '15px' }}>
            Stories, tutorials, and insights from the open source community
          </p>
        </div>

        {/* Filters */}
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '64px' }}>
          {categories.map((cat, idx) => (
            <button 
              key={cat}
              style={{
                background: idx === 0 ? 'var(--orange)' : 'rgba(255,255,255,0.05)',
                color: idx === 0 ? 'white' : '#9ca3af',
                border: 'none',
                borderRadius: '24px',
                padding: '8px 20px',
                fontSize: '13px',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
              className={idx !== 0 ? "hover:bg-[rgba(255,255,255,0.1)] hover:text-white" : ""}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Blog Grid */}
        <div 
          style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', 
            gap: '32px', 
            width: '100%',
            marginBottom: '64px'
          }}
        >
          {posts.map((post) => (
            <BlogCard 
              key={post.id}
              id={post.id}
              coverCode={post.coverCode}
              title={post.title}
              description={post.description}
              category={post.category}
              date={post.date}
              readTime={post.readTime}
            />
          ))}
        </div>

        {/* Load More Button */}
        <button 
          style={{ 
            background: 'rgba(255,255,255,0.05)', 
            color: 'white', 
            padding: '12px 32px', 
            borderRadius: '8px', 
            fontSize: '14px', 
            fontWeight: 600, 
            border: '1px solid rgba(255,255,255,0.1)', 
            cursor: 'pointer',
            transition: 'all 0.2s'
          }}
          className="hover:bg-[rgba(255,255,255,0.1)] hover:border-white"
        >
          Load More Articles
        </button>

      </main>

      <Footer />
    </div>
  );
}
