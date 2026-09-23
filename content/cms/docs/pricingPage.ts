import { defineDoc, defineObject, f, type InferDoc } from "../spec";
import { closingCta, cta, qa, sectionHeading } from "../objects";

/** One of the three price cells under the hero (Standard · Enterprise · scoped). */
const pricingCell = defineObject("pricingCell", "Price cell", {
  kicker: f.str("Kicker"),
  value: f.str("Value", { description: "The last cell is the scoped one — its value is set in ink, not as an accent numeral" }),
  note: f.str("Note under the value"),
}, { title: "kicker", subtitle: "value" });

const pricingDriver = defineObject("pricingDriver", "Price driver", {
  label: f.str("Label"),
  body: f.text("Body"),
}, { title: "label", subtitle: "body" });

export const pricingPageSpec = defineDoc(
  "pricingPage",
  "Pricing page",
  {
    seoTitle: f.str("Browser / search title", { group: "hero" }),
    seoDescription: f.text("Search description", { group: "hero" }),
    hero: f.obj("Hero extras", {
      unitLabel: f.str("Unit note — bold label"),
      unitText: f.text("Unit note — text"),
      primary: f.obj("Primary button", cta.fields),
      secondary: f.obj("Secondary button", cta.fields),
      cells: f.arr("The three price cells under the hero", pricingCell, { max: 3 }),
    }, { group: "hero" }),

    tiers: f.obj("Editions", {
      heading: f.obj("Heading", sectionHeading.fields),
      previewLabel: f.str("Preview badge", { description: "The GA quarter is appended from the edition; also used in the comparison table" }),
      popularLabel: f.str("Most-popular badge"),
      previewCta: f.str("Button — preview editions"),
      quoteCta: f.str("Button — Standard and Enterprise"),
      salesCta: f.str("Button — other editions"),
      detailsLink: f.str("Edition details link"),
      forLabel: f.str("Audience label (before the edition's audience)"),
    }, { group: "sections" }),

    drivers: f.obj("What drives the price", {
      heading: f.obj("Heading", sectionHeading.fields),
      items: f.arr("The four inputs", pricingDriver, { max: 4 }),
      exampleLabel: f.str("Worked example — bold label"),
      example: f.text("Worked example", { rows: 5 }),
    }, { group: "sections" }),

    compare: f.obj("Compare", {
      heading: f.obj("Heading", sectionHeading.fields),
      moduleColumn: f.str("First column heading"),
    }, { group: "sections" }),

    faq: f.obj("FAQ", {
      heading: f.obj("Heading", sectionHeading.fields),
      cta: f.obj("Button under the heading", cta.fields),
      items: f.arr("Questions", qa),
    }, { group: "sections" }),

    closing: f.obj("Closing call to action", closingCta.fields, { group: "sections" }),
  },
  {
    singleton: true,
    groups: [
      { name: "hero", title: "Hero & SEO", default: true },
      { name: "sections", title: "Sections" },
    ],
    locations: [{ title: "Pricing", href: "/pricing" }],
  },
);

export type PricingPage = InferDoc<typeof pricingPageSpec>;
