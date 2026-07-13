import type { Metadata } from "next";
import PagePlaceholder from "@/components/ui/page-placeholder";

export const metadata: Metadata = {
  title: "Peta Desa",
};

export default function PetaDesaPage() {
  return (
    <PagePlaceholder
      title="Peta Interaktif Desa"
      description="Pinpoint lokasi kantor desa, fasilitas umum, dan titik penting lainnya beserta informasi kontaknya."
      note="Peta interaktif akan dibangun pada Tahap 3 (multidisiplin 1)."
    />
  );
}
