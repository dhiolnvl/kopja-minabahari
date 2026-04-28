-- Menambahkan kolom image2 ke tabel services
ALTER TABLE services ADD COLUMN IF NOT EXISTS image2 varchar(500);
