import { redirect } from "next/navigation";
import { isAuthed } from "@/lib/auth";
import { getById } from "@/lib/db";
import { EditorForm } from "./EditorForm";

export const dynamic = "force-dynamic";

export default async function EditorPage({
  searchParams,
}: {
  searchParams: Promise<{ id?: string }>;
}) {
  if (!(await isAuthed())) redirect("/admin/login");
  const { id } = await searchParams;
  const post = id ? await getById(Number(id)) : null;

  return (
    <main className="mx-auto max-w-4xl px-5 py-10">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="font-display text-2xl font-extrabold">{post ? "Edit post" : "New post"}</h1>
        <a href="/admin" className="text-sm text-ink-3 hover:text-white">← Back to dashboard</a>
      </div>
      <EditorForm post={post} />
    </main>
  );
}
