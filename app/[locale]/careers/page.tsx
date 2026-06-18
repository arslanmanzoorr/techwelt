import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { Globe2, Rocket, GraduationCap, HeartHandshake, ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import { Reveal } from "@/components/motion";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale });
  return { title: `${t("careers.title")} — Techwelt`, description: t("careers.subtitle") };
}

const perks = [
  { icon: Globe2, key: "perk1", glow: "glow-blue", accent: "text-brand-blue" },
  { icon: Rocket, key: "perk2", glow: "glow-orange", accent: "text-brand-orange" },
  { icon: GraduationCap, key: "perk3", glow: "glow-teal", accent: "text-brand-teal" },
  { icon: HeartHandshake, key: "perk4", glow: "glow-magenta", accent: "text-brand-magenta" },
] as const;

export default async function CareersPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations();

  return (
    <main className="relative">
      <Navbar />
      <PageHero kicker={t("careers.kicker")} title={t("careers.title")} subtitle={t("careers.subtitle")} />

      <section className="bg-night py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-5">
          <Reveal>
            <h2 className="font-display text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              {t("careers.perksTitle")}
            </h2>
          </Reveal>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {perks.map((p, i) => (
              <Reveal key={p.key} delay={i * 0.07} className={`tile tile-glow ${p.glow} p-7`}>
                <p.icon className={`h-9 w-9 ${p.accent}`} strokeWidth={1.6} />
                <h3 className="mt-5 font-display text-lg font-bold text-white">{t(`careers.${p.key}Title`)}</h3>
                <p className="mt-2 text-sm text-ink-2">{t(`careers.${p.key}`)}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-night-2 py-20 sm:py-28">
        <div className="mx-auto max-w-3xl px-5 text-center">
          <Reveal>
            <h2 className="font-display text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              {t("careers.openTitle")}
            </h2>
          </Reveal>
          <Reveal delay={0.05}>
            <p className="mx-auto mt-4 max-w-xl text-lg text-ink-2">{t("careers.openBody")}</p>
          </Reveal>
          <Reveal delay={0.1}>
            <Link
              href="/contact"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-7 py-4 font-semibold text-brand-ink transition-colors hover:bg-brand-blue hover:text-white"
            >
              {t("careers.cta")} <ArrowRight className="h-5 w-5" />
            </Link>
          </Reveal>
        </div>
      </section>

      <Footer />
    </main>
  );
}
