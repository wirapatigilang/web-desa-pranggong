import { notFound } from "next/navigation";
import KknReportForm from "@/components/admin/kkn-report-form";
import { updateKknReport } from "@/lib/actions/kkn-reports";
import { prisma } from "@/lib/prisma";

export default async function EditKknReportPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const item = await prisma.kknReport.findUnique({
    select: { id: true, title: true, description: true },
    where: { id },
  });

  if (!item) {
    notFound();
  }

  return (
    <div>
      <h1 className="text-2xl font-semibold">Edit Laporan Program KKN</h1>
      <p className="mt-1 text-sm text-muted-foreground">{item.title}</p>
      <div className="mt-6">
        <KknReportForm
          action={updateKknReport.bind(null, id)}
          defaultValues={item}
          submitLabel="Simpan Perubahan"
        />
      </div>
    </div>
  );
}
