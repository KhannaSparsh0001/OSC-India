# Further Development Assistance

Welcome to the Open Source Connect India (OSCI) codebase! If you are a developer taking over or contributing to the next phases of this project, this guide will help you understand what has been completed and what the immediate next priorities are.

## What's Completed (Phases 1-4)
1. **Frontend UI**: The main pages (Home, Dashboard, Leaderboard, Badge Generator, Projects, Team) have been built using Next.js App Router, TailwindCSS, and a custom futuristic dark theme.
2. **Database Schema**: A PostgreSQL schema is prepared in `DATABASE_SCHEMA.md` and `supabase/migrations/0000_initial_schema.sql` (Tables: `users`, `profiles`, `roles`, `projects`, `contributions`, `leaderboard_stats`).
3. **Dynamic Data Integration**:
   - The **Dashboard** fetches real session data and leaderboard stats.
   - The **Leaderboard** automatically queries the top 100 users and supports client-side searching.
   - The **Badge Generator** detects the user's role and applies premium themes (e.g., Gold for Mentors).
4. **GitHub Cron Job**: A Vercel Cron Job API route (`/api/cron/sync-github`) is set up to automatically sync merged PRs from GitHub to the database and assign points.

## Immediate Next Steps & Priorities

### 1. Environment Variables Setup
Before the dynamic features will work, you need to set up a Supabase project and provide the following environment variables in `.env`:
```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# NextAuth (Auth.js)
AUTH_SECRET=generate_a_random_secret

# GitHub OAuth
AUTH_GITHUB_ID=your_github_oauth_id
AUTH_GITHUB_SECRET=your_github_oauth_secret

# Vercel Cron Job
CRON_SECRET=your_secure_cron_secret
GITHUB_PAT=your_github_personal_access_token (To bypass GitHub API rate limits)
```

### 2. Additional Authentication Providers
Currently, NextAuth is configured for GitHub OAuth (`auth.ts`). 
- **Google OAuth**: Add the Google provider to `auth.ts`.
- **Password-based Auth**: Add the Credentials provider. You'll need to create a secure login/signup flow to hash passwords and store them securely, mapping them to the Supabase `users` table.

### 3. Mentor & Project Admin Onboarding
We need a robust workflow for "Project Admins" and "Mentors" to log in. Since these roles should not be self-assignable by random public users:
- Create an Admin Dashboard where super-admins can invite users or upgrade their roles.
- Alternatively, implement a whitelist of emails or GitHub IDs that automatically receive Admin/Mentor roles upon their first login.

### 4. Live Testing
- Execute the Supabase migration file (`supabase/migrations/0000_initial_schema.sql`) in your remote Supabase instance.
- Run the Next.js development server and verify that the Auth flow populates the database and triggers create the `profiles` and `leaderboard_stats` rows correctly.
- Test the `/api/cron/sync-github` route manually via Postman/cURL with the `Authorization: Bearer <CRON_SECRET>` header to ensure GitHub PRs are successfully syncing into the `contributions` table.

Happy coding! If you need any architectural context, refer to `NEXT_PLANS.md` and the artifacts in this repository.
