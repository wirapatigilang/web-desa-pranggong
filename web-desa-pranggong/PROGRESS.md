# Progress Log — Website Desa Pranggong

> File ini dibaca otomatis di awal setiap sesi (di-import lewat `AGENTS.md`).
> Tujuannya: agar agent baru langsung tahu apa yang sudah dikerjakan tanpa harus scan ulang seluruh project.
> **Aturan update:** setiap selesai mengerjakan sesuatu yang berarti (bukan typo/kecil), tambahkan entri baru di bagian "Log Pengerjaan" (paling baru di paling atas) dan perbarui "Status Saat Ini" + "Langkah Berikutnya". Jangan hapus entri lama — ini adalah log, bukan hanya snapshot.

## Status Saat Ini

- Referensi requirement & checklist lengkap: `requirement.md`
- Tahap selesai: **Tahap 1 — Setup project, layout dasar, navigasi, homepage**
- Tahap berikutnya: **Tahap 2 — Profil desa & fitur dasar lainnya**

## Arsitektur / Konvensi Project

- Next.js 16 (App Router, Turbopack) + TypeScript + Tailwind CSS v4 — **BUKAN Next.js versi lama**, cek `node_modules/next/dist/docs/` sebelum pakai API yang belum familiar (lihat `AGENTS.md`).
- `src/lib/site-config.ts` — sumber tunggal untuk nama desa, daftar menu navigasi (`navLinks`), dan info kontak (`contactInfo`). **Data kontak masih placeholder**, belum data resmi desa.
- `src/components/layout/navbar.tsx` & `footer.tsx` — dipakai di `src/app/layout.tsx`, generate menu otomatis dari `navLinks`.
- `src/components/ui/page-placeholder.tsx` — komponen placeholder generik untuk halaman yang belum digarap kontennya.
- Tema warna: emerald/green (nuansa desa), belum ada dark mode.
- Belum ada database/CMS, belum ada auth — akan masuk di Tahap 5 (CRUD blog).

## Struktur Route (app/)

| Route | Status |
|---|---|
| `/` | Selesai — homepage (hero, sambutan, highlight program kerja, highlight blog) |
| `/profil-desa` | Stub placeholder — isi di Tahap 2 |
| `/peta-desa` | Stub placeholder — peta interaktif di Tahap 3 (multidisiplin 1) |
| `/program-kerja/rocket-stove` | Stub placeholder — konten di Tahap 4 (multidisiplin 2) |
| `/blog` | Stub placeholder — CRUD di Tahap 5 (monodisiplin) |
| `/kontak` | Selesai — menampilkan data dari `contactInfo` |

## Log Pengerjaan

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
