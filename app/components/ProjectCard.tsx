import Link from "next/link";
import { Star, GitFork, ExternalLink } from "lucide-react";

export interface ProjectCardProps {
  title: string;
  description: string;
  language: string;
  stars: string;
  forks: string;
  githubUrl: string;
  accentColor: string; // Hex color string
}

const languageColors: Record<string, string> = {
  "Go": "bg-cyan-500",
  "Python": "bg-blue-500",
  "TypeScript": "bg-blue-600",
  "Rust": "bg-orange-600",
  "JavaScript": "bg-yellow-400",
};

export default function ProjectCard({
  title,
  description,
  language,
  stars,
  forks,
  githubUrl,
  accentColor,
}: ProjectCardProps) {
  const dotColor = languageColors[language] || "bg-gray-400";

  return (
    <div
      className="bg-[var(--bg-card)] rounded-xl border border-[var(--border)] overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl flex flex-col h-full border-t-[4px]"
      style={{ borderTopColor: accentColor }}
    >
      <div style={{ padding: '28px', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
        {/* Header Icon */}
        <div className="w-11 h-11 rounded-xl bg-[rgba(255,255,255,0.08)] flex items-center justify-center mb-5 border border-[rgba(255,255,255,0.03)]">
          <svg
            className="w-5 h-5 text-gray-200"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
            <path d="M9 18c-4.51 2-5-2-7-2" />
          </svg>
        </div>

        {/* Title & Description */}
        <h3 className="text-[19px] font-bold text-white mb-2 tracking-tight">{title}</h3>
        <p className="text-[var(--text-secondary)] text-[14px] mb-6 leading-relaxed">
          {description}
        </p>

        {/* Bottom Section (Tag + Stats) pushed to bottom */}
        <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column' }}>
          {/* Tech Tag */}
          <div className="flex items-center gap-2 mb-6">
          <div className="flex items-center gap-2 bg-[rgba(255,255,255,0.12)] px-3 py-1.5 rounded-full">
            <div className={`w-2 h-2 rounded-full ${dotColor}`} />
            <span className="text-[13px] font-medium text-gray-200 tracking-wide">{language}</span>
          </div>
        </div>

          {/* Stats & Link */}
          <div style={{ paddingTop: '20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div className="flex items-center gap-5 text-[var(--text-secondary)] text-[14px]">
              <div className="flex items-center gap-1.5">
                <Star className="w-[18px] h-[18px]" />
                <span className="font-medium">{stars}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <GitFork className="w-[18px] h-[18px]" />
                <span className="font-medium">{forks}</span>
              </div>
            </div>

            <Link
              href={githubUrl}
              target="_blank"
              className="flex items-center gap-1.5 text-[var(--orange)] text-[14px] font-semibold hover:text-[var(--orange-dark)] transition-colors w-fit"
            >
              View Project <ExternalLink className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
