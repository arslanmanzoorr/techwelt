/**
 * Company entities per country.
 *
 * ──────────────────────────────────────────────────────────────────────────
 *  THIS IS THE ONLY FILE TO EDIT when contact details change.
 *  Add a country by adding an entry here (and a label in messages/*.json under
 *  "countries"). Leave `phone` empty until a real number is available — the UI
 *  hides the call row rather than showing a placeholder number.
 * ──────────────────────────────────────────────────────────────────────────
 */

/** Cookie that stores the visitor's manual country preference. */
export const COUNTRY_COOKIE = "tw_country";

export type CountryCode = "GB" | "IT" | "DE" | "AE";

export interface Entity {
  code: CountryCode;
  /** Registered legal entity name. */
  legalName: string;
  /** English country name; the displayed label is localized via messages. */
  name: string;
  city: string;
  /** International dialing code, e.g. "+44". Used for the phone-field placeholder. */
  dialCode: string;
  addressLines: string[];
  /** Leave empty until a real number is provided — the call row is hidden. */
  phone?: string;
  phoneAlt?: string;
  email: string;
  mapUrl?: string;
}

export const ENTITIES: Record<CountryCode, Entity> = {
  GB: {
    code: "GB",
    legalName: "TechWelt IT Professionals Ltd",
    name: "United Kingdom",
    city: "Manchester",
    dialCode: "+44",
    addressLines: ["11 Milltown Street, Radcliffe", "Manchester M26 1WD, UK"],
    phone: "", // TODO: add a dedicated UK number
    email: "support@techweltit.com",
    mapUrl: "https://maps.google.com/?q=11+Milltown+Street+Radcliffe+Manchester+M26+1WD",
  },
  IT: {
    code: "IT",
    legalName: "TechWelt SRL",
    name: "Italy",
    city: "Rome",
    dialCode: "+39",
    addressLines: ["Via Aversa 15", "00177 Rome, Italy"],
    phone: "+39 350 938 8630",
    phoneAlt: "+39 329 306 3324",
    email: "support@techweltit.com",
    mapUrl: "https://maps.google.com/?q=Via+Aversa+15+00177+Rome",
  },
  DE: {
    code: "DE",
    legalName: "TechWelt",
    name: "Germany",
    city: "Straßlach-Dingharting",
    dialCode: "+49",
    addressLines: ["Gewerbestraße 13", "82064 Straßlach-Dingharting, Germany"],
    phone: "", // TODO: add a German number
    email: "support@techweltit.com",
    mapUrl: "https://maps.google.com/?q=Gewerbestrasse+13+82064+Strasslach-Dingharting+Germany",
  },
  AE: {
    code: "AE",
    legalName: "TechWelt L.L.C-FZ",
    name: "United Arab Emirates",
    city: "Dubai",
    dialCode: "+971",
    addressLines: ["Meydan Grandstand, 6th floor", "Meydan Road, Nad Al Sheba, Dubai"],
    phone: "", // TODO: add a UAE number
    email: "support@techweltit.com",
    mapUrl: "https://maps.google.com/?q=Meydan+Grandstand+Nad+Al+Sheba+Dubai",
  },
};

export const DEFAULT_COUNTRY: CountryCode = "GB";

/** Order shown in the region switcher. */
export const COUNTRY_ORDER: CountryCode[] = ["GB", "IT", "DE", "AE"];

export function resolveCountry(code?: string | null): CountryCode {
  const up = (code ?? "").toUpperCase();
  return (up in ENTITIES ? (up as CountryCode) : DEFAULT_COUNTRY);
}
