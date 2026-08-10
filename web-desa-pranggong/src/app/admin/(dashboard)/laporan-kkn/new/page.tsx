import KknReportForm from "@/components/admin/kkn-report-form";
import { createKknReport } from "@/lib/actions/kkn-reports";

export default function NewKknReportPage() {
  return (
    <div>
      <h1 className="text-2xl font-semibold">Tambah Laporan Program KKN</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Tambahkan laporan Program KKN ke halaman Berita.
      </p>
      <div className="mt-6">
        <KknReportForm action={createKknReport} submitLabel="Simpan" />
      </div>
    </div>
  );
}
