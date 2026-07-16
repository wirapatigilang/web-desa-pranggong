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
import { deleteUmkm } from "@/lib/actions/umkm";

export default async function AdminUmkmPage() {
  const items = await prisma.umkm.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">UMKM &amp; Produk Unggulan</h1>
          <p className="text-sm text-muted-foreground">
            Kelola daftar usaha warga yang tampil di halaman Peta Desa.
          </p>
        </div>
        <Button asChild>
          <Link href="/admin/umkm/new">+ Tambah</Link>
        </Button>
      </div>

      <div className="mt-6 rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nama Usaha</TableHead>
              <TableHead>Kontak</TableHead>
              <TableHead>Titik Peta</TableHead>
              <TableHead className="text-right">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium">{item.name}</TableCell>
                <TableCell>{item.contact ?? "—"}</TableCell>
                <TableCell>
                  {item.lat !== null && item.lng !== null
                    ? "Ada"
                    : "Belum ada"}
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm" asChild>
                    <Link href={`/admin/umkm/${item.id}/edit`}>Edit</Link>
                  </Button>
                  <ConfirmDeleteButton
                    title={`Hapus "${item.name}"?`}
                    description="Tindakan ini tidak bisa dibatalkan. UMKM ini akan langsung hilang dari halaman Peta Desa."
                    successMessage={`"${item.name}" dihapus.`}
                    onConfirm={deleteUmkm.bind(null, item.id)}
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
                  Belum ada UMKM. Klik &ldquo;+ Tambah&rdquo; untuk menambah
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
