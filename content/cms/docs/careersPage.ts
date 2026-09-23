import { defineDoc, f, type InferDoc } from "../spec";
import { cta, iconItem, sectionHeading } from "../objects";

export const careersPageSpec = defineDoc(
  "careersPage",
  "Careers page",
  {
    seoTitle: f.str("Browser / search title", { group: "hero" }),
    seoDescription: f.text("Search description", { group: "hero" }),
    hero: f.obj("Hero extras", {
      primary: f.obj("Primary button", cta.fields),
      secondary: f.obj("Secondary button", cta.fields),
    }, { group: "hero" }),

    team: f.obj("The people you'd work with (strip under the hero)", {
      title: f.str("Title"),
      body: f.text("Body", { rows: 2 }),
      link: f.obj("Link on the right", cta.fields),
    }, { group: "sections" }),

    perks: f.obj("Life here", {
      heading: f.obj("Heading", sectionHeading.fields),
      items: f.arr("Perks", iconItem),
    }, { group: "sections" }),

    roles: f.obj("Open roles", {
      heading: f.obj("Heading", sectionHeading.fields),
      cvLead: f.str("Before the CV link", { description: "e.g. Don't see your role?" }),
      cvLinkLabel: f.str("CV link label"),
      cvTrail: f.str("After the CV link"),
      applyLabel: f.str("Apply button label"),
    }, { group: "sections" }),
  },
  {
    singleton: true,
    groups: [
      { name: "hero", title: "Hero & SEO", default: true },
      { name: "sections", title: "Sections" },
    ],
    locations: [{ title: "Careers", href: "/careers" }],
  },
);

export type CareersPage = InferDoc<typeof careersPageSpec>;
