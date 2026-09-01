"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function HeroSection() {
  // Countdown timer calculation
  const [timeLeft, setTimeLeft] = useState({
    hours: "05",
    minutes: "25",
    seconds: "40",
  });

  useEffect(() => {
    const targetDate = new Date("2026-09-01T09:00:00+05:30").getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        const totalHours = Math.floor(difference / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeLeft({
          hours: String(totalHours).padStart(2, "0").slice(-2),
          minutes: String(minutes).padStart(2, "0"),
          seconds: String(seconds).padStart(2, "0"),
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="hero"
      className="hero-container"
      style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        background: "transparent",
        zIndex: 1,
      }}
    >
      {/* Hero Content Area */}
      <div
        className="hero-content"
        style={{
          position: "relative",
          zIndex: 2,
          width: "100%",
          padding: "110px clamp(32px, 8vw, 120px) 80px",
        }}
      >
        <div style={{ maxWidth: "720px" }}>
          {/* Main Headline */}
          <h1
            className="hero-title"
            style={{
              fontSize: "clamp(28px, 5.2vw, 64px)",
              fontWeight: 800,
              lineHeight: 1.12,
              letterSpacing: "-1.5px",
              marginBottom: "22px",
            }}
          >
            <div style={{ whiteSpace: "nowrap" }}>
              <span className="tricolor-gradient">Open Source</span>
            </div>
            <div style={{ whiteSpace: "nowrap", marginTop: "4px", display: "flex", alignItems: "baseline", gap: "14px" }}>
              <span className="tricolor-gradient">Connect India</span>
              <span style={{ color: "#FF8822", display: "inline-block" }}>2026</span>
            </div>
          </h1>

          {/* Subtitle */}
          <p
            className="hero-subtitle"
            style={{
              fontSize: "15.5px",
              color: "#9ca3af",
              lineHeight: 1.65,
              marginBottom: "32px",
              maxWidth: "440px",
              fontWeight: 400,
            }}
          >
            Join us this September to connect, collaborate, and contribute to open source projects that are shaping the future of technology.
          </p>

          {/* CTA Buttons */}
          <div
            className="hero-cta-group"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "16px",
              flexWrap: "wrap",
              marginBottom: "16px",
            }}
          >
            {/* Register Now Button */}
            <Link
              href="#register"
              className="hero-register-btn"
              style={{
                background: "#FF7518",
                color: "#ffffff",
                padding: "13px 30px",
                borderRadius: "10px",
                textDecoration: "none",
                fontWeight: 700,
                fontSize: "15px",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "all 0.2s ease",
                boxShadow: "0 4px 20px rgba(255, 96, 0, 0.4)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background = "#e65600";
                (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
                (e.currentTarget as HTMLElement).style.boxShadow = "0 6px 25px rgba(255, 96, 0, 0.55)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background = "#FF7518";
                (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 20px rgba(255, 96, 0, 0.4)";
              }}
            >
              Register Now
            </Link>

            {/* Countdown Box */}
            <div
              className="hero-countdown-box"
              style={{
                background: "rgba(8, 8, 8, 0.9)",
                border: "1.5px solid #FF6500",
                borderRadius: "10px",
                padding: "10px 24px",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 0 15px rgba(255, 101, 0, 0.15)",
                backdropFilter: "blur(8px)",
              }}
            >
              <span
                style={{
                  fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
                  fontSize: "18px",
                  fontWeight: 800,
                  color: "#ffffff",
                  letterSpacing: "3px",
                }}
              >
                {timeLeft.hours}:{timeLeft.minutes}:{timeLeft.seconds}
              </span>
            </div>
          </div>

          {/* Date Label */}
          <div
            className="hero-date-box"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#FF7518"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
              <circle cx="8" cy="15" r="1" fill="#FF7518" />
              <circle cx="12" cy="15" r="1" fill="#FF7518" />
              <circle cx="16" cy="15" r="1" fill="#FF7518" />
            </svg>
            <span
              style={{
                fontSize: "15px",
                fontWeight: 700,
                color: "#ffffff",
                letterSpacing: "0.2px",
              }}
            >
              September 1, 2026
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
