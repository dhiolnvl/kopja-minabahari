-- Buat tabel berita
create table if not exists news (
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

-- Enable RLS
alter table news enable row level security;

-- Policy: semua bisa read berita yang published
create policy "Public can read published news" on news
  for select using (is_published = true);

-- Insert data berita
insert into news (slug, title, excerpt, content, image, published_at) values
('koperasi-jasa-mina-bahari-dukung-program-makan-bergizi-gratis',
 'Dukung Program Pemerintah, Koperasi Jasa Mina Bahari Binaan KKP Uji Coba Salurkan Makan Bergizi Gratis',
 'Koperasi Jasa Sukses Mina Bahari melakukan uji coba penyaluran makan bergizi gratis di SDN Panjang Wetan 03, Pekalongan Utara pada 4 Desember 2024.',
 'PEKALONGAN - Koperasi Jasa Sukses Mina Bahari Kota Pekalongan yang merupakan koperasi binaan dan mitra Kementerian Kelautan dan Perikanan (KKP) melakukan uji coba penyaluran makan bergizi gratis di SDN Panjang Wetan 03, Pekalongan Utara pada Rabu, 4 Desember 2024.

Sebanyak 220 kotak makan bergizi disalurkan kepada para siswa. Ketua Koperasi Jasa Sukses Mina Bahari, Kisyono, mengatakan bahwa sebagai koperasi binaan dan mitra KKP, mereka diamanatkan untuk ikut mendukung program pemerintah pusat mengenai makan bergizi gratis.

"Kami sangat mendukung program ini karena sejalan dengan visi kami untuk meningkatkan kesejahteraan masyarakat pesisir, khususnya dalam hal pemenuhan gizi," ujar Kisyono.

Menu makan bergizi yang disediakan sesuai standar KKP meliputi nasi, 2 jenis protein hewani (ikan dan telur ayam), sayuran, buah, dan air minum, dengan estimasi harga per kotak sekitar 15-18 ribu rupiah.

Kepala Dinas Kelautan dan Perikanan (DKP) Kota Pekalongan, Sugiyo, mengucapkan terima kasih kepada Koperasi Jasa Sukses Mina Bahari atas dukungannya terhadap program pemerintah pusat tentang makan bergizi gratis. Ia menyebutkan bahwa ini merupakan bentuk kepedulian dari salah satu koperasi perikanan di Kota Pekalongan.',
 '/gambar/Penyortiran.jpg',
 now() - interval '15 days'),

('fasilitas-cold-storage-technopark-perikanan-pekalongan',
 'Fasilitas Cold Storage di Technopark Perikanan Pekalongan Dukung Industri Perikanan',
 'Koperasi Jasa Mina Bahari mengelola fasilitas cold storage berkapasitas 30 ton dan 100 ton di Technopark Perikanan Kota Pekalongan untuk mendukung para nelayan dan eksportir.',
 'PEKALONGAN - Koperasi Jasa Mina Bahari Pekalongan mengelola fasilitas cold storage yang berlokasi di area Technopark Perikanan di Jalan WR Supratman, bersebelahan dengan pasar ikan tradisional di Panjang Wetan, Kecamatan Pekalongan Utara.

Fasilitas cold storage ini memiliki dua unit dengan kapasitas 30 ton dan 100 ton yang menyediakan layanan penyewaan ruang pembekuan dan pendinginan ikan, jasa pengolahan ikan, serta layanan sewa mobil berpendingin dengan kapasitas 7 ton.

Pembangunan cold storage berkapasitas 100 ton ini mendapat dukungan dana dari Direktorat Penguatan Daya Saing Produk Kelautan dan Perikanan Kementerian Kelautan dan Perikanan dengan nilai sekitar Rp 2,8 miliar.

Gedung cold storage dilengkapi dengan dua fasilitas utama: sistem pembekuan dan penyimpanan. Fasilitas ini sangat penting untuk menjaga kualitas ikan tangkapan para nelayan dan memenuhi standar ekspor produk perikanan.

Pengembangan Technopark Perikanan mengadopsi konsep Blue Economy Investment yang bertujuan memusatkan seluruh produk perikanan, baik dari hasil tangkapan maupun budidaya, untuk mencapai efisiensi biaya melalui pendekatan industri perikanan terpadu dari hulu hingga hilir.

Dengan fasilitas modern ini, Koperasi Jasa Mina Bahari berkomitmen mendukung para nelayan dan pelaku usaha perikanan di Pekalongan untuk meningkatkan nilai jual produk mereka.',
 '/gambar/Ruang Proses Gudang 100ton.jpg',
 now() - interval '30 days'),

('koperasi-jasa-mina-bahari-peran-penting-ekonomi-pesisir',
 'Koperasi Jasa Mina Bahari: Membangun Ekonomi Kerakyatan di Pesisir Pekalongan',
 'Sebagai koperasi binaan KKP, Koperasi Jasa Sukses Mina Bahari berperan penting dalam pemberdayaan masyarakat pesisir dan pengembangan industri perikanan di Kota Pekalongan.',
 'PEKALONGAN - Koperasi Jasa Sukses Mina Bahari telah menjadi salah satu pilar penting dalam pengembangan ekonomi kerakyatan di masyarakat pesisir pantai Kota Pekalongan. Sebagai koperasi yang dibina dan bermitra dengan Kementerian Kelautan dan Perikanan (KKP), koperasi ini terus berkomitmen mendukung kesejahteraan nelayan dan pelaku usaha perikanan.

Di bawah kepemimpinan Ketua Koperasi Kisyono, berbagai program dan layanan telah dikembangkan untuk mendukung industri perikanan lokal. Mulai dari penyediaan fasilitas cold storage modern, layanan pembekuan ikan dengan teknologi Air Blast Freezing (ABF), hingga armada kendaraan berpendingin untuk distribusi produk perikanan.

"Ini adalah wujud komitmen kami dalam membangun ekonomi kerakyatan di masyarakat pesisir pantai Kota Pekalongan. Kami ingin memastikan para nelayan dan pelaku usaha perikanan mendapatkan akses fasilitas yang memadai untuk meningkatkan nilai jual produk mereka," ujar Kisyono.

Koperasi juga aktif dalam berbagai program pemerintah, termasuk program makan bergizi gratis yang memanfaatkan hasil perikanan lokal. Hal ini tidak hanya mendukung program pemerintah, tetapi juga membantu meningkatkan penyerapan hasil tangkapan nelayan lokal.

Dengan lokasi strategis di area Technopark Perikanan dan fasilitas yang terus dikembangkan, Koperasi Jasa Sukses Mina Bahari optimis dapat terus berkontribusi dalam pengembangan industri perikanan yang berkelanjutan dan meningkatkan kesejahteraan masyarakat pesisir Pekalongan.',
 '/gambar/Bahan Baku.jpg',
 now() - interval '45 days');
