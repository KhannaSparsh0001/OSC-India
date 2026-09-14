-- ==============================================================================
-- OSC-India: Migration 0003 - Performance & Scaling Indexes for 10k Users
-- Adds user_id mapping column, composite leaderboard indexes, and partial indexes
-- ==============================================================================

-- 1. Ensure user_id column exists on public.profiles and maps to auth.users(id)
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE;

-- Backfill user_id with id for existing rows where id was the auth.users PK
UPDATE public.profiles SET user_id = id WHERE user_id IS NULL;

-- Create unique index on user_id for fast lookups and upsert conflict resolution
CREATE UNIQUE INDEX IF NOT EXISTS idx_profiles_user_id ON public.profiles (user_id);

-- 2. Fast contributions lookup by user and project
CREATE INDEX IF NOT EXISTS idx_contributions_user_id ON public.contributions (user_id);
CREATE INDEX IF NOT EXISTS idx_contributions_project_id ON public.contributions (project_id);
CREATE INDEX IF NOT EXISTS idx_contributions_status_pts ON public.contributions (status, points_awarded);

-- 3. Leaderboard composite & ordering indexes
CREATE INDEX IF NOT EXISTS idx_profiles_score_prs ON public.profiles (score DESC, merged_prs DESC);
CREATE INDEX IF NOT EXISTS idx_leaderboard_total_points ON public.leaderboard_stats (total_points DESC);

-- 4. Partial index: Only active contributors participating in leaderboard ranking
CREATE INDEX IF NOT EXISTS idx_profiles_contributors_ranking 
  ON public.profiles (score DESC, merged_prs DESC) 
  WHERE role = 'contributor' AND is_admin = false;
