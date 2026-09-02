"use server";

import { auth } from "@/auth";
import { createClient } from "@/lib/supabase/server";

export async function fetchNavProfile() {
  const session = await auth();
  if (!session?.user?.id) return null;

  const supabase = await createClient();
  const { data: profile } = await supabase
    .from("profiles")
    .select("full_name, avatar_url, role")
    .eq("user_id", session.user.id)
    .single();

  return {
    name: profile?.full_name || session.user.name || "User",
    email: session.user.email,
    avatar: profile?.avatar_url || session.user.image,
    role: profile?.role || "Contributor", // Default to Contributor if not set
  };
}
