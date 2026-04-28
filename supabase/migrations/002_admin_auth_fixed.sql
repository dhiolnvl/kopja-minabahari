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

-- Function to check if user is admin (bypass RLS with security definer)
create or replace function is_admin()
returns boolean as $$
begin
  return exists (
    select 1 from admin_users
    where id = auth.uid()
  );
end;
$$ language plpgsql security definer;

-- Function to check if user is super admin (bypass RLS with security definer)
create or replace function is_super_admin()
returns boolean as $$
begin
  return exists (
    select 1 from admin_users
    where id = auth.uid() and role = 'super_admin'
  );
end;
$$ language plpgsql security definer;

-- Grant execute permission
grant execute on function is_admin() to authenticated;
grant execute on function is_super_admin() to authenticated;

-- Policy: authenticated users can read their own admin record
-- This allows the middleware and login to check if user is admin
create policy "Users can read own admin record" on admin_users
  for select using (id = auth.uid());

-- Policy: super admins can read all admin records
create policy "Super admins can read all admin records" on admin_users
  for select using (is_super_admin());

-- Policy: super admins can insert/update/delete admin users
create policy "Super admins can insert admin users" on admin_users
  for insert with check (is_super_admin());

create policy "Super admins can update admin users" on admin_users
  for update using (is_super_admin());

create policy "Super admins can delete admin users" on admin_users
  for delete using (is_super_admin());

-- Add admin policies to news table
create policy "Admins can insert news" on news
  for insert with check (is_admin());

create policy "Admins can update news" on news
  for update using (is_admin());

create policy "Admins can delete news" on news
  for delete using (is_admin());

-- Add admin policies to contact_messages table
create policy "Admins can read all messages" on contact_messages
  for select using (is_admin());

create policy "Admins can update messages" on contact_messages
  for update using (is_admin());

create policy "Admins can delete messages" on contact_messages
  for delete using (is_admin());
