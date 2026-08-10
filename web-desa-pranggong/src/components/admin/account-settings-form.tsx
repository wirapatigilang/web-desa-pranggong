"use client";

import { useActionState, useEffect, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authClient } from "@/lib/auth-client";
import {
  updateAdminEmail,
  type AccountFormState,
} from "@/lib/actions/account";

export default function AccountSettingsForm({
  currentEmail,
}: {
  currentEmail: string;
}) {
  const router = useRouter();

  const [emailState, emailAction, emailPending] = useActionState<
    AccountFormState,
    FormData
  >(updateAdminEmail, {});

  useEffect(() => {
    if (emailState.success) {
      toast.success("Email berhasil diganti.");
      router.refresh();
    } else if (emailState.error) {
      toast.error(emailState.error);
    }
  }, [emailState, router]);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordPending, setPasswordPending] = useState(false);

  async function handlePasswordSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (newPassword.length < 8) {
      toast.error("Password baru minimal 8 karakter.");
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error("Konfirmasi password baru tidak cocok.");
      return;
    }

    setPasswordPending(true);
    const { error } = await authClient.changePassword({
      currentPassword,
      newPassword,
      revokeOtherSessions: true,
    });
    setPasswordPending(false);

    if (error) {
      toast.error(error.message ?? "Gagal mengganti password.");
      return;
    }

    toast.success("Password berhasil diganti.");
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  }

  return (
    <div className="max-w-lg space-y-10">
      <form action={emailAction} className="space-y-4">
        <h2 className="font-semibold">Ubah Email</h2>
        <p className="text-xs text-muted-foreground">
          Email ini dipakai untuk login ke dashboard admin.
        </p>
        <div className="space-y-2">
          <Label htmlFor="email">Email Login</Label>
          <Input
            id="email"
            name="email"
            type="email"
            required
            defaultValue={currentEmail}
          />
        </div>
        <Button type="submit" disabled={emailPending}>
          {emailPending ? "Menyimpan…" : "Simpan Email"}
        </Button>
      </form>

      <form
        onSubmit={handlePasswordSubmit}
        className="space-y-4 border-t pt-8"
      >
        <h2 className="font-semibold">Ubah Password</h2>
        <p className="text-xs text-muted-foreground">
          Sesi login di perangkat lain akan otomatis keluar setelah password
          diganti.
        </p>
        <div className="space-y-2">
          <Label htmlFor="currentPassword">Password Saat Ini</Label>
          <Input
            id="currentPassword"
            type="password"
            required
            autoComplete="current-password"
            value={currentPassword}
            onChange={(event) => setCurrentPassword(event.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="newPassword">Password Baru</Label>
          <Input
            id="newPassword"
            type="password"
            required
            minLength={8}
            autoComplete="new-password"
            value={newPassword}
            onChange={(event) => setNewPassword(event.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="confirmPassword">Konfirmasi Password Baru</Label>
          <Input
            id="confirmPassword"
            type="password"
            required
            autoComplete="new-password"
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
          />
        </div>
        <Button type="submit" disabled={passwordPending}>
          {passwordPending ? "Menyimpan…" : "Simpan Password"}
        </Button>
      </form>
    </div>
  );
}
