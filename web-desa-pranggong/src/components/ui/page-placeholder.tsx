export default function PagePlaceholder({
  title,
  description,
  note,
}: {
  title: string;
  description: string;
  note?: string;
}) {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <h1 className="font-display text-3xl font-semibold text-ink-900">{title}</h1>
      <p className="mt-3 max-w-2xl text-ink-900/70">{description}</p>
      <div className="mt-8 border border-dashed border-moss-900/20 bg-paper-100 p-6 text-sm text-ink-900/70">
        {note ?? "Halaman ini masih dalam pengembangan dan akan dilengkapi pada tahap berikutnya."}
      </div>
    </div>
  );
}
