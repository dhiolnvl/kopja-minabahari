# Quick Test Checklist ⚡

Checklist cepat untuk testing sebelum deployment atau setelah update.

---

## 🚀 Pre-Deployment Checklist

### Database
- [ ] All migrations executed successfully
- [ ] Admin user exists and can login
- [ ] Sample data loaded (optional)

### Environment
- [ ] `.env.local` configured
- [ ] Supabase connection working
- [ ] `npm run dev` starts without errors

---

## ✅ Critical Path Testing (5 menit)

### 1. Admin Login
```
URL: /admin/login
Test: Login dengan admin credentials
Expected: Redirect ke /admin/dashboard
```
- [ ] Pass

### 2. Create News
```
URL: /admin/news
Test: Tambah berita baru
Expected: Berita tersimpan dan muncul di list
```
- [ ] Pass

### 3. View Public News
```
URL: /berita
Test: Lihat list berita
Expected: Berita yang dibuat muncul di public
```
- [ ] Pass

### 4. Admin CRUD Test
```
Test: Create, Read, Update, Delete untuk:
```
- [ ] Layanan
- [ ] Sertifikat
- [ ] Galeri

### 5. Messages Test
```
URL: /admin/messages
Test: View dan mark as read
```
- [ ] Pass

---

## 🔍 Smoke Test (10 menit)

### Admin Panel
- [ ] Dashboard loads
- [ ] All menu items accessible
- [ ] Header shows user info
- [ ] Logout works

### Public Website
- [ ] Homepage loads
- [ ] News section shows 3 items
- [ ] News detail page works
- [ ] No admin navbar/footer on public pages

### Responsive
- [ ] Desktop view OK
- [ ] Tablet view OK
- [ ] Mobile view OK

---

## 🐛 Common Issues Check

### Images
- [ ] Certificate images handle errors (show icon fallback)
- [ ] Gallery images handle errors
- [ ] News images preview in forms

### Navigation
- [ ] Sidebar navigation works
- [ ] Breadcrumbs correct
- [ ] Back buttons work

### Forms
- [ ] Validation works
- [ ] Required fields enforced
- [ ] Auto-slug generation works
- [ ] Save & redirect works

### Security
- [ ] Cannot access /admin without login
- [ ] Non-admin users blocked
- [ ] Logout clears session

---

## 📊 Performance Check

- [ ] Dashboard loads < 2s
- [ ] News list loads < 1s
- [ ] No console errors
- [ ] No 404 errors for assets

---

## 🎯 Before Going Live

### Content
- [ ] Remove test/dummy data
- [ ] Add real sertifikat images
- [ ] Add real gallery photos
- [ ] Update company info

### SEO
- [ ] Meta tags set correctly
- [ ] JSON-LD structured data present
- [ ] sitemap.xml exists
- [ ] robots.txt configured

### Security
- [ ] Change default admin password
- [ ] Remove seed admin if using production credentials
- [ ] Environment variables secure

---

## ✍️ Testing Notes

**Date:** _______________

**Issues Found:**
1. _______________________________
2. _______________________________
3. _______________________________

**Sign-off:** _______________
