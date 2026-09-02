"use client";

import React, { useState, useEffect, useRef } from "react";
import { saveTechStack } from "../dashboard/actions";

interface TechStackProps {
  initialStack: string[];
  providerAccountId: string | null;
}

export default function TechStack({ initialStack, providerAccountId }: TechStackProps) {
  const [stack, setStack] = useState<string[]>(initialStack);
  const [isSyncing, setIsSyncing] = useState(false);
  const [error, setError] = useState("");
  const hasAutoSynced = useRef(false);

  useEffect(() => {
    // Auto-sync if stack is completely empty on first load
    if (initialStack.length === 0 && providerAccountId && !hasAutoSynced.current) {
      hasAutoSynced.current = true;
      handleSync();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [providerAccountId, initialStack.length]);

  const handleSync = async () => {
    if (!providerAccountId) {
      setError("No GitHub account linked.");
      return;
    }

    setIsSyncing(true);
    setError("");
    
    try {
      // 1. Fetch GitHub user to get the username
      const userRes = await fetch(`https://api.github.com/user/${providerAccountId}`);
      if (!userRes.ok) throw new Error("Failed to fetch GitHub profile.");
      const userData = await userRes.json();
      const githubUsername = userData.login;

      // 2. Fetch public repos
      const reposRes = await fetch(`https://api.github.com/users/${githubUsername}/repos?per_page=100&type=owner`);
      if (!reposRes.ok) throw new Error("Failed to fetch repositories.");
      const repos = await reposRes.json();

      // 3. Calculate Tech Stack
      const languageCounts: Record<string, number> = {};
      for (const repo of repos) {
        if (repo.language) {
          languageCounts[repo.language] = (languageCounts[repo.language] || 0) + 1;
        }
      }

      const topLanguages = Object.entries(languageCounts)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5)
        .map(([lang]) => lang);

      if (topLanguages.length === 0) {
        setError("No languages found.");
        return;
      }

      // 4. Save to database via server action
      const res = await saveTechStack(topLanguages);
      if (res.error) {
        setError(res.error);
      } else {
        setStack(topLanguages);
      }
    } catch (err: any) {
      setError(err.message || "Failed to sync. Please try again.");
    } finally {
      setIsSyncing(false);
    }
  };

  return (
    <div style={{ flex: 1, minWidth: '200px', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '24px', padding: '24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', fontWeight: 600 }}>
          <span style={{ color: 'var(--orange)' }}>⚡</span> Tech Stack
        </div>
        <button 
          onClick={handleSync}
          disabled={isSyncing}
          style={{ background: 'transparent', border: 'none', color: '#9ca3af', fontSize: '12px', cursor: isSyncing ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', gap: '4px', opacity: isSyncing ? 0.5 : 1 }}
          className="hover:text-white transition-colors"
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ animation: isSyncing ? 'spin 1s linear infinite' : 'none' }}>
            <path d="M21.5 2v6h-6M2.13 15.57a10 10 0 1 0 1.49-10.3L2.5 6"></path><path d="M2.5 2v6h6M21.87 8.43a10 10 0 1 0-1.49 10.3L21.5 18"></path>
          </svg>
          {isSyncing ? 'Syncing...' : 'Sync'}
        </button>
      </div>

      {error && <div style={{ color: '#ef4444', fontSize: '12px', marginBottom: '12px' }}>{error}</div>}

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
        {stack.length > 0 ? (
          stack.map((tech: string) => (
            <div key={tech} style={{ background: 'rgba(255,255,255,0.05)', padding: '6px 12px', borderRadius: '12px', fontSize: '12px', fontWeight: 500 }}>
              {tech}
            </div>
          ))
        ) : (
          <div style={{ color: '#9ca3af', fontSize: '13px' }}>No tech stack synced.</div>
        )}
      </div>
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes spin { 100% { transform: rotate(360deg); } }
      `}} />
    </div>
  );
}
