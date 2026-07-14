"use server";

import { headers } from "next/headers";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { PostType } from "../../generated/prisma/enums";

async function requireSession() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) {
    redirect("/admin/login");
  }
  return session;
}

function slugify(title: string) {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

async function uniqueSlug(title: string, ignoreId?: string) {
  const base = slugify(title) || "tanpa-judul";
  let slug = base;
  let suffix = 1;
  while (true) {
    const existing = await prisma.post.findUnique({ where: { slug } });
    if (!existing || existing.id === ignoreId) return slug;
    suffix += 1;
    slug = `${base}-${suffix}`;
  }
}

export type PostFormState = { error?: string };

export async function createPost(
  _prevState: PostFormState,
  formData: FormData,
): Promise<PostFormState> {
  await requireSession();

  const title = String(formData.get("title") ?? "").trim();
  const excerpt = String(formData.get("excerpt") ?? "").trim();
  const content = String(formData.get("content") ?? "").trim();
  const type = String(formData.get("type") ?? "");
  const pinned = formData.get("pinned") === "on";

  if (!title || !excerpt || !content) {
    return { error: "Judul, ringkasan, dan konten wajib diisi." };
  }
  if (type !== PostType.pengumuman && type !== PostType.berita) {
    return { error: "Kategori tidak valid." };
  }

  const slug = await uniqueSlug(title);

  await prisma.post.create({
    data: { title, excerpt, content, type, pinned, slug },
  });

  revalidatePath("/admin");
  revalidatePath("/blog");
  revalidatePath("/");
  redirect("/admin");
}

export async function updatePost(
  id: string,
  _prevState: PostFormState,
  formData: FormData,
): Promise<PostFormState> {
  await requireSession();

  const title = String(formData.get("title") ?? "").trim();
  const excerpt = String(formData.get("excerpt") ?? "").trim();
  const content = String(formData.get("content") ?? "").trim();
  const type = String(formData.get("type") ?? "");
  const pinned = formData.get("pinned") === "on";

  if (!title || !excerpt || !content) {
    return { error: "Judul, ringkasan, dan konten wajib diisi." };
  }
  if (type !== PostType.pengumuman && type !== PostType.berita) {
    return { error: "Kategori tidak valid." };
  }

  const existing = await prisma.post.findUnique({ where: { id } });
  if (!existing) {
    return { error: "Post tidak ditemukan." };
  }

  const slug =
    existing.title === title ? existing.slug : await uniqueSlug(title, id);

  await prisma.post.update({
    where: { id },
    data: { title, excerpt, content, type, pinned, slug },
  });

  revalidatePath("/admin");
  revalidatePath("/blog");
  revalidatePath("/");
  redirect("/admin");
}

export async function deletePost(id: string) {
  await requireSession();
  await prisma.post.delete({ where: { id } });
  revalidatePath("/admin");
  revalidatePath("/blog");
  revalidatePath("/");
}
