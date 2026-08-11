import type { Metadata } from "next";
import Link from "next/link";
import { Blocks, Flame } from "lucide-react";
import Eyebrow from "@/components/ui/eyebrow";
import HoverArrow from "@/components/ui/hover-arrow";
import Reveal, { RevealGroup, RevealItem } from "@/components/motion/reveal";
import { contactInfo } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Rocket Stove",
  description:
    "Program kerja Rocket Stove — tungku hemat bahan bakar dan rendah asap hasil KKN di Desa Pranggong.",
};

const buildSteps = [
  {
    title: "Persiapan bahan & alat",
    description:
      "Dokumentasi bahan (drum/kaleng bekas, semen, pasir, isolator) dan alat yang dipakai sebelum perakitan.",
    image: "/rocket-stove/persiapan-bahan.jpeg",
  },
  {
    title: "Proses perakitan tungku",
    description:
      "Dokumentasi tahap perakitan ruang bakar berbentuk L dan pemasangan isolator di sekitar pipa pembakaran.",
    image: "/rocket-stove/proses-perakitan.jpeg",
  },
  {
    title: "Hasil akhir",
    description:
      "Dokumentasi tungku yang sudah jadi beserta uji nyala pertama di lokasi demo.",
    image: "/rocket-stove/tungku-jadi.jpeg",
  },
];

const socialization = [
  {
    title: "Sosialisasi ke warga",
    description:
      "Dokumentasi sesi pengenalan konsep Rocket Stove kepada warga sebelum praktik.",
  },
  {
    title: "Pelatihan praktik langsung",
    description:
      "Dokumentasi warga mencoba langsung merakit atau mengoperasikan Rocket Stove.",
  },
];

export default function RocketStovePage() {
  return (
    <div className="flex flex-col">
      <div className="mx-auto max-w-6xl px-4 pt-16 sm:px-6">
        <Reveal>
          <Eyebrow>Multidisiplin 2</Eyebrow>
          <h1 className="mt-3 font-display text-3xl font-semibold text-ink-900 sm:text-4xl">
            Rocket Stove Hemat Energi
          </h1>
          <p className="mt-3 max-w-2xl text-ink-900/70">
            Program kerja pembuatan tungku Rocket Stove untuk membantu
            efisiensi bahan bakar dan mengurangi asap dapur warga Desa
            Pranggong.
          </p>
        </Reveal>
      </div>

      {/* Apa itu Rocket Stove */}
      <section className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6">
        <Reveal>
          <Eyebrow>Apa Itu Rocket Stove</Eyebrow>
          <div className="mt-3 grid gap-8 md:grid-cols-[1.2fr_1fr]">
            <p className="max-w-2xl text-ink-900/70">
              Rocket Stove adalah inovasi tungku masak sederhana yang dirancang khusus dengan ruang bakar berbentuk huruf L atau J yang terisolasi dengan baik. Desain struktural ini memastikan aliran udara atau sirkulasi oksigen bekerja secara optimal, sehingga ranting atau kayu bakar dapat terbakar jauh lebih sempurna pada suhu yang sangat tinggi. Panas yang dihasilkan tidak menyebar sia-sia, melainkan terpusat langsung ke bagian bawah alat masak. Sistem pembakaran cerdas ini memberikan keuntungan yang signifikan: jumlah bahan bakar yang dibutuhkan menjadi jauh lebih efisien, proses memasak menjadi lebih cepat, dan kepulan asap yang dihasilkan berkurang secara drastis dibandingkan dengan tungku terbuka konvensional, sehingga menciptakan lingkungan dapur yang lebih sehat dan bersih.
            </p>
            <div className="aspect-[4/3] overflow-hidden rounded-2xl border border-black/5">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/rocket-stove/tungku-jadi.jpeg"
                alt="Tungku Rocket Stove hasil program kerja KKN di Desa Pranggong"
                className="h-full w-full object-cover"
                style={{ objectPosition: "center 75%" }}
              />
            </div>
          </div>
        </Reveal>
      </section>

      {/* Latar belakang & tujuan */}
      <section className="bg-paper-100">
        <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6">
          <Reveal>
            <Eyebrow>Latar Belakang &amp; Tujuan</Eyebrow>
            <h2 className="mt-3 font-display text-2xl font-semibold text-ink-900">
              Kenapa Program Ini Dijalankan
            </h2>
          </Reveal>
          <RevealGroup className="mt-6 grid gap-6 sm:grid-cols-3">
            {[
            {
                title: "Hemat Bahan Bakar",
                description:
                  "Pembakaran lebih efisien berarti kayu bakar yang dibutuhkan untuk memasak lebih sedikit dari biasanya.",
              },
              {
                title: "Mengurangi Asap",
                description:
                  "Pembakaran yang lebih sempurna mengurangi asap di dapur, sehingga lebih nyaman dan sehat bagi warga yang memasak.",
              },
              {
                title: "Bahan Terjangkau",
                description:
                  "Dibuat dari bahan sederhana dan terjangkau, sehingga warga bisa membuat atau meniru desainnya secara mandiri.",
              },
            ].map((benefit) => (
              <RevealItem key={benefit.title}>
                <div className="rounded-2xl border border-black/5 bg-paper-50 p-5 shadow-sm shadow-black/[0.02]">
                  <p className="font-display text-lg font-semibold text-ink-900">
                    {benefit.title}
                  </p>
                  <p className="mt-2 text-sm text-ink-900/70">
                    {benefit.description}
                  </p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* Dokumentasi proses pembuatan */}
      <section className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6">
        <Reveal>
          <Eyebrow>Dokumentasi</Eyebrow>
          <h2 className="mt-3 font-display text-2xl font-semibold text-ink-900">
            Proses Pembuatan &amp; Instalasi
          </h2>
        </Reveal>
        <RevealGroup className="mt-6 grid gap-6 sm:grid-cols-3">
          {buildSteps.map((step) => (
            <RevealItem key={step.title}>
              <div>
                <div className="aspect-[4/3] overflow-hidden rounded-2xl border border-black/5">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={step.image}
                    alt={step.title}
                    className="h-full w-full object-cover"
                  />
                </div>
                <p className="mt-3 font-display text-base font-semibold text-ink-900">
                  {step.title}
                </p>
                <p className="mt-1 text-sm text-ink-900/70">
                  {step.description}
                </p>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </section>

      {/* Spesifikasi teknis */}
      <section className="bg-moss-900 text-paper-50">
        <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6">
          <Reveal>
            <Eyebrow onDark>Spesifikasi Teknis</Eyebrow>
            <h2 className="mt-3 font-display text-2xl font-semibold">
              Detail Konstruksi
            </h2>
          </Reveal>

          <div className="mt-8 grid gap-6 lg:grid-cols-[1.1fr_1fr] lg:items-stretch">
            <Reveal delay={0.05}>
              <div className="relative flex h-full min-h-80 items-center justify-center overflow-hidden rounded-2xl border border-paper-50/10 bg-paper-100 p-8">
                <span className="absolute top-4 left-4 rounded-full border border-moss-900/15 bg-paper-50 px-2.5 py-1 text-[10px] font-semibold tracking-wide text-moss-600 uppercase">
                  Gambar teknik
                </span>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/rocket-stove/diagram-spesifikasi.jpeg"
                  alt="Diagram struktur dan bagian-bagian Rocket Stove"
                  className="max-h-full max-w-full object-contain"
                />
              </div>
            </Reveal>

            <RevealGroup className="grid gap-4">
              <RevealItem>
                <div className="flex h-full flex-col rounded-2xl border border-paper-50/10 bg-paper-50/5 p-6">
                  <span className="flex size-10 items-center justify-center rounded-xl bg-paper-50/10 text-paper-50">
                    <Blocks aria-hidden="true" className="size-5" />
                  </span>
                  <p className="mt-4 text-xs font-semibold tracking-wide text-paper-50/50 uppercase">
                    Bahan Utama
                  </p>
                  <ul className="mt-3 flex flex-wrap gap-2">
                    {["Hebel", "Lem Hebel", "Semen", "Pasir", "Besi Beton 10 mm", "Plat Besi"].map(
                      (material) => (
                        <li
                          key={material}
                          className="rounded-full border border-paper-50/15 px-3 py-1 text-xs text-paper-50/90"
                        >
                          {material}
                        </li>
                      ),
                    )}
                  </ul>
                </div>
              </RevealItem>

              <RevealItem>
                <div className="flex h-full flex-col rounded-2xl border border-paper-50/10 bg-paper-50/5 p-6">
                  <span className="flex size-10 items-center justify-center rounded-xl bg-paper-50/10 text-paper-50">
                    <Flame aria-hidden="true" className="size-5" />
                  </span>
                  <p className="mt-4 text-xs font-semibold tracking-wide text-paper-50/50 uppercase">
                    Bentuk Ruang Bakar
                  </p>
                  <p className="mt-2 text-sm font-medium text-paper-50/90">
                    L-shaped (khas Rocket Stove)
                  </p>
                  <p className="mt-2 text-sm text-paper-50/60">
                    Ruang bakar berbentuk L menjaga sirkulasi udara tetap
                    optimal, sehingga bahan bakar terbakar lebih sempurna dan
                    panas terpusat ke alat masak.
                  </p>
                </div>
              </RevealItem>
            </RevealGroup>
          </div>
        </div>
      </section>


      {/* Kontak & tautan peta */}
      <section className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6">
        <div className="grid gap-8 md:grid-cols-2">
          <Reveal>
            <Eyebrow>Tertarik Membuat Sendiri?</Eyebrow>
            <h2 className="mt-3 font-display text-xl font-semibold text-ink-900">
              Hubungi Narahubung Program
            </h2>
            <p className="mt-2 text-sm text-ink-900/70">
              Warga yang ingin membuat Rocket Stove sendiri atau bertanya
              lebih lanjut bisa menghubungi kontak berikut.
            </p>
            <p className="mt-3 text-sm font-medium text-ink-900">
              Telp/WA: {contactInfo.phone}
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <Eyebrow>Lokasi</Eyebrow>
            <h2 className="mt-3 font-display text-xl font-semibold text-ink-900">
              Lihat Titik Demo di Peta
            </h2>
            <p className="mt-2 text-sm text-ink-900/70">
              Titik instalasi dan demo Rocket Stove juga ditandai di peta
              interaktif desa.
            </p>
            <Link
              href="/peta-desa"
              className="group mt-4 inline-flex items-center gap-1.5 rounded-md bg-moss-600 px-5 py-2.5 text-sm font-semibold text-paper-50 transition-colors hover:bg-moss-500"
            >
              Buka Peta Desa
              <HoverArrow />
            </Link>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
