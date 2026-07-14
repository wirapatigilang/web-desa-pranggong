# Progress Log — Website Desa Pranggong

> File ini dibaca otomatis di awal setiap sesi (di-import lewat `AGENTS.md`).
> Tujuannya: agar agent baru langsung tahu apa yang sudah dikerjakan tanpa harus scan ulang seluruh project.
> **Aturan update:** setiap selesai mengerjakan sesuatu yang berarti (bukan typo/kecil), tambahkan entri baru di bagian "Log Pengerjaan" (paling baru di paling atas) dan perbarui "Status Saat Ini" + "Langkah Berikutnya". Jangan hapus entri lama — ini adalah log, bukan hanya snapshot.

## Status Saat Ini

- Referensi requirement & checklist lengkap: `requirement.md`
- Tahap selesai: **Tahap 1 — Setup project, layout dasar, navigasi, homepage**
- **Urutan tahap diubah atas permintaan user (2026-07-14)**: peta interaktif dimajukan jadi **Tahap 2**, profil desa mundur jadi **Tahap 3** (lihat log di bawah & `requirement.md` §7).
- Tahap 2 (peta interaktif): prototype ada di `/peta-desa`, belum final (koordinat placeholder).
- Tahap 3 — Profil Desa: `/profil-desa` sudah diisi (sejarah, visi-misi, data geografis/demografis, struktur organisasi), **semua isinya masih placeholder eksplisit** (belum data resmi dari perangkat desa — lihat `src/lib/village-profile.ts`). Sisa: layanan publik, potensi wisata, galeri.
- **Tahap 4 (Rocket Stove) sengaja di-skip dulu** atas permintaan user (2026-07-15) — Tahap 5 (Berita/Pengumuman) dikerjakan lebih dulu.
- Tahap berjalan: **Tahap 5 sebagian — listing "Berita & Pengumuman"** (`/blog`) sudah jadi dengan data statis + filter tipe. Sistem CRUD sungguhan (create/update/delete) + auth admin + database (Prisma/Postgres) BELUM dikerjakan.
- Tahap berikutnya: lanjut Rocket Stove (Tahap 4) yang sempat di-skip, ATAU lanjut CRUD+auth+DB untuk blog (sisa Tahap 5) — tunggu arahan user.

## Arsitektur / Konvensi Project

- Next.js 16 (App Router, Turbopack) + TypeScript + Tailwind CSS v4 — **BUKAN Next.js versi lama**, cek `node_modules/next/dist/docs/` sebelum pakai API yang belum familiar (lihat `AGENTS.md`).
- `src/lib/site-config.ts` — sumber tunggal untuk nama desa, daftar menu navigasi (`navLinks`), dan info kontak (`contactInfo`). **Data kontak masih placeholder**, belum data resmi desa.
- `src/components/layout/navbar.tsx` & `footer.tsx` — dipakai di `src/app/layout.tsx`, generate menu otomatis dari `navLinks`.
- `src/components/ui/page-placeholder.tsx` — komponen placeholder generik untuk halaman yang belum digarap kontennya.
- Tema warna: tampilan resmi pemerintah desa — token custom di `globals.css` (`moss-*` hijau institusional, `gold-600`/`gold-300` aksen emas, `merah-600` khusus garis kop surat, `paper-*`, `ink-900`), font display `Source Serif 4` + body `Geist Sans` + utility `Geist Mono`. Label section pakai komponen bersama `src/components/ui/eyebrow.tsx`, jangan bikin pola eyebrow baru. Belum ada dark mode.
- Peta interaktif pakai `leaflet` + `react-leaflet`. Komponen peta WAJIB client-only (`"use client"` + `next/dynamic({ ssr: false })`) karena Leaflet akses `window`. Data pinpoint terpusat di `src/lib/village-locations.ts` (jangan hardcode koordinat di komponen).
- Belum ada database/CMS, belum ada auth — akan masuk di Tahap 5 (CRUD blog).

## Struktur Route (app/)

| Route | Status |
|---|---|
| `/` | Selesai — homepage (hero, sambutan, highlight program kerja, highlight blog) |
| `/profil-desa` | Selesai (Tahap 3) — sejarah, visi-misi, data wilayah, struktur organisasi; isi konten masih placeholder |
| `/peta-desa` | Prototype Tahap 2 — peta interaktif Leaflet aktif, koordinat masih placeholder |
| `/program-kerja/rocket-stove` | Stub placeholder — konten di Tahap 4 (multidisiplin 2) |
| `/blog` | Selesai (listing) — "Berita & Pengumuman" gabungan dengan filter tipe; data masih statis, CRUD sungguhan di Tahap 5 |
| `/kontak` | Selesai — menampilkan data dari `contactInfo` |

## Log Pengerjaan

### 2026-07-15 — Blog digabung jadi "Pengumuman & Berita" + section terpisah di homepage
- Diskusi dengan user: gabung vs pisah untuk fitur Pengumuman/Berita → diputuskan **gabung** (satu model dengan field `type`), karena struktur datanya identik dan bikin 2 CRUD terpisah di Tahap 5 nanti cuma nambah kerjaan tanpa manfaat. Rocket Stove (Tahap 4) sengaja di-skip dulu atas permintaan user.
- `src/lib/posts.ts` (baru): tipe `Post` dengan field `type: "pengumuman" | "berita"` dan `pinned?: boolean` (opsional, untuk pengumuman yang perlu disematkan di atas). Masih **array statis**, BUKAN database — itu tetap scope Tahap 5 (CRUD + auth admin), yang perlu Prisma+Postgres sesuai `CLAUDE.md` § Stack. Isi 2 post: satu pengumuman (meta, tentang fitur ini sendiri) dan satu berita (post "selamat datang" yang sudah ada) — sengaja bukan berita/pengumuman desa yang dikarang, supaya tidak menyesatkan seperti data placeholder lain di proyek ini.
- Homepage (`src/app/page.tsx`): section "Berita & Kegiatan" lama dipecah jadi 2 section terpisah sesuai permintaan user — "Pengumuman" (bg `paper-100`) lalu "Berita" (bg `paper-50`), masing-masing dengan empty-state honest ("Belum ada ... saat ini") kalau kosong.
- `/blog` (`src/app/blog/page.tsx` + `src/components/blog/post-list.tsx`, client): diisi penuh dari `PagePlaceholder` — listing dengan chip filter "Semua/Pengumuman/Berita" (pola sama seperti filter kategori di `/peta-desa`), pinned post tampil duluan. Belum ada pagination/search/detail halaman per-post — itu memang scope Tahap 5 dengan data asli.
- `navLinks` di `site-config.ts`: label diganti dari "Blog" ke **"Berita"** (bukan "Berita & Pengumuman") — dipersingkat supaya tidak bikin baris navbar sesak dengan 6 item menu; judul lengkap "Berita & Pengumuman" tetap dipakai di heading halaman `/blog`.
- Verifikasi: `npm run lint` bersih, `npm run build` sukses (7 route), smoke-test curl `/` dan `/blog` → 200, konten kedua section & filter muncul di HTML.
- **Belum dikerjakan**: sistem CRUD sungguhan (create/update/delete + auth admin), halaman detail per-post, pagination, pencarian — semua nunggu keputusan implementasi Tahap 5 (Prisma + Postgres sudah ditetapkan di `CLAUDE.md`, tinggal dieksekusi kapan diminta).

### 2026-07-15 — Fix: peta Leaflet menimpa navbar sticky saat scroll
- Bug: saat scroll, kontrol/tile peta (`.leaflet-pane`, `.leaflet-top/.leaflet-bottom`) tampil di ATAS navbar sticky, padahal navbar sudah `z-50`.
- Sebab: elemen internal Leaflet punya `z-index` bawaan sampai 1000. Wrapper `<div>` peta di `src/components/map/village-map.tsx` sebelumnya cuma `overflow-hidden` tanpa stacking context sendiri, jadi z-index tinggi itu "bocor" dibandingkan langsung dengan `z-50` navbar di root.
- Fix: tambah `relative isolate z-0` di wrapper peta — `isolation: isolate` mengunci semua descendant Leaflet dalam stacking context sendiri, jadi z-index internalnya (berapa pun besarnya) tidak pernah bisa menang melawan elemen di luar wrapper. Ini akar masalah yang benar (bukan sekadar naikkan `z-index` navbar, yang cuma menunda bug serupa muncul lagi di komponen lain).
- **Pelajaran untuk ke depan**: kalau nempel widget pihak ketiga yang punya `z-index` internal besar (peta, editor rich-text, date picker, dll) di bawah elemen `sticky`/`fixed`, bungkus widgetnya dengan `isolate` alih-alih lomba angka `z-index`.
- Verifikasi: `npm run lint` bersih, `npm run build` sukses.

### 2026-07-15 — Peta interaktif: pencarian, filter kategori, showcase UMKM
- Lanjutan item "belum dikerjakan" dari prototype Tahap 2: pencarian lokasi, filter kategori di UI, dan data pinpoint UMKM (semuanya diminta eksplisit oleh user).
- `src/lib/village-locations.ts`: tambah 2 titik `umkm` placeholder (`umkm-1`, `umkm-2`) — nama & deskripsi jelas ditandai placeholder, bukan nama usaha karangan. Tidak menyentuh entri/`mapCenter` yang sudah diedit user sebelumnya.
- `src/components/map/village-map.tsx`: sekarang menerima props `locations` (hasil filter dari parent, bukan lagi import langsung semua data) dan `focusId`. Tambah `MapController` (pakai hook `useMap()` dari react-leaflet) yang `flyTo()` ke lokasi terpilih dan buka popup-nya otomatis — dipicu dari pencarian/klik daftar/tombol UMKM. Marker disimpan di `useRef` map (id → instance) supaya bisa dipanggil `.openPopup()`.
- `src/components/map/village-map-loader.tsx`: diupdate jadi pure pass-through props ke `VillageMap` (masih pegang tanggung jawab `next/dynamic({ssr:false})`).
- `src/components/map/village-explorer.tsx` (baru, client component): pemilik state utama — input pencarian (cocok nama/deskripsi), chip filter kategori (sekaligus jadi legend berwarna, gantikan legend statis lama), daftar hasil yang bisa diklik, peta, dan section "Potensi Desa — UMKM & Produk Unggulan" (card per UMKM + tombol "Lihat di peta" yang set fokus & scroll ke peta). Ini juga menuntaskan item checklist **Potensi Desa (UMKM)** di requirement.md §4.4 yang sebelumnya belum digarap.
- `src/app/peta-desa/page.tsx` disederhanakan: legend statis manual dibuang, cukup render `<VillageExplorer />`.
- Verifikasi: `npm run lint` bersih, `npm run build` sukses (7 route statis, termasuk type-check props Leaflet `ref` callback), smoke-test curl `/peta-desa` → 200, konten "Cari lokasi", "Potensi Desa", "UMKM Warga #1" muncul di HTML.
- **Belum dikerjakan**: potensi wisata (bagian lain dari requirement "Potensi Desa" selain UMKM), galeri foto/video, koordinat GPS asli untuk semua titik (masih placeholder).

### 2026-07-14 — Tahap 3: Halaman Profil Desa
- User minta "mulai tahap 2", tapi setelah dikonfirmasi (lihat catatan reorder di entri sebelumnya) yang dimaksud adalah **halaman Profil Desa** — yang di dokumen saat ini berstatus **Tahap 3**. Dikerjakan sebagai Tahap 3, bukan Tahap 2.
- Data profil di `src/lib/village-profile.ts`: `history`, `visionMission`, `orgStructure`, `demographics`. **Semua placeholder eksplisit** (bukan angka/nama karangan) — sejarah & visi-misi berupa catatan "akan dilengkapi perangkat desa", data geografis/demografis pakai tanda "— (data belum diperbarui)", struktur organisasi pakai peran umum pemerintahan desa (sesuai Permendagri) tanpa nama pejabat. Sengaja tidak mengarang fakta spesifik desa karena ini situs pemerintah desa sungguhan — data palsu yang terlihat meyakinkan berisiko disalahpahami sebagai data resmi.
- Halaman `/profil-desa` (`src/app/profil-desa/page.tsx`) full rewrite dari `PagePlaceholder` jadi 4 section: Sejarah, Visi & Misi, Data Geografis/Demografis (grid statistik + batas wilayah), Struktur Organisasi (list di atas background `moss-900`, konsisten pola dark-band seperti section Program Kerja di homepage). Pakai komponen `Eyebrow` & token warna yang sama dengan redesign resmi sebelumnya.
- Verifikasi: `npm run lint` bersih, `npm run build` sukses (7 route), smoke-test curl `/profil-desa` → 200 dan konten muncul.
- **Belum dikerjakan** (sisa checklist Tahap 3 di requirement.md §4.4): layanan publik (alur surat, jadwal pelayanan), potensi desa (UMKM/wisata), galeri.
- **Catatan proses**: sempat `pkill -f "next dev"` untuk smoke test dan tanpa sadar ini mematikan dev server yang sudah berjalan sebelumnya (kemungkinan milik user, PID lain) — sudah dinyalakan ulang, tidak ada data hilang, tapi ke depan lebih baik cek proses spesifik dulu sebelum `pkill` dengan pattern luas.

### 2026-07-14 — Redesign #2: dari identitas kampanye "Bumi Pranggong" ke tampilan resmi pemerintah desa
- Atas permintaan user ("ubah web jadi tampilan lebih resmi untuk pemerintah desa"), arah visual digeser dari identitas "Bumi Pranggong" (moss+lime, serif Fraunces, kartu ID/lanyard, grid diagonal) ke tampilan institusional. Dipakai `frontend-design` plugin lagi untuk memandu.
- Token warna di `globals.css` diperbarui: `spring-400` (lime, kesan startup/kampanye) diganti `gold-600`/`gold-300` (aksen emas formal), ditambah `merah-600` (merah bendera, dipakai HANYA untuk garis tiga warna di navbar). `moss-*`/`paper-*`/`ink-900` dipertahankan.
- Font display diganti dari `Fraunces` (serif dekoratif/editorial) ke `Source Serif 4` (serif formal, netral) — lihat `layout.tsx`. Label/eyebrow yang tadinya `font-mono` uppercase tracked (kesan teknis) diganti pola seragam baru: komponen `src/components/ui/eyebrow.tsx` (garis emas pendek + label sans uppercase), dipakai di homepage, `/peta-desa`, `/kontak`.
- `Navbar` (`src/components/layout/navbar.tsx`): logo monogram diganti dari lingkaran jadi bentuk perisai (placeholder lambang desa, pakai `clipPath`, BUKAN lambang resmi asli — desa belum punya logo resmi, lihat requirement.md §8), ditambah sub-label "Pemerintah Desa · Kec. Andong" di bawah nama desa, dan garis tiga warna (merah/putih/hijau, 4px) di bawah header sebagai elemen signature "kop surat resmi". Menu aktif diganti dari pill (`rounded-full`) ke `rounded-md`.
- Homepage (`src/app/page.tsx`) dirombak total: hero wordmark puitis "Bumi / Pranggong" dihapus, diganti heading resmi "Desa Pranggong" + eyebrow "Pemerintah Desa Pranggong" + hierarki wilayah. Kartu sambutan lanyard/miring diganti kartu foto placeholder lurus + blockquote bergaris emas. `BurstMark` (ikon sparkle) dihapus total, motif `.bg-grid-diagonal` dihapus dari `globals.css` (sudah tidak dipakai).
- `PagePlaceholder` (`src/components/ui/page-placeholder.tsx`) dan halaman `/kontak` — yang di sesi sebelumnya sempat tercatat "belum diselaraskan" — sekarang ikut dipindah dari `emerald-*` ke token `moss/paper/ink/gold`.
- Verifikasi: `grep` memastikan tidak ada sisa `emerald-*`, `spring-400`, `bg-grid-diagonal`, atau `Fraunces` di `src/`. `npm run lint` bersih, `npm run build` sukses (7 route statis), CSS hasil build dicek mengandung `.bg-merah-600`, `.text-gold-600`, `.text-gold-300`.
- **Belum dikerjakan**: `/blog` dan `/program-kerja/rocket-stove` masih pakai `PagePlaceholder` generik (otomatis ikut token baru lewat komponen bersama, tapi kontennya sendiri belum digarap — itu memang scope Tahap 4 & 5). Lambang desa masih placeholder perisai generik, ganti dengan logo resmi begitu tersedia.

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

## Langkah Berikutnya (urutan terkini, lihat requirement.md §7)

- [x] Tahap 1 — Setup project, layout dasar, navigasi, homepage
- [x] Tahap 2 — Peta interaktif (Leaflet) + data pinpoint kontak — prototype jalan, koordinat masih placeholder
- [x] Tahap 3 — Halaman Profil Desa (sejarah, visi-misi, struktur organisasi, data geografis/demografis) — konten masih placeholder
  - [ ] Sisa Tahap 3: layanan publik (alur surat, jadwal pelayanan), potensi desa (UMKM/wisata), galeri
- [ ] Tahap 4 — Konten halaman Rocket Stove
- [ ] Tahap 5 — Sistem CRUD blog + autentikasi admin (perlu keputusan: database/ORM apa)
- [ ] Tahap 6 — Testing, responsivitas, deploy, serah terima
