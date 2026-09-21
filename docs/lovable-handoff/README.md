# Content handoff for a website rebuild (prepared 2026-09-20)

This folder is a self-contained content package pulled from the real,
current BlueWhale Stack website — for rebuilding the site in Lovable (or any
other tool). Nothing in here is invented; every fact, price, name and
compliance claim was read directly from the live site's own content files on
2026-09-20 and is called out with its source file.

## Read in this order

1. **`00-master-brief.md`** — start here. Company facts, brand identity, the
   compliance guardrails that must not be violated on any page, and design
   guidance on what to avoid (based on what was already tried and rejected on
   this site, most recently for "looking AI-generated" — the real cause was
   diagnosed and is explained there).
2. **`01-sitemap.md`** — every real page, what it's for, and which document
   below covers its content.
3. **`02-homepage.md`** — the homepage, section by section.
4. **`03-product-and-modules.md`** — the platform and all 14 modules.
5. **`04-editions-solutions-industries-fabric.md`** — editions, solutions,
   industries, and the Fabric initiative.
6. **`05-company-about-careers-customers.md`** — company story, real
   leadership roster, careers, partners programme, and the 4 anonymized
   customer engagements.
7. **`06-trust-and-pricing.md`** — certification and pricing facts, with
   exact required wording. Read this closely before writing any trust,
   security or pricing copy — this is the highest-compliance-risk content on
   the whole site.

## How to use this with Lovable

A practical approach: paste `00-master-brief.md` first to set the brand,
tone and guardrails for the whole project, then work through pages roughly
in the order they appear in `01-sitemap.md`, pasting the relevant section of
the matching document as you ask Lovable to build each page. The four
templated page types (module, solution, industry, edition — see the "scope"
note at the end of `01-sitemap.md`) only need one strong template each; the
content documents give you all the real data to populate every instance of
that template.

## What's deliberately not included

- The technical documentation set (`/docs/*`, ~1,450 lines of source) — a
  separate, large content set better handled on its own rather than folded
  into a marketing-site rebuild.
- The 28-document PDF library (`/resources`) — the current site generates
  these dynamically with a custom PDF pipeline; recommend a simpler
  downloadable-PDF list or a "request a datasheet" flow instead of rebuilding
  that pipeline in a new tool.
- The contact form's backend behavior — carry over the intent-routing idea
  (demo / sales / resource / preview) and a short initial field list, but the
  new tool will need its own form-handling implementation.
- Legal pages (privacy policy, terms) — recommend carrying these over
  as-is rather than having an AI tool rewrite legal text.

## A note on accuracy over time

Every document here says when it was read. If this package sits unused for a
while before the rebuild starts, it's worth spot-checking prices, edition
availability (Telco & Datacenter and Government are marked preview/GA-target
in places), and certification surveillance dates against the live site or
its source files before publishing anything as current.
