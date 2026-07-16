# Progress Log — Website Desa Pranggong

> File ini dibaca otomatis di awal setiap sesi (di-import lewat `AGENTS.md`).
> Tujuannya: agar agent baru langsung tahu apa yang sudah dikerjakan tanpa harus scan ulang seluruh project.
> **Aturan update:** setiap selesai mengerjakan sesuatu yang berarti (bukan typo/kecil), tambahkan entri baru di bagian "Log Pengerjaan" (paling baru di paling atas) dan perbarui "Status Saat Ini" + "Langkah Berikutnya". Jangan hapus entri lama — ini adalah log, bukan hanya snapshot.

## Status Saat Ini

- Referensi requirement & checklist lengkap: `requirement.md`
- Tahap selesai: **Tahap 1 — Setup project, layout dasar, navigasi, homepage**
- **Urutan tahap diubah atas permintaan user (2026-07-14)**: peta interaktif dimajukan jadi **Tahap 2**, profil desa mundur jadi **Tahap 3** (lihat log di bawah & `requirement.md` §7).
- Tahap 2 (peta interaktif): prototype ada di `/peta-desa`, belum final (koordinat placeholder).
- Tahap 3 — Profil Desa: `/profil-desa` sudah diisi (sejarah, visi-misi, data geografis/demografis, struktur organisasi). **Sejak 2026-07-16, konten ini bisa diedit admin sendiri lewat `/admin/profil`** (database, bukan lagi kode statis) — isinya masih placeholder sampai perangkat desa mengisi lewat dashboard. Sisa checklist §4.4: layanan publik, potensi wisata, galeri.
- **Tahap 4 (Rocket Stove) — SELESAI (struktur & teks)**: `/program-kerja/rocket-stove` sudah diisi penuh. Foto dokumentasi masih `ImagePlaceholder` (belum ada foto asli dari tim KKN).
- **Tahap 5 — SELESAI (inti)**: CRUD Berita/Pengumuman + auth admin + database sudah jalan. Detail lengkap di log 2026-07-15 "Tahap 5". Sisa: form upload gambar cover (belum ada), pagination (belum perlu, data masih sedikit).
- Tahap berikutnya: sisa Tahap 3 (layanan publik/potensi wisata/galeri), ATAU poles Tahap 5 (upload gambar), ATAU isi foto asli Rocket Stove menggantikan placeholder — tunggu arahan user.
- **Login pertama kali? Baca log 2026-07-16 "Fix: login admin gagal" di bawah dulu** kalau login tidak jalan — ada gotcha soal env var yang gampang terulang.
- **PENTING sebelum deploy**: ganti `ADMIN_EMAIL`/`ADMIN_PASSWORD` di `.env` (masih nilai contoh) dan `BETTER_AUTH_SECRET`, lalu jalankan `prisma db seed` di environment produksi. Tidak ada form pendaftaran publik by design — akun admin cuma bisa dibuat lewat seed script.

## Arsitektur / Konvensi Project

- Next.js 16 (App Router, Turbopack) + TypeScript + Tailwind CSS v4 — **BUKAN Next.js versi lama**, cek `node_modules/next/dist/docs/` sebelum pakai API yang belum familiar (lihat `AGENTS.md`).
- `src/lib/site-config.ts` — sumber tunggal untuk nama desa, daftar menu navigasi (`navLinks`), dan info kontak (`contactInfo`). **Data kontak masih placeholder**, belum data resmi desa.
- `src/components/layout/navbar.tsx` & `footer.tsx` — dipakai di `src/app/layout.tsx`, generate menu otomatis dari `navLinks`.
- `src/components/ui/page-placeholder.tsx` — komponen placeholder generik untuk halaman yang belum digarap kontennya.
- Tema warna: tampilan resmi pemerintah desa — token custom di `globals.css` (`moss-*` hijau institusional, `gold-600`/`gold-300` aksen emas, `merah-600` khusus garis kop surat, `paper-*`, `ink-900`), font display `Source Serif 4` + body `Geist Sans` + utility `Geist Mono`. Label section pakai komponen bersama `src/components/ui/eyebrow.tsx`, jangan bikin pola eyebrow baru. Belum ada dark mode.
- Peta interaktif pakai `leaflet` + `react-leaflet`. Komponen peta WAJIB client-only (`"use client"` + `next/dynamic({ ssr: false })`) karena Leaflet akses `window`. Data pinpoint terpusat di `src/lib/village-locations.ts` (jangan hardcode koordinat di komponen).
- **Routing**: root `src/app/layout.tsx` sekarang MINIMAL (cuma font + html/body + `<Toaster/>`), TIDAK ada Navbar/Footer di situ lagi. Semua halaman publik ada di route group `src/app/(site)/` yang punya `layout.tsx` sendiri (Navbar+Footer+palet moss/paper). `/admin/*` punya `layout.tsx` sendiri juga (shadcn light theme, tanpa Navbar/Footer publik). Kalau nambah halaman publik baru, taruh di `src/app/(site)/`, BUKAN langsung di `src/app/`.
- **Next.js 16**: file konvensi `middleware.ts` sudah deprecated, diganti `proxy.ts` (fungsi export bernama `proxy`, bukan `middleware`) — lihat `node_modules/next/dist/docs/01-app/03-api-reference/03-file-conventions/proxy.md` kalau perlu detail lebih lanjut.
- **Database & Auth**: Prisma 7 (generator baru `prisma-client`, BUKAN `prisma-client-js` lama) + PostgreSQL lokal (`web_desa_pranggong`, dibuat via `createdb`) + Better Auth (email/password saja, TANPA sign-up publik). Detail teknis penting di log 2026-07-15 "Tahap 5" — WAJIB dibaca sebelum utak-atik Prisma/auth, karena konvensinya beda signifikan dari Prisma versi lama yang mungkin diasumsikan agent lain.
- Data Berita/Pengumuman sekarang dari database (`prisma.post`), BUKAN lagi array statis. `src/lib/posts.ts` cuma nyisa `postTypeLabels` (label tampilan).
- Data Profil Desa juga dari database (`prisma.villageProfile`, satu baris singleton `id: "singleton"`), diedit lewat `/admin/profil`. `src/lib/village-profile.ts` isinya sekarang fungsi `getVillageProfile()` (async, query DB), BUKAN lagi konstanta statis — kalau import dari situ, ingat itu perlu di-`await`.
- Helper auth guard `requireSession()` dipusatkan di `src/lib/actions/require-session.ts`, dipakai semua server action admin (`posts.ts`, `profile.ts`). Kalau bikin action admin baru, import dari situ, jangan tulis ulang.

## Struktur Route (app/)

| Route | Status |
|---|---|
| `/` | Selesai — homepage (hero, sambutan, highlight program kerja, highlight blog) |
| `/profil-desa` | Selesai (Tahap 3) — sejarah, visi-misi, data wilayah, struktur organisasi; konten dari database, bisa diedit admin |
| `/admin/profil` | Selesai — form edit konten Profil Desa (termasuk repeater struktur organisasi) |
| `/peta-desa` | Prototype Tahap 2 — peta interaktif Leaflet aktif, koordinat masih placeholder |
| `/program-kerja/rocket-stove` | Selesai (Tahap 4) — teks lengkap, foto masih placeholder |
| `/blog` | Selesai — "Berita & Pengumuman" dari database, filter tipe |
| `/kontak` | Selesai — menampilkan data dari `contactInfo` |
| `/admin/login` | Selesai — form login (Better Auth email/password) |
| `/admin` | Selesai — dashboard: tabel post, tombol tambah/edit/hapus |
| `/admin/posts/new`, `/admin/posts/[id]/edit` | Selesai — form create/edit (shadcn) |

## Log Pengerjaan

### 2026-07-16 — Profil Desa jadi bisa diedit admin (khusus untuk pergantian perangkat desa)
- User minta: admin desa bisa edit teks di `/profil-desa` sendiri lewat dashboard, terutama kalau ada pergantian perangkat desa (nama pejabat berubah).
- Model baru `VillageProfile` di `prisma/schema.prisma` — **satu baris singleton** (`id` selalu `"singleton"`, pakai `@default("singleton")`), bukan banyak baris, karena profil desa cuma satu per desa. Field: `history`, `vision`, `missions` (teks satu poin per baris, di-split jadi array saat dibaca), `orgStructure` (JSON string array `{role, name}`), plus `area/population/households/hamlets` dan `boundaryNorth/South/East/West`.
- Migrasi `add_village_profile` dijalankan, dan `prisma/seed.ts` ditambah `seedVillageProfile()` (upsert, aman dijalankan ulang) yang memindahkan isi placeholder yang sebelumnya hardcode di `src/lib/village-profile.ts` ke database.
- `src/lib/village-profile.ts` berubah total: dari **konstanta statis** jadi **fungsi async `getVillageProfile()`** yang query `prisma.villageProfile`. Kalau ada kode lama yang masih import `history`/`visionMission`/`orgStructure`/`demographics` langsung dari file ini, itu SUDAH TIDAK ADA — harus pindah ke `await getVillageProfile()`.
- Server action `src/lib/actions/profile.ts` — `updateVillageProfile()`, validasi field wajib (history/vision/missions), parse+validasi JSON `orgStructure` dari hidden input, upsert ke DB.
- **Refactor kecil**: `requireSession()` yang tadinya private di `src/lib/actions/posts.ts` dipindah jadi shared helper `src/lib/actions/require-session.ts`, dipakai `posts.ts` dan `profile.ts` — biar tidak duplikat guard auth di setiap action file baru.
- UI admin: `src/components/admin/profile-form.tsx` (textarea untuk sejarah/visi/misi, input untuk data wilayah) + `src/components/admin/org-structure-editor.tsx` — **repeater client-side** untuk struktur organisasi (baris jabatan+nama, tombol tambah/hapus baris, di-state React lalu diserialisasi ke JSON lewat `<input type="hidden" name="orgStructure">`). Ini bagian yang paling relevan buat kasus "pergantian perangkat desa" — admin tinggal ganti nama di baris yang sesuai, atau tambah/hapus baris kalau jabatannya sendiri berubah.
- Halaman `/admin/profil` (baru) + link sidebar "Profil Desa" ditambah di `src/app/admin/(dashboard)/layout.tsx`.
- Halaman publik `/profil-desa` diupdate baca dari `getVillageProfile()`, field batas wilayah sekarang flat (`profile.boundaryNorth` dst) bukan nested `.boundaries.north` seperti struktur lama.
- **Penting — gotcha yang SAMA dengan kasus login kemarin**: setiap kali skema Prisma berubah (nambah model), `prisma generate` menghasilkan ulang `src/generated/prisma`, tapi instance `PrismaClient` yang sudah nyangkut di `globalThis` (lihat `src/lib/prisma.ts`) tetap instance LAMA sampai dev server di-restart total. Sudah restart dev server setelah migrasi ini — kalau field/model baru "tidak ketemu" padahal migrate sukses, itu penyebabnya.
- Verifikasi: `npm run lint` bersih, `npm run build` sukses (13 route, `/admin/profil` dinamis sesuai ekspektasi). Smoke test curl: `/profil-desa` → 200, struktur organisasi dari DB muncul ("Kepala Desa", "Nama belum diisi"). Login admin → `/admin/profil` → 200, form + tombol "Tambah Jabatan" muncul.
- **Belum diuji lewat browser sungguhan**: submit form edit profil (perubahan tersimpan ke DB, repeater tambah/hapus baris). Secara kode sudah benar (form ini tidak pakai komponen Radix Select/Checkbox yang form-participation-nya perlu diverifikasi seperti kasus `post-form.tsx` — semua field di sini native `<input>`/`<textarea>`), tapi **tolong coba edit satu field dan submit beneran** untuk pastikan.

### 2026-07-16 — Tahap 4: Halaman Rocket Stove
- Diminta lanjut Tahap 4 yang sempat di-skip, dengan placeholder untuk gambar (belum ada foto dokumentasi asli dari tim KKN).
- Komponen baru `src/components/ui/image-placeholder.tsx` — kotak bordered-dashed + ikon gambar + label, reusable (dipakai 8× di halaman ini, bisa dipakai lagi nanti untuk galeri desa umum di sisa Tahap 3).
- `src/app/(site)/program-kerja/rocket-stove/page.tsx` diisi penuh sesuai checklist requirement.md §4.2: penjelasan konsep, latar belakang & tujuan (3 kartu manfaat), dokumentasi proses pembuatan (3 slot placeholder), spesifikasi teknis (band gelap `moss-900` + diagram placeholder + `dl` spek — field bahan/dimensi spesifik sengaja ditandai "Menyusul — dokumentasi tim KKN", BUKAN dikarang, karena angka spesifik untuk proyek fisik desa sungguhan tidak boleh direka), dokumentasi sosialisasi (2 slot), galeri sebelum-sesudah (2 slot), kontak narahubung (pakai `contactInfo.phone` yang sudah ada), dan tombol tautan balik ke `/peta-desa` (integrasi §4.1 — pinpoint "Titik Demo Rocket Stove" di peta sudah link ke halaman ini sejak sesi peta interaktif, sekarang dua arah).
- Konsep teknis umum Rocket Stove (ruang bakar L-shaped, prinsip isolasi panas) ditulis sebagai penjelasan generik yang memang benar secara umum — bukan spesifik ke build Pranggong — beda dengan angka/bahan spesifik yang di-placeholder.
- Verifikasi: `npm run lint` bersih, `npm run build` sukses (12 route), smoke-test curl `/program-kerja/rocket-stove` → 200, konten section-section utama muncul di HTML.
- **Belum dikerjakan**: foto dokumentasi asli (nunggu tim KKN), bahan/dimensi spesifik tungku.

### 2026-07-16 — Fix: login admin gagal setelah pindah Neon → local lagi
- User sempat coba pindah database ke Neon (cloud Postgres), lalu balik lagi ke Postgres lokal. Setelah pindah balik, login admin gagal total.
- **Akar masalah**: saat eksperimen Neon, `src/lib/prisma.ts` diedit supaya adapter pakai `process.env.DIRECT_URL` (pola umum Neon: `DATABASE_URL` buat pooled connection, `DIRECT_URL` buat direct connection). Waktu pindah balik ke lokal, baris `DATABASE_URL`/`DIRECT_URL` Neon di `.env` di-comment dan `DATABASE_URL` lokal diaktifkan lagi — **tapi `prisma.ts` lupa dikembalikan ke `DATABASE_URL`**. Karena `DIRECT_URL` sekarang tidak ter-set sama sekali, Prisma Client konek dengan `connectionString: undefined`, jadi semua query (termasuk cek sesi login) gagal.
- Fix: `src/lib/prisma.ts` — `process.env.DIRECT_URL` → `process.env.DATABASE_URL`. Dicek juga `prisma.config.ts` (dipakai CLI migrate/seed) — itu sudah benar dari awal, cuma `prisma.ts` (dipakai runtime app) yang kena.
- **Gotcha tambahan yang bikin ini lebih membingungkan**: `prisma` di `src/lib/prisma.ts` di-cache lewat `globalThis` (pola standar Next.js dev supaya koneksi tidak dibuat ulang tiap Fast Refresh). Konsekuensinya: **edit kode di `prisma.ts` saja TIDAK cukup** — instance lama (dengan connection string salah) tetap nyangkut di `globalThis` sampai proses `next dev` di-restart total. Kalau lain kali ganti `DATABASE_URL`/`DIRECT_URL` di `.env` dan aplikasi masih "connect ke DB lama", restart dev server dulu sebelum curiga ke tempat lain.
- **Pelajaran untuk ke depan**: kalau mau eksperimen provider database lain (Neon/Supabase/dll), jangan ubah nama env var yang dibaca `prisma.ts` — cukup ganti VALUE `DATABASE_URL` di `.env`, biar gampang balik lagi tanpa harus ingat-ingat file mana yang perlu direvert.
- Verifikasi: sign-in via `POST /api/auth/sign-in/email` dengan kredensial seed → 200 + token, `/admin` dengan cookie sesi → 200.

### 2026-07-15 — Tahap 5: Dashboard admin (auth + database + CRUD), shadcn light theme
User minta eksplisit: "dashboard admin, auth + DB, Better Auth, UI shadcn light theme". Ini perubahan besar, banyak keputusan teknis non-obvious — dibaca pelan-pelan sebelum utak-atik bagian ini.

**Database — Prisma 7 (BUKAN konvensi Prisma lama)**
- Prisma yang ter-install versi **7.8.0**, generator default berubah dari `prisma-client-js` (lama, paket `@prisma/client` di node_modules) jadi **`prisma-client`** (baru) yang men-generate **source TypeScript mentah** ke `src/generated/prisma/` (bukan package siap pakai). Konsekuensi:
  - Import client dari path eksplisit **`src/generated/prisma/client`** (bukan folder index, tidak ada `index.ts`).
  - `PrismaClient` WAJIB dikonstruksi dengan **driver adapter** eksplisit — `new PrismaClient({ adapter: new PrismaPg({ connectionString: ... }) })` dari paket `@prisma/adapter-pg` (+ `pg`). Tanpa adapter, constructor error.
  - Ada file baru **`prisma.config.ts`** (bukan lagi konfigurasi lewat `schema.prisma` doang) — path schema, folder migrations, dan **seed command** didefinisikan di sini. CLI Prisma TIDAK auto-load `.env`; `prisma.config.ts` yang eksplisit `import "dotenv/config"`.
  - Seed command di `prisma.config.ts` diset `"npx tsx prisma/seed.ts"` — sempat gagal dengan `node prisma/seed.ts` polos karena Node ESM native butuh ekstensi eksplisit di semua import relatif (`.ts`), sementara kode project (untuk dikonsumsi Next.js) sengaja tanpa ekstensi. `tsx` dipasang sebagai dev dependency supaya resolusinya kompatibel dengan konvensi import yang sudah ada di project, tanpa perlu ubah gaya import di seluruh kode.
- Database lokal: Postgres via Homebrew sudah jalan di mesin ini, dibuat database baru `web_desa_pranggong` (`createdb web_desa_pranggong`) — tidak menyentuh database lain yang sudah ada (`flex_information_system`). `DATABASE_URL` di `.env`.
- Model `Post` (`prisma/schema.prisma`): `id, type (enum pengumuman|berita), title, slug (unique), excerpt, content, pinned, createdAt, updatedAt`.

**Auth — Better Auth**
- Model `User/Session/Account/Verification` di `schema.prisma` **DIGENERATE OTOMATIS** oleh `./node_modules/.bin/better-auth generate --config src/lib/auth.ts --yes` (bukan ditulis manual — field-nya harus persis sesuai yang diharapkan adapter Prisma Better Auth, salah nama field bikin runtime error yang sulit dilacak).
- `src/lib/auth.ts`: `betterAuth({ database: prismaAdapter(prisma, { provider: "postgresql" }), emailAndPassword: { enabled: true, disableSignUp: true }, plugins: [nextCookies()] })`. **`disableSignUp: true` sengaja** — tidak ada halaman/form registrasi publik. Satu-satunya cara bikin akun admin: `prisma/seed.ts` (pakai `hashPassword` dari `better-auth/crypto` + `prisma.user.create` langsung, BUKAN lewat `auth.api.signUpEmail` karena `disableSignUp` juga memblokir pemanggilan internal itu, bukan cuma endpoint HTTP-nya).
- API route: `src/app/api/auth/[...all]/route.ts` pakai `toNextJsHandler`. Client: `src/lib/auth-client.ts` pakai `createAuthClient()` tanpa `baseURL` (same-origin).
- Proteksi route: `src/proxy.ts` (lihat catatan Next.js 16 di atas) — cek `getSessionCookie()` dari `better-auth/cookies`, redirect ke `/admin/login` kalau tidak ada cookie sesi. Ini hanya gate cepat (tanpa hit DB); setiap server action CRUD (`src/lib/actions/posts.ts`) tetap panggil `auth.api.getSession()` sendiri sebagai lapisan kedua (defense in depth) — jangan hapus pengecekan di action meskipun proxy sudah ada.
- Kredensial admin pertama: `ADMIN_EMAIL`/`ADMIN_PASSWORD` di `.env` (nilai contoh, **WAJIB diganti sebelum deploy**), dibuat lewat `prisma db seed`.

**shadcn/ui — light theme untuk admin**
- `npx shadcn@latest init -y -t next -b radix --preset nova` (preset lain: Vega/Maia/Lyra/dst — dipilih Nova karena default/paling netral). CLI-nya interaktif meski dikasih `-y`, harus pakai `--preset` eksplisit untuk skip prompt.
- shadcn init **auto-merge** ke `globals.css` yang sudah ada (token `moss-*`/`gold-*`/`paper-*`/`ink-900` custom kita TIDAK ditimpa, cuma ditambah token shadcn `--background/--primary/--card/dst`). **Tapi ada bug hasil merge**: `--font-sans: var(--font-sans);` jadi self-reference (harusnya `var(--font-geist-sans)`) — sudah diperbaiki manual. Kalau jalankan `shadcn add`/`init` lagi di masa depan, **cek ulang bagian ini**, siapa tahu ke-overwrite lagi.
- shadcn nambah `@layer base { body { @apply bg-background text-foreground; } }` — ini AMAN (tidak mengulang bug "unlayered CSS" yang pernah terjadi sebelumnya) karena berada di dalam `@layer base`, dan Tailwind v4 selalu prioritaskan `@layer utilities` di atas `@layer base` — jadi className eksplisit di masing-masing route group layout (`(site)` pakai `bg-paper-50`, `admin` pakai `bg-background`) tetap menang.
- "Light theme" dicapai dengan **tidak pernah mengaktifkan class `.dark`** di mana pun (tidak pasang `next-themes` atau toggle) — variabel `.dark { ... }` yang digenerate shadcn ada di CSS tapi tidak pernah dipakai. Sudah diverifikasi: tidak ada `class="dark"` di HTML manapun.
- Komponen yang ditambah: `button, input, label, card, table, textarea, badge, dropdown-menu, sonner, separator, alert-dialog, select, checkbox`. Tidak pakai komponen `form` (react-hook-form+zod) — form CRUD dibangun manual pakai `useActionState` + native FormData, dianggap cukup untuk form sesederhana ini.

**Restrukturisasi routing (diperlukan supaya admin & situs publik bisa beda shell)**
- Semua route publik (`page.tsx`, `profil-desa/`, `peta-desa/`, `program-kerja/`, `blog/`, `kontak/`) dipindah ke `src/app/(site)/` dengan `layout.tsx` sendiri (Navbar+Footer). Root `src/app/layout.tsx` jadi minimal. `/admin` punya `layout.tsx` sendiri (shadcn, tanpa Navbar/Footer publik). URL tidak berubah (route group tidak masuk path).

**CRUD**
- `src/lib/actions/posts.ts` (server actions): `createPost`, `updatePost`, `deletePost` — semua cek sesi dulu, validasi field wajib, auto-generate `slug` unik (increment suffix kalau bentrok), `revalidatePath` ke `/admin`, `/blog`, `/`.
- Dashboard `/admin`: tabel post (shadcn Table) + badge "Disematkan" + tombol Edit/Hapus (`AlertDialog` konfirmasi sebelum hapus).
- Form create/edit dipakai bareng lewat `src/components/admin/post-form.tsx` (props `action` + `defaultValues`).
- 2 post yang sebelumnya statis (`src/lib/posts.ts`) dimigrasikan ke DB lewat `prisma/seed.ts` (fungsi `seedPosts`, pakai `upsert` supaya aman dijalankan berkali-kali). Homepage & `/blog` sekarang query `prisma.post.findMany()` langsung (server component, bukan lagi baca array statis).

**Verifikasi**
- `npm run lint` bersih, `npm run build` sukses (12 route, admin routes ter-render dinamis `ƒ` sesuai ekspektasi karena butuh sesi/DB).
- Smoke test end-to-end lewat curl: `/admin` tanpa cookie → 307 ke `/admin/login` ✓. Sign-in via `POST /api/auth/sign-in/email` dengan kredensial seed → 200 + token ✓. `/admin` dengan cookie sesi → 200, tabel post muncul ✓. Homepage & `/blog` menampilkan 2 post dari DB (termasuk badge "Disematkan" untuk yang `pinned: true`) ✓. Tidak ada `class="dark"` di HTML manapun (light theme terjaga) ✓.
- **Belum diuji lewat browser sungguhan**: submit form create/edit (pakai shadcn `Select`+`Checkbox` yang form-participation-nya mengandalkan hidden input bawaan Radix — secara kode sudah benar dan `name` prop terkonfirmasi diteruskan ke Radix primitive, tapi belum diklik manual di browser). **Rekomendasi: coba create/edit/delete post beneran lewat UI sebelum anggap Tahap 5 100% selesai.**
- **Belum dikerjakan**: upload gambar cover (requirement.md §4.3 minta ini), pagination (belum perlu, data masih sedikit).

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
