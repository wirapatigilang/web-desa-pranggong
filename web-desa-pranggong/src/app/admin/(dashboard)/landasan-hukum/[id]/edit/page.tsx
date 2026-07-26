import { notFound } from "next/navigation";
import LegalBasisForm from "@/components/admin/legal-basis-form";
import { updateLegalBasis } from "@/lib/actions/legal-basis";
import { prisma } from "@/lib/prisma";

export default async function EditLegalBasisPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const item = await prisma.legalBasis.findUnique({
    select: {
      id: true,
      number: true,
      title: true,
      year: true,
      fileName: true,
    },
    where: { id },
  });

  if (!item) {
    notFound();
  }

  return (
    <div>
      <h1 className="text-2xl font-semibold">Edit Landasan Hukum</h1>
      <p className="mt-1 text-sm text-muted-foreground">{item.number}</p>
      <div className="mt-6">
        <LegalBasisForm
          action={updateLegalBasis.bind(null, id)}
          defaultValues={item}
          submitLabel="Simpan Perubahan"
        />
      </div>
    </div>
  );
}
