import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

/**
 * Direct route handler to initiate Google OAuth flow.
 * Redirects to /api/auth/google with the intended return destination.
 */
export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const rawNext = searchParams.get("next") ?? "/dashboard";
  const next = rawNext.startsWith("/") && !rawNext.startsWith("//") ? rawNext : "/dashboard";
  return NextResponse.redirect(`${origin}/api/auth/google?next=${encodeURIComponent(next)}`);
}
