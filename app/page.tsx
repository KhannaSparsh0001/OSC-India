import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import StatsSection from "./components/StatsSection";
import ContributeSection from "./components/ContributeSection";
import WhatsNewSection from "./components/WhatsNewSection";
import ProjectsSection from "./components/ProjectsSection";
import SponsorsSection from "./components/SponsorsSection";
import Footer from "./components/Footer";
import Image from "next/image";

export default function Home() {
  return (
    <main style={{ background: "#000000", minHeight: "100vh" }}>
      <Navbar />

      {/* Unified Hero + About Us (Stats) Container with continuous background */}
      <div
        style={{
          position: "relative",
          overflow: "hidden",
          backgroundColor: "#000000",
        }}
      >
        {/* Full span background image starting from Hero top and extending to About Us bottom */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 0,
            pointerEvents: "none",
            overflow: "hidden",
          }}
        >
          <Image
            src="/hero-bg.png"
            alt="Open Source Connect India Artwork"
            fill
            priority
            style={{
              objectFit: "cover",
              objectPosition: "85% top",
            }}
          />

          {/* Smooth overlay across the full two-section span for clear contrast */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(to right, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.7) 42%, rgba(0,0,0,0.2) 75%, transparent 100%)",
            }}
          />

          {/* Bottom subtle blend into Contribute section */}
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: "140px",
              background: "linear-gradient(to bottom, transparent, #0d0d0d)",
            }}
          />
        </div>

        {/* Hero Section */}
        <HeroSection />

        {/* About Us (Stats) Section */}
        <StatsSection />
      </div>

      <ContributeSection />
      <WhatsNewSection />
      <ProjectsSection />
      <SponsorsSection />
      <Footer />
    </main>
  );
}
