import { getTranslations } from "next-intl/server";
import { Reveal } from "./motion";
import { ScrollReelTestimonials, type ScrollReelTestimonial } from "./ui/scroll-reel-testimonials";
import { listPublishedReviews } from "@/lib/db";

const PORTRAIT = "?auto=format&fit=crop&w=320&h=320&q=85&crop=faces";

const fallbackImages = [
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e",
  "https://images.unsplash.com/photo-1438761681033-6461ffad8d80",
  "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e",
];

function authorLine(name: string, position: string, company: string) {
  const role = [position, company].filter(Boolean).join(", ");
  return role ? `${name} — ${role}` : name;
}

export default async function Testimonials() {
  const t = await getTranslations();
  const reviews = await listPublishedReviews();

  const testimonials: ScrollReelTestimonial[] = reviews.length
    ? reviews.map((r, i) => ({
        quote: r.quote,
        author: authorLine(r.name, r.position, r.company),
        image: r.image || fallbackImages[i % fallbackImages.length] + PORTRAIT,
      }))
    : [1, 2, 3, 4, 5].map((i) => ({
        quote: t(`testimonials.t${i}`),
        author: t(`testimonials.t${i}Author`),
        image: fallbackImages[i - 1] + PORTRAIT,
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
