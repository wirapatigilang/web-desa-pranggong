"use client";

import { useRef, useState, type DragEvent, type KeyboardEvent } from "react";
import { ImageUp, X } from "lucide-react";
import { cn } from "@/lib/utils";

const DEFAULT_ACCEPT = "image/jpeg,image/png,image/webp";
const MAX_SIZE = 5 * 1024 * 1024;

function formatBytes(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

// Dropzone gambar dgn preview, drag & drop, dan info file — pakai <input type="file">
// tersembunyi (bukan hidden JSON) supaya tetap ikut FormData native saat submit.
export default function ImageUploadField({
  id,
  name,
  label,
  required = false,
  defaultImageUrl,
  defaultImageAlt = "",
  helperText = "Format JPEG, PNG, atau WebP, maksimal 5MB.",
  accept = DEFAULT_ACCEPT,
}: {
  id: string;
  name: string;
  label: string;
  required?: boolean;
  defaultImageUrl?: string;
  defaultImageAlt?: string;
  helperText?: string;
  accept?: string;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [fileInfo, setFileInfo] = useState<{ name: string; size: number } | null>(
    null,
  );
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const displayImage = preview ?? defaultImageUrl ?? null;
  const allowedTypes = accept.split(",");

  function applyFile(file: File | undefined) {
    if (!file) return;
    if (!allowedTypes.includes(file.type)) {
      setError("Format file tidak didukung.");
      return;
    }
    if (file.size > MAX_SIZE) {
      setError("Ukuran file maksimal 5MB.");
      return;
    }
    setError(null);
    if (preview) URL.revokeObjectURL(preview);
    setPreview(URL.createObjectURL(file));
    setFileInfo({ name: file.name, size: file.size });
  }

  function openPicker() {
    inputRef.current?.click();
  }

  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openPicker();
    }
  }

  function handleDragOver(event: DragEvent<HTMLDivElement>) {
    event.preventDefault();
    setIsDragging(true);
  }

  function handleDrop(event: DragEvent<HTMLDivElement>) {
    event.preventDefault();
    setIsDragging(false);
    const file = event.dataTransfer.files?.[0];
    if (file && inputRef.current) {
      inputRef.current.files = event.dataTransfer.files;
      applyFile(file);
    }
  }

  function handleClear(event: React.MouseEvent) {
    event.preventDefault();
    event.stopPropagation();
    if (preview) URL.revokeObjectURL(preview);
    setPreview(null);
    setFileInfo(null);
    setError(null);
    if (inputRef.current) inputRef.current.value = "";
  }

  return (
    <div className="space-y-2">
      <label htmlFor={id} className="text-sm leading-none font-medium">
        {label}
        {required && !defaultImageUrl && (
          <span className="ml-0.5 text-destructive">*</span>
        )}
      </label>

      <div
        role="button"
        tabIndex={0}
        onClick={openPicker}
        onKeyDown={handleKeyDown}
        onDragOver={handleDragOver}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        className={cn(
          "group relative flex aspect-video w-full cursor-pointer flex-col items-center justify-center overflow-hidden rounded-xl border-2 border-dashed transition-colors focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50",
          isDragging
            ? "border-primary bg-primary/5"
            : error
              ? "border-destructive/60 bg-destructive/5"
              : "border-input hover:border-primary/50 hover:bg-muted/40",
        )}
      >
        {displayImage ? (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={displayImage}
              alt={defaultImageAlt}
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-2 bg-gradient-to-t from-black/70 via-black/30 to-transparent px-3 py-2 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100">
              <span className="truncate">
                {fileInfo
                  ? `${fileInfo.name} · ${formatBytes(fileInfo.size)}`
                  : "Gambar saat ini"}
              </span>
              <span className="shrink-0 font-medium">Ganti gambar</span>
            </div>
            {preview && (
              <button
                type="button"
                onClick={handleClear}
                aria-label="Batalkan gambar baru"
                className="absolute top-2 right-2 flex size-6 items-center justify-center rounded-full bg-black/60 text-white transition-colors hover:bg-black/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                <X className="size-3.5" />
              </button>
            )}
          </>
        ) : (
          <div className="flex flex-col items-center gap-1.5 px-4 text-center">
            <ImageUp
              aria-hidden="true"
              className={cn(
                "size-7 transition-transform duration-200",
                isDragging ? "scale-110 text-primary" : "text-muted-foreground",
              )}
            />
            <p className="text-sm font-medium">
              {isDragging ? "Lepas untuk mengunggah" : "Klik atau seret gambar ke sini"}
            </p>
          </div>
        )}

        <input
          ref={inputRef}
          id={id}
          name={name}
          type="file"
          accept={accept}
          onChange={(event) => applyFile(event.target.files?.[0])}
          className="sr-only"
        />
      </div>

      {error ? (
        <p className="text-xs text-destructive">{error}</p>
      ) : (
        <p className="text-xs text-muted-foreground">{helperText}</p>
      )}
    </div>
  );
}
