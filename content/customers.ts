/**
 * Customer stories — REPRESENTATIVE, anonymized scenarios written truthfully
 * as the kind of outcome the platform is designed to deliver. These are not
 * named customers and carry no fabricated financial metrics.
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
    slug: "public-sector-agency",
    org: "a public-sector agency (representative)",
    industry: "Government",
    edition: "Sovereign Edition",
    imageAlt:
      "Government digital operations center with officials reviewing dashboards",
    headline: "Agencies, one sovereign control plane",
    challenge:
      "Multiple agencies ran disconnected cloud and on-prem estates with no shared governance, and a regulator demanding provable, in-country data residency.",
    solution:
      "An air-gapped Sovereign deployment unified inventory and identity across agencies, with in-region AI and a full audit trail — and no outbound call-home.",
    quote:
      "One control plane across our cloud and on-prem estate finally gave us a single map — and the air-gapped option satisfied our regulator from day one.",
    person: { name: "Representative", role: "Director of IT", initials: "RA" },
    metrics: [
      { value: "Air-gapped", label: "No call-home" },
      { value: "In-region", label: "AI / data residency" },
      { value: "1", label: "Unified control plane" },
    ],
  },
  {
    slug: "telco-operator",
    org: "a telecom operator (representative)",
    industry: "Telco & MSP",
    edition: "Enterprise Edition",
    imageAlt:
      "Telecom network operations center engineers facing a wall of network maps",
    headline: "Multi-tenant, white-label managed cloud",
    challenge:
      "An operator wanted to deliver governed, white-label managed cloud to enterprise customers but had no multi-tenant isolation or self-service catalog.",
    solution:
      "Enterprise Edition delivered per-tenant isolation, a governed provisioning catalog, and ITSM handoff — with the separate Partner Portal for white-label resale.",
    quote:
      "Bundled observability and ITSM in the same platform as our inventory removed two separate contracts and a stack of integrations we used to maintain.",
    person: { name: "Representative", role: "VP Cloud Products", initials: "RB" },
    metrics: [
      { value: "Multi-tenant", label: "Per-tenant isolation" },
      { value: "6", label: "Public clouds + on-prem" },
      { value: "White-label", label: "Partner resale" },
    ],
  },
  {
    slug: "regulated-enterprise",
    org: "a regulated enterprise (representative)",
    industry: "BFSI",
    edition: "Enterprise Edition",
    imageAlt:
      "Enterprise finance and IT team reviewing cloud dashboards in a modern office",
    challenge:
      "A regulated enterprise ran AWS, Azure and on-prem in separate tools, with fragmented identity and no single audit trail for evidence.",
    solution:
      "Enterprise Edition federated identity across 9+ IdPs, unified the estate in one inventory, and bundled observability and ITSM with a full audit trail.",
    headline: "Every cloud, governed and audited",
    quote:
      "Whale AI sits inside every module, so sizing a resource or assessing a migration happens right where we work — not in a separate tool.",
    person: { name: "Representative", role: "Chief Technology Officer", initials: "RC" },
    metrics: [
      { value: "9+", label: "IdP adapters federated" },
      { value: "Bundled", label: "Observability + ITSM" },
      { value: "Audit trail", label: "Every action" },
    ],
  },
];
