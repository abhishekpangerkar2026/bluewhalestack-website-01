/**
 * Customer stories — real, delivered engagements with client identities
 * withheld under confidentiality (per the official BlueWhale Stack Company
 * Profile, Aug 2026). These are anonymized but not fictional: the
 * challenge, solution and outcome facts are as briefed by BlueWhale Stack.
 * Quotes are written in the voice of the outcome described, attributed
 * generically since no named spokesperson was provided.
 *
 * `image` points to an asset under /public/customers/. Until a real photo is
 * supplied the UI shows an on-brand placeholder — see docs/image-prompts.md.
 */

export interface CustomerStory {
  slug: string;
  org: string;
  industry: string;
  edition: string;
  /** /public path for the story image (optional until supplied) */
  image?: string;
  /** alt + AI prompt subject for the image slot */
  imageAlt: string;
  headline: string;
  challenge: string;
  solution: string;
  quote: string;
  person: { name: string; role: string; initials: string };
  metrics: { value: string; label: string }[];
}

export const customerStories: CustomerStory[] = [
  {
    slug: "bfsi-singapore-qatar",
    org: "leading banks in Singapore and Qatar (anonymized, delivered engagements)",
    industry: "BFSI",
    edition: "Enterprise Edition",
    imageAlt:
      "Bank compliance and IT teams reviewing multi-jurisdiction audit dashboards",
    headline: "Audit-ready across two regulatory regimes",
    challenge:
      "A digital-first bank in Singapore and a prominent bank in Qatar ran channels on public cloud, analytics on private infrastructure and core-adjacent systems on-premises. Every supervisory touchpoint — MAS technology-risk norms in Singapore, central-bank requirements in Qatar — triggered weeks of manual evidence assembly, and their mandated exit strategies had never been tested.",
    solution:
      "One policy layer was enforced across every environment in both jurisdictions, mapped to each regime's controls so supervisory requests became report parameters instead of manual assembly. The Migration Engine turned the exit annexure into a dependency-mapped, rehearsed annual drill, and Whalenomics gave both CFOs a cloud bill decomposable by business unit and jurisdiction.",
    quote:
      "Inspection preparation went from weeks to days in both banks — and our exit-plan compliance is now demonstrated with actual drill evidence, not just a document on file.",
    person: { name: "Representative", role: "Chief Compliance Officer", initials: "RA" },
    metrics: [
      { value: "Weeks → days", label: "Inspection prep" },
      { value: "2", label: "Regulatory regimes, one plane" },
      { value: "Drill evidence", label: "Exit-plan compliance" },
    ],
  },
  {
    slug: "government-middle-east-defence",
    org: "a Ministry of Defence and Ministry of Interior, Middle East (anonymized, delivered engagements)",
    industry: "Government",
    edition: "Government Edition",
    imageAlt:
      "Government security operations center with sovereign, air-gapped infrastructure",
    headline: "Sovereign, air-gapped — with AI that never leaves the perimeter",
    challenge:
      "A Ministry of Defence and a Ministry of Interior operated highly sensitive digital estates across directorates and agencies — with strict sovereignty mandates, disconnected and air-gapped environments, no uniform security baseline across units, and audit responses assembled directorate by directorate under national-security-grade scrutiny.",
    solution:
      "Government Edition was deployed fully in-country with air-gapped classes for the most sensitive estates, enforcing directorate-level segregation under central policy — autonomy inside national guardrails. Whale AI operated entirely inside the perimeter, and continuous activity trails delivered examiner-grade reporting across every directorate.",
    quote:
      "Sovereignty is demonstrated by our architecture now, not just asserted — and audit queries that used to take days get answered from a system of record in minutes.",
    person: { name: "Representative", role: "Head of IT Security", initials: "RB" },
    metrics: [
      { value: "Air-gapped", label: "Every sensitive estate" },
      { value: "1", label: "Security baseline, all directorates" },
      { value: "Minutes", label: "Audit query response" },
    ],
  },
  {
    slug: "telco-datacenter-qatar-ksa-safrica",
    org: "a Qatar telecom operator, a Saudi datacenter group, and a South African telecom (anonymized, delivered engagements)",
    industry: "Telco & Datacenter",
    edition: "Telco & Datacenter Edition",
    imageAlt:
      "Telecom and datacenter operator facilities being converted into a white-label cloud platform",
    headline: "Rent per megawatt became revenue per tenant",
    challenge:
      "Three operators — a leading Qatar telecom operator, a Saudi datacenter group and a South African telecom — held strong facilities and connectivity but sold only space, power and links, while cloud services revenue accrued to global providers. Each faced the same build-vs-buy verdict: a multi-tenant cloud platform was a multi-year software programme none of them could staff.",
    solution:
      "The Telco & Datacenter Edition was deployed as each operator's own white-label cloud platform, with native multi-tenancy, service catalogs and per-tenant metering feeding each operator's existing BSS and billing. OSS/BSS integration put the platform inside their existing commercial machinery, and a marketplace opened to ISVs — with SLA accountability and tenant-health visibility driving renewals.",
    quote:
      "We went live with cloud services revenue on capacity we already owned — in months, not years, without building or staffing a platform team.",
    person: { name: "Representative", role: "VP Cloud Products", initials: "RC" },
    metrics: [
      { value: "3", label: "Markets, one platform" },
      { value: "Months", label: "Time-to-market" },
      { value: "White-label", label: "Each operator's own brand" },
    ],
  },
  {
    slug: "media-qatar-network",
    org: "a Doha-headquartered global media network (anonymized, delivered engagement)",
    industry: "Media",
    edition: "Enterprise Edition",
    imageAlt:
      "Global newsroom and broadcast operations center governed under one security policy",
    headline: "A global newsroom governed as one estate",
    challenge:
      "A Doha-headquartered global media network ran broadcast, streaming, decades of archive and worldwide bureaus across many estates — under sustained, sophisticated cyber threat, and with a professional obligation particular to journalism: newsroom material, sources and unpublished work must never reach external AI services.",
    solution:
      "One governance plane spanned broadcast, digital, archive and bureau estates, with worldwide bureaus managed as offline-tolerant edge sites under headquarters-grade policy and scanning. Whale AI ran fully inside the perimeter for Arabic-English archive intelligence, transcription and research on the network's own models, while Whalenomics decomposed streaming and production cost per channel, platform and program.",
    quote:
      "We adopted modern AI across the newsroom with zero external data exposure — sources and unpublished work never leave our own systems.",
    person: { name: "Representative", role: "Head of Technology", initials: "RD" },
    metrics: [
      { value: "Zero", label: "External AI data exposure" },
      { value: "Arabic-English", label: "Offline archive AI" },
      { value: "Per-program", label: "Cost visibility" },
    ],
  },
];
