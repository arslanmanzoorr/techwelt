"use client";

import { Server, Factory, Pill, ShoppingBag, Fuel, Package } from "lucide-react";
import { useTranslations } from "next-intl";
import { Reveal } from "./motion";

const items = [
  { icon: Server, key: "dataCenters", glow: "glow-blue", accent: "text-brand-blue" },
  { icon: Factory, key: "manufacturing", glow: "glow-teal", accent: "text-brand-teal" },
  { icon: Pill, key: "pharma", glow: "glow-magenta", accent: "text-brand-magenta" },
  { icon: ShoppingBag, key: "retail", glow: "glow-orange", accent: "text-brand-orange" },
  { icon: Fuel, key: "oilGas", glow: "glow-amber", accent: "text-brand-amber" },
  { icon: Package, key: "fmcg", glow: "glow-blue", accent: "text-brand-blue" },
] as const;

export default function Industries() {
  const t = useTranslations();

  return (
    <section id="industries" className="relative bg-night-2 py-24 sm:py-32">
      <div className="relative mx-auto max-w-7xl px-5">
        <div className="mb-14 flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <div className="max-w-xl">
            <Reveal>
              <span className="kicker text-brand-teal">{t("industries.kicker")}</span>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-3 font-display text-4xl font-extrabold leading-[1.05] tracking-[-0.02em] text-white sm:text-5xl">
                {t("industries.title")}
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <p className="max-w-sm text-ink-2">{t("industries.body")}</p>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((it, i) => (
            <Reveal key={it.key} delay={i * 0.06} className={`tile tile-glow ${it.glow} group p-7`}>
              <it.icon className={`h-9 w-9 ${it.accent} transition-transform duration-300 group-hover:-translate-y-1`} strokeWidth={1.5} />
              <h3 className="mt-5 font-display text-xl font-bold text-white">{t(`industries.${it.key}`)}</h3>
              <p className="mt-2 text-sm text-ink-3">{t(`industries.${it.key}Desc`)}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
