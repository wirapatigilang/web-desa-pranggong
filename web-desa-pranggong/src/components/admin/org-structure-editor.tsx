"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { OrgRole } from "@/lib/village-profile";

export default function OrgStructureEditor({
  defaultValue,
}: {
  defaultValue: OrgRole[];
}) {
  const [rows, setRows] = useState<OrgRole[]>(
    defaultValue.length > 0 ? defaultValue : [{ role: "", name: "" }],
  );

  function updateRow(index: number, field: "role" | "name", value: string) {
    setRows((current) =>
      current.map((row, i) => (i === index ? { ...row, [field]: value } : row)),
    );
  }

  function addRow() {
    setRows((current) => [...current, { role: "", name: "" }]);
  }

  function removeRow(index: number) {
    setRows((current) => current.filter((_, i) => i !== index));
  }

  return (
    <div className="space-y-3">
      <Label>Struktur Organisasi</Label>
      <input type="hidden" name="orgStructure" value={JSON.stringify(rows)} />

      <div className="space-y-2">
        {rows.map((row, index) => (
          <div key={index} className="flex items-end gap-2">
            <div className="flex-1 space-y-1">
              {index === 0 && (
                <Label className="text-xs text-muted-foreground">Jabatan</Label>
              )}
              <Input
                value={row.role}
                onChange={(event) => updateRow(index, "role", event.target.value)}
                placeholder="mis. Kepala Desa"
              />
            </div>
            <div className="flex-1 space-y-1">
              {index === 0 && (
                <Label className="text-xs text-muted-foreground">Nama Pejabat</Label>
              )}
              <Input
                value={row.name}
                onChange={(event) => updateRow(index, "name", event.target.value)}
                placeholder="Kosongkan jika belum ada nama"
              />
            </div>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="text-destructive"
              onClick={() => removeRow(index)}
              disabled={rows.length === 1}
            >
              Hapus
            </Button>
          </div>
        ))}
      </div>

      <Button type="button" variant="outline" size="sm" onClick={addRow}>
        + Tambah Jabatan
      </Button>
    </div>
  );
}
