"use client";

import { ShieldAlert, Recycle, Users, Headset, LifeBuoy, ArrowUpRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { Reveal } from "./motion";

const items = [
  { key: "cyber", icon: ShieldAlert, glow: "glow-magenta", accent: "text-brand-magenta", span: "lg:col-span-3 lg:row-span-2", big: true, tags: ["tag1", "tag2", "tag3"] },
  { key: "asset", icon: Recycle, glow: "glow-teal", accent: "text-brand-teal", span: "lg:col-span-3" },
  { key: "staffing", icon: Users, glow: "glow-orange", accent: "text-brand-orange", span: "lg:col-span-3" },
  { key: "support", icon: Headset, glow: "glow-blue", accent: "text-brand-blue", span: "lg:col-span-3" },
  { key: "desk", icon: LifeBuoy, glow: "glow-amber", accent: "text-brand-amber", span: "lg:col-span-3" },
] as const;

export default function Services() {
  const t = useTranslations();

  return (
    <section id="services" className="relative bg-night py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5">
        <div className="mb-14 max-w-2xl">
          <Reveal>
            <span className="kicker text-brand-teal">{t("services.kicker")}</span>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-3 font-display text-4xl font-extrabold leading-[1.05] tracking-[-0.02em] text-white sm:text-5xl">
              {t("services.title")}
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-4 text-lg text-ink-2">{t("services.subtitle")}</p>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-6 lg:auto-rows-[minmax(0,1fr)]">
          {items.map((s, i) => (
            <Reveal
              key={s.key}
              delay={i * 0.06}
              className={`tile tile-glow ${s.glow} group flex flex-col p-7 ${s.span ?? ""}`}
            >
              <div className={`grid h-12 w-12 place-items-center rounded-xl bg-white/5 ${s.accent}`}>
                <s.icon className="h-6 w-6" strokeWidth={1.8} />
              </div>
              <h3 className={`mt-6 font-display font-bold tracking-tight text-white ${"big" in s && s.big ? "text-3xl" : "text-xl"}`}>
                {t(`services.${s.key}.title`)}
              </h3>
              <p className="mt-3 max-w-md text-ink-2">{t(`services.${s.key}.desc`)}</p>

              {"tags" in s && s.tags && (
                <div className="mt-6 flex flex-wrap gap-2">
                  {s.tags.map((tag) => (
                    <span key={tag} className="rounded-full border border-white/12 px-3 py-1 text-sm font-medium text-ink-2">
                      {t(`services.${tag}`)}
                    </span>
                  ))}
                </div>
              )}

              <a href="#contact" className={`mt-auto inline-flex w-fit items-center gap-1 pt-6 text-sm font-semibold ${s.accent} opacity-0 transition-opacity group-hover:opacity-100`}>
                {t("services.learnMore")} <ArrowUpRight className="h-4 w-4" />
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
