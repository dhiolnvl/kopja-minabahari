# QA Testing Documentation
## Koperasi Jasa Sukses Mina Bahari

Dokumentasi lengkap untuk testing aplikasi website dan admin panel.

---

## 📋 Table of Contents

1. [Prerequisites](#prerequisites)
2. [Setup Testing Environment](#setup-testing-environment)
3. [Admin Panel Testing](#admin-panel-testing)
4. [Public Website Testing](#public-website-testing)
5. [Database Testing](#database-testing)
6. [Known Issues](#known-issues)
7. [Bug Report Template](#bug-report-template)

---

## Prerequisites

### Required Access
- [ ] Supabase project access
- [ ] Admin user credentials
- [ ] Local development environment running
- [ ] Database migrations completed

### Test Data Requirements
- [ ] At least 1 admin user in `admin_users` table
- [ ] Sample images in `public/gambar/` folder
- [ ] Internet connection for external resources

---

## Setup Testing Environment

### 1. Database Migration Check

**Jalankan di Supabase SQL Editor:**

```sql
-- Check if all tables exist
SELECT table_name
FROM information_schema.tables
WHERE table_schema = 'public'
AND table_name IN ('admin_users', 'news', 'services', 'certificates', 'gallery', 'contact_messages', 'company_stats');

-- Check if functions exist
SELECT routine_name
FROM information_schema.routines
WHERE routine_schema = 'public'
AND routine_name IN ('is_admin', 'is_super_admin');
```

**Expected Result:** Semua 7 tabel dan 2 function harus ada.

### 2. Admin User Setup

```sql
-- Check existing admin users
SELECT id, email, full_name, role, created_at
FROM admin_users;
```

**Expected Result:** Minimal 1 user dengan role `super_admin`.

### 3. Local Server Check

```bash
# Start development server
npm run dev

# Expected: Server running on http://localhost:3000
```

---

## Admin Panel Testing

### 🔐 A. Authentication Testing

#### Test Case 1.1: Admin Login - Valid Credentials
**Steps:**
1. Buka `http://localhost:3000/admin/login`
2. Input email admin yang valid
3. Input password yang benar
4. Klik tombol "Login"

**Expected Result:**
- ✅ Redirect ke `/admin/dashboard`
- ✅ Header menampilkan nama user dan email
- ✅ Sidebar navigation muncul

**Status:** [ ] Pass [ ] Fail

---

#### Test Case 1.2: Admin Login - Invalid Credentials
**Steps:**
1. Buka `http://localhost:3000/admin/login`
2. Input email yang salah atau password yang salah
3. Klik tombol "Login"

**Expected Result:**
- ✅ Error message muncul
- ✅ Tetap di halaman login
- ✅ Form tidak di-clear

**Status:** [ ] Pass [ ] Fail

---

#### Test Case 1.3: Admin Login - Non-Admin User
**Steps:**
1. Buat user baru di Supabase Auth (tanpa insert ke `admin_users`)
2. Login dengan user tersebut

**Expected Result:**
- ✅ Error: "Anda tidak memiliki akses admin"
- ✅ User di-sign out otomatis

**Status:** [ ] Pass [ ] Fail

---

#### Test Case 1.4: Middleware Protection
**Steps:**
1. Tanpa login, akses langsung `http://localhost:3000/admin/dashboard`

**Expected Result:**
- ✅ Redirect ke `/admin/login`

**Status:** [ ] Pass [ ] Fail

---

#### Test Case 1.5: Logout
**Steps:**
1. Login sebagai admin
2. Klik tombol "Logout" di sidebar

**Expected Result:**
- ✅ Redirect ke `/admin/login`
- ✅ Session cleared
- ✅ Tidak bisa akses admin pages lagi

**Status:** [ ] Pass [ ] Fail

---

### 📰 B. News Management Testing

#### Test Case 2.1: View News List
**Steps:**
1. Login sebagai admin
2. Klik menu "Berita" di sidebar

**Expected Result:**
- ✅ Tabel berita ditampilkan
- ✅ Kolom: Judul, Tanggal, Status, Aksi
- ✅ Badge "Published" / "Draft" sesuai status
- ✅ Tombol "Tambah Berita" terlihat

**Status:** [ ] Pass [ ] Fail

---

#### Test Case 2.2: Create News
**Steps:**
1. Klik "Tambah Berita"
2. Isi form:
   - Judul: "Test Berita QA"
   - Slug: auto-generate dari judul (edit jika perlu)
   - Ringkasan: "Ini adalah berita test QA"
   - Konten: "Konten lengkap berita test"
   - URL Gambar: `/gambar/Bahan Baku.jpg`
   - Penulis: "Admin Test"
   - Centang "Publikasikan berita"
3. Klik "Simpan"

**Expected Result:**
- ✅ Redirect ke `/admin/news`
- ✅ Berita baru muncul di list
- ✅ Status "Published"
- ✅ Preview gambar terlihat di form sebelum save

**Status:** [ ] Pass [ ] Fail

---

#### Test Case 2.3: Edit News
**Steps:**
1. Di list berita, klik icon "Edit" (pensil biru)
2. Ubah judul menjadi "Test Berita QA - Updated"
3. Klik "Simpan"

**Expected Result:**
- ✅ Redirect ke `/admin/news`
- ✅ Judul berita ter-update
- ✅ Timestamp `updated_at` berubah

**Status:** [ ] Pass [ ] Fail

---

#### Test Case 2.4: Delete News
**Steps:**
1. Di list berita, klik icon "Hapus" (tempat sampah merah)
2. Konfirmasi dialog "Apakah Anda yakin..."
3. Klik OK

**Expected Result:**
- ✅ Berita terhapus dari list
- ✅ Page refresh otomatis
- ✅ Berita tidak muncul lagi

**Status:** [ ] Pass [ ] Fail

---

#### Test Case 2.5: View Published News (Public)
**Steps:**
1. Buat berita dengan status "Published"
2. Buka `http://localhost:3000/berita`
3. Klik berita yang baru dibuat

**Expected Result:**
- ✅ Berita tampil di halaman public
- ✅ Judul, gambar, konten sesuai
- ✅ SEO meta tags ter-set
- ✅ Breadcrumb JSON-LD ada

**Status:** [ ] Pass [ ] Fail

---

### 🛠️ C. Services Management Testing

#### Test Case 3.1: View Services List
**Steps:**
1. Klik menu "Layanan" di sidebar

**Expected Result:**
- ✅ Grid cards layanan ditampilkan
- ✅ Badge "Aktif" / "Nonaktif"
- ✅ Tombol "Tambah Layanan"

**Status:** [ ] Pass [ ] Fail

---

#### Test Case 3.2: Create Service
**Steps:**
1. Klik "Tambah Layanan"
2. Isi form:
   - Nama: "Test Layanan QA"
   - Slug: "test-layanan-qa"
   - Deskripsi: "Layanan untuk testing QA"
   - Icon: "Warehouse"
   - Tambah fitur: "Fitur 1", "Fitur 2", "Fitur 3"
   - Informasi Harga: "Hubungi kami"
   - Centang "Aktifkan layanan"
3. Klik "Simpan"

**Expected Result:**
- ✅ Redirect ke `/admin/services`
- ✅ Layanan baru muncul di grid
- ✅ Fitur tersimpan sebagai array JSON

**Status:** [ ] Pass [ ] Fail

---

#### Test Case 3.3: Edit Service Features
**Steps:**
1. Edit layanan yang sudah ada
2. Hapus 1 fitur dengan tombol X
3. Tambah 1 fitur baru
4. Klik "Simpan"

**Expected Result:**
- ✅ Fitur yang dihapus hilang
- ✅ Fitur baru muncul
- ✅ Array JSON ter-update di database

**Status:** [ ] Pass [ ] Fail

---

#### Test Case 3.4: Toggle Service Active Status
**Steps:**
1. Edit layanan
2. Uncheck "Aktifkan layanan"
3. Simpan

**Expected Result:**
- ✅ Badge berubah menjadi "Nonaktif"
- ✅ Layanan tidak tampil di website public

**Status:** [ ] Pass [ ] Fail

---

### 🏆 D. Certificates Management Testing

#### Test Case 4.1: Create Certificate
**Steps:**
1. Klik menu "Sertifikat"
2. Klik "Tambah Sertifikat"
3. Isi form:
   - Nama: "SKP Test QA"
   - Lembaga Penerbit: "KKP RI"
   - Tanggal Terbit: Pilih tanggal
   - Nomor: "SKP/2025/TEST"
   - Deskripsi: "Sertifikat test QA"
   - URL Gambar: (kosongkan atau isi valid URL)
   - Urutan: 0
   - Centang "Aktifkan"
4. Simpan

**Expected Result:**
- ✅ Sertifikat muncul di tabel
- ✅ Jika gambar kosong, icon Award muncul
- ✅ Tanggal ter-format Indonesia

**Status:** [ ] Pass [ ] Fail

---

#### Test Case 4.2: Certificate Image Handling
**Steps:**
1. Edit sertifikat
2. Isi URL gambar dengan URL yang tidak valid
3. Simpan dan kembali ke list

**Expected Result:**
- ✅ Icon Award (🏆) muncul sebagai placeholder
- ✅ Tidak ada broken image
- ✅ Tidak ada error di console

**Status:** [ ] Pass [ ] Fail

---

#### Test Case 4.3: Sort Order
**Steps:**
1. Buat 3 sertifikat dengan sort_order: 3, 1, 2
2. Refresh page

**Expected Result:**
- ✅ Sertifikat tersusun: 1, 2, 3
- ✅ ORDER BY sort_order ASC berfungsi

**Status:** [ ] Pass [ ] Fail

---

### 🖼️ E. Gallery Management Testing

#### Test Case 5.1: Create Gallery Item
**Steps:**
1. Klik menu "Galeri"
2. Klik "Tambah Foto"
3. Isi form:
   - Judul: "Test Foto QA"
   - Deskripsi: "Foto untuk testing"
   - URL Gambar: `/gambar/Bahan Baku.jpg`
   - Kategori: "Kegiatan"
   - Urutan: 0
   - Centang "Aktifkan"
4. Simpan

**Expected Result:**
- ✅ Foto muncul di grid
- ✅ Preview gambar terlihat
- ✅ Badge kategori sesuai
- ✅ Icon status aktif (✓) muncul

**Status:** [ ] Pass [ ] Fail

---

#### Test Case 5.2: Gallery Grid Layout
**Steps:**
1. Buat 8 foto galeri
2. View di desktop, tablet, mobile (responsive)

**Expected Result:**
- ✅ Desktop: 4 kolom
- ✅ Tablet: 3 kolom
- ✅ Mobile: 1 kolom
- ✅ Aspect ratio 16:9 konsisten

**Status:** [ ] Pass [ ] Fail

---

#### Test Case 5.3: Category Filter Display
**Steps:**
1. Buat foto dengan berbagai kategori
2. Lihat badge kategori di card

**Expected Result:**
- ✅ facility → "Fasilitas"
- ✅ activity → "Kegiatan"
- ✅ product → "Produk"
- ✅ other → "Lainnya"

**Status:** [ ] Pass [ ] Fail

---

### 💬 F. Messages Management Testing

#### Test Case 6.1: View Messages
**Steps:**
1. Klik menu "Pesan"

**Expected Result:**
- ✅ List pesan ditampilkan
- ✅ Pesan belum dibaca ada badge/highlight
- ✅ Count "X pesan belum dibaca" di header

**Status:** [ ] Pass [ ] Fail

---

#### Test Case 6.2: Mark as Read
**Steps:**
1. Klik expand pesan yang belum dibaca
2. Pesan otomatis ter-mark as read

**Expected Result:**
- ✅ Icon berubah dari Mail → MailOpen
- ✅ Highlight/background berubah
- ✅ Count pesan belum dibaca berkurang

**Status:** [ ] Pass [ ] Fail

---

#### Test Case 6.3: Toggle Read Status
**Steps:**
1. Klik icon MailOpen (mark as unread)

**Expected Result:**
- ✅ Status berubah kembali ke unread
- ✅ Count bertambah

**Status:** [ ] Pass [ ] Fail

---

#### Test Case 6.4: Delete Message
**Steps:**
1. Klik icon trash
2. Konfirmasi

**Expected Result:**
- ✅ Pesan terhapus
- ✅ Page refresh

**Status:** [ ] Pass [ ] Fail

---

### 📊 G. Dashboard Testing

#### Test Case 7.1: Statistics Display
**Steps:**
1. Akses `/admin/dashboard`

**Expected Result:**
- ✅ Card "Total Berita" menampilkan count benar
- ✅ Card "Total Pesan" menampilkan count benar
- ✅ Card "Pesan Belum Dibaca" menampilkan count benar
- ✅ Icon di setiap card sesuai

**Status:** [ ] Pass [ ] Fail

---

#### Test Case 7.2: Recent News Widget
**Steps:**
1. Lihat section "Berita Terbaru"

**Expected Result:**
- ✅ Maksimal 5 berita terbaru
- ✅ Sorted by published_at DESC
- ✅ Badge Published/Draft sesuai

**Status:** [ ] Pass [ ] Fail

---

#### Test Case 7.3: Recent Messages Widget
**Steps:**
1. Lihat section "Pesan Terbaru"

**Expected Result:**
- ✅ Maksimal 5 pesan terbaru
- ✅ Sorted by created_at DESC
- ✅ Dot orange untuk unread

**Status:** [ ] Pass [ ] Fail

---

## Public Website Testing

### 🏠 H. Homepage Testing

#### Test Case 8.1: Hero Section
**Steps:**
1. Buka `http://localhost:3000`

**Expected Result:**
- ✅ Hero section terlihat
- ✅ Navbar ada dan sticky
- ✅ No header dari admin panel

**Status:** [ ] Pass [ ] Fail

---

#### Test Case 8.2: News Section
**Steps:**
1. Scroll ke section "Berita & Kegiatan"

**Expected Result:**
- ✅ Maksimal 3 berita terbaru
- ✅ Card layout responsive
- ✅ Tombol "Lihat Semua Berita" muncul jika >= 3 berita

**Status:** [ ] Pass [ ] Fail

---

#### Test Case 8.3: Footer & WhatsApp Button
**Steps:**
1. Scroll ke bottom

**Expected Result:**
- ✅ Footer terlihat
- ✅ WhatsApp button floating di kanan bawah
- ✅ No footer di halaman admin

**Status:** [ ] Pass [ ] Fail

---

### 📄 I. Berita Page Testing

#### Test Case 9.1: News List Page
**Steps:**
1. Buka `/berita`

**Expected Result:**
- ✅ Hanya berita dengan `is_published = true` yang tampil
- ✅ Sorted by published_at DESC
- ✅ Card responsive

**Status:** [ ] Pass [ ] Fail

---

#### Test Case 9.2: News Detail Page
**Steps:**
1. Klik salah satu berita
2. Check URL: `/berita/[slug]`

**Expected Result:**
- ✅ Breadcrumb JSON-LD ada (view page source)
- ✅ Article JSON-LD ada
- ✅ OG meta tags ter-set
- ✅ Konten paragraf ter-split dengan benar

**Status:** [ ] Pass [ ] Fail

---

#### Test Case 9.3: News Not Found
**Steps:**
1. Akses `/berita/slug-yang-tidak-ada`

**Expected Result:**
- ✅ 404 page muncul

**Status:** [ ] Pass [ ] Fail

---

## Database Testing

### 🗄️ J. RLS Policy Testing

#### Test Case 10.1: Public Can Read Published News
**Steps:**
```sql
-- Tanpa authentication
SELECT * FROM news WHERE is_published = true;
```

**Expected Result:**
- ✅ Data muncul

**Status:** [ ] Pass [ ] Fail

---

#### Test Case 10.2: Public Cannot Read Draft News
**Steps:**
```sql
-- Tanpa authentication
SELECT * FROM news WHERE is_published = false;
```

**Expected Result:**
- ✅ No rows returned (RLS blocked)

**Status:** [ ] Pass [ ] Fail

---

#### Test Case 10.3: Admin Can CRUD News
**Steps:**
1. Login sebagai admin
2. Test insert, update, delete via admin panel

**Expected Result:**
- ✅ Semua operasi berhasil
- ✅ No RLS errors

**Status:** [ ] Pass [ ] Fail

---

#### Test Case 10.4: Non-Admin Cannot CRUD
**Steps:**
1. Login sebagai regular user (not in admin_users)
2. Try to insert via SQL:
```sql
INSERT INTO news (slug, title, content)
VALUES ('test', 'Test', 'Test');
```

**Expected Result:**
- ✅ Error: RLS policy violation

**Status:** [ ] Pass [ ] Fail

---

## Known Issues

### Issue Tracker

| ID | Issue | Severity | Status | Notes |
|----|-------|----------|--------|-------|
| 001 | Gambar sertifikat seed data tidak ada | Low | Fixed | Gunakan null untuk image |
| 002 | Placeholder image tidak ada di public | Low | Fixed | Gunakan icon fallback |
| 003 | - | - | - | - |

---

## Bug Report Template

```markdown
### Bug Report #[NUMBER]

**Title:** [Short description]

**Environment:**
- Browser: [Chrome/Firefox/Safari]
- OS: [Windows/Mac/Linux]
- Node version: [X.X.X]
- Database: [Supabase]

**Steps to Reproduce:**
1.
2.
3.

**Expected Behavior:**
[What should happen]

**Actual Behavior:**
[What actually happens]

**Screenshots:**
[If applicable]

**Console Errors:**
```
[Paste error logs]
```

**Additional Context:**
[Any other information]

**Priority:** [Critical/High/Medium/Low]
```

---

## Testing Checklist Summary

### Admin Panel
- [ ] Authentication (5 tests)
- [ ] News Management (5 tests)
- [ ] Services Management (4 tests)
- [ ] Certificates Management (3 tests)
- [ ] Gallery Management (3 tests)
- [ ] Messages Management (4 tests)
- [ ] Dashboard (3 tests)

### Public Website
- [ ] Homepage (3 tests)
- [ ] Berita Page (3 tests)

### Database
- [ ] RLS Policies (4 tests)

**Total Test Cases:** 37

---

## Test Execution Log

**Date:** _______________
**Tester:** _______________
**Environment:** _______________

**Summary:**
- Total: 37
- Passed: ___
- Failed: ___
- Blocked: ___
- Pass Rate: ___%

**Notes:**
_______________________________________
_______________________________________
_______________________________________
