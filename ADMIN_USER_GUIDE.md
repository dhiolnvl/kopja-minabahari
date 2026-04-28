# Panduan Pengguna Admin Panel 👨‍💼

Panduan lengkap untuk menggunakan Admin Panel Koperasi Jasa Sukses Mina Bahari.

---

## 📚 Daftar Isi

1. [Login ke Admin Panel](#login-ke-admin-panel)
2. [Dashboard](#dashboard)
3. [Kelola Berita](#kelola-berita)
4. [Kelola Layanan](#kelola-layanan)
5. [Kelola Sertifikat](#kelola-sertifikat)
6. [Kelola Galeri](#kelola-galeri)
7. [Kelola Pesan](#kelola-pesan)
8. [Tips & Tricks](#tips--tricks)

---

## Login ke Admin Panel

### Akses Admin Panel

1. Buka browser (Chrome, Firefox, Safari)
2. Ketik URL: `https://[domain-anda]/admin/login`
3. Masukkan **Email** admin Anda
4. Masukkan **Password** admin Anda
5. Klik tombol **"Login"**

### Jika Lupa Password

Hubungi administrator sistem atau developer untuk reset password.

---

## Dashboard

Halaman utama setelah login. Menampilkan:

### Statistik
- **Total Berita** - Jumlah seluruh berita
- **Total Pesan** - Jumlah pesan dari kontak form
- **Pesan Belum Dibaca** - Pesan yang perlu ditindaklanjuti

### Widget
- **Berita Terbaru** - 5 berita terakhir dengan status
- **Pesan Terbaru** - 5 pesan terakhir

### Navigasi
- Menu di sebelah kiri untuk akses cepat
- Header di atas untuk info user dan link website
- Tombol **"Logout"** di bagian bawah sidebar

---

## Kelola Berita

### Melihat Daftar Berita

1. Klik menu **"Berita"** di sidebar
2. Tabel berita akan muncul dengan kolom:
   - **Judul** - Judul berita dan slug URL
   - **Tanggal** - Tanggal publikasi
   - **Status** - Published (hijau) atau Draft (abu-abu)
   - **Aksi** - Tombol lihat, edit, hapus

### Menambah Berita Baru

1. Klik tombol **"Tambah Berita"** (kanan atas)
2. Isi form:

   **Judul** (Wajib)
   - Contoh: "Peresmian Gudang Cold Storage 100 Ton"
   - Slug akan otomatis dibuat dari judul

   **Slug** (Wajib)
   - URL berita: `/berita/[slug-ini]`
   - Otomatis dari judul, bisa diedit manual
   - Format: huruf kecil, tanpa spasi, pisah dengan `-`

   **Ringkasan** (Opsional)
   - Ringkasan singkat untuk preview
   - Maksimal 2-3 kalimat

   **Konten** (Wajib)
   - Isi berita lengkap
   - Gunakan baris baru untuk paragraf baru
   - Akan otomatis terformat di website

   **URL Gambar** (Opsional)
   - Format: `https://example.com/gambar.jpg`
   - Atau: `/gambar/nama-file.jpg` (jika upload ke server)
   - Preview gambar akan muncul otomatis

   **Penulis** (Opsional)
   - Default: "Admin Koperasi"
   - Bisa diganti dengan nama Anda

   **Publikasikan berita** (Checkbox)
   - ✅ Centang = Tampil di website
   - ☐ Tidak = Tersimpan sebagai draft

3. Klik **"Simpan"**

### Mengedit Berita

1. Di daftar berita, klik icon **✏️ Edit** (biru)
2. Ubah field yang ingin diubah
3. Klik **"Simpan"**

### Menghapus Berita

1. Di daftar berita, klik icon **🗑️ Hapus** (merah)
2. Konfirmasi: Klik **"OK"**
3. Berita akan terhapus permanen

⚠️ **Peringatan:** Berita yang dihapus tidak bisa dikembalikan!

### Melihat Berita di Website

1. Klik icon **👁️ Lihat** di daftar berita
2. Tab baru akan terbuka ke halaman berita di website public

---

## Kelola Layanan

### Menambah Layanan Baru

1. Klik menu **"Layanan"** di sidebar
2. Klik **"Tambah Layanan"**
3. Isi form:

   **Nama Layanan** (Wajib)
   - Contoh: "Jasa Cold Storage"

   **Slug** (Wajib)
   - URL: `/layanan#[slug-ini]`
   - Otomatis dari nama

   **Deskripsi** (Opsional)
   - Penjelasan singkat layanan

   **Icon** (Opsional)
   - Nama icon dari Lucide React
   - Contoh: `Warehouse`, `Snowflake`, `Truck`
   - Lihat: https://lucide.dev/icons

   **Fitur/Keunggulan**
   - Ketik fitur di kotak input
   - Tekan Enter atau klik **+** untuk menambah
   - Klik **X** untuk menghapus fitur

   **Informasi Harga** (Opsional)
   - Contoh: "Hubungi kami untuk penawaran"

   **Aktifkan layanan** (Checkbox)
   - ✅ = Tampil di website
   - ☐ = Tersembunyi

4. Klik **"Simpan"**

### Tips Menulis Fitur Layanan

✅ **Baik:**
- "Kapasitas hingga 500 ton"
- "Suhu -18°C s/d -25°C"
- "Monitoring 24 jam"

❌ **Hindari:**
- Kalimat panjang
- Duplikasi
- Informasi tidak relevan

---

## Kelola Sertifikat

### Menambah Sertifikat

1. Klik menu **"Sertifikat"** di sidebar
2. Klik **"Tambah Sertifikat"**
3. Isi form:

   **Nama Sertifikat** (Wajib)
   - Contoh: "Sertifikat Kelayakan Pengolahan (SKP)"

   **Lembaga Penerbit** (Wajib)
   - Contoh: "Kementerian Kelautan dan Perikanan RI"

   **Tanggal Terbit** (Opsional)
   - Pilih dari calendar
   - Format: DD/MM/YYYY

   **Nomor Sertifikat** (Opsional)
   - Contoh: "SKP/2024/001"

   **Deskripsi** (Opsional)
   - Keterangan singkat sertifikat

   **URL Gambar Sertifikat** (Opsional)
   - Scan atau foto sertifikat
   - Format: JPG, PNG
   - Upload ke server atau gunakan URL

   **Urutan Tampilan** (Angka)
   - Semakin kecil = semakin di atas
   - Contoh: 0, 1, 2, 3...

   **Aktifkan sertifikat** (Checkbox)
   - ✅ = Tampil di website
   - ☐ = Tersembunyi

4. Klik **"Simpan"**

### Upload Gambar Sertifikat

**Cara 1: Upload ke Server**
1. Upload file ke folder `public/gambar/`
2. Isi URL: `/gambar/nama-sertifikat.jpg`

**Cara 2: Upload ke Supabase Storage**
1. Buka Supabase Dashboard > Storage
2. Upload file
3. Copy Public URL
4. Paste ke field "URL Gambar"

**Cara 3: Gunakan URL Eksternal**
1. Upload ke Google Drive / Dropbox (set public)
2. Copy direct link
3. Paste ke field "URL Gambar"

---

## Kelola Galeri

### Menambah Foto ke Galeri

1. Klik menu **"Galeri"** di sidebar
2. Klik **"Tambah Foto"**
3. Isi form:

   **Judul Foto** (Wajib)
   - Contoh: "Ruang Cold Storage"

   **Deskripsi** (Opsional)
   - Penjelasan singkat foto

   **URL Gambar** (Wajib)
   - Upload foto terlebih dahulu
   - Masukkan URL foto

   **Kategori** (Dropdown)
   - **Fasilitas** - Gedung, ruangan, peralatan
   - **Kegiatan** - Event, pelatihan, kegiatan
   - **Produk** - Produk hasil olahan
   - **Lainnya** - Kategori lain

   **Urutan Tampilan** (Angka)
   - Untuk mengatur posisi foto

   **Aktifkan foto** (Checkbox)
   - ✅ = Tampil di website
   - ☐ = Tersembunyi

4. Klik **"Simpan"**

### Tips Foto Galeri

**Resolusi Ideal:**
- Minimal: 1280 x 720 px (HD)
- Recommended: 1920 x 1080 px (Full HD)
- Aspect ratio: 16:9

**Format File:**
- JPG (untuk foto)
- PNG (jika ada transparansi)
- Maksimal 2 MB per file

**Kualitas Foto:**
- Pencahayaan baik
- Tidak blur
- Fokus jelas
- Komposisi rapi

---

## Kelola Pesan

### Melihat Pesan dari Kontak Form

1. Klik menu **"Pesan"** di sidebar
2. Daftar pesan akan muncul

### Membaca Pesan

1. Klik pada card pesan (atau tombol expand ⌄)
2. Detail pesan akan terbuka
3. Pesan otomatis ditandai "sudah dibaca"

### Informasi dalam Pesan

- **Nama** - Nama pengirim
- **Email** - Email pengirim (klik untuk kirim email)
- **Telepon** - Nomor HP (jika diisi)
- **Layanan** - Layanan yang diminati
- **Pesan** - Isi pesan lengkap
- **Tanggal** - Kapan pesan dikirim

### Menandai Pesan

**Mark as Read/Unread**
1. Klik icon 📧 (untuk tandai belum dibaca)
2. Klik icon 📩 (untuk tandai sudah dibaca)

### Menghapus Pesan

1. Klik icon **🗑️ Hapus**
2. Konfirmasi: Klik **"OK"**

⚠️ **Peringatan:** Pesan yang dihapus tidak bisa dikembalikan!

---

## Tips & Tricks

### 💡 Best Practices

**Upload Gambar:**
- Kompres gambar sebelum upload
- Gunakan nama file yang jelas (tanpa spasi)
- Format: `nama-file-tanpa-spasi.jpg`

**Menulis Konten:**
- Gunakan bahasa yang jelas dan mudah dipahami
- Hindari typo - baca ulang sebelum publish
- Pisahkan paragraf dengan baris baru

**SEO (Search Engine Optimization):**
- Slug yang baik: pendek, jelas, mengandung keyword
- Judul menarik dan informatif
- Isi ringkasan dengan baik
- Tambahkan gambar untuk setiap berita

### ⌨️ Keyboard Shortcuts

- `Ctrl + S` / `Cmd + S` - Simpan form (di beberapa browser)
- `Esc` - Tutup modal/dialog
- `Tab` - Pindah field berikutnya

### 📱 Mobile Usage

Admin panel sudah responsive! Bisa diakses dari:
- Smartphone (Android/iOS)
- Tablet
- Desktop/Laptop

### 🔒 Keamanan

**Jaga Keamanan Akun:**
- Jangan share password
- Logout setelah selesai
- Gunakan password yang kuat
- Akses dari jaringan yang aman

**Jika Akun Terindikasi Diretas:**
1. Segera logout dari semua device
2. Hubungi administrator
3. Ganti password

### 🆘 Troubleshooting

**Tidak bisa login?**
- Cek email dan password
- Pastikan koneksi internet stabil
- Clear browser cache
- Coba browser lain

**Gambar tidak muncul?**
- Cek URL gambar benar
- Pastikan file ada di server
- Cek format file (JPG/PNG)
- Coba hard refresh: Ctrl + F5

**Perubahan tidak tersimpan?**
- Pastikan klik tombol "Simpan"
- Cek koneksi internet
- Lihat error message (jika ada)
- Coba lagi atau refresh page

**Lupa apa yang sudah diubah?**
- Lihat timestamp "updated_at" di database
- Atau check history browser

---

## 📞 Bantuan

Jika mengalami masalah teknis yang tidak bisa diselesaikan:

1. **Screenshot** error/masalah yang terjadi
2. **Catat** langkah-langkah yang dilakukan
3. **Hubungi** administrator sistem atau developer
4. **Jelaskan** masalah dengan detail

---

## 🎓 Video Tutorial

_(Coming soon)_

Untuk video tutorial cara menggunakan admin panel, silakan hubungi administrator.

---

**Versi:** 1.0
**Update Terakhir:** April 2025
**Contact:** admin@koperasiminabahari.com
