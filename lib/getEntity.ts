import { cookies, headers } from "next/headers";
import { COUNTRY_COOKIE, ENTITIES, resolveCountry, type CountryCode, type Entity } from "./entities";

/**
 * Resolve the visitor's country, server-side.
 * Priority: manual preference cookie -> Vercel IP geo header -> default (UK).
 * Language and country are intentionally independent.
 */
export async function getActiveCountry(): Promise<CountryCode> {
  const cookieStore = await cookies();
  const pref = cookieStore.get(COUNTRY_COOKIE)?.value;
  if (pref) return resolveCountry(pref);

  const headerStore = await headers();
  const ip =
    headerStore.get("x-vercel-ip-country") ??
    headerStore.get("x-country") ?? // generic fallback for other hosts
    null;
  return resolveCountry(ip);
}

export async function getActiveEntity(): Promise<Entity> {
  return ENTITIES[await getActiveCountry()];
}
