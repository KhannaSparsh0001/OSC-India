"use client";

import React, { useState, useEffect, useRef } from "react";

interface TechStackProps {
  initialStack: string[];
  providerAccountId: string | null;
  isReadOnly?: boolean;
}

export default function TechStack({ initialStack, providerAccountId, isReadOnly = false }: TechStackProps) {
  const [stack, setStack] = useState<string[]>(initialStack);
  const [isSyncing, setIsSyncing] = useState(false);
  const [error, setError] = useState("");
  const hasAutoSynced = useRef(false);

  const handleSync = React.useCallback(async () => {
    if (isReadOnly) return;
    if (!providerAccountId) {
      setError("No GitHub account linked.");
      return;
    }

    setIsSyncing(true);
    setError("");
    
    try {
      const cleanHandle = providerAccountId.replace(/^@/, "").trim();
      let githubUsername = cleanHandle;

      // If handle is a numeric ID, resolve to username
      if (/^\d+$/.test(cleanHandle)) {
        const userRes = await fetch(`https://api.github.com/user/${cleanHandle}`);
        if (userRes.ok) {
          const userData = await userRes.json();
          githubUsername = userData.login;
        }
      }

      // 2. Fetch public repos
      const reposRes = await fetch(`https://api.github.com/users/${githubUsername}/repos?per_page=100&type=owner`);
      if (!reposRes.ok) throw new Error("Failed to fetch repositories.");
      const repos: Array<{ language?: string | null }> = await reposRes.json();

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

      // 4. Save to database via API route
      const saveRes = await fetch("/api/profile/tech-stack", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ languages: topLanguages }),
      });
      const resData = await saveRes.json().catch(() => ({}));
      if (!saveRes.ok || resData.error) {
        console.warn("Tech stack save notice:", resData?.error);
      }
      setStack(topLanguages);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to sync. Please try again.");
    } finally {
      setIsSyncing(false);
    }
  }, [providerAccountId, isReadOnly]);

  useEffect(() => {
    // Auto-sync if stack is completely empty on first load (only for profile owner)
    if (!isReadOnly && initialStack.length === 0 && providerAccountId && !hasAutoSynced.current) {
      hasAutoSynced.current = true;
      handleSync();
    }
  }, [providerAccountId, initialStack.length, handleSync, isReadOnly]);

  return (
    <div style={{ flex: 1, minWidth: '200px', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '24px', padding: '24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', fontWeight: 600 }}>
          <span style={{ color: 'var(--orange)' }}></span> Tech Stack
        </div>
        {!isReadOnly && (
          <button 
            onClick={handleSync}
            disabled={isSyncing}
            style={{ background: 'transparent', border: 'none', color: '#9ca3af', fontSize: '12px', cursor: isSyncing ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', gap: '5px', opacity: isSyncing ? 0.6 : 1 }}
            className="hover:text-white transition-colors"
            title="Sync Tech Stack"
          >
          <svg
            width="13"
            height="13"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{
              animation: isSyncing ? 'spin 1s linear infinite' : 'none',
              transformOrigin: 'center',
              display: 'block',
            }}
          >
            <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
            <path d="M21 3v5h-5" />
            <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
            <path d="M8 16H3v5" />
          </svg>
          <span>{isSyncing ? 'Syncing...' : 'Sync'}</span>
        </button>
        )}
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
    </div>
  );
}
