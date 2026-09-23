import { defineDoc, f, type InferDoc } from "../spec";
import { cta, fact, sectionHeading } from "../objects";

export const modulesPageSpec = defineDoc(
  "modulesPage",
  "Modules page",
  {
    seoTitle: f.str("Browser / search title", { group: "hero" }),
    seoDescription: f.text("Search description", { group: "hero" }),
    hero: f.obj("Hero extras", {
      note: f.str("Note under the description"),
      statCapabilities: f.obj("Stat — capabilities", fact.fields),
      statFamiliesLabel: f.str("Stat — families (the number is counted from the catalog)"),
      statModulesLabel: f.str("Stat — modules (the number is counted from the catalog)"),
      statEditions: f.obj("Stat — editions", fact.fields),
    }, { group: "hero" }),

    families: f.obj("Family sections", {
      navLabel: f.str("Family index label"),
      shipsOne: f.str("Kicker when one module ships", { description: "{n} is replaced by the count" }),
      shipsMany: f.str("Kicker when several modules ship", { description: "{n} is replaced by the count" }),
      cardLink: f.str("Module card link"),
    }, { group: "sections" }),

    closing: f.obj("Closing", {
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
    locations: [{ title: "Modules", href: "/modules" }],
  },
);

export type ModulesPage = InferDoc<typeof modulesPageSpec>;
