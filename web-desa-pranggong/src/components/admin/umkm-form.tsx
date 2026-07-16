"use client";

import { useActionState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { UmkmFormState } from "@/lib/actions/umkm";
import type { Umkm } from "@/generated/prisma/client";

export default function UmkmForm({
  action,
  defaultValues,
  submitLabel,
}: {
  action: (state: UmkmFormState, formData: FormData) => Promise<UmkmFormState>;
  defaultValues?: Pick<
    Umkm,
    "name" | "description" | "contact" | "lat" | "lng"
  >;
  submitLabel: string;
}) {
  const [state, formAction, pending] = useActionState(action, {});

  return (
    <form action={formAction} className="max-w-xl space-y-5">
      <div className="space-y-2">
        <Label htmlFor="name">Nama Usaha</Label>
        <Input
          id="name"
          name="name"
          required
          defaultValue={defaultValues?.name}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Deskripsi / Produk Unggulan</Label>
        <Textarea
          id="description"
          name="description"
          rows={4}
          required
          defaultValue={defaultValues?.description}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="contact">Kontak (opsional)</Label>
        <Input
          id="contact"
          name="contact"
          defaultValue={defaultValues?.contact ?? ""}
          placeholder="0812-xxxx-xxxx"
        />
      </div>

      <div className="space-y-2">
        <Label>Titik Lokasi di Peta (opsional)</Label>
        <p className="text-xs text-muted-foreground">
          Kosongkan kalau belum tahu koordinat GPS-nya — UMKM tetap tampil di
          daftar Potensi Desa, hanya tidak muncul sebagai pinpoint di peta.
        </p>
        <div className="grid grid-cols-2 gap-3">
          <Input
            name="lat"
            type="text"
            inputMode="decimal"
            placeholder="Latitude, mis. -7.3611"
            defaultValue={defaultValues?.lat ?? ""}
          />
          <Input
            name="lng"
            type="text"
            inputMode="decimal"
            placeholder="Longitude, mis. 110.7551"
            defaultValue={defaultValues?.lng ?? ""}
          />
        </div>
      </div>

      {state.error && <p className="text-sm text-destructive">{state.error}</p>}

      <div className="flex gap-3">
        <Button type="submit" disabled={pending}>
          {pending ? "Menyimpan…" : submitLabel}
        </Button>
        <Button type="button" variant="outline" asChild>
          <Link href="/admin/umkm">Batal</Link>
        </Button>
      </div>
    </form>
  );
}
