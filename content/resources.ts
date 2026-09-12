/**
 * Resource library — one entry per document in content/documents.ts. Every
 * resource is readable online at `href` and downloadable as a PDF at `pdf`;
 * nothing is gated.
 */
import { documents, docTypeOrder, type DocType } from "./documents";

export type ResourceType = DocType;

export interface ResourceDef {
  slug: string;
  type: ResourceType;
  title: string;
  summary: string;
  meta: string;
  topic: string;
  href: string;
  pdf: string;
}

export const resourceTypes: ResourceType[] = docTypeOrder;

export const resources: ResourceDef[] = documents.map((d) => ({
  slug: d.slug,
  type: d.type,
  title: d.title,
  summary: d.summary,
  meta: d.meta,
  topic: d.topic,
  href: `/resources/${d.slug}`,
  pdf: `/docs/${d.slug}.pdf`,
}));
