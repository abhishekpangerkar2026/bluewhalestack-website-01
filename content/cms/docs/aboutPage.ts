import { defineDoc, defineObject, f, type InferDoc } from "../spec";
import { closingCta, cta, fact, iconItem, labelValue, sectionHeading, titledBody } from "../objects";

const aboutMilestone = defineObject("aboutMilestone", "Milestone", {
  year: f.str("Year (as printed — 2018, 2018–2025, Today)"),
  title: f.str("Title"),
  body: f.text("Body"),
}, { title: "title", subtitle: "year" });

const aboutProduct = defineObject("aboutProduct", "Product offering", {
  name: f.str("Name"),
  badge: f.str("Badge", { description: "Core · Family · GA · Flagship initiative — 'Core' is shown in the brand colour" }),
  href: f.str("Link"),
  iso: f.str("Illustration key (code)", { description: "stacked-slabs · chart · ai-cube · migration · audit · datacenter · app-window · racks · data · network · saas · byoc · edge · observe · partners · solutions" }),
  body: f.text("Body"),
}, { title: "name", subtitle: "badge" });

const aboutService = defineObject("aboutService", "Service offering", {
  iso: f.str("Illustration key (code)", { description: "app-window · racks · data · network · stacked-slabs · chart · ai-cube · migration · audit · datacenter" }),
  name: f.str("Name"),
  body: f.text("Body"),
}, { title: "name", subtitle: "body" });

export const aboutPageSpec = defineDoc(
  "aboutPage",
  "About page",
  {
    seoTitle: f.str("Browser / search title", { group: "hero" }),
    seoDescription: f.text("Search description", { group: "hero" }),
    hero: f.obj("Hero extras", {
      primary: f.obj("Primary button", cta.fields),
      secondary: f.obj("Secondary button", cta.fields),
    }, { group: "hero" }),

    facts: f.arr("At a glance — the fact strip under the hero", labelValue, { group: "sections" }),

    story: f.obj("Our story", {
      eyebrow: f.str("Kicker"),
      title: f.str("Title, first line"),
      titleAccent: f.str("Title, second line (faint)"),
      items: f.arr("Chapters", titledBody),
    }, { group: "sections" }),

    missionVision: f.obj("Mission & vision", {
      missionKicker: f.str("Mission kicker"),
      mission: f.text("Mission statement", { rows: 4 }),
      visionKicker: f.str("Vision kicker"),
      vision: f.text("Vision statement", { rows: 4 }),
    }, { group: "sections" }),

    principles: f.obj("Design principles", {
      heading: f.obj("Heading", sectionHeading.fields),
      items: f.arr("Principles", iconItem),
    }, { group: "sections" }),

    journey: f.obj("Our journey", {
      heading: f.obj("Heading", sectionHeading.fields),
      items: f.arr("Milestones", aboutMilestone),
    }, { group: "sections" }),

    products: f.obj("Product offerings", {
      heading: f.obj("Heading", sectionHeading.fields),
      cta: f.obj("Button on the right", cta.fields),
      items: f.arr("Products", aboutProduct),
      cardLink: f.str("Card link label"),
    }, { group: "sections" }),

    services: f.obj("Service offerings", {
      heading: f.obj("Heading", sectionHeading.fields),
      items: f.arr("Services", aboutService),
      note: f.text("Note under the grid", { rows: 2 }),
    }, { group: "sections" }),

    record: f.obj("On the record (dark strip)", {
      kicker: f.str("Kicker"),
      entities: f.obj("Entities", fact.fields),
      certifications: f.obj("Certifications", fact.fields),
      regionsLabel: f.str("SaaS regions — the words after the count", { description: "The count and the city list come from Site settings → SaaS regions" }),
      capabilities: f.obj("Capabilities", fact.fields),
    }, { group: "sections" }),

    presence: f.obj("Global presence", {
      heading: f.obj("Heading", sectionHeading.fields),
    }, { group: "sections" }),

    leadership: f.obj("Leadership", {
      heading: f.obj("Heading", sectionHeading.fields),
      cta: f.obj("Button on the right", cta.fields),
    }, { group: "sections" }),

    trust: f.obj("Certifications & trust", {
      heading: f.obj("Heading", sectionHeading.fields),
      points: f.strings("Trust points (ticked list)"),
      complianceLabel: f.str("Compliance frameworks label"),
      hiringTitle: f.str("Hiring box — title"),
      hiringBody: f.text("Hiring box — body (the link follows)", { rows: 2 }),
      hiringLink: f.obj("Hiring box — link", cta.fields),
    }, { group: "sections" }),

    closing: f.obj("Closing call to action", closingCta.fields, { group: "sections" }),
  },
  {
    singleton: true,
    groups: [
      { name: "hero", title: "Hero & SEO", default: true },
      { name: "sections", title: "Sections" },
    ],
    locations: [{ title: "About us", href: "/about" }],
  },
);

export type AboutPage = InferDoc<typeof aboutPageSpec>;
