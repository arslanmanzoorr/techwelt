import createMiddleware from "next-intl/middleware";
import { NextRequest } from "next/server";
import { routing } from "./i18n/routing";

// Locale priority: manual choice (NEXT_LOCALE cookie) -> visitor's country
// (Vercel IP geo) -> Accept-Language -> default. So location drives both the
// office AND the UI language, while a manual pick in the switcher always wins.
// (Next 16 renamed the "middleware" convention to "proxy".)
const handle = createMiddleware(routing);

const COUNTRY_TO_LOCALE: Record<string, string> = {
  IT: "it",
  DE: "de",
  // GB / AE / everywhere else -> default locale (English)
};

export default function proxy(request: NextRequest) {
  if (!request.cookies.has("NEXT_LOCALE")) {
    const country = (request.headers.get("x-vercel-ip-country") ?? "").toUpperCase();
    const locale = COUNTRY_TO_LOCALE[country];
    if (locale) {
      // Bias next-intl's detection toward the country's language by cloning the
      // request with an Accept-Language that matches.
      const headers = new Headers(request.headers);
      headers.set("accept-language", locale);
      return handle(new NextRequest(request.url, { headers }));
    }
  }
  return handle(request);
}

export const config = {
  // Exclude api, admin, and static assets from locale handling.
  matcher: ["/((?!api|admin|_next|_vercel|.*\\..*).*)"],
};
