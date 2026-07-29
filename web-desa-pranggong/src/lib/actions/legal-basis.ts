"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireSession } from "@/lib/actions/require-session";

export type LegalBasisFormState = { error?: string; success?: boolean };

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB, selaras dengan bodySizeLimit di next.config.ts

async function parseFile(formData: FormData) {
  const file = formData.get("file");
  if (!(file instanceof File) || file.size === 0) {
    return { provided: false as const };
  }
  if (file.type !== "application/pdf") {
    return { error: "File harus berformat PDF." };
  }
  if (file.size > MAX_FILE_SIZE) {
    return { error: "Ukuran file maksimal 10MB." };
  }
  const buffer = Buffer.from(await file.arrayBuffer());
  return {
    provided: true as const,
    fileName: file.name,
    fileType: file.type,
    fileData: buffer,
    fileSize: file.size,
  };
}

export async function createLegalBasis(
  _prevState: LegalBasisFormState,
  formData: FormData,
): Promise<LegalBasisFormState> {
  await requireSession();

  const type = String(formData.get("type") ?? "").trim();
  const number = String(formData.get("number") ?? "").trim();
  const title = String(formData.get("title") ?? "").trim();
  const year = String(formData.get("year") ?? "").trim();

  if (!type || !number || !title || !year) {
    return { error: "Jenis regulasi, nomor, tentang, dan tahun wajib diisi." };
  }

  const file = await parseFile(formData);
  if ("error" in file) {
    return { error: file.error };
  }

  await prisma.legalBasis.create({
    data: {
      type,
      number,
      title,
      year,
      ...(file.provided
        ? {
            fileName: file.fileName,
            fileType: file.fileType,
            fileData: file.fileData,
            fileSize: file.fileSize,
          }
        : {}),
    },
  });

  revalidatePath("/admin/landasan-hukum");
  revalidatePath("/profil-desa");
  return { success: true };
}

export async function updateLegalBasis(
  id: string,
  _prevState: LegalBasisFormState,
  formData: FormData,
): Promise<LegalBasisFormState> {
  await requireSession();

  const type = String(formData.get("type") ?? "").trim();
  const number = String(formData.get("number") ?? "").trim();
  const title = String(formData.get("title") ?? "").trim();
  const year = String(formData.get("year") ?? "").trim();

  if (!type || !number || !title || !year) {
    return { error: "Jenis regulasi, nomor, tentang, dan tahun wajib diisi." };
  }

  const existing = await prisma.legalBasis.findUnique({ where: { id } });
  if (!existing) {
    return { error: "Data regulasi desa tidak ditemukan." };
  }

  const file = await parseFile(formData);
  if ("error" in file) {
    return { error: file.error };
  }

  await prisma.legalBasis.update({
    where: { id },
    data: {
      type,
      number,
      title,
      year,
      ...(file.provided
        ? {
            fileName: file.fileName,
            fileType: file.fileType,
            fileData: file.fileData,
            fileSize: file.fileSize,
          }
        : {}),
    },
  });

  revalidatePath("/admin/landasan-hukum");
  revalidatePath("/profil-desa");
  return { success: true };
}

export async function deleteLegalBasis(id: string) {
  await requireSession();
  await prisma.legalBasis.delete({ where: { id } });
  revalidatePath("/admin/landasan-hukum");
  revalidatePath("/profil-desa");
}
