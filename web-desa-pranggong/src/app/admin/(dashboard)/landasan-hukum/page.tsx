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
import { deleteLegalBasis } from "@/lib/actions/legal-basis";

export default async function AdminLegalBasisPage() {
  const items = await prisma.legalBasis.findMany({
    select: {
      id: true,
      number: true,
      title: true,
      year: true,
      fileName: true,
    },
    orderBy: [{ year: "desc" }, { createdAt: "desc" }],
  });

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Landasan Hukum</h1>
          <p className="text-sm text-muted-foreground">
            Kelola daftar peraturan/keputusan desa yang tampil di halaman
            Profil Desa.
          </p>
        </div>
        <Button asChild>
          <Link href="/admin/landasan-hukum/new">+ Tambah</Link>
        </Button>
      </div>

      <div className="mt-6 rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nomor</TableHead>
              <TableHead>Tentang</TableHead>
              <TableHead>Tahun</TableHead>
              <TableHead>File PDF</TableHead>
              <TableHead className="text-right">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium">{item.number}</TableCell>
                <TableCell>{item.title}</TableCell>
                <TableCell>{item.year}</TableCell>
                <TableCell>
                  {item.fileName ? (
                    <a
                      href={`/api/landasan-hukum/${item.id}`}
                      className="text-primary hover:underline"
                    >
                      {item.fileName}
                    </a>
                  ) : (
                    <span className="text-muted-foreground">Belum ada</span>
                  )}
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm" asChild>
                    <Link href={`/admin/landasan-hukum/${item.id}/edit`}>
                      Edit
                    </Link>
                  </Button>
                  <ConfirmDeleteButton
                    title={`Hapus "${item.number}"?`}
                    description="Tindakan ini tidak bisa dibatalkan. Data ini beserta file PDF-nya akan langsung hilang dari halaman Profil Desa."
                    successMessage={`"${item.number}" dihapus.`}
                    onConfirm={deleteLegalBasis.bind(null, item.id)}
                  />
                </TableCell>
              </TableRow>
            ))}
            {items.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="py-8 text-center text-sm text-muted-foreground"
                >
                  Belum ada landasan hukum. Klik &ldquo;+ Tambah&rdquo; untuk
                  menambah yang pertama.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
