import type { ModuleGroup } from "@/content/modules";
import type { PhotoKey } from "@/content/photos";

/**
 * Official artwork per capability family (from the September 2026 website
 * image kit): the illustrated tile served from public/modules/, and the
 * studio photograph each family's pages use as their hero.
 */
export const FAMILY_TILE: Record<ModuleGroup, string> = {
  management: "management-delivery",
  whalenomics: "whalenomics-finops",
  security: "security-identity",
  governance: "governance-audit",
  ai: "whale-ai",
  migration: "migration-discovery",
  observability: "observability-itsm",
  tenancy: "tenancy-monetization",
  sovereign: "sovereign-operations",
};

export const familyTileSrc = (g: ModuleGroup, w: 800 | 480 = 800) => `/modules/tile-${FAMILY_TILE[g]}-${w}.webp`;

export const FAMILY_PHOTO: Record<ModuleGroup, PhotoKey> = {
  management: "appliance-enclosure",
  whalenomics: "finops-balance",
  security: "sovereign-vault",
  governance: "editions-rack",
  ai: "edge-tower",
  migration: "migration-wave",
  observability: "discovery-lens",
  tenancy: "datacenter-tray",
  sovereign: "government-hall",
};
