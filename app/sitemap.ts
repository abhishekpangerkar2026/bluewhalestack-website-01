import type { MetadataRoute } from "next";
import { getCustomerStories, getDocuments, getEditions, getIndustries, getModules, getSolutions } from "@/lib/content";
import { getStore } from "@/lib/builder/store";

const BASE = "https://www.bluewhalestack.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [editions, modules, industries, solutions, stories, documents] = await Promise.all([
    getEditions(),
    getModules(),
    getIndustries(),
    getSolutions(),
    getCustomerStories(),
    getDocuments(),
  ]);

  const staticRoutes = [
    "",
    "/platform",
    "/products",
    "/editions",
    "/modules",
    "/industries",
    "/solutions",
    "/customers",
    "/case-studies",
    "/fabric",
    "/pricing",
    "/resources",
    "/docs",
    "/about",
    "/partners",
    "/careers",
    "/newsroom",
    "/contact",
  ];

  const dynamic = [
    ...editions.map((e) => `/editions/${e.slug}`),
    ...modules.map((m) => `/modules/${m.slug}`),
    ...industries.map((i) => `/industries/${i.slug}`),
    ...solutions.map((s) => `/solutions/${s.slug}`),
    ...stories.map((c) => `/case-studies/${c.slug}`),
    ...documents.map((d) => `/resources/${d.slug}`),
  ];

  // pages created in the website builder (published ones only, excluding addresses the code already has)
  let builtRoutes: string[] = [];
  try {
    const known = new Set([...staticRoutes, ...dynamic]);
    builtRoutes = (await getStore().listPages()).filter((p) => p.published && !(p.published.root?.props as { noindex?: boolean } | undefined)?.noindex).map((p) => p.path).filter((p) => !known.has(p === "/" ? "" : p));
  } catch {
    builtRoutes = [];
  }

  return [...staticRoutes, ...dynamic, ...builtRoutes].map((path) => ({
    url: `${BASE}${path}`,
    changeFrequency: "weekly",
    priority: path === "" ? 1 : 0.7,
  }));
}
