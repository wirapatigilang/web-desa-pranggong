"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireSession } from "@/lib/actions/require-session";

export type ProfileFormState = { error?: string; success?: boolean };

export async function updateVillageProfile(
  _prevState: ProfileFormState,
  formData: FormData,
): Promise<ProfileFormState> {
  await requireSession();

  const history = String(formData.get("history") ?? "").trim();
  const vision = String(formData.get("vision") ?? "").trim();
  const missions = String(formData.get("missions") ?? "").trim();
  const area = String(formData.get("area") ?? "").trim();
  const population = String(formData.get("population") ?? "").trim();
  const households = String(formData.get("households") ?? "").trim();
  const hamlets = String(formData.get("hamlets") ?? "").trim();
  const boundaryNorth = String(formData.get("boundaryNorth") ?? "").trim();
  const boundarySouth = String(formData.get("boundarySouth") ?? "").trim();
  const boundaryEast = String(formData.get("boundaryEast") ?? "").trim();
  const boundaryWest = String(formData.get("boundaryWest") ?? "").trim();
  const orgStructureRaw = String(formData.get("orgStructure") ?? "[]");

  if (!history || !vision || !missions) {
    return { error: "Sejarah, visi, dan misi wajib diisi." };
  }

  let orgStructure: { role: string; name: string }[];
  try {
    const parsed = JSON.parse(orgStructureRaw);
    if (!Array.isArray(parsed)) throw new Error("bukan array");
    orgStructure = parsed
      .map((item) => ({
        role: String(item?.role ?? "").trim(),
        name: String(item?.name ?? "").trim(),
      }))
      .filter((item) => item.role.length > 0);
  } catch {
    return { error: "Struktur organisasi tidak valid." };
  }

  await prisma.villageProfile.upsert({
    where: { id: "singleton" },
    update: {
      history,
      vision,
      missions,
      area,
      population,
      households,
      hamlets,
      boundaryNorth,
      boundarySouth,
      boundaryEast,
      boundaryWest,
      orgStructure: JSON.stringify(orgStructure),
    },
    create: {
      id: "singleton",
      history,
      vision,
      missions,
      area,
      population,
      households,
      hamlets,
      boundaryNorth,
      boundarySouth,
      boundaryEast,
      boundaryWest,
      orgStructure: JSON.stringify(orgStructure),
    },
  });

  revalidatePath("/admin/profil");
  revalidatePath("/profil-desa");
  return { success: true };
}
