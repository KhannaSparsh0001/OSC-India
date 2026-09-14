-- ==============================================================================
-- OSC-India: Migration 0004 - Fix handle_new_user trigger to set user_id
-- The original trigger only sets profiles.id but not profiles.user_id,
-- causing dashboard/leaderboard lookups by user_id to fail and roles to
-- incorrectly default to 'contributor'.
-- ==============================================================================

-- 1. Replace the trigger function to also populate user_id on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
DECLARE
  extracted_github TEXT;
BEGIN
  -- Extract github handle if user logged in with GitHub OAuth
  extracted_github := COALESCE(
    new.raw_user_meta_data->>'user_name',
    new.raw_user_meta_data->>'preferred_username',
    NULL
  );

  INSERT INTO public.profiles (
    id,
    user_id,
    full_name, 
    email, 
    avatar_url, 
    github, 
    role, 
    is_admin, 
    score, 
    merged_prs, 
    projects_count, 
    badges_created,
    tech_stack
  )
  VALUES (
    new.id,
    new.id,
    COALESCE(new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'name', split_part(new.email, '@', 1)),
    new.email,
    COALESCE(new.raw_user_meta_data->>'avatar_url', new.raw_user_meta_data->>'picture', NULL),
    extracted_github,
    'contributor',
    FALSE,
    0,
    0,
    0,
    0,
    '{}'
  )
  ON CONFLICT (id) DO UPDATE SET
    full_name = EXCLUDED.full_name,
    email = EXCLUDED.email,
    avatar_url = COALESCE(public.profiles.avatar_url, EXCLUDED.avatar_url),
    github = COALESCE(public.profiles.github, EXCLUDED.github),
    user_id = COALESCE(public.profiles.user_id, EXCLUDED.user_id),
    updated_at = now();

  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 2. Backfill any existing profiles where user_id is still NULL
UPDATE public.profiles SET user_id = id WHERE user_id IS NULL;
