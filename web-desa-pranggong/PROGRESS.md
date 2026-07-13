# Progress Log — Website Desa Pranggong

> File ini dibaca otomatis di awal setiap sesi (di-import lewat `AGENTS.md`).
> Tujuannya: agar agent baru langsung tahu apa yang sudah dikerjakan tanpa harus scan ulang seluruh project.
> **Aturan update:** setiap selesai mengerjakan sesuatu yang berarti (bukan typo/kecil), tambahkan entri baru di bagian "Log Pengerjaan" (paling baru di paling atas) dan perbarui "Status Saat Ini" + "Langkah Berikutnya". Jangan hapus entri lama — ini adalah log, bukan hanya snapshot.

## Status Saat Ini

- Referensi requirement & checklist lengkap: `requirement.md`
- Tahap selesai: **Tahap 1 — Setup project, layout dasar, navigasi, homepage**
- **Urutan tahap diubah atas permintaan user (2026-07-14)**: peta interaktif dimajukan jadi **Tahap 2**, profil desa mundur jadi **Tahap 3** (lihat log di bawah & `requirement.md` §7).
- Tahap berjalan: **Tahap 2 — Peta interaktif (Leaflet)** — prototype awal sudah ada di `/peta-desa`, belum final (koordinat placeholder).
- Tahap berikutnya: **Tahap 3 — Profil desa & fitur dasar lainnya**

## Arsitektur / Konvensi Project

- Next.js 16 (App Router, Turbopack) + TypeScript + Tailwind CSS v4 — **BUKAN Next.js versi lama**, cek `node_modules/next/dist/docs/` sebelum pakai API yang belum familiar (lihat `AGENTS.md`).
- `src/lib/site-config.ts` — sumber tunggal untuk nama desa, daftar menu navigasi (`navLinks`), dan info kontak (`contactInfo`). **Data kontak masih placeholder**, belum data resmi desa.
- `src/components/layout/navbar.tsx` & `footer.tsx` — dipakai di `src/app/layout.tsx`, generate menu otomatis dari `navLinks`.
- `src/components/ui/page-placeholder.tsx` — komponen placeholder generik untuk halaman yang belum digarap kontennya.
- Tema warna: identitas "Bumi Pranggong" — token custom di `globals.css` (`moss-*`, `spring-400`, `paper-*`, `ink-900`), font display `Fraunces` + body `Geist Sans` + utility `Geist Mono`. Belum ada dark mode.
- Peta interaktif pakai `leaflet` + `react-leaflet`. Komponen peta WAJIB client-only (`"use client"` + `next/dynamic({ ssr: false })`) karena Leaflet akses `window`. Data pinpoint terpusat di `src/lib/village-locations.ts` (jangan hardcode koordinat di komponen).
- Belum ada database/CMS, belum ada auth — akan masuk di Tahap 5 (CRUD blog).

## Struktur Route (app/)

| Route | Status |
|---|---|
| `/` | Selesai — homepage (hero, sambutan, highlight program kerja, highlight blog) |
| `/profil-desa` | Stub placeholder — isi di Tahap 3 |
| `/peta-desa` | Prototype Tahap 2 — peta interaktif Leaflet aktif, koordinat masih placeholder |
| `/program-kerja/rocket-stove` | Stub placeholder — konten di Tahap 4 (multidisiplin 2) |
| `/blog` | Stub placeholder — CRUD di Tahap 5 (monodisiplin) |
| `/kontak` | Selesai — menampilkan data dari `contactInfo` |

## Log Pengerjaan

### 2026-07-14 — Tahap 2 (reorder): Prototype peta interaktif dengan Leaflet
- Atas permintaan user, urutan milestone diubah: peta interaktif (awalnya Tahap 3) dimajukan jadi **Tahap 2**, profil desa (awalnya Tahap 2) mundur ke **Tahap 3**. Diperbarui di `requirement.md` §7 dan bagian "Status Saat Ini" di atas.
- Dependency baru ditambahkan (izin eksplisit dari user via "gunakan leaflet"): `leaflet`, `react-leaflet`, `@types/leaflet` (dev).
- Data pinpoint terstruktur di `src/lib/village-locations.ts` — tipe `VillageLocation`, `categoryLabels`, `categoryColors`, dan `mapCenter`. Berisi 5 lokasi contoh (Kantor Balai Desa, Posyandu, SD, Masjid, titik demo Rocket Stove) dengan **koordinat placeholder** area Kec. Andong — belum data survey GPS asli (masih pertanyaan terbuka di requirement.md §8).
- Komponen peta: `src/components/map/village-map.tsx` (client, render `MapContainer` react-leaflet, pinpoint pakai `L.divIcon` warna per kategori — bukan marker PNG default, biar sesuai identitas visual moss/paper) + `src/components/map/village-map-loader.tsx` (wrapper `next/dynamic` dengan `ssr: false`, wajib karena Leaflet butuh `window`).
- Popup pinpoint menampilkan nama, kategori, deskripsi, jam operasional, kontak. Pinpoint "Titik Demo Rocket Stove" berisi tautan balik ke `/program-kerja/rocket-stove` (integrasi multidisiplin 1 ↔ 2, sesuai requirement.md §4.1/§4.2).
- Halaman `/peta-desa` (`src/app/peta-desa/page.tsx`) diisi penuh: heading, legend kategori berwarna, peta, dan catatan bahwa koordinat masih prototype.
- Sempat coba host ulang ikon marker default Leaflet ke `public/leaflet/` lalu dihapus lagi karena ternyata dipakai pendekatan `divIcon` custom, bukan marker PNG bawaan — jangan diulang, `divIcon` sudah cukup dan lebih ringan.
- Verifikasi: `npm run lint` bersih, `npm run build` sukses (semua 7 route ter-generate statis termasuk `/peta-desa`), smoke-test `npm run dev` + curl (halaman `/` dan `/peta-desa` 200, konten & fallback "Memuat peta..." muncul di server-rendered HTML seperti yang diharapkan untuk client component dengan `ssr:false`).
- **Belum dikerjakan**: kontrol tambahan (pencarian lokasi, filter kategori di UI), data pinpoint UMKM (opsional di requirement), koordinat GPS asli.
- **Fix susulan #1**: `body` di `src/app/layout.tsx` masih `bg-white text-emerald-950` (sisa palet lama, kelewat saat redesign homepage) — diperbaiki jadi `bg-paper-50 text-ink-900`.
- **Fix susulan #2 (root cause background hitam di browser dark mode)**: `src/app/globals.css` masih menyisakan rule template default Next.js — `:root { --background/--foreground }`, `@media (prefers-color-scheme: dark)`, dan rule polos `body { background: var(--background); ... }` yang ditulis **di luar `@layer`**. Rule unlayered seperti itu selalu menang atas utility Tailwind (yang dibungkus `@layer utilities`) di CSS Cascade Layers, tidak peduli specificity — jadi className `bg-paper-50` di body kalah, dan saat browser dark mode aktif, background jadi `#0a0a0a` (hitam). Semua vestige itu dihapus dari `globals.css`; warna body sekarang sepenuhnya dikontrol lewat className Tailwind di `layout.tsx`. Ditambahkan juga `font-sans` eksplisit di body karena rule lama yang dihapus tadinya (sebelum redesign) juga jadi satu-satunya sumber `font-family`.
- **Pelajaran untuk ke depan**: jangan tulis CSS mentah (`body {...}`, `:root {...}`) di luar `@layer` di `globals.css` kalau juga mengandalkan Tailwind utility class untuk properti yang sama — unlayered CSS akan selalu menang. Kalau perlu override, taruh di dalam `@layer base` atau cukup andalkan className.
- **Catatan**: `PagePlaceholder` (`src/components/ui/page-placeholder.tsx`) dan halaman `/kontak` masih hardcode kelas `emerald-*` — belum ikut diselaraskan, akan terlihat beda gaya sampai direfresh di tahap berikutnya.

### 2026-07-14 — Redesign visual homepage: identitas "Bumi Pranggong"
- Install plugin `frontend-design` (marketplace `anthropics/claude-code` tidak ditemukan, dipasang via marketplace default) untuk memandu proses desain.
- Redesign homepage (`src/app/page.tsx`) mengikuti referensi moodboard KKN-R UNDIP 2026 (kartu ID/lanyard, wordmark serif "Bumi Pranggong", grid diagonal) — bukan sekadar restyle warna, tapi identitas visual baru untuk web desa.
- Token desain baru di `src/app/globals.css`: palet `moss-*` (hijau tua), `spring-400` (aksen lime), `paper-*` (krem hangat), `ink-900`, plus utility `.bg-grid-diagonal` untuk tekstur grid diagonal ala referensi.
- Font display baru: `Fraunces` (via `next/font/google`, ditambahkan di `src/app/layout.tsx` sebagai `--font-fraunces` / `font-display`), dipakai untuk heading & wordmark. Body tetap Geist Sans, label/eyebrow pakai Geist Mono.
- Elemen signature: kartu ID bergaya lanyard/badge (rotasi -3°, lubang grommet, tali) untuk section "Sambutan Kepala Desa" — elemen paling khas di halaman, diadaptasi dari mockup "Who Are We?" di referensi.
- `Navbar` & `Footer` direcolor mengikuti palet baru (`moss-*`/`paper-*`/`spring-400`) supaya konsisten dengan hero baru — struktur & logika tidak diubah, hanya class warna.
- **Belum diverifikasi**: `npm run lint` & `npm run build` belum sempat dijalankan (diinterupsi user) — cek ini di sesi berikutnya sebelum menganggap perubahan ini final.

### 2026-07-13 — Tahap 1: Setup project, layout dasar, navigasi, homepage
- Dibuat `requirement.md` (requirement + checklist semua fitur, 3 program KKN + fitur dasar web desa).
- Setup `site-config.ts`, `Navbar`, `Footer`, root `layout.tsx` (metadata title/description desa).
- Homepage (`src/app/page.tsx`) dengan hero, sambutan kades, highlight program kerja, highlight blog.
- Halaman stub untuk semua item menu (`profil-desa`, `peta-desa`, `program-kerja/rocket-stove`, `blog`, `kontak`) agar navigasi tidak 404.
- Verifikasi: `npm run lint` bersih, `npm run build` sukses (semua route ter-generate statis), smoke-test via `npm run dev` + curl (semua route 200, title metadata benar).
- Checklist Tahap 1 di `requirement.md` dicentang.

## Langkah Berikutnya (ringkas dari requirement.md)

- [ ] Tahap 2 — Halaman Profil Desa (sejarah, visi-misi, struktur organisasi, data geografis/demografis) + fitur dasar lain (layanan publik, potensi desa, galeri)
- [ ] Tahap 3 — Peta interaktif (pilih Leaflet/Google Maps Embed) + data pinpoint kontak
- [ ] Tahap 4 — Konten halaman Rocket Stove
- [ ] Tahap 5 — Sistem CRUD blog + autentikasi admin (perlu keputusan: database/ORM apa)
- [ ] Tahap 6 — Testing, responsivitas, deploy, serah terima
