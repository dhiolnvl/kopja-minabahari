# Website Company Profile - Koperasi Sukses Mina Bahari

Website company profile untuk Koperasi Sukses Mina Bahari Pekalongan dengan fitur lengkap cold storage, pembekuan ikan, dan sewa thermoking.

## 🚀 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: Supabase (PostgreSQL)
- **Form Handling**: React Hook Form + Zod
- **Icons**: Lucide React
- **SEO**: Next.js Metadata API, Sitemap, robots.txt, JSON-LD

## 📁 Struktur Project

```
/
├── app/
│   ├── layout.tsx              # Root layout
│   ├── page.tsx                # Homepage
│   ├── tentang-kami/
│   │   └── page.tsx
│   ├── layanan/
│   │   ├── page.tsx
│   │   ├── cold-storage/
│   │   ├── pembekuan-ikan/
│   │   └── sewa-thermoking/
│   ├── kontak/
│   │   ├── page.tsx
│   │   └── actions.ts          # Server Actions
│   ├── sitemap.ts
│   └── robots.ts
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx
│   │   └── Footer.tsx
│   ├── home/
│   │   ├── Hero.tsx
│   │   ├── Services.tsx
│   │   ├── Stats.tsx
│   │   ├── WhyUs.tsx
│   │   └── ContactCTA.tsx
│   ├── shared/
│   │   ├── ServiceCard.tsx
│   │   ├── ContactForm.tsx
│   │   └── WhatsAppButton.tsx
│   └── seo/
│       └── JsonLd.tsx
├── lib/
│   ├── supabase/
│   │   ├── client.ts
│   │   ├── server.ts
│   │   └── types.ts
│   └── utils.ts
└── supabase/
    └── migrations/
        └── 001_initial_schema.sql
```

## 🛠️ Setup Instructions

### 1. Clone & Install Dependencies

```bash
npm install
```

### 2. Setup Supabase

1. Buat project baru di [Supabase](https://supabase.com)
2. Jalankan migration SQL di Supabase Dashboard:
   - Buka SQL Editor
   - Copy paste isi file `supabase/migrations/001_initial_schema.sql`
   - Execute query

### 3. Environment Variables

Copy `.env.local.example` ke `.env.local` dan isi dengan credentials Supabase Anda:

```bash
cp .env.local.example .env.local
```

Edit `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_WHATSAPP_NUMBER=628156567587
```

**Cara mendapatkan Supabase credentials:**
- URL & Anon Key: Supabase Dashboard → Settings → API

### 4. Jalankan Development Server

```bash
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000)

### 5. Build Production

```bash
npm run build
npm start
```

## 📊 Database Schema

Project ini menggunakan 3 tabel utama:

### `contact_messages`
Menyimpan pesan dari form kontak

### `services`
Menyimpan data layanan (cold storage, pembekuan ikan, sewa thermoking)

### `company_stats`
Menyimpan statistik perusahaan (kapasitas, pengalaman, dll)

Data seed sudah termasuk dalam migration SQL.

## 🎨 Customization

### Mengubah Warna

Edit file `app/globals.css`:

```css
:root {
  --primary: #0A3D62;        /* Biru laut */
  --accent: #F39C12;          /* Oranye/emas */
  /* ... */
}
```

### Mengubah Konten

- **Data layanan & statistik**: Edit langsung di Supabase Dashboard
- **Konten statis**: Edit file di `app/` dan `components/`

### Menambah Halaman Baru

1. Buat folder baru di `app/`
2. Tambahkan `page.tsx`
3. Update navbar di `components/layout/Navbar.tsx`
4. Update sitemap di `app/sitemap.ts`

## ✅ Fitur

- ✅ Responsive design (mobile-first)
- ✅ SEO optimized (metadata, sitemap, robots.txt)
- ✅ JSON-LD structured data
- ✅ Contact form dengan validasi
- ✅ WhatsApp floating button
- ✅ Dynamic data dari Supabase
- ✅ Server-side rendering
- ✅ Type-safe dengan TypeScript

## 🔧 Scripts

```bash
npm run dev      # Development server
npm run build    # Build production
npm start        # Start production server
npm run lint     # Run ESLint
```

## 📝 Catatan Penting

1. **Supabase RLS**: Row Level Security sudah dikonfigurasi untuk public read access
2. **Form Submission**: Menggunakan Server Actions untuk keamanan
3. **Type Safety**: Semua Supabase queries menggunakan TypeScript types
4. **SEO**: Setiap halaman memiliki metadata yang optimal

## 🚀 Deployment

### Vercel (Recommended)

1. Push code ke GitHub
2. Import project di [Vercel](https://vercel.com)
3. Tambahkan environment variables
4. Deploy!

### Manual Deployment

```bash
npm run build
```

Upload folder `.next`, `public`, dan `package.json` ke server Anda.

## 📞 Support

Untuk pertanyaan atau bantuan:
- Email: info@suksesminabahari.com
- WhatsApp: +62 812-3456-7890

## 📄 License

© 2024 Koperasi Sukses Mina Bahari. All rights reserved.
