/**
 * /about/leadership — every section's copy as the code ships it: the fallback
 * for the CMS "Leadership page" document and what the seed script loads into
 * it. The roster itself comes from the team members; offices from the site
 * settings.
 */
import type { LeadershipPage } from "@/content/cms/docs/leadershipPage";

export const leadershipPage: LeadershipPage = {
  seoTitle: "Leadership & Team",
  seoDescription:
    "Meet the team building the command center for every cloud — engineers, architects and product thinkers solving enterprise cloud management at scale.",
  hero: {
    kicker: "About · Leadership",
    title: "Founder-led, with delivery leaders who have run the estates we sell into.",
    description:
      "The leadership team combines the founder who started the consultancy in 2018, an 18-year product and platform engineering lead, and go-to-market and delivery leaders with decades in Gulf infrastructure, utilities, government and defence programmes. Based across Mumbai, Ajman and Wilmington.",
    primary: { label: "Join the team", href: "/careers" },
    secondary: { label: "Our story", href: "/about" },
  },
  roster: {
    heading: {
      eyebrow: "Meet the team",
      title: "Leadership",
      description: "The people setting direction for the platform, the product, and the company.",
    },
  },
  departments: {
    heading: {
      eyebrow: "How we're organised",
      title: "Four disciplines, one platform",
      description: "We build, ship, sell and support the platform as one team across India, the UAE and the United States.",
    },
    items: [
      {
        name: "Engineering",
        icon: "Code2",
        description:
          "Platform infrastructure, cloud connectors, the Whale AI engine, and the core control-plane services that power every edition.",
        focus: ["Core Platform", "Cloud Connectors", "Whale AI", "Security & Compliance"],
      },
      {
        name: "Product",
        icon: "Layers",
        description:
          "Module strategy, UX design, and the roadmap that keeps every edition growing from Standard to Government.",
        focus: ["Platform Strategy", "UX & Design", "Editions Roadmap", "Partner Integrations"],
      },
      {
        name: "Go-to-Market",
        icon: "Globe",
        description:
          "Sales, partnerships, and customer success — helping governments, telcos and enterprises get the most from the platform.",
        focus: ["Enterprise Sales", "Channel Partners", "Customer Success", "Solutions Engineering"],
      },
      {
        name: "Operations",
        icon: "ShieldCheck",
        description:
          "Trust, compliance, finance and business operations keeping the platform reliable and the company growing responsibly.",
        focus: ["Trust & Compliance", "Finance", "Legal", "People & Culture"],
      },
    ],
  },
  values: {
    heading: {
      eyebrow: "Operating values",
      title: "How we work, day to day",
      description: "The four principles on the About page are what we build; these are how the team operates while building it.",
    },
    items: [
      {
        icon: "Boxes",
        title: "Build for the whole estate",
        body: "We solve the hard problem — governing every cloud, on-prem and sovereign — not just one hyperscaler's happy path.",
      },
      {
        icon: "ShieldCheck",
        title: "Trust is earned, not claimed",
        body: "We hold ISO 27001 and completed a SOC 2 Type II readiness assessment. Our security posture is verifiable, not a marketing badge.",
      },
      {
        icon: "Sparkles",
        title: "Intelligence where work happens",
        body: "Whale AI runs inside every module. We embed intelligence into the workflow, not into a separate chat window.",
      },
      {
        icon: "MapPin",
        title: "Sovereign by design",
        body: "Air-gapped, in-region, and DPDP/GDPR-compliant from day one — because regulated customers can't retrofit these requirements.",
      },
    ],
  },
  presence: {
    heading: {
      eyebrow: "Where we are",
      title: "Global team, three hubs",
      description: "Headquartered in Mumbai, with offices in Ajman and Wilmington — serving customers across Asia-Pacific, the Middle East and the Americas.",
    },
  },
  hiring: {
    kicker: "We're hiring",
    title: "Build the platform that governs the world's clouds.",
    body: "Open roles across engineering, product, sales and operations — in India, the UAE, the United States, and remote.",
    primary: { label: "See open roles", href: "/careers" },
    secondary: { label: "Send your CV", href: "/contact" },
  },
};
