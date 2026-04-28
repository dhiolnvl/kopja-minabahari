-- Enable auth schema if not already enabled
-- This is usually enabled by default in Supabase

-- Create admin_users table to track admin roles
create table if not exists admin_users (
  id uuid references auth.users(id) on delete cascade primary key,
  email text unique not null,
  full_name text,
  role text default 'admin' check (role in ('admin', 'super_admin')),
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Enable RLS
alter table admin_users enable row level security;

-- Policy: only authenticated admins can read admin_users
create policy "Admins can read admin users" on admin_users
  for select using (
    auth.uid() in (select id from admin_users)
  );

-- Policy: only super admins can insert/update/delete
create policy "Super admins can manage admin users" on admin_users
  for all using (
    auth.uid() in (select id from admin_users where role = 'super_admin')
  );

-- Function to check if user is admin
create or replace function is_admin()
returns boolean as $$
begin
  return exists (
    select 1 from admin_users
    where id = auth.uid()
  );
end;
$$ language plpgsql security definer;

-- Grant execute permission
grant execute on function is_admin() to authenticated;

-- Add admin policies to news table
create policy "Admins can insert news" on news
  for insert with check (is_admin());

create policy "Admins can update news" on news
  for update using (is_admin());

create policy "Admins can delete news" on news
  for delete using (is_admin());
