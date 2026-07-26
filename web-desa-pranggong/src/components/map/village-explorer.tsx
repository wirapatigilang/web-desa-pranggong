"use client";

import { useMemo, useRef, useState } from "react";
import HoverArrow from "@/components/ui/hover-arrow";
import VillageMapLoader from "@/components/map/village-map-loader";
import {
  categoryColors,
  categoryLabels,
  type LocationCategory,
  type VillageLocation,
} from "@/lib/village-locations";
import type { Umkm } from "@/generated/prisma/client";

const categories = Object.keys(categoryLabels) as LocationCategory[];

export default function VillageExplorer({
  locations,
  umkmItems,
}: {
  locations: VillageLocation[];
  umkmItems: Umkm[];
}) {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<LocationCategory | "semua">(
    "semua",
  );
  const [focusId, setFocusId] = useState<string | null>(null);
  const mapSectionRef = useRef<HTMLDivElement>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return locations.filter((location) => {
      const matchesCategory =
        activeCategory === "semua" || location.category === activeCategory;
      const matchesQuery =
        !q ||
        location.name.toLowerCase().includes(q) ||
        location.description.toLowerCase().includes(q);
      return matchesCategory && matchesQuery;
    });
  }, [locations, query, activeCategory]);

  function focusLocation(locationId: string) {
    setQuery("");
    setActiveCategory("semua");
    setFocusId(locationId);
    mapSectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <div>
      <label className="block max-w-sm">
        <span className="sr-only">Cari lokasi</span>
        <input
          type="text"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Cari lokasi… mis. Posyandu, Masjid"
          className="w-full rounded-xl border border-moss-900/20 bg-paper-50 px-4 py-2.5 text-sm text-ink-900 placeholder:text-ink-900/40 focus:border-moss-600 focus:outline-none"
        />
      </label>

      <div className="mt-4 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setActiveCategory("semua")}
          className={`rounded-full border px-3 py-1.5 text-sm transition-colors ${
            activeCategory === "semua"
              ? "border-moss-600 bg-moss-600 text-paper-50"
              : "border-moss-900/15 text-ink-900/70 hover:border-moss-600/50"
          }`}
        >
          Semua
        </button>
        {categories.map((category) => (
          <button
            key={category}
            type="button"
            onClick={() => setActiveCategory(category)}
            className={`flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm transition-colors ${
              activeCategory === category
                ? "border-moss-600 bg-moss-600 text-paper-50"
                : "border-moss-900/15 text-ink-900/70 hover:border-moss-600/50"
            }`}
          >
            <span
              className="h-2.5 w-2.5 shrink-0 rounded-full border border-paper-50"
              style={{ backgroundColor: categoryColors[category] }}
            />
            {categoryLabels[category]}
          </button>
        ))}
      </div>

      <div ref={mapSectionRef} className="mt-6 grid gap-6 scroll-mt-20 lg:grid-cols-[1fr_280px]">
        <VillageMapLoader locations={filtered} focusId={focusId} />

        <div className="overflow-hidden rounded-2xl border border-moss-900/10">
          <p className="border-b border-moss-900/10 bg-paper-100 px-4 py-3 text-xs font-semibold uppercase tracking-wide text-ink-900/60">
            {filtered.length} lokasi ditemukan
          </p>
          <ul className="max-h-[420px] divide-y divide-moss-900/10 overflow-y-auto sm:max-h-[520px]">
            {filtered.map((location) => (
              <li key={location.id}>
                <button
                  type="button"
                  onClick={() => setFocusId(location.id)}
                  className={`block w-full px-4 py-3 text-left text-sm transition-colors hover:bg-paper-100 ${
                    focusId === location.id ? "bg-paper-100" : ""
                  }`}
                >
                  <span className="font-medium text-ink-900">{location.name}</span>
                  <span className="mt-0.5 block text-xs text-ink-900/50">
                    {categoryLabels[location.category]}
                  </span>
                </button>
              </li>
            ))}
            {filtered.length === 0 && (
              <li className="px-4 py-6 text-center text-sm text-ink-900/50">
                Tidak ada lokasi yang cocok.
              </li>
            )}
          </ul>
        </div>
      </div>

      <div className="mt-14">
        <h2 className="font-display text-2xl font-semibold text-ink-900">
          Potensi Desa — UMKM &amp; Produk Unggulan
        </h2>
        <p className="mt-2 max-w-2xl text-sm text-ink-900/60">
          Daftar usaha warga di Desa Pranggong, dikelola langsung oleh admin
          desa.
        </p>

        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {umkmItems.map((item) => {
            const mapLocationId = `umkm-${item.id}`;
            const onMap = locations.some((l) => l.id === mapLocationId);
            return (
              <div
                key={item.id}
                className="rounded-2xl border border-moss-900/10 p-5"
              >
                <span className="inline-block rounded-full bg-gold-600/10 px-2.5 py-1 text-xs font-semibold uppercase tracking-wide text-gold-600">
                  {categoryLabels.umkm}
                </span>
                <h3 className="mt-2 font-display text-lg font-semibold text-ink-900">
                  {item.name}
                </h3>
                <p className="mt-2 text-sm text-ink-900/70">{item.description}</p>
                {item.contact && (
                  <p className="mt-2 text-xs text-ink-900/50">
                    Kontak: {item.contact}
                  </p>
                )}
                {onMap ? (
                  <button
                    type="button"
                    onClick={() => focusLocation(mapLocationId)}
                    className="group mt-4 inline-flex items-center gap-1 text-sm font-semibold text-moss-600 hover:underline"
                  >
                    Lihat di peta
                    <HoverArrow direction="up" />
                  </button>
                ) : (
                  <p className="mt-4 text-xs italic text-ink-900/40">
                    Belum ada titik lokasi di peta.
                  </p>
                )}
              </div>
            );
          })}
          {umkmItems.length === 0 && (
            <p className="text-sm text-ink-900/50">Data UMKM belum tersedia.</p>
          )}
        </div>
      </div>
    </div>
  );
}
