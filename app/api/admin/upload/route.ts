import { put } from "@vercel/blob";
import { NextResponse } from "next/server";
import { isAuthed } from "@/lib/auth";

export const dynamic = "force-dynamic";

const ALLOWED = ["image/jpeg", "image/png", "image/webp", "image/gif", "image/avif"];
const MAX_BYTES = 4 * 1024 * 1024; // 4 MB — within the serverless request-body limit

/**
 * Server-side image upload to Vercel Blob.
 * The browser POSTs the file as multipart form-data; this route (admin-only)
 * stores it with `put()` and returns the public URL. Doing it server-side
 * avoids browser→Blob CORS issues (which break client uploads on localhost).
 */
export async function POST(request: Request): Promise<NextResponse> {
  if (!(await isAuthed())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return NextResponse.json(
      { error: "Image upload isn't configured (BLOB_READ_WRITE_TOKEN missing). Paste an image URL instead." },
      { status: 400 }
    );
  }

  const form = await request.formData();
  const file = form.get("file");
  if (!(file instanceof File)) {
    return NextResponse.json({ error: "No file provided." }, { status: 400 });
  }
  if (!ALLOWED.includes(file.type)) {
    return NextResponse.json({ error: "Unsupported file type. Use JPG, PNG, WebP, GIF or AVIF." }, { status: 400 });
  }
  if (file.size > MAX_BYTES) {
    return NextResponse.json({ error: "Image is too large (max 4 MB)." }, { status: 400 });
  }

  try {
    const blob = await put(file.name, file, { access: "public", addRandomSuffix: true });
    return NextResponse.json({ url: blob.url });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}
