import Link from "next/link";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import SignOutButton from "@/components/admin/sign-out-button";

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth.api.getSession({ headers: await headers() });

  return (
    <div className="flex min-h-screen">
      <aside className="hidden w-56 shrink-0 border-r bg-card px-4 py-6 sm:block">
        <p className="font-semibold">Admin Desa</p>
        <nav className="mt-6 space-y-1 text-sm">
          <Link
            href="/admin"
            className="block rounded-md px-3 py-2 hover:bg-accent hover:text-accent-foreground"
          >
            Berita &amp; Pengumuman
          </Link>
        </nav>
      </aside>

      <div className="flex-1">
        <header className="flex items-center justify-between border-b px-4 py-3 sm:px-6">
          <p className="text-sm text-muted-foreground">
            Masuk sebagai {session?.user.email}
          </p>
          <div className="flex items-center gap-2">
            <Link
              href="/"
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              Lihat situs →
            </Link>
            <SignOutButton />
          </div>
        </header>
        <main className="px-4 py-6 sm:px-6">{children}</main>
      </div>
    </div>
  );
}
