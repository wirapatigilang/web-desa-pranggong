import { notFound } from "next/navigation";
import UmkmForm from "@/components/admin/umkm-form";
import { updateUmkm } from "@/lib/actions/umkm";
import { prisma } from "@/lib/prisma";

export default async function EditUmkmPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const item = await prisma.umkm.findUnique({ where: { id } });

  if (!item) {
    notFound();
  }

  return (
    <div>
      <h1 className="text-2xl font-semibold">Edit UMKM</h1>
      <p className="mt-1 text-sm text-muted-foreground">{item.name}</p>
      <div className="mt-6">
        <UmkmForm
          action={updateUmkm.bind(null, id)}
          defaultValues={item}
          submitLabel="Simpan Perubahan"
        />
      </div>
    </div>
  );
}
