import type { Metadata } from "next";
import { Bricolage_Grotesque, Hanken_Grotesk } from "next/font/google";
import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { getActiveCountry } from "@/lib/getEntity";
import { ENTITIES } from "@/lib/entities";
import { EntityProvider } from "@/components/EntityProvider";
import "../globals.css";

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const hanken = Hanken_Grotesk({
  subsets: ["latin"],
  variable: "--font-hanken",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

// Content is per-visitor (country from cookie/IP), so render dynamically.
// This is required for IP country-detection to work on first load and
// prevents a stale static shell from causing hydration mismatches.
// (No generateStaticParams: we intentionally do not prerender static shells.)
export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });
  return {
    title: t("title"),
    description: t("description"),
    icons: { icon: "/icon.png" },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!routing.locales.includes(locale as (typeof routing.locales)[number])) {
    notFound();
  }
  setRequestLocale(locale);

  const messages = await getMessages();
  const country = await getActiveCountry();
  const entity = ENTITIES[country];

  return (
    <html lang={locale} className={`${bricolage.variable} ${hanken.variable}`} suppressHydrationWarning>
      <body>
        <NextIntlClientProvider messages={messages}>
          <EntityProvider entity={entity} country={country}>
            {children}
          </EntityProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
