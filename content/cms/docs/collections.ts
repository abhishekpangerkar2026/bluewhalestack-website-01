/**
 * Collections — documents that exist many times: certifications, job
 * openings, partner tracks, legal pages and the developer-docs guides.
 */
import { defineDoc, defineObject, f, type InferDoc } from "../spec";
import { iconItem, titledBody } from "../objects";

// ── Trust Center: certifications ────────────────────────────────
const certDocument = defineObject("certDocument", "Document in the pack", {
  title: f.str("Title"),
  access: f.str("How it is shared", { list: ["public", "contract", "nda"], description: "public = on request · contract = under contract · nda = under NDA" }),
}, { title: "title", subtitle: "access" });

export const certificationSpec = defineDoc(
  "certification",
  "Certification",
  {
    slug: f.slug("Id — matches the certificate PDF name under /certificates (e.g. iso-27001)"),
    name: f.str("Short name"),
    fullName: f.str("Full name"),
    category: f.str("Category", { list: ["information-security", "privacy", "cloud-security", "business-continuity", "compliance"] }),
    scope: f.text("Certified scope (verbatim from the certificate)", { rows: 5 }),
    description: f.text("Description", { rows: 4 }),
    issuedBy: f.str("Issued / audited by"),
    cycle: f.str("Renewal / audit cycle"),
    certNumber: f.str("Certificate number", { optional: true }),
    issueDate: f.str("Issue date", { optional: true }),
    validUntil: f.str("Surveillance / expiry / next-review date", { optional: true }),
    validLabel: f.str("Label for that date (default 'Valid until')", { optional: true }),
    recertificationDate: f.str("Recertification date", { optional: true }),
    statusLabel: f.str("Status pill (default 'Certified')", { optional: true }),
    statusTone: f.str("Status pill colour", { list: ["success", "neutral", "warning"], optional: true }),
    downloadable: f.bool("A signed PDF exists under /certificates", { optional: true }),
    entity: f.str("Legal entity named on the certificate", { optional: true }),
    verifyUrl: f.str("Certification body's public register URL", { optional: true }),
    audit: f.obj("Audit history", {
      stage1: f.str("Stage 1", { optional: true }),
      stage2: f.str("Stage 2", { optional: true }),
      mode: f.str("Audit mode", { optional: true }),
      findings: f.str("Findings", { optional: true }),
      nextSurveillance: f.text("Next surveillance / notes", { optional: true }),
    }, { optional: true }),
    documents: f.arr("Management-system document pack", certDocument, { optional: true }),
  },
  { keyField: "slug", locations: [{ title: "Trust Center", href: "/trust" }] },
);
certificationSpec.preview = { title: "name", subtitle: "statusLabel" };
export type CertificationDoc = InferDoc<typeof certificationSpec>;

// ── Careers: job openings ───────────────────────────────────────
export const jobOpeningSpec = defineDoc(
  "jobOpening",
  "Job opening",
  {
    title: f.str("Role title"),
    department: f.str("Department"),
    location: f.str("Location"),
    type: f.str("Contract type (Full-time…)"),
    remote: f.str("Onsite / Hybrid / Remote"),
    applyUrl: f.str("Apply link (defaults to an email to careers@)", { optional: true }),
  },
  { keyField: "title", locations: [{ title: "Careers", href: "/careers" }] },
);
jobOpeningSpec.preview = { title: "title", subtitle: "department" };
export type JobOpeningDoc = InferDoc<typeof jobOpeningSpec>;

// ── Partners: the three tracks ──────────────────────────────────
export const partnerTrackSpec = defineDoc(
  "partnerTrack",
  "Partner track",
  {
    slug: f.slug("Track key — lsp · implementation · strategic (matched by the visuals and the program-guide PDFs)"),
    icon: f.str("Icon (lucide name)"),
    name: f.str("Name"),
    shortName: f.str("Short name (tabs)"),
    tagline: f.str("Tagline"),
    description: f.text("Description", { rows: 4 }),
    idealFor: f.text("Ideal for", { rows: 2 }),
    benefits: f.strings("Benefits"),
    journey: f.arr("Journey — from application to launch", titledBody),
  },
  { keyField: "slug", locations: [{ title: "Partners", href: "/partners" }] },
);
partnerTrackSpec.preview = { title: "name", subtitle: "tagline" };
export type PartnerTrackDoc = InferDoc<typeof partnerTrackSpec>;

// ── Legal pages ─────────────────────────────────────────────────
const legalParagraph = defineObject("legalParagraph", "Paragraph", { text: f.text("Text", { rows: 4 }) }, { title: "text" });
const legalBullets = defineObject("legalBullets", "Bullet list", { items: f.strings("Items") }, { title: "items.0" });
const legalSection = defineObject("legalSection", "Section", {
  heading: f.str("Heading"),
  blocks: f.union("Paragraphs and bullet lists, in order", [legalParagraph, legalBullets] as const),
}, { title: "heading" });

export const legalPageSpec = defineDoc(
  "legalPage",
  "Legal page",
  {
    slug: f.slug("Page — privacy · terms"),
    title: f.str("Title"),
    intro: f.text("Intro line"),
    lastUpdated: f.str("Last updated (as printed)"),
    seoTitle: f.str("Browser / search title"),
    seoDescription: f.text("Search description"),
    sections: f.arr("Sections", legalSection),
  },
  { keyField: "slug", detailRoute: "/legal/:slug" },
);
legalPageSpec.preview = { title: "title", subtitle: "lastUpdated" };
export type LegalPageDoc = InferDoc<typeof legalPageSpec>;

// ── Developer docs ──────────────────────────────────────────────
const docP = defineObject("docP", "Paragraph", { text: f.text("Text", { rows: 4 }) }, { title: "text" });
const docH3 = defineObject("docH3", "Sub-heading", { text: f.str("Heading") }, { title: "text" });
const docCallout = defineObject("docCallout", "Callout", {
  variant: f.str("Kind", { list: ["note", "tip", "warning"] }),
  text: f.text("Text"),
}, { title: "text", subtitle: "variant" });
const docCode = defineObject("docCode", "Code block", {
  lang: f.str("Language (bash, json, yaml, python…)"),
  code: f.text("Code", { rows: 10 }),
  label: f.str("Label above the block", { optional: true }),
}, { title: "label", subtitle: "lang" });
const docStep = defineObject("docStep", "Step", {
  title: f.str("Title"),
  body: f.text("Body"),
  code: f.text("Code (optional)", { rows: 6, optional: true }),
}, { title: "title" });
const docSteps = defineObject("docSteps", "Numbered steps", { items: f.arr("Steps", docStep) }, { title: "items.0.title" });
const docList = defineObject("docList", "Bullet list", { items: f.strings("Items") }, { title: "items.0" });
const docGrid = defineObject("docGrid", "Card grid", { items: f.arr("Cards", iconItem) }, { title: "items.0.title" });
const docSection = defineObject("docSection", "Section", {
  id: f.str("Anchor id (lowercase-with-dashes)"),
  heading: f.str("Heading"),
  blocks: f.union("Content blocks, in order", [docP, docH3, docCallout, docCode, docSteps, docList, docGrid] as const),
}, { title: "heading", subtitle: "id" });

export const docPageSpec = defineDoc(
  "docPage",
  "Documentation guide",
  {
    slug: f.slug("URL slug (/docs/<slug>)"),
    title: f.str("Title"),
    description: f.text("Description"),
    tags: f.strings("Tags"),
    icon: f.str("Icon (lucide name)"),
    readTime: f.str("Read time, e.g. 8 min read"),
    sections: f.arr("Sections", docSection),
  },
  { keyField: "slug", detailRoute: "/docs/:slug", locations: [{ title: "Docs index", href: "/docs" }] },
);
docPageSpec.preview = { title: "title", subtitle: "readTime" };
export type DocPageDoc = InferDoc<typeof docPageSpec>;
export type DocBlockDoc = DocPageDoc["sections"][number]["blocks"][number];

// ── Website builder (pages composed at /builder) ─────────────────
/** A page composed in the website builder; `draft`/`published` hold the block tree as JSON. */
export const builderPageSpec = defineDoc(
  "builderPage",
  "Builder page",
  {
    path: f.str("Address"),
    title: f.str("Title"),
    draft: f.text("Draft (block tree, JSON — edited in the website builder)", { rows: 6, optional: true }),
    published: f.text("Published (block tree, JSON)", { rows: 6, optional: true }),
    createdAt: f.str("Created"),
    updatedAt: f.str("Updated"),
    updatedBy: f.str("Updated by", { optional: true }),
    publishedAt: f.str("Published at", { optional: true }),
  },
  { keyField: "path" },
);
builderPageSpec.preview = { title: "title", subtitle: "path" };

/** An upload made in the website builder (the asset lives in the media library). */
export const builderMediaSpec = defineDoc(
  "builderMedia",
  "Builder upload",
  {
    url: f.str("URL"),
    name: f.str("File name"),
    type: f.str("Type"),
    size: f.num("Size (bytes)"),
    width: f.num("Width", { optional: true }),
    height: f.num("Height", { optional: true }),
    createdAt: f.str("Uploaded"),
    assetId: f.str("Asset id", { optional: true }),
  },
  { keyField: "url" },
);
builderMediaSpec.preview = { title: "name", subtitle: "type" };

/** A builder account (always kept as a private draft — never published). */
export const builderUserSpec = defineDoc(
  "builderUser",
  "Builder account",
  {
    name: f.str("Name"),
    email: f.str("Email"),
    role: f.str("Role", { list: ["admin", "editor"] }),
    passwordHash: f.str("Password hash"),
    createdAt: f.str("Created"),
  },
  { keyField: "email" },
);
builderUserSpec.preview = { title: "name", subtitle: "email" };
