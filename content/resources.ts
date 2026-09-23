/**
 * Resource library — one entry per document in content/documents.ts. Every
 * resource is readable online at `href` and downloadable as a PDF at `pdf`;
 * nothing is gated.
 */
import { documents, docTypeOrder, type DocType, type DocumentDef } from "./documents";

export type ResourceType = DocType;

export interface ResourceDef {
  slug: string;
  type: ResourceType;
  title: string;
  summary: string;
  meta: string;
  topic: string;
  /** key of the 3D scene used as the cover art */
  scene: string;
  href: string;
  pdf: string;
}

export const resourceTypes: ResourceType[] = docTypeOrder;

export const resourcesFrom = (docs: DocumentDef[]): ResourceDef[] =>
  docs.map((d) => ({
    slug: d.slug,
    type: d.type,
    title: d.title,
    summary: d.summary,
    meta: d.meta,
    topic: d.topic,
    scene: d.scene,
    href: `/resources/${d.slug}`,
    pdf: `/docs/${d.slug}.pdf`,
  }));

/** The library as the typed modules define it (fallback); pages use `getDocuments()` for the CMS-backed list. */
export const resources: ResourceDef[] = resourcesFrom(documents);
