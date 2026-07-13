@AGENTS.md
@requirement.md

# Project Context

## Stack
- Next.js (App Router) + TypeScript
- PostgreSQL + Prisma ORM
- [tambahkan: Tailwind/shadcn/dll]

## Struktur
- `app/` — routes & pages
- `components/` — reusable UI
- `lib/` — utils, db client, helpers
- `prisma/schema.prisma` — schema DB

## Aturan Kerja
- Jawab & komentar kode: Bahasa Indonesia
- Jangan buat file baru kalau bisa edit file existing
- Jangan tambah dependency tanpa izin
- Ikuti pola/kode yang sudah ada di project, jangan reinvent
- Prisma: selalu jalankan `prisma generate` setelah ubah schema
- Jangan jalankan `git commit`/`git push` kecuali diminta eksplisit

## Konvensi Kode
- Komponen: PascalCase, file kebab-case
- Gunakan server components secara default, `"use client"` hanya jika perlu
- Error handling: try-catch + return response konsisten (status + message)

## Jangan Lakukan
- Jangan baca seluruh isi folder `node_modules`, `.next`, `dist`
- Jangan re-explain kode yang tidak diubah
- Jangan tampilkan full file kalau cuma edit sebagian — pakai diff/edit tool