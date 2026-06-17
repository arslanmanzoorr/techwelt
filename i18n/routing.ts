import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en", "it", "de"],
  defaultLocale: "en",
  // en stays at "/", it -> "/it", de -> "/de"
  localePrefix: "as-needed",
});

export type Locale = (typeof routing.locales)[number];
