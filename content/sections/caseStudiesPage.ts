/**
 * /case-studies — every section's copy as the code ships it: the fallback for
 * the CMS "Case studies page" document and what the seed script loads into it.
 * The case studies themselves come from getCustomerStories().
 */
import type { CaseStudiesPage } from "@/content/cms/docs/caseStudiesPage";

export const caseStudiesPage: CaseStudiesPage = {
  seoTitle: "Case studies",
  seoDescription:
    "BlueWhale Stack case studies — the situation, what the platform did and the outcome, for banks, ministries, telco and datacenter operators and a global media network.",
  hero: {
    primary: { label: "Discuss a similar estate", href: "/contact?intent=demo" },
    secondary: { label: "Success stories overview", href: "/customers" },
  },
  index: {
    eyebrow: "Index",
    titleAfterCount: " case studies",
    description: "Anonymized under confidentiality; challenge, solution and outcome facts are as delivered.",
    readLabel: "Read",
  },
};
