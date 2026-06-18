"use client";

import { ShieldCheck, Lock, FileCheck2, BadgeCheck, Scale, Activity } from "lucide-react";
import { useTranslations } from "next-intl";
import { Reveal } from "./motion";

const items = [
  { key: "i1", icon: ShieldCheck },
  { key: "i2", icon: Scale },
  { key: "i3", icon: FileCheck2 },
  { key: "i4", icon: BadgeCheck },
  { key: "i5", icon: Lock },
  { key: "i6", icon: Activity },
] as const;

export default function Certifications() {
  const t = useTranslations();

  return (
    <section className="relative bg-night py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-5">
        <div className="mb-10 max-w-2xl">
          <Reveal>
            <span className="kicker text-brand-teal">{t("certifications.kicker")}</span>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-3 font-display text-3xl font-extrabold leading-[1.05] tracking-[-0.02em] text-white sm:text-4xl">
              {t("certifications.title")}
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-4 text-ink-2">{t("certifications.subtitle")}</p>
          </Reveal>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {items.map((it, i) => (
            <Reveal
              key={it.key}
              delay={(i % 6) * 0.05}
              className="tile flex flex-col items-center gap-3 p-6 text-center"
            >
              <it.icon className="h-8 w-8 text-brand-teal" strokeWidth={1.5} />
              <span className="text-sm font-semibold text-white">{t(`certifications.${it.key}`)}</span>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
