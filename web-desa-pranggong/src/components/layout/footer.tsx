import Link from "next/link";
import { contactInfo, navLinks, siteConfig } from "@/lib/site-config";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 bg-moss-900 text-paper-50">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:px-6 md:grid-cols-3">
        <div>
          <h2 className="font-display text-lg font-semibold">{siteConfig.name}</h2>
          <p className="mt-2 text-sm text-paper-50/70">
            Kecamatan {siteConfig.kecamatan}, Kabupaten {siteConfig.kabupaten},{" "}
            {siteConfig.provinsi}
          </p>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-gold-300">
            Navigasi
          </h3>
          <ul className="mt-3 space-y-2 text-sm">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-paper-50/80 hover:text-paper-50">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-gold-300">
            Kontak
          </h3>
          <ul className="mt-3 space-y-2 text-sm text-paper-50/80">
            <li>{contactInfo.address}</li>
            <li>Telp/WA: {contactInfo.phone}</li>
            <li>{contactInfo.email}</li>
            <li>{contactInfo.officeHours}</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10 px-4 py-4 text-center text-xs text-paper-50/50 sm:px-6">
        © {year} {siteConfig.fullName}. Website resmi, dikembangkan bersama
        Tim KKN.
      </div>
    </footer>
  );
}
