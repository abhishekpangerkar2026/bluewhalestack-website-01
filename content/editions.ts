/**
 * The 4 real BlueWhale Stack editions, per the official Company Profile
 * (Aug 2026): Standard · Enterprise · Telco & Datacenter · Government —
 * one architecture, four licensed editions. Telco and Datacenter were
 * combined into one edition here to match the official "Four Editions,
 * One Architecture" slide and the single "Telco & Datacenter Edition"
 * datasheet — they still target two distinct operator personas (telecom
 * operators vs. datacenter/colocation operators), carried via
 * `operatorModel.profiles` below rather than as separate editions.
 * Enterprise is the featured / most-common starting point.
 */

export interface EditionDef {
  slug: string;
  name: string;
  badge: string;
  tagline: string;
  headline: string;
  positioning: string;
  /** ≤45-word version of `positioning` for cards and grids */
  summary: string;
  audience: string;
  /** Official "The outcome" line (Product Overview, Four Editions) */
  outcome: string;
  /** Official "What it includes" — the three headline inclusions */
  includes: string[];
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
  /** GA target for editions in preview, e.g. "Q4 2026" */
  gaTarget?: string;
  diagram: string;
  architectureId?: string;
  /** for the Telco & Datacenter edition: how each operator persona monetizes it */
  operatorModel?: {
    profiles: {
      audience: string;
      proposition: string;
      revenueStreams: { name: string; body: string; character: string }[];
      phases: { name: string; timeframe: string; body: string }[];
    }[];
  };
}

export const editions: EditionDef[] = [
  {
    slug: "standard",
    name: "Standard",
    badge: "Standard Edition",
    tagline: "Governed cloud for a single estate",
    headline: "Govern your AWS, Azure & GCP estate with Whale AI Spark.",
    positioning:
      "Governed cloud for a single estate — the foundation edition for mid-market and single-cloud enterprises running AWS, Azure or GCP. Management & Delivery, Whalenomics essentials, a security baseline with observability, basic ITSM, business connectors and Whale AI Spark — single-tenant, delivered as SaaS or BYOC.",
    summary:
      "Governance from day one for a single estate — inventory, governed provisioning, Whalenomics essentials, security baseline and observability, basic ITSM and Whale AI Spark. SaaS or BYOC.",
    audience: "Mid-market and single-cloud enterprises · departmental IT",
    outcome: "Governance from day one — not a retrofit.",
    includes: [
      "Management & Delivery",
      "Whalenomics essentials",
      "Security baseline & observability",
    ],
    deploy: ["SaaS", "BYOC"],
    priceAnchor: "$24,000 / year",
    priceSub: "Flat, published · 1/3/5-yr terms (2-yr −10%, 3-yr −15%)",
    aiTier: "Whale AI — Spark (1M tokens / month)",
    highlights: [
      "Cloud inventory & governed provisioning",
      "Whalenomics essentials — cost visibility and budgets",
      "Security baseline, compliance & audit reports, bundled observability",
      "Basic ITSM + CRM / ERP / ITSM connectors",
      "3 public clouds (AWS · Azure · GCP) · Whale AI Spark — 1M AI tokens / month",
    ],
    modules: [
      "inventory",
      "cloud-connectors",
      "identity",
      "provisioning",
      "itsm",
      "observe",
      "finops",
      "whale-ai",
    ],
    diagram: "Standard: SaaS control plane over AWS / Azure / GCP, single region",
    architectureId: "edition-standard",
  },
  {
    slug: "enterprise",
    name: "Enterprise",
    badge: "Enterprise Edition",
    tagline: "The full platform, BYOC across every estate",
    headline: "The complete platform — every estate answerable from one console.",
    positioning:
      "Everything in Standard plus all nine capability families: Migration Engine, WhaleForge IaC, Landing Zone Builder, Observe, Whalenomics · FinOps, Cloud Audit & Evidence, Whale IAM-PAM — all six public clouds plus private, virtualization, hybrid and sovereign stacks via the Edge Agent, and the full Whale AI stack (Spark · Tide · Abyss), including offline. Available as SaaS, BYOC or Sovereign across four deployment regions.",
    summary:
      "The complete platform — all nine capability families, Whale AI including offline, Cloud Audit & Evidence and the Migration Engine, across every estate. SaaS, BYOC or Sovereign across four regions.",
    audience: "Multi-cloud enterprises · BFSI · regulated industries",
    outcome: "Every estate answerable from one console.",
    includes: [
      "All nine capability families",
      "Whale AI — including offline",
      "Cloud Audit & Evidence · Migration Engine",
    ],
    deploy: ["SaaS", "BYOC", "Sovereign"],
    priceAnchor: "$120,000 / year",
    priceSub: "Flat, published · 1/3/5-yr terms (2-yr −10%, 3-yr −15%) · regional pricing on request",
    aiTier: "Whale AI — Spark · Tide · Abyss (100M tokens / month)",
    highlights: [
      "Everything in Standard, across all 6 public clouds + private, hybrid & edge",
      "Migration Engine, Observe, Whalenomics · FinOps, WhaleForge IaC, Landing Zone Builder",
      "Cloud Audit & Evidence — controls monitored continuously, examiner-grade reports on demand",
      "Whale IAM-PAM, advanced ITSM + Edge Agent for hybrid & on-prem · multi-tenant, four regions",
      "Whale AI Spark · Tide · Abyss — 50+ grounded use cases, 100M tokens / month, offline-capable",
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
      "cloud-audit",
      "whale-ai",
    ],
    featured: true,
    diagram: "Enterprise: multi-cloud control plane, 4 regions, SaaS / BYOC / Sovereign",
    architectureId: "edition-enterprise",
  },
  {
    slug: "telco-datacenter",
    name: "Telco & Datacenter",
    badge: "Telco & Datacenter Edition",
    tagline: "Operators become cloud providers",
    headline: "Enterprise platform extended for infrastructure operators.",
    positioning:
      "Full Enterprise platform extended for two operator personas on one licensed edition. For telecom operators: a network fabric — VNF/CNF discovery, 5G core awareness (AMF/SMF/UPF/slices), NFVI/VIM, MEC site management, OSS/BSS connectors (Amdocs, Netcracker, Ericsson, Nokia, TM Forum), carrier-grade SLA management. For datacenter and colocation operators: physical datacenter management (DCIM) — rack/row/cage inventory at U-position level, power (PDU, kW, A/B feeds), cooling & environmental (CRAC/CRAH), space & capacity, cross-connect, access control. Both get native multi-tenancy and white-label branding.",
    summary:
      "The Enterprise platform extended for telecom and datacenter operators — NFV/5G network fabric, DCIM at U-position level, native multi-tenancy and white-label branding, with per-tenant metering into your BSS.",
    audience: "Telcos, datacenter & hosting operators — Tier-1/2/3 telecom, MVNOs, colocation, carrier-grade MSPs",
    outcome: "Revenue per tenant, on capacity you own.",
    includes: [
      "Tenancy & Monetization",
      "White-label portals & catalog",
      "OSS / BSS & billing integration",
    ],
    deploy: ["SaaS", "BYOC", "Telco Edge", "Datacenter Edge"],
    priceAnchor: "Contact sales",
    priceSub: "Operator licensing shaped to the business — revenue-share models available; regional pricing on request",
    aiTier: "Whale AI — Spark · Tide · Abyss / Predictive Ops (carrier & operator tier)",
    highlights: [
      "Full Enterprise platform base, extended for infrastructure operators",
      "Telco: VNF/CNF, 5G core, NFVI/VIM discovery & MEC fleet management",
      "Telco: OSS/BSS connectors (Amdocs, Netcracker, Ericsson, Nokia, TM Forum), five-nines SLA",
      "Datacenter: rack/row/cage inventory at U-position level, power & cooling (DCIM)",
      "Datacenter: colo tenant billing (metered) via Partner Portal",
      "Native multi-tenancy & white-label branding for both operator types",
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
      "cloud-audit",
      "tenancy",
      "whale-ai",
    ],
    comingSoon: true,
    gaTarget: "Q4 2026",
    diagram: "Telco & Datacenter: multi-tenant control plane with NFV/5G network fabric and physical DCIM",
    architectureId: "edition-telco-datacenter",
    operatorModel: {
      profiles: [
        {
          audience: "For telecom operators",
          proposition:
            "The operator already owns the enterprise relationship, the network and the SLA culture — what's missing is the platform layer that turns those assets into cloud products. This edition is that layer: deployed on the operator's own infrastructure, white-labelled under the operator's brand, with tenancy, metering, governance and BSS-ready billing native to the platform.",
          revenueStreams: [
            { name: "Managed enterprise cloud", body: "Fully managed, governed multi-cloud delivered to enterprise customers through the operator's platform.", character: "Recurring · flagship" },
            { name: "Multi-tenant cloud platform", body: "Enterprise tenants on operator infrastructure with strict isolation and self-service.", character: "Recurring · metered" },
            { name: "White-label cloud marketplace", body: "A branded catalog of the operator's own and partner services, self-provisioned under governance.", character: "Recurring · attach" },
            { name: "Edge & hybrid services", body: "Tower, metro and premise edge sold as governed capacity for latency-sensitive workloads.", character: "Premium · metered" },
            { name: "Migration & professional services", body: "Enterprise workload migration industrialized by the built-in Migration Engine.", character: "Per-project" },
          ],
          phases: [
            { name: "Foundation", timeframe: "Weeks 1–6", body: "Platform live in the operator's core DC; BSS and identity integration; operator console and first catalog; two lighthouse enterprise tenants." },
            { name: "Launch", timeframe: "Weeks 6–14", body: "White-label marketplace launched to the enterprise base; Migration Engine in production; per-tenant billing verified end-to-end." },
            { name: "Scale", timeframe: "Weeks 14–26", body: "Edge sites federated; government and BFSI pursuits with the sovereign configuration; managed-services wrapper on the installed base." },
            { name: "Expand", timeframe: "Quarter 3+", body: "Wholesale / partner tenancy opened; vertical solutions packaged; the operator's own service roadmap runs on the platform." },
          ],
        },
        {
          audience: "For datacenter & colocation operators",
          proposition:
            "The operator owns the assets, the trust and the customer — what's missing is the software layer that turns infrastructure into products. This edition is that layer: deployed in the operator's own facilities, white-labelled under the operator's brand, with tenancy, metering, governance and billing native to the platform rather than assembled around it.",
          revenueStreams: [
            { name: "Tenanted cloud services", body: "Compute, storage and network sold as governed services over the existing footprint — colocation customers converted to cloud customers.", character: "Recurring · metered" },
            { name: "GPU & AI capacity services", body: "Tenancy, quota and cost governance over GPU estates — utilization visible, billable and sellable per customer.", character: "Premium · metered" },
            { name: "Sovereign hosting", body: "Data-resident, locally governed cloud for government and regulated enterprise — the moat offering.", character: "Contracted · multi-year" },
            { name: "Migration & onboarding services", body: "The built-in Migration Engine turns every tenant onboarding into a faster, repeatable professional-services event.", character: "Per-project" },
            { name: "Managed services wrapper", body: "Operations, security and compliance services layered per tenant on the same console.", character: "Recurring · attach" },
          ],
          phases: [
            { name: "Foundation", timeframe: "Weeks 1–6", body: "Platform deployed in the primary facility; operator console, identity and billing integration live; two pilot tenants onboarded." },
            { name: "Monetize", timeframe: "Weeks 6–14", body: "White-label catalog launched; Migration Engine in production for onboarding; GPU governance live; per-tenant billing feeds verified." },
            { name: "Scale", timeframe: "Weeks 14–26", body: "Second site federated; sovereign offering packaged for government pursuits; managed-services wrapper launched on the installed base." },
            { name: "Expand", timeframe: "Quarter 3+", body: "Edge sites added; marketplace expanded; the operator's own service roadmap runs on the platform." },
          ],
        },
      ],
    },
  },
  {
    slug: "government",
    name: "Government",
    badge: "Government Edition",
    tagline: "Sovereign by architecture",
    headline: "Sovereign / air-gapped Enterprise platform hardened for public sector.",
    positioning:
      "Full Enterprise platform with a mandatory sovereignty layer: air-gapped install, offline update channel, FIPS-validated crypto, PAM always-on with session recording, MFA mandatory on every role, immutable WORM-backed audit log, data residency enforcement, compliance pack export for FedRAMP/IRAP/StateRAMP-style accreditation. Connects to sovereign cloud environments (AWS GovCloud, Azure Government, Google Distributed Cloud, national sovereign clouds).",
    summary:
      "The Enterprise platform with a mandatory sovereignty layer — air-gapped install, FIPS crypto, always-on PAM, WORM audit log, residency enforcement and accreditation-ready compliance packs.",
    audience: "Ministries, agencies & public sector · defence · central banks",
    outcome: "Sovereignty demonstrated, not asserted.",
    includes: [
      "Sovereign Operations",
      "Air-gapped deployment classes",
      "State-audit evidence & segregation",
    ],
    deploy: ["Sovereign (on-prem)", "Private Gov Cloud", "Government Edge"],
    priceAnchor: "Contact sales",
    priceSub: "Enterprise base plus sovereignty layer · 3–5 yr fixed-bid terms · tender & empanelment-ready",
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
      "cloud-audit",
      "sovereign-operations",
      "whale-ai",
    ],
    diagram: "Government: air-gapped sovereign control plane, FIPS crypto, in-region AI",
    architectureId: "edition-government",
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
      "telco-datacenter": "Multi-tenant",
      government: "Dedicated silo",
    },
  },
  {
    label: "Cloud accounts (included)",
    values: {
      standard: "5 accounts",
      enterprise: "100 accounts",
      "telco-datacenter": "Enterprise scale",
      government: "Per-contract",
    },
  },
  {
    label: "Managed resources (MRU)",
    values: {
      standard: "1,000 MRU",
      enterprise: "1,000,000 resources",
      "telco-datacenter": "Network elements · per-rack metered",
      government: "Per-contract",
    },
  },
  {
    label: "Users / seats",
    values: {
      standard: "10 users",
      enterprise: "1,000 users",
      "telco-datacenter": "Carrier · operator scale",
      government: "Per-contract",
    },
  },
  {
    label: "Whale AI tier",
    values: {
      standard: "Spark",
      enterprise: "Spark · Tide · Abyss",
      "telco-datacenter": "Spark · Tide · Abyss / Predictive Ops",
      government: "Abyss (in-region only)",
    },
  },
  {
    label: "AI tokens / month",
    values: {
      standard: "1M included",
      enterprise: "100M included",
      "telco-datacenter": "Carrier / operator tier",
      government: "In-region quota",
    },
  },
  {
    label: "Deployment models",
    values: {
      standard: "SaaS · BYOC",
      enterprise: "SaaS · BYOC · Sovereign",
      "telco-datacenter": "SaaS · BYOC · Telco/DC Edge",
      government: "Sovereign · Air-gapped",
    },
  },
  {
    label: "Clouds supported",
    values: {
      standard: "AWS · Azure · GCP",
      enterprise: "All 6 public + private, hybrid & edge",
      "telco-datacenter": "All 6 + network & physical DC",
      government: "Sovereign clouds",
    },
  },
  {
    label: "SLA",
    values: {
      standard: "99.5%",
      enterprise: "99.9%",
      "telco-datacenter": "99.9–99.999% (by service)",
      government: "Per-contract",
    },
  },
  {
    label: "Support",
    values: {
      standard: "Business hours · 24×5 optional",
      enterprise: "24×7 + dedicated CSM",
      "telco-datacenter": "Carrier/operator-grade 24×7 (mandatory)",
      government: "Premium 24×7 (mandatory)",
    },
  },
];

export const editionsBySlug = Object.fromEntries(
  editions.map((e) => [e.slug, e]),
) as Record<string, EditionDef>;
