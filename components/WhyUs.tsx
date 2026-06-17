"use client";

import { Award, Clock, Globe2, ThumbsUp } from "lucide-react";
import { useTranslations } from "next-intl";
import { Counter, Reveal } from "./motion";

const stats = [
  { icon: ThumbsUp, n: 92, suffix: "%", key: "satisfaction", glow: "glow-blue", accent: "text-brand-blue" },
  { icon: Clock, n: 24, suffix: "/7", key: "support", glow: "glow-teal", accent: "text-brand-teal" },
  { icon: Award, n: 30, suffix: "+", key: "certified", glow: "glow-orange", accent: "text-brand-orange" },
  { icon: Globe2, n: 6, suffix: "", key: "industries", glow: "glow-magenta", accent: "text-brand-magenta" },
] as const;

export default function WhyUs() {
  const t = useTranslations();

  return (
    <section className="relative overflow-hidden bg-night-2 py-24 sm:py-32">
      <div className="relative mx-auto max-w-7xl px-5">
        <div className="mb-14 max-w-2xl">
          <Reveal>
            <span className="kicker text-brand-teal">{t("why.kicker")}</span>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-3 font-display text-4xl font-extrabold leading-[1.05] tracking-[-0.02em] text-white sm:text-5xl">
              {t("why.title")}
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-4 text-lg text-ink-2">{t("why.subtitle")}</p>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s, i) => (
            <Reveal key={s.key} delay={i * 0.08} className={`tile tile-glow ${s.glow} p-7`}>
              <s.icon className={`h-7 w-7 ${s.accent}`} strokeWidth={1.6} />
              <p className="mt-6 font-display text-5xl font-extrabold text-white sm:text-6xl">
                <Counter to={s.n} suffix={s.suffix} />
              </p>
              <p className="mt-3 text-lg font-semibold text-white">{t(`why.${s.key}`)}</p>
              <p className="mt-1 text-sm leading-relaxed text-ink-3">{t(`why.${s.key}Desc`)}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
