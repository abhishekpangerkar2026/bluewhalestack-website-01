import { defineDoc, f, type InferDoc } from "../spec";
import { cta, fact, sectionHeading } from "../objects";

export const customersPageSpec = defineDoc(
  "customersPage",
  "Customers page",
  {
    seoTitle: f.str("Browser / search title", { group: "hero" }),
    seoDescription: f.text("Search description", { group: "hero" }),
    hero: f.obj("Hero extras", {
      primary: f.obj("Primary button", cta.fields),
      secondary: f.obj("Secondary button", cta.fields),
    }, { group: "hero" }),

    // Four fixed slots. Two numbers are counted by the page (stories, markets),
    // so only their labels are editable; the other two are plain facts.
    stats: f.obj("Stats strip", {
      engagementsLabel: f.str("Delivered engagements — label", { description: "The number is the count of customer stories" }),
      sectors: f.obj("Sectors", fact.fields),
      marketsLabel: f.str("Markets — label", { description: "The number is the count of the markets list" }),
      editions: f.obj("Editions", fact.fields),
    }, { group: "sections" }),
    markets: f.strings("Markets (chips under the stats)", { group: "sections" }),

    stories: f.obj("The stories", {
      heading: f.obj("Heading", sectionHeading.fields),
      outcomeLabel: f.str("Outcome label on each card"),
      readLabel: f.str("Card link label"),
    }, { group: "sections" }),

    closing: f.obj("Closing band", {
      heading: f.obj("Heading", sectionHeading.fields),
      cta: f.obj("Button", cta.fields),
    }, { group: "sections" }),
  },
  {
    singleton: true,
    groups: [
      { name: "hero", title: "Hero & SEO", default: true },
      { name: "sections", title: "Sections" },
    ],
    locations: [{ title: "Customer success stories", href: "/customers" }],
  },
);

export type CustomersPage = InferDoc<typeof customersPageSpec>;
