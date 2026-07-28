import { redirect } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { isAuthed } from "@/lib/auth";
import { listAllReviews, dbConfigured } from "@/lib/db";
import { Plus, Pencil } from "lucide-react";
import { DeleteReviewButton } from "./DeleteReviewButton";

export const dynamic = "force-dynamic";

export default async function ReviewsAdmin() {
  if (!(await isAuthed())) redirect("/admin/login");
  const reviews = await listAllReviews();

  return (
    <main className="mx-auto max-w-5xl px-5 py-10">
      <header className="flex items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-xl font-extrabold">Reviews</h1>
          <p className="text-sm text-ink-3">Client testimonials shown on the site</p>
        </div>
        <div className="flex items-center gap-2">
          <Link href="/admin" className="hidden rounded-full border border-white/15 px-4 py-2 text-sm font-medium text-ink-2 hover:text-white sm:inline-flex">
            Dashboard
          </Link>
          <Link href="/admin/reviews/editor" className="inline-flex items-center gap-1.5 rounded-full bg-white px-4 py-2 text-sm font-semibold text-brand-ink transition-colors hover:bg-brand-blue hover:text-white">
            <Plus className="h-4 w-4" /> New review
          </Link>
        </div>
      </header>

      {!dbConfigured && (
        <p className="mt-6 rounded-xl border border-brand-amber/40 bg-brand-amber/10 px-4 py-3 text-sm text-brand-amber">
          No database connected. Set <code>DATABASE_URL</code> (Neon) to save and load reviews.
        </p>
      )}

      <div className="mt-8 overflow-hidden rounded-2xl border border-white/10">
        {reviews.length === 0 ? (
          <div className="grid place-items-center px-6 py-20 text-center">
            <p className="text-ink-2">No reviews yet.</p>
            <Link href="/admin/reviews/editor" className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-brand-ink hover:bg-brand-blue hover:text-white">
              <Plus className="h-4 w-4" /> Add your first review
            </Link>
          </div>
        ) : (
          <ul className="divide-y divide-white/5">
            {reviews.map((r) => (
              <li key={r.id} className="flex items-center gap-4 px-5 py-4 hover:bg-white/[0.03]">
                <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full bg-night-3">
                  {r.image && (
                    <Image src={r.image} alt="" fill sizes="44px" className="object-cover" unoptimized />
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate font-medium text-white">{r.name}</p>
                  <p className="truncate text-sm text-ink-3">
                    {[r.position, r.company].filter(Boolean).join(" · ")}
                  </p>
                </div>
                {r.published ? (
                  <span className="rounded-full bg-brand-teal/15 px-2.5 py-1 text-xs font-semibold text-brand-teal">Published</span>
                ) : (
                  <span className="rounded-full bg-white/10 px-2.5 py-1 text-xs font-semibold text-ink-2">Draft</span>
                )}
                <div className="flex items-center gap-2">
                  <Link href={`/admin/reviews/editor?id=${r.id}`} className="grid h-8 w-8 place-items-center rounded-lg border border-white/10 text-ink-2 hover:text-white" aria-label="Edit">
                    <Pencil className="h-4 w-4" />
                  </Link>
                  <DeleteReviewButton id={r.id} name={r.name} />
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}
