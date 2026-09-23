/**
 * /industries — every section's copy as the code ships it: the fallback for
 * the CMS "Industries page" document and what the seed script loads into it.
 * The sector cards come from getIndustries()/getEditions() and the poster
 * gallery from content/industryPosters.ts; only the words around them live here.
 */
import type { IndustriesPage } from "@/content/cms/docs/industriesPage";

export const industriesPage: IndustriesPage = {
  seoTitle: "Industries",
  seoDescription:
    "Purpose-built cloud management for Government, BFSI, Healthcare, Regulated Enterprise, SaaS & Digital Native, Telco & MSP, and Datacenter & Colocation.",
  hero: {
    eyebrowBefore: "Industry solutions · ",
    eyebrowAfter: " sectors, one control plane",
  },
  sectors: {
    featuredLabel: "Featured sector",
    exploreLabel: "Explore",
    previewSuffix: " Edition preview",
    learnMoreLabel: "Learn more",
  },
  architecture: {
    heading: {
      eyebrow: "Reference architecture",
      title: "One control plane. Every industry.",
      description: "Seven sectors, seven different regulatory realities — solved by the same shared control plane, and delivered back out as a compliant, audited, in-region outcome for each one.",
    },
  },
  sheets: {
    heading: {
      eyebrow: "Sector architecture sheets",
      title: "Five sectors, drawn on the same seven layers.",
      description: "Each sheet is the same platform read for one sector: the consoles its people use, the Digital Experience Layer, the nine-module core with the modules that lead marked in gold, the systems it plugs into, the estates it governs, the seven-step request flow, and the deployment modes that fit. Open one to read every label full screen.",
    },
    referenceLabel: "Reference architecture",
    controlPlaneLabel: "One control plane",
    openLabel: "Open the sheet",
    yourSector: {
      kicker: "Your sector",
      title: "Healthcare, SaaS, manufacturing, utilities — the sheet is drawn per engagement.",
      body: "Tell us the regulators and frameworks you answer to and the estates you run. We return the same seven-layer sheet for your sector with the control mapping alongside it, before any commercial conversation.",
      cta: { label: "Request your sector sheet", href: "/contact?intent=resource" },
    },
  },
  closing: {
    eyebrow: "Don't see your sector?",
    title: "Every sector runs the same control plane; the regime mapping is what changes.",
    body: "Manufacturing, utilities, education, media — tell us the regulators and frameworks you answer to and we come back with the control mapping and the edition that fits, before any commercial conversation.",
    primary: {
      label: "Request a control mapping for your sector",
      href: "/contact?intent=resource",
      note: "Name your regimes; we map each obligation to a platform control",
    },
    secondary: {
      label: "Book a working session",
      href: "/contact?intent=demo",
      note: "45 minutes · one of your accounts connected read-only",
    },
    tertiary: { label: "Read the case studies", href: "/case-studies", note: "banking, government, operators, media" },
  },
};
