"use client";

import React, { useState, useTransition, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Profile } from "@/lib/supabase/database";
import { updateUserRole, updateUserScore, updateUserGithub, syncSingleUser, syncAllUsers, deleteUserAction, adminLogoutAction, getAdminData, triggerRepoDiscoveryAction } from "@/lib/actions/admin";
import { createProjectAction, deleteProjectAction, deleteAllProjectsAction, ProjectItem, NewProjectInput } from "@/lib/actions/projects";

// Icons
function FolderPlusIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 10v6" />
      <path d="M9 13h6" />
      <path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z" />
    </svg>
  );
}

function FolderGitIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z" />
      <circle cx="12" cy="13" r="2" />
      <path d="M14 13h3" />
      <path d="M7 13h3" />
    </svg>
  );
}

function Trash2Icon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 6h18" />
      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
      <line x1="10" y1="11" x2="10" y2="17" />
      <line x1="14" y1="11" x2="14" y2="17" />
    </svg>
  );
}

function StarIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" stroke="none">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}

function GitForkIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="18" r="3" />
      <circle cx="6" cy="6" r="3" />
      <circle cx="18" cy="6" r="3" />
      <path d="M18 9v1a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V9" />
      <path d="M12 12v3" />
    </svg>
  );
}

function XIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

function AlertCircleIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="8" x2="12" y2="12" />
      <line x1="12" y1="16" x2="12.01" y2="16" />
    </svg>
  );
}

function DownloadIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  );
}

function RefreshCwIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
      <path d="M3 3v5h5" />
      <path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16" />
      <path d="M16 16h5v5" />
    </svg>
  );
}

function LockIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  );
}

function SearchIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}

function UsersIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

function GitPullRequestIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="18" cy="18" r="3" />
      <circle cx="6" cy="6" r="3" />
      <path d="M13 6h3a2 2 0 0 1 2 2v7" />
      <line x1="6" y1="9" x2="6" y2="21" />
    </svg>
  );
}

function CheckCircleIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  );
}

function ZapIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  );
}

function ShieldCheckIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

function ExternalLinkIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  );
}

interface AdminUIProps {
  initialProfiles: Profile[];
  initialMetrics: {
    totalUsers: number;
    contributors: number;
    mentors: number;
    projectAdmins: number;
    admins: number;
    totalPRs: number;
    totalScore: number;
  };
  initialProjects?: ProjectItem[];
}

export default function AdminUI({ initialProfiles, initialMetrics, initialProjects }: AdminUIProps) {
  const [profiles, setProfiles] = useState<Profile[]>(initialProfiles);
  const [projects, setProjects] = useState<ProjectItem[]>(initialProjects || []);
  const [activeTab, setActiveTab] = useState<"contributors" | "projects">("contributors");
  const [metrics, setMetrics] = useState(initialMetrics);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState<string>("all");
  const [projectSearch, setProjectSearch] = useState("");
  const [projectLangFilter, setProjectLangFilter] = useState("all");
  const [showAddProjectModal, setShowAddProjectModal] = useState(false);
  const [isSubmittingProject, setIsSubmittingProject] = useState(false);
  const [deletingProjectId, setDeletingProjectId] = useState<string | null>(null);
  const [projectToDelete, setProjectToDelete] = useState<{ id: string; title: string } | null>(null);
  const [showDeleteAllProjectsModal, setShowDeleteAllProjectsModal] = useState(false);
  const [isDeletingAllProjects, setIsDeletingAllProjects] = useState(false);
  const [userToDelete, setUserToDelete] = useState<{ id: string; name: string; email?: string } | null>(null);
  const [deletingUserId, setDeletingUserId] = useState<string | null>(null);
  const [isDiscoveringRepos, setIsDiscoveringRepos] = useState(false);

  const [newProject, setNewProject] = useState<NewProjectInput>({
    title: "",
    description: "",
    githubUrl: "",
    language: "TypeScript",
    accentColor: "#FF7518",
    stars: "0",
    forks: "0",
  });

  const [, startTransition] = useTransition();
  const [syncingId, setSyncingId] = useState<string | null>(null);
  const [bulkSyncing, setBulkSyncing] = useState(false);
  const [isReloading, setIsReloading] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" | "info" } | null>(null);
  const [toastPaused, setToastPaused] = useState(false);

  const showToast = (message: string, type: "success" | "error" | "info" = "success") => {
    setToast({ message, type });
    setToastPaused(false);
  };

  // Auto-dismiss side toast after 4 seconds (pauses on hover)
  useEffect(() => {
    if (!toast || toastPaused) return;
    const timer = setTimeout(() => {
      setToast(null);
    }, 4000);
    return () => clearTimeout(timer);
  }, [toast, toastPaused]);

  // Modal ESC key listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (projectToDelete && !deletingProjectId) {
          setProjectToDelete(null);
        } else if (showDeleteAllProjectsModal && !isDeletingAllProjects) {
          setShowDeleteAllProjectsModal(false);
        } else if (userToDelete && !deletingUserId) {
          setUserToDelete(null);
        } else if (showAddProjectModal && !isSubmittingProject) {
          setShowAddProjectModal(false);
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [showAddProjectModal, projectToDelete, deletingProjectId, showDeleteAllProjectsModal, isDeletingAllProjects, isSubmittingProject, userToDelete, deletingUserId]);

  // Filter projects
  const filteredProjects = projects.filter((p) => {
    const matchesSearch =
      (p.title || "").toLowerCase().includes(projectSearch.toLowerCase()) ||
      (p.description || "").toLowerCase().includes(projectSearch.toLowerCase()) ||
      (p.githubUrl || "").toLowerCase().includes(projectSearch.toLowerCase()) ||
      (p.language || "").toLowerCase().includes(projectSearch.toLowerCase());

    const matchesLang =
      projectLangFilter === "all" ||
      (p.language || "").toLowerCase() === projectLangFilter.toLowerCase();

    return matchesSearch && matchesLang;
  });

  // Handle Add Project
  const handleAddProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProject.title.trim()) {
      showToast("Project title is required.", "error");
      return;
    }
    if (!newProject.githubUrl.trim()) {
      showToast("GitHub repository URL is required.", "error");
      return;
    }

    setIsSubmittingProject(true);
    try {
      const res = await createProjectAction(newProject);
      if (res.success && res.project) {
        setProjects((prev) => [res.project!, ...prev]);
        showToast(`Project "${res.project.title}" added to directory!`, "success");
        setShowAddProjectModal(false);
        setNewProject({
          title: "",
          description: "",
          githubUrl: "",
          language: "TypeScript",
          accentColor: "#FF7518",
          stars: "0",
          forks: "0",
        });
      } else {
        showToast(res.error || "Failed to add project.", "error");
      }
    } catch (err: unknown) {
      showToast(err instanceof Error ? err.message : "Failed to add project.", "error");
    } finally {
      setIsSubmittingProject(false);
    }
  };

  // Handle GitHub Topic Discovery
  const handleDiscoverProjects = async () => {
    setIsDiscoveringRepos(true);
    try {
      const res = await triggerRepoDiscoveryAction("osci-2026");
      if (res.success) {
        if (res.projects && res.projects.length > 0) {
          setProjects(res.projects);
        }
        showToast(
          `Discovery complete! Found ${res.totalFound} repos tagged #osci-2026 (${res.addedCount} new, ${res.updatedCount} updated).`,
          "success"
        );
      } else {
        showToast(res.error || "Failed to discover repositories.", "error");
      }
    } catch (err: unknown) {
      showToast(err instanceof Error ? err.message : "Discovery request failed.", "error");
    } finally {
      setIsDiscoveringRepos(false);
    }
  };

  // Prompt Delete Project Confirmation Modal
  const handlePromptDeleteProject = (projectId: string, projectTitle: string) => {
    setProjectToDelete({ id: projectId, title: projectTitle });
  };

  // Confirm Delete Project
  const handleConfirmDeleteProject = async () => {
    if (!projectToDelete) return;
    const { id: projectId, title: projectTitle } = projectToDelete;

    setDeletingProjectId(projectId);
    try {
      const res = await deleteProjectAction(projectId);
      if (res.success) {
        setProjects((prev) => prev.filter((p) => p.id !== projectId));
        showToast(`Project "${projectTitle}" removed successfully.`, "success");
        setProjectToDelete(null);
      } else {
        showToast(res.error || "Failed to delete project.", "error");
      }
    } catch (err: unknown) {
      showToast(err instanceof Error ? err.message : "Failed to delete project.", "error");
    } finally {
      setDeletingProjectId(null);
    }
  };

  // Confirm Delete All Projects
  const handleConfirmDeleteAllProjects = async () => {
    setIsDeletingAllProjects(true);
    try {
      const res = await deleteAllProjectsAction();
      if (res.success) {
        setProjects([]);
        showToast("All projects have been permanently removed from the database.", "success");
        setShowDeleteAllProjectsModal(false);
      } else {
        showToast(res.error || "Failed to remove all projects.", "error");
      }
    } catch (err: unknown) {
      showToast(err instanceof Error ? err.message : "Failed to remove all projects.", "error");
    } finally {
      setIsDeletingAllProjects(false);
    }
  };

  // Prompt Delete User Confirmation Modal
  const handlePromptDeleteUser = (user: Profile) => {
    setUserToDelete({
      id: user.id,
      name: user.full_name || "Anonymous User",
      email: user.email || undefined,
    });
  };

  // Confirm Delete User
  const handleConfirmDeleteUser = async () => {
    if (!userToDelete) return;
    const { id: targetId, name: targetName } = userToDelete;

    setDeletingUserId(targetId);
    try {
      const res = await deleteUserAction(targetId);
      if (res.success) {
        setProfiles((prev) => prev.filter((p) => p.id !== targetId));
        showToast(`User "${targetName}" removed permanently .`, "success");
        setUserToDelete(null);
      } else {
        showToast(res.error || "Failed to delete user.", "error");
      }
    } catch (err: unknown) {
      showToast(err instanceof Error ? err.message : "Failed to delete user.", "error");
    } finally {
      setDeletingUserId(null);
    }
  };

  // Filter profiles
  const filteredProfiles = profiles.filter((p) => {
    const matchesSearch =
      (p.full_name || "").toLowerCase().includes(search.toLowerCase()) ||
      (p.email || "").toLowerCase().includes(search.toLowerCase()) ||
      (p.github || "").toLowerCase().includes(search.toLowerCase());

    const matchesRole = roleFilter === "all" || p.role === roleFilter;

    return matchesSearch && matchesRole;
  });

  // Handle Role Change
  const handleRoleChange = (
    userId: string,
    newRole: "contributor" | "mentor" | "project-admin" | "admin"
  ) => {
    startTransition(async () => {
      const res = await updateUserRole(userId, newRole);
      if (res.success) {
        setProfiles((prev) =>
          prev.map((p) =>
            p.id === userId
              ? {
                  ...p,
                  role: newRole,
                  is_admin: newRole === "admin",
                  score: newRole === "contributor" ? p.score : 0,
                  merged_prs: newRole === "contributor" ? p.merged_prs : 0,
                  projects_count: newRole === "contributor" ? p.projects_count : 0,
                }
              : p
          )
        );
        showToast(`Role updated to ${newRole} for user.`, "success");
      } else {
        showToast(res.error || "Failed to update role", "error");
      }
    });
  };

  // Handle Score Adjust
  const handleScoreAdjust = (userId: string, delta: number, mode: "add" | "set" = "add") => {
    startTransition(async () => {
      const res = await updateUserScore(userId, delta, mode);
      if (res.success) {
        setProfiles((prev) =>
          prev.map((p) => (p.id === userId ? { ...p, score: res.score || 0 } : p))
        );
        showToast("Score updated successfully.", "success");
      } else {
        showToast(res.error || "Failed to update score", "error");
      }
    });
  };

  // Handle Set/Update GitHub
  const handleSetGithub = (userId: string, currentHandle?: string | null) => {
    const handle = prompt("Enter GitHub username for this user:", currentHandle || "");
    if (!handle || !handle.trim()) return;
    const clean = handle.replace(/^@/, "").trim();
    startTransition(async () => {
      const res = await updateUserGithub(userId, clean);
      if (res.success) {
        setProfiles((prev) =>
          prev.map((p) => (p.id === userId ? { ...p, github: clean } : p))
        );
        showToast(`GitHub handle @${clean} linked successfully.`, "success");
      } else {
        showToast(res.error || "Failed to update GitHub handle", "error");
      }
    });
  };

  // Handle Single Sync
  const handleSingleSync = async (user: Profile) => {
    if (!user.github) {
      showToast("This user does not have a linked GitHub username.", "error");
      return;
    }
    setSyncingId(user.id);
    try {
      const res = await syncSingleUser(user.id, user.github);
      if (res.success) {
        setProfiles((prev) =>
          prev.map((p) =>
            p.id === user.id
              ? {
                  ...p,
                  score: res.score ?? p.score,
                  merged_prs: res.merged_prs ?? p.merged_prs,
                  projects_count: res.projects_count ?? p.projects_count,
                }
              : p
          )
        );
        showToast(`Synced @${user.github}: ${res.score} pts (${res.merged_prs} PRs)`, "success");
      } else {
        showToast(res.error || "Failed to sync GitHub contributions.", "error");
      }
    } finally {
      setSyncingId(null);
    }
  };

  // Handle Bulk Sync
  const handleBulkSync = async () => {
    if (!confirm("This will synchronize all active contributors with a 2-second rate-limit pause per user. Proceed?")) {
      return;
    }
    setBulkSyncing(true);
    showToast("Bulk sync started in background...", "info");
    try {
      const res = await syncAllUsers();
      if (res.success) {
        showToast(`Bulk sync complete! Synced: ${res.synced}, Failed: ${res.failed}, Total: ${res.total}`, "success");
        window.location.reload();
      } else {
        showToast(res.error || "Bulk sync failed", "error");
      }
    } finally {
      setBulkSyncing(false);
    }
  };

  // Handle Reload Users & Metrics
  const handleReloadUsers = async () => {
    setIsReloading(true);
    try {
      const data = await getAdminData();
      if (data?.profiles) {
        setProfiles(data.profiles);
        if (data.metrics) setMetrics(data.metrics);
        if (data.projects) setProjects(data.projects);
        showToast("User data reloaded successfully.", "success");
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to reload user data";
      showToast(msg, "error");
    } finally {
      setIsReloading(false);
    }
  };

  // Export CSV
  const handleExportCSV = () => {
    const headers = ["ID", "Name", "Email", "GitHub", "Role", "Score", "Merged PRs", "Projects Count", "Badges Created"];
    const rows = filteredProfiles.map((p) => [
      p.id,
      `"${p.full_name || ""}"`,
      p.email || "",
      p.github || "",
      p.role,
      p.score,
      p.merged_prs,
      p.projects_count,
      p.badges_created,
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `OSCI_Users_${new Date().toISOString().split("T")[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Admin Logout / Lock
  const handleAdminLogout = async () => {
    await adminLogoutAction();
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-[#050507] flex flex-col font-sans text-white relative selection:bg-[#FF7518]/30">
      <Navbar />
      <div style={{ height: "96px", width: "100%", flexShrink: 0 }} aria-hidden="true" />

      {/* Ambient Cyber Aura Background */}
      <div
        className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
        style={{
          background: "radial-gradient(ellipse 70% 30% at 50% 120px, rgba(255, 117, 24, 0.08) 0%, rgba(5, 5, 7, 0) 70%)",
        }}
      />

      <main 
        className="flex-grow flex flex-col items-center relative z-10" 
        style={{ 
          margin: "0 auto", 
          maxWidth: "1440px", 
          width: "100%", 
          minHeight: "calc(100vh - 96px)",
          padding: "clamp(36px, 6vh, 56px) clamp(20px, 4vw, 36px) clamp(80px, 12vh, 140px)" 
        }}
      >
        {/* Header */}
        <div style={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "36px", flexWrap: "wrap", gap: "20px" }}>
          <div>
            <div 
              style={{ 
                display: "inline-flex", 
                alignItems: "center", 
                gap: "8px", 
                background: "rgba(255, 117, 24, 0.08)", 
                border: "1px solid rgba(255, 117, 24, 0.25)", 
                color: "#FF8822", 
                padding: "5px 14px", 
                borderRadius: "20px", 
                fontSize: "11px", 
                fontWeight: 700, 
                letterSpacing: "0.08em",
                marginBottom: "14px" 
              }}
            >
              <span 
                style={{ 
                  width: "6px", 
                  height: "6px", 
                  borderRadius: "50%", 
                  background: "#FF7518", 
                  boxShadow: "0 0 8px #FF7518" 
                }} 
              />
              RESTRICTED • ADMIN COMMAND CENTER
            </div>
            <h1 style={{ fontSize: "36px", fontWeight: 800, letterSpacing: "-0.025em" }} className="text-white">
              Command Center
            </h1>
            <p style={{ color: "#9ca3af", fontSize: "15px", marginTop: "4px" }}>
              Manage contributors, verify GitHub roles, trigger synchronization, and adjust scoring.
            </p>
          </div>

          <div style={{ display: "flex", gap: "10px", alignItems: "center", flexWrap: "wrap" }}>
            <button
              onClick={() => setShowAddProjectModal(true)}
              style={{ 
                background: "linear-gradient(135deg, #FF7518 0%, #FF5500 100%)", 
                border: "none", 
                color: "white", 
                padding: "10px 18px", 
                borderRadius: "12px", 
                fontSize: "13px", 
                fontWeight: 700, 
                cursor: "pointer", 
                display: "flex",
                alignItems: "center",
                gap: "8px",
                boxShadow: "0 4px 16px rgba(255, 117, 24, 0.25)",
                transition: "all 0.2s"
              }}
              className="hover:shadow-[0_6px_22px_rgba(255,117,24,0.35)] active:scale-[0.98]"
            >
              <FolderPlusIcon className="w-4 h-4" />
              <span>+ Add Project</span>
            </button>

            <button
              onClick={handleExportCSV}
              style={{ 
                background: "rgba(255,255,255,0.03)", 
                border: "1px solid rgba(255,255,255,0.1)", 
                color: "white", 
                padding: "10px 18px", 
                borderRadius: "12px", 
                fontSize: "13px", 
                fontWeight: 600, 
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "8px",
                transition: "all 0.2s"
              }}
              className="hover:bg-[rgba(255,255,255,0.08)] hover:border-[rgba(255,255,255,0.2)] active:scale-[0.98]"
            >
              <DownloadIcon className="w-4 h-4 text-gray-400" />
              <span>Export CSV</span>
            </button>

            <button
              onClick={handleBulkSync}
              disabled={bulkSyncing}
              style={{ 
                background: "linear-gradient(135deg, #FF7518 0%, #FF5500 100%)", 
                border: "none", 
                color: "white", 
                padding: "10px 20px", 
                borderRadius: "12px", 
                fontSize: "13px", 
                fontWeight: 700, 
                cursor: bulkSyncing ? "not-allowed" : "pointer", 
                opacity: bulkSyncing ? 0.75 : 1,
                display: "flex",
                alignItems: "center",
                gap: "8px",
                boxShadow: "0 4px 16px rgba(255, 117, 24, 0.25)",
                transition: "all 0.2s"
              }}
              className="hover:shadow-[0_6px_22px_rgba(255,117,24,0.35)] active:scale-[0.98]"
            >
              <RefreshCwIcon className={`w-4 h-4 ${bulkSyncing ? "animate-spin" : ""}`} />
              <span>{bulkSyncing ? "Syncing All Users..." : "Sync All Contributors"}</span>
            </button>

            <button
              onClick={handleAdminLogout}
              style={{ 
                background: "rgba(239,68,68,0.06)", 
                border: "1px solid rgba(239,68,68,0.22)", 
                color: "#f87171", 
                padding: "10px 18px", 
                borderRadius: "12px", 
                fontSize: "13px", 
                fontWeight: 600, 
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "8px",
                transition: "all 0.2s"
              }}
              className="hover:bg-[rgba(239,68,68,0.14)] hover:border-[rgba(239,68,68,0.35)] active:scale-[0.98]"
              title="Lock Admin Portal & sign out"
            >
              <LockIcon className="w-4 h-4" />
              <span>Lock Portal</span>
            </button>
          </div>
        </div>

        {/* Metric Cards */}
        <div style={{ width: "100%", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))", gap: "16px", marginBottom: "36px" }}>
          {/* Total Users */}
          <div 
            style={{ 
              background: "linear-gradient(180deg, #131317 0%, #0d0d10 100%)", 
              border: "1px solid rgba(255,255,255,0.07)", 
              borderRadius: "18px", 
              padding: "22px",
              boxShadow: "0 10px 30px rgba(0,0,0,0.35)",
              transition: "transform 0.2s, border-color 0.2s"
            }}
            className="hover:border-[rgba(255,255,255,0.15)]"
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
              <span style={{ color: "#9ca3af", fontSize: "11px", fontWeight: 700, letterSpacing: "0.05em" }}>TOTAL USERS</span>
              <div style={{ width: "32px", height: "32px", borderRadius: "10px", background: "rgba(255,255,255,0.04)", display: "flex", alignItems: "center", justifyContent: "center", color: "#9ca3af" }}>
                <UsersIcon className="w-4 h-4" />
              </div>
            </div>
            <div style={{ fontSize: "32px", fontWeight: 800, letterSpacing: "-0.02em" }}>{metrics.totalUsers ?? 0}</div>
          </div>

          {/* Contributors */}
          <div 
            style={{ 
              background: "linear-gradient(180deg, #131317 0%, #0d0d10 100%)", 
              border: "1px solid rgba(255,117,24,0.22)", 
              borderRadius: "18px", 
              padding: "22px",
              boxShadow: "0 10px 30px rgba(0,0,0,0.35), 0 0 20px rgba(255,117,24,0.04)",
              transition: "transform 0.2s, border-color 0.2s"
            }}
            className="hover:border-[rgba(255,117,24,0.4)]"
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
              <span style={{ color: "#FF8822", fontSize: "11px", fontWeight: 700, letterSpacing: "0.05em" }}>CONTRIBUTORS</span>
              <div style={{ width: "32px", height: "32px", borderRadius: "10px", background: "rgba(255,117,24,0.1)", display: "flex", alignItems: "center", justifyContent: "center", color: "#FF8822" }}>
                <GitPullRequestIcon className="w-4 h-4" />
              </div>
            </div>
            <div style={{ fontSize: "32px", fontWeight: 800, color: "#FF8822", letterSpacing: "-0.02em" }}>{metrics.contributors ?? 0}</div>
          </div>

          {/* Merged PRs */}
          <div 
            style={{ 
              background: "linear-gradient(180deg, #131317 0%, #0d0d10 100%)", 
              border: "1px solid rgba(255,255,255,0.07)", 
              borderRadius: "18px", 
              padding: "22px",
              boxShadow: "0 10px 30px rgba(0,0,0,0.35)",
              transition: "transform 0.2s, border-color 0.2s"
            }}
            className="hover:border-[rgba(56,189,248,0.3)]"
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
              <span style={{ color: "#38bdf8", fontSize: "11px", fontWeight: 700, letterSpacing: "0.05em" }}>MERGED PRS</span>
              <div style={{ width: "32px", height: "32px", borderRadius: "10px", background: "rgba(56,189,248,0.1)", display: "flex", alignItems: "center", justifyContent: "center", color: "#38bdf8" }}>
                <CheckCircleIcon className="w-4 h-4" />
              </div>
            </div>
            <div style={{ fontSize: "32px", fontWeight: 800, letterSpacing: "-0.02em" }}>{metrics.totalPRs ?? 0}</div>
          </div>

          {/* Total Points */}
          <div 
            style={{ 
              background: "linear-gradient(180deg, #131317 0%, #0d0d10 100%)", 
              border: "1px solid rgba(255,255,255,0.07)", 
              borderRadius: "18px", 
              padding: "22px",
              boxShadow: "0 10px 30px rgba(0,0,0,0.35)",
              transition: "transform 0.2s, border-color 0.2s"
            }}
            className="hover:border-[rgba(251,191,36,0.3)]"
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
              <span style={{ color: "#fbbf24", fontSize: "11px", fontWeight: 700, letterSpacing: "0.05em" }}>TOTAL POINTS</span>
              <div style={{ width: "32px", height: "32px", borderRadius: "10px", background: "rgba(251,191,36,0.1)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fbbf24" }}>
                <ZapIcon className="w-4 h-4" />
              </div>
            </div>
            <div style={{ fontSize: "32px", fontWeight: 800, letterSpacing: "-0.02em" }}>{metrics.totalScore ?? 0}</div>
          </div>

          {/* Admins & Project Admins */}
          <div 
            style={{ 
              background: "linear-gradient(180deg, #131317 0%, #0d0d10 100%)", 
              border: "1px solid rgba(255,255,255,0.07)", 
              borderRadius: "18px", 
              padding: "22px",
              boxShadow: "0 10px 30px rgba(0,0,0,0.35)",
              transition: "transform 0.2s, border-color 0.2s"
            }}
            className="hover:border-[rgba(167,139,250,0.3)]"
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
              <span style={{ color: "#a78bfa", fontSize: "11px", fontWeight: 700, letterSpacing: "0.05em" }}>ADMINS & MODS</span>
              <div style={{ width: "32px", height: "32px", borderRadius: "10px", background: "rgba(167,139,250,0.1)", display: "flex", alignItems: "center", justifyContent: "center", color: "#a78bfa" }}>
                <ShieldCheckIcon className="w-4 h-4" />
              </div>
            </div>
            <div style={{ fontSize: "32px", fontWeight: 800, letterSpacing: "-0.02em" }}>{(metrics.admins ?? 0) + (metrics.projectAdmins ?? 0)}</div>
          </div>

          {/* Active Projects */}
          <div 
            style={{ 
              background: "linear-gradient(180deg, #131317 0%, #0d0d10 100%)", 
              border: "1px solid rgba(255,255,255,0.07)", 
              borderRadius: "18px", 
              padding: "22px",
              boxShadow: "0 10px 30px rgba(0,0,0,0.35)",
              transition: "transform 0.2s, border-color 0.2s",
              cursor: "pointer"
            }}
            onClick={() => setActiveTab("projects")}
            className="hover:border-[rgba(56,189,248,0.35)] group"
            title="Switch to Projects Directory"
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
              <span style={{ color: "#38bdf8", fontSize: "11px", fontWeight: 700, letterSpacing: "0.05em" }}>PROJECT REPOS</span>
              <div style={{ width: "32px", height: "32px", borderRadius: "10px", background: "rgba(56,189,248,0.1)", display: "flex", alignItems: "center", justifyContent: "center", color: "#38bdf8" }}>
                <FolderGitIcon className="w-4 h-4" />
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between" }}>
              <div style={{ fontSize: "32px", fontWeight: 800, letterSpacing: "-0.02em", color: "#38bdf8" }}>{projects.length}</div>
              <span style={{ fontSize: "11px", color: "#9ca3af" }} className="group-hover:text-white transition-colors">Manage →</span>
            </div>
          </div>
        </div>

        {/* Tab Switcher */}
        <div style={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "28px", flexWrap: "wrap", gap: "16px", borderBottom: "1px solid rgba(255,255,255,0.06)", paddingBottom: "16px" }}>
          <div style={{ display: "flex", gap: "8px", background: "rgba(255,255,255,0.02)", padding: "4px", borderRadius: "14px", border: "1px solid rgba(255,255,255,0.06)" }}>
            <button
              onClick={() => setActiveTab("contributors")}
              style={{
                background: activeTab === "contributors" ? "linear-gradient(135deg, #FF7518 0%, #FF5500 100%)" : "transparent",
                color: activeTab === "contributors" ? "white" : "#9ca3af",
                border: "none",
                padding: "8px 18px",
                borderRadius: "10px",
                fontSize: "13px",
                fontWeight: activeTab === "contributors" ? 700 : 500,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "8px",
                transition: "all 0.2s",
                boxShadow: activeTab === "contributors" ? "0 2px 10px rgba(255,117,24,0.3)" : "none"
              }}
              className={activeTab !== "contributors" ? "hover:text-white hover:bg-[rgba(255,255,255,0.03)]" : ""}
            >
              <UsersIcon className="w-4 h-4" />
              <span>Contributors & Ranks</span>
              <span style={{
                background: activeTab === "contributors" ? "rgba(0,0,0,0.25)" : "rgba(255,255,255,0.08)",
                padding: "2px 8px",
                borderRadius: "10px",
                fontSize: "11px",
                fontWeight: 700,
              }}>
                {profiles.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab("projects")}
              style={{
                background: activeTab === "projects" ? "linear-gradient(135deg, #FF7518 0%, #FF5500 100%)" : "transparent",
                color: activeTab === "projects" ? "white" : "#9ca3af",
                border: "none",
                padding: "8px 18px",
                borderRadius: "10px",
                fontSize: "13px",
                fontWeight: activeTab === "projects" ? 700 : 500,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "8px",
                transition: "all 0.2s",
                boxShadow: activeTab === "projects" ? "0 2px 10px rgba(255,117,24,0.3)" : "none"
              }}
              className={activeTab !== "projects" ? "hover:text-white hover:bg-[rgba(255,255,255,0.03)]" : ""}
            >
              <FolderGitIcon className="w-4 h-4" />
              <span>Project Directory</span>
              <span style={{
                background: activeTab === "projects" ? "rgba(0,0,0,0.25)" : "rgba(255,255,255,0.08)",
                padding: "2px 8px",
                borderRadius: "10px",
                fontSize: "11px",
                fontWeight: 700,
              }}>
                {projects.length}
              </span>
            </button>
          </div>

          <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
            {activeTab === "projects" && projects.length > 0 && (
              <button
                onClick={() => setShowDeleteAllProjectsModal(true)}
                style={{
                  background: "rgba(239, 68, 68, 0.1)",
                  border: "1px solid rgba(239, 68, 68, 0.25)",
                  color: "#f87171",
                  padding: "8px 14px",
                  borderRadius: "10px",
                  fontSize: "12px",
                  fontWeight: 700,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  transition: "all 0.2s"
                }}
                className="hover:bg-[rgba(239,68,68,0.2)] hover:border-[rgba(239,68,68,0.4)] active:scale-[0.98]"
              >
                <Trash2Icon className="w-3.5 h-3.5" />
                <span>Remove All Projects</span>
              </button>
            )}

            {activeTab === "projects" && (
              <button
                onClick={handleDiscoverProjects}
                disabled={isDiscoveringRepos}
                style={{
                  background: "rgba(56, 189, 248, 0.1)",
                  border: "1px solid rgba(56, 189, 248, 0.25)",
                  color: "#38bdf8",
                  padding: "8px 14px",
                  borderRadius: "10px",
                  fontSize: "12px",
                  fontWeight: 700,
                  cursor: isDiscoveringRepos ? "not-allowed" : "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  transition: "all 0.2s",
                  opacity: isDiscoveringRepos ? 0.6 : 1,
                }}
                className="hover:bg-[rgba(56,189,248,0.2)] hover:border-[rgba(56,189,248,0.4)] active:scale-[0.98]"
                title="Automatically discover repositories tagged with 'osci-2026' on GitHub"
              >
                <SearchIcon className="w-3.5 h-3.5" />
                <span>{isDiscoveringRepos ? "Discovering..." : "Discover Repos (#osci-2026)"}</span>
              </button>
            )}

            <button
              onClick={() => setShowAddProjectModal(true)}
              style={{
                background: "linear-gradient(135deg, #FF7518 0%, #FF5500 100%)",
                border: "none",
                color: "white",
                padding: "8px 16px",
                borderRadius: "10px",
                fontSize: "12px",
                fontWeight: 700,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "6px",
                boxShadow: "0 2px 10px rgba(255,117,24,0.3)",
                transition: "all 0.2s"
              }}
              className="hover:shadow-[0_4px_16px_rgba(255,117,24,0.4)] active:scale-[0.98]"
            >
              <FolderPlusIcon className="w-4 h-4" />
              <span>+ Add New Project</span>
            </button>
          </div>
        </div>

        {activeTab === "contributors" && (
          <div style={{ width: "100%" }}>
            {/* Filters */}
        <div style={{ width: "100%", display: "flex", gap: "16px", marginBottom: "28px", flexWrap: "wrap", alignItems: "center" }}>
          {/* Search Input with Icon */}
          <div style={{ position: "relative", flex: 1, minWidth: "280px" }}>
            <div style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", color: "#6b7280", pointerEvents: "none" }}>
              <SearchIcon className="w-4 h-4" />
            </div>
            <input
              type="text"
              placeholder="Search by name, email, or github handle..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ 
                width: "100%", 
                background: "#111115", 
                border: "1px solid rgba(255,255,255,0.08)", 
                borderRadius: "12px", 
                padding: "12px 18px 12px 40px", 
                color: "white", 
                fontSize: "14px", 
                outline: "none",
                transition: "border-color 0.2s, box-shadow 0.2s"
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = "#FF7518";
                e.currentTarget.style.boxShadow = "0 0 0 3px rgba(255, 117, 24, 0.12)";
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
                e.currentTarget.style.boxShadow = "none";
              }}
            />
            {search && (
              <button 
                onClick={() => setSearch("")}
                style={{ position: "absolute", right: "12px", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", color: "#9ca3af", cursor: "pointer", fontSize: "14px" }}
                className="hover:text-white"
              >
                ✕
              </button>
            )}
          </div>

          {/* Role Filter Tabs */}
          <div style={{ display: "flex", gap: "6px", background: "rgba(255,255,255,0.02)", padding: "4px", borderRadius: "14px", border: "1px solid rgba(255,255,255,0.06)" }}>
            {["all", "contributor", "mentor", "project-admin", "admin"].map((r) => {
              const isActive = roleFilter === r;
              return (
                <button
                  key={r}
                  onClick={() => setRoleFilter(r)}
                  style={{
                    background: isActive ? "linear-gradient(135deg, #FF7518 0%, #FF5500 100%)" : "transparent",
                    color: isActive ? "white" : "#9ca3af",
                    border: "none",
                    padding: "8px 14px",
                    borderRadius: "10px",
                    fontSize: "12px",
                    fontWeight: isActive ? 700 : 500,
                    cursor: "pointer",
                    textTransform: "capitalize",
                    transition: "all 0.2s",
                    boxShadow: isActive ? "0 2px 10px rgba(255,117,24,0.3)" : "none"
                  }}
                  className={!isActive ? "hover:text-white hover:bg-[rgba(255,255,255,0.03)]" : ""}
                >
                  {r === "project-admin" ? "Project Admin" : r}
                </button>
              );
            })}
          </div>

          {/* Reload Users Button */}
          <button
            onClick={handleReloadUsers}
            disabled={isReloading}
            title="Reload user data"
            style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.08)",
              color: isReloading ? "#FF7518" : "#9ca3af",
              padding: "8px 14px",
              borderRadius: "12px",
              cursor: isReloading ? "not-allowed" : "pointer",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              fontSize: "12px",
              fontWeight: 600,
              transition: "all 0.2s",
              height: "40px",
            }}
            className="hover:text-white hover:bg-[rgba(255,255,255,0.08)] hover:border-[rgba(255,255,255,0.18)] active:scale-95"
          >
            <RefreshCwIcon className={`w-4 h-4 ${isReloading ? "animate-spin text-[#FF7518]" : ""}`} />
            <span>{isReloading ? "Reloading..." : "Reload"}</span>
          </button>
        </div>

        {/* User Table */}
        <div 
          style={{ 
            width: "100%", 
            background: "linear-gradient(180deg, #121216 0%, #0c0c0f 100%)", 
            border: "1px solid rgba(255,255,255,0.08)", 
            borderRadius: "20px", 
            overflow: "hidden",
            boxShadow: "0 20px 50px -10px rgba(0,0,0,0.65)" 
          }}
        >
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: "13px" }}>
              <thead>
                <tr style={{ background: "rgba(255,255,255,0.02)", borderBottom: "1px solid rgba(255,255,255,0.08)", color: "#9ca3af", fontWeight: 700, fontSize: "11px", letterSpacing: "0.06em" }}>
                  <th style={{ padding: "18px 22px" }}>USER</th>
                  <th style={{ padding: "18px 22px" }}>GITHUB</th>
                  <th style={{ padding: "18px 22px" }}>ROLE</th>
                  <th style={{ padding: "18px 22px" }}>SCORE</th>
                  <th style={{ padding: "18px 22px" }}>PRS / REPOS</th>
                  <th style={{ padding: "18px 22px" }}>BADGES</th>
                  <th style={{ padding: "18px 22px", textAlign: "right", whiteSpace: "nowrap" }}>ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {filteredProfiles.length === 0 ? (
                  <tr>
                    <td colSpan={7} style={{ padding: "54px 20px", textAlign: "center", color: "#9ca3af" }}>
                      No users matching criteria.
                    </td>
                  </tr>
                ) : (
                  filteredProfiles.map((user) => (
                    <tr 
                      key={user.id} 
                      style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }} 
                      className="hover:bg-[rgba(255,117,24,0.02)] transition-colors"
                    >
                      {/* User */}
                      <td style={{ padding: "16px 22px" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                          <div style={{ width: "38px", height: "38px", borderRadius: "50%", background: "#1c1c22", overflow: "hidden", border: "1px solid rgba(255,255,255,0.1)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontWeight: 700, color: "#FF8822" }}>
                            {user.avatar_url ? (
                              <img src={user.avatar_url} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                            ) : (
                              <span>{user.full_name?.[0]?.toUpperCase() || "U"}</span>
                            )}
                          </div>
                          <div>
                            <div style={{ fontWeight: 600, color: "white" }}>{user.full_name || "Anonymous"}</div>
                            <div style={{ fontSize: "11px", color: "#6b7280" }}>{user.email || "No email"}</div>
                          </div>
                        </div>
                      </td>

                      {/* GitHub */}
                      <td style={{ padding: "16px 22px" }}>
                        {user.github ? (
                          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                            <a 
                              href={`https://github.com/${user.github}`} 
                              target="_blank" 
                              rel="noreferrer" 
                              style={{ color: "#FF8822", textDecoration: "none", fontWeight: 600, display: "inline-flex", alignItems: "center", gap: "4px" }} 
                              className="hover:underline"
                            >
                              @{user.github}
                              <ExternalLinkIcon className="w-3 h-3 opacity-60" />
                            </a>
                            <button
                              onClick={() => handleSetGithub(user.id, user.github)}
                              title="Change GitHub username"
                              style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", color: "#9ca3af", cursor: "pointer", fontSize: "11px", padding: "3px 6px", borderRadius: "6px" }}
                              className="hover:text-white hover:border-[rgba(255,255,255,0.2)] transition-colors"
                            >
                              Edit
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => handleSetGithub(user.id)}
                            style={{ background: "rgba(255,117,24,0.08)", border: "1px solid rgba(255,117,24,0.25)", color: "#FF8822", padding: "5px 12px", borderRadius: "8px", fontSize: "11px", fontWeight: 600, cursor: "pointer" }}
                            className="hover:bg-[rgba(255,117,24,0.18)] transition-colors"
                          >
                            + Link GitHub
                          </button>
                        )}
                      </td>

                      {/* Role */}
                      <td style={{ padding: "16px 22px" }}>
                        <select
                          value={user.role || "contributor"}
                          onChange={(e) =>
                            handleRoleChange(
                              user.id,
                              e.target.value as "contributor" | "mentor" | "project-admin" | "admin"
                            )
                          }
                          style={{ 
                            background: "#16161c", 
                            border: "1px solid rgba(255,255,255,0.1)", 
                            color: "white", 
                            padding: "6px 12px", 
                            borderRadius: "10px", 
                            fontSize: "12px", 
                            fontWeight: 500,
                            cursor: "pointer", 
                            outline: "none" 
                          }}
                        >
                          <option value="contributor">Contributor</option>
                          <option value="mentor">Mentor</option>
                          <option value="project-admin">Project Admin</option>
                          <option value="admin">Admin</option>
                        </select>
                      </td>

                      {/* Score */}
                      <td style={{ padding: "16px 22px" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                          <span style={{ fontWeight: 700, fontSize: "15px", color: (user.role || "contributor") === "contributor" ? "#fbbf24" : "#6b7280", minWidth: "30px" }}>
                            {user.score ?? 0}
                          </span>
                          {(user.role || "contributor") === "contributor" && (
                            <div style={{ display: "flex", gap: "4px" }}>
                              <button
                                title="+10 Points"
                                onClick={() => handleScoreAdjust(user.id, 10, "add")}
                                style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", color: "#FF8822", padding: "3px 8px", borderRadius: "6px", fontSize: "11px", fontWeight: 600, cursor: "pointer" }}
                                className="hover:bg-[rgba(255,117,24,0.15)] transition-colors"
                              >
                                +10
                              </button>
                              <button
                                title="+50 Points"
                                onClick={() => handleScoreAdjust(user.id, 50, "add")}
                                style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", color: "#FF8822", padding: "3px 8px", borderRadius: "6px", fontSize: "11px", fontWeight: 600, cursor: "pointer" }}
                                className="hover:bg-[rgba(255,117,24,0.15)] transition-colors"
                              >
                                +50
                              </button>
                              <button
                                title="+100 Points"
                                onClick={() => handleScoreAdjust(user.id, 100, "add")}
                                style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", color: "#FF8822", padding: "3px 8px", borderRadius: "6px", fontSize: "11px", fontWeight: 600, cursor: "pointer" }}
                                className="hover:bg-[rgba(255,117,24,0.15)] transition-colors"
                              >
                                +100
                              </button>
                              <button
                                title="Reset to 0"
                                onClick={() => handleScoreAdjust(user.id, 0, "set")}
                                style={{ background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.22)", color: "#f87171", padding: "3px 8px", borderRadius: "6px", fontSize: "11px", fontWeight: 600, cursor: "pointer" }}
                                className="hover:bg-[rgba(239,68,68,0.18)] transition-colors"
                              >
                                0
                              </button>
                            </div>
                          )}
                        </div>
                      </td>

                      {/* PRs / Projects */}
                      <td style={{ padding: "16px 22px" }}>
                        <div style={{ display: "inline-flex", alignItems: "center", gap: "6px", background: "rgba(255,255,255,0.03)", padding: "4px 10px", borderRadius: "8px", border: "1px solid rgba(255,255,255,0.06)", fontSize: "12px", color: "#d1d5db" }}>
                          <span style={{ fontWeight: 600, color: "white" }}>{user.merged_prs ?? 0}</span> PRs
                          <span style={{ opacity: 0.3 }}>•</span>
                          <span style={{ fontWeight: 600, color: "white" }}>{user.projects_count ?? 0}</span> Repos
                        </div>
                      </td>

                      {/* Badges Created */}
                      <td style={{ padding: "16px 22px" }}>
                        <span 
                          style={{ 
                            display: "inline-block", 
                            padding: "3px 8px", 
                            borderRadius: "6px", 
                            fontSize: "11px", 
                            fontWeight: 700, 
                            background: (user.badges_created ?? 0) >= 3 ? "rgba(239,68,68,0.12)" : "rgba(255,255,255,0.04)", 
                            color: (user.badges_created ?? 0) >= 3 ? "#f87171" : "#9ca3af",
                            border: (user.badges_created ?? 0) >= 3 ? "1px solid rgba(239,68,68,0.25)" : "1px solid rgba(255,255,255,0.06)"
                          }}
                        >
                          {(user.badges_created ?? 0)} / 3
                        </span>
                      </td>

                      {/* Actions */}
                      <td style={{ padding: "16px 22px", textAlign: "right", whiteSpace: "nowrap" }}>
                        <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", justifyContent: "flex-end", whiteSpace: "nowrap" }}>
                          {user.github ? (
                            <button
                              onClick={() => handleSingleSync(user)}
                              disabled={syncingId === user.id || deletingUserId === user.id}
                              style={{ 
                                background: "rgba(255,117,24,0.08)", 
                                border: "1px solid rgba(255,117,24,0.25)", 
                                color: "#FF8822", 
                                padding: "7px 14px", 
                                borderRadius: "10px", 
                                fontSize: "12px", 
                                fontWeight: 600, 
                                cursor: syncingId === user.id || deletingUserId === user.id ? "not-allowed" : "pointer",
                                display: "inline-flex",
                                alignItems: "center",
                                gap: "6px",
                                whiteSpace: "nowrap",
                                flexShrink: 0,
                                transition: "all 0.2s"
                              }}
                              className="hover:bg-[rgba(255,117,24,0.18)] active:scale-[0.97] whitespace-nowrap"
                            >
                              <RefreshCwIcon className={`w-3.5 h-3.5 shrink-0 ${syncingId === user.id ? "animate-spin" : ""}`} />
                              <span style={{ whiteSpace: "nowrap" }}>{syncingId === user.id ? "Syncing..." : "Sync PRs"}</span>
                            </button>
                          ) : (
                            <button
                              onClick={() => handleSetGithub(user.id)}
                              disabled={deletingUserId === user.id}
                              style={{ 
                                background: "rgba(255,255,255,0.03)", 
                                border: "1px solid rgba(255,255,255,0.08)", 
                                color: "#9ca3af", 
                                padding: "7px 14px", 
                                borderRadius: "10px", 
                                fontSize: "12px", 
                                cursor: deletingUserId === user.id ? "not-allowed" : "pointer", 
                                whiteSpace: "nowrap",
                                flexShrink: 0,
                                transition: "all 0.2s" 
                              }}
                              className="hover:text-white hover:border-[rgba(255,255,255,0.2)] whitespace-nowrap"
                            >
                              + Set GitHub
                            </button>
                          )}

                          {/* Delete User Button */}
                          <button
                            onClick={() => handlePromptDeleteUser(user)}
                            disabled={deletingUserId === user.id}
                            title={`Delete ${user.full_name || "User"} from database`}
                            style={{
                              background: "rgba(239,68,68,0.08)",
                              border: "1px solid rgba(239,68,68,0.22)",
                              color: "#f87171",
                              padding: "7px 10px",
                              borderRadius: "10px",
                              fontSize: "12px",
                              cursor: deletingUserId === user.id ? "not-allowed" : "pointer",
                              display: "inline-flex",
                              alignItems: "center",
                              justifyContent: "center",
                              flexShrink: 0,
                              transition: "all 0.2s"
                            }}
                            className="hover:bg-[rgba(239,68,68,0.18)] hover:border-[rgba(239,68,68,0.4)] active:scale-[0.96]"
                          >
                            <Trash2Icon className="w-3.5 h-3.5 shrink-0" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    )}

    {/* Project Directory Tab */}
    {activeTab === "projects" && (
      <div style={{ width: "100%" }}>
        {/* Project Filters */}
        <div style={{ width: "100%", display: "flex", gap: "16px", marginBottom: "28px", flexWrap: "wrap", alignItems: "center" }}>
          {/* Search Input with Icon */}
          <div style={{ position: "relative", flex: 1, minWidth: "280px" }}>
            <div style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", color: "#6b7280", pointerEvents: "none" }}>
              <SearchIcon className="w-4 h-4" />
            </div>
            <input
              type="text"
              placeholder="Search projects by title, language, description, or repo URL..."
              value={projectSearch}
              onChange={(e) => setProjectSearch(e.target.value)}
              style={{ 
                width: "100%", 
                background: "#111115", 
                border: "1px solid rgba(255,255,255,0.08)", 
                borderRadius: "12px", 
                padding: "12px 18px 12px 40px", 
                color: "white", 
                fontSize: "14px", 
                outline: "none",
                transition: "border-color 0.2s, box-shadow 0.2s"
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = "#FF7518";
                e.currentTarget.style.boxShadow = "0 0 0 3px rgba(255, 117, 24, 0.12)";
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
                e.currentTarget.style.boxShadow = "none";
              }}
            />
            {projectSearch && (
              <button 
                onClick={() => setProjectSearch("")}
                style={{ position: "absolute", right: "12px", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", color: "#9ca3af", cursor: "pointer", fontSize: "14px" }}
                className="hover:text-white"
              >
                ✕
              </button>
            )}
          </div>

          {/* Language Filter Pills */}
          <div style={{ display: "flex", gap: "6px", background: "rgba(255,255,255,0.02)", padding: "4px", borderRadius: "14px", border: "1px solid rgba(255,255,255,0.06)", flexWrap: "wrap" }}>
            {["all", "TypeScript", "Python", "Go", "Rust", "JavaScript"].map((lang) => {
              const isActive = projectLangFilter.toLowerCase() === lang.toLowerCase();
              return (
                <button
                  key={lang}
                  onClick={() => setProjectLangFilter(lang)}
                  style={{
                    background: isActive ? "linear-gradient(135deg, #FF7518 0%, #FF5500 100%)" : "transparent",
                    color: isActive ? "white" : "#9ca3af",
                    border: "none",
                    padding: "8px 14px",
                    borderRadius: "10px",
                    fontSize: "12px",
                    fontWeight: isActive ? 700 : 500,
                    cursor: "pointer",
                    transition: "all 0.2s",
                    boxShadow: isActive ? "0 2px 10px rgba(255,117,24,0.3)" : "none"
                  }}
                  className={!isActive ? "hover:text-white hover:bg-[rgba(255,255,255,0.03)]" : ""}
                >
                  {lang === "all" ? "All Languages" : lang}
                </button>
              );
            })}
          </div>
        </div>

        {/* Projects Table */}
        <div 
          style={{ 
            width: "100%", 
            background: "linear-gradient(180deg, #121216 0%, #0c0c0f 100%)", 
            border: "1px solid rgba(255,255,255,0.08)", 
            borderRadius: "20px", 
            overflow: "hidden",
            boxShadow: "0 20px 50px -10px rgba(0,0,0,0.65)" 
          }}
        >
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: "13px" }}>
              <thead>
                <tr style={{ background: "rgba(255,255,255,0.02)", borderBottom: "1px solid rgba(255,255,255,0.08)", color: "#9ca3af", fontWeight: 700, fontSize: "11px", letterSpacing: "0.06em" }}>
                  <th style={{ padding: "18px 22px" }}>PROJECT & REPOSITORY</th>
                  <th style={{ padding: "18px 22px" }}>LANGUAGE</th>
                  <th style={{ padding: "18px 22px" }}>COLOR</th>
                  <th style={{ padding: "18px 22px" }}>COMMUNITY STATS</th>
                  <th style={{ padding: "18px 22px" }}>STATUS</th>
                  <th style={{ padding: "18px 22px", textAlign: "right" }}>ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {filteredProjects.length === 0 ? (
                  <tr>
                    <td colSpan={6} style={{ padding: "64px 20px", textAlign: "center", color: "#9ca3af" }}>
                      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "12px" }}>
                        <div style={{ width: "48px", height: "48px", borderRadius: "14px", background: "rgba(255,255,255,0.04)", display: "flex", alignItems: "center", justifyContent: "center", color: "#6b7280" }}>
                          <FolderGitIcon className="w-6 h-6" />
                        </div>
                        <p style={{ fontSize: "15px", fontWeight: 600, color: "#d1d5db", margin: 0 }}>No projects found</p>
                        <p style={{ fontSize: "13px", color: "#6b7280", maxWidth: "380px", margin: 0 }}>
                          No repository records match your criteria. Add a project to showcase it in the public OSC India directory.
                        </p>
                        <div style={{ display: "flex", gap: "10px", marginTop: "8px", flexWrap: "wrap", justifyContent: "center" }}>
                          <button
                            onClick={handleDiscoverProjects}
                            disabled={isDiscoveringRepos}
                            style={{
                              background: "rgba(56, 189, 248, 0.1)",
                              border: "1px solid rgba(56, 189, 248, 0.25)",
                              color: "#38bdf8",
                              padding: "8px 18px",
                              borderRadius: "10px",
                              fontSize: "13px",
                              fontWeight: 700,
                              cursor: isDiscoveringRepos ? "not-allowed" : "pointer",
                              display: "inline-flex",
                              alignItems: "center",
                              gap: "6px"
                            }}
                          >
                            <SearchIcon className="w-3.5 h-3.5" />
                            <span>{isDiscoveringRepos ? "Discovering..." : "Discover via GitHub Topics"}</span>
                          </button>
                          <button
                            onClick={() => setShowAddProjectModal(true)}
                            style={{
                              background: "linear-gradient(135deg, #FF7518 0%, #FF5500 100%)",
                              border: "none",
                              color: "white",
                              padding: "8px 18px",
                              borderRadius: "10px",
                              fontSize: "13px",
                              fontWeight: 700,
                              cursor: "pointer"
                            }}
                          >
                            + Add New Project
                          </button>
                        </div>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredProjects.map((project) => (
                    <tr 
                      key={project.id} 
                      style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }} 
                      className="hover:bg-[rgba(255,117,24,0.02)] transition-colors"
                    >
                      {/* Project & Repository */}
                      <td style={{ padding: "18px 22px", maxWidth: "360px" }}>
                        <div style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
                          <div 
                            style={{ 
                              width: "10px", 
                              height: "10px", 
                              borderRadius: "50%", 
                              background: project.accentColor || "#FF7518",
                              boxShadow: `0 0 10px ${project.accentColor || "#FF7518"}`,
                              marginTop: "6px",
                              flexShrink: 0
                            }} 
                          />
                          <div style={{ minWidth: 0 }}>
                            <div style={{ fontWeight: 700, color: "white", fontSize: "14px", display: "flex", alignItems: "center", gap: "8px" }}>
                              {project.title}
                            </div>
                            <p style={{ fontSize: "12px", color: "#9ca3af", margin: "3px 0 6px", lineHeight: "1.4", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                              {project.description}
                            </p>
                            <a 
                              href={project.githubUrl} 
                              target="_blank" 
                              rel="noreferrer" 
                              style={{ color: "#FF8822", textDecoration: "none", fontSize: "11px", fontWeight: 600, display: "inline-flex", alignItems: "center", gap: "4px" }} 
                              className="hover:underline"
                            >
                              <span style={{ maxWidth: "240px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                                {project.githubUrl.replace("https://github.com/", "")}
                              </span>
                              <ExternalLinkIcon className="w-3 h-3 opacity-70" />
                            </a>
                          </div>
                        </div>
                      </td>

                      {/* Language */}
                      <td style={{ padding: "18px 22px" }}>
                        <span 
                          style={{ 
                            display: "inline-block", 
                            padding: "4px 10px", 
                            borderRadius: "8px", 
                            fontSize: "11px", 
                            fontWeight: 700, 
                            background: "rgba(255,255,255,0.04)", 
                            color: "#e5e7eb",
                            border: "1px solid rgba(255,255,255,0.08)"
                          }}
                        >
                          {project.language || "TypeScript"}
                        </span>
                      </td>

                      {/* Accent Color */}
                      <td style={{ padding: "18px 22px" }}>
                        <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "rgba(255,255,255,0.03)", padding: "4px 10px", borderRadius: "8px", border: "1px solid rgba(255,255,255,0.06)" }}>
                          <span 
                            style={{ 
                              width: "12px", 
                              height: "12px", 
                              borderRadius: "50%", 
                              background: project.accentColor || "#FF7518" 
                            }} 
                          />
                          <span style={{ fontSize: "11px", fontFamily: "monospace", color: "#9ca3af" }}>
                            {project.accentColor || "#FF7518"}
                          </span>
                        </div>
                      </td>

                      {/* Stats */}
                      <td style={{ padding: "18px 22px" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                          <span style={{ display: "inline-flex", alignItems: "center", gap: "4px", fontSize: "12px", color: "#fbbf24", fontWeight: 600 }}>
                            <StarIcon className="w-3.5 h-3.5" />
                            {project.stars || "0"}
                          </span>
                          <span style={{ opacity: 0.3, color: "#6b7280" }}>•</span>
                          <span style={{ display: "inline-flex", alignItems: "center", gap: "4px", fontSize: "12px", color: "#9ca3af", fontWeight: 600 }}>
                            <GitForkIcon className="w-3.5 h-3.5" />
                            {project.forks || "0"}
                          </span>
                        </div>
                      </td>

                      {/* Status */}
                      <td style={{ padding: "18px 22px" }}>
                        {project.id.startsWith("default-") ? (
                          <span style={{ display: "inline-block", padding: "3px 8px", borderRadius: "6px", fontSize: "10px", fontWeight: 700, background: "rgba(56,189,248,0.1)", color: "#38bdf8", border: "1px solid rgba(56,189,248,0.25)" }}>
                            SHOWCASE
                          </span>
                        ) : (
                          <span style={{ display: "inline-block", padding: "3px 8px", borderRadius: "6px", fontSize: "10px", fontWeight: 700, background: "rgba(34,197,94,0.1)", color: "#4ade80", border: "1px solid rgba(34,197,94,0.25)" }}>
                            CUSTOM
                          </span>
                        )}
                      </td>

                      {/* Actions */}
                      <td style={{ padding: "18px 22px", textAlign: "right" }}>
                        <div style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}>
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noreferrer"
                            style={{
                              background: "rgba(255,255,255,0.03)",
                              border: "1px solid rgba(255,255,255,0.08)",
                              color: "#9ca3af",
                              padding: "6px 12px",
                              borderRadius: "8px",
                              fontSize: "12px",
                              fontWeight: 600,
                              textDecoration: "none",
                              display: "inline-flex",
                              alignItems: "center",
                              gap: "4px"
                            }}
                            className="hover:text-white hover:border-[rgba(255,255,255,0.2)] transition-colors"
                          >
                            <span>GitHub</span>
                            <ExternalLinkIcon className="w-3 h-3 opacity-60" />
                          </a>

                          <button
                            onClick={() => handlePromptDeleteProject(project.id, project.title)}
                            disabled={deletingProjectId === project.id}
                            title="Remove project from directory"
                            style={{
                              background: "rgba(239,68,68,0.06)",
                              border: "1px solid rgba(239,68,68,0.2)",
                              color: "#f87171",
                              padding: "6px 10px",
                              borderRadius: "8px",
                              fontSize: "12px",
                              cursor: deletingProjectId === project.id ? "not-allowed" : "pointer",
                              display: "inline-flex",
                              alignItems: "center",
                              gap: "4px",
                              transition: "all 0.2s"
                            }}
                            className="hover:bg-[rgba(239,68,68,0.16)] hover:border-[rgba(239,68,68,0.35)] active:scale-[0.96]"
                          >
                            <Trash2Icon className="w-3.5 h-3.5" />
                            <span>{deletingProjectId === project.id ? "..." : "Remove"}</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    )}

    {/* Add New Project Modal */}
    {/* Add New Project Modal */}
    {showAddProjectModal && (
      <div 
        role="dialog"
        aria-modal="true"
        aria-labelledby="add-project-modal-title"
        className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6"
        style={{ 
          background: "rgba(0, 0, 0, 0.85)", 
          backdropFilter: "blur(16px)", 
          WebkitBackdropFilter: "blur(16px)" 
        }}
        onClick={(e) => {
          if (e.target === e.currentTarget && !isSubmittingProject) {
            setShowAddProjectModal(false);
          }
        }}
      >
        <div 
          style={{ 
            width: "100%", 
            maxWidth: "620px", 
            maxHeight: "min(92vh, 880px)",
            display: "flex",
            flexDirection: "column",
            background: "linear-gradient(180deg, #16161b 0%, #0d0d11 100%)", 
            border: "1px solid rgba(255,255,255,0.12)", 
            borderRadius: "20px", 
            boxShadow: "0 25px 70px -15px rgba(0,0,0,0.95), 0 0 35px rgba(255,117,24,0.1)",
            overflow: "hidden",
            animation: "toastSlideUp 0.25s cubic-bezier(0.16, 1, 0.3, 1) forwards"
          }}
        >
          {/* Top glowing orange accent bar */}
          <div style={{ height: "3px", width: "100%", flexShrink: 0, background: "linear-gradient(90deg, #FF7518 0%, #FF4500 50%, #f97316 100%)" }} />

          {/* Modal Header */}
          <div style={{ padding: "20px 26px 16px", flexShrink: 0, borderBottom: "1px solid rgba(255,255,255,0.07)", display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <div>
              <div style={{ display: "inline-flex", alignItems: "center", gap: "6px", color: "#FF8822", fontSize: "11px", fontWeight: 700, letterSpacing: "0.06em", marginBottom: "4px" }}>
                <FolderPlusIcon className="w-3.5 h-3.5" />
                <span>PROJECT REPOSITORY DIRECTORY</span>
              </div>
              <h3 id="add-project-modal-title" style={{ fontSize: "21px", fontWeight: 800, color: "white", margin: 0, letterSpacing: "-0.02em" }}>
                Add New Project
              </h3>
              <p style={{ fontSize: "13px", color: "#9ca3af", marginTop: "3px", margin: 0 }}>
                Register a repository to showcase in the OSC India public directory.
              </p>
            </div>
            <button 
              onClick={() => !isSubmittingProject && setShowAddProjectModal(false)}
              disabled={isSubmittingProject}
              style={{ 
                background: "rgba(255,255,255,0.04)", 
                border: "1px solid rgba(255,255,255,0.08)", 
                color: "#9ca3af", 
                width: "32px", 
                height: "32px", 
                borderRadius: "10px", 
                display: "flex", 
                alignItems: "center", 
                justifyContent: "center", 
                cursor: isSubmittingProject ? "not-allowed" : "pointer" 
              }}
              className="hover:text-white hover:border-[rgba(255,255,255,0.2)] transition-colors"
              title="Close"
            >
              <XIcon className="w-4 h-4" />
            </button>
          </div>

          {/* Modal Form with Scrollable Body */}
          <form 
            onSubmit={handleAddProject} 
            style={{ 
              display: "flex", 
              flexDirection: "column", 
              flex: 1, 
              minHeight: 0, 
              overflow: "hidden" 
            }}
          >
            {/* Scrollable inputs container */}
            <div 
              style={{ 
                flex: 1, 
                overflowY: "auto", 
                padding: "22px 26px", 
                display: "flex", 
                flexDirection: "column", 
                gap: "18px" 
              }}
              className="custom-scrollbar"
            >
              {/* Project Title */}
              <div>
                <label style={{ display: "block", fontSize: "11.5px", fontWeight: 700, color: "#d1d5db", marginBottom: "6px", letterSpacing: "0.04em" }}>
                  PROJECT TITLE <span style={{ color: "#FF7518" }}>*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g., OSC-India Platform"
                  value={newProject.title}
                  onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                  style={{
                    width: "100%",
                    background: "#0c0c10",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: "10px",
                    padding: "10px 14px",
                    color: "white",
                    fontSize: "13.5px",
                    outline: "none",
                    transition: "border-color 0.2s, box-shadow 0.2s"
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = "#FF7518";
                    e.currentTarget.style.boxShadow = "0 0 0 3px rgba(255, 117, 24, 0.12)";
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                />
              </div>

              {/* GitHub URL */}
              <div>
                <label style={{ display: "block", fontSize: "11.5px", fontWeight: 700, color: "#d1d5db", marginBottom: "6px", letterSpacing: "0.04em" }}>
                  GITHUB REPOSITORY URL <span style={{ color: "#FF7518" }}>*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="https://github.com/open-source-connect-01/OSC-India"
                  value={newProject.githubUrl}
                  onChange={(e) => setNewProject({ ...newProject, githubUrl: e.target.value })}
                  style={{
                    width: "100%",
                    background: "#0c0c10",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: "10px",
                    padding: "10px 14px",
                    color: "white",
                    fontSize: "13.5px",
                    outline: "none",
                    transition: "border-color 0.2s, box-shadow 0.2s"
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = "#FF7518";
                    e.currentTarget.style.boxShadow = "0 0 0 3px rgba(255, 117, 24, 0.12)";
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                />
              </div>

              {/* Tech / Primary Language */}
              <div>
                <label style={{ display: "block", fontSize: "11.5px", fontWeight: 700, color: "#d1d5db", marginBottom: "6px", letterSpacing: "0.04em" }}>
                  PRIMARY LANGUAGE / STACK
                </label>
                <input
                  type="text"
                  placeholder="e.g., TypeScript, Go, Python, Rust"
                  value={newProject.language || ""}
                  onChange={(e) => setNewProject({ ...newProject, language: e.target.value })}
                  style={{
                    width: "100%",
                    background: "#0c0c10",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: "10px",
                    padding: "10px 14px",
                    color: "white",
                    fontSize: "13.5px",
                    outline: "none",
                    marginBottom: "8px",
                    transition: "border-color 0.2s, box-shadow 0.2s"
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = "#FF7518";
                    e.currentTarget.style.boxShadow = "0 0 0 3px rgba(255, 117, 24, 0.12)";
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                />
                {/* Quick Preset Buttons */}
                <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                  {["TypeScript", "Python", "Go", "Rust", "React", "JavaScript", "Java", "C++"].map((l) => {
                    const isSelected = (newProject.language || "").toLowerCase() === l.toLowerCase();
                    return (
                      <button
                        type="button"
                        key={l}
                        onClick={() => setNewProject({ ...newProject, language: l })}
                        style={{
                          background: isSelected ? "rgba(255,117,24,0.15)" : "rgba(255,255,255,0.03)",
                          border: isSelected ? "1px solid #FF7518" : "1px solid rgba(255,255,255,0.08)",
                          color: isSelected ? "#FF8822" : "#9ca3af",
                          padding: "4px 10px",
                          borderRadius: "6px",
                          fontSize: "11px",
                          fontWeight: 600,
                          cursor: "pointer",
                          transition: "all 0.15s"
                        }}
                        className={!isSelected ? "hover:text-white hover:bg-[rgba(255,255,255,0.06)]" : ""}
                      >
                        {l}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Accent Color Selection */}
              <div>
                <label style={{ display: "block", fontSize: "11.5px", fontWeight: 700, color: "#d1d5db", marginBottom: "8px", letterSpacing: "0.04em" }}>
                  ACCENT THEME COLOR
                </label>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap" }}>
                  {[
                    { name: "Orange", hex: "#FF7518" },
                    { name: "Cyan", hex: "#22d3ee" },
                    { name: "Emerald", hex: "#34d399" },
                    { name: "Pink", hex: "#f472b6" },
                    { name: "Purple", hex: "#a855f7" },
                    { name: "Red", hex: "#ef4444" },
                    { name: "Blue", hex: "#3b82f6" },
                    { name: "Amber", hex: "#f59e0b" },
                  ].map((col) => {
                    const isSelected = (newProject.accentColor || "#FF7518").toLowerCase() === col.hex.toLowerCase();
                    return (
                      <button
                        type="button"
                        key={col.hex}
                        onClick={() => setNewProject({ ...newProject, accentColor: col.hex })}
                        title={col.name}
                        style={{
                          width: "28px",
                          height: "28px",
                          borderRadius: "50%",
                          background: col.hex,
                          border: isSelected ? "3px solid white" : "2px solid rgba(0,0,0,0.35)",
                          boxShadow: isSelected ? `0 0 12px ${col.hex}, 0 0 4px white` : "0 2px 6px rgba(0,0,0,0.4)",
                          cursor: "pointer",
                          transform: isSelected ? "scale(1.15)" : "scale(1)",
                          transition: "all 0.15s"
                        }}
                      />
                    );
                  })}

                  {/* Clean Custom Color Picker */}
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", marginLeft: "4px" }}>
                    <label
                      title="Custom Hex Picker"
                      style={{
                        position: "relative",
                        width: "28px",
                        height: "28px",
                        borderRadius: "50%",
                        background: "conic-gradient(from 180deg at 50% 50%, #FF0000 0deg, #FFFF00 60deg, #00FF00 120deg, #00FFFF 180deg, #0000FF 240deg, #FF00FF 300deg, #FF0000 360deg)",
                        padding: "2px",
                        cursor: "pointer",
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        boxShadow: "0 2px 8px rgba(0,0,0,0.5)",
                        border: "2px solid rgba(255,255,255,0.25)"
                      }}
                    >
                      <input
                        type="color"
                        value={newProject.accentColor || "#FF7518"}
                        onChange={(e) => setNewProject({ ...newProject, accentColor: e.target.value })}
                        style={{
                          opacity: 0,
                          position: "absolute",
                          inset: 0,
                          width: "100%",
                          height: "100%",
                          cursor: "pointer"
                        }}
                      />
                      <span 
                        style={{ 
                          width: "14px", 
                          height: "14px", 
                          borderRadius: "50%", 
                          background: newProject.accentColor || "#FF7518", 
                          border: "1.5px solid white", 
                          pointerEvents: "none" 
                        }} 
                      />
                    </label>

                    <span style={{ 
                      fontSize: "12px", 
                      fontFamily: "monospace", 
                      background: "rgba(255,255,255,0.05)", 
                      border: "1px solid rgba(255,255,255,0.1)", 
                      padding: "3px 8px", 
                      borderRadius: "6px", 
                      color: "#d1d5db" 
                    }}>
                      {newProject.accentColor || "#FF7518"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div>
                <label style={{ display: "block", fontSize: "11.5px", fontWeight: 700, color: "#d1d5db", marginBottom: "6px", letterSpacing: "0.04em" }}>
                  DESCRIPTION
                </label>
                <textarea
                  rows={3}
                  placeholder="Short description of the repository and what contributors will build or improve..."
                  value={newProject.description || ""}
                  onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                  style={{
                    width: "100%",
                    background: "#0c0c10",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: "10px",
                    padding: "10px 14px",
                    color: "white",
                    fontSize: "13px",
                    outline: "none",
                    resize: "vertical",
                    lineHeight: 1.5,
                    transition: "border-color 0.2s, box-shadow 0.2s"
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = "#FF7518";
                    e.currentTarget.style.boxShadow = "0 0 0 3px rgba(255, 117, 24, 0.12)";
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                />
              </div>

              {/* Initial Stats (Stars & Forks) */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "11.5px", fontWeight: 700, color: "#d1d5db", marginBottom: "6px", letterSpacing: "0.04em" }}>
                    STARS (DISPLAY)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., 1.2k or 45"
                    value={newProject.stars || ""}
                    onChange={(e) => setNewProject({ ...newProject, stars: e.target.value })}
                    style={{
                      width: "100%",
                      background: "#0c0c10",
                      border: "1px solid rgba(255,255,255,0.1)",
                      borderRadius: "10px",
                      padding: "10px 14px",
                      color: "white",
                      fontSize: "13.5px",
                      outline: "none",
                      transition: "border-color 0.2s, box-shadow 0.2s"
                    }}
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor = "#FF7518";
                      e.currentTarget.style.boxShadow = "0 0 0 3px rgba(255, 117, 24, 0.12)";
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
                      e.currentTarget.style.boxShadow = "none";
                    }}
                  />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "11.5px", fontWeight: 700, color: "#d1d5db", marginBottom: "6px", letterSpacing: "0.04em" }}>
                    FORKS (DISPLAY)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., 340 or 12"
                    value={newProject.forks || ""}
                    onChange={(e) => setNewProject({ ...newProject, forks: e.target.value })}
                    style={{
                      width: "100%",
                      background: "#0c0c10",
                      border: "1px solid rgba(255,255,255,0.1)",
                      borderRadius: "10px",
                      padding: "10px 14px",
                      color: "white",
                      fontSize: "13.5px",
                      outline: "none",
                      transition: "border-color 0.2s, box-shadow 0.2s"
                    }}
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor = "#FF7518";
                      e.currentTarget.style.boxShadow = "0 0 0 3px rgba(255, 117, 24, 0.12)";
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
                      e.currentTarget.style.boxShadow = "none";
                    }}
                  />
                </div>
              </div>

              {/* Card Live Preview (Matches real ProjectCard) */}
              <div>
                <div style={{ fontSize: "11px", fontWeight: 700, color: "#9ca3af", letterSpacing: "0.06em", marginBottom: "8px" }}>
                  PREVIEW CARD (HOW IT WILL APPEAR IN /PROJECTS)
                </div>
                <div 
                  style={{ 
                    backgroundColor: "#131315", 
                    borderRadius: "14px", 
                    border: "1px solid rgba(255, 255, 255, 0.08)", 
                    borderTop: `3.5px solid ${newProject.accentColor || "#FF7518"}`, 
                    padding: "20px 22px",
                    boxShadow: "0 8px 30px rgba(0,0,0,0.6)" 
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "12px" }}>
                    <div 
                      style={{ 
                        width: "36px", 
                        height: "36px", 
                        borderRadius: "10px", 
                        backgroundColor: "rgba(255, 255, 255, 0.05)", 
                        border: "1px solid rgba(255, 255, 255, 0.08)", 
                        display: "flex", 
                        alignItems: "center", 
                        justifyContent: "center",
                        color: "#e5e7eb" 
                      }}
                    >
                      <FolderGitIcon className="w-4 h-4" />
                    </div>
                    <span style={{ fontSize: "10px", fontWeight: 800, color: "#6b7280", letterSpacing: "0.08em" }}>
                      LIVE PREVIEW
                    </span>
                  </div>

                  <h4 style={{ fontSize: "16px", fontWeight: 700, color: "#ffffff", margin: "0 0 6px", letterSpacing: "-0.2px" }}>
                    {newProject.title.trim() || "Project Title"}
                  </h4>

                  <p style={{ fontSize: "12.5px", color: "#9ca3af", lineHeight: "1.5", margin: "0 0 16px", minHeight: "20px" }}>
                    {newProject.description?.trim() || "Short description of the repository and what contributors will build or improve..."}
                  </p>

                  <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "14px" }}>
                    <span style={{ width: "8px", height: "8px", borderRadius: "50%", backgroundColor: newProject.accentColor || "#FF7518", display: "inline-block" }} />
                    <span style={{ fontSize: "12px", fontWeight: 500, color: "#e5e7eb" }}>
                      {newProject.language || "TypeScript"}
                    </span>
                  </div>

                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: "12px", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "14px", color: "#9ca3af", fontSize: "12px" }}>
                      <span style={{ display: "inline-flex", alignItems: "center", gap: "4px" }}>
                        <span style={{ color: "#fbbf24" }}>★</span> {newProject.stars?.trim() || "0"}
                      </span>
                      <span style={{ display: "inline-flex", alignItems: "center", gap: "4px" }}>
                        <GitForkIcon className="w-3.5 h-3.5" /> {newProject.forks?.trim() || "0"}
                      </span>
                    </div>
                    <span style={{ color: "#FF7518", fontWeight: 600, fontSize: "13px", display: "inline-flex", alignItems: "center", gap: "4px" }}>
                      View Project
                      <ExternalLinkIcon className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Buttons (Fixed bottom footer) */}
            <div 
              style={{ 
                display: "flex", 
                justifyContent: "flex-end", 
                gap: "10px", 
                padding: "16px 26px", 
                flexShrink: 0,
                borderTop: "1px solid rgba(255,255,255,0.08)", 
                background: "rgba(13, 13, 17, 0.95)",
                backdropFilter: "blur(12px)"
              }}
            >
              <button
                type="button"
                onClick={() => setShowAddProjectModal(false)}
                disabled={isSubmittingProject}
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  color: "white",
                  padding: "10px 20px",
                  borderRadius: "10px",
                  fontSize: "13px",
                  fontWeight: 600,
                  cursor: isSubmittingProject ? "not-allowed" : "pointer",
                  transition: "all 0.15s"
                }}
                className="hover:bg-[rgba(255,255,255,0.08)] active:scale-[0.98]"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmittingProject}
                style={{
                  background: "linear-gradient(135deg, #FF7518 0%, #FF5500 100%)",
                  border: "none",
                  color: "white",
                  padding: "10px 24px",
                  borderRadius: "10px",
                  fontSize: "13px",
                  fontWeight: 700,
                  cursor: isSubmittingProject ? "not-allowed" : "pointer",
                  opacity: isSubmittingProject ? 0.75 : 1,
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  boxShadow: "0 4px 18px rgba(255, 117, 24, 0.35)",
                  transition: "all 0.15s"
                }}
                className="hover:shadow-[0_6px_24px_rgba(255,117,24,0.5)] active:scale-[0.98]"
              >
                {isSubmittingProject ? (
                  <>
                    <RefreshCwIcon className="w-4 h-4 animate-spin" />
                    <span>Adding Project...</span>
                  </>
                ) : (
                  <>
                    <FolderPlusIcon className="w-4 h-4" />
                    <span>Add Project</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    )}

    {/* Remove Project Confirmation Modal */}
    {projectToDelete && (
      <div 
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="delete-dialog-title"
        aria-describedby="delete-dialog-desc"
        className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
        style={{ 
          background: "rgba(0, 0, 0, 0.8)", 
          backdropFilter: "blur(14px)", 
          WebkitBackdropFilter: "blur(14px)" 
        }}
        onClick={(e) => {
          if (e.target === e.currentTarget && !deletingProjectId) {
            setProjectToDelete(null);
          }
        }}
      >
        <div 
          style={{ 
            width: "100%", 
            maxWidth: "460px", 
            background: "linear-gradient(180deg, #17171d 0%, #0d0d11 100%)", 
            border: "1px solid rgba(239, 68, 68, 0.3)", 
            borderRadius: "20px", 
            boxShadow: "0 25px 60px -15px rgba(0, 0, 0, 0.9), 0 0 35px rgba(239, 68, 68, 0.12)",
            overflow: "hidden",
            animation: "toastSlideUp 0.25s cubic-bezier(0.16, 1, 0.3, 1) forwards"
          }}
        >
          {/* Crimson accent line */}
          <div style={{ height: "3px", width: "100%", background: "linear-gradient(90deg, #ef4444 0%, #f97316 100%)" }} />

          <div style={{ padding: "28px 26px 24px" }}>
            {/* Top row: Alert Icon and Close Button */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "18px" }}>
              <div 
                style={{ 
                  width: "48px", 
                  height: "48px", 
                  borderRadius: "14px", 
                  background: "rgba(239, 68, 68, 0.12)", 
                  border: "1px solid rgba(239, 68, 68, 0.25)", 
                  display: "flex", 
                  alignItems: "center", 
                  justifyContent: "center", 
                  color: "#f87171",
                  boxShadow: "0 0 20px rgba(239, 68, 68, 0.15)"
                }}
              >
                <Trash2Icon className="w-5 h-5" />
              </div>

              <button 
                onClick={() => !deletingProjectId && setProjectToDelete(null)}
                disabled={Boolean(deletingProjectId)}
                style={{ 
                  background: "rgba(255, 255, 255, 0.04)", 
                  border: "1px solid rgba(255, 255, 255, 0.08)", 
                  color: "#9ca3af", 
                  width: "32px", 
                  height: "32px", 
                  borderRadius: "10px", 
                  display: "flex", 
                  alignItems: "center", 
                  justifyContent: "center", 
                  cursor: deletingProjectId ? "not-allowed" : "pointer" 
                }}
                className="hover:text-white hover:border-[rgba(255,255,255,0.2)] transition-colors"
                title="Cancel"
              >
                <XIcon className="w-4 h-4" />
              </button>
            </div>

            {/* Title & Description */}
            <h3 
              id="delete-dialog-title"
              style={{ fontSize: "20px", fontWeight: 800, color: "#ffffff", margin: "0 0 10px", letterSpacing: "-0.02em" }}
            >
              Remove Project?
            </h3>

            <p id="delete-dialog-desc" style={{ fontSize: "14px", color: "#9ca3af", lineHeight: "1.55", margin: "0 0 18px" }}>
              Are you sure you want to remove{" "}
              <span style={{ color: "#ffffff", fontWeight: 700 }}>
                &ldquo;{projectToDelete.title}&rdquo;
              </span>{" "}
              from active projects?
            </p>

            {/* Warning callout banner */}
            <div 
              style={{ 
                display: "flex", 
                alignItems: "flex-start", 
                gap: "10px", 
                padding: "12px 14px", 
                borderRadius: "12px", 
                background: "rgba(239, 68, 68, 0.06)", 
                border: "1px solid rgba(239, 68, 68, 0.18)", 
                marginBottom: "24px" 
              }}
            >
              <AlertCircleIcon className="w-4 h-4 text-red-400 mt-0.5 shrink-0" />
              <span style={{ fontSize: "12px", color: "#d1d5db", lineHeight: "1.45" }}>
                This repository will be removed from the public showcase in the <strong style={{ color: "#ffffff" }}>/projects</strong> directory.
              </span>
            </div>

            {/* Action Buttons */}
            <div style={{ display: "flex", gap: "10px", justifyContent: "flex-end" }}>
              <button
                type="button"
                onClick={() => setProjectToDelete(null)}
                disabled={Boolean(deletingProjectId)}
                style={{
                  background: "rgba(255, 255, 255, 0.04)",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  color: "white",
                  padding: "10px 18px",
                  borderRadius: "12px",
                  fontSize: "13px",
                  fontWeight: 600,
                  cursor: deletingProjectId ? "not-allowed" : "pointer",
                  transition: "all 0.15s"
                }}
                className="hover:bg-[rgba(255,255,255,0.08)] active:scale-[0.98]"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleConfirmDeleteProject}
                disabled={Boolean(deletingProjectId)}
                style={{
                  background: "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)",
                  border: "none",
                  color: "white",
                  padding: "10px 22px",
                  borderRadius: "12px",
                  fontSize: "13px",
                  fontWeight: 700,
                  cursor: deletingProjectId ? "not-allowed" : "pointer",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  boxShadow: "0 4px 16px rgba(239, 68, 68, 0.35)",
                  transition: "all 0.15s",
                  opacity: deletingProjectId ? 0.8 : 1
                }}
                className="hover:shadow-[0_6px_22px_rgba(239,68,68,0.5)] active:scale-[0.98]"
              >
                {deletingProjectId ? (
                  <>
                    <RefreshCwIcon className="w-3.5 h-3.5 animate-spin" />
                    <span>Removing...</span>
                  </>
                ) : (
                  <>
                    <Trash2Icon className="w-3.5 h-3.5" />
                    <span>Yes, Remove</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    )}

    {/* Remove All Projects Confirmation Modal */}
    {showDeleteAllProjectsModal && (
      <div 
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="delete-all-projects-dialog-title"
        aria-describedby="delete-all-projects-dialog-desc"
        className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
        style={{ 
          background: "rgba(0, 0, 0, 0.8)", 
          backdropFilter: "blur(14px)", 
          WebkitBackdropFilter: "blur(14px)" 
        }}
        onClick={(e) => {
          if (e.target === e.currentTarget && !isDeletingAllProjects) {
            setShowDeleteAllProjectsModal(false);
          }
        }}
      >
        <div 
          style={{ 
            width: "100%", 
            maxWidth: "480px", 
            background: "linear-gradient(180deg, #17171d 0%, #0d0d11 100%)", 
            border: "1px solid rgba(239, 68, 68, 0.35)", 
            borderRadius: "20px", 
            boxShadow: "0 25px 60px -15px rgba(0, 0, 0, 0.9), 0 0 35px rgba(239, 68, 68, 0.15)",
            overflow: "hidden",
            animation: "toastSlideUp 0.25s cubic-bezier(0.16, 1, 0.3, 1) forwards"
          }}
        >
          {/* Crimson accent line */}
          <div style={{ height: "3px", width: "100%", background: "linear-gradient(90deg, #ef4444 0%, #f97316 100%)" }} />

          <div style={{ padding: "28px 26px 24px" }}>
            {/* Top row: Alert Icon and Close Button */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "18px" }}>
              <div 
                style={{ 
                  width: "48px", 
                  height: "48px", 
                  borderRadius: "14px", 
                  background: "rgba(239, 68, 68, 0.12)", 
                  border: "1px solid rgba(239, 68, 68, 0.25)", 
                  display: "flex", 
                  alignItems: "center", 
                  justifyContent: "center", 
                  color: "#f87171",
                  boxShadow: "0 0 20px rgba(239, 68, 68, 0.15)"
                }}
              >
                <Trash2Icon className="w-5 h-5" />
              </div>

              <button 
                onClick={() => !isDeletingAllProjects && setShowDeleteAllProjectsModal(false)}
                disabled={Boolean(isDeletingAllProjects)}
                style={{ 
                  background: "rgba(255, 255, 255, 0.04)", 
                  border: "1px solid rgba(255, 255, 255, 0.08)", 
                  color: "#9ca3af", 
                  width: "32px", 
                  height: "32px", 
                  borderRadius: "10px", 
                  display: "flex", 
                  alignItems: "center", 
                  justifyContent: "center", 
                  cursor: isDeletingAllProjects ? "not-allowed" : "pointer" 
                }}
                className="hover:text-white hover:border-[rgba(255,255,255,0.2)] transition-colors"
                title="Cancel"
              >
                <XIcon className="w-4 h-4" />
              </button>
            </div>

            {/* Title & Description */}
            <h3 
              id="delete-all-projects-dialog-title"
              style={{ fontSize: "20px", fontWeight: 800, color: "#ffffff", margin: "0 0 10px", letterSpacing: "-0.02em" }}
            >
              Permanently Remove All Projects?
            </h3>

            <p id="delete-all-projects-dialog-desc" style={{ fontSize: "14px", color: "#9ca3af", lineHeight: "1.55", margin: "0 0 18px" }}>
              Are you sure you want to permanently delete all{" "}
              <strong style={{ color: "#ffffff" }}>{projects.length} projects</strong> from the database? This cannot be undone.
            </p>

            {/* Warning callout banner */}
            <div 
              style={{ 
                display: "flex", 
                alignItems: "flex-start", 
                gap: "10px", 
                padding: "12px 14px", 
                borderRadius: "12px", 
                background: "rgba(239, 68, 68, 0.08)", 
                border: "1px solid rgba(239, 68, 68, 0.22)", 
                marginBottom: "24px" 
              }}
            >
              <AlertCircleIcon className="w-4 h-4 text-red-400 mt-0.5 shrink-0" />
              <span style={{ fontSize: "12px", color: "#fca5a5", lineHeight: "1.45" }}>
                All projects will be permanently wiped from the database and will not appear in the <strong style={{ color: "#ffffff" }}>/projects</strong> directory or on page reload.
              </span>
            </div>

            {/* Action Buttons */}
            <div style={{ display: "flex", gap: "10px", justifyContent: "flex-end" }}>
              <button
                type="button"
                onClick={() => setShowDeleteAllProjectsModal(false)}
                disabled={Boolean(isDeletingAllProjects)}
                style={{
                  background: "rgba(255, 255, 255, 0.04)",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  color: "white",
                  padding: "10px 18px",
                  borderRadius: "12px",
                  fontSize: "13px",
                  fontWeight: 600,
                  cursor: isDeletingAllProjects ? "not-allowed" : "pointer",
                  transition: "all 0.15s"
                }}
                className="hover:bg-[rgba(255,255,255,0.08)] active:scale-[0.98]"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleConfirmDeleteAllProjects}
                disabled={Boolean(isDeletingAllProjects)}
                style={{
                  background: "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)",
                  border: "none",
                  color: "white",
                  padding: "10px 22px",
                  borderRadius: "12px",
                  fontSize: "13px",
                  fontWeight: 700,
                  cursor: isDeletingAllProjects ? "not-allowed" : "pointer",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  boxShadow: "0 4px 16px rgba(239, 68, 68, 0.35)",
                  transition: "all 0.15s",
                  opacity: isDeletingAllProjects ? 0.8 : 1
                }}
                className="hover:shadow-[0_6px_22px_rgba(239,68,68,0.5)] active:scale-[0.98]"
              >
                {isDeletingAllProjects ? (
                  <>
                    <RefreshCwIcon className="w-3.5 h-3.5 animate-spin" />
                    <span>Removing All...</span>
                  </>
                ) : (
                  <>
                    <Trash2Icon className="w-3.5 h-3.5" />
                    <span>Yes, Remove All Projects</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    )}

    {/* Remove User Confirmation Modal */}
    {userToDelete && (
      <div 
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="delete-user-dialog-title"
        aria-describedby="delete-user-dialog-desc"
        className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
        style={{ 
          background: "rgba(0, 0, 0, 0.8)", 
          backdropFilter: "blur(14px)", 
          WebkitBackdropFilter: "blur(14px)" 
        }}
        onClick={(e) => {
          if (e.target === e.currentTarget && !deletingUserId) {
            setUserToDelete(null);
          }
        }}
      >
        <div 
          style={{ 
            width: "100%", 
            maxWidth: "460px", 
            background: "linear-gradient(180deg, #17171d 0%, #0d0d11 100%)", 
            border: "1px solid rgba(239, 68, 68, 0.3)", 
            borderRadius: "20px", 
            boxShadow: "0 25px 60px -15px rgba(0, 0, 0, 0.9), 0 0 35px rgba(239, 68, 68, 0.12)",
            overflow: "hidden",
            animation: "toastSlideUp 0.25s cubic-bezier(0.16, 1, 0.3, 1) forwards"
          }}
        >
          {/* Crimson accent line */}
          <div style={{ height: "3px", width: "100%", background: "linear-gradient(90deg, #ef4444 0%, #dc2626 100%)" }} />

          <div style={{ padding: "28px 26px 24px" }}>
            {/* Top row: Alert Icon and Close Button */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "18px" }}>
              <div 
                style={{ 
                  width: "48px", 
                  height: "48px", 
                  borderRadius: "14px", 
                  background: "rgba(239, 68, 68, 0.12)", 
                  border: "1px solid rgba(239, 68, 68, 0.25)", 
                  display: "flex", 
                  alignItems: "center", 
                  justifyContent: "center", 
                  color: "#f87171",
                  boxShadow: "0 0 20px rgba(239, 68, 68, 0.15)"
                }}
              >
                <Trash2Icon className="w-5 h-5" />
              </div>

              <button 
                onClick={() => !deletingUserId && setUserToDelete(null)}
                disabled={Boolean(deletingUserId)}
                style={{ 
                  background: "rgba(255, 255, 255, 0.04)", 
                  border: "1px solid rgba(255, 255, 255, 0.08)", 
                  color: "#9ca3af", 
                  width: "32px", 
                  height: "32px", 
                  borderRadius: "10px", 
                  display: "flex", 
                  alignItems: "center", 
                  justifyContent: "center", 
                  cursor: deletingUserId ? "not-allowed" : "pointer" 
                }}
                className="hover:text-white hover:border-[rgba(255,255,255,0.2)] transition-colors"
                title="Cancel"
              >
                <XIcon className="w-4 h-4" />
              </button>
            </div>

            {/* Title & Description */}
            <h3 
              id="delete-user-dialog-title"
              style={{ fontSize: "20px", fontWeight: 800, color: "#ffffff", margin: "0 0 10px", letterSpacing: "-0.02em" }}
            >
              Delete User Permanently?
            </h3>

            <p id="delete-user-dialog-desc" style={{ fontSize: "14px", color: "#9ca3af", lineHeight: "1.55", margin: "0 0 24px" }}>
              Are you sure you want to permanently delete{" "}
              <span style={{ color: "#ffffff", fontWeight: 700 }}>
                {userToDelete.name}
              </span>
              {userToDelete.email ? ` (${userToDelete.email})` : ""}?
            </p>

            {/* Action Buttons */}
            <div style={{ display: "flex", gap: "10px", justifyContent: "flex-end" }}>
              <button
                type="button"
                onClick={() => setUserToDelete(null)}
                disabled={Boolean(deletingUserId)}
                style={{
                  background: "rgba(255, 255, 255, 0.04)",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  color: "white",
                  padding: "10px 18px",
                  borderRadius: "12px",
                  fontSize: "13px",
                  fontWeight: 600,
                  cursor: deletingUserId ? "not-allowed" : "pointer",
                  transition: "all 0.15s"
                }}
                className="hover:bg-[rgba(255,255,255,0.08)] active:scale-[0.98]"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleConfirmDeleteUser}
                disabled={Boolean(deletingUserId)}
                style={{
                  background: "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)",
                  border: "none",
                  color: "white",
                  padding: "10px 22px",
                  borderRadius: "12px",
                  fontSize: "13px",
                  fontWeight: 700,
                  cursor: deletingUserId ? "not-allowed" : "pointer",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  boxShadow: "0 4px 16px rgba(239, 68, 68, 0.35)",
                  transition: "all 0.15s",
                  opacity: deletingUserId ? 0.8 : 1
                }}
                className="hover:shadow-[0_6px_22px_rgba(239,68,68,0.5)] active:scale-[0.98]"
              >
                {deletingUserId ? (
                  <>
                    <RefreshCwIcon className="w-3.5 h-3.5 animate-spin" />
                    <span>Deleting...</span>
                  </>
                ) : (
                  <>
                    <Trash2Icon className="w-3.5 h-3.5" />
                    <span>Confirm Delete</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    )}
  </main>

      {/* Side Toast Notification */}
      {toast && (
        <div 
          role="status"
          aria-live="polite"
          onMouseEnter={() => setToastPaused(true)}
          onMouseLeave={() => setToastPaused(false)}
          className="fixed bottom-6 right-6 z-[9999] flex flex-col overflow-hidden"
          style={{ 
            maxWidth: "calc(100vw - 32px)", 
            width: "360px",
            background: "linear-gradient(180deg, #16161b 0%, #0d0d11 100%)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            border: toast.type === "error" ? "1px solid rgba(239, 68, 68, 0.35)" : "1px solid rgba(255, 255, 255, 0.1)",
            borderRadius: "14px",
            boxShadow: toast.type === "error" 
              ? "0 20px 45px -10px rgba(0, 0, 0, 0.85), 0 0 24px rgba(239, 68, 68, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.12)"
              : "0 20px 45px -10px rgba(0, 0, 0, 0.85), 0 0 24px rgba(255, 117, 24, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.12)",
            animation: "toastSlideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards",
          }}
        >
          <div style={{ padding: "12px 14px", display: "flex", alignItems: "center", gap: "11px" }}>
            {/* Minimalist circular status icon */}
            <div 
              style={{ 
                width: "24px", 
                height: "24px", 
                borderRadius: "50%", 
                background: toast.type === "error" ? "rgba(239, 68, 68, 0.15)" : "rgba(255, 117, 24, 0.15)", 
                color: toast.type === "error" ? "#f87171" : "#FF7518",
                display: "flex", 
                alignItems: "center", 
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              {toast.type === "error" ? (
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
              ) : toast.type === "info" ? (
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                </svg>
              ) : (
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              )}
            </div>

            {/* Message text */}
            <div style={{ flex: 1, minWidth: 0 }}>
              <p style={{ fontSize: "13px", color: "#f3f4f6", fontWeight: 500, margin: 0, lineHeight: "1.45", wordBreak: "break-word" }}>
                {toast.message}
              </p>
            </div>

            {/* Subtle close button */}
            <button 
              onClick={() => setToast(null)} 
              style={{ 
                background: "transparent", 
                border: "none", 
                color: "#6b7280", 
                cursor: "pointer", 
                width: "22px", 
                height: "22px", 
                borderRadius: "6px", 
                display: "flex", 
                alignItems: "center", 
                justifyContent: "center",
                flexShrink: 0,
                padding: 0,
                transition: "color 0.15s, background-color 0.15s"
              }}
              className="hover:text-white hover:bg-[rgba(255,255,255,0.08)] active:scale-95"
              title="Dismiss"
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>

          {/* Ultra-sleek progress line */}
          <div style={{ width: "100%", height: "1.5px", background: "rgba(255, 255, 255, 0.04)", overflow: "hidden" }}>
            <div 
              style={{ 
                height: "100%", 
                background: toast.type === "error" 
                  ? "linear-gradient(90deg, #ef4444, #dc2626)" 
                  : "linear-gradient(90deg, #FF7518, #FF5500)", 
                animation: "toastProgress 4s linear forwards",
                animationPlayState: toastPaused ? "paused" : "running"
              }} 
            />
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}

