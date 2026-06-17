"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, ArrowUpRight, ChevronDown } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import RegionSwitcher from "./RegionSwitcher";

const serviceKeys = ["cyber", "asset", "staffing", "support", "desk"] as const;

export default function Navbar() {
  const t = useTranslations();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [mega, setMega] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { label: t("nav.about"), href: "/about" },
    { label: t("nav.industries"), href: "/industries" },
    { label: t("nav.news"), href: "/news" },
    { label: t("nav.faqs"), href: "/faqs" },
    { label: t("nav.contact"), href: "/contact" },
  ];

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300 ${
        scrolled ? "border-white/10 bg-night/80 backdrop-blur-xl" : "border-transparent bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3.5">
        <Link href="/" className="flex items-center gap-2.5">
          <Image src="/mark.png" alt="Techwelt" width={40} height={32} className="h-8 w-auto" priority />
          <span className="font-display text-xl font-extrabold tracking-tight text-white">
            Tech<span className="text-brand-teal">welt</span>
          </span>
        </Link>

        <div className="hidden items-center gap-1 lg:flex">
          <div className="relative" onMouseEnter={() => setMega(true)} onMouseLeave={() => setMega(false)}>
            <button className="flex items-center gap-1 rounded-full px-4 py-2 text-sm font-medium text-ink-2 transition-colors hover:text-white">
              {t("nav.services")}
              <ChevronDown className={`h-3.5 w-3.5 transition-transform ${mega ? "rotate-180" : ""}`} />
            </button>
            <AnimatePresence>
              {mega && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ duration: 0.2 }}
                  className="absolute left-1/2 top-full w-[34rem] -translate-x-1/2 pt-3"
                >
                  <div className="overflow-hidden rounded-2xl border border-white/10 bg-night-2 p-3 shadow-2xl">
                    <p className="px-3 pb-2 pt-1 text-xs font-semibold uppercase tracking-wider text-ink-3">
                      {t("nav.servicesHeading")}
                    </p>
                    <div className="grid grid-cols-2 gap-1">
                      {serviceKeys.map((k) => (
                        <Link key={k} href="/services" className="group rounded-xl px-3 py-2.5 transition-colors hover:bg-white/5">
                          <span className="block text-sm font-semibold text-white group-hover:text-brand-teal">
                            {t(`services.${k}.title`)}
                          </span>
                        </Link>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {links.map((l) => (
            <Link key={l.label} href={l.href} className="rounded-full px-4 py-2 text-sm font-medium text-ink-2 transition-colors hover:text-white">
              {l.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-1.5">
          <div className="hidden lg:block">
            <RegionSwitcher />
          </div>
          <Link
            href="/contact"
            className="group ml-1 hidden items-center gap-1.5 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-brand-ink transition-colors hover:bg-brand-blue hover:text-white sm:inline-flex"
          >
            {t("nav.cta")}
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
          <button onClick={() => setOpen((v) => !v)} aria-label="Menu" className="grid h-11 w-11 place-items-center rounded-full text-white lg:hidden">
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden border-t border-white/10 bg-night-2 lg:hidden"
          >
            <div className="px-5 py-4">
              <Link href="/services" onClick={() => setOpen(false)} className="block rounded-xl px-4 py-3 text-lg font-medium text-ink-2 hover:bg-white/5">
                {t("nav.services")}
              </Link>
              {links.map((l) => (
                <Link key={l.label} href={l.href} onClick={() => setOpen(false)} className="block rounded-xl px-4 py-3 text-lg font-medium text-ink-2 hover:bg-white/5">
                  {l.label}
                </Link>
              ))}
              <div className="mt-3 border-t border-white/10 pt-3">
                <RegionSwitcher dark />
              </div>
              <Link href="/contact" onClick={() => setOpen(false)} className="mt-3 block rounded-full bg-white px-4 py-3 text-center text-lg font-semibold text-brand-ink">
                {t("nav.cta")}
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
