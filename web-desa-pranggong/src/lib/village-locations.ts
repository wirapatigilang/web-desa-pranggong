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
    lat: -7.349158,
    lng: 110.778566,
  },
  {
    id: "sd-pranggong",
    name: "SD Negeri Pranggong",
    category: "pendidikan",
    description: "Sekolah dasar negeri yang melayani anak-anak desa dan sekitarnya.",
    contact: "-",
    hours: "Senin–Sabtu, 07.00–12.30 WIB",
    lat: -7.3592,
    lng: 110.7534,
  },
    {
    id: "sd-tempuran",
    name: "SD Negeri Tempuran",
    category: "pendidikan",
    description: "Sekolah dasar negeri yang melayani anak-anak desa dan sekitarnya.",
    contact: "-",
    hours: "Senin–Sabtu, 07.00–12.30 WIB",
    lat: -7.3592,
    lng: 110.7534,
  },

  {
    id: "rocket-stove",
    name: "Titik Rocket Stove Dukuh Gemulung",
    category: "program-kerja",
    description:
      "Lokasi instalasi dan demo tungku Rocket Stove hasil program kerja KKN.",
    contact: "0812-xxxx-xxxx",
    href: "/program-kerja/rocket-stove",
    lat: -7.347335,
    lng: 110.779500,
  },
];
