-- Add new columns to profiles table
ALTER TABLE profiles 
ADD COLUMN IF NOT EXISTS is_verified boolean DEFAULT false,
ADD COLUMN IF NOT EXISTS plan text DEFAULT 'free',
ADD COLUMN IF NOT EXISTS banner text,
ADD COLUMN IF NOT EXISTS selected_badges jsonb DEFAULT '[]'::jsonb,
ADD COLUMN IF NOT EXISTS display_guilds jsonb DEFAULT '[]'::jsonb;
