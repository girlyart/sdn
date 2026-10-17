# Website Profil Sekolah SMP Negeri 6 Jember (Modern & Responsif)

Website profil institusi pendidikan tingkat menengah pertama (SMP) modern, elegan, responsif, dan interaktif yang dibangun menggunakan pendekatan frontend statis murni tanpa ketergantungan backend/database berbayar.

---

## 📌 1. Identitas Sekolah (Data Demo)

- **Nama Sekolah:** SMP Negeri 6 Jember
- **Akreditasi:** A (Unggul)
- **Kurikulum:** Kurikulum Merdeka Mandiri Berbagi
- **Slogan:** *Berkarakter, Berprestasi, Siap Menghadapi Masa Depan.*
- **Visi:** *Terwujudnya peserta didik yang berkarakter, berprestasi, berwawasan lingkungan, dan adaptif terhadap perkembangan teknologi.*
- **Alamat Demo:** Jl. Pendidikan No. 123, Kelurahan Harapan Jaya, Kecamatan Jember Selatan, Kabupaten Jember, Jawa Timur 68199
- **Email Demo:** `info@smpn6jember.example`
- **Telepon Demo:** `(0331) 555-123`
- **Catatan Etika:** Seluruh data profil, nama dewan guru, foto pendidik, dan nomor telepon merupakan **DATA SIMULASI DEMO** dan belum diverifikasi secara resmi untuk operasional publik.

---

## 🚀 2. Cara Menjalankan Proyek Secara Lokal

Website ini dapat dijalankan dengan dua cara yang sangat mudah:

### Opsi A: Menggunakan VS Code "Live Server" (Paling Praktis)
1. Buka folder proyek ini di **Visual Studio Code**.
2. Pastikan ekstensi **Live Server** (oleh Ritwick Dey) sudah terpasang.
3. Klik kanan pada file `index.html`, lalu pilih **"Open with Live Server"**.
4. Website akan otomatis terbuka di browser pada alamat `http://127.0.0.1:5500/index.html`.

### Opsi B: Menggunakan Node.js / Vite Dev Server
1. Buka terminal pada direktori proyek.
2. Jalankan perintah:
   ```bash
   npm run dev
   ```
3. Buka browser pada alamat `http://localhost:3000`.

---

## 📁 3. Struktur Direktori Proyek

```
smpn6jember/
├── index.html            # Halaman Beranda (21 Bagian Lengkap)
├── profil.html           # Profil Sekolah, Sejarah Timeline, Visi Misi, Struktur Organisasi
├── guru.html             # Direktori Guru dengan Live Search & Filter Mata Pelajaran
├── kelas.html            # Program Akademik Jenjang Kelas VII, VIII, IX & P5
├── fasilitas.html        # Galeri Fasilitas & Sarana Prasarana Lengkap
├── galeri.html           # Dokumentasi Visual Foto dengan Modal Lightbox Lengkap
├── berita.html           # Warta Sekolah, Pencarian Berita & Kategori
├── artikel.html          # Detail Artikel Dinamis (URL parameter ?slug=...)
├── prestasi.html         # Hall of Fame Prestasi Siswa & Filter Tahun
├── ekstrakurikuler.html  # 10 Cabang Ekstrakurikuler, Jadwal & Pembina
├── agenda.html           # Kalender Akademik Bulanan Interaktif & Daftar Kegiatan
├── ppdb.html             # Informasi Pendaftaran Peserta Didik Baru (PPDB)
├── kontak.html           # Kontak Sekolah, Jam Pelayanan & Formulir Pesan Tervalidasi
├── 404.html              # Halaman Error 404 Responsif
├── assets/
│   ├── css/
│   │   ├── variables.css # Design Tokens, Palet Warna (#102A43, #1D4ED8, #D6A84F), Spacing
│   │   ├── reset.css     # CSS Reset Modern & Aksesibilitas
│   │   ├── layout.css    # Header Sticky, Topbar, Mobile Drawer, Grid & Footer
│   │   ├── components.css# Card, Modal, Lightbox, Badge, Toast, Form Inputs
│   │   ├── pages.css     # Hero Section, Artikel, Kalender & PPDB
│   │   └── responsive.css# Breakpoint Layar Mobile (320px–430px), Tablet, Desktop
│   └── js/
│       ├── config.js     # Konfigurasi Terpusat Identitas, Kontak & Navigasi
│       ├── data.js       # Database Terpusat Guru, Fasilitas, Prestasi, Berita, Agenda
│       ├── main.js       # Inisialisasi Orchestrator, Modal, Accordion, Dynamic Year
│       ├── navigation.js # Navbar Sticky, Mobile Drawer, Active Route Detection
│       ├── gallery.js    # Mesin Lightbox Fullscreen & Navigasi Keyboard
│       ├── search-filter.js # Kontroler Pencarian Real-time & Filter Kategori Reusable
│       ├── calendar.js   # Kalkulasi Tanggal, Tahun Kabisat & Penampil Agenda
│       └── forms.js      # Validasi Formulir Pesan & Toast Notifikasi Simulasi
├── favicon.svg           # Logo Vektor Shield Emblem Sekolah
├── robots.txt            # Petunjuk Pengindeksan Search Engine
├── sitemap.xml           # Peta Situs Lengkap Seluruh Halaman
└── README.md             # Dokumentasi Panduan Penggunaan
```

---

## 🎨 4. Sistem Desain & Palet Warna

- **Navy:** `#102A43` (Warna dasar kepemimpinan dan ketegasan institusi)
- **Biru Utama:** `#1D4ED8` (Aksen navigasi, tautan interaktif, tombol primer)
- **Biru Muda:** `#EAF2FF` (Latar belakang lembut dan badge kategori)
- **Putih:** `#FFFFFF` (Ruang visual bersih untuk kenyamanan membaca)
- **Abu-abu Latar:** `#F5F7FB` (Latar belakang sejuk untuk card dan kontainer)
- **Abu-abu Teks:** `#526174` (Teks paragraf dengan rasio kontras tinggi)
- **Emas Aksen:** `#D6A84F` (Aksen prestasi, bintang kejuaraan, dan tombol sorotan)
- **Hijau Keberhasilan:** `#16835D` (Status akreditasi, verifikasi, dan Adiwiyata)

---

## ✏️ 5. Panduan Mengubah Konten

Semua data tersimpan secara terpusat dan rapi di dalam folder `assets/js/`:

### A. Mengubah Nama Sekolah, Alamat & Kontak
Buka file `assets/js/config.js`, perbarui properti:
```javascript
export const CONFIG = {
  school: {
    name: "Nama Sekolah Anda",
    principal: "Nama Kepala Sekolah",
    vision: "Visi baru...",
    // ...
  },
  contact: {
    address: "Alamat resmi sekolah...",
    email: "email@sekolah.sch.id",
    phone: "(0331) xxx-xxx"
  }
};
```

### B. Menambah atau Mengubah Guru, Fasilitas, atau Berita
Buka file `assets/js/data.js`:
- Untuk **Dewan Guru:** Tambahkan objek pada array `teachers`.
- Untuk **Fasilitas:** Tambahkan objek pada array `facilities`.
- Untuk **Berita Baru:** Tambahkan objek pada array `newsArticles`.
- Untuk **Prestasi:** Tambahkan objek pada array `achievements`.
- Untuk **Agenda:** Tambahkan objek pada array `events`.

Perubahan akan langsung tercermin secara otomatis di seluruh halaman website tanpa perlu menyunting kode HTML satu per satu!

---

## 🌐 6. Panduan Deployment ke Hosting

Karena situs ini murni frontend statis, Anda dapat melakukan deployment ke penyedia hosting mana pun:

### A. Vercel / Netlify / Cloudflare Pages
1. Unggah kode ke repositori GitHub.
2. Hubungkan repositori ke akun Vercel/Netlify Anda.
3. Tetapkan build command: `npm run build` (atau kosongkan untuk static files).
4. Tetapkan output directory: `dist` (jika menggunakan npm run build) atau root directory.
5. Klik **Deploy**.

### B. Hosting cPanel Tradisional
1. Kompres semua file dan folder (termasuk `index.html`, `assets/`, dll.) menjadi format `.zip`.
2. Masuk ke **File Manager** cPanel hosting Anda.
3. Unggah ke dalam direktori `public_html/`.
4. Ekstrak file zip. Situs langsung aktif secara instan!

---

## 🛡️ 7. Lisensi & Etika Penggunaan
Dibuat sebagai prototipe website profil sekolah modern berstandar tinggi. Mohon verifikasi seluruh informasi nomor rekening, kontak panitia, dan izin penggunaan foto sebelum dipublikasikan untuk lembaga sekolah sungguhan.
