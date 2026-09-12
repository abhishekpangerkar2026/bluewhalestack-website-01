/**
 * 3D product architecture imagery — the official CGI set (15 × 1600×900 JPEG)
 * from D:\BlueWhale Stack 2026\Product 3D Images\…\Product 3D Images, copied
 * to /public/product-3d/modules/<slug>.jpg (+ a 960px variant for cards).
 * Keys are module slugs plus "platform" for the Unified Platform Architecture.
 * These are conceptual system-architecture illustrations, not implementation LLDs.
 */

export interface Product3DImage {
  src: string;
  src960: string;
  alt: string;
}

const img = (slug: string, alt: string): Product3DImage => ({
  src: `/product-3d/modules/${slug}.jpg`,
  src960: `/product-3d/modules/${slug}-960.jpg`,
  alt,
});

export const product3d = {
  platform: img("platform", "BlueWhale Stack unified platform architecture — public cloud, private & hybrid and sovereign & edge estates connected to one control plane with identity, policy, audit, connectors and inventory"),
  "cloud-connectors": img("cloud-connectors", "Cloud Connectors — AWS, Azure, Google Cloud, Oracle, Alibaba and Huawei plus private VMware and Hyper-V infrastructure connected through the Edge Agent into one unified inventory"),
  provisioning: img("provisioning", "Service Catalog — governed self-service provisioning of approved cloud resources"),
  "landing-zone": img("landing-zone", "Landing Zone Builder — compliant cloud foundations designed visually"),
  whaleforge: img("whaleforge", "WhaleForge IaC — YAML infrastructure compiled to Terraform with live architecture diagrams"),
  finops: img("finops", "Whalenomics · FinOps — cloud costs explained per workload and tenant with Whale AI FinOps"),
  identity: img("identity", "Identity & Access — one identity fabric across every connected cloud"),
  "cloud-audit": img("cloud-audit", "Cloud Audit & Evidence — controls monitored continuously, examiner-grade evidence on demand"),
  "whale-ai": img("whale-ai", "Whale AI — Spark, Tide and Abyss tiers bringing contextual AI to operations, documentation and compliance, with offline in-region models"),
  inventory: img("inventory", "Inventory & Discovery — a live unified map of every asset across every cloud and on-prem"),
  migration: img("migration", "Migration Engine — assessment, dependency mapping and rehearsed waves across platforms"),
  observe: img("observe", "Observe — logs, metrics, traces and SLOs bundled into the platform"),
  itsm: img("itsm", "ITSM — cloud-ops-native incident, change and problem management"),
  tenancy: img("tenancy", "Tenancy & Monetization — tenants, isolation and quotas, usage meters, white-label portal and operator BSS invoicing (Telco & Datacenter Edition, preview)"),
  "sovereign-operations": img("sovereign-operations", "Sovereign Operations — in-country local control plane, segregated directorates, local Whale AI, audit evidence and offline-tolerant edge (Government Edition)"),
} as const;

export type Product3DKey = keyof typeof product3d;

/** Edition → the image that best represents it. */
export const EDITION_3D: Record<string, Product3DKey> = {
  standard: "inventory",
  enterprise: "platform",
  "telco-datacenter": "tenancy",
  government: "sovereign-operations",
};

/** Solution → the module image behind it. */
export const SOLUTION_3D: Record<string, Product3DKey> = {
  "unified-cloud-inventory": "inventory",
  "ai-native-provisioning": "provisioning",
  "bundled-observability": "observe",
  "cloud-migration": "migration",
  "security-compliance": "cloud-audit",
  "sovereign-cloud": "sovereign-operations",
};
