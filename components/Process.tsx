"use client";

import { Search, Workflow, Repeat } from "lucide-react";
import { useTranslations } from "next-intl";
import { Reveal } from "./motion";

const steps = [
  { n: "01", icon: Search, glow: "glow-blue", accent: "text-brand-blue", key: "step1" },
  { n: "02", icon: Workflow, glow: "glow-teal", accent: "text-brand-teal", key: "step2" },
  { n: "03", icon: Repeat, glow: "glow-orange", accent: "text-brand-orange", key: "step3" },
] as const;

export default function Process() {
  const t = useTranslations();

  return (
    <section id="process" className="relative bg-night py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5">
        <div className="mb-14 max-w-2xl">
          <Reveal>
            <span className="kicker text-brand-teal">{t("process.kicker")}</span>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-3 font-display text-4xl font-extrabold leading-[1.05] tracking-[-0.02em] text-white sm:text-5xl">
              {t("process.title")}
            </h2>
          </Reveal>
        </div>

        <div className="grid gap-4 lg:grid-cols-3">
          {steps.map((s, i) => (
            <Reveal key={s.n} delay={i * 0.12} className={`tile tile-glow ${s.glow} p-8`}>
              <div className="flex items-center justify-between">
                <div className={`grid h-14 w-14 place-items-center rounded-2xl bg-white/5 ${s.accent}`}>
                  <s.icon className="h-7 w-7" strokeWidth={1.7} />
                </div>
                <span className="font-display text-6xl font-extrabold text-white/10">{s.n}</span>
              </div>
              <h3 className="mt-6 font-display text-2xl font-bold text-white">{t(`process.${s.key}`)}</h3>
              <p className="mt-3 text-ink-2">{t(`process.${s.key}Desc`)}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
