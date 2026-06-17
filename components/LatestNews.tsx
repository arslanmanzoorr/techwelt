import Image from "next/image";
import { getLocale, getTranslations } from "next-intl/server";
import { ArrowUpRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { listPublished } from "@/lib/db";

export default async function LatestNews() {
  const posts = await listPublished(3);
  if (posts.length === 0) return null; // hide section until there's news

  const t = await getTranslations();
  const locale = await getLocale();

  return (
    <section id="insights" className="bg-night-2 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5">
        <div className="mb-14 flex items-end justify-between gap-6">
          <div>
            <span className="kicker text-brand-teal">{t("news.kicker")}</span>
            <h2 className="mt-3 font-display text-4xl font-extrabold leading-[1.05] tracking-[-0.02em] text-white sm:text-5xl">
              {t("news.latestTitle")}
            </h2>
          </div>
          <Link href="/news" className="hidden shrink-0 items-center gap-1 font-semibold text-brand-teal hover:underline sm:inline-flex">
            {t("news.viewAll")} <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid gap-4 lg:grid-cols-3">
          {posts.map((p) => (
            <Link key={p.id} href={`/news/${p.slug}`} className="tile group flex h-full flex-col p-0">
              <div className="relative h-48 overflow-hidden bg-night-3">
                {p.cover_image && (
                  <Image src={p.cover_image} alt="" fill sizes="(max-width:1024px) 100vw, 33vw" className="object-cover opacity-85 transition-all duration-500 group-hover:scale-105 group-hover:opacity-100" unoptimized />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-night/80 to-transparent" />
              </div>
              <div className="flex flex-1 flex-col p-6">
                <time className="text-xs text-ink-3">{new Date(p.created_at).toLocaleDateString(locale, { year: "numeric", month: "long", day: "numeric" })}</time>
                <h3 className="mt-2 font-display text-xl font-bold leading-snug text-white transition-colors group-hover:text-brand-teal">{p.title}</h3>
                {p.excerpt && <p className="mt-2 line-clamp-2 text-sm text-ink-2">{p.excerpt}</p>}
                <span className="mt-auto inline-flex items-center gap-1 pt-5 text-sm font-semibold text-brand-teal">
                  {t("news.readMore")} <ArrowUpRight className="h-4 w-4" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
