-- =============================================================
-- FINAL DATABASE RESET - V4
-- Fixes the AdapterError by creating the `next_auth` schema
-- that @auth/supabase-adapter ACTUALLY uses.
-- =============================================================

-- =====================
-- PART 1: next_auth SCHEMA (for NextAuth Adapter)
-- =====================

-- Create the schema
create schema if not exists next_auth;

-- Grant access to service_role (the adapter uses the service_role key)
grant usage on schema next_auth to service_role;
grant all on all tables in schema next_auth to service_role;
grant all on all sequences in schema next_auth to service_role;

-- Enable UUID extension
create extension if not exists "uuid-ossp" with schema extensions;

-- Drop old tables in next_auth if they exist
drop table if exists next_auth.accounts cascade;
drop table if exists next_auth.sessions cascade;
drop table if exists next_auth.verification_tokens cascade;
drop table if exists next_auth.users cascade;

-- Create Users table in next_auth schema
create table next_auth.users (
  id uuid not null default uuid_generate_v4(),
  name text,
  email text,
  "emailVerified" timestamp with time zone,
  image text,
  constraint users_pkey primary key (id)
);

-- Create Accounts table in next_auth schema
create table next_auth.accounts (
  id uuid not null default uuid_generate_v4(),
  type text not null,
  provider text not null,
  "providerAccountId" text not null,
  refresh_token text,
  access_token text,
  expires_at bigint,
  token_type text,
  scope text,
  id_token text,
  session_state text,
  "userId" uuid not null references next_auth.users(id) on delete cascade,
  constraint accounts_pkey primary key (id)
);

-- Create Sessions table in next_auth schema 
create table next_auth.sessions (
  id uuid not null default uuid_generate_v4(),
  expires timestamp with time zone not null,
  "sessionToken" text not null,
  "userId" uuid not null references next_auth.users(id) on delete cascade,
  constraint sessions_pkey primary key (id)
);

-- Create Verification Tokens table in next_auth schema
create table next_auth.verification_tokens (
  id uuid not null default uuid_generate_v4(),
  identifier text,
  token text,
  expires timestamp with time zone not null,
  constraint verification_tokens_pkey primary key (id)
);

-- Grant access to the new tables (must be done AFTER table creation)
grant all on all tables in schema next_auth to service_role;
grant all on all sequences in schema next_auth to service_role;

-- IMPORTANT: Expose next_auth schema via PostgREST
-- This MUST ALSO be done in Supabase Dashboard:
-- Settings > API > Schema Settings > Add "next_auth" to exposed schemas
-- Without this, the adapter CANNOT reach the tables via REST API.


-- =====================
-- PART 2: public SCHEMA (for App Data)
-- =====================

-- Nuke and recreate public schema
drop schema if exists public cascade;
create schema public;
grant all on schema public to postgres, public, anon, authenticated, service_role;

create extension if not exists "uuid-ossp";

-- Profiles (linked to next_auth.users.id via user_id, but NO FK constraint)
create table public.profiles (
  id uuid not null primary key default uuid_generate_v4(),
  user_id uuid not null unique,
  username text unique,
  bio text,
  theme_config jsonb default '{"mode": "dark", "color": "#5865F2"}'::jsonb,
  is_verified boolean default false,
  plan text default 'free',
  banner text,
  selected_badges jsonb default '[]'::jsonb,
  display_guilds jsonb default '[]'::jsonb, 
  created_at timestamp with time zone default now()
);

create table public.servers (
  id uuid not null primary key default uuid_generate_v4(),
  owner_id uuid not null,
  name text not null,
  slug text not null unique,
  description text,
  discord_guild_id text,
  icon text,
  banner text,
  theme_config jsonb,
  created_at timestamp with time zone default now()
);

create table public.server_pages (
  id uuid not null primary key default uuid_generate_v4(),
  server_id uuid not null,
  slug text not null,
  title text not null,
  content text,
  position int default 0,
  created_at timestamp with time zone default now(),
  constraint server_pages_slug_unique unique(server_id, slug)
);

create table public.links (
  id uuid not null primary key default uuid_generate_v4(),
  user_id uuid not null,
  title text not null,
  url text not null,
  icon text,
  position int default 0,
  clicks bigint default 0,
  is_active boolean default true,
  created_at timestamp with time zone default now()
);

create table public.bots (
  id uuid not null primary key default uuid_generate_v4(),
  slug text not null unique,
  invite_url text not null,
  clicks bigint default 0,
  created_at timestamp with time zone default now()
);

-- RPC Functions
create or replace function increment_clicks(link_id uuid)
returns void as $$
begin
  update links set clicks = clicks + 1 where id = link_id;
end;
$$ language plpgsql;

create or replace function increment_bot_clicks(bot_slug text)
returns void as $$
begin
  update bots set clicks = clicks + 1 where slug = bot_slug;
end;
$$ language plpgsql;

-- Auto-Profile Trigger (fires when NextAuth creates a user in next_auth.users)
create or replace function public.handle_new_nextauth_user() 
returns trigger as $$
begin
  insert into public.profiles (user_id, username, bio, theme_config)
  values (
    new.id, 
    lower(replace(coalesce(new.name, 'user'), ' ', '')),
    'Just another dscrd.wtf user', 
    '{"mode": "dark", "color": "#5865F2"}'::jsonb
  )
  on conflict (user_id) do nothing;
  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists on_nextauth_user_created on next_auth.users;
create trigger on_nextauth_user_created
  after insert on next_auth.users
  for each row execute procedure public.handle_new_nextauth_user();


-- Permissions & RLS (Open for now)
grant all on all tables in schema public to anon, authenticated, service_role;
grant all on all sequences in schema public to anon, authenticated, service_role;
grant all on all routines in schema public to anon, authenticated, service_role;

alter table profiles enable row level security;
alter table servers enable row level security;
alter table links enable row level security;
alter table server_pages enable row level security;
alter table bots enable row level security;

create policy "Allow All" on profiles for all using (true) with check (true);
create policy "Allow All" on servers for all using (true) with check (true);
create policy "Allow All" on server_pages for all using (true) with check (true);
create policy "Allow All" on links for all using (true) with check (true);
create policy "Allow All" on bots for all using (true) with check (true);
