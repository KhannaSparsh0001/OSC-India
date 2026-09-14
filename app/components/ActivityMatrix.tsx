"use client";

import React, { useState, useEffect, useMemo } from "react";

interface Contribution {
  date: string;
  count: number;
}

interface ActivityMatrixProps {
  providerAccountId: string | null;
  isReadOnly?: boolean;
}

interface CachedPayload {
  timestamp: number;
  contributions: Contribution[];
}

const CACHE_TTL_MS = 60 * 60 * 1000; // 1 hour client cache TTL

// Helper to format local date as YYYY-MM-DD without UTC timezone shift
function formatLocalDate(d: Date): string {
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export default function ActivityMatrix({ providerAccountId, isReadOnly = false }: ActivityMatrixProps) {
  const [contributions, setContributions] = useState<Contribution[]>(() => {
    if (typeof window === "undefined" || !providerAccountId) return [];
    try {
      const cacheKey = `github_activity_${providerAccountId}`;
      const cachedStr = localStorage.getItem(cacheKey);
      if (cachedStr) {
        const parsed = JSON.parse(cachedStr);
        return Array.isArray(parsed) ? parsed : parsed?.contributions || [];
      }
    } catch {
      // ignore
    }
    return [];
  });
  const [isSyncing, setIsSyncing] = useState(false);
  const [error, setError] = useState("");
  const [customHandle, setCustomHandle] = useState("");
  const [isLinking, setIsLinking] = useState(false);

  const handleSync = React.useCallback(async (overrideHandle?: string, showSpinner = true) => {
    const targetHandle = (overrideHandle || customHandle || providerAccountId || "")
      .replace(/^@/, "")
      .trim();

    if (!targetHandle) {
      setError("No GitHub account linked. Enter your GitHub username above.");
      return;
    }

    if (showSpinner) setIsSyncing(true);
    setError("");

    try {
      let githubUsername = targetHandle;

      // If handle is numeric ID, resolve to login username
      if (/^\d+$/.test(targetHandle)) {
        const userRes = await fetch(`https://api.github.com/user/${targetHandle}`);
        if (userRes.ok) {
          const userData = await userRes.json();
          githubUsername = userData.login;
        }
      }

      // Fetch full 52-week contribution graph from API Route
      const res = await fetch(`/api/github-activity?username=${encodeURIComponent(githubUsername)}`);
      const graphRes = await res.json();
      if (!res.ok || graphRes.error || !graphRes.contributions) {
        throw new Error(graphRes.error || "Failed to fetch contribution graph.");
      }

      const parsedEvents: Contribution[] = graphRes.contributions;

      // Save to localStorage with fresh timestamp & update state
      setContributions(parsedEvents);
      const payload: CachedPayload = {
        timestamp: Date.now(),
        contributions: parsedEvents,
      };
      localStorage.setItem(`github_activity_${githubUsername}`, JSON.stringify(payload));
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to sync.");
    } finally {
      setIsSyncing(false);
    }
  }, [customHandle, providerAccountId]);

  // Auto-fetch or read cache when providerAccountId is available
  useEffect(() => {
    if (!providerAccountId) return;

    const cacheKey = `github_activity_${providerAccountId}`;
    let hasValidCache = false;

    try {
      const cachedStr = localStorage.getItem(cacheKey);
      if (cachedStr) {
        const parsed = JSON.parse(cachedStr);
        const data: Contribution[] = Array.isArray(parsed)
          ? parsed
          : parsed?.contributions || [];
        const timestamp = Array.isArray(parsed) ? 0 : parsed?.timestamp || 0;

        if (data.length > 0) {
          hasValidCache = true;
          // If cache is fresh (less than 1 hour old), do not refetch immediately
          if (Date.now() - timestamp < CACHE_TTL_MS) {
            return;
          }
        }
      }
    } catch {
      try {
        localStorage.removeItem(cacheKey);
      } catch {
        // ignore
      }
    }

    // Revalidate in background or fetch if no cache (deferred to avoid synchronous setState in effect body)
    let isCancelled = false;
    const timer = setTimeout(() => {
      if (!isCancelled) {
        handleSync(providerAccountId, !hasValidCache);
      }
    }, 0);

    return () => {
      isCancelled = true;
      clearTimeout(timer);
    };
  }, [providerAccountId, handleSync]);

  const handleLinkAndSync = async (e: React.FormEvent) => {
    e.preventDefault();
    const handle = customHandle.replace(/^@/, "").trim();
    if (!handle) return;

    setIsLinking(true);
    setError("");

    try {
      const res = await fetch("/api/profile/github", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ github: handle }),
      });
      const data = await res.json();
      if (!res.ok || data.error) {
        throw new Error(data.error || "Failed to link GitHub handle");
      }
      await handleSync(handle, true);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to link GitHub handle");
    } finally {
      setIsLinking(false);
    }
  };

  // Map for quick date -> count lookup
  const countMap = useMemo(() => {
    const map = new Map<string, number>();
    contributions.forEach((c) => {
      map.set(c.date, c.count);
    });
    return map;
  }, [contributions]);

  // Total contributions count in the past year
  const totalContributions = useMemo(() => {
    return contributions.reduce((acc, c) => acc + (c.count || 0), 0);
  }, [contributions]);

  // Calendar Grid Calculation: Exactly 52 weeks aligned to Monday..Sunday
  const { weeks, monthHeaders } = useMemo(() => {
    const today = new Date();
    // Normalize to midnight
    today.setHours(23, 59, 59, 999);

    // Monday as day 0 (0 = Mon, ..., 6 = Sun)
    const currentDayOfWeek = (today.getDay() + 6) % 7;
    const currentMonday = new Date(today);
    currentMonday.setDate(today.getDate() - currentDayOfWeek);
    currentMonday.setHours(0, 0, 0, 0);

    // 52 weeks ago from current Monday
    const startMonday = new Date(currentMonday);
    startMonday.setDate(currentMonday.getDate() - 51 * 7);

    const generatedWeeks: Array<
      Array<{
        date: string;
        displayDate: string;
        count: number;
        isFuture: boolean;
      }>
    > = [];

    const headers: Array<{ weekIndex: number; label: string }> = [];
    let lastMonth = -1;

    for (let w = 0; w < 52; w++) {
      const weekDays: Array<{
        date: string;
        displayDate: string;
        count: number;
        isFuture: boolean;
      }> = [];

      const weekStartDate = new Date(startMonday);
      weekStartDate.setDate(startMonday.getDate() + w * 7);

      // Check month header label
      const monthIndex = weekStartDate.getMonth();
      if (monthIndex !== lastMonth) {
        // Only label if at least 2 weeks passed to prevent overlapping text
        const lastHeader = headers[headers.length - 1];
        if (!lastHeader || w - lastHeader.weekIndex >= 3) {
          headers.push({
            weekIndex: w,
            label: weekStartDate.toLocaleString("en-US", { month: "short" }),
          });
          lastMonth = monthIndex;
        }
      }

      for (let d = 0; d < 7; d++) {
        const dayDate = new Date(weekStartDate);
        dayDate.setDate(weekStartDate.getDate() + d);

        const isFuture = dayDate > today;
        const dateStr = formatLocalDate(dayDate);
        const displayDate = dayDate.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        });

        weekDays.push({
          date: dateStr,
          displayDate,
          count: countMap.get(dateStr) || 0,
          isFuture,
        });
      }

      generatedWeeks.push(weekDays);
    }

    return { weeks: generatedWeeks, monthHeaders: headers };
  }, [countMap]);

  const [hoveredDay, setHoveredDay] = useState<{
    date: string;
    count: number;
    x: number;
    y: number;
  } | null>(null);

  // GitHub 4-level color tiers matching dark mode theme
  const getColor = (count: number, isFuture?: boolean) => {
    if (isFuture) return "transparent";
    if (count === 0) return "rgba(255,255,255,0.04)";
    if (count <= 2) return "rgba(255,117,24,0.3)";
    if (count <= 5) return "rgba(255,117,24,0.6)";
    if (count <= 9) return "rgba(255,117,24,0.85)";
    return "var(--orange)";
  };

  const handleMouseEnter = (
    e: React.MouseEvent,
    displayDate: string,
    count: number,
    isFuture?: boolean
  ) => {
    if (isFuture) return;
    const rect = e.currentTarget.getBoundingClientRect();
    setHoveredDay({
      date: displayDate,
      count,
      x: rect.left + rect.width / 2,
      y: rect.top,
    });
  };

  const handleMouseLeave = () => {
    setHoveredDay(null);
  };

  return (
    <div className="relative w-full">
      {/* Top Controls & Metrics */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "16px",
          flexWrap: "wrap",
          gap: "12px",
        }}
      >
        <div style={{ fontSize: "13px", color: "#9ca3af", fontWeight: 500 }}>
          {totalContributions > 0 ? (
            <span>
              <strong style={{ color: "white", fontWeight: 700 }}>
                {totalContributions.toLocaleString()}
              </strong>{" "}
              contributions in the last year
            </span>
          ) : (
            <span>GitHub Contribution Calendar</span>
          )}
        </div>

        {!isReadOnly && (
          <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap" }}>
            {/* Direct GitHub username input for instant graph loading */}
            {(!providerAccountId || !contributions.length) && (
              <form
                onSubmit={handleLinkAndSync}
                style={{ display: "flex", alignItems: "center", gap: "6px" }}
              >
                <input
                  type="text"
                  placeholder="GitHub username"
                  value={customHandle}
                  onChange={(e) => setCustomHandle(e.target.value)}
                  style={{
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.15)",
                    borderRadius: "6px",
                    padding: "4px 8px",
                    fontSize: "12px",
                    color: "white",
                    outline: "none",
                    width: "140px",
                  }}
                />
                <button
                  type="submit"
                  disabled={isLinking || !customHandle.trim()}
                  style={{
                    background: "var(--orange)",
                    border: "none",
                    borderRadius: "6px",
                    padding: "4px 10px",
                    fontSize: "12px",
                    fontWeight: 600,
                    color: "white",
                    cursor: isLinking ? "not-allowed" : "pointer",
                    opacity: isLinking || !customHandle.trim() ? 0.6 : 1,
                  }}
                >
                  {isLinking ? "Linking..." : "Link"}
                </button>
              </form>
            )}

            <button
              type="button"
              onClick={() => handleSync(undefined, true)}
              disabled={isSyncing}
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: "8px",
                padding: "6px 12px",
                color: "#9ca3af",
                fontSize: "12px",
                cursor: isSyncing ? "not-allowed" : "pointer",
                display: "flex",
                alignItems: "center",
                gap: "6px",
                opacity: isSyncing ? 0.5 : 1,
                transition: "all 0.2s ease",
              }}
              className="hover:text-white hover:border-[rgba(255,255,255,0.2)]"
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
                  animation: isSyncing ? "spin 1s linear infinite" : "none",
                  transformOrigin: "center",
                  display: "block",
                }}
              >
                <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
                <path d="M21 3v5h-5" />
                <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
                <path d="M8 16H3v5" />
              </svg>
              <span>{isSyncing ? "Syncing Activity..." : "Sync Activity"}</span>
            </button>
          </div>
        )}
      </div>

      {error && (
        <div
          style={{
            color: "#ef4444",
            fontSize: "12px",
            marginBottom: "16px",
            background: "rgba(239,68,68,0.1)",
            padding: "8px 12px",
            borderRadius: "8px",
            border: "1px solid rgba(239,68,68,0.2)",
          }}
        >
          {error}
        </div>
      )}

      {/* Contribution Calendar Graph */}
      <div style={{ overflowX: "auto", paddingBottom: "8px" }}>
        <div style={{ minWidth: "820px" }}>
          {/* Month Labels Header */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "32px repeat(52, 1fr)",
              gap: "3px",
              fontSize: "11px",
              color: "#9ca3af",
              marginBottom: "6px",
              paddingLeft: "4px",
            }}
          >
            <div /> {/* Spacer matching day label column */}
            {Array.from({ length: 52 }).map((_, wIndex) => {
              const header = monthHeaders.find((h) => h.weekIndex === wIndex);
              return (
                <div
                  key={wIndex}
                  style={{
                    overflow: "visible",
                    whiteSpace: "nowrap",
                    fontSize: "10px",
                    fontWeight: 500,
                  }}
                >
                  {header ? header.label : ""}
                </div>
              );
            })}
          </div>

          {/* Main Matrix: Day Labels on left, 52 Week Columns */}
          <div style={{ display: "flex", gap: "8px", alignItems: "flex-start" }}>
            {/* Day of Week Labels (Row 0=Mon, Row 2=Wed, Row 4=Fri, Row 6=Sun) */}
            <div
              style={{
                display: "grid",
                gridTemplateRows: "repeat(7, 13px)",
                gap: "3px",
                fontSize: "10px",
                color: "#6b7280",
                width: "28px",
                textAlign: "left",
                userSelect: "none",
                lineHeight: "13px",
              }}
            >
              <div>Mon</div>
              <div />
              <div>Wed</div>
              <div />
              <div>Fri</div>
              <div />
              <div>Sun</div>
            </div>

            {/* 52 Week Columns (7 days per column) */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(52, 1fr)",
                gap: "3px",
                flex: 1,
              }}
            >
              {weeks.map((week, wIndex) => (
                <div
                  key={wIndex}
                  style={{
                    display: "grid",
                    gridTemplateRows: "repeat(7, 13px)",
                    gap: "3px",
                  }}
                >
                  {week.map((day, dIndex) => (
                    <div
                      key={dIndex}
                      onMouseEnter={(e) =>
                        handleMouseEnter(e, day.displayDate, day.count, day.isFuture)
                      }
                      onMouseLeave={handleMouseLeave}
                      style={{
                        width: "100%",
                        height: "13px",
                        borderRadius: "2.5px",
                        background: getColor(day.count, day.isFuture),
                        border:
                          day.count === 0 && !day.isFuture
                            ? "1px solid rgba(255,255,255,0.03)"
                            : "none",
                        cursor: day.isFuture ? "default" : "pointer",
                        transition: "transform 0.1s ease, filter 0.1s ease",
                        visibility: day.isFuture ? "hidden" : "visible",
                      }}
                      className={!day.isFuture ? "hover:scale-125 hover:brightness-125" : ""}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Floating Tooltip */}
      {hoveredDay && (
        <div
          style={{
            position: "fixed",
            left: `${hoveredDay.x}px`,
            top: `${hoveredDay.y - 42}px`,
            transform: "translateX(-50%)",
            background: "#1c1c1f",
            border: "1px solid rgba(255,255,255,0.12)",
            padding: "6px 12px",
            borderRadius: "6px",
            fontSize: "11px",
            color: "white",
            pointerEvents: "none",
            zIndex: 100,
            boxShadow: "0 8px 24px rgba(0,0,0,0.6)",
            whiteSpace: "nowrap",
          }}
        >
          <span style={{ fontWeight: 700, color: "var(--orange)" }}>
            {hoveredDay.count} contribution{hoveredDay.count !== 1 ? "s" : ""}
          </span>{" "}
          on {hoveredDay.date}
        </div>
      )}

      {/* Legend Footer */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: "16px",
          paddingTop: "14px",
          borderTop: "1px solid rgba(255,255,255,0.05)",
          fontSize: "11px",
          color: "#9ca3af",
          flexWrap: "wrap",
          gap: "8px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          <span>Learn how we count contributions</span>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          <span>Less</span>
          <div
            style={{
              width: "11px",
              height: "11px",
              borderRadius: "2px",
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.03)",
            }}
          />
          <div
            style={{
              width: "11px",
              height: "11px",
              borderRadius: "2px",
              background: "rgba(255,117,24,0.3)",
            }}
          />
          <div
            style={{
              width: "11px",
              height: "11px",
              borderRadius: "2px",
              background: "rgba(255,117,24,0.6)",
            }}
          />
          <div
            style={{
              width: "11px",
              height: "11px",
              borderRadius: "2px",
              background: "rgba(255,117,24,0.85)",
            }}
          />
          <div
            style={{
              width: "11px",
              height: "11px",
              borderRadius: "2px",
              background: "var(--orange)",
            }}
          />
          <span>More</span>
        </div>
      </div>
    </div>
  );
}
