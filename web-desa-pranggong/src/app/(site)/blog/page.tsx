import type { Metadata } from "next";
import Eyebrow from "@/components/ui/eyebrow";
import PostList from "@/components/blog/post-list";
import { prisma } from "@/lib/prisma";

export const metadata: Metadata = {
  title: "Berita & Pengumuman",
  description: "Pengumuman resmi dan berita kegiatan terbaru Desa Pranggong.",
};

export default async function BlogPage() {
  const posts = await prisma.post.findMany({
    orderBy: [{ pinned: "desc" }, { createdAt: "desc" }],
  });

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <Eyebrow>Kabar Desa</Eyebrow>
      <h1 className="mt-3 font-display text-3xl font-semibold text-ink-900 sm:text-4xl">
        Berita &amp; Pengumuman
      </h1>
      <p className="mt-3 max-w-2xl text-ink-900/70">
        Pengumuman resmi dan berita kegiatan Desa Pranggong dalam satu kanal.
        Saring berdasarkan kategori di bawah.
      </p>

      <div className="mt-8">
        <PostList posts={posts} />
      </div>
    </div>
  );
}
