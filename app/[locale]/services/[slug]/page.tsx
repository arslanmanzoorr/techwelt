import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { Check, ArrowUpRight, ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import Contact from "@/components/Contact";
import { Reveal } from "@/components/motion";
import { SERVICE_KEYS, SERVICE_SLUGS, keyFromSlug } from "@/lib/services";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const key = keyFromSlug(slug);
  if (!key) return {};
  const t = await getTranslations({ locale });
  return {
    title: `${t(`services.${key}.title`)} — Techwelt`,
    description: t(`services.${key}.desc`),
  };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const key = keyFromSlug(slug);
  if (!key) notFound();

  const t = await getTranslations();
  const points = ["p1", "p2", "p3", "p4"] as const;
  const related = SERVICE_KEYS.filter((k) => k !== key).slice(0, 3);

  return (
    <main className="relative">
      <Navbar />
      <PageHero
        kicker={t("services.kicker")}
        title={t(`services.${key}.title`)}
        subtitle={t(`services.${key}.desc`)}
      />

      {/* Overview + what's included */}
      <section className="bg-night py-20 sm:py-28">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 lg:grid-cols-2">
          <Reveal>
            <span className="kicker text-brand-teal">{t("serviceDetails.overview")}</span>
            <p className="mt-5 text-lg leading-relaxed text-ink-2">
              {t(`serviceDetails.${key}.long`)}
            </p>
            <Link
              href="/contact"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 font-semibold text-brand-ink transition-colors hover:bg-brand-blue hover:text-white"
            >
              {t("serviceDetails.ctaButton")} <ArrowRight className="h-5 w-5" />
            </Link>
          </Reveal>

          <Reveal delay={0.1} className="tile p-8">
            <h2 className="font-display text-xl font-bold text-white">{t("serviceDetails.whatIncluded")}</h2>
            <ul className="mt-6 space-y-4">
              {points.map((p) => (
                <li key={p} className="flex items-start gap-3">
                  <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-gradient-to-br from-brand-blue to-brand-teal text-white">
                    <Check className="h-4 w-4" strokeWidth={3} />
                  </span>
                  <span className="text-ink-1/85">{t(`serviceDetails.${key}.${p}`)}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* Related services */}
      <section className="bg-night-2 py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-5">
          <Reveal>
            <h2 className="font-display text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              {t("serviceDetails.related")}
            </h2>
          </Reveal>
          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {related.map((rk, i) => (
              <Reveal key={rk} delay={i * 0.08}>
                <Link href={`/services/${SERVICE_SLUGS[rk]}`} className="tile group flex h-full flex-col p-7">
                  <h3 className="font-display text-lg font-bold text-white transition-colors group-hover:text-brand-teal">
                    {t(`services.${rk}.title`)}
                  </h3>
                  <p className="mt-2 flex-1 text-sm text-ink-2">{t(`services.${rk}.desc`)}</p>
                  <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-brand-teal">
                    {t("services.learnMore")} <ArrowUpRight className="h-4 w-4" />
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <Contact />
      <Footer />
    </main>
  );
}
