/**
 * /platform — every section's copy as the code ships it: the fallback for the
 * CMS "Platform page" document and what the seed script loads into it.
 */
import type { PlatformPage, prototypeOffer as prototypeOfferSpec } from "@/content/cms/docs/platformPage";
import type { Infer } from "@/content/cms/spec";
import { compliance, estates } from "@/content/company";
import {
  platformHero, heroStats, whoItIsFor, whyNow, pillars, everydayMoments, designRule, architectureLayers,
  includedInEveryEdition, deploymentModes, deploymentNote, supportModel, whaleTiers, trustPillars, securityPosture,
  whatItReplaces, platformFaq, prototypeOffer,
} from "@/content/platform";

export const prototypeOfferContent: Infer<typeof prototypeOfferSpec.fields> = {
  eyebrow: prototypeOffer.eyebrow,
  title: prototypeOffer.title,
  description: prototypeOffer.description,
  steps: prototypeOffer.steps.map((s) => ({ title: s.title, body: s.body, when: s.when, icon: s.icon })),
  ctaTitle: prototypeOffer.cta.title,
  ctaBody: prototypeOffer.cta.body,
  ctaLabel: prototypeOffer.cta.label,
  ctaHref: prototypeOffer.cta.href,
};

export const platformPage: PlatformPage = {
  seoTitle: "Platform — Digital Experience Multi-Cloud Platform",
  seoDescription:
    "One Platform. Every Industry. Every Estate. BlueWhale Stack is one control plane for every cloud an organization runs — 54 capabilities in nine families, four editions on one architecture, six platform classes, five deployment modes.",
  hero: {
    tagline: platformHero.tagline,
    primary: { label: "Book the discovery workshop", href: "/contact?intent=demo", note: "Half a day · your technology and finance leads · success criteria agreed" },
    secondary: { label: "See the architecture", href: "#architecture" },
    stats: heroStats.map((s) => ({ ...s })),
    pageIndex: [
      { label: "What it replaces", href: "#replaces" },
      { label: "Architecture", href: "#architecture" },
      { label: "Capabilities", href: "#families" },
      { label: "Deployment", href: "#deployment" },
      { label: "90-day prototype", href: "#prototype" },
    ],
  },
  who: {
    heading: {
      eyebrow: "Who it is for",
      title: "Three kinds of estate. One platform.",
      description: "Enterprises, operators and governments consume governed services — each through its own edition of the same platform.",
    },
    cards: whoItIsFor.map((w) => ({ ...w })),
    cardLink: "See the edition",
    whyNowLabel: "Why now:",
    whyNow,
  },
  replaces: {
    heading: {
      eyebrow: "What it replaces",
      title: "Seven tool categories, one licence",
      description: "The consolidation arithmetic, tool by tool — with the honest status of each replacement, so you can plan which contracts retire this year and which next.",
    },
    columns: ["You run today", "In BlueWhale Stack", "Status"],
    rows: whatItReplaces.map((r) => ({ ...r })),
  },
  architecture: {
    heading: {
      eyebrow: "Platform architecture",
      title: "The architecture, top to bottom",
      description: "The platform in one picture — read top-down, the way value flows: from the industries served, through the Digital Experience Layer and the Unified Platform Core, down to the integrations, every estate, and the modes it deploys in.",
    },
    figureCaption: "The official 3D product architecture — the same six layers, as published in the Product Overview.",
    figureLink: "Open full size ↗",
    howToRead: "How to read the architecture",
    columns: ["Layer", "What it means for you"],
    layers: architectureLayers.map((l) => ({ ...l })),
  },
  families: {
    heading: {
      eyebrow: "The nine capability families",
      title: "What lives in the platform core",
      description: "Nine families under one console, one identity, one policy and one bill — 54 capabilities in all. Every family reads from and writes to the same inventory, identity and policy plane.",
    },
    note: "Full capability list (54 capabilities with edition mapping) available in the technical datasheet on request.",
    momentsTitle: "How the families work together — three everyday moments",
    moments: everydayMoments.map((m) => ({ ...m })),
    designRuleLabel: "The design rule behind all nine:",
    designRule,
  },
  controlPlane: {
    heading: {
      eyebrow: "Every estate — managed as one",
      title: "One control plane over six platform classes",
      description: "Public clouds, private and virtualization estates, hybrid and sovereign stacks — discovered, governed and billed as one, down to air-gapped and edge sites.",
    },
    estates: estates.map((e) => ({ icon: e.icon, title: e.title, items: [...e.items] })),
    note: "Vendor marks identify supported platforms; no partnership or endorsement is implied.",
  },
  pillars: {
    heading: {
      eyebrow: "Why BlueWhale Stack",
      title: "One platform, end to end",
      description: "Connect an estate once and everything — inventory, cost, observability, tickets, security, migration, evidence — flows into a single control plane the whole organisation works from.",
    },
    items: pillars.map((p) => ({ ...p })),
  },
  whaleAi: {
    kicker: "✦ Whale AI — incl. offline",
    title: "AI in every family — including inside the perimeter",
    body: "Whale AI is a horizontal layer across the whole platform — AI for operations, documentation and compliance, grounded in your live data, with 50+ ready use cases. Your choice of model, able to run fully offline inside the perimeter.",
    tiers: whaleTiers.map((t) => ({ ...t })),
    cta: { label: "Explore Whale AI", href: "/products/whale-ai" },
  },
  showcase: {
    heading: {
      eyebrow: "See the product",
      title: "The console, by job",
      description: "Cost, inventory and security posture — three of the screens teams live in. Every module page shows its own screen alongside how it works.",
    },
  },
  included: {
    heading: {
      eyebrow: "Editions",
      title: "Five things every edition includes",
      description: "Whatever the licence — Standard at $24,000 a year through Government — these five are always on, and moving up is a licence change on the same deployment.",
    },
    items: includedInEveryEdition.map((x) => ({ ...x })),
    cta: { label: "Compare the four editions", href: "/editions" },
  },
  deployment: {
    heading: {
      eyebrow: "Deployment",
      title: "The same product, wherever it must run",
      description: "Five deployment modes on one platform build — moving between them is an operational decision, not a re-implementation.",
    },
    modes: deploymentModes.map((d) => ({ ...d })),
    note: deploymentNote,
  },
  support: {
    heading: {
      eyebrow: "Support & service model",
      title: "Who runs it with you after go-live",
      description: "L1/L2 with you or your partner and L3 with BlueWhale, a 24×7 critical bridge at 99.9%, quarterly releases, and no forced upgrades on sovereign estates.",
    },
    items: supportModel.map((s) => ({ ...s })),
  },
  prototype: prototypeOfferContent,
  trust: {
    heading: {
      eyebrow: "Trust & Sovereignty",
      title: "Certified, and proven before commitment",
      description: "Built for regulated industries from the foundation up — independently certified management systems, and the compliance alignment engineered into the platform itself.",
    },
    pillars: trustPillars.map((t) => ({ ...t })),
    postureLabel: "Security posture",
    posture: [...securityPosture],
    complianceLabel: "Compliance frameworks",
    complianceNote: "Certified entity: BlueWhale Stack Consulting and Technologies FZE LLC. Certificates are verifiable through the Trust Center.",
    cta: { label: "Trust Center", href: "/trust" },
  },
  faq: {
    heading: {
      eyebrow: "Questions",
      title: "What buyers ask about the platform",
      description: "Permissions, deployment modes, what is GA and what is not, and where Whale AI sends your data.",
    },
    items: platformFaq.map((q) => ({ ...q })),
  },
  closing: {
    eyebrow: "Next step",
    title: "See the platform on one of your own accounts.",
    body: "A 45-minute working session with a solutions engineer: one cloud account connected read-only, the inventory, cost and audit screens on your real resources, and the export left with you. Bring your hardest audit finding.",
    primary: { label: "Book a working session", href: "/contact?intent=demo", note: "45 minutes · read-only credentials · nothing installed on your side" },
    secondary: { label: "Start the 90-day prototype", href: "#prototype", note: "Half-day discovery workshop, then 90 days on your estate with no licence cost." },
    tertiary: { label: "Compare the four editions", href: "/editions", note: "quotas, SLAs and prices side by side" },
  },
};

/** the compliance chips the platform page shows come from the site settings */
export { compliance as platformComplianceFallback };
