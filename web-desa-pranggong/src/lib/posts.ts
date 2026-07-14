// Sumber konten Pengumuman & Berita.
// Sementara masih array statis — akan digantikan database (Tahap 5, CRUD + auth admin)
// begitu skema Prisma/Postgres siap (lihat CLAUDE.md § Stack).

export type PostType = "pengumuman" | "berita";

export type Post = {
  slug: string;
  type: PostType;
  title: string;
  excerpt: string;
  date: string;
  pinned?: boolean;
};

export const postTypeLabels: Record<PostType, string> = {
  pengumuman: "Pengumuman",
  berita: "Berita",
};

export const posts: Post[] = [
  {
    slug: "fitur-pengumuman-berita",
    type: "pengumuman",
    title: "Kanal Pengumuman & Berita Desa Kini Tersedia",
    excerpt:
      "Mulai sekarang, website ini memisahkan pengumuman resmi dan berita kegiatan desa agar informasi lebih mudah ditemukan. Konten akan terus diperbarui oleh perangkat desa.",
    date: "2026-07-15",
    pinned: true,
  },
  {
    slug: "selamat-datang",
    type: "berita",
    title: "Selamat Datang di Website Desa Pranggong",
    excerpt:
      "Website ini dikembangkan untuk memudahkan warga dan masyarakat umum mengakses informasi seputar Desa Pranggong.",
    date: "2026-07-13",
  },
];

export function postsByType(type: PostType): Post[] {
  return posts
    .filter((post) => post.type === type)
    .sort((a, b) => {
      if (!!a.pinned !== !!b.pinned) return a.pinned ? -1 : 1;
      return b.date.localeCompare(a.date);
    });
}
