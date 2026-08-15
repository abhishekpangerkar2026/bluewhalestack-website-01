/** Platform page content. */

export const platformHero = {
  eyebrow: "Unified Cloud Management Platform",
  title: "Every cloud. One control plane.",
  description:
    "See, run, and optimize your entire cloud estate — across AWS, Azure, GCP and on-prem — from a single AI-powered platform. Replace 6–12 disconnected tools with one control plane.",
};

/** Hero stats strip — four value propositions. */
export const heroStats = [
  { value: "Every cloud", label: "+ on-prem & hybrid" },
  { value: "One ledger", label: "cost · inventory · ops" },
  { value: "AI in every module", label: "Whale AI" },
  { value: "SaaS · BYOC · Sovereign", label: "your data, your region" },
];

/** Why BlueWhale Stack — 6 pillars. */
export const pillars = [
  {
    icon: "Cloud",
    title: "Every cloud, one plane",
    body: "AWS · Azure · GCP · Oracle · IBM · Alibaba, plus on-prem (VMware · Hyper-V · Nutanix). Connect once, manage everywhere.",
  },
  {
    icon: "Eye",
    title: "See & provision everything",
    body: "A unified inventory of every resource, and a self-service catalog to provision new ones — no cloud console required.",
  },
  {
    icon: "TrendingDown",
    title: "Spend less, prove it",
    body: "Real cost intelligence — anomalies, recommendations, budgets, chargeback, unit economics, and carbon — in one place.",
  },
  {
    icon: "MoveRight",
    title: "Move anything",
    body: "Any-to-any migration plus infrastructure-as-code and landing zones: on-prem→cloud, cloud→cloud, and repatriation.",
  },
  {
    icon: "ShieldCheck",
    title: "Run & secure it all",
    body: "Observability, IT service management, security posture, and privileged access — one operations layer for everything you run.",
  },
  {
    icon: "Sparkles",
    title: "AI in every module",
    body: "Whale AI is woven across the whole platform — 50+ grounded use cases, an assistant wherever you work, not a bolt-on chatbot.",
  },
];

/** Five capability groups with feature chips. */
export const capabilities = [
  {
    icon: "Eye",
    title: "Discover & Manage",
    chips: ["Dashboard", "Inventory", "Discovery", "Assessment", "Service Catalog"],
  },
  {
    icon: "MoveRight",
    title: "Build & Migrate",
    chips: ["Migration Engine", "WhaleForge IaC", "Landing Zone"],
  },
  {
    icon: "TrendingDown",
    title: "Optimize",
    chips: ["Whale Nomics", "Cost intel", "Anomalies", "Budgets", "Chargeback", "Carbon"],
  },
  {
    icon: "Activity",
    title: "Operate",
    chips: ["Whale Observe", "Whale Helm (ITSM)", "Incidents", "Changes"],
  },
  {
    icon: "ShieldCheck",
    title: "Secure & Govern",
    chips: ["Whale Security", "IAM-PAM", "Compliance", "Audit"],
  },
];

export const deploymentModels = [
  {
    name: "SaaS",
    badge: "Fastest to value",
    body: "Fully managed, multi-tenant from Singapore. Zero infrastructure overhead.",
  },
  {
    name: "BYOC",
    badge: "Most flexible",
    body: "Bring your own cloud — the control plane runs in your AWS / Azure / GCP.",
  },
  {
    name: "Sovereign",
    badge: "Air-gapped",
    body: "On-prem, isolated deployment with in-region AI models and no call-home.",
  },
  {
    name: "On-premise",
    badge: "Max control",
    body: "Full installation in your data center, with dedicated support and custom SLAs.",
  },
];

/** Whale AI tiers — Spark · Tide · Abyss. */
export const whaleTiers = [
  {
    name: "Whale-Spark",
    edition: "Standard & up",
    body: "Entry, fast — summaries, inventory Q&A and sizing recommendations in natural language.",
  },
  {
    name: "Whale-Tide",
    edition: "Enterprise",
    body: "Deep reasoning for migration planning, IaC drafting and multi-cloud analysis.",
  },
  {
    name: "Whale-Abyss",
    edition: "Enterprise",
    body: "Premium multi-step agents for the most complex, cross-module workflows — including sovereign in-region.",
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
    body: "Keep data in-region — India · EU · Singapore · Gulf — with enforceable residency controls.",
  },
  {
    icon: "Landmark",
    title: "Sovereign & air-gapped",
    body: "SaaS, your own cloud (BYOC), or fully sovereign with no call-home and in-region AI.",
  },
  {
    icon: "Lock",
    title: "Governed & audited",
    body: "Identity, least-privilege access, and an immutable audit trail across every environment.",
  },
];

export const securityPosture = [
  "Federated identity across 9+ IdPs with auto-provisioning",
  "Role-based access across every connected cloud",
  "Full audit trail of platform activity",
  "Data residency by region (DPDP — Mumbai, GDPR — Frankfurt)",
  "ISO 27001 certified; SOC 2 Type II readiness complete",
  "Air-gapped & in-region deployment for sovereign customers",
];
