/**
 * The document library under /resources — datasheets, solution and industry
 * briefs, whitepapers, case studies and the company profile. Every document is
 * assembled from the same content the site renders (editions, solutions,
 * industries, modules, trust, about), so the PDFs can never drift from the
 * pages. Read online at /resources/[slug]; printed to public/docs/[slug].pdf
 * by scripts/build-docs.mjs through /print/[slug].
 */
import { editions, editionSpecs, type EditionDef, type EditionSpecRow } from "./editions";
import { solutions, type SolutionDef } from "./solutions";
import { industries, type IndustryDef } from "./industries";
import { modules, moduleGroups, moduleGroupOrder, moduleGroupBlurbs, type ModuleDef } from "./modules";
import { moduleDetails, type ModuleDetail } from "./moduleDetails";
import { customerStories, type CustomerStory } from "./customers";
import {
  platformHero, heroStats, whatItReplaces, architectureLayers, deploymentModes, deploymentNote,
  supportModel, prototypeOffer, whaleTiers, securityPosture, platformFaq, whyNow,
} from "./platform";
import { certifications, trustFaq, trustPillars, type Certification } from "./trust";
import { aboutHero, companyFacts, missionVision, story, principles, productFamily, services, servicesNote, milestones, leadership, trustPoints, type LeadershipMember } from "./about";
import { company, offices, regions } from "./company";

/**
 * Everything a document can be assembled from. The site passes the
 * CMS-backed versions (lib/content.ts getDocuments) so the datasheets, briefs
 * and whitepapers follow every edit; the typed modules are the fallback.
 */
export interface DocSources {
  editions: EditionDef[];
  editionSpecs: EditionSpecRow[];
  solutions: SolutionDef[];
  industries: IndustryDef[];
  modules: ModuleDef[];
  moduleGroups: Record<string, string>;
  moduleGroupOrder: ModuleDef["group"][];
  moduleGroupBlurbs: Record<string, string>;
  moduleDetails: Record<string, Pick<ModuleDetail, "status" | "summary" | "facts" | "capabilities" | "howItWorks" | "faq">>;
  customerStories: CustomerStory[];
  platformHero: { title: string; description: string; tagline: string };
  heroStats: { value: string; label: string }[];
  whatItReplaces: { category: string; answer: string; status: string }[];
  architectureLayers: { n: string; name: string; body: string }[];
  deploymentModes: { name: string; badge: string; body: string }[];
  deploymentNote: string;
  supportModel: { title: string; body: string }[];
  prototypeOffer: { title: string; steps: { title: string; when?: string; body: string }[] };
  whaleTiers: { name: string; edition: string; body: string }[];
  securityPosture: string[];
  platformFaq: { q: string; a: string }[];
  whyNow: string;
  certifications: Certification[];
  trustFaq: { q: string; a: string }[];
  trustPillars: { title: string; body: string }[];
  aboutHero: { title: string; mission: string };
  companyFacts: { label: string; value: string }[];
  missionVision: { mission: string; vision: string };
  story: { heading: string; body: string }[];
  principles: { title: string; body: string }[];
  productFamily: { name: string; badge: string; body: string }[];
  services: { name: string; body: string }[];
  servicesNote: string;
  milestones: { year: string; title: string; body: string }[];
  leadership: LeadershipMember[];
  trustPoints: string[];
  company: { name: string; emails: { sales: string }; phones: { region: string; number: string }[]; social: { linkedin: string } };
  offices: { city: string; label: string; entity: string; address: string }[];
  regions: { code: string; city: string }[];
}

/** The typed content modules — what the site ships without a CMS. */
export const defaultSources: DocSources = {
  editions, editionSpecs, solutions, industries, modules, moduleGroups, moduleGroupOrder, moduleGroupBlurbs, moduleDetails, customerStories,
  platformHero, heroStats, whatItReplaces, architectureLayers, deploymentModes, deploymentNote, supportModel, prototypeOffer, whaleTiers, securityPosture, platformFaq, whyNow,
  certifications, trustFaq, trustPillars,
  aboutHero, companyFacts, missionVision, story, principles, productFamily, services, servicesNote, milestones, leadership, trustPoints,
  company: { name: company.name, emails: { sales: company.emails.sales }, phones: [...company.phones], social: { linkedin: company.social.linkedin } },
  offices: [...offices],
  regions: [...regions],
};

export type DocType = "Datasheet" | "Solution brief" | "Industry brief" | "Whitepaper" | "Case study" | "Company";

export type DocSection =
  | { kind: "lead"; text: string }
  | { kind: "paragraphs"; heading?: string; text: string[] }
  | { kind: "bullets"; heading?: string; items: string[] }
  | { kind: "facts"; heading?: string; items: { value: string; label: string }[] }
  | { kind: "table"; heading?: string; columns: string[]; rows: string[][]; note?: string }
  | { kind: "steps"; heading?: string; items: { title: string; body: string }[] }
  | { kind: "cards"; heading?: string; items: { title: string; body: string }[] }
  | { kind: "faq"; heading?: string; items: { q: string; a: string }[] }
  | { kind: "callout"; title: string; body: string }
  | { kind: "quote"; text: string; by: string };

export interface DocumentDef {
  slug: string;
  type: DocType;
  title: string;
  subtitle: string;
  summary: string;
  topic: string;
  /** 3D scene key used on the cover (content/scenes.generated.ts) */
  scene: string;
  updated: string;
  version: string;
  sections: DocSection[];
  related: { label: string; href: string }[];
  /** derived: reading time / page estimate */
  meta: string;
  words: number;
}

const UPDATED = "September 2026";
/** Assembles the whole library from a set of sources (CMS-backed or the typed modules). */
export function buildDocuments(src: DocSources): DocumentDef[] {
  const {
    editions, editionSpecs, solutions, industries, modules, moduleGroups, moduleGroupOrder, moduleGroupBlurbs, moduleDetails, customerStories,
    platformHero, heroStats, whatItReplaces, architectureLayers, deploymentModes, deploymentNote, supportModel, prototypeOffer, whaleTiers, securityPosture, platformFaq, whyNow,
    certifications, trustFaq, trustPillars, aboutHero, companyFacts, missionVision, story, principles, productFamily, services, servicesNote, milestones, leadership, trustPoints,
    company, offices, regions,
  } = src;

const stripStatus = (s: string) => s.replace(/\s*\([^)]*\)\s*$/, "");
const modName = (slug: string) => modules.find((m) => m.slug === slug)?.name ?? slug;
const editionName = (slug: string) => editions.find((e) => e.slug === slug)?.name ?? slug;

function words(sections: DocSection[]): number {
  const bag: string[] = [];
  const push = (s?: string) => { if (s) bag.push(s); };
  for (const s of sections) {
    switch (s.kind) {
      case "lead": push(s.text); break;
      case "paragraphs": push(s.heading); s.text.forEach(push); break;
      case "bullets": push(s.heading); s.items.forEach(push); break;
      case "facts": push(s.heading); s.items.forEach((f) => { push(f.value); push(f.label); }); break;
      case "table": push(s.heading); s.rows.forEach((r) => r.forEach(push)); push(s.note); break;
      case "steps": case "cards": push(s.heading); s.items.forEach((i) => { push(i.title); push(i.body); }); break;
      case "faq": push(s.heading); s.items.forEach((i) => { push(i.q); push(i.a); }); break;
      case "callout": push(s.title); push(s.body); break;
      case "quote": push(s.text); push(s.by); break;
    }
  }
  return bag.join(" ").split(/\s+/).filter(Boolean).length;
}

function make(d: Omit<DocumentDef, "meta" | "words" | "updated" | "version"> & { version?: string }): DocumentDef {
  const w = words(d.sections);
  const minutes = Math.max(3, Math.round(w / 200));
  const pages = Math.max(2, Math.round(w / 420) + 1);
  return { ...d, updated: UPDATED, version: d.version ?? "1.0", words: w, meta: `${minutes} min read · ${pages} pp PDF` };
}

/* ── datasheets ─────────────────────────────────────────────────── */
function editionDatasheet(e: EditionDef): DocumentDef {
  const specs = editionSpecs.map((r) => [r.label, r.values[e.slug] ?? "—"]);
  const mods = e.modules.map((slug) => {
    const m = modules.find((x) => x.slug === slug);
    const status = moduleDetails[slug]?.status.label ?? "";
    return { title: m?.name ?? slug, body: `${stripStatus(m?.tagline ?? "")}${status ? ` (${status.split(" — ")[0].split(" · ")[0]})` : ""}` };
  });
  const sections: DocSection[] = [
    { kind: "lead", text: e.positioning },
    { kind: "facts", items: [
      { value: e.priceAnchor, label: e.priceSub ?? "" },
      { value: e.deploy.join(" · "), label: "Deployment models" },
      { value: e.aiTier.replace("Whale AI — ", ""), label: "Whale AI tier" },
      { value: editionSpecs.find((r) => r.label === "SLA")?.values[e.slug] ?? "—", label: "Platform SLA" },
    ] },
    { kind: "callout", title: "The outcome", body: `${e.outcome} Includes ${e.includes.join(", ")}.` },
    { kind: "bullets", heading: "What is included", items: e.highlights },
    { kind: "table", heading: "Scale, quotas and support", columns: ["Dimension", e.name], rows: specs },
    { kind: "cards", heading: `Modules in the ${e.name} Edition`, items: mods },
    { kind: "bullets", heading: "A good fit for", items: e.fitFor },
    { kind: "bullets", heading: "Look elsewhere if", items: e.notFor },
  ];
  if (e.operatorModel) {
    e.operatorModel.profiles.forEach((p) => {
      sections.push({ kind: "paragraphs", heading: p.audience, text: [p.proposition] });
      sections.push({ kind: "cards", heading: "Revenue streams", items: p.revenueStreams.map((r) => ({ title: `${r.name} — ${r.character}`, body: r.body })) });
      sections.push({ kind: "steps", heading: "Phased delivery", items: p.phases.map((ph) => ({ title: `${ph.name} · ${ph.timeframe}`, body: ph.body })) });
    });
  }
  sections.push({ kind: "faq", heading: "Licensing and deployment questions", items: e.faq });
  sections.push({ kind: "callout", title: "Proven before commitment", body: "Every edition starts with the 90-day prototype: a half-day discovery workshop that agrees success criteria with your technology and finance leaders, then the platform on your own estate for 90 days with no licence cost, scored on day 90 before any licensing decision." });
  return make({
    slug: `datasheet-${e.slug}`, type: "Datasheet",
    title: `${e.name} Edition datasheet`, subtitle: e.headline, summary: e.summary, topic: "Editions",
    scene: `edition-${e.slug}`, sections,
    related: [{ label: `${e.name} Edition page`, href: `/editions/${e.slug}` }, { label: "Pricing", href: "/pricing" }, { label: "Compare editions", href: "/editions" }],
  });
}

/* ── solution briefs ────────────────────────────────────────────── */
function solutionBrief(s: SolutionDef): DocumentDef {
  const story = s.story ? customerStories.find((c) => c.slug === s.story) : undefined;
  const sections: DocSection[] = [
    { kind: "lead", text: s.description },
    { kind: "facts", items: s.facts },
    { kind: "callout", title: "The challenge", body: s.problem },
    { kind: "bullets", heading: "How it shows up", items: s.symptoms },
    { kind: "steps", heading: "How it works", items: (s.flow ?? []).map((f, i) => ({ title: `Step ${i + 1}`, body: f })) },
    { kind: "bullets", heading: "What is included", items: s.features },
    { kind: "cards", heading: "Modules involved", items: s.modules.map((m) => ({ title: modName(m), body: stripStatus(modules.find((x) => x.slug === m)?.tagline ?? "") })) },
    { kind: "paragraphs", heading: "Editions and audience", text: [
      `Recommended editions: ${(s.editions ?? []).map(editionName).join(" and ")}.`,
      `Who it is for: ${s.audience}`,
    ] },
  ];
  if (story) {
    sections.push({ kind: "paragraphs", heading: `Delivered engagement — ${story.org}`, text: [story.summary] });
    sections.push({ kind: "quote", text: story.quote, by: `${story.person.role}, ${story.org} — as reported by the customer` });
  }
  sections.push({ kind: "faq", heading: "Questions teams ask in the evaluation", items: s.faq });
  return make({
    slug: `brief-${s.slug}`, type: "Solution brief",
    title: `${s.name} — solution brief`, subtitle: s.summary, summary: s.summary, topic: "Solutions",
    scene: `solution-${s.slug}`, sections,
    related: [{ label: `${s.name} page`, href: `/solutions/${s.slug}` }, ...s.modules.slice(0, 2).map((m) => ({ label: modName(m), href: `/modules/${m}` }))],
  });
}

/* ── industry briefs ────────────────────────────────────────────── */
function industryBrief(i: IndustryDef): DocumentDef {
  const story = i.story ? customerStories.find((c) => c.slug === i.story) : undefined;
  const edition = editions.find((e) => e.slug === i.edition);
  const sections: DocSection[] = [
    { kind: "lead", text: i.description },
    { kind: "facts", items: i.kpis },
    { kind: "table", heading: "The regimes, and the control that answers each", columns: ["Regime", "What it demands", "The control that answers it"], rows: i.regimes.map((r) => [r.name, r.demands, r.control]) },
    { kind: "bullets", heading: `What ${i.name} teams get`, items: i.why },
    { kind: "cards", heading: "Use cases", items: (i.useCases ?? []).map((u) => ({ title: u.title, body: `${u.body}${u.modules?.length ? ` Modules: ${u.modules.map(modName).join(", ")}.` : ""}` })) },
  ];
  if (edition) {
    sections.push({ kind: "callout", title: `Edition: ${edition.name}${edition.comingSoon ? ` (preview · GA ${edition.gaTarget})` : ""}`, body: `${edition.tagline}. ${edition.outcome} ${edition.priceAnchor === "Contact sales" ? "Priced per operator or contract." : `${edition.priceAnchor}, flat and published.`}` });
  }
  if (story) {
    sections.push({ kind: "paragraphs", heading: `Delivered engagement — ${story.org}`, text: [story.summary] });
    sections.push({ kind: "facts", items: story.metrics });
    sections.push({ kind: "quote", text: story.quote, by: `${story.person.role}, ${story.org} — as reported by the customer` });
  }
  sections.push({ kind: "faq", heading: "Procurement, hosting and integration questions", items: i.faq });
  sections.push({ kind: "paragraphs", heading: "Platform certifications", text: ["ISO/IEC 27001:2022, ISO/IEC 27017, ISO/IEC 27018, ISO/IEC 27701 and ISO 22301, independently audited by accredited bodies; a CSA STAR Level 1 self-assessment, a GDPR compliance assessment and a SOC 2 Type II readiness assessment. Certificates and verification numbers are in the Trust Center."] });
  return make({
    slug: `industry-${i.slug}`, type: "Industry brief",
    title: `BlueWhale Stack for ${i.name}`, subtitle: i.title, summary: i.description.split(". ").slice(0, 1).join(". ") + ".", topic: "Industries",
    scene: `industry-${i.slug}`, sections,
    related: [{ label: `${i.name} page`, href: `/industries/${i.slug}` }, ...(edition ? [{ label: `${edition.name} Edition`, href: `/editions/${edition.slug}` }] : [])],
  });
}

/* ── case studies ───────────────────────────────────────────────── */
const STORY_SCENE: Record<string, string> = { BFSI: "industry-bfsi", Government: "industry-government", "Telco & Datacenter": "industry-telco", Media: "industry-regulated-enterprise" };
function caseStudy(c: CustomerStory): DocumentDef {
  const edition = editions.find((e) => `${e.name} Edition` === c.edition);
  return make({
    slug: `case-${c.slug}`, type: "Case study",
    title: c.headline, subtitle: c.org, summary: c.summary, topic: c.industry,
    scene: STORY_SCENE[c.industry] ?? "platform",
    sections: [
      { kind: "lead", text: c.summary },
      { kind: "facts", items: c.metrics },
      { kind: "paragraphs", heading: "The situation", text: [c.challenge] },
      { kind: "paragraphs", heading: "What BlueWhale Stack did", text: [c.solution] },
      { kind: "quote", text: c.quote, by: `${c.person.role}, ${c.org} — as reported by the customer` },
      ...(edition ? [{ kind: "callout" as const, title: `${edition.name} Edition`, body: `${edition.tagline}. Includes ${edition.includes.join(", ")}. Deployment: ${edition.deploy.join(", ")}.` }] : []),
      { kind: "paragraphs", heading: "About this case study", text: [c.note ?? "Anonymized — delivered engagement.", "Client identities are withheld under confidentiality. The challenge, the work and the outcomes are as delivered and as reported by the customer; no figures have been added."] },
    ],
    related: [{ label: "Read online", href: `/case-studies/${c.slug}` }, { label: "All case studies", href: "/case-studies" }],
  });
}

/* ── whitepapers ────────────────────────────────────────────────── */
function platformOverview(): DocumentDef {
  return make({
    slug: "platform-overview", type: "Whitepaper",
    title: "Every cloud, one control plane — platform overview", subtitle: platformHero.tagline, summary: "How 54 capabilities in nine families share one inventory, one identity fabric, one policy engine and one bill across six public clouds, private estates and air-gapped sites — and what that replaces.", topic: "Platform",
    scene: "architecture",
    sections: [
      { kind: "lead", text: platformHero.description },
      { kind: "facts", items: heroStats },
      { kind: "callout", title: "Why now", body: whyNow },
      { kind: "table", heading: "What it replaces", columns: ["You run today", "In BlueWhale Stack", "Status"], rows: whatItReplaces.map((r) => [r.category, r.answer, r.status]) },
      { kind: "steps", heading: "The architecture, top to bottom", items: architectureLayers.map((l) => ({ title: `${l.n} · ${l.name}`, body: l.body })) },
      { kind: "cards", heading: "The nine capability families", items: moduleGroupOrder.map((g) => ({ title: moduleGroups[g], body: `${moduleGroupBlurbs[g]} Modules: ${modules.filter((m) => m.group === g).map((m) => m.name).join(", ")}.` })) },
      { kind: "cards", heading: "Deployment modes", items: deploymentModes.map((d) => ({ title: `${d.name} — ${d.badge}`, body: d.body })) },
      { kind: "paragraphs", text: [deploymentNote] },
      { kind: "cards", heading: "Support and service model", items: supportModel.map((s) => ({ title: s.title, body: s.body })) },
      { kind: "cards", heading: "Whale AI tiers", items: whaleTiers.map((t) => ({ title: `${t.name} — ${t.edition}`, body: t.body })) },
      { kind: "bullets", heading: "Security posture", items: securityPosture },
      { kind: "steps", heading: prototypeOffer.title, items: prototypeOffer.steps.map((s) => ({ title: `${s.title} · ${s.when}`, body: s.body })) },
      { kind: "faq", heading: "What buyers ask", items: platformFaq },
    ],
    related: [{ label: "Platform page", href: "/platform" }, { label: "Compare editions", href: "/editions" }],
  });
}

function capabilityGuide(): DocumentDef {
  const sections: DocSection[] = [
    { kind: "lead", text: "Fourteen modules ship across the nine capability families today. This guide states, for each module, what it does, how it works, the proof points and its current maturity — GA, beta, preview or in progress — in the same words the product pages use." },
    { kind: "cards", heading: "The families", items: moduleGroupOrder.map((g) => ({ title: moduleGroups[g], body: moduleGroupBlurbs[g] })) },
  ];
  for (const g of moduleGroupOrder) {
    for (const m of modules.filter((x) => x.group === g)) {
      const d = moduleDetails[m.slug];
      if (!d) continue;
      sections.push({ kind: "paragraphs", heading: `${m.name} — ${d.status.label}`, text: [d.summary] });
      sections.push({ kind: "facts", items: d.facts });
      sections.push({ kind: "cards", heading: "Capabilities", items: d.capabilities });
      sections.push({ kind: "steps", heading: "How it works", items: d.howItWorks });
    }
  }
  sections.push({ kind: "table", heading: "Module availability by edition", columns: ["Module", ...editions.map((e) => e.name)], rows: modules.map((m) => [m.name, ...editions.map((e) => (e.modules.includes(m.slug) ? "Included" : "—"))]) });
  return make({
    slug: "capability-guide", type: "Whitepaper",
    title: "Platform capability guide", subtitle: "Fourteen modules, nine families — what each does, how it works, and what is live today", summary: "Every module of the platform in one document: summary, proof points, capabilities with their mechanisms, how it works, and availability by edition.", topic: "Platform",
    scene: "platform", sections,
    related: [{ label: "All modules", href: "/modules" }, { label: "Pricing and the edition matrix", href: "/pricing" }],
  });
}

function sovereignPatterns(): DocumentDef {
  const sol = solutions.find((s) => s.slug === "sovereign-cloud")!;
  const gov = editions.find((e) => e.slug === "government")!;
  const ind = industries.find((i) => i.slug === "government")!;
  const mod = moduleDetails["sovereign-operations"];
  return make({
    slug: "sovereign-cloud-patterns", type: "Whitepaper",
    title: "Sovereign cloud: architecture patterns", subtitle: "In-country, air-gapped and in-region AI — how sovereignty becomes a property of the architecture", summary: "Deployment classes, segregation under central policy, offline updates, FIPS-validated cryptography, WORM-backed audit and Whale AI inside the perimeter — the patterns behind the Government Edition.", topic: "Sovereignty",
    scene: "solution-sovereign-cloud",
    sections: [
      { kind: "lead", text: sol.description },
      { kind: "facts", items: sol.facts },
      { kind: "callout", title: "The problem regulators pose", body: sol.problem },
      { kind: "steps", heading: "The pattern, end to end", items: (sol.flow ?? []).map((f, i) => ({ title: `Pattern ${i + 1}`, body: f })) },
      { kind: "cards", heading: "Sovereign Operations — the module behind it", items: mod.capabilities },
      { kind: "steps", heading: "How it is operated", items: mod.howItWorks },
      { kind: "table", heading: "What national regimes demand, and the control that answers", columns: ["Regime", "What it demands", "Control"], rows: ind.regimes.map((r) => [r.name, r.demands, r.control]) },
      { kind: "bullets", heading: "The Government Edition sovereignty layer", items: gov.highlights },
      { kind: "paragraphs", heading: "Sovereign hyperscaler regions", text: ["AWS GovCloud, Azure Government, Google Distributed Cloud and national sovereign clouds connect through the same connectors and are governed by the same policy plane as private and air-gapped estates. Whale AI runs on in-region models with no external calls; on the Government Edition it runs fully offline."] },
      { kind: "faq", heading: "Questions from accreditation and procurement teams", items: [...sol.faq, ...gov.faq] },
    ],
    related: [{ label: "Sovereign Cloud solution", href: "/solutions/sovereign-cloud" }, { label: "Government Edition", href: "/editions/government" }, { label: "Government industry page", href: "/industries/government" }],
  });
}

function migrationPaper(): DocumentDef {
  const mod = moduleDetails.migration;
  const sol = solutions.find((s) => s.slug === "cloud-migration")!;
  return make({
    slug: "migration-6r-assessment", type: "Whitepaper",
    title: "The 6R migration assessment, operationalized", subtitle: "Auto-classify, score, sequence and rehearse — before anything moves", summary: "How discovered workloads are classified, scored with a 6R assessment for cost, effort and blockers, and cut into dependency-aware waves with rollback — and how regulated customers use the same engine for exit-plan drills.", topic: "Migration",
    scene: "migration",
    sections: [
      { kind: "lead", text: mod.summary },
      { kind: "facts", items: mod.facts },
      { kind: "callout", title: "Why migrations stall", body: sol.problem },
      { kind: "bullets", heading: "How it shows up", items: sol.symptoms },
      { kind: "cards", heading: "What the engine does", items: mod.capabilities },
      { kind: "steps", heading: "From discovery to rehearsed waves", items: (sol.flow ?? []).map((f, i) => ({ title: `Stage ${i + 1}`, body: f })) },
      { kind: "paragraphs", heading: "The regulator's exit plan", text: ["Banks under RBI outsourcing directions must hold an exit strategy for every material outsourcing. Discovery and dependency mapping turn the annexure into a plan that is rehearsed as a drill, with the evidence filed — the approach two banks in Singapore and Qatar used to move inspection preparation from weeks to days."] },
      { kind: "faq", heading: "Questions from migration programmes", items: [...mod.faq, ...sol.faq] },
    ],
    related: [{ label: "Migration Engine module", href: "/modules/migration" }, { label: "Cloud Migration solution", href: "/solutions/cloud-migration" }],
  });
}

function whaleAiGuide(): DocumentDef {
  const mod = moduleDetails["whale-ai"];
  const categories = [
    ["FinOps & cost", "12"], ["Security", "10"], ["ITSM & incidents", "8"], ["Cloud operations", "8"], ["Infrastructure", "6"],
    ["Observability", "5"], ["Executive intelligence", "4"], ["Governance", "4"], ["Migration", "3"], ["Performance", "3"],
  ];
  return make({
    slug: "whale-ai-guide", type: "Whitepaper",
    title: "Whale AI — grounded, tiered, and inside the perimeter", subtitle: "50+ use cases across every family, on your choice of model, including fully offline", summary: "How Whale AI grounds every answer in live inventory, billing, tickets and findings, routes work across the Spark, Tide and Abyss tiers, and runs offline for sovereign estates.", topic: "AI",
    scene: "whale-ai",
    sections: [
      { kind: "lead", text: mod.summary },
      { kind: "facts", items: mod.facts },
      { kind: "cards", heading: "How it is built", items: mod.capabilities },
      { kind: "steps", heading: "From question to grounded answer", items: mod.howItWorks },
      { kind: "cards", heading: "Three tiers", items: whaleTiers.map((t) => ({ title: `${t.name} — ${t.edition}`, body: t.body })) },
      { kind: "table", heading: "Use cases by category", columns: ["Category", "Use cases"], rows: categories, note: "Counts as shipped in the September 2026 release; every use case declares the data providers it reads and cites them in the answer." },
      { kind: "bullets", heading: "Grounding providers", items: ["resource_inventory — the live resource model and workloads", "cost_summary and cost_recommendations — billing joined to inventory, rightsizing and commitments", "scanner_findings — security and compliance findings", "open_incidents — ITSM incidents and changes", "tenant_metadata — tenant scope and permissions"] },
      { kind: "callout", title: "Where your data goes", body: "On SaaS, requests are processed in your chosen region on the hosted model you select. On BYOC they run in your accounts. On sovereign and air-gapped deployments Whale AI runs fully offline on in-region models with zero external calls. Every call is scoped to the authenticated tenant, with isolation enforced at the database layer." },
      { kind: "faq", heading: "Questions security and data teams ask", items: mod.faq },
    ],
    related: [{ label: "Whale AI product page", href: "/products/whale-ai" }, { label: "Whale AI module", href: "/modules/whale-ai" }],
  });
}

function trustSummary(): DocumentDef {
  const rows = certifications.map((c) => [c.fullName, c.certNumber ?? "—", c.issuedBy.split(" — ")[0].split(",")[0], c.issueDate ?? "ongoing", c.validUntil ? `${c.validLabel ?? "Valid until"} ${c.validUntil}` : "continuous", c.entity?.includes("FZE") ? "FZE LLC (UAE)" : c.entity ? "Pvt Ltd (India)" : "—"]);
  return make({
    slug: "trust-and-compliance-summary", type: "Company",
    title: "Trust and compliance summary", subtitle: "Five ISO certifications, independently audited — and three assessments, stated as such", summary: "Certificate numbers, issuing bodies, dates and entities for every certification and assessment BlueWhale Stack holds, with the security posture and the answers procurement teams ask for.", topic: "Trust",
    scene: "cloud-audit",
    sections: [
      { kind: "lead", text: "BlueWhale Stack holds five ISO management-system certifications audited by accredited third-party bodies, plus a CSA STAR Level 1 self-assessment, a GDPR compliance assessment and a SOC 2 Type II readiness assessment. This summary lists each one exactly as the certification bodies allow it to be described, with the numbers you need to verify them." },
      { kind: "table", heading: "Certifications and assessments", columns: ["Standard", "Number", "Body", "Issued", "Next date", "Entity"], rows, note: "CSA STAR Level 1 is a self-assessment declaration, GDPR a compliance assessment, and SOC 2 Type II a readiness assessment — not a CPA attestation report or Type II assurance opinion. Signed certificate PDFs are downloadable from the Trust Center; full audit packs are available to customers under NDA." },
      { kind: "cards", heading: "How we run security", items: trustPillars.map((p) => ({ title: p.title, body: p.body })) },
      { kind: "bullets", heading: "Security posture", items: securityPosture },
      { kind: "paragraphs", heading: "Data residency", text: [`SaaS regions: ${regions.map((r) => `${r.city} (${r.code})`).join(", ")}. Residency is enforced per resource and evidenced from the audit log. For regimes without a SaaS region, BYOC, on-premises or air-gapped deployment keeps everything in-country.`] },
      { kind: "faq", heading: "Procurement questions", items: trustFaq },
    ],
    related: [{ label: "Trust Center", href: "/trust" }, { label: "Privacy policy", href: "/legal/privacy" }],
  });
}

function companyProfile(): DocumentDef {
  const named = leadership.filter((l) => l.name);
  return make({
    slug: "company-profile", type: "Company",
    title: "BlueWhale Stack — company profile", subtitle: aboutHero.title, summary: "Who we are, what we build, where we operate and who leads the company — founded 2018 as a cloud consultancy, platform launched 2026, three entities across India, the UAE and the United States.", topic: "Company",
    scene: "estate",
    sections: [
      { kind: "lead", text: aboutHero.mission },
      { kind: "facts", items: companyFacts },
      { kind: "steps", heading: "Our story", items: story.map((s) => ({ title: s.heading, body: s.body })) },
      { kind: "paragraphs", heading: "Mission and vision", text: [missionVision.mission, missionVision.vision] },
      { kind: "cards", heading: "Design principles", items: principles.map((p) => ({ title: p.title, body: p.body })) },
      { kind: "cards", heading: "Product offerings", items: productFamily.map((p) => ({ title: `${p.name} — ${p.badge}`, body: p.body })) },
      { kind: "cards", heading: "Service offerings", items: services.map((s) => ({ title: s.name, body: s.body })) },
      { kind: "paragraphs", text: [servicesNote] },
      { kind: "steps", heading: "Milestones", items: milestones.map((m) => ({ title: `${m.year} — ${m.title}`, body: m.body })) },
      { kind: "table", heading: "Entities and offices", columns: ["City", "Entity", "Address"], rows: offices.map((o) => [`${o.city} — ${o.label}`, o.entity, o.address]) },
      { kind: "cards", heading: "Leadership", items: named.map((l) => ({ title: `${l.name} — ${l.role}`, body: l.bio ?? "" })) },
      { kind: "bullets", heading: "Trust", items: trustPoints },
      { kind: "paragraphs", heading: "Contact", text: [`${company.emails.sales} · ${company.phones.map((p) => `${p.region} ${p.number}`).join(" · ")} · ${company.social.linkedin}`] },
    ],
    related: [{ label: "About us", href: "/about" }, { label: "Leadership", href: "/about/leadership" }],
  });
}

  /* ── the library ── */
  return [
  platformOverview(),
  capabilityGuide(),
  ...editions.map(editionDatasheet),
  ...solutions.map(solutionBrief),
  ...industries.map(industryBrief),
  sovereignPatterns(),
  migrationPaper(),
  whaleAiGuide(),
  ...customerStories.map(caseStudy),
  trustSummary(),
  companyProfile(),
  ];
}

/** The library as the typed modules define it — the fallback when the CMS is off. */
export const documents: DocumentDef[] = buildDocuments(defaultSources);

export const documentsBySlug = Object.fromEntries(documents.map((d) => [d.slug, d])) as Record<string, DocumentDef>;

export const docTypeOrder: DocType[] = ["Whitepaper", "Datasheet", "Solution brief", "Industry brief", "Case study", "Company"];
