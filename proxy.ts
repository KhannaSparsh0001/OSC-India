import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

interface RateLimitEntry {
  count: number;
  resetAt: number;
}

// In-memory sliding window store for Edge Middleware
const rateLimitMap = new Map<string, RateLimitEntry>();

function checkRateLimit(key: string, maxRequests: number, windowMs: number): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(key);

  // Periodic cleanup if map grows too large
  if (rateLimitMap.size > 5000) {
    for (const [k, v] of rateLimitMap.entries()) {
      if (now > v.resetAt) {
        rateLimitMap.delete(k);
      }
    }
  }

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(key, { count: 1, resetAt: now + windowMs });
    return true;
  }

  if (entry.count >= maxRequests) {
    return false;
  }

  entry.count++;
  return true;
}

export function proxy(request: NextRequest) {
  const forwardedFor = request.headers.get("x-forwarded-for");
  const ip = forwardedFor ? forwardedFor.split(",")[0].trim() : "unknown-ip";
  const path = request.nextUrl.pathname;

  const limits: Array<[string, number, number]> = [
    ["/api/auth/sync", 10, 60_000],
    ["/api/profile/github", 5, 60_000],
    ["/api/profile/tech-stack", 10, 60_000],
    ["/api/github-activity", 15, 60_000],
  ];

  for (const [route, maxRequests, windowMs] of limits) {
    if (path.startsWith(route)) {
      const rateKey = `${ip}:${route}`;
      const allowed = checkRateLimit(rateKey, maxRequests, windowMs);

      if (!allowed) {
        return NextResponse.json(
          { error: "Rate limit exceeded. Please wait before retrying." },
          {
            status: 429,
            headers: {
              "Retry-After": "60",
              "Content-Type": "application/json",
            },
          }
        );
      }
      break;
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/api/auth/sync",
    "/api/profile/:path*",
    "/api/github-activity",
  ],
};
