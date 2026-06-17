"use client";

import { useState } from "react";
import { Mail, Phone, MapPin, ArrowRight, Check } from "lucide-react";
import { useTranslations } from "next-intl";
import { Reveal } from "./motion";
import { useEntity } from "./EntityProvider";

export default function Contact() {
  const t = useTranslations();
  const { entity, country } = useEntity();
  const [sent, setSent] = useState(false);

  const telHref = entity.phone ? `tel:${entity.phone.replace(/[^+\d]/g, "")}` : undefined;

  return (
    <section id="contact" className="relative overflow-hidden bg-night py-24 sm:py-32">
      <div className="pointer-events-none absolute -left-20 top-10 h-72 w-72 rounded-full bg-brand-blue/15 blur-[120px]" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-80 w-80 rounded-full bg-brand-magenta/10 blur-[130px]" />

      <div className="relative mx-auto grid max-w-7xl items-start gap-8 px-5 lg:grid-cols-2">
        <div>
          <Reveal>
            <span className="kicker text-brand-teal">{t("contact.kicker")}</span>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-3 font-display text-4xl font-extrabold leading-[1.05] tracking-[-0.02em] text-white sm:text-5xl">
              {t("contact.titlePre")} <span className="text-gradient">{t("contact.titleAccent")}</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-5 max-w-md text-lg text-ink-2">{t("contact.body")}</p>
          </Reveal>

          {/* active office tile — driven by detected/selected country */}
          <Reveal delay={0.15}>
            <div className="tile tile-glow glow-teal mt-8 p-6">
              <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-ink-3">
                <MapPin className="h-4 w-4 text-brand-teal" />
                {t("contact.officeLabel")} · {t(`countries.${country}`)}
              </div>
              <p className="mt-3 font-display text-xl font-bold text-white">{entity.city}</p>
              <p className="mt-0.5 text-sm text-ink-3">{entity.legalName}</p>
              <p className="mt-2 text-ink-2">
                {entity.addressLines.map((line) => (
                  <span key={line} className="block">{line}</span>
                ))}
              </p>

              <div className="mt-5 grid gap-3 border-t border-white/10 pt-5 sm:grid-cols-2">
                <a href={`mailto:${entity.email}`} className="group flex items-center gap-3">
                  <span className="grid h-10 w-10 place-items-center rounded-xl bg-white/5 text-brand-teal transition-colors group-hover:bg-brand-teal group-hover:text-night">
                    <Mail className="h-4 w-4" />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-xs text-ink-3">{t("contact.emailLabel")}</span>
                    <span className="block truncate font-semibold text-white">{entity.email}</span>
                  </span>
                </a>
                {entity.phone && (
                  <a href={telHref} className="group flex items-center gap-3">
                    <span className="grid h-10 w-10 place-items-center rounded-xl bg-white/5 text-brand-teal transition-colors group-hover:bg-brand-teal group-hover:text-night">
                      <Phone className="h-4 w-4" />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-xs text-ink-3">{t("contact.callLabel")}</span>
                      <span className="block font-semibold text-white">{entity.phone}</span>
                    </span>
                  </a>
                )}
              </div>
            </div>
          </Reveal>
        </div>

        {/* form */}
        <Reveal delay={0.1} className="tile p-7 sm:p-9">
          {sent ? (
            <div className="flex h-full min-h-[26rem] flex-col items-center justify-center text-center">
              <span className="grid h-16 w-16 place-items-center rounded-full bg-gradient-to-br from-brand-blue to-brand-teal text-white">
                <Check className="h-8 w-8" strokeWidth={3} />
              </span>
              <h3 className="mt-6 font-display text-2xl font-bold text-white">{t("contact.successTitle")}</h3>
              <p className="mt-2 max-w-xs text-ink-2">{t("contact.successBody")}</p>
            </div>
          ) : (
            <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label={t("contact.name")} name="name" placeholder={t("contact.namePh")} />
                <Field label={t("contact.email")} name="email" type="email" placeholder={t("contact.emailPh")} />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label={t("contact.company")} name="company" placeholder={t("contact.companyPh")} />
                <Field label={t("contact.phone")} name="phone" type="tel" placeholder={t("contact.phonePh")} required={false} />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-ink-2">{t("contact.message")}</label>
                <textarea
                  name="message"
                  rows={4}
                  required
                  placeholder={t("contact.messagePh")}
                  className="w-full rounded-xl border border-white/12 bg-white/5 px-4 py-3 text-white outline-none transition-colors placeholder:text-ink-3 focus:border-brand-teal focus:bg-white/10"
                />
              </div>
              <button type="submit" className="group flex w-full items-center justify-center gap-2 rounded-full bg-white px-7 py-4 font-semibold text-brand-ink transition-colors hover:bg-brand-blue hover:text-white">
                {t("contact.submit")}
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </button>
              <p className="text-center text-xs text-ink-3">{t("contact.privacy")}</p>
            </form>
          )}
        </Reveal>
      </div>
    </section>
  );
}

function Field({
  label,
  name,
  type = "text",
  placeholder,
  required = true,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-ink-2">{label}</label>
      <input
        type={type}
        name={name}
        required={required}
        placeholder={placeholder}
        className="w-full rounded-xl border border-white/12 bg-white/5 px-4 py-3 text-white outline-none transition-colors placeholder:text-ink-3 focus:border-brand-teal focus:bg-white/10"
      />
    </div>
  );
}
