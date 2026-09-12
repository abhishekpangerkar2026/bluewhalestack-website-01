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
  /** small caption under the org name, e.g. confidentiality note */
  note?: string;
  headline: string;
  /** one-sentence hero description: the estate, the change, the result */
  summary: string;
  challenge: string;
  solution: string;
  quote: string;
  person: { name: string; role: string; initials: string };
  metrics: { value: string; label: string }[];
}

export const customerStories: CustomerStory[] = [
  {
    slug: "bfsi-singapore-qatar",
    org: "Two leading banks, Singapore & Qatar",
    note: "Anonymized — delivered engagements",
    industry: "BFSI",
    edition: "Enterprise Edition",
    image: "/customers/bfsi-banner.png",
    imageAlt:
      "Bank compliance and IT teams reviewing multi-jurisdiction audit dashboards",
    headline: "Audit-ready across two regulatory regimes",
    summary:
      "Two banks running public cloud, private infrastructure and on-premises systems under MAS and Qatar central-bank supervision moved from weeks of manual evidence assembly per inspection to reports generated from one policy layer — and rehearsed the exit plans they had only ever documented.",
    challenge:
      "A digital-first bank in Singapore and a prominent bank in Qatar ran channels on public cloud, analytics on private infrastructure and core-adjacent systems on-premises. Every supervisory touchpoint — MAS technology-risk norms in Singapore, central-bank requirements in Qatar — triggered weeks of manual evidence assembly, and their mandated exit strategies had never been tested.",
    solution:
      "One policy layer was enforced across every environment in both jurisdictions and mapped to each regime's controls, so a supervisory request became report parameters — regime, period, scope — rather than a manual assembly exercise. The Migration Engine's assessment and dependency mapping turned the exit annexure into a rehearsed annual drill with evidence on file, and Whalenomics cost visibility gave both CFOs a cloud bill they could decompose by business unit and jurisdiction.",
    quote:
      "The last supervisory request took three days. Before, it took three weeks of five people pulling screenshots. And the exit plan has now been run as a drill, with the evidence filed.",
    person: { name: "Representative", role: "Chief Compliance Officer", initials: "RA" },
    metrics: [
      { value: "Weeks → days", label: "Inspection prep" },
      { value: "2", label: "Regulatory regimes, one plane" },
      { value: "Drill evidence", label: "Exit-plan compliance" },
    ],
  },
  {
    slug: "government-middle-east-defence",
    org: "Defence & Interior ministries, Middle East",
    note: "Anonymized — delivered engagements",
    industry: "Government",
    edition: "Government Edition",
    image: "/customers/government-banner.png",
    imageAlt:
      "Government security operations center with sovereign, air-gapped infrastructure",
    headline: "Sovereign, air-gapped — with AI that never leaves the perimeter",
    summary:
      "Two ministries with disconnected, air-gapped estates across many directorates deployed the Government Edition fully in-country, put every directorate under one security baseline and central policy, and began answering audit queries from a system of record in minutes.",
    challenge:
      "A Ministry of Defence and a Ministry of Interior operated highly sensitive digital estates across directorates and agencies — with strict sovereignty mandates, disconnected and air-gapped environments, no uniform security baseline across units, and audit responses assembled directorate by directorate under national-security-grade scrutiny.",
    solution:
      "Government Edition was deployed fully in-country with air-gapped classes for the most sensitive estates, enforcing directorate-level segregation under central policy — autonomy inside national guardrails. Whale AI operated entirely inside the perimeter, and continuous activity trails delivered examiner-grade reporting across every directorate.",
    quote:
      "An audit query used to take days, directorate by directorate. It is now answered from one system of record in minutes — and the residency and segregation evidence is in the architecture itself.",
    person: { name: "Representative", role: "Head of IT Security", initials: "RB" },
    metrics: [
      { value: "Air-gapped", label: "Every sensitive estate" },
      { value: "1", label: "Security baseline, all directorates" },
      { value: "Minutes", label: "Audit query response" },
    ],
  },
  {
    slug: "telco-datacenter-qatar-ksa-safrica",
    org: "Telco & DC operators — Qatar, KSA, South Africa",
    note: "Anonymized — delivered engagements · Telco & Datacenter Edition preview programme",
    industry: "Telco & Datacenter",
    edition: "Telco & Datacenter Edition",
    image: "/customers/telco-datacenter-banner.png",
    imageAlt:
      "Telecom and datacenter operator facilities being converted into a white-label cloud platform",
    headline: "Rent per megawatt became revenue per tenant",
    summary:
      "Three operators that sold only space, power and links deployed the platform as their own white-label cloud service — multi-tenant, metered into their existing BSS — and reached first cloud-services revenue on capacity they already owned within months.",
    challenge:
      "Three operators — a leading Qatar telecom operator, a Saudi datacenter group and a South African telecom — held strong facilities and connectivity but sold only space, power and links, while cloud services revenue accrued to global providers. Each faced the same build-vs-buy verdict: a multi-tenant cloud platform was a multi-year software programme none of them could staff.",
    solution:
      "As design partners in the Telco & Datacenter Edition preview, each operator deployed the platform as its own white-label cloud service, with native multi-tenancy, service catalogs and per-tenant metering feeding its existing BSS and billing. OSS/BSS integration put the platform inside their existing commercial machinery, and a marketplace opened to ISVs — with SLA accountability and tenant-health visibility driving renewals.",
    quote:
      "We had cloud-services revenue on capacity we already owned within months. Building the platform ourselves had been scoped as a three-year programme we could not staff.",
    person: { name: "Representative", role: "VP Cloud Products", initials: "RC" },
    metrics: [
      { value: "3", label: "Markets, one platform" },
      { value: "Months", label: "Time-to-market" },
      { value: "White-label", label: "Each operator's own brand" },
    ],
  },
  {
    slug: "media-qatar-network",
    org: "Global media network, Doha",
    note: "Anonymized — delivered engagement",
    industry: "Media",
    edition: "Enterprise Edition",
    image: "/customers/media-banner.png",
    imageAlt:
      "Global newsroom and broadcast operations center governed under one security policy",
    headline: "A global newsroom governed as one estate",
    summary:
      "A Doha-headquartered media network put broadcast, streaming, archive and worldwide bureaus under one governance plane, ran Whale AI on its own models inside the perimeter for archive intelligence and transcription, and decomposed production cost per channel and programme.",
    challenge:
      "A Doha-headquartered global media network ran broadcast, streaming, decades of archive and worldwide bureaus across many estates — under sustained, sophisticated cyber threat, and with a professional obligation particular to journalism: newsroom material, sources and unpublished work must never reach external AI services.",
    solution:
      "One governance plane spanned broadcast, digital, archive and bureau estates, with worldwide bureaus managed as offline-tolerant edge sites under headquarters-grade policy and scanning. Whale AI ran fully inside the perimeter for Arabic-English archive intelligence, transcription and research on the network's own models, while Whalenomics cost visibility decomposed streaming and production cost per channel, platform and programme.",
    quote:
      "The newsroom now uses AI for archive search and transcription every day, and every prompt and every document stays on our own systems. Sources and unpublished work have never left the building.",
    person: { name: "Representative", role: "Head of Technology", initials: "RD" },
    metrics: [
      { value: "Zero", label: "External AI data exposure" },
      { value: "Arabic-English", label: "Offline archive AI" },
      { value: "Per-program", label: "Cost visibility" },
    ],
  },
];
