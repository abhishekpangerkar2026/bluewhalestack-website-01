/**
 * Platform page content — sourced from the official Product Overview
 * (v1.0, Sept 2026) and Company Profile (Aug 2026): "Digital Experience
 * Platform — One Platform. Every Industry. Every Estate."
 */

export const platformHero = {
  eyebrow: "Digital Experience Platform",
  title: "One Platform. Every Industry. Every Estate.",
  description:
    "Modern organizations run many estates — public clouds, private datacenters, virtualization farms, hybrid stacks, remote and air-gapped sites. Each arrives with its own console, its own identity, its own bill and its own audit story. BlueWhale Stack replaces that sprawl with one governed layer: a single console, one identity fabric, one policy engine and one explainable bill across everything — with a multi-tenant Digital Experience Layer on top that lets operators and enterprises publish governed services to their own customers and business units.",
  tagline: "The change is not another tool in the estate — it is the layer that makes the estate answerable.",
};

/** Hero stats strip — the official at-a-glance numbers. */
export const heroStats = [
  { value: "54", label: "Capabilities shipped across the platform" },
  { value: "9", label: "Capability families under one console" },
  { value: "4", label: "Editions on one architecture — an upgrade is a licence change" },
  { value: "6", label: "Platform classes — public, private, virtual, hybrid, sovereign, edge" },
];

export const whoItIsFor = [
  {
    icon: "Layers",
    title: "Enterprises",
    body: "Multi-cloud and hybrid estates that need governance, cost discipline and audit evidence — without slowing delivery.",
    href: "/editions/enterprise",
  },
  {
    icon: "Server",
    title: "Telco & DC operators",
    body: "Sell governed cloud services on your own capacity — white-label, metered, billed through your BSS.",
    href: "/editions/telco-datacenter",
  },
  {
    icon: "ShieldCheck",
    title: "Government & regulated",
    body: "Sovereignty by architecture — in-country, segregated, air-gap-capable, with AI that never leaves the perimeter.",
    href: "/editions/government",
  },
];

export const whyNow =
  "Estates are multiplying faster than governance. BlueWhale Stack makes governance the layer that arrives first — not the retrofit that arrives after the audit.";

/** Why BlueWhale Stack — 6 pillars. */
export const pillars = [
  {
    icon: "Cloud",
    title: "Every estate, one plane",
    body: "AWS · Azure · Google Cloud · Oracle · Alibaba · Huawei, plus VMware · Hyper-V · Nutanix · OpenShift · KVM, hybrid and sovereign stacks, air-gapped and edge. Connect once, manage everywhere.",
  },
  {
    icon: "Eye",
    title: "See & provision everything",
    body: "A unified inventory of every resource, and a self-service catalog to provision new ones — no cloud console required.",
  },
  {
    icon: "TrendingDown",
    title: "Spend explained, decomposed, owned",
    body: "Whalenomics — budgets, forecasts, chargeback and continuous optimization, with spend decomposed to workload, department or tenant.",
  },
  {
    icon: "MoveRight",
    title: "Move anything",
    body: "Inventory, dependency mapping and rehearsed waves with rollback — entry, movement and exit industrialized across six platforms.",
  },
  {
    icon: "ShieldCheck",
    title: "Run, secure & prove it",
    body: "Observability, ITSM, one identity fabric and continuous control monitoring — examiner-grade evidence on demand for the board, the auditor and the regulator.",
  },
  {
    icon: "Sparkles",
    title: "Whale AI — including offline",
    body: "AI for operations, documentation and compliance woven through every family — your choice of model, able to run fully inside the perimeter.",
  },
];

/** "How the families work together — three everyday moments." */
export const everydayMoments = [
  {
    icon: "MoveRight",
    title: "A new estate lands",
    body: "Migration & Discovery inventories it; Security & Identity extends the identity fabric; Governance applies policy; Whalenomics baselines cost — governed from day one, not retrofitted.",
  },
  {
    icon: "FileCheck",
    title: "The auditor calls",
    body: "Governance & Audit has been collecting evidence continuously across every estate — the supervisory request becomes report parameters, not a war room.",
  },
  {
    icon: "Sparkles",
    title: "AI, inside the walls",
    body: "Whale AI reads operations and documentation on the customer's own model, inside the perimeter — with Observability watching it and Audit logging it.",
  },
];

export const designRule =
  "Every family reads from and writes to the same inventory, identity and policy plane — which is why one console can answer questions that previously took four tools and a spreadsheet.";

/** The six-layer architecture, read top-down the way value flows. */
export const architectureLayers = [
  {
    n: "1",
    name: "Industry segments",
    body: "Enterprise, datacenter, telco, government and SMB consume governed services — each through its own edition of the same platform.",
  },
  {
    n: "2",
    name: "Digital Experience Layer",
    body: "Multi-tenant by design: white-label portals, catalog & marketplace, self-service, per-tenant metering & billing, SLA and tenant health — the layer your customers and business units see.",
  },
  {
    n: "3",
    name: "Unified Platform Core",
    body: "Nine capability families under one console, one identity, one policy and one bill — the governance engine of the whole estate.",
  },
  {
    n: "4",
    name: "Integrations",
    body: "The platform plugs into what you already run — OSS/BSS, ServiceNow/Jira, billing and invoicing, identity & SSO, and an API surface for everything else.",
  },
  {
    n: "5",
    name: "Every estate",
    body: "Public clouds, private and virtualization estates, hybrid and sovereign stacks — discovered, governed and billed as one, down to air-gapped and edge sites.",
  },
  {
    n: "6",
    name: "Deployment modes",
    body: "SaaS, BYOC on your own clouds, on-premise, sovereign air-gapped, or at the edge — the same product in every mode.",
  },
];

/** Included in every edition. */
export const includedInEveryEdition = [
  { icon: "LayoutTemplate", title: "One console", body: "Every estate, one pane of glass." },
  { icon: "KeyRound", title: "One identity", body: "SAML/OIDC fabric across everything." },
  { icon: "FileCheck", title: "One policy", body: "Governance as configuration." },
  { icon: "Wallet", title: "One bill", body: "Spend explained, decomposed, owned." },
  { icon: "Zap", title: "API-first", body: "Everything the console does, the API does." },
];

/** Deployment — the same product, wherever it must run. */
export const deploymentModes = [
  {
    name: "SaaS",
    badge: "Fastest start",
    body: "Running in days, with regional residency options — Singapore, Mumbai, Frankfurt or Los Angeles.",
  },
  {
    name: "BYOC — your clouds",
    badge: "Nothing re-hosted",
    body: "On your own cloud accounts — the control plane runs in your AWS / Azure / GCP; nothing is re-hosted to adopt it.",
  },
  {
    name: "On-premise",
    badge: "Full control",
    body: "Full control inside your own datacenters, on your virtualization or bare-metal estate.",
  },
  {
    name: "Sovereign · air-gapped",
    badge: "Disconnected",
    body: "Fully disconnected operation — including Whale AI offline, in-region models and no call-home.",
  },
  {
    name: "Edge — offline-tolerant",
    badge: "HQ-grade policy",
    body: "Plants, branches and bureaus under headquarters-grade policy, tolerant of disconnection.",
  },
];

export const deploymentNote =
  "Every mode runs the same platform build — moving between modes is an operational decision, not a re-implementation. Mixed estates (a SaaS console governing air-gapped and edge sites through the Edge Agent) are the norm, not the exception.";

/** Support & service model. */
export const supportModel = [
  {
    icon: "Headset",
    title: "Tiered support",
    body: "L1/L2 with the customer or partner, L3 with BlueWhale — 24×7 critical bridge at 99.9%.",
  },
  {
    icon: "MoveRight",
    title: "Implementation",
    body: "BlueWhale practices — App, Infrastructure and Data Modernization, AI Design — or certified partners.",
  },
  {
    icon: "Sparkles",
    title: "Product & roadmap",
    body: "Quarterly releases; customer councils feed the roadmap; no forced upgrades on sovereign estates.",
  },
];

/** The 90-day prototype — the standing offer. */
export const prototypeOffer = {
  eyebrow: "The standing offer",
  title: "The 90-day prototype",
  description:
    "Proven before commitment. Half a day with your technology and finance leaders, then a full-featured prototype on your own estate — scored on agreed criteria before any licensing decision.",
  steps: [
    {
      icon: "Users",
      title: "Discovery workshop",
      when: "Half day",
      body: "The platform on your estate's shape; success criteria agreed with technology and finance.",
    },
    {
      icon: "Zap",
      title: "Prototype",
      when: "90 days · no licence cost",
      body: "Full-featured on your own estate: inventory live, cost decomposed, one audit report, one AI use case.",
    },
    {
      icon: "FileCheck",
      title: "Evidence review",
      when: "Day 90",
      body: "Scored on the agreed criteria — then, and only then, the licensing decision.",
    },
    {
      icon: "TrendingUp",
      title: "Scale",
      when: "Quarters 2–4",
      body: "The control plane extends estate by estate; every environment inherits governance day one.",
    },
  ],
  cta: {
    title: "Next step — the discovery workshop.",
    body: "Bring your hardest audit finding and your least explainable cloud bill; we will show what the platform does with both, on your estate's shape, before any commercial conversation.",
    label: "Book the discovery workshop",
    href: "/contact?intent=demo",
  },
};

/** Whale AI tiers — Spark · Tide · Abyss. */
export const whaleTiers = [
  {
    name: "Spark",
    edition: "Standard & up",
    body: "Entry, fast — summaries, inventory Q&A and sizing recommendations in natural language.",
  },
  {
    name: "Tide",
    edition: "Enterprise & up",
    body: "Deep reasoning for migration planning, IaC drafting and multi-cloud analysis.",
  },
  {
    name: "Abyss",
    edition: "Enterprise · Government (in-region, offline)",
    body: "Premium multi-step agents for the most complex, cross-module workflows — including fully offline inside the perimeter.",
  },
];

/** Trust & sovereignty pillars. */
export const trustPillars = [
  {
    icon: "Globe",
    title: "Multi-region",
    body: "Run close to your users, with active-active resilience across four deployment regions.",
  },
  {
    icon: "Network",
    title: "Data residency",
    body: "Keep data in-region — Singapore, Mumbai, Frankfurt or Los Angeles — with enforceable residency controls.",
  },
  {
    icon: "Landmark",
    title: "Sovereign & air-gapped",
    body: "SaaS, your own cloud (BYOC), on-premise, or fully sovereign with no call-home and in-region, offline AI.",
  },
  {
    icon: "Lock",
    title: "Governed & audited",
    body: "Identity, least-privilege access, and an immutable audit trail across every environment.",
  },
];

export const securityPosture = [
  "One identity fabric (SAML/OIDC) across 9+ IdPs with auto-provisioning",
  "Least-privilege, role-based access across every connected estate",
  "Continuous control monitoring with examiner-grade evidence on demand",
  "Data residency by region (DPDP — Mumbai, GDPR — Frankfurt)",
  "ISO 27001 certified; SOC 2 Type II readiness assessment complete",
  "Air-gapped & in-region deployment for sovereign customers",
];
