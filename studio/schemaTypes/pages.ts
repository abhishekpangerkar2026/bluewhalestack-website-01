import { defineField, defineType } from "sanity";
import { photoField, videoFields } from "./objects";

/** The landing page — one document. */
export const homePage = defineType({
  name: "homePage",
  title: "Home page",
  type: "document",
  groups: [
    { name: "hero", title: "Hero", default: true },
    { name: "story", title: "Story" },
    { name: "proof", title: "Proof & problems" },
    { name: "different", title: "What makes it different" },
    { name: "portfolio", title: "Product portfolio" },
  ],
  fields: [
    defineField({ name: "badge", title: "Kicker above the headline", type: "string", group: "hero" }),
    defineField({ name: "title", title: "Headline, first line", type: "string", group: "hero", description: 'e.g. "Every cloud."' }),
    defineField({ name: "titleAccent", title: "Headline, second line (blue)", type: "string", group: "hero", description: 'e.g. "One control plane."' }),
    defineField({ name: "description", title: "Description", type: "text", rows: 4, group: "hero" }),
    defineField({ name: "primaryCta", title: "Primary button", type: "cta", group: "hero" }),
    defineField({ name: "primaryNote", title: "Note under the buttons", type: "string", group: "hero" }),
    defineField({ name: "secondaryCta", title: "Secondary button", type: "cta", group: "hero" }),
    defineField({ name: "facts", title: "The four numbers", type: "array", of: [{ type: "fact" }], group: "hero", validation: (r) => r.max(4) }),
    { ...photoField("image", "Hero photograph"), group: "hero" },
    ...videoFields().map((f) => ({ ...f, group: "hero" })),

    defineField({ name: "storyEyebrow", title: "Kicker", type: "string", group: "story" }),
    defineField({ name: "storyHook", title: "Hook (headline)", type: "string", group: "story" }),
    defineField({ name: "storyProblem", title: "The problem", type: "text", rows: 3, group: "story" }),
    defineField({ name: "storyTurn", title: "The turn (pull quote)", type: "text", rows: 2, group: "story" }),
    defineField({ name: "problems", title: "Three problem cards", type: "array", of: [{ type: "iconItem" }], group: "story" }),

    defineField({
      name: "proof",
      title: "Proof strip — outcomes from delivered engagements",
      type: "array",
      group: "proof",
      of: [
        {
          type: "object",
          name: "proofItem",
          fields: [
            defineField({ name: "value", title: "Value", type: "string" }),
            defineField({ name: "label", title: "Label", type: "string" }),
            defineField({ name: "source", title: "Source (anonymized)", type: "string" }),
            defineField({ name: "href", title: "Link", type: "string" }),
          ],
          preview: { select: { title: "value", subtitle: "label" } },
        },
      ],
    }),

    defineField({ name: "differentEyebrow", title: "Kicker", type: "string", group: "different" }),
    defineField({ name: "differentTitle", title: "Title", type: "string", group: "different" }),
    defineField({ name: "differentDescription", title: "Description", type: "text", rows: 3, group: "different" }),
    defineField({ name: "differentiators", title: "The six points", type: "array", of: [{ type: "iconItem" }], group: "different" }),

    defineField({ name: "portfolioEyebrow", title: "Kicker", type: "string", group: "portfolio" }),
    defineField({ name: "portfolioTitle", title: "Title", type: "string", group: "portfolio" }),
    defineField({ name: "portfolioDescription", title: "Description", type: "text", rows: 3, group: "portfolio" }),
    defineField({ name: "portfolioNote", title: "Footnote", type: "string", group: "portfolio" }),
    defineField({
      name: "products",
      title: "Products",
      type: "array",
      group: "portfolio",
      of: [
        {
          type: "object",
          name: "product",
          fields: [
            defineField({ name: "name", title: "Name", type: "string" }),
            defineField({ name: "role", title: "One-line role", type: "string" }),
            defineField({ name: "body", title: "Body", type: "text", rows: 3 }),
            defineField({ name: "status", title: "Status chip", type: "string", description: "Available · Powered by BlueWhale Stack · Planned · Roadmap" }),
            defineField({ name: "href", title: "Link", type: "string" }),
            photoField("image", "Card photograph"),
          ],
          preview: { select: { title: "name", subtitle: "status", media: "image" } },
        },
      ],
    }),
  ],
  preview: { prepare: () => ({ title: "Home page" }) },
});

/** The hero of any other page: headline, description, photograph or video. */
export const pageHero = defineType({
  name: "pageHero",
  title: "Page hero",
  type: "document",
  fields: [
    defineField({
      name: "route",
      title: "Page path",
      type: "string",
      description: 'The page this hero belongs to, e.g. "/platform" or "/trust". One document per page.',
      validation: (r) => r.required().regex(/^\/[a-z0-9\-/]*$/, { name: "path" }),
    }),
    defineField({ name: "pageName", title: "Page name (for the list)", type: "string" }),
    defineField({ name: "eyebrow", title: "Kicker", type: "string" }),
    defineField({ name: "title", title: "Headline", type: "string" }),
    defineField({ name: "titleAccent", title: "Headline, highlighted part (blue, follows the headline)", type: "string" }),
    defineField({ name: "description", title: "Description", type: "text", rows: 4 }),
    photoField("image", "Hero photograph"),
    ...videoFields(),
  ],
  preview: { select: { title: "pageName", subtitle: "route", media: "image" } },
});
