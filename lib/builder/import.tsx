/**
 * "Take over" a coded page: turns its current content (page hero + the CMS
 * page document + catalog sections) into a block composition the builder
 * can edit, so a takeover starts from the page as it is, not from blank.
 *
 * The mapping is structural: every section of a page document becomes a
 * band with a heading and the block that fits its list (cards, steps,
 * numbers, FAQ, table…); the site's signature sections (animated
 * architecture, catalog grids, forms) are placed as their special blocks.
 */
import "server-only";
import type { ComponentData, Data } from "@puckeditor/core";
import { getHomePage, getPageHero } from "@/lib/content";
import { getPageDoc } from "@/lib/cms-page";
import { pageContent } from "@/content/sections/pages";
import { platformPageSpec } from "@/content/cms/docs/platformPage";
import { platformPage } from "@/content/sections/platformPage";
import { PAGE_HEROES } from "@/content/sections/pageHeroes";
import { ROUTE_PHOTO, photos, photoSrc } from "@/content/photos";
import { imageUrl } from "@/lib/cms";
import type { MediaValue } from "./fields";

type Rec = Record<string, unknown>;
const isObj = (v: unknown): v is Rec => typeof v === "object" && v !== null && !Array.isArray(v);
const isStr = (v: unknown): v is string => typeof v === "string";

let counter = 0;
const uid = (type: string) => `${type}-${Date.now().toString(36)}${(counter++).toString(36)}`;
const block = (type: string, props: Rec): ComponentData => ({ type, props: { id: uid(type), ...props } } as ComponentData);

/** Which page-document sections are shown by a signature block rather than a generic one. */
const SPECIALS: Record<string, Record<string, string[]>> = {
  "/platform": { architecture: ["Architecture"], families: ["Families"], controlPlane: ["ControlPlane"], showcase: ["ConsoleShowcase"], prototype: ["Prototype"] },
  "/editions": { cards: ["Editions"] },
  "/pricing": { tiers: ["Editions"] },
  "/modules": { families: ["Families", "Modules"] },
  "/industries": { sectors: ["Industries"] },
  "/solutions": { outcomes: ["Solutions"], industries: ["Industries"], customers: ["Stories"] },
  "/customers": { stories: ["Stories"] },
  "/case-studies": { index: ["Stories"] },
  "/resources": { collateral: ["Collateral"], library: ["Resources"] },
  "/trust": { certifications: ["Certifications"] },
  "/about": { leadership: ["Team"] },
  "/about/leadership": { roster: ["Team"] },
  "/careers": { roles: ["Jobs"] },
  "/newsroom": { announcements: ["Newsroom"] },
  "/contact": { intents: ["Contact"] },
};

const LABEL_KEYS = /^(label|link|button|cta|cardLink|readLabel|allLabel|exploreLabel|previewLabel|previewPrefix|featuredLabel|availableLabel|downloadLabel|applyLabel|kicker|eyebrow|title|titleAccent|titleSuffix|name|shortName|badge|status|icon|iso|href|key|slug|id|columns|regionsLabel|statLabel|whyNowLabel|designRuleLabel|postureLabel|complianceLabel|momentsTitle|howToRead|figureLink|figureCaption|directoryLabel|locationsLabel)/i;

function heading(section: Rec): { eyebrow?: string; title?: string; description?: string } {
  const h = isObj(section.heading) ? section.heading : section;
  return { eyebrow: isStr(h.eyebrow) ? h.eyebrow : undefined, title: isStr(h.title) ? h.title : undefined, description: isStr(h.description) ? h.description : undefined };
}

function pick(item: Rec, ...keys: string[]): string {
  for (const k of keys) if (isStr(item[k]) && item[k]) return item[k] as string;
  return "";
}

/** One list → the block that shows it. */
function listBlock(items: unknown[], key: string, section: Rec, h: { eyebrow?: string; title?: string; description?: string }, useHeading: boolean): ComponentData | null {
  if (items.length === 0) return null;
  const hd = useHeading ? { eyebrow: h.eyebrow ?? "", title: h.title ?? "", description: h.description ?? "" } : { eyebrow: "", title: "", description: "" };
  if (items.every(isStr)) {
    const strings = items as string[];
    const short = strings.every((s) => s.length < 32);
    return short && /chip|compliance|markets|tags|editions|estates|features|focus/i.test(key)
      ? block("Chips", { label: h.title ?? "", items: strings.map((text) => ({ text })) })
      : block("Checklist", { ...hd, columns: strings.length > 5 ? 2 : 1, items: strings.map((text) => ({ text })) });
  }
  const first = items.find(isObj);
  if (!first) return null;
  if ("q" in first && "a" in first) return block("Faq", { ...hd, tinted: true, items: (items as Rec[]).map((i) => ({ q: pick(i, "q"), a: pick(i, "a") })) });
  if ("cells" in first) {
    const columns = Array.isArray(section.columns) ? (section.columns as string[]).map((text) => ({ text })) : [];
    return block("Table", { columns, rows: (items as Rec[]).map((r) => ({ cells: (Array.isArray(r.cells) ? r.cells : []).map((c) => ({ text: String(c) })) })), note: pick(section, "note") });
  }
  if ("value" in first && "label" in first && !("body" in first)) {
    return /glance|facts|record|table/i.test(key) && items.length > 4
      ? block("Table", { columns: [{ text: "" }, { text: "" }], rows: (items as Rec[]).map((i) => ({ cells: [{ text: pick(i, "label") }, { text: pick(i, "value") }] })), note: "" })
      : block("Stats", { style: "strip", items: (items as Rec[]).map((i) => ({ value: pick(i, "value"), label: pick(i, "label") })) });
  }
  const when = (i: Rec) => pick(i, "when", "timeframe", "year", "duration", "step");
  if (items.some((i) => isObj(i) && when(i)) && items.every((i) => isObj(i) && (pick(i, "title", "name", "step")))) {
    return block("Steps", { ...hd, items: (items as Rec[]).map((i) => ({ when: when(i), title: pick(i, "title", "name", "step"), body: pick(i, "body", "description", "text") })) });
  }
  if (items.every((i) => isObj(i) && pick(i, "title", "name", "category", "q"))) {
    const cards = (items as Rec[]).map((i) => {
      const bodyParts = [pick(i, "body", "description", "text", "answer", "tagline", "summary", "note", "proposition", "margin")];
      const extras = ["points", "features", "perks", "chips", "items"].map((k) => (Array.isArray(i[k]) ? (i[k] as unknown[]).filter(isStr).join(" · ") : "")).filter(Boolean);
      const status = pick(i, "status", "character", "commitment", "edition", "label");
      return { icon: pick(i, "icon") || "Sparkles", title: pick(i, "title", "name", "category"), body: [...bodyParts, ...extras, status && !bodyParts[0].includes(status) ? status : ""].filter(Boolean).join(" — "), href: pick(i, "href") };
    });
    const hasIcons = cards.some((c) => c.icon !== "Sparkles");
    return block("Cards", { ...hd, style: hasIcons ? "icon" : "numbered", columns: cards.length % 4 === 0 ? 4 : cards.length % 2 === 0 && cards.length <= 4 ? 2 : 3, linkLabel: "Learn more", items: cards });
  }
  return null;
}

/** A generic section of a page document → the blocks inside one band. */
function sectionBlocks(key: string, section: Rec): ComponentData[] {
  const out: ComponentData[] = [];
  const h = heading(section);
  let headingUsed = false;
  const bodies: string[] = [];
  const buttons: { label: string; href: string; variant: string; external: boolean }[] = [];
  for (const [k, v] of Object.entries(section)) {
    if (k === "heading") continue;
    if (Array.isArray(v)) {
      const b = listBlock(v, k, section, h, !headingUsed);
      if (b) { out.push(b); headingUsed = true; }
    } else if (isObj(v)) {
      if (isStr(v.label) && isStr(v.href) && v.label) buttons.push({ label: v.label, href: v.href, variant: buttons.length ? "outline" : "primary", external: false });
      else if (Array.isArray(v.items)) { const b = listBlock(v.items, k, v, heading(v), true); if (b) out.push(b); }
      else if (isStr(v.value) && isStr(v.label)) out.push(block("Stats", { style: "cards", items: [{ value: v.value, label: v.label }] }));
    } else if (isStr(v) && v.length > 40 && !LABEL_KEYS.test(k)) {
      bodies.push(v);
    }
  }
  const text = bodies.map((b) => `<p>${b.replace(/&/g, "&amp;").replace(/</g, "&lt;")}</p>`).join("");
  if (!headingUsed && (h.title || h.eyebrow)) out.unshift(block("Heading", { eyebrow: h.eyebrow ?? "", title: h.title ?? "", description: h.description ?? "", align: "left", inverse: false }));
  if (text) out.push(block("Text", { content: text, width: "normal", align: "left" }));
  if (buttons.length) out.push(block("Buttons", { align: "left", items: buttons }));
  // merge single stat cards into one strip
  const stats = out.filter((b) => b.type === "Stats");
  if (stats.length > 1) {
    const merged = block("Stats", { style: "strip", items: stats.flatMap((b) => (b.props as unknown as { items: unknown[] }).items) });
    const idx = out.indexOf(stats[0]);
    const rest = out.filter((b) => b.type !== "Stats");
    rest.splice(idx, 0, merged);
    return rest;
  }
  return out;
}

const closingShape = (v: unknown): v is Rec => isObj(v) && isObj(v.primary) && isStr(v.title) && (isStr(v.body) || isStr(v.description));
const closingBlock = (v: Rec) => block("Closing", {
  eyebrow: pick(v, "eyebrow", "kicker"), title: pick(v, "title"), body: pick(v, "body", "description"), variant: "dark",
  primary: { label: pick(v.primary as Rec, "label"), href: pick(v.primary as Rec, "href") || "/contact?intent=demo", note: pick(v.primary as Rec, "note") },
  secondary: isObj(v.secondary) ? { label: pick(v.secondary, "label"), href: pick(v.secondary, "href"), note: pick(v.secondary, "note") } : { label: "", href: "", note: "" },
  tertiary: isObj(v.tertiary) ? { label: pick(v.tertiary, "label"), href: pick(v.tertiary, "href"), note: pick(v.tertiary, "note") } : { label: "", href: "", note: "" },
});

async function heroBlock(path: string, extras: Rec | undefined, tone: "light" | "dark" = "light"): Promise<ComponentData> {
  const cms = await getPageHero(path);
  const fallback = PAGE_HEROES[path];
  const photoKey = ROUTE_PHOTO[path];
  const photo = photoKey ? photos[photoKey] : undefined;
  const image: MediaValue | undefined = cms?.image
    ? { url: imageUrl(cms.image.src, 1536), alt: cms.image.alt ?? "", width: cms.image.width, height: cms.image.height }
    : photoKey && photo ? { url: photoSrc(photoKey, 1536), alt: photo.alt, width: photo.width, height: photo.height } : undefined;
  const primary = isObj(extras?.primary) ? extras!.primary : isObj(extras?.cta) ? extras!.cta : undefined;
  const secondary = isObj(extras?.secondary) ? extras!.secondary : undefined;
  const stats = Array.isArray(extras?.stats) ? (extras!.stats as Rec[]).map((s) => ({ value: pick(s, "value"), label: pick(s, "label") })) : [];
  return block("Hero", {
    eyebrow: cms?.eyebrow ?? fallback?.eyebrow ?? "",
    title: cms?.title ?? fallback?.title ?? "",
    titleAccent: cms?.titleAccent ?? fallback?.titleAccent ?? "",
    description: cms?.description ?? fallback?.description ?? "",
    tone,
    image,
    video: cms?.video ? { url: cms.video.src } : undefined,
    primary: { label: primary ? pick(primary, "label") : "Book a demo", href: primary ? pick(primary, "href") : "/contact?intent=demo", note: primary ? pick(primary, "note") : "" },
    secondary: { label: secondary ? pick(secondary, "label") : "", href: secondary ? pick(secondary, "href") : "", note: "" },
    stats,
  });
}

const band = (content: ComponentData[], i: number): ComponentData => block("Section", { background: i % 2 ? "sunken" : "white", padding: "md", border: i > 0, content });

const catalog = (type: string, h: { eyebrow?: string; title?: string; description?: string }) =>
  block(type, { eyebrow: h.eyebrow ?? "", title: h.title ?? "", description: h.description ?? "", linkLabel: "", linkHref: "", items: [] });

async function importHome(): Promise<Data> {
  const home = await getHomePage();
  const s = home.sections;
  const hero = home.hero;
  const photo = photos["platform-stack"];
  const blocks: ComponentData[] = [
    block("Hero", {
      eyebrow: hero.badge, title: hero.title, titleAccent: hero.titleAccent ?? "", description: hero.description, tone: "light",
      image: hero.image ? { url: imageUrl(hero.image.src, 1536), alt: hero.image.alt ?? "" } : { url: photoSrc("platform-stack", 1536), alt: photo.alt, width: photo.width, height: photo.height },
      primary: { label: hero.primaryCta.label, href: hero.primaryCta.href, note: hero.primaryNote }, secondary: { label: hero.secondaryCta.label, href: hero.secondaryCta.href, note: "" },
      stats: hero.facts.map((f) => ({ value: String(f.value), label: f.label })),
    }),
    band([block("Heading", { eyebrow: s.proofSection.kicker, title: "", description: "", align: "left", inverse: false }), block("Stats", { style: "cards", items: home.proofStrip.map((p) => ({ value: p.value, label: p.label })) })], 1),
    block("Section", { background: "gradient", padding: "lg", border: false, content: [
      block("Heading", { eyebrow: home.story.eyebrow, title: home.story.hook, description: home.story.problem, align: "left", inverse: true }),
      block("Quote", { text: home.story.turn, by: "" }),
      block("Cards", { eyebrow: "", title: "", description: "", style: "icon", columns: 3, linkLabel: "", items: home.problems.map((p) => ({ icon: p.icon, title: p.title, body: p.cost || p.body, href: "" })) }),
    ] }),
    band([block("Architecture", { eyebrow: s.architectureSection.heading.eyebrow ?? "", title: s.architectureSection.heading.title, description: s.architectureSection.heading.description ?? "", button: s.architectureSection.cta })], 0),
    band([block("ConsoleShowcase", { eyebrow: s.productSection.heading.eyebrow ?? "", title: s.productSection.heading.title, description: s.productSection.heading.description ?? "" }), block("Cards", { eyebrow: "", title: "", description: "", style: "icon", columns: 4, linkLabel: "", items: s.productSection.facts.map((f) => ({ icon: f.icon ?? "Sparkles", title: f.title, body: f.body ?? "", href: "" })) })], 1),
    band([block("Cards", { eyebrow: home.differentiators.eyebrow, title: home.differentiators.title, description: home.differentiators.description, style: "icon", columns: 3, linkLabel: "", items: home.differentiators.items.map((d) => ({ icon: d.icon, title: d.title, body: d.body, href: "" })) })], 0),
    band([catalog("Families", s.familiesSection.heading)], 1),
    band([catalog("Stories", s.spotlightSection.heading)], 0),
    band([catalog("Editions", s.editionsSection.heading)], 1),
    block("Prototype", { tinted: false, offer: null }),
    band([block("Cards", { eyebrow: home.portfolio.eyebrow, title: home.portfolio.title, description: home.portfolio.description, style: "plain", columns: 4, linkLabel: "Learn more", items: home.portfolio.products.map((p) => ({ icon: "Sparkles", title: p.name, body: `${p.role} — ${p.body}`, href: p.href })) }), block("Text", { content: `<p>${home.portfolio.note}</p>`, width: "wide", align: "left" })], 0),
    block("Global", { data: null }),
    closingBlock(s.closing as unknown as Rec),
  ];
  return { content: blocks, root: { props: { title: "BlueWhale Stack — Every cloud. One control plane.", description: "", noindex: false } } as Data["root"] };
}

/** The block composition for a coded route, or null when the route has no page document to start from. */
export async function importPage(path: string): Promise<Data | null> {
  if (path === "/") return importHome();
  const entry = path === "/platform" ? { spec: platformPageSpec, content: platformPage as Rec } : pageContent.find((e) => e.spec.locations?.[0]?.href === path);
  if (!entry) return null;
  const doc = (await getPageDoc(entry.spec as typeof platformPageSpec, entry.content as never)) as unknown as Rec;
  const specials = SPECIALS[path] ?? {};
  const blocks: ComponentData[] = [];
  const dark = path === "/products/whale-ai" || path === "/case-studies";
  blocks.push(await heroBlock(path, isObj(doc.hero) ? doc.hero : undefined, dark ? "dark" : "light"));
  let i = 0;
  for (const [key, value] of Object.entries(doc)) {
    if (["seoTitle", "seoDescription", "hero", "cmsId", "detail"].includes(key)) continue;
    if (closingShape(value)) { blocks.push(closingBlock(value)); continue; }
    if (specials[key]) {
      const h = isObj(value) ? heading(value) : {};
      const inner: ComponentData[] = specials[key].map((type) =>
        type === "Prototype" ? block("Prototype", { tinted: true, offer: null }) :
        type === "Contact" ? block("Contact", { title: "Book a working session", body: "Tell us which clouds you run and what you would like to see first.", intent: "demo", submitLabel: "Book a working session" }) :
        type === "Architecture" || type === "ControlPlane" || type === "ConsoleShowcase" ? block(type, { eyebrow: h.eyebrow ?? "", title: h.title ?? "", description: h.description ?? "", ...(type === "Architecture" ? { button: { label: "", href: "" } } : {}) }) :
        catalog(type, h),
      );
      blocks.push(specials[key].includes("Prototype") ? inner[0] : specials[key].includes("ControlPlane") ? block("Section", { background: "dark", padding: "md", border: false, content: inner }) : band(inner, i++));
      continue;
    }
    if (isObj(value)) {
      const inner = sectionBlocks(key, value);
      const faq = inner.find((b) => b.type === "Faq");
      const rest = inner.filter((b) => b.type !== "Faq");
      if (rest.length) blocks.push(band(rest, i++));
      if (faq) blocks.push(faq);
    } else if (Array.isArray(value)) {
      const b = listBlock(value, key, doc, {}, false);
      if (b) blocks.push(band([b], i++));
    }
  }
  return {
    content: blocks,
    root: { props: { title: isStr(doc.seoTitle) ? doc.seoTitle : path, description: isStr(doc.seoDescription) ? doc.seoDescription : "", noindex: false } } as Data["root"],
  };
}
