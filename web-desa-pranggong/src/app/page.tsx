import Link from "next/link";
import Eyebrow from "@/components/ui/eyebrow";
import { siteConfig } from "@/lib/site-config";
import { postsByType, type Post } from "@/lib/posts";

function PostCard({ post }: { post: Post }) {
  return (
    <article className="border border-moss-900/10 p-7">
      <div className="flex items-center gap-3">
        <p className="text-xs font-semibold uppercase tracking-wide text-ink-900/40">
          {post.date}
        </p>
        {post.pinned && (
          <span className="text-xs font-semibold uppercase tracking-wide text-gold-600">
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
  },
  {
    title: "Peta Interaktif Desa",
    description:
      "Lihat lokasi kantor desa, fasilitas umum, dan titik penting lainnya beserta informasi kontaknya.",
    href: "/peta-desa",
  },
];

export default function Home() {
  const pengumuman = postsByType("pengumuman");
  const berita = postsByType("berita");

  return (
    <div className="flex flex-col">
      {/* Hero — masthead resmi pemerintah desa */}
      <section className="bg-gradient-to-b from-moss-700 to-moss-900 text-paper-50">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
          <Eyebrow onDark>Pemerintah Desa Pranggong</Eyebrow>

          <h1 className="mt-5 font-display text-4xl font-semibold leading-tight text-paper-50 sm:text-5xl">
            {siteConfig.name}
          </h1>

          <p className="mt-4 text-sm uppercase tracking-wide text-paper-50/60">
            Kecamatan {siteConfig.kecamatan} · Kabupaten {siteConfig.kabupaten}{" "}
            · {siteConfig.provinsi}
          </p>

          <p className="mt-6 max-w-xl text-lg text-paper-50/80">
            {siteConfig.description}
          </p>

          <div className="mt-9 flex flex-wrap gap-3">
            <Link
              href="/profil-desa"
              className="rounded-md bg-paper-50 px-6 py-3 text-sm font-semibold text-moss-900 transition-colors hover:bg-white"
            >
              Profil Desa
            </Link>
            <Link
              href="/peta-desa"
              className="rounded-md border border-paper-50/40 px-6 py-3 text-sm font-semibold text-paper-50 transition-colors hover:border-paper-50 hover:bg-white/5"
            >
              Lihat Peta Desa
            </Link>
          </div>
        </div>
      </section>

      {/* Sambutan Kepala Desa */}
      <section className="bg-paper-50">
        <div className="mx-auto grid w-full max-w-6xl gap-10 px-4 py-20 sm:px-6 md:grid-cols-[220px_1fr] md:items-start">
          <div className="mx-auto flex h-56 w-44 items-center justify-center border border-moss-900/15 bg-paper-100 text-ink-900/30 md:mx-0">
            <svg
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
              className="h-16 w-16"
            >
              <path d="M12 12a5 5 0 1 0 0-10 5 5 0 0 0 0 10Zm0 2c-4.42 0-8 2.24-8 5v1a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-1c0-2.76-3.58-5-8-5Z" />
            </svg>
          </div>

          <div>
            <Eyebrow>Sambutan Kepala Desa</Eyebrow>
            <h2 className="mt-3 font-display text-2xl font-semibold text-ink-900 sm:text-3xl">
              Kepala Desa Pranggong
            </h2>
            <blockquote className="mt-5 max-w-xl border-l-2 border-gold-600 pl-5 text-lg leading-relaxed text-ink-900/80">
              Selamat datang di website resmi Desa Pranggong. Melalui website
              ini, kami berharap dapat menjangkau lebih banyak warga maupun
              masyarakat umum dengan informasi yang transparan dan mudah
              diakses — mulai dari profil desa, program kerja, hingga layanan
              administrasi.
            </blockquote>
            <p className="mt-4 text-sm font-semibold text-ink-900/60">
              — Kepala Desa Pranggong
            </p>
          </div>
        </div>
      </section>

      {/* Program Kerja */}
      <section className="bg-moss-900 text-paper-50">
        <div className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6">
          <Eyebrow onDark>Program Kerja</Eyebrow>
          <h2 className="mt-3 font-display text-3xl font-semibold">
            Untuk Warga Pranggong
          </h2>

          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {programs.map((program) => (
              <Link
                key={program.href}
                href={program.href}
                className="group border border-paper-50/15 bg-white/5 p-7 transition-colors hover:border-gold-300/60 hover:bg-white/10"
              >
                <h3 className="font-display text-xl font-semibold text-paper-50">
                  {program.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-paper-50/70">
                  {program.description}
                </p>
                <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-gold-300">
                  Selengkapnya
                  <span className="transition-transform group-hover:translate-x-1">
                    →
                  </span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Pengumuman */}
      <section className="bg-paper-100">
        <div className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6">
          <div className="flex items-end justify-between gap-4">
            <div>
              <Eyebrow>Layanan Informasi</Eyebrow>
              <h2 className="mt-3 font-display text-3xl font-semibold text-ink-900">
                Pengumuman
              </h2>
            </div>
            <Link
              href="/blog"
              className="text-sm font-semibold text-moss-600 hover:text-moss-900 hover:underline"
            >
              Lihat semua
            </Link>
          </div>

          {pengumuman.length > 0 ? (
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {pengumuman.map((post) => (
                <PostCard key={post.slug} post={post} />
              ))}
            </div>
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
          <div className="flex items-end justify-between gap-4">
            <div>
              <Eyebrow>Kabar Desa</Eyebrow>
              <h2 className="mt-3 font-display text-3xl font-semibold text-ink-900">
                Berita &amp; Kegiatan Terbaru
              </h2>
            </div>
            <Link
              href="/blog"
              className="text-sm font-semibold text-moss-600 hover:text-moss-900 hover:underline"
            >
              Lihat semua
            </Link>
          </div>

          {berita.length > 0 ? (
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {berita.map((post) => (
                <PostCard key={post.slug} post={post} />
              ))}
            </div>
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
