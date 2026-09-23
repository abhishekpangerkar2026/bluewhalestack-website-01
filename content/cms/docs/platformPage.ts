import { defineDoc, defineObject, f, type InferDoc } from "../spec";
import { closingCta, ctaPath, fact, iconItem, iconLink, qa, sectionHeading, step } from "../objects";

const replaceRow = defineObject("replaceRow", "Replacement row", {
  category: f.str("You run today"),
  answer: f.text("In BlueWhale Stack"),
  status: f.str("Status chip", { description: "GA · Beta · Enterprise & up · …" }),
}, { title: "category", subtitle: "status" });

const archLayer = defineObject("archLayer", "Architecture layer", {
  n: f.str("Number"),
  name: f.str("Layer"),
  body: f.text("What it means for you"),
}, { title: "name", subtitle: "n" });

const deployMode = defineObject("deployMode", "Deployment mode", {
  name: f.str("Name"),
  badge: f.str("Badge"),
  body: f.text("Body"),
}, { title: "name", subtitle: "badge" });

const whaleTier = defineObject("whaleTier", "Whale AI tier", {
  name: f.str("Name"),
  edition: f.str("Editions"),
  body: f.text("Body"),
}, { title: "name", subtitle: "edition" });

const estateGroup = defineObject("estateGroup", "Estate group", {
  icon: f.str("Icon (lucide name)"),
  title: f.str("Title"),
  items: f.strings("Platforms"),
}, { title: "title" });

/** The standing 90-day prototype offer — shown on the home and platform pages. */
export const prototypeOffer = defineObject("prototypeOffer", "The 90-day prototype", {
  eyebrow: f.str("Kicker"),
  title: f.str("Title"),
  description: f.text("Description"),
  steps: f.arr("Steps", step),
  ctaTitle: f.str("Closing line"),
  ctaBody: f.text("Closing body"),
  ctaLabel: f.str("Button label"),
  ctaHref: f.str("Button link"),
}, { title: "title" });

export const platformPageSpec = defineDoc(
  "platformPage",
  "Platform page",
  {
    seoTitle: f.str("Browser / search title", { group: "hero" }),
    seoDescription: f.text("Search description", { group: "hero" }),
    hero: f.obj("Hero extras", {
      tagline: f.str("Line under the description"),
      primary: f.obj("Primary button", ctaPath.fields),
      secondary: f.obj("Secondary button", ctaPath.fields),
      stats: f.arr("The four numbers under the hero", fact, { max: 4 }),
      pageIndex: f.arr("On-this-page links", ctaPath),
    }, { group: "hero" }),

    who: f.obj("Who it is for", {
      heading: f.obj("Heading", sectionHeading.fields),
      cards: f.arr("Cards", iconLink),
      cardLink: f.str("Card link label"),
      whyNowLabel: f.str("Why-now label"),
      whyNow: f.text("Why now"),
    }, { group: "sections" }),

    replaces: f.obj("What it replaces", {
      heading: f.obj("Heading", sectionHeading.fields),
      columns: f.strings("Table column headings"),
      rows: f.arr("Rows", replaceRow),
    }, { group: "sections" }),

    architecture: f.obj("Architecture", {
      heading: f.obj("Heading", sectionHeading.fields),
      figure: f.image("Architecture picture (replaces the built-in 3D poster)"),
      figureCaption: f.str("Caption under the picture"),
      figureLink: f.str("Open-full-size label"),
      howToRead: f.str("How-to-read kicker"),
      columns: f.strings("Table column headings"),
      layers: f.arr("Layers", archLayer),
    }, { group: "sections" }),

    families: f.obj("The nine capability families", {
      heading: f.obj("Heading", sectionHeading.fields),
      note: f.str("Footnote under the grid"),
      momentsTitle: f.str("Everyday moments — title"),
      moments: f.arr("Everyday moments", iconItem),
      designRuleLabel: f.str("Design-rule label"),
      designRule: f.text("Design rule"),
    }, { group: "sections" }),

    controlPlane: f.obj("Every estate — managed as one", {
      heading: f.obj("Heading", sectionHeading.fields),
      estates: f.arr("Estate groups", estateGroup),
      note: f.str("Footnote"),
    }, { group: "sections" }),

    pillars: f.obj("Why BlueWhale Stack", {
      heading: f.obj("Heading", sectionHeading.fields),
      items: f.arr("Pillars", iconItem),
    }, { group: "sections" }),

    whaleAi: f.obj("Whale AI band", {
      kicker: f.str("Kicker"),
      title: f.str("Title"),
      body: f.text("Body"),
      tiers: f.arr("Tiers", whaleTier),
      cta: f.obj("Button", ctaPath.fields),
    }, { group: "sections" }),

    showcase: f.obj("See the product", {
      heading: f.obj("Heading", sectionHeading.fields),
    }, { group: "sections" }),

    included: f.obj("Included in every edition", {
      heading: f.obj("Heading", sectionHeading.fields),
      items: f.arr("Items", iconItem),
      cta: f.obj("Button", ctaPath.fields),
    }, { group: "sections" }),

    deployment: f.obj("Deployment", {
      heading: f.obj("Heading", sectionHeading.fields),
      modes: f.arr("Modes", deployMode),
      note: f.text("Note under the grid"),
    }, { group: "sections" }),

    support: f.obj("Support & service model", {
      heading: f.obj("Heading", sectionHeading.fields),
      items: f.arr("Items", iconItem),
    }, { group: "sections" }),

    prototype: f.obj("The 90-day prototype", prototypeOffer.fields, { group: "sections" }),

    trust: f.obj("Trust & sovereignty", {
      heading: f.obj("Heading", sectionHeading.fields),
      pillars: f.arr("Pillars", iconItem),
      postureLabel: f.str("Security posture label"),
      posture: f.strings("Security posture lines"),
      complianceLabel: f.str("Compliance frameworks label"),
      complianceNote: f.text("Note under the chips", { rows: 2 }),
      cta: f.obj("Button", ctaPath.fields),
    }, { group: "sections" }),

    faq: f.obj("FAQ", {
      heading: f.obj("Heading", sectionHeading.fields),
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
    locations: [{ title: "Platform overview", href: "/platform" }],
  },
);

export type PlatformPage = InferDoc<typeof platformPageSpec>;
