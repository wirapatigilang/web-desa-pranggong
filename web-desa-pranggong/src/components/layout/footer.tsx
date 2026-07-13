import Link from "next/link";
import { contactInfo, navLinks, siteConfig } from "@/lib/site-config";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-emerald-900/10 bg-emerald-950 text-emerald-50">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:px-6 md:grid-cols-3">
        <div>
          <h2 className="text-lg font-semibold">{siteConfig.name}</h2>
          <p className="mt-2 text-sm text-emerald-200">
            Kecamatan {siteConfig.kecamatan}, Kabupaten {siteConfig.kabupaten},{" "}
            {siteConfig.provinsi}
          </p>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-emerald-300">
            Navigasi
          </h3>
          <ul className="mt-3 space-y-2 text-sm">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-emerald-100 hover:text-white">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-emerald-300">
            Kontak
          </h3>
          <ul className="mt-3 space-y-2 text-sm text-emerald-100">
            <li>{contactInfo.address}</li>
            <li>Telp/WA: {contactInfo.phone}</li>
            <li>{contactInfo.email}</li>
            <li>{contactInfo.officeHours}</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10 px-4 py-4 text-center text-xs text-emerald-300 sm:px-6">
        © {year} {siteConfig.fullName}. Dibuat dalam rangka program KKN.
      </div>
    </footer>
  );
}
