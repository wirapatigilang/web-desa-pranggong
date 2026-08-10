"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireSession } from "@/lib/actions/require-session";

export type KknReportFormState = { error?: string; success?: boolean };

const MAX_IMAGE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];

async function parseImage(formData: FormData) {
  const file = formData.get("image");
  if (!(file instanceof File) || file.size === 0) {
    return { provided: false as const };
  }
  if (!ALLOWED_TYPES.includes(file.type)) {
    return { error: "Gambar harus berformat JPEG, PNG, atau WebP." };
  }
  if (file.size > MAX_IMAGE_SIZE) {
    return { error: "Ukuran gambar maksimal 5MB." };
  }
  const buffer = Buffer.from(await file.arrayBuffer());
  return {
    provided: true as const,
    imageName: file.name,
    imageType: file.type,
    imageData: buffer,
    imageSize: file.size,
  };
}

export async function createKknReport(
  _prevState: KknReportFormState,
  formData: FormData,
): Promise<KknReportFormState> {
  await requireSession();

  const title = String(formData.get("title") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();

  if (!title || !description) {
    return { error: "Judul dan deskripsi wajib diisi." };
  }

  const image = await parseImage(formData);
  if ("error" in image) {
    return { error: image.error };
  }
  if (!image.provided) {
    return { error: "Gambar wajib diunggah." };
  }

  await prisma.kknReport.create({
    data: {
      title,
      description,
      imageName: image.imageName,
      imageType: image.imageType,
      imageData: image.imageData,
      imageSize: image.imageSize,
    },
  });

  revalidatePath("/admin/laporan-kkn");
  revalidatePath("/blog");
  return { success: true };
}

export async function updateKknReport(
  id: string,
  _prevState: KknReportFormState,
  formData: FormData,
): Promise<KknReportFormState> {
  await requireSession();

  const title = String(formData.get("title") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();

  if (!title || !description) {
    return { error: "Judul dan deskripsi wajib diisi." };
  }

  const existing = await prisma.kknReport.findUnique({ where: { id } });
  if (!existing) {
    return { error: "Laporan KKN tidak ditemukan." };
  }

  const image = await parseImage(formData);
  if ("error" in image) {
    return { error: image.error };
  }

  await prisma.kknReport.update({
    where: { id },
    data: {
      title,
      description,
      ...(image.provided
        ? {
            imageName: image.imageName,
            imageType: image.imageType,
            imageData: image.imageData,
            imageSize: image.imageSize,
          }
        : {}),
    },
  });

  revalidatePath("/admin/laporan-kkn");
  revalidatePath("/blog");
  revalidatePath(`/blog/program-kkn/${id}`);
  return { success: true };
}

export async function deleteKknReport(id: string) {
  await requireSession();
  await prisma.kknReport.delete({ where: { id } });
  revalidatePath("/admin/laporan-kkn");
  revalidatePath("/blog");
}
