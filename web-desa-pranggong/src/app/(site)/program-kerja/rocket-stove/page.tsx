import type { Metadata } from "next";
import Link from "next/link";
import Eyebrow from "@/components/ui/eyebrow";
import ImagePlaceholder from "@/components/ui/image-placeholder";
import Reveal from "@/components/motion/reveal";
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
  },
  {
    title: "Proses perakitan tungku",
    description:
      "Dokumentasi tahap perakitan ruang bakar berbentuk L dan pemasangan isolator di sekitar pipa pembakaran.",
  },
  {
    title: "Hasil akhir & uji coba",
    description:
      "Dokumentasi tungku yang sudah jadi beserta uji nyala pertama di lokasi demo.",
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
              Rocket Stove adalah tungku masak sederhana dengan ruang bakar
              berbentuk huruf L yang diisolasi. Desain ini membuat kayu
              bakar terbakar lebih sempurna pada suhu tinggi di satu titik
              kecil, sehingga panas yang dihasilkan lebih terpusat ke alat
              masak, bahan bakar yang dibutuhkan lebih sedikit, dan asap
              yang dihasilkan jauh lebih berkurang dibanding tungku terbuka
              konvensional.
            </p>
            <ImagePlaceholder label="Foto/diagram Rocket Stove" />
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
          <ul className="mt-6 grid gap-6 sm:grid-cols-3">
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
            ].map((benefit, index) => (
              <Reveal key={benefit.title} delay={index * 0.1}>
                <li className="border border-moss-900/10 bg-paper-50 p-5">
                  <p className="font-display text-lg font-semibold text-ink-900">
                    {benefit.title}
                  </p>
                  <p className="mt-2 text-sm text-ink-900/70">
                    {benefit.description}
                  </p>
                </li>
              </Reveal>
            ))}
          </ul>
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
        <div className="mt-6 grid gap-6 sm:grid-cols-3">
          {buildSteps.map((step, index) => (
            <Reveal key={step.title} delay={index * 0.1}>
              <div>
                <ImagePlaceholder label={step.title} />
                <p className="mt-3 font-display text-base font-semibold text-ink-900">
                  {step.title}
                </p>
                <p className="mt-1 text-sm text-ink-900/70">
                  {step.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
        <p className="mt-4 text-xs text-ink-900/50">
          Foto dokumentasi asli menyusul dari tim KKN — placeholder di atas
          menandai slot yang akan diisi.
        </p>
      </section>

      {/* Spesifikasi teknis */}
      <section className="bg-moss-900 text-paper-50">
        <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6">
          <Reveal>
            <Eyebrow onDark>Spesifikasi Teknis</Eyebrow>
            <div className="mt-3 grid gap-8 md:grid-cols-[1fr_1.2fr]">
              <ImagePlaceholder
                label="Diagram ukuran & bagian Rocket Stove"
                aspect="aspect-square"
              />
              <dl className="grid grid-cols-2 gap-x-6 gap-y-4 self-start text-sm">
                <div>
                  <dt className="text-xs uppercase tracking-wide text-paper-50/50">
                    Bahan utama
                  </dt>
                  <dd className="mt-1 text-paper-50/90">
                    Menyusul — dokumentasi tim KKN
                  </dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-wide text-paper-50/50">
                    Dimensi
                  </dt>
                  <dd className="mt-1 text-paper-50/90">
                    Menyusul — dokumentasi tim KKN
                  </dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-wide text-paper-50/50">
                    Bentuk ruang bakar
                  </dt>
                  <dd className="mt-1 text-paper-50/90">
                    L-shaped (khas Rocket Stove)
                  </dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-wide text-paper-50/50">
                    Isolator
                  </dt>
                  <dd className="mt-1 text-paper-50/90">
                    Menyusul — dokumentasi tim KKN
                  </dd>
                </div>
              </dl>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Sosialisasi */}
      <section className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6">
        <Reveal>
          <Eyebrow>Kegiatan</Eyebrow>
          <h2 className="mt-3 font-display text-2xl font-semibold text-ink-900">
            Sosialisasi &amp; Pelatihan Warga
          </h2>
        </Reveal>
        <div className="mt-6 grid gap-6 sm:grid-cols-2">
          {socialization.map((item, index) => (
            <Reveal key={item.title} delay={index * 0.1}>
              <div>
                <ImagePlaceholder label={item.title} aspect="aspect-video" />
                <p className="mt-3 font-display text-base font-semibold text-ink-900">
                  {item.title}
                </p>
                <p className="mt-1 text-sm text-ink-900/70">
                  {item.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Galeri sebelum-sesudah */}
      <section className="bg-paper-100">
        <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6">
          <Reveal>
            <Eyebrow>Galeri</Eyebrow>
            <h2 className="mt-3 font-display text-2xl font-semibold text-ink-900">
              Sebelum &amp; Sesudah
            </h2>
          </Reveal>
          <div className="mt-6 grid gap-6 sm:grid-cols-2">
            <Reveal>
              <div>
                <ImagePlaceholder
                  label="Kondisi dapur sebelum"
                  aspect="aspect-video"
                />
                <p className="mt-2 text-center text-xs font-semibold uppercase tracking-wide text-ink-900/50">
                  Sebelum
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div>
                <ImagePlaceholder
                  label="Kondisi dapur sesudah pakai Rocket Stove"
                  aspect="aspect-video"
                />
                <p className="mt-2 text-center text-xs font-semibold uppercase tracking-wide text-ink-900/50">
                  Sesudah
                </p>
              </div>
            </Reveal>
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
              className="mt-4 inline-block rounded-md bg-moss-600 px-5 py-2.5 text-sm font-semibold text-paper-50 transition-colors hover:bg-moss-500"
            >
              Buka Peta Desa →
            </Link>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
