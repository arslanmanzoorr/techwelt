"use client";

import { useTranslations } from "next-intl";
import { Reveal } from "./motion";
import { ScrollReelTestimonials, type ScrollReelTestimonial } from "./ui/scroll-reel-testimonials";

const PORTRAIT = "?auto=format&fit=crop&w=320&h=320&q=85&crop=faces";

const images = [
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e",
  "https://images.unsplash.com/photo-1438761681033-6461ffad8d80",
  "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e",
];

export default function Testimonials() {
  const t = useTranslations();

  const testimonials: ScrollReelTestimonial[] = [1, 2, 3, 4, 5].map((i) => ({
    quote: t(`testimonials.t${i}`),
    author: t(`testimonials.t${i}Author`),
    image: images[i - 1] + PORTRAIT,
  }));

  return (
    <section className="bg-night py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5">
        <div className="mb-14 max-w-2xl">
          <Reveal>
            <span className="kicker text-brand-teal">{t("testimonials.kicker")}</span>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-3 font-display text-4xl font-extrabold leading-[1.05] tracking-[-0.02em] text-white sm:text-5xl">
              {t("testimonials.title")}
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-4 text-lg text-ink-2">{t("testimonials.subtitle")}</p>
          </Reveal>
        </div>

        <Reveal delay={0.1} className="flex justify-center">
          <ScrollReelTestimonials testimonials={testimonials} />
        </Reveal>
      </div>
    </section>
  );
}
