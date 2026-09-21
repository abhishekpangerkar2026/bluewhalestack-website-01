# Trust Center and pricing — exact wording required

Read `00-master-brief.md` first, especially the compliance guardrails. This
document transcribes the certification and pricing facts closely to the
source, because small wording changes here (e.g. dropping "readiness
assessment" and just writing "SOC 2 Type II") turn an accurate claim into a
false one. When in doubt, copy the phrasing below rather than rewording it.

## Trust pillars (from the Trust Center)

1. **Independently verified** — "Our five ISO certifications are audited by
   accredited third-party bodies and can be verified on each body's public
   register. CSA STAR is a Level 1 self-assessment and SOC 2 a readiness
   assessment — full audit packs are available to enterprise customers under
   NDA."
2. **Data residency** — choose where data lives: Singapore, Mumbai,
   Frankfurt, or Los Angeles. Sovereign and air-gapped options available for
   regulated workloads.
3. **Encryption at rest & in transit** — AES-256 at rest, TLS 1.3 in transit.
   Customer-managed keys available on Enterprise, Telco & Datacenter and
   Government editions.
4. **Transparency & reporting** — an annual Transparency Report, compliance
   summary reports, and a shared-responsibility matrix available for every
   deployment model.

## The nine items — five certifications, three assessments, one regulatory alignment

**Say "five ISO certifications plus three assessments." Never say "nine
certifications."**

### Certified (independently audited, can be called "certified")

| Item | Scope in one line | Issued by | Legal entity | Status |
|---|---|---|---|---|
| ISO/IEC 27001:2022 | Information Security Management System for the BlueWhale Stack and BlueWhale Fincore platforms | LMS Assessments Limited, UK (EGAC accredited) | BlueWhale Stack Consulting and Technologies FZE LLC, Ajman, UAE | Certified. Issued 25 Jun 2026, surveillance due 24 Jun 2027, recertification 24 Jun 2029. Stage 1/2 audits: no nonconformities or observations. |
| ISO/IEC 27017:2015 | Cloud security controls, shared responsibility, VM hardening | SNS Certification Inc., San Francisco (IACGS accredited) | Same UAE entity | Certified. Issued 18 Jun 2026, surveillance due 18 Jun 2027, recertification 18 Jun 2029. |
| ISO/IEC 27018:2019 | Protection of PII in public cloud environments | SNS Certification Inc. | Same UAE entity | Certified. Issued 17 Jun 2026, surveillance due 16 Jun 2027, recertification 16 Jun 2029. |
| ISO/IEC 27701:2019 | Privacy Information Management System (controller + processor, no clause excluded) | Staunchly Management and System Services Limited, UK (EGAC accredited) | Same UAE entity | Certified. Issued 25 Jun 2026, surveillance due 24 Jun 2027, recertification 24 Jun 2029. Stage 1/2: 0 major, 0 minor nonconformities, 4 opportunities for improvement. |
| ISO 22301:2019 | Business Continuity Management System | AMERICO Quality Standards Registech Pvt. Ltd. (UAF accredited) | Same UAE entity | Certified. Issued 23 Jun 2026, surveillance due 22 Jun 2027, recertification 22 Jun 2029. |

### Assessments (real, but NOT certifications — say so explicitly)

| Item | Correct one-line description | Issued by | Legal entity | Status |
|---|---|---|---|---|
| **CSA STAR Level 1** | "A CSA STAR Level 1 **self-assessment** against the Cloud Security Alliance's Cloud Controls Matrix (CAIQ), reviewed remotely by an accredited body. Level 1 is a self-assessment declaration, **not** a Level 2 third-party certification audit." | SNS Certification Inc. (reviewed the self-assessment) | UAE entity | Self-assessed. Declared 12 Jun 2026, reviewed 17 Jun 2026, next review due 16 Jun 2027. 0 major/minor nonconformities, 3 non-blocking observations. |
| **SOC 2 Type II readiness assessment** | "A **readiness assessment** against the AICPA Trust Services Criteria — Security, Availability, Processing Integrity, Confidentiality, Privacy. Confirms readiness-level alignment based on documents, interviews and sample evidence. **It is not a CPA attestation report or a SOC 2 Type I or Type II assurance opinion** — a formal Type II report requires an independent CPA examination over an observation period, which is the next step." | SNS Certification Inc. — readiness assessment, explicitly **not a CPA audit opinion** | **BlueWhale Consulting and Technologies Private Limited (India)** — different entity from the ISO certs | Readiness assessment completed 17 Jun 2026, next review recommended by 16 Jun 2027. 28 Trust Services Criteria reviewed, all conforming at readiness level; 0 blockers, 3 improvement actions noted (evidence retention for a future CPA observation period). |
| **GDPR compliance assessment** | "An independent **compliance assessment** confirming appropriate technical and organisational measures aligned with GDPR. **Not** an Article 42 certification, supervisory-authority approval, or legal opinion." | SNS Certification Inc. | UAE entity | Assessed 17 Jun 2026, surveillance due 16 Jun 2027, recertification 16 Jun 2029. All 15 checklist areas conforming; 3 opportunities for improvement, closed. |

### Regulatory alignment (not a certification at all)

- **India DPDP Act 2023** — the privacy programme is aligned to the Act
  (consent frameworks, Mumbai-region data localisation, Data Fiduciary
  readiness). This was assessed as an applicable regime inside the ISO 27701
  certification. Describe as "aligned" or "compliant with an ongoing
  programme," issued by "Regulatory — Government of India" (i.e. not a
  private certification body).

## Trust FAQ (use this exact framing, don't paraphrase the caveats away)

- **"What's the status of your SOC 2 Type II audit?"** → "We've completed a
  SOC 2 Type II readiness assessment against the AICPA Trust Services
  Criteria, confirming readiness-level alignment of our control design across
  all five criteria with no readiness blockers. It is not a CPA attestation
  report or Type II assurance opinion — a formal Type II report requires an
  independent CPA examination over an observation period, which is our next
  step. The readiness assessment pack is available to Enterprise and
  Government customers under NDA."
- **"Which legal entity holds the certificates?"** → the five ISO
  certificates, the CSA STAR Level 1 review certificate and the GDPR
  compliance certificate are issued to the UAE entity (with the Pune, India
  engineering site included in scope); the SOC 2 readiness assessment is
  issued to the Indian entity. All certificates cover the same BlueWhale
  Stack and BlueWhale Fincore platforms.
- **"Can I verify a certificate independently?"** → yes, each certificate
  carries a verification QR code and each issuing body maintains a public
  register (LMS Assessments for ISO 27001, Staunchly for ISO 27701, AMERICO
  for ISO 22301, SNS Certification for ISO 27017/27018, CSA STAR, SOC 2
  readiness and GDPR).
- **"Do you offer a DPA?"** → yes, standard DPA for all paid editions,
  covering GDPR Article 28 and India DPDP, with a 30-day sub-processor
  change-notice process.
- **Incident response:** ISO 27001 procedures; customers notified within 72
  hours for confirmed personal-data incidents, per the DPA/GDPR obligations.
- **Sub-processors:** list provided with the DPA and on request; 30-day
  advance notice of material changes.

## Pricing (exact figures — published, don't soften into "starting at")

- **Standard: $24,000/year**, published. Scoped to AWS/Azure/GCP and a single
  tenant. Includes 1,000 Managed Resource Units (MRU) at the base price, with
  overage bands available. Whale AI tier: Spark, 1M tokens/month.
- **Enterprise: $120,000/year**, published. All six public clouds, on-prem
  via Edge Agent, multi-tenancy. Includes 100 cloud accounts and up to
  1,000,000 MRU. Whale AI tiers: Spark/Tide/Abyss, 100M tokens/month.
  Additional token packs available as add-ons.
- **Terms:** 1-, 3- or 5-year; 10% off for 2 years, 15% off for 3 years.
- **Telco & Datacenter Edition** — full Enterprise plus domain-specific
  layers, metered per network element (telecom operators) or per rack
  (datacenter operators). **No published price** — "contact sales."
- **Government Edition** — full Enterprise plus a sovereignty layer
  (air-gapped, FIPS crypto, always-on PAM, WORM audit log, in-region-only
  AI, offline update channel). **No published price** — priced per contract
  via tender or empanelment on 3–5 year fixed-bid terms.
- **A Managed Resource Unit (MRU)** is one discovered resource under
  management — an instance, a bucket, a database, a VM. Define this term
  wherever pricing is shown; it's the pricing unit, not "seats" or "users."
- **Editions are licence configurations of one platform, not separate
  products** — moving from Standard to Enterprise (or up to Telco &
  Datacenter / Government) is a licensing change, not a re-deployment or
  migration.
- **The 90-day prototype:** a half-day discovery workshop agrees success
  criteria, then the platform runs on the customer's own estate for 90 days
  at no licence cost, scored against those criteria before any purchase
  decision. Conversion pricing is agreed up front.
- **Currencies/entities:** USD list prices; INR and AED invoicing through the
  Indian and UAE entities; USD through the Delaware (US) entity.

Source: `content/trust.ts`, `app/pricing/page.tsx` — read verbatim on
2026-09-20. This document intentionally stays close to the original wording;
do not "improve" the compliance caveats out of the copy in a new build.
