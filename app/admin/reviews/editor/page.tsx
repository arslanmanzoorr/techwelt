import { redirect } from "next/navigation";
import Link from "next/link";
import { isAuthed } from "@/lib/auth";
import { getReviewById } from "@/lib/db";
import { ReviewForm } from "./ReviewForm";

export const dynamic = "force-dynamic";

export default async function ReviewEditorPage({
  searchParams,
}: {
  searchParams: Promise<{ id?: string }>;
}) {
  if (!(await isAuthed())) redirect("/admin/login");
  const { id } = await searchParams;
  const review = id ? await getReviewById(Number(id)) : null;

  return (
    <main className="mx-auto max-w-2xl px-5 py-10">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="font-display text-2xl font-extrabold">{review ? "Edit review" : "New review"}</h1>
        <Link href="/admin/reviews" className="text-sm text-ink-3 hover:text-white">← Back to reviews</Link>
      </div>
      <ReviewForm review={review} />
    </main>
  );
}
