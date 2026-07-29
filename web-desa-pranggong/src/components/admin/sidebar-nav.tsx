"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { label: "Dashboard", href: "/admin" },
  { label: "Berita & Pengumuman", href: "/admin/posts" },
  { label: "Profil Desa", href: "/admin/profil" },
  { label: "UMKM", href: "/admin/umkm" },
  { label: "Regulasi Desa", href: "/admin/landasan-hukum" },
];

export default function SidebarNav() {
  const pathname = usePathname();

  return (
    <nav className="mt-6 space-y-1 text-sm">
      {navItems.map((item) => {
        const active =
          item.href === "/admin"
            ? pathname === "/admin"
            : pathname.startsWith(item.href);
        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={active ? "page" : undefined}
            className={`block rounded-md px-3 py-2 transition-colors ${
              active
                ? "bg-primary text-primary-foreground"
                : "hover:bg-accent hover:text-accent-foreground"
            }`}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
