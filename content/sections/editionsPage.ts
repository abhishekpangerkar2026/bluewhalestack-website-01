/**
 * /editions — every section's copy as the code ships it: the fallback for the
 * CMS "Editions page" document and what the seed script loads into it. The
 * editions themselves come from getEditions().
 */
import type { EditionsPage } from "@/content/cms/docs/editionsPage";

export const editionsPage: EditionsPage = {
  seoTitle: "Editions",
  seoDescription:
    "Compare BlueWhale Stack editions — Standard, Enterprise, Telco & Datacenter, and Government — with a module-by-edition matrix.",
  hero: {
    note: "Choosing in one question: do you consume cloud (Standard), govern it at scale (Enterprise), sell it to tenants (Telco & Datacenter) — or must it never leave the perimeter (Government)?",
  },
  cards: {
    previewLabel: "Preview",
    featuredLabel: "Most deployed",
    audienceLabel: "Who it targets",
    includesLabel: "What it includes",
    outcomeLabel: "The outcome",
    deployLabel: "Deploy",
    priceLabel: "Price",
    exploreLabel: "Explore",
  },
  compare: {
    heading: {
      eyebrow: "Compare",
      title: "Modules by edition",
      description:
        "Fourteen modules across four editions. Standard carries eight, Enterprise twelve, and the operator and government editions add Tenancy & Monetization and Sovereign Operations respectively.",
    },
    moduleColumn: "Module",
  },
  closing: {
    eyebrow: "Not sure which edition?",
    title: "Send your account and resource counts; the edition falls out of the numbers.",
    body: "Cloud accounts, discovered resources, on-prem sites and the deployment mode you need decide the edition. A written proposal comes back within the week — or start with the 90-day prototype and decide on evidence.",
    primary: {
      label: "Get a proposal for your estate",
      href: "/contact?intent=sales",
      note: "Account and resource counts in, a written proposal out — usually within a week",
    },
    secondary: {
      label: "Start the 90-day prototype",
      href: "/platform#prototype",
      note: "Half-day discovery workshop, then 90 days on your estate with no licence cost.",
    },
    tertiary: { label: "Published pricing", href: "/pricing", note: "quotas, terms and FAQ" },
  },
};
