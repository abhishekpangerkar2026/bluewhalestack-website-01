/**
 * BlueWhale Stack Fabric — the national datacenter fabric.
 * India's datacenter capacity, unified on one platform and sold to
 * Indian customers as a single sovereign cloud. Runs on the Telco &
 * Datacenter and Government editions (see content/editions.ts).
 *
 * Operator tiers are described generically (counts, not names) —
 * the source material names specific candidate operators under an
 * explicit "no partnership, agreement or endorsement exists or is
 * implied" disclaimer, so real company names are deliberately left
 * out of this public-facing copy pending confirmation.
 */

export const fabricHero = {
  eyebrow: "BlueWhale Stack Fabric",
  title: "All of India's datacenters. One fabric.",
  description:
    "India's datacenter capacity — 39 operators, 132 facilities, all three tiers — unified on one platform and consumed by every kind of Indian customer as a single sovereign cloud: one catalog, one identity, one bill. Public cloud stays at the edge; the fabric's core is India.",
};

export const fabricStats: { value: string; label: string }[] = [
  { value: "39", label: "Datacenter operators" },
  { value: "132", label: "Facilities, all three tiers" },
  { value: "84", label: "More facilities under construction" },
  { value: "1.7 GW", label: "National capacity, headed there" },
];

export const fabricProblems: { title: string; body: string }[] = [
  {
    title: "One-operator concentration risk",
    body: "Committing an estate to a single facility or provider recreates, domestically, the lock-in the buyer left the hyperscaler to escape — and concentrates DR, commercial and capacity risk in one counterparty.",
  },
  {
    title: "Multi-operator chaos",
    body: "Splitting across providers restores leverage but multiplies everything else: separate portals, identity, billing and compliance postures, with no unified view of what runs where.",
  },
  {
    title: "Capacity asymmetry",
    body: "Specialized capacity — GPU estates, sovereign zones, edge locations — is unevenly distributed across operators. The buyer's ideal footprint rarely lives inside one provider's map.",
  },
  {
    title: "Sovereignty with fragmentation",
    body: "Data residency is satisfiable in-country — but proving uniform governance across two or three independent operators, to one examiner, remains the buyer's manual burden.",
  },
];

export const fabricTiers: { name: string; label: string; body: string }[] = [
  {
    name: "Tier 1",
    label: "Hyperscale anchors · ~10 operators",
    body: "Hyperscale campuses, GPU estates, national scale — the fabric's capacity backbone.",
  },
  {
    name: "Tier 2",
    label: "National & regional · ~10 operators",
    body: "Breadth of regions, sovereign classes and enterprise heritage — the fabric's coverage layer.",
  },
  {
    name: "Tier 3",
    label: "The long tail · 20+ operators",
    body: "Regional and Tier-2/3-city facilities across India — the fabric supplies platform and national reach the day they join.",
  },
];

export const fabricStakeholders: {
  icon: string;
  title: string;
  points: string[];
}[] = [
  {
    icon: "Users",
    title: "End customers",
    points: [
      "Choice with governance — region, price, compliance, GPU class across all three tiers, one console, one bill",
      "Sovereign DR by construction — primary and recovery in different operators",
      "No lock-in — re-placement is a policy change, not a project",
    ],
  },
  {
    icon: "Building2",
    title: "Industry — the verticals",
    points: [
      "Native cloud, made in India — compute, storage, K8s, GPU, backup, DR consumed in-country",
      "Industry catalogs — BFSI, government, manufacturing, healthcare patterns with compliance inherited",
      "DPDP by default — residency and audit enforced as fabric policy",
    ],
  },
  {
    icon: "Server",
    title: "Datacenter operators",
    points: [
      "A demand channel, not a competitor — governed workloads routed into operator capacity",
      "A service catalog overnight — tenancy, metering and billing arrive with the fabric",
      "National reach for the long tail — a Tier 3 facility sells nationally the day it joins",
    ],
  },
  {
    icon: "Cloud",
    title: "Hyperscalers & public cloud",
    points: [
      "A governed on-ramp — burst, PaaS and global services at the fabric's edge, same identity, policy and bill",
      "Qualified demand — workloads needing hyperscale arrive governed, not shadow-IT",
      "Hybrid without chaos — one operating model spans the fabric core and the public-cloud edge",
    ],
  },
];

export const fabricRevenueStreams: {
  name: string;
  body: string;
  character: string;
}[] = [
  {
    name: "Fabric platform fee",
    body: "Per-customer platform subscription for the fabric plane — catalog, placement, governance, Whalenomics, audit.",
    character: "Recurring · core",
  },
  {
    name: "Capacity margin",
    body: "Managed pass-through on federated operator capacity — transparent to the customer, negotiated at wholesale with operators.",
    character: "Recurring · volume",
  },
  {
    name: "Managed services on the fabric",
    body: "Operations, security and compliance services per customer estate.",
    character: "Recurring attach",
  },
  {
    name: "Migration & onboarding",
    body: "The Migration Engine industrializes entry to the fabric — every onboarding is a services event.",
    character: "Per-project",
  },
  {
    name: "BlueWhale-native cloud services",
    body: "Native compute, storage, K8s, GPU-as-a-service, backup and DR run by BlueWhale on fabric capacity.",
    character: "Recurring · strategic",
  },
  {
    name: "Marketplace & operator catalogs",
    body: "Every operator builds and publishes its own catalog to industry; ISVs list; partners resell.",
    character: "Ecosystem · scaling",
  },
];

export const fabricPhases: { name: string; timeframe: string; body: string }[] = [
  {
    name: "Anchor",
    timeframe: "Months 1–3",
    body: "Fabric plane live; first two operator federations signed and integrated; catalog v1 (compute + GPU + sovereign classes); two lighthouse customers placed.",
  },
  {
    name: "Prove",
    timeframe: "Months 3–6",
    body: "Cross-operator DR scenario in production; Whalenomics pass-through billing verified end-to-end; partner resale motion opened; fabric brand launched to Indian customers.",
  },
  {
    name: "Scale",
    timeframe: "Months 6–12",
    body: "Tier 2 operators federated; BlueWhale-native cloud services launched; government/PSU pursuits on sovereign classes; ISV and operator catalog listings begin.",
  },
  {
    name: "Institutionalize",
    timeframe: "Year 2",
    body: "Tier 3 long tail onboarded at scale; the fabric becomes the default way India buys Indian capacity; the operator roster and catalog expand on pull, not push.",
  },
];

export const fabricAtAGlance: { label: string; value: string }[] = [
  { label: "Model", value: "Platform fee + transparent capacity pass-through" },
  { label: "Supply", value: "39 operators · 132 facilities · 3 tiers" },
  { label: "Sovereignty", value: "In-India · DPDP-aligned · air-gap capable" },
  { label: "Route", value: "Direct and via authorized partners" },
];

export const fabricGettingStarted: { step: string; body: string; duration: string }[] = [
  {
    step: "Fabric workshop",
    body: "Map the workload portfolio to fabric policies — residency, latency, compliance, capability — and identify the first placement wave.",
    duration: "One week",
  },
  {
    step: "Pilot on the fabric",
    body: "A 90-day pilot: two workloads placed across two operator regions under one console — including one DR scenario — at no platform-licence cost.",
    duration: "90 days",
  },
  {
    step: "Evaluation on evidence",
    body: "Placement, governance, cost and audit results reviewed against the single-operator and hyperscaler alternatives.",
    duration: "Day-90 review",
  },
];
