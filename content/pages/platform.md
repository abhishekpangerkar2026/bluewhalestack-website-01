# Platform Overview — `/platform` · Expansion prep pack

> **Status:** 🟢 Prep / draft workspace. This document is the staging ground for the
> expanded Platform Overview page. Nothing here is live yet — we finalize copy,
> materials and image briefs here, then port into `content/platform.ts` +
> `app/platform/page.tsx` in an apply pass.
>
> **Goal of this pass:** expand the current 8-section page into a richer, complete
> overview — add proof, a how-it-works flow, deeper module/integration detail, an
> honest comparison, editions context, outcomes, and an FAQ — without losing the
> tight narrative.
>
> **Sources of truth (do not contradict):** `content/platform.ts`,
> `content/modules.ts` (17 modules), `content/company.ts` (clouds, compliance,
> headlineStats), `content/home.ts` (howItWorks, testimonials), `content/editions.ts`.
>
> **Honesty guardrails:**
> - `headlineStats` in `company.ts` are labelled *platform design targets* — keep
>   metrics framed as targets/typical ranges, not guaranteed results.
> - Compliance: ISO 27001 and SOC 2 are **"in progress"** — never imply certified.
> - Numbers must trace back to existing content (no invented figures).

---

## 1. Page goals & audience

**Primary job of the page:** convince a technical-but-budget-owning buyer (Head of
Cloud / Platform, CISO, CTO, infra director) that BlueWhale Stack is *one* governed
control plane that replaces a stack of point tools — across public cloud, private
cloud, hybrid and on-prem — and is safe for regulated/sovereign environments.

**What the visitor should be able to do after this page:**
1. Understand *what* the platform is in one sentence.
2. See *why* one platform beats their current tool sprawl (with a concrete comparison).
3. Trace *how* it works end to end (discover → govern → migrate → optimize).
4. Grasp the *architecture* (control plane over everything + real stack underneath).
5. Know it's *deployable their way* (SaaS / BYOC / Sovereign / On-prem) and *safe*.
6. Take the next step (Book a demo / See editions).

**Tone:** confident, concrete, engineering-credible. Lead with nouns and numbers,
not adjectives. Avoid "revolutionary / cutting-edge / seamless."

---

## 2. Expanded section map

Current page = 8 sections. Proposed expanded page = **15 sections** (new ones marked 🆕).
Order is tuned for narrative momentum: hook → proof → problem → solution → how →
architecture → depth → trust → flexibility → outcomes → answer objections → close.

| #  | Section | Status | Background | New content file keys |
|----|---------|--------|------------|------------------------|
| 1  | Hero | refine | dark | `platformHero` (+ `heroStats` 🆕) |
| 2  | Proof / stats bar | 🆕 | light | `platformStats` 🆕 |
| 3  | The problem (sprawl) | 🆕 | light | `platformProblem` 🆕 |
| 4  | One platform vs tool sprawl (comparison table) | expand | light | `replaces` → `comparison` 🆕 |
| 5  | How it works (4-step flow) | 🆕 | dark | `howItWorksPlatform` 🆕 |
| 6  | Architecture — single control plane (layer map) | keep | dark | inline + `outcomes` 🆕 |
| 7  | System architecture (under the hood) | keep | light | `ArchitectureDiagram` |
| 8  | The 17 modules (explorer + group deep-tiles) | expand | light | `ModuleExplorer` + `moduleGroupTiles` 🆕 |
| 9  | Integrations & connectors | 🆕 | dark | `integrations` 🆕 |
| 10 | Capability pillars (6) | keep | light | `pillars` |
| 11 | Whale AI (4 tiers) | expand | dark | `whaleTiers` (+ `whaleIntro` 🆕) |
| 12 | Deployment models (4) | expand | light | `deploymentModels` (+ compare row 🆕) |
| 13 | Security & compliance posture | keep | light | `securityPosture` + `compliance` |
| 14 | Shaped per edition (strip) | 🆕 | dark | `editions` (reuse) |
| 15 | Outcomes / proof quotes | 🆕 | light | `testimonials` (reuse, filtered) |
| 16 | FAQ | 🆕 | light | `platformFaq` 🆕 |
| 17 | Final CTA | 🆕 | dark | `ctaSection` (reuse) |

> Visual rhythm: alternate light / dark sections so the page breathes. Dark sections
> (hero, how-it-works, architecture, integrations, Whale AI, editions strip, CTA)
> carry the "command center" mood; light sections carry detail and proof.

---

## 3. Section-by-section content

### 1 · Hero  *(refine)*

- **Eyebrow:** Platform
- **H1:** One platform. **Every cloud**, governed.
- **Sub:** *(keep `platformHero.description`)* BlueWhale Stack is a hyperscaler-neutral
  cloud management platform — inventory, provisioning, FinOps, security, ITSM,
  observability, migration and AI, unified in a single control plane across public
  cloud, private cloud, hybrid and on-premise data centers.
- **Primary CTA:** Book a demo → `/contact`
- **Secondary CTA:** See editions → `/editions`
- **🆕 Trust microcopy under CTAs:** "Deploy as SaaS, in your own cloud, or fully
  air-gapped. No lock-in."
- **🆕 Hero stat chips** (3 inline, small — pulled from `headlineStats`, framed as targets):
  - 9+ clouds & hypervisors
  - 17 modules, 1 control plane
  - 20–30% typical cloud savings

> **New content key — `heroStats`** (in `platform.ts`):
> ```
> export const heroStats = [
>   { value: "9+",      label: "clouds & hypervisors" },
>   { value: "17",      label: "modules · 1 control plane" },
>   { value: "20–30%",  label: "typical cloud savings" },
> ];
> ```

**Image/diagram:** see Brief **H-1** (hero ambient control-plane visual).

---

### 2 · Proof / stats bar  🆕  *(light)*

A slim band of 4 headline metrics directly under the hero — gives instant credibility
before the visitor reads anything. Reuse `headlineStats` from `company.ts` (already
labelled design targets) so we don't duplicate numbers.

- 20–30% — Cloud cost reduction via FinOps
- 9+ — Clouds & hypervisors supported
- 5 — Editions for every operating model
- 99.9%+ — Platform SLA (SaaS)

**Microcopy (small, muted, right-aligned or below):** "Figures are platform targets
and typical customer ranges."

**Image/diagram:** none (typographic band). Optional: faint cloud-logo marquee row
beneath (reuse `CloudLogos`).

---

### 3 · The problem  🆕  *(light)*

Sets up the "why a platform" argument before the comparison. Reuse the framing from
`home.ts > problems` but keep it to 3 tight cards so we don't repeat the home page
verbatim — tighten copy for the platform context.

- **Eyebrow:** The problem
- **Title:** Multi-cloud got complex faster than teams could staff for it
- **Cards (3):**
  1. **Cloud sprawl** — AWS, Azure, GCP and on-prem each live in their own console.
     No one has a single map of the estate.
  2. **Blind spend** — Cloud bills climb ~28% a year, yet most orgs can't say which
     team owns which cost.
  3. **Compliance drag** — Audits mean weeks of manual evidence-gathering across
     disconnected, region-specific tooling.

> **New content key — `platformProblem`** (title + 3 cards; icons: `Network`,
> `TrendingUp`, `ShieldAlert`).

**Image/diagram:** see Brief **D-2** (optional "tangle of tools" sketch) — or skip
and let the icon cards carry it.

---

### 4 · One platform vs tool sprawl  *(expand the existing before/after)*

Keep the existing before→after blocks **and** add a proper **comparison table** below
them so the claim is concrete and skimmable. The current `replaces` array stays; we
extend it into a richer `comparison` structure mapping each category to the legacy
tool and the BlueWhale module that absorbs it.

- **Eyebrow:** Why a platform
- **Title:** One platform instead of a tool sprawl
- **Sub:** BlueWhale Stack consolidates the disconnected tools teams stitch together —
  into one governed control plane that shares one identity model, one audit trail,
  and one data tier.

**Comparison table (🆕):**

| What you run today | Typical point tool | BlueWhale Stack module |
|--------------------|--------------------|------------------------|
| Cost & FinOps | Flexera / Cloudability | FinOps & Billing (Whalenomics) |
| Monitoring & APM | Datadog | Observe (OpenTelemetry) |
| ITSM & CMP | ServiceNow | ITSM + Provisioning & Catalog |
| Infrastructure-as-Code | Terraform / Pulumi | WhaleForge IaC + Landing Zone Builder |
| CSPM & compliance | Prisma / Wiz | Security & Compliance (Prowler-based CSPM) |
| DCIM | Legacy DCIM suites | DCIM + Capacity Planning |
| Identity & PAM | Okta + standalone PAM | Identity & Access (Whale IAM + PAM) |

**Closing line under table:** "Same outcomes, one platform — so nothing falls between
the tools."

> **New content key — `comparison`** (array of `{ category, tool, module, moduleSlug }`);
> module names/slugs must match `content/modules.ts`. Link each module cell to its
> `/modules/[slug]` page.

**Image/diagram:** none required; the table is the visual. Optional Brief **D-2** above
the table.

---

### 5 · How it works  🆕  *(dark)*

A 4-step horizontal flow — the spine of the platform story. Reuse `home.ts > howItWorks`
(already written and on-brand) so home and platform stay consistent; we can copy it
into `platform.ts` as `howItWorksPlatform` or import from home content.

- **Eyebrow:** How it works
- **Title:** From connected to optimized — in one platform
- **Steps:**
  1. **Discover & Assess** — Connect cloud accounts and on-prem. Auto-discover all
     resources and get a cloud readiness score within hours.
  2. **Govern & Secure** — Apply centralized RBAC, compliance frameworks, and
     data-residency rules across every environment.
  3. **Migrate & Provision** — Execute structured migrations with pre-built runbooks;
     provision via self-service with governance guardrails.
  4. **Optimize & Scale** — Continuously right-size, enforce budgets, and automate —
     scale cloud operations without adding headcount.

**Image/diagram:** see Brief **D-3** (4-step flow SVG — the connective tissue diagram).

---

### 6 · Architecture — single control plane  *(keep, light polish)*

Keep the existing layered map (clouds row → control plane with module groups →
outcomes row). It is the page's signature visual. Polish:
- Pull the outcomes row into a content key instead of inline strings.
- Make module chips link to `/modules/[slug]`.

- **Eyebrow:** Architecture
- **Title:** A single control plane over everything
- **Sub:** Connect every cloud and data center; govern, optimize and automate from
  one layer.
- **Outcomes row (4):** −28% cloud spend · 97% compliance score · RPO < 1hr · Govern at scale

> **New content key — `controlPlaneOutcomes`** (move the 4 inline strings out of JSX).

**Image/diagram:** this section *is* Brief **D-1** (control-plane layer map) — currently
built inline in JSX. See D-1 for the upgraded SVG spec.

---

### 7 · System architecture — under the hood  *(keep)*

Keep as-is; this is where the credible engineering detail lives. The `ArchitectureDiagram`
component currently renders a placeholder — Brief **D-4** specifies the real SVG.

- **Eyebrow:** System architecture
- **Title:** What runs under the hood
- **Sub:** *(keep)* A Next.js web app and a NestJS API gateway over Postgres
  (row-level security), Redis and Meilisearch — with queue-driven workers, AWS/Azure/GCP
  connectors, and a Go edge agent for on-prem.

**Image/diagram:** see Brief **D-4** (system/stack diagram).

---

### 8 · The 17 modules  *(expand)*

Keep the interactive `ModuleExplorer`. **Add** a row of 5 "group deep-tiles" above or
below it — one per module group — each summarizing the group and linking onward. Gives
structure before the visitor dives into the explorer.

- **Eyebrow:** Modules
- **Title:** One platform, 17 modules
- **Sub:** A shared platform, gated per edition. Five layers, from cloud foundation
  to AI.

**Group deep-tiles (🆕 — 5):**

| Group | One-liner | Modules in group |
|-------|-----------|------------------|
| **Foundation** | Connect, map, and govern access to every environment. | Identity & Access · Cloud Connectors · Inventory & URM · Provisioning & Catalog · Audit Logs |
| **Operations** | Run, observe, secure and move workloads day to day. | ITSM · Observe · Migration Engine · Security & Compliance |
| **Builder** | Design compliant foundations and control spend. | Landing Zone Builder · WhaleForge IaC · FinOps & Billing |
| **Datacenter** | Manage physical infrastructure end to end. | DCIM · Bare-Metal Lifecycle · Capacity Planning · Backup & DR |
| **Intelligence** | AI across every module, in four tiers. | Whale AI |

> **New content key — `moduleGroupTiles`** derive from `moduleGroups` +
> `modules` (filter by group) so it stays in sync. Each tile links to `/modules#<group>`
> or the explorer with that group preselected.

**Image/diagram:** none new (the explorer + tiles carry it).

---

### 9 · Integrations & connectors  🆕  *(dark)*

Buyers need to know it plugs into what they already run. Pulls credible detail already
present in `modules.ts` (30+ ITSM connectors, 12+ data sources, OTel, agentless +
Go edge agent).

- **Eyebrow:** Integrations
- **Title:** It connects to what you already run
- **Sub:** Agentless cloud connectors plus a Go edge agent bring every environment
  under one pane — and open standards keep your existing tools in the loop.
- **Groups (4):**
  - **Clouds & hypervisors (9+):** AWS · Azure · Google Cloud · Oracle Cloud · IBM
    Cloud · Alibaba Cloud · VMware vSphere · Hyper-V · OpenStack · Nutanix · bare metal
  - **ITSM & workflow (30+ connectors):** ServiceNow · Jira · and more
  - **Cost & billing sources:** AWS CUR · Azure Billing · GCP BigQuery
  - **Open standards:** OpenTelemetry · Terraform / CloudFormation · Redfish / IPMI / SNMP · SAML / SCIM / OIDC
- **Edge note:** "On-prem credentials stay on-site — the Go edge agent connects
  outbound-only over HTTPS. No inbound ports."

> **New content key — `integrations`** (4 groups, each `{ heading, count?, items[] }`).
> Reuse `clouds` from `company.ts` for the first group.

**Image/diagram:** reuse `CloudLogos`; optional Brief **D-5** (hub-and-spoke connectors).

---

### 10 · Capability pillars (6)  *(keep)*

Keep `pillars` exactly. Already strong: Unified visibility · Centralized governance ·
FinOps & cost control · Migration & automation · AI-native · Sovereign-ready.

- **Eyebrow:** What you get
- **Title:** Built to see, govern, and scale

**Image/diagram:** none (icon cards).

---

### 11 · Whale AI (4 tiers)  *(expand)*

Keep the 4 tier cards; add a short intro framing AI as cross-cutting, not a feature.

- **Eyebrow:** Whale AI
- **Title:** AI across every module — in four tiers
- **Sub:** *(keep)* From natural-language cost answers to autonomous, sovereign workflows.
- **🆕 Intro line:** "Whale AI is woven through the platform, not bolted on — it works
  where the work already happens, and runs on in-region models for sovereign deployments."
- **Tiers (keep):** Spark (Standard) · Tide (Enterprise · Telco) · Abyss (Enterprise+ ·
  Government) · Predictive Ops (Datacenter).

> **New content key — `whaleIntro`** (one string). Link the section to `/modules/whale-ai`.

**Image/diagram:** see Brief **D-6** (4-tier AI ladder over modules).

---

### 12 · Deployment models (4)  *(expand)*

Keep the 4 cards; add a one-line "best for" tag per model and a compact compare row
(managed-by / data location / AI location) so the differences are concrete.

- **Eyebrow:** Deployment
- **Title:** Run it your way
- **Sub:** *(keep)* The same platform — delivered as SaaS, in your own cloud, or
  fully air-gapped.

| Model | Best for | Managed by | Data location | AI |
|-------|----------|-----------|---------------|-----|
| **SaaS** | Fastest to value | BlueWhale | BlueWhale region | Hosted |
| **BYOC** | Most flexible | You (Helm) | Your cloud (AWS/Azure/GCP) | Your cloud |
| **Sovereign** | Air-gapped | You | In-country | In-region model |
| **On-premise** | Max control | You | Your data center | In-region model |

> **New content key:** extend `deploymentModels` items with `bestFor`, `managedBy`,
> `dataLocation`, `ai` fields (keep existing `name`, `badge`, `body`).

**Image/diagram:** see Brief **D-7** (4 deployment topologies, small).

---

### 13 · Security & compliance posture  *(keep)*

Keep `securityPosture` checklist + `compliance` chips. Honesty: keep the
"(in progress)" markers on ISO 27001 / SOC 2 exactly as in `company.ts`.

- **Eyebrow:** Security & compliance
- **Title:** Trust built into every layer
- **Sub:** Security is not a module bolted on — it runs through the whole platform.

**Image/diagram:** none (checklist + chips). Optional small shield/lock motif.

---

### 14 · Shaped per edition  🆕  *(dark strip)*

A compact strip linking the platform to the 5 editions — answers "how do I buy this?"
Reuse `content/editions.ts`; show 5 named chips/cards with one line each, linking to
`/editions/[slug]` and `/editions` (compare).

- **Eyebrow:** Editions
- **Title:** One platform, shaped to how you operate
- **Sub:** The same control plane, gated and tuned across five editions.
- **Editions:** Standard · Enterprise · Datacenter · Government · Telco & MSP
- **CTA:** Compare editions → `/editions`

**Image/diagram:** none (cards). Pull edition taglines from `editions.ts`.

---

### 15 · Outcomes / proof quotes  🆕  *(light)*

Two or three customer quotes from `home.ts > testimonials` (already written). Reinforces
the metrics with named (pseudonymized) voices.

- **Eyebrow:** Outcomes
- **Title:** What teams do with one control plane
- **Quotes (reuse):** National Digital Authority (95% compliance, −31% cost) ·
  Gulf Telecom Group (12 customers in 60 days) · Meridian Financial ($412K quarterly savings).

**Image/diagram:** none (quote cards with initials avatars).

---

### 16 · FAQ  🆕  *(light)*

Answers the recurring objections; also good for SEO. 6–8 Q&As.

- **Eyebrow:** FAQ
- **Title:** Questions teams ask before they switch
- **Q&A drafts:**
  1. **Which clouds and hypervisors are supported?** — AWS, Azure, Google Cloud,
     Oracle, IBM, Alibaba, VMware vSphere, Hyper-V, OpenStack and Nutanix, plus bare
     metal — 9+ environments under one control plane.
  2. **Do I have to rip out my existing tools?** — No. BlueWhale Stack can consolidate
     them over time and integrates with ServiceNow, Jira, Terraform and OpenTelemetry
     so you migrate at your pace.
  3. **How is on-prem connected securely?** — A Go edge agent connects outbound-only
     over HTTPS; on-prem credentials never leave your site, and there are no inbound
     ports to open.
  4. **Can it run fully air-gapped?** — Yes. The Sovereign and On-premise models run
     isolated, with in-region AI models, offline licensing and no call-home.
  5. **How fast is time to value?** — Connect accounts and auto-discover resources
     within hours; FinOps savings typically land in the first quarter (20–30% range).
  6. **What does Whale AI run on?** — Claude-powered tiers across modules, with
     in-region model options for sovereign deployments.
  7. **What compliance frameworks are covered?** — CIS, NIST, ISO 27001, HIPAA and
     more; ISO 27001 and SOC 2 Type II are in progress, with GDPR, DPDP, PDPA, PCI-DSS
     and regional frameworks supported.
  8. **How is it licensed / packaged?** — As five editions tuned to operating models;
     see Editions and Pricing.

> **New content key — `platformFaq`** (array of `{ q, a }`). Consider rendering with
> an accordion (`<details>`), good for accessibility and SEO.

**Image/diagram:** none.

---

### 17 · Final CTA  🆕  *(dark)*

Reuse `home.ts > ctaSection`.

- **Title:** Ready to unify your cloud infrastructure?
- **Sub:** Talk to a solutions architect today — no commitment.
- **Primary:** Book a Demo → `/contact?intent=demo`
- **Secondary:** Contact Sales → `/contact?intent=sales`

**Image/diagram:** ambient brand background (reuse hero motif, dimmed).

---

## 4. New content keys to add to `content/platform.ts` (apply pass)

These are the *only* new exports the apply pass needs. Existing exports
(`platformHero`, `replaces`, `pillars`, `deploymentModels`, `whaleTiers`,
`securityPosture`) stay; some get extra fields.

- `heroStats` — 3 hero chips.
- `platformStats` — reuse `headlineStats` (no new data; just reference it).
- `platformProblem` — `{ title, cards: [{icon,title,body}×3] }`.
- `comparison` — `[{ category, tool, module, moduleSlug }]` (supersedes raw `replaces` in UI).
- `howItWorksPlatform` — reuse `home.ts > howItWorks` (import, don't duplicate).
- `controlPlaneOutcomes` — 4 strings (move out of JSX).
- `moduleGroupTiles` — derived from `moduleGroups` + `modules`.
- `integrations` — 4 groups `{ heading, count?, items[] }`.
- `whaleIntro` — one string.
- `deploymentModels` — extend each item: `+ bestFor, managedBy, dataLocation, ai`.
- `platformFaq` — `[{ q, a }]`.

**Reused (no new file needed):** `compliance`, `clouds`, `headlineStats` (`company.ts`);
`testimonials`, `ctaSection`, `howItWorks` (`home.ts`); `editions` (`editions.ts`);
`modules`, `moduleGroups` (`modules.ts`).

---

## 5. Image & diagram briefs

**Conventions (all visuals):**
- Brand blue `#002da1`; accent cyan `#06b6c4` (note: globals.css uses `#2ad4d4` for
  accent-500 — match the *token*, not the hex, when building in JSX).
- Code-based **SVG/React** preferred over raster — on-brand, no licensing, editable,
  crisp on retina, theme-able for dark sections.
- Respect `prefers-reduced-motion`: any animation must have a static fallback.
- Provide `role="img"` + `aria-label` (or `<title>`) on every diagram for a11y.
- Dark-section diagrams: white/slate strokes on transparent; light-section: brand on white.

### ✅ Built components (this pass — code-based, type-checked)

These ship the "Architecture / Product / Solution images" as on-brand React/SVG —
no raster assets, no licensing. Human imagery stays as initials-avatars (existing pattern).

| Asset | Component | File | Section | Status |
|-------|-----------|------|---------|--------|
| D-1 control-plane map | `ControlPlaneMap` | `components/diagrams/ControlPlaneMap.tsx` | 6 | ✅ built (adds Whale AI rail + module links) |
| D-4 system architecture | `ArchitectureDiagram id="platform"` | `components/diagrams/ArchitectureDiagram.tsx` + `content/architecture.ts` | 7 | ✅ already existed |
| Product image — FinOps | `ProductMockup` | `components/sections/ProductMockup.tsx` | 1 / 8 | ✅ already existed |
| Product image — Inventory | `InventoryMockup` | `components/sections/mockups/InventoryMockup.tsx` | 8 | ✅ built (URM + dependency graph + facets) |
| Product image — Security | `SecurityMockup` | `components/sections/mockups/SecurityMockup.tsx` | 8 | ✅ built (score gauge + severities + frameworks) |
| Shared app chrome | `AppWindow` | `components/sections/mockups/AppWindow.tsx` | — | ✅ built (browser+sidebar shell) |
| Product showcase (tabbed) | `ProductShowcase` | `components/sections/ProductShowcase.tsx` | 8 | ✅ built (tabs FinOps · Inventory · Security) |
| Solution image | `SolutionComposite` | `components/diagrams/SolutionComposite.tsx` | 4 / solutions | ✅ built (modules → outcome; default: Migration Factory) |

**Human images:** no raster assets — testimonial/outcome quotes use the existing
initials-avatar style (see `CustomerStories.tsx`). Per decision, kept consistent.

**Not yet wired into the live page** — components are ready to drop in during the apply
pass. Suggested placement: `ControlPlaneMap` replaces the inline JSX in Section 6;
`ProductShowcase` becomes a new "See the product" section (8); `SolutionComposite` sits
under the comparison table (4).

### Diagram briefs (remaining / optional — build as SVG)

**D-1 · Control-plane layer map** *(Section 6 — ✅ now built as `ControlPlaneMap`)*
- Three stacked bands: (top) **clouds/hypervisors row** — AWS, Azure, GCP, Oracle,
  IBM, Alibaba, VMware, Hyper-V, OpenStack, bare-metal nodes; (middle) **BlueWhale
  Stack control plane** wide bar containing the 5 module-group chips
  (Foundation · Operations · Builder · Datacenter · Intelligence); (bottom) **outcomes
  row** — −28% spend, 97% compliance, RPO<1hr, Govern at scale.
- Connector lines from control plane down to each cloud node (subtle, animated draw
  on scroll with static fallback). Vertical **"Whale AI"** rail spanning all layers
  on the right.
- Currently approximated inline in `page.tsx` (lines ~145–210) — upgrade to a single
  responsive SVG component, dark background.
- Ratio ~16/10. a11y label: "BlueWhale Stack control plane sitting over nine clouds
  and hypervisors, delivering cost, compliance and recovery outcomes."

**D-2 · Tool-sprawl → one platform** *(Section 4 — optional, above the table)*
- Left: 6–7 scattered, disconnected tool tiles (greyed, tangled connector lines).
  Right: one clean BlueWhale tile with ordered module rows. Arrow between.
- Light background. Reinforces the comparison table; skip if the table reads strongly.

**D-3 · How-it-works 4-step flow** *(Section 5)*
- Horizontal (desktop) / vertical (mobile) 4-node flow: Discover & Assess → Govern &
  Secure → Migrate & Provision → Optimize & Scale. Numbered nodes (01–04), connecting
  arrows, a small icon per step (`Search`, `ShieldCheck`, `MoveRight`, `Gauge`).
- Dark background. Animated progressive reveal of nodes; static fallback.
- Ratio ~16/5 desktop.

**D-4 · System architecture (under the hood)** *(Section 7 — replaces `ArchitectureDiagram` placeholder)*
- Layered real-stack diagram:
  - **Client:** Next.js web app (browser).
  - **Edge/API:** NestJS API gateway (authN/Z, rate limit).
  - **Data tier:** Postgres (row-level security) · Redis (cache/queues) · Meilisearch (search).
  - **Workers:** queue-driven background workers (sync, scans, migrations).
  - **Connectors:** AWS / Azure / GCP cloud connectors (agentless) + **Go edge agent**
    (outbound-only HTTPS) to on-prem (vSphere, Hyper-V, Nutanix, OC@C).
- Show data flow arrows; mark the security boundary (RLS, outbound-only edge).
- Light background. Ratio ~16/9. This is the most detailed diagram — keep labels legible.

**D-5 · Integration hub-and-spoke** *(Section 9 — optional)*
- BlueWhale hub in center; spokes grouped into Clouds, ITSM/workflow, Billing sources,
  Open standards. Reuse `CloudLogos` for the cloud spokes.
- Dark background.

**D-6 · Whale AI tier ladder** *(Section 11 — optional)*
- 4 ascending steps: Spark → Tide → Abyss → Predictive Ops, each labelled with its
  edition, overlaid as a rail across the 5 module groups (echoes D-1's AI rail).
- Dark background.

**D-7 · Deployment topologies** *(Section 12 — small, 4-up)*
- Four mini topology icons: SaaS (BlueWhale-hosted cloud), BYOC (control plane inside
  customer cloud boundary), Sovereign (air-gapped boundary box + in-region AI node +
  "no call-home"), On-premise (data-center rack + control plane). Consistent visual
  language across all four. Light background.

### Photographic / ambient image briefs

**H-1 · Hero ambient visual** *(Section 1)*
- Abstract "command center / deep ocean" motif behind the headline — current page uses
  blurred brand/accent radial glows (keep as the cheap, on-brand default). If we want a
  richer asset: a subtle dark UI-collage or wireframe globe (the repo already has `cobe`
  for globe visuals — consider a slow-rotating wireframe globe with node points = cloud
  regions). 16/9, dark, must not compete with the headline; keep contrast for white text.
- **If generated (image tool / designer) — prompt:** "Abstract dark navy command-center
  visual, deep-ocean blue (#002da1) with cyan (#2ad4d4) accent glows, faint wireframe
  globe with glowing network nodes representing global cloud regions, subtle data-grid,
  no text, cinematic, high contrast for white overlay text, 16:9."

**Final-CTA background** *(Section 17)* — reuse H-1 dimmed; no new asset.

> **Asset destination:** SVG diagrams ship as React components under
> `components/diagrams/`; any raster/generated images go in `public/showcase/`
> (currently empty) and are referenced via `next/image`.

---

## 6. Open questions before apply pass

1. **Metrics on the architecture diagram** (−28% spend, 97% compliance) are stated as
   facts in the current JSX. Reframe to "target" / "typical" to match the honesty
   guardrail? (Recommend: yes.)
2. **D-2 / D-5 / D-6 / D-7** are marked optional — confirm which to actually build vs.
   keep as icon/card layouts, so we scope the SVG work.
3. **FAQ rendering** — accordion (`<details>`) vs. always-open grid?
4. **Generated hero image (H-1)** — stick with CSS glow default, or invest in the
   `cobe` wireframe globe / a generated raster?

---

## 7. Apply checklist (next pass — not now)

- [ ] Add new keys to `content/platform.ts` (Section 4 list).
- [ ] Build new sections into `app/platform/page.tsx` in the Section 2 order.
- [ ] Build D-1 and D-4 SVG components (signature + under-the-hood) at minimum.
- [ ] Wire module/edition links (`/modules/[slug]`, `/editions/[slug]`).
- [ ] Apply honesty reframes (targets/typical; keep "in progress" compliance markers).
- [ ] `npm run lint` + `npm run typecheck` + visual QA at sm/md/lg.
