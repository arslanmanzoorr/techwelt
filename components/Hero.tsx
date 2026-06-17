"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { useTranslations } from "next-intl";
import { Counter } from "./motion";
import { GlowyWaves } from "./ui/glowy-waves";

const statTiles = [
  { n: 92, suffix: "%", key: "satisfaction", glow: "glow-blue", accent: "text-brand-blue" },
  { n: 24, suffix: "/7", key: "support", glow: "glow-teal", accent: "text-brand-teal" },
  { n: 3, suffix: "", key: "countries", glow: "glow-orange", accent: "text-brand-orange" },
  { n: 15, suffix: "+", key: "experience", glow: "glow-magenta", accent: "text-brand-magenta" },
] as const;

export default function Hero() {
  const t = useTranslations();

  return (
    <section id="top" className="relative overflow-hidden bg-night pt-32 pb-20 sm:pt-40">
      <GlowyWaves className="pointer-events-none absolute inset-0 h-full w-full opacity-90 [mask-image:linear-gradient(to_bottom,#000_60%,transparent)]" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-night/40 via-night/30 to-night" />

      <div className="relative mx-auto max-w-7xl px-5">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mx-auto mb-7 flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm text-ink-2"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-teal opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-teal" />
          </span>
          {t("hero.badge")}
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.05 }}
          className="mx-auto max-w-4xl text-center font-display text-[2.9rem] font-extrabold leading-[0.98] tracking-[-0.02em] text-white sm:text-6xl lg:text-7xl"
        >
          {t("hero.titlePre")} <span className="text-gradient">{t("hero.titleAccent")}</span> {t("hero.titlePost")}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="mx-auto mt-7 max-w-2xl text-center text-lg leading-relaxed text-ink-2"
        >
          {t("hero.subtitle")}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25 }}
          className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <a
            href="#contact"
            className="group inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-4 text-base font-semibold text-brand-ink transition-colors hover:bg-brand-blue hover:text-white"
          >
            {t("hero.ctaPrimary")}
            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
          </a>
          <a href="#services" className="group inline-flex items-center gap-2 text-base font-semibold text-white">
            <span className="border-b-2 border-brand-teal/40 pb-0.5 transition-colors group-hover:border-brand-teal">
              {t("hero.ctaSecondary")}
            </span>
            <ArrowRight className="h-4 w-4 text-brand-teal transition-transform group-hover:translate-x-1" />
          </a>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.45, duration: 0.7 }}
          className="mt-6 flex items-center justify-center gap-2 text-sm text-ink-3"
        >
          <ShieldCheck className="h-4 w-4 text-brand-teal" />
          {t("hero.trust")}
        </motion.p>

        {/* bento cluster */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="mt-14 grid auto-rows-[150px] grid-cols-2 gap-4 lg:grid-cols-4"
        >
          {/* image tile */}
          <div className="tile col-span-2 row-span-2 p-0">
            <Image
              src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1100&q=80"
              alt=""
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-night via-night/30 to-transparent" />
            <div className="absolute bottom-0 left-0 p-6">
              <p className="font-display text-xl font-bold text-white">{t("nav.servicesHeading")}</p>
              <p className="mt-1 text-sm text-white/70">{t("hero.badge")}</p>
            </div>
          </div>

          {statTiles.map((s) => (
            <div key={s.key} className={`tile tile-glow ${s.glow} flex flex-col justify-center p-6`}>
              <p className={`font-display text-4xl font-extrabold ${s.accent}`}>
                <Counter to={s.n} suffix={s.suffix} />
              </p>
              <p className="mt-1.5 text-sm text-ink-2">{t(`stats.${s.key}`)}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
