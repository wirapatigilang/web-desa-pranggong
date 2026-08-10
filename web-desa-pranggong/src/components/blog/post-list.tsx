"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { postTypeLabels } from "@/lib/posts";
import type { Post, PostType, KknReport } from "@/generated/prisma/client";

type Category = PostType | "program_kkn";

const categoryLabels: Record<Category, string> = {
  ...postTypeLabels,
  program_kkn: "Program KKN",
};

const categories = Object.keys(categoryLabels) as Category[];

type BlogItem = {
  id: string;
  category: Category;
  title: string;
  excerpt: string;
  createdAt: Date;
  pinned: boolean;
  href?: string;
  imageUrl?: string;
};

export default function PostList({
  posts,
  kknReports,
}: {
  posts: Post[];
  kknReports: Pick<KknReport, "id" | "title" | "description" | "createdAt">[];
}) {
  const [activeType, setActiveType] = useState<Category | "semua">("semua");

  const items = useMemo<BlogItem[]>(() => {
    const postItems: BlogItem[] = posts.map((post) => ({
      id: post.id,
      category: post.type,
      title: post.title,
      excerpt: post.excerpt,
      createdAt: post.createdAt,
      pinned: post.pinned,
    }));
    const kknItems: BlogItem[] = kknReports.map((report) => ({
      id: report.id,
      category: "program_kkn",
      title: report.title,
      excerpt: report.description,
      createdAt: report.createdAt,
      pinned: false,
      href: `/blog/program-kkn/${report.id}`,
      imageUrl: `/api/laporan-kkn/${report.id}/image`,
    }));
    return [...postItems, ...kknItems].sort((a, b) => {
      if (a.pinned !== b.pinned) return a.pinned ? -1 : 1;
      return b.createdAt.getTime() - a.createdAt.getTime();
    });
  }, [posts, kknReports]);

  const filtered = useMemo(() => {
    return items.filter(
      (item) => activeType === "semua" || item.category === activeType,
    );
  }, [items, activeType]);

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setActiveType("semua")}
          className={`rounded-full border px-3 py-1.5 text-sm transition-colors ${
            activeType === "semua"
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
            onClick={() => setActiveType(category)}
            className={`rounded-full border px-3 py-1.5 text-sm transition-colors ${
              activeType === category
                ? "border-moss-600 bg-moss-600 text-paper-50"
                : "border-moss-900/15 text-ink-900/70 hover:border-moss-600/50"
            }`}
          >
            {categoryLabels[category]}
          </button>
        ))}
      </div>

      {filtered.length > 0 ? (
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((item) => {
            const badge = (
              <div className="flex items-center gap-2">
                <span className="rounded-full bg-gold-600/10 px-2.5 py-1 text-xs font-semibold uppercase tracking-wide text-gold-600">
                  {categoryLabels[item.category]}
                </span>
                {item.pinned && (
                  <span className="rounded-full bg-ink-900/5 px-2.5 py-1 text-xs font-semibold uppercase tracking-wide text-ink-900/40">
                    Disematkan
                  </span>
                )}
              </div>
            );
            const date = item.createdAt.toLocaleDateString("id-ID", {
              day: "numeric",
              month: "long",
              year: "numeric",
            });

            const content = (
              <>
                {item.imageUrl && (
                  <div className="-mx-7 -mt-7 mb-4 overflow-hidden rounded-t-2xl">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="h-40 w-full object-cover"
                    />
                  </div>
                )}
                {badge}
                <p className="mt-2 text-xs text-ink-900/40">{date}</p>
                <h3 className="mt-2 font-display text-lg font-semibold text-ink-900">
                  {item.title}
                </h3>
                <p
                  className={`mt-2 line-clamp-3 text-sm leading-relaxed text-ink-900/70 ${
                    item.category === "program_kkn" ? "text-justify" : ""
                  }`}
                >
                  {item.excerpt}
                </p>
              </>
            );

            if (item.href) {
              return (
                <Link
                  key={item.id}
                  href={item.href}
                  className="rounded-2xl border border-black/5 bg-paper-50 p-7 shadow-sm shadow-black/[0.02] transition-shadow hover:shadow-md"
                >
                  {content}
                </Link>
              );
            }

            return (
              <article
                key={item.id}
                className="rounded-2xl border border-black/5 bg-paper-50 p-7 shadow-sm shadow-black/[0.02]"
              >
                {content}
              </article>
            );
          })}
        </div>
      ) : (
        <p className="mt-8 text-sm text-ink-900/50">
          Belum ada konten untuk kategori ini.
        </p>
      )}
    </div>
  );
}
