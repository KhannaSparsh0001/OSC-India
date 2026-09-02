"use server";

import { auth } from "@/auth";
import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function saveTechStack(languages: string[]) {
  const session = await auth();
  if (!session?.user) {
    throw new Error("Unauthorized");
  }

  if (!languages || !Array.isArray(languages)) {
    throw new Error("Invalid languages data");
  }

  try {
    const supabase = await createClient();
    
    const { error: updateError } = await supabase
      .from("profiles")
      .update({ tech_stack: languages })
      .eq("user_id", session.user.id);

    if (updateError) {
      throw updateError;
    }

    revalidatePath("/dashboard");
    return { success: true };

  } catch (error: any) {
    console.error("Save tech stack error:", error);
    return { error: error.message || "Failed to save tech stack" };
  }
}

export async function saveContributions(events: { type: string, url: string, created_at: string }[]) {
  const session = await auth();
  if (!session?.user) {
    throw new Error("Unauthorized");
  }

  try {
    const supabase = await createClient();
    
    // Clear old auto-synced GitHub events (project_id is null)
    await supabase
      .from("contributions")
      .delete()
      .eq("user_id", session.user.id)
      .is("project_id", null);

    if (events && events.length > 0) {
      const records = events.map(e => ({
        user_id: session.user.id,
        type: e.type,
        url: e.url,
        created_at: e.created_at,
        status: 'merged' // Auto-approve synced GitHub activity
      }));

      const { error } = await supabase.from("contributions").insert(records);
      if (error) throw error;
    }

    revalidatePath("/dashboard");
    return { success: true };
  } catch (error: any) {
    console.error("Save contributions error:", error);
    return { error: error.message || "Failed to save contributions" };
  }
}
