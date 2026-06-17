import Image from "next/image";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { ArrowUpRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import { listPublished } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function NewsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations();
  const posts = await listPublished();

  return (
    <main className="relative">
      <Navbar />
      <PageHero kicker={t("news.kicker")} title={t("news.title")} subtitle={t("news.subtitle")} />

      <section className="bg-night py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-5">
          {posts.length === 0 ? (
            <div className="grid place-items-center rounded-3xl border border-white/10 px-6 py-24 text-center">
              <p className="font-display text-2xl font-bold text-white">{t("news.emptyTitle")}</p>
              <p className="mt-2 max-w-md text-ink-2">{t("news.emptyBody")}</p>
            </div>
          ) : (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((p) => (
                <Link key={p.id} href={`/news/${p.slug}`} className="tile group flex flex-col p-0">
                  <div className="relative h-48 overflow-hidden bg-night-3">
                    {p.cover_image && (
                      <Image src={p.cover_image} alt="" fill sizes="(max-width:1024px) 100vw, 33vw" className="object-cover opacity-85 transition-all duration-500 group-hover:scale-105 group-hover:opacity-100" unoptimized />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-night/80 to-transparent" />
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <time className="text-xs text-ink-3">{new Date(p.created_at).toLocaleDateString(locale, { year: "numeric", month: "long", day: "numeric" })}</time>
                    <h2 className="mt-2 font-display text-xl font-bold leading-snug text-white transition-colors group-hover:text-brand-teal">{p.title}</h2>
                    {p.excerpt && <p className="mt-2 line-clamp-3 text-sm text-ink-2">{p.excerpt}</p>}
                    <span className="mt-auto inline-flex items-center gap-1 pt-5 text-sm font-semibold text-brand-teal">
                      {t("news.readMore")} <ArrowUpRight className="h-4 w-4" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
      <Footer />
    </main>
  );
}
