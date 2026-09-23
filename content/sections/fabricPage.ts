/**
 * /fabric — every section's copy as the code ships it: the fallback for the
 * CMS "Fabric page" document and what the seed script loads into it. Built
 * from content/fabric.ts plus the literals that were inline in the page; the
 * hero headline itself stays in the page (fabricHero) under the Page hero
 * document.
 */
import type { FabricPage } from "@/content/cms/docs/fabricPage";
import {
  fabricStats,
  fabricStatsNote,
  fabricProblems,
  fabricTiers,
  fabricStakeholders,
  fabricRevenueStreams,
  fabricPhases,
  fabricAtAGlance,
  fabricGettingStarted,
  fabricMarkets,
} from "@/content/fabric";

export const fabricPage: FabricPage = {
  seoTitle: "BlueWhale Stack Fabric",
  seoDescription:
    "A market's datacenter capacity — every operator, every tier — unified on one platform and consumed as a single sovereign cloud. One catalog, one identity, one bill. Launching in India, built for every country.",
  hero: {
    eyebrowSuffix: "Strategic initiative · launching in India",
    previewLabel: "Preview",
    primary: { label: "Request a fabric workshop", href: "/contact?intent=demo" },
    secondary: { label: "Runs on Telco & Datacenter Edition", href: "/editions/telco-datacenter" },
    stats: fabricStats.map((s) => ({ ...s })),
  },
  problem: {
    heading: {
      eyebrow: "Why now",
      title: "Strong datacenters, fragmented consumption",
      description:
        "Every growing market builds world-class datacenter capacity fast — but for the buyer, it arrives fragmented: every operator is its own island, with its own portal, contract, billing and compliance posture.",
    },
    items: fabricProblems.map((p) => ({ ...p })),
  },
  architecture: {
    heading: {
      eyebrow: "Reference architecture",
      title: "One catalog. One identity. Placement by policy.",
      description:
        "A workload enters the fabric with a policy — residency zone, latency bound, compliance class, price ceiling, GPU class — and the platform places it on qualifying capacity, meters it per customer, and governs it identically wherever it lands.",
    },
  },
  supply: {
    heading: {
      eyebrow: "The supply",
      title: "Every operator, every tier — federated per market",
      description:
        "In any market the datacenter sector sorts into three tiers. The fabric federates all three, so the buyer's policy can land on hyperscale, national or regional capacity — and move between them.",
    },
    tiers: fabricTiers.map((t) => ({ ...t })),
    note: "Tier structure is illustrative; specific operator names, agreements and federations are confirmed individually per market and are not implied here.",
  },
  markets: {
    heading: {
      eyebrow: "Where the fabric runs",
      title: "Launching in India. Built for every market.",
      description:
        "The fabric plane is the same everywhere — what changes per market is the operator roster, the residency regime and the sovereign classes. India is the launch market; the Gulf and the United States follow from BlueWhale's own entities there.",
    },
    items: fabricMarkets.map((m) => ({
      name: m.name,
      status: m.status,
      body: m.body,
      stats: m.stats?.map((s) => ({ ...s })),
    })),
    note: fabricStatsNote,
  },
  stakeholders: {
    heading: {
      eyebrow: "Value, by stakeholder",
      title: "Who gains what — four parties, one fabric",
      description: "The fabric only works if every party is better inside it than outside it.",
    },
    items: fabricStakeholders.map((s) => ({ icon: s.icon, title: s.title, points: [...s.points] })),
  },
  revenue: {
    heading: {
      eyebrow: "Commercial model",
      title: "Six revenue streams, none requiring new construction",
      description: "All metered, governed and billable from the phase that launches them — on capacity operators already own.",
    },
    streams: fabricRevenueStreams.map((r) => ({ ...r })),
  },
  phases: {
    heading: {
      eyebrow: "Phased delivery",
      title: "From anchor to institutionalized, in four phases",
      description:
        "Each phase has a month range and an exit criterion; the fabric expands on customer pull, with operators joining as demand for their tier appears.",
    },
    items: fabricPhases.map((p) => ({ ...p })),
  },
  glance: {
    heading: {
      eyebrow: "At a glance",
      title: "The fabric, summarized",
      description:
        "The facts a board or a regulator asks for first — what it is, who operates it, where it launches and how it is consumed.",
    },
    rows: fabricAtAGlance.map((r) => ({ ...r })),
  },
  gettingStarted: {
    kicker: "Getting started",
    steps: fabricGettingStarted.map((s) => ({ ...s })),
  },
  closing: {
    eyebrow: "No market needs another datacenter",
    title: "It needs a fabric that lets buyers pick a policy.",
    body: "The fabric workshop takes one week: your market's operator roster, residency regime and sovereign classes mapped onto the fabric plane, and a 90-day pilot scoped — two workloads, two operator regions, one DR scenario, no platform-licence cost.",
    primary: {
      label: "Request a fabric workshop",
      href: "/contact?intent=demo",
      note: "One week · operators, regulators and anchor buyers in the room · pilot scoped at the end",
    },
    secondary: {
      label: "Telco & Datacenter Edition",
      href: "/editions/telco-datacenter",
      note: "The operator edition the fabric runs on — preview, GA Q4 2026.",
    },
    tertiary: { label: "For datacenter operators", href: "/industries/datacenter", note: "DCIM beside the cloud estate" },
  },
};
