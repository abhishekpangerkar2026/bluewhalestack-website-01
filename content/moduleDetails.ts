/**
 * Long-form module content for /modules/[slug] — the substance behind each
 * module page: a real description, proof points, how it works, capabilities
 * with mechanisms, a sample console screen and FAQs. Facts are drawn from
 * content/modules.ts, content/docs.ts and content/editions.ts; maturity is
 * stated honestly (GA / Beta / in progress / preview).
 */
import type { ConsoleScreen } from "@/components/sections/mockups/ConsoleMockup";

export interface ModuleDetail {
  /** short status label shown as a badge in the hero */
  status: { label: string; tone: "success" | "warning" | "neutral" };
  /** 2–3 sentence hero description: what it is, who it is for, what changes */
  summary: string;
  /** three concrete proof points for the hero */
  facts: { value: string; label: string }[];
  /** what the module does, with mechanism and outcome */
  capabilities: { title: string; body: string }[];
  /** 3–4 steps */
  howItWorks: { title: string; body: string }[];
  screen: ConsoleScreen;
  faq: { q: string; a: string }[];
}

export const moduleDetails: Record<string, ModuleDetail> = {
  inventory: {
    status: { label: "Generally available", tone: "success" },
    summary:
      "Inventory & Discovery builds one live map of every resource you run — across AWS, Azure, Google Cloud, Oracle, Alibaba and Huawei, and on-premises VMware, Hyper-V, Nutanix and OpenShift estates connected through the Edge Agent. Resources are grouped by workload with their dependencies, so platform, security and finance teams work from the same picture instead of six consoles and a spreadsheet.",
    facts: [
      { value: "6 + on-prem", label: "Public clouds plus private estates in one inventory" },
      { value: "Workload", label: "Grouping with dependency mapping, not raw resource lists" },
      { value: "PDF · XLSX · CSV", label: "Exports for audits, CMDB and finance" },
    ],
    capabilities: [
      { title: "Continuous discovery", body: "Connectors sync each account on a schedule and on change events; the Edge Agent inventories hypervisors over outbound-only HTTPS. New resources appear without anyone registering them." },
      { title: "Workload grouping and dependencies", body: "Resources are normalised into one model and grouped into workloads (VPC → subnet → compute → database), so an application is a unit you can search, cost and migrate — not a list of instance IDs." },
      { title: "Live lifecycle actions", body: "Start, stop, tag, resize or retire from the inventory itself, with role-based approval where policy requires it and every action written to the audit log." },
      { title: "Reports and feeds", body: "Export the estate as PDF, Excel or CSV, and feed the same inventory to Whalenomics (cost), Cloud Audit & Evidence (controls) and the Migration Engine (waves)." },
    ],
    howItWorks: [
      { title: "Connect", body: "Add cloud accounts with read-only credentials and register Edge Agents for on-prem sites. The first discovery typically completes within minutes of a connector going green." },
      { title: "Normalise", body: "Every provider's resource types are mapped to one schema with tags, owners, regions and relationships — the shared model every other family reads." },
      { title: "Work from one map", body: "Search, filter by provider or workload, act on resources, and export — the inventory is the system of record for the estate." },
    ],
    screen: {
      nav: "Inventory", eyebrow: "Inventory", title: "Unified resource map",
      kpis: [
        { value: "4,821", label: "Resources", note: "6 clouds · 3 on-prem sites" },
        { value: "212", label: "Workloads", note: "grouped by dependency" },
        { value: "12", label: "Drift items", note: "since last sync", tone: "warn" },
      ],
      table: {
        caption: "Workloads · sorted by resources",
        columns: ["Workload", "Provider", "Resources", "Owner", "Status"],
        rows: [
          ["payments-core", "AWS · ap-south-1", "148", "Platform", { chip: "Healthy", tone: "ok" }],
          ["channels-web", "Azure · Central India", "96", "Digital", { chip: "Healthy", tone: "ok" }],
          ["analytics-lake", "GCP · asia-south1", "71", "Data", { chip: "Drift", tone: "warn" }],
          ["core-vmware", "On-prem · Mumbai DC", "410", "Infra", { chip: "Healthy", tone: "ok" }],
        ],
      },
      bars: { caption: "Resources by provider", items: [{ label: "AWS", value: "2,034", pct: 42 }, { label: "Azure", value: "1,588", pct: 33 }, { label: "Google Cloud", value: "1,199", pct: 25 }] },
    },
    faq: [
      { q: "Does discovery need agents on every VM?", a: "No. Public clouds are discovered through their APIs with read-only credentials. On-premises estates use one Edge Agent per site, which talks to the hypervisor APIs (VMware, Hyper-V, Nutanix) — nothing is installed on guest VMs." },
      { q: "How fresh is the inventory?", a: "Connectors sync on a schedule and react to change events where the provider offers them; most estates see changes reflected within minutes. Each connector shows its last successful sync on the health page." },
      { q: "Can we export for our CMDB or auditor?", a: "Yes — PDF, Excel and CSV exports are built in, and the same data is available through the REST API for CMDB or GRC integrations." },
    ],
  },

  "cloud-connectors": {
    status: { label: "Generally available", tone: "success" },
    summary:
      "Cloud Connectors are how an estate joins the platform: read-only, least-privilege credentials for each public cloud, and an Edge Agent for private and virtualised estates that connects outbound over HTTPS so credentials never leave your site. Six public clouds are live today; hybrid and sovereign stacks connect through the same agent.",
    facts: [
      { value: "6", label: "Public clouds live — AWS, Azure, GCP, Oracle, Alibaba, Huawei" },
      { value: "Read-only", label: "IAM role, app registration or service account — never write access by default" },
      { value: "Outbound only", label: "Edge Agent uses HTTPS out; no inbound firewall rules" },
    ],
    capabilities: [
      { title: "Least-privilege cloud access", body: "AWS connects with an IAM role and external ID, Azure with an Entra app registration holding the Reader role, GCP with a Viewer service account, Oracle with an API signing key, Alibaba and Huawei with read-only access keys. Write actions are granted separately, per policy." },
      { title: "Edge Agent for private estates", body: "A small agent per site inventories VMware, Hyper-V, Nutanix and OpenShift through their own APIs and reports over outbound-only HTTPS. Hybrid and sovereign stacks — Azure Stack, Huawei Cloud Stack, Alibaba Apsara Stack — attach the same way." },
      { title: "Connector health", body: "Every connector shows last sync, scope and errors; a failing credential raises an ITSM incident rather than silently going stale." },
      { title: "Business and ITSM connectors", body: "ServiceNow and Jira integrations for tickets, plus CRM/ERP connectors for ownership and cost context; some business connectors are still in beta." },
    ],
    howItWorks: [
      { title: "Create credentials in the cloud", body: "Follow the guided steps for each provider — the console shows the exact role, policy or key to create, scoped to read." },
      { title: "Register the connector", body: "Paste the role ARN, app credentials or key into the connector form; the platform validates access and runs a first discovery." },
      { title: "Watch it stay healthy", body: "Sync status, scope changes and expiring secrets are surfaced on the health page and as incidents, so nothing quietly drops out of the inventory." },
    ],
    screen: {
      nav: "Overview", eyebrow: "Connectors", title: "Connected estates",
      kpis: [
        { value: "23", label: "Connectors", note: "6 clouds · 4 sites" },
        { value: "22", label: "Healthy", note: "synced < 15 min", tone: "ok" },
        { value: "1", label: "Attention", note: "secret expires in 6 days", tone: "warn" },
      ],
      table: {
        caption: "Connectors · by last sync",
        columns: ["Connector", "Type", "Scope", "Last sync", "Health"],
        rows: [
          ["aws-prod", "IAM role", "3 accounts", "4 min", { chip: "Healthy", tone: "ok" }],
          ["azure-corp", "Entra app", "2 subscriptions", "6 min", { chip: "Healthy", tone: "ok" }],
          ["gcp-data", "Service account", "1 project", "9 min", { chip: "Healthy", tone: "ok" }],
          ["mumbai-dc-edge", "Edge Agent", "VMware · 2 clusters", "2 min", { chip: "Secret expiring", tone: "warn" }],
        ],
      },
    },
    faq: [
      { q: "What permissions do you need in our cloud accounts?", a: "Read-only. AWS uses an IAM role you create with a read policy and an external ID; Azure the Reader role on the subscriptions you choose; GCP the Viewer role. Provisioning and lifecycle actions use separate, explicitly granted permissions." },
      { q: "Do we have to open inbound firewall ports for on-prem?", a: "No. The Edge Agent initiates outbound HTTPS to the control plane; nothing connects inbound to your site, and hypervisor credentials stay on the agent." },
      { q: "Which private platforms are supported?", a: "VMware, Microsoft Hyper-V, Nutanix and Red Hat OpenShift through the Edge Agent, plus bare-metal and KVM estates; hybrid stacks such as Azure Stack, Huawei Cloud Stack and Alibaba Apsara Stack attach through the same agent." },
    ],
  },

  identity: {
    status: { label: "Generally available", tone: "success" },
    summary:
      "Identity & Access is the platform's identity fabric: federate the identity providers you already run — Entra ID, Okta, Auth0, AWS Identity Center, Google IAM, OneLogin, on-prem Active Directory and the cloud IAMs — provision users automatically over SCIM, and apply one role model across every connected cloud. Enterprise adds Whale IAM-PAM for privileged sessions.",
    facts: [
      { value: "9+", label: "Identity providers over SAML 2.0 and OIDC" },
      { value: "SCIM 2.0", label: "Automatic user and group provisioning" },
      { value: "One RBAC", label: "Roles mapped from IdP groups, enforced on every cloud" },
    ],
    capabilities: [
      { title: "Single sign-on", body: "SAML 2.0 and OIDC federation with Microsoft Entra ID, Okta, Auth0, AWS Identity Center, Google IAM, OneLogin and on-premises AD, with step-by-step setup guides for each." },
      { title: "Auto-provisioning", body: "SCIM 2.0 creates, updates and deactivates users as your directory changes, and maps IdP groups to platform roles — joiners and leavers are handled where HR already handles them." },
      { title: "Role-based access, cross-cloud", body: "Roles such as viewer, operator and approver apply across AWS, Azure, GCP and on-prem estates at once, with scope by account, workload or tenant." },
      { title: "Privileged access (Enterprise & up)", body: "Whale IAM-PAM brokers privileged sessions with approval gates and recording; the Government Edition makes PAM and MFA mandatory on every role." },
    ],
    howItWorks: [
      { title: "Federate", body: "Register BlueWhale Stack as an application in your IdP and exchange SAML or OIDC metadata — a few minutes per provider." },
      { title: "Map groups to roles", body: "Choose which directory groups become which platform roles, and the scopes those roles cover." },
      { title: "Provision automatically", body: "Turn on SCIM so accounts and roles follow the directory; access reviews and the audit trail come for free." },
    ],
    screen: {
      nav: "Security", eyebrow: "Identity & Access", title: "Identity fabric",
      kpis: [
        { value: "3", label: "Identity providers", note: "Entra · Okta · AD" },
        { value: "1,240", label: "Users", note: "SCIM-provisioned", tone: "ok" },
        { value: "18", label: "Roles", note: "scoped by workload" },
        { value: "7", label: "Pending reviews", note: "quarterly access review", tone: "warn" },
      ],
      table: {
        caption: "Role assignments · recent",
        columns: ["Group", "Role", "Scope", "Provider", "Status"],
        rows: [
          ["cloud-platform", "Operator", "All estates", "Entra ID", { chip: "Active", tone: "ok" }],
          ["finance-finops", "Viewer", "Cost data", "Okta", { chip: "Active", tone: "ok" }],
          ["sec-ops", "Approver", "Privileged sessions", "Entra ID", { chip: "PAM", tone: "info" }],
          ["contractors", "Viewer", "channels-web only", "AD", { chip: "Expires 30 Sep", tone: "warn" }],
        ],
      },
    },
    faq: [
      { q: "Can we keep our existing IdP?", a: "Yes — that is the point. The platform federates with the directory you already run; it never becomes a second source of truth for users." },
      { q: "How are roles kept in sync?", a: "Through SCIM 2.0 group mapping: when a user joins or leaves a directory group, their platform role follows within the provisioning interval, and the change is logged." },
      { q: "Is MFA enforced?", a: "MFA is enforced by your IdP policy for SSO. In the Government Edition MFA is mandatory on every role and privileged access always runs through PAM with session recording." },
    ],
  },

  provisioning: {
    status: { label: "Generally available", tone: "success" },
    summary:
      "The Service Catalog lets teams request approved cloud resources without touching cloud consoles. AWS provisioning is live for EC2, S3, RDS, VPC and EFS, with Azure and GCP catalog items, approval workflows, governance guardrails and Whale AI sizing advice built into the request — so self-service and control stop being a trade-off.",
    facts: [
      { value: "AWS live", label: "EC2 · S3 · RDS · VPC · EFS provisioned from the catalog" },
      { value: "Guardrails", label: "Approved sizes, regions and tags enforced before submit" },
      { value: "Whale AI", label: "Sizing recommendations inside the request form" },
    ],
    capabilities: [
      { title: "Governed self-service", body: "Teams pick from catalog items you approve — with sizes, regions, tags and naming already constrained — instead of being handed console access." },
      { title: "Approval workflows", body: "Route requests by cost, environment or resource type to the right approver; low-risk items can auto-approve, everything is recorded." },
      { title: "Whale AI sizing", body: "The request form asks Whale AI for a right-sized recommendation grounded in your inventory and cost history, before a single instance is oversized." },
      { title: "Audit trail", body: "Who requested, who approved, what was provisioned and where — every catalog action lands in the platform audit log and the ITSM change record." },
    ],
    howItWorks: [
      { title: "Publish catalog items", body: "Define the resources teams may request and the guardrails that apply to each." },
      { title: "Request and approve", body: "A developer selects an item, gets a sizing suggestion, submits; the approval policy decides who signs off." },
      { title: "Provision and track", body: "The platform provisions with its own credentials, tags the resource, and adds it to inventory and cost tracking automatically." },
    ],
    screen: {
      nav: "Overview", eyebrow: "Service Catalog", title: "Requests",
      kpis: [
        { value: "38", label: "Requests this month" },
        { value: "31", label: "Auto-approved", note: "within policy", tone: "ok" },
        { value: "4", label: "Awaiting approval", note: "over $2k / month", tone: "warn" },
      ],
      table: {
        caption: "Recent requests",
        columns: ["Request", "Item", "Requester", "Est. monthly", "Status"],
        rows: [
          ["REQ-2041", "EC2 m6i.large ×2", "channels-web", "$142", { chip: "Provisioned", tone: "ok" }],
          ["REQ-2040", "RDS PostgreSQL", "payments-core", "$318", { chip: "Approval", tone: "warn" }],
          ["REQ-2039", "S3 bucket (private)", "analytics-lake", "$9", { chip: "Provisioned", tone: "ok" }],
          ["REQ-2038", "VPC + subnets", "platform", "—", { chip: "Provisioned", tone: "ok" }],
        ],
      },
    },
    faq: [
      { q: "Which resources can be provisioned today?", a: "On AWS: EC2, S3, RDS, VPC and EFS. Azure and GCP catalog items are available for request and approval, with provisioning coverage expanding by resource type." },
      { q: "Can requests bypass approval?", a: "Only if your policy says so — for example, dev-environment items under a cost threshold. Everything else routes to the approver you define, and every decision is logged." },
      { q: "Where do provisioned resources show up?", a: "In the unified inventory immediately, tagged with requester and workload, and in Whalenomics cost tracking from the first billing record." },
    ],
  },

  itsm: {
    status: { label: "Generally available", tone: "success" },
    summary:
      "ITSM is service management built for cloud operations: incidents with P0–P4 SLAs and breach detection, change and problem management, a knowledge base, a CMDB fed by the live inventory and kanban boards — with tickets raised directly from cloud events and two-way integration with ServiceNow and Jira where those remain the system of record.",
    facts: [
      { value: "P0–P4", label: "SLA classes with breach detection and escalation" },
      { value: "CMDB", label: "Configuration items kept in sync with the inventory" },
      { value: "ServiceNow · Jira", label: "Two-way ticket integration" },
    ],
    capabilities: [
      { title: "Incidents from the estate", body: "A failed connector, an SLO burn, a policy violation or a cost anomaly opens an incident with the affected workload attached — no copying from one tool to another." },
      { title: "Change and problem management", body: "Changes carry the approval trail from the Service Catalog; problems link recurring incidents to a root cause and a fix." },
      { title: "CMDB without manual upkeep", body: "Configuration items are the inventory — when a resource changes, its CI changes; relationships come from dependency mapping." },
      { title: "Integrations", body: "Push and sync tickets with ServiceNow and Jira, keep your existing queues and on-call, and use the platform as the source of cloud context." },
    ],
    howItWorks: [
      { title: "Classify", body: "Set SLA classes and escalation paths per service; the estate's events map to them automatically." },
      { title: "Work the queue", body: "Incidents, changes and problems in kanban or list views, each linked to the live resources involved." },
      { title: "Close with evidence", body: "Every state change is recorded — the audit trail doubles as the evidence the regulator and the post-incident review both need." },
    ],
    screen: {
      nav: "Overview", eyebrow: "ITSM", title: "Incidents & changes",
      kpis: [
        { value: "14", label: "Open incidents", note: "2 × P1", tone: "warn" },
        { value: "98.6%", label: "SLA met (30 d)", note: "target 98%", tone: "ok" },
        { value: "9", label: "Changes this week", note: "6 pre-approved" },
      ],
      table: {
        caption: "Incidents · by priority",
        columns: ["Incident", "Service", "Source", "Age", "Priority"],
        rows: [
          ["INC-3182", "payments-core", "SLO burn-rate", "42 min", { chip: "P1", tone: "warn" }],
          ["INC-3181", "mumbai-dc-edge", "Connector health", "1 h", { chip: "P2", tone: "info" }],
          ["INC-3179", "analytics-lake", "Cost anomaly", "5 h", { chip: "P3", tone: "muted" }],
          ["INC-3175", "channels-web", "Policy violation", "1 d", { chip: "P3", tone: "muted" }],
        ],
      },
    },
    faq: [
      { q: "We already run ServiceNow. Do we have to switch?", a: "No. Keep ServiceNow or Jira as the system of record and sync tickets both ways; the platform adds the cloud context — the resources, cost and policy behind each ticket." },
      { q: "How are SLAs measured?", a: "Per priority class (P0–P4) with response and resolution targets you set; breaches are detected continuously and escalated on the path you define." },
      { q: "Is the CMDB maintained manually?", a: "No — configuration items and their relationships come from the live inventory and dependency map, so the CMDB is as current as the last discovery." },
    ],
  },

  observe: {
    status: { label: "Generally available", tone: "success" },
    summary:
      "Observe bundles production-grade observability into the platform — logs, metrics and traces in one place, SLOs with burn-rate alerting, synthetics, usage metering and notification channels — so teams get full observability of the estate without procuring and stitching a separate monitoring contract.",
    facts: [
      { value: "Logs · metrics · traces", label: "One data model, one query surface" },
      { value: "SLOs", label: "Error budgets with burn-rate alerts" },
      { value: "Bundled", label: "Included in Standard & up — no separate contract" },
    ],
    capabilities: [
      { title: "Unified telemetry", body: "Ingest logs, metrics and traces from cloud services and agents into one store, correlated with the inventory so a signal always resolves to a workload and an owner." },
      { title: "SLOs and burn-rate alerts", body: "Define availability and latency objectives per service; alerts fire on error-budget burn rate, not raw thresholds, which cuts noise and pages the right team." },
      { title: "Synthetics and metering", body: "Probe endpoints from your regions, and meter usage per tenant or business unit — the same numbers Whalenomics and Tenancy use for billing." },
      { title: "Notification channels", body: "Route alerts to email, chat and on-call tools, and open ITSM incidents automatically for SLO breaches." },
    ],
    howItWorks: [
      { title: "Ingest", body: "Cloud-native telemetry via provider APIs; agents and OpenTelemetry for applications; the Edge Agent for on-prem." },
      { title: "Define objectives", body: "Set SLOs per service with the platform suggesting baselines from observed behaviour." },
      { title: "Alert and act", body: "Burn-rate alerts route to channels and ITSM; dashboards and traces are one click from the incident." },
    ],
    screen: {
      nav: "Overview", eyebrow: "Observe", title: "Service level objectives",
      kpis: [
        { value: "42", label: "Services with SLOs" },
        { value: "99.94%", label: "Availability (30 d)", note: "payments-core", tone: "ok" },
        { value: "2", label: "Budgets burning", note: "alerting", tone: "warn" },
      ],
      table: {
        caption: "SLOs · by remaining error budget",
        columns: ["Service", "Objective", "Window", "Budget left", "State"],
        rows: [
          ["payments-core", "99.9% availability", "30 d", "61%", { chip: "OK", tone: "ok" }],
          ["channels-web", "p95 < 300 ms", "7 d", "18%", { chip: "Burning", tone: "warn" }],
          ["analytics-lake", "99.5% availability", "30 d", "84%", { chip: "OK", tone: "ok" }],
          ["core-vmware", "99.9% availability", "30 d", "9%", { chip: "Burning", tone: "warn" }],
        ],
      },
    },
    faq: [
      { q: "Does Observe replace our APM tool?", a: "For most teams it removes the need for a separate contract: logs, metrics, traces, SLOs and synthetics are bundled. If you keep an existing tool, its alerts can still open incidents in the platform." },
      { q: "How do you keep alert noise down?", a: "Alerts are based on SLO error-budget burn rate rather than static thresholds, and correlated to workloads — one incident per real problem, routed to the owning team." },
      { q: "Is telemetry stored in-region?", a: "Yes. Telemetry follows the deployment's data residency: your chosen region on SaaS, your accounts on BYOC, and never leaves the perimeter on sovereign deployments." },
    ],
  },

  finops: {
    status: { label: "Whale AI use cases live · full backend in progress", tone: "warning" },
    summary:
      "Whalenomics is the FinOps family: budgets, forecasts, chargeback and continuous optimisation, with spend decomposed to workload, department or tenant. Today the Whale AI FinOps use cases — cost narratives, anomaly explanations, rightsizing and commitment advice — run on live billing data from AWS, Azure and GCP; the full Whalenomics backend for budgets and chargeback is in progress.",
    facts: [
      { value: "12", label: "Whale AI FinOps use cases live today" },
      { value: "AWS · Azure · GCP", label: "Pricing maps and billing ingestion" },
      { value: "Per tenant", label: "Chargeback and metering model (in progress)" },
    ],
    capabilities: [
      { title: "Cost visibility with ownership", body: "Billing records are joined to the inventory, so every dollar resolves to a workload, an owner and a tag — the basis for showback and chargeback." },
      { title: "Anomalies and explanations", body: "Whale AI flags unusual spend and explains it in plain language against the inventory: what changed, where, and who owns it." },
      { title: "Rightsizing and commitments", body: "Idle and oversized resources, storage tiers and commitment coverage are surfaced with the saving and the action — from the inventory, not a separate tool." },
      { title: "Budgets, forecasts, chargeback", body: "Budgets per unit with forecasts and alerts, and chargeback into your ERP or an operator's BSS — the Whalenomics backend currently in progress." },
    ],
    howItWorks: [
      { title: "Ingest and join", body: "Billing exports from each cloud are normalised and joined to inventory and tags." },
      { title: "Explain", body: "Whale AI answers 'why did this rise' with the resources behind the number." },
      { title: "Decide and allocate", body: "Rightsize, commit, and allocate cost to the unit that owns it; budgets and forecasts follow." },
    ],
    screen: {
      nav: "FinOps", eyebrow: "Whalenomics", title: "Spend by workload",
      kpis: [
        { value: "$184k", label: "This month", note: "−6.2% vs forecast", tone: "ok" },
        { value: "3", label: "Anomalies", note: "explained by Whale AI", tone: "warn" },
        { value: "$21k", label: "Savings identified", note: "rightsizing + commitments" },
      ],
      table: {
        caption: "Top workloads · month to date",
        columns: ["Workload", "Owner", "Spend", "vs last month", "Signal"],
        rows: [
          ["payments-core", "Platform", "$48,210", "+2%", { chip: "On budget", tone: "ok" }],
          ["analytics-lake", "Data", "$31,940", "+18%", { chip: "Anomaly", tone: "warn" }],
          ["channels-web", "Digital", "$22,105", "−4%", { chip: "On budget", tone: "ok" }],
          ["ml-training", "R&D", "$19,870", "+9%", { chip: "Rightsize", tone: "info" }],
        ],
      },
      bars: { caption: "Spend by department", items: [{ label: "Platform", value: "$61k", pct: 33 }, { label: "Data", value: "$52k", pct: 28 }, { label: "Digital", value: "$39k", pct: 21 }, { label: "R&D", value: "$32k", pct: 18 }] },
    },
    faq: [
      { q: "What is live today and what is in progress?", a: "Live: cost visibility joined to inventory, anomaly detection and explanations, rightsizing and commitment advice — the twelve Whale AI FinOps use cases. In progress: the full Whalenomics backend for budgets, forecasts and chargeback feeds." },
      { q: "Which clouds are covered?", a: "Billing ingestion and pricing maps for AWS, Azure and GCP today; the other connected clouds contribute inventory and will follow for billing." },
      { q: "Can chargeback feed our ERP or BSS?", a: "That is the design goal of the Whalenomics backend: per-unit and per-tenant allocation exported to ERP, and for operators into their BSS through Tenancy & Monetization." },
    ],
  },

  migration: {
    status: { label: "Assessment live · execution hooks in progress", tone: "warning" },
    summary:
      "The Migration Engine industrialises entry, movement and exit: on-premises workloads discovered by the Edge Agent are auto-classified, scored with a 6R assessment for cost, effort and blockers, and planned into rehearsable waves with rollback and Whale AI guidance. Assessment and wave planning are live; execution hooks are in progress.",
    facts: [
      { value: "6R", label: "Rehost · replatform · refactor · repurchase · retire · retain, scored" },
      { value: "Waves", label: "Dependency-aware planning with rollback" },
      { value: "Exit-ready", label: "The same engine rehearses regulator-mandated exit plans" },
    ],
    capabilities: [
      { title: "Auto-classification", body: "Discovered workloads are classified by type, dependencies and data gravity, so the assessment starts from facts rather than interviews." },
      { title: "6R assessment", body: "Each workload gets a recommended strategy with estimated target cost, effort and blockers — and the evidence behind the score." },
      { title: "Wave planning with rollback", body: "Waves are cut along dependency boundaries, rehearsed, and carry a rollback plan; Whale AI drafts the sequence and flags risks." },
      { title: "Execution hooks (in progress)", body: "Handoff to tooling for the move itself, with status flowing back into the wave board and ITSM changes." },
    ],
    howItWorks: [
      { title: "Discover", body: "Edge Agents inventory the source estate and map dependencies." },
      { title: "Assess", body: "6R scoring with cost, effort and blockers per workload." },
      { title: "Plan waves", body: "Sequence, rehearse, approve; execute with rollback when the hooks land." },
    ],
    screen: {
      nav: "Migrate", eyebrow: "Migration Engine", title: "Wave plan · datacenter exit",
      kpis: [
        { value: "410", label: "Workloads assessed" },
        { value: "6", label: "Waves planned", note: "2 rehearsed", tone: "ok" },
        { value: "17", label: "Blockers open", note: "licensing · latency", tone: "warn" },
      ],
      table: {
        caption: "Waves · by readiness",
        columns: ["Wave", "Workloads", "Strategy mix", "Target", "Readiness"],
        rows: [
          ["Wave 1 — stateless web", "62", "Rehost 80% · Retire 20%", "AWS ap-south-1", { chip: "Rehearsed", tone: "ok" }],
          ["Wave 2 — data services", "48", "Replatform 60%", "Azure Central India", { chip: "Rehearsed", tone: "ok" }],
          ["Wave 3 — core apps", "120", "Rehost 50% · Refactor 30%", "AWS + on-prem", { chip: "Blockers", tone: "warn" }],
          ["Wave 4 — retain", "180", "Retain", "Mumbai DC", { chip: "Planned", tone: "muted" }],
        ],
      },
    },
    faq: [
      { q: "Does it move the workloads?", a: "Assessment and wave planning are live today. Execution hooks — handing the move to tooling and tracking it back on the wave board — are in progress; until then teams execute with their existing tooling against the plan." },
      { q: "Can it help with a regulator's exit-plan requirement?", a: "Yes — the same engine turns an exit annexure into a dependency-mapped, rehearsed plan with drill evidence, which is how BFSI customers use it today." },
      { q: "Which targets are supported?", a: "Any connected estate: the six public clouds, private and virtualised platforms via the Edge Agent, and on-premises for repatriation." },
    ],
  },

  whaleforge: {
    status: { label: "Beta · deployment runner coming", tone: "warning" },
    summary:
      "WhaleForge lets platform teams write infrastructure in a plain YAML DSL and compiles it to real Terraform HCL for AWS, Azure and GCP — with live HLD, LLD and TOGAF diagrams that stay in sync with the code, PDF export for architecture reviews and Git import for existing repositories. The deployment runner is the next milestone.",
    facts: [
      { value: "YAML → HCL", label: "Real Terraform output, not a proprietary runtime" },
      { value: "HLD · LLD · TOGAF", label: "Diagrams generated from the same source" },
      { value: "Beta", label: "Available to Enterprise & up on request" },
    ],
    capabilities: [
      { title: "A readable DSL", body: "Describe networks, compute, data and policies in YAML that architects and reviewers can read; WhaleForge expands it into provider-specific Terraform." },
      { title: "Diagrams that cannot drift", body: "HLD, LLD and TOGAF views are rendered from the source on every change and exported to PDF for design authorities and audits." },
      { title: "Git import", body: "Bring existing Terraform repositories in, see them as diagrams, and evolve them in the DSL where it helps." },
      { title: "Industry landing-zone packs", body: "Starting points for Banking, Telco, Healthcare and Fintech that encode guardrails, tags and account structure from day one." },
    ],
    howItWorks: [
      { title: "Author", body: "Write or import the definition; validation runs as you type." },
      { title: "Compile and review", body: "Generate Terraform and the diagrams; review both in the same change." },
      { title: "Apply", body: "Run through your existing pipeline today; the WhaleForge deployment runner is coming next." },
    ],
    screen: {
      nav: "Overview", eyebrow: "WhaleForge", title: "stack.yaml → Terraform",
      kpis: [
        { value: "3", label: "Modules", note: "network · compute · data" },
        { value: "14", label: "Resources", note: "AWS ap-south-1" },
        { value: "0", label: "Validation errors", tone: "ok" },
      ],
      table: {
        caption: "Compiled resources",
        columns: ["Resource", "Type", "Provider", "Diagram", "State"],
        rows: [
          ["vpc-main", "aws_vpc", "AWS", "HLD · LLD", { chip: "Compiled", tone: "ok" }],
          ["subnet-private-a", "aws_subnet", "AWS", "LLD", { chip: "Compiled", tone: "ok" }],
          ["app-asg", "aws_autoscaling_group", "AWS", "HLD · LLD", { chip: "Compiled", tone: "ok" }],
          ["db-primary", "aws_db_instance", "AWS", "LLD · TOGAF", { chip: "Review", tone: "info" }],
        ],
      },
    },
    faq: [
      { q: "Is the output real Terraform?", a: "Yes — standard HCL you can read, diff and run with your existing Terraform tooling and state backends. There is no proprietary runtime in the way." },
      { q: "Can we use it on existing repositories?", a: "Yes, through Git import: existing Terraform is visualised as diagrams and can be extended in the DSL incrementally." },
      { q: "What does 'Beta' mean here?", a: "Compilation, diagrams, PDF export and Git import are usable today with Enterprise & up; the deployment runner is not yet shipped, so apply steps run through your own pipeline." },
    ],
  },

  "landing-zone": {
    status: { label: "Beta", tone: "warning" },
    summary:
      "Landing Zone Builder is a visual designer for compliant cloud foundations — AWS Control Tower, Azure Cloud Landing Zone and GCP foundations — that generates the multi-account baseline as Terraform HCL with guardrails, tags and account structure built in. Design the foundation as a diagram; get the code that stands it up.",
    facts: [
      { value: "AWS · Azure · GCP", label: "Control Tower, CLZ and GCP foundation patterns" },
      { value: "Baseline HCL", label: "Multi-account, versioned, reviewable" },
      { value: "Guardrails", label: "Policy, tagging and network controls from day one" },
    ],
    capabilities: [
      { title: "Visual foundation design", body: "Lay out organisations, accounts, networks and shared services on a canvas that mirrors each provider's reference architecture." },
      { title: "Guardrails as configuration", body: "Choose the controls — SCPs and policies, tagging standards, network baselines — and they are generated into the code, not documented beside it." },
      { title: "Generated multi-account baseline", body: "The output is Terraform for the whole foundation, ready for review and your pipeline; WhaleForge can extend it." },
      { title: "Industry patterns", body: "Banking, telco, healthcare and government starting points that reflect segregation and residency requirements." },
    ],
    howItWorks: [
      { title: "Design", body: "Pick the provider pattern and draw the account and network structure." },
      { title: "Select guardrails", body: "Turn on the controls the estate must have; the designer validates the combination." },
      { title: "Generate", body: "Export the baseline HCL and apply it through your pipeline." },
    ],
    screen: {
      nav: "Overview", eyebrow: "Landing Zone Builder", title: "Foundation · AWS Control Tower",
      kpis: [
        { value: "6", label: "Accounts", note: "prod · non-prod · shared" },
        { value: "24", label: "Guardrails", note: "SCP · tagging · network", tone: "ok" },
        { value: "1", label: "Warning", note: "missing log archive KMS", tone: "warn" },
      ],
      table: {
        caption: "Organisational units and accounts",
        columns: ["OU / account", "Purpose", "Guardrails", "Network", "State"],
        rows: [
          ["Security / log-archive", "Central logs", "12", "—", { chip: "Warning", tone: "warn" }],
          ["Security / audit", "Read-only audit", "10", "—", { chip: "Ready", tone: "ok" }],
          ["Workloads / prod", "Production", "18", "Hub-spoke", { chip: "Ready", tone: "ok" }],
          ["Workloads / non-prod", "Dev & test", "14", "Hub-spoke", { chip: "Ready", tone: "ok" }],
        ],
      },
    },
    faq: [
      { q: "Do we need Control Tower already?", a: "No. The designer can target a new organisation or model an existing one; for existing estates, import the current structure and add the guardrails you are missing." },
      { q: "How does this relate to WhaleForge?", a: "Landing Zone Builder produces the foundation; WhaleForge builds workloads on top of it. Both emit standard Terraform." },
      { q: "What is the Beta limitation?", a: "The generated baseline is applied through your own pipeline today; a managed apply step is planned alongside the WhaleForge deployment runner." },
    ],
  },

  "cloud-audit": {
    status: { label: "Included in Enterprise & up", tone: "neutral" },
    summary:
      "Cloud Audit & Evidence treats policy as configuration and monitors the controls behind it continuously across every estate, so evidence is generated all the time instead of assembled before an inspection. Reports are produced on demand for the board, the auditor and the regulator, with obligations mapped per regime — DPDP, GDPR, RBI, CERT-In, SEBI and more.",
    facts: [
      { value: "Continuous", label: "Controls monitored, not sampled quarterly" },
      { value: "Per regime", label: "Obligations mapped to platform controls" },
      { value: "On demand", label: "Examiner-grade reports as parameters, not projects" },
    ],
    capabilities: [
      { title: "Policy as configuration", body: "Residency, encryption, access, logging and tagging policies are defined once and applied across clouds; drift is a finding, not a surprise." },
      { title: "Continuous control monitoring", body: "Each control is evaluated against the live inventory and telemetry; failures open findings with the resources and owners attached." },
      { title: "Regime mapping", body: "Frameworks such as India DPDP, GDPR, RBI outsourcing, CERT-In and SEBI CSCRF are mapped to controls, so one evidence set answers several regulators." },
      { title: "Examiner-grade reporting", body: "Generate the report an inspection asks for — scope, controls, evidence, exceptions — from a system of record with a tamper-evident trail; the Government Edition adds WORM-backed audit logs." },
    ],
    howItWorks: [
      { title: "Declare", body: "Choose the regimes that apply and the policies the estate must meet." },
      { title: "Monitor", body: "Controls are checked continuously; findings route to owners through ITSM." },
      { title: "Report", body: "Produce the evidence pack for a period, a regime or an estate in minutes." },
    ],
    screen: {
      nav: "Security", eyebrow: "Cloud Audit & Evidence", title: "Control posture · RBI + DPDP",
      kpis: [
        { value: "212", label: "Controls monitored" },
        { value: "96.7%", label: "Passing", note: "continuous", tone: "ok" },
        { value: "7", label: "Open findings", note: "3 high", tone: "warn" },
        { value: "2", label: "Regimes", note: "RBI · DPDP" },
      ],
      table: {
        caption: "Findings · by severity",
        columns: ["Control", "Regime", "Resources", "Owner", "Severity"],
        rows: [
          ["Encryption at rest (customer key)", "RBI · DPDP", "3", "Data", { chip: "High", tone: "warn" }],
          ["Public storage exposure", "DPDP", "1", "Digital", { chip: "High", tone: "warn" }],
          ["Log retention ≥ 180 days", "CERT-In", "2", "Platform", { chip: "Medium", tone: "info" }],
          ["MFA on privileged roles", "RBI", "0", "SecOps", { chip: "Passing", tone: "ok" }],
        ],
      },
    },
    faq: [
      { q: "Is this a compliance scanner or an audit tool?", a: "Both halves of the same loop: controls are evaluated continuously against live data, and the evidence that evaluation produces is what the report is built from — so the report is never assembled by hand." },
      { q: "Which regimes are mapped?", a: "India DPDP, GDPR, RBI IT outsourcing, CERT-In directions and SEBI CSCRF today, with the mapping extended per customer engagement; the underlying controls are regime-agnostic." },
      { q: "How is the trail protected?", a: "All platform activity is written to an append-only audit log; the Government Edition backs it with WORM storage for immutability." },
    ],
  },

  "whale-ai": {
    status: { label: "Generally available", tone: "success" },
    summary:
      "Whale AI is an intelligence layer woven into every module rather than a chatbot beside them: 50+ production use cases across cost, security, ITSM, operations, migration and governance, each grounded in your live inventory, billing, tickets and findings. It runs in three tiers — Spark, Tide and Abyss — with your choice of model, including fully offline inside the perimeter for sovereign estates.",
    facts: [
      { value: "50+", label: "Use cases, each with declared data dependencies" },
      { value: "Spark · Tide · Abyss", label: "Three tiers routed by task complexity" },
      { value: "Offline", label: "In-region and air-gapped models for sovereign deployments" },
    ],
    capabilities: [
      { title: "Grounded, not generative guesswork", body: "Every use case declares the providers it reads — inventory, cost, tickets, findings — and cites them in the answer; numbers come from the platform, not the model." },
      { title: "Tiered intelligence", body: "Spark answers interactive questions in under three seconds; Tide reasons over migration plans and IaC; Abyss runs multi-step agents for the hardest cross-module work." },
      { title: "In the flow of work", body: "An assistant drawer in every module, streamed answers, exports to PDF and Excel, and prompt caching so repeat questions are instant." },
      { title: "Inside the perimeter", body: "Bring your model or run ours in-region; sovereign deployments run Whale AI fully offline with zero external data exposure." },
    ],
    howItWorks: [
      { title: "Ask, in context", body: "From any screen, ask about what you are looking at — a workload, a bill, an incident." },
      { title: "Ground", body: "The use case gathers the live facts it declares, scoped to your permissions." },
      { title: "Answer with citations", body: "The right tier reasons over the facts and streams an answer with the evidence behind it." },
    ],
    screen: {
      nav: "Overview", eyebrow: "Whale AI", title: "Assistant · cost narrative",
      kpis: [
        { value: "1,842", label: "Questions this month" },
        { value: "2.4 s", label: "Median response (Spark)", tone: "ok" },
        { value: "100%", label: "In-region", note: "no external calls", tone: "ok" },
      ],
      table: {
        caption: "Recent use cases",
        columns: ["Use case", "Tier", "Grounded on", "Asked by", "Result"],
        rows: [
          ["Why did analytics-lake rise 18%?", "Spark", "Billing · inventory", "Finance", { chip: "Cited", tone: "ok" }],
          ["Draft wave 3 rollback plan", "Tide", "Inventory · dependencies", "Platform", { chip: "Cited", tone: "ok" }],
          ["Security RCA — INC-3182", "Abyss", "Findings · tickets · logs", "SecOps", { chip: "Cited", tone: "ok" }],
          ["Compliance gap — DPDP", "Tide", "Controls · evidence", "Risk", { chip: "Cited", tone: "ok" }],
        ],
      },
    },
    faq: [
      { q: "Does our data leave our environment?", a: "On SaaS, requests are processed in your chosen region; on BYOC they run in your accounts; on sovereign deployments Whale AI runs fully offline on in-region models with no external calls." },
      { q: "Which models are used?", a: "Your choice — hosted models including Anthropic Claude, or models you bring and run inside the perimeter. Use cases are model-agnostic; grounding and citations work the same way." },
      { q: "Can it take actions?", a: "Use cases draft plans, reports and configurations; actions still go through the platform's approvals and audit trail, so Whale AI never bypasses governance." },
    ],
  },

  tenancy: {
    status: { label: "Preview · GA Q4 2026 (Telco & Datacenter Edition)", tone: "warning" },
    summary:
      "Tenancy & Monetization is the Digital Experience Layer for operators: native multi-tenancy with isolation and quotas, white-label portals, service catalogs and a marketplace, and per-tenant metering that feeds your own OSS/BSS and invoicing — so a telco or datacenter operator publishes governed cloud services under its own brand and bills for them. In preview now, general availability targeted for Q4 2026.",
    facts: [
      { value: "Native", label: "Multi-tenancy with isolation and quotas per tenant" },
      { value: "White-label", label: "Portals, catalog and marketplace under your brand" },
      { value: "OSS/BSS", label: "Metering and billing feeds into your existing stack" },
    ],
    capabilities: [
      { title: "Tenant isolation and quotas", body: "Each tenant gets its own identity scope, resources, quotas and policies on shared operator capacity, enforced by the platform rather than by convention." },
      { title: "White-label experience", body: "Portals with your logo, colours and domain; a catalog of your services and a marketplace for partners and ISVs." },
      { title: "Metering and billing feeds", body: "Usage is metered per tenant and pushed to your BSS or invoicing — the operator keeps its commercial machinery and adds cloud products to it." },
      { title: "SLA and tenant health", body: "Per-tenant SLA reporting and health visibility drive renewals and support, with ITSM tickets scoped to the tenant." },
    ],
    howItWorks: [
      { title: "Model tenants", body: "Define tenants, quotas and policies on the operator's estate." },
      { title: "Publish services", body: "Build the catalog and brand the portal; open the marketplace to partners." },
      { title: "Meter and bill", body: "Usage flows to OSS/BSS; SLAs and health are visible per tenant." },
    ],
    screen: {
      nav: "Overview", eyebrow: "Tenancy & Monetization", title: "Operator services · tenants",
      kpis: [
        { value: "37", label: "Tenants", note: "3 markets" },
        { value: "$412k", label: "Metered this month", note: "billed via BSS", tone: "ok" },
        { value: "2", label: "Quota alerts", note: "GPU capacity", tone: "warn" },
      ],
      table: {
        caption: "Tenants · by metered usage",
        columns: ["Tenant", "Plan", "Usage (MTD)", "SLA", "Health"],
        rows: [
          ["Alpha Bank", "Sovereign", "$96k", "99.95%", { chip: "Healthy", tone: "ok" }],
          ["Ministry X", "Sovereign", "$74k", "99.99%", { chip: "Healthy", tone: "ok" }],
          ["Retail Co", "Managed cloud", "$41k", "99.9%", { chip: "Quota 92%", tone: "warn" }],
          ["ISV partner", "Marketplace", "$12k", "99.9%", { chip: "Healthy", tone: "ok" }],
        ],
      },
    },
    faq: [
      { q: "What does preview mean commercially?", a: "Design partners run Tenancy & Monetization on their own estates under the preview programme; general availability of the Telco & Datacenter Edition is targeted for Q4 2026." },
      { q: "Do we replace our BSS?", a: "No. Metering feeds your existing OSS/BSS and invoicing; the platform adds tenancy, catalog and portal on top of the commercial systems you already run." },
      { q: "Can tenants bring their own clouds?", a: "Yes — a tenant's estate can span operator capacity and public cloud accounts, governed by the same identity and policy plane." },
    ],
  },

  "sovereign-operations": {
    status: { label: "Generally available — Government Edition", tone: "success" },
    summary:
      "Sovereign Operations makes sovereignty a property of the architecture: in-country deployment with directorate-level segregation under central policy, air-gapped deployment classes with an offline update channel, FIPS-validated cryptography, always-on privileged access management, a WORM-backed audit log and offline-tolerant edge sites — with Whale AI operating entirely inside the perimeter.",
    facts: [
      { value: "Air-gapped", label: "Deployment classes with offline updates and no call-home" },
      { value: "FIPS · PAM · WORM", label: "Validated crypto, always-on PAM, immutable audit" },
      { value: "In-region AI", label: "Whale AI Abyss runs on local models only" },
    ],
    capabilities: [
      { title: "Segregation under central policy", body: "Ministries, directorates or agencies operate their own estates with autonomy inside national guardrails — one policy plane, many isolated domains." },
      { title: "Air-gapped classes", body: "The most sensitive estates run fully disconnected with an offline update channel; hybrid classes connect to sovereign clouds such as AWS GovCloud, Azure Government and Google Distributed Cloud." },
      { title: "Hardened by default", body: "FIPS-validated cryptography, MFA mandatory on every role, PAM with session recording always on, residency enforced and evidenced." },
      { title: "Offline-tolerant edge", body: "Remote sites keep operating under headquarters-grade policy when disconnected and reconcile when they reconnect." },
    ],
    howItWorks: [
      { title: "Classify estates", body: "Assign each estate a deployment class — in-country connected, sovereign cloud, or air-gapped." },
      { title: "Segregate and govern", body: "Directorates get isolated domains; policy, identity and audit remain central." },
      { title: "Evidence continuously", body: "State-audit evidence and compliance packs (FedRAMP / IRAP / StateRAMP-style) are generated from the WORM-backed trail." },
    ],
    screen: {
      nav: "Security", eyebrow: "Sovereign Operations", title: "National estate · deployment classes",
      kpis: [
        { value: "14", label: "Directorates", note: "segregated" },
        { value: "3", label: "Air-gapped classes", note: "offline updates", tone: "ok" },
        { value: "0", label: "External AI calls", note: "in-region only", tone: "ok" },
        { value: "100%", label: "PAM coverage", note: "sessions recorded", tone: "ok" },
      ],
      table: {
        caption: "Estates · by deployment class",
        columns: ["Estate", "Class", "Residency", "Audit log", "Status"],
        rows: [
          ["Directorate A — core", "Air-gapped", "In-country", "WORM", { chip: "Compliant", tone: "ok" }],
          ["Directorate B — services", "Sovereign cloud", "In-country", "WORM", { chip: "Compliant", tone: "ok" }],
          ["Regional edge — north", "Edge (offline-tolerant)", "In-country", "Synced 08:20", { chip: "Reconnected", tone: "info" }],
          ["Shared analytics", "In-country connected", "In-country", "WORM", { chip: "Review", tone: "warn" }],
        ],
      },
    },
    faq: [
      { q: "How do updates reach an air-gapped estate?", a: "Through an offline update channel: signed release bundles are transferred by your approved process and verified on import; nothing calls home." },
      { q: "Does Whale AI work without internet?", a: "Yes — the Government Edition runs Whale AI Abyss on in-region models inside the perimeter, with no external calls." },
      { q: "Which accreditations does it support?", a: "Compliance pack export produces evidence for FedRAMP-, IRAP- and StateRAMP-style accreditation; the platform's own certifications (ISO 27001/27017/27018/27701/22301) are listed in the Trust Center." },
    ],
  },
};
