import { defineDoc, defineObject, f, type InferDoc } from "../spec";
import { cta, iconItem, sectionHeading } from "../objects";

const leadershipDepartment = defineObject("leadershipDepartment", "Department", {
  name: f.str("Name"),
  icon: f.str("Icon (lucide name)", { description: "e.g. Code2, Layers, Globe, ShieldCheck" }),
  description: f.text("Description"),
  focus: f.strings("Focus areas (chips)"),
}, { title: "name", subtitle: "description" });

export const leadershipPageSpec = defineDoc(
  "leadershipPage",
  "Leadership page",
  {
    seoTitle: f.str("Browser / search title", { group: "hero" }),
    seoDescription: f.text("Search description", { group: "hero" }),
    hero: f.obj("Hero", {
      kicker: f.str("Kicker"),
      title: f.str("Headline"),
      description: f.text("Description", { rows: 4 }),
      primary: f.obj("Primary button", cta.fields),
      secondary: f.obj("Secondary button", cta.fields),
    }, { group: "hero" }),

    roster: f.obj("Leadership roster", {
      heading: f.obj("Heading", sectionHeading.fields),
    }, { group: "sections" }),

    departments: f.obj("How we're organised", {
      heading: f.obj("Heading", sectionHeading.fields),
      items: f.arr("Departments", leadershipDepartment),
    }, { group: "sections" }),

    values: f.obj("Operating values", {
      heading: f.obj("Heading", sectionHeading.fields),
      items: f.arr("Values", iconItem),
    }, { group: "sections" }),

    presence: f.obj("Where we are", {
      heading: f.obj("Heading", sectionHeading.fields),
    }, { group: "sections" }),

    hiring: f.obj("Hiring band", {
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
    locations: [{ title: "Leadership & team", href: "/about/leadership" }],
  },
);

export type LeadershipPage = InferDoc<typeof leadershipPageSpec>;
