import { defineDoc, defineObject, f, type InferDoc } from "../spec";
import { cta, link, sectionHeading } from "../objects";

const docsPanelLink = defineObject("docsPanelLink", "Intro panel link", {
  index: f.str("Index, e.g. 01"),
  href: f.str("Link"),
  title: f.str("Title"),
  description: f.str("Description"),
}, { title: "title", subtitle: "index" });

const docsCard = defineObject("docsCard", "Guide card", {
  slug: f.str("Guide slug (code) — the card links to /docs/<slug>"),
  title: f.str("Title"),
  body: f.text("Body"),
  tags: f.strings("Tags"),
  icon: f.str("Icon (lucide name)", { description: "e.g. Cloud, Zap, Plug, ShieldCheck, PackagePlus, ScrollText" }),
}, { title: "title", subtitle: "slug" });

export const docsPageSpec = defineDoc(
  "docsPage",
  "Docs page",
  {
    seoTitle: f.str("Browser / search title", { group: "hero" }),
    seoDescription: f.text("Search description", { group: "hero" }),
    hero: f.obj("Hero", {
      kicker: f.str("Kicker"),
      title: f.str("Title"),
      description: f.text("Description", { rows: 4 }),
      jumpLabel: f.str("Jump-to label"),
      quickLinks: f.arr("Jump-to links", link),
      panelKicker: f.str("Intro panel — kicker"),
      panelLinks: f.arr("Intro panel — links", docsPanelLink, { max: 3 }),
    }, { group: "hero" }),

    guides: f.obj("Guides", {
      heading: f.obj("Heading", sectionHeading.fields),
      cards: f.arr("Guide cards", docsCard),
      cardLink: f.str("Card link label"),
    }, { group: "sections" }),

    api: f.obj("API band", {
      heading: f.obj("Heading", sectionHeading.fields),
      primary: f.obj("Primary button", cta.fields),
      secondary: f.obj("Secondary button", cta.fields),
    }, { group: "sections" }),

    detail: f.obj("Guide pages — shared labels", {
      breadcrumb: f.str("Breadcrumb root label"),
      onThisPage: f.str("Table-of-contents label"),
      previous: f.str("Previous-link label"),
      next: f.str("Next-link label"),
      helpTitle: f.str("Need-help strip — title"),
      helpBody: f.text("Need-help strip — body", { rows: 2 }),
      helpCta: f.obj("Need-help strip — button", cta.fields),
    }, { group: "detail" }),
  },
  {
    singleton: true,
    groups: [
      { name: "hero", title: "Hero & SEO", default: true },
      { name: "sections", title: "Sections" },
      { name: "detail", title: "Guide pages" },
    ],
    locations: [{ title: "Docs", href: "/docs" }],
  },
);

export type DocsPage = InferDoc<typeof docsPageSpec>;
