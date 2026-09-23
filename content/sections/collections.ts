/**
 * Fallback rows for the CMS collections, built from the code's typed content
 * — and the converters back to the shapes the components render.
 */
import type { CertificationDoc, JobOpeningDoc, PartnerTrackDoc } from "@/content/cms/docs/collections";
import type { CapabilityFamily } from "@/content/cms/docs/capabilityFamily";
import { moduleGroupBlurbs, moduleGroupIcons, moduleGroupOrder, moduleGroups } from "@/content/modules";
import { certifications, type Certification, type CertCategory, type DocAccess } from "@/content/trust";
import { jobs, type Job } from "@/content/careers";
import { tracks, type PartnerTrack } from "@/content/partners";

// ── capability families ─────────────────────────────────────────
/** The nine families as the code ships them (fallback + seed source). */
export const familiesFallback: CapabilityFamily[] = moduleGroupOrder.map((key) => ({
  key,
  name: moduleGroups[key],
  blurb: moduleGroupBlurbs[key],
  icon: moduleGroupIcons[key],
}));

// ── certifications ──────────────────────────────────────────────
export const certificationsFallback: CertificationDoc[] = certifications.map(({ id, audit, documents, ...c }) => ({
  ...c,
  slug: id,
  audit: audit ? { ...audit } : undefined,
  documents: documents?.map((d) => ({ ...d })),
}));

const CATEGORIES: CertCategory[] = ["information-security", "privacy", "cloud-security", "business-continuity", "compliance"];
const ACCESS: DocAccess[] = ["public", "contract", "nda"];
const TONES = ["success", "neutral", "warning"] as const;

export function certificationFromCms(row: CertificationDoc & { cmsId?: string }): Certification {
  const { slug, audit, documents, statusTone, category, cmsId: _cmsId, ...rest } = row;
  return {
    ...rest,
    id: slug,
    category: CATEGORIES.includes(category as CertCategory) ? (category as CertCategory) : "compliance",
    statusTone: TONES.includes(statusTone as (typeof TONES)[number]) ? (statusTone as (typeof TONES)[number]) : undefined,
    audit: audit && Object.values(audit).some(Boolean) ? audit : undefined,
    documents: documents?.length ? documents.map((d) => ({ title: d.title, access: ACCESS.includes(d.access as DocAccess) ? (d.access as DocAccess) : "nda" })) : undefined,
  };
}

// ── jobs ────────────────────────────────────────────────────────
export const jobsFallback: JobOpeningDoc[] = jobs.map((j) => ({ ...j }));
export const jobFromCms = (row: JobOpeningDoc): Job & { applyUrl?: string } => ({
  title: row.title, department: row.department, location: row.location, type: row.type, remote: row.remote, applyUrl: row.applyUrl || undefined,
});

// ── partner tracks ──────────────────────────────────────────────
export const partnerTracksFallback: PartnerTrackDoc[] = tracks.map((t) => ({
  ...t,
  benefits: [...t.benefits],
  journey: t.journey.map((j) => ({ ...j })),
}));
const TRACK_SLUGS: PartnerTrack["slug"][] = ["lsp", "implementation", "strategic"];
export function partnerTrackFromCms(row: PartnerTrackDoc): PartnerTrack | null {
  if (!TRACK_SLUGS.includes(row.slug as PartnerTrack["slug"])) return null;
  return { ...row, slug: row.slug as PartnerTrack["slug"], benefits: row.benefits ?? [], journey: row.journey ?? [] };
}
