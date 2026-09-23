import { defineDoc, defineObject, f, type InferDoc } from "../spec";
import { closingCta, cta, fact, labelValue, sectionHeading, titledBody } from "../objects";

const fabricTier = defineObject("fabricTier", "Operator tier", {
  name: f.str("Tier"),
  label: f.str("Label"),
  body: f.text("Body"),
}, { title: "name", subtitle: "label" });

const fabricMarket = defineObject("fabricMarket", "Market", {
  name: f.str("Market"),
  status: f.str("Status chip", { description: "Launch market · Priority market · On request" }),
  body: f.text("Body"),
  stats: f.arr("Figures (optional)", fact, { optional: true }),
}, { title: "name", subtitle: "status" });

const fabricStakeholder = defineObject("fabricStakeholder", "Stakeholder", {
  icon: f.str("Icon (lucide name)"),
  title: f.str("Title"),
  points: f.strings("Points"),
}, { title: "title" });

const fabricRevenueStream = defineObject("fabricRevenueStream", "Revenue stream", {
  name: f.str("Name"),
  body: f.text("Body"),
  character: f.str("Character (kicker)", { description: "e.g. Recurring · core" }),
}, { title: "name", subtitle: "character" });

const fabricPhase = defineObject("fabricPhase", "Phase", {
  name: f.str("Name"),
  timeframe: f.str("Timeframe"),
  body: f.text("Body"),
}, { title: "name", subtitle: "timeframe" });

const fabricStep = defineObject("fabricStep", "Getting-started step", {
  step: f.str("Step"),
  body: f.text("Body"),
  duration: f.str("Duration"),
}, { title: "step", subtitle: "duration" });

export const fabricPageSpec = defineDoc(
  "fabricPage",
  "Fabric page",
  {
    seoTitle: f.str("Browser / search title", { group: "hero" }),
    seoDescription: f.text("Search description", { group: "hero" }),
    hero: f.obj("Hero extras", {
      eyebrowSuffix: f.str("Kicker suffix (after the product name)"),
      previewLabel: f.str("Preview badge", { description: "Shown while the Telco & Datacenter Edition is in preview; the GA quarter is appended from the edition" }),
      primary: f.obj("Primary button", cta.fields),
      secondary: f.obj("Secondary button", cta.fields),
      stats: f.arr("Stats band", fact, { max: 4 }),
    }, { group: "hero" }),

    problem: f.obj("Why now", {
      heading: f.obj("Heading", sectionHeading.fields),
      items: f.arr("Problems", titledBody),
    }, { group: "sections" }),

    architecture: f.obj("Reference architecture", {
      heading: f.obj("Heading", sectionHeading.fields),
    }, { group: "sections" }),

    supply: f.obj("The supply", {
      heading: f.obj("Heading", sectionHeading.fields),
      tiers: f.arr("Tiers", fabricTier),
      note: f.text("Footnote under the tiers"),
    }, { group: "sections" }),

    markets: f.obj("Where the fabric runs", {
      heading: f.obj("Heading", sectionHeading.fields),
      items: f.arr("Markets", fabricMarket),
      note: f.str("Footnote under the market cards"),
    }, { group: "sections" }),

    stakeholders: f.obj("Value, by stakeholder", {
      heading: f.obj("Heading", sectionHeading.fields),
      items: f.arr("Stakeholders", fabricStakeholder),
    }, { group: "sections" }),

    revenue: f.obj("Commercial model", {
      heading: f.obj("Heading", sectionHeading.fields),
      streams: f.arr("Revenue streams", fabricRevenueStream),
    }, { group: "sections" }),

    phases: f.obj("Phased delivery", {
      heading: f.obj("Heading", sectionHeading.fields),
      items: f.arr("Phases", fabricPhase),
    }, { group: "sections" }),

    glance: f.obj("At a glance", {
      heading: f.obj("Heading", sectionHeading.fields),
      rows: f.arr("Rows", labelValue),
    }, { group: "sections" }),

    gettingStarted: f.obj("Getting started", {
      kicker: f.str("Kicker"),
      steps: f.arr("Steps", fabricStep),
    }, { group: "sections" }),

    closing: f.obj("Closing call to action", closingCta.fields, { group: "sections" }),
  },
  {
    singleton: true,
    groups: [
      { name: "hero", title: "Hero & SEO", default: true },
      { name: "sections", title: "Sections" },
    ],
    locations: [{ title: "BlueWhale Stack Fabric", href: "/fabric" }],
  },
);

export type FabricPage = InferDoc<typeof fabricPageSpec>;
