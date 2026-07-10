/**
 * The 5 real BlueWhale Stack editions, sourced from
 * enterprise.bluewhalestack.com/license/editions.html &
 * enterprise.bluewhalestack.com/license/pricing.html
 *
 * Standard · Enterprise · Telco · Government · Datacenter
 * Enterprise is the featured / most-common starting point.
 */

export interface EditionDef {
  slug: string;
  name: string;
  badge: string;
  tagline: string;
  headline: string;
  positioning: string;
  audience: string;
  deploy: string[];
  priceAnchor: string;
  priceSub?: string;
  aiTier: string;
  highlights: string[];
  /** module slugs included in this edition */
  modules: string[];
  featured?: boolean;
  /** true = publicly visible but not yet generally available */
  comingSoon?: boolean;
  diagram: string;
  architectureId?: string;
}

export const editions: EditionDef[] = [
  {
    slug: "standard",
    name: "Standard",
    badge: "Standard Edition",
    tagline: "See. Govern. Run.",
    headline: "Govern your AWS, Azure & GCP estate with Whale AI Spark.",
    positioning:
      "Entry-level single-tenant CMP for organisations running AWS, Azure and GCP. Includes cloud inventory, governed provisioning, security scanning, audit, basic ITSM, business connectors and Whale AI Spark — delivered as SaaS or BYOC.",
    audience: "SMB · Single-region teams · Departmental IT",
    deploy: ["SaaS", "BYOC"],
    priceAnchor: "$12,000 – $24,000 / year",
    priceSub: "Based on managed resources & accounts",
    aiTier: "Whale AI — Spark (1M tokens / month)",
    highlights: [
      "Cloud inventory & governed provisioning",
      "Security scanning, compliance & audit reports",
      "Basic ITSM + CRM / ERP / ITSM connectors",
      "3 public clouds (AWS · Azure · GCP)",
      "Whale AI Spark — 1M AI tokens / month",
    ],
    modules: [
      "inventory",
      "cloud-connectors",
      "identity",
      "provisioning",
      "itsm",
      "whale-ai",
    ],
    diagram: "Standard: SaaS control plane over AWS / Azure / GCP, single region",
    architectureId: "edition-standard",
  },
  {
    slug: "enterprise",
    name: "Enterprise",
    badge: "Enterprise Edition",
    tagline: "Full platform. Every cloud. Every regulation.",
    headline: "The complete platform — hybrid, multi-tenant, with the full Whale AI stack.",
    positioning:
      "Everything in Standard plus Migration Engine, WhaleForge IaC, Landing Zone Builder, Whale Observe, Whale Nomics (FinOps), Whale IAM-PAM, all six public clouds, on-prem connectors via Edge Agent, and the full Whale AI stack (Spark · Tide · Abyss). Available as SaaS, BYOC or Sovereign across four deployment regions.",
    audience: "Large enterprise · BFSI · Regulated industries · Multi-cloud operators",
    deploy: ["SaaS", "BYOC", "Sovereign"],
    priceAnchor: "$120,000 / year",
    priceSub: "From $75K with multi-year; BYOC +20%",
    aiTier: "Whale AI — Spark · Tide · Abyss (100M tokens / month)",
    highlights: [
      "Everything in Standard, across all 6 public clouds + on-prem",
      "Migration Engine, Observe, FinOps, WhaleForge IaC, Landing Zone Builder",
      "Whale IAM-PAM, advanced ITSM + Edge Agent for hybrid & on-prem",
      "Multi-tenant, four deployment regions",
      "Whale AI Spark · Tide · Abyss — 50+ grounded use cases, 100M tokens / month",
    ],
    modules: [
      "inventory",
      "cloud-connectors",
      "identity",
      "provisioning",
      "itsm",
      "observe",
      "finops",
      "migration",
      "whaleforge",
      "landing-zone",
      "whale-ai",
    ],
    featured: true,
    diagram: "Enterprise: multi-cloud control plane, 4 regions, SaaS / BYOC / Sovereign",
    architectureId: "edition-enterprise",
  },
  {
    slug: "telco",
    name: "Telco",
    badge: "Telco Edition",
    tagline: "Carrier-grade. 5G-aware. Network-native.",
    headline: "Enterprise platform with NFV / 5G / OSS-BSS and MEC management.",
    positioning:
      "Full Enterprise platform extended with a telecom network fabric — VNF/CNF discovery, 5G core awareness (AMF/SMF/UPF/slices), NFVI/VIM, MEC site management at scale, OSS/BSS connectors (Amdocs, Netcracker, Ericsson, Nokia, TM Forum), service assurance and carrier-grade SLA management. 99.999% five-nines control plane.",
    audience: "Tier-1/2/3 operators · MVNOs · Carrier-grade MSPs",
    deploy: ["SaaS", "BYOC", "Telco Edge", "Telco Hub (coming soon)"],
    priceAnchor: "$250,000 – $600,000+ / year",
    priceSub: "Single region to multi-shard active-active; contact sales",
    aiTier: "Whale AI — Spark · Tide · Abyss (carrier tier)",
    highlights: [
      "Full Enterprise platform base",
      "VNF/CNF, 5G core, NFVI/VIM discovery & management",
      "MEC site fleet management at scale",
      "OSS/BSS connectors: Amdocs, Netcracker, Ericsson, Nokia, TM Forum",
      "Service assurance, SLA management, five-nines (99.999%) control plane",
    ],
    modules: [
      "inventory",
      "cloud-connectors",
      "identity",
      "provisioning",
      "itsm",
      "observe",
      "finops",
      "migration",
      "whaleforge",
      "landing-zone",
      "whale-ai",
    ],
    comingSoon: true,
    diagram: "Telco: carrier-grade control plane with NFV/5G/MEC and OSS-BSS connectors",
    architectureId: "edition-telco",
  },
  {
    slug: "government",
    name: "Government",
    badge: "Government Edition",
    tagline: "Sovereign. Air-gapped. Hardened.",
    headline: "Sovereign / air-gapped Enterprise platform hardened for public sector.",
    positioning:
      "Full Enterprise platform with a mandatory sovereignty layer: air-gapped install, offline update channel, FIPS-validated crypto, PAM always-on with session recording, MFA mandatory on every role, immutable WORM-backed audit log, data residency enforcement, compliance pack export for FedRAMP/IRAP/StateRAMP-style accreditation. Connects to sovereign cloud environments (AWS GovCloud, Azure Government, Google Distributed Cloud, national sovereign clouds).",
    audience: "National & state government · Defense · Central banks · Regulated public sector",
    deploy: ["Sovereign (on-prem)", "Private Gov Cloud", "Government Edge", "Government Hub (coming soon)"],
    priceAnchor: "$280,000 – $600,000 / year",
    priceSub: "Enterprise base +40% sovereignty premium; 3–5 yr fixed-bid; contact sales",
    aiTier: "Whale AI — in-region Abyss (air-gapped, no call-home)",
    highlights: [
      "Full Enterprise platform, sovereign/air-gapped deployment",
      "PAM always-on, MFA mandatory, FIPS-validated crypto",
      "Immutable audit log (WORM), data residency enforcement",
      "Compliance pack export (FedRAMP/IRAP/StateRAMP-style accreditation evidence)",
      "Sovereign cloud connectors: AWS GovCloud, Azure Gov, GDC, national clouds",
    ],
    modules: [
      "inventory",
      "cloud-connectors",
      "identity",
      "provisioning",
      "itsm",
      "observe",
      "finops",
      "migration",
      "whaleforge",
      "landing-zone",
      "whale-ai",
    ],
    diagram: "Government: air-gapped sovereign control plane, FIPS crypto, in-region AI",
    architectureId: "edition-government",
  },
  {
    slug: "datacenter",
    name: "Datacenter",
    badge: "Datacenter Edition",
    tagline: "DCIM. White-label. Colo-ready.",
    headline: "Enterprise platform with DCIM and white-label for colocation operators.",
    positioning:
      "Full Enterprise platform extended with physical data-centre management (DCIM): rack/row/cage inventory at U-position level, power management (PDU, kW, A/B feeds), cooling & environmental (CRAC/CRAH), space & capacity, cross-connect, access control/badging, colo tenant billing (metered via Partner Portal) and white-label branding for operators.",
    audience: "Colocation operators · Data-centre operators · Managed DC service providers",
    deploy: ["SaaS", "BYOC", "Datacenter Edge", "Datacenter Hub (coming soon)"],
    priceAnchor: "$60,000 – $150,000 / year",
    priceSub: "Per-rack bands ($220→$130/rack/yr); single DC to multi-DC white-label",
    aiTier: "Whale AI — Spark · Tide · Predictive Ops",
    highlights: [
      "Full Enterprise platform base",
      "Rack / row / cage inventory at U-position level",
      "Power, cooling, space & capacity management (DCIM)",
      "Colo tenant billing (metered) via Partner Portal",
      "White-label branding (operator logo, colours, domain)",
    ],
    modules: [
      "inventory",
      "cloud-connectors",
      "identity",
      "provisioning",
      "itsm",
      "observe",
      "finops",
      "migration",
      "whaleforge",
      "landing-zone",
      "whale-ai",
    ],
    comingSoon: true,
    diagram: "Datacenter: physical + cloud control plane with DCIM and white-label portal",
    architectureId: "edition-datacenter",
  },
];

/**
 * Scale & quota comparison across editions.
 * Each row is a dimension; values keyed by edition slug.
 */
export interface EditionSpecRow {
  label: string;
  values: Record<string, string>;
}

export const editionSpecs: EditionSpecRow[] = [
  {
    label: "Tenants",
    values: {
      standard: "1 (single-tenant)",
      enterprise: "Multi-tenant",
      telco: "Multi-tenant",
      government: "Dedicated silo",
      datacenter: "Multi-tenant",
    },
  },
  {
    label: "Cloud accounts (included)",
    values: {
      standard: "5 accounts",
      enterprise: "25 accounts",
      telco: "Enterprise scale",
      government: "Per-contract",
      datacenter: "Enterprise scale",
    },
  },
  {
    label: "Managed resources (MRU)",
    values: {
      standard: "1,000 MRU",
      enterprise: "5,000 MRU",
      telco: "Network elements + MRU",
      government: "250 MRU included",
      datacenter: "Per-rack metered",
    },
  },
  {
    label: "Users / seats",
    values: {
      standard: "10 users",
      enterprise: "50 ITSM seats",
      telco: "Carrier scale",
      government: "Per-contract",
      datacenter: "Operator scale",
    },
  },
  {
    label: "Whale AI tier",
    values: {
      standard: "Spark",
      enterprise: "Spark · Tide · Abyss",
      telco: "Spark · Tide · Abyss",
      government: "Abyss (in-region only)",
      datacenter: "Spark · Tide · Predictive Ops",
    },
  },
  {
    label: "AI tokens / month",
    values: {
      standard: "1M included",
      enterprise: "100M included",
      telco: "Carrier tier",
      government: "In-region quota",
      datacenter: "Included quota",
    },
  },
  {
    label: "Deployment models",
    values: {
      standard: "SaaS · BYOC",
      enterprise: "SaaS · BYOC · Sovereign",
      telco: "SaaS · BYOC · Telco Edge",
      government: "Sovereign · Air-gapped",
      datacenter: "SaaS · BYOC · DC Edge",
    },
  },
  {
    label: "Clouds supported",
    values: {
      standard: "AWS · Azure · GCP",
      enterprise: "All 6 public + on-prem",
      telco: "All 6 + network infra",
      government: "Sovereign clouds",
      datacenter: "All 6 + physical DC",
    },
  },
  {
    label: "SLA",
    values: {
      standard: "99.5%",
      enterprise: "99.9%",
      telco: "99.999% (five-nines)",
      government: "Per-contract",
      datacenter: "99.9%",
    },
  },
  {
    label: "Support",
    values: {
      standard: "Business hours · 24×5 optional",
      enterprise: "24×7 + dedicated CSM",
      telco: "Carrier-grade 24×7 (mandatory)",
      government: "Premium 24×7 (mandatory)",
      datacenter: "Operator-grade 24×7",
    },
  },
];

export const editionsBySlug = Object.fromEntries(
  editions.map((e) => [e.slug, e]),
) as Record<string, EditionDef>;
