import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { syncUserProfile } from "@/lib/auth/syncProfile";
import { syncGitHubContribution } from "@/lib/actions/github";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const { searchParams } = requestUrl;
  const code = searchParams.get("code");
  const rawNext = searchParams.get("next") ?? "/dashboard";
  const next = rawNext.startsWith("/") && !rawNext.startsWith("//") ? rawNext : "/dashboard";
  const errorParam = searchParams.get("error");
  const errorDescription = searchParams.get("error_description");

  // Dynamically resolve public origin respecting reverse proxy headers (e.g. Vercel, Cloudflare)
  const forwardedHost = request.headers.get("x-forwarded-host");
  const forwardedProto = request.headers.get("x-forwarded-proto") || "https";
  const isLocalEnv = process.env.NODE_ENV === "development" && !forwardedHost;
  const origin = isLocalEnv
    ? requestUrl.origin
    : forwardedHost
    ? `${forwardedProto}://${forwardedHost}`
    : requestUrl.origin;

  if (errorParam) {
    console.error("Auth provider callback error:", errorParam, errorDescription);
    const message = errorDescription || errorParam;
    return NextResponse.redirect(`${origin}/sign-in?error=${encodeURIComponent(message)}`);
  }

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      const cookieStore = await cookies();
      const linkingUserId = cookieStore.get("osc_linking_user_id")?.value;

      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (user) {
          const incomingGithub =
            user.user_metadata?.user_name ||
            user.user_metadata?.preferred_username ||
            null;

          if (linkingUserId && incomingGithub) {
            const admin = createAdminClient();

            // 1. Fetch profile of the linking user (e.g. Google user)
            const { data: linkingProfile } = await admin
              .from("profiles")
              .select("*")
              .eq("user_id", linkingUserId)
              .maybeSingle();

            // 2. Clear any stale profile row holding this github handle
            await admin
              .from("profiles")
              .update({ github: null })
              .eq("github", incomingGithub)
              .neq("user_id", linkingUserId)
              .neq("user_id", user.id);

            const githubAvatar = user.user_metadata?.avatar_url || `https://avatars.githubusercontent.com/${incomingGithub}`;

            // 3. Link github to target user profile (linkingUserId)
            await admin
              .from("profiles")
              .update({
                github: incomingGithub,
                avatar_url: githubAvatar,
              })
              .eq("user_id", linkingUserId);

            // 4. If current session user.id is different, ensure user.id profile is unified
            if (user.id !== linkingUserId) {
              await admin
                .from("profiles")
                .upsert({
                  user_id: user.id,
                  full_name: linkingProfile?.full_name || user.user_metadata?.full_name || incomingGithub,
                  avatar_url: githubAvatar,
                  github: incomingGithub,
                  role: linkingProfile?.role || "contributor",
                  score: linkingProfile?.score || 0,
                  merged_prs: linkingProfile?.merged_prs || 0,
                  projects_count: linkingProfile?.projects_count || 0,
                  badges_created: linkingProfile?.badges_created || 0,
                  tech_stack: linkingProfile?.tech_stack || [],
                }, { onConflict: "user_id" });
            }

            // 5. Immediately trigger GitHub contribution sync
            try {
              await syncGitHubContribution(linkingUserId, incomingGithub);
              if (user.id !== linkingUserId) {
                await syncGitHubContribution(user.id, incomingGithub);
              }
            } catch (syncErr: unknown) {
              const msg = syncErr instanceof Error ? syncErr.message : "Sync error";
              console.warn("GitHub contribution sync warning during link:", msg);
            }
          } else {
            await syncUserProfile(user);
          }
        }
      } catch (profileErr: unknown) {
        const msg = profileErr instanceof Error ? profileErr.message : "Profile error";
        console.error("Profile auto-provisioning warning:", msg);
        // Non-blocking so user can still access session
      }

      const response = NextResponse.redirect(`${origin}${next}`);
      if (linkingUserId) {
        response.cookies.delete("osc_linking_user_id");
      }
      return response;
    }

    console.error("Supabase OAuth code exchange error:", error.message);
    return NextResponse.redirect(
      `${origin}/sign-in?error=${encodeURIComponent(error.message)}`
    );
  }

  return NextResponse.redirect(`${origin}/sign-in?error=AuthCodeMissing`);
}
