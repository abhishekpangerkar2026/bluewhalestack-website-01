import { defineDoc, defineObject, f, type InferDoc } from "../spec";
import { iconItem, sectionHeading } from "../objects";

const partnerDocument = defineObject("partnerDocument", "Program guide", {
  id: f.str("Document id (code)", { description: "Matches the PDF under /partner-documents and the download API — lsp-program-guide · implementation-program-guide · strategic-program-guide" }),
  trackSlug: f.str("Track key (code)", { description: "lsp · implementation · strategic — picks the track's icon" }),
  title: f.str("Title"),
  summary: f.text("Summary"),
}, { title: "title", subtitle: "trackSlug" });

const partnerTier = defineObject("partnerTier", "LSP margin tier", {
  name: f.str("Name"),
  note: f.str("One-line note"),
  margin: f.str("Margin"),
  commitment: f.str("Commitment"),
  perks: f.strings("Perks"),
}, { title: "name", subtitle: "margin" });

export const partnersPageSpec = defineDoc(
  "partnersPage",
  "Partners page",
  {
    seoTitle: f.str("Browser / search title", { group: "hero" }),
    seoDescription: f.text("Search description", { group: "hero" }),
    hero: f.obj("Hero extras", {
      registerLabel: f.str("Primary button label (links to the Partner Portal registration)"),
      loginLabel: f.str("Secondary button label (links to the Partner Portal login)"),
      portalLabel: f.str("Portal line prefix (the portal address follows)"),
    }, { group: "hero" }),

    why: f.obj("Why partner", {
      heading: f.obj("Heading", sectionHeading.fields),
      items: f.arr("Reasons", iconItem),
    }, { group: "sections" }),

    tracks: f.obj("Three ways to partner", {
      heading: f.obj("Heading", sectionHeading.fields),
      trackLabel: f.str("'Track' label (the number follows)"),
      idealForLabel: f.str("'Ideal for —' label"),
      applyLead: f.str("Apply button — before the track name"),
      applyTrail: f.str("Apply button — after the track name"),
    }, { group: "sections" }),

    journey: f.obj("The journey", {
      heading: f.obj("Heading", sectionHeading.fields),
    }, { group: "sections" }),

    guides: f.obj("Program guides", {
      heading: f.obj("Heading", sectionHeading.fields),
      documents: f.arr("Guides (one per track)", partnerDocument),
      downloadLabel: f.str("Download button label"),
      note: f.text("Note under the cards", { rows: 2 }),
    }, { group: "sections" }),

    portal: f.obj("Partner Portal", {
      heading: f.obj("Heading", sectionHeading.fields),
      openLabel: f.str("Button label (links to the Partner Portal login)"),
      features: f.arr("Portal features", iconItem),
    }, { group: "sections" }),

    tiers: f.obj("LSP margin tiers", {
      kicker: f.str("Kicker"),
      body: f.text("Intro"),
      items: f.arr("Tiers", partnerTier),
      marginLabel: f.str("'Margin' row label"),
      commitmentLabel: f.str("'Commitment' row label"),
      note: f.text("Disclaimer under the tiers", { rows: 2 }),
    }, { group: "sections" }),

    bottom: f.obj("Buttons at the foot of the page", {
      registerLabel: f.str("Primary button label (links to the Partner Portal registration)"),
      loginLabel: f.str("Secondary button label (links to the Partner Portal login)"),
    }, { group: "sections" }),
  },
  {
    singleton: true,
    groups: [
      { name: "hero", title: "Hero & SEO", default: true },
      { name: "sections", title: "Sections" },
    ],
    locations: [{ title: "Partners", href: "/partners" }],
  },
);

export type PartnersPage = InferDoc<typeof partnersPageSpec>;
