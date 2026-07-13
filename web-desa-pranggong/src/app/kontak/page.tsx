import type { Metadata } from "next";
import { contactInfo, siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Kontak",
};

export default function KontakPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <h1 className="text-3xl font-bold text-emerald-900">Kontak</h1>
      <p className="mt-3 max-w-2xl text-emerald-950/70">
        Hubungi kantor {siteConfig.name} melalui informasi berikut.
      </p>

      <dl className="mt-8 grid gap-6 sm:grid-cols-2">
        <div className="rounded-xl border border-emerald-900/10 p-6">
          <dt className="text-sm font-semibold uppercase tracking-wide text-emerald-700">
            Alamat
          </dt>
          <dd className="mt-2 text-emerald-950/80">{contactInfo.address}</dd>
        </div>
        <div className="rounded-xl border border-emerald-900/10 p-6">
          <dt className="text-sm font-semibold uppercase tracking-wide text-emerald-700">
            Telepon / WhatsApp
          </dt>
          <dd className="mt-2 text-emerald-950/80">{contactInfo.phone}</dd>
        </div>
        <div className="rounded-xl border border-emerald-900/10 p-6">
          <dt className="text-sm font-semibold uppercase tracking-wide text-emerald-700">
            Email
          </dt>
          <dd className="mt-2 text-emerald-950/80">{contactInfo.email}</dd>
        </div>
        <div className="rounded-xl border border-emerald-900/10 p-6">
          <dt className="text-sm font-semibold uppercase tracking-wide text-emerald-700">
            Jam Layanan
          </dt>
          <dd className="mt-2 text-emerald-950/80">
            {contactInfo.officeHours}
          </dd>
        </div>
      </dl>
    </div>
  );
}
