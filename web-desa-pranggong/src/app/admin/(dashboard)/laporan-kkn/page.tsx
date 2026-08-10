import Link from "next/link";
import { Button } from "@/components/ui/button";
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
import { deleteKknReport } from "@/lib/actions/kkn-reports";

export default async function AdminKknReportsPage() {
  const items = await prisma.kknReport.findMany({
    select: { id: true, title: true, createdAt: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Laporan Program KKN</h1>
          <p className="text-sm text-muted-foreground">
            Kelola laporan Program KKN yang tampil di halaman Berita.
          </p>
        </div>
        <Button asChild>
          <Link href="/admin/laporan-kkn/new">+ Tambah</Link>
        </Button>
      </div>

      <div className="mt-6 rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Gambar</TableHead>
              <TableHead>Judul</TableHead>
              <TableHead>Tanggal</TableHead>
              <TableHead className="text-right">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.map((item) => (
              <TableRow key={item.id}>
                <TableCell>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={`/api/laporan-kkn/${item.id}/image`}
                    alt={item.title}
                    className="h-12 w-16 rounded object-cover"
                  />
                </TableCell>
                <TableCell className="font-medium">{item.title}</TableCell>
                <TableCell>
                  {item.createdAt.toLocaleDateString("id-ID", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm" asChild>
                    <Link href={`/admin/laporan-kkn/${item.id}/edit`}>
                      Edit
                    </Link>
                  </Button>
                  <ConfirmDeleteButton
                    title={`Hapus "${item.title}"?`}
                    description="Tindakan ini tidak bisa dibatalkan. Laporan ini beserta gambarnya akan langsung hilang dari halaman Berita."
                    successMessage={`"${item.title}" dihapus.`}
                    onConfirm={deleteKknReport.bind(null, item.id)}
                  />
                </TableCell>
              </TableRow>
            ))}
            {items.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={4}
                  className="py-8 text-center text-sm text-muted-foreground"
                >
                  Belum ada laporan Program KKN. Klik &ldquo;+ Tambah&rdquo;
                  untuk menambah yang pertama.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
