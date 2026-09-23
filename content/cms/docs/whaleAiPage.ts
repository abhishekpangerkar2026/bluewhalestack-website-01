import { defineDoc, defineObject, f, type InferDoc } from "../spec";
import { closingCta, ctaPath, fact, iconItem, sectionHeading, stringList, tableRow, titledBody } from "../objects";

const whaleAiTier = defineObject("whaleAiTier", "Whale AI intelligence tier", {
  key: f.str("Key (code) — abyss · tide · spark"),
  name: f.str("Name"),
  badge: f.str("Badge"),
  tagline: f.str("Tagline"),
  accentColor: f.str("Accent colour (hex, e.g. #4f46e5)"),
  topGrad: f.str("Top bar colour (hex)"),
  features: f.strings("Features"),
  tags: f.strings("Use-case tags (code names)"),
}, { title: "name", subtitle: "badge" });

const whaleAiCategory = defineObject("whaleAiCategory", "Use-case category", {
  icon: f.str("Icon (lucide name)", { description: "e.g. Wallet, ShieldCheck, Headset, Cloud, Server, Activity, TrendingUp, MoveRight, ScrollText, Gauge" }),
  name: f.str("Name"),
  count: f.num("Number of use cases"),
}, { title: "name", subtitle: "icon" });

const whaleAiHowStep = defineObject("whaleAiHowStep", "How-it-works step", {
  icon: f.str("Icon (lucide name)"),
  step: f.str("Step number, e.g. 01"),
  title: f.str("Title"),
  body: f.text("Body"),
}, { title: "title", subtitle: "step" });

export const whaleAiPageSpec = defineDoc(
  "whaleAiPage",
  "Whale AI page",
  {
    seoTitle: f.str("Browser / search title", { group: "hero" }),
    seoDescription: f.text("Search description", { group: "hero" }),
    hero: f.obj("Hero extras", {
      primary: f.obj("Primary button", ctaPath.fields),
      secondary: f.obj("Secondary button", ctaPath.fields),
      stats: f.arr("Stats strip under the hero", fact, { max: 4 }),
    }, { group: "hero" }),

    what: f.obj("What is Whale AI", {
      heading: f.obj("Heading", sectionHeading.fields),
      points: f.arr("The two explanations (title + paragraph)", titledBody, { max: 2 }),
      fabricTitle: f.str("Fabric diagram — title"),
      fabricSubtitleBefore: f.str("Fabric diagram — subtitle, before the module count"),
      fabricSubtitleAfter: f.str("Fabric diagram — subtitle, after the module count"),
      groundingKicker: f.str("Grounding providers — kicker"),
      grounding: f.strings("Grounding providers (code names)"),
    }, { group: "sections" }),

    tiers: f.obj("Intelligence tiers", {
      heading: f.obj("Heading", sectionHeading.fields),
      items: f.arr("Tiers", whaleAiTier, { max: 3 }),
    }, { group: "sections" }),

    categories: f.obj("Use-case catalog", {
      heading: f.obj("Heading", sectionHeading.fields),
      items: f.arr("Categories", whaleAiCategory),
      featured: f.arr("Featured use cases (three columns)", stringList, { max: 3 }),
    }, { group: "sections" }),

    how: f.obj("How it works", {
      heading: f.obj("Heading", sectionHeading.fields),
      steps: f.arr("Steps", whaleAiHowStep, { max: 4 }),
    }, { group: "sections" }),

    differentiators: f.obj("Key differentiators", {
      heading: f.obj("Heading", sectionHeading.fields),
      items: f.arr("Items", iconItem),
    }, { group: "sections" }),

    comparison: f.obj("Comparison table", {
      heading: f.obj("Heading", sectionHeading.fields),
      firstColumn: f.str("First column heading"),
      columns: f.strings("Column headings (Whale AI first — it is highlighted)"),
      rows: f.arr("Rows — the capability, then one cell per column", tableRow),
    }, { group: "sections" }),

    closing: f.obj("Closing call to action", closingCta.fields, { group: "sections" }),
  },
  {
    singleton: true,
    groups: [
      { name: "hero", title: "Hero & SEO", default: true },
      { name: "sections", title: "Sections" },
    ],
    locations: [{ title: "Whale AI", href: "/products/whale-ai" }],
  },
);

export type WhaleAiPage = InferDoc<typeof whaleAiPageSpec>;
