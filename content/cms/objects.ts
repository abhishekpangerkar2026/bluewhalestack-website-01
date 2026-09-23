/**
 * Reusable object types shared by the page documents. Names are what the
 * Studio schema registers, so keep them stable once content is seeded.
 */
import { defineObject, f } from "./spec";

export const fact = defineObject("fact", "Fact", {
  value: f.str("Value"),
  label: f.str("Label"),
}, { title: "value", subtitle: "label" });

export const qa = defineObject("qa", "Question & answer", {
  q: f.str("Question"),
  a: f.text("Answer", { rows: 4 }),
}, { title: "q" });

export const titledBody = defineObject("titledBody", "Title + body", {
  title: f.str("Title"),
  body: f.text("Body"),
}, { title: "title", subtitle: "body" });

export const iconItem = defineObject("iconItem", "Icon + title + body", {
  icon: f.str("Icon (lucide name)", { description: "e.g. Plug, FileCheck, Sparkles, Landmark, Building2, Layers, Network, TrendingUp, ShieldAlert" }),
  title: f.str("Title"),
  body: f.text("Body"),
  cost: f.str("Cost line (optional, used by the 'problems' row)", { optional: true }),
}, { title: "title", subtitle: "body" });

export const cta = defineObject("cta", "Call to action", {
  label: f.str("Label"),
  href: f.str("Link"),
}, { title: "label", subtitle: "href" });

/** A button or link with the note printed under it. */
export const ctaPath = defineObject("ctaPath", "Next step", {
  label: f.str("Label"),
  href: f.str("Link"),
  note: f.str("Note under the button", { optional: true }),
}, { title: "label", subtitle: "href" });

/** Kicker + title + description — the heading every section starts with. */
export const sectionHeading = defineObject("sectionHeading", "Section heading", {
  eyebrow: f.str("Kicker", { optional: true }),
  title: f.str("Title"),
  description: f.text("Description", { optional: true }),
}, { title: "title", subtitle: "eyebrow" });

/** The dark closing band at the foot of a page. */
export const closingCta = defineObject("closingCta", "Closing call to action", {
  eyebrow: f.str("Kicker"),
  title: f.str("Title"),
  body: f.text("Body"),
  primary: f.obj("Primary button", ctaPath.fields),
  secondary: f.obj("Secondary link", ctaPath.fields, { optional: true }),
  tertiary: f.obj("Tertiary link", ctaPath.fields, { optional: true }),
}, { title: "title", subtitle: "eyebrow" });

export const labelValue = defineObject("labelValue", "Label + value", {
  label: f.str("Label"),
  value: f.str("Value"),
}, { title: "label", subtitle: "value" });

export const link = defineObject("link", "Link", {
  label: f.str("Label"),
  href: f.str("Link"),
}, { title: "label", subtitle: "href" });

export const iconLink = defineObject("iconLink", "Card with icon and link", {
  icon: f.str("Icon (lucide name)"),
  title: f.str("Title"),
  body: f.text("Body"),
  href: f.str("Link"),
}, { title: "title", subtitle: "href" });

export const step = defineObject("step", "Step", {
  title: f.str("Title"),
  body: f.text("Body"),
  when: f.str("Timing / label", { optional: true }),
  icon: f.str("Icon (lucide name)", { optional: true }),
}, { title: "title", subtitle: "when" });

export const namedBody = defineObject("namedBody", "Name + body", {
  name: f.str("Name"),
  body: f.text("Body"),
}, { title: "name", subtitle: "body" });

export const textItem = defineObject("textItem", "Text", {
  text: f.str("Text"),
}, { title: "text" });

export const tableRow = defineObject("tableRow", "Table row", {
  cells: f.strings("Cells, in column order"),
}, { title: "cells.0" });

export const stringList = defineObject("stringList", "Titled list", {
  heading: f.str("Heading"),
  items: f.strings("Items"),
}, { title: "heading" });

// ── navigation ──────────────────────────────────────────────────
export const navLink = defineObject("navLink", "Navigation link", {
  label: f.str("Label"),
  href: f.str("Link"),
  desc: f.str("One-line description (mega-menu only)", { optional: true }),
  external: f.bool("Opens in a new tab", { optional: true }),
}, { title: "label", subtitle: "href" });

export const navColumn = defineObject("navColumn", "Menu column", {
  heading: f.str("Column heading"),
  featured: f.bool("Featured column (tinted)", { optional: true }),
  links: f.arr("Links", navLink),
}, { title: "heading" });

export const navItem = defineObject("navItem", "Top-level menu item", {
  label: f.str("Label"),
  href: f.str("Overview link"),
  columns: f.arr("Mega-menu columns (leave empty for a plain link)", navColumn, { optional: true }),
}, { title: "label", subtitle: "href" });

export const linkGroup = defineObject("linkGroup", "Link group", {
  heading: f.str("Heading"),
  links: f.arr("Links", navLink),
}, { title: "heading" });

export const contextNav = defineObject("contextNav", "Section navigation", {
  key: f.str("Section key (code)", { description: "platform · solutions · resources · company · pricing · legal — matched by the page code, do not change" }),
  label: f.str("Label"),
  links: f.arr("Links", navLink),
}, { title: "label", subtitle: "key" });

// ── company ─────────────────────────────────────────────────────
export const office = defineObject("office", "Office", {
  city: f.str("City (code key — matches the skyline illustration)"),
  label: f.str("Label, e.g. India — Headquarters"),
  entity: f.str("Legal entity"),
  blurb: f.text("One-line blurb", { rows: 2 }),
  address: f.text("Address", { rows: 2 }),
}, { title: "city", subtitle: "label" });

export const phone = defineObject("phone", "Phone line", {
  region: f.str("Region"),
  number: f.str("Number"),
  hours: f.str("Hours"),
}, { title: "region", subtitle: "number" });

export const region = defineObject("region", "SaaS region", {
  code: f.str("Code (e.g. SIN)"),
  city: f.str("City"),
  country: f.str("Country", { optional: true }),
  serves: f.str("Serves", { optional: true }),
  compliance: f.strings("Compliance tags", { optional: true }),
}, { title: "city", subtitle: "code" });
