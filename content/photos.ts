/**
 * The studio photograph set — sixteen white-studio renders of the platform's
 * ideas (silver + royal blue on white), supplied 2026-09-21 and served from
 * public/photos/<key>-{1536,1024,640}.webp. Every hero on the site picks one
 * by key; keep the alt text descriptive, these are not decorative.
 */

export type PhotoKey =
  | "platform-stack"
  | "appliance-enclosure"
  | "sovereign-vault"
  | "finops-balance"
  | "migration-wave"
  | "editions-rack"
  | "hybrid-bridge"
  | "discovery-lens"
  | "estates-row"
  | "datacenter-tray"
  | "edge-tower"
  | "enterprise-campus"
  | "telco-datacenter"
  | "government-hall"
  | "sovereign-regions"
  | "dark-gateway";

export interface Photo {
  key: PhotoKey;
  alt: string;
  width: number;
  height: number;
  /** object-position for cover crops */
  focal?: string;
  /** true for the one night-studio image, used on dark bands */
  dark?: boolean;
}

export const photos: Record<PhotoKey, Photo> = {
  "platform-stack": { key: "platform-stack", alt: "Three stacked glass-and-steel platform layers with servers, storage and racks connected to them by blue lines", width: 1254, height: 1254, focal: "50% 50%" },
  "appliance-enclosure": { key: "appliance-enclosure", alt: "A royal-blue enclosure with silver server modules sliding into it", width: 1536, height: 1024 },
  "sovereign-vault": { key: "sovereign-vault", alt: "Nested glass vault walls around a blue core, on a white studio floor", width: 1536, height: 1024 },
  "finops-balance": { key: "finops-balance", alt: "A steel balance scale weighing glass blocks against a blue block", width: 1536, height: 1024 },
  "migration-wave": { key: "migration-wave", alt: "A blue-and-glass wave flowing into a cluster of silver server blocks", width: 1536, height: 1024 },
  "editions-rack": { key: "editions-rack", alt: "Glass panels standing in a steel rack, one of them royal blue", width: 1536, height: 1024 },
  "hybrid-bridge": { key: "hybrid-bridge", alt: "A blue bridge carrying glass blocks between two silver campuses", width: 1536, height: 1024 },
  "discovery-lens": { key: "discovery-lens", alt: "A blue magnifying lens over a field of small silver servers and databases", width: 1536, height: 1024 },
  "estates-row": { key: "estates-row", alt: "Six glass boxes on a blue-lit steel rail, each holding a different kind of infrastructure", width: 1536, height: 1024 },
  "datacenter-tray": { key: "datacenter-tray", alt: "Rows of silver racks inside an oval blue tray", width: 1536, height: 1024 },
  "edge-tower": { key: "edge-tower", alt: "A perforated steel tower with a blue face and a small cube beside it", width: 1536, height: 1024 },
  "enterprise-campus": { key: "enterprise-campus", alt: "A campus of glass buildings on a royal-blue frame", width: 1536, height: 1024 },
  "telco-datacenter": { key: "telco-datacenter", alt: "An open datacenter hall with rack rows and a telecom mast", width: 1536, height: 1024 },
  "government-hall": { key: "government-hall", alt: "A colonnaded public building standing on a blue plinth with servers beneath it", width: 1536, height: 1024 },
  "sovereign-regions": { key: "sovereign-regions", alt: "A chain of glass-domed campuses linked by a blue path", width: 1672, height: 941, focal: "50% 60%" },
  "dark-gateway": { key: "dark-gateway", alt: "A blue gateway glowing in a dark studio, a blue path leading to it", width: 1916, height: 821, dark: true, focal: "70% 50%" },
};

/** The studio photograph that carries each edition's idea (also used to seed the CMS). */
export const EDITION_PHOTO: Record<string, PhotoKey> = {
  standard: "editions-rack",
  enterprise: "enterprise-campus",
  "telco-datacenter": "telco-datacenter",
  government: "government-hall",
};

export const INDUSTRY_PHOTO: Record<string, PhotoKey> = {
  government: "government-hall",
  bfsi: "finops-balance",
  healthcare: "sovereign-vault",
  "regulated-enterprise": "enterprise-campus",
  saas: "estates-row",
  telco: "telco-datacenter",
  datacenter: "datacenter-tray",
  media: "hybrid-bridge",
};

export const SOLUTION_PHOTO: Record<string, PhotoKey> = {
  "unified-cloud-inventory": "discovery-lens",
  "ai-native-provisioning": "appliance-enclosure",
  "bundled-observability": "estates-row",
  "cloud-migration": "migration-wave",
  "security-compliance": "sovereign-vault",
  "sovereign-cloud": "sovereign-regions",
};

export const DOC_PHOTO: Record<string, PhotoKey> = {
  Whitepaper: "editions-rack",
  Datasheet: "estates-row",
  "Solution brief": "hybrid-bridge",
  "Industry brief": "enterprise-campus",
  "Case study": "discovery-lens",
  Company: "sovereign-regions",
};

/** The photograph on each static page's hero, by route (used to seed the CMS page heroes). */
export const ROUTE_PHOTO: Record<string, PhotoKey> = {
  "/platform": "estates-row",
  "/modules": "platform-stack",
  "/editions": "editions-rack",
  "/industries": "enterprise-campus",
  "/solutions": "hybrid-bridge",
  "/resources": "discovery-lens",
  "/products": "appliance-enclosure",
  "/trust": "sovereign-vault",
  "/partners": "hybrid-bridge",
  "/pricing": "finops-balance",
  "/about": "sovereign-regions",
  "/careers": "datacenter-tray",
  "/customers": "enterprise-campus",
  "/case-studies": "dark-gateway",
  "/fabric": "sovereign-regions",
  "/products/whale-ai": "dark-gateway",
  "/newsroom": "edge-tower",
};

export const photoSrc = (key: PhotoKey, w: 1536 | 1024 | 640 = 1536) => `/photos/${key}-${w}.webp`;

export const photoSrcSet = (key: PhotoKey) =>
  `${photoSrc(key, 640)} 640w, ${photoSrc(key, 1024)} 1024w, ${photoSrc(key, 1536)} 1536w`;
