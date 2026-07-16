import UmkmForm from "@/components/admin/umkm-form";
import { createUmkm } from "@/lib/actions/umkm";

export default function NewUmkmPage() {
  return (
    <div>
      <h1 className="text-2xl font-semibold">Tambah UMKM</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Tambahkan usaha warga ke daftar Potensi Desa.
      </p>
      <div className="mt-6">
        <UmkmForm action={createUmkm} submitLabel="Simpan" />
      </div>
    </div>
  );
}
