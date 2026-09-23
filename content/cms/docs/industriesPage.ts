import { defineDoc, f, type InferDoc } from "../spec";
import { closingCta, cta, sectionHeading } from "../objects";

export const industriesPageSpec = defineDoc(
  "industriesPage",
  "Industries page",
  {
    seoTitle: f.str("Browser / search title", { group: "hero" }),
    seoDescription: f.text("Search description", { group: "hero" }),
    hero: f.obj("Hero extras", {
      eyebrowBefore: f.str("Kicker — before the sector count", { description: "The number of sectors is counted from the industries" }),
      eyebrowAfter: f.str("Kicker — after the sector count"),
    }, { group: "hero" }),

    sectors: f.obj("Sector grid", {
      featuredLabel: f.str("Featured card kicker"),
      exploreLabel: f.str("Featured card link label", { description: "The sector name follows it" }),
      previewSuffix: f.str("After the edition name on the preview badge", { description: "\" Edition preview\" → \"Telco & Datacenter Edition preview\" (keep the leading space)" }),
      learnMoreLabel: f.str("Card link label"),
    }, { group: "sections" }),

    architecture: f.obj("Reference architecture", {
      heading: f.obj("Heading", sectionHeading.fields),
    }, { group: "sections" }),

    sheets: f.obj("Sector architecture sheets", {
      heading: f.obj("Heading", sectionHeading.fields),
      referenceLabel: f.str("Card top label"),
      controlPlaneLabel: f.str("Card bottom label"),
      openLabel: f.str("Card link label"),
      yourSector: f.obj("Your sector card", {
        kicker: f.str("Kicker"),
        title: f.str("Title"),
        body: f.text("Body"),
        cta: f.obj("Link", cta.fields),
      }),
    }, { group: "sections" }),

    closing: f.obj("Closing call to action", closingCta.fields, { group: "sections" }),
  },
  {
    singleton: true,
    groups: [
      { name: "hero", title: "Hero & SEO", default: true },
      { name: "sections", title: "Sections" },
    ],
    locations: [{ title: "Industries", href: "/industries" }],
  },
);

export type IndustriesPage = InferDoc<typeof industriesPageSpec>;
