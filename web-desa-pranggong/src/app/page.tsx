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

// Penanda visual khas — sudut bintang, dipakai secara terbatas sebagai aksen identitas.
function BurstMark({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path d="M12 1c1 7 4 10 11 11-7 1-10 4-11 11-1-7-4-10-11-11 7-1 10-4 11-11z" />
    </svg>
  );
}

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero — wordmark "Bumi Pranggong", motif grid diagonal */}
      <section className="relative overflow-hidden bg-gradient-to-br from-moss-600 to-moss-900 text-paper-50">
        <div
          aria-hidden="true"
          className="bg-grid-diagonal pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_top_right,black,transparent_70%)]"
        />
        <div className="relative mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
          <p className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.25em] text-spring-400">
            <BurstMark className="h-4 w-4" />
            Website Resmi Pemerintah Desa
          </p>

          <div className="mt-10">
            <p className="font-display text-2xl italic text-spring-400 sm:text-3xl">
              Bumi
            </p>
            <h1 className="font-display text-6xl font-semibold leading-[0.95] text-paper-50 sm:text-7xl md:text-8xl">
              Pranggong
            </h1>
          </div>

          <p className="mt-6 font-mono text-xs uppercase tracking-[0.2em] text-paper-50/60">
            Kec. {siteConfig.kecamatan} · Kab. {siteConfig.kabupaten} ·{" "}
            {siteConfig.provinsi}
          </p>

          <p className="mt-6 max-w-xl text-lg text-paper-50/80">
            {siteConfig.description}
          </p>

          <div className="mt-9 flex flex-wrap gap-3">
            <Link
              href="/profil-desa"
              className="rounded-full bg-paper-50 px-6 py-3 text-sm font-semibold text-moss-900 transition-colors hover:bg-spring-400"
            >
              Profil Desa
            </Link>
            <Link
              href="/peta-desa"
              className="rounded-full border border-paper-50/40 px-6 py-3 text-sm font-semibold text-paper-50 transition-colors hover:border-paper-50 hover:bg-white/5"
            >
              Lihat Peta Desa
            </Link>
          </div>
        </div>
      </section>

      {/* Sambutan Kepala Desa — kartu ID/lanyard sebagai elemen khas halaman */}
      <section className="bg-paper-50">
        <div className="mx-auto grid w-full max-w-6xl gap-12 px-4 py-20 sm:px-6 md:grid-cols-[260px_1fr] md:items-center">
          <div className="relative mx-auto md:mx-0">
            <div className="absolute left-1/2 top-0 h-9 w-3 -translate-x-1/2 -translate-y-8 rounded-full bg-gradient-to-b from-transparent to-moss-500" />
            <div className="relative -rotate-3 rounded-[28px] border border-moss-900/10 bg-paper-100 p-6 shadow-xl shadow-moss-900/10">
              <div className="absolute -top-3 left-1/2 h-6 w-6 -translate-x-1/2 rounded-full border-4 border-paper-50 bg-moss-600" />
              <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.25em] text-moss-600">
                Sambutan
              </p>
              <p className="mt-1 font-display text-2xl font-semibold text-ink-900">
                Kepala Desa
              </p>
              <div className="my-4 h-px bg-moss-900/10" />
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-900/50">
                Desa Pranggong
              </p>
            </div>
          </div>

          <div>
            <h2 className="font-display text-3xl font-semibold text-ink-900">
              Sambutan Kepala Desa
            </h2>
            <p className="mt-4 max-w-xl text-lg leading-relaxed text-ink-900/70">
              &ldquo;Selamat datang di website resmi Desa Pranggong. Melalui
              website ini, kami berharap dapat menjangkau lebih banyak warga
              maupun masyarakat umum dengan informasi yang transparan dan
              mudah diakses — mulai dari profil desa, program kerja, hingga
              layanan administrasi.&rdquo;
            </p>
            <p className="mt-4 text-sm font-medium text-moss-600">
              — Kepala Desa Pranggong
            </p>
          </div>
        </div>
      </section>

      {/* Program Kerja */}
      <section className="bg-moss-900 text-paper-50">
        <div className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.25em] text-spring-400">
                Program Kerja
              </p>
              <h2 className="mt-2 font-display text-3xl font-semibold">
                Untuk Warga Pranggong
              </h2>
            </div>
            <BurstMark className="h-8 w-8 shrink-0 text-spring-400/70" />
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {programs.map((program) => (
              <Link
                key={program.href}
                href={program.href}
                className="group rounded-2xl border border-paper-50/10 bg-white/5 p-7 transition-colors hover:bg-white/10"
              >
                <h3 className="font-display text-xl font-semibold text-paper-50">
                  {program.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-paper-50/70">
                  {program.description}
                </p>
                <span className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-spring-400">
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

      {/* Berita & Kegiatan */}
      <section className="bg-paper-50">
        <div className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.25em] text-moss-600">
                Kabar Desa
              </p>
              <h2 className="mt-2 font-display text-3xl font-semibold text-ink-900">
                Berita &amp; Kegiatan Terbaru
              </h2>
            </div>
            <Link
              href="/blog"
              className="text-sm font-medium text-moss-600 hover:text-moss-900 hover:underline"
            >
              Lihat semua
            </Link>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {highlightPosts.map((post) => (
              <article
                key={post.title}
                className="rounded-2xl border border-moss-900/10 p-7"
              >
                <p className="font-mono text-xs uppercase tracking-wide text-ink-900/40">
                  {post.date}
                </p>
                <h3 className="mt-3 font-display text-lg font-semibold text-ink-900">
                  {post.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-900/70">
                  {post.excerpt}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
