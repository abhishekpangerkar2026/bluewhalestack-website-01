/**
 * /solutions — every section's copy as the code ships it: the fallback for the
 * CMS "Solutions page" document and what the seed script loads into it. The
 * solution, industry, edition and customer-story cards come from their own
 * getters (lib/content.ts); only the words around them live here.
 */
import type { SolutionsPage } from "@/content/cms/docs/solutionsPage";

export const solutionsPage: SolutionsPage = {
  seoTitle: "Solutions",
  seoDescription:
    "Outcome-focused solutions, industry solutions for government, BFSI, healthcare, telco and datacenter operators, and the customer success stories and case studies behind them.",
  hero: {
    primary: { label: "See it on your estate", href: "/contact?intent=demo", note: "45 minutes · one of your accounts, connected read-only" },
    secondary: { label: "Read the case studies", href: "/case-studies" },
    pageIndex: [
      { label: "By outcome", href: "#outcomes" },
      { label: "By industry", href: "#industries" },
      { label: "Customer stories", href: "#customers" },
    ],
  },
  outcomes: {
    heading: {
      eyebrow: "By outcome",
      title: "Six solutions, one control plane",
      description: "Five are generally available today; Cloud Migration ships its assessment now and execution hooks next. Each links to its reference architecture, the modules it uses and the editions that include it.",
    },
    cardLink: "How it works",
  },
  industries: {
    heading: {
      eyebrow: "Industry solutions",
      title: "Packaged for your sector",
      description: "The same solutions, shaped to each industry's regime, workloads and edition — government, BFSI, healthcare, telco, datacenter, regulated enterprise and digital natives.",
    },
    cta: { label: "All industries", href: "/industries" },
    availableLabel: "Available",
    previewLabel: "Preview",
    editionSuffix: " Edition",
  },
  customers: {
    heading: {
      eyebrow: "Customer success stories",
      title: "Proven in regulated estates",
      description: "Delivered engagements across banking, government, telco and datacenter operators, and media — anonymized under confidentiality, real in every outcome.",
    },
    primary: { label: "All success stories", href: "/customers" },
    secondary: { label: "Case studies", href: "/case-studies" },
    readLabel: "Read the case study",
  },
  closing: {
    eyebrow: "Next step",
    title: "Bring your hardest problem to a working session.",
    body: "We connect one of your accounts read-only, map your estate to the solutions above, and walk the one that matters most on your real resources — before any commercial conversation.",
    primary: {
      label: "Book a working session",
      href: "/contact?intent=demo",
      note: "45 minutes · a solutions engineer, not a sales deck · nothing installed on your side",
    },
    secondary: {
      label: "Start the 90-day prototype",
      href: "/platform#prototype",
      note: "Half-day discovery workshop, then 90 days on your estate with no licence cost.",
    },
    tertiary: { label: "Compare the four editions", href: "/editions", note: "which edition includes which solution" },
  },
};
