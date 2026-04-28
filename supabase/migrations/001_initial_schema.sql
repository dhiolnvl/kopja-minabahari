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

-- Tabel untuk berita
create table news (
  id uuid default gen_random_uuid() primary key,
  slug varchar(200) unique not null,
  title varchar(300) not null,
  excerpt text,
  content text not null,
  image varchar(500),
  author varchar(100) default 'Admin Koperasi',
  published_at timestamp with time zone default now(),
  is_published boolean default true,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- RLS Policies
alter table contact_messages enable row level security;
alter table services enable row level security;
alter table company_stats enable row level security;
alter table news enable row level security;

-- Policy: siapa pun bisa insert contact_messages
create policy "Anyone can insert contact" on contact_messages
  for insert with check (true);

-- Policy: semua bisa read services dan stats yang aktif
create policy "Public can read services" on services
  for select using (is_active = true);

create policy "Public can read stats" on company_stats
  for select using (true);

-- Policy: semua bisa read berita yang published
create policy "Public can read published news" on news
  for select using (is_published = true);

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

-- Seed data berita
insert into news (slug, title, excerpt, content, image, published_at) values
('peresmian-gudang-cold-storage-100-ton',
 'Peresmian Gudang Cold Storage Kapasitas 100 Ton',
 'Koperasi Jasa Sukses Mina Bahari resmi meresmikan gudang cold storage berkapasitas 100 ton untuk mendukung industri perikanan di Pekalongan.',
 'Koperasi Jasa Sukses Mina Bahari dengan bangga mengumumkan peresmian gudang cold storage berkapasitas 100 ton yang berlokasi di Jl. Pantai Sari No. 13, Pekalongan. Fasilitas modern ini dilengkapi dengan sistem pendingin terkini dan monitoring suhu 24 jam untuk menjaga kualitas produk perikanan.\n\nGudang baru ini diharapkan dapat meningkatkan kapasitas penyimpanan dan mendukung para nelayan serta eksportir di wilayah Pekalongan dan sekitarnya. Dengan teknologi Air Blast Freezing (ABF), kami mampu membekukan ikan dengan cepat sambil mempertahankan kualitas, tekstur, dan nilai gizi.\n\n"Ini adalah wujud komitmen kami dalam membangun ekonomi kerakyatan di masyarakat pesisir pantai Kota Pekalongan," ujar Pak Kisyono, Ketua Koperasi.\n\nFasilitas ini juga dilengkapi dengan sistem keamanan tinggi dan akses yang mudah untuk memudahkan mitra dalam melakukan penyimpanan dan pengambilan produk.',
 '/gambar/Ruang Proses Gudang 100ton.jpg',
 now() - interval '10 days'),

('pelatihan-penanganan-ikan-segar',
 'Pelatihan Penanganan Ikan Segar untuk Nelayan Lokal',
 'Koperasi menyelenggarakan pelatihan gratis tentang teknik penanganan ikan segar yang baik dan benar untuk meningkatkan kualitas hasil tangkapan.',
 'Dalam rangka meningkatkan kualitas hasil tangkapan nelayan lokal, Koperasi Jasa Sukses Mina Bahari mengadakan pelatihan penanganan ikan segar yang baik dan benar. Pelatihan ini diikuti oleh puluhan nelayan dari berbagai wilayah di Pekalongan.\n\nMateri pelatihan mencakup teknik penyortiran, pembersihan, penyimpanan sementara, dan pengemasan ikan segar. Para peserta juga diajarkan tentang standar mutu ikan untuk ekspor dan cara menjaga rantai dingin (cold chain) agar kualitas ikan tetap terjaga.\n\n"Dengan penanganan yang tepat sejak ikan ditangkap, nilai jual ikan bisa meningkat signifikan," jelas Pak Sukamto, General Manager Koperasi.\n\nPelatihan ini merupakan bagian dari program pemberdayaan masyarakat pesisir yang rutin dilakukan oleh koperasi.',
 '/gambar/Penyortiran.jpg',
 now() - interval '5 days'),

('sertifikasi-skp-produk-beku',
 'Koperasi Raih Sertifikasi SKP untuk Berbagai Produk Beku',
 'Koperasi berhasil mendapatkan Sertifikat Kelayakan Pengolahan (SKP) untuk produk ikan pelagis, demersal, cumi-cumi, gurita, dan scallop beku.',
 'Koperasi Jasa Sukses Mina Bahari telah mendapatkan Sertifikat Kelayakan Pengolahan (SKP) dari Kementerian Kelautan dan Perikanan untuk berbagai jenis produk beku. Sertifikasi ini mencakup ikan pelagis beku, ikan demersal beku, cumi-cumi beku, gurita beku, dan scallop beku.\n\nSKP merupakan persyaratan wajib bagi unit pengolahan ikan yang ingin mengekspor produknya ke mancanegara. Dengan sertifikasi ini, produk yang diproses di fasilitas koperasi telah memenuhi standar keamanan pangan dan mutu yang ditetapkan.\n\n"Pencapaian ini membuktikan komitmen kami terhadap kualitas dan keamanan produk. Kami akan terus meningkatkan standar layanan untuk mendukung ekspor perikanan Indonesia," ungkap Pak Kisyono.\n\nKoperasi juga telah memiliki Nomor Induk Berusaha (NIB) yang menjadikan operasional koperasi semakin legal dan terpercaya.',
 '/gambar/Bahan Baku.jpg',
 now() - interval '2 days');
