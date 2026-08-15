/** Outcome-focused solutions, grounded in real platform capability. */

export interface SolutionDef {
  slug: string;
  name: string;
  icon: string;
  summary: string;
  problem: string;
  features: string[];
  outcomes: { value: string; label: string }[];
  audience: string;
  modules: string[]; // related module slugs
  /** ordered data-flow steps (how it works) */
  flow?: string[];
  /** recommended edition slugs */
  editions?: string[];
  /** key into content/architecture.ts diagrams */
  architectureId?: string;
}

export const solutions: SolutionDef[] = [
  {
    slug: "unified-cloud-inventory",
    name: "Unified Cloud Inventory",
    icon: "Boxes",
    summary:
      "One live, unified inventory of every asset across six public clouds plus on-prem and hybrid — grouped by workload, with live lifecycle actions and exportable reports.",
    problem:
      "Teams run AWS, Azure, GCP, Oracle and on-prem in separate consoles, so nobody has a single, current map of what the organisation is actually running.",
    features: [
      "Discovery across 6 public clouds + on-prem & hybrid",
      "On-prem via the Edge Agent (outbound-only HTTPS)",
      "Resources grouped by workload, with lifecycle actions",
      "PDF / Excel / CSV reports",
    ],
    outcomes: [
      { value: "6", label: "Public clouds + on-prem" },
      { value: "1", label: "Unified inventory" },
      { value: "Live", label: "Lifecycle actions" },
      { value: "GA", label: "Shipping today" },
    ],
    audience: "CIOs, Heads of Infrastructure, and cloud platform teams who need one map of the estate.",
    modules: ["inventory", "cloud-connectors", "identity"],
    architectureId: "platform",
    editions: ["standard", "enterprise"],
    flow: [
      "Connect six public clouds and on-prem via the Edge Agent over outbound-only HTTPS.",
      "Every asset is auto-discovered and grouped by workload in one inventory.",
      "Live lifecycle actions let teams act on assets directly from the control plane.",
      "Reports export to PDF, Excel or CSV for stakeholders and audits.",
      "The same inventory feeds provisioning, observability, migration and governance.",
    ],
  },
  {
    slug: "ai-native-provisioning",
    name: "AI-Native Provisioning",
    icon: "PackagePlus",
    summary:
      "Provision approved cloud resources from a governed catalog — no consoles — with approval workflows and Whale AI sizing. AWS is live today, with Azure and GCP catalog items.",
    problem:
      "Self-service provisioning usually means console sprawl and inconsistent sizing, with no guardrails and no record of who provisioned what.",
    features: [
      "AWS provisioning live (EC2, S3, RDS, VPC, EFS)",
      "Azure & GCP catalog items",
      "Approval workflows & guardrails",
      "Whale AI sizing recommendations",
    ],
    outcomes: [
      { value: "AWS", label: "Provisioning live" },
      { value: "EC2/S3/RDS", label: "+ VPC / EFS" },
      { value: "Whale AI", label: "Sizing built in" },
      { value: "GA", label: "Shipping today" },
    ],
    audience: "Platform engineering teams and cloud operations who want governed self-service.",
    modules: ["provisioning", "whale-ai", "identity"],
    architectureId: "platform",
    editions: ["standard", "enterprise"],
    flow: [
      "Teams browse a governed catalog of approved resources — no cloud console needed.",
      "Whale AI recommends sizing for the request before it is submitted.",
      "Approval workflows gate the request against policy.",
      "AWS resources (EC2/S3/RDS/VPC/EFS) are provisioned live; Azure and GCP via catalog items.",
      "Every provisioned asset lands in the unified inventory and audit trail.",
    ],
  },
  {
    slug: "bundled-observability",
    name: "Bundled Observability",
    icon: "Activity",
    summary:
      "Production-grade observability bundled into the platform — logs, metrics, traces, SLOs with burn-rate alerts, synthetics and usage metering — without a separate Datadog contract.",
    problem:
      "Observability is usually a separate, expensive contract bolted onto the cloud platform, with its own identity, data and alerting to maintain.",
    features: [
      "Logs, metrics & traces in one place",
      "SLOs with burn-rate alerting",
      "Synthetics & usage metering",
      "Notification channels & ITSM correlation",
    ],
    outcomes: [
      { value: "Bundled", label: "No separate Datadog" },
      { value: "Logs/Metrics/Traces", label: "Unified" },
      { value: "SLOs", label: "Burn-rate alerts" },
      { value: "GA", label: "Shipping today" },
    ],
    audience: "SRE, platform and operations teams who want observability inside the control plane.",
    modules: ["observe", "itsm", "inventory"],
    architectureId: "platform",
    editions: ["enterprise", "enterprise-plus"],
    flow: [
      "Telemetry — logs, metrics and traces — flows into the bundled observability tier.",
      "SLOs are defined with burn-rate alerts; synthetics probe critical paths.",
      "Usage metering tracks consumption across the estate.",
      "Anomalies and breaches raise notifications and correlate into ITSM incidents.",
      "Everything sits on the same identity, data and audit tier as the rest of the platform.",
    ],
  },
  {
    slug: "cloud-migration",
    name: "Cloud Migration",
    icon: "MoveRight",
    summary:
      "Auto-classify on-prem workloads and run a 6R assessment with cost, effort and blocker analysis, then plan by wave and workload — with Whale AI guidance. Assessment is live today.",
    problem:
      "Migrations stall because nobody has a clear, costed view of which workloads to move, in what order, and what will block them.",
    features: [
      "Auto-classification of on-prem workloads",
      "6R assessment with cost, effort & blockers",
      "Wave & workload migration planning",
      "Whale AI migration guidance",
    ],
    outcomes: [
      { value: "6R", label: "Assessment" },
      { value: "Wave", label: "Planning" },
      { value: "Whale AI", label: "Guidance" },
      { value: "Live", label: "Assessment shipping" },
    ],
    audience: "CIOs and Heads of Infrastructure running data-center-exit and cloud-migration programs.",
    modules: ["migration", "inventory", "cloud-connectors"],
    architectureId: "platform",
    editions: ["enterprise", "enterprise-plus"],
    flow: [
      "On-prem workloads are discovered via the Edge Agent and auto-classified.",
      "A 6R assessment scores each workload for cost, effort and blockers.",
      "Workloads are grouped into migration waves with Whale AI guidance.",
      "Plans are reviewed against the unified inventory and dependencies.",
      "Assessment is live today; execution hooks are in progress.",
    ],
  },
  {
    slug: "security-compliance",
    name: "Security & Compliance",
    icon: "ShieldCheck",
    summary:
      "Federated identity, role-based access and a full audit trail across every connected cloud — with data residency and air-gapped options for the most regulated estates.",
    problem:
      "Access and audit are fragmented across clouds and tools, and regulators increasingly demand provable residency and a single, trustworthy record of who did what.",
    features: [
      "9+ IdP adapters with auto-provisioning",
      "Role-based access across all clouds",
      "Full audit trail of platform activity",
      "Data residency & air-gapped options",
    ],
    outcomes: [
      { value: "9+", label: "IdP adapters" },
      { value: "DPDP/GDPR", label: "Residency" },
      { value: "ISO 27001", label: "Certified" },
      { value: "Air-gap", label: "Sovereign option" },
    ],
    audience: "CISOs, Heads of Cloud Security and compliance officers in regulated industries.",
    modules: ["identity", "itsm", "inventory"],
    architectureId: "platform",
    editions: ["enterprise", "sovereign"],
    flow: [
      "Federate 9+ identity providers with auto-provisioning so the right people get the right access.",
      "Role-based access is enforced consistently across every connected cloud.",
      "Every action is written to a full audit trail.",
      "Data residency pins workloads and records to an in-country region (e.g. Mumbai for DPDP, Frankfurt for GDPR).",
      "For the strictest estates, deploy air-gapped Sovereign with in-region AI only.",
    ],
  },
  {
    slug: "sovereign-cloud",
    name: "Sovereign Cloud",
    icon: "Landmark",
    summary:
      "Run the platform fully air-gapped and in-country with in-region LLMs only — provable data residency, no call-home, for regulated and government estates.",
    problem:
      "Data-residency law and national regulators demand to know exactly where data lives, who operates it, and who has access — which most hyperscaler-only deployments cannot prove.",
    features: [
      "Air-gapped Sovereign deployment",
      "In-region LLMs only — no call-home",
      "BYOC option in your own cloud",
      "Provable data residency & sovereignty",
    ],
    outcomes: [
      { value: "Air-gapped", label: "No call-home" },
      { value: "In-region", label: "LLMs only" },
      { value: "BYOC", label: "Or your cloud" },
      { value: "4", label: "Regions (SIN/BOM/FRA/LAX)" },
    ],
    audience: "National governments, defense agencies, central banks and regulated public sector.",
    modules: ["identity", "inventory", "whale-ai"],
    architectureId: "platform",
    editions: ["sovereign", "enterprise"],
    flow: [
      "The platform is deployed inside national borders — BYOC or fully air-gapped.",
      "An air-gapped control plane runs with no outbound connectivity or call-home.",
      "Data-residency rules are enforced on every resource and record.",
      "In-region LLMs deliver Whale AI without data leaving the jurisdiction.",
      "Sovereignty is provable on demand through the audit trail and residency controls.",
    ],
  },
];

export const solutionsBySlug = Object.fromEntries(
  solutions.map((s) => [s.slug, s]),
) as Record<string, SolutionDef>;
