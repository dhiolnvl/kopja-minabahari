#!/bin/bash

# Script untuk generate PDF dari Markdown
# Membutuhkan: pandoc dan wkhtmltopdf

echo "📄 PDF Generator untuk Dokumentasi"
echo "===================================="
echo ""

# Check if pandoc is installed
if ! command -v pandoc &> /dev/null; then
    echo "❌ Pandoc tidak terinstall!"
    echo ""
    echo "Cara install:"
    echo "  Mac:     brew install pandoc"
    echo "  Ubuntu:  sudo apt-get install pandoc"
    echo "  Windows: Download dari https://pandoc.org/installing.html"
    echo ""
    echo "Atau gunakan cara manual dengan membuka: docs/convert-to-pdf.html"
    exit 1
fi

# Check if wkhtmltopdf is installed (optional, for better PDF)
if ! command -v wkhtmltopdf &> /dev/null; then
    echo "⚠️  wkhtmltopdf tidak terinstall (opsional untuk PDF yang lebih baik)"
    echo "Install: brew install wkhtmltopdf"
    echo ""
fi

# Create output directory
mkdir -p docs/pdf

# Function to convert markdown to PDF
convert_to_pdf() {
    local input_file=$1
    local output_name=$2
    local title=$3

    echo "Converting: $input_file → $output_name.pdf"

    pandoc "$input_file" \
        -o "docs/pdf/$output_name.pdf" \
        --pdf-engine=wkhtmltopdf \
        --metadata title="$title" \
        --metadata author="Koperasi Jasa Sukses Mina Bahari" \
        --metadata date="$(date '+%d %B %Y')" \
        --toc \
        --toc-depth=3 \
        -V geometry:margin=1in \
        -V fontsize=11pt \
        -V linkcolor=blue \
        --highlight-style=tango

    if [ $? -eq 0 ]; then
        echo "✅ Success: docs/pdf/$output_name.pdf"
    else
        echo "❌ Failed: $output_name.pdf"
    fi
    echo ""
}

# Convert all documentation files
echo "Mulai konversi..."
echo ""

convert_to_pdf "QA_TESTING.md" "QA_Testing_Documentation" "QA Testing Documentation"
convert_to_pdf "QUICK_TEST_CHECKLIST.md" "Quick_Test_Checklist" "Quick Test Checklist"
convert_to_pdf "ADMIN_USER_GUIDE.md" "Admin_User_Guide" "Panduan Pengguna Admin Panel"
convert_to_pdf "ADMIN_SETUP.md" "Admin_Setup_Guide" "Setup Admin Panel"

echo "===================================="
echo "✅ Selesai! PDF tersimpan di: docs/pdf/"
echo ""
echo "File yang dibuat:"
ls -lh docs/pdf/*.pdf 2>/dev/null || echo "Tidak ada file PDF yang berhasil dibuat"
