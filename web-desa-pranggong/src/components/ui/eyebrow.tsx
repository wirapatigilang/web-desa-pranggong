export default function Eyebrow({
  children,
  onDark = false,
}: {
  children: React.ReactNode;
  onDark?: boolean;
}) {
  return (
    <div className="flex items-center gap-2">
      <span className={`h-px w-6 ${onDark ? "bg-gold-300" : "bg-gold-600"}`} />
      <p
        className={`text-xs font-semibold uppercase tracking-[0.2em] ${
          onDark ? "text-gold-300" : "text-gold-600"
        }`}
      >
        {children}
      </p>
    </div>
  );
}
