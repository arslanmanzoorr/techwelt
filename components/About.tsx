"use client";

import Image from "next/image";
import { Check } from "lucide-react";
import { useTranslations } from "next-intl";
import { Reveal } from "./motion";

export default function About() {
  const t = useTranslations();
  const points = [t("about.point1"), t("about.point2"), t("about.point3")];

  return (
    <section id="about" className="relative overflow-hidden bg-night py-24 sm:py-32">
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 lg:grid-cols-2">
        <Reveal className="order-2 lg:order-1">
          <div className="tile relative aspect-[4/3] p-0">
            <Image
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1600&q=85"
              alt=""
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-night/70 to-transparent" />
          </div>
        </Reveal>

        <div className="order-1 lg:order-2">
          <Reveal>
            <span className="kicker text-brand-teal">{t("about.kicker")}</span>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-3 font-display text-4xl font-extrabold leading-[1.05] tracking-[-0.02em] text-white sm:text-5xl">
              {t("about.title")}
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 text-lg leading-relaxed text-ink-2">{t("about.body")}</p>
          </Reveal>
          <ul className="mt-8 space-y-4">
            {points.map((p, i) => (
              <Reveal as="li" key={p} delay={0.15 + i * 0.07} className="flex items-start gap-3">
                <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-gradient-to-br from-brand-blue to-brand-teal text-white">
                  <Check className="h-4 w-4" strokeWidth={3} />
                </span>
                <span className="text-ink-1/85">{p}</span>
              </Reveal>
            ))}
          </ul>
          <Reveal delay={0.4}>
            <a href="#process" className="mt-9 inline-flex items-center gap-2 border-b-2 border-brand-teal/40 pb-0.5 font-semibold text-white transition-colors hover:border-brand-teal">
              {t("about.cta")}
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
