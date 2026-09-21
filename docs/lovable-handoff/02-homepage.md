# Homepage content

Read `00-master-brief.md` first, especially the design guidance section. This
document is the real, current homepage copy, organized into the trimmed
7-section structure that replaced an earlier 14-section version on
2026-09-20 (the earlier version repeated the same icon-card grid four times
and was cut down for that reason — keep this shorter shape in a new build).

## 1. Hero

- **Eyebrow:** Digital Experience Platform · 54 capabilities · 9 families · 4 editions
- **Headline:** Every cloud. One control plane.
- **Description:** "BlueWhale Stack is one control plane over six public
  clouds, your VMware, Hyper-V and Nutanix estates, and your air-gapped
  sites. Enterprises, operators and governments use it to get one inventory,
  one identity fabric and one explainable bill — with audit evidence
  generated continuously instead of assembled before each inspection."
- **Primary CTA:** "See it on your estate" → contact (demo intent). Note:
  "45 minutes · one account connected read-only · nothing to install."
- **Secondary CTA:** "Explore the platform" → `/platform`.
- **Hero visual:** the real product interface (an actual Inventory-style
  screen: nav, KPI cards, a dependency graph, a cloud-provider breakdown),
  with 2–3 short annotations pointing at real facts ("One explainable bill,"
  "Evidence, continuous"), labeled honestly as an illustrative interface with
  sample data. Not a decorative 3D scene, not a stock photo.
- **Supported clouds row:** "Built for your cloud. And everything beyond
  it." — logos: AWS, Azure, Google Cloud, Oracle, Alibaba Cloud, Huawei Cloud.

## 2. Proof strip (compact, one row, not a big section)

"FROM DELIVERED ENGAGEMENTS · ANONYMIZED UNDER CONFIDENTIALITY" — four
stat items, each linking to its case study:

| Stat | Label | Source |
|---|---|---|
| Weeks → days | Inspection preparation under two regulators | Two banks, Singapore & Qatar |
| Minutes | Audit query answered from a system of record | Defence & Interior ministries, Middle East |
| Months | To first cloud-services revenue on owned capacity | Telco & DC operators, Qatar · KSA · South Africa |
| Zero | External AI data exposure across a global newsroom | Global media network, Doha |

## 3. See the product

- **Eyebrow:** 02 / See the product
- **Headline:** One console. Every job.
- **Description:** "Most teams stitch together a CMP, a monitoring tool, an
  IaC tool and a migration suite. BlueWhale Stack covers all four under one
  licence, with AI in every family and deployment modes down to fully
  air-gapped."
- **Centerpiece:** an interactive, tabbed real-product view with three tabs —
  "Control your spend" (FinOps), "Know your estate" (Inventory), "Strengthen
  your posture" (Security) — each showing a real, labeled screen ("Illustrative
  interface · sample data").
- **Four short facts below it** (one line each, not boxed cards):
  - **Nine families, one inventory** — a cost anomaly, a finding and a
    ticket point at the same workload and owner.
  - **Whale AI in every family** — 50+ grounded use cases, including fully
    offline inside the perimeter.
  - **Six clouds, one datacenter floor** — public cloud by API; VMware,
    Hyper-V and Nutanix by Edge Agent.
  - **Sovereign by architecture** — SaaS, BYOC, on-premises or fully
    air-gapped — the same build, every mode.
- Link out: "Explore all modules" → `/modules`.

## 4. How it works

- **Eyebrow:** 03 / How it works
- **Headline:** Connect, govern, provision.
- **Description:** "Read-only credentials in, one system of record out. The
  mechanics — ports, permissions, timings — are the ones the docs describe."
- **Three steps**, shown as a numbered track (large numerals + a connecting
  line), not bordered cards:
  1. **Connect** — "Add cloud accounts with read-only credentials — an IAM
     role, an Entra app registration, a Viewer service account. Register one
     Edge Agent per on-prem site; it connects outbound on 443." Detail: "A
     500-resource AWS account is inventoried in under 90 seconds."
  2. **Govern** — "Federate your IdP over SAML or OIDC, map directory groups
     to platform roles with SCIM, and write policy once — residency,
     encryption, tagging, access — for every estate." Detail: "Every
     evaluation and every action is written to the audit log."
  3. **Provision and move** — "Teams request approved resources from the
     catalog with Whale AI sizing (AWS live). The Migration Engine scores
     on-prem workloads with a 6R assessment and plans waves with rollback."
     Detail: "Assessment is live; execution hooks are in progress." (Keep
     this "in progress" qualifier — don't claim execution is fully live.)
- Link out: "Read the quick start" → `/docs/quick-start`.
- (A fourth step, "Observe and prove" — logs/metrics/traces/SLOs included,
  Cloud Audit & Evidence — exists in the source content and can be added back
  if a 4-step version reads better; it was trimmed to 3 for length, not
  because the content is wrong.)

## 5. One case study, told in full

Not a grid of four — one spotlighted engagement, in an editorial layout
(text + a large stat panel):

- **Eyebrow:** 04 / Delivered in the real world
- **Headline:** One estate, told in full.
- **Description:** "Anonymized under confidentiality; every figure is as
  briefed by BlueWhale Stack, not illustrative."
- **The story:** BFSI · Enterprise Edition. Headline: "Audit-ready across two
  regulatory regimes." Summary: "Two banks running public cloud, private
  infrastructure and on-premises systems under MAS and Qatar central-bank
  supervision moved from weeks of manual evidence assembly per inspection to
  reports generated from one policy layer — and rehearsed the exit plans they
  had only ever documented." Org: "Two leading banks, Singapore & Qatar"
  (anonymized). Stat panel: **"Weeks → days"** / "Inspection prep."
- Links: "Read the full case study" → `/case-studies/bfsi-singapore-qatar`;
  "All success stories" → `/customers`.
- See `05-company-about-careers-customers.md` for the other 3 stories and the
  rule about how the attached "quotes" should be labeled.

## 6. Editions

- **Eyebrow:** 05 / Editions
- **Headline:** Four editions. One architecture.
- **Description:** "Standard and Enterprise carry published prices; the
  operator and government editions are shaped to the estate. Moving up is a
  licence change on the same deployment."
- **A single comparison list** (not four floating cards) — one row per
  edition: name, availability status, one-line fit, price, link. See
  `04-editions-solutions-industries-fabric.md` for the exact figures per
  edition.
- One line folding in Fabric rather than a separate big section: "Telco &
  Datacenter Edition is also what BlueWhale Stack Fabric runs on — a
  market's datacenter capacity, every operator and tier, consumed as one
  sovereign cloud." → `/fabric`.
- Link out: "Compare in full" → `/editions`.

## 7. Deployment & trust

- **Eyebrow:** Global infrastructure
- **Headline:** One platform, operated across the globe.
- **Description:** "Run BlueWhale Stack from regions in Singapore, Mumbai,
  Frankfurt and Los Angeles — as managed SaaS, in your own clouds (BYOC), on-
  premise, fully air-gapped and sovereign, or at the edge. Data stays where
  it must, with in-region residency built in."
- **A distinct dark "region directory" list** (not another card grid), one
  row per region:

  | Code | City | Serves | Compliance notes |
  |---|---|---|---|
  | SIN | Singapore | APAC & ASEAN | SaaS region, data residency |
  | FRA | Frankfurt, Germany | Europe | GDPR, data residency |
  | BOM | Mumbai, India | India & South Asia | DPDP Act, in-country residency |
  | LAX | Los Angeles, USA | Americas | SOC 2 (readiness), data residency |

- **Four headline stats:** 4 deployment regions · 6 platform classes managed
  · 5 deployment modes · "In-region" data residency, every region.

## Closing CTA

- **Eyebrow:** Your next chapter
- **Headline:** See the platform on one of your own accounts.
- **Body:** "A 45-minute working session with a solutions engineer: we
  connect one cloud account read-only, walk the inventory, cost and audit
  screens on your real resources, and leave you with the export. No slides."
- **Primary:** "Book a working session" → contact (demo intent). Note: "45
  minutes · read-only credentials · nothing installed on your side."
- **Secondary:** "Start the 90-day prototype" → `/platform#prototype`. Note:
  "Half-day discovery workshop, then 90 days on your estate with no licence
  cost."
- **Tertiary:** "Published pricing" → `/pricing`. Note: "Standard $24,000 ·
  Enterprise $120,000 a year."

Source: `content/home.ts`, `app/page.tsx` (as rebuilt 2026-09-20),
`content/customers.ts`. Read on 2026-09-20 — verify against the live files
before reuse if this document is used much later.
