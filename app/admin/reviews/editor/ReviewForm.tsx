"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { Upload, Loader2, X } from "lucide-react";
import { saveReviewAction } from "../actions";
import type { Review } from "@/lib/db";

export function ReviewForm({ review }: { review: Review | null }) {
  const [image, setImage] = useState(review?.image ?? "");
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setUploadError(null);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
      const data = (await res.json()) as { url?: string; error?: string };
      if (!res.ok || !data.url) throw new Error(data.error || "Upload failed");
      setImage(data.url);
    } catch (err) {
      setUploadError((err as Error).message);
    } finally {
      setUploading(false);
      if (fileRef.current) fileRef.current.value = "";
    }
  }

  const field =
    "w-full rounded-xl border border-white/12 bg-white/5 px-4 py-3 text-white outline-none transition-colors placeholder:text-ink-3 focus:border-brand-teal focus:bg-white/10";

  return (
    <form action={saveReviewAction} className="space-y-6">
      {review && <input type="hidden" name="id" value={review.id} />}

      {/* Reviewer photo */}
      <div>
        <label className="mb-1.5 block text-sm font-medium text-ink-2">Reviewer photo</label>
        <div className="flex items-center gap-4">
          <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full border border-white/10 bg-white/5">
            {image && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={image} alt="" className="h-full w-full object-cover" />
            )}
            {image && (
              <button
                type="button"
                onClick={() => setImage("")}
                className="absolute right-0.5 top-0.5 grid h-5 w-5 place-items-center rounded-full bg-night/80 text-white"
                aria-label="Remove photo"
              >
                <X className="h-3 w-3" />
              </button>
            )}
          </div>
          <div className="flex-1">
            <div className="flex gap-2">
              <input name="image" value={image} onChange={(e) => setImage(e.target.value)} placeholder="Paste an image URL or upload…" className={field} />
              <input ref={fileRef} type="file" accept="image/*" onChange={handleFile} className="hidden" />
              <button
                type="button"
                onClick={() => fileRef.current?.click()}
                disabled={uploading}
                className="inline-flex shrink-0 items-center gap-2 rounded-xl border border-white/12 bg-white/5 px-4 text-sm font-semibold text-white transition-colors hover:bg-white/10 disabled:opacity-60"
              >
                {uploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
                {uploading ? "Uploading…" : "Upload"}
              </button>
            </div>
            {uploadError && <p className="mt-2 text-sm text-red-300">{uploadError}</p>}
          </div>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-ink-2">Name</label>
          <input name="name" required defaultValue={review?.name ?? ""} placeholder="Jane Doe" className={field} />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-ink-2">Position</label>
          <input name="position" defaultValue={review?.position ?? ""} placeholder="Chief Information Officer" className={field} />
        </div>
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-medium text-ink-2">Company</label>
        <input name="company" defaultValue={review?.company ?? ""} placeholder="Acme Ltd" className={field} />
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-medium text-ink-2">Review</label>
        <textarea
          name="quote"
          rows={5}
          required
          defaultValue={review?.quote ?? ""}
          placeholder="Techwelt transformed how we run IT…"
          className={field}
        />
      </div>

      <label className="flex items-center gap-3">
        <input type="checkbox" name="published" defaultChecked={review?.published ?? true} className="h-5 w-5 accent-brand-teal" />
        <span className="text-sm text-ink-1">Published <span className="text-ink-3">(uncheck to hide)</span></span>
      </label>

      <div className="flex items-center gap-3 border-t border-white/10 pt-6">
        <button type="submit" className="rounded-full bg-white px-7 py-3 font-semibold text-brand-ink transition-colors hover:bg-brand-blue hover:text-white">
          {review ? "Save changes" : "Add review"}
        </button>
        <Link href="/admin/reviews" className="rounded-full px-5 py-3 text-sm font-medium text-ink-3 hover:text-white">Cancel</Link>
      </div>
    </form>
  );
}
