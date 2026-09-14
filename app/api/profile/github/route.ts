import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { syncGitHubContribution } from "@/lib/actions/github";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const github = body.github?.replace(/^@/, "").trim();

    if (!github) {
      return NextResponse.json({ error: "GitHub username is required" }, { status: 400 });
    }

    const admin = createAdminClient();

    // 1. Check for existing profile by user_id
    const { data: existingProfile } = await admin
      .from("profiles")
      .select("id, user_id, github, avatar_url")
      .eq("user_id", user.id)
      .maybeSingle();

    const githubAvatar = `https://avatars.githubusercontent.com/${github}`;
    if (existingProfile) {
      const updates: Record<string, unknown> = { github, updated_at: new Date().toISOString() };
      if (!existingProfile.avatar_url) {
        updates.avatar_url =
          user.user_metadata?.avatar_url ||
          user.user_metadata?.picture ||
          githubAvatar;
      }
      await admin
        .from("profiles")
        .update(updates)
        .eq("user_id", user.id);
    } else {
      await admin.from("profiles").upsert(
        {
          user_id: user.id,
          github,
          full_name: user.user_metadata?.full_name || user.user_metadata?.name || "Contributor",
          avatar_url: user.user_metadata?.avatar_url || user.user_metadata?.picture || githubAvatar,
          role: "contributor",
          score: 0,
          merged_prs: 0,
          projects_count: 0,
          badges_created: 0,
          tech_stack: [],
          updated_at: new Date().toISOString(),
        },
        { onConflict: "user_id" }
      );
    }

    // 3. Sync auth metadata
    try {
      await admin.auth.admin.updateUserById(user.id, {
        user_metadata: {
          ...user.user_metadata,
          github,
        },
      });
    } catch {
      // non-blocking
    }

    // 4. Trigger instant contribution sync for this user's PRs on the official 17 repos
    try {
      await syncGitHubContribution(user.id, github);
    } catch (sErr: unknown) {
      const msg = sErr instanceof Error ? sErr.message : "Unknown sync error";
      console.warn("Notice: instant github sync on link:", msg);
    }

    return NextResponse.json({ success: true, github });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to link GitHub";
    console.error("Link GitHub API error:", err);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
