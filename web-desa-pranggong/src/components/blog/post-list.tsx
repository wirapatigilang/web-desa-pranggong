"use client";

import { useMemo, useState } from "react";
import { postTypeLabels } from "@/lib/posts";
import type { Post, PostType } from "@/generated/prisma/client";

const types = Object.keys(postTypeLabels) as PostType[];

export default function PostList({ posts }: { posts: Post[] }) {
  const [activeType, setActiveType] = useState<PostType | "semua">("semua");

  const filtered = useMemo(() => {
    return posts.filter(
      (post) => activeType === "semua" || post.type === activeType,
    );
  }, [posts, activeType]);

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
        {types.map((type) => (
          <button
            key={type}
            type="button"
            onClick={() => setActiveType(type)}
            className={`rounded-full border px-3 py-1.5 text-sm transition-colors ${
              activeType === type
                ? "border-moss-600 bg-moss-600 text-paper-50"
                : "border-moss-900/15 text-ink-900/70 hover:border-moss-600/50"
            }`}
          >
            {postTypeLabels[type]}
          </button>
        ))}
      </div>

      {filtered.length > 0 ? (
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((post) => (
            <article
              key={post.slug}
              className="rounded-2xl border border-black/5 bg-paper-50 p-7 shadow-sm shadow-black/[0.02]"
            >
              <div className="flex items-center gap-2">
                <span className="rounded-full bg-gold-600/10 px-2.5 py-1 text-xs font-semibold uppercase tracking-wide text-gold-600">
                  {postTypeLabels[post.type]}
                </span>
                {post.pinned && (
                  <span className="rounded-full bg-ink-900/5 px-2.5 py-1 text-xs font-semibold uppercase tracking-wide text-ink-900/40">
                    Disematkan
                  </span>
                )}
              </div>
              <p className="mt-2 text-xs text-ink-900/40">
                {post.createdAt.toLocaleDateString("id-ID", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </p>
              <h3 className="mt-2 font-display text-lg font-semibold text-ink-900">
                {post.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-900/70">
                {post.excerpt}
              </p>
            </article>
          ))}
        </div>
      ) : (
        <p className="mt-8 text-sm text-ink-900/50">
          Belum ada konten untuk kategori ini.
        </p>
      )}
    </div>
  );
}
