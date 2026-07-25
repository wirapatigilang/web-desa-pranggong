import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import MotionProvider from "@/components/motion/motion-provider";

export default function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <MotionProvider>
      <div className="flex min-h-full flex-col bg-paper-50 font-sans text-ink-900">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </div>
    </MotionProvider>
  );
}
