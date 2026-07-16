// Data pinpoint peta interaktif Desa Pranggong.
// Koordinat masih PLACEHOLDER (perkiraan area Kec. Andong, Kab. Boyolali) —
// ganti dengan hasil survey GPS/Google Maps sebelum rilis (lihat requirement.md § 8).

export type LocationCategory =
  | "pemerintahan"
  | "kesehatan"
  | "pendidikan"
  | "ibadah"
  | "umkm"
  | "program-kerja";

export type VillageLocation = {
  id: string;
  name: string;
  category: LocationCategory;
  description: string;
  contact?: string;
  hours?: string;
  href?: string;
  lat: number;
  lng: number;
};

export const categoryLabels: Record<LocationCategory, string> = {
  pemerintahan: "Kantor Desa",
  kesehatan: "Fasilitas Kesehatan",
  pendidikan: "Fasilitas Pendidikan",
  ibadah: "Tempat Ibadah",
  umkm: "UMKM / Produk Unggulan",
  "program-kerja": "Program Kerja KKN",
};

// Warna pinpoint per kategori — selaras dengan identitas visual "Bumi Pranggong".
export const categoryColors: Record<LocationCategory, string> = {
  pemerintahan: "#2f5233",
  kesehatan: "#b0473f",
  pendidikan: "#3f6b90",
  ibadah: "#a8763e",
  umkm: "#7a5ea8",
  "program-kerja": "#7c8f2c",
};

// Titik tengah peta — perkiraan area Kec. Andong, Kab. Boyolali (placeholder).
export const mapCenter: [number, number] = [-7.349300, 110.776708]; 

export const villageLocations: VillageLocation[] = [
  {
    id: "balai-desa",
    name: "Kantor Balai Desa Pranggong",
    category: "pemerintahan",
    description: "Pusat pemerintahan dan pelayanan administrasi Desa Pranggong.",
    contact: "0812-xxxx-xxxx",
    hours: "Senin–Jumat, 08.00–15.00 WIB",
    lat: -7.3611,
    lng: 110.7551,
  },
  {
    id: "posyandu",
    name: "Posyandu Desa Pranggong",
    category: "kesehatan",
    description: "Layanan kesehatan ibu, anak, dan lansia bagi warga desa.",
    contact: "0812-xxxx-xxxx",
    hours: "Setiap tanggal 10, 08.00–11.00 WIB",
    lat: -7.363,
    lng: 110.7572,
  },
  {
    id: "sd-pranggong",
    name: "SD Negeri Pranggong",
    category: "pendidikan",
    description: "Sekolah dasar negeri yang melayani anak-anak desa dan sekitarnya.",
    contact: "0812-xxxx-xxxx",
    hours: "Senin–Sabtu, 07.00–12.30 WIB",
    lat: -7.3592,
    lng: 110.7534,
  },
  {
    id: "masjid-desa",
    name: "Masjid Besar Pranggong",
    category: "ibadah",
    description: "Tempat ibadah utama warga muslim Desa Pranggong.",
    lat: -7.3605,
    lng: 110.7538,
  },
  {
    id: "rocket-stove",
    name: "Titik Demo Rocket Stove",
    category: "program-kerja",
    description:
      "Lokasi instalasi dan demo tungku Rocket Stove hasil program kerja KKN.",
    contact: "0812-xxxx-xxxx",
    href: "/program-kerja/rocket-stove",
    lat: -7.3648,
    lng: 110.7563,
  },
  // Catatan: titik UMKM TIDAK lagi di sini — sekarang dari database (model `Umkm`,
  // diinput admin lewat /admin/umkm) dan digabung ke array ini di src/app/(site)/peta-desa/page.tsx.
];
