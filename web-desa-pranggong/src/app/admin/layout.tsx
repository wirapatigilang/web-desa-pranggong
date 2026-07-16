import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "Admin",
    template: "%s | Admin Desa Pranggong",
  },
  robots: { index: false, follow: false },
};

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div
      id="admin-shell"
      suppressHydrationWarning
      className="min-h-screen bg-background font-sans text-foreground"
    >
      {/* Set class "dark" sebelum React hydrate, biar tidak ada kedip warna
          salah saat halaman dimuat. Dilingkupi ke #admin-shell saja — situs
          publik tidak tersentuh sama sekali. */}
      <script
        dangerouslySetInnerHTML={{
          __html: `try {
            var t = localStorage.getItem("admin-theme");
            if (t === "dark") document.getElementById("admin-shell").classList.add("dark");
          } catch (e) {}`,
        }}
      />
      {children}
    </div>
  );
}
