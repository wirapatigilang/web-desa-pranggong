"use client";

import { useActionState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { LegalBasisFormState } from "@/lib/actions/legal-basis";
import type { LegalBasis } from "@/generated/prisma/client";

export default function LegalBasisForm({
  action,
  defaultValues,
  submitLabel,
}: {
  action: (
    state: LegalBasisFormState,
    formData: FormData,
  ) => Promise<LegalBasisFormState>;
  defaultValues?: Pick<
    LegalBasis,
    "number" | "title" | "year" | "fileName"
  >;
  submitLabel: string;
}) {
  const router = useRouter();
  const [state, formAction, pending] = useActionState(action, {});

  useEffect(() => {
    if (state.success) {
      toast.success("Perubahan berhasil disimpan.");
      router.push("/admin/landasan-hukum");
    } else if (state.error) {
      toast.error(state.error);
    }
  }, [state, router]);

  return (
    <form action={formAction} className="max-w-xl space-y-5">
      <div className="space-y-2">
        <Label htmlFor="number">Nomor</Label>
        <Input
          id="number"
          name="number"
          required
          placeholder="mis. 03 Tahun 2023"
          defaultValue={defaultValues?.number}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="title">Tentang</Label>
        <Input
          id="title"
          name="title"
          required
          placeholder="mis. Anggaran Pendapatan dan Belanja Desa"
          defaultValue={defaultValues?.title}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="year">Tahun</Label>
        <Input
          id="year"
          name="year"
          required
          inputMode="numeric"
          placeholder="mis. 2023"
          defaultValue={defaultValues?.year}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="file">File PDF (opsional)</Label>
        {defaultValues?.fileName && (
          <p className="text-xs text-muted-foreground">
            File saat ini: {defaultValues.fileName}. Unggah file baru untuk
            menggantinya, atau biarkan kosong untuk tetap memakai file lama.
          </p>
        )}
        <Input id="file" name="file" type="file" accept="application/pdf" />
        <p className="text-xs text-muted-foreground">
          Format PDF, maksimal 10MB.
        </p>
      </div>

      {state.error && <p className="text-sm text-destructive">{state.error}</p>}

      <div className="flex gap-3">
        <Button type="submit" disabled={pending}>
          {pending ? "Menyimpan…" : submitLabel}
        </Button>
        <Button type="button" variant="outline" asChild>
          <Link href="/admin/landasan-hukum">Batal</Link>
        </Button>
      </div>
    </form>
  );
}
