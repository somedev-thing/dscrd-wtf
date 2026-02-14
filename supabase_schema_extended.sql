-- Create profiles table (extends users)
create table if not exists profiles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references users(id) on delete cascade unique,
  username text unique not null,
  bio text,
  theme_config jsonb default '{}'::jsonb,
  created_at timestamp with time zone default now()
);

-- Create links table
create table if not exists links (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references users(id) on delete cascade,
  title text not null,
  url text not null,
  icon text,
  clicks int default 0,
  is_active boolean default true,
  position int default 0,
  created_at timestamp with time zone default now()
);

-- Enable RLS (Optional but recommended, keeping it simple for now as requested)
-- alter table profiles enable row level security;
-- alter table links enable row level security;
