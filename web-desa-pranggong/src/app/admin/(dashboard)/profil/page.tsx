import ProfileForm from "@/components/admin/profile-form";
import { getVillageProfile } from "@/lib/village-profile";

export default async function AdminProfilePage() {
  const profile = await getVillageProfile();

  return (
    <div>
      <h1 className="text-2xl font-semibold">Profil Desa</h1>
      <p className="text-sm text-muted-foreground">
        Konten ini tampil di halaman publik{" "}
        <span className="font-medium">/profil-desa</span>.
      </p>
      <div className="mt-6">
        <ProfileForm defaultValues={profile} />
      </div>
    </div>
  );
}
