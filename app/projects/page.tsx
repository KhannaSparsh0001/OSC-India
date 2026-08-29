import ProjectCard, { ProjectCardProps } from "../components/ProjectCard";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

// Mock Data representing the projects from the Figma design
const mockProjects: ProjectCardProps[] = [
  {
    title: "CloudNative Orchestrator",
    description: "A modern container orchestration platform built for scalability and performance",
    language: "Go",
    stars: "12.5k",
    forks: "2.3k",
    githubUrl: "#",
    accentColor: "#22d3ee", // cyan
  },
  {
    title: "DataFlow Pipeline",
    description: "Real-time data processing framework with distributed architecture",
    language: "Python",
    stars: "8.9k",
    forks: "1.5k",
    githubUrl: "#",
    accentColor: "#34d399", // emerald
  },
  {
    title: "ReactUI Components",
    description: "Comprehensive component library with accessibility-first design",
    language: "TypeScript",
    stars: "15.2k",
    forks: "3.1k",
    githubUrl: "#",
    accentColor: "#f472b6", // pink
  },
  {
    title: "ML Vision Toolkit",
    description: "Computer vision library powered by cutting-edge machine learning models",
    language: "Python",
    stars: "9.8k",
    forks: "1.9k",
    githubUrl: "#",
    accentColor: "#ef4444", // red
  },
  {
    title: "SecureAuth Framework",
    description: "Enterprise-grade authentication and authorization solution",
    language: "Rust",
    stars: "6.7k",
    forks: "987",
    githubUrl: "#",
    accentColor: "#3b82f6", // blue
  },
  {
    title: "DevOps Automation",
    description: "Complete CI/CD automation suite for modern development workflows",
    language: "JavaScript",
    stars: "11.3k",
    forks: "2.4k",
    githubUrl: "#",
    accentColor: "#f97316", // orange
  }
];

export default function ProjectsPage() {
  return (
    <main className="min-h-screen bg-[var(--bg)] flex flex-col">
      <Navbar />
      <div style={{ height: '96px', width: '100%', flexShrink: 0 }} aria-hidden="true" />
      
      <div className="flex-grow px-6 py-12" style={{ margin: '0 auto', maxWidth: '1280px', width: '100%' }}>
        {/* Header Section */}
        <div style={{ textAlign: 'center', marginBottom: '64px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight" style={{ marginBottom: '12px' }}>
            Our <span className="text-white">Projects</span>
          </h1>
          <p className="text-[var(--text-secondary)] text-lg" style={{ maxWidth: '600px', textAlign: 'center' }}>
            Discover innovative open source projects that are shaping the future of technology
          </p>
        </div>

        {/* Project Grid */}
        <div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mb-16"
          style={{ gap: '32px' }}
        >
          {mockProjects.map((project, index) => (
            <ProjectCard key={index} {...project} />
          ))}
        </div>

        {/* CTA Button */}
        <div style={{ margin: '64px 0 96px 0', display: 'flex', justifyContent: 'center' }}>
          <button 
            className="bg-[var(--orange)] hover:bg-[var(--orange-dark)] text-white font-semibold rounded-full transition-colors duration-300 shadow-lg shadow-orange-500/20"
            style={{ padding: '16px 40px' }}
          >
            Explore All Projects
          </button>
        </div>
      </div>

      <Footer />
    </main>
  );
}
