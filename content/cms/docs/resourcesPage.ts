import { defineDoc, f, type InferDoc } from "../spec";
import { closingCta, link, sectionHeading } from "../objects";

export const resourcesPageSpec = defineDoc(
  "resourcesPage",
  "Resources page",
  {
    seoTitle: f.str("Browser / search title", { group: "hero" }),
    seoDescription: f.text("Search description", { group: "hero" }),
    hero: f.obj("Hero extras", {
      chips: f.arr("Quick links under the hero", link),
    }, { group: "hero" }),

    collateral: f.obj("Official collateral", {
      heading: f.obj("Heading", sectionHeading.fields),
      downloadLabel: f.str("Download link label"),
    }, { group: "sections" }),

    library: f.obj("Library", {
      heading: f.obj("Heading", sectionHeading.fields),
    }, { group: "sections" }),

    closing: f.obj("Closing call to action", closingCta.fields, { group: "sections" }),
  },
  {
    singleton: true,
    groups: [
      { name: "hero", title: "Hero & SEO", default: true },
      { name: "sections", title: "Sections" },
    ],
    locations: [{ title: "Resources", href: "/resources" }],
  },
);

export type ResourcesPage = InferDoc<typeof resourcesPageSpec>;
