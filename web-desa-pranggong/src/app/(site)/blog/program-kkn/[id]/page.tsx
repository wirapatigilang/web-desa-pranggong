import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import Eyebrow from "@/components/ui/eyebrow";
import Reveal from "@/components/motion/reveal";
import { prisma } from "@/lib/prisma";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const report = await prisma.kknReport.findUnique({
    where: { id },
    select: { title: true, description: true },
  });

  if (!report) {
    return { title: "Laporan Program KKN" };
  }

  return {
    title: report.title,
    description: report.description.slice(0, 160),
  };
}

export default async function KknReportDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const report = await prisma.kknReport.findUnique({ where: { id } });

  if (!report) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <Reveal>
        <Link
          href="/blog"
          className="group inline-flex items-center gap-1.5 text-sm text-ink-900/60 hover:text-ink-900"
        >
          <ArrowLeft
            aria-hidden="true"
            className="size-4 transition-transform duration-300 ease-out group-hover:-translate-x-1"
          />
          Kembali ke Berita &amp; Pengumuman
        </Link>

        <div className="mt-6">
          <Eyebrow>Program KKN</Eyebrow>
        </div>
        <h1 className="mt-3 font-display text-3xl font-semibold text-ink-900 sm:text-4xl">
          {report.title}
        </h1>
        <p className="mt-3 text-sm text-ink-900/40">
          {report.createdAt.toLocaleDateString("id-ID", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </p>

        <div className="mt-8 overflow-hidden rounded-2xl border border-black/5">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`/api/laporan-kkn/${report.id}/image`}
            alt={report.title}
            className="w-full object-cover"
          />
        </div>

        <p className="mt-8 whitespace-pre-line text-base leading-relaxed text-ink-900/80">
          {report.description}
        </p>
      </Reveal>
    </div>
  );
}
