/**
 * Industry verticals — the real targets, grounded in shipped capability.
 *
 * Edition availability (mirrors content/editions.ts):
 *   Standard · Enterprise · Government — generally available today.
 *   Telco & Datacenter — in preview, GA Q4 2026 (comingSoon + gaTarget).
 * Pages derive preview badges from the tied edition, so keep `edition`
 * slugs in sync with editions.ts. Anything that depends on the Telco &
 * Datacenter Edition is marked "preview" in the copy itself.
 */

export interface IndustryDef {
  slug: string;
  name: string;
  icon: string;
  /** hero headline: a verb and an object, not an adjective list */
  title: string;
  description: string;
  /** four facts for the posture strip — words are fine, they are not rendered as KPIs */
  kpis: { value: string; label: string }[];
  why: string[];
  targets: string[];
  edition: string; // primary edition slug tie-in
  compliance: string[];
  /** the regimes this sector answers to: what each demands, and the control that answers it */
  regimes: { name: string; demands: string; control: string }[];
  /** key into content/architecture.ts diagrams */
  architectureId?: string;
  /** concrete industry use cases (grounded in real product modules) */
  useCases?: { title: string; body: string; modules?: string[] }[];
  /** one-line outcome statement — used in the cross-industry architecture diagram */
  outcome: string;
  /** customer story slug (content/customers.ts) from this sector, if one exists */
  story?: string;
  faq: { q: string; a: string }[];
}

export const industries: IndustryDef[] = [
  {
    slug: "government",
    name: "Government",
    icon: "Landmark",
    title: "Sovereign cloud operations — air-gapped where the mandate requires it.",
    description:
      "BlueWhale Stack lets national and state governments run cloud, on-prem and hybrid estates from one control plane inside their own borders. The Government Edition — generally available today — deploys fully air-gapped with an offline update channel, FIPS-validated cryptography, a WORM-backed audit log, always-on privileged access management and in-region AI, so residency and accreditation evidence are properties of the architecture.",
    kpis: [
      { value: "Air-gapped", label: "Deployment class with offline updates and no call-home" },
      { value: "FIPS", label: "Validated cryptography throughout" },
      { value: "WORM", label: "Immutable, append-only audit log" },
      { value: "In-region", label: "Whale AI on local models only" },
    ],
    why: [
      "Deploy fully air-gapped: signed offline update bundles, no outbound connectivity, no call-home",
      "Keep data in-country — residency is enforced per resource and evidenced from the audit log",
      "Harden access with always-on PAM, session recording and MFA mandatory on every role",
      "Run Whale AI on in-region models only, so prompts and documents never leave the jurisdiction",
      "Connect sovereign clouds — AWS GovCloud, Azure Government, Google Distributed Cloud and national clouds — through the same connectors",
      "Export compliance packs for FedRAMP-, IRAP- and StateRAMP-style accreditation from the WORM-backed trail",
    ],
    targets: ["Federal Government", "State Authorities", "Ministries", "Defense", "Public Sector"],
    edition: "government",
    outcome: "Sovereign & audited",
    compliance: ["Air-gapped", "FIPS crypto", "WORM audit log", "DPDP Act", "GDPR", "Data residency"],
    regimes: [
      { name: "National data-residency law", demands: "Data, inventory and audit records stay inside the border, provably", control: "In-country deployment classes; residency enforced per resource and evidenced from the audit log" },
      { name: "Security accreditation (FedRAMP / IRAP / StateRAMP-style)", demands: "Control evidence assembled to an accreditation framework", control: "Compliance pack export from the WORM-backed audit trail; FIPS-validated crypto" },
      { name: "Air-gap mandates for classified estates", demands: "No outbound connectivity, controlled update path", control: "Air-gapped deployment class with signed offline update bundles" },
      { name: "Privileged-access rules", demands: "Every administrative session attributable and reviewable", control: "PAM always-on with session recording; MFA mandatory on every role" },
    ],
    architectureId: "industry-government",
    story: "government-middle-east-defence",
    useCases: [
      {
        title: "Sovereign, air-gapped governance across agencies",
        body: "Run an air-gapped Government Edition deployment with no outbound connectivity and an offline update channel, unifying inventory, identity and governance across agencies through a single control plane — directorates segregated, policy central.",
        modules: ["sovereign-operations", "identity", "inventory"],
      },
      {
        title: "In-country data residency with in-region AI",
        body: "Pin workloads, inventory and audit records to an in-country region, with Whale AI Abyss on in-region models and no call-home — intelligence that never leaves the jurisdiction.",
        modules: ["inventory", "whale-ai"],
      },
      {
        title: "Hardened privileged access",
        body: "PAM is always on with session recording, MFA is mandatory on every role, and identity federation maps your directory to platform roles — privileged access is provably controlled.",
        modules: ["identity", "itsm"],
      },
      {
        title: "Accreditation evidence on demand",
        body: "Every action lands in a WORM-backed audit log; compliance pack export assembles the evidence for FedRAMP / IRAP / StateRAMP-style accreditation, with ITSM change control (P0–P4 SLAs) behind it.",
        modules: ["cloud-audit", "itsm"],
      },
    ],
    faq: [
      { q: "How is the platform procured for government?", a: "Through tender or empanelment on 3–5 year fixed-bid terms, directly or via an accredited implementation partner. The Government Edition is priced as the Enterprise base plus the sovereignty layer." },
      { q: "Where does it run?", a: "On sovereign on-prem infrastructure, in a private government cloud, or at government edge sites — fully air-gapped where required. Sovereign hyperscaler regions connect through the same connectors." },
      { q: "Does Whale AI need internet access?", a: "No. The Government Edition runs Whale AI Abyss on in-region models inside the perimeter with zero external calls." },
    ],
  },
  {
    slug: "bfsi",
    name: "BFSI",
    icon: "Banknote",
    title: "Answer an RBI inspection from a system of record.",
    description:
      "BlueWhale Stack lets banks, insurers and NBFCs run hybrid and multi-cloud operations on the Enterprise Edition with one identity fabric, one audit trail, bundled observability and cost decomposed by business unit. For Indian institutions, RBI outsourcing directions, CERT-In's 6-hour reporting and 180-day retention, SEBI CSCRF and DPDP obligations are carried at the platform layer — and the mandated exit strategy becomes a rehearsed plan rather than an annexure. Available today.",
    kpis: [
      { value: "10", label: "Identity providers federated over SAML / OIDC" },
      { value: "4", label: "Regimes mapped — RBI · CERT-In · SEBI · DPDP" },
      { value: "180 days", label: "Log retention to CERT-In's requirement" },
      { value: "Mumbai", label: "In-region residency for regulated workloads" },
    ],
    why: [
      "Federate the bank's IdP and govern access centrally, with maker-checker role separation on approvals",
      "Keep a full audit trail of every action, so inspection evidence is generated continuously and read from one source",
      "Turn the RBI outsourcing exit strategy into a dependency-mapped, rehearsed plan with drill evidence on file",
      "Meet CERT-In's 6-hour incident reporting through ITSM SLAs, and 180-day log retention in Observe",
      "Run bundled observability without extra contracts, feeding your SIEM and SOC",
      "Show cost per business unit with Whale AI FinOps narratives the CFO can decompose",
      "Assess legacy workloads for migration (6R) without touching core-banking internals",
      "Enforce in-India data residency for payment data and regulated workloads",
    ],
    targets: ["Retail Banks", "Investment Banks", "NBFCs", "Insurance", "Asset Managers", "Fintech"],
    edition: "enterprise",
    outcome: "Compliant & audited",
    compliance: ["RBI IT Outsourcing", "CERT-In", "SEBI CSCRF", "DPDP Act", "Data residency"],
    regimes: [
      { name: "RBI IT outsourcing directions", demands: "Exit strategy for every material outsourcing, concentration risk visible, evidence at inspection", control: "Migration Engine assessment and dependency mapping turn the exit annexure into a rehearsed plan; one inventory shows concentration per provider" },
      { name: "CERT-In directions (2022)", demands: "Incident reporting within 6 hours; 180-day log retention", control: "ITSM P0–P4 SLAs with breach detection; Observe log retention set to 180 days" },
      { name: "SEBI CSCRF", demands: "Continuous control monitoring and periodic evidence", control: "Cloud Audit & Evidence evaluates controls continuously and produces the report per regime" },
      { name: "DPDP Act 2023", demands: "Personal data localisation and purpose limitation", control: "Mumbai region residency; records pinned in-country and evidenced" },
    ],
    architectureId: "industry-bfsi",
    story: "bfsi-singapore-qatar",
    useCases: [
      {
        title: "Federated identity with maker-checker",
        body: "Identity & Access federates the bank's IdP with SCIM provisioning and role-separated approval workflows, and every action is written to the audit trail — evidence for the inspector and the internal auditor from the same source.",
        modules: ["identity", "inventory"],
      },
      {
        title: "The RBI exit plan, rehearsed",
        body: "The Migration Engine's assessment and dependency mapping turn the RBI outsourcing exit strategy from an untested annexure into a dependency-mapped, rehearsable programme — with drill evidence on file for the supervisor.",
        modules: ["migration", "inventory"],
      },
      {
        title: "Inspection evidence from a system of record",
        body: "Continuous control monitoring, Observe and centralised activity logging feed audit reports the board and the RBI examiner read from the same source, with retention tuned to CERT-In's 180-day requirement.",
        modules: ["cloud-audit", "observe", "itsm"],
      },
      {
        title: "A cloud bill the CFO can decompose",
        body: "Whale AI FinOps use cases join billing to the inventory, so each business unit sees its own spend, anomalies are explained against real resources, and payment-peak capacity is planned with a price tag.",
        modules: ["finops", "inventory"],
      },
    ],
    faq: [
      { q: "Can payment and core-banking data stay in India?", a: "Yes. SaaS runs in the Mumbai region, or the platform deploys BYOC or on-premises inside your own perimeter; residency is enforced per resource and evidenced from the audit log." },
      { q: "How does this fit with our existing ServiceNow and SIEM?", a: "Tickets sync two-way with ServiceNow or Jira, and Observe forwards telemetry and findings to your SIEM — the platform adds cloud context rather than replacing the SOC's tooling." },
      { q: "What does the RBI exit-strategy work actually involve?", a: "Edge Agents and connectors inventory the estate, the Migration Engine scores each workload with a 6R assessment and maps dependencies, and the resulting wave plan is rehearsed with drill evidence filed — the annexure becomes a tested plan." },
    ],
  },
  {
    slug: "healthcare",
    name: "Healthcare",
    icon: "HeartPulse",
    title: "Clinical systems governed in-country, with the evidence to show it.",
    description:
      "BlueWhale Stack lets hospitals, insurers, CROs and digital-health companies run clinical, research and patient-facing systems across cloud and on-prem on the Enterprise Edition — with patient data pinned to an in-country region, access federated from the hospital directory, change control with an audit trail, and an air-gapped option for networks behind strict firewalls. Available today.",
    kpis: [
      { value: "In-region", label: "Patient data pinned to Mumbai or Frankfurt" },
      { value: "Air-gapped", label: "Option for isolated clinical networks" },
      { value: "SCIM", label: "Access follows the hospital directory" },
      { value: "P0–P4", label: "Change control with SLAs and audit trail" },
    ],
    why: [
      "Pin workloads, inventory records and audit entries to Mumbai (DPDP) or Frankfurt (GDPR), so localisation is a platform setting rather than a process",
      "Deploy air-gapped for isolated clinical networks, with signed offline updates and no call-home",
      "Federate the hospital directory over SAML/OIDC with SCIM provisioning, so clinicians and researchers get the right role on first login and lose it on the next sync",
      "See clinical, research and administrative estates — cloud and on-prem — in one inventory grouped by system",
      "Track every production change through ITSM with P0–P4 SLAs and keep the record for auditors",
    ],
    targets: ["Hospitals", "CROs", "Pharma", "Health Insurance", "Digital Health"],
    edition: "enterprise",
    outcome: "Private & in-region",
    compliance: ["GDPR", "DPDP Act", "Data residency", "Air-gapped"],
    regimes: [
      { name: "DPDP Act 2023 / GDPR", demands: "Patient data localised, processing purpose-limited and evidenced", control: "Residency pinned to Mumbai or Frankfurt; access and processing written to the audit trail" },
      { name: "Clinical change control", demands: "Every production change approved, tracked and reviewable", control: "ITSM change records with P0–P4 SLAs and a full audit trail" },
      { name: "Workforce access hygiene", demands: "Clinicians, researchers and contractors get exactly the access their role needs, revoked on exit", control: "IdP federation with SCIM provisioning; roles scoped by department and system" },
      { name: "Availability of clinical systems", demands: "Degradation detected and escalated before it reaches the ward", control: "Observe SLOs with burn-rate alerts; incidents opened automatically in ITSM" },
    ],
    architectureId: "industry-healthcare",
    useCases: [
      {
        title: "Patient data residency & in-region storage",
        body: "Pin workloads, inventory and audit records to an in-country region — Mumbai for DPDP, Frankfurt for GDPR — with air-gapped deployment available for networks behind strict firewalls.",
        modules: ["inventory", "identity"],
      },
      {
        title: "Federated access for clinical & research staff",
        body: "Federate your IdP with SCIM provisioning so a new hire is granted the right role on first login and offboarded automatically on the next directory sync.",
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
    faq: [
      { q: "Can research data and clinical data be governed separately?", a: "Yes. Workloads are grouped by system, roles are scoped per workload, and residency and access policies apply per group — so research collaborators never inherit clinical access." },
      { q: "Do you support hospital networks that cannot connect outbound?", a: "Yes — the air-gapped deployment class runs with no outbound connectivity and receives signed offline update bundles; the Edge Agent inventories the estate inside the network." },
      { q: "Which certifications does the platform hold?", a: "ISO/IEC 27001, 27017, 27018 (PII in the cloud), 27701 (privacy) and ISO 22301, independently audited, plus a GDPR compliance assessment — certificates are in the Trust Center." },
    ],
  },
  {
    slug: "regulated-enterprise",
    name: "Regulated Enterprise",
    icon: "Building2",
    title: "Six clouds and the datacenter floor, governed as one estate.",
    description:
      "BlueWhale Stack gives large, regulated enterprises one control plane for every estate on the Enterprise Edition — a unified inventory across six public clouds and on-prem, governed provisioning, bundled observability, continuous control evidence and a migration assessment engine. Available today as SaaS in four regions, BYOC in your own accounts, or fully sovereign.",
    kpis: [
      { value: "12", label: "Modules in the Enterprise Edition" },
      { value: "6 + on-prem", label: "Public clouds plus VMware, Hyper-V, Nutanix, OpenShift, KVM" },
      { value: "50+", label: "Whale AI use cases grounded in your data" },
      { value: "3", label: "Deployment models for this edition — SaaS · BYOC · Sovereign" },
    ],
    why: [
      "Manage AWS, Azure, GCP, Oracle, Alibaba, Huawei and on-prem in one inventory, grouped by workload with owners",
      "Standardise provisioning through a governed catalog with approval policy and Whale AI sizing",
      "Run bundled observability — logs, metrics, traces, SLOs — without a separate monitoring contract",
      "Keep control evidence current with Cloud Audit & Evidence, and produce the report the auditor asks for on demand",
      "Assess workloads for migration with 6R scoring; deploy as SaaS, BYOC or fully sovereign",
    ],
    targets: ["Large Enterprises", "IT Teams", "Platform Engineering", "Financial Services", "Retail"],
    edition: "enterprise",
    outcome: "Standardized at scale",
    compliance: ["GDPR", "DPDP Act", "Audit trail", "SOC 2 Type II (readiness)"],
    regimes: [
      { name: "GDPR / DPDP", demands: "Personal data kept in-region, processing evidenced", control: "Region selection per estate — Frankfurt or Mumbai on SaaS, in-country on BYOC; residency enforced and logged" },
      { name: "Internal control frameworks (SOC 2-style, ISO 27001)", demands: "Controls operating continuously with evidence, not sampled quarterly", control: "Cloud Audit & Evidence: policy as configuration, controls monitored continuously, findings routed to owners" },
      { name: "Board and internal-audit reporting", demands: "One trusted picture of estate, cost and risk", control: "Reports generated from the same inventory, billing and audit trail the operators use" },
      { name: "Vendor security review", demands: "The platform itself independently assessed", control: "ISO/IEC 27001, 27017, 27018, 27701 and ISO 22301 certified; SOC 2 Type II readiness assessment complete" },
    ],
    architectureId: "industry-enterprise-saas",
    story: "media-qatar-network",
    useCases: [
      {
        title: "Identity sync & auto-provisioning from your IdP",
        body: "Federate Okta, Auth0 or Entra ID; SCIM maps directory groups to platform roles, so a new hire logs in once and is granted the right role — and is offboarded on the next directory sync.",
        modules: ["identity"],
      },
      {
        title: "One inventory across every cloud and on-prem",
        body: "Discover every resource across six public clouds plus on-prem and hybrid, grouped by workload, with exportable reports for stakeholders and the API for your CMDB.",
        modules: ["inventory", "cloud-connectors"],
      },
      {
        title: "Standardized, governed provisioning",
        body: "Standardise delivery through a governed catalog (AWS live) with approval workflows and Whale AI sizing, integrated with ITSM so every change is tracked.",
        modules: ["provisioning", "itsm"],
      },
      {
        title: "Bundled observability & migration assessment",
        body: "Logs, metrics, traces and SLOs bundled in, and a 6R assessment of on-prem workloads when you are ready to move.",
        modules: ["observe", "migration"],
      },
    ],
    faq: [
      { q: "We already run a CMP and a monitoring tool. What changes?", a: "Both are covered by the platform licence — inventory, catalog and Observe — so the usual outcome is retiring two contracts and two identity systems. Existing tools can stay connected during the transition." },
      { q: "SaaS, BYOC or sovereign — how do we choose?", a: "SaaS in Singapore, Mumbai, Frankfurt or Los Angeles is the fastest start. BYOC runs the control plane in your own AWS, Azure or GCP accounts. Sovereign is for estates that must have no external dependency. All three run the same build." },
      { q: "How long until we see our whole estate?", a: "A cloud account is inventoried within about 15 minutes of its connector going green; an on-prem site follows the Edge Agent install. Most enterprises have the full picture inside the first week of the 90-day prototype." },
    ],
  },
  {
    slug: "saas",
    name: "SaaS & Digital Native",
    icon: "Rocket",
    title: "Governed from the first account, without slowing engineering down.",
    description:
      "BlueWhale Stack gives SaaS companies and digital-native teams governed cloud from day one on the Standard Edition — one inventory across AWS, Azure and GCP, a provisioning catalog with guardrails instead of shared console credentials, security scanning and audit reports for customer questionnaires, and Whale AI Spark — with a clean upgrade to Enterprise as the estate grows. Available today.",
    kpis: [
      { value: "3", label: "Clouds in Standard — AWS · Azure · GCP" },
      { value: "$24,000", label: "Per year, flat and published" },
      { value: "1M", label: "Whale AI Spark tokens per month included" },
      { value: "99.5%", label: "Platform SLA on the Standard Edition" },
    ],
    why: [
      "See every resource across AWS, Azure and GCP in one inventory before sprawl sets in",
      "Provision from a governed catalog with approval policy instead of handing out console access",
      "Answer customer security questionnaires from scanning findings and audit reports the platform already keeps",
      "Federate the IdP you already use; groups map to roles, so access follows the directory instead of a spreadsheet",
      "Grow into Enterprise as a licence change — same platform, more clouds, more families",
    ],
    targets: ["SaaS Companies", "Startups", "Scale-ups", "Digital Natives", "Departmental IT"],
    edition: "standard",
    outcome: "Governed from day one",
    compliance: ["Security scanning", "Audit reports", "IdP federation", "GDPR"],
    regimes: [
      { name: "Customer security questionnaires (SOC 2- and ISO-style)", demands: "Evidence of access control, scanning and change management", control: "Security scanning findings and audit reports kept continuously from the first account" },
      { name: "GDPR for European customers", demands: "Customer data processed and stored in-region", control: "Frankfurt SaaS region; residency by region" },
      { name: "Access hygiene as the team grows", demands: "No shared credentials; leavers lose access the same day", control: "SSO with SCIM group-to-role mapping; offboarding on the next directory sync" },
      { name: "Cost discipline for investors and the board", demands: "Cloud spend explained by product and team", control: "Whale AI FinOps use cases over AWS, Azure and GCP billing, joined to the inventory" },
    ],
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
        body: "Track incidents and changes with basic ITSM, and sync with the CRM, ERP or ITSM tools you already run through business connectors (some in beta).",
        modules: ["itsm", "cloud-connectors"],
      },
    ],
    faq: [
      { q: "Is there a self-serve trial?", a: "Not yet — the fastest start is the 90-day prototype: a half-day workshop, then the platform on your estate with no licence cost, scored on agreed criteria before any decision." },
      { q: "What is the upgrade path?", a: "Standard to Enterprise is a licence change on the same platform: the extra clouds, the Edge Agent for on-prem, the Migration Engine, Cloud Audit & Evidence and the full Whale AI tiers switch on without a migration." },
      { q: "How is Standard priced?", a: "$24,000 a year, flat and published, with 1,000 managed resources, 5 cloud accounts, 10 users and 1M Whale AI Spark tokens a month included; overage bands and 2- and 3-year discounts are on the pricing page." },
    ],
  },
  {
    slug: "telco",
    name: "Telco & MSP",
    icon: "RadioTower",
    title: "Sell governed cloud services on the network you already run.",
    description:
      "BlueWhale Stack lets telecom operators and MSPs run multi-tenant, white-label managed cloud services on the Enterprise platform today. The Telco & Datacenter Edition — now in preview, GA Q4 2026 — extends the same control plane to the network itself: VNF/CNF discovery, 5G core awareness, MEC site fleets, OSS/BSS integration and an SLA-managed control plane by service class.",
    kpis: [
      { value: "99.9–99.999%", label: "SLA by service class in the Telco & Datacenter Edition, contracted at GA" },
      { value: "5G-aware", label: "AMF · SMF · UPF · slices (preview)" },
      { value: "MEC", label: "Edge site fleets managed as one (preview)" },
      { value: "Q4 2026", label: "Telco & Datacenter Edition general availability" },
    ],
    why: [
      "Run multi-tenant, white-label managed services on the platform today, with per-tenant isolation and identity scope",
      "Provision from a governed catalog across multiple clouds for every tenant",
      "Discover and manage VNFs, CNFs and NFVI/VIM alongside cloud in one inventory (preview)",
      "Operate 5G core functions and network slices from the same plane (preview)",
      "Integrate OSS/BSS — Amdocs, Netcracker, Ericsson, Nokia, TM Forum — for metering and billing (preview)",
      "Manage service assurance and SLAs by service class, 99.9–99.999% (preview)",
    ],
    targets: ["Telecom Operators", "MVNOs", "MSPs", "CSPs", "Carrier-grade MSPs"],
    edition: "telco-datacenter",
    outcome: "Carrier-grade (preview)",
    compliance: ["Tenant isolation", "Audit trail", "Carrier SLAs", "Data residency"],
    regimes: [
      { name: "Tenant isolation and data separation", demands: "Each enterprise tenant provably separated on shared operator capacity", control: "Native multi-tenancy with per-tenant identity scope, quotas and policies (Tenancy & Monetization, preview)" },
      { name: "Carrier SLAs", demands: "Service levels contracted and reported per service class", control: "SLA management by service class, 99.9–99.999%, reported per tenant (preview)" },
      { name: "In-country data residency for enterprise and public-sector tenants", demands: "Tenant data on operator capacity inside the border", control: "In-country deployment on operator infrastructure; sovereign configuration for government pursuits" },
      { name: "Billing accuracy and auditability", demands: "Metered usage reconciled to invoices", control: "Per-tenant metering feeding the operator's OSS/BSS through connectors (preview)" },
    ],
    architectureId: "industry-telco",
    story: "telco-datacenter-qatar-ksa-safrica",
    useCases: [
      {
        title: "White-label resale via Partner Portal — today",
        body: "Give MSP and SI partners a branded experience with end-customer management and consolidated billing through the Partner Portal, while each end-customer runs on the same governed platform.",
        modules: ["identity", "provisioning"],
      },
      {
        title: "Multi-tenant scale with per-tenant isolation — today",
        body: "Each tenant is isolated and governed; the unified inventory spans six public clouds plus on-prem, and identity federation maps each tenant's directory to platform roles.",
        modules: ["inventory", "identity", "tenancy"],
      },
      {
        title: "Network estate in the same inventory — preview",
        body: "The Telco & Datacenter Edition discovers VNFs, CNFs and NFVI/VIM alongside your cloud estate, with 5G core awareness (AMF, SMF, UPF, slices) — one inventory from RAN edge to public cloud. GA Q4 2026.",
        modules: ["inventory", "cloud-connectors"],
      },
      {
        title: "MEC fleets & service assurance — preview",
        body: "Manage MEC sites as a fleet with service assurance and SLA tracking by service class feeding ITSM. GA Q4 2026.",
        modules: ["observe", "itsm"],
      },
    ],
    faq: [
      { q: "What can an operator run today, before the Telco & Datacenter Edition is GA?", a: "The full Enterprise platform as a white-label managed service through the Partner Portal, with per-tenant isolation. Network fabric features — VNF/CNF, 5G core, MEC, OSS/BSS connectors — are in the preview programme for design partners, GA Q4 2026." },
      { q: "Do we replace our OSS/BSS?", a: "No. Per-tenant metering and billing feeds go into the OSS/BSS you run; connectors for Amdocs, Netcracker, Ericsson, Nokia and TM Forum interfaces are part of the edition." },
      { q: "How is the edition licensed?", a: "Operator licensing shaped to the business — metered per network element, with revenue-share models available. Pricing is by conversation, not a published list." },
    ],
  },
  {
    slug: "datacenter",
    name: "Datacenter & Colocation",
    icon: "Server",
    title: "Your racks, to the U position, in the same inventory as your clouds.",
    description:
      "BlueWhale Stack's Telco & Datacenter Edition — now in preview, GA Q4 2026 — extends the platform to the physical facility: rack, row and cage inventory at U-position level, power and cooling telemetry, space and capacity planning, metered colo tenant billing and a white-label portal under your own brand — so a colocation operator sells governed cloud services on the floor it already owns.",
    kpis: [
      { value: "U-level", label: "Rack · row · cage inventory (preview)" },
      { value: "A/B", label: "Power feeds · PDU · kW telemetry (preview)" },
      { value: "White-label", label: "Your brand, your domain" },
      { value: "Q4 2026", label: "Telco & Datacenter Edition general availability" },
    ],
    why: [
      "Track racks, rows and cages to the U position — next to the clouds you already govern (preview)",
      "Manage power (PDU, kW, A/B feeds) and cooling (CRAC/CRAH) with environmental telemetry in Observe (preview)",
      "Plan space, capacity, cross-connects and access control in one system (preview)",
      "Bill colo tenants on metered usage through the Partner Portal",
      "White-label the portal with your logo, colours and domain",
    ],
    targets: ["Colocation Operators", "DC Operators", "Managed DC Providers", "Edge DC Operators", "Hosting Providers"],
    edition: "telco-datacenter",
    outcome: "One plane, every rack (preview)",
    compliance: ["Tenant isolation", "Access control", "Audit trail", "Metered billing"],
    regimes: [
      { name: "Tenant access control and badging", demands: "Every physical and logical access attributable to a tenant and a person", control: "Access control and badging events in ITSM with a full audit trail (preview)" },
      { name: "Metered billing accuracy", demands: "Space, power and services metered and reconciled per tenant", control: "Per-tenant metering with billing feeds through the Partner Portal" },
      { name: "Uptime tier commitments", demands: "Power and cooling headroom known before it is gone", control: "PDU, kW, A/B feed and CRAC/CRAH telemetry into Observe with capacity alerts (preview)" },
      { name: "Data residency for colo tenants", demands: "Sovereign hosting for government and regulated tenants", control: "White-label sovereign hosting on your facility, governed by the same policy plane" },
    ],
    architectureId: "edition-telco-datacenter",
    story: "telco-datacenter-qatar-ksa-safrica",
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
        body: "Meter tenant usage and bill it through the Partner Portal under your own brand — logo, colours and domain — with Tenancy & Monetization behind the numbers.",
        modules: ["tenancy", "finops", "identity"],
      },
      {
        title: "Operator-grade change & incident management",
        body: "Access control and badging events, cross-connect changes and facility incidents run through ITSM with P0–P4 SLAs and a full audit trail.",
        modules: ["itsm", "identity"],
      },
    ],
    faq: [
      { q: "How does DCIM data get into the platform?", a: "Through the Edge Agent in the facility, which collects from PDUs, environmental sensors and BMCs over Redfish, IPMI and SNMP and reports over outbound HTTPS — nothing inbound (preview)." },
      { q: "Can we keep our existing DCIM tool?", a: "Yes during the transition; the platform's value is that rack, power and tenant data sit beside the cloud estate and the billing feed, which a standalone DCIM tool cannot do." },
      { q: "When is this generally available?", a: "The Telco & Datacenter Edition is in preview with design partners now; general availability is targeted for Q4 2026. White-label resale and metered billing through the Partner Portal run today on the Enterprise platform." },
    ],
  },
];

export const industriesBySlug = Object.fromEntries(
  industries.map((i) => [i.slug, i]),
) as Record<string, IndustryDef>;
