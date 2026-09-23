import { defineDoc, f, type InferDoc } from "../spec";
import { closingCta, sectionHeading } from "../objects";

export const editionsPageSpec = defineDoc(
  "editionsPage",
  "Editions page",
  {
    seoTitle: f.str("Browser / search title", { group: "hero" }),
    seoDescription: f.text("Search description", { group: "hero" }),
    hero: f.obj("Hero extras", {
      note: f.text("Bold line under the description"),
    }, { group: "hero" }),

    cards: f.obj("Edition cards", {
      previewLabel: f.str("Preview badge", { description: "The GA quarter is appended from the edition; also used in the comparison table" }),
      featuredLabel: f.str("Featured badge"),
      audienceLabel: f.str("Audience kicker"),
      includesLabel: f.str("Includes kicker"),
      outcomeLabel: f.str("Outcome kicker"),
      deployLabel: f.str("Deploy row label"),
      priceLabel: f.str("Price row label"),
      exploreLabel: f.str("Explore link (the edition name follows it)"),
    }, { group: "sections" }),

    compare: f.obj("Compare", {
      heading: f.obj("Heading", sectionHeading.fields),
      moduleColumn: f.str("First column heading"),
    }, { group: "sections" }),

    closing: f.obj("Closing call to action", closingCta.fields, { group: "sections" }),
  },
  {
    singleton: true,
    groups: [
      { name: "hero", title: "Hero & SEO", default: true },
      { name: "sections", title: "Sections" },
    ],
    locations: [{ title: "Editions", href: "/editions" }],
  },
);

export type EditionsPage = InferDoc<typeof editionsPageSpec>;
