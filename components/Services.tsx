"use client";

import {
  Target, BrainCircuit, Cloud, ShieldCheck, Code2, Server,
  Recycle, Users, Cpu, Boxes, Bot, Sparkles, ArrowUpRight,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { SERVICE_SLUGS } from "@/lib/services";
import { Reveal } from "./motion";

const items = [
  { key: "strategy", icon: Target, glow: "glow-blue", accent: "text-brand-blue" },
  { key: "ai", icon: BrainCircuit, glow: "glow-magenta", accent: "text-brand-magenta" },
  { key: "cloud", icon: Cloud, glow: "glow-teal", accent: "text-brand-teal" },
  { key: "cyber", icon: ShieldCheck, glow: "glow-orange", accent: "text-brand-orange" },
  { key: "software", icon: Code2, glow: "glow-blue", accent: "text-brand-blue" },
  { key: "managed", icon: Server, glow: "glow-teal", accent: "text-brand-teal" },
  { key: "assets", icon: Recycle, glow: "glow-amber", accent: "text-brand-amber" },
  { key: "staffing", icon: Users, glow: "glow-orange", accent: "text-brand-orange" },
  { key: "engineering", icon: Cpu, glow: "glow-magenta", accent: "text-brand-magenta" },
  { key: "platforms", icon: Boxes, glow: "glow-blue", accent: "text-brand-blue" },
  { key: "automation", icon: Bot, glow: "glow-teal", accent: "text-brand-teal" },
  { key: "experience", icon: Sparkles, glow: "glow-amber", accent: "text-brand-amber" },
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

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((s, i) => (
            <Reveal key={s.key} delay={(i % 3) * 0.06} className="h-full">
              <Link
                href={`/services/${SERVICE_SLUGS[s.key]}`}
                className={`tile tile-glow ${s.glow} group flex h-full flex-col p-7`}
              >
                <div className="grid h-12 w-12 place-items-center rounded-xl bg-white/5 transition-colors duration-300 group-hover:bg-white/10">
                  <s.icon className={`h-6 w-6 ${s.accent}`} strokeWidth={1.8} />
                </div>
                <h3 className="mt-6 font-display text-xl font-bold tracking-tight text-white">
                  {t(`services.${s.key}.title`)}
                </h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-2">{t(`services.${s.key}.desc`)}</p>
                <span className={`mt-5 inline-flex w-fit items-center gap-1 text-sm font-semibold ${s.accent} opacity-0 transition-opacity group-hover:opacity-100`}>
                  {t("services.learnMore")} <ArrowUpRight className="h-4 w-4" />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
