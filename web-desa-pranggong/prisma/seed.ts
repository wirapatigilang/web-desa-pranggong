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

// Migrasi konten placeholder yang sebelumnya statis di src/lib/village-profile.ts ke database.
async function seedVillageProfile() {
  const defaultOrgStructure = [
    { role: "Kepala Desa", name: "" },
    { role: "Sekretaris Desa", name: "" },
    { role: "Kepala Urusan Keuangan", name: "" },
    { role: "Kepala Urusan Umum & Perencanaan", name: "" },
    { role: "Kepala Seksi Pemerintahan", name: "" },
    { role: "Kepala Seksi Kesejahteraan", name: "" },
    { role: "Kepala Seksi Pelayanan", name: "" },
    { role: "Kepala Dusun", name: "" },
  ];

  await prisma.villageProfile.upsert({
    where: { id: "singleton" },
    update: {},
    create: {
      id: "singleton",
      history:
        "Sejarah lengkap Desa Pranggong — asal-usul nama, tokoh pendiri, dan perkembangan wilayah dari masa ke masa — akan dilengkapi bersama perangkat desa dan sesepuh setempat.",
      vision:
        "Visi resmi Desa Pranggong untuk periode kepemimpinan saat ini akan dilengkapi oleh perangkat desa.",
      missions: "Poin-poin misi akan diisi sesuai dokumen RPJM Desa yang berlaku.",
      orgStructure: JSON.stringify(defaultOrgStructure),
      area: "— (data belum diperbarui)",
      population: "— (data belum diperbarui)",
      households: "— (data belum diperbarui)",
      hamlets: "— (data belum diperbarui)",
      boundaryNorth: "— (data belum diperbarui)",
      boundarySouth: "— (data belum diperbarui)",
      boundaryEast: "— (data belum diperbarui)",
      boundaryWest: "— (data belum diperbarui)",
    },
  });

  console.log("Profil desa awal disiapkan.");
}

// Migrasi 2 UMKM yang sebelumnya statis di src/lib/village-locations.ts ke database.
async function seedUmkm() {
  const initialUmkm = [
    {
      name: "UMKM Warga #1",
      description:
        "Nama usaha dan produk unggulan menyusul data resmi dari perangkat desa.",
      contact: "0812-xxxx-xxxx",
      lat: -7.362,
      lng: 110.7545,
    },
    {
      name: "UMKM Warga #2",
      description:
        "Nama usaha dan produk unggulan menyusul data resmi dari perangkat desa.",
      contact: "0812-xxxx-xxxx",
      lat: -7.3598,
      lng: 110.7567,
    },
  ];

  for (const umkm of initialUmkm) {
    const existing = await prisma.umkm.findFirst({
      where: { name: umkm.name },
    });
    if (!existing) {
      await prisma.umkm.create({ data: umkm });
    }
  }

  console.log(`UMKM awal disiapkan: ${initialUmkm.length}`);
}

Promise.resolve()
  .then(main)
  .then(seedPosts)
  .then(seedVillageProfile)
  .then(seedUmkm)
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
