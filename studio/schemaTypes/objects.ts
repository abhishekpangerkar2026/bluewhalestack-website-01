import { defineField, defineType } from "sanity";

/** Reusable field groups that mirror the site's typed content shapes. */

export const fact = defineType({
  name: "fact",
  title: "Fact",
  type: "object",
  fields: [
    defineField({ name: "value", title: "Value", type: "string", validation: (r) => r.required() }),
    defineField({ name: "label", title: "Label", type: "string", validation: (r) => r.required() }),
  ],
  preview: { select: { title: "value", subtitle: "label" } },
});

export const qa = defineType({
  name: "qa",
  title: "Question & answer",
  type: "object",
  fields: [
    defineField({ name: "q", title: "Question", type: "string", validation: (r) => r.required() }),
    defineField({ name: "a", title: "Answer", type: "text", rows: 4, validation: (r) => r.required() }),
  ],
  preview: { select: { title: "q" } },
});

export const titledBody = defineType({
  name: "titledBody",
  title: "Title + body",
  type: "object",
  fields: [
    defineField({ name: "title", title: "Title", type: "string", validation: (r) => r.required() }),
    defineField({ name: "body", title: "Body", type: "text", rows: 3, validation: (r) => r.required() }),
  ],
  preview: { select: { title: "title", subtitle: "body" } },
});

export const iconItem = defineType({
  name: "iconItem",
  title: "Icon + title + body",
  type: "object",
  fields: [
    defineField({
      name: "icon",
      title: "Icon (lucide name)",
      type: "string",
      description: "e.g. Plug, FileCheck, Sparkles, Landmark, Building2, Layers, Network, TrendingUp, ShieldAlert",
    }),
    defineField({ name: "title", title: "Title", type: "string", validation: (r) => r.required() }),
    defineField({ name: "body", title: "Body", type: "text", rows: 3 }),
    defineField({ name: "cost", title: "Cost line (optional, used by the 'problems' row)", type: "string" }),
  ],
  preview: { select: { title: "title", subtitle: "body" } },
});

export const cta = defineType({
  name: "cta",
  title: "Call to action",
  type: "object",
  fields: [
    defineField({ name: "label", title: "Label", type: "string", validation: (r) => r.required() }),
    defineField({ name: "href", title: "Link", type: "string", validation: (r) => r.required() }),
  ],
  preview: { select: { title: "label", subtitle: "href" } },
});

export const regime = defineType({
  name: "regime",
  title: "Regime",
  type: "object",
  fields: [
    defineField({ name: "name", title: "Regime", type: "string", validation: (r) => r.required() }),
    defineField({ name: "demands", title: "What it demands", type: "text", rows: 2 }),
    defineField({ name: "control", title: "The control that answers it", type: "text", rows: 2 }),
  ],
  preview: { select: { title: "name", subtitle: "demands" } },
});

export const useCase = defineType({
  name: "useCase",
  title: "Use case",
  type: "object",
  fields: [
    defineField({ name: "title", title: "Title", type: "string", validation: (r) => r.required() }),
    defineField({ name: "body", title: "Body", type: "text", rows: 3 }),
    defineField({ name: "modules", title: "Module slugs", type: "array", of: [{ type: "string" }] }),
  ],
  preview: { select: { title: "title" } },
});

export const revenueStream = defineType({
  name: "revenueStream",
  title: "Revenue stream",
  type: "object",
  fields: [
    defineField({ name: "name", title: "Name", type: "string" }),
    defineField({ name: "body", title: "Body", type: "text", rows: 2 }),
    defineField({ name: "character", title: "Character", type: "string", description: "e.g. Recurring · flagship" }),
  ],
  preview: { select: { title: "name", subtitle: "character" } },
});

export const phase = defineType({
  name: "phase",
  title: "Phase",
  type: "object",
  fields: [
    defineField({ name: "name", title: "Name", type: "string" }),
    defineField({ name: "timeframe", title: "Timeframe", type: "string" }),
    defineField({ name: "body", title: "Body", type: "text", rows: 2 }),
  ],
  preview: { select: { title: "name", subtitle: "timeframe" } },
});

export const operatorProfile = defineType({
  name: "operatorProfile",
  title: "Operator profile",
  type: "object",
  fields: [
    defineField({ name: "audience", title: "Audience", type: "string" }),
    defineField({ name: "proposition", title: "Proposition", type: "text", rows: 4 }),
    defineField({ name: "revenueStreams", title: "Revenue streams", type: "array", of: [{ type: "revenueStream" }] }),
    defineField({ name: "phases", title: "Phases", type: "array", of: [{ type: "phase" }] }),
  ],
  preview: { select: { title: "audience" } },
});

/** A photograph with alt text and a hotspot (the crop focus). */
export const photoField = (name = "image", title = "Photograph") =>
  defineField({
    name,
    title,
    type: "image",
    options: { hotspot: true },
    fields: [defineField({ name: "alt", title: "Alt text (describe the picture)", type: "string" })],
  });

/** Optional hero video: an uploaded MP4/WebM, or an external URL (Cloudinary, etc.). */
export const videoFields = () => [
  defineField({
    name: "video",
    title: "Hero video — upload (MP4 or WebM, muted autoplay; keep under ~8 MB)",
    type: "file",
    options: { accept: "video/mp4,video/webm" },
  }),
  defineField({
    name: "videoUrl",
    title: "Hero video — external URL (used if no upload)",
    type: "url",
    description: "A direct .mp4/.webm link, e.g. from Cloudinary. The photograph becomes the poster frame.",
  }),
];

export const objectTypes = [fact, qa, titledBody, iconItem, cta, regime, useCase, revenueStream, phase, operatorProfile];
