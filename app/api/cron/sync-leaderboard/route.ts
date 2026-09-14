import { NextResponse } from "next/server";
import { syncGitHubContribution } from "@/lib/actions/github";
import { createAdminClient } from "@/lib/supabase/admin";
import { revalidatePath } from "next/cache";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

/**
 * Fast DB-Only Leaderboard Aggregation Cron Handler
 * Configured in vercel.json to run periodically.
 *
 * Rather than calling the GitHub API repeatedly, this reads verified PRs
 * from public.contributions, aggregates merit scores and project counts,
 * and updates public.profiles and public.leaderboard_stats in bulk chunks.
 * Zero external API rate limit consumption.
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

    // 2. Check for single user on-demand sync (e.g. ?user_id=...&github=...)
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

    // 3. Fast DB-only leaderboard aggregation across contributions & leaderboard_stats
    const admin = createAdminClient();
    const startTime = Date.now();

    const { data: contributions, error: contribError } = await admin
      .from("contributions")
      .select("user_id, project_id, points_awarded")
      .eq("status", "merged");

    if (contribError) {
      throw new Error(`Failed to read contributions: ${contribError.message}`);
    }

    interface UserAggregation {
      score: number;
      merged_prs: number;
      projects: Set<string>;
    }

    const userAggMap = new Map<string, UserAggregation>();
    for (const c of contributions || []) {
      if (!c.user_id) continue;
      if (!userAggMap.has(c.user_id)) {
        userAggMap.set(c.user_id, {
          score: 0,
          merged_prs: 0,
          projects: new Set<string>(),
        });
      }
      const agg = userAggMap.get(c.user_id)!;
      agg.score += Number(c.points_awarded || 0);
      agg.merged_prs += 1;
      if (c.project_id) agg.projects.add(c.project_id);
    }

    const nowIso = new Date().toISOString();
    const profileUpdates: Array<{
      id: string;
      user_id: string;
      score: number;
      merged_prs: number;
      projects_count: number;
    }> = [];

    const leaderboardStats: Array<{
      user_id: string;
      total_points: number;
      current_streak: number;
      updated_at: string;
    }> = [];

    for (const [userId, agg] of userAggMap.entries()) {
      profileUpdates.push({
        id: userId,
        user_id: userId,
        score: agg.score,
        merged_prs: agg.merged_prs,
        projects_count: agg.projects.size,
      });

      leaderboardStats.push({
        user_id: userId,
        total_points: agg.score,
        current_streak: 1,
        updated_at: nowIso,
      });
    }

    // Direct profile updates
    for (const pUp of profileUpdates) {
      await admin
        .from("profiles")
        .update({
          score: pUp.score,
          merged_prs: pUp.merged_prs,
          projects_count: pUp.projects_count,
        })
        .or(`id.eq.${pUp.id},user_id.eq.${pUp.user_id}`);
    }

    for (let i = 0; i < leaderboardStats.length; i += 500) {
      const chunk = leaderboardStats.slice(i, i + 500);
      await admin.from("leaderboard_stats").upsert(chunk, { onConflict: "user_id" });
    }

    revalidatePath("/leaderboard");

    const durationSec = ((Date.now() - startTime) / 1000).toFixed(2);

    return NextResponse.json({
      mode: "fast-db-aggregation",
      timestamp: nowIso,
      contributorsAggregated: userAggMap.size,
      contributionsCount: contributions?.length || 0,
      duration: `${durationSec}s`,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Internal Server Error";
    console.error("Leaderboard Cron Aggregation Error:", err);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
