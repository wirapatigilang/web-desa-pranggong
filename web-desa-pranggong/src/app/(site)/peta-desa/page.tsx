import type { Metadata } from "next";
import Eyebrow from "@/components/ui/eyebrow";
import VillageExplorer from "@/components/map/village-explorer";
import { prisma } from "@/lib/prisma";
import { villageLocations, type VillageLocation } from "@/lib/village-locations";

export const metadata: Metadata = {
  title: "Peta Desa",
  description:
    "Peta interaktif Desa Pranggong — lokasi kantor desa, fasilitas umum, dan titik program kerja beserta informasi kontaknya.",
};

export default async function PetaDesaPage() {
  const umkmItems = await prisma.umkm.findMany({
    orderBy: { createdAt: "asc" },
  });

  const umkmLocations: VillageLocation[] = umkmItems
    .filter((item) => item.lat !== null && item.lng !== null)
    .map((item) => ({
      id: `umkm-${item.id}`,
      name: item.name,
      category: "umkm",
      description: item.description,
      contact: item.contact ?? undefined,
      lat: item.lat as number,
      lng: item.lng as number,
    }));

  const locations = [...villageLocations, ...umkmLocations];

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <Eyebrow>Multidisiplin 1</Eyebrow>
      <h1 className="mt-3 font-display text-3xl font-semibold text-ink-900 sm:text-4xl">
        Peta Interaktif Desa
      </h1>
      <p className="mt-3 max-w-2xl text-ink-900/70">
        Cari atau saring lokasi berdasarkan kategori, lalu klik pinpoint atau
        daftar hasil untuk melihat detail, jam operasional, dan kontak
        narahubung.
      </p>

      <div className="mt-8">
        <VillageExplorer locations={locations} umkmItems={umkmItems} />
      </div>

      <p className="mt-4 text-xs text-ink-900/50">
        Prototype Tahap 2 — koordinat lokasi masih perkiraan dan akan
        disesuaikan dengan hasil survey GPS lapangan (lihat requirement.md §
        8).
      </p>
    </div>
  );
}
