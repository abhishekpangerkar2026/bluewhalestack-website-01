/**
 * One-off migration: copies the site's typed content, photographs, team
 * photos and official PDFs into the Sanity dataset so editors start with
 * every page already filled in. Safe to re-run — every document has a
 * deterministic id and is replaced, assets are de-duplicated by content.
 *
 *   SANITY_PROJECT_ID=xxxx SANITY_DATASET=production SANITY_API_WRITE_TOKEN=sk... \
 *     npx tsx scripts/sanity/seed.ts
 */
import { createClient } from "@sanity/client";
import { createReadStream, existsSync, statSync } from "node:fs";
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

const projectId = process.env.SANITY_PROJECT_ID ?? process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.SANITY_DATASET ?? process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
const token = process.env.SANITY_API_WRITE_TOKEN;
if (!projectId || !token) {
  console.error("Set SANITY_PROJECT_ID and SANITY_API_WRITE_TOKEN (an Editor token) in the environment.");
  process.exit(1);
}

const client = createClient({ projectId, dataset, token, apiVersion: "2025-09-01", useCdn: false });
const PUBLIC = path.resolve(__dirname, "../../public");

const assetCache = new Map<string, string>();
async function upload(kind: "image" | "file", publicPath: string): Promise<string | undefined> {
  const abs = path.join(PUBLIC, publicPath);
  if (!existsSync(abs)) { console.warn("  missing asset", publicPath); return undefined; }
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

/** The page heroes as they are written in the page code today. */
const PAGE_HEROES: Record<string, { pageName: string; eyebrow: string; title: string; titleAccent?: string; description: string }> = {
  "/platform": { pageName: "Platform overview", eyebrow: "Digital Experience Multi-Cloud Platform — Cloud & Datacenter", title: "One Platform.", titleAccent: "Every Industry. Every Estate.", description: "BlueWhale Stack is one control plane over six public clouds, your virtualization estate and your air-gapped sites. It is run by enterprises, by telco and datacenter operators who sell governed services on it, and by governments that must prove where data lives and who touched it. After connecting, every estate reports into one inventory, one identity fabric and one policy engine — and the audit evidence is generated continuously instead of assembled per inspection." },
  "/modules": { pageName: "Modules", eyebrow: "The nine capability families", title: "What lives in the", titleAccent: "platform core.", description: "Fourteen modules across nine families, gated per edition — each with its own page showing what it does, how it works, the console screen, where it fits and the questions buyers ask. Maturity is stated on every card: GA, beta, preview or in progress." },
  "/editions": { pageName: "Editions", eyebrow: "Editions · four licences, one deployment", title: "Four editions.", titleAccent: "One architecture.", description: "Standard at $24,000 a year for a single AWS, Azure or GCP estate; Enterprise at $120,000 a year for every cloud and every estate; the Telco & Datacenter Edition for operators who sell governed cloud services; the Government Edition for air-gapped, accredited estates. An upgrade is a licence change, never a migration." },
  "/industries": { pageName: "Industries", eyebrow: "Industry solutions · eight sectors, one control plane", title: "Every sector, and the regimes each one answers to.", description: "Every industry page names the regulators and frameworks that sector actually faces — RBI and CERT-In, DPDP and GDPR, accreditation and air-gap mandates, carrier SLAs — and the platform control that answers each. Standard, Enterprise and Government editions are generally available today; the Telco & Datacenter Edition is in preview ahead of GA in Q4 2026." },
  "/solutions": { pageName: "Solutions", eyebrow: "Solutions · six outcomes, one control plane", title: "Six things teams buy the platform for.", description: "One inventory across every cloud, provisioning without console access, observability included in the licence, a scored migration plan, one identity fabric with continuous audit evidence, and a sovereign deployment that proves where data lives. Each solution page shows the data path, the console, the modules involved and a delivered engagement." },
  "/resources": { pageName: "Resources", eyebrow: "Resources", title: "Datasheets, briefs, whitepapers and case studies — read online or download.", description: "The documents a procurement or architecture review asks for: the official collateral kit as finished PDFs, plus a datasheet per edition, a brief per solution and per industry, four case studies and the company profile as reading pages. No form, no email required." },
  "/products": { pageName: "Products", eyebrow: "The product portfolio", title: "Four products.", titleAccent: "One platform DNA.", description: portfolio.description },
  "/trust": { pageName: "Trust Center", eyebrow: "Trust Center", title: "Security and compliance,", titleAccent: "independently verified.", description: "Five ISO management-system certifications — 27001, 27017, 27018, 27701 and 22301 — audited by accredited third-party bodies, plus a CSA STAR Level 1 self-assessment, a GDPR compliance assessment and a SOC 2 Type II readiness assessment. All current, with eight signed certificates downloadable below and full audit reports available to customers under NDA." },
  "/partners": { pageName: "Partners", eyebrow: "Partner Ecosystem", title: "Grow together.", titleAccent: "Win together.", description: "Three ways to partner with BlueWhale Stack — resell licences, implement and support the platform for end customers, or operate as the official partner for your country. Apply in minutes and go live after approval." },
  "/pricing": { pageName: "Pricing", eyebrow: "Pricing", title: "Two published prices. Two shaped to the estate.", description: "Standard is $24,000 a year and Enterprise is $120,000 a year — flat, published, on 1-, 3- or 5-year terms with 10% off for two years and 15% off for three. The Telco & Datacenter and Government editions are priced per operator or per contract, because they are metered on network elements, racks or sovereignty scope rather than on cloud accounts." },
  "/about": { pageName: "About", eyebrow: "About BlueWhale Stack", title: "A consulting firm that turned eight years of field work into a platform.", description: "BlueWhale Stack was founded in Mumbai in 2018 as a cloud consultancy. After eight years of migrations, audits and datacenter modernisations for telcos, banks, governments and hospitals in India and the GCC, the same gap kept appearing — no single view of the estate — and in 2026 we shipped the platform that closes it. Three entities today: the United States, the UAE and India." },
  "/careers": { pageName: "Careers", eyebrow: "Careers", title: "Build the control plane that banks, ministries and operators run on.", description: "We are engineers, architects and product people in Mumbai, Ajman and Wilmington, building one platform across six public clouds, virtualised estates and air-gapped sites. The work is concrete — connectors, discovery engines, policy evaluation, an AI layer that runs offline — and it ships quarterly to customers who audit what we build." },
  "/customers": { pageName: "Customer success stories", eyebrow: "Customer success stories · four delivered engagements", title: "Banks, ministries, operators and a newsroom — what changed for each.", description: "Banks under two regulators, defence ministries with air-gapped estates, telcos and datacenter operators becoming cloud providers, a global newsroom under sustained cyber threat. Client identities are withheld under confidentiality; the challenges, the solutions and the outcomes are as delivered." },
  "/case-studies": { pageName: "Case studies", eyebrow: "Case studies · situation, work, outcome", title: "Four estates, written up the way an architect reads them.", description: "Four delivered engagements, written up the way an architect or a CFO would want to read them — what the estate looked like, what BlueWhale Stack changed, and what the auditor, the board and the bill said afterwards." },
  "/fabric": { pageName: "BlueWhale Stack Fabric", eyebrow: "BlueWhale Stack Fabric · Strategic initiative · launching in India", title: "Every datacenter. One fabric.", description: "A market's datacenter capacity — every operator, every tier — unified on one platform and consumed by every kind of customer as a single sovereign cloud: one catalog, one identity, one bill. Public cloud stays at the edge; the fabric's core stays in-country. Delivered per market — launching in India, built for every country." },
  "/products/whale-ai": { pageName: "Whale AI", eyebrow: "Whale AI · Horizontal intelligence layer", title: "AI that answers from", titleAccent: "your live estate", description: "Whale AI is an intelligence layer inside every module of the platform. Each of its 50+ use cases declares the live data it reads — inventory, billing, tickets, findings — and cites it in the answer. It runs in three tiers by task complexity, on hosted models, your own model, or fully offline inside the perimeter for sovereign estates." },
  "/newsroom": { pageName: "Newsroom", eyebrow: "Newsroom", title: "Releases, certifications and milestones — dated.", description: "What shipped and when: edition general availability, new cloud connectors, module betas and the certification audits as they complete. For press enquiries, reach us at contact@bluewhalestack.com." },
};

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
  });

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
