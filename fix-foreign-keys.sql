-- Drop existing foreign keys that might point to public.users
ALTER TABLE public.profiles DROP CONSTRAINT IF EXISTS profiles_user_id_fkey;
ALTER TABLE public.contributions DROP CONSTRAINT IF EXISTS contributions_user_id_fkey;
ALTER TABLE public.leaderboard_stats DROP CONSTRAINT IF EXISTS leaderboard_stats_user_id_fkey;

-- Add correct foreign keys pointing to next_auth.users
ALTER TABLE public.profiles 
  ADD CONSTRAINT profiles_user_id_fkey 
  FOREIGN KEY (user_id) REFERENCES next_auth.users(id) ON DELETE CASCADE;

ALTER TABLE public.contributions 
  ADD CONSTRAINT contributions_user_id_fkey 
  FOREIGN KEY (user_id) REFERENCES next_auth.users(id) ON DELETE CASCADE;

ALTER TABLE public.leaderboard_stats 
  ADD CONSTRAINT leaderboard_stats_user_id_fkey 
  FOREIGN KEY (user_id) REFERENCES next_auth.users(id) ON DELETE CASCADE;
