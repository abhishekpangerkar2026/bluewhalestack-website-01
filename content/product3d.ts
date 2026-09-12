/**
 * Which 3D product scene (components/scenes/live/registry.ts, captured to
 * content/scenes.generated.ts) represents each edition, industry and solution.
 */

/** Edition → its own scene. */
export const EDITION_3D: Record<string, string> = {
  standard: "edition-standard",
  enterprise: "edition-enterprise",
  "telco-datacenter": "edition-telco-datacenter",
  government: "edition-government",
};

/** Industry slug → its industry scene. */
export const INDUSTRY_3D: Record<string, string> = {
  government: "industry-government",
  bfsi: "industry-bfsi",
  healthcare: "industry-healthcare",
  "regulated-enterprise": "industry-regulated-enterprise",
  saas: "industry-saas",
  telco: "industry-telco",
  datacenter: "industry-datacenter",
};

/** Solution → its own scene. */
export const SOLUTION_3D: Record<string, string> = {
  "unified-cloud-inventory": "solution-unified-cloud-inventory",
  "ai-native-provisioning": "solution-ai-native-provisioning",
  "bundled-observability": "solution-bundled-observability",
  "cloud-migration": "solution-cloud-migration",
  "security-compliance": "solution-security-compliance",
  "sovereign-cloud": "solution-sovereign-cloud",
};
