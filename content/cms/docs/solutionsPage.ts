import { defineDoc, f, type InferDoc } from "../spec";
import { closingCta, cta, ctaPath, link, sectionHeading } from "../objects";

export const solutionsPageSpec = defineDoc(
  "solutionsPage",
  "Solutions page",
  {
    seoTitle: f.str("Browser / search title", { group: "hero" }),
    seoDescription: f.text("Search description", { group: "hero" }),
    hero: f.obj("Hero extras", {
      primary: f.obj("Primary button", ctaPath.fields),
      secondary: f.obj("Secondary button", cta.fields),
      pageIndex: f.arr("On-this-page links", link),
    }, { group: "hero" }),

    outcomes: f.obj("By outcome", {
      heading: f.obj("Heading", sectionHeading.fields),
      cardLink: f.str("Card link label"),
    }, { group: "sections" }),

    industries: f.obj("Industry solutions", {
      heading: f.obj("Heading", sectionHeading.fields),
      cta: f.obj("Button", cta.fields),
      availableLabel: f.str("Badge — edition available"),
      previewLabel: f.str("Badge — edition in preview"),
      editionSuffix: f.str("After the edition name on the card", { description: "\" Edition\" → \"Enterprise Edition\" (keep the leading space)" }),
    }, { group: "sections" }),

    customers: f.obj("Customer success stories", {
      heading: f.obj("Heading", sectionHeading.fields),
      primary: f.obj("Primary button", cta.fields),
      secondary: f.obj("Secondary button", cta.fields),
      readLabel: f.str("Card link label"),
    }, { group: "sections" }),

    closing: f.obj("Closing call to action", closingCta.fields, { group: "sections" }),
  },
  {
    singleton: true,
    groups: [
      { name: "hero", title: "Hero & SEO", default: true },
      { name: "sections", title: "Sections" },
    ],
    locations: [{ title: "Solutions", href: "/solutions" }],
  },
);

export type SolutionsPage = InferDoc<typeof solutionsPageSpec>;
