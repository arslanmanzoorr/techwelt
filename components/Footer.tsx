"use client";

import Image from "next/image";
import { Linkedin, Twitter, Facebook, ArrowUp, MapPin } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { COUNTRY_ORDER, ENTITIES } from "@/lib/entities";
import { SERVICE_SLUGS } from "@/lib/services";
import { SOCIALS } from "@/lib/site";
import { useEntity } from "./EntityProvider";

export default function Footer() {
  const t = useTranslations();
  const { country } = useEntity();

  const cols = [
    {
      title: t("footer.services"),
      links: [
        { label: t("services.strategy.title"), href: `/services/${SERVICE_SLUGS.strategy}` },
        { label: t("services.ai.title"), href: `/services/${SERVICE_SLUGS.ai}` },
        { label: t("services.cloud.title"), href: `/services/${SERVICE_SLUGS.cloud}` },
        { label: t("services.cyber.title"), href: `/services/${SERVICE_SLUGS.cyber}` },
        { label: t("services.managed.title"), href: `/services/${SERVICE_SLUGS.managed}` },
        { label: t("services.staffing.title"), href: `/services/${SERVICE_SLUGS.staffing}` },
      ],
    },
    {
      title: t("footer.company"),
      links: [
        { label: t("footer.about"), href: "/about" },
        { label: t("footer.process"), href: "/about" },
        { label: t("footer.industries"), href: "/industries" },
        { label: t("footer.insights"), href: "/news" },
        { label: t("footer.careers"), href: "/careers" },
      ],
    },
    {
      title: t("footer.support"),
      links: [
        { label: t("footer.contact"), href: "/contact" },
        { label: t("footer.faqs"), href: "/faqs" },
        { label: t("footer.serviceDesk"), href: `/services/${SERVICE_SLUGS.managed}` },
        { label: t("footer.privacy"), href: "/privacy" },
        { label: t("footer.terms"), href: "/terms" },
      ],
    },
  ];

  const socials = [
    { Icon: Linkedin, href: SOCIALS.linkedin, label: "LinkedIn" },
    { Icon: Twitter, href: SOCIALS.twitter, label: "X (Twitter)" },
    { Icon: Facebook, href: SOCIALS.facebook, label: "Facebook" },
  ].filter((s) => s.href);

  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-night-2 text-white">
      <div className="relative mx-auto max-w-7xl px-5 py-16">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Link href="/" className="flex items-center gap-3">
              <Image src="/mark.png" alt="Techwelt" width={52} height={40} className="h-9 w-auto" />
              <span className="font-display text-2xl font-extrabold">
                Tech<span className="text-brand-teal">welt</span>
              </span>
            </Link>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-white/55">{t("footer.tagline")}</p>

            <ul className="mt-6 space-y-2">
              {COUNTRY_ORDER.map((code) => (
                <li
                  key={code}
                  className={`flex items-center gap-2 text-sm ${code === country ? "text-white" : "text-white/45"}`}
                >
                  <MapPin className={`h-3.5 w-3.5 ${code === country ? "text-brand-teal" : "text-white/30"}`} />
                  {t(`countries.${code}`)} — {ENTITIES[code].city}
                </li>
              ))}
            </ul>

            <div className="mt-6 flex gap-3">
              {socials.map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="grid h-10 w-10 place-items-center rounded-full border border-white/15 text-white/70 transition-colors hover:border-brand-teal hover:text-brand-teal"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {cols.map((c) => (
            <div key={c.title}>
              <h4 className="font-display font-bold">{c.title}</h4>
              <ul className="mt-4 space-y-2.5">
                {c.links.map((l) => (
                  <li key={l.label}>
                    <Link href={l.href} className="text-sm text-white/55 transition-colors hover:text-white">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-7 text-sm text-white/45 sm:flex-row">
          <p>© {new Date().getFullYear()} Techwelt. {t("footer.rights")}</p>
          <Link href="/" className="inline-flex items-center gap-1.5 transition-colors hover:text-white">
            {t("footer.backToTop")} <ArrowUp className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </footer>
  );
}
