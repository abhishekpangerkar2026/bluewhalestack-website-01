/**
 * /about — every section's copy as the code ships it: the fallback for the
 * CMS "About page" document and what the seed script loads into it.
 * Offices, SaaS regions and compliance chips come from the site settings.
 */
import type { AboutPage } from "@/content/cms/docs/aboutPage";
import { headlineStats } from "@/content/company";
import {
  aboutHero, companyFacts, missionVision, story, principles, milestones, productFamily, services, servicesNote, trustPoints,
} from "@/content/about";

export const aboutPage: AboutPage = {
  seoTitle: "About Us",
  seoDescription: aboutHero.mission,
  hero: {
    primary: { label: "Talk to the team", href: "/contact?intent=demo" },
    secondary: { label: "Meet the leadership", href: "/about/leadership" },
  },
  facts: companyFacts.map((x) => ({ ...x })),
  story: {
    eyebrow: "Our story",
    title: "Cloud got complex.",
    titleAccent: "We built the answer.",
    items: story.map((s) => ({ title: s.heading, body: s.body })),
  },
  missionVision: {
    missionKicker: "Our mission",
    mission: missionVision.mission,
    visionKicker: "Our vision",
    vision: missionVision.vision,
  },
  principles: {
    heading: {
      eyebrow: "What we stand for",
      title: "Four design principles",
      description: "Each one is a property you can check in the product — not a value statement.",
    },
    items: principles.map((p) => ({ ...p })),
  },
  journey: {
    heading: {
      eyebrow: "Our journey",
      title: "2018 to today",
      description: "Founded as a consultancy, productised in 2026, now sold and delivered through partners in three markets.",
    },
    items: milestones.map((m) => ({ ...m })),
  },
  products: {
    heading: {
      eyebrow: "Product offerings",
      title: "The platform and what ships inside it",
      description: "One control plane across public, private, virtualization, hybrid and edge — and the families, engines and initiatives built on it.",
    },
    cta: { label: "Explore the platform", href: "/platform" },
    items: productFamily.map((p) => ({ name: p.name, badge: p.badge, href: p.href, iso: p.iso, body: p.body })),
    cardLink: "Learn more",
  },
  services: {
    heading: {
      eyebrow: "Service offerings",
      title: "Consulting and implementation — with or without the platform",
      description: "The practices the company was founded on in 2018, delivered globally — and the field experience the platform is built from.",
    },
    items: services.map((s) => ({ iso: s.iso, name: s.name, body: s.body })),
    note: servicesNote,
  },
  record: {
    kicker: "On the record",
    entities: { value: "3 entities", label: "Pvt Ltd (Mumbai, CIN U74999MH2018PTC306172) · FZE LLC (Ajman) · Inc (Delaware)" },
    certifications: { value: "5 ISO certifications", label: "27001 · 27017 · 27018 · 27701 · 22301 — independently audited, certificates downloadable" },
    regionsLabel: "SaaS regions",
    capabilities: { value: `${headlineStats[0].value} capabilities`, label: "In nine families across four editions" },
  },
  presence: {
    heading: {
      eyebrow: "Global presence",
      title: "Where we are",
      description: "Headquartered in India, with offices in the UAE and the United States — serving customers across the globe.",
    },
  },
  leadership: {
    heading: {
      eyebrow: "Leadership",
      title: "The team behind the platform",
      description: "Founder-led, with product, delivery and go-to-market leadership across Mumbai, Ajman and Wilmington.",
    },
    cta: { label: "Meet the full team", href: "/about/leadership" },
  },
  trust: {
    heading: {
      eyebrow: "Certifications & trust",
      title: "What is certified, and what is assessed",
      description: "Five ISO management-system certifications audited by accredited bodies, plus three assessments — stated exactly as the certification bodies allow.",
    },
    points: [...trustPoints],
    complianceLabel: "Compliance frameworks",
    hiringTitle: "Join us",
    hiringBody: "We're hiring across engineering, product and go-to-market.",
    hiringLink: { label: "See open roles →", href: "/careers" },
  },
  closing: {
    eyebrow: "Two doors",
    title: "Work with us, or work here.",
    body: "Customers and partners start with a working session on their own estate. Engineers, architects and go-to-market people start with the open roles across Mumbai, Ajman and Wilmington.",
    primary: {
      label: "Book a working session",
      href: "/contact?intent=demo",
      note: "45 minutes · a solutions engineer · one of your accounts connected read-only",
    },
    secondary: { label: "See open roles", href: "/careers", note: "Engineering, product, sales and delivery" },
    tertiary: { label: "Become a partner", href: "/partners", note: "three partner tracks" },
  },
};
