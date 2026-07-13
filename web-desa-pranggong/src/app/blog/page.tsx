import type { Metadata } from "next";
import PagePlaceholder from "@/components/ui/page-placeholder";

export const metadata: Metadata = {
  title: "Blog",
};

export default function BlogPage() {
  return (
    <PagePlaceholder
      title="Blog Desa"
      description="Berita dan kegiatan terbaru seputar Desa Pranggong."
      note="Sistem CRUD blog (create, read, update, delete) akan dibangun pada Tahap 5 (monodisiplin)."
    />
  );
}
