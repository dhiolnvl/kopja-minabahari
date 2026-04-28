-- Menambahkan kolom image ke tabel services
ALTER TABLE services ADD COLUMN IF NOT EXISTS image varchar(500);
