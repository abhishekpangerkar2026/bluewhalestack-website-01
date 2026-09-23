/**
 * Developer docs (content/docs.ts) in CMS shape and back: the code's
 * discriminated `type` becomes the Sanity `_type` per block.
 */
import type { DocBlockDoc, DocPageDoc } from "@/content/cms/docs/collections";
import { docPages, type ContentBlock, type DocPageDef } from "@/content/docs";

const TYPE_TO_CMS: Record<ContentBlock["type"], DocBlockDoc["_type"]> = {
  p: "docP", h3: "docH3", callout: "docCallout", code: "docCode", steps: "docSteps", list: "docList", grid: "docGrid",
};

export function blockToCms(b: ContentBlock): DocBlockDoc {
  switch (b.type) {
    case "p": return { _type: "docP", text: b.text };
    case "h3": return { _type: "docH3", text: b.text };
    case "callout": return { _type: "docCallout", variant: b.variant, text: b.text };
    case "code": return { _type: "docCode", lang: b.lang, code: b.code, label: b.label };
    case "steps": return { _type: "docSteps", items: b.items.map((s) => ({ title: s.title, body: s.body, code: s.code })) };
    case "list": return { _type: "docList", items: [...b.items] };
    case "grid": return { _type: "docGrid", items: b.items.map((i) => ({ icon: i.icon, title: i.title, body: i.body })) };
  }
}

export function blockFromCms(b: DocBlockDoc): ContentBlock | null {
  switch (b._type) {
    case "docP": return { type: "p", text: b.text };
    case "docH3": return { type: "h3", text: b.text };
    case "docCallout": return { type: "callout", variant: (["note", "tip", "warning"].includes(b.variant) ? b.variant : "note") as "note" | "tip" | "warning", text: b.text };
    case "docCode": return { type: "code", lang: b.lang, code: b.code, label: b.label || undefined };
    case "docSteps": return { type: "steps", items: (b.items ?? []).map((s) => ({ title: s.title, body: s.body, code: s.code || undefined })) };
    case "docList": return { type: "list", items: b.items ?? [] };
    case "docGrid": return { type: "grid", items: (b.items ?? []).map((i) => ({ icon: i.icon ?? "Circle", title: i.title, body: i.body ?? "" })) };
    default: return null;
  }
}

export const docPageToCms = (p: DocPageDef): DocPageDoc => ({
  slug: p.slug,
  title: p.title,
  description: p.description,
  tags: [...p.tags],
  icon: p.icon,
  readTime: p.readTime,
  sections: p.sections.map((s) => ({ id: s.id, heading: s.heading, blocks: s.blocks.map(blockToCms) })),
});

/** prev/next follow the collection order, exactly as the code's hand-written links do today. */
export function docPagesFromCms(rows: DocPageDoc[]): DocPageDef[] {
  return rows.map((r, i) => ({
    slug: r.slug,
    title: r.title,
    description: r.description,
    tags: r.tags ?? [],
    icon: r.icon,
    readTime: r.readTime,
    sections: (r.sections ?? []).map((s) => ({ id: s.id, heading: s.heading, blocks: (s.blocks ?? []).map(blockFromCms).filter((b): b is ContentBlock => b !== null) })),
    prev: i > 0 ? { slug: rows[i - 1].slug, title: rows[i - 1].title } : undefined,
    next: i < rows.length - 1 ? { slug: rows[i + 1].slug, title: rows[i + 1].title } : undefined,
  }));
}

export const docPagesFallback: DocPageDoc[] = docPages.map(docPageToCms);
export const DOC_BLOCK_TYPES = TYPE_TO_CMS;
