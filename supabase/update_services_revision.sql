-- Revisi konten layanan - April 2026
-- Berdasarkan dokumen: Content Revision Mina Bahari.docx

-- Pembekuan Ikan: ubah "Proses pembekuan <4 jam" → "8 jam", hapus "Standar ekspor internasional"
UPDATE services
SET features = '["Blast freezer berkapasitas besar", "Proses pembekuan 8 jam", "Sertifikasi mutu", "Penanganan oleh tenaga ahli"]'
WHERE slug = 'pembekuan-ikan';

-- Cold Storage: ubah "Kapasitas hingga 500 ton" → "Kapasitas 2 Unit 100ton dan 30ton"
UPDATE services
SET features = '["Kapasitas 2 Unit 100ton dan 30ton", "Suhu -18°C s/d -25°C", "Monitoring suhu 24 jam", "Akses mudah dan aman", "Laporan inventaris berkala"]'
WHERE slug = 'cold-storage';

-- Sewa Thermoking: ubah kapasitas, hapus GPS real-time, tambah sewa sesuai jarak tempuh
UPDATE services
SET features = '["Mobil Thermo dengan kapasitas 6-7ton", "Sistem pendingin terpercaya", "Sopir berpengalaman", "Sewa sesuai jarak tempuh"]'
WHERE slug = 'sewa-thermoking';
