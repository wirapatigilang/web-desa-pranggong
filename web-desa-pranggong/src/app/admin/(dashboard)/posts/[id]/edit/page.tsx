import { notFound } from "next/navigation";
import PostForm from "@/components/admin/post-form";
import { updatePost } from "@/lib/actions/posts";
import { prisma } from "@/lib/prisma";

export default async function EditPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const post = await prisma.post.findUnique({ where: { id } });

  if (!post) {
    notFound();
  }

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-semibold">Edit Konten</h1>
      <p className="mt-1 text-sm text-muted-foreground">{post.title}</p>
      <div className="mt-6">
        <PostForm
          action={updatePost.bind(null, id)}
          defaultValues={post}
          submitLabel="Simpan Perubahan"
        />
      </div>
    </div>
  );
}
