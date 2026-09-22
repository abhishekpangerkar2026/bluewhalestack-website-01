/**
 * Platform module catalog — the product modules that ship, organised under
 * the nine capability families of the official Product Overview (v1.0,
 * Sept 2026): "54 capabilities · 9 families · 4 editions · 6 platform
 * classes". Families are the official taxonomy; modules are what a customer
 * turns on. Honest maturity (GA / Beta / Coming / Preview) is carried in each
 * tagline/description. The full 54-capability list with edition mapping is in
 * the technical datasheet (on request) — not reproduced here.
 */

export type ModuleGroup =
  | "management"
  | "whalenomics"
  | "security"
  | "governance"
  | "ai"
  | "migration"
  | "observability"
  | "tenancy"
  | "sovereign";

import type { CmsImage } from "@/content/cmsTypes";

export interface ModuleDef {
  /** editor-chosen hero photograph (CMS) */
  cmsImage?: CmsImage;
  /** CMS document id (click-to-edit) */
  cmsId?: string;
  slug: string;
  name: string;
  group: ModuleGroup;
  icon: string; // lucide-react icon name
  tagline: string;
  description: string;
  features: string[];
}

/** Official family names, in the order the Product Overview lays them out. */
export const moduleGroups: Record<ModuleGroup, string> = {
  management: "Management & Delivery",
  whalenomics: "Whalenomics · FinOps",
  security: "Security & Identity",
  governance: "Governance & Audit",
  ai: "Whale AI — incl. offline",
  migration: "Migration & Discovery",
  observability: "Observability & ITSM",
  tenancy: "Tenancy & Monetization",
  sovereign: "Sovereign Operations",
};

export const moduleGroupOrder: ModuleGroup[] = [
  "management",
  "whalenomics",
  "security",
  "governance",
  "ai",
  "migration",
  "observability",
  "tenancy",
  "sovereign",
];

/** One-line family descriptions, verbatim from "What Lives in the Platform Core". */
export const moduleGroupBlurbs: Record<ModuleGroup, string> = {
  management:
    "Provisioning, landing zones, blueprints and day-2 operations — delivery with governance built in.",
  whalenomics:
    "Budgets, forecasts, chargeback and continuous optimization — spend decomposed to workload, department or tenant.",
  security:
    "One identity fabric (SAML/OIDC), least-privilege access, continuous scanning — uniform posture everywhere.",
  governance:
    "Policy as configuration; controls monitored continuously; the auditor's report generated on demand.",
  ai: "AI for operations, documentation and compliance — your choice of model, able to run fully inside the perimeter.",
  migration:
    "Inventory, dependency mapping and rehearsed waves with rollback — for entry, movement between estates, and exit.",
  observability:
    "Health, events and service operations — integrated with ServiceNow, Jira and existing tooling.",
  tenancy:
    "Native multi-tenancy, catalogs, marketplace, per-tenant metering and billing feeds.",
  sovereign:
    "In-country deployment, segregation, air-gapped classes and offline-tolerant edge.",
};

export const moduleGroupIcons: Record<ModuleGroup, string> = {
  management: "Settings",
  whalenomics: "TrendingUp",
  security: "Lock",
  governance: "FileCheck",
  ai: "Sparkles",
  migration: "MoveRight",
  observability: "Eye",
  tenancy: "Users",
  sovereign: "Globe",
};

export const modules: ModuleDef[] = [
  // ── Management & Delivery ───────────────────────────────────
  {
    slug: "cloud-connectors",
    name: "Cloud Connectors",
    group: "management",
    icon: "Cloud",
    tagline: "One control plane over six public clouds, plus private, hybrid & edge. (GA)",
    description:
      "Connect six public clouds live — AWS, Azure, Google Cloud, Oracle OCI, Alibaba Cloud and Huawei Cloud — plus private and virtualization estates (VMware, Hyper-V, Nutanix, Red Hat OpenShift, bare metal and KVM) via the Edge Agent over outbound-only HTTPS, so credentials stay on-site. Hybrid and sovereign stacks (Azure Stack, Huawei Cloud Stack, Alibaba Apsara Stack) and air-gapped sites connect the same way. Some business / ITSM connectors are in beta.",
    features: [
      "6 public clouds live (AWS, Azure, GCP, Oracle, Alibaba, Huawei)",
      "Private & virtualization via Edge Agent (VMware, Hyper-V, Nutanix, OpenShift, KVM)",
      "Hybrid & sovereign stacks — Azure Stack, Huawei Cloud Stack, Apsara Stack",
      "Outbound-only HTTPS — no inbound firewall changes",
    ],
  },
  {
    slug: "provisioning",
    name: "Service Catalog",
    group: "management",
    icon: "PackagePlus",
    tagline: "Provision approved cloud resources — no consoles. (GA)",
    description:
      "A governed service catalog lets teams provision approved resources without touching cloud consoles. AWS is live today (EC2, S3, RDS, VPC, EFS), with Azure and GCP catalog items, approval workflows, and Whale AI sizing recommendations built in.",
    features: [
      "AWS provisioning live (EC2, S3, RDS, VPC, EFS)",
      "Azure & GCP catalog items",
      "Approval workflows & guardrails",
      "Whale AI sizing recommendations",
    ],
  },
  {
    slug: "landing-zone",
    name: "Landing Zone Builder",
    group: "management",
    icon: "LayoutTemplate",
    tagline: "Design compliant cloud foundations visually. (Beta)",
    description:
      "A visual designer for AWS Control Tower, Azure CLZ and GCP foundations that generates multi-account baseline HCL — so you can stand up a governed cloud foundation from a diagram.",
    features: [
      "Designer for AWS Control Tower / Azure CLZ / GCP",
      "Multi-account baseline HCL",
      "Guardrails built in",
      "Visual, diagram-driven design",
    ],
  },
  {
    slug: "whaleforge",
    name: "WhaleForge IaC",
    group: "management",
    icon: "Boxes",
    tagline: "YAML DSL → real Terraform HCL, with live diagrams. (Beta)",
    description:
      "Author infrastructure in a YAML DSL and generate real Terraform HCL for AWS, Azure and GCP, with live architecture diagrams (HLD / LLD / TOGAF), PDF export, and Git import. The deployment runner is coming next.",
    features: [
      "YAML DSL → real Terraform HCL (AWS / Azure / GCP)",
      "Live HLD / LLD / TOGAF diagrams",
      "PDF export & Git import",
      "Deployment runner coming",
    ],
  },
  // ── Whalenomics · FinOps ────────────────────────────────────
  {
    slug: "finops",
    name: "Whalenomics",
    group: "whalenomics",
    icon: "Wallet",
    tagline:
      "FinOps — budgets, forecasts, chargeback & continuous optimization. (Whale AI use-cases live; full backend in progress)",
    description:
      "Whalenomics is the FinOps family: budgets, forecasts, chargeback and continuous optimization, with spend decomposed to workload, department or tenant. Cost visibility, anomaly detection and commitment advice use pricing maps for AWS, Azure and GCP. Whale AI FinOps use-cases are live today; the full Whalenomics backend is in progress.",
    features: [
      "Spend decomposed to workload, department or tenant",
      "Budgets, forecasts & chargeback",
      "Anomaly detection & commitment advice",
      "Whale AI FinOps use-cases live today",
    ],
  },
  // ── Security & Identity ─────────────────────────────────────
  {
    slug: "identity",
    name: "Identity & Access",
    group: "security",
    icon: "KeyRound",
    tagline: "One identity fabric — federate your IdP and auto-provision access everywhere. (GA)",
    description:
      "One identity fabric (SAML/OIDC) across every estate: federate ten identity providers — Entra / Azure AD, Google IAM, AWS Identity Center, Okta, Auth0, OneLogin, on-prem AD, plus Oracle, Alibaba and Huawei IAM — with SCIM auto-provisioning and least-privilege, role-based access, so the right people get the right access across every connected cloud.",
    features: [
      "10 IdP adapters (Entra, Okta, Auth0, AWS Identity Center, AD & more)",
      "On-prem Active Directory support",
      "Auto-provisioning of users & least-privilege access",
      "Role-based access across all clouds · continuous scanning",
    ],
  },
  // ── Governance & Audit ──────────────────────────────────────
  {
    slug: "cloud-audit",
    name: "Cloud Audit & Evidence",
    group: "governance",
    icon: "FileCheck",
    tagline: "Controls monitored continuously — the auditor's report generated on demand. (Enterprise & up)",
    description:
      "Policy as configuration: residency, encryption, access, logging and tagging controls are defined once and evaluated continuously against every estate, so evidence exists all the time rather than being assembled before each inspection. The report the board, the auditor or the regulator asks for is generated per regime on demand, with obligations mapped to platform controls.",
    features: [
      "Policy as configuration across every estate",
      "Continuous control monitoring — findings routed to owners through ITSM",
      "Reports on demand for board, auditor and regulator, from a system of record",
      "Obligations mapped per regime (DPDP · GDPR · RBI · CERT-In · SEBI) and state-audit evidence",
    ],
  },
  // ── Whale AI ────────────────────────────────────────────────
  {
    slug: "whale-ai",
    name: "Whale AI",
    group: "ai",
    icon: "Sparkles",
    tagline: "A horizontal AI layer across every module — 50+ use cases, able to run fully offline. (GA)",
    description:
      "A horizontal AI layer spanning every module with 50+ use cases for operations, documentation and compliance — your choice of model, able to run fully inside the perimeter. Tiered as Spark, Tide and Abyss, with prompt caching and inline drawers, so intelligence lives where the work already happens.",
    features: [
      "50+ use cases across every module",
      "Tiers: Spark · Tide · Abyss",
      "Your choice of model — including fully offline, inside the perimeter",
      "In-region models for sovereign deployments",
    ],
  },
  // ── Migration & Discovery ───────────────────────────────────
  {
    slug: "inventory",
    name: "Inventory & Discovery",
    group: "migration",
    icon: "Boxes",
    tagline: "A live, unified map of every asset — across every cloud and on-prem. (GA)",
    description:
      "Discover every asset across AWS, Azure, GCP, Oracle, Alibaba, Huawei, VMware, Nutanix, Hyper-V and OpenShift, grouped by workload with dependency mapping, live lifecycle actions and exportable PDF / Excel / CSV reports — one inventory for the whole estate.",
    features: [
      "Discovery across 6 public clouds + private, hybrid & edge",
      "Resources grouped by workload, with dependency mapping",
      "Live lifecycle actions on assets",
      "PDF / Excel / CSV reports",
    ],
  },
  {
    slug: "migration",
    name: "Migration Engine",
    group: "migration",
    icon: "MoveRight",
    tagline: "6R assessment, rehearsed waves & rollback for cloud migration. (Coming — assessment live)",
    description:
      "Auto-classify on-prem workloads and run a 6R assessment with cost, effort and blocker analysis, then plan rehearsed migration waves with rollback across six platforms, with Whale AI guidance. Assessment and wave planning are live today; execution hooks are in progress.",
    features: [
      "Auto-classification of on-prem workloads",
      "6R assessment with cost, effort & blockers",
      "Rehearsed waves with rollback — entry, movement and exit",
      "Whale AI migration guidance",
    ],
  },
  // ── Observability & ITSM ────────────────────────────────────
  {
    slug: "observe",
    name: "Observe",
    group: "observability",
    icon: "Activity",
    tagline: "Production APM — logs, metrics, traces & SLOs, bundled. (GA)",
    description:
      "Production-grade observability bundled into the platform — logs, metrics, traces, SLOs with burn-rate alerts, synthetics, usage metering, and notification channels — so you get full observability without a separate monitoring contract.",
    features: [
      "Logs, metrics & traces in one place, correlated to the inventory",
      "SLOs with burn-rate alerting",
      "Synthetics & usage metering",
      "Included in the platform licence — no separate observability contract",
    ],
  },
  {
    slug: "itsm",
    name: "ITSM",
    group: "observability",
    icon: "Headset",
    tagline: "Cloud-ops-native incident, change & problem management. (GA)",
    description:
      "A cloud-ops-native ITSM stack with P0–P4 SLAs and breach detection, change and problem management, a knowledge base, CMDB, kanban boards, and a full audit trail — tickets raised straight from cloud operations, integrated with ServiceNow, Jira and existing tooling.",
    features: [
      "Incidents with P0–P4 SLAs & breach detection",
      "Change, problem & knowledge management",
      "CMDB & kanban boards · ServiceNow / Jira integration",
      "Full audit trail",
    ],
  },
  // ── Tenancy & Monetization ──────────────────────────────────
  {
    slug: "tenancy",
    name: "Tenancy & Monetization",
    group: "tenancy",
    icon: "Users",
    tagline:
      "Native multi-tenancy, catalogs, marketplace and per-tenant metering. (Telco & Datacenter Edition — preview, GA Q4 2026)",
    description:
      "The Digital Experience Layer for operators: native multi-tenancy with strict isolation, service catalogs and a white-label marketplace, self-service, and per-tenant metering with billing feeds into your own BSS — so operators publish governed cloud services to their customers under their own brand.",
    features: [
      "Native multi-tenancy with per-tenant isolation and quotas",
      "White-label portals, catalog & marketplace",
      "Per-tenant metering and billing feeds (OSS/BSS, invoicing)",
      "SLA accountability and tenant-health visibility",
    ],
  },
  // ── Sovereign Operations ────────────────────────────────────
  {
    slug: "sovereign-operations",
    name: "Sovereign Operations",
    group: "sovereign",
    icon: "Landmark",
    tagline: "In-country deployment, segregation, air-gapped classes and offline-tolerant edge. (Government Edition)",
    description:
      "Sovereignty by architecture: in-country deployment, directorate-level segregation under central policy, air-gapped deployment classes for the most sensitive estates, and offline-tolerant edge sites — with Whale AI operating entirely inside the perimeter and state-audit evidence generated continuously.",
    features: [
      "In-country and air-gapped deployment classes",
      "Segregation under central policy — autonomy inside national guardrails",
      "Offline-tolerant edge for disconnected sites",
      "Whale AI fully inside the perimeter — zero external exposure",
    ],
  },
];

export const modulesBySlug = Object.fromEntries(
  modules.map((m) => [m.slug, m]),
) as Record<string, ModuleDef>;
