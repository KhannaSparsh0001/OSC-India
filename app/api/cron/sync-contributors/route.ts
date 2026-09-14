import { NextResponse } from "next/server";
import { syncAllProjectsAndContributors, syncGitHubContribution } from "@/lib/actions/github";

export const dynamic = "force-dynamic";
export const maxDuration = 300;

/**
 * 6-Hour Contributor Recalculation Cron Handler
 * Configured in vercel.json with schedule: "0 *\/6 * * *"
 *
 * Runs a comprehensive dual-scan across all 17 official competition repositories
 * and all 618+ registered contributors. Recalculates merged PRs, difficulty points,
 * and repository counts, and commits them live to auth.users.user_metadata and public.profiles.
 */
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    // 1. Verify Vercel Cron Token or query parameter secret
    const authHeader = request.headers.get("authorization");
    const secretParam = searchParams.get("secret");
    const isCronAuthorized =
      !process.env.CRON_SECRET ||
      authHeader === `Bearer ${process.env.CRON_SECRET}` ||
      secretParam === process.env.CRON_SECRET;

    if (!isCronAuthorized) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // 2. Allow single contributor on-demand test via query params (?user_id=...&github=...)
    const targetUserId = searchParams.get("user_id");
    const targetGithub = searchParams.get("github");

    if (targetUserId && targetGithub) {
      const singleRes = await syncGitHubContribution(targetUserId, targetGithub);
      return NextResponse.json({
        success: singleRes.success,
        mode: "single",
        result: singleRes,
      });
    }

    // 3. Run full 6-hour recalculation across all 17 competition repositories and all contributors
    const result = await syncAllProjectsAndContributors();

    return NextResponse.json({
      mode: "6-hour-full-sync",
      interval: "6 hours",
      timestamp: new Date().toISOString(),
      ...result,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Internal Server Error";
    console.error("Contributor 6-Hour Cron Recalculation Error:", err);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
