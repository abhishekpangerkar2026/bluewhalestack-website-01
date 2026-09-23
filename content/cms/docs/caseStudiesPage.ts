import { defineDoc, f, type InferDoc } from "../spec";
import { cta } from "../objects";

export const caseStudiesPageSpec = defineDoc(
  "caseStudiesPage",
  "Case studies page",
  {
    seoTitle: f.str("Browser / search title", { group: "hero" }),
    seoDescription: f.text("Search description", { group: "hero" }),
    hero: f.obj("Hero extras", {
      primary: f.obj("Primary button", cta.fields),
      secondary: f.obj("Secondary button", cta.fields),
    }, { group: "hero" }),

    index: f.obj("Index", {
      eyebrow: f.str("Kicker"),
      titleAfterCount: f.str("Title, after the number of case studies", { description: "\" case studies\" → \"4 case studies\" (keep the leading space)" }),
      description: f.text("Description"),
      readLabel: f.str("Row link label"),
    }, { group: "sections" }),
  },
  {
    singleton: true,
    groups: [
      { name: "hero", title: "Hero & SEO", default: true },
      { name: "sections", title: "Sections" },
    ],
    locations: [{ title: "Case studies", href: "/case-studies" }],
  },
);

export type CaseStudiesPage = InferDoc<typeof caseStudiesPageSpec>;
