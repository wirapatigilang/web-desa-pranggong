import type { Metadata } from "next";
import PagePlaceholder from "@/components/ui/page-placeholder";

export const metadata: Metadata = {
  title: "Profil Desa",
};

export default function ProfilDesaPage() {
  return (
    <PagePlaceholder
      title="Profil Desa Pranggong"
      description="Sejarah, visi & misi, struktur organisasi, serta data geografis dan demografis desa."
      note="Konten profil desa akan dilengkapi pada Tahap 2 (fitur dasar website desa)."
    />
  );
}
