-- 1. Enable UUID extension
create extension if not exists "uuid-ossp";

-- 2. Create users table (NextAuth)
create table if not exists users (
  id uuid not null primary key default uuid_generate_v4(),
  name text,
  email text,
  emailVerified timestamp with time zone,
  image text
);

-- 3. Create accounts table (NextAuth)
create table if not exists accounts (
  id uuid not null primary key default uuid_generate_v4(),
  userId uuid not null references users(id) on delete cascade,
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

-- 4. Create sessions table (NextAuth)
create table if not exists sessions (
  id uuid not null primary key default uuid_generate_v4(),
  sessionToken text not null unique,
  userId uuid not null references users(id) on delete cascade,
  expires timestamp with time zone not null
);

-- 5. Create verification_tokens table (NextAuth)
create table if not exists verification_tokens (
  identifier text not null,
  token text not null unique,
  expires timestamp with time zone not null,
  constraint token_unique unique(identifier, token)
);

-- 6. Create profiles table (App Logic)
create table if not exists profiles (
  id uuid not null primary key default uuid_generate_v4(),
  user_id uuid not null references users(id) on delete cascade,
  username text unique,
  bio text,
  theme_config jsonb default '{"mode": "dark", "color": "#5865F2"}'::jsonb,
  is_verified boolean default false,
  plan text default 'free', 
  created_at timestamp with time zone default now(),
  constraint profiles_user_id_unique unique(user_id)
);

-- 7. Create servers table
create table if not exists servers (
  id uuid not null primary key default uuid_generate_v4(),
  owner_id uuid not null references users(id) on delete cascade,
  name text not null,
  slug text not null unique,
  description text,
  discord_guild_id text,
  icon text,
  banner text,
  theme_config jsonb,
  created_at timestamp with time zone default now()
);

-- 8. Create server_pages table
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

-- 9. Create links table
create table if not exists links (
  id uuid not null primary key default uuid_generate_v4(),
  user_id uuid not null references users(id) on delete cascade,
  title text not null,
  url text not null,
  icon text,
  position int default 0,
  clicks bigint default 0,
  is_active boolean default true,
  created_at timestamp with time zone default now()
);

-- 10. Create bots table (New)
create table if not exists bots (
  id uuid not null primary key default uuid_generate_v4(),
  slug text not null unique,
  invite_url text not null,
  clicks bigint default 0,
  created_at timestamp with time zone default now()
);

-- 11. RPCs
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
