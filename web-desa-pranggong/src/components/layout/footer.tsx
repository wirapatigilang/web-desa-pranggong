import Link from "next/link";
import { contactInfo, navLinks, siteConfig } from "@/lib/site-config";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-black/5 bg-paper-100 text-ink-900">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-moss-600 text-xs font-semibold text-paper-50">
              DP
            </span>
            <h2 className="font-display text-lg font-semibold">{siteConfig.name}</h2>
          </div>
          <p className="mt-3 max-w-xs text-sm text-ink-900/60">
            Membangun kemandirian desa melalui transparansi informasi dan
            layanan publik yang prima.
          </p>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-moss-600">Navigasi</h3>
          <ul className="mt-3 space-y-2 text-sm">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-ink-900/70 hover:text-ink-900"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-moss-600">Kontak Kami</h3>
          <ul className="mt-3 space-y-2 text-sm text-ink-900/70">
            <li>{contactInfo.address}</li>
            <li>Telp/WA: {contactInfo.phone}</li>
            <li>{contactInfo.email}</li>
            <li>{contactInfo.officeHours}</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-black/5 px-4 py-4 text-center text-xs text-ink-900/50 sm:px-6">
        © {year} {siteConfig.fullName}. Website resmi, dikembangkan bersama
        Tim KKN.
      </div>
    </footer>
  );
}
