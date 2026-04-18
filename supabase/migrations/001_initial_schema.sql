-- Tabel untuk pesan kontak
create table contact_messages (
  id uuid default gen_random_uuid() primary key,
  name varchar(100) not null,
  email varchar(150) not null,
  phone varchar(20),
  service varchar(50), -- 'cold-storage' | 'pembekuan' | 'thermoking' | 'lainnya'
  message text not null,
  is_read boolean default false,
  created_at timestamp with time zone default now()
);

-- Tabel untuk layanan (bisa dikelola via admin sederhana)
create table services (
  id uuid default gen_random_uuid() primary key,
  slug varchar(100) unique not null,
  title varchar(200) not null,
  description text,
  icon varchar(50),
  features jsonb,
  price_info text,
  is_active boolean default true,
  created_at timestamp with time zone default now()
);

-- Tabel untuk statistik perusahaan
create table company_stats (
  id uuid default gen_random_uuid() primary key,
  label varchar(100) not null,
  value varchar(50) not null,
  unit varchar(30),
  sort_order int default 0
);

-- RLS Policies
alter table contact_messages enable row level security;
alter table services enable row level security;
alter table company_stats enable row level security;

-- Policy: siapa pun bisa insert contact_messages
create policy "Anyone can insert contact" on contact_messages
  for insert with check (true);

-- Policy: semua bisa read services dan stats yang aktif
create policy "Public can read services" on services
  for select using (is_active = true);

create policy "Public can read stats" on company_stats
  for select using (true);

-- Seed data layanan
insert into services (slug, title, description, icon, features, price_info) values
('cold-storage', 'Jasa Penitipan Ikan Beku', 'Fasilitas penyimpanan ikan beku berteknologi tinggi dengan suhu terkontrol untuk menjaga kualitas dan kesegaran ikan Anda.', 'Warehouse', '["Kapasitas hingga 500 ton", "Suhu -18°C s/d -25°C", "Monitoring suhu 24 jam", "Akses mudah dan aman", "Laporan inventaris berkala"]', 'Hubungi kami untuk penawaran'),
('pembekuan-ikan', 'Jasa Pembekuan Ikan (ABF)', 'Layanan pembekuan ikan cepat dengan metode Air Blast Freezing (ABF) untuk mempertahankan kesegaran, nilai gizi, dan kualitas ekspor ikan Anda.', 'Snowflake', '["Blast freezer berkapasitas besar", "Proses pembekuan <4 jam", "Standar ekspor internasional", "Sertifikasi mutu", "Penanganan oleh tenaga ahli"]', 'Hubungi kami untuk penawaran'),
('sewa-thermoking', 'Jasa Sewa Mobil Thermoking', 'Armada kendaraan berpendingin (thermoking) untuk distribusi ikan segar dan beku ke seluruh wilayah Jawa dan sekitarnya.', 'Truck', '["Berbagai kapasitas armada", "Sistem pendingin terpercaya", "Sopir berpengalaman", "GPS tracking real-time", "Sewa harian / bulanan"]', 'Hubungi kami untuk penawaran');

-- Seed data statistik
insert into company_stats (label, value, unit, sort_order) values
('Kapasitas Cold Storage', '500', 'Ton', 1),
('Tahun Berpengalaman', '10', 'Tahun', 2),
('Mitra Nelayan', '200', '+', 3),
('Armada Thermoking', '15', 'Unit', 4);
