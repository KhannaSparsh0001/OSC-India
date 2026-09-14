"use client";

import React, { useState, useEffect, useRef, useCallback, Suspense } from "react";
import Image from "next/image";
import Script from "next/script";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useSearchParams } from "next/navigation";
import { 
  signInWithOAuth, 
  signInWithGoogleIdToken, 
  signOutClient, 
  getClientProfile, 
  type ClientProfilePayload 
} from "@/lib/auth/client";

interface GoogleCredentialResponse {
  credential?: string;
  select_by?: string;
}

interface GoogleGIS {
  accounts: {
    id: {
      initialize: (config: {
        client_id: string;
        callback: (response: GoogleCredentialResponse) => void;
        auto_select?: boolean;
        cancel_on_tap_outside?: boolean;
      }) => void;
      renderButton: (
        element: HTMLElement,
        options: {
          type?: string;
          shape?: string;
          theme?: string;
          text?: string;
          size?: string;
          width?: number;
        }
      ) => void;
      prompt: () => void;
    };
  };
}

declare global {
  interface Window {
    google?: GoogleGIS;
  }
}

function SignInContent() {
  const searchParams = useSearchParams();
  const rawNext = searchParams.get("next");
  const nextUrl =
    rawNext && !rawNext.startsWith("/sign-in") && !rawNext.startsWith("/sign-up")
      ? rawNext
      : "/dashboard";
  const urlError = searchParams.get("error");
  const getFriendlyError = (err: string | null) => {
    if (!err) return null;
    const lower = err.toLowerCase();
    if (lower.includes("bad_oauth_state") || lower.includes("state has expired")) {
      return "Your sign-in session expired or was interrupted. Please click 'Sign in with GitHub' again to start a fresh login.";
    }
    if (lower.includes("pkce")) {
      return "Authentication verification failed across domains. Please try signing in again.";
    }
    return err;
  };

  const [profile, setProfile] = useState<ClientProfilePayload | null | undefined>(undefined);
  const [errorMessage, setErrorMessage] = useState<string | null>(getFriendlyError(urlError));
  const [isLoading, setIsLoading] = useState(false);
  const [loadingProvider, setLoadingProvider] = useState<"github" | "google" | null>(null);

  const googleButtonRef = useRef<HTMLDivElement | null>(null);
  const googleClientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;

  const getGoogleButtonWidth = useCallback(() => {
    if (typeof window === "undefined") return 260;
    if (googleButtonRef.current?.parentElement) {
      const parentW = googleButtonRef.current.parentElement.clientWidth;
      if (parentW >= 180) {
        return Math.min(300, Math.floor(parentW));
      }
    }
    const estimated = Math.min(280, window.innerWidth - 88);
    return Math.max(200, Math.floor(estimated));
  }, []);

  const initGoogleGIS = useCallback(() => {
    if (typeof window === "undefined" || !window.google?.accounts?.id) return;
    if (!googleClientId) return;

    try {
      window.google.accounts.id.initialize({
        client_id: googleClientId,
        callback: async (response: GoogleCredentialResponse) => {
          if (!response?.credential) return;
          setErrorMessage(null);
          setIsLoading(true);
          setLoadingProvider("google");
          const res = await signInWithGoogleIdToken(response.credential);
          if (res.error) {
            setErrorMessage(res.error);
            setIsLoading(false);
            setLoadingProvider(null);
          } else {
            window.location.href = nextUrl;
          }
        },
        auto_select: false,
        cancel_on_tap_outside: true,
      });

      if (googleButtonRef.current) {
        window.google.accounts.id.renderButton(googleButtonRef.current, {
          type: "standard",
          shape: "rectangular",
          theme: "outline",
          text: "signin_with",
          size: "large",
          width: getGoogleButtonWidth(),
        });
      }
    } catch (err) {
      console.error("Failed to initialize Google GIS:", err);
    }
  }, [googleClientId, nextUrl, getGoogleButtonWidth]);

  const renderGoogleButton = useCallback(
    (element: HTMLDivElement | null) => {
      googleButtonRef.current = element;
      if (!element) return;
      if (typeof window !== "undefined" && window.google?.accounts?.id && googleClientId) {
        try {
          initGoogleGIS();
          window.google.accounts.id.renderButton(element, {
            type: "standard",
            shape: "rectangular",
            theme: "outline",
            text: "signin_with",
            size: "large",
            width: getGoogleButtonWidth(),
          });
        } catch (e) {
          console.error("renderButton failed:", e);
        }
      }
    },
    [googleClientId, initGoogleGIS, getGoogleButtonWidth]
  );

  useEffect(() => {
    getClientProfile().then((res) => setProfile(res || null));
  }, []);

  useEffect(() => {
    if (window.google?.accounts?.id && googleClientId) {
      initGoogleGIS();
    }
  }, [googleClientId, initGoogleGIS]);

  useEffect(() => {
    if (profile === null && window.google?.accounts?.id && googleClientId) {
      initGoogleGIS();
    }
  }, [profile, googleClientId, initGoogleGIS]);

  const handleOAuthSignIn = async (provider: "github") => {
    setErrorMessage(null);
    setIsLoading(true);
    setLoadingProvider(provider);
    const res = await signInWithOAuth(provider, nextUrl);
    if (res?.error) {
      if (res.error.toLowerCase().includes("provider is not enabled") || res.error.toLowerCase().includes("unsupported provider")) {
        setErrorMessage("GitHub sign-in is not enabled in your Supabase project. Please enable it in the Supabase Dashboard under Authentication → Providers.");
      } else {
        setErrorMessage(res.error);
      }
      setIsLoading(false);
      setLoadingProvider(null);
    }
  };

  const handleGoogleClick = () => {
    if (!googleClientId) {
      setErrorMessage(
        "Google Client ID is missing. Please add NEXT_PUBLIC_GOOGLE_CLIENT_ID to your .env.local file from Google Cloud Console."
      );
      return;
    }
    if (window.google?.accounts?.id) {
      window.google.accounts.id.prompt();
    } else {
      window.location.href = `/api/auth/google?next=${encodeURIComponent(nextUrl)}`;
    }
  };

  return (
    <>
      <Script
        src="https://accounts.google.com/gsi/client"
        strategy="afterInteractive"
        onLoad={initGoogleGIS}
      />

      <div 
        className="w-full max-w-[340px] sm:max-w-[380px] mx-auto rounded-[20px] sm:rounded-[24px] relative overflow-hidden transition-all"
        style={{ 
          background: "linear-gradient(180deg, #131317 0%, #0c0c0f 100%)", 
          border: "1px solid rgba(255, 255, 255, 0.12)",
          boxShadow: "0 20px 50px -12px rgba(0, 0, 0, 0.85), 0 0 35px rgba(255, 117, 24, 0.05)",
          padding: "clamp(24px, 5vw, 36px) clamp(16px, 4vw, 24px)", 
          display: "flex", 
          flexDirection: "column", 
          justifyContent: "center",
          boxSizing: "border-box",
        }}
      >
        {/* Top ambient brand line */}
        <div 
          style={{ 
            position: "absolute", 
            top: 0, 
            left: "25%", 
            right: "25%", 
            height: "2px", 
            background: "linear-gradient(90deg, transparent, #FF7518, transparent)" 
          }} 
          aria-hidden="true"
        />
        {profile === undefined ? (
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "16px", padding: "36px 0" }}>
            <div style={{ width: "36px", height: "36px", border: "3px solid rgba(255,117,24,0.2)", borderTopColor: "var(--orange)", borderRadius: "50%", animation: "spin 1s linear infinite" }} />
          </div>
        ) : profile ? (
          <div style={{ textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", animation: "fadeIn 0.5s ease-out" }}>
            <div style={{ 
              width: "76px", height: "76px", borderRadius: "50%", overflow: "hidden", 
              border: "3px solid rgba(255, 117, 24, 0.8)", marginBottom: "16px", background: "#1c1c1f", 
              display: "flex", alignItems: "center", justifyContent: "center",
              boxShadow: "0 0 25px rgba(255, 117, 24, 0.15)"
            }}>
              {profile.avatar ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={profile.avatar} alt={profile.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              ) : (
                <span style={{ fontSize: "28px", color: "white", fontWeight: 600 }}>{profile.name?.[0] || "U"}</span>
              )}
            </div>
            
            <h1 className="text-[21px] sm:text-[24px] font-bold text-white mb-1 tracking-tight">Welcome back, {profile.name?.split(" ")[0] || "there"}!</h1>
            <p className="text-[13px] sm:text-[14px] text-gray-400 font-medium mb-6">You are already signed in to your account.</p>
            
            <a 
              href={nextUrl}
              className="w-full bg-[var(--orange)] hover:bg-[var(--orange-dark)] text-white text-[14px] sm:text-[15px] font-semibold rounded-xl transition-all shadow-lg shadow-orange-500/15 flex items-center justify-center no-underline"
              style={{ padding: "12px 14px", marginBottom: "16px" }}
            >
              Go to Dashboard
            </a>
            
            <button 
              type="button"
              onClick={() => signOutClient("/")}
              className="text-[12.5px] sm:text-[13px] text-gray-500 hover:text-white transition-colors underline decoration-gray-700 hover:decoration-white underline-offset-4 bg-transparent border-none cursor-pointer"
            >
              Sign out and use a different account
            </button>
          </div>
        ) : (
          <>
            <div style={{ textAlign: "center", marginBottom: "22px" }}>
              <div style={{ display: "flex", justifyContent: "center", marginBottom: "14px" }}>
                <div 
                  style={{
                    width: "44px",
                    height: "44px",
                    borderRadius: "12px",
                    background: "rgba(255, 117, 24, 0.08)",
                    border: "1px solid rgba(255, 117, 24, 0.25)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "7px",
                    boxShadow: "0 0 18px rgba(255, 117, 24, 0.12)",
                  }}
                >
                  <Image
                    src="/mobile-logo.png"
                    alt="OSCI Logo"
                    width={28}
                    height={28}
                    style={{ objectFit: "contain" }}
                    priority
                  />
                </div>
              </div>
              <h1 className="text-[22px] sm:text-[25px] font-bold text-white mb-1 tracking-tight">Welcome Back</h1>
              <p className="text-[13px] sm:text-[13.5px] text-gray-400">Sign in to your OSCI account</p>
            </div>

            {errorMessage && (
              <div style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.3)", color: "#ef4444", padding: "10px 12px", borderRadius: "10px", fontSize: "12.5px", lineHeight: "1.5", marginBottom: "16px" }}>
                {errorMessage}
              </div>
            )}

            {/* OAuth Buttons */}
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              <button 
                type="button"
                onClick={() => handleOAuthSignIn("github")}
                disabled={isLoading}
                className="flex items-center justify-center gap-2.5 w-full bg-[#1c1c1f] hover:bg-[#252529] active:scale-[0.99] text-white text-[13.5px] sm:text-[14px] font-medium rounded-xl border border-[rgba(255,255,255,0.12)] transition-all cursor-pointer disabled:opacity-60 hover:border-[rgba(255,255,255,0.25)] shadow-sm"
                style={{ padding: "12px 14px" }}
              >
                {loadingProvider === "github" ? (
                  <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <div style={{ width: "16px", height: "16px", border: "2px solid rgba(255,255,255,0.3)", borderTopColor: "#ffffff", borderRadius: "50%", animation: "spin 1s linear infinite" }} />
                    <span>Connecting to GitHub...</span>
                  </div>
                ) : (
                  <>
                    <svg className="w-[18px] h-[18px] flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
                      <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                    </svg>
                    <span>Sign in with GitHub</span>
                  </>
                )}
              </button>

              {/* Direct Google Sign-In with GIS ID Token */}
              <div style={{ position: "relative", width: "100%", overflow: "hidden", borderRadius: "12px" }}>
                <button 
                  type="button"
                  onClick={handleGoogleClick}
                  disabled={isLoading}
                  className="flex items-center justify-center gap-2.5 w-full bg-white hover:bg-gray-100 active:scale-[0.99] text-gray-900 text-[13.5px] sm:text-[14px] font-medium rounded-xl transition-all cursor-pointer disabled:opacity-60 shadow-md"
                  style={{ padding: "12px 14px" }}
                >
                  {loadingProvider === "google" ? (
                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                      <div style={{ width: "16px", height: "16px", border: "2px solid rgba(0,0,0,0.2)", borderTopColor: "#4285F4", borderRadius: "50%", animation: "spin 1s linear infinite" }} />
                      <span style={{ color: "#1f2937", fontWeight: 600 }}>Signing in with Google...</span>
                    </div>
                  ) : (
                    <>
                      <svg className="w-[18px] h-[18px] flex-shrink-0" viewBox="0 0 24 24">
                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                      </svg>
                      <span>Sign in with Google</span>
                    </>
                  )}
                </button>

                {/* Invisible Google GIS rendered button overlay to capture click natively */}
                {googleClientId && (
                  <div
                    ref={renderGoogleButton}
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: "100%",
                      opacity: 0.0001,
                      overflow: "hidden",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      zIndex: 10,
                      pointerEvents: "auto",
                    }}
                  />
                )}
              </div>
            </div>

            <p style={{ marginTop: "18px", textAlign: "center", fontSize: "11px", color: "#6b7280", lineHeight: 1.45 }}>
              By continuing, you agree to OSCI&apos;s{" "}
              <a href="/privacy" className="text-gray-400 hover:text-white underline underline-offset-2">Terms</a> &amp;{" "}
              <a href="/privacy" className="text-gray-400 hover:text-white underline underline-offset-2">Privacy Policy</a>.
            </p>
          </>
        )}
      </div>
    </>
  );
}

export default function SignInPage() {
  return (
    <div className="min-h-screen bg-[var(--bg)] flex flex-col font-sans relative selection:bg-[var(--orange)] selection:text-white">
      <Navbar />
      
      {/* Ambient background glow */}
      <div
        className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
        style={{
          background: "radial-gradient(ellipse 80% 50% at 50% 30%, rgba(255, 117, 24, 0.07) 0%, rgba(0, 0, 0, 0) 70%)",
        }}
        aria-hidden="true"
      />

      {/* Spacer for fixed navbar */}
      <div className="h-16 sm:h-20 w-full shrink-0 relative z-10" aria-hidden="true" />

      <main 
        className="flex-grow flex items-center justify-center px-6 sm:px-8 relative z-10 w-full"
        style={{
          minHeight: "calc(100dvh - 80px)",
          paddingTop: "clamp(20px, 4vh, 40px)",
          paddingBottom: "clamp(60px, 8vh, 90px)",
          boxSizing: "border-box",
        }}
      >
        <Suspense fallback={
          <div style={{ width: "40px", height: "40px", border: "3px solid rgba(255,117,24,0.2)", borderTopColor: "var(--orange)", borderRadius: "50%", animation: "spin 1s linear infinite" }} />
        }>
          <SignInContent />
        </Suspense>
      </main>

      <Footer />
    </div>
  );
}
