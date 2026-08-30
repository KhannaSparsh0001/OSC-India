-- Initial Schema for OSC-India

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Roles Table
CREATE TABLE public.roles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR NOT NULL UNIQUE,
  permissions JSONB DEFAULT '{}'::jsonb
);

-- Insert Default Roles
INSERT INTO public.roles (name) VALUES 
('Contributor'),
('Mentor'),
('Project Admin');

-- 2. Users Table (Compatible with NextAuth @auth/supabase-adapter)
CREATE TABLE public.users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR,
  email VARCHAR UNIQUE,
  "emailVerified" TIMESTAMP WITH TIME ZONE,
  image VARCHAR,
  role_id UUID REFERENCES public.roles(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- NextAuth specific tables
CREATE TABLE public.accounts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  "userId" UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
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

CREATE TABLE public.sessions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  "sessionToken" VARCHAR NOT NULL UNIQUE,
  "userId" UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  expires TIMESTAMP WITH TIME ZONE NOT NULL
);

CREATE TABLE public.verification_tokens (
  identifier VARCHAR,
  token VARCHAR UNIQUE,
  expires TIMESTAMP WITH TIME ZONE NOT NULL,
  PRIMARY KEY (identifier, token)
);

-- 3. Profiles Table
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL UNIQUE REFERENCES public.users(id) ON DELETE CASCADE,
  full_name VARCHAR,
  avatar_url VARCHAR,
  bio TEXT,
  tech_stack TEXT[] DEFAULT '{}'
);

-- 4. Projects Table
CREATE TABLE public.projects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR NOT NULL,
  github_repo_url VARCHAR NOT NULL UNIQUE,
  description TEXT
);

-- 5. Contributions Table
CREATE TABLE public.contributions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  project_id UUID NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
  type VARCHAR NOT NULL CHECK (type IN ('pr', 'issue', 'commit')),
  github_url VARCHAR NOT NULL UNIQUE,
  status VARCHAR NOT NULL CHECK (status IN ('open', 'merged', 'closed')),
  points_awarded INTEGER DEFAULT 0,
  contributed_at TIMESTAMP WITH TIME ZONE NOT NULL
);

-- 6. Leaderboard Stats Table
CREATE TABLE public.leaderboard_stats (
  user_id UUID PRIMARY KEY REFERENCES public.users(id) ON DELETE CASCADE,
  total_points INTEGER DEFAULT 0,
  current_streak INTEGER DEFAULT 0,
  rank INTEGER,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- TRIGGER: Auto-create Profile and Leaderboard row for new Users
CREATE OR REPLACE FUNCTION public.handle_new_user() 
RETURNS TRIGGER AS $$
DECLARE
  default_role_id UUID;
BEGIN
  -- Get the Contributor role ID
  SELECT id INTO default_role_id FROM public.roles WHERE name = 'Contributor';

  -- Set default role
  NEW.role_id = default_role_id;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created_before
  BEFORE INSERT ON public.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

CREATE OR REPLACE FUNCTION public.handle_new_user_after() 
RETURNS TRIGGER AS $$
BEGIN
  -- Create profile
  INSERT INTO public.profiles (user_id, full_name, avatar_url)
  VALUES (NEW.id, NEW.name, NEW.image);
  
  -- Create leaderboard stat row
  INSERT INTO public.leaderboard_stats (user_id)
  VALUES (NEW.id);

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created_after
  AFTER INSERT ON public.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user_after();


-- TRIGGER: Auto-update Leaderboard Points when a PR is merged
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

-- ROW LEVEL SECURITY (RLS)
-- We will enable RLS but allow public reads. Writes will be performed by the Next.js Server Actions using the Service Role Key.
ALTER TABLE public.roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.accounts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contributions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.leaderboard_stats ENABLE ROW LEVEL SECURITY;

-- Allow Public Reads
CREATE POLICY "Enable read access for all users" ON public.roles FOR SELECT USING (true);
CREATE POLICY "Enable read access for all users" ON public.users FOR SELECT USING (true);
CREATE POLICY "Enable read access for all users" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Enable read access for all users" ON public.projects FOR SELECT USING (true);
CREATE POLICY "Enable read access for all users" ON public.contributions FOR SELECT USING (true);
CREATE POLICY "Enable read access for all users" ON public.leaderboard_stats FOR SELECT USING (true);
