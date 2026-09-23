/**
 * /newsroom — every section's copy as the code ships it: the fallback for the
 * CMS "Newsroom page" document and what the seed script loads into it. The
 * announcements come from getPosts(); only the words around them live here.
 */
import type { NewsroomPage } from "@/content/cms/docs/newsroomPage";

export const newsroomPage: NewsroomPage = {
  seoTitle: "Newsroom",
  seoDescription:
    "Product launches, partnerships, and company milestones from BlueWhale Stack. Press enquiries: contact@bluewhalestack.com",
  hero: {
    primary: { label: "Contact press team", href: "/contact" },
    secondary: { label: "Trust Center", href: "/trust" },
  },
  announcements: {
    heading: {
      eyebrow: "Latest",
      title: "Announcements",
      description: "Recent product milestones, certifications and platform updates.",
    },
    readMoreLabel: "Read more",
  },
  press: {
    heading: {
      eyebrow: "Media",
      title: "Press & media contacts",
      description: "We aim to respond to press enquiries within one business day.",
    },
    contacts: [
      {
        type: "Press & media",
        email: "contact@bluewhalestack.com",
        note: "For interview requests, product briefings and press kit access.",
      },
      {
        type: "Partnerships",
        email: "partners@bluewhalestack.com",
        note: "Technology alliances, channel and reseller partnerships.",
      },
    ],
  },
  cta: {
    kicker: "See it live",
    title: "Ready to put every cloud on one control plane?",
    body: "Book a personalised demo and see BlueWhale Stack across your actual estate.",
    button: { label: "Book a demo", href: "/contact" },
  },
};
