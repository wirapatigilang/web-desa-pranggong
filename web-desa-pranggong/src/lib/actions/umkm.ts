"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireSession } from "@/lib/actions/require-session";

export type UmkmFormState = { error?: string; success?: boolean };

function parseCoordinate(value: FormDataEntryValue | null): number | null {
  const trimmed = String(value ?? "").trim();
  if (!trimmed) return null;
  const parsed = Number(trimmed);
  return Number.isFinite(parsed) ? parsed : null;
}

export async function createUmkm(
  _prevState: UmkmFormState,
  formData: FormData,
): Promise<UmkmFormState> {
  await requireSession();

  const name = String(formData.get("name") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();
  const contact = String(formData.get("contact") ?? "").trim();
  const latRaw = formData.get("lat");
  const lngRaw = formData.get("lng");

  if (!name || !description) {
    return { error: "Nama usaha dan deskripsi wajib diisi." };
  }

  const lat = parseCoordinate(latRaw);
  const lng = parseCoordinate(lngRaw);
  if ((lat === null) !== (lng === null)) {
    return { error: "Isi latitude & longitude berdua, atau kosongkan berdua." };
  }
  if (String(latRaw ?? "").trim() && lat === null) {
    return { error: "Latitude harus berupa angka." };
  }
  if (String(lngRaw ?? "").trim() && lng === null) {
    return { error: "Longitude harus berupa angka." };
  }

  await prisma.umkm.create({
    data: { name, description, contact: contact || null, lat, lng },
  });

  revalidatePath("/admin/umkm");
  revalidatePath("/peta-desa");
  return { success: true };
}

export async function updateUmkm(
  id: string,
  _prevState: UmkmFormState,
  formData: FormData,
): Promise<UmkmFormState> {
  await requireSession();

  const name = String(formData.get("name") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();
  const contact = String(formData.get("contact") ?? "").trim();
  const latRaw = formData.get("lat");
  const lngRaw = formData.get("lng");

  if (!name || !description) {
    return { error: "Nama usaha dan deskripsi wajib diisi." };
  }

  const lat = parseCoordinate(latRaw);
  const lng = parseCoordinate(lngRaw);
  if ((lat === null) !== (lng === null)) {
    return { error: "Isi latitude & longitude berdua, atau kosongkan berdua." };
  }
  if (String(latRaw ?? "").trim() && lat === null) {
    return { error: "Latitude harus berupa angka." };
  }
  if (String(lngRaw ?? "").trim() && lng === null) {
    return { error: "Longitude harus berupa angka." };
  }

  const existing = await prisma.umkm.findUnique({ where: { id } });
  if (!existing) {
    return { error: "UMKM tidak ditemukan." };
  }

  await prisma.umkm.update({
    where: { id },
    data: { name, description, contact: contact || null, lat, lng },
  });

  revalidatePath("/admin/umkm");
  revalidatePath("/peta-desa");
  return { success: true };
}

export async function deleteUmkm(id: string) {
  await requireSession();
  await prisma.umkm.delete({ where: { id } });
  revalidatePath("/admin/umkm");
  revalidatePath("/peta-desa");
}
