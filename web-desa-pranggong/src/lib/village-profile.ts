// Data profil Desa Pranggong.
// SEMUA isi di bawah masih PLACEHOLDER — belum data resmi dari perangkat desa.
// Jangan ganti placeholder dengan angka/nama karangan; tunggu data resmi lalu isi di sini.

export const history = {
  paragraphs: [
    "Sejarah lengkap Desa Pranggong — asal-usul nama, tokoh pendiri, dan perkembangan wilayah dari masa ke masa — akan dilengkapi bersama perangkat desa dan sesepuh setempat.",
  ],
};

export const visionMission = {
  vision:
    "Visi resmi Desa Pranggong untuk periode kepemimpinan saat ini akan dilengkapi oleh perangkat desa.",
  missions: [
    "Poin-poin misi akan diisi sesuai dokumen RPJM Desa yang berlaku.",
  ],
};

export type OrgRole = {
  role: string;
  name?: string;
};

// Struktur umum pemerintahan desa (mengikuti Permendagri) — nama pejabat menyusul dari perangkat desa.
export const orgStructure: OrgRole[] = [
  { role: "Kepala Desa" },
  { role: "Sekretaris Desa" },
  { role: "Kepala Urusan Keuangan" },
  { role: "Kepala Urusan Umum & Perencanaan" },
  { role: "Kepala Seksi Pemerintahan" },
  { role: "Kepala Seksi Kesejahteraan" },
  { role: "Kepala Seksi Pelayanan" },
  { role: "Kepala Dusun" },
];

export const demographics = {
  area: "— (data belum diperbarui)",
  population: "— (data belum diperbarui)",
  households: "— (data belum diperbarui)",
  hamlets: "— (data belum diperbarui)",
  boundaries: {
    north: "— (data belum diperbarui)",
    south: "— (data belum diperbarui)",
    east: "— (data belum diperbarui)",
    west: "— (data belum diperbarui)",
  },
};
