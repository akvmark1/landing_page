-- SQL Migration: Add profile fields to team_members table
-- Run this in your Supabase SQL Editor (Dashboard > SQL Editor > New Query)

-- Add new columns to team_members table
ALTER TABLE team_members
ADD COLUMN IF NOT EXISTS bio TEXT DEFAULT '',
ADD COLUMN IF NOT EXISTS skills TEXT[] DEFAULT '{}',
ADD COLUMN IF NOT EXISTS achievements TEXT[] DEFAULT '{}',
ADD COLUMN IF NOT EXISTS experience TEXT DEFAULT '';

-- Create a separate table for education entries (supports multiple entries with years)
CREATE TABLE IF NOT EXISTS team_member_education (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,f
  team_member_id UUID NOT NULL REFERENCES team_members(id) ON DELETE CASCADE,
  degree TEXT NOT NULL,
  institution TEXT,
  year_start INTEGER,
  year_end INTEGER,
  description TEXT,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_team_member_education_member_id ON team_member_education(team_member_id);

-- Enable RLS (Row Level Security) for the new table
ALTER TABLE team_member_education ENABLE ROW LEVEL SECURITY;

-- Create policy to allow public read access
CREATE POLICY "Public can read team member education" ON team_member_education
  FOR SELECT USING (true);

-- Create policy to allow authenticated users to manage education entries
CREATE POLICY "Authenticated users can manage education" ON team_member_education
  FOR ALL USING (true);

-- Optional: Update existing team members with placeholder data
-- Uncomment and modify if you want to add initial data
/*
UPDATE team_members SET 
  bio = 'Add bio here...',
  skills = ARRAY['Skill 1', 'Skill 2'],
  achievements = ARRAY['Achievement 1', 'Achievement 2'],
  experience = 'Add experience here...'
WHERE bio IS NULL OR bio = '';
*/
