import ProjectCard, { ProjectCardProps } from "../components/ProjectCard";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const mockProjects: ProjectCardProps[] = [
  {
    title: "CloudNative Orchestrator",
    description: "A modern container orchestration platform built for scalability and performance",
    language: "Go",
    stars: "12.5k",
    forks: "2.3k",
    githubUrl: "#",
    accentColor: "#22d3ee",
  },
  {
    title: "DataFlow Pipeline",
    description: "Real-time data processing framework with distributed architecture",
    language: "Python",
    stars: "8.9k",
    forks: "1.5k",
    githubUrl: "#",
    accentColor: "#34d399",
  },
  {
    title: "ReactUI Components",
    description: "Comprehensive component library with accessibility-first design",
    language: "TypeScript",
    stars: "15.2k",
    forks: "3.1k",
    githubUrl: "#",
    accentColor: "#f472b6",
  },
  {
    title: "ML Vision Toolkit",
    description: "Computer vision library powered by cutting-edge machine learning models",
    language: "Python",
    stars: "9.8k",
    forks: "1.9k",
    githubUrl: "#",
    accentColor: "#ef4444",
  },
  {
    title: "SecureAuth Framework",
    description: "Enterprise-grade authentication and authorization solution",
    language: "Rust",
    stars: "6.7k",
    forks: "987",
    githubUrl: "#",
    accentColor: "#3b82f6",
  },
  {
    title: "DevOps Automation",
    description: "Complete CI/CD automation suite for modern development workflows",
    language: "JavaScript",
    stars: "11.3k",
    forks: "2.4k",
    githubUrl: "#",
    accentColor: "#f97316",
  },
];

export default function ProjectsPage() {
  return (
    <main className="min-h-screen bg-[var(--bg)] flex flex-col">
      <Navbar />

      {/* Spacer for fixed navbar */}
      <div style={{ height: "72px", flexShrink: 0 }} aria-hidden="true" />

      {/* Page wrapper with side padding applied via CSS */}
      <div className="projects-page-wrapper">
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "48px" }}>
          <h1
            style={{
              fontSize: "clamp(28px, 6vw, 52px)",
              fontWeight: 800,
              color: "#ffffff",
              letterSpacing: "-1px",
              lineHeight: 1.15,
              marginBottom: "12px",
            }}
          >
            Our Projects
          </h1>
          <p
            style={{
              fontSize: "clamp(13.5px, 2.5vw, 18px)",
              color: "#9ca3af",
              lineHeight: 1.65,
              maxWidth: "520px",
              margin: "0 auto",
            }}
          >
            Discover innovative open source projects that are shaping the future of technology
          </p>
        </div>

        {/* Cards grid — responsive via CSS class */}
        <div className="projects-grid" style={{ marginBottom: "40px" }}>
          {mockProjects.map((project, index) => (
            <ProjectCard key={index} {...project} />
          ))}
        </div>

        {/* CTA */}
        <div style={{ display: "flex", justifyContent: "center" }}>
          <button className="projects-cta-btn">
            Explore All Projects
          </button>
        </div>
      </div>

      <Footer />
    </main>
  );
}
