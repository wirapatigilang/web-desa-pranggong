import type { Metadata } from "next";
import Eyebrow from "@/components/ui/eyebrow";
import Reveal, { RevealGroup, RevealItem } from "@/components/motion/reveal";
import VillageExplorer from "@/components/map/village-explorer";
import { prisma } from "@/lib/prisma";
import { villageLocations, type VillageLocation } from "@/lib/village-locations";

const structureSpecs = [
  { label: "Rangka", value: "Besi berukuran 3 cm." },
  {
    label: "Papan latar",
    value: "Triplek dengan ketebalan 1,2 cm sebagai alas peta.",
  },
  {
    label: "Atap",
    value:
      "Pelindung berbahan galvalum untuk menjaga peta dari paparan sinar matahari dan hujan.",
  },
];

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
      <Reveal>
        <Eyebrow>Multidisiplin 1</Eyebrow>
        <h1 className="mt-3 font-display text-3xl font-semibold text-ink-900 sm:text-4xl">
          Peta Interaktif Desa
        </h1>
        <p className="mt-3 max-w-2xl text-ink-900/70">
          Cari atau saring lokasi berdasarkan kategori, lalu klik pinpoint
          atau daftar hasil untuk melihat detail, jam operasional, dan
          kontak narahubung.
        </p>
      </Reveal>

      <div className="mt-8">
        <VillageExplorer locations={locations} umkmItems={umkmItems} />
      </div>

      <p className="mt-4 text-xs text-ink-900/50">
        Prototype Tahap 2 — koordinat lokasi masih perkiraan dan akan
        disesuaikan dengan hasil survey GPS lapangan (lihat requirement.md §
        8).
      </p>

      {/* Peta fisik desa */}
      <div className="mt-16">
        <Reveal>
          <Eyebrow>Papan Informasi</Eyebrow>
          <h2 className="mt-3 font-display text-2xl font-semibold text-ink-900">
            Peta Fisik Desa
          </h2>
          <p className="mt-3 max-w-2xl text-ink-900/70">
            Peta fisik dicetak dalam resolusi tinggi dengan ukuran 1,7 x 1,2
            meter dan didirikan sebagai struktur papan informasi (plang)
            permanen di luar ruang (outdoor).
          </p>
        </Reveal>

        <RevealGroup className="mt-6 grid gap-6 sm:grid-cols-2">
          <RevealItem>
            <figure className="overflow-hidden rounded-2xl border border-black/5 bg-paper-50 shadow-sm shadow-black/[0.02]">
              <div className="flex h-64 items-center justify-center bg-paper-100 p-4 sm:h-80">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/peta-desa/peta-fisik-desain.jpeg"
                  alt="Desain teknis struktur papan peta fisik Desa Pranggong"
                  className="max-h-full max-w-full object-contain"
                />
              </div>
              <figcaption className="border-t border-black/5 px-4 py-3 text-sm text-ink-900/70">
                Desain peta
              </figcaption>
            </figure>
          </RevealItem>
          <RevealItem>
            <figure className="overflow-hidden rounded-2xl border border-black/5 bg-paper-50 shadow-sm shadow-black/[0.02]">
              <div className="flex h-64 items-center justify-center bg-paper-100 p-4 sm:h-80">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/peta-desa/peta-fisik-terpasang.jpeg"
                  alt="Papan peta fisik Desa Pranggong yang sudah terpasang di lokasi"
                  className="max-h-full max-w-full object-contain"
                />
              </div>
              <figcaption className="border-t border-black/5 px-4 py-3 text-sm text-ink-900/70">
                Hasil akhir
              </figcaption>
            </figure>
          </RevealItem>
        </RevealGroup>

        <Reveal>
          <h3 className="mt-10 font-display text-lg font-semibold text-ink-900">
            Spesifikasi Struktur
          </h3>
        </Reveal>
        <RevealGroup className="mt-4 grid gap-4 sm:grid-cols-3">
          {structureSpecs.map((spec) => (
            <RevealItem key={spec.label}>
              <div className="h-full rounded-2xl border border-black/5 bg-paper-50 p-5 shadow-sm shadow-black/[0.02]">
                <p className="text-xs font-semibold uppercase tracking-wide text-gold-600">
                  {spec.label}
                </p>
                <p className="mt-2 text-sm text-ink-900/70">{spec.value}</p>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>

        <Reveal>
          <p className="mt-6 max-w-2xl text-ink-900/70">
            Papan informasi peta ini didirikan di area calon Taman Desa
            Pranggong. Penempatan di lokasi strategis yang kedepannya akan
            dikembangkan menjadi taman desa ini diharapkan dapat
            memaksimalkan fungsinya sebagai pusat panduan lokasi sekaligus
            daya tarik bagi publik.
          </p>
        </Reveal>
      </div>
    </div>
  );
}
