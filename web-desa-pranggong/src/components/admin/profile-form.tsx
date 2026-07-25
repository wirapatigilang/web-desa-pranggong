"use client";

import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import OrgStructureEditor from "@/components/admin/org-structure-editor";
import {
  updateVillageProfile,
  type ProfileFormState,
} from "@/lib/actions/profile";
import type { VillageProfileData } from "@/lib/village-profile";

export default function ProfileForm({
  defaultValues,
}: {
  defaultValues: VillageProfileData;
}) {
  const router = useRouter();
  const [state, formAction, pending] = useActionState<
    ProfileFormState,
    FormData
  >(updateVillageProfile, {});

  useEffect(() => {
    if (state.success) {
      toast.success("Perubahan berhasil disimpan.");
      router.refresh();
    } else if (state.error) {
      toast.error(state.error);
    }
  }, [state, router]);

  return (
    <form action={formAction} className="max-w-3xl space-y-8">
      <div className="space-y-4">
        <h2 className="font-semibold">Sejarah &amp; Visi Misi</h2>
        <div className="space-y-2">
          <Label htmlFor="history">Sejarah Desa</Label>
          <Textarea
            id="history"
            name="history"
            rows={5}
            required
            defaultValue={defaultValues.history}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="vision">Visi</Label>
          <Textarea
            id="vision"
            name="vision"
            rows={3}
            required
            defaultValue={defaultValues.vision}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="missions">Misi</Label>
          <p className="text-xs text-muted-foreground">
            Satu poin misi per baris.
          </p>
          <Textarea
            id="missions"
            name="missions"
            rows={5}
            required
            defaultValue={defaultValues.missions.join("\n")}
          />
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="font-semibold">Data Geografis &amp; Demografis</h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="area">Luas Wilayah</Label>
            <Input id="area" name="area" defaultValue={defaultValues.area} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="population">Jumlah Penduduk</Label>
            <Input
              id="population"
              name="population"
              defaultValue={defaultValues.population}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="households">Jumlah Kepala Keluarga</Label>
            <Input
              id="households"
              name="households"
              defaultValue={defaultValues.households}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="hamlets">Jumlah Dusun</Label>
            <Input
              id="hamlets"
              name="hamlets"
              defaultValue={defaultValues.hamlets}
            />
          </div>
        </div>

        <p className="text-sm font-medium">Batas Wilayah</p>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="boundaryNorth">Utara</Label>
            <Input
              id="boundaryNorth"
              name="boundaryNorth"
              defaultValue={defaultValues.boundaryNorth}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="boundarySouth">Selatan</Label>
            <Input
              id="boundarySouth"
              name="boundarySouth"
              defaultValue={defaultValues.boundarySouth}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="boundaryEast">Timur</Label>
            <Input
              id="boundaryEast"
              name="boundaryEast"
              defaultValue={defaultValues.boundaryEast}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="boundaryWest">Barat</Label>
            <Input
              id="boundaryWest"
              name="boundaryWest"
              defaultValue={defaultValues.boundaryWest}
            />
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="font-semibold">Pemerintahan Desa</h2>
        <p className="text-xs text-muted-foreground">
          Ubah nama di sini setiap kali ada pergantian perangkat desa.
        </p>
        <OrgStructureEditor defaultValue={defaultValues.orgStructure} />
      </div>

      {state.error && <p className="text-sm text-destructive">{state.error}</p>}

      <Button type="submit" disabled={pending}>
        {pending ? "Menyimpan…" : "Simpan Perubahan"}
      </Button>
    </form>
  );
}
