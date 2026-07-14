import PostForm from "@/components/admin/post-form";
import { createPost } from "@/lib/actions/posts";

export default function NewPostPage() {
  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-semibold">Tambah Konten</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Buat pengumuman atau berita baru.
      </p>
      <div className="mt-6">
        <PostForm action={createPost} submitLabel="Publikasikan" />
      </div>
    </div>
  );
}
