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
import type { CmsImage, CmsVideo } from "@/content/cmsTypes";
import { cmsFetch, toCmsImage } from "@/lib/cms";
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
type WithImage<T> = Omit<T, "image"> & { image?: RawImage };

const list = <T>(rows: T[] | null | undefined): T[] | null => (rows && rows.length > 0 ? rows : null);
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
      cmsImage: toCmsImage(image),
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
    clean({ ...m, features: m.features ?? [], cmsImage: toCmsImage(image) }) as ModuleDef,
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
      cmsImage: toCmsImage(image),
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
      cmsImage: toCmsImage(image),
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
    const cmsImage = toCmsImage(image);
    return clean({
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
  return rows.map(({ image, ...m }) => clean({ ...m, cmsImage: toCmsImage(image) }) as LeadershipMember);
}

// ── Newsroom ──────────────────────────────────────────────────
export async function getPosts(): Promise<Announcement[]> {
  const rows = list(await cmsFetch<WithImage<Announcement & { slug?: string }>[]>(postsQuery, {}, ["post"]));
  if (!rows) return announcements;
  return rows.map(({ image, ...p }) => clean({ ...p, cmsImage: toCmsImage(image) }) as Announcement);
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
  eyebrow?: string;
  title?: string;
  titleAccent?: string;
  description?: string;
  image?: CmsImage;
  video?: CmsVideo;
}
export async function getPageHero(route: string): Promise<PageHeroOverride | null> {
  type Row = { eyebrow?: string; title?: string; titleAccent?: string; description?: string; image?: RawImage; video?: CmsVideo | null };
  const row = await cmsFetch<Row | null>(pageHeroQuery, { route }, ["pageHero"]);
  if (!row) return null;
  return clean({
    eyebrow: row.eyebrow ?? undefined,
    title: row.title ?? undefined,
    titleAccent: row.titleAccent ?? undefined,
    description: row.description ?? undefined,
    image: toCmsImage(row.image),
    video: row.video ?? undefined,
  });
}

// ── Home page ─────────────────────────────────────────────────
export interface HomeContent {
  hero: typeof homeHero & { image?: CmsImage; video?: CmsVideo; titleAccent?: string };
  story: typeof homeStory;
  proofStrip: typeof proofStrip;
  problems: typeof problems;
  differentiators: typeof differentiators;
  portfolio: {
    eyebrow: string;
    title: string;
    description: string;
    note: string;
    products: { name: string; role: string; body: string; status: string; href: string; photo?: (typeof portfolio.products)[number]["photo"]; image?: CmsImage }[];
  };
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
    products?: { name: string; role?: string; body?: string; status?: string; href?: string; image?: RawImage }[];
  } | null;
  const fallback: HomeContent = {
    hero: homeHero,
    story: homeStory,
    proofStrip,
    problems,
    differentiators,
    portfolio: { ...portfolio, products: portfolio.products.map((p) => ({ ...p })) },
  };
  const row = await cmsFetch<Row>(homePageQuery, {}, ["homePage"]);
  if (!row) return fallback;
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
      image: toCmsImage(row.image),
      video: row.video ?? undefined,
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
            image: toCmsImage(p.image),
          }))
        : fallback.portfolio.products,
    },
  };
}
