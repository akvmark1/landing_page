-- Team members table
CREATE TABLE IF NOT EXISTS team_members (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  role TEXT NOT NULL,
  title TEXT,
  responsibility TEXT,
  philosophy TEXT,
  image_url TEXT,
  icon_name TEXT DEFAULT 'User',
  gradient_colors TEXT DEFAULT 'from-cyan-400 to-blue-500',
  linkedin_url TEXT,
  email TEXT,
  bio TEXT DEFAULT '',
  skills TEXT[] DEFAULT '{}',
  achievements TEXT[] DEFAULT '{}',
  experience TEXT DEFAULT '',
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Education entries table
CREATE TABLE IF NOT EXISTS team_member_education (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  team_member_id UUID NOT NULL REFERENCES team_members(id) ON DELETE CASCADE,
  degree TEXT NOT NULL,
  institution TEXT,
  year_start INTEGER,
  year_end INTEGER,
  description TEXT,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_team_member_education_member_id ON team_member_education(team_member_id);
CREATE INDEX IF NOT EXISTS idx_team_members_is_active ON team_members(is_active);
