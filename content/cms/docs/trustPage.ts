import { defineDoc, f, type InferDoc } from "../spec";
import { cta, iconItem, qa, sectionHeading } from "../objects";

export const trustPageSpec = defineDoc(
  "trustPage",
  "Trust Center page",
  {
    seoTitle: f.str("Browser / search title", { group: "hero" }),
    seoDescription: f.text("Search description", { group: "hero" }),
    hero: f.obj("Hero extras", {
      primary: f.obj("Primary button", cta.fields),
      secondary: f.obj("Secondary button", cta.fields),
      tertiary: f.obj("Third button", cta.fields),
    }, { group: "hero" }),

    pillars: f.obj("Trust pillars", {
      items: f.arr("Pillars", iconItem, { max: 4 }),
    }, { group: "sections" }),

    certifications: f.obj("Certifications", {
      heading: f.obj("Heading", sectionHeading.fields),
    }, { group: "sections" }),

    matrix: f.obj("Deployment matrix", {
      heading: f.obj("Heading", sectionHeading.fields),
      columns: f.obj("Column labels", {
        certification: f.str("First column"),
        saas: f.str("SaaS column"),
        byoc: f.str("BYOC column"),
        sovereign: f.str("Sovereign column"),
      }),
    }, { group: "sections" }),

    faq: f.obj("FAQ", {
      heading: f.obj("Heading", sectionHeading.fields),
      items: f.arr("Questions", qa),
    }, { group: "sections" }),

    cta: f.obj("Closing band", {
      title: f.str("Title"),
      body: f.text("Body"),
      primary: f.obj("Primary button", cta.fields),
      secondary: f.obj("Secondary button", cta.fields),
    }, { group: "sections" }),
  },
  {
    singleton: true,
    groups: [
      { name: "hero", title: "Hero & SEO", default: true },
      { name: "sections", title: "Sections" },
    ],
    locations: [{ title: "Trust Center", href: "/trust" }],
  },
);

export type TrustPage = InferDoc<typeof trustPageSpec>;
