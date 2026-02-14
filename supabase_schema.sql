-- Create users table
create table if not exists users (
  id uuid not null primary key default gen_random_uuid(),
  name text,
  email text,
  emailVerified timestamp with time zone,
  image text
);

-- Create accounts table
create table if not exists accounts (
  id uuid not null primary key default gen_random_uuid(),
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

-- Create sessions table
create table if not exists sessions (
  id uuid not null primary key default gen_random_uuid(),
  sessionToken text not null unique,
  userId uuid not null references users(id) on delete cascade,
  expires timestamp with time zone not null
);

-- Create verification_tokens table
create table if not exists verification_tokens (
  identifier text not null,
  token text not null unique,
  expires timestamp with time zone not null,
  
  constraint token_unique unique(identifier, token)
);
