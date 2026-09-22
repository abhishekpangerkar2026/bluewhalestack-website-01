import { defineField, defineType } from "sanity";
import { photoField } from "./objects";

const slug = () =>
  defineField({
    name: "slug",
    title: "URL slug",
    type: "slug",
    options: { source: "name", maxLength: 60 },
    validation: (r) => r.required(),
  });
const order = () => defineField({ name: "order", title: "Sort order", type: "number", description: "Lower numbers first" });
const strings = (name: string, title: string, description?: string) =>
  defineField({ name, title, description, type: "array", of: [{ type: "string" }] });
const faq = () => defineField({ name: "faq", title: "FAQ", type: "array", of: [{ type: "qa" }] });

export const edition = defineType({
  name: "edition",
  title: "Edition",
  type: "document",
  groups: [
    { name: "hero", title: "Hero", default: true },
    { name: "offer", title: "Offer & pricing" },
    { name: "fit", title: "Fit" },
    { name: "operator", title: "Operator model" },
  ],
  fields: [
    defineField({ name: "name", title: "Name", type: "string", validation: (r) => r.required(), group: "hero" }),
    { ...slug(), group: "hero" },
    defineField({ name: "badge", title: "Badge", type: "string", group: "hero" }),
    defineField({ name: "tagline", title: "Tagline", type: "string", group: "hero" }),
    defineField({ name: "headline", title: "Headline", type: "string", group: "hero" }),
    defineField({ name: "positioning", title: "Positioning (hero description)", type: "text", rows: 5, group: "hero" }),
    defineField({ name: "summary", title: "Summary (≤45 words, cards)", type: "text", rows: 3, group: "hero" }),
    defineField({ name: "audience", title: "Who it targets", type: "string", group: "hero" }),
    defineField({ name: "outcome", title: "The outcome", type: "string", group: "hero" }),
    { ...photoField("image", "Hero photograph"), group: "hero" },
    defineField({ name: "featured", title: "Featured ('Most deployed')", type: "boolean", group: "hero" }),
    defineField({ name: "comingSoon", title: "In preview (not yet GA)", type: "boolean", group: "hero" }),
    defineField({ name: "gaTarget", title: "GA target, e.g. Q4 2026", type: "string", group: "hero" }),
    { ...order(), group: "hero" },

    { ...strings("includes", "Includes — the three headline inclusions"), group: "offer" },
    { ...strings("deploy", "Deployment options"), group: "offer" },
    defineField({ name: "priceAnchor", title: "Price", type: "string", group: "offer" }),
    defineField({ name: "priceSub", title: "Price note", type: "string", group: "offer" }),
    defineField({ name: "aiTier", title: "Whale AI tier", type: "string", group: "offer" }),
    { ...strings("highlights", "Highlights"), group: "offer" },
    { ...strings("modules", "Module slugs included"), group: "offer" },
    defineField({ name: "diagram", title: "Diagram caption", type: "string", group: "offer" }),
    defineField({ name: "architectureId", title: "Architecture diagram id (code)", type: "string", group: "offer" }),

    { ...strings("fits", "Fits these industries"), group: "fit" },
    defineField({ name: "buyWhen", title: "Buy when", type: "text", rows: 2, group: "fit" }),
    { ...strings("fitFor", "Who it is for"), group: "fit" },
    { ...strings("notFor", "Who it is not for"), group: "fit" },
    { ...faq(), group: "fit" },

    defineField({
      name: "operatorProfiles",
      title: "Operator profiles (Telco & Datacenter only)",
      type: "array",
      of: [{ type: "operatorProfile" }],
      group: "operator",
    }),
  ],
  orderings: [{ title: "Sort order", name: "order", by: [{ field: "order", direction: "asc" }] }],
  preview: { select: { title: "name", subtitle: "priceAnchor", media: "image" } },
});

export const moduleDoc = defineType({
  name: "module",
  title: "Module",
  type: "document",
  groups: [
    { name: "card", title: "Card & hero", default: true },
    { name: "detail", title: "Page content" },
  ],
  fields: [
    defineField({ name: "name", title: "Name", type: "string", validation: (r) => r.required(), group: "card" }),
    { ...slug(), group: "card" },
    defineField({
      name: "group",
      title: "Capability family",
      type: "string",
      group: "card",
      options: {
        list: [
          { title: "Management & Delivery", value: "management" },
          { title: "Whalenomics · FinOps", value: "whalenomics" },
          { title: "Security & Identity", value: "security" },
          { title: "Governance & Audit", value: "governance" },
          { title: "Whale AI — incl. offline", value: "ai" },
          { title: "Migration & Discovery", value: "migration" },
          { title: "Observability & ITSM", value: "observability" },
          { title: "Tenancy & Monetization", value: "tenancy" },
          { title: "Sovereign Operations", value: "sovereign" },
        ],
      },
      validation: (r) => r.required(),
    }),
    defineField({ name: "icon", title: "Icon (lucide name)", type: "string", group: "card" }),
    defineField({ name: "tagline", title: "Tagline (cards)", type: "string", group: "card" }),
    defineField({ name: "description", title: "Description", type: "text", rows: 3, group: "card" }),
    { ...strings("features", "Features"), group: "card" },
    { ...photoField("image", "Hero photograph"), group: "card" },
    { ...order(), group: "card" },

    defineField({
      name: "status",
      title: "Status badge",
      type: "object",
      group: "detail",
      fields: [
        defineField({ name: "label", title: "Label", type: "string" }),
        defineField({
          name: "tone",
          title: "Tone",
          type: "string",
          options: { list: ["success", "warning", "neutral"] },
        }),
      ],
    }),
    defineField({ name: "summary", title: "Hero description", type: "text", rows: 4, group: "detail" }),
    defineField({ name: "facts", title: "Three proof facts", type: "array", of: [{ type: "fact" }], group: "detail" }),
    defineField({ name: "capabilities", title: "Capabilities", type: "array", of: [{ type: "titledBody" }], group: "detail" }),
    defineField({ name: "howItWorks", title: "How it works", type: "array", of: [{ type: "titledBody" }], group: "detail" }),
    { ...faq(), group: "detail" },
  ],
  orderings: [{ title: "Sort order", name: "order", by: [{ field: "order", direction: "asc" }] }],
  preview: { select: { title: "name", subtitle: "group", media: "image" } },
});

export const industry = defineType({
  name: "industry",
  title: "Industry",
  type: "document",
  groups: [
    { name: "hero", title: "Hero", default: true },
    { name: "body", title: "Page content" },
  ],
  fields: [
    defineField({ name: "name", title: "Name", type: "string", validation: (r) => r.required(), group: "hero" }),
    { ...slug(), group: "hero" },
    defineField({ name: "icon", title: "Icon (lucide name)", type: "string", group: "hero" }),
    defineField({ name: "title", title: "Headline (a verb and an object)", type: "string", group: "hero" }),
    defineField({ name: "description", title: "Description", type: "text", rows: 5, group: "hero" }),
    { ...photoField("image", "Hero photograph"), group: "hero" },
    defineField({ name: "edition", title: "Primary edition slug", type: "string", group: "hero" }),
    defineField({ name: "outcome", title: "One-line outcome", type: "string", group: "hero" }),
    defineField({ name: "story", title: "Customer story slug", type: "string", group: "hero" }),
    defineField({ name: "architectureId", title: "Architecture diagram id (code)", type: "string", group: "hero" }),
    { ...order(), group: "hero" },

    defineField({ name: "kpis", title: "Four posture facts", type: "array", of: [{ type: "fact" }], group: "body" }),
    { ...strings("why", "What the sector gets (six points)"), group: "body" },
    { ...strings("targets", "Who it is for"), group: "body" },
    { ...strings("compliance", "Compliance tags"), group: "body" },
    defineField({ name: "regimes", title: "Regimes and the control that answers each", type: "array", of: [{ type: "regime" }], group: "body" }),
    defineField({ name: "useCases", title: "Use cases", type: "array", of: [{ type: "useCase" }], group: "body" }),
    { ...faq(), group: "body" },
  ],
  orderings: [{ title: "Sort order", name: "order", by: [{ field: "order", direction: "asc" }] }],
  preview: { select: { title: "name", subtitle: "title", media: "image" } },
});

export const solution = defineType({
  name: "solution",
  title: "Solution",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Name", type: "string", validation: (r) => r.required() }),
    slug(),
    defineField({ name: "icon", title: "Icon (lucide name)", type: "string" }),
    defineField({ name: "summary", title: "Summary (cards)", type: "string" }),
    defineField({ name: "description", title: "Hero description", type: "text", rows: 4 }),
    photoField("image", "Hero photograph"),
    defineField({ name: "problem", title: "The problem", type: "text", rows: 3 }),
    strings("symptoms", "Symptoms"),
    strings("features", "Features"),
    defineField({ name: "facts", title: "Three proof facts", type: "array", of: [{ type: "fact" }] }),
    defineField({ name: "audience", title: "Audience", type: "string" }),
    strings("modules", "Related module slugs"),
    strings("flow", "How it works — ordered steps"),
    strings("editions", "Recommended edition slugs"),
    defineField({ name: "architectureId", title: "Architecture diagram id (code)", type: "string" }),
    defineField({ name: "story", title: "Customer story slug", type: "string" }),
    faq(),
    order(),
  ],
  orderings: [{ title: "Sort order", name: "order", by: [{ field: "order", direction: "asc" }] }],
  preview: { select: { title: "name", subtitle: "summary", media: "image" } },
});

export const customerStory = defineType({
  name: "customerStory",
  title: "Customer story",
  type: "document",
  fields: [
    defineField({ name: "headline", title: "Headline", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "slug",
      title: "URL slug",
      type: "slug",
      options: { source: "headline", maxLength: 60 },
      validation: (r) => r.required(),
    }),
    defineField({ name: "org", title: "Organisation (anonymized)", type: "string" }),
    defineField({ name: "note", title: "Confidentiality note", type: "string" }),
    defineField({ name: "industry", title: "Industry label", type: "string" }),
    defineField({ name: "edition", title: "Edition label", type: "string" }),
    photoField("image", "Story image"),
    defineField({ name: "summary", title: "Summary", type: "text", rows: 3 }),
    defineField({ name: "challenge", title: "Challenge", type: "text", rows: 5 }),
    defineField({ name: "solution", title: "Solution", type: "text", rows: 5 }),
    defineField({ name: "quote", title: "Quote", type: "text", rows: 3 }),
    defineField({
      name: "person",
      title: "Quoted person",
      type: "object",
      fields: [
        defineField({ name: "name", title: "Name", type: "string" }),
        defineField({ name: "role", title: "Role", type: "string" }),
        defineField({ name: "initials", title: "Initials", type: "string" }),
      ],
    }),
    defineField({ name: "metrics", title: "Metrics", type: "array", of: [{ type: "fact" }] }),
    order(),
  ],
  orderings: [{ title: "Sort order", name: "order", by: [{ field: "order", direction: "asc" }] }],
  preview: { select: { title: "headline", subtitle: "org", media: "image" } },
});

export const teamMember = defineType({
  name: "teamMember",
  title: "Team member",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Name (leave empty for 'To be announced')", type: "string" }),
    defineField({ name: "role", title: "Role", type: "string", validation: (r) => r.required() }),
    defineField({ name: "bio", title: "Bio", type: "text", rows: 5 }),
    photoField("image", "Photograph"),
    defineField({ name: "linkedin", title: "LinkedIn URL", type: "url" }),
    order(),
  ],
  orderings: [{ title: "Sort order", name: "order", by: [{ field: "order", direction: "asc" }] }],
  preview: { select: { title: "name", subtitle: "role", media: "image" } },
});

export const post = defineType({
  name: "post",
  title: "Newsroom post",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "string", validation: (r) => r.required() }),
    defineField({ name: "slug", title: "URL slug", type: "slug", options: { source: "title", maxLength: 80 } }),
    defineField({ name: "date", title: "Date", type: "date", validation: (r) => r.required() }),
    defineField({ name: "category", title: "Category", type: "string", description: "Product · Platform · Certification · Company · Partnership" }),
    defineField({ name: "badge", title: "Badge", type: "string", description: "Product launch · Trust & compliance · Beta · GA" }),
    defineField({ name: "body", title: "Body", type: "text", rows: 6 }),
    defineField({ name: "href", title: "Read-more link (optional)", type: "string" }),
    photoField("image", "Image (optional)"),
  ],
  orderings: [{ title: "Newest first", name: "date", by: [{ field: "date", direction: "desc" }] }],
  preview: { select: { title: "title", subtitle: "date", media: "image" } },
});

export const collateralDoc = defineType({
  name: "collateralDoc",
  title: "Collateral PDF",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "kind",
      title: "Kind",
      type: "string",
      options: { list: ["Overview", "Company", "Datasheet", "Whitepaper", "Brief", "Case study"] },
    }),
    defineField({ name: "file", title: "PDF", type: "file", options: { accept: "application/pdf" }, validation: (r) => r.required() }),
    defineField({ name: "blurb", title: "Blurb", type: "text", rows: 3 }),
    order(),
  ],
  orderings: [{ title: "Sort order", name: "order", by: [{ field: "order", direction: "asc" }] }],
  preview: { select: { title: "title", subtitle: "kind" } },
});

export const documentTypes = [edition, moduleDoc, industry, solution, customerStory, teamMember, post, collateralDoc];
