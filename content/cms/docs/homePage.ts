import { f, type Fields, type Infer } from "../spec";
import { closingCta, fact, iconItem, link, sectionHeading } from "../objects";
import { prototypeOffer } from "./platformPage";

/**
 * The landing page's remaining sections. The `homePage` document itself is
 * hand-written in studio/schemaTypes/pages.ts (hero, story, proof strip,
 * differentiators, portfolio); these fields are appended to it under the
 * "Other sections" group and seeded/fetched with the same spec machinery.
 */
export const homePageExtras = {
  proofSection: f.obj("Proof strip — labels", {
    kicker: f.str("Kicker"),
    link: f.obj("Link on the right", link.fields),
  }, { group: "more" }),
  architectureSection: f.obj("The architecture", {
    heading: f.obj("Heading", sectionHeading.fields),
    cta: f.obj("Button", link.fields),
  }, { group: "more" }),
  productSection: f.obj("See the product", {
    heading: f.obj("Heading", sectionHeading.fields),
    link: f.obj("Link on the right", link.fields),
    facts: f.arr("Facts row under the console", iconItem, { max: 4 }),
  }, { group: "more" }),
  familiesSection: f.obj("The nine capability families", {
    heading: f.obj("Heading", sectionHeading.fields),
    link: f.obj("Link on the right", link.fields),
  }, { group: "more" }),
  spotlightSection: f.obj("Case-study spotlight", {
    heading: f.obj("Heading", sectionHeading.fields),
    link: f.obj("Link on the right", link.fields),
    readLabel: f.str("'Read the full case study' label"),
    allLabel: f.str("'All success stories' label"),
  }, { group: "more" }),
  editionsSection: f.obj("Editions", {
    heading: f.obj("Heading", sectionHeading.fields),
    link: f.obj("Link on the right", link.fields),
    featuredLabel: f.str("Featured badge"),
    availableLabel: f.str("'Available now' label"),
    previewPrefix: f.str("Preview label prefix (the GA quarter follows)"),
    exploreLabel: f.str("'Explore' label"),
    fabricNote: f.text("Fabric footnote", { rows: 2 }),
    fabricLink: f.obj("Fabric link", link.fields),
  }, { group: "more" }),
  prototype: f.obj("The 90-day prototype", prototypeOffer.fields, { group: "more" }),
  global: f.obj("Global infrastructure", {
    heading: f.obj("Heading", sectionHeading.fields),
    directoryLabel: f.str("'Region directory' label"),
    locationsLabel: f.str("'locations' label (after the count)"),
    stats: f.arr("The four numbers", fact, { max: 4 }),
  }, { group: "more" }),
  closing: f.obj("Closing call to action", closingCta.fields, { group: "more" }),
} satisfies Fields;

export type HomeExtras = Infer<typeof homePageExtras>;
