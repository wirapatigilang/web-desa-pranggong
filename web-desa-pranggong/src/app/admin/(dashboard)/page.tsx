import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import ConfirmDeleteButton from "@/components/admin/confirm-delete-button";
import { prisma } from "@/lib/prisma";
import { deletePost } from "@/lib/actions/posts";

export default async function AdminPostsPage() {
  const posts = await prisma.post.findMany({
    orderBy: [{ pinned: "desc" }, { createdAt: "desc" }],
  });

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Berita &amp; Pengumuman</h1>
          <p className="text-sm text-muted-foreground">
            Kelola konten yang tampil di halaman publik.
          </p>
        </div>
        <Button asChild>
          <Link href="/admin/posts/new">+ Tambah</Link>
        </Button>
      </div>

      <div className="mt-6 rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Judul</TableHead>
              <TableHead>Kategori</TableHead>
              <TableHead>Tanggal</TableHead>
              <TableHead className="text-right">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {posts.map((post) => (
              <TableRow key={post.id}>
                <TableCell className="font-medium">
                  {post.title}
                  {post.pinned && (
                    <Badge variant="secondary" className="ml-2">
                      Disematkan
                    </Badge>
                  )}
                </TableCell>
                <TableCell className="capitalize">{post.type}</TableCell>
                <TableCell>
                  {post.createdAt.toLocaleDateString("id-ID", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm" asChild>
                    <Link href={`/admin/posts/${post.id}/edit`}>Edit</Link>
                  </Button>
                  <ConfirmDeleteButton
                    title={`Hapus "${post.title}"?`}
                    description="Tindakan ini tidak bisa dibatalkan. Konten akan langsung hilang dari website publik."
                    successMessage={`"${post.title}" dihapus.`}
                    onConfirm={deletePost.bind(null, post.id)}
                  />
                </TableCell>
              </TableRow>
            ))}
            {posts.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={4}
                  className="py-8 text-center text-sm text-muted-foreground"
                >
                  Belum ada konten. Klik &ldquo;+ Tambah&rdquo; untuk membuat
                  yang pertama.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
