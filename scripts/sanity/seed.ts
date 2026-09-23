/**
 * One-off migration: copies the site's typed content, photographs, team
 * photos and official PDFs into the Sanity dataset so editors start with
 * every page already filled in. Safe to re-run — every document has a
 * deterministic id and is replaced, assets are de-duplicated by content.
 *
 *   SANITY_PROJECT_ID=xxxx SANITY_DATASET=production SANITY_API_WRITE_TOKEN=sk... \
 *     npx tsx scripts/sanity/seed.ts
 *
 * SEED_DRY_RUN=out.json skips every upload and write and dumps the documents
 * it would send instead — a structural check that needs no token.
 */
import { createClient } from "@sanity/client";
import { createReadStream, existsSync, statSync, writeFileSync } from "node:fs";
import path from "node:path";

import { editions } from "../../content/editions";
import { modules } from "../../content/modules";
import { moduleDetails } from "../../content/moduleDetails";
import { industries } from "../../content/industries";
import { solutions } from "../../content/solutions";
import { customerStories } from "../../content/customers";
import { leadership } from "../../content/about";
import { announcements, announcementDate } from "../../content/newsroom";
import { collateral } from "../../content/collateral";
import { hero, story, proofStrip, problems, differentiators, portfolio } from "../../content/home";
import { photos, photoSrc, EDITION_PHOTO, INDUSTRY_PHOTO, SOLUTION_PHOTO, ROUTE_PHOTO, type PhotoKey } from "../../content/photos";
import { FAMILY_PHOTO } from "../../content/moduleArt";
import { annotate, collectionId } from "../../content/cms/annotate";
import { PAGE_HEROES } from "../../content/sections/pageHeroes";
import { homePageExtras } from "../../content/cms/docs/homePage";
import { homeExtras } from "../../content/sections/homePage";
import { singletonEntries, collectionEntries } from "../../content/sections/registry";

const projectId = process.env.SANITY_PROJECT_ID ?? process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.SANITY_DATASET ?? process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
const token = process.env.SANITY_API_WRITE_TOKEN;
const dryRun = process.env.SEED_DRY_RUN;
if (!dryRun && (!projectId || !token)) {
  console.error("Set SANITY_PROJECT_ID and SANITY_API_WRITE_TOKEN (an Editor token) in the environment.");
  process.exit(1);
}

const client = createClient({ projectId: projectId ?? "dry-run", dataset, token, apiVersion: "2025-09-01", useCdn: false });
const PUBLIC = path.resolve(__dirname, "../../public");

const assetCache = new Map<string, string>();
async function upload(kind: "image" | "file", publicPath: string): Promise<string | undefined> {
  const abs = path.join(PUBLIC, publicPath);
  if (!existsSync(abs)) { console.warn("  missing asset", publicPath); return undefined; }
  if (dryRun) return undefined;
  const key = `${kind}:${publicPath}`;
  if (assetCache.has(key)) return assetCache.get(key);
  const size = statSync(abs).size;
  process.stdout.write(`  ↑ ${publicPath} (${(size / 1024).toFixed(0)} KB) `);
  const asset = await client.assets.upload(kind, createReadStream(abs), { filename: path.basename(abs) });
  console.log("→", asset._id);
  assetCache.set(key, asset._id);
  return asset._id;
}
const imageRef = async (publicPath: string, alt: string) => {
  const id = await upload("image", publicPath);
  return id ? { _type: "image", asset: { _type: "reference", _ref: id }, alt } : undefined;
};
const photoImage = (key: PhotoKey) => imageRef(photoSrc(key, 1536), photos[key].alt);
const fileRef = async (publicPath: string) => {
  const id = await upload("file", publicPath);
  return id ? { _type: "file", asset: { _type: "reference", _ref: id } } : undefined;
};

const key = (i: number) => ({ _key: `k${i}` });
const keyed = <T extends object>(rows: T[] | undefined) => (rows ?? []).map((r, i) => ({ ...key(i), ...r }));
const slugOf = (s: string) => ({ _type: "slug", current: s });
const id = (type: string, s: string) => `${type}-${s.replace(/[^a-z0-9-]/gi, "-")}`;


async function main() {
  const docs: Record<string, unknown>[] = [];

  console.log("Home page");
  docs.push({
    _id: "homePage",
    _type: "homePage",
    badge: hero.badge,
    title: "Every cloud.",
    titleAccent: "One control plane.",
    description: hero.description,
    primaryCta: { _type: "cta", ...hero.primaryCta },
    primaryNote: hero.primaryNote,
    secondaryCta: { _type: "cta", ...hero.secondaryCta },
    facts: keyed(hero.facts.map((f) => ({ _type: "fact", value: String(f.value), label: f.label }))),
    image: await photoImage("platform-stack"),
    storyEyebrow: story.eyebrow,
    storyHook: story.hook,
    storyProblem: story.problem,
    storyTurn: story.turn,
    problems: keyed(problems.map((p) => ({ _type: "iconItem", ...p }))),
    proof: keyed(proofStrip.map((p) => ({ _type: "proofItem", ...p }))),
    differentEyebrow: differentiators.eyebrow,
    differentTitle: differentiators.title,
    differentDescription: differentiators.description,
    differentiators: keyed(differentiators.items.map((d) => ({ _type: "iconItem", ...d }))),
    portfolioEyebrow: portfolio.eyebrow,
    portfolioTitle: portfolio.title,
    portfolioDescription: portfolio.description,
    portfolioNote: portfolio.note,
    products: keyed(
      await Promise.all(
        portfolio.products.map(async (p) => ({
          _type: "product",
          name: p.name,
          role: p.role,
          body: p.body,
          status: p.status,
          href: p.href,
          image: await photoImage(p.photo),
        })),
      ),
    ),
    ...annotate(homePageExtras, homeExtras),
  });

  console.log("Page documents (site settings + one document per page)");
  for (const { spec, content } of singletonEntries) {
    docs.push({ _id: spec.name, _type: spec.name, ...annotate(spec.fields, content) });
    console.log(`  ${spec.name}`);
  }

  console.log("Collections (families, certifications, roles, partner tracks, legal pages, docs guides)");
  for (const { spec, rows, keyOf } of collectionEntries) {
    for (const [i, row] of rows.entries()) {
      docs.push({ _id: collectionId(spec.name, keyOf(row)), _type: spec.name, order: i + 1, ...annotate(spec.fields, row) });
    }
    console.log(`  ${spec.name} × ${rows.length}`);
  }

  console.log("Page heroes");
  for (const [route, h] of Object.entries(PAGE_HEROES)) {
    docs.push({
      _id: id("pageHero", route === "/" ? "home" : route.slice(1)),
      _type: "pageHero",
      route,
      ...h,
      image: ROUTE_PHOTO[route] ? await photoImage(ROUTE_PHOTO[route]) : undefined,
    });
  }

  console.log("Editions");
  for (const [i, e] of editions.entries()) {
    const { operatorModel, ...rest } = e;
    docs.push({
      _id: id("edition", e.slug),
      _type: "edition",
      ...rest,
      slug: slugOf(e.slug),
      order: i + 1,
      faq: keyed(e.faq.map((q) => ({ _type: "qa", ...q }))),
      image: EDITION_PHOTO[e.slug] ? await photoImage(EDITION_PHOTO[e.slug]) : undefined,
      operatorProfiles: keyed(
        (operatorModel?.profiles ?? []).map((p) => ({
          _type: "operatorProfile",
          audience: p.audience,
          proposition: p.proposition,
          revenueStreams: keyed(p.revenueStreams.map((r) => ({ _type: "revenueStream", ...r }))),
          phases: keyed(p.phases.map((ph) => ({ _type: "phase", ...ph }))),
        })),
      ),
    });
  }

  console.log("Modules");
  for (const [i, m] of modules.entries()) {
    const d = moduleDetails[m.slug];
    docs.push({
      _id: id("module", m.slug),
      _type: "module",
      ...m,
      slug: slugOf(m.slug),
      order: i + 1,
      image: await photoImage(FAMILY_PHOTO[m.group]),
      status: d?.status,
      summary: d?.summary,
      facts: keyed(d?.facts.map((f) => ({ _type: "fact", ...f }))),
      capabilities: keyed(d?.capabilities.map((c) => ({ _type: "titledBody", ...c }))),
      howItWorks: keyed(d?.howItWorks.map((c) => ({ _type: "titledBody", ...c }))),
      faq: keyed(d?.faq.map((q) => ({ _type: "qa", ...q }))),
    });
  }

  console.log("Industries");
  for (const [i, ind] of industries.entries()) {
    docs.push({
      _id: id("industry", ind.slug),
      _type: "industry",
      ...ind,
      slug: slugOf(ind.slug),
      order: i + 1,
      image: await photoImage(INDUSTRY_PHOTO[ind.slug] ?? "enterprise-campus"),
      kpis: keyed(ind.kpis.map((f) => ({ _type: "fact", ...f }))),
      regimes: keyed(ind.regimes.map((r) => ({ _type: "regime", ...r }))),
      useCases: keyed((ind.useCases ?? []).map((u) => ({ _type: "useCase", ...u }))),
      faq: keyed(ind.faq.map((q) => ({ _type: "qa", ...q }))),
    });
  }

  console.log("Solutions");
  for (const [i, s] of solutions.entries()) {
    docs.push({
      _id: id("solution", s.slug),
      _type: "solution",
      ...s,
      slug: slugOf(s.slug),
      order: i + 1,
      image: await photoImage(SOLUTION_PHOTO[s.slug] ?? "hybrid-bridge"),
      facts: keyed(s.facts.map((f) => ({ _type: "fact", ...f }))),
      faq: keyed(s.faq.map((q) => ({ _type: "qa", ...q }))),
    });
  }

  console.log("Customer stories");
  for (const [i, c] of customerStories.entries()) {
    const { image, imageAlt, ...rest } = c;
    docs.push({
      _id: id("customerStory", c.slug),
      _type: "customerStory",
      ...rest,
      slug: slugOf(c.slug),
      order: i + 1,
      image: image ? await imageRef(image, imageAlt) : undefined,
      metrics: keyed(c.metrics.map((f) => ({ _type: "fact", ...f }))),
    });
  }

  console.log("Team");
  for (const [i, m] of leadership.entries()) {
    const { image, ...rest } = m;
    docs.push({
      _id: id("teamMember", (m.name ?? m.role).toLowerCase().replace(/\s+/g, "-")),
      _type: "teamMember",
      ...rest,
      order: i + 1,
      image: image ? await imageRef(image, m.name ?? m.role) : undefined,
    });
  }

  console.log("Newsroom");
  for (const [i, a] of announcements.entries()) {
    docs.push({
      _id: id("post", `${announcementDate(a)}-${i}`),
      _type: "post",
      title: a.title,
      slug: slugOf(a.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "").slice(0, 80)),
      date: announcementDate(a),
      category: a.category,
      badge: a.badge,
      body: a.body,
    });
  }

  console.log("Collateral PDFs");
  for (const [i, d] of collateral.entries()) {
    docs.push({
      _id: id("collateralDoc", d.file.replace(/\.pdf$/, "")),
      _type: "collateralDoc",
      title: d.title,
      kind: d.kind,
      blurb: d.blurb,
      order: i + 1,
      file: await fileRef(`/collateral/${d.file}`),
    });
  }

  if (dryRun) {
    writeFileSync(dryRun, JSON.stringify(docs, null, 1));
    console.log(`\nDry run: ${docs.length} documents written to ${dryRun}`);
    return;
  }
  console.log(`\nWriting ${docs.length} documents…`);
  for (let i = 0; i < docs.length; i += 25) {
    const tx = client.transaction();
    for (const d of docs.slice(i, i + 25)) tx.createOrReplace(d as { _id: string; _type: string });
    await tx.commit();
    console.log(`  ${Math.min(i + 25, docs.length)}/${docs.length}`);
  }
  console.log("Done. Open the Studio — every page is filled in.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
