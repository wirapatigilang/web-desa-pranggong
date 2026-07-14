import type { Metadata } from "next";
import PagePlaceholder from "@/components/ui/page-placeholder";

export const metadata: Metadata = {
  title: "Rocket Stove",
};

export default function RocketStovePage() {
  return (
    <PagePlaceholder
      title="Program Kerja: Rocket Stove"
      description="Penjelasan mengenai Rocket Stove, latar belakang program, dokumentasi pembuatan, dan galeri kegiatan."
      note="Halaman ini akan dilengkapi pada Tahap 4 (multidisiplin 2)."
    />
  );
}
