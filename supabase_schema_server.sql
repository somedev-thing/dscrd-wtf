-- Create servers table
create table if not exists servers (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid references users(id) on delete cascade not null,
  slug text unique not null,
  name text not null,
  description text,
  icon text,
  banner text,
  theme_config jsonb default '{}'::jsonb,
  is_premium boolean default false,
  created_at timestamp with time zone default now()
);

-- Create server_pages table
create table if not exists server_pages (
  id uuid primary key default gen_random_uuid(),
  server_id uuid references servers(id) on delete cascade not null,
  slug text not null,
  title text not null,
  content text, -- Markdown content
  position int default 0,
  created_at timestamp with time zone default now(),
  unique(server_id, slug)
);

-- RLS (Commented out for now as per instructions)
-- alter table servers enable row level security;
-- alter table server_pages enable row level security;
