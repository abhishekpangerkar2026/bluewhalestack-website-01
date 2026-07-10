/**
 * Platform module catalog — the real 11 modules, shared platform, gated per edition.
 * Honest maturity (GA / Beta / Coming) is carried in each tagline/description.
 * Groups: foundation / operations / builder / datacenter / ai
 */

export type ModuleGroup =
  | "foundation"
  | "operations"
  | "builder"
  | "datacenter"
  | "ai";

export interface ModuleDef {
  slug: string;
  name: string;
  group: ModuleGroup;
  icon: string; // lucide-react icon name
  tagline: string;
  description: string;
  features: string[];
}

export const moduleGroups: Record<ModuleGroup, string> = {
  foundation: "Foundation",
  operations: "Operate",
  builder: "Build",
  datacenter: "Datacenter",
  ai: "Intelligence",
};

export const modules: ModuleDef[] = [
  // ── Foundation ──────────────────────────────────────────────
  {
    slug: "inventory",
    name: "Inventory & Discovery",
    group: "foundation",
    icon: "Boxes",
    tagline: "A live, unified map of every asset — across every cloud and on-prem. (GA)",
    description:
      "Discover every asset across AWS, Azure, GCP, Oracle, IBM, Alibaba, VMware, Nutanix and Hyper-V, grouped by workload, with live lifecycle actions and exportable PDF / Excel / CSV reports — one inventory for the whole estate.",
    features: [
      "Discovery across 6 public clouds + on-prem & hybrid",
      "Resources grouped by workload",
      "Live lifecycle actions on assets",
      "PDF / Excel / CSV reports",
    ],
  },
  {
    slug: "cloud-connectors",
    name: "Cloud Connectors",
    group: "foundation",
    icon: "Cloud",
    tagline: "One control plane over six public clouds, plus on-prem & hybrid. (GA)",
    description:
      "Connect six public clouds live — AWS, Azure, GCP, Oracle, IBM and Alibaba (Huawei coming) — plus on-prem via the Edge Agent (VMware, Nutanix, Hyper-V) over outbound-only HTTPS, so credentials stay on-site. Some business / ITSM connectors are in beta.",
    features: [
      "6 public clouds live (AWS, Azure, GCP, Oracle, IBM, Alibaba)",
      "On-prem via Edge Agent (VMware, Nutanix, Hyper-V)",
      "Outbound-only HTTPS — no inbound firewall changes",
      "Business & ITSM connectors (some in beta)",
    ],
  },
  {
    slug: "identity",
    name: "Identity & Access",
    group: "foundation",
    icon: "KeyRound",
    tagline: "Federate your IdP and auto-provision access everywhere. (GA)",
    description:
      "Federate 9+ identity providers — Entra / Azure AD, Google IAM, AWS Identity Center, Okta, Auth0, OneLogin, on-prem AD, plus IBM, Alibaba and Oracle IAM — with auto-provisioning, so the right people get the right access across every connected cloud.",
    features: [
      "9+ IdP adapters (Entra, Okta, Auth0, AWS Identity Center & more)",
      "On-prem Active Directory support",
      "Auto-provisioning of users & access",
      "Role-based access across all clouds",
    ],
  },
  {
    slug: "provisioning",
    name: "Service Catalog",
    group: "foundation",
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
  // ── Operations ──────────────────────────────────────────────
  {
    slug: "itsm",
    name: "ITSM",
    group: "operations",
    icon: "Headset",
    tagline: "Cloud-ops-native incident, change & problem management. (GA)",
    description:
      "A cloud-ops-native ITSM stack with P0–P4 SLAs and breach detection, change and problem management, a knowledge base, CMDB, kanban boards, and a full audit trail — tickets raised straight from cloud operations.",
    features: [
      "Incidents with P0–P4 SLAs & breach detection",
      "Change, problem & knowledge management",
      "CMDB & kanban boards",
      "Full audit trail",
    ],
  },
  {
    slug: "observe",
    name: "Observe",
    group: "operations",
    icon: "Activity",
    tagline: "Production APM — logs, metrics, traces & SLOs, bundled. (GA)",
    description:
      "Production-grade observability bundled into the platform — logs, metrics, traces, SLOs with burn-rate alerts, synthetics, usage metering, and notification channels — so you get full observability without a separate Datadog contract.",
    features: [
      "Logs, metrics & traces in one place",
      "SLOs with burn-rate alerting",
      "Synthetics & usage metering",
      "Bundled — no separate Datadog needed",
    ],
  },
  {
    slug: "finops",
    name: "FinOps",
    group: "operations",
    icon: "Wallet",
    tagline: "Cost visibility, anomaly detection & chargeback. (Coming — Whale AI use-cases live)",
    description:
      "Cost visibility, anomaly detection, commitment advice, chargeback, and forecasting with pricing maps for AWS, Azure and GCP. Whale AI FinOps use-cases are live today; the full FinOps backend is in progress.",
    features: [
      "Cost visibility across AWS / Azure / GCP",
      "Anomaly detection & commitment advice",
      "Chargeback & forecasting",
      "Whale AI FinOps use-cases live today",
    ],
  },
  {
    slug: "migration",
    name: "Migration Engine",
    group: "operations",
    icon: "MoveRight",
    tagline: "6R assessment & wave planning for cloud migration. (Coming — assessment live)",
    description:
      "Auto-classify on-prem workloads and run a 6R assessment with cost, effort and blocker analysis, then plan migrations by wave and workload with Whale AI guidance. Assessment is live today; execution hooks are in progress.",
    features: [
      "Auto-classification of on-prem workloads",
      "6R assessment with cost, effort & blockers",
      "Wave & workload migration planning",
      "Whale AI migration guidance",
    ],
  },
  // ── Builder ─────────────────────────────────────────────────
  {
    slug: "whaleforge",
    name: "WhaleForge IaC",
    group: "builder",
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
  {
    slug: "landing-zone",
    name: "Landing Zone Builder",
    group: "builder",
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
  // ── AI ──────────────────────────────────────────────────────
  {
    slug: "whale-ai",
    name: "Whale AI",
    group: "ai",
    icon: "Sparkles",
    tagline: "A horizontal AI layer across every module — 50+ use cases. (GA)",
    description:
      "A horizontal AI layer spanning every module with 50+ use cases. Tiered as Spark, Tide and Abyss, with prompt caching and inline drawers, so intelligence lives where the work already happens.",
    features: [
      "50+ use cases across every module",
      "Tiers: Spark · Tide · Abyss",
      "Prompt caching & inline drawers",
      "In-region models for sovereign deployments",
    ],
  },
];

export const modulesBySlug = Object.fromEntries(
  modules.map((m) => [m.slug, m]),
) as Record<string, ModuleDef>;
