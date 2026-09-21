# BlueWhale Stack — master brief for a website rebuild

Prepared 2026-09-20 as a content-and-guidance handoff, so a new build (in Lovable or
any other tool) starts from the real product facts and avoids mistakes already made
and fixed once on the current site. This is document 1 of a set — see
`README.md` in this folder for the full list and how to use them.

## What the company is

**BlueWhale Stack** is a Digital Experience Platform for cloud management: one
control plane over six public clouds (AWS, Azure, GCP, Oracle, Alibaba, Huawei),
private/virtualised estates (VMware, Hyper-V, Nutanix, OpenShift, KVM) and
air-gapped sites. It replaces four separate tools — a cloud management platform,
a monitoring/observability tool, an IaC tool, and a migration suite — with one
licence, one inventory, one identity fabric and one explainable bill.

**Category:** Digital Experience Platform for cloud, sovereign and datacenter
operations. (An earlier internal review flagged that leading with "Digital
Experience Platform · 54 capabilities · 9 families · 4 editions" makes a visitor
decode a taxonomy before understanding the category — consider leading with the
plain category and a benefit statement, and moving the counts to the platform
page. That's a judgment call for whoever designs the new hero, not a hard rule.)

**Scale facts (use exactly, do not round or relabel):**
- 54 capabilities, across 9 capability families, in 14 modules.
- **Never say "11 modules."** The correct count is 14 modules.
- 4 editions: Standard, Enterprise, Telco & Datacenter, Government.
- Standard: $24,000/year (published). Enterprise: $120,000/year (published).
  10% off for a 2-year term, 15% off for 3 years. Telco & Datacenter and
  Government are NOT published prices — "contact sales," priced per operator,
  per rack, or per contract.
- Offices: Mumbai (HQ), Ajman (UAE), Wilmington (US, Delaware entity).
- Founder & CEO: **Abhishek Pangerkar**. Real leadership photos exist for 5
  named people — see document 05 for the full roster.

## Brand identity

- **Name:** BlueWhale Stack. Wordmark + a whale/orca logomark in a two-tone
  square (real SVG logo already exists — reuse it as an asset rather than
  redrawing, if the new tool can import an SVG/PNG asset).
- **Primary brand colour:** blue, roughly `#2458f5` (interactive blue), with a
  deep navy `#0a1530`/`#0a1628` for dark sections and text, and a warm/cool
  white canvas (`#f8f9fc`–`#ffffff`) for light sections. Accent cyan `#83d9ee`
  appears sparingly in dark-section decoration.
- **Typography:** a single sans-serif family for body/UI text (the current
  build uses Inter), with a second, slightly more editorial display face for
  large headlines (the current build uses Manrope) — tight letter-spacing on
  big headlines, generous line-height on body copy.
- **Voice:** direct, specific, unglamorous. Sentences name real mechanisms
  (ports, protocols, timings, standards) rather than adjectives. Avoid
  marketing filler ("cutting-edge," "seamless," "revolutionary," "world-class"
  used as decoration) — the existing copy deliberately doesn't use these
  words, and that restraint is part of what reads as credible rather than
  AI-generated.

## Compliance and legal guardrails — do not violate these, on any page

These come directly from the certification bodies' own sharing rules and from
legal/compliance review. Getting these wrong is a real regulatory and
reputational risk, not a style preference.

1. **Never write "SOC 2 Type II certified" or imply BlueWhale Stack holds a
   SOC 2 attestation.** The correct, exact framing: *"a SOC 2 Type II
   readiness assessment"* — a readiness review against the AICPA Trust
   Services Criteria, not a CPA attestation report or a Type II assurance
   opinion. A formal Type II report requires an independent CPA examination
   over an observation period, which has not happened yet.
2. **Never write "CSA STAR Level 2" or imply a Level 2 audit.** The correct
   framing: *"CSA STAR Level 1 self-assessment"* — a self-assessment
   declaration against the Cloud Security Alliance's CCM/CAIQ, reviewed
   remotely by an accredited body, not a third-party Level 2 certification
   audit.
3. **GDPR:** a *compliance assessment*, not an Article 42 certification, not
   supervisory-authority approval, not a legal opinion.
4. **The five ISO certifications are real, independently audited, and can be
   called "certified":** ISO 27001 (information security), ISO 27017 (cloud
   security), ISO 27018 (PII in the cloud), ISO 27701 (privacy), ISO 22301
   (business continuity). Correct summary phrase: **"five ISO certifications
   plus three assessments (SOC 2 readiness, CSA STAR Level 1, GDPR)."**
   **Never say "nine certifications"** — three of the nine items are
   assessments, not certifications.
5. India's DPDP Act 2023: describe as an aligned/compliant privacy programme,
   not a third-party certification (it's a regulatory framework, not a cert
   body).
6. **Never publish the names of third-party datacenter operators** anywhere
   in public-facing Fabric material — this is an NDA obligation. Describe
   capacity, tiers and operator counts generically ("regional operators,"
   "national and regional tiers") instead of naming a specific company.
7. **Fabric is a global initiative with India as its launch market** — do not
   describe it as India-only, and do not describe it as launching somewhere
   other than India first.
8. Keep the published pricing exactly as stated above ($24K / $120K); do not
   invent numbers for the two unpublished editions.
9. Legal entities matter for certificates specifically: the five ISO
   certificates, the CSA STAR review and the GDPR certificate are issued to
   the UAE entity (BlueWhale Stack Consulting and Technologies FZE LLC,
   Ajman); the SOC 2 readiness assessment is issued to the Indian entity
   (BlueWhale Consulting and Technologies Private Limited). Don't collapse
   these into one entity if a page states which one holds which certificate.
10. Customer case studies are real, delivered engagements but **anonymized**
    — no customer names, and the "quotes" attached to them are written in the
    voice of the outcome, not verbatim statements from a named person. Present
    them as authored summaries of a real engagement, not as direct quotations
    from an identified individual. See document 05 for the exact wording rule.

## Design and structure guidance (learned the hard way this project)

The current site went through several visual directions before this handoff —
pasted stock images, a 3D CGI product-scene engine, an abstract vector-graphic
redesign — and the person building it rejected each one, most recently
because the site "looks AI-generated." A fresh, page-by-page visual review on
2026-09-20 diagnosed the actual, specific cause, which is worth carrying
into any new build so the same mistake isn't repeated a fourth time:

**The problem was never really the images. It was structural repetition.**
Pages were 12+ sections long, and most sections repeated the exact same shape
— an eyebrow label, a heading, a description, then a grid of identically
styled icon-in-a-box cards with a number badge. That same card pattern
appeared 3–4 times on a single page, the same alternating white/pale-blue/navy
band rhythm ran down every page, and the same decorative ring/orbit graphic
sat behind the closing call-to-action on nearly every page, identical. That
relentless, uniform repetition — more than any specific image style — is what
reads as machine-generated. A confident, human-edited page varies its shape;
a template repeats it.

**What worked, and is worth keeping as a pattern:**
- A homepage cut to about 7 sections, each with a genuinely different visual
  treatment: a real interactive product view, a numbered process track (large
  numerals + a connecting line, not boxes), one spotlighted case study
  presented as an editorial block (not a card grid), a plain comparison list
  for pricing/editions (not four floating cards), and a distinct dark
  "deployment regions" directory.
- Hero imagery that is the **real product interface** — an actual, honestly
  labeled ("illustrative interface · sample data" where the data is
  representative, not live) screen of the console — rather than a decorative
  3D scene or a stock photo of generic people. It answers "what does an
  operator actually do here," which a decorative graphic cannot.
- Real, named leadership photos (see document 05) for the About/Careers
  pages — never substitute AI-generated stock photos of invented people for
  team or customer imagery. That specific substitution is both a design
  mismatch (inconsistent with real photos elsewhere) and a credibility risk.
- Keep any AI/stock photography, if used at all, to genuinely generic
  atmosphere (an office or datacenter texture shot) and never present it as a
  specific real team, named customer, or claimed evidence.
- Video, where used, should show the real product doing a real task rather
  than generic stock b-roll of unrelated people.

**A practical target for a new build:** no more than one "grid of identical
cards" moment per page. Vary everything else — a full-width real screenshot,
a big editorial statement, a comparison table, a quote/case block, a numbered
track, a region/location list. If a page is reaching for a fourth icon-grid
section, that's the signal to cut, combine, or reshape it instead.

## Site map

See `01-sitemap.md` for the full page list and what each page needs to cover.

## Where the rest of the content lives

- `02-homepage.md` — the rebuilt homepage's exact section-by-section content.
- `03-product-and-modules.md` — platform positioning + all 14 modules.
- `04-editions-solutions-industries-fabric.md` — editions, solutions,
  industries, and the Fabric initiative.
- `05-company-about-careers-customers.md` — company facts, story, real
  leadership roster, careers, partners, and the 4 anonymized customer
  engagements.
- `06-trust-and-pricing.md` — the full, exact-wording certification and
  pricing facts (read this one closely before writing any trust/security/
  pricing copy — see the guardrails above first).

All of these were extracted directly from the live site's own content files
on 2026-09-20 — they are facts already approved for this business, not new
copy. Treat anything that sounds like a stat, a date, a price, or a legal
claim as something to preserve exactly, and treat everything else (section
order, headline wording, visual style) as free to redesign.
