# 📚 Documentation Files

Folder ini berisi dokumentasi untuk Koperasi Jasa Sukses Mina Bahari.

---

## 📄 Available Documents

### 1. QA_TESTING.md
**Comprehensive QA Testing Documentation**
- 37 detailed test cases
- Setup instructions
- Bug report template
- Test execution log

### 2. QUICK_TEST_CHECKLIST.md
**Quick Testing Guide**
- Pre-deployment checklist
- Critical path testing (5 min)
- Smoke testing (10 min)
- Common issues check

### 3. ADMIN_USER_GUIDE.md
**Admin Panel User Manual**
- Login instructions
- Feature walkthroughs
- Tips & tricks
- Troubleshooting guide

### 4. ADMIN_SETUP.md
**Admin Panel Setup Guide**
- Migration instructions
- Admin user creation
- RLS policy setup
- Troubleshooting

---

## 🖨️ Convert to PDF

Ada **3 cara** untuk mengkonversi dokumentasi ke PDF:

### ✅ Cara 1: Menggunakan HTML Converter (Recommended)

**Paling mudah, tidak perlu install apapun!**

1. Buka file `docs/convert-to-pdf.html` di browser
2. Pilih dokumen dari dropdown
3. Klik "Load Document"
4. Klik "Print to PDF" atau tekan `Ctrl+P` / `Cmd+P`
5. Pilih "Save as PDF" di printer destination
6. Simpan file

**Keuntungan:**
- ✅ Tidak perlu install software
- ✅ Works di semua OS (Windows, Mac, Linux)
- ✅ Styling profesional dengan CSS
- ✅ Interactive - bisa preview sebelum convert

### ⚡ Cara 2: Menggunakan Script Otomatis

**Untuk konversi batch semua dokumen sekaligus**

```bash
# Install dependencies (one-time)
brew install pandoc
brew install wkhtmltopdf  # optional, untuk PDF lebih baik

# Run script
cd docs
./generate-pdf.sh
```

**Output:** Semua PDF tersimpan di `docs/pdf/`

**Keuntungan:**
- ✅ Convert semua dokumen sekaligus
- ✅ Table of contents otomatis
- ✅ Konsisten formatting
- ✅ Command-line friendly

### 🔧 Cara 3: Manual dengan Pandoc

**Untuk customize output PDF**

```bash
# Install pandoc
brew install pandoc

# Convert single file
pandoc QA_TESTING.md -o QA_Testing.pdf \
  --pdf-engine=wkhtmltopdf \
  --toc \
  -V geometry:margin=1in

# Convert with custom options
pandoc ADMIN_USER_GUIDE.md -o Admin_Guide.pdf \
  --pdf-engine=wkhtmltopdf \
  --toc \
  --toc-depth=3 \
  -V geometry:margin=1.5in \
  -V fontsize=12pt \
  -V linkcolor=blue
```

**Keuntungan:**
- ✅ Full control atas PDF output
- ✅ Custom margins, font size, dll
- ✅ Advanced options

---

## 📱 Alternative: Online Converters

Jika tidak bisa install software:

1. **Markdown to PDF Online Tools:**
   - https://www.markdowntopdf.com/
   - https://md2pdf.netlify.app/
   - https://cloudconvert.com/md-to-pdf

2. **Cara:**
   - Upload file .md
   - Download hasil PDF

**⚠️ Catatan:** Hati-hati dengan data sensitif saat menggunakan online tools!

---

## 🎨 PDF Styling

### Custom CSS untuk Print

File `convert-to-pdf.html` sudah include CSS styling untuk:
- ✅ Professional typography
- ✅ Syntax highlighting untuk code blocks
- ✅ Colored headers
- ✅ Table formatting
- ✅ Page breaks optimization
- ✅ Cover page template

### Customize Styling

Edit section `<style>` di `convert-to-pdf.html`:

```css
/* Ubah warna header */
h1 { color: #0066cc; }  /* Ganti dengan warna brand */

/* Ubah font */
body { font-family: 'Your Font', sans-serif; }

/* Ubah margin print */
@page { margin: 25mm; }
```

---

## 📦 Batch Export

Export semua dokumen sekaligus:

### Menggunakan Script

```bash
cd docs
./generate-pdf.sh
```

### Manual Batch (Windows PowerShell)

```powershell
Get-ChildItem ../*.md | ForEach-Object {
    pandoc $_.FullName -o "pdf/$($_.BaseName).pdf" --pdf-engine=wkhtmltopdf --toc
}
```

### Manual Batch (Mac/Linux)

```bash
for file in ../*.md; do
    pandoc "$file" -o "pdf/$(basename "$file" .md).pdf" --pdf-engine=wkhtmltopdf --toc
done
```

---

## 🔍 Troubleshooting

### Pandoc tidak ditemukan

**Mac:**
```bash
brew install pandoc
```

**Ubuntu/Debian:**
```bash
sudo apt-get update
sudo apt-get install pandoc
```

**Windows:**
Download installer dari: https://pandoc.org/installing.html

### PDF tidak ter-generate dengan baik

1. Install wkhtmltopdf: `brew install wkhtmltopdf`
2. Atau gunakan engine lain:
   ```bash
   pandoc file.md -o file.pdf --pdf-engine=pdflatex
   ```

### File terlalu besar

Compress PDF:
```bash
# Mac/Linux
gs -sDEVICE=pdfwrite -dCompatibilityLevel=1.4 -dPDFSETTINGS=/ebook \
   -dNOPAUSE -dQUIET -dBATCH -sOutputFile=compressed.pdf original.pdf
```

### Gambar tidak muncul di PDF

Gunakan absolute path atau pastikan gambar accessible:
```markdown
![Alt text](/absolute/path/to/image.jpg)
```

---

## 📋 Quality Checklist

Sebelum distribute PDF, check:

- [ ] Semua halaman ter-render dengan baik
- [ ] Table of contents akurat
- [ ] Code blocks formatted dengan benar
- [ ] Tables tidak terpotong
- [ ] Links berfungsi (jika ada)
- [ ] Gambar ter-load (jika ada)
- [ ] No broken formatting
- [ ] File size reasonable (< 5 MB)

---

## 💡 Tips

**Optimize untuk Print:**
- Use page breaks di tempat yang tepat
- Avoid orphaned headers (header di bottom of page)
- Keep related content together
- Test print preview sebelum final export

**Maintain Documentation:**
- Update PDF setiap kali update .md source
- Version control PDF files (optional)
- Keep naming consistent

**Distribution:**
- Compress PDF jika > 2 MB
- Gunakan meaningful filename
- Include version/date in filename

---

## 📞 Need Help?

Jika mengalami masalah konversi PDF:
1. Check troubleshooting section di atas
2. Coba cara alternatif (HTML converter vs pandoc)
3. Hubungi developer jika masih error

---

**Last Updated:** April 2025
**Maintained by:** Development Team
