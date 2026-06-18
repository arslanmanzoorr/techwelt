/** Canonical service list + slug mapping, shared by the grid, mega-menu and detail pages. */
export const SERVICE_KEYS = [
  "strategy",
  "ai",
  "cloud",
  "cyber",
  "software",
  "managed",
  "assets",
  "staffing",
  "engineering",
  "platforms",
  "automation",
  "experience",
] as const;

export type ServiceKey = (typeof SERVICE_KEYS)[number];

export const SERVICE_SLUGS: Record<ServiceKey, string> = {
  strategy: "strategy-consulting",
  ai: "ai-and-data",
  cloud: "cloud-services",
  cyber: "cybersecurity",
  software: "software-engineering",
  managed: "managed-it",
  assets: "it-asset-lifecycle",
  staffing: "it-staffing",
  engineering: "digital-engineering",
  platforms: "enterprise-platforms",
  automation: "intelligent-automation",
  experience: "customer-experience",
};

const SLUG_TO_KEY: Record<string, ServiceKey> = Object.fromEntries(
  (Object.entries(SERVICE_SLUGS) as [ServiceKey, string][]).map(([k, s]) => [s, k])
);

export function keyFromSlug(slug: string): ServiceKey | null {
  return SLUG_TO_KEY[slug] ?? null;
}

export const SERVICE_SLUG_LIST = Object.values(SERVICE_SLUGS);
