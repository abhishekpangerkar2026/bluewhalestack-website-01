/**
 * Industry verticals — the real targets, grounded in shipped capability.
 *
 * Edition availability (mirrors content/editions.ts):
 *   Standard · Enterprise · Government — generally available today.
 *   Telco · Datacenter — in preview, GA Q4 2026 (comingSoon + gaTarget).
 * Pages derive preview badges from the tied edition, so keep `edition`
 * slugs in sync with editions.ts.
 */

export interface IndustryDef {
  slug: string;
  name: string;
  icon: string;
  title: string;
  description: string;
  kpis: { value: string; label: string }[];
  why: string[];
  targets: string[];
  edition: string; // primary edition slug tie-in
  compliance: string[];
  /** key into content/architecture.ts diagrams */
  architectureId?: string;
  /** concrete industry use cases (grounded in real product modules) */
  useCases?: { title: string; body: string; modules?: string[] }[];
  /** one-line outcome statement — used in the cross-industry architecture diagram */
  outcome: string;
}

export const industries: IndustryDef[] = [
  {
    slug: "government",
    name: "Government",
    icon: "Landmark",
    title: "Sovereign. Air-gapped. In-region.",
    description:
      "BlueWhale Stack lets national and state governments govern cloud, on-prem and hybrid estates from one control plane. The Government Edition — generally available today — deploys fully air-gapped with FIPS-validated crypto, an immutable WORM-backed audit log, in-region AI, and provable data residency for public-sector workloads.",
    kpis: [
      { value: "Air-gapped", label: "Sovereign deployment, no call-home" },
      { value: "FIPS", label: "Validated cryptography" },
      { value: "WORM", label: "Immutable audit log" },
      { value: "In-region", label: "AI / LLMs only" },
    ],
    why: [
      "Deploy fully air-gapped with an offline update channel and no call-home",
      "Keep data in-country with residency enforcement and provable audit evidence",
      "Harden access with always-on PAM, session recording and mandatory MFA",
      "Run Whale AI with in-region models only — intelligence never leaves the jurisdiction",
      "Connect sovereign clouds: AWS GovCloud, Azure Government, Google Distributed Cloud and national clouds",
      "Export compliance packs for FedRAMP / IRAP / StateRAMP-style accreditation",
    ],
    targets: ["Federal Government", "State Authorities", "Ministries", "Defense", "Public Sector"],
    edition: "government",
    outcome: "Sovereign & audited",
    compliance: ["Air-gapped", "FIPS crypto", "WORM audit log", "DPDP Act", "GDPR", "Data residency"],
    architectureId: "industry-government",
    useCases: [
      {
        title: "Sovereign, air-gapped governance across agencies",
        body: "Run an air-gapped Government Edition deployment with no outbound connectivity and an offline update channel, unifying inventory, identity and governance across agencies through a single control plane.",
        modules: ["identity", "inventory"],
      },
      {
        title: "In-country data residency with in-region AI",
        body: "Pin workloads, inventory and audit records to an in-country region (e.g. Mumbai for DPDP), with in-region AI models and no call-home — so intelligence never leaves the jurisdiction.",
        modules: ["inventory", "whale-ai"],
      },
      {
        title: "Hardened privileged access",
        body: "PAM is always-on with session recording, MFA is mandatory on every role, and identity federation maps your directory to platform roles — so privileged access is provably controlled.",
        modules: ["identity", "itsm"],
      },
      {
        title: "Accreditation evidence on demand",
        body: "Every action lands in an immutable, WORM-backed audit log, and compliance pack export assembles the evidence for FedRAMP / IRAP / StateRAMP-style accreditation — with ITSM change control (P0–P4 SLAs) behind it.",
        modules: ["itsm", "inventory"],
      },
    ],
  },
  {
    slug: "bfsi",
    name: "BFSI",
    icon: "Banknote",
    title: "Compliant. Governed. Audited.",
    description:
      "BlueWhale Stack lets banks, insurers and financial institutions run secure, compliant hybrid and multi-cloud operations on the Enterprise Edition — with federated identity, a full audit trail, bundled observability, FinOps chargeback and data residency across regulated workloads. For Indian banks and NBFCs, the same control plane carries RBI, CERT-In, DPDP and SEBI obligations at the platform layer: a control proven once is evidenced identically to every regulator. Available today.",
    kpis: [
      { value: "9+", label: "IdP adapters" },
      { value: "6", label: "Regimes on one control plane" },
      { value: "Bundled", label: "Observability + FinOps" },
      { value: "In-region", label: "Data residency" },
    ],
    why: [
      "Federate identity and govern access centrally, with maker-checker role separation",
      "Keep a full audit trail of every action — evidence generated, not assembled by hand",
      "Turn the RBI outsourcing exit strategy into a rehearsed, evidenced migration programme",
      "Meet CERT-In's 6-hour incident reporting and 180-day log-retention obligations",
      "Run bundled observability without extra contracts, feeding your SIEM/SOC",
      "Show cost per business unit with FinOps chargeback the CFO can decompose",
      "Assess legacy workloads for migration (6R) without touching core-banking internals",
      "Enforce in-India data residency for payment data and regulated workloads",
    ],
    targets: ["Retail Banks", "Investment Banks", "NBFCs", "Insurance", "Asset Managers", "Fintech"],
    edition: "enterprise",
    outcome: "Compliant & audited",
    compliance: ["RBI IT Outsourcing", "CERT-In", "SEBI CSCRF", "DPDP Act", "Data residency"],
    architectureId: "industry-bfsi",
    useCases: [
      {
        title: "Federated identity with maker-checker",
        body: "Whale Identity federates 9+ IdPs (Entra, Okta, Auth0, AWS Identity Center and more) with auto-provisioning and role-separated approval workflows, and every action is written to a full audit trail for evidence.",
        modules: ["identity", "inventory"],
      },
      {
        title: "The RBI exit plan, rehearsed",
        body: "The Migration Engine turns the RBI outsourcing exit strategy from an annexure nobody has tested into a dependency-mapped, rehearsable migration programme — with drill evidence filed, not just an annual review.",
        modules: ["migration", "inventory"],
      },
      {
        title: "Inspection evidence, generated not assembled",
        body: "Continuous security scanning, Observe and centralized activity logging feed audit-ready reports the board and the RBI examiner read from the same source — with retention tuned to CERT-In's 180-day requirement.",
        modules: ["observe", "itsm"],
      },
      {
        title: "A cloud bill the CFO can decompose",
        body: "Whalenomics gives every business unit its own budget, forecast and chargeback, so payment-peak capacity is planned with a price tag and idle spend surfaces continuously — instead of one invoice nobody owns.",
        modules: ["finops", "inventory"],
      },
    ],
  },
  {
    slug: "healthcare",
    name: "Healthcare",
    icon: "HeartPulse",
    title: "Secure. Private. In-region.",
    description:
      "BlueWhale Stack lets healthcare providers operate secure hybrid cloud for clinical systems, research and digital health on the Enterprise Edition — with federated access, data residency, and air-gapped Sovereign deployment for sensitive workloads. Available today.",
    kpis: [
      { value: "In-region", label: "Data residency" },
      { value: "Air-gap", label: "Sovereign option" },
      { value: "9+", label: "IdP adapters" },
      { value: "Audit trail", label: "Every action" },
    ],
    why: [
      "Keep patient data in-country with residency controls",
      "Deploy air-gapped Sovereign for sensitive networks",
      "Federate access for clinical and research staff",
      "Govern cloud and on-prem in one inventory",
      "Keep a full audit trail for evidence",
    ],
    targets: ["Hospitals", "CROs", "Pharma", "Health Insurance", "Digital Health"],
    edition: "enterprise",
    outcome: "Private & in-region",
    compliance: ["GDPR", "DPDP Act", "Data residency", "Air-gapped"],
    architectureId: "industry-healthcare",
    useCases: [
      {
        title: "Patient data residency & in-region storage",
        body: "Pin workloads, inventory and audit records to an in-country region (e.g. Mumbai for DPDP, Frankfurt for GDPR) — with air-gapped Sovereign available for networks behind strict firewalls.",
        modules: ["inventory", "identity"],
      },
      {
        title: "Federated access for clinical & research staff",
        body: "Federate your IdP with auto-provisioning so a new hire is granted the right role on first login, and offboarded automatically on the next directory sync.",
        modules: ["identity"],
      },
      {
        title: "Change control with audit evidence",
        body: "Every production change is tracked through ITSM with P0–P4 SLAs and breach detection, with a full record retained for auditors.",
        modules: ["itsm", "inventory"],
      },
      {
        title: "Bundled observability for clinical systems",
        body: "Observe gives logs, metrics, traces and SLOs in one place, raising incidents automatically when a critical system degrades.",
        modules: ["observe", "itsm"],
      },
    ],
  },
  {
    slug: "regulated-enterprise",
    name: "Regulated Enterprise",
    icon: "Building2",
    title: "Govern. Standardize. Scale.",
    description:
      "BlueWhale Stack gives large, regulated enterprises one control plane for every cloud on the Enterprise Edition — unifying inventory, governed provisioning, bundled observability and migration across public cloud, on-prem and hybrid. Available today as SaaS, BYOC or fully Sovereign.",
    kpis: [
      { value: "11", label: "Modules, one platform" },
      { value: "6", label: "Public clouds + on-prem" },
      { value: "50+", label: "Whale AI use cases" },
      { value: "SaaS/BYOC/Sovereign", label: "Deployment models" },
    ],
    why: [
      "Manage AWS, Azure, GCP, Oracle & on-prem in one place",
      "Standardize provisioning with governed catalogs",
      "Run bundled observability without extra contracts",
      "Assess workloads for migration with 6R analysis",
      "Deploy as SaaS, BYOC or fully sovereign",
    ],
    targets: ["Large Enterprises", "IT Teams", "Platform Engineering", "Financial Services", "Retail"],
    edition: "enterprise",
    outcome: "Standardized at scale",
    compliance: ["GDPR", "DPDP Act", "Audit trail", "SOC 2 Type II (readiness)"],
    architectureId: "industry-enterprise-saas",
    useCases: [
      {
        title: "Identity sync & auto-provisioning from your IdP",
        body: "Federate Okta, Auth0 or Entra ID; Whale Identity syncs groups to platform roles, so a new hire logs in once and is auto-granted the right role — and offboarded on the next directory sync.",
        modules: ["identity"],
      },
      {
        title: "One inventory across every cloud and on-prem",
        body: "Discover every asset across six public clouds plus on-prem and hybrid, grouped by workload, with exportable reports for stakeholders.",
        modules: ["inventory", "cloud-connectors"],
      },
      {
        title: "Standardized, governed provisioning",
        body: "Standardize delivery through a governed catalog (AWS live) with approval workflows and Whale AI sizing, integrated with ITSM so every change is tracked.",
        modules: ["provisioning", "itsm"],
      },
      {
        title: "Bundled observability & migration assessment",
        body: "Get logs, metrics, traces and SLOs bundled in, and assess on-prem workloads for migration with a 6R analysis when you're ready to move.",
        modules: ["observe", "migration"],
      },
    ],
  },
  {
    slug: "saas",
    name: "SaaS & Digital Native",
    icon: "Rocket",
    title: "Start governed. Scale fast.",
    description:
      "BlueWhale Stack gives SaaS companies and digital-native teams governed cloud from day one on the Standard Edition — cloud inventory, governed provisioning, security scanning, audit and Whale AI Spark across AWS, Azure and GCP, with a clean upgrade path to Enterprise as you grow. Available today.",
    kpis: [
      { value: "3", label: "Clouds: AWS · Azure · GCP" },
      { value: "SaaS / BYOC", label: "Deployment models" },
      { value: "1M", label: "Whale AI tokens / month" },
      { value: "99.5%", label: "Platform SLA" },
    ],
    why: [
      "See every resource across AWS, Azure and GCP in one inventory",
      "Provision from a governed catalog instead of shared console access",
      "Catch misconfigurations with security scanning and audit reports",
      "Connect the CRM, ERP and ITSM tools you already run",
      "Grow into Enterprise — same platform, more clouds, more modules",
    ],
    targets: ["SaaS Companies", "Startups", "Scale-ups", "Digital Natives", "Departmental IT"],
    edition: "standard",
    outcome: "Governed from day one",
    compliance: ["Security scanning", "Audit reports", "IdP federation", "GDPR"],
    architectureId: "edition-standard",
    useCases: [
      {
        title: "One inventory from the first account",
        body: "Connect AWS, Azure and GCP accounts and get a single, searchable inventory of everything you run — before sprawl sets in.",
        modules: ["inventory", "cloud-connectors"],
      },
      {
        title: "Self-service provisioning with guardrails",
        body: "Engineers provision from a governed catalog (AWS live) with approval workflows and Whale AI sizing — no shared console credentials, no surprise resources.",
        modules: ["provisioning", "whale-ai"],
      },
      {
        title: "SSO and role mapping from your IdP",
        body: "Federate the IdP you already use; groups map to platform roles automatically, so access follows your directory instead of a spreadsheet.",
        modules: ["identity"],
      },
      {
        title: "Lightweight ITSM with business connectors",
        body: "Track incidents and changes with basic ITSM, and sync with the CRM, ERP or ITSM tools you already run through business connectors.",
        modules: ["itsm", "cloud-connectors"],
      },
    ],
  },
  {
    slug: "telco",
    name: "Telco & MSP",
    icon: "RadioTower",
    title: "Carrier-grade. Multi-tenant. Network-native.",
    description:
      "BlueWhale Stack lets telecom operators and MSPs run multi-tenant, white-label managed services today. The Telco Edition — now in preview, GA Q4 2026 — extends the same control plane to the network itself: VNF/CNF discovery, 5G core awareness, MEC site fleets, OSS/BSS integration and a five-nines control plane.",
    kpis: [
      { value: "99.999%", label: "Telco Edition control-plane SLA" },
      { value: "5G-aware", label: "AMF · SMF · UPF · slices" },
      { value: "MEC", label: "Edge site fleets at scale" },
      { value: "Q4 2026", label: "Telco Edition GA" },
    ],
    why: [
      "Run multi-tenant, white-label managed services on the platform today",
      "Provision from a governed catalog across multiple clouds",
      "Discover and manage VNFs, CNFs and NFVI/VIM alongside cloud (Telco Edition preview)",
      "Operate 5G core functions and network slices from the same plane (preview)",
      "Integrate OSS/BSS: Amdocs, Netcracker, Ericsson, Nokia, TM Forum (preview)",
      "Carrier-grade service assurance on a five-nines control plane (preview)",
    ],
    targets: ["Telecom Operators", "MVNOs", "MSPs", "CSPs", "Carrier-grade MSPs"],
    edition: "telco",
    outcome: "Carrier-grade (preview)",
    compliance: ["Tenant isolation", "Audit trail", "Carrier SLAs", "Data residency"],
    architectureId: "industry-telco",
    useCases: [
      {
        title: "White-label resale via Partner Portal — today",
        body: "Give MSP and SI partners a branded experience with end-customer management and consolidated billing through the separate Partner Portal product, while each end-customer runs on the same governed platform.",
        modules: ["identity", "provisioning"],
      },
      {
        title: "Multi-tenant scale with per-tenant isolation — today",
        body: "Each tenant is isolated and governed; the unified inventory spans six public clouds plus on-prem, and identity federation maps each tenant's directory to platform roles.",
        modules: ["inventory", "identity"],
      },
      {
        title: "Network estate in the same inventory — preview",
        body: "The Telco Edition discovers VNFs, CNFs and NFVI/VIM alongside your cloud estate, with 5G core awareness (AMF, SMF, UPF, slices) — one inventory from RAN edge to public cloud. GA Q4 2026.",
        modules: ["inventory", "cloud-connectors"],
      },
      {
        title: "MEC fleets & service assurance — preview",
        body: "Manage MEC sites as a fleet with service assurance and carrier-grade SLA tracking feeding ITSM, on a control plane engineered for five-nines. GA Q4 2026.",
        modules: ["observe", "itsm"],
      },
    ],
  },
  {
    slug: "datacenter",
    name: "Datacenter & Colocation",
    icon: "Server",
    title: "Racks to clouds. One plane.",
    description:
      "BlueWhale Stack's Datacenter Edition — now in preview, GA Q4 2026 — extends the platform to the physical facility: rack, row and cage inventory at U-position level, power and cooling management, space and capacity planning, metered colo tenant billing and a white-label portal under your own brand.",
    kpis: [
      { value: "U-level", label: "Rack · row · cage inventory" },
      { value: "A/B", label: "Power feeds · PDU · kW" },
      { value: "White-label", label: "Your brand, your domain" },
      { value: "Q4 2026", label: "Datacenter Edition GA" },
    ],
    why: [
      "Track racks, rows and cages to the U position — next to the clouds you already govern",
      "Manage power (PDU, kW, A/B feeds) and cooling (CRAC/CRAH) with environmental telemetry",
      "Plan space, capacity, cross-connects and access control in one system",
      "Bill colo tenants on metered usage through the Partner Portal",
      "White-label the portal with your logo, colours and domain",
    ],
    targets: ["Colocation Operators", "DC Operators", "Managed DC Providers", "Edge DC Operators", "Hosting Providers"],
    edition: "datacenter",
    outcome: "One plane, every rack (preview)",
    compliance: ["Tenant isolation", "Access control", "Audit trail", "Metered billing"],
    architectureId: "edition-datacenter",
    useCases: [
      {
        title: "Physical + cloud inventory in one plane",
        body: "DCIM inventory at U-position level — sites, racks, servers — sits in the same control plane as your public-cloud estate, so 'where does this workload run' has one answer.",
        modules: ["inventory", "cloud-connectors"],
      },
      {
        title: "Power, cooling & capacity telemetry",
        body: "PDU, kW and A/B feed data plus CRAC/CRAH environmental telemetry flow into Observe, with capacity planning across space, power and cooling.",
        modules: ["observe", "inventory"],
      },
      {
        title: "Metered colo billing, white-labeled",
        body: "Meter tenant usage and bill it through the Partner Portal under your own brand — logo, colours and domain — with Whale Nomics behind the numbers.",
        modules: ["finops", "identity"],
      },
      {
        title: "Operator-grade change & incident management",
        body: "Access control and badging events, cross-connect changes and facility incidents run through ITSM with P0–P4 SLAs and a full audit trail.",
        modules: ["itsm", "identity"],
      },
    ],
  },
];

export const industriesBySlug = Object.fromEntries(
  industries.map((i) => [i.slug, i]),
) as Record<string, IndustryDef>;
