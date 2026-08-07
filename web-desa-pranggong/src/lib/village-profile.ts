import { prisma } from "@/lib/prisma";

export type OrgRole = {
  role: string;
  name: string;
};

export type VillageProfileData = {
  history: string;
  vision: string;
  missions: string[];
  orgStructure: OrgRole[];
  area: string;
  population: string;
  households: string;
  hamlets: string;
  boundaryNorth: string;
  boundarySouth: string;
  boundaryEast: string;
  boundaryWest: string;
};

// Dipakai kalau row "singleton" belum ada di database (mis. belum sempat `prisma db seed`).
const FALLBACK: VillageProfileData = {
  history:
    "Tradisi desa akan dilengkapi oleh perangkat desa lewat dashboard admin.",
  vision: "Visi desa akan dilengkapi oleh perangkat desa lewat dashboard admin.",
  missions: ["Poin-poin misi akan diisi lewat dashboard admin."],
  orgStructure: [],
  area: "— (data belum diperbarui)",
  population: "— (data belum diperbarui)",
  households: "— (data belum diperbarui)",
  hamlets: "— (data belum diperbarui)",
  boundaryNorth: "— (data belum diperbarui)",
  boundarySouth: "— (data belum diperbarui)",
  boundaryEast: "— (data belum diperbarui)",
  boundaryWest: "— (data belum diperbarui)",
};

function parseOrgStructure(json: string): OrgRole[] {
  try {
    const parsed = JSON.parse(json);
    if (Array.isArray(parsed)) {
      return parsed.filter(
        (item): item is OrgRole =>
          typeof item?.role === "string" && typeof item?.name === "string",
      );
    }
  } catch {
    // biarkan fallback array kosong di bawah
  }
  return [];
}

export async function getVillageProfile(): Promise<VillageProfileData> {
  const row = await prisma.villageProfile.findUnique({
    where: { id: "singleton" },
  });

  if (!row) return FALLBACK;

  return {
    history: row.history,
    vision: row.vision,
    missions: row.missions
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean),
    orgStructure: parseOrgStructure(row.orgStructure),
    area: row.area,
    population: row.population,
    households: row.households,
    hamlets: row.hamlets,
    boundaryNorth: row.boundaryNorth,
    boundarySouth: row.boundarySouth,
    boundaryEast: row.boundaryEast,
    boundaryWest: row.boundaryWest,
  };
}
