-- Fix missing admin policies for services table
create policy "Admins can read all services" on services
  for select using (is_admin());

create policy "Admins can insert services" on services
  for insert with check (is_admin());

create policy "Admins can update services" on services
  for update using (is_admin());

create policy "Admins can delete services" on services
  for delete using (is_admin());

-- Fix missing admin read policy for news table (so admins can see unpublished news)
create policy "Admins can read all news" on news
  for select using (is_admin());

-- Fix missing admin policies for company_stats table
create policy "Admins can read all stats" on company_stats
  for select using (is_admin());

create policy "Admins can insert stats" on company_stats
  for insert with check (is_admin());

create policy "Admins can update stats" on company_stats
  for update using (is_admin());

create policy "Admins can delete stats" on company_stats
  for delete using (is_admin());
