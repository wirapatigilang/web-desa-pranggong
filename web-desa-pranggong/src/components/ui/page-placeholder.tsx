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
      <h1 className="text-3xl font-bold text-emerald-900">{title}</h1>
      <p className="mt-3 max-w-2xl text-emerald-950/70">{description}</p>
      <div className="mt-8 rounded-xl border border-dashed border-emerald-900/20 bg-emerald-50 p-6 text-sm text-emerald-900/70">
        {note ?? "Halaman ini masih dalam pengembangan dan akan dilengkapi pada tahap berikutnya."}
      </div>
    </div>
  );
}
