import { redirect } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { isAuthed } from "@/lib/auth";
import { listAll, dbConfigured } from "@/lib/db";
import { logoutAction } from "./actions";
import { Plus, Pencil, ExternalLink } from "lucide-react";
import { DeleteButton } from "./DeleteButton";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  if (!(await isAuthed())) redirect("/admin/login");
  const posts = await listAll();

  return (
    <main className="mx-auto max-w-5xl px-5 py-10">
      <header className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Image src="/mark.png" alt="Techwelt" width={44} height={34} className="h-8 w-auto" />
          <div>
            <h1 className="font-display text-xl font-extrabold">News admin</h1>
            <p className="text-sm text-ink-3">Manage articles for the News page</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Link href="/news" target="_blank" className="hidden items-center gap-1.5 rounded-full border border-white/15 px-4 py-2 text-sm font-medium text-ink-2 hover:text-white sm:inline-flex">
            View site <ExternalLink className="h-4 w-4" />
          </Link>
          <Link href="/admin/enquiries" className="hidden items-center gap-1.5 rounded-full border border-white/15 px-4 py-2 text-sm font-medium text-ink-2 hover:text-white sm:inline-flex">
            Enquiries
          </Link>
          <Link href="/admin/editor" className="inline-flex items-center gap-1.5 rounded-full bg-white px-4 py-2 text-sm font-semibold text-brand-ink transition-colors hover:bg-brand-blue hover:text-white">
            <Plus className="h-4 w-4" /> New post
          </Link>
          <form action={logoutAction}>
            <button className="rounded-full px-4 py-2 text-sm font-medium text-ink-3 hover:text-white">Sign out</button>
          </form>
        </div>
      </header>

      {!dbConfigured && (
        <p className="mt-6 rounded-xl border border-brand-amber/40 bg-brand-amber/10 px-4 py-3 text-sm text-brand-amber">
          No database connected. Set <code>DATABASE_URL</code> (Neon) to save and load posts.
        </p>
      )}

      <div className="mt-8 overflow-hidden rounded-2xl border border-white/10">
        {posts.length === 0 ? (
          <div className="grid place-items-center px-6 py-20 text-center">
            <p className="text-ink-2">No posts yet.</p>
            <Link href="/admin/editor" className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-brand-ink hover:bg-brand-blue hover:text-white">
              <Plus className="h-4 w-4" /> Write your first post
            </Link>
          </div>
        ) : (
          <table className="w-full text-left text-sm">
            <thead className="border-b border-white/10 text-xs uppercase tracking-wider text-ink-3">
              <tr>
                <th className="px-5 py-3 font-semibold">Title</th>
                <th className="px-5 py-3 font-semibold">Status</th>
                <th className="px-5 py-3 font-semibold">Date</th>
                <th className="px-5 py-3 text-right font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {posts.map((p) => (
                <tr key={p.id} className="border-b border-white/5 last:border-0 hover:bg-white/[0.03]">
                  <td className="px-5 py-4 font-medium text-white">{p.title}</td>
                  <td className="px-5 py-4">
                    {p.published ? (
                      <span className="rounded-full bg-brand-teal/15 px-2.5 py-1 text-xs font-semibold text-brand-teal">Published</span>
                    ) : (
                      <span className="rounded-full bg-white/10 px-2.5 py-1 text-xs font-semibold text-ink-2">Draft</span>
                    )}
                  </td>
                  <td className="px-5 py-4 text-ink-3">{new Date(p.created_at).toLocaleDateString()}</td>
                  <td className="px-5 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <Link href={`/admin/editor?id=${p.id}`} className="grid h-8 w-8 place-items-center rounded-lg border border-white/10 text-ink-2 hover:text-white" aria-label="Edit">
                        <Pencil className="h-4 w-4" />
                      </Link>
                      <DeleteButton id={p.id} title={p.title} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </main>
  );
}
