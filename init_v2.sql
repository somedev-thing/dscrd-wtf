-- 1. Reset Schema
drop schema public cascade;
create schema public;
grant all on schema public to postgres;
grant all on schema public to public;

-- 2. Enable Extensions
create extension if not exists "uuid-ossp";

-- 3. Create Users & Auth Tables (NextAuth Adapter Compat)
drop table if exists users cascade;
create table if not exists users (
  id uuid not null primary key default uuid_generate_v4(),
  name text,
  email text,
  emailVerified timestamp with time zone,
  image text
);

create table if not exists accounts (
  id uuid not null primary key default uuid_generate_v4(),
  userId uuid not null, -- Removed FK
  type text not null,
  provider text not null,
  providerAccountId text not null,
  refresh_token text,
  access_token text,
  expires_at bigint,
  token_type text,
  scope text,
  id_token text,
  session_state text,
  constraint provider_unique unique(provider, providerAccountId)
);

create table if not exists sessions (
  id uuid not null primary key default uuid_generate_v4(),
  sessionToken text not null unique,
  userId uuid not null, -- Removed FK
  expires timestamp with time zone not null
);

create table if not exists verification_tokens (
  identifier text not null,
  token text not null unique,
  expires timestamp with time zone not null,
  constraint token_unique unique(identifier, token)
);

-- 4. Create Profiles Table (Core Logic)
drop table if exists profiles cascade;
create table if not exists profiles (
  id uuid not null primary key default uuid_generate_v4(),
  user_id uuid not null, -- Removed FK
  username text unique,
  bio text,
  theme_config jsonb default '{"mode": "dark", "color": "#5865F2"}'::jsonb,
  is_verified boolean default false,
  plan text default 'free',
  banner text,
  selected_badges jsonb default '[]'::jsonb,
  display_guilds jsonb default '[]'::jsonb, 
  created_at timestamp with time zone default now(),
  constraint profiles_user_id_unique unique(user_id)
);

-- 5. Create Servers Table
create table if not exists servers (
  id uuid not null primary key default uuid_generate_v4(),
  owner_id uuid not null, -- Removed FK
  name text not null,
  slug text not null unique,
  description text,
  discord_guild_id text,
  icon text,
  banner text,
  theme_config jsonb,
  created_at timestamp with time zone default now()
);

-- 6. Create Server Pages Table
create table if not exists server_pages (
  id uuid not null primary key default uuid_generate_v4(),
  server_id uuid not null references servers(id) on delete cascade,
  slug text not null,
  title text not null,
  content text,
  position int default 0,
  created_at timestamp with time zone default now(),
  constraint server_pages_slug_unique unique(server_id, slug)
);

-- 7. Create Links Table
create table if not exists links (
  id uuid not null primary key default uuid_generate_v4(),
  user_id uuid not null, -- Removed FK
  title text not null,
  url text not null,
  icon text,
  position int default 0,
  clicks bigint default 0,
  is_active boolean default true,
  created_at timestamp with time zone default now()
);

-- 8. Create Bots Table
create table if not exists bots (
  id uuid not null primary key default uuid_generate_v4(),
  slug text not null unique,
  invite_url text not null,
  clicks bigint default 0,
  created_at timestamp with time zone default now()
);

-- 9. RPC Functions
create or replace function increment_clicks(link_id uuid)
returns void as $$
begin
  update links
  set clicks = clicks + 1
  where id = link_id;
end;
$$ language plpgsql;

create or replace function increment_bot_clicks(bot_slug text)
returns void as $$
begin
  update bots
  set clicks = clicks + 1
  where slug = bot_slug;
end;
$$ language plpgsql;

-- 10. Enable RLS
alter table profiles enable row level security;
alter table servers enable row level security;
alter table links enable row level security;
alter table server_pages enable row level security;
alter table bots enable row level security;

-- 11. RLS Policies

-- Profiles
create policy "Public profiles" on profiles for select using (true);
create policy "User insert own profile" on profiles for insert with check (auth.uid() = user_id);
create policy "User update own profile" on profiles for update using (auth.uid() = user_id);

-- Servers
create policy "Public servers" on servers for select using (true);
create policy "User insert own server" on servers for insert with check (auth.uid() = owner_id);
create policy "User update own server" on servers for update using (auth.uid() = owner_id);
create policy "User delete own server" on servers for delete using (auth.uid() = owner_id);

-- Server Pages
create policy "Public pages" on server_pages for select using (true);
create policy "User insert pages" on server_pages for insert with check (exists (select 1 from servers where id = server_id and owner_id = auth.uid()));
create policy "User update pages" on server_pages for update using (exists (select 1 from servers where id = server_id and owner_id = auth.uid()));
create policy "User delete pages" on server_pages for delete using (exists (select 1 from servers where id = server_id and owner_id = auth.uid()));

-- Links
create policy "Public links" on links for select using (true);
create policy "User insert links" on links for insert with check (auth.uid() = user_id);
create policy "User update links" on links for update using (auth.uid() = user_id);
create policy "User delete links" on links for delete using (auth.uid() = user_id);

-- Bots
create policy "Public bots" on bots for select using (true);
-- 12. Triggers & Functions (Auto-Profile)
create or replace function public.handle_new_user() 
returns trigger as $$
begin
  insert into public.profiles (user_id, username, bio, theme_config)
  values (
    new.id, 
    new.raw_user_meta_data->>'name', 
    'Just another dscrd.wtf user', 
    '{"mode": "dark", "color": "#5865F2"}'::jsonb
  );
  return new;
end;
$$ language plpgsql security definer;

-- Trigger on Auth User Created
-- Note: This requires permissions on auth.users which standard SQL editor might not have.
-- If this fails, user must run it in Supabase Dashboard > SQL Editor
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- 13. Permissions Fix (Critical)
grant usage on schema public to anon, authenticated, service_role;
grant all on all tables in schema public to anon, authenticated, service_role;
grant all on all sequences in schema public to anon, authenticated, service_role;
grant all on all routines in schema public to anon, authenticated, service_role;

-- Ensure RLS is actually enforced but with correct policies
alter table profiles force row level security;
