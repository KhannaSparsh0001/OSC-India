import { auth } from "@/auth";
import { createClient } from "@/lib/supabase/server";
import BadgeClient from "./BadgeClient";
import { Suspense } from "react";

export default async function BadgePage() {
  const session = await auth();
  let initialRole = "contributor";
  let initialName = "";
  let initialAvatar = "";

  if (session?.user) {
    const supabase = await createClient();
    const { data: profile } = await supabase
      .from("profiles")
      .select(`
        full_name, 
        avatar_url, 
        users ( 
          roles ( name ) 
        )
      `)
      .eq("user_id", session.user.id)
      .single();

    initialName = profile?.full_name || session.user.name || "";
    initialAvatar = profile?.avatar_url || session.user.image || "";
    
    // @ts-ignore
    const roleName = profile?.users?.roles?.name;
    if (roleName) {
      initialRole = roleName.toLowerCase().replace(" ", "-");
    }
  }

  return (
    <Suspense fallback={<div className="min-h-screen bg-[var(--bg)] flex items-center justify-center text-white">Loading...</div>}>
      <BadgeClient initialRole={initialRole} initialName={initialName} initialAvatar={initialAvatar} />
    </Suspense>
  );
}
