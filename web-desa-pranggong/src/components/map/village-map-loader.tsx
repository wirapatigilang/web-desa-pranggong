"use client";

import dynamic from "next/dynamic";
import type { VillageLocation } from "@/lib/village-locations";

// Leaflet mengakses `window`, jadi harus di-load tanpa SSR.
const VillageMap = dynamic(() => import("@/components/map/village-map"), {
  ssr: false,
  loading: () => (
    <div className="flex h-[420px] w-full items-center justify-center border border-moss-900/10 bg-paper-100 text-sm text-ink-900/50 sm:h-[520px]">
      Memuat peta...
    </div>
  ),
});

export default function VillageMapLoader({
  locations,
  focusId,
}: {
  locations: VillageLocation[];
  focusId: string | null;
}) {
  return <VillageMap locations={locations} focusId={focusId} />;
}
