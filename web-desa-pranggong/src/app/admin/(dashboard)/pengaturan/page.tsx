import AccountSettingsForm from "@/components/admin/account-settings-form";
import { requireSession } from "@/lib/actions/require-session";

export default async function AdminPengaturanPage() {
  const session = await requireSession();

  return (
    <div>
      <h1 className="text-2xl font-semibold">Pengaturan Akun</h1>
      <p className="text-sm text-muted-foreground">
        Ubah email atau password yang dipakai untuk login ke dashboard admin.
      </p>
      <div className="mt-6">
        <AccountSettingsForm currentEmail={session.user.email} />
      </div>
    </div>
  );
}
