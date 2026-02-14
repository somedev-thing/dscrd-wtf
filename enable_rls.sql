-- Enable RLS
alter table profiles enable row level security;
alter table servers enable row level security;
alter table links enable row level security;
alter table server_pages enable row level security;
alter table bots enable row level security;

-- Profiles Policies
create policy "Public profiles are viewable by everyone"
  on profiles for select
  using ( true );

create policy "Users can insert their own profile"
  on profiles for insert
  with check ( auth.uid() = user_id );

create policy "Users can update their own profile"
  on profiles for update
  using ( auth.uid() = user_id );

-- Servers Policies
create policy "Servers are viewable by everyone"
  on servers for select
  using ( true );

create policy "Users can insert their own servers"
  on servers for insert
  with check ( auth.uid() = owner_id );

create policy "Users can update their own servers"
  on servers for update
  using ( auth.uid() = owner_id );

create policy "Users can delete their own servers"
  on servers for delete
  using ( auth.uid() = owner_id );

-- Server Pages Policies
create policy "Server pages are viewable by everyone"
  on server_pages for select
  using ( true );

create policy "Owners can insert server pages"
  on server_pages for insert
  with check ( exists ( select 1 from servers where id = server_id and owner_id = auth.uid() ) );

create policy "Owners can update server pages"
  on server_pages for update
  using ( exists ( select 1 from servers where id = server_id and owner_id = auth.uid() ) );

create policy "Owners can delete server pages"
  on server_pages for delete
  using ( exists ( select 1 from servers where id = server_id and owner_id = auth.uid() ) );

-- Links Policies
create policy "Links are viewable by everyone"
  on links for select
  using ( true );

create policy "Users can insert their own links"
  on links for insert
  with check ( auth.uid() = user_id );

create policy "Users can update their own links"
  on links for update
  using ( auth.uid() = user_id );

create policy "Users can delete their own links"
  on links for delete
  using ( auth.uid() = user_id );

-- Bots Policies (assuming admin only for edits, public for view)
create policy "Bots are viewable by everyone"
  on bots for select
  using ( true );
