import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function DashboardLoading() {
  return (
    <div className="min-h-screen bg-[#000000] flex flex-col font-sans text-white">
      <Navbar />
      <div style={{ height: "96px", width: "100%", flexShrink: 0 }} aria-hidden="true" />

      <main
        style={{
          margin: "0 auto",
          maxWidth: "1320px",
          width: "100%",
          paddingTop: "24px",
          paddingBottom: "96px",
          paddingLeft: "clamp(20px, 4vw, 40px)",
          paddingRight: "clamp(20px, 4vw, 40px)",
          boxSizing: "border-box",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Header Skeleton */}
        <div style={{ width: "100%", marginBottom: "36px" }} className="animate-pulse">
          <div style={{ width: "140px", height: "22px", borderRadius: "8px", background: "rgba(255,255,255,0.06)", marginBottom: "8px" }} />
          <div style={{ width: "240px", height: "42px", borderRadius: "10px", background: "rgba(255,255,255,0.1)", marginBottom: "8px" }} />
          <div style={{ width: "300px", height: "16px", borderRadius: "6px", background: "rgba(255,255,255,0.05)" }} />
        </div>

        {/* Top Grid Area Skeleton */}
        <div
          className="dashboard-top-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "300px 1fr",
            gap: "24px",
            width: "100%",
            marginBottom: "28px",
          }}
        >
          {/* Profile Card Skeleton */}
          <div
            className="animate-pulse"
            style={{
              background: "#0d0e12",
              border: "1px solid #1c1e26",
              borderRadius: "20px",
              padding: "28px 20px",
              height: "380px",
            }}
          />

          {/* Stats & Tech Stack Skeleton */}
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <div
              className="dashboard-metrics-grid animate-pulse"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(4, 1fr)",
                gap: "16px",
                height: "150px",
              }}
            >
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  style={{
                    background: "#0d0e12",
                    border: "1px solid #1c1e26",
                    borderRadius: "18px",
                  }}
                />
              ))}
            </div>

            <div
              className="animate-pulse"
              style={{
                background: "#0d0e12",
                border: "1px solid #1c1e26",
                borderRadius: "18px",
                height: "140px",
              }}
            />
          </div>
        </div>

        {/* Daily Contributions Skeleton */}
        <div
          className="animate-pulse"
          style={{
            background: "#0d0e12",
            border: "1px solid #1c1e26",
            borderRadius: "20px",
            height: "220px",
            marginBottom: "28px",
          }}
        />

        {/* PRs Table Skeleton */}
        <div
          className="animate-pulse"
          style={{
            background: "#0d0e12",
            border: "1px solid #1c1e26",
            borderRadius: "20px",
            height: "400px",
          }}
        />
      </main>

      <Footer />
    </div>
  );
}
