import { redirect } from "next/navigation";
import Link from "next/link";
import { isAuthed } from "@/lib/auth";
import { listSubmissions, dbConfigured } from "@/lib/db";
import { Mail, Phone } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function EnquiriesPage() {
  if (!(await isAuthed())) redirect("/admin/login");
  const items = await listSubmissions();

  return (
    <main className="mx-auto max-w-5xl px-5 py-10">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-extrabold">Enquiries</h1>
          <p className="text-sm text-ink-3">Contact form submissions</p>
        </div>
        <Link href="/admin" className="text-sm text-ink-3 hover:text-white">← Back to dashboard</Link>
      </div>

      {!dbConfigured && (
        <p className="mb-6 rounded-xl border border-brand-amber/40 bg-brand-amber/10 px-4 py-3 text-sm text-brand-amber">
          No database connected. Set <code>DATABASE_URL</code> to store enquiries.
        </p>
      )}

      {items.length === 0 ? (
        <div className="grid place-items-center rounded-2xl border border-white/10 px-6 py-20 text-center text-ink-2">
          No enquiries yet.
        </div>
      ) : (
        <div className="space-y-3">
          {items.map((s) => (
            <div key={s.id} className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-3">
                  <span className="font-semibold text-white">{s.name}</span>
                  {s.company && <span className="text-sm text-ink-3">· {s.company}</span>}
                  {s.country && (
                    <span className="rounded-full bg-white/10 px-2 py-0.5 text-xs font-semibold text-ink-2">{s.country}</span>
                  )}
                </div>
                <time className="text-xs text-ink-3">{new Date(s.created_at).toLocaleString()}</time>
              </div>
              <div className="mt-2 flex flex-wrap gap-4 text-sm text-ink-2">
                <a href={`mailto:${s.email}`} className="inline-flex items-center gap-1.5 hover:text-white">
                  <Mail className="h-3.5 w-3.5" /> {s.email}
                </a>
                {s.phone && (
                  <a href={`tel:${s.phone}`} className="inline-flex items-center gap-1.5 hover:text-white">
                    <Phone className="h-3.5 w-3.5" /> {s.phone}
                  </a>
                )}
              </div>
              <p className="mt-3 whitespace-pre-wrap text-sm text-ink-1/85">{s.message}</p>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
