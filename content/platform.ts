/**
 * Platform page content — sourced from the official Product Overview
 * (v1.0, Sept 2026) and Company Profile (Aug 2026): "Digital Experience
 * Platform — One Platform. Every Industry. Every Estate."
 */

export const platformHero = {
  eyebrow: "Digital Experience Multi-Cloud Platform — Cloud & Datacenter",
  title: "One Platform. Every Industry. Every Estate.",
  description:
    "BlueWhale Stack is one control plane over six public clouds, your virtualization estate and your air-gapped sites. It is run by enterprises, by telco and datacenter operators who sell governed services on it, and by governments that must prove where data lives and who touched it. After connecting, every estate reports into one inventory, one identity fabric and one policy engine — and the audit evidence is generated continuously instead of assembled per inspection.",
  tagline: "54 capabilities in nine families, four editions on one architecture, five deployment modes down to fully air-gapped.",
};

/** Hero stats strip — operational facts a buyer can check, not catalog counts. */
export const heroStats = [
  { value: "< 15 min", label: "From connecting a cloud account to its first full inventory" },
  { value: "6 + 5", label: "Public clouds by API; private platforms by Edge Agent" },
  { value: "10", label: "Identity providers federated over SAML 2.0 / OIDC" },
  { value: "5", label: "Deployment modes — SaaS, BYOC, on-prem, air-gapped, edge" },
];

/** What the platform replaces — the consolidation arithmetic, tool by tool. */
export const whatItReplaces = [
  { category: "Cloud management platform (CMP)", answer: "Inventory & Discovery, Service Catalog and Cloud Connectors — one inventory across six clouds and on-prem, governed provisioning on top", status: "GA" },
  { category: "Cloud cost tool", answer: "Whalenomics — billing joined to inventory, anomalies explained by Whale AI, rightsizing and commitment advice", status: "AI use cases live · backend in progress" },
  { category: "Observability contract", answer: "Observe — logs, metrics, traces, SLOs with burn-rate alerts, synthetics, included in the licence", status: "GA" },
  { category: "ITSM for cloud operations", answer: "ITSM with P0–P4 SLAs, CMDB fed by discovery — or two-way sync with the ServiceNow or Jira you keep", status: "GA" },
  { category: "IaC and landing-zone tooling", answer: "WhaleForge (YAML → Terraform) and Landing Zone Builder (Control Tower, CLZ, GCP foundations)", status: "Beta" },
  { category: "Migration assessment suite", answer: "Migration Engine — auto-classification, 6R scoring, dependency-aware waves with rollback", status: "Assessment live · execution in progress" },
  { category: "Compliance evidence spreadsheets", answer: "Cloud Audit & Evidence — controls monitored continuously, reports per regime on demand", status: "Enterprise & up" },
];

/** Platform-level objections, answered. */
export const platformFaq = [
  { q: "What do you need from us to start?", a: "Read-only credentials for one cloud account — an IAM role, an Entra app registration or a Viewer service account — and, for on-prem, one Edge Agent per site with read access to the hypervisor. No inbound firewall rules, nothing on guest VMs." },
  { q: "SaaS, BYOC, on-prem or air-gapped — is it the same product?", a: "Yes, one build. SaaS runs in Singapore, Mumbai, Frankfurt or Los Angeles; BYOC runs the control plane in your own AWS, Azure or GCP; on-prem and air-gapped run inside your perimeter with signed offline updates. Moving between modes is an operational decision." },
  { q: "Which parts are generally available and which are not?", a: "Inventory, Cloud Connectors, Identity, Service Catalog (AWS provisioning), Observe, ITSM, Whale AI and the Government Edition are GA. WhaleForge and Landing Zone Builder are beta. The Migration Engine's assessment is live with execution hooks in progress; the Whalenomics backend is in progress with its Whale AI use cases live. Tenancy & Monetization is in preview for the Telco & Datacenter Edition, GA Q4 2026." },
  { q: "Does Whale AI send our data to a model provider?", a: "Only on SaaS, in your region, if you choose a hosted model. BYOC and sovereign deployments run your own model or ours in-region; the Government Edition runs Whale AI fully offline with zero external calls." },
  { q: "How does it fit with ServiceNow, Jira and our SIEM?", a: "Tickets sync two-way with ServiceNow and Jira; Observe forwards telemetry and findings to your SIEM; the REST API and webhooks expose everything the console does." },
  { q: "What does an evaluation look like?", a: "A half-day discovery workshop, then a 90-day prototype on your own estate with no licence cost — inventory live, cost decomposed, one audit report, one AI use case — scored on criteria agreed up front." },
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
  "Most organisations add a new estate every year — a second cloud, an edge site, a sovereign region — and governance is added afterwards, per estate. BlueWhale Stack makes governance the layer a new estate joins on day one.";

/** Why BlueWhale Stack — 6 pillars. */
export const pillars = [
  {
    icon: "Cloud",
    title: "Six public clouds and five private platforms",
    body: "AWS, Azure, Google Cloud, Oracle, Alibaba and Huawei by API; VMware, Hyper-V, Nutanix, OpenShift and KVM by Edge Agent over outbound HTTPS on 443. Hybrid and sovereign stacks attach the same way.",
  },
  {
    icon: "Eye",
    title: "One inventory, one catalog",
    body: "Every resource discovered within minutes of a connector going green, grouped by workload with owners; new resources requested from a governed catalog with Whale AI sizing instead of console access.",
  },
  {
    icon: "TrendingDown",
    title: "A bill that resolves to an owner",
    body: "Whalenomics joins billing to the inventory so every dollar has a workload, a tag and a name — anomalies explained, rightsizing and commitments recommended, chargeback per unit or tenant.",
  },
  {
    icon: "MoveRight",
    title: "Migration as a scored plan",
    body: "On-prem workloads auto-classified, scored with a 6R assessment for cost, effort and blockers, and cut into dependency-aware waves with rollback. Assessment is live; execution hooks are in progress.",
  },
  {
    icon: "ShieldCheck",
    title: "Evidence that is already there",
    body: "Observe, ITSM, one identity fabric and continuous control monitoring write to the same audit trail — so the report the auditor asks for is generated from a system of record, per regime, on demand.",
  },
  {
    icon: "Sparkles",
    title: "Whale AI in every family, including offline",
    body: "50+ use cases grounded in your live inventory, billing, tickets and findings, with citations. Hosted models, your own model, or fully offline inside the perimeter.",
  },
];

/** "How the families work together — three everyday moments." */
export const everydayMoments = [
  {
    icon: "MoveRight",
    title: "A new estate lands",
    body: "Migration & Discovery inventories it within minutes; Security & Identity extends the identity fabric to it; Governance applies the existing policy set; Whalenomics baselines its cost. It is governed from the first sync.",
  },
  {
    icon: "FileCheck",
    title: "The auditor calls",
    body: "Governance & Audit has been evaluating controls continuously across every estate, so the request becomes report parameters — regime, period, scope — and the evidence pack is generated in minutes.",
  },
  {
    icon: "Sparkles",
    title: "AI, inside the walls",
    body: "Whale AI reads operations and documentation on the customer's own model, inside the perimeter — with Observability watching it and the audit log recording it.",
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
  { icon: "LayoutTemplate", title: "One console", body: "Every connected estate in one inventory, searchable by provider, workload and owner." },
  { icon: "KeyRound", title: "One identity", body: "Your IdP federated over SAML 2.0 or OIDC; directory groups mapped to platform roles by SCIM." },
  { icon: "FileCheck", title: "One policy", body: "Residency, encryption, tagging and access written once and evaluated continuously against every estate." },
  { icon: "Wallet", title: "One bill", body: "Billing joined to the inventory, so spend resolves to a workload, a tag and an owner." },
  { icon: "Zap", title: "API-first", body: "REST API, webhooks and events — everything the console does, the API does." },
];

/** Deployment — the same product, wherever it must run. */
export const deploymentModes = [
  {
    name: "SaaS",
    badge: "Fastest start",
    body: "First account connected and inventoried in under 15 minutes. Your data stays in the region you choose — Singapore, Mumbai, Frankfurt or Los Angeles.",
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
  "Every mode runs the same platform build, so moving between modes is an operational decision. Mixed estates are common: a SaaS console governing air-gapped and edge sites through the Edge Agent.";

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
    title: "Four SaaS regions",
    body: "Singapore, Mumbai, Frankfurt and Los Angeles. Choose a region; your data stays in it.",
  },
  {
    icon: "Network",
    title: "Data residency",
    body: "Residency enforced per resource and evidenced from the audit log — DPDP in Mumbai, GDPR in Frankfurt; any other regime by BYOC, on-prem or air-gapped deployment in-country.",
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
  "One identity fabric (SAML 2.0 / OIDC) across 10 identity providers, with SCIM auto-provisioning",
  "Least-privilege, role-based access across every connected estate; credentials AES-256 at rest, TLS 1.3 in transit",
  "Continuous control monitoring; the report your auditor asks for, generated per regime on demand",
  "Data residency by region (DPDP — Mumbai, GDPR — Frankfurt); in-country by BYOC, on-prem or air-gapped elsewhere",
  "ISO/IEC 27001, 27017, 27018, 27701 and ISO 22301 certified; SOC 2 Type II readiness assessment complete",
  "Air-gapped and in-region deployment for sovereign customers, with WORM-backed audit logs in the Government Edition",
];
