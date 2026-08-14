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
        {/* Full span background image starting from Hero top and extending into About Us */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "1400px", // Fixed height so the image doesn't scale infinitely
            zIndex: 0,
            pointerEvents: "none",
            overflow: "hidden",
          }}
        >
          {/* Inner container to constrain image scaling to its native Figma size */}
          <div
            style={{
              position: "absolute",
              top: 0,
              right: 0,
              width: "100%",
              maxWidth: "1356px", // Matches Figma asset width
              height: "1282px", // Matches Figma asset height
            }}
          >
            <Image
              src="/hero-bg.png"
              alt="Open Source Connect India Artwork"
              fill
              priority
              style={{
                objectFit: "contain", // Use contain so the entire image is always fully visible
                objectPosition: "right top",
              }}
            />
          </div>

          {/* Smooth overlay across the full span for clear contrast */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(to right, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.7) 42%, rgba(0,0,0,0.2) 75%, transparent 100%)",
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
              background: "linear-gradient(to bottom, transparent, #000000)",
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
