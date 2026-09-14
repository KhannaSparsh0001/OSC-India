import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { syncUserProfile } from "@/lib/auth/syncProfile";

export const dynamic = "force-dynamic";

/**
 * Dedicated Google OAuth Callback Handler.
 * Receives code from Google at /api/auth/google/callback (on your domain, NOT Supabase).
 * Exchanges authorization code for tokens, signs in via Supabase ID token on the server,
 * sets auth cookies, and provisions/deduplicates the user's profile.
 */
export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const error = searchParams.get("error");
  const rawState = searchParams.get("state") ?? "/dashboard";
  const next = rawState.startsWith("/") && !rawState.startsWith("//") ? rawState : "/dashboard";

  if (error) {
    console.error("Google OAuth callback returned error:", error);
    return NextResponse.redirect(`${origin}/sign-in?error=${encodeURIComponent(error)}`);
  }

  if (!code) {
    return NextResponse.redirect(
      `${origin}/sign-in?error=${encodeURIComponent("No authorization code provided by Google")}`
    );
  }

  const clientId =
    process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ||
    process.env.GOOGLE_CLIENT_ID ||
    process.env.AUTH_GOOGLE_ID;
  const clientSecret =
    process.env.GOOGLE_CLIENT_SECRET ||
    process.env.AUTH_GOOGLE_SECRET;

  if (!clientId) {
    return NextResponse.redirect(
      `${origin}/sign-in?error=${encodeURIComponent("Google Client ID is missing in .env.local")}`
    );
  }

  if (!clientSecret) {
    return NextResponse.redirect(
      `${origin}/sign-in?error=${encodeURIComponent("GOOGLE_CLIENT_SECRET is required in .env.local for server-side Google OAuth. Please add it from Google Cloud Console.")}`
    );
  }

  try {
    const redirectUri = `${origin}/api/auth/google/callback`;

    // 1. Exchange authorization code with Google token endpoint
    const tokenResponse = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        code,
        client_id: clientId,
        client_secret: clientSecret,
        redirect_uri: redirectUri,
        grant_type: "authorization_code",
      }),
    });

    const tokenData = await tokenResponse.json();

    if (!tokenResponse.ok || !tokenData.id_token) {
      console.error("Failed to exchange code with Google:", tokenData);
      return NextResponse.redirect(
        `${origin}/sign-in?error=${encodeURIComponent(
          tokenData.error_description || tokenData.error || "Failed to exchange authorization code with Google"
        )}`
      );
    }

    // 2. Sign in to Supabase using Google ID Token on the server
    const supabase = await createClient();
    const { data, error: authError } = await supabase.auth.signInWithIdToken({
      provider: "google",
      token: tokenData.id_token,
      access_token: tokenData.access_token,
    });

    if (authError || !data?.user) {
      console.error("Supabase signInWithIdToken error:", authError);
      return NextResponse.redirect(
        `${origin}/sign-in?error=${encodeURIComponent(authError?.message || "Failed to sign in to Supabase with ID token")}`
      );
    }

    // 3. Synchronize / deduplicate profile
    try {
      await syncUserProfile(data.user);
    } catch (profileErr: unknown) {
      const pMsg = profileErr instanceof Error ? profileErr.message : "Profile sync failed";
      console.error("Profile sync error after Google login:", pMsg);
    }

    // 4. Redirect to intended destination
    return NextResponse.redirect(`${origin}${next}`);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Google authentication failed";
    console.error("Google OAuth callback exception:", err);
    return NextResponse.redirect(
      `${origin}/sign-in?error=${encodeURIComponent(message)}`
    );
  }
}
