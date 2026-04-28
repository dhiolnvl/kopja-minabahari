-- Tabel untuk sertifikat dan penghargaan
create table if not exists certificates (
  id uuid default gen_random_uuid() primary key,
  title varchar(200) not null,
  issuer varchar(150) not null, -- Lembaga penerbit
  issue_date date,
  description text,
  image varchar(500), -- URL gambar sertifikat
  certificate_number varchar(100),
  is_active boolean default true,
  sort_order int default 0,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Tabel untuk galeri foto
create table if not exists gallery (
  id uuid default gen_random_uuid() primary key,
  title varchar(200) not null,
  description text,
  image varchar(500) not null, -- URL gambar
  category varchar(50), -- 'facility', 'activity', 'product', 'other'
  is_active boolean default true,
  sort_order int default 0,
  created_at timestamp with time zone default now()
);

-- Enable RLS
alter table certificates enable row level security;
alter table gallery enable row level security;

-- Public policies - semua orang bisa read yang aktif
create policy "Public can read active certificates" on certificates
  for select using (is_active = true);

create policy "Public can read active gallery" on gallery
  for select using (is_active = true);

-- Admin policies
create policy "Admins can read all certificates" on certificates
  for select using (is_admin());

create policy "Admins can insert certificates" on certificates
  for insert with check (is_admin());

create policy "Admins can update certificates" on certificates
  for update using (is_admin());

create policy "Admins can delete certificates" on certificates
  for delete using (is_admin());

create policy "Admins can read all gallery" on gallery
  for select using (is_admin());

create policy "Admins can insert gallery" on gallery
  for insert with check (is_admin());

create policy "Admins can update gallery" on gallery
  for update using (is_admin());

create policy "Admins can delete gallery" on gallery
  for delete using (is_admin());

-- Seed data sertifikat (contoh)
-- CATATAN: Ganti URL gambar dengan file sertifikat yang sebenarnya setelah upload
insert into certificates (title, issuer, issue_date, description, image, certificate_number, sort_order) values
('Sertifikat Kelayakan Pengolahan (SKP) - Ikan Pelagis Beku', 'Kementerian Kelautan dan Perikanan RI', '2024-01-15', 'Sertifikat kelayakan pengolahan untuk produk ikan pelagis beku dengan standar ekspor internasional', null, 'SKP/2024/001', 1),
('Sertifikat Kelayakan Pengolahan (SKP) - Ikan Demersal Beku', 'Kementerian Kelautan dan Perikanan RI', '2024-01-15', 'Sertifikat kelayakan pengolahan untuk produk ikan demersal beku', null, 'SKP/2024/002', 2),
('Nomor Induk Berusaha (NIB)', 'OSS - Kementerian Investasi/BKPM', '2023-06-10', 'Nomor Induk Berusaha yang menjadi identitas pelaku usaha', null, 'NIB123456789', 3);

-- Seed data galeri (contoh)
insert into gallery (title, description, image, category, sort_order) values
('Ruang Proses Gudang 100 Ton', 'Fasilitas cold storage berkapasitas 100 ton dengan teknologi pendingin modern', '/gambar/Ruang Proses Gudang 100ton.jpg', 'facility', 1),
('Proses Penyortiran Ikan', 'Tim ahli melakukan penyortiran ikan sesuai standar mutu ekspor', '/gambar/Penyortiran.jpg', 'activity', 2),
('Bahan Baku Berkualitas', 'Ikan segar siap diproses dengan standar kebersihan tinggi', '/gambar/Bahan Baku.jpg', 'product', 3),
('Pelatihan Nelayan', 'Kegiatan pelatihan penanganan ikan untuk nelayan lokal', '/gambar/pelatihan.jpg', 'activity', 4);
