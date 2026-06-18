"use client";

import {
  Landmark, HeartPulse, Pill, Factory, ShoppingBag, Package,
  Zap, Fuel, RadioTower, Building2, Truck, Server,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { Reveal } from "./motion";

const items = [
  { key: "banking", icon: Landmark, glow: "glow-blue", accent: "text-brand-blue" },
  { key: "healthcare", icon: HeartPulse, glow: "glow-teal", accent: "text-brand-teal" },
  { key: "pharma", icon: Pill, glow: "glow-magenta", accent: "text-brand-magenta" },
  { key: "manufacturing", icon: Factory, glow: "glow-orange", accent: "text-brand-orange" },
  { key: "retail", icon: ShoppingBag, glow: "glow-blue", accent: "text-brand-blue" },
  { key: "fmcg", icon: Package, glow: "glow-amber", accent: "text-brand-amber" },
  { key: "energy", icon: Zap, glow: "glow-teal", accent: "text-brand-teal" },
  { key: "oilGas", icon: Fuel, glow: "glow-orange", accent: "text-brand-orange" },
  { key: "telecom", icon: RadioTower, glow: "glow-magenta", accent: "text-brand-magenta" },
  { key: "public", icon: Building2, glow: "glow-blue", accent: "text-brand-blue" },
  { key: "logistics", icon: Truck, glow: "glow-amber", accent: "text-brand-amber" },
  { key: "dataCenters", icon: Server, glow: "glow-teal", accent: "text-brand-teal" },
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

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {items.map((it, i) => (
            <Reveal
              key={it.key}
              delay={(i % 4) * 0.05}
              className={`tile tile-glow ${it.glow} group p-6`}
            >
              <it.icon className={`h-8 w-8 ${it.accent} transition-transform duration-300 group-hover:-translate-y-1`} strokeWidth={1.5} />
              <h3 className="mt-4 font-display text-lg font-bold text-white">{t(`industries.${it.key}`)}</h3>
              <p className="mt-1.5 text-sm text-ink-3">{t(`industries.${it.key}Desc`)}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
