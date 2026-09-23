/**
 * Content access layer — the CMS seam.
 *
 * Every getter asks the CMS first (lib/cms.ts) and falls back to the typed
 * in-repo modules under /content when the CMS is not configured, a query
 * fails, or the documents are not there yet. Components only ever see the
 * same typed shapes, so filling the CMS in page by page changes nothing in
 * the UI code.
 */

import { editions, type EditionDef } from "@/content/editions";
import { modules, type ModuleDef } from "@/content/modules";
import { moduleDetails, type ModuleDetail } from "@/content/moduleDetails";
import { industries, type IndustryDef } from "@/content/industries";
import { solutions, type SolutionDef } from "@/content/solutions";
import { customerStories, type CustomerStory } from "@/content/customers";
import { leadership, type LeadershipMember } from "@/content/about";
import { announcements, type Announcement } from "@/content/newsroom";
import { collateral, collateralHref, type CollateralDoc } from "@/content/collateral";
import { hero as homeHero, story as homeStory, proofStrip, problems, differentiators, portfolio } from "@/content/home";
import type { CmsImage, CmsRef, CmsVideo } from "@/content/cmsTypes";
import { cmsFetch, toCmsImage, ref } from "@/lib/cms";
import { getCollection, getPageDoc, mergeContent } from "@/lib/cms-page";
import { homePageExtras, type HomeExtras } from "@/content/cms/docs/homePage";
import { homeExtras } from "@/content/sections/homePage";
import { siteSettingsSpec, type SiteSettings } from "@/content/cms/docs/siteSettings";
import { siteSettings } from "@/content/sections/siteSettings";
import { capabilityFamilySpec, type CapabilityFamily } from "@/content/cms/docs/capabilityFamily";
import { moduleGroupOrder, type ModuleGroup } from "@/content/modules";
import { certificationSpec, docPageSpec, jobOpeningSpec, legalPageSpec, partnerTrackSpec, type LegalPageDoc } from "@/content/cms/docs/collections";
import { certificationFromCms, certificationsFallback, familiesFallback, jobFromCms, jobsFallback, partnerTrackFromCms, partnerTracksFallback } from "@/content/sections/collections";
import { legalPages } from "@/content/sections/legalPages";
import { docPagesFallback, docPagesFromCms } from "@/content/sections/docPages";
import { buildDocuments, defaultSources, documents as staticDocuments, type DocSources, type DocumentDef } from "@/content/documents";
import { platformPageSpec } from "@/content/cms/docs/platformPage";
import { platformPage } from "@/content/sections/platformPage";
import { platformHero as staticPlatformHero } from "@/content/platform";
import { aboutPageSpec } from "@/content/cms/docs/aboutPage";
import { aboutPage } from "@/content/sections/aboutPage";
import { aboutHero as staticAboutHero } from "@/content/about";
import { trustPageSpec } from "@/content/cms/docs/trustPage";
import { trustPage } from "@/content/sections/trustPage";
import type { Certification } from "@/content/trust";
import type { Job } from "@/content/careers";
import type { PartnerTrack } from "@/content/partners";
import type { DocPageDef } from "@/content/docs";
import {
  homePageQuery,
  pageHeroQuery,
  editionsQuery,
  modulesQuery,
  industriesQuery,
  solutionsQuery,
  customerStoriesQuery,
  teamQuery,
  postsQuery,
  collateralQuery,
} from "@/lib/cms-queries";

type RawImage = Parameters<typeof toCmsImage>[0];
type WithImage<T> = Omit<T, "image"> & { image?: RawImage; _id?: string };

const list = <T>(rows: T[] | null | undefined): T[] | null => (rows && rows.length > 0 ? rows : null);

// ── Site settings (navigation, footer, contact details) ───────
export type { SiteSettings };
export const getSiteSettings = (): Promise<SiteSettings> => getPageDoc(siteSettingsSpec, siteSettings);

// ── Capability families ───────────────────────────────────────
export type Family = Omit<CapabilityFamily, "key"> & { key: ModuleGroup; cmsId?: string };
/** The families in official order; only keys the module catalog knows are returned. */
export async function getFamilies(): Promise<Family[]> {
  const rows = await getCollection(capabilityFamilySpec, familiesFallback, (fam) => fam.key);
  const known = new Set<string>(moduleGroupOrder);
  return rows.filter((r) => known.has(r.key)) as Family[];
}

// ── Trust Center certifications ───────────────────────────────
export async function getCertifications(): Promise<(Certification & { cmsId?: string })[]> {
  const rows = await getCollection(certificationSpec, certificationsFallback, (c) => c.slug);
  return rows.map((r) => ({ ...certificationFromCms(r), cmsId: r.cmsId }));
}

// ── Careers: open roles ───────────────────────────────────────
export async function getJobs(): Promise<(Job & { applyUrl?: string; cmsId?: string })[]> {
  const rows = await getCollection(jobOpeningSpec, jobsFallback, (j) => j.title);
  return rows.map((r) => ({ ...jobFromCms(r), cmsId: r.cmsId }));
}

// ── Partner tracks ────────────────────────────────────────────
export async function getPartnerTracks(): Promise<(PartnerTrack & { cmsId?: string })[]> {
  const rows = await getCollection(partnerTrackSpec, partnerTracksFallback, (t) => t.slug);
  const out: (PartnerTrack & { cmsId?: string })[] = [];
  for (const r of rows) {
    const track = partnerTrackFromCms(r);
    if (track) out.push({ ...track, cmsId: r.cmsId });
  }
  return out;
}

// ── Legal pages ───────────────────────────────────────────────
export async function getLegalPage(slug: string): Promise<(LegalPageDoc & { cmsId?: string }) | undefined> {
  const rows = await getCollection(legalPageSpec, legalPages, (p) => p.slug);
  return rows.find((p) => p.slug === slug);
}

// ── Developer docs ────────────────────────────────────────────
export async function getDocPages(): Promise<(DocPageDef & { cmsId?: string })[]> {
  const rows = await getCollection(docPageSpec, docPagesFallback, (p) => p.slug);
  const pages = docPagesFromCms(rows);
  return pages.map((p, i) => ({ ...p, cmsId: rows[i].cmsId }));
}
export async function getDocPage(slug: string): Promise<(DocPageDef & { cmsId?: string }) | undefined> {
  return (await getDocPages()).find((p) => p.slug === slug);
}

// ── The resource library (28 generated documents) ─────────────
/** Every document, assembled from the CMS-backed content — so the PDF reading pages follow edits. */
export async function getDocuments(): Promise<DocumentDef[]> {
  const [editions, solutions, industries, modules, families, stories, platform, platformHero, certifications, team, settings, about, aboutHero, trust] = await Promise.all([
    getEditions(), getSolutions(), getIndustries(), getModules(), getFamilies(), getCustomerStories(),
    getPageDoc(platformPageSpec, platformPage), getPageHero("/platform"), getCertifications(), getTeam(), getSiteSettings(),
    getPageDoc(aboutPageSpec, aboutPage), getPageHero("/about"), getPageDoc(trustPageSpec, trustPage),
  ]);
  const heroTitle = (hero: PageHeroOverride | null, fallback: string) =>
    hero?.title ? `${hero.title}${hero.titleAccent ? ` ${hero.titleAccent}` : ""}` : fallback;
  const details = await Promise.all(modules.map(async (m) => [m.slug, await getModuleDetail(m.slug)] as const));
  const moduleDetails: DocSources["moduleDetails"] = {};
  for (const [slug, d] of details) if (d) moduleDetails[slug] = d;
  const sources: DocSources = {
    ...defaultSources,
    editions, solutions, industries, modules, customerStories: stories,
    moduleGroups: Object.fromEntries(families.map((f) => [f.key, f.name])),
    moduleGroupOrder: families.map((f) => f.key),
    moduleGroupBlurbs: Object.fromEntries(families.map((f) => [f.key, f.blurb])),
    moduleDetails,
    platformHero: {
      title: heroTitle(platformHero, staticPlatformHero.title),
      description: platformHero?.description ?? staticPlatformHero.description,
      tagline: platform.hero.tagline,
    },
    heroStats: platform.hero.stats,
    whatItReplaces: platform.replaces.rows,
    architectureLayers: platform.architecture.layers,
    deploymentModes: platform.deployment.modes,
    deploymentNote: platform.deployment.note,
    supportModel: platform.support.items,
    prototypeOffer: { title: platform.prototype.title, steps: platform.prototype.steps },
    whaleTiers: platform.whaleAi.tiers,
    securityPosture: platform.trust.posture,
    platformFaq: platform.faq.items,
    whyNow: platform.who.whyNow,
    certifications,
    leadership: team,
    company: { name: settings.company.name, emails: { sales: settings.company.emails.sales }, phones: settings.company.phones, social: { linkedin: settings.company.social.linkedin } },
    offices: settings.offices,
    regions: settings.regions,
    // Trust Center and About pages
    trustFaq: trust.faq.items,
    trustPillars: trust.pillars.items,
    aboutHero: { title: heroTitle(aboutHero, staticAboutHero.title), mission: about.seoDescription },
    companyFacts: about.facts,
    missionVision: { mission: about.missionVision.mission, vision: about.missionVision.vision },
    story: about.story.items.map((s) => ({ heading: s.title, body: s.body })),
    principles: about.principles.items,
    productFamily: about.products.items,
    services: about.services.items,
    servicesNote: about.services.note,
    milestones: about.journey.items,
    trustPoints: about.trust.points,
  };
  try {
    return buildDocuments(sources);
  } catch (error) {
    console.error("[documents] assembling from CMS content failed — using the typed fallback", error);
    return staticDocuments;
  }
}
export async function getDocument(slug: string): Promise<DocumentDef | undefined> {
  return (await getDocuments()).find((d) => d.slug === slug);
}
const clean = <T extends object>(row: T): T =>
  Object.fromEntries(Object.entries(row).filter(([, v]) => v !== null && v !== undefined)) as T;

// ── Editions ──────────────────────────────────────────────────
export async function getEditions(): Promise<EditionDef[]> {
  type Row = WithImage<EditionDef> & { operatorProfiles?: NonNullable<EditionDef["operatorModel"]>["profiles"] | null };
  const rows = list(await cmsFetch<Row[]>(editionsQuery, {}, ["edition"]));
  if (!rows) return editions;
  return rows.map(({ image, operatorProfiles, ...r }) =>
    clean({
      ...r,
      faq: r.faq ?? [],
      fitFor: r.fitFor ?? [],
      notFor: r.notFor ?? [],
      includes: r.includes ?? [],
      deploy: r.deploy ?? [],
      highlights: r.highlights ?? [],
      modules: r.modules ?? [],
      operatorModel: operatorProfiles?.length ? { profiles: operatorProfiles } : undefined,
      cmsId: r._id,
      cmsImage: toCmsImage(image, ref(r._id, "edition", "image")),
    }) as EditionDef,
  );
}
export async function getEdition(slug: string): Promise<EditionDef | undefined> {
  return (await getEditions()).find((e) => e.slug === slug);
}

// ── Modules ───────────────────────────────────────────────────
type ModuleRow = WithImage<ModuleDef> & Partial<Omit<ModuleDetail, "screen">>;

async function moduleRows(): Promise<ModuleRow[] | null> {
  return list(await cmsFetch<ModuleRow[]>(modulesQuery, {}, ["module"]));
}
export async function getModules(): Promise<ModuleDef[]> {
  const rows = await moduleRows();
  if (!rows) return modules;
  return rows.map(({ image, status, summary, facts, capabilities, howItWorks, faq, ...m }) =>
    clean({ ...m, features: m.features ?? [], cmsId: m._id, cmsImage: toCmsImage(image, ref(m._id, "module", "image")) }) as ModuleDef,
  );
}
export async function getModule(slug: string): Promise<ModuleDef | undefined> {
  return (await getModules()).find((m) => m.slug === slug);
}
export async function getModulesForEdition(editionSlug: string): Promise<ModuleDef[]> {
  const [edition, all] = await Promise.all([getEdition(editionSlug), getModules()]);
  if (!edition) return [];
  const bySlug = Object.fromEntries(all.map((m) => [m.slug, m]));
  return edition.modules.map((s) => bySlug[s]).filter((m): m is ModuleDef => Boolean(m));
}
/** Long-form module page content; the console screen mock-up stays in code (keyed by slug). */
export async function getModuleDetail(slug: string): Promise<(Omit<ModuleDetail, "screen"> & { screen?: ModuleDetail["screen"] }) | undefined> {
  const code = moduleDetails[slug];
  const rows = await moduleRows();
  const row = rows?.find((m) => m.slug === slug);
  if (!row) return code;
  if (!row.summary && !code) return undefined;
  return {
    status: row.status ?? code?.status ?? { label: "Available", tone: "neutral" },
    summary: row.summary ?? code?.summary ?? row.description,
    facts: row.facts ?? code?.facts ?? [],
    capabilities: row.capabilities ?? code?.capabilities ?? [],
    howItWorks: row.howItWorks ?? code?.howItWorks ?? [],
    faq: row.faq ?? code?.faq ?? [],
    screen: code?.screen,
  };
}

// ── Industries ────────────────────────────────────────────────
export async function getIndustries(): Promise<IndustryDef[]> {
  const rows = list(await cmsFetch<WithImage<IndustryDef>[]>(industriesQuery, {}, ["industry"]));
  if (!rows) return industries;
  return rows.map(({ image, ...i }) =>
    clean({
      ...i,
      kpis: i.kpis ?? [],
      why: i.why ?? [],
      targets: i.targets ?? [],
      compliance: i.compliance ?? [],
      regimes: i.regimes ?? [],
      faq: i.faq ?? [],
      cmsId: i._id,
      cmsImage: toCmsImage(image, ref(i._id, "industry", "image")),
    }) as IndustryDef,
  );
}
export async function getIndustry(slug: string): Promise<IndustryDef | undefined> {
  return (await getIndustries()).find((i) => i.slug === slug);
}

// ── Solutions ─────────────────────────────────────────────────
export async function getSolutions(): Promise<SolutionDef[]> {
  const rows = list(await cmsFetch<WithImage<SolutionDef>[]>(solutionsQuery, {}, ["solution"]));
  if (!rows) return solutions;
  return rows.map(({ image, ...s }) =>
    clean({
      ...s,
      symptoms: s.symptoms ?? [],
      features: s.features ?? [],
      facts: s.facts ?? [],
      modules: s.modules ?? [],
      faq: s.faq ?? [],
      cmsId: s._id,
      cmsImage: toCmsImage(image, ref(s._id, "solution", "image")),
    }) as SolutionDef,
  );
}
export async function getSolution(slug: string): Promise<SolutionDef | undefined> {
  return (await getSolutions()).find((s) => s.slug === slug);
}

// ── Customer stories ──────────────────────────────────────────
export async function getCustomerStories(): Promise<CustomerStory[]> {
  const rows = list(await cmsFetch<WithImage<CustomerStory>[]>(customerStoriesQuery, {}, ["customerStory"]));
  if (!rows) return customerStories;
  return rows.map(({ image, ...c }) => {
    const cmsImage = toCmsImage(image, ref(c._id, "customerStory", "image"));
    return clean({
      cmsId: c._id,
      ...c,
      imageAlt: c.imageAlt ?? cmsImage?.alt ?? c.headline,
      metrics: c.metrics ?? [],
      person: c.person ?? { name: "", role: "", initials: "" },
      cmsImage,
    }) as CustomerStory;
  });
}
export async function getCustomerStory(slug: string): Promise<CustomerStory | undefined> {
  return (await getCustomerStories()).find((c) => c.slug === slug);
}

// ── Team ──────────────────────────────────────────────────────
export async function getTeam(): Promise<LeadershipMember[]> {
  const rows = list(await cmsFetch<WithImage<LeadershipMember>[]>(teamQuery, {}, ["teamMember"]));
  if (!rows) return leadership;
  return rows.map(({ image, ...m }) => clean({ ...m, cmsId: m._id, cmsImage: toCmsImage(image, ref(m._id, "teamMember", "image")) }) as LeadershipMember);
}

// ── Newsroom ──────────────────────────────────────────────────
export async function getPosts(): Promise<Announcement[]> {
  const rows = list(await cmsFetch<WithImage<Announcement & { slug?: string }>[]>(postsQuery, {}, ["post"]));
  if (!rows) return announcements;
  return rows.map(({ image, ...p }) => clean({ ...p, cmsId: p._id, cmsImage: toCmsImage(image, ref(p._id, "post", "image")) }) as Announcement);
}

// ── Official collateral ───────────────────────────────────────
export type CollateralItem = CollateralDoc & { url: string };
export async function getCollateral(): Promise<CollateralItem[]> {
  type Row = { title: string; kind: CollateralDoc["kind"]; blurb?: string; url?: string; size?: number };
  const rows = list(await cmsFetch<Row[]>(collateralQuery, {}, ["collateralDoc"]));
  if (!rows) return collateral.map((d) => ({ ...d, url: collateralHref(d) }));
  return rows
    .filter((r) => r.url)
    .map((r) => ({
      title: r.title,
      kind: r.kind,
      file: r.url!.split("/").pop() ?? "",
      blurb: r.blurb ?? "",
      size: r.size ? `${(r.size / 1024 / 1024).toFixed(1)} MB` : "",
      url: r.url!,
    }));
}

// ── Page heroes ───────────────────────────────────────────────
export interface PageHeroOverride {
  /** CMS document id — lets the hero picture open its upload field in preview */
  id?: string;
  eyebrow?: string;
  title?: string;
  titleAccent?: string;
  description?: string;
  image?: CmsImage;
  video?: CmsVideo;
}
export async function getPageHero(route: string): Promise<PageHeroOverride | null> {
  type Row = { _id: string; eyebrow?: string; title?: string; titleAccent?: string; description?: string; image?: RawImage; video?: CmsVideo | null };
  const row = await cmsFetch<Row | null>(pageHeroQuery, { route }, ["pageHero"]);
  if (!row) return null;
  return clean({
    id: row._id,
    eyebrow: row.eyebrow ?? undefined,
    title: row.title ?? undefined,
    titleAccent: row.titleAccent ?? undefined,
    description: row.description ?? undefined,
    image: toCmsImage(row.image, ref(row._id, "pageHero", "image")),
    video: row.video ? { ...row.video, sanity: ref(row._id, "pageHero", "video") } : undefined,
  });
}

// ── Home page ─────────────────────────────────────────────────
export interface HomeContent {
  hero: typeof homeHero & { image?: CmsImage; video?: CmsVideo; titleAccent?: string; editRef?: CmsRef };
  story: typeof homeStory;
  proofStrip: typeof proofStrip;
  problems: typeof problems;
  differentiators: typeof differentiators;
  portfolio: {
    eyebrow: string;
    title: string;
    description: string;
    note: string;
    products: { name: string; role: string; body: string; status: string; href: string; photo?: (typeof portfolio.products)[number]["photo"]; image?: CmsImage; editRef?: CmsRef }[];
  };
  /** the remaining landing-page sections (content/cms/docs/homePage.ts) */
  sections: HomeExtras;
  cmsId?: string;
}

export async function getHomePage(): Promise<HomeContent> {
  type Row = {
    badge?: string; title?: string; titleAccent?: string; description?: string;
    primaryCta?: { label: string; href: string }; primaryNote?: string; secondaryCta?: { label: string; href: string };
    facts?: { value: string; label: string }[]; image?: RawImage; video?: CmsVideo | null;
    storyEyebrow?: string; storyHook?: string; storyProblem?: string; storyTurn?: string;
    problems?: { icon?: string; title: string; body?: string; cost?: string }[];
    proof?: { value: string; label: string; source?: string; href?: string }[];
    differentEyebrow?: string; differentTitle?: string; differentDescription?: string;
    differentiators?: { icon?: string; title: string; body?: string }[];
    portfolioEyebrow?: string; portfolioTitle?: string; portfolioDescription?: string; portfolioNote?: string;
    products?: { _key?: string; name: string; role?: string; body?: string; status?: string; href?: string; image?: RawImage }[];
  } & Partial<Record<keyof HomeExtras, unknown>> | null;
  const fallback: HomeContent = {
    hero: homeHero,
    story: homeStory,
    proofStrip,
    problems,
    differentiators,
    portfolio: { ...portfolio, products: portfolio.products.map((p) => ({ ...p })) },
    sections: homeExtras,
  };
  const row = await cmsFetch<Row>(homePageQuery, {}, ["homePage"]);
  if (!row) return fallback;
  const extras = Object.fromEntries(Object.keys(homePageExtras).map((k) => [k, row[k as keyof HomeExtras]]));
  const facts = row.facts?.length ? row.facts.map((f) => ({ value: /^\d+$/.test(f.value) ? Number(f.value) : f.value, label: f.label })) : homeHero.facts;
  return {
    hero: {
      ...homeHero,
      badge: row.badge ?? homeHero.badge,
      title: row.title ?? homeHero.title,
      titleAccent: row.titleAccent ?? undefined,
      description: row.description ?? homeHero.description,
      primaryCta: row.primaryCta?.label ? row.primaryCta : homeHero.primaryCta,
      primaryNote: row.primaryNote ?? homeHero.primaryNote,
      secondaryCta: row.secondaryCta?.label ? row.secondaryCta : homeHero.secondaryCta,
      facts: facts as typeof homeHero.facts,
      image: toCmsImage(row.image, ref("homePage", "homePage", "image")),
      video: row.video ? { ...row.video, sanity: ref("homePage", "homePage", "video") } : undefined,
      editRef: ref("homePage", "homePage", "image"),
    },
    story: {
      eyebrow: row.storyEyebrow ?? homeStory.eyebrow,
      hook: row.storyHook ?? homeStory.hook,
      problem: row.storyProblem ?? homeStory.problem,
      turn: row.storyTurn ?? homeStory.turn,
    },
    proofStrip: row.proof?.length
      ? row.proof.map((p) => ({ value: p.value, label: p.label, source: p.source ?? "", href: p.href ?? "/case-studies" }))
      : proofStrip,
    problems: row.problems?.length
      ? row.problems.map((p) => ({ icon: p.icon ?? "Network", title: p.title, body: p.body ?? "", cost: p.cost ?? "" }))
      : problems,
    differentiators: {
      eyebrow: row.differentEyebrow ?? differentiators.eyebrow,
      title: row.differentTitle ?? differentiators.title,
      description: row.differentDescription ?? differentiators.description,
      items: row.differentiators?.length
        ? row.differentiators.map((d) => ({ icon: d.icon ?? "Layers", title: d.title, body: d.body ?? "" }))
        : differentiators.items,
    },
    portfolio: {
      eyebrow: row.portfolioEyebrow ?? portfolio.eyebrow,
      title: row.portfolioTitle ?? portfolio.title,
      description: row.portfolioDescription ?? portfolio.description,
      note: row.portfolioNote ?? portfolio.note,
      products: row.products?.length
        ? row.products.map((p, i) => ({
            name: p.name,
            role: p.role ?? "",
            body: p.body ?? "",
            status: p.status ?? "",
            href: p.href ?? "/platform",
            photo: portfolio.products[i]?.photo,
            image: toCmsImage(p.image, p._key ? ref("homePage", "homePage", `products[_key=="${p._key}"].image`) : undefined),
            editRef: p._key ? ref("homePage", "homePage", `products[_key=="${p._key}"].image`) : undefined,
          }))
        : fallback.portfolio.products,
    },
    sections: mergeContent(homeExtras, extras),
    cmsId: "homePage",
  };
}
