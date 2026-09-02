-- 1. Create the schema and grant basic usage
CREATE SCHEMA IF NOT EXISTS next_auth;
GRANT USAGE ON SCHEMA next_auth TO service_role;
GRANT ALL ON SCHEMA next_auth TO postgres;

-- 2. Create public roles
CREATE TABLE IF NOT EXISTS public.roles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR NOT NULL UNIQUE,
  permissions JSONB DEFAULT '{}'::jsonb
);

-- Insert Default Roles (ignore if they exist)
INSERT INTO public.roles (name) VALUES 
('Contributor'),
('Mentor'),
('Project Admin')
ON CONFLICT (name) DO NOTHING;

-- 3. Create next_auth tables
CREATE TABLE IF NOT EXISTS next_auth.users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR,
  email VARCHAR UNIQUE,
  "emailVerified" TIMESTAMP WITH TIME ZONE,
  image VARCHAR,
  role_id UUID REFERENCES public.roles(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS next_auth.accounts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  "userId" UUID NOT NULL REFERENCES next_auth.users(id) ON DELETE CASCADE,
  type VARCHAR NOT NULL,
  provider VARCHAR NOT NULL,
  "providerAccountId" VARCHAR NOT NULL,
  refresh_token TEXT,
  access_token TEXT,
  expires_at BIGINT,
  token_type VARCHAR,
  scope VARCHAR,
  id_token TEXT,
  session_state VARCHAR,
  UNIQUE(provider, "providerAccountId")
);

CREATE TABLE IF NOT EXISTS next_auth.sessions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  "sessionToken" VARCHAR NOT NULL UNIQUE,
  "userId" UUID NOT NULL REFERENCES next_auth.users(id) ON DELETE CASCADE,
  expires TIMESTAMP WITH TIME ZONE NOT NULL
);

CREATE TABLE IF NOT EXISTS next_auth.verification_tokens (
  identifier VARCHAR,
  token VARCHAR UNIQUE,
  expires TIMESTAMP WITH TIME ZONE NOT NULL,
  PRIMARY KEY (identifier, token)
);

-- 4. Create public profile/project/contribution tables
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL UNIQUE REFERENCES next_auth.users(id) ON DELETE CASCADE,
  full_name VARCHAR,
  avatar_url VARCHAR,
  bio TEXT,
  tech_stack TEXT[] DEFAULT '{}'
);

CREATE TABLE IF NOT EXISTS public.projects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR NOT NULL,
  github_repo_url VARCHAR NOT NULL UNIQUE,
  description TEXT
);

CREATE TABLE IF NOT EXISTS public.contributions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES next_auth.users(id) ON DELETE CASCADE,
  project_id UUID NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
  type VARCHAR NOT NULL CHECK (type IN ('pr', 'issue', 'commit')),
  github_url VARCHAR NOT NULL UNIQUE,
  status VARCHAR NOT NULL CHECK (status IN ('open', 'merged', 'closed')),
  points_awarded INTEGER DEFAULT 0,
  contributed_at TIMESTAMP WITH TIME ZONE NOT NULL
);

CREATE TABLE IF NOT EXISTS public.leaderboard_stats (
  user_id UUID PRIMARY KEY REFERENCES next_auth.users(id) ON DELETE CASCADE,
  total_points INTEGER DEFAULT 0,
  current_streak INTEGER DEFAULT 0,
  rank INTEGER,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. Set up Triggers (Using DROP FIRST to avoid conflicts)
DROP FUNCTION IF EXISTS public.handle_new_user CASCADE;
CREATE OR REPLACE FUNCTION public.handle_new_user() 
RETURNS TRIGGER AS $$
DECLARE
  default_role_id UUID;
BEGIN
  SELECT id INTO default_role_id FROM public.roles WHERE name = 'Contributor';
  NEW.role_id = default_role_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created_before
  BEFORE INSERT ON next_auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

DROP FUNCTION IF EXISTS public.handle_new_user_after CASCADE;
CREATE OR REPLACE FUNCTION public.handle_new_user_after() 
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (user_id, full_name, avatar_url)
  VALUES (NEW.id, NEW.name, NEW.image);
  
  INSERT INTO public.leaderboard_stats (user_id)
  VALUES (NEW.id);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created_after
  AFTER INSERT ON next_auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user_after();

DROP FUNCTION IF EXISTS public.update_leaderboard_points CASCADE;
CREATE OR REPLACE FUNCTION public.update_leaderboard_points() 
RETURNS TRIGGER AS $$
BEGIN
  UPDATE public.leaderboard_stats
  SET 
    total_points = (
      SELECT COALESCE(SUM(points_awarded), 0)
      FROM public.contributions
      WHERE user_id = NEW.user_id AND status = 'merged'
    ),
    updated_at = NOW()
  WHERE user_id = NEW.user_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_contribution_added
  AFTER INSERT OR UPDATE ON public.contributions
  FOR EACH ROW EXECUTE PROCEDURE public.update_leaderboard_points();

-- 6. Enable RLS and Policies
ALTER TABLE public.roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE next_auth.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE next_auth.accounts ENABLE ROW LEVEL SECURITY;
ALTER TABLE next_auth.sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contributions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.leaderboard_stats ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Enable read access for all users" ON public.roles;
CREATE POLICY "Enable read access for all users" ON public.roles FOR SELECT USING (true);
DROP POLICY IF EXISTS "Enable read access for all users" ON next_auth.users;
CREATE POLICY "Enable read access for all users" ON next_auth.users FOR SELECT USING (true);
DROP POLICY IF EXISTS "Enable read access for all users" ON public.profiles;
CREATE POLICY "Enable read access for all users" ON public.profiles FOR SELECT USING (true);
DROP POLICY IF EXISTS "Enable read access for all users" ON public.projects;
CREATE POLICY "Enable read access for all users" ON public.projects FOR SELECT USING (true);
DROP POLICY IF EXISTS "Enable read access for all users" ON public.contributions;
CREATE POLICY "Enable read access for all users" ON public.contributions FOR SELECT USING (true);
DROP POLICY IF EXISTS "Enable read access for all users" ON public.leaderboard_stats;
CREATE POLICY "Enable read access for all users" ON public.leaderboard_stats FOR SELECT USING (true);

-- 7. Grant Table Permissions for NextAuth Service Role
GRANT ALL ON ALL TABLES IN SCHEMA next_auth TO service_role;
GRANT ALL ON ALL ROUTINES IN SCHEMA next_auth TO service_role;
GRANT ALL ON ALL SEQUENCES IN SCHEMA next_auth TO service_role;

ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA next_auth GRANT ALL ON TABLES TO service_role;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA next_auth GRANT ALL ON ROUTINES TO service_role;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA next_auth GRANT ALL ON SEQUENCES TO service_role;

-- 8. Expose Schema to API
ALTER ROLE authenticator SET pgrst.db_schemas = 'public, storage, graphql_public, next_auth';

-- 9. Reload config and schema
NOTIFY pgrst, 'reload config';
NOTIFY pgrst, 'reload schema';
