import "dotenv/config";
import { hashPassword } from "better-auth/crypto";
import { prisma } from "../src/lib/prisma";

// Buat SATU akun admin dari ADMIN_EMAIL/ADMIN_PASSWORD di .env.
// Tidak ada form pendaftaran publik — ini satu-satunya cara membuat akun admin.
async function main() {
  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;

  if (!email || !password) {
    throw new Error(
      "ADMIN_EMAIL dan ADMIN_PASSWORD wajib diisi di .env sebelum menjalankan seed.",
    );
  }

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    console.log(`Admin dengan email ${email} sudah ada, skip seed.`);
    return;
  }

  const passwordHash = await hashPassword(password);

  const user = await prisma.user.create({
    data: {
      id: crypto.randomUUID(),
      name: "Admin Desa Pranggong",
      email,
      emailVerified: true,
      accounts: {
        create: {
          id: crypto.randomUUID(),
          accountId: email,
          providerId: "credential",
          password: passwordHash,
        },
      },
    },
  });

  console.log(`Admin dibuat: ${user.email}`);
}

// Migrasi 2 post yang sebelumnya statis di src/lib/posts.ts ke database.
async function seedPosts() {
  const initialPosts = [
    {
      slug: "fitur-pengumuman-berita",
      type: "pengumuman" as const,
      title: "Kanal Pengumuman & Berita Desa Kini Tersedia",
      excerpt:
        "Mulai sekarang, website ini memisahkan pengumuman resmi dan berita kegiatan desa agar informasi lebih mudah ditemukan. Konten akan terus diperbarui oleh perangkat desa.",
      content:
        "Mulai sekarang, website ini memisahkan pengumuman resmi dan berita kegiatan desa agar informasi lebih mudah ditemukan. Konten akan terus diperbarui oleh perangkat desa melalui dashboard admin.",
      pinned: true,
    },
    {
      slug: "selamat-datang",
      type: "berita" as const,
      title: "Selamat Datang di Website Desa Pranggong",
      excerpt:
        "Website ini dikembangkan untuk memudahkan warga dan masyarakat umum mengakses informasi seputar Desa Pranggong.",
      content:
        "Website ini dikembangkan untuk memudahkan warga dan masyarakat umum mengakses informasi seputar Desa Pranggong — mulai dari profil desa, peta lokasi, program kerja, hingga berita dan pengumuman terkini.",
      pinned: false,
    },
  ];

  for (const post of initialPosts) {
    await prisma.post.upsert({
      where: { slug: post.slug },
      update: {},
      create: post,
    });
  }

  console.log(`Post awal disiapkan: ${initialPosts.length}`);
}

Promise.resolve()
  .then(main)
  .then(seedPosts)
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
