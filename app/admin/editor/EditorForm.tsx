"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { upload } from "@vercel/blob/client";
import { Eye, Pencil, Upload, Loader2, X } from "lucide-react";
import { savePostAction } from "../actions";
import type { NewsPost } from "@/lib/db";

export function EditorForm({ post }: { post: NewsPost | null }) {
  const [body, setBody] = useState(post?.body ?? "");
  const [cover, setCover] = useState(post?.cover_image ?? "");
  const [tab, setTab] = useState<"write" | "preview">("write");
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setUploadError(null);
    try {
      const blob = await upload(file.name, file, {
        access: "public",
        handleUploadUrl: "/api/admin/upload",
        contentType: file.type,
      });
      setCover(blob.url);
    } catch (err) {
      setUploadError(
        (err as Error).message?.includes("token") || (err as Error).message?.includes("BLOB")
          ? "Upload needs BLOB_READ_WRITE_TOKEN — add a Vercel Blob store, or paste an image URL instead."
          : `Upload failed: ${(err as Error).message}`
      );
    } finally {
      setUploading(false);
      if (fileRef.current) fileRef.current.value = "";
    }
  }

  const field =
    "w-full rounded-xl border border-white/12 bg-white/5 px-4 py-3 text-white outline-none transition-colors placeholder:text-ink-3 focus:border-brand-teal focus:bg-white/10";

  return (
    <form action={savePostAction} className="space-y-6">
      {post && <input type="hidden" name="id" value={post.id} />}

      <div>
        <label className="mb-1.5 block text-sm font-medium text-ink-2">Title</label>
        <input name="title" required defaultValue={post?.title ?? ""} placeholder="Techwelt opens new Dubai office" className={field} />
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-medium text-ink-2">Excerpt</label>
        <textarea name="excerpt" rows={2} defaultValue={post?.excerpt ?? ""} placeholder="A short summary shown on the News listing." className={field} />
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-medium text-ink-2">Cover image</label>
        <div className="flex gap-2">
          <input name="coverImage" value={cover} onChange={(e) => setCover(e.target.value)} placeholder="Paste an image URL or upload…" className={field} />
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
        {cover && (
          <div className="relative mt-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={cover} alt="" className="h-40 w-full rounded-xl object-cover" />
            <button
              type="button"
              onClick={() => setCover("")}
              className="absolute right-2 top-2 grid h-8 w-8 place-items-center rounded-full bg-night/80 text-white backdrop-blur transition-colors hover:bg-night"
              aria-label="Remove image"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>

      <div>
        <div className="mb-1.5 flex items-center justify-between">
          <label className="text-sm font-medium text-ink-2">Body (Markdown)</label>
          <div className="flex gap-1 rounded-full border border-white/10 p-0.5 text-xs">
            <button type="button" onClick={() => setTab("write")} className={`inline-flex items-center gap-1 rounded-full px-3 py-1 ${tab === "write" ? "bg-white/10 text-white" : "text-ink-3"}`}>
              <Pencil className="h-3 w-3" /> Write
            </button>
            <button type="button" onClick={() => setTab("preview")} className={`inline-flex items-center gap-1 rounded-full px-3 py-1 ${tab === "preview" ? "bg-white/10 text-white" : "text-ink-3"}`}>
              <Eye className="h-3 w-3" /> Preview
            </button>
          </div>
        </div>
        {tab === "write" ? (
          <textarea
            name="body"
            rows={16}
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder={"## A heading\n\nWrite your news in **Markdown** — headings, [links](https://example.com), lists, and more."}
            className={`${field} font-mono text-sm`}
          />
        ) : (
          <>
            <input type="hidden" name="body" value={body} />
            <div className="prose-news min-h-[16rem] rounded-xl border border-white/12 bg-white/5 px-5 py-4">
              {body.trim() ? (
                <ReactMarkdown remarkPlugins={[remarkGfm]}>{body}</ReactMarkdown>
              ) : (
                <p className="text-ink-3">Nothing to preview yet.</p>
              )}
            </div>
          </>
        )}
      </div>

      <label className="flex items-center gap-3">
        <input type="checkbox" name="published" defaultChecked={post?.published ?? false} className="h-5 w-5 accent-brand-teal" />
        <span className="text-sm text-ink-1">Published <span className="text-ink-3">(uncheck to save as draft)</span></span>
      </label>

      <div className="flex items-center gap-3 border-t border-white/10 pt-6">
        <button type="submit" className="rounded-full bg-white px-7 py-3 font-semibold text-brand-ink transition-colors hover:bg-brand-blue hover:text-white">
          {post ? "Save changes" : "Create post"}
        </button>
        <Link href="/admin" className="rounded-full px-5 py-3 text-sm font-medium text-ink-3 hover:text-white">Cancel</Link>
      </div>
    </form>
  );
}
