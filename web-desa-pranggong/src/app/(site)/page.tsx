import Link from "next/link";
import Eyebrow from "@/components/ui/eyebrow";
import HoverArrow from "@/components/ui/hover-arrow";
import Reveal, { RevealGroup, RevealItem } from "@/components/motion/reveal";
import { siteConfig } from "@/lib/site-config";
import { prisma } from "@/lib/prisma";
import { getVillageProfile } from "@/lib/village-profile";
import type { Post } from "@/generated/prisma/client";

function PostCard({ post }: { post: Post }) {
  return (
    <article className="rounded-2xl border border-black/5 bg-paper-50 p-7 shadow-sm shadow-black/[0.02]">
      <div className="flex items-center gap-3">
        <p className="text-xs font-semibold uppercase tracking-wide text-ink-900/40">
          {post.createdAt.toLocaleDateString("id-ID", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </p>
        {post.pinned && (
          <span className="rounded-full bg-ink-900/5 px-2.5 py-1 text-xs font-semibold uppercase tracking-wide text-ink-900/40">
            Disematkan
          </span>
        )}
      </div>
      <h3 className="mt-3 font-display text-lg font-semibold text-ink-900">
        {post.title}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-ink-900/70">
        {post.excerpt}
      </p>
    </article>
  );
}

const programs = [
  {
    title: "Rocket Stove Hemat Energi",
    description:
      "Program kerja pembuatan tungku Rocket Stove untuk membantu efisiensi bahan bakar dan mengurangi asap dapur warga.",
    href: "/program-kerja/rocket-stove",
    icon: <path d="M13 2 4 14 11 14 9 22 20 10 13 10Z" />,
  },
  {
    title: "Peta Interaktif Desa",
    description:
      "Lihat lokasi kantor desa, fasilitas umum, dan titik penting lainnya beserta informasi kontaknya.",
    href: "/peta-desa",
    icon: (
      <>
        <circle cx="12" cy="10" r="4" />
        <path d="M8 13 12 21 16 13Z" />
      </>
    ),
  },
];

const layananPublik = [
  {
    title: "Administrasi Kependudukan",
    description:
      "Pembuatan/pembaruan KTP, KK, dan akta kelahiran. Datang langsung ke kantor desa dengan berkas lengkap.",
    icon: (
      <>
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <circle cx="8" cy="11" r="2" />
        <path d="M5 17 6 15 10 15 11 17Z" />
        <path d="M15 9h4M15 13h4" />
      </>
    ),
  },
  {
    title: "Surat Keterangan",
    description:
      "SKU, SKCK pengantar, dan surat keterangan tidak mampu (SKTM). Proses lewat kantor desa pada jam layanan.",
    icon: (
      <>
        <path d="M7 3 14 3 19 8 19 21 7 21Z" />
        <path d="M14 3v5h5" />
        <path d="M9 13h6M9 17h6" />
      </>
    ),
  },
  {
    title: "Informasi Bantuan Sosial",
    description:
      "Info program bantuan (BLT, PKH, dan sejenisnya) serta status penyaluran — tanyakan langsung ke perangkat desa.",
    icon: (
      <>
        <rect x="4" y="9" width="16" height="12" rx="1" />
        <path d="M4 13h16" />
        <path d="M12 9v12" />
        <rect x="9" y="4" width="6" height="5" rx="1" />
      </>
    ),
  },
];

export default async function Home() {
  const [pengumuman, berita, profile] = await Promise.all([
    prisma.post.findMany({
      where: { type: "pengumuman" },
      orderBy: [{ pinned: "desc" }, { createdAt: "desc" }],
    }),
    prisma.post.findMany({
      where: { type: "berita" },
      orderBy: [{ pinned: "desc" }, { createdAt: "desc" }],
    }),
    getVillageProfile(),
  ]);

  const stats = [
    { label: "Penduduk", value: profile.population },
    { label: "Dusun", value: profile.hamlets },
    { label: "Kepala Keluarga", value: profile.households },
    { label: "Luas Wilayah", value: profile.area },
  ];

  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="bg-gradient-to-b from-moss-600/5 to-paper-50">
        <div className="mx-auto max-w-6xl px-4 pb-14 pt-16 text-center sm:px-6 sm:pt-24">
          <Reveal>
            <span className="inline-flex items-center rounded-full bg-moss-600/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-moss-600">
              Desa Inovatif &amp; Mandiri
            </span>

            <h1 className="mx-auto mt-6 max-w-2xl font-display text-4xl font-bold leading-tight text-moss-900 sm:text-5xl">
              Selamat Datang di {siteConfig.name}
            </h1>

            <p className="mx-auto mt-4 max-w-xl text-ink-900/70">
              {siteConfig.description}
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/kontak"
                className="group inline-flex items-center gap-1.5 rounded-full bg-moss-600 px-6 py-3 text-sm font-semibold text-paper-50 transition-colors hover:bg-moss-500"
              >
                Layanan Publik
                <HoverArrow />
              </Link>
              <Link
                href="/profil-desa"
                className="rounded-full border border-moss-900/15 bg-paper-50 px-6 py-3 text-sm font-semibold text-ink-900 transition-colors hover:border-moss-600/40"
              >
                Pelajari Lebih Lanjut
              </Link>
            </div>
          </Reveal>

          <RevealGroup className="mx-auto mt-14 grid max-w-3xl grid-cols-2 gap-3 sm:grid-cols-4">
            {stats.map((stat) => (
              <RevealItem key={stat.label}>
                <div className="rounded-2xl border border-black/5 bg-paper-50 px-4 py-5 shadow-sm shadow-black/[0.03]">
                  <p className="font-display text-xl font-bold text-moss-600 sm:text-2xl">
                    {stat.value}
                  </p>
                  <p className="mt-1 text-xs uppercase tracking-wide text-ink-900/50">
                    {stat.label}
                  </p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* Sambutan Kepala Desa */}
      <section className="bg-paper-50">
        <div className="mx-auto grid w-full max-w-6xl gap-10 px-4 py-20 sm:px-6 md:grid-cols-[220px_1fr] md:items-start">
          <Reveal className="mx-auto md:mx-0">
            <div className="flex h-56 w-44 items-center justify-center rounded-3xl bg-paper-100 text-ink-900/25">
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
                className="h-16 w-16"
              >
                <path d="M12 12a5 5 0 1 0 0-10 5 5 0 0 0 0 10Zm0 2c-4.42 0-8 2.24-8 5v1a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-1c0-2.76-3.58-5-8-5Z" />
              </svg>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <Eyebrow>Sambutan Kepala Desa</Eyebrow>
            <h2 className="mt-3 font-display text-2xl font-semibold text-ink-900 sm:text-3xl">
              Kepala Desa Pranggong
            </h2>
            <blockquote className="mt-5 max-w-xl rounded-2xl bg-paper-100 p-6 text-lg leading-relaxed text-ink-900/80">
              Selamat datang di website resmi Desa Pranggong. Melalui website
              ini, kami berharap dapat menjangkau lebih banyak warga maupun
              masyarakat umum dengan informasi yang transparan dan mudah
              diakses — mulai dari profil desa, program kerja, hingga layanan
              administrasi.
            </blockquote>
            <p className="mt-4 text-sm font-semibold text-ink-900/60">
              — Kepala Desa Pranggong
            </p>
          </Reveal>
        </div>
      </section>

      {/* Layanan Publik */}
      <section className="bg-paper-100">
        <div className="mx-auto w-full max-w-6xl px-4 py-20 text-center sm:px-6">
          <Reveal>
            <div className="flex justify-center">
              <Eyebrow>Layanan Informasi</Eyebrow>
            </div>
            <h2 className="mt-3 font-display text-3xl font-semibold text-ink-900">
              Layanan Publik Utama
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-sm text-ink-900/60">
              Kami berkomitmen memberikan pelayanan administrasi yang cepat,
              mudah, dan transparan bagi seluruh warga Desa Pranggong.
            </p>
          </Reveal>

          <RevealGroup className="mt-10 grid gap-6 text-left sm:grid-cols-3">
            {layananPublik.map((item) => (
              <RevealItem key={item.title}>
                <div className="rounded-2xl border border-black/5 bg-paper-50 p-6">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-moss-600/10 text-moss-600">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                      className="h-5 w-5"
                    >
                      {item.icon}
                    </svg>
                  </div>
                  <h3 className="mt-4 font-display text-base font-semibold text-ink-900">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-900/60">
                    {item.description}
                  </p>
                  <Link
                    href="/kontak"
                    className="group mt-4 inline-flex items-center gap-1 text-sm font-semibold text-moss-600 hover:underline"
                  >
                    Info selengkapnya
                    <HoverArrow />
                  </Link>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* Program Kerja */}
      <section className="bg-paper-50">
        <div className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6">
          <Reveal>
            <Eyebrow>Program Kerja</Eyebrow>
            <h2 className="mt-3 font-display text-3xl font-semibold text-ink-900">
              Untuk Warga Pranggong
            </h2>
          </Reveal>

          <RevealGroup className="mt-10 grid gap-6 sm:grid-cols-2">
            {programs.map((program) => (
              <RevealItem key={program.href}>
                <Link
                  href={program.href}
                  className="group block rounded-2xl border border-black/5 bg-paper-100 p-7 transition-colors hover:border-moss-600/30 hover:bg-moss-600/5"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-moss-600 text-paper-50">
                    <svg
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      aria-hidden="true"
                      className="h-5 w-5"
                    >
                      {program.icon}
                    </svg>
                  </div>
                  <h3 className="mt-4 font-display text-xl font-semibold text-ink-900">
                    {program.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-ink-900/70">
                    {program.description}
                  </p>
                  <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-moss-600">
                    Selengkapnya
                    <HoverArrow />
                  </span>
                </Link>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* Pengumuman */}
      <section className="bg-paper-100">
        <div className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6">
          <Reveal>
            <div className="flex items-end justify-between gap-4">
              <div>
                <Eyebrow>Layanan Informasi</Eyebrow>
                <h2 className="mt-3 font-display text-3xl font-semibold text-ink-900">
                  Pengumuman
                </h2>
              </div>
              <Link
                href="/blog"
                className="text-sm font-semibold text-moss-600 hover:underline"
              >
                Lihat semua
              </Link>
            </div>
          </Reveal>

          {pengumuman.length > 0 ? (
            <RevealGroup className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {pengumuman.map((post) => (
                <RevealItem key={post.slug}>
                  <PostCard post={post} />
                </RevealItem>
              ))}
            </RevealGroup>
          ) : (
            <p className="mt-8 text-sm text-ink-900/50">
              Belum ada pengumuman saat ini.
            </p>
          )}
        </div>
      </section>

      {/* Berita */}
      <section className="bg-paper-50">
        <div className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6">
          <Reveal>
            <div className="flex items-end justify-between gap-4">
              <div>
                <Eyebrow>Kabar Desa</Eyebrow>
                <h2 className="mt-3 font-display text-3xl font-semibold text-ink-900">
                  Berita &amp; Kegiatan Terbaru
                </h2>
              </div>
              <Link
                href="/blog"
                className="text-sm font-semibold text-moss-600 hover:underline"
              >
                Lihat semua
              </Link>
            </div>
          </Reveal>

          {berita.length > 0 ? (
            <RevealGroup className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {berita.map((post) => (
                <RevealItem key={post.slug}>
                  <PostCard post={post} />
                </RevealItem>
              ))}
            </RevealGroup>
          ) : (
            <p className="mt-8 text-sm text-ink-900/50">
              Belum ada berita saat ini.
            </p>
          )}
        </div>
      </section>
    </div>
  );
}
