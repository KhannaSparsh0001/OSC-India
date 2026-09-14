/**
 * Shared database types for the OSC-India project.
 * Profile is the canonical user record stored in public.profiles.
 */

export interface Profile {
  id: string;
  user_id?: string;
  full_name: string | null;
  email: string | null;
  github: string | null;
  linkedin: string | null;
  phone: string | null;
  country_code: string | null;
  country: string | null;
  nexfellow_id: string | null;
  avatar_url: string | null;
  role: "contributor" | "mentor" | "project-admin" | "admin";
  is_admin: boolean;
  score: number;
  merged_prs: number;
  projects_count: number;
  badges_created: number;
  tech_stack?: string[];
  created_at: string;
  updated_at: string;
}
