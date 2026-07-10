/** Industry verticals — the real targets, grounded in shipped capability. */

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
}

export const industries: IndustryDef[] = [
  {
    slug: "government",
    name: "Government",
    icon: "Landmark",
    title: "Sovereign. Air-gapped. In-region.",
    description:
      "BlueWhale Stack lets national and state governments govern cloud, on-prem and hybrid estates from one control plane — with air-gapped Sovereign deployment, in-region AI, and provable data residency for public-sector workloads.",
    kpis: [
      { value: "Air-gapped", label: "Sovereign deployment" },
      { value: "In-region", label: "AI / LLMs only" },
      { value: "DPDP", label: "In-country residency" },
      { value: "6", label: "Clouds + on-prem" },
    ],
    why: [
      "Deploy fully air-gapped with no call-home",
      "Keep data in-country with provable residency",
      "Govern multiple agencies from one control plane",
      "Run Whale AI with in-region models only",
      "Reduce hyperscaler lock-in",
    ],
    targets: ["Federal Government", "State Authorities", "Ministries", "Defense", "Public Sector"],
    edition: "sovereign",
    compliance: ["DPDP Act", "GDPR", "Air-gapped", "Data residency"],
    architectureId: "industry-government",
    useCases: [
      {
        title: "Sovereign, air-gapped governance across agencies",
        body: "Run an air-gapped Sovereign deployment with no outbound connectivity, unifying inventory, identity and governance across agencies through a single control plane — with every action recorded in a full audit trail.",
        modules: ["identity", "inventory"],
      },
      {
        title: "In-country data residency",
        body: "Pin workloads, inventory and audit records to an in-country region (e.g. Mumbai for DPDP), with in-region AI models so intelligence never leaves the jurisdiction.",
        modules: ["inventory", "whale-ai"],
      },
      {
        title: "Hybrid on-prem discovery without inbound firewall changes",
        body: "The Edge Agent discovers on-prem estates (VMware, Nutanix, Hyper-V) over outbound-only HTTPS — credentials never leave the premises — unifying on-prem and cloud in one inventory.",
        modules: ["inventory", "cloud-connectors"],
      },
      {
        title: "Change control with a full audit trail",
        body: "ITSM tracks every change with P0–P4 SLAs and breach detection, while identity federation maps your directory to platform roles — each change logged for evidence.",
        modules: ["itsm", "identity"],
      },
    ],
  },
  {
    slug: "telco",
    name: "Telco & MSP",
    icon: "RadioTower",
    title: "Multi-tenant. White-label. Governed.",
    description:
      "BlueWhale Stack lets telecom operators and managed service providers run multi-tenant cloud platforms — delivering governed, white-label managed services across six public clouds plus on-prem from one control plane.",
    kpis: [
      { value: "Multi-tenant", label: "Per-tenant isolation" },
      { value: "6", label: "Public clouds + on-prem" },
      { value: "100+", label: "Catalog items" },
      { value: "Partner Portal", label: "White-label resale" },
    ],
    why: [
      "Run multi-tenant cloud platforms securely",
      "Deliver governed, white-label managed services",
      "Provision from a catalog across multiple clouds",
      "Unify cloud and on-prem in one inventory",
      "Hand off cloud ops with ITSM connectors",
    ],
    targets: ["Telecom Operators", "MSPs", "CSPs", "DC Providers", "Colocation"],
    edition: "enterprise",
    compliance: ["Tenant isolation", "Audit trail", "Data residency"],
    architectureId: "industry-telco",
    useCases: [
      {
        title: "White-label resale via Partner Portal",
        body: "Give MSP and SI partners a branded experience with end-customer management and consolidated billing through the separate Partner Portal product, while each end-customer runs on the same governed platform.",
        modules: ["identity", "provisioning"],
      },
      {
        title: "Multi-tenant scale with per-tenant isolation",
        body: "Each tenant is isolated and governed; the unified inventory spans six public clouds plus on-prem, and identity federation maps each tenant's directory to platform roles.",
        modules: ["inventory", "identity"],
      },
      {
        title: "Provisioning-as-a-service from a governed catalog",
        body: "Resell self-service provisioning: AWS resources live (EC2/S3/RDS/VPC/EFS) plus Azure and GCP catalog items, all gated by approval workflows.",
        modules: ["provisioning"],
      },
      {
        title: "ITSM handoff with bidirectional connectors",
        body: "When something fails, an incident is auto-created with P0–P4 SLAs; business / ITSM connectors sync incidents both ways with the tools you already run.",
        modules: ["itsm"],
      },
    ],
  },
  {
    slug: "bfsi",
    name: "BFSI",
    icon: "Banknote",
    title: "Compliant. Governed. Audited.",
    description:
      "BlueWhale Stack lets banks, insurers and financial institutions run secure, compliant hybrid and multi-cloud operations — with federated identity, a full audit trail, bundled observability and data residency across regulated workloads.",
    kpis: [
      { value: "9+", label: "IdP adapters" },
      { value: "Audit trail", label: "Every action" },
      { value: "Bundled", label: "Observability" },
      { value: "In-region", label: "Data residency" },
    ],
    why: [
      "Federate identity and govern access centrally",
      "Keep a full audit trail of every action",
      "Run bundled observability without extra contracts",
      "Assess legacy workloads for migration (6R)",
      "Enforce data residency for regulated workloads",
    ],
    targets: ["Retail Banks", "Investment Banks", "Insurance", "Asset Managers", "Fintech"],
    edition: "enterprise",
    compliance: ["DPDP Act", "GDPR", "Audit trail", "Data residency"],
    architectureId: "industry-bfsi",
    useCases: [
      {
        title: "Federated identity with a full audit trail",
        body: "Whale Identity federates 9+ IdPs (Entra, Okta, Auth0, AWS Identity Center and more) with auto-provisioning, and every action is written to a full audit trail for evidence.",
        modules: ["identity", "inventory"],
      },
      {
        title: "Bundled observability across the estate",
        body: "Observe ingests logs, metrics and traces with SLOs and burn-rate alerts — no separate Datadog contract — and correlates anomalies into ITSM incidents.",
        modules: ["observe", "itsm"],
      },
      {
        title: "Assessed migration from legacy systems",
        body: "The Migration Engine auto-classifies on-prem workloads and runs a 6R assessment with cost, effort and blocker analysis, with on-prem sources discovered via the Edge Agent.",
        modules: ["migration", "inventory"],
      },
      {
        title: "Governed provisioning with approvals",
        body: "Provision approved resources from a governed catalog (AWS live) with approval workflows and Whale AI sizing — no console access required.",
        modules: ["provisioning", "whale-ai"],
      },
    ],
  },
  {
    slug: "healthcare",
    name: "Healthcare",
    icon: "HeartPulse",
    title: "Secure. Private. In-region.",
    description:
      "BlueWhale Stack lets healthcare providers operate secure hybrid cloud for clinical systems, research and digital health — with federated access, data residency, and air-gapped Sovereign deployment for sensitive workloads.",
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
      "BlueWhale Stack gives large, regulated enterprises one control plane for every cloud — unifying inventory, governed provisioning, bundled observability and migration across public cloud, on-prem and hybrid.",
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
    compliance: ["GDPR", "DPDP Act", "Audit trail", "SOC 2 Type II"],
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
];

export const industriesBySlug = Object.fromEntries(
  industries.map((i) => [i.slug, i]),
) as Record<string, IndustryDef>;
