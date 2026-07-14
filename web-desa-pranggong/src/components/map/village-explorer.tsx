"use client";

import { useMemo, useRef, useState } from "react";
import VillageMapLoader from "@/components/map/village-map-loader";
import {
  categoryColors,
  categoryLabels,
  villageLocations,
  type LocationCategory,
  type VillageLocation,
} from "@/lib/village-locations";

const categories = Object.keys(categoryLabels) as LocationCategory[];

export default function VillageExplorer() {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<LocationCategory | "semua">(
    "semua",
  );
  const [focusId, setFocusId] = useState<string | null>(null);
  const mapSectionRef = useRef<HTMLDivElement>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return villageLocations.filter((location) => {
      const matchesCategory =
        activeCategory === "semua" || location.category === activeCategory;
      const matchesQuery =
        !q ||
        location.name.toLowerCase().includes(q) ||
        location.description.toLowerCase().includes(q);
      return matchesCategory && matchesQuery;
    });
  }, [query, activeCategory]);

  const umkmLocations = useMemo(
    () => villageLocations.filter((location) => location.category === "umkm"),
    [],
  );

  function focusLocation(location: VillageLocation) {
    setQuery("");
    setActiveCategory("semua");
    setFocusId(location.id);
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
          className="w-full border border-moss-900/20 bg-paper-50 px-4 py-2.5 text-sm text-ink-900 placeholder:text-ink-900/40 focus:border-moss-600 focus:outline-none"
        />
      </label>

      <div className="mt-4 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setActiveCategory("semua")}
          className={`border px-3 py-1.5 text-sm transition-colors ${
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
            className={`flex items-center gap-2 border px-3 py-1.5 text-sm transition-colors ${
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

        <div className="border border-moss-900/10">
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
          Daftar usaha warga di Desa Pranggong. Data usaha di bawah masih
          placeholder, menyusul pendataan resmi dari perangkat desa.
        </p>

        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {umkmLocations.map((location) => (
            <div key={location.id} className="border border-moss-900/10 p-5">
              <p className="text-xs font-semibold uppercase tracking-wide text-gold-600">
                {categoryLabels.umkm}
              </p>
              <h3 className="mt-2 font-display text-lg font-semibold text-ink-900">
                {location.name}
              </h3>
              <p className="mt-2 text-sm text-ink-900/70">{location.description}</p>
              {location.contact && (
                <p className="mt-2 text-xs text-ink-900/50">
                  Kontak: {location.contact}
                </p>
              )}
              <button
                type="button"
                onClick={() => focusLocation(location)}
                className="mt-4 text-sm font-semibold text-moss-600 hover:underline"
              >
                Lihat di peta ↑
              </button>
            </div>
          ))}
          {umkmLocations.length === 0 && (
            <p className="text-sm text-ink-900/50">Data UMKM belum tersedia.</p>
          )}
        </div>
      </div>
    </div>
  );
}
