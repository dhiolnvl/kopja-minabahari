# Setup Admin Panel

Dokumentasi untuk setup admin panel Koperasi Jasa Sukses Mina Bahari.

## 1. Jalankan Migrations

**PENTING:** Gunakan file migration yang sudah diperbaiki untuk menghindari infinite recursion error.

### Opsi A: Setup Baru (Belum pernah jalankan migration)

Jalankan migration file yang sudah diperbaiki:

```bash
# Supabase Dashboard > SQL Editor > New Query
# Copy paste isi file: supabase/migrations/002_admin_auth_fixed.sql
# Kemudian klik "Run"
```

### Opsi B: Sudah Jalankan Migration Lama (Ada Error Infinite Recursion)

Jika Anda sudah jalankan `002_admin_auth.sql` dan mendapat error:
```
infinite recursion detected in policy for relation "admin_users"
```

Jalankan fix script:

```bash
# Supabase Dashboard > SQL Editor > New Query
# Copy paste isi file: supabase/fix_infinite_recursion.sql
# Kemudian klik "Run"
```

## 2. Buat Admin User

### Opsi A: Melalui Supabase Dashboard (Recommended)

1. Buka Supabase Dashboard → Authentication → Users
2. Klik "Add user" atau "Invite user"
3. Masukkan email dan password untuk admin
4. Copy UUID user yang baru dibuat
5. Buka SQL Editor dan jalankan query berikut (ganti `USER_UUID` dan email):

```sql
INSERT INTO admin_users (id, email, full_name, role)
VALUES (
  'USER_UUID_DISINI',
  'admin@koperasiminabahari.com',
  'Admin Koperasi',
  'super_admin'
);
```

### Opsi B: Melalui Signup (harus disable RLS sementara)

1. Buat route signup sementara atau disable RLS untuk `admin_users`
2. Signup user baru
3. Tambahkan ke `admin_users` table via Dashboard

## 3. Login ke Admin Panel

1. Buka browser ke: `http://localhost:3000/admin/login`
2. Login dengan email dan password yang sudah dibuat
3. Anda akan diarahkan ke dashboard admin

## Fitur Admin Panel

### Dashboard (`/admin/dashboard`)
- Statistik total berita, pesan, dan pesan belum dibaca
- List berita terbaru
- List pesan terbaru

### Kelola Berita (`/admin/news`)
- Lihat semua berita
- Tambah berita baru
- Edit berita
- Hapus berita
- Publish/unpublish berita

### Kelola Pesan (`/admin/messages`)
- Lihat semua pesan kontak
- Tandai sebagai sudah dibaca/belum dibaca
- Hapus pesan
- View detail pesan lengkap

## Security

- Semua route `/admin/*` (kecuali `/admin/login`) dilindungi oleh middleware
- User harus login DAN ada di tabel `admin_users` untuk akses admin panel
- RLS policies memastikan hanya admin yang bisa CRUD data

## Role System

Saat ini ada 2 role:
- `admin`: Admin biasa
- `super_admin`: Super admin (bisa manage admin users)

Untuk fitur manage admin users, bisa dikembangkan lebih lanjut di `/admin/users` (belum dibuat).

## Troubleshooting

### Error: "infinite recursion detected in policy"

**Penyebab:** Policy yang mengecek `auth.uid() in (select id from admin_users)` menyebabkan loop karena untuk cek policy, dia perlu query table yang sama.

**Solusi:** Jalankan `supabase/fix_infinite_recursion.sql` di SQL Editor.

**Penjelasan Fix:**
- Function `is_admin()` dan `is_super_admin()` dibuat dengan `SECURITY DEFINER` yang bypass RLS
- Policy diubah dari `auth.uid() in (select...)` menjadi menggunakan function
- Policy untuk read dipecah: user bisa read record sendiri, super admin bisa read semua

### "Anda tidak memiliki akses admin"

Pastikan:
1. User sudah ada di `auth.users`
2. User UUID sudah ada di `admin_users` table
3. Migration sudah dijalankan dengan benar
4. Tidak ada error infinite recursion (cek di browser console)

### Error di middleware

Pastikan environment variables sudah di-set:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### Tidak bisa CRUD berita

Pastikan RLS policies sudah dibuat dengan benar. Jika masih error, coba:
1. Cek browser console untuk error detail
2. Jalankan fix_infinite_recursion.sql
3. Refresh browser (hard refresh: Cmd+Shift+R atau Ctrl+Shift+R)
