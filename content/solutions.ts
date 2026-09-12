/**
 * Outcome-focused solutions, grounded in real platform capability. Maturity
 * is stated inside the copy (what is live, what is in progress) — see
 * content/modules.ts for the module-level ledger.
 */

export interface SolutionDef {
  slug: string;
  name: string;
  icon: string;
  /** one line for cards */
  summary: string;
  /** hero description — what it is, who it is for, what changes (2–3 sentences) */
  description: string;
  problem: string;
  /** the three symptoms the problem shows up as, each with its cost */
  symptoms: string[];
  features: string[];
  /** three proof facts for the hero strip */
  facts: { value: string; label: string }[];
  audience: string;
  modules: string[]; // related module slugs
  /** ordered data-flow steps (how it works) */
  flow?: string[];
  /** recommended edition slugs */
  editions?: string[];
  /** key into content/architecture.ts diagrams */
  architectureId?: string;
  /** customer story slug (content/customers.ts) that proves this outcome */
  story?: string;
  faq: { q: string; a: string }[];
}

export const solutions: SolutionDef[] = [
  {
    slug: "unified-cloud-inventory",
    name: "Unified Cloud Inventory",
    icon: "Boxes",
    summary:
      "One live inventory of every resource across six public clouds plus on-prem and hybrid — grouped by workload, with lifecycle actions and exportable reports.",
    description:
      "Unified Cloud Inventory gives platform, security and finance teams one current map of everything the organisation runs: AWS, Azure, Google Cloud, Oracle, Alibaba and Huawei by API, and VMware, Hyper-V, Nutanix and OpenShift through the Edge Agent. Resources are grouped into workloads with their dependencies, so a question like 'what runs in Mumbai and who owns it' is a filter, not a week of spreadsheet reconciliation.",
    problem:
      "Teams run AWS, Azure, GCP, Oracle and on-prem in separate consoles, so nobody has a single, current map of what the organisation is actually running.",
    symptoms: [
      "Six consoles and a spreadsheet — the CMDB is out of date the day it is exported.",
      "Ownership is unknown for a large share of resources, so idle spend and orphaned access persist.",
      "Every audit, migration and cost exercise starts by rebuilding the same inventory by hand.",
    ],
    features: [
      "Discovery across 6 public clouds + on-prem & hybrid",
      "On-prem via the Edge Agent (outbound-only HTTPS on 443)",
      "Resources grouped by workload, with dependency mapping and lifecycle actions",
      "PDF / Excel / CSV reports, and the REST API for your CMDB",
    ],
    facts: [
      { value: "< 15 min", label: "From connecting a cloud account to its first full inventory" },
      { value: "6 + on-prem", label: "Public clouds by API, private platforms by Edge Agent" },
      { value: "15 min", label: "Default re-discovery interval, with change events where the provider offers them" },
    ],
    audience: "CIOs, Heads of Infrastructure, and cloud platform teams who need one map of the estate.",
    modules: ["inventory", "cloud-connectors", "identity"],
    architectureId: "platform",
    editions: ["standard", "enterprise"],
    story: "media-qatar-network",
    flow: [
      "Connect six public clouds with read-only credentials, and on-prem sites via the Edge Agent over outbound-only HTTPS.",
      "Every resource is discovered, normalised to one schema and grouped by workload.",
      "Teams search, filter and act on resources from the control plane; every action lands in the audit log.",
      "Reports export to PDF, Excel or CSV; the API feeds your CMDB or GRC tool.",
      "The same inventory feeds provisioning, observability, migration and governance.",
    ],
    faq: [
      { q: "What permissions does discovery need?", a: "Read-only: an IAM role with a read policy on AWS, the Reader role on Azure subscriptions, the Viewer role on GCP projects, and equivalent read keys on Oracle, Alibaba and Huawei. Write actions are granted separately, per policy." },
      { q: "How is on-prem discovered?", a: "One Edge Agent per site talks to the hypervisor APIs — vCenter, Hyper-V, Prism, OpenShift — and reports over outbound HTTPS. Nothing is installed on guest VMs and no inbound firewall rule is needed." },
      { q: "Can it replace our CMDB?", a: "It can be the source for it. Configuration items and relationships come from live discovery, and the REST API or CSV export feeds ServiceNow or whichever CMDB you keep as the system of record." },
    ],
  },
  {
    slug: "ai-native-provisioning",
    name: "AI-Native Provisioning",
    icon: "PackagePlus",
    summary:
      "Provision approved cloud resources from a governed catalog — no consoles — with approval workflows and Whale AI sizing. AWS is live today, with Azure and GCP catalog items.",
    description:
      "AI-Native Provisioning replaces shared console access with a governed service catalog: teams request approved resources, Whale AI suggests a right size from your inventory and billing history, policy routes the request to the right approver, and the platform provisions with its own credentials. AWS provisioning is live for EC2, S3, RDS, VPC and EFS; Azure and GCP items are in the catalog for request and approval.",
    problem:
      "Self-service provisioning usually means console sprawl and inconsistent sizing, with no guardrails and no record of who provisioned what.",
    symptoms: [
      "Engineers hold broad console rights because the alternative is a ticket queue.",
      "Instances are sized by habit, so over-provisioning is baked in from day one.",
      "Nobody can say who approved a resource, or whether it was approved at all.",
    ],
    features: [
      "AWS provisioning live (EC2, S3, RDS, VPC, EFS)",
      "Azure & GCP catalog items with approval workflows",
      "Guardrails — approved sizes, regions and tags enforced before submit",
      "Whale AI sizing recommendations inside the request",
    ],
    facts: [
      { value: "5", label: "AWS services provisioned from the catalog today — EC2 · S3 · RDS · VPC · EFS" },
      { value: "Auto-approve", label: "Low-risk items within policy; everything else routed to an approver" },
      { value: "Every request", label: "Written to the audit log and the ITSM change record" },
    ],
    audience: "Platform engineering teams and cloud operations who want governed self-service.",
    modules: ["provisioning", "whale-ai", "identity"],
    architectureId: "platform",
    editions: ["standard", "enterprise"],
    flow: [
      "Teams browse a catalog of approved resources — no cloud console needed.",
      "Whale AI recommends a size from your inventory and cost history before the request is submitted.",
      "Approval policy routes the request by cost, environment or resource type; low-risk items auto-approve.",
      "AWS resources are provisioned live; Azure and GCP items are fulfilled from the catalog.",
      "Every provisioned resource lands in the unified inventory, cost tracking and the audit trail.",
    ],
    faq: [
      { q: "Does this replace Terraform?", a: "No. The catalog is for day-to-day requests that should not need a pipeline change. Foundations and workloads defined as code stay in Terraform — WhaleForge and Landing Zone Builder generate it." },
      { q: "Which clouds can be provisioned today?", a: "AWS: EC2, S3, RDS, VPC and EFS. Azure and GCP catalog items are available for request and approval, with provisioning coverage expanding by resource type." },
      { q: "Can we keep our existing approval process?", a: "Yes — approval policy is configurable by cost, environment and resource type, and changes sync to ServiceNow or Jira if that is where approvals live today." },
    ],
  },
  {
    slug: "bundled-observability",
    name: "Bundled Observability",
    icon: "Activity",
    summary:
      "Production-grade observability bundled into the platform — logs, metrics, traces, SLOs with burn-rate alerts, synthetics and usage metering — without a separate observability contract.",
    description:
      "Bundled Observability brings logs, metrics and traces into the same control plane as your inventory, so every signal resolves to a workload and an owner. SRE and operations teams define SLOs, alert on error-budget burn rate rather than static thresholds, probe endpoints synthetically, and open ITSM incidents automatically — all included in the Standard and Enterprise licence rather than procured as a separate monitoring contract.",
    problem:
      "Observability is usually a separate, expensive contract bolted onto the cloud platform, with its own identity, data and alerting to maintain.",
    symptoms: [
      "A second identity system and a second bill for the monitoring tool.",
      "Alerts fire on thresholds, so on-call is paged for noise and misses slow burns.",
      "Telemetry and inventory disagree about what a service is, so incidents lose time on 'which host is this'.",
    ],
    features: [
      "Logs, metrics & traces in one place, correlated to the inventory",
      "SLOs with burn-rate alerting",
      "Synthetics & usage metering",
      "Notification channels & automatic ITSM incidents",
    ],
    facts: [
      { value: "Included", label: "In the Standard and Enterprise licence — no separate observability contract" },
      { value: "Burn rate", label: "Alerting on error budgets, not raw thresholds" },
      { value: "In-region", label: "Telemetry stays in the deployment's region or perimeter" },
    ],
    audience: "SRE, platform and operations teams who want observability inside the control plane.",
    modules: ["observe", "itsm", "inventory"],
    architectureId: "platform",
    editions: ["enterprise", "telco-datacenter"],
    flow: [
      "Telemetry — logs, metrics and traces — is ingested from cloud services, OpenTelemetry agents and the Edge Agent.",
      "Signals are correlated to inventory, so each one resolves to a workload and an owner.",
      "SLOs are defined per service; alerts fire on error-budget burn rate; synthetics probe critical paths.",
      "Breaches open ITSM incidents automatically and route to the owning team.",
      "Usage metering feeds Whalenomics and Tenancy for cost and billing.",
    ],
    faq: [
      { q: "Can we keep our current APM tool during a transition?", a: "Yes. Its alerts can open incidents in the platform through webhooks while you move dashboards and SLOs across at your own pace." },
      { q: "How do you keep alert noise down?", a: "Alerts are based on SLO error-budget burn rate and correlated to workloads, so one real problem produces one incident routed to its owner." },
      { q: "Where is telemetry stored?", a: "In the deployment's region on SaaS, in your accounts on BYOC, and inside the perimeter on sovereign or air-gapped deployments." },
    ],
  },
  {
    slug: "cloud-migration",
    name: "Cloud Migration",
    icon: "MoveRight",
    summary:
      "Auto-classify on-prem workloads and run a 6R assessment with cost, effort and blocker analysis, then plan by wave and workload — with Whale AI guidance. Assessment is live today.",
    description:
      "Cloud Migration turns a datacenter exit or a regulator's exit-plan requirement into a costed, sequenced programme. Workloads discovered by the Edge Agent are classified, scored with a 6R assessment for cost, effort and blockers, and cut into dependency-aware waves with rollback plans. Assessment and wave planning are live; execution hooks that hand the move to tooling and track it back are in progress.",
    problem:
      "Migrations stall because nobody has a clear, costed view of which workloads to move, in what order, and what will block them.",
    symptoms: [
      "The assessment is a consultant's spreadsheet that is stale before the first wave.",
      "Dependencies are discovered during cutover, which is when they cost the most.",
      "The regulator's exit plan exists on paper and has never been rehearsed.",
    ],
    features: [
      "Auto-classification of on-prem workloads",
      "6R assessment with cost, effort & blockers",
      "Dependency-aware wave planning with rollback",
      "Whale AI migration guidance",
    ],
    facts: [
      { value: "6R", label: "Rehost · replatform · refactor · repurchase · retire · retain — scored per workload" },
      { value: "Live", label: "Assessment and wave planning; execution hooks in progress" },
      { value: "Any target", label: "Six public clouds, private platforms via Edge Agent, or repatriation" },
    ],
    audience: "CIOs and Heads of Infrastructure running data-center-exit and cloud-migration programs.",
    modules: ["migration", "inventory", "cloud-connectors"],
    architectureId: "migration",
    editions: ["enterprise", "telco-datacenter"],
    story: "bfsi-singapore-qatar",
    flow: [
      "On-prem workloads are discovered via the Edge Agent and auto-classified with their dependencies.",
      "A 6R assessment scores each workload for cost, effort and blockers.",
      "Workloads are cut into dependency-aware waves; Whale AI drafts the sequence and flags risks.",
      "Waves are rehearsed and approved against the unified inventory, with rollback plans attached.",
      "Execution hooks (in progress) hand each wave to tooling and track it back on the board.",
    ],
    faq: [
      { q: "Does the platform move the workloads?", a: "Assessment, dependency mapping and wave planning are live. Execution hooks that hand the move to tooling and track it back are in progress; until then teams execute with existing tooling against the plan." },
      { q: "Can it satisfy a regulator's exit-plan requirement?", a: "That is how BFSI customers use it: the exit annexure becomes a dependency-mapped, rehearsed plan with drill evidence the supervisor can read." },
      { q: "What does the assessment need from us?", a: "An Edge Agent per site with read access to the hypervisor. Interviews fill in what discovery cannot see — business criticality, licensing constraints, change windows." },
    ],
  },
  {
    slug: "security-compliance",
    name: "Security & Compliance",
    icon: "ShieldCheck",
    summary:
      "Federated identity, role-based access and a full audit trail across every connected cloud — with data residency and air-gapped options for the most regulated estates.",
    description:
      "Security & Compliance puts one identity fabric, one role model and one audit trail over every connected estate, and keeps control evidence current instead of assembling it before each inspection. CISOs and compliance teams federate the IdP they already run, enforce least-privilege roles across clouds, pin data to an in-country region, and produce the report an auditor asks for from a system of record.",
    problem:
      "Access and audit are fragmented across clouds and tools, and regulators increasingly demand provable residency and a single, trustworthy record of who did what.",
    symptoms: [
      "Each cloud has its own IAM, so joiner and leaver hygiene depends on people remembering.",
      "Audit evidence is screenshots gathered in the two weeks before the inspection.",
      "Residency is asserted in a policy document and cannot be shown per resource.",
    ],
    features: [
      "10 identity providers over SAML 2.0 / OIDC, with SCIM auto-provisioning",
      "Role-based access across all clouds",
      "Full audit trail of platform activity; WORM-backed in the Government Edition",
      "Data residency by region, and air-gapped deployment for the strictest estates",
    ],
    facts: [
      { value: "10", label: "Identity providers federated — Entra, Okta, Auth0, AWS Identity Center, AD and more" },
      { value: "5 ISO", label: "27001 · 27017 · 27018 · 27701 · 22301, independently audited" },
      { value: "72 h", label: "Breach notification commitment; sub-processor changes on 30-day notice" },
    ],
    audience: "CISOs, Heads of Cloud Security and compliance officers in regulated industries.",
    modules: ["identity", "cloud-audit", "itsm"],
    architectureId: "security",
    editions: ["enterprise", "government"],
    story: "bfsi-singapore-qatar",
    flow: [
      "Federate your IdP over SAML 2.0 or OIDC; SCIM maps directory groups to platform roles.",
      "Role-based access is enforced consistently across every connected cloud and on-prem estate.",
      "Every action is written to an append-only audit trail.",
      "Residency pins workloads and records to an in-country region — Mumbai for DPDP, Frankfurt for GDPR.",
      "Cloud Audit & Evidence monitors controls continuously and produces the report per regime on demand.",
    ],
    faq: [
      { q: "Which certifications does the platform itself hold?", a: "ISO/IEC 27001:2022, 27017, 27018, 27701 and ISO 22301, independently audited; plus a CSA STAR Level 1 self-assessment, a GDPR compliance assessment and a SOC 2 Type II readiness assessment. Signed certificates are in the Trust Center." },
      { q: "Is MFA enforced?", a: "MFA follows your IdP policy for SSO. In the Government Edition MFA is mandatory on every role and privileged access always runs through PAM with session recording." },
      { q: "How does residency work on SaaS?", a: "You choose Singapore, Mumbai, Frankfurt or Los Angeles and data stays there. For regimes without a SaaS region, BYOC, on-prem or air-gapped deployment keeps everything in-country." },
    ],
  },
  {
    slug: "sovereign-cloud",
    name: "Sovereign Cloud",
    icon: "Landmark",
    summary:
      "Run the platform fully air-gapped and in-country with in-region models only — provable data residency, no call-home, for regulated and government estates.",
    description:
      "Sovereign Cloud is the deployment for estates that must prove where data lives and who can reach it: the control plane runs in-country, on your own cloud, on-premises or fully air-gapped, with an offline update channel and no call-home. Whale AI runs on in-region models inside the perimeter, and the audit trail is WORM-backed, so sovereignty is a property of the architecture rather than a clause in a contract.",
    problem:
      "Data-residency law and national regulators demand to know exactly where data lives, who operates it, and who has access — which most hyperscaler-only deployments cannot prove.",
    symptoms: [
      "The residency answer is a vendor letter, not a property of the system.",
      "AI adoption is blocked because prompts and documents would leave the jurisdiction.",
      "Air-gapped sites are managed by hand, outside the governance the rest of the estate has.",
    ],
    features: [
      "Air-gapped Government Edition deployment with offline update channel",
      "In-region models only — no call-home",
      "BYOC option in your own cloud, or on-premises",
      "Provable data residency, WORM-backed audit log, FIPS-validated cryptography",
    ],
    facts: [
      { value: "Air-gapped", label: "Deployment class with signed offline update bundles and no outbound connectivity" },
      { value: "In-region AI", label: "Whale AI Abyss on local models — zero external calls" },
      { value: "4 + in-country", label: "SaaS regions (SIN · BOM · FRA · LAX), or BYOC / on-prem anywhere" },
    ],
    audience: "National governments, defense agencies, central banks and regulated public sector.",
    modules: ["sovereign-operations", "identity", "whale-ai"],
    architectureId: "sovereign",
    editions: ["government", "enterprise"],
    story: "government-middle-east-defence",
    flow: [
      "The platform is deployed inside national borders — BYOC, on-premises or fully air-gapped.",
      "An air-gapped control plane runs with no outbound connectivity; updates arrive as signed offline bundles.",
      "Residency rules are enforced on every resource and record; directorates are segregated under central policy.",
      "In-region models deliver Whale AI without data leaving the jurisdiction.",
      "Sovereignty is evidenced on demand from the WORM-backed audit trail and residency controls.",
    ],
    faq: [
      { q: "How do updates reach an air-gapped estate?", a: "Signed release bundles are transferred through your approved process and verified on import. Nothing calls home, and there are no forced upgrades on sovereign estates." },
      { q: "Does Whale AI work without internet?", a: "Yes. The Government Edition runs Whale AI Abyss on in-region models inside the perimeter, with no external calls." },
      { q: "Can we connect sovereign hyperscaler regions?", a: "Yes — AWS GovCloud, Azure Government, Google Distributed Cloud and national sovereign clouds connect through the same connectors, governed by the same policy plane." },
    ],
  },
];

export const solutionsBySlug = Object.fromEntries(
  solutions.map((s) => [s.slug, s]),
) as Record<string, SolutionDef>;
