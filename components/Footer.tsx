"use client";

import Image from "next/image";
import { Linkedin, Twitter, Facebook, ArrowUp, MapPin } from "lucide-react";
import { useTranslations } from "next-intl";
import { COUNTRY_ORDER, ENTITIES } from "@/lib/entities";
import { useEntity } from "./EntityProvider";

export default function Footer() {
  const t = useTranslations();
  const { country } = useEntity();

  const cols = [
    { title: t("footer.services"), links: [
      t("services.cyber.title"), t("services.asset.title"), t("services.staffing.title"),
      t("services.support.title"), t("services.desk.title"),
    ] },
    { title: t("footer.company"), links: [
      t("footer.about"), t("footer.process"), t("footer.industries"), t("footer.insights"), t("footer.careers"),
    ] },
    { title: t("footer.support"), links: [
      t("footer.contact"), t("footer.faqs"), t("footer.serviceDesk"), t("footer.privacy"), t("footer.terms"),
    ] },
  ];

  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-night-2 text-white">
      <div className="relative mx-auto max-w-7xl px-5 py-16">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-3">
              <Image src="/mark.png" alt="Techwelt" width={52} height={40} className="h-9 w-auto" />
              <span className="font-display text-2xl font-extrabold">
                Tech<span className="text-brand-teal">welt</span>
              </span>
            </div>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-white/55">{t("footer.tagline")}</p>

            {/* offices */}
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
              {[Linkedin, Twitter, Facebook].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  aria-label="social link"
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
                  <li key={l}>
                    <a href="#" className="text-sm text-white/55 transition-colors hover:text-white">{l}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-7 text-sm text-white/45 sm:flex-row">
          <p>© {new Date().getFullYear()} Techwelt. {t("footer.rights")}</p>
          <a href="#top" className="inline-flex items-center gap-1.5 transition-colors hover:text-white">
            {t("footer.backToTop")} <ArrowUp className="h-4 w-4" />
          </a>
        </div>
      </div>
    </footer>
  );
}
