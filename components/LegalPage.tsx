import { getTranslations } from "next-intl/server";
import Navbar from "./Navbar";
import Footer from "./Footer";
import PageHero from "./PageHero";
import { getActiveEntity } from "@/lib/getEntity";

const LAST_UPDATED = "June 2026";

export default async function LegalPage({ ns }: { ns: "privacy" | "terms" }) {
  const t = await getTranslations();
  const entity = await getActiveEntity();
  const sections = [1, 2, 3, 4].map((n) => ({
    h: t(`${ns}.s${n}Title`),
    b: t(`${ns}.s${n}Body`),
  }));

  return (
    <main className="relative">
      <Navbar />
      <PageHero title={t(`${ns}.title`)} subtitle={t(`${ns}.intro`)} />
      <section className="bg-night py-20 sm:py-28">
        <div className="mx-auto max-w-3xl space-y-10 px-5">
          {sections.map((s) => (
            <div key={s.h}>
              <h2 className="font-display text-2xl font-bold text-white">{s.h}</h2>
              <p className="mt-3 leading-relaxed text-ink-2">{s.b}</p>
            </div>
          ))}
          <div className="border-t border-white/10 pt-8">
            <h2 className="font-display text-2xl font-bold text-white">{t(`${ns}.contactTitle`)}</h2>
            <p className="mt-3 text-ink-2">
              {t(`${ns}.contactBody`, { email: entity.email })}
            </p>
          </div>
          <p className="text-sm text-ink-3">
            {t(`${ns}.updated`)}: {LAST_UPDATED}
          </p>
        </div>
      </section>
      <Footer />
    </main>
  );
}
