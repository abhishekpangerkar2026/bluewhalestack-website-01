/** Home page content blocks. */

export const hero = {
  badge: "Hyperscaler-neutral cloud management",
  title: "Every cloud. One control plane.",
  highlight: "One control plane",
  description:
    "BlueWhale Stack unifies inventory, AI-native provisioning, bundled observability, migration and governance across public cloud, on-prem and hybrid — one control plane, with BYOC and sovereign options.",
  primaryCta: { label: "Book a Demo", href: "/contact" },
  secondaryCta: { label: "Explore the Platform", href: "/platform" },
};

/**
 * Hero carousel slides — the headline highlight, blurb, and right-side visual
 * rotate together (auto-advancing, with a clickable slide bar). Each `visual`
 * key maps to a panel in components/sections/Hero.tsx.
 */
export const heroSlides = [
  {
    key: "console",
    tab: "Unified console",
    headlinePre: "Every cloud. ",
    highlight: "One control plane.",
    blurb:
      "Unified inventory, AI-native provisioning, bundled observability, migration and governance across public cloud, on-prem and hybrid — in one place.",
    visual: "console",
  },
  {
    key: "editions",
    tab: "Editions",
    headlinePre: "One platform, ",
    highlight: "five editions",
    blurb:
      "Community, Standard, Enterprise, Enterprise Plus and Sovereign — the same platform, shaped to exactly how you operate.",
    visual: "editions",
  },
  {
    key: "industries",
    tab: "Industries",
    headlinePre: "Built for ",
    highlight: "regulated estates",
    blurb:
      "Government, Telco & MSP, BFSI, Healthcare and regulated enterprise — with the governance, residency and audit each sector demands.",
    visual: "industries",
  },
  {
    key: "approach",
    tab: "Approach",
    headlinePre: "Public, on-prem, hybrid — or ",
    highlight: "fully sovereign",
    blurb:
      "Deploy as multi-tenant SaaS, in your own cloud with BYOC, or fully air-gapped in-country with in-region AI. No lock-in.",
    visual: "approach",
  },
];

export const problems = [
  {
    icon: "Network",
    title: "Cloud sprawl",
    body: "Teams run AWS, Azure, GCP, Oracle and on-prem in separate consoles. Nobody has one map of the estate.",
  },
  {
    icon: "TrendingUp",
    title: "Tool stitching",
    body: "A CMP here, a monitoring contract there, an IaC tool, a migration suite — each with its own identity, data and audit.",
  },
  {
    icon: "ShieldAlert",
    title: "Sovereignty & audit drag",
    body: "Regulators want to know where data lives and who can touch it — across disconnected, region-specific tooling.",
  },
];

export const promise = {
  title: "Every cloud, governed from one control plane.",
  body: "BlueWhale Stack unifies inventory, provisioning, ITSM, observability, migration and governance into one hyperscaler-neutral platform — so you can see everything, govern centrally, and run it as SaaS, BYOC or fully sovereign.",
};

/** Capability tiles shown on Home — map to module slugs. */
export const capabilities = [
  {
    moduleSlug: "cloud-connectors",
    badge: "6 public clouds + on-prem",
    title: "Unified Multi-Cloud Control",
    body: "One control plane over AWS, Azure, GCP, Oracle, IBM and Alibaba — plus on-prem via the Edge Agent.",
  },
  {
    moduleSlug: "inventory",
    badge: "GA",
    title: "Inventory & Discovery",
    body: "Every asset across cloud, on-prem and hybrid, grouped by workload, with PDF / Excel / CSV reports.",
  },
  {
    moduleSlug: "provisioning",
    badge: "AWS live",
    title: "AI-Native Provisioning",
    body: "Provision approved resources without consoles — AWS live (EC2/S3/RDS/VPC/EFS), with Whale AI sizing.",
  },
  {
    moduleSlug: "observe",
    badge: "Bundled",
    title: "Observability, Bundled",
    body: "Logs, metrics, traces and SLOs with burn-rate alerts — no separate Datadog contract.",
  },
  {
    moduleSlug: "migration",
    badge: "6R assessment",
    title: "Cloud Migration",
    body: "Auto-classify on-prem workloads and run a 6R assessment with cost, effort and blocker analysis.",
  },
  {
    moduleSlug: "whale-ai",
    badge: "40+ use cases",
    title: "Whale AI",
    body: "A horizontal AI layer powered by Anthropic Claude across every module — Spark, Tide and Abyss tiers.",
  },
];

/** Why-BlueWhale differentiators — the four reasons teams choose the platform. */
export const whyBluewhale = {
  eyebrow: "Why BlueWhale Stack",
  title: "One platform where others sell you four",
  description:
    "Most teams stitch together a CMP, a monitoring tool, an IaC tool, and a migration suite. BlueWhale Stack is one governed control plane — AI-native, hyperscaler-neutral, and ready for the most regulated environments on earth.",
  pillars: [
    {
      icon: "Boxes",
      title: "Unified, not stitched",
      body: "Inventory, provisioning, ITSM, observability and migration share one identity model, one audit trail, and one data tier — so nothing falls between tools.",
    },
    {
      icon: "Sparkles",
      title: "AI-native, not bolted on",
      body: "Whale AI runs across every module in tiers — Spark, Tide, Abyss — with 40+ use cases, answering questions and drafting work where it already happens. Powered by Anthropic Claude.",
    },
    {
      icon: "Cloud",
      title: "Hyperscaler-neutral",
      body: "Six public clouds — AWS, Azure, GCP, Oracle, IBM, Alibaba — plus on-prem and hybrid under one pane of glass. No single-vendor lock-in.",
    },
    {
      icon: "ShieldCheck",
      title: "Sovereign-ready",
      body: "SaaS, BYOC, or fully air-gapped with in-region AI models and provable data residency — built for governments, banks and defense.",
    },
  ],
};

export const howItWorks = [
  {
    step: "01",
    title: "Connect & Discover",
    body: "Connect six public clouds plus on-prem via the Edge Agent over outbound-only HTTPS. Auto-discover every asset, grouped by workload.",
  },
  {
    step: "02",
    title: "Govern & Secure",
    body: "Federate your IdP, apply role-based access, and govern the whole estate centrally — with a full audit trail across every environment.",
  },
  {
    step: "03",
    title: "Provision & Migrate",
    body: "Provision approved resources without consoles (AWS live), and assess on-prem workloads for migration with a 6R analysis and Whale AI guidance.",
  },
  {
    step: "04",
    title: "Observe & Scale",
    body: "Bundled observability gives you logs, metrics, traces and SLOs — run it as SaaS, BYOC or fully sovereign as you scale.",
  },
];

export const testimonials = [
  {
    quote:
      "One control plane across our cloud and on-prem estate finally gave us a single map — and the air-gapped option meant our regulator was satisfied from day one.",
    name: "Representative",
    role: "Director of IT, public-sector agency",
    edition: "Sovereign Edition",
    initials: "RA",
  },
  {
    quote:
      "Bundled observability and ITSM in the same platform as our inventory removed two separate contracts and a stack of integrations we used to maintain.",
    name: "Representative",
    role: "Head of Cloud Operations, regulated enterprise",
    edition: "Enterprise Edition",
    initials: "RB",
  },
  {
    quote:
      "Whale AI sits inside every module, so sizing a resource or assessing a migration happens right where we work — not in a separate tool.",
    name: "Representative",
    role: "Platform Engineering Lead, telco",
    edition: "Enterprise Edition",
    initials: "RC",
  },
];

export const ctaSection = {
  title: "Ready to govern every cloud from one control plane?",
  subtitle: "Talk to a solutions architect today — no commitment.",
  primaryCta: { label: "Book a Demo", href: "/contact?intent=demo" },
  secondaryCta: { label: "Contact Sales", href: "/contact?intent=sales" },
};
