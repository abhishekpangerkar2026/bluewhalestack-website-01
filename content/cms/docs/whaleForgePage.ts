import { defineDoc, defineObject, f, type InferDoc } from "../spec";
import { cta, fact, sectionHeading } from "../objects";

const whaleForgeCapability = defineObject("whaleForgeCapability", "Capability", {
  icon: f.str("Icon (lucide name)"),
  title: f.str("Title"),
  body: f.text("Body"),
  chips: f.strings("Chips"),
}, { title: "title", subtitle: "body" });

const whaleForgeStep = defineObject("whaleForgeStep", "Workflow step", {
  step: f.str("Step number", { description: "e.g. 01" }),
  title: f.str("Title"),
  body: f.text("Body"),
}, { title: "title", subtitle: "step" });

const whaleForgeDiagram = defineObject("whaleForgeDiagram", "Diagram format", {
  name: f.str("Short name", { description: "e.g. HLD" }),
  label: f.str("Label chip"),
  body: f.text("Body"),
}, { title: "name", subtitle: "label" });

const whaleForgePack = defineObject("whaleForgePack", "Landing-zone pack", {
  name: f.str("Industry"),
  icon: f.str("Icon (lucide name)"),
  features: f.strings("Features"),
}, { title: "name" });

export const whaleForgePageSpec = defineDoc(
  "whaleForgePage",
  "WhaleForge page",
  {
    seoTitle: f.str("Browser / search title", { group: "hero" }),
    seoDescription: f.text("Search description", { group: "hero" }),
    hero: f.obj("Hero", {
      badge: f.str("Badge"),
      kicker: f.str("Kicker"),
      title: f.str("Headline"),
      titleAccent: f.str("Headline, highlighted part (blue, follows the headline)"),
      titleSuffix: f.str("Text after the highlighted part (e.g. the full stop)"),
      description: f.text("Description", { rows: 4 }),
      codeFile: f.str("Code sample — file name"),
      codeOutput: f.str("Code sample — output line"),
      code: f.text("Code sample", { rows: 24 }),
      includesKicker: f.str("What-you-get kicker"),
      includes: f.strings("What you get"),
      comingNext: f.str("Coming-next note"),
      cta: f.obj("Button", cta.fields),
    }, { group: "hero" }),
    stats: f.arr("Stats strip under the hero", fact, { max: 4, group: "hero" }),

    capabilities: f.obj("Capabilities", {
      heading: f.obj("Heading", sectionHeading.fields),
      items: f.arr("Capabilities", whaleForgeCapability),
    }, { group: "sections" }),

    workflow: f.obj("Workflow", {
      heading: f.obj("Heading", sectionHeading.fields),
      steps: f.arr("Steps", whaleForgeStep),
    }, { group: "sections" }),

    diagrams: f.obj("Architecture diagrams", {
      heading: f.obj("Heading", sectionHeading.fields),
      types: f.arr("Formats", whaleForgeDiagram),
    }, { group: "sections" }),

    packs: f.obj("Landing-zone packs", {
      heading: f.obj("Heading", sectionHeading.fields),
      items: f.arr("Packs", whaleForgePack),
    }, { group: "sections" }),

    availability: f.obj("Availability", {
      heading: f.obj("Heading", sectionHeading.fields),
      editionChips: f.strings("Edition chips"),
      note: f.str("Note under the chips"),
    }, { group: "sections" }),

    closing: f.obj("Closing band", {
      kicker: f.str("Kicker"),
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
    locations: [{ title: "WhaleForge", href: "/products/whaleforge" }],
  },
);

export type WhaleForgePage = InferDoc<typeof whaleForgePageSpec>;
