import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { prisma } from "@/lib/prisma";
import { getVillageProfile } from "@/lib/village-profile";

const PLACEHOLDER_MARKER = "belum diperbarui";

type ActivityItem = {
  id: string;
  label: string;
  type: "Berita" | "Pengumuman" | "UMKM";
  updatedAt: Date;
  editHref: string;
};

export default async function AdminDashboardPage() {
  const [beritaCount, pengumumanCount, umkmCount, recentPosts, recentUmkm, profile] =
    await Promise.all([
      prisma.post.count({ where: { type: "berita" } }),
      prisma.post.count({ where: { type: "pengumuman" } }),
      prisma.umkm.count(),
      prisma.post.findMany({
        orderBy: { updatedAt: "desc" },
        take: 5,
      }),
      prisma.umkm.findMany({
        orderBy: { updatedAt: "desc" },
        take: 5,
      }),
      getVillageProfile(),
    ]);

  const demographicFields = [
    profile.area,
    profile.population,
    profile.households,
    profile.hamlets,
    profile.boundaryNorth,
    profile.boundarySouth,
    profile.boundaryEast,
    profile.boundaryWest,
  ];
  const demographicsComplete = demographicFields.every(
    (value) => !value.toLowerCase().includes(PLACEHOLDER_MARKER),
  );
  const orgStructureComplete =
    profile.orgStructure.length > 0 &&
    profile.orgStructure.every((entry) => entry.name.trim().length > 0);

  const stats = [
    { label: "Berita", value: beritaCount, href: "/admin/posts" },
    { label: "Pengumuman", value: pengumumanCount, href: "/admin/posts" },
    { label: "UMKM Terdaftar", value: umkmCount, href: "/admin/umkm" },
    {
      label: "Data Wilayah",
      value: demographicsComplete ? "Lengkap" : "Belum lengkap",
      href: "/admin/profil",
    },
  ];

  const checklist = [
    {
      done: demographicsComplete,
      label: "Data geografis & demografis (luas, penduduk, KK, dusun, batas wilayah)",
      href: "/admin/profil",
    },
    {
      done: orgStructureComplete,
      label: "Nama pejabat di struktur organisasi",
      href: "/admin/profil",
    },
    {
      done: umkmCount > 0,
      label: "Data UMKM warga",
      href: "/admin/umkm",
    },
    {
      done: beritaCount > 0,
      label: "Minimal satu berita",
      href: "/admin/posts/new",
    },
    {
      done: pengumumanCount > 0,
      label: "Minimal satu pengumuman",
      href: "/admin/posts/new",
    },
  ];
  const pendingChecklist = checklist.filter((item) => !item.done);

  const activity: ActivityItem[] = [
    ...recentPosts.map((post) => ({
      id: post.id,
      label: post.title,
      type: post.type === "berita" ? ("Berita" as const) : ("Pengumuman" as const),
      updatedAt: post.updatedAt,
      editHref: `/admin/posts/${post.id}/edit`,
    })),
    ...recentUmkm.map((item) => ({
      id: item.id,
      label: item.name,
      type: "UMKM" as const,
      updatedAt: item.updatedAt,
      editHref: `/admin/umkm/${item.id}/edit`,
    })),
  ]
    .sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime())
    .slice(0, 5);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold">Dashboard</h1>
        <p className="text-sm text-muted-foreground">
          Ringkasan konten website Desa Pranggong.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Link key={stat.label} href={stat.href}>
            <Card className="transition-colors hover:border-primary/40">
              <CardHeader>
                <CardTitle className="text-sm font-normal text-muted-foreground">
                  {stat.label}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-semibold">{stat.value}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      <div>
        <h2 className="text-sm font-semibold text-muted-foreground">
          Aksi Cepat
        </h2>
        <div className="mt-3 flex flex-wrap gap-3">
          <Button asChild>
            <Link href="/admin/posts/new">+ Berita / Pengumuman</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/admin/umkm/new">+ UMKM</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/admin/profil">Edit Profil Desa</Link>
          </Button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Kelengkapan Data</CardTitle>
          </CardHeader>
          <CardContent>
            {pendingChecklist.length === 0 ? (
              <p className="text-sm text-muted-foreground">
                Semua data dasar sudah terisi.
              </p>
            ) : (
              <ul className="space-y-3">
                {pendingChecklist.map((item) => (
                  <li key={item.label} className="flex items-start gap-2 text-sm">
                    <span
                      aria-hidden="true"
                      className="mt-1 h-2 w-2 shrink-0 rounded-full bg-amber-500"
                    />
                    <Link href={item.href} className="hover:underline">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Aktivitas Terbaru</CardTitle>
          </CardHeader>
          <CardContent>
            {activity.length === 0 ? (
              <p className="text-sm text-muted-foreground">
                Belum ada aktivitas.
              </p>
            ) : (
              <ul className="space-y-3">
                {activity.map((item) => (
                  <li key={`${item.type}-${item.id}`}>
                    <Link
                      href={item.editHref}
                      className="flex items-center justify-between gap-3 text-sm hover:underline"
                    >
                      <span className="truncate">{item.label}</span>
                      <Badge variant="secondary" className="shrink-0">
                        {item.type}
                      </Badge>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
