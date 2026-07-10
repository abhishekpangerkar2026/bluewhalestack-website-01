/**
 * Content access layer — the CMS-ready seam.
 *
 * Today every getter reads from typed in-repo modules under /content.
 * To move to a headless CMS later, swap the bodies of these functions to
 * fetch from the CMS (Directus, etc.) and keep the same return types —
 * no component needs to change.
 */

import { editions, editionsBySlug, type EditionDef } from "@/content/editions";
import { modules, modulesBySlug, type ModuleDef } from "@/content/modules";
import { industries, industriesBySlug, type IndustryDef } from "@/content/industries";
import { solutions, solutionsBySlug, type SolutionDef } from "@/content/solutions";

// ── Editions ──────────────────────────────────────────────────
export function getEditions(): EditionDef[] {
  return editions;
}
export function getEdition(slug: string): EditionDef | undefined {
  return editionsBySlug[slug];
}

// ── Modules ───────────────────────────────────────────────────
export function getModules(): ModuleDef[] {
  return modules;
}
export function getModule(slug: string): ModuleDef | undefined {
  return modulesBySlug[slug];
}
export function getModulesForEdition(editionSlug: string): ModuleDef[] {
  const edition = editionsBySlug[editionSlug];
  if (!edition) return [];
  return edition.modules
    .map((s) => modulesBySlug[s])
    .filter((m): m is ModuleDef => Boolean(m));
}

// ── Industries ────────────────────────────────────────────────
export function getIndustries(): IndustryDef[] {
  return industries;
}
export function getIndustry(slug: string): IndustryDef | undefined {
  return industriesBySlug[slug];
}

// ── Solutions ─────────────────────────────────────────────────
export function getSolutions(): SolutionDef[] {
  return solutions;
}
export function getSolution(slug: string): SolutionDef | undefined {
  return solutionsBySlug[slug];
}
