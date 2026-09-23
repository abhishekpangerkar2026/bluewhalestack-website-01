"use server";

/**
 * The bridge between the builder's catalog blocks and the site's content
 * getters. Runs on the server (as a server action from the editor, directly
 * when a page renders) and returns plain JSON the blocks can display.
 */
import fs from "node:fs";
import path from "node:path";
import {
  getEditions, getFamilies, getModules, getModuleDetail, getIndustries, getSolutions, getCustomerStories, getTeam, getJobs,
  getCertifications, getCollateral, getPosts, getPartnerTracks, getSiteSettings, getDocuments, getHomePage,
} from "@/lib/content";
import { imageUrl } from "@/lib/cms";
import { cld, publicIdFromPath } from "@/lib/cloudinary";
import { familyTileSrc } from "@/content/moduleArt";
import { formatPostDate } from "@/content/newsroom";
import { resourcesFrom } from "@/content/resources";
import { prototypeOfferContent } from "@/content/sections/platformPage";

export type CatalogKind =
  | "editions" | "families" | "modules" | "industries" | "solutions" | "stories" | "team" | "jobs"
  | "certifications" | "collateral" | "posts" | "tracks" | "settings" | "resources" | "prototype" | "global";

const localImage = (p?: string) => Boolean(p) && fs.existsSync(path.join(process.cwd(), "public", p!));

export async function getCatalog(kind: CatalogKind): Promise<unknown> {
  switch (kind) {
    case "editions":
      return (await getEditions()).map((e) => ({
        slug: e.slug, name: e.name, tagline: e.tagline, audience: e.audience, priceAnchor: e.priceAnchor, priceSub: e.priceSub ?? "",
        featured: Boolean(e.featured), comingSoon: Boolean(e.comingSoon), gaTarget: e.gaTarget ?? "", includes: e.includes, deploy: e.deploy, outcome: e.outcome,
      }));
    case "families":
      return (await getFamilies()).map((f) => ({ key: f.key, name: f.name, blurb: f.blurb, icon: f.icon, tile: f.tile ? imageUrl(f.tile.src, 800) : familyTileSrc(f.key, 800) }));
    case "modules": {
      const [modules, families] = await Promise.all([getModules(), getFamilies()]);
      const details = await Promise.all(modules.map((m) => getModuleDetail(m.slug)));
      return modules.map((m, i) => ({
        slug: m.slug, name: m.name, group: m.group, family: families.find((f) => f.key === m.group)?.name ?? m.group, icon: m.icon,
        tagline: m.tagline.replace(/\s*\([^)]*\)\s*$/, ""), status: details[i]?.status ?? null,
      }));
    }
    case "industries": {
      const [industries, editions] = await Promise.all([getIndustries(), getEditions()]);
      return industries.map((i) => {
        const edition = editions.find((e) => e.slug === i.edition);
        return { slug: i.slug, name: i.name, icon: i.icon, title: i.title, description: i.description, outcome: i.outcome, edition: edition?.name ?? "", comingSoon: Boolean(edition?.comingSoon) };
      });
    }
    case "solutions":
      return (await getSolutions()).map((s) => ({ slug: s.slug, name: s.name, icon: s.icon, summary: s.summary, fact: s.facts[0] ? `${s.facts[0].value} · ${s.facts[0].label}` : "" }));
    case "stories":
      return (await getCustomerStories()).map((c) => ({ slug: c.slug, industry: c.industry, edition: c.edition, headline: c.headline, summary: c.summary, challenge: c.challenge, org: c.org, note: c.note ?? "", metrics: c.metrics }));
    case "team":
      return (await getTeam()).filter((m) => m.name).map((m) => ({
        name: m.name!, role: m.role, bio: m.bio ?? "", linkedin: m.linkedin ?? "",
        image: m.cmsImage ? imageUrl(m.cmsImage.src, 400) : localImage(m.image) ? cld(publicIdFromPath(m.image!, "team"), m.image!, 400) : "",
      }));
    case "jobs": {
      const [jobs, settings] = await Promise.all([getJobs(), getSiteSettings()]);
      return jobs.map((j) => ({ title: j.title, department: j.department, location: j.location, type: j.type, remote: j.remote, applyUrl: j.applyUrl ?? `mailto:${settings.company.emails.careers}?subject=${encodeURIComponent(`Application: ${j.title}`)}` }));
    }
    case "certifications":
      return (await getCertifications()).map(({ cmsId: _cmsId, ...c }) => c);
    case "collateral":
      return await getCollateral();
    case "posts":
      return (await getPosts()).map((p) => ({ title: p.title, date: /^\d{4}-\d{2}-\d{2}$/.test(p.date) ? formatPostDate(p.date) : p.date, badge: p.badge, body: p.body, href: p.href ?? "", image: p.cmsImage ? imageUrl(p.cmsImage.src, 480) : "" }));
    case "tracks":
      return (await getPartnerTracks()).map(({ cmsId: _cmsId, ...t }) => t);
    case "settings": {
      const s = await getSiteSettings();
      return { regions: s.regions, compliance: s.compliance, offices: s.offices, emails: s.company.emails, phones: s.company.phones, partnerPortal: s.partnerPortal, social: s.company.social };
    }
    case "resources":
      return resourcesFrom(await getDocuments());
    case "prototype":
      return prototypeOfferContent;
    case "global": {
      const [home, settings] = await Promise.all([getHomePage(), getSiteSettings()]);
      return { content: home.sections.global, regions: settings.regions };
    }
  }
}
