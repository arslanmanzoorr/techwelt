"use client";

import { useTranslations } from "next-intl";

const platforms = [
  "Microsoft 365",
  "Azure",
  "AWS",
  "Cisco",
  "Fortinet",
  "VMware",
  "CrowdStrike",
  "ServiceNow",
  "Okta",
  "Veeam",
  "SentinelOne",
  "Google Cloud",
];

export default function Marquee() {
  const t = useTranslations();
  const row = [...platforms, ...platforms];
  return (
    <section className="border-y border-white/10 bg-night py-10">
      <p className="mb-7 text-center text-sm font-medium uppercase tracking-[0.22em] text-ink-3">
        {t("marquee.title")}
      </p>
      <div className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,#000_12%,#000_88%,transparent)]">
        <div className="flex w-max animate-[marquee_38s_linear_infinite] items-center gap-12 pr-12">
          {row.map((p, i) => (
            <span
              key={i}
              className="select-none whitespace-nowrap font-display text-2xl font-semibold text-white/30 transition-colors hover:text-white/70 sm:text-3xl"
            >
              {p}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
