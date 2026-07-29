import LegalBasisForm from "@/components/admin/legal-basis-form";
import { createLegalBasis } from "@/lib/actions/legal-basis";

export default function NewLegalBasisPage() {
  return (
    <div>
      <h1 className="text-2xl font-semibold">Tambah Regulasi Desa</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Tambahkan peraturan/keputusan desa ke halaman Profil Desa.
      </p>
      <div className="mt-6">
        <LegalBasisForm action={createLegalBasis} submitLabel="Simpan" />
      </div>
    </div>
  );
}
