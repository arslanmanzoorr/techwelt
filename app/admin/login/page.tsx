import Image from "next/image";
import { redirect } from "next/navigation";
import { adminConfigured, isAuthed } from "@/lib/auth";
import { loginAction } from "../actions";

export const dynamic = "force-dynamic";

export default async function AdminLogin({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  if (await isAuthed()) redirect("/admin");
  const { error } = await searchParams;

  return (
    <main className="grid min-h-screen place-items-center px-5">
      <div className="w-full max-w-sm">
        <div className="mb-8 flex items-center justify-center gap-3">
          <Image src="/mark.png" alt="Techwelt" width={48} height={36} className="h-9 w-auto" />
          <span className="font-display text-2xl font-extrabold">
            Tech<span className="text-brand-teal">welt</span>
          </span>
        </div>

        <div className="tile p-8">
          <h1 className="font-display text-2xl font-bold text-white">Admin sign in</h1>
          <p className="mt-1 text-sm text-ink-3">Enter the admin password to manage news.</p>

          {!adminConfigured && (
            <p className="mt-4 rounded-xl border border-brand-amber/40 bg-brand-amber/10 px-4 py-3 text-sm text-brand-amber">
              No <code>ADMIN_PASSWORD</code> is set. Add it to your environment to enable login.
            </p>
          )}
          {error && (
            <p className="mt-4 rounded-xl border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-300">
              Incorrect password. Try again.
            </p>
          )}

          <form action={loginAction} className="mt-6 space-y-4">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-ink-2">Password</label>
              <input
                type="password"
                name="password"
                required
                autoFocus
                className="w-full rounded-xl border border-white/12 bg-white/5 px-4 py-3 text-white outline-none transition-colors placeholder:text-ink-3 focus:border-brand-teal focus:bg-white/10"
              />
            </div>
            <button
              type="submit"
              className="w-full rounded-full bg-white px-6 py-3 font-semibold text-brand-ink transition-colors hover:bg-brand-blue hover:text-white"
            >
              Sign in
            </button>
          </form>
        </div>

        <p className="mt-6 text-center text-sm text-ink-3">
          <a href="/" className="hover:text-white">← Back to site</a>
        </p>
      </div>
    </main>
  );
}
