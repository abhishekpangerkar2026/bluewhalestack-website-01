# BlueWhale Stack — product & modules content handoff

Document 3 of the Lovable rebuild handoff set (see `00-master-brief.md` for
the full list). This is the reference content for a rebuilt Products/Platform
section: the platform's own positioning copy, what it replaces, and all 14
shipped modules grouped under the 9 official capability families — carried
over verbatim from the live content files so the rebuild starts from real
product facts, not paraphrase.

**Scope note on what is deliberately left out:** each module entry in
`content/moduleDetails.ts` also carries a `screen` object — sample KPI,
table and chart values used to render an illustrative console mockup on the
current site (e.g. "$184k this month," "INC-3182," "37 tenants"). That is
placeholder/sample data for a UI screenshot, not a reported business metric,
so it is intentionally excluded from this handoff. Do not carry those sample
numbers into new copy as if they were real statistics.

---

## 1. Platform positioning

Source: `content/platform.ts` — `platformHero`, `heroStats`.

**Eyebrow:** Digital Experience Platform

**Title:** One Platform. Every Industry. Every Estate.

**Description (hero copy, verbatim):**
> BlueWhale Stack is one control plane over six public clouds, your
> virtualization estate and your air-gapped sites. It is run by enterprises,
> by telco and datacenter operators who sell governed services on it, and by
> governments that must prove where data lives and who touched it. After
> connecting, every estate reports into one inventory, one identity fabric
> and one policy engine — and the audit evidence is generated continuously
> instead of assembled per inspection.

**Tagline (verbatim):**
> 54 capabilities in nine families, four editions on one architecture, five
> deployment modes down to fully air-gapped.

### Core stats — use these exact numbers

**54 capabilities across 9 families and 14 modules, on 4 editions.**
Never write "11 modules" — the correct, current module count is **14**
(confirmed by counting the `modules` array in `content/modules.ts`).

- **54** — capabilities
- **9** — capability families
- **4** — editions (Standard, Enterprise, Telco & Datacenter, Government)
- **14** — modules

### Hero stats strip (operational facts, verbatim from `heroStats`)

These are the buyer-checkable operational facts the current hero uses —
distinct from the catalog counts above:

- **< 15 min** — From connecting a cloud account to its first full inventory
- **6 + 5** — Public clouds by API; private platforms by Edge Agent
- **10** — Identity providers federated over SAML 2.0 / OIDC
- **5** — Deployment modes — SaaS, BYOC, on-prem, air-gapped, edge

### The 90-day prototype (standing offer)

Source: `content/platform.ts` — `prototypeOffer`. Carried over here because
it is part of the platform's core positioning (the standing evaluation
offer), not an edition- or module-specific detail.

**Eyebrow:** The standing offer
**Title:** The 90-day prototype

**Description (verbatim):**
> Proven before commitment. Half a day with your technology and finance
> leaders, then a full-featured prototype on your own estate — scored on
> agreed criteria before any licensing decision.

Steps:

1. **Discovery workshop** _(half day)_ — The platform on your estate's
   shape; success criteria agreed with technology and finance.
2. **Prototype** _(90 days · no licence cost)_ — Full-featured on your own
   estate: inventory live, cost decomposed, one audit report, one AI use
   case.
3. **Evidence review** _(day 90)_ — Scored on the agreed criteria — then,
   and only then, the licensing decision.
4. **Scale** _(quarters 2–4)_ — The control plane extends estate by estate;
   every environment inherits governance day one.

**Closing CTA (verbatim):**
> Next step — the discovery workshop. Bring your hardest audit finding and
> your least explainable cloud bill; we will show what the platform does
> with both, on your estate's shape, before any commercial conversation.

CTA label: "Book the discovery workshop" → `/contact?intent=demo`

---

## 2. What it replaces

Source: `content/platform.ts` — `whatItReplaces`. This is the consolidation
argument, tool by tool, with each replacement's real maturity status
preserved exactly as written — do not upgrade any of these to sound fully
shipped.

| It replaces… | With… | Status |
|---|---|---|
| Cloud management platform (CMP) | Inventory & Discovery, Service Catalog and Cloud Connectors — one inventory across six clouds and on-prem, governed provisioning on top | GA |
| Cloud cost tool | Whalenomics — billing joined to inventory, anomalies explained by Whale AI, rightsizing and commitment advice | AI use cases live · backend in progress |
| Observability contract | Observe — logs, metrics, traces, SLOs with burn-rate alerts, synthetics, included in the licence | GA |
| ITSM for cloud operations | ITSM with P0–P4 SLAs, CMDB fed by discovery — or two-way sync with the ServiceNow or Jira you keep | GA |
| IaC and landing-zone tooling | WhaleForge (YAML → Terraform) and Landing Zone Builder (Control Tower, CLZ, GCP foundations) | Beta |
| Migration assessment suite | Migration Engine — auto-classification, 6R scoring, dependency-aware waves with rollback | Assessment live · execution in progress |
| Compliance evidence spreadsheets | Cloud Audit & Evidence — controls monitored continuously, reports per regime on demand | Enterprise & up |

---

## 3. Module index (quick reference)

All 14 modules, in the order `content/modules.ts` lists them (which already
groups them by family). Status is the authoritative label from
`content/moduleDetails.ts`.

| # | Module | Family | Status |
|---|---|---|---|
| 1 | Cloud Connectors | Management & Delivery | Generally available |
| 2 | Service Catalog | Management & Delivery | Generally available |
| 3 | Landing Zone Builder | Management & Delivery | Beta |
| 4 | WhaleForge IaC | Management & Delivery | Beta · deployment runner coming |
| 5 | Whalenomics | Whalenomics · FinOps | Whale AI use cases live · full backend in progress |
| 6 | Identity & Access | Security & Identity | Generally available |
| 7 | Cloud Audit & Evidence | Governance & Audit | Included in Enterprise & up |
| 8 | Whale AI | Whale AI — incl. offline | Generally available |
| 9 | Inventory & Discovery | Migration & Discovery | Generally available |
| 10 | Migration Engine | Migration & Discovery | Assessment live · execution hooks in progress |
| 11 | Observe | Observability & ITSM | Generally available |
| 12 | ITSM | Observability & ITSM | Generally available |
| 13 | Tenancy & Monetization | Tenancy & Monetization | Preview · GA Q4 2026 (Telco & Datacenter Edition) |
| 14 | Sovereign Operations | Sovereign Operations | Generally available — Government Edition |

---

## 4. Modules by capability family

**Family grouping source:** `content/modules.ts` (`ModuleGroup` type,
`moduleGroups`, `moduleGroupOrder`, `moduleGroupBlurbs`) — this is the
platform's own canonical 9-family taxonomy, not a reconstruction, and the
family blurbs below are quoted verbatim from `moduleGroupBlurbs` (there
noted as "verbatim from 'What Lives in the Platform Core'"). The 14 modules
divide across the 9 families as 4-1-1-1-1-2-2-1-1, totalling 14.

Each module subsection below carries: tagline (from `content/modules.ts`),
status (from `content/moduleDetails.ts`, verbatim — badge tone noted in
parentheses), summary, key facts, capabilities, how it works, and the 3
FAQ entries from the source (each module ships with exactly three; all
three are included as each is short and buyer-relevant).

### Family 1 of 9 — Management & Delivery

*"Provisioning, landing zones, blueprints and day-2 operations — delivery
with governance built in."*

Modules in this family: Cloud Connectors, Service Catalog, Landing Zone
Builder, WhaleForge IaC.

#### Cloud Connectors `cloud-connectors`

**Tagline:** One control plane over six public clouds, plus private,
hybrid & edge. (GA)
**Status:** Generally available (tone: success)

**Summary:** Cloud Connectors are how an estate joins the platform:
read-only, least-privilege credentials for each public cloud, and an Edge
Agent for private and virtualised estates that connects outbound over
HTTPS so credentials never leave your site. Six public clouds are live
today; hybrid and sovereign stacks connect through the same agent.

**Key facts:**
- **6** — Public clouds live — AWS, Azure, GCP, Oracle, Alibaba, Huawei
- **Read-only** — IAM role, app registration or service account — never
  write access by default
- **Outbound only** — Edge Agent uses HTTPS out; no inbound firewall rules

**Capabilities:**
- **Least-privilege cloud access** — AWS connects with an IAM role and
  external ID, Azure with an Entra app registration holding the Reader
  role, GCP with a Viewer service account, Oracle with an API signing key,
  Alibaba and Huawei with read-only access keys. Write actions are granted
  separately, per policy.
- **Edge Agent for private estates** — A small agent per site inventories
  VMware, Hyper-V, Nutanix and OpenShift through their own APIs and
  reports over outbound-only HTTPS. Hybrid and sovereign stacks — Azure
  Stack, Huawei Cloud Stack, Alibaba Apsara Stack — attach the same way.
- **Connector health** — Every connector shows last sync, scope and
  errors; a failing credential raises an ITSM incident rather than
  silently going stale.
- **Business and ITSM connectors** — ServiceNow and Jira integrations for
  tickets, plus CRM/ERP connectors for ownership and cost context; some
  business connectors are still in beta.

**How it works:**
- **Create credentials in the cloud** — Follow the guided steps for each
  provider; the console shows the exact role, policy or key to create,
  scoped to read.
- **Register the connector** — Paste the role ARN, app credentials or key
  into the connector form; the platform validates access and runs a first
  discovery.
- **Watch it stay healthy** — Sync status, scope changes and expiring
  secrets are surfaced on the health page and as incidents.

**FAQ:**
- **Q: What permissions do you need in our cloud accounts?**
  A: Read-only. AWS uses an IAM role you create with a read policy and an
  external ID; Azure the Reader role on the subscriptions you choose; GCP
  the Viewer role. Provisioning and lifecycle actions use separate,
  explicitly granted permissions.
- **Q: Do we have to open inbound firewall ports for on-prem?**
  A: No. The Edge Agent initiates outbound HTTPS to the control plane;
  nothing connects inbound to your site, and hypervisor credentials stay
  on the agent.
- **Q: Which private platforms are supported?**
  A: VMware, Microsoft Hyper-V, Nutanix and Red Hat OpenShift through the
  Edge Agent, plus bare-metal and KVM estates; hybrid stacks such as Azure
  Stack, Huawei Cloud Stack and Alibaba Apsara Stack attach through the
  same agent.

#### Service Catalog `provisioning`

**Tagline:** Provision approved cloud resources — no consoles. (GA)
**Status:** Generally available (tone: success)

**Summary:** The Service Catalog lets teams request approved cloud
resources without touching cloud consoles. AWS provisioning is live for
EC2, S3, RDS, VPC and EFS, with Azure and GCP catalog items, approval
workflows, governance guardrails and Whale AI sizing advice built into the
request — so self-service and control stop being a trade-off.

**Key facts:**
- **AWS live** — EC2 · S3 · RDS · VPC · EFS provisioned from the catalog
- **Guardrails** — Approved sizes, regions and tags enforced before submit
- **Whale AI** — Sizing recommendations inside the request form

**Capabilities:**
- **Governed self-service** — Teams pick from catalog items you approve —
  with sizes, regions, tags and naming already constrained — instead of
  being handed console access.
- **Approval workflows** — Route requests by cost, environment or resource
  type to the right approver; low-risk items can auto-approve, everything
  is recorded.
- **Whale AI sizing** — The request form asks Whale AI for a right-sized
  recommendation grounded in your inventory and cost history, before a
  single instance is oversized.
- **Audit trail** — Who requested, who approved, what was provisioned and
  where — every catalog action lands in the platform audit log and the
  ITSM change record.

**How it works:**
- **Publish catalog items** — Define the resources teams may request and
  the guardrails that apply to each.
- **Request and approve** — A developer selects an item, gets a sizing
  suggestion, submits; the approval policy decides who signs off.
- **Provision and track** — The platform provisions with its own
  credentials, tags the resource, and adds it to inventory and cost
  tracking automatically.

**FAQ:**
- **Q: Which resources can be provisioned today?**
  A: On AWS: EC2, S3, RDS, VPC and EFS. Azure and GCP catalog items are
  available for request and approval, with provisioning coverage
  expanding by resource type.
- **Q: Can requests bypass approval?**
  A: Only if your policy says so — for example, dev-environment items
  under a cost threshold. Everything else routes to the approver you
  define, and every decision is logged.
- **Q: Where do provisioned resources show up?**
  A: In the unified inventory immediately, tagged with requester and
  workload, and in Whalenomics cost tracking from the first billing
  record.

#### Landing Zone Builder `landing-zone`

**Tagline:** Design compliant cloud foundations visually. (Beta)
**Status:** Beta (tone: warning)

**Summary:** Landing Zone Builder is a visual designer for compliant cloud
foundations — AWS Control Tower, Azure Cloud Landing Zone and GCP
foundations — that generates the multi-account baseline as Terraform HCL
with guardrails, tags and account structure built in. Design the
foundation as a diagram; get the code that stands it up.

**Key facts:**
- **AWS · Azure · GCP** — Control Tower, CLZ and GCP foundation patterns
- **Baseline HCL** — Multi-account, versioned, reviewable
- **Guardrails** — Policy, tagging and network controls from day one

**Capabilities:**
- **Visual foundation design** — Lay out organisations, accounts, networks
  and shared services on a canvas that mirrors each provider's reference
  architecture.
- **Guardrails as configuration** — Choose the controls — SCPs and
  policies, tagging standards, network baselines — and they are generated
  into the code, not documented beside it.
- **Generated multi-account baseline** — The output is Terraform for the
  whole foundation, ready for review and your pipeline; WhaleForge can
  extend it.
- **Industry patterns** — Banking, telco, healthcare and government
  starting points that reflect segregation and residency requirements.

**How it works:**
- **Design** — Pick the provider pattern and draw the account and network
  structure.
- **Select guardrails** — Turn on the controls the estate must have; the
  designer validates the combination.
- **Generate** — Export the baseline HCL and apply it through your
  pipeline.

**FAQ:**
- **Q: Do we need Control Tower already?**
  A: No. The designer can target a new organisation or model an existing
  one; for existing estates, import the current structure and add the
  guardrails you are missing.
- **Q: How does this relate to WhaleForge?**
  A: Landing Zone Builder produces the foundation; WhaleForge builds
  workloads on top of it. Both emit standard Terraform.
- **Q: What is the Beta limitation?**
  A: The generated baseline is applied through your own pipeline today; a
  managed apply step is planned alongside the WhaleForge deployment
  runner.

#### WhaleForge IaC `whaleforge`

**Tagline:** YAML DSL → real Terraform HCL, with live diagrams. (Beta)
**Status:** Beta · deployment runner coming (tone: warning)

**Summary:** WhaleForge lets platform teams write infrastructure in a
plain YAML DSL and compiles it to real Terraform HCL for AWS, Azure and
GCP — with live HLD, LLD and TOGAF diagrams that stay in sync with the
code, PDF export for architecture reviews and Git import for existing
repositories. The deployment runner is the next milestone.

**Key facts:**
- **YAML → HCL** — Real Terraform output, not a proprietary runtime
- **HLD · LLD · TOGAF** — Diagrams generated from the same source
- **Beta** — Available to Enterprise & up on request

**Capabilities:**
- **A readable DSL** — Describe networks, compute, data and policies in
  YAML that architects and reviewers can read; WhaleForge expands it into
  provider-specific Terraform.
- **Diagrams that cannot drift** — HLD, LLD and TOGAF views are rendered
  from the source on every change and exported to PDF for design
  authorities and audits.
- **Git import** — Bring existing Terraform repositories in, see them as
  diagrams, and evolve them in the DSL where it helps.
- **Industry landing-zone packs** — Starting points for Banking, Telco,
  Healthcare and Fintech that encode guardrails, tags and account
  structure from day one.

**How it works:**
- **Author** — Write or import the definition; validation runs as you
  type.
- **Compile and review** — Generate Terraform and the diagrams; review
  both in the same change.
- **Apply** — Run through your existing pipeline today; the WhaleForge
  deployment runner is coming next.

**FAQ:**
- **Q: Is the output real Terraform?**
  A: Yes — standard HCL you can read, diff and run with your existing
  Terraform tooling and state backends. There is no proprietary runtime in
  the way.
- **Q: Can we use it on existing repositories?**
  A: Yes, through Git import: existing Terraform is visualised as diagrams
  and can be extended in the DSL incrementally.
- **Q: What does "Beta" mean here?**
  A: Compilation, diagrams, PDF export and Git import are usable today
  with Enterprise & up; the deployment runner is not yet shipped, so apply
  steps run through your own pipeline.

### Family 2 of 9 — Whalenomics · FinOps

*"Budgets, forecasts, chargeback and continuous optimization — spend
decomposed to workload, department or tenant."*

Module in this family: Whalenomics.

#### Whalenomics `finops`

**Tagline:** FinOps — budgets, forecasts, chargeback & continuous
optimization. (Whale AI use-cases live; full backend in progress)
**Status:** Whale AI use cases live · full backend in progress (tone: warning)

**Summary:** Whalenomics is the FinOps family: budgets, forecasts,
chargeback and continuous optimisation, with spend decomposed to
workload, department or tenant. Today the Whale AI FinOps use cases — cost
narratives, anomaly explanations, rightsizing and commitment advice — run
on live billing data from AWS, Azure and GCP; the full Whalenomics backend
for budgets and chargeback is in progress.

**Key facts:**
- **12** — Whale AI FinOps use cases live today
- **AWS · Azure · GCP** — Pricing maps and billing ingestion
- **Per tenant** — Chargeback and metering model (in progress)

**Capabilities:**
- **Cost visibility with ownership** — Billing records are joined to the
  inventory, so every dollar resolves to a workload, an owner and a tag —
  the basis for showback and chargeback.
- **Anomalies and explanations** — Whale AI flags unusual spend and
  explains it in plain language against the inventory: what changed,
  where, and who owns it.
- **Rightsizing and commitments** — Idle and oversized resources, storage
  tiers and commitment coverage are surfaced with the saving and the
  action — from the inventory, not a separate tool.
- **Budgets, forecasts, chargeback** — Budgets per unit with forecasts and
  alerts, and chargeback into your ERP or an operator's BSS — the
  Whalenomics backend currently in progress.

**How it works:**
- **Ingest and join** — Billing exports from each cloud are normalised and
  joined to inventory and tags.
- **Explain** — Whale AI answers "why did this rise" with the resources
  behind the number.
- **Decide and allocate** — Rightsize, commit, and allocate cost to the
  unit that owns it; budgets and forecasts follow.

**FAQ:**
- **Q: What is live today and what is in progress?**
  A: Live: cost visibility joined to inventory, anomaly detection and
  explanations, rightsizing and commitment advice — the twelve Whale AI
  FinOps use cases. In progress: the full Whalenomics backend for budgets,
  forecasts and chargeback feeds.
- **Q: Which clouds are covered?**
  A: Billing ingestion and pricing maps for AWS, Azure and GCP today; the
  other connected clouds contribute inventory and will follow for
  billing.
- **Q: Can chargeback feed our ERP or BSS?**
  A: That is the design goal of the Whalenomics backend: per-unit and
  per-tenant allocation exported to ERP, and for operators into their BSS
  through Tenancy & Monetization.

### Family 3 of 9 — Security & Identity

*"One identity fabric (SAML/OIDC), least-privilege access, continuous
scanning — uniform posture everywhere."*

Module in this family: Identity & Access.

#### Identity & Access `identity`

**Tagline:** One identity fabric — federate your IdP and auto-provision
access everywhere. (GA)
**Status:** Generally available (tone: success)

**Summary:** Identity & Access is the platform's identity fabric:
federate the identity providers you already run — Entra ID, Okta, Auth0,
AWS Identity Center, Google IAM, OneLogin, on-prem Active Directory and
the cloud IAMs — provision users automatically over SCIM, and apply one
role model across every connected cloud. Enterprise adds Whale IAM-PAM for
privileged sessions.

**Key facts:**
- **9+** — Identity providers over SAML 2.0 and OIDC
- **SCIM 2.0** — Automatic user and group provisioning
- **One RBAC** — Roles mapped from IdP groups, enforced on every cloud

**Capabilities:**
- **Single sign-on** — SAML 2.0 and OIDC federation with Microsoft Entra
  ID, Okta, Auth0, AWS Identity Center, Google IAM, OneLogin and
  on-premises AD, with step-by-step setup guides for each.
- **Auto-provisioning** — SCIM 2.0 creates, updates and deactivates users
  as your directory changes, and maps IdP groups to platform roles —
  joiners and leavers are handled where HR already handles them.
- **Role-based access, cross-cloud** — Roles such as viewer, operator and
  approver apply across AWS, Azure, GCP and on-prem estates at once, with
  scope by account, workload or tenant.
- **Privileged access (Enterprise & up)** — Whale IAM-PAM brokers
  privileged sessions with approval gates and recording; the Government
  Edition makes PAM and MFA mandatory on every role.

**How it works:**
- **Federate** — Register BlueWhale Stack as an application in your IdP
  and exchange SAML or OIDC metadata — a few minutes per provider.
- **Map groups to roles** — Choose which directory groups become which
  platform roles, and the scopes those roles cover.
- **Provision automatically** — Turn on SCIM so accounts and roles follow
  the directory; access reviews and the audit trail come for free.

**FAQ:**
- **Q: Can we keep our existing IdP?**
  A: Yes — that is the point. The platform federates with the directory
  you already run; it never becomes a second source of truth for users.
- **Q: How are roles kept in sync?**
  A: Through SCIM 2.0 group mapping: when a user joins or leaves a
  directory group, their platform role follows within the provisioning
  interval, and the change is logged.
- **Q: Is MFA enforced?**
  A: MFA is enforced by your IdP policy for SSO. In the Government Edition
  MFA is mandatory on every role and privileged access always runs through
  PAM with session recording.

### Family 4 of 9 — Governance & Audit

*"Policy as configuration; controls monitored continuously; the auditor's
report generated on demand."*

Module in this family: Cloud Audit & Evidence.

#### Cloud Audit & Evidence `cloud-audit`

**Tagline:** Controls monitored continuously — the auditor's report
generated on demand. (Enterprise & up)
**Status:** Included in Enterprise & up (tone: neutral)

**Summary:** Cloud Audit & Evidence treats policy as configuration and
monitors the controls behind it continuously across every estate, so
evidence is generated all the time instead of assembled before an
inspection. Reports are produced on demand for the board, the auditor and
the regulator, with obligations mapped per regime — DPDP, GDPR, RBI,
CERT-In, SEBI and more.

**Key facts:**
- **Continuous** — Controls monitored, not sampled quarterly
- **Per regime** — Obligations mapped to platform controls
- **On demand** — Examiner-grade reports as parameters, not projects

**Capabilities:**
- **Policy as configuration** — Residency, encryption, access, logging and
  tagging policies are defined once and applied across clouds; drift is a
  finding, not a surprise.
- **Continuous control monitoring** — Each control is evaluated against
  the live inventory and telemetry; failures open findings with the
  resources and owners attached.
- **Regime mapping** — Frameworks such as India DPDP, GDPR, RBI
  outsourcing, CERT-In and SEBI CSCRF are mapped to controls, so one
  evidence set answers several regulators.
- **Examiner-grade reporting** — Generate the report an inspection asks
  for — scope, controls, evidence, exceptions — from a system of record
  with a tamper-evident trail; the Government Edition adds WORM-backed
  audit logs.

**How it works:**
- **Declare** — Choose the regimes that apply and the policies the estate
  must meet.
- **Monitor** — Controls are checked continuously; findings route to
  owners through ITSM.
- **Report** — Produce the evidence pack for a period, a regime or an
  estate in minutes.

**FAQ:**
- **Q: Is this a compliance scanner or an audit tool?**
  A: Both halves of the same loop: controls are evaluated continuously
  against live data, and the evidence that evaluation produces is what the
  report is built from — so the report is never assembled by hand.
- **Q: Which regimes are mapped?**
  A: India DPDP, GDPR, RBI IT outsourcing, CERT-In directions and SEBI
  CSCRF today, with the mapping extended per customer engagement; the
  underlying controls are regime-agnostic.
- **Q: How is the trail protected?**
  A: All platform activity is written to an append-only audit log; the
  Government Edition backs it with WORM storage for immutability.

### Family 5 of 9 — Whale AI — incl. offline

*"AI for operations, documentation and compliance — your choice of model,
able to run fully inside the perimeter."*

Module in this family: Whale AI.

#### Whale AI `whale-ai`

**Tagline:** A horizontal AI layer across every module — 50+ use cases,
able to run fully offline. (GA)
**Status:** Generally available (tone: success)

**Summary:** Whale AI is an intelligence layer woven into every module
rather than a chatbot beside them: 50+ production use cases across cost,
security, ITSM, operations, migration and governance, each grounded in
your live inventory, billing, tickets and findings. It runs in three
tiers — Spark, Tide and Abyss — with your choice of model, including fully
offline inside the perimeter for sovereign estates.

**Key facts:**
- **50+** — Use cases, each with declared data dependencies
- **Spark · Tide · Abyss** — Three tiers routed by task complexity
- **Offline** — In-region and air-gapped models for sovereign deployments

**Capabilities:**
- **Grounded, not generative guesswork** — Every use case declares the
  providers it reads — inventory, cost, tickets, findings — and cites them
  in the answer; numbers come from the platform, not the model.
- **Tiered intelligence** — Spark answers interactive questions in under
  three seconds; Tide reasons over migration plans and IaC; Abyss runs
  multi-step agents for the hardest cross-module work.
- **In the flow of work** — An assistant drawer in every module, streamed
  answers, exports to PDF and Excel, and prompt caching so repeat
  questions are instant.
- **Inside the perimeter** — Bring your model or run ours in-region;
  sovereign deployments run Whale AI fully offline with zero external data
  exposure.

**How it works:**
- **Ask, in context** — From any screen, ask about what you are looking
  at — a workload, a bill, an incident.
- **Ground** — The use case gathers the live facts it declares, scoped to
  your permissions.
- **Answer with citations** — The right tier reasons over the facts and
  streams an answer with the evidence behind it.

**FAQ:**
- **Q: Does our data leave our environment?**
  A: On SaaS, requests are processed in your chosen region; on BYOC they
  run in your accounts; on sovereign deployments Whale AI runs fully
  offline on in-region models with no external calls.
- **Q: Which models are used?**
  A: Your choice — hosted models including Anthropic Claude, or models you
  bring and run inside the perimeter. Use cases are model-agnostic;
  grounding and citations work the same way.
- **Q: Can it take actions?**
  A: Use cases draft plans, reports and configurations; actions still go
  through the platform's approvals and audit trail, so Whale AI never
  bypasses governance.

### Family 6 of 9 — Migration & Discovery

*"Inventory, dependency mapping and rehearsed waves with rollback — for
entry, movement between estates, and exit."*

Modules in this family: Inventory & Discovery, Migration Engine.

#### Inventory & Discovery `inventory`

**Tagline:** A live, unified map of every asset — across every cloud and
on-prem. (GA)
**Status:** Generally available (tone: success)

**Summary:** Inventory & Discovery builds one live map of every resource
you run — across AWS, Azure, Google Cloud, Oracle, Alibaba and Huawei, and
on-premises VMware, Hyper-V, Nutanix and OpenShift estates connected
through the Edge Agent. Resources are grouped by workload with their
dependencies, so platform, security and finance teams work from the same
picture instead of six consoles and a spreadsheet.

**Key facts:**
- **6 + on-prem** — Public clouds plus private estates in one inventory
- **Workload** — Grouping with dependency mapping, not raw resource lists
- **PDF · XLSX · CSV** — Exports for audits, CMDB and finance

**Capabilities:**
- **Continuous discovery** — Connectors sync each account on a schedule
  and on change events; the Edge Agent inventories hypervisors over
  outbound-only HTTPS. New resources appear without anyone registering
  them.
- **Workload grouping and dependencies** — Resources are normalised into
  one model and grouped into workloads (VPC → subnet → compute →
  database), so an application is a unit you can search, cost and migrate
  — not a list of instance IDs.
- **Live lifecycle actions** — Start, stop, tag, resize or retire from the
  inventory itself, with role-based approval where policy requires it and
  every action written to the audit log.
- **Reports and feeds** — Export the estate as PDF, Excel or CSV, and feed
  the same inventory to Whalenomics (cost), Cloud Audit & Evidence
  (controls) and the Migration Engine (waves).

**How it works:**
- **Connect** — Add cloud accounts with read-only credentials and register
  Edge Agents for on-prem sites. The first discovery typically completes
  within minutes of a connector going green.
- **Normalise** — Every provider's resource types are mapped to one schema
  with tags, owners, regions and relationships — the shared model every
  other family reads.
- **Work from one map** — Search, filter by provider or workload, act on
  resources, and export — the inventory is the system of record for the
  estate.

**FAQ:**
- **Q: Does discovery need agents on every VM?**
  A: No. Public clouds are discovered through their APIs with read-only
  credentials. On-premises estates use one Edge Agent per site, which
  talks to the hypervisor APIs (VMware, Hyper-V, Nutanix) — nothing is
  installed on guest VMs.
- **Q: How fresh is the inventory?**
  A: Connectors sync on a schedule and react to change events where the
  provider offers them; most estates see changes reflected within
  minutes. Each connector shows its last successful sync on the health
  page.
- **Q: Can we export for our CMDB or auditor?**
  A: Yes — PDF, Excel and CSV exports are built in, and the same data is
  available through the REST API for CMDB or GRC integrations.

#### Migration Engine `migration`

**Tagline:** 6R assessment, rehearsed waves & rollback for cloud
migration. (Coming — assessment live)
**Status:** Assessment live · execution hooks in progress (tone: warning)

**Summary:** The Migration Engine industrialises entry, movement and
exit: on-premises workloads discovered by the Edge Agent are
auto-classified, scored with a 6R assessment for cost, effort and
blockers, and planned into rehearsable waves with rollback and Whale AI
guidance. Assessment and wave planning are live; execution hooks are in
progress.

**Key facts:**
- **6R** — Rehost · replatform · refactor · repurchase · retire · retain,
  scored
- **Waves** — Dependency-aware planning with rollback
- **Exit-ready** — The same engine rehearses regulator-mandated exit plans

**Capabilities:**
- **Auto-classification** — Discovered workloads are classified by type,
  dependencies and data gravity, so the assessment starts from facts
  rather than interviews.
- **6R assessment** — Each workload gets a recommended strategy with
  estimated target cost, effort and blockers — and the evidence behind the
  score.
- **Wave planning with rollback** — Waves are cut along dependency
  boundaries, rehearsed, and carry a rollback plan; Whale AI drafts the
  sequence and flags risks.
- **Execution hooks (in progress)** — Handoff to tooling for the move
  itself, with status flowing back into the wave board and ITSM changes.

**How it works:**
- **Discover** — Edge Agents inventory the source estate and map
  dependencies.
- **Assess** — 6R scoring with cost, effort and blockers per workload.
- **Plan waves** — Sequence, rehearse, approve; execute with rollback when
  the hooks land.

**FAQ:**
- **Q: Does it move the workloads?**
  A: Assessment and wave planning are live today. Execution hooks —
  handing the move to tooling and tracking it back on the wave board — are
  in progress; until then teams execute with their existing tooling
  against the plan.
- **Q: Can it help with a regulator's exit-plan requirement?**
  A: Yes — the same engine turns an exit annexure into a dependency-mapped,
  rehearsed plan with drill evidence, which is how BFSI customers use it
  today.
- **Q: Which targets are supported?**
  A: Any connected estate: the six public clouds, private and virtualised
  platforms via the Edge Agent, and on-premises for repatriation.

### Family 7 of 9 — Observability & ITSM

*"Health, events and service operations — integrated with ServiceNow,
Jira and existing tooling."*

Modules in this family: Observe, ITSM.

#### Observe `observe`

**Tagline:** Production APM — logs, metrics, traces & SLOs, bundled. (GA)
**Status:** Generally available (tone: success)

**Summary:** Observe bundles production-grade observability into the
platform — logs, metrics and traces in one place, SLOs with burn-rate
alerting, synthetics, usage metering and notification channels — so teams
get full observability of the estate without procuring and stitching a
separate monitoring contract.

**Key facts:**
- **Logs · metrics · traces** — One data model, one query surface
- **SLOs** — Error budgets with burn-rate alerts
- **Bundled** — Included in Standard & up — no separate contract

**Capabilities:**
- **Unified telemetry** — Ingest logs, metrics and traces from cloud
  services and agents into one store, correlated with the inventory so a
  signal always resolves to a workload and an owner.
- **SLOs and burn-rate alerts** — Define availability and latency
  objectives per service; alerts fire on error-budget burn rate, not raw
  thresholds, which cuts noise and pages the right team.
- **Synthetics and metering** — Probe endpoints from your regions, and
  meter usage per tenant or business unit — the same numbers Whalenomics
  and Tenancy use for billing.
- **Notification channels** — Route alerts to email, chat and on-call
  tools, and open ITSM incidents automatically for SLO breaches.

**How it works:**
- **Ingest** — Cloud-native telemetry via provider APIs; agents and
  OpenTelemetry for applications; the Edge Agent for on-prem.
- **Define objectives** — Set SLOs per service with the platform
  suggesting baselines from observed behaviour.
- **Alert and act** — Burn-rate alerts route to channels and ITSM;
  dashboards and traces are one click from the incident.

**FAQ:**
- **Q: Does Observe replace our APM tool?**
  A: For most teams it removes the need for a separate contract: logs,
  metrics, traces, SLOs and synthetics are bundled. If you keep an
  existing tool, its alerts can still open incidents in the platform.
- **Q: How do you keep alert noise down?**
  A: Alerts are based on SLO error-budget burn rate rather than static
  thresholds, and correlated to workloads — one incident per real
  problem, routed to the owning team.
- **Q: Is telemetry stored in-region?**
  A: Yes. Telemetry follows the deployment's data residency: your chosen
  region on SaaS, your accounts on BYOC, and never leaves the perimeter on
  sovereign deployments.

#### ITSM `itsm`

**Tagline:** Cloud-ops-native incident, change & problem management. (GA)
**Status:** Generally available (tone: success)

**Summary:** ITSM is service management built for cloud operations:
incidents with P0–P4 SLAs and breach detection, change and problem
management, a knowledge base, a CMDB fed by the live inventory and kanban
boards — with tickets raised directly from cloud events and two-way
integration with ServiceNow and Jira where those remain the system of
record.

**Key facts:**
- **P0–P4** — SLA classes with breach detection and escalation
- **CMDB** — Configuration items kept in sync with the inventory
- **ServiceNow · Jira** — Two-way ticket integration

**Capabilities:**
- **Incidents from the estate** — A failed connector, an SLO burn, a
  policy violation or a cost anomaly opens an incident with the affected
  workload attached — no copying from one tool to another.
- **Change and problem management** — Changes carry the approval trail
  from the Service Catalog; problems link recurring incidents to a root
  cause and a fix.
- **CMDB without manual upkeep** — Configuration items are the inventory —
  when a resource changes, its CI changes; relationships come from
  dependency mapping.
- **Integrations** — Push and sync tickets with ServiceNow and Jira, keep
  your existing queues and on-call, and use the platform as the source of
  cloud context.

**How it works:**
- **Classify** — Set SLA classes and escalation paths per service; the
  estate's events map to them automatically.
- **Work the queue** — Incidents, changes and problems in kanban or list
  views, each linked to the live resources involved.
- **Close with evidence** — Every state change is recorded — the audit
  trail doubles as the evidence the regulator and the post-incident review
  both need.

**FAQ:**
- **Q: We already run ServiceNow. Do we have to switch?**
  A: No. Keep ServiceNow or Jira as the system of record and sync tickets
  both ways; the platform adds the cloud context — the resources, cost and
  policy behind each ticket.
- **Q: How are SLAs measured?**
  A: Per priority class (P0–P4) with response and resolution targets you
  set; breaches are detected continuously and escalated on the path you
  define.
- **Q: Is the CMDB maintained manually?**
  A: No — configuration items and their relationships come from the live
  inventory and dependency map, so the CMDB is as current as the last
  discovery.

### Family 8 of 9 — Tenancy & Monetization

*"Native multi-tenancy, catalogs, marketplace, per-tenant metering and
billing feeds."*

Module in this family: Tenancy & Monetization.

#### Tenancy & Monetization `tenancy`

**Tagline:** Native multi-tenancy, catalogs, marketplace and per-tenant
metering. (Telco & Datacenter Edition — preview, GA Q4 2026)
**Status:** Preview · GA Q4 2026 (Telco & Datacenter Edition) (tone: warning)

**Summary:** Tenancy & Monetization is the Digital Experience Layer for
operators: native multi-tenancy with isolation and quotas, white-label
portals, service catalogs and a marketplace, and per-tenant metering that
feeds your own OSS/BSS and invoicing — so a telco or datacenter operator
publishes governed cloud services under its own brand and bills for them.
In preview now, general availability targeted for Q4 2026.

**Key facts:**
- **Native** — Multi-tenancy with isolation and quotas per tenant
- **White-label** — Portals, catalog and marketplace under your brand
- **OSS/BSS** — Metering and billing feeds into your existing stack

**Capabilities:**
- **Tenant isolation and quotas** — Each tenant gets its own identity
  scope, resources, quotas and policies on shared operator capacity,
  enforced by the platform rather than by convention.
- **White-label experience** — Portals with your logo, colours and domain;
  a catalog of your services and a marketplace for partners and ISVs.
- **Metering and billing feeds** — Usage is metered per tenant and pushed
  to your BSS or invoicing — the operator keeps its commercial machinery
  and adds cloud products to it.
- **SLA and tenant health** — Per-tenant SLA reporting and health
  visibility drive renewals and support, with ITSM tickets scoped to the
  tenant.

**How it works:**
- **Model tenants** — Define tenants, quotas and policies on the
  operator's estate.
- **Publish services** — Build the catalog and brand the portal; open the
  marketplace to partners.
- **Meter and bill** — Usage flows to OSS/BSS; SLAs and health are visible
  per tenant.

**FAQ:**
- **Q: What does preview mean commercially?**
  A: Design partners run Tenancy & Monetization on their own estates under
  the preview programme; general availability of the Telco & Datacenter
  Edition is targeted for Q4 2026.
- **Q: Do we replace our BSS?**
  A: No. Metering feeds your existing OSS/BSS and invoicing; the platform
  adds tenancy, catalog and portal on top of the commercial systems you
  already run.
- **Q: Can tenants bring their own clouds?**
  A: Yes — a tenant's estate can span operator capacity and public cloud
  accounts, governed by the same identity and policy plane.

### Family 9 of 9 — Sovereign Operations

*"In-country deployment, segregation, air-gapped classes and
offline-tolerant edge."*

Module in this family: Sovereign Operations.

#### Sovereign Operations `sovereign-operations`

**Tagline:** In-country deployment, segregation, air-gapped classes and
offline-tolerant edge. (Government Edition)
**Status:** Generally available — Government Edition (tone: success)

**Summary:** Sovereign Operations makes sovereignty a property of the
architecture: in-country deployment with directorate-level segregation
under central policy, air-gapped deployment classes with an offline
update channel, FIPS-validated cryptography, always-on privileged access
management, a WORM-backed audit log and offline-tolerant edge sites —
with Whale AI operating entirely inside the perimeter.

**Key facts:**
- **Air-gapped** — Deployment classes with offline updates and no
  call-home
- **FIPS · PAM · WORM** — Validated crypto, always-on PAM, immutable audit
- **In-region AI** — Whale AI Abyss runs on local models only

**Capabilities:**
- **Segregation under central policy** — Ministries, directorates or
  agencies operate their own estates with autonomy inside national
  guardrails — one policy plane, many isolated domains.
- **Air-gapped classes** — The most sensitive estates run fully
  disconnected with an offline update channel; hybrid classes connect to
  sovereign clouds such as AWS GovCloud, Azure Government and Google
  Distributed Cloud.
- **Hardened by default** — FIPS-validated cryptography, MFA mandatory on
  every role, PAM with session recording always on, residency enforced
  and evidenced.
- **Offline-tolerant edge** — Remote sites keep operating under
  headquarters-grade policy when disconnected and reconcile when they
  reconnect.

**How it works:**
- **Classify estates** — Assign each estate a deployment class —
  in-country connected, sovereign cloud, or air-gapped.
- **Segregate and govern** — Directorates get isolated domains; policy,
  identity and audit remain central.
- **Evidence continuously** — State-audit evidence and compliance packs
  (FedRAMP / IRAP / StateRAMP-style) are generated from the WORM-backed
  trail.

**FAQ:**
- **Q: How do updates reach an air-gapped estate?**
  A: Through an offline update channel: signed release bundles are
  transferred by your approved process and verified on import; nothing
  calls home.
- **Q: Does Whale AI work without internet?**
  A: Yes — the Government Edition runs Whale AI Abyss on in-region models
  inside the perimeter, with no external calls.
- **Q: Which accreditations does it support?**
  A: Compliance pack export produces evidence for FedRAMP-, IRAP- and
  StateRAMP-style accreditation; the platform's own certifications (ISO
  27001/27017/27018/27701/22301) are listed in the Trust Center.

---

Source: content/modules.ts, content/moduleDetails.ts, content/platform.ts — read on 2026-09-20. Verify against the live files before using if this document is reused later.
