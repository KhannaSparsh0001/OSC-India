import { createAdminClient } from "@/lib/supabase/admin";
import type { User } from "@supabase/supabase-js";
import { syncGitHubContribution } from "@/lib/actions/github";
import type { Profile } from "@/lib/supabase/database";

function getAppBaseUrl(): string {
  if (process.env.NEXT_PUBLIC_APP_URL) {
    return process.env.NEXT_PUBLIC_APP_URL.replace(/\/+$/, "");
  }
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }
  return "http://localhost:3000";
}

/**
 * Synchronizes and provisions user profile in public.users and public.profiles.
 * Handles deduplication across GitHub and Google logins by matching emails,
 * ensuring that existing GitHub links are preserved when signing in via Google.
 */
export async function syncUserProfile(user: User) {
  const admin = createAdminClient();
  const userEmail = (user.email || user.user_metadata?.email || "").trim().toLowerCase();
  const incomingGithub =
    user.user_metadata?.user_name ||
    user.user_metadata?.preferred_username ||
    user.user_metadata?.github ||
    null;
  const fullName =
    user.user_metadata?.full_name ||
    user.user_metadata?.name ||
    (user.user_metadata?.given_name
      ? `${user.user_metadata.given_name} ${user.user_metadata?.family_name || ""}`.trim()
      : null) ||
    userEmail?.split("@")[0] ||
    "Contributor";
  const avatarUrl =
    user.user_metadata?.avatar_url ||
    user.user_metadata?.picture ||
    null;

  // 1. Always ensure public.users record exists
  try {
    await admin.from("users").upsert(
      {
        id: user.id,
        name: fullName,
        email: userEmail || null,
        image: avatarUrl,
        created_at: user.created_at || new Date().toISOString(),
      },
      { onConflict: "id" }
    );
  } catch (uErr: unknown) {
    console.warn("Notice: public.users provisioning warning:", uErr instanceof Error ? uErr.message : "Unknown error");
  }

  // 2. Search existing profile by user_id first
  let existingProfile: Profile | null = null;
  const { data: byUserId } = await admin
    .from("profiles")
    .select("*")
    .eq("user_id", user.id)
    .maybeSingle();

  if (byUserId) {
    existingProfile = byUserId as Profile;
  }

  // 2.5 Fallback: search by id (PK) if user_id not populated
  if (!existingProfile) {
    const { data: byId } = await admin
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .maybeSingle();
    if (byId) {
      existingProfile = byId as Profile;
    }
  }

  // 3. Fallback: search by GitHub handle if still not found
  if (!existingProfile && incomingGithub) {
    const cleanGh = incomingGithub.replace(/^@+/, "").trim().toLowerCase();
    const { data: byGithub } = await admin
      .from("profiles")
      .select("*")
      .ilike("github", cleanGh)
      .maybeSingle();
    if (byGithub) existingProfile = byGithub as Profile;
  }

  const mergedGithub = incomingGithub ? incomingGithub.replace(/^@+/, "").trim().toLowerCase() : existingProfile?.github || null;
  const mergedAvatar = avatarUrl || existingProfile?.avatar_url || null;
  const mergedFullName = existingProfile?.full_name || fullName;

  const profileRow: Partial<Profile> = {
    id: user.id,
    user_id: user.id,
    full_name: mergedFullName,
    avatar_url: mergedAvatar,
    github: mergedGithub,
    role: existingProfile?.role || "contributor",
    score: existingProfile?.score ?? 0,
    merged_prs: existingProfile?.merged_prs ?? 0,
    projects_count: existingProfile?.projects_count ?? 0,
    badges_created: existingProfile?.badges_created ?? 0,
  };

  try {
    await admin.from("profiles").upsert(profileRow, { onConflict: "user_id" });
  } catch (pErr: unknown) {
    console.warn("Notice: public.profiles upsert warning:", pErr instanceof Error ? pErr.message : "Unknown error");
  }

  // Also synchronize auth metadata so auth.users reflects the unified profile
  try {
    await admin.auth.admin.updateUserById(user.id, {
      user_metadata: {
        ...user.user_metadata,
        github: mergedGithub,
        full_name: mergedFullName,
        avatar_url: mergedAvatar,
      },
    });
  } catch {
    // Non-blocking
  }

  // Decoupled, non-blocking GitHub contribution sync on login (with 30m cooldown)
  // Ensures login returns instantly and prevents thundering herd API rate limits under 10k users
  if (mergedGithub) {
    const thirtyMinAgo = new Date(Date.now() - 30 * 60 * 1000).toISOString();
    const isFresh = existingProfile?.updated_at && existingProfile.updated_at > thirtyMinAgo;

    if (!isFresh) {
      const baseUrl = getAppBaseUrl();
      fetch(`${baseUrl}/api/sync/background`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-sync-secret": process.env.CRON_SECRET || "",
        },
        body: JSON.stringify({ userId: user.id, github: mergedGithub }),
      }).catch(() => {
        // Fallback: in-process non-blocking attempt if network call is unavailable
        void syncGitHubContribution(user.id, mergedGithub).catch(() => {});
      });
    }
  }

  return { ...existingProfile, ...profileRow, email: userEmail };
}
