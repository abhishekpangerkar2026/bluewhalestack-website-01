/**
 * Landing page — the sections beyond the hero/story/portfolio the CMS
 * "Home page" document already carries, as the code ships them.
 */
import type { HomeExtras } from "@/content/cms/docs/homePage";
import { globalIntro, globalStats } from "@/content/global";
import { prototypeOfferContent } from "./platformPage";

export const homeExtras: HomeExtras = {
  proofSection: {
    kicker: "From delivered engagements · anonymized under confidentiality",
    link: { label: "The outcomes", href: "/case-studies" },
  },
  architectureSection: {
    heading: {
      eyebrow: "The architecture",
      title: "One platform, six layers — read top-down, the way value flows.",
      description: "Industries consume governed services through the Digital Experience Layer; nine capability families in the Unified Platform Core govern every estate underneath — in whichever mode it must run.",
    },
    cta: { label: "See the full architecture", href: "/platform#architecture" },
  },
  productSection: {
    heading: {
      eyebrow: "See the product",
      title: "One console. Every job.",
      description: "Cost, inventory and security posture — three of the screens teams live in. Every module page shows its own screen alongside how it works.",
    },
    link: { label: "Explore all modules", href: "/modules" },
    facts: [
      { icon: "Boxes", title: "Nine families, one inventory", body: "A cost anomaly, a finding and a ticket point at the same workload and owner." },
      { icon: "Sparkles", title: "Whale AI in every family", body: "50+ grounded use cases, including fully offline inside the perimeter." },
      { icon: "Server", title: "Six clouds, one datacenter floor", body: "Public cloud by API; VMware, Hyper-V and Nutanix by Edge Agent." },
      { icon: "ShieldCheck", title: "Sovereign by architecture", body: "SaaS, BYOC, on-premises or fully air-gapped — the same build, every mode." },
    ],
  },
  familiesSection: {
    heading: {
      eyebrow: "The nine capability families",
      title: "What lives in the platform core.",
      description: "Fifty-four capabilities under one console, one identity, one policy and one bill — every family reads from and writes to the same inventory, identity and policy plane.",
    },
    link: { label: "All fourteen modules", href: "/modules" },
  },
  spotlightSection: {
    heading: {
      eyebrow: "Delivered in the real world",
      title: "One estate, told in full.",
      description: "Anonymized under confidentiality; every figure is as briefed by BlueWhale Stack, not illustrative.",
    },
    link: { label: "All engagements", href: "/case-studies" },
    readLabel: "Read the full case study",
    allLabel: "All success stories",
  },
  editionsSection: {
    heading: {
      eyebrow: "Editions",
      title: "Four editions. One architecture.",
      description: "Standard and Enterprise carry published prices; the operator and government editions are shaped to the estate. An upgrade is a licence change, not a migration.",
    },
    link: { label: "Compare in full", href: "/editions" },
    featuredLabel: "Most deployed",
    availableLabel: "Available now",
    previewPrefix: "Preview · GA",
    exploreLabel: "Explore",
    fabricNote: "Telco & Datacenter Edition is also what BlueWhale Stack Fabric runs on — a market's datacenter capacity, every operator and tier, consumed as one sovereign cloud.",
    fabricLink: { label: "Explore the Fabric", href: "/fabric" },
  },
  prototype: prototypeOfferContent,
  global: {
    heading: { eyebrow: globalIntro.eyebrow, title: globalIntro.title, description: globalIntro.description },
    directoryLabel: "Region directory",
    locationsLabel: "locations",
    stats: globalStats.map((s) => ({ ...s })),
  },
  closing: {
    eyebrow: "Your next chapter",
    title: "We prove it on your estate, in ninety days, before any commercial conversation.",
    body: "Start with the discovery workshop — half a day with your technology and finance leaders. Bring your hardest audit finding and your least explainable cloud bill; we show what the platform does with both, on your estate's shape.",
    primary: { label: "Book the discovery workshop", href: "/contact?intent=demo", note: "Half a day · success criteria agreed with technology and finance" },
    secondary: { label: "The 90-day prototype", href: "/platform#prototype", note: "Full-featured on your own estate, no licence cost, scored on day 90." },
    tertiary: { label: "Published pricing", href: "/pricing", note: "Standard $24,000 · Enterprise $120,000 a year" },
  },
};
