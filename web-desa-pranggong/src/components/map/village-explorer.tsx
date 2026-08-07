"use client";

import { useMemo, useRef, useState } from "react";
import HoverArrow from "@/components/ui/hover-arrow";
import VillageMapLoader from "@/components/map/village-map-loader";
import { toWhatsAppLink } from "@/lib/utils";
import {
  categoryColors,
  categoryLabels,
  type LocationCategory,
  type VillageLocation,
} from "@/lib/village-locations";
import type { Umkm } from "@/generated/prisma/client";

const categories = Object.keys(categoryLabels) as LocationCategory[];

type GapoktanEntry = {
  name: string;
  type: "Poktan" | "KWT";
  hamlet: string;
  chairperson: string;
};

const gapoktanList: GapoktanEntry[] = [
  { name: "Setyo Mulyo", type: "Poktan", hamlet: "Pranggong", chairperson: "Sukardi" },
  { name: "Sumber Tani", type: "Poktan", hamlet: "Beran", chairperson: "Sri Hartati" },
  { name: "Sumber Makmur", type: "Poktan", hamlet: "Beran", chairperson: "Nunung Witaruna" },
  { name: "Sumber Rejeki", type: "Poktan", hamlet: "Jenggotan", chairperson: "Suwardi" },
  { name: "Sumber Mulyo", type: "Poktan", hamlet: "Jenggotan", chairperson: "Mujahid" },
  { name: "Ngrawan Makmur", type: "Poktan", hamlet: "Ngrawan", chairperson: "Wawan Ardiyanto" },
  { name: "KWT Margi Rahayu", type: "KWT", hamlet: "Ngrawan", chairperson: "Eko Purwati" },
  { name: "KWT Setyo Mulyo", type: "KWT", hamlet: "Pranggong", chairperson: "Kisminah" },
];

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
                className="flex h-full flex-col rounded-2xl border border-moss-900/10 p-5"
              >
                <span className="inline-block w-fit rounded-full bg-gold-600/10 px-2.5 py-1 text-xs font-semibold uppercase tracking-wide text-gold-600">
                  {categoryLabels.umkm}
                </span>
                <h3 className="mt-2 font-display text-lg font-semibold text-ink-900">
                  {item.name}
                </h3>
                <p className="mt-2 flex-1 text-sm text-ink-900/70">
                  {item.description}
                </p>
                {item.contact && (
                  <p className="mt-3 text-xs text-ink-900/50">
                    Kontak: {item.contact}
                  </p>
                )}

                <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-moss-900/10 pt-4">
                  {item.contact ? (
                    <a
                      href={toWhatsAppLink(item.contact)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-center gap-1.5 rounded-full bg-moss-600 px-3.5 py-2 text-xs font-semibold text-paper-50 transition-colors hover:bg-moss-500"
                    >
                      Chat WhatsApp
                      <HoverArrow />
                    </a>
                  ) : (
                    <span className="text-xs text-ink-900/40">
                      Kontak belum tersedia
                    </span>
                  )}

                  {onMap ? (
                    <button
                      type="button"
                      onClick={() => focusLocation(mapLocationId)}
                      className="group inline-flex items-center gap-1 text-sm font-semibold text-moss-600 hover:underline"
                    >
                      Lihat di peta
                      <HoverArrow direction="up" />
                    </button>
                  ) : (
                    <span className="text-xs italic text-ink-900/40">
                      Belum ada titik di peta
                    </span>
                  )}
                </div>
              </div>
            );
          })}
          {umkmItems.length === 0 && (
            <p className="text-sm text-ink-900/50">Data UMKM belum tersedia.</p>
          )}
        </div>
      </div>

      <div className="mt-14">
        <h2 className="font-display text-2xl font-semibold text-ink-900">
          Potensi Desa — Gapoktan &amp; Kelompok Tani
        </h2>

        <div className="mt-4 max-w-3xl space-y-4 text-sm text-ink-900/70">
          <p>
            Gabungan Kelompok Tani (GAPOKTAN) adalah organisasi antara petani
            dalam satu desa dengan berbagai lembaga di luar desa, tujuannya
            untuk mengembangkan dan membina usaha pertanian yang kuat dan
            mandiri. Gapoktan merupakan kumpulan beberapa Kelompok Tani yang
            bergabung dan bekerjasama untuk meningkatkan skala ekonomi dan
            efisiensi usaha, fungsinya sebagai penyedia modal bagi petani
            anggota, sarana produksi, pemasaran hasil pertanian, hingga
            memberikan informasi yang dibutuhkan oleh petani.
          </p>
          <p>
            Kelompok Tani atau disebut Poktan adalah kumpulan
            petani/peternak/pekebun yang dibentuk oleh para petani atas dasar
            kesamaan kepentingan, kesamaan kondisi lingkungan sosial, ekonomi
            dan sumberdaya, kesamaan komoditas, dan keakraban untuk
            meningkatkan dan mengembangkan usaha anggota.
          </p>
          <p>
            Keberadaan Kelompok Tani (Poktan) dan Kelompok Wanita Tani (KWT)
            dapat mendukung potensi pertanian di Desa Pranggong, serta
            mendukung kegiatan budidaya dan pemberdayaan masyarakat di sektor
            pertanian. Akan tetapi, informasi mengenai keberadaan kelompok
            tani tersebut belum terdokumentasi secara sistematis dalam bentuk
            database digital, oleh karena itu diperlukan Database Kelompok
            Tani dan Kelompok Wanita Tani di Desa Pranggong.
          </p>
          <p>
            Database Kelompok Tani dan Kelompok Wanita Tani (KWT) tersebut
            tujuannya untuk mendokumentasikan potensi kelembagaan pertanian
            di Desa Pranggong, Kecamatan Andong, Kabupaten Boyolali supaya
            informasi mengenai kelompok tani tersusun secara sistematis,
            menyediakan informasi mengenai persebaran kelompok tani dan
            kelompok wanita tani yang mudah diakses, serta mendukung
            perencanaan pembangunan di sektor pertanian desa.
          </p>
          <p>
            Berdasarkan hasil pengumpulan data, diperoleh informasi bahwa
            Desa Pranggong saat ini memiliki {gapoktanList.length} kelompok
            tani yang aktif, terdiri atas{" "}
            {gapoktanList.filter((g) => g.type === "Poktan").length} kelompok
            tani dan{" "}
            {gapoktanList.filter((g) => g.type === "KWT").length} kelompok
            wanita tani. Daftar Kelompok Tani di Desa Pranggong adalah
            sebagai berikut:
          </p>
        </div>

        <div className="mt-6 overflow-x-auto rounded-2xl border border-moss-900/10 bg-paper-50 shadow-sm shadow-black/[0.02]">
          <table className="w-full min-w-[560px] text-left text-sm">
            <thead>
              <tr className="border-b border-moss-900/10 text-xs font-semibold uppercase tracking-wide text-ink-900/50">
                <th className="px-5 py-3">No.</th>
                <th className="px-5 py-3">Nama Kelompok</th>
                <th className="px-5 py-3">Jenis</th>
                <th className="px-5 py-3">Dukuh</th>
                <th className="px-5 py-3">Ketua</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-moss-900/10">
              {gapoktanList.map((item, index) => (
                <tr key={item.name}>
                  <td className="px-5 py-4 align-top text-ink-900/70">
                    {index + 1}.
                  </td>
                  <td className="px-5 py-4 align-top font-medium text-ink-900">
                    {item.name}
                  </td>
                  <td className="px-5 py-4 align-top">
                    <span
                      className={`inline-block rounded-full px-2.5 py-1 text-xs font-semibold uppercase tracking-wide ${
                        item.type === "KWT"
                          ? "bg-gold-600/10 text-gold-600"
                          : "bg-moss-600/10 text-moss-600"
                      }`}
                    >
                      {item.type}
                    </span>
                  </td>
                  <td className="px-5 py-4 align-top text-ink-900/70">
                    {item.hamlet}
                  </td>
                  <td className="px-5 py-4 align-top text-ink-900/70">
                    {item.chairperson}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
