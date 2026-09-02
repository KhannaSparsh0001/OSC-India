"use server";

import { auth } from "@/auth";
import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { createClient as createSupabaseClient } from '@supabase/supabase-js';

export async function getProviderAccountId() {
  const session = await auth();
  if (!session?.user) return null;

  const supabaseAdmin = createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { db: { schema: 'next_auth' } }
  );

  const { data } = await supabaseAdmin
    .from("accounts")
    .select('"providerAccountId"')
    .eq('"userId"', session.user.id)
    .eq("provider", "github")
    .single();

  return data?.providerAccountId || null;
}

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

export async function fetchFullActivityGraph(githubUsername: string) {
  try {
    const res = await fetch(`https://github.com/users/${githubUsername}/contributions`);
    if (!res.ok) throw new Error("Failed to fetch GitHub contributions.");
    const html = await res.text();

    const countMap = new Map<string, number>();
    const regex = /data-date="([^"]+)"[^>]*id="([^"]+)"[\s\S]*?<tool-tip[^>]*for="\2"[^>]*>([^<]*)<\/tool-tip>/g;
    
    let match;
    while ((match = regex.exec(html)) !== null) {
      const date = match[1];
      const text = match[3];
      
      let count = 0;
      if (text && !text.toLowerCase().includes('no contributions')) {
        const matchCount = text.match(/^(\d+)/);
        if (matchCount) {
          count = parseInt(matchCount[1], 10);
        }
      }
      
      if (count > 0) {
        countMap.set(date, count);
      }
    }

    return { 
      success: true, 
      contributions: Array.from(countMap.entries()).map(([date, count]) => ({ date, count })) 
    };
  } catch (error: any) {
    console.error("Fetch full activity error:", error);
    return { error: error.message || "Failed to fetch full activity graph" };
  }
}
