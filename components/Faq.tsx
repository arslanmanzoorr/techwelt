"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Reveal } from "./motion";

const keys = ["1", "2", "3", "4", "5"] as const;

export default function Faq() {
  const t = useTranslations();
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faqs" className="bg-night-2 py-24 sm:py-32">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <Reveal>
            <span className="kicker text-brand-teal">{t("faq.kicker")}</span>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-3 font-display text-4xl font-extrabold leading-[1.05] tracking-[-0.02em] text-white sm:text-5xl">
              {t("faq.title")}
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-4 text-ink-2">{t("faq.body")}</p>
          </Reveal>
          <Reveal delay={0.15}>
            <Link href="/contact" className="mt-6 inline-flex rounded-full bg-white px-6 py-3 font-semibold text-brand-ink transition-colors hover:bg-brand-blue hover:text-white">
              {t("faq.cta")}
            </Link>
          </Reveal>
        </div>

        <div className="divide-y divide-white/10">
          {keys.map((k, i) => {
            const isOpen = open === i;
            return (
              <Reveal key={k} delay={i * 0.05}>
                <button onClick={() => setOpen(isOpen ? null : i)} className="flex w-full items-center justify-between gap-4 py-5 text-left">
                  <span className="font-display text-lg font-semibold text-white sm:text-xl">{t(`faq.q${k}`)}</span>
                  <span className={`grid h-9 w-9 shrink-0 place-items-center rounded-full border transition-all duration-300 ${isOpen ? "rotate-45 border-white bg-white text-brand-ink" : "border-white/20 text-white"}`}>
                    <Plus className="h-5 w-5" />
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3, ease: "easeInOut" }} className="overflow-hidden">
                      <p className="pb-6 pr-12 text-ink-2">{t(`faq.a${k}`)}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
