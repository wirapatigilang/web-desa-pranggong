# Requirement Document — Website Desa Pranggong

**Kecamatan Andong — Program KKN**
Status: Draft
Terakhir diperbarui: 2026-07-13

## 1. Latar Belakang

Website ini dibangun sebagai luaran program KKN untuk Desa Pranggong, Kecamatan Andong, dengan tiga cakupan program:

| Program | Jenis | Fitur Utama |
|---|---|---|
| Multidisiplin 1 | Peta interaktif desa | Pinpoint lokasi + informasi kontak |
| Multidisiplin 2 | Halaman proker Rocket Stove | Halaman informasi/edukasi mandiri |
| Monodisiplin | Sistem blog desa | CRUD (Create, Read, Update, Delete) |

Ditambah fitur-fitur dasar profil desa agar website layak disebut "website desa" secara utuh, bukan hanya kumpulan 3 fitur di atas.

## 2. Tujuan

- [ ] Menyediakan informasi desa yang mudah diakses masyarakat maupun pihak luar (dinas, wisatawan, investor UMKM, dll.)
- [ ] Memvisualisasikan lokasi-lokasi penting desa melalui peta interaktif
- [ ] Mendokumentasikan dan mengedukasi warga tentang proker Rocket Stove
- [ ] Menyediakan kanal publikasi berita/kegiatan desa yang dapat dikelola mandiri oleh perangkat desa (blog CRUD)

## 3. Target Pengguna

- [ ] **Warga desa** — mencari informasi kontak, berita, layanan
- [ ] **Perangkat desa / admin** — mengelola konten blog, data peta
- [ ] **Pengunjung luar** (dinas, mahasiswa, wisatawan) — melihat profil desa, program kerja

## 4. Ruang Lingkup Fitur

### 4.1 Multidisiplin 1 — Peta Interaktif Desa

- [ ] Peta interaktif desa (menggunakan library seperti Leaflet / Mapbox / Google Maps Embed)
- [ ] Pinpoint/marker untuk lokasi-lokasi penting, minimal:
  - [ ] Kantor Balai Desa
  - [ ] Fasilitas kesehatan (Posyandu/Puskesmas Pembantu)
  - [ ] Fasilitas pendidikan (SD/TK/PAUD)
  - [ ] Tempat ibadah
  - [ ] Lokasi UMKM/produk unggulan desa (opsional)
  - [ ] Titik lokasi proker Rocket Stove (opsional, menghubungkan ke fitur multidisiplin 2)
- [ ] Popup/info window saat pinpoint diklik, menampilkan:
  - [ ] Nama lokasi
  - [ ] Deskripsi singkat
  - [ ] Nomor kontak / narahubung
  - [ ] Jam operasional (jika relevan)
- [ ] Data pinpoint disimpan terstruktur (JSON/database) agar mudah ditambah/diedit tanpa mengubah kode
- [ ] Kontrol zoom & pan pada peta
- [ ] Responsif di perangkat mobile

### 4.2 Multidisiplin 2 — Halaman Proker Rocket Stove

- [ ] Halaman tersendiri (route khusus, mis. `/program-kerja/rocket-stove`)
- [ ] Penjelasan apa itu Rocket Stove
- [ ] Latar belakang & tujuan program (manfaat efisiensi bahan bakar, pengurangan asap, dll.)
- [ ] Dokumentasi proses pembuatan/instalasi (foto/gambar)
- [ ] Spesifikasi/desain teknis Rocket Stove yang dibuat (opsional: diagram atau ukuran)
- [ ] Dokumentasi kegiatan sosialisasi/pelatihan ke warga (jika ada)
- [ ] Galeri foto sebelum-sesudah / hasil uji coba
- [ ] Kontak/narahubung untuk warga yang tertarik membuat Rocket Stove sendiri
- [ ] Tautan kembali ke pinpoint lokasi di peta interaktif (integrasi dengan 4.1)

### 4.3 Monodisiplin — Sistem CRUD Blog Desa

- [ ] **Create** — form tambah postingan (judul, konten, gambar cover, kategori, tanggal)
- [ ] **Read**
  - [ ] Halaman daftar/listing blog dengan pagination
  - [ ] Halaman detail per-postingan
  - [ ] Pencarian/filter berdasarkan kategori atau kata kunci
- [ ] **Update** — form edit postingan yang sudah ada
- [ ] **Delete** — hapus postingan (dengan konfirmasi)
- [ ] Autentikasi admin sederhana (login) agar hanya perangkat desa yang bisa CRUD
- [ ] Penyimpanan data (database — mis. SQLite/PostgreSQL, atau headless CMS)
- [ ] Upload gambar untuk cover/isi artikel
- [ ] Validasi input form (judul & konten wajib diisi, dll.)

### 4.4 Fitur Dasar Website Desa (Pelengkap)

- [ ] **Beranda (Homepage)**
  - [ ] Hero section / banner desa
  - [ ] Ringkasan sambutan Kepala Desa
  - [ ] Highlight berita/blog terbaru
  - [ ] Highlight program kerja KKN
- [ ] **Profil Desa**
  - [ ] Sejarah desa
  - [ ] Visi & misi
  - [ ] Struktur organisasi pemerintahan desa
  - [ ] Data geografis & demografis (jumlah penduduk, luas wilayah, batas wilayah)
- [ ] **Layanan Publik / Informasi**
  - [ ] Alur pengurusan surat/administrasi desa
  - [ ] Jadwal pelayanan kantor desa
- [ ] **Potensi Desa**
  - [ ] UMKM/produk unggulan
  - [ ] Potensi wisata (jika ada)
- [ ] **Galeri** — foto/video kegiatan desa secara umum
- [ ] **Kontak & Sosial Media**
  - [ ] Nomor telepon/WhatsApp kantor desa
  - [ ] Alamat kantor desa
  - [ ] Tautan sosial media resmi desa (jika ada)
  - [ ] Formulir kontak/pengaduan (opsional)
- [ ] **Navigasi**
  - [ ] Header/navbar dengan menu utama
  - [ ] Footer berisi info singkat & kontak
- [ ] **Responsivitas** — tampilan baik di desktop, tablet, dan mobile
- [ ] **SEO dasar** — meta title/description per halaman

## 5. Kebutuhan Non-Fungsional

- [ ] Performa: waktu muat halaman wajar (< 3 detik pada koneksi normal)
- [ ] Aksesibilitas dasar (kontras warna cukup, alt text pada gambar)
- [ ] Keamanan dasar untuk fitur admin/CRUD (auth, proteksi route admin)
- [ ] Dapat di-deploy dengan mudah (mis. Vercel) untuk demo/serah terima
- [ ] Kode terstruktur agar mudah diserahterimakan ke perangkat desa/mahasiswa berikutnya

## 6. Rencana Teknis (Sementara)

> Catatan: proyek berjalan di atas Next.js versi baru (App Router) — cek `node_modules/next/dist/docs/` untuk konvensi API terbaru sebelum implementasi, karena beberapa API berbeda dari Next.js versi lama.

- [ ] Framework: Next.js (App Router) + TypeScript
- [ ] Styling: Tailwind CSS
- [ ] Peta interaktif: pilih salah satu — Leaflet (gratis, open-source) atau Google Maps Embed API
- [ ] Database untuk blog & data pinpoint: pilih salah satu — SQLite (lokal/demo) atau PostgreSQL (produksi), dengan ORM (mis. Prisma)
- [ ] Autentikasi admin: solusi sederhana (mis. NextAuth / credential-based)
- [ ] Hosting/deploy: Vercel (frontend) + database hosting terpisah jika diperlukan

## 7. Milestone / Tahapan Pengerjaan

- [x] **Tahap 1** — Setup project, layout dasar, navigasi, homepage
- [ ] **Tahap 2** — Halaman profil desa & fitur dasar lainnya
- [ ] **Tahap 3** — Peta interaktif + data pinpoint kontak
- [ ] **Tahap 4** — Halaman Rocket Stove
- [ ] **Tahap 5** — Sistem CRUD blog + autentikasi admin
- [ ] **Tahap 6** — Testing, responsivitas, deploy, serah terima ke perangkat desa

## 8. Pertanyaan Terbuka / Perlu Konfirmasi

- [ ] Sumber data koordinat lokasi (survey manual GPS / Google Maps)?
- [ ] Siapa yang akan menjadi admin pengelola blog setelah KKN selesai (perlu training singkat)?
- [ ] Apakah butuh hosting berbayar jangka panjang, atau cukup versi demo saat presentasi KKN?
- [ ] Apakah ada logo/identitas visual resmi Desa Pranggong yang perlu digunakan?
