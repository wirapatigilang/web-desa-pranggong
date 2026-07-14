"use client";

import { useActionState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { PostFormState } from "@/lib/actions/posts";
import type { Post } from "@/generated/prisma/client";

export default function PostForm({
  action,
  defaultValues,
  submitLabel,
}: {
  action: (state: PostFormState, formData: FormData) => Promise<PostFormState>;
  defaultValues?: Pick<Post, "title" | "excerpt" | "content" | "type" | "pinned">;
  submitLabel: string;
}) {
  const [state, formAction, pending] = useActionState(action, {});

  return (
    <form action={formAction} className="space-y-5">
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
        <Label htmlFor="type">Kategori</Label>
        <Select name="type" defaultValue={defaultValues?.type ?? "berita"}>
          <SelectTrigger id="type" className="w-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="berita">Berita</SelectItem>
            <SelectItem value="pengumuman">Pengumuman</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="excerpt">Ringkasan singkat</Label>
        <Textarea
          id="excerpt"
          name="excerpt"
          required
          rows={2}
          defaultValue={defaultValues?.excerpt}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="content">Konten lengkap</Label>
        <Textarea
          id="content"
          name="content"
          required
          rows={10}
          defaultValue={defaultValues?.content}
        />
      </div>

      <div className="flex items-center gap-2">
        <Checkbox
          id="pinned"
          name="pinned"
          defaultChecked={defaultValues?.pinned}
        />
        <Label htmlFor="pinned" className="font-normal">
          Sematkan di atas (untuk pengumuman penting)
        </Label>
      </div>

      {state.error && <p className="text-sm text-destructive">{state.error}</p>}

      <div className="flex gap-3">
        <Button type="submit" disabled={pending}>
          {pending ? "Menyimpan…" : submitLabel}
        </Button>
        <Button type="button" variant="outline" asChild>
          <Link href="/admin">Batal</Link>
        </Button>
      </div>
    </form>
  );
}
