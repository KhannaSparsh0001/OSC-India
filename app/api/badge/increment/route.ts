import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";

export const dynamic = "force-dynamic";

export async function POST() {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const admin = createAdminClient();

    // 1. Fetch current count from user_metadata or profiles table
    let currentCount = Number(user.user_metadata?.badges_created ?? 0);

    try {
      const { data: profile } = await admin
        .from("profiles")
        .select("badges_created")
        .eq("user_id", user.id)
        .maybeSingle();

      if (profile && profile.badges_created !== undefined && profile.badges_created !== null) {
        currentCount = Number(profile.badges_created);
      }
    } catch {
      // fallback to user_metadata
    }

    if (currentCount >= 3) {
      return NextResponse.json(
        {
          error: "Maximum badge creation limit reached (3 badges per account).",
          count: currentCount,
        },
        { status: 400 }
      );
    }

    // 2. Increment count
    const newCount = currentCount + 1;

    // 3. Save to auth.users user_metadata (unconditional resilience)
    try {
      await admin.auth.admin.updateUserById(user.id, {
        user_metadata: {
          ...user.user_metadata,
          badges_created: newCount,
        },
      });
    } catch (authErr) {
      console.warn("Notice: saving badges_created to auth metadata:", authErr);
    }

    // 4. Also try updating profiles table
    try {
      await admin
        .from("profiles")
        .update({ badges_created: newCount, updated_at: new Date().toISOString() })
        .eq("user_id", user.id);
    } catch (dbErr) {
      console.warn("Notice: saving badges_created to profiles table:", dbErr);
    }

    return NextResponse.json({ success: true, count: newCount });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to increment badge count";
    console.warn("Badge increment API error:", err);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
