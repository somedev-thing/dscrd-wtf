
-- Trigger to handle new user creation from Auth
-- This ensures that when a user signs up via Discord (Supabase Auth), 
-- a profile is immediately created in the public schema without hitting RLS issues.

create or replace function public.handle_new_user() 
returns trigger as $$
begin
  insert into public.profiles (user_id, username, bio, theme_config)
  values (
    new.id, 
    new.raw_user_meta_data->>'full_name', -- Fallback to full_name or name
    'Just another dscrd.wtf user', 
    '{"mode": "dark", "color": "#5865F2"}'::jsonb
  )
  on conflict (user_id) do nothing; -- Prevent duplicates
  return new;
end;
$$ language plpgsql security definer;

-- Recreate Trigger
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
