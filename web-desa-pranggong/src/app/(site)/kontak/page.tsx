import type { Metadata } from "next";
import Eyebrow from "@/components/ui/eyebrow";
import Reveal, { RevealGroup, RevealItem } from "@/components/motion/reveal";
import { contactInfo, siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Kontak",
};

const items = [
  { label: "Alamat", value: contactInfo.address },
  { label: "Telepon / WhatsApp", value: contactInfo.phone },
  { label: "Email", value: contactInfo.email },
  { label: "Jam Layanan", value: contactInfo.officeHours },
];

export default function KontakPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <Reveal>
        <Eyebrow>Layanan Publik</Eyebrow>
        <h1 className="mt-3 font-display text-3xl font-semibold text-ink-900">
          Kontak
        </h1>
        <p className="mt-3 max-w-2xl text-ink-900/70">
          Hubungi kantor {siteConfig.name} melalui informasi berikut.
        </p>
      </Reveal>

      <RevealGroup>
        <dl className="mt-8 grid gap-6 sm:grid-cols-2">
          {items.map((item) => (
            <RevealItem key={item.label}>
              <div className="rounded-2xl border border-black/5 bg-paper-50 p-6 shadow-sm shadow-black/[0.02]">
                <dt className="text-sm font-semibold uppercase tracking-wide text-gold-600">
                  {item.label}
                </dt>
                <dd className="mt-2 text-ink-900/80">{item.value}</dd>
              </div>
            </RevealItem>
          ))}
        </dl>
      </RevealGroup>
    </div>
  );
}
