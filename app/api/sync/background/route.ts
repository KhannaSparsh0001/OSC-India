import { NextResponse } from "next/server";
import { syncGitHubContribution } from "@/lib/actions/github";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

/**
 * Decoupled background sync worker for individual contributor synchronization.
 * Invoked asynchronously during user login without blocking the login HTTP response,
 * protecting against GitHub API rate limits and preventing request timeouts at scale.
 */
export async function POST(request: Request) {
  try {
    const secret = request.headers.get("x-sync-secret");
    const cronSecret = process.env.CRON_SECRET;
    if (cronSecret && secret !== cronSecret) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { userId, github } = body || {};

    if (!userId || !github) {
      return NextResponse.json({ error: "Missing userId or github parameter" }, { status: 400 });
    }

    const result = await syncGitHubContribution(userId, github);
    return NextResponse.json({ success: true, result });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Background sync failed";
    console.error("Background sync error:", err);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
