"use client";

import { useActionState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import ImageUploadField from "@/components/admin/image-upload-field";
import type { KknReportFormState } from "@/lib/actions/kkn-reports";
import type { KknReport } from "@/generated/prisma/client";

export default function KknReportForm({
  action,
  defaultValues,
  submitLabel,
}: {
  action: (
    state: KknReportFormState,
    formData: FormData,
  ) => Promise<KknReportFormState>;
  defaultValues?: Pick<KknReport, "id" | "title" | "description">;
  submitLabel: string;
}) {
  const router = useRouter();
  const [state, formAction, pending] = useActionState(action, {});

  useEffect(() => {
    if (state.success) {
      toast.success("Perubahan berhasil disimpan.");
      router.push("/admin/laporan-kkn");
    } else if (state.error) {
      toast.error(state.error);
    }
  }, [state, router]);

  return (
    <form action={formAction} className="max-w-xl space-y-5">
      <div className="space-y-2">
        <Label htmlFor="title">Judul</Label>
        <Input
          id="title"
          name="title"
          required
          defaultValue={defaultValues?.title}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Deskripsi</Label>
        <Textarea
          id="description"
          name="description"
          required
          rows={6}
          defaultValue={defaultValues?.description}
        />
      </div>

      <ImageUploadField
        id="image"
        name="image"
        label="Gambar"
        required
        defaultImageUrl={
          defaultValues?.id
            ? `/api/laporan-kkn/${defaultValues.id}/image`
            : undefined
        }
        defaultImageAlt={defaultValues?.title}
        helperText={
          defaultValues
            ? "Klik atau seret gambar baru untuk mengganti. Biarkan seperti ini untuk tetap memakai gambar saat ini. Format JPEG/PNG/WebP, maksimal 5MB."
            : "Format JPEG, PNG, atau WebP, maksimal 5MB."
        }
      />

      {state.error && <p className="text-sm text-destructive">{state.error}</p>}

      <div className="flex gap-3">
        <Button type="submit" disabled={pending}>
          {pending ? "Menyimpan…" : submitLabel}
        </Button>
        <Button type="button" variant="outline" asChild>
          <Link href="/admin/laporan-kkn">Batal</Link>
        </Button>
      </div>
    </form>
  );
}
