import type { MetadataRoute } from "next";
import { documents } from "@/content/documents";
import { getCustomerStories, getEditions, getIndustries, getModules, getSolutions } from "@/lib/content";

const BASE = "https://www.bluewhalestack.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [editions, modules, industries, solutions, stories] = await Promise.all([
    getEditions(),
    getModules(),
    getIndustries(),
    getSolutions(),
    getCustomerStories(),
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

  return [...staticRoutes, ...dynamic].map((path) => ({
    url: `${BASE}${path}`,
    changeFrequency: "weekly",
    priority: path === "" ? 1 : 0.7,
  }));
}
