import React, { Suspense } from "react";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { syncUserProfile } from "@/lib/auth/syncProfile";
import { redirect } from "next/navigation";
import BadgeClient from "./BadgeClient";

export const dynamic = "force-dynamic";

interface BadgeProfile {
  id: string;
  user_id: string;
  full_name: string | null;
  avatar_url: string | null;
  role: string | null;
  badges_created: number | null;
  github: string | null;
}

interface IdentityWithData {
  identity_data?: {
    avatar_url?: string;
    picture?: string;
  };
}

export default async function BadgePage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/sign-in");
  }

  const admin = createAdminClient();
  let profile: BadgeProfile | null = null;
  const userEmail = (user.email || user.user_metadata?.email || "").trim().toLowerCase();
  const metaGithub =
    user.user_metadata?.user_name ||
    user.user_metadata?.preferred_username ||
    user.user_metadata?.github ||
    null;

  try {
    // 1. Search by user_id
    const { data: byUserId } = await admin
      .from("profiles")
      .select("id, user_id, full_name, avatar_url, role, badges_created, github")
      .eq("user_id", user.id)
      .maybeSingle();

    profile = byUserId as BadgeProfile | null;

    // 2. Search by GitHub handle if not found
    if (!profile && metaGithub) {
      const { data: byGithub } = await admin
        .from("profiles")
        .select("id, user_id, full_name, avatar_url, role, badges_created, github")
        .ilike("github", metaGithub)
        .maybeSingle();
      if (byGithub) profile = byGithub as BadgeProfile;
    }

    // 3. Search by email if not found
    if (!profile && userEmail) {
      const { data: byEmail } = await admin
        .from("profiles")
        .select("id, user_id, full_name, avatar_url, role, badges_created, github")
        .ilike("email", userEmail)
        .maybeSingle();
      if (byEmail) profile = byEmail as BadgeProfile;
    }

    // 4. If profile not found, auto-sync using syncUserProfile
    if (!profile) {
      try {
        const synced = await syncUserProfile(user);
        if (synced) {
          profile = synced as unknown as BadgeProfile;
        }
      } catch (syncErr) {
        console.warn("Notice: syncUserProfile on badge error:", syncErr);
      }
    }
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Fetch error";
    console.warn("Notice: BadgePage profile fetch error:", msg);
  }

  const identities = (user.identities || []) as IdentityWithData[];
  const identityAvatar =
    identities.find((i) => i.identity_data?.avatar_url || i.identity_data?.picture)?.identity_data?.avatar_url ||
    identities.find((i) => i.identity_data?.avatar_url || i.identity_data?.picture)?.identity_data?.picture;

  const githubUsername =
    profile?.github ||
    metaGithub ||
    null;

  const githubAvatar = githubUsername ? `https://avatars.githubusercontent.com/${githubUsername}` : "";

  const initialAvatar =
    profile?.avatar_url ||
    user.user_metadata?.avatar_url ||
    user.user_metadata?.picture ||
    identityAvatar ||
    githubAvatar ||
    "";

  const initialName =
    profile?.full_name ||
    user.user_metadata?.full_name ||
    user.user_metadata?.name ||
    githubUsername ||
    (userEmail ? userEmail.split("@")[0] : "");

  return (
    <Suspense fallback={<div className="min-h-screen bg-[var(--bg)] flex items-center justify-center text-white font-sans">Loading Badge Studio...</div>}>
      <BadgeClient
        userId={user.id}
        initialRole={profile?.role || user.user_metadata?.role || "contributor"}
        initialName={initialName}
        initialAvatar={initialAvatar}
        initialBadgesCreated={profile?.badges_created ?? user.user_metadata?.badges_created ?? 0}
      />
    </Suspense>
  );
}
