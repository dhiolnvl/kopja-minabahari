# 🚀 Quick Start: Generate PDF Documentation

Panduan singkat untuk generate PDF dari dokumentasi.

---

## 🎯 Cara Tercepat (5 detik)

### 1️⃣ Buka HTML Converter

```bash
# Dari root project
open docs/convert-to-pdf.html

# Atau double-click file di Finder/Explorer
```

### 2️⃣ Pilih & Load

1. Pilih dokumen dari dropdown
2. Klik "Load Document"
3. Wait 1-2 detik

### 3️⃣ Print to PDF

**Mac:**
```
Cmd + P → Save as PDF
```

**Windows:**
```
Ctrl + P → Save as PDF
```

**Done!** ✅

---

## 📸 Screenshot Tutorial

### Step 1: Buka convert-to-pdf.html
```
┌─────────────────────────────────────┐
│  📄 Documentation to PDF Converter  │
│                                     │
│  Pilih dokumen:                     │
│  [▼ QA Testing Documentation ]      │
│                                     │
│  [ Load Document ]  [ Print to PDF ]│
└─────────────────────────────────────┘
```

### Step 2: Pilih Dokumen
```
Dropdown options:
  ▼ -- Pilih Dokumen --
    QA Testing Documentation
    Quick Test Checklist
    Admin User Guide
    Admin Setup Guide
```

### Step 3: Print Dialog
```
┌─────────────────────────────────────┐
│  Print                              │
│                                     │
│  Destination: [ Save as PDF ▼ ]    │
│  Pages: ⦿ All  ○ Selection         │
│  Copies: [1]                        │
│                                     │
│  [ Cancel ]         [ Save ]        │
└─────────────────────────────────────┘
```

---

## 🔧 Advanced: Auto-Generate All PDFs

### Opsi A: Install Pandoc (One-time)

**Mac:**
```bash
brew install pandoc
```

**Windows (Chocolatey):**
```bash
choco install pandoc
```

**Linux (Ubuntu/Debian):**
```bash
sudo apt-get install pandoc
```

### Opsi B: Run Script

```bash
cd docs
./generate-pdf.sh
```

**Output:**
```
✅ docs/pdf/QA_Testing_Documentation.pdf
✅ docs/pdf/Quick_Test_Checklist.pdf
✅ docs/pdf/Admin_User_Guide.pdf
✅ docs/pdf/Admin_Setup_Guide.pdf
```

---

## 🎨 Custom PDF Settings

### Browser Print Settings

**Untuk hasil terbaik:**

1. **Layout:** Portrait (kecuali ada tabel lebar)
2. **Margins:** Default atau Custom (0.5 inch)
3. **Scale:** 100% (jangan auto-fit)
4. **Background graphics:** ON (untuk warna header)
5. **Headers and footers:** OFF

### Quality Tips

✅ **Do:**
- Use 100% zoom saat print
- Enable background graphics
- Preview sebelum save
- Check page breaks

❌ **Don't:**
- Jangan scale to fit
- Jangan matikan background
- Jangan langsung save tanpa preview

---

## 📦 Batch Export (All at Once)

### Quick Batch via Browser

1. Open `convert-to-pdf.html`
2. Load dokumen 1 → Print to PDF
3. Load dokumen 2 → Print to PDF
4. Load dokumen 3 → Print to PDF
5. Load dokumen 4 → Print to PDF

Total time: **~2 menit** untuk 4 dokumen

### Auto Batch via Script

1. Install pandoc (sekali saja)
2. Run: `./docs/generate-pdf.sh`
3. Done in **~30 detik**

---

## 🆘 Troubleshooting

### "File not found" saat load document

**Fix:**
```bash
# Pastikan di root directory project
cd /path/to/koperasijasasmb

# Buka dari sini
open docs/convert-to-pdf.html
```

### PDF tidak ter-format dengan baik

**Fix:**
- Enable "Background graphics" di print settings
- Gunakan Chrome/Edge (lebih baik dari Safari/Firefox untuk PDF)
- Check print preview sebelum save

### Tabel terpotong di PDF

**Fix:**
- Rotate ke Landscape orientation
- Atau reduce scale ke 90%
- Atau edit CSS di HTML converter

### Script generate-pdf.sh error

**Fix:**
```bash
# Make executable
chmod +x docs/generate-pdf.sh

# Install pandoc
brew install pandoc

# Run again
./docs/generate-pdf.sh
```

---

## 📋 Checklist

Sebelum distribute PDF:

- [ ] Open PDF dan scroll semua halaman
- [ ] Check table of contents (jika ada)
- [ ] Verify tables tidak terpotong
- [ ] Check code blocks formatted OK
- [ ] Links berfungsi (test 1-2)
- [ ] File size < 5 MB
- [ ] Filename jelas (include version/date)

---

## 💡 Pro Tips

**Naming Convention:**
```
QA_Testing_v1.0_2025-04-19.pdf
Admin_Guide_Final.pdf
Quick_Checklist_Latest.pdf
```

**Version Control:**
- Include date atau version di filename
- Simpan di folder `docs/pdf/releases/`
- Keep latest version di `docs/pdf/`

**Distribution:**
- Email: Compress jika > 2 MB
- Cloud: Google Drive / Dropbox
- Print: Gunakan duplex (2-sided) untuk save paper

---

## 📞 Questions?

Check full documentation: `docs/README.md`

---

**Happy Documenting!** 📄✨
