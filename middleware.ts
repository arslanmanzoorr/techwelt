import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

// Locale detection: NEXT_LOCALE cookie -> Accept-Language header -> default.
// Country/entity is resolved separately on the server (IP header + preference
// cookie) so language and country stay independent.
export default createMiddleware(routing);

export const config = {
  // Exclude api, admin, and static assets from locale handling.
  matcher: ["/((?!api|admin|_next|_vercel|.*\\..*).*)"],
};
