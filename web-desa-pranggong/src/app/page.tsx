import Link from "next/link";
import { siteConfig } from "@/lib/site-config";

const highlightPosts = [
  {
    title: "Selamat Datang di Website Desa Pranggong",
    excerpt:
      "Website ini dikembangkan untuk memudahkan warga dan masyarakat umum mengakses informasi seputar Desa Pranggong.",
    date: "2026-07-13",
  },
];

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
  return (
    <div className="flex flex-col">
      <section className="bg-gradient-to-b from-emerald-800 to-emerald-700 text-white">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
          <p className="text-sm font-medium uppercase tracking-widest text-emerald-200">
            Kecamatan {siteConfig.kecamatan} · Kabupaten {siteConfig.kabupaten}
          </p>
          <h1 className="mt-4 max-w-2xl text-4xl font-bold leading-tight sm:text-5xl">
            {siteConfig.name}
          </h1>
          <p className="mt-4 max-w-xl text-lg text-emerald-100">
            {siteConfig.description}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/profil-desa"
              className="rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-emerald-800 hover:bg-emerald-50"
            >
              Profil Desa
            </Link>
            <Link
              href="/peta-desa"
              className="rounded-full border border-white/60 px-5 py-2.5 text-sm font-semibold text-white hover:bg-white/10"
            >
              Lihat Peta Desa
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6">
        <div className="grid gap-10 md:grid-cols-3">
          <div className="md:col-span-1">
            <h2 className="text-2xl font-semibold text-emerald-900">
              Sambutan Kepala Desa
            </h2>
          </div>
          <div className="md:col-span-2">
            <p className="text-emerald-950/80 leading-relaxed">
              Selamat datang di website resmi Desa Pranggong. Melalui website
              ini, kami berharap dapat menjangkau lebih banyak warga maupun
              masyarakat umum dengan informasi yang transparan dan mudah
              diakses — mulai dari profil desa, program kerja, hingga
              layanan administrasi.
            </p>
            <p className="mt-3 text-sm text-emerald-900/60">
              — Kepala Desa Pranggong
            </p>
          </div>
        </div>
      </section>

      <section className="bg-emerald-50">
        <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6">
          <div className="flex items-end justify-between">
            <h2 className="text-2xl font-semibold text-emerald-900">
              Program Kerja
            </h2>
          </div>
          <div className="mt-6 grid gap-6 sm:grid-cols-2">
            {programs.map((program) => (
              <Link
                key={program.href}
                href={program.href}
                className="rounded-xl border border-emerald-900/10 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
              >
                <h3 className="text-lg font-semibold text-emerald-900">
                  {program.title}
                </h3>
                <p className="mt-2 text-sm text-emerald-950/70">
                  {program.description}
                </p>
                <span className="mt-4 inline-block text-sm font-medium text-emerald-700">
                  Selengkapnya →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6">
        <div className="flex items-end justify-between">
          <h2 className="text-2xl font-semibold text-emerald-900">
            Berita &amp; Kegiatan Terbaru
          </h2>
          <Link
            href="/blog"
            className="text-sm font-medium text-emerald-700 hover:underline"
          >
            Lihat semua
          </Link>
        </div>
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {highlightPosts.map((post) => (
            <article
              key={post.title}
              className="rounded-xl border border-emerald-900/10 p-6"
            >
              <p className="text-xs text-emerald-900/50">{post.date}</p>
              <h3 className="mt-2 text-lg font-semibold text-emerald-900">
                {post.title}
              </h3>
              <p className="mt-2 text-sm text-emerald-950/70">
                {post.excerpt}
              </p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
