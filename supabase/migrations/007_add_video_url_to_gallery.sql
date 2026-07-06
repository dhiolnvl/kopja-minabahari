-- Menambahkan kolom video_url ke tabel gallery dan membuat kolom image nullable
ALTER TABLE gallery ADD COLUMN IF NOT EXISTS video_url varchar(500);
ALTER TABLE gallery ALTER COLUMN image DROP NOT NULL;
