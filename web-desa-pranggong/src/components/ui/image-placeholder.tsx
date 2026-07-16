export default function ImagePlaceholder({
  label,
  aspect = "aspect-[4/3]",
}: {
  label: string;
  aspect?: string;
}) {
  return (
    <div
      className={`flex ${aspect} flex-col items-center justify-center gap-2 border border-dashed border-moss-900/25 bg-paper-100 p-4 text-center`}
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        aria-hidden="true"
        className="h-8 w-8 text-ink-900/25"
      >
        <rect x="3" y="4" width="18" height="16" rx="1.5" />
        <circle cx="8.5" cy="9.5" r="1.5" />
        <path d="m4 17 5-5 3 3 4-4 4 4" />
      </svg>
      <p className="text-xs text-ink-900/50">{label}</p>
    </div>
  );
}
