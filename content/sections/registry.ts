/**
 * Pairs every spec-driven document with the content the code ships — the
 * seed script loads exactly this into the dataset, so editors start with
 * every page already filled in.
 */
import type { DocSpec } from "@/content/cms/spec";
import { siteSettingsSpec } from "@/content/cms/docs/siteSettings";
import { platformPageSpec } from "@/content/cms/docs/platformPage";
import { capabilityFamilySpec } from "@/content/cms/docs/capabilityFamily";
import { certificationSpec, docPageSpec, jobOpeningSpec, legalPageSpec, partnerTrackSpec } from "@/content/cms/docs/collections";
import { siteSettings } from "./siteSettings";
import { platformPage } from "./platformPage";
import { certificationsFallback, familiesFallback, jobsFallback, partnerTracksFallback } from "./collections";
import { legalPages } from "./legalPages";
import { docPagesFallback } from "./docPages";
import { pageContent } from "./pages";

export interface SingletonEntry { spec: DocSpec; content: Record<string, unknown> }
export interface CollectionEntry { spec: DocSpec; rows: Record<string, unknown>[]; keyOf: (row: Record<string, unknown>) => string }

export const singletonEntries: SingletonEntry[] = [
  { spec: siteSettingsSpec, content: siteSettings },
  { spec: platformPageSpec, content: platformPage },
  ...pageContent,
];

const bySlug = (row: Record<string, unknown>) => String(row.slug);
export const collectionEntries: CollectionEntry[] = [
  { spec: capabilityFamilySpec, rows: familiesFallback, keyOf: (r) => String(r.key) },
  { spec: certificationSpec, rows: certificationsFallback, keyOf: bySlug },
  { spec: jobOpeningSpec, rows: jobsFallback, keyOf: (r) => String(r.title) },
  { spec: partnerTrackSpec, rows: partnerTracksFallback, keyOf: bySlug },
  { spec: legalPageSpec, rows: legalPages, keyOf: bySlug },
  { spec: docPageSpec, rows: docPagesFallback, keyOf: bySlug },
];
