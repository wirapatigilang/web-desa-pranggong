import type { Metadata } from "next";
import Eyebrow from "@/components/ui/eyebrow";
import Reveal, { RevealGroup, RevealItem } from "@/components/motion/reveal";
import { siteConfig } from "@/lib/site-config";
import { getVillageProfile } from "@/lib/village-profile";
import { prisma } from "@/lib/prisma";

export const metadata: Metadata = {
  title: "Profil Desa",
  description:
    "Sejarah, visi & misi, struktur organisasi, serta data geografis dan demografis Desa Pranggong.",
};

export default async function ProfilDesaPage() {
  const [profile, legalBasisList] = await Promise.all([
    getVillageProfile(),
    prisma.legalBasis.findMany({
      select: {
        id: true,
        number: true,
        title: true,
        year: true,
        fileName: true,
      },
      orderBy: [{ year: "desc" }, { createdAt: "desc" }],
    }),
  ]);

  const demographicStats = [
    { label: "Luas Wilayah", value: profile.area },
    { label: "Jumlah Penduduk", value: profile.population },
    { label: "Jumlah Kepala Keluarga", value: profile.households },
    { label: "Jumlah Dusun", value: profile.hamlets },
  ];

  const boundaries = [
    { label: "Utara", value: profile.boundaryNorth },
    { label: "Selatan", value: profile.boundarySouth },
    { label: "Timur", value: profile.boundaryEast },
    { label: "Barat", value: profile.boundaryWest },
  ];

  return (
    <div className="flex flex-col">
      <div className="mx-auto max-w-6xl px-4 pt-16 sm:px-6">
        <Reveal>
          <Eyebrow>Profil Desa</Eyebrow>
          <h1 className="mt-3 font-display text-3xl font-semibold text-ink-900 sm:text-4xl">
            {siteConfig.name}
          </h1>
          <p className="mt-3 max-w-2xl text-ink-900/70">
            Sejarah, visi &amp; misi, struktur organisasi, serta data
            geografis dan demografis {siteConfig.name}, Kecamatan{" "}
            {siteConfig.kecamatan}, Kabupaten {siteConfig.kabupaten}.
          </p>
        </Reveal>
      </div>

      {/* Sejarah */}
      <section className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6">
        <Reveal>
          <Eyebrow>Sejarah</Eyebrow>
          <h2 className="mt-3 font-display text-2xl font-semibold text-ink-900">
            Sejarah Desa
          </h2>
          <div className="mt-4 max-w-3xl space-y-4 text-ink-900/70">
            <p>{profile.history}</p>
          </div>
        </Reveal>
      </section>

      {/* Visi & Misi */}
      <section className="bg-paper-100">
        <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6">
          <Reveal>
            <Eyebrow>Visi &amp; Misi</Eyebrow>
            <div className="mt-6 grid gap-10 md:grid-cols-2">
              <div>
                <h2 className="font-display text-xl font-semibold text-ink-900">
                  Visi
                </h2>
                <p className="mt-3 text-ink-900/70">{profile.vision}</p>
              </div>
              <div>
                <h2 className="font-display text-xl font-semibold text-ink-900">
                  Misi
                </h2>
                <ol className="mt-3 list-decimal space-y-2 pl-5 text-ink-900/70">
                  {profile.missions.map((mission) => (
                    <li key={mission}>{mission}</li>
                  ))}
                </ol>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Data Geografis & Demografis */}
      <section className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6">
        <Reveal>
          <Eyebrow>Data Wilayah</Eyebrow>
          <h2 className="mt-3 font-display text-2xl font-semibold text-ink-900">
            Geografis &amp; Demografis
          </h2>
        </Reveal>

        <RevealGroup className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {demographicStats.map((stat) => (
            <RevealItem key={stat.label}>
              <div className="border border-moss-900/10 p-5">
                <p className="text-xs font-semibold uppercase tracking-wide text-gold-600">
                  {stat.label}
                </p>
                <p className="mt-2 font-display text-lg font-semibold text-ink-900">
                  {stat.value}
                </p>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>

        <h3 className="mt-10 font-display text-lg font-semibold text-ink-900">
          Batas Wilayah
        </h3>
        <RevealGroup>
          <dl className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {boundaries.map((boundary) => (
              <RevealItem key={boundary.label}>
                <div className="border border-moss-900/10 p-5">
                  <dt className="text-xs font-semibold uppercase tracking-wide text-gold-600">
                    {boundary.label}
                  </dt>
                  <dd className="mt-2 text-sm text-ink-900/70">
                    {boundary.value}
                  </dd>
                </div>
              </RevealItem>
            ))}
          </dl>
        </RevealGroup>
      </section>

      {/* Struktur Organisasi */}
      <section className="bg-moss-900 text-paper-50">
        <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6">
          <Reveal>
            <Eyebrow onDark>Pemerintahan Desa</Eyebrow>
            <h2 className="mt-3 font-display text-2xl font-semibold">
              Struktur Organisasi
            </h2>

            <ul className="mt-6 divide-y divide-paper-50/10 border border-paper-50/15">
              {profile.orgStructure.map((entry) => (
                <li
                  key={entry.role}
                  className="flex flex-wrap items-center justify-between gap-2 px-5 py-4"
                >
                  <span className="font-medium text-paper-50">
                    {entry.role}
                  </span>
                  <span className="text-sm text-paper-50/50">
                    {entry.name || "Nama belum diisi"}
                  </span>
                </li>
              ))}
              {profile.orgStructure.length === 0 && (
                <li className="px-5 py-4 text-sm text-paper-50/50">
                  Struktur organisasi belum diisi.
                </li>
              )}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* Landasan Hukum */}
      <section className="bg-paper-100">
        <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6">
          <Reveal>
            <Eyebrow>Dasar Hukum</Eyebrow>
            <h2 className="mt-3 font-display text-2xl font-semibold text-ink-900">
              Landasan Hukum
            </h2>
            <p className="mt-3 max-w-2xl text-ink-900/70">
              Peraturan dan keputusan yang menjadi dasar penyelenggaraan
              pemerintahan Desa Pranggong. Dokumen lengkap dapat diunduh
              dalam format PDF.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="mt-6 overflow-x-auto rounded-2xl border border-black/5 bg-paper-50 shadow-sm shadow-black/[0.02]">
              <table className="w-full min-w-[560px] text-left text-sm">
                <thead>
                  <tr className="border-b border-moss-900/10 text-xs font-semibold uppercase tracking-wide text-ink-900/50">
                    <th className="px-5 py-3">Nomor</th>
                    <th className="px-5 py-3">Tentang</th>
                    <th className="px-5 py-3">Tahun</th>
                    <th className="px-5 py-3 text-right">Dokumen</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-moss-900/10">
                  {legalBasisList.map((item) => (
                    <tr key={item.id}>
                      <td className="px-5 py-4 font-medium text-ink-900">
                        {item.number}
                      </td>
                      <td className="px-5 py-4 text-ink-900/70">
                        {item.title}
                      </td>
                      <td className="px-5 py-4 text-ink-900/70">
                        {item.year}
                      </td>
                      <td className="px-5 py-4 text-right">
                        {item.fileName ? (
                          <a
                            href={`/api/landasan-hukum/${item.id}`}
                            className="font-semibold text-moss-600 hover:underline"
                          >
                            Unduh PDF
                          </a>
                        ) : (
                          <span className="text-xs italic text-ink-900/40">
                            Belum tersedia
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                  {legalBasisList.length === 0 && (
                    <tr>
                      <td
                        colSpan={4}
                        className="px-5 py-8 text-center text-sm text-ink-900/50"
                      >
                        Belum ada data landasan hukum.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
