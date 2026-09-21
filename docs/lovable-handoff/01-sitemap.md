# Site map — every real page on the current site

Read `00-master-brief.md` first. This is the full route list, taken directly
from the project's folder structure on 2026-09-20 (not reconstructed from
memory), with what each page is for and which content document covers it.

## Primary buyer navigation

| Route | Purpose | Content document |
|---|---|---|
| `/` | Homepage — value proposition, real product view, proof, how it works, one case study, editions, deployment regions, closing CTA. | `02-homepage.md` |
| `/platform` | The platform overview — architecture, what it replaces, the 90-day prototype offer. | `03-product-and-modules.md` |
| `/modules` | Index of all 14 modules, grouped by capability family. | `03-product-and-modules.md` |
| `/modules/[slug]` (×14) | One page per module — status, summary, facts, capabilities, how it works, FAQ. | `03-product-and-modules.md` |
| `/products/whale-ai` | Whale AI — the horizontal AI layer, its 3 intelligence tiers, 50+ use cases, grounding model. | `03-product-and-modules.md` (Whale AI module) |
| `/products/whaleforge` | WhaleForge — the IaC module (YAML → Terraform + diagrams). | `03-product-and-modules.md` (WhaleForge module) |
| `/solutions` | Index of the 6 outcome-led solutions. | `04-editions-solutions-industries-fabric.md` |
| `/solutions/[slug]` (×6) | One page per solution — problem, symptoms, how it works, features, editions, FAQ. | `04-editions-solutions-industries-fabric.md` |
| `/industries` | Index of the 7 industries served. | `04-editions-solutions-industries-fabric.md` |
| `/industries/[slug]` (×7) | One page per industry — regimes it answers to, KPIs, FAQ, a delivered-engagement story. | `04-editions-solutions-industries-fabric.md` |
| `/editions` | Compare the 4 editions. | `04-editions-solutions-industries-fabric.md` |
| `/editions/[slug]` (×4) | One page per edition — positioning, audience, price, fit/not-fit, FAQ. | `04-editions-solutions-industries-fabric.md` |
| `/fabric` | The BlueWhale Stack Fabric initiative — a market's datacenter capacity as one sovereign cloud. Global initiative, India launch market. | `04-editions-solutions-industries-fabric.md` |
| `/pricing` | Published Standard/Enterprise pricing, MRU explanation, feature-by-edition comparison, FAQ. | `06-trust-and-pricing.md` |
| `/customers` | Overview of customer proof / success stories. | `05-company-about-careers-customers.md` |
| `/case-studies` | Index of the 4 anonymized case studies. | `05-company-about-careers-customers.md` |
| `/case-studies/[slug]` (×4) | One full case study per delivered engagement. | `05-company-about-careers-customers.md` |
| `/trust` | The Trust Center — all certifications/assessments, trust pillars, FAQ. **High compliance sensitivity — read the guardrails in `00-master-brief.md` before writing this page.** | `06-trust-and-pricing.md` |
| `/resources` | The document library — datasheets, briefs, whitepapers, case studies, readable online and as PDF. (This is a generated document system on the current build; a new build likely needs a simpler resources/downloads page rather than reproducing the PDF pipeline.) | not extracted in this pass |

## Company

| Route | Purpose | Content document |
|---|---|---|
| `/about` | Company story, mission, principles, compact leadership roster. | `05-company-about-careers-customers.md` |
| `/about/leadership` | Full leadership roster with real photos, departments, operating values, office locations. | `05-company-about-careers-customers.md` |
| `/careers` | Open roles, perks, "who you'd work with" (real leadership photos). | `05-company-about-careers-customers.md` |
| `/partners` | Partner programme — the 3 real partner tracks (LSP / Implementation / Strategic). | `05-company-about-careers-customers.md` |
| `/contact` | Contact form (demo / sales / resource / preview intents). | not extracted — this is a form, not copy; carry over the intent-routing behavior and keep the field list short (name, work email, company, optional context) per the design guidance in the master brief |
| `/newsroom` | Company news/press. | not extracted in this pass — check the live page directly if this section is wanted in the new build |

## Legal and technical

| Route | Purpose |
|---|---|
| `/legal/privacy` | Privacy policy. Carry over as-is from the live site rather than rewriting — legal text should not be re-authored casually. |
| `/legal/terms` | Terms of service. Same note as above. |
| `/docs`, `/docs/[slug]` | Technical documentation (quick start, cloud integration permissions, connector setup, etc.) — a large, separate content set (`content/docs.ts` is ~1,450 lines). This is developer/implementation documentation, not marketing copy; treat it as a section to migrate separately or link out to, not something to re-author through an AI website builder in this pass. |

## Not part of the public site — do not recreate

- `/scene-capture` — an internal dev tool for capturing 3D scene images, hidden in production. Not a real page.
- `/print/[slug]` — the print-layout source used to generate downloadable PDFs. Not a page visitors navigate to directly.

## Notes on scope for a rebuild

- 4 editions × 1 page + 14 modules × 1 page + 6 solutions × 1 page + 7
  industries × 1 page + 4 case studies × 1 page = 35 templated detail pages,
  each following one of four repeatable templates (module, solution,
  industry, edition, case-study). Building one strong template per type and
  populating it from the content documents will cover all 35 pages
  consistently — don't hand-design each one individually.
- The document library (`/resources`, 28 generated PDFs) is a significant
  piece of engineering on the current site (auto-generated documents with a
  PDF pipeline). Re-implementing that exactly is probably not worth it in a
  different tool; a simpler "downloadable PDF list" or "contact us for a
  datasheet" page likely serves the same purpose with far less build effort.
