import { defineDoc, defineObject, f, type InferDoc } from "../spec";

/**
 * One variant of the contact page per `?intent=` value. The `resource` variant
 * can also be opened with `?resource=<slug>`, in which case the page builds the
 * title and form intro from the "…WithResourceBefore/After" pieces around the
 * requested document's name; the plain `title` / `formBody` are used otherwise.
 */
export const contactIntent = defineObject("contactIntent", "Contact intent", {
  key: f.str("Intent key (code)", { description: "demo · sales · resource · preview — matched to ?intent= in the URL by the page, do not change" }),
  eyebrow: f.str("Kicker"),
  title: f.str("Title"),
  body: f.text("Body"),
  formTitle: f.str("Form title"),
  formBody: f.text("Form intro", { rows: 2 }),
  submitLabel: f.str("Submit button label"),
  titleWithResourceBefore: f.str("Title — before the requested resource's name", { optional: true, description: "Resource intent only: used when the page is opened with ?resource=…" }),
  titleWithResourceAfter: f.str("Title — after the requested resource's name", { optional: true, description: "Resource intent only" }),
  formBodyWithResourceBefore: f.str("Form intro — before the requested resource", { optional: true, description: "Resource intent only: the resource's title and type follow" }),
  formBodyWithResourceAfter: f.str("Form intro — after the requested resource", { optional: true, description: "Resource intent only" }),
}, { title: "title", subtitle: "key" });

export const contactPageSpec = defineDoc(
  "contactPage",
  "Contact page",
  {
    seoTitle: f.str("Browser / search title", { group: "hero" }),
    seoDescription: f.text("Search description", { group: "hero" }),
    intents: f.arr("Intents (one per ?intent= variant)", contactIntent, { group: "hero" }),

    channels: f.obj("Contact channels", {
      reachLabel: f.str("Direct-contact column heading"),
      salesLabel: f.str("Sales email label"),
      generalLabel: f.str("General email label"),
      officesLabel: f.str("Offices column heading"),
    }, { group: "sections" }),
  },
  {
    singleton: true,
    groups: [
      { name: "hero", title: "Hero & SEO", default: true },
      { name: "sections", title: "Sections" },
    ],
    locations: [{ title: "Contact", href: "/contact" }],
  },
);

export type ContactPage = InferDoc<typeof contactPageSpec>;
