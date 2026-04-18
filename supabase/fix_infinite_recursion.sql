-- FIX INFINITE RECURSION ERROR
-- Jalankan script ini jika Anda sudah menjalankan migration 002_admin_auth.sql
-- dan mendapat error "infinite recursion detected in policy"

-- Drop old policies yang menyebabkan infinite recursion
drop policy if exists "Admins can read admin users" on admin_users;
drop policy if exists "Super admins can manage admin users" on admin_users;

-- Recreate functions dengan security definer (jika belum ada)
create or replace function is_admin()
returns boolean as $$
begin
  return exists (
    select 1 from admin_users
    where id = auth.uid()
  );
end;
$$ language plpgsql security definer;

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

-- Create new policies yang tidak recursive
create policy "Users can read own admin record" on admin_users
  for select using (id = auth.uid());

create policy "Super admins can read all admin records" on admin_users
  for select using (is_super_admin());

create policy "Super admins can insert admin users" on admin_users
  for insert with check (is_super_admin());

create policy "Super admins can update admin users" on admin_users
  for update using (is_super_admin());

create policy "Super admins can delete admin users" on admin_users
  for delete using (is_super_admin());

-- Add admin policies to contact_messages table (jika belum ada)
drop policy if exists "Admins can read all messages" on contact_messages;
drop policy if exists "Admins can update messages" on contact_messages;
drop policy if exists "Admins can delete messages" on contact_messages;

create policy "Admins can read all messages" on contact_messages
  for select using (is_admin());

create policy "Admins can update messages" on contact_messages
  for update using (is_admin());

create policy "Admins can delete messages" on contact_messages
  for delete using (is_admin());

-- Add admin policies to services table (jika belum ada)
drop policy if exists "Admins can read all services" on services;
drop policy if exists "Admins can insert services" on services;
drop policy if exists "Admins can update services" on services;
drop policy if exists "Admins can delete services" on services;

create policy "Admins can read all services" on services
  for select using (is_admin());

create policy "Admins can insert services" on services
  for insert with check (is_admin());

create policy "Admins can update services" on services
  for update using (is_admin());

create policy "Admins can delete services" on services
  for delete using (is_admin());

-- Add admin policies to certificates table (jika belum ada)
drop policy if exists "Admins can read all certificates" on certificates;
drop policy if exists "Admins can insert certificates" on certificates;
drop policy if exists "Admins can update certificates" on certificates;
drop policy if exists "Admins can delete certificates" on certificates;

create policy "Admins can read all certificates" on certificates
  for select using (is_admin());

create policy "Admins can insert certificates" on certificates
  for insert with check (is_admin());

create policy "Admins can update certificates" on certificates
  for update using (is_admin());

create policy "Admins can delete certificates" on certificates
  for delete using (is_admin());

-- Add admin policies to gallery table (jika belum ada)
drop policy if exists "Admins can read all gallery" on gallery;
drop policy if exists "Admins can insert gallery" on gallery;
drop policy if exists "Admins can update gallery" on gallery;
drop policy if exists "Admins can delete gallery" on gallery;

create policy "Admins can read all gallery" on gallery
  for select using (is_admin());

create policy "Admins can insert gallery" on gallery
  for insert with check (is_admin());

create policy "Admins can update gallery" on gallery
  for update using (is_admin());

create policy "Admins can delete gallery" on gallery
  for delete using (is_admin());
