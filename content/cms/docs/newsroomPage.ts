import { defineDoc, defineObject, f, type InferDoc } from "../spec";
import { cta, sectionHeading } from "../objects";

const newsroomContact = defineObject("newsroomContact", "Press contact", {
  type: f.str("Channel", { description: "e.g. Press & media, Partnerships" }),
  email: f.str("Email address"),
  note: f.text("Note", { rows: 2 }),
}, { title: "type", subtitle: "email" });

export const newsroomPageSpec = defineDoc(
  "newsroomPage",
  "Newsroom page",
  {
    seoTitle: f.str("Browser / search title", { group: "hero" }),
    seoDescription: f.text("Search description", { group: "hero" }),
    hero: f.obj("Hero extras", {
      primary: f.obj("Primary button", cta.fields),
      secondary: f.obj("Secondary button", cta.fields),
    }, { group: "hero" }),

    announcements: f.obj("Announcements", {
      heading: f.obj("Heading", sectionHeading.fields),
      readMoreLabel: f.str("Read-more link label"),
    }, { group: "sections" }),

    press: f.obj("Press & media contacts", {
      heading: f.obj("Heading", sectionHeading.fields),
      contacts: f.arr("Contacts", newsroomContact),
    }, { group: "sections" }),

    cta: f.obj("Closing band", {
      kicker: f.str("Kicker"),
      title: f.str("Title"),
      body: f.text("Body"),
      button: f.obj("Button", cta.fields),
    }, { group: "sections" }),
  },
  {
    singleton: true,
    groups: [
      { name: "hero", title: "Hero & SEO", default: true },
      { name: "sections", title: "Sections" },
    ],
    locations: [{ title: "Newsroom", href: "/newsroom" }],
  },
);

export type NewsroomPage = InferDoc<typeof newsroomPageSpec>;
