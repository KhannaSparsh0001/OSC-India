"use client";

import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";

export default function SignInPage() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen bg-[var(--bg)] flex flex-col font-sans">
      <Navbar />
      {/* Spacer to clear the fixed Navbar */}
      <div style={{ height: '72px', width: '100%', flexShrink: 0 }} aria-hidden="true" />

      <main className="flex-grow flex items-center justify-center px-4 py-12">
        {/* Sign In Card */}
        <div 
          className="w-full max-w-[440px] rounded-[24px] border border-[rgba(255,255,255,0.05)] shadow-2xl"
          style={{ background: '#121214', padding: '48px 40px' }}
        >
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <h1 className="text-[28px] font-bold text-white mb-2 tracking-tight">Welcome Back</h1>
            <p className="text-[14px] text-[var(--text-secondary)]">Sign in to your OSCI account</p>
          </div>

          {/* OAuth Buttons */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '32px' }}>
            <button 
              className="flex items-center justify-center gap-3 w-full bg-[#1c1c1f] hover:bg-[#252529] text-white text-[14px] font-medium rounded-lg border border-[rgba(255,255,255,0.05)] transition-colors"
              style={{ padding: '14px' }}
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
              </svg>
              Sign up with GitHub
            </button>
            <button 
              className="flex items-center justify-center gap-3 w-full bg-white hover:bg-gray-100 text-gray-900 text-[14px] font-medium rounded-lg transition-colors"
              style={{ padding: '14px' }}
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
              </svg>
              Sign up with Google
            </button>
          </div>

          {/* Divider */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '32px' }}>
            <div className="flex-1 h-[1px] bg-[rgba(255,255,255,0.06)]" />
            <span className="text-[11px] font-medium text-[var(--text-secondary)] tracking-wider">OR SIGN IN WITH EMAIL</span>
            <div className="flex-1 h-[1px] bg-[rgba(255,255,255,0.06)]" />
          </div>

          {/* Form */}
          <form style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {/* Email Field */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <label className="text-[13px] text-gray-300 font-medium ml-1">Email address</label>
              <input 
                type="email" 
                placeholder="you@example.com"
                className="w-full bg-[#1c1c1f] text-white text-[14px] placeholder-gray-500 rounded-xl border border-[rgba(255,255,255,0.05)] focus:outline-none focus:border-[var(--orange)] focus:ring-1 focus:ring-[var(--orange)] transition-all"
                style={{ padding: '14px 16px' }}
              />
            </div>

            {/* Password Field */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <label className="text-[13px] text-gray-300 font-medium ml-1">Password</label>
              <div className="relative">
                <input 
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter Your password"
                  className="w-full bg-[#1c1c1f] text-white text-[14px] placeholder-gray-500 rounded-xl border border-[rgba(255,255,255,0.05)] focus:outline-none focus:border-[var(--orange)] focus:ring-1 focus:ring-[var(--orange)] transition-all"
                  style={{ padding: '14px 16px', paddingRight: '48px' }}
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-200 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-[18px] h-[18px]" /> : <Eye className="w-[18px] h-[18px]" />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button 
              type="button"
              className="w-full bg-[var(--orange)] hover:bg-[var(--orange-dark)] text-white text-[15px] font-semibold rounded-xl transition-colors shadow-lg shadow-orange-500/10"
              style={{ padding: '16px', marginTop: '12px' }}
            >
              Sign In
            </button>
          </form>

          {/* Footer Link */}
          <div style={{ textAlign: 'center', marginTop: '32px' }}>
            <p className="text-[13.5px] text-[var(--text-secondary)]">
              Don't have an account?{' '}
              <Link href="/sign-up" className="text-[var(--orange)] hover:text-[var(--orange-dark)] font-medium transition-colors">
                Sign up
              </Link>
            </p>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
