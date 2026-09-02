"use client";

import React, { useState, useEffect } from "react";
import { fetchFullActivityGraph } from "../dashboard/actions";

interface Contribution {
  date: string;
  count: number;
}

interface ActivityMatrixProps {
  providerAccountId: string | null;
}

export default function ActivityMatrix({ providerAccountId }: ActivityMatrixProps) {
  const [contributions, setContributions] = useState<Contribution[]>([]);
  const [isSyncing, setIsSyncing] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState("");

  // Check localStorage on mount
  useEffect(() => {
    const cached = localStorage.getItem('github_activity');
    if (cached) {
      try {
        setContributions(JSON.parse(cached));
        setIsLoaded(true);
      } catch (e) {
        localStorage.removeItem('github_activity');
      }
    } else {
      // Auto-fetch if nothing is cached
      if (providerAccountId) {
        handleSync();
      } else {
        setIsLoaded(true);
      }
    }
  }, [providerAccountId]);

  const handleSync = async () => {
    if (!providerAccountId) {
      setError("No GitHub account linked.");
      return;
    }
    setIsSyncing(true);
    setError("");

    try {
      // 1. Resolve username
      const userRes = await fetch(`https://api.github.com/user/${providerAccountId}`);
      if (!userRes.ok) throw new Error("Failed to fetch GitHub profile.");
      const userData = await userRes.json();
      const githubUsername = userData.login;

      // 2. Fetch full contribution graph via Native Server Action
      const graphRes = await fetchFullActivityGraph(githubUsername);
      if (graphRes.error || !graphRes.contributions) throw new Error(graphRes.error || "Failed to fetch contribution graph.");

      const parsedEvents = graphRes.contributions;
      
      // 3. Save to localStorage & State
      setContributions(parsedEvents);
      localStorage.setItem('github_activity', JSON.stringify(parsedEvents));
      setIsLoaded(true);
    } catch (err: any) {
      setError(err.message || "Failed to sync.");
    } finally {
      setIsSyncing(false);
    }
  };

  // Generate the last 25 weeks of days (175 days)
  const today = new Date();
  const days = [];
  for (let i = 174; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    days.push(d.toISOString().split("T")[0]);
  }

  // Create a map for quick lookup during render
  const countMap = new Map<string, number>();
  contributions.forEach((c) => {
    countMap.set(c.date, c.count);
  });

  const [hoveredDay, setHoveredDay] = useState<{ date: string; count: number; x: number; y: number } | null>(null);

  const getColor = (count: number) => {
    if (count === 0) return "rgba(255,255,255,0.05)";
    if (count <= 2) return "rgba(255,96,0,0.2)";
    if (count <= 4) return "rgba(255,96,0,0.5)";
    return "var(--orange)";
  };

  const handleMouseEnter = (e: React.MouseEvent, date: string, count: number) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setHoveredDay({
      date,
      count,
      x: rect.left + rect.width / 2,
      y: rect.top
    });
  };

  const handleMouseLeave = () => {
    setHoveredDay(null);
  };

  return (
    <div className="relative">
      
      {/* Header with Sync button */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '16px', position: 'absolute', top: '-42px', right: '0' }}>
        <button 
          onClick={handleSync}
          disabled={isSyncing}
          style={{ background: 'transparent', border: 'none', color: '#9ca3af', fontSize: '12px', cursor: isSyncing ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', gap: '4px', opacity: isSyncing ? 0.5 : 1 }}
          className="hover:text-white transition-colors"
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ animation: isSyncing ? 'spin 1s linear infinite' : 'none' }}>
            <path d="M21.5 2v6h-6M2.13 15.57a10 10 0 1 0 1.49-10.3L2.5 6"></path><path d="M2.5 2v6h6M21.87 8.43a10 10 0 1 0-1.49 10.3L21.5 18"></path>
          </svg>
          {isSyncing ? 'Syncing Activity...' : 'Sync Activity'}
        </button>
      </div>
      
      {error && <div style={{ color: '#ef4444', fontSize: '12px', marginBottom: '16px', textAlign: 'right' }}>{error}</div>}

      <div style={{ display: "flex", gap: "16px", minWidth: "800px", marginTop: "16px" }}>
        {/* Days labels */}
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", fontSize: "11px", color: "#9ca3af", padding: "8px 0", height: "136px" }}>
          <div>Mon</div>
          <div>Wed</div>
          <div>Fri</div>
          <div>Sun</div>
        </div>
        
        {/* Grid */}
        <div style={{ display: "flex", gap: "4px" }} className={(!isLoaded || isSyncing) ? "animate-pulse opacity-50" : "transition-opacity duration-300"}>
          {/* We need to group days into columns of 7 */}
          {Array.from({ length: 25 }).map((_, colIndex) => {
            const colDays = days.slice(colIndex * 7, (colIndex + 1) * 7);
            return (
              <div key={colIndex} style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                {colDays.map((date) => {
                  const count = countMap.get(date) || 0;
                  return (
                    <div
                      key={date}
                      onMouseEnter={(e) => handleMouseEnter(e, date, count)}
                      onMouseLeave={handleMouseLeave}
                      style={{
                        width: "16px",
                        height: "16px",
                        borderRadius: "4px",
                        background: getColor(count),
                        cursor: "pointer",
                        transition: "transform 0.1s"
                      }}
                      className="hover:scale-110"
                    />
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>

      {/* Tooltip */}
      {hoveredDay && isLoaded && !isSyncing && (
        <div
          style={{
            position: "fixed",
            left: hoveredDay.x,
            top: hoveredDay.y - 8,
            transform: "translate(-50%, -100%)",
            background: "#1a1a1c",
            border: "1px solid rgba(255,255,255,0.1)",
            padding: "8px 12px",
            borderRadius: "8px",
            fontSize: "12px",
            fontWeight: 500,
            color: "white",
            pointerEvents: "none",
            zIndex: 100,
            boxShadow: "0 10px 25px rgba(0,0,0,0.5)",
            whiteSpace: "nowrap"
          }}
        >
          <span style={{ color: "var(--orange)", fontWeight: 700 }}>{hoveredDay.count}</span> contributions on {new Date(hoveredDay.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
        </div>
      )}
    </div>
  );
}
