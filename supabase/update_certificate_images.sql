-- Update sertifikat yang sudah ada untuk set gambar ke null
-- Jalankan script ini jika Anda sudah menjalankan migration dan ingin reset gambar

-- Set semua gambar sertifikat ke null (hapus URL gambar yang tidak valid)
update certificates
set image = null
where image like '/gambar/sertifikat%' or image like '/gambar/nib%';

-- Atau jika ingin update satu per satu:
-- update certificates set image = null where certificate_number = 'SKP/2024/001';
-- update certificates set image = null where certificate_number = 'SKP/2024/002';
-- update certificates set image = null where certificate_number = 'NIB123456789';
