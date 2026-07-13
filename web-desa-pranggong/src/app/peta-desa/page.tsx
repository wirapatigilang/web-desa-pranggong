import type { Metadata } from "next";
import VillageMapLoader from "@/components/map/village-map-loader";
import {
  categoryColors,
  categoryLabels,
  villageLocations,
  type LocationCategory,
} from "@/lib/village-locations";

export const metadata: Metadata = {
  title: "Peta Desa",
  description:
    "Peta interaktif Desa Pranggong — lokasi kantor desa, fasilitas umum, dan titik program kerja beserta informasi kontaknya.",
};

const categoriesInUse = Array.from(
  new Set(villageLocations.map((location) => location.category)),
) as LocationCategory[];

export default function PetaDesaPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <p className="font-mono text-xs uppercase tracking-[0.25em] text-moss-600">
        Multidisiplin 1
      </p>
      <h1 className="mt-2 font-display text-3xl font-semibold text-ink-900 sm:text-4xl">
        Peta Interaktif Desa
      </h1>
      <p className="mt-3 max-w-2xl text-ink-900/70">
        Klik pinpoint untuk melihat nama lokasi, deskripsi singkat, jam
        operasional, dan kontak narahubung.
      </p>

      <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2">
        {categoriesInUse.map((category) => (
          <li key={category} className="flex items-center gap-2 text-sm text-ink-900/70">
            <span
              className="h-3 w-3 shrink-0 rounded-full border border-paper-50"
              style={{ backgroundColor: categoryColors[category] }}
            />
            {categoryLabels[category]}
          </li>
        ))}
      </ul>

      <div className="mt-6">
        <VillageMapLoader />
      </div>

      <p className="mt-4 text-xs text-ink-900/50">
        Prototype Tahap 2 — koordinat lokasi masih perkiraan dan akan
        disesuaikan dengan hasil survey GPS lapangan (lihat requirement.md §
        8).
      </p>
    </div>
  );
}
