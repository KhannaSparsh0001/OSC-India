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
    const targetDate = new Date("2026-08-15T09:00:00+05:30").getTime();

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
        <div style={{ maxWidth: "560px" }}>
          {/* Main Headline */}
          <h1
            style={{
              fontSize: "clamp(32px, 8vw, 68px)",
              fontWeight: 800,
              lineHeight: 1.1,
              letterSpacing: "-1.5px",
              marginBottom: "22px",
            }}
          >
            <div style={{ display: "flex", flexWrap: "wrap", gap: "10px 14px", alignItems: "baseline" }}>
              <span
                style={{
                  color: "#FF6000",
                  textShadow: "0 0 35px rgba(255, 96, 0, 0.35)",
                }}
              >
                Open
              </span>
              <span
                style={{
                  background:
                    "linear-gradient(90deg, #F8D3C5 0%, #F6C8AF 12%, #4ADE80 40%, #22C55E 65%, #A7F3D0 85%, #E2FBE8 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  display: "inline-block",
                }}
              >
                Source
              </span>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "10px 14px", alignItems: "baseline", marginTop: "4px" }}>
              <span
                style={{
                  color: "#FF6000",
                  textShadow: "0 0 35px rgba(255, 96, 0, 0.35)",
                }}
              >
                Connect
              </span>
              <span
                style={{
                  background:
                    "linear-gradient(90deg, #00C853 0%, #22C55E 40%, #86EFAC 55%, #FED7AA 80%, #FEE2D5 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  display: "inline-block",
                }}
              >
                India
              </span>
            </div>
          </h1>

          {/* Subtitle */}
          <p
            style={{
              fontSize: "15.5px",
              color: "#9ca3af",
              lineHeight: 1.65,
              marginBottom: "32px",
              maxWidth: "440px",
              fontWeight: 400,
            }}
          >
            Join us this August to connect, collaborate, and contribute to open source projects that are shaping the future of technology.
          </p>

          {/* CTA Buttons */}
          <div
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
              style={{
                background: "#FF6000",
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
                (e.currentTarget as HTMLElement).style.background = "#FF6000";
                (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 20px rgba(255, 96, 0, 0.4)";
              }}
            >
              Register Now
            </Link>

            {/* Countdown Box */}
            <div
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

          {/* Divider */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              width: "100%",
              maxWidth: "380px",
              marginBottom: "24px",
            }}
          >
            <div
              style={{
                flex: 1,
                height: "1.5px",
                background: "linear-gradient(90deg, rgba(255, 96, 0, 0.2) 0%, rgba(255, 96, 0, 0) 100%)",
              }}
            />
            <div
              style={{
                display: "flex",
                gap: "6px",
                alignItems: "center",
              }}
            >
              <div style={{ width: "5px", height: "5px", borderRadius: "50%", background: "rgba(255, 96, 0, 0.5)", boxShadow: "0 0 4px rgba(255, 96, 0, 0.3)" }} />
              <div style={{ width: "7px", height: "7px", borderRadius: "50%", background: "rgba(34, 197, 94, 0.5)", boxShadow: "0 0 6px rgba(34, 197, 94, 0.3)" }} />
              <div style={{ width: "5px", height: "5px", borderRadius: "50%", background: "rgba(255, 96, 0, 0.5)", boxShadow: "0 0 4px rgba(255, 96, 0, 0.3)" }} />
            </div>
            <div
              style={{
                flex: 1,
                height: "1.5px",
                background: "linear-gradient(90deg, rgba(34, 197, 94, 0) 0%, rgba(34, 197, 94, 0.2) 100%)",
              }}
            />
          </div>

          {/* Date Label */}
          <div
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
              stroke="#FF6000"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
              <circle cx="8" cy="15" r="1" fill="#FF6000" />
              <circle cx="12" cy="15" r="1" fill="#FF6000" />
              <circle cx="16" cy="15" r="1" fill="#FF6000" />
            </svg>
            <span
              style={{
                fontSize: "15px",
                fontWeight: 700,
                color: "#ffffff",
                letterSpacing: "0.2px",
              }}
            >
              August 15, 2025
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
