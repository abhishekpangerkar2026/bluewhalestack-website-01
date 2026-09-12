/**
 * Which native 3D product scene (content/scenes.generated.ts, rendered by
 * scripts/render-scene.mjs) represents each edition and solution.
 */
import type { SceneKey } from "@/content/scenes.generated";

/** Edition → the scene that best represents it. */
export const EDITION_3D: Record<string, SceneKey> = {
  standard: "inventory",
  enterprise: "platform",
  "telco-datacenter": "tenancy",
  government: "sovereign-operations",
};

/** Industry slug → its industry scene. */
export const INDUSTRY_3D: Record<string, SceneKey> = {
  government: "industry-government",
  bfsi: "industry-bfsi",
  healthcare: "industry-healthcare",
  "regulated-enterprise": "industry-regulated-enterprise",
  saas: "industry-saas",
  telco: "industry-telco",
  datacenter: "industry-datacenter",
};

/** Solution → the module scene behind it. */
export const SOLUTION_3D: Record<string, SceneKey> = {
  "unified-cloud-inventory": "inventory",
  "ai-native-provisioning": "provisioning",
  "bundled-observability": "observe",
  "cloud-migration": "migration",
  "security-compliance": "cloud-audit",
  "sovereign-cloud": "sovereign-operations",
};
