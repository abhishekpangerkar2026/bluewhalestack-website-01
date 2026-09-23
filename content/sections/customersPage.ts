/**
 * /customers — every section's copy as the code ships it: the fallback for
 * the CMS "Customers page" document and what the seed script loads into it.
 * The stories come from getCustomerStories(); only the words around them live
 * here. Two numbers on the stats strip are counted by the page (stories,
 * markets), so only their labels are editable.
 */
import type { CustomersPage } from "@/content/cms/docs/customersPage";

export const customersPage: CustomersPage = {
  seoTitle: "Customer success stories",
  seoDescription:
    "Delivered BlueWhale Stack engagements across banking, government, telco and datacenter operators and media — anonymized under confidentiality, real in every outcome.",
  hero: {
    primary: { label: "Read the case studies", href: "/case-studies" },
    secondary: { label: "Talk to us about yours", href: "/contact?intent=demo" },
  },
  stats: {
    engagementsLabel: "Delivered engagements told here",
    sectors: { value: "4", label: "Sectors — BFSI, government, telco & DC, media" },
    marketsLabel: "Markets across Asia, the Gulf and Africa",
    editions: { value: "3", label: "Editions in production" },
  },
  markets: ["Singapore", "Qatar", "Saudi Arabia", "South Africa", "UAE", "India"],
  stories: {
    heading: {
      eyebrow: "The stories",
      title: "Four estates, four outcomes",
      description: "Each story links to its full case study — the situation, what BlueWhale Stack did, and the result.",
    },
    outcomeLabel: "Engagement outcome",
    readLabel: "Read the case study",
  },
  closing: {
    heading: {
      title: "Your estate is the next story.",
      description: "Bring your hardest audit finding and your least explainable cloud bill to a half-day discovery workshop — then a 90-day prototype on your own estate, before any licensing decision.",
    },
    cta: { label: "Book the discovery workshop", href: "/contact?intent=demo" },
  },
};
