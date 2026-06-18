"use client";

import { useState, useRef, useEffect, useTransition } from "react";
import { useRouter as useNextRouter } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { Globe, Check, ChevronDown, MapPin } from "lucide-react";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { COUNTRY_COOKIE, COUNTRY_ORDER, type CountryCode } from "@/lib/entities";
import { useEntity } from "./EntityProvider";

export default function RegionSwitcher({ dark = true }: { dark?: boolean }) {
  const t = useTranslations();
  const locale = useLocale();
  const { country } = useEntity();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const [pending, startTransition] = useTransition();

  const nextRouter = useNextRouter();
  const intlRouter = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  function chooseCountry(code: CountryCode) {
    // eslint-disable-next-line react-hooks/immutability
    document.cookie = `${COUNTRY_COOKIE}=${code}; path=/; max-age=31536000; samesite=lax`;
    startTransition(() => nextRouter.refresh());
  }

  function chooseLanguage(loc: string) {
    intlRouter.replace(pathname, { locale: loc });
    setOpen(false);
  }

  void dark;

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-label={t("region.label")}
        className="flex items-center gap-1.5 rounded-full px-3 py-2 text-sm font-medium text-ink-2 transition-colors hover:text-white"
      >
        <Globe className="h-4 w-4" />
        <span className="tabular-nums">{country}</span>
        <span className="opacity-40">·</span>
        <span className="uppercase">{locale}</span>
        <ChevronDown className={`h-3.5 w-3.5 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div className="absolute right-0 z-50 mt-2 w-72 overflow-hidden rounded-2xl border border-white/12 bg-night-2 shadow-2xl">
          <div className="border-b border-white/8 px-4 pb-2 pt-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-ink-3">{t("region.country")}</p>
          </div>
          <ul className="p-2">
            {COUNTRY_ORDER.map((code) => {
              const active = code === country;
              return (
                <li key={code}>
                  <button
                    onClick={() => chooseCountry(code)}
                    disabled={pending}
                    className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm transition-colors hover:bg-white/5 ${
                      active ? "font-semibold text-white" : "text-ink-2"
                    }`}
                  >
                    <MapPin className="h-4 w-4 shrink-0 text-brand-teal" />
                    <span className="flex-1">{t(`countries.${code}`)}</span>
                    {active && <Check className="h-4 w-4 text-brand-teal" />}
                  </button>
                </li>
              );
            })}
          </ul>

          <div className="border-b border-t border-white/8 px-4 pb-2 pt-3">
            <p className="text-xs font-semibold uppercase tracking-wider text-ink-3">{t("region.language")}</p>
          </div>
          <ul className="p-2">
            {routing.locales.map((loc) => {
              const active = loc === locale;
              return (
                <li key={loc}>
                  <button
                    onClick={() => chooseLanguage(loc)}
                    className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm transition-colors hover:bg-white/5 ${
                      active ? "font-semibold text-white" : "text-ink-2"
                    }`}
                  >
                    <span className="grid h-5 w-7 place-items-center rounded bg-white/10 text-[10px] font-bold uppercase text-ink-2">
                      {loc}
                    </span>
                    <span className="flex-1">{t(`languages.${loc}`)}</span>
                    {active && <Check className="h-4 w-4 text-brand-teal" />}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
