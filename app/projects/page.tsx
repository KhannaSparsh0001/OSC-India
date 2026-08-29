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
      {/* Top clearance for fixed navbar */}
      <div className="h-24 sm:h-28 md:h-32 w-full shrink-0" aria-hidden="true" />
      
      <div className="flex-grow px-5 sm:px-8 md:px-12 pb-16 max-w-7xl mx-auto w-full">
        {/* Header Section */}
        <div className="text-center mb-10 sm:mb-14 md:mb-16 flex flex-col items-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight mb-3">
            Our <span className="text-white">Projects</span>
          </h1>
          <p className="text-[var(--text-secondary)] text-sm sm:text-base md:text-lg max-w-md sm:max-w-xl text-center px-3 leading-relaxed">
            Discover innovative open source projects that are shaping the future of technology
          </p>
        </div>

        {/* Project Grid */}
        <div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-6 lg:gap-8 mb-12 sm:mb-16"
        >
          {mockProjects.map((project, index) => (
            <ProjectCard key={index} {...project} />
          ))}
        </div>

        {/* CTA Button */}
        <div className="my-8 sm:my-14 md:my-20 flex justify-center w-full px-4">
          <button 
            className="bg-[var(--orange)] hover:bg-[var(--orange-dark)] text-white font-semibold rounded-full transition-all duration-300 shadow-lg shadow-orange-500/20 px-8 py-3.5 sm:px-10 sm:py-4 text-sm sm:text-base w-full sm:w-auto text-center cursor-pointer"
          >
            Explore All Projects
          </button>
        </div>
      </div>

      <Footer />
    </main>
  );
}
