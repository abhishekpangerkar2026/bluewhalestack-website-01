/**
 * /careers — every section's copy as the code ships it: the fallback for the
 * CMS "Careers page" document and what the seed script loads into it. The
 * open roles are the "Job opening" documents; the careers@ address comes
 * from the site settings.
 */
import type { CareersPage } from "@/content/cms/docs/careersPage";
import { perks } from "@/content/careers";

export const careersPage: CareersPage = {
  seoTitle: "Careers",
  seoDescription:
    "Build the future of cloud infrastructure with BlueWhale Stack. Open roles across engineering, product, sales and more.",
  hero: {
    primary: { label: "View open roles", href: "#roles" },
    secondary: { label: "Who you would work with", href: "/about/leadership" },
  },
  team: {
    title: "Meet the people you'd be building with",
    body: "Founder, product, delivery and go-to-market leads across Mumbai, Ajman and Wilmington.",
    link: { label: "Leadership & team", href: "/about/leadership" },
  },
  perks: {
    heading: {
      eyebrow: "Life here",
      title: "Why you'll love working with us",
    },
    items: perks.map((p) => ({ ...p })),
  },
  roles: {
    heading: {
      eyebrow: "Open roles",
      title: "Find your role",
      description: "We hire across engineering, product, sales and operations — in India, the UAE, the United States, and remote.",
    },
    cvLead: "Don't see your role?",
    cvLinkLabel: "Send us your CV",
    cvTrail: "— we're always meeting great people.",
    applyLabel: "Apply",
  },
};
