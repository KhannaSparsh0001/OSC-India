import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function ProjectsLoading() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#000000",
        display: "flex",
        flexDirection: "column",
        color: "#ffffff",
      }}
    >
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
        {/* Hero Skeleton */}
        <div style={{ display: "flex", justifyContent: "space-between", gap: "40px", marginBottom: "44px", flexWrap: "wrap" }} className="animate-pulse">
          <div style={{ flex: 1, minWidth: "300px", maxWidth: "620px" }}>
            <div style={{ width: "160px", height: "26px", borderRadius: "9999px", background: "rgba(255,255,255,0.08)", marginBottom: "16px" }} />
            <div style={{ width: "280px", height: "48px", borderRadius: "8px", background: "rgba(255,255,255,0.12)", marginBottom: "16px" }} />
            <div style={{ width: "100%", height: "20px", borderRadius: "4px", background: "rgba(255,255,255,0.06)", marginBottom: "8px" }} />
            <div style={{ width: "80%", height: "20px", borderRadius: "4px", background: "rgba(255,255,255,0.06)", marginBottom: "28px" }} />
            <div style={{ display: "flex", gap: "14px" }}>
              <div style={{ width: "160px", height: "44px", borderRadius: "9999px", background: "rgba(255,117,24,0.3)" }} />
            </div>
          </div>
          <div style={{ width: "380px", height: "200px", borderRadius: "16px", background: "rgba(255,255,255,0.04)" }} />
        </div>


        {/* Cards Grid Skeleton (9 cards) */}
        <div className="projects-catalog-grid" style={{ width: "100%", marginBottom: "36px" }}>
          {[...Array(9)].map((_, i) => (
            <div
              key={i}
              className="animate-pulse"
              style={{
                background: "#0d0e12",
                border: "1px solid #1c1e26",
                borderRadius: "18px",
                padding: "24px 22px",
                height: "260px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                boxSizing: "border-box",
              }}
            >
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "14px" }}>
                  <div style={{ width: "42px", height: "42px", borderRadius: "12px", background: "rgba(255,255,255,0.08)" }} />
                  <div style={{ width: "60%", height: "20px", borderRadius: "4px", background: "rgba(255,255,255,0.1)" }} />
                </div>
                <div style={{ width: "100%", height: "14px", borderRadius: "4px", background: "rgba(255,255,255,0.05)", marginBottom: "6px" }} />
                <div style={{ width: "85%", height: "14px", borderRadius: "4px", background: "rgba(255,255,255,0.05)", marginBottom: "16px" }} />
                <div style={{ display: "flex", gap: "6px" }}>
                  <div style={{ width: "50px", height: "22px", borderRadius: "6px", background: "rgba(255,255,255,0.06)" }} />
                  <div style={{ width: "50px", height: "22px", borderRadius: "6px", background: "rgba(255,255,255,0.06)" }} />
                  <div style={{ width: "50px", height: "22px", borderRadius: "6px", background: "rgba(255,255,255,0.06)" }} />
                </div>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", paddingTop: "14px", borderTop: "1px solid #161822" }}>
                <div style={{ width: "80px", height: "16px", borderRadius: "4px", background: "rgba(255,255,255,0.06)" }} />
                <div style={{ width: "90px", height: "16px", borderRadius: "4px", background: "rgba(255,117,24,0.2)" }} />
              </div>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}

