import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    const body = await request.json();
    const { full_name, bio, target_user_id } = body;

    const admin = createAdminClient();
    const updateUserId = user ? user.id : target_user_id;

    if (!updateUserId) {
      return NextResponse.json({ error: "No user specified" }, { status: 400 });
    }

    const updatePayload: Record<string, unknown> = {
      updated_at: new Date().toISOString(),
    };
    if (full_name !== undefined) updatePayload.full_name = full_name;
    if (bio !== undefined) updatePayload.bio = bio;

    let { error } = await admin
      .from("profiles")
      .update(updatePayload)
      .or(`user_id.eq.${updateUserId},id.eq.${updateUserId}`);

    if (error && (error.message?.includes("updated_at") || error.code === "42703")) {
      delete updatePayload.updated_at;
      const retry = await admin
        .from("profiles")
        .update(updatePayload)
        .or(`user_id.eq.${updateUserId},id.eq.${updateUserId}`);
      error = retry.error;
    }

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to update profile";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
