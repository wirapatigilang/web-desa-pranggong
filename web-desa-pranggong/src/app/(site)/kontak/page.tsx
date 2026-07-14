import type { Metadata } from "next";
import Eyebrow from "@/components/ui/eyebrow";
import { contactInfo, siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Kontak",
};

export default function KontakPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <Eyebrow>Layanan Publik</Eyebrow>
      <h1 className="mt-3 font-display text-3xl font-semibold text-ink-900">
        Kontak
      </h1>
      <p className="mt-3 max-w-2xl text-ink-900/70">
        Hubungi kantor {siteConfig.name} melalui informasi berikut.
      </p>

      <dl className="mt-8 grid gap-6 sm:grid-cols-2">
        <div className="border border-moss-900/10 p-6">
          <dt className="text-sm font-semibold uppercase tracking-wide text-gold-600">
            Alamat
          </dt>
          <dd className="mt-2 text-ink-900/80">{contactInfo.address}</dd>
        </div>
        <div className="border border-moss-900/10 p-6">
          <dt className="text-sm font-semibold uppercase tracking-wide text-gold-600">
            Telepon / WhatsApp
          </dt>
          <dd className="mt-2 text-ink-900/80">{contactInfo.phone}</dd>
        </div>
        <div className="border border-moss-900/10 p-6">
          <dt className="text-sm font-semibold uppercase tracking-wide text-gold-600">
            Email
          </dt>
          <dd className="mt-2 text-ink-900/80">{contactInfo.email}</dd>
        </div>
        <div className="border border-moss-900/10 p-6">
          <dt className="text-sm font-semibold uppercase tracking-wide text-gold-600">
            Jam Layanan
          </dt>
          <dd className="mt-2 text-ink-900/80">
            {contactInfo.officeHours}
          </dd>
        </div>
      </dl>
    </div>
  );
}
