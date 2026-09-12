import type { MetadataRoute } from "next";
import { editions } from "@/content/editions";
import { modules } from "@/content/modules";
import { industries } from "@/content/industries";
import { solutions } from "@/content/solutions";
import { customerStories } from "@/content/customers";

const BASE = "https://www.bluewhalestack.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/platform",
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
    "/contact",
  ];

  const dynamic = [
    ...editions.map((e) => `/editions/${e.slug}`),
    ...modules.map((m) => `/modules/${m.slug}`),
    ...industries.map((i) => `/industries/${i.slug}`),
    ...solutions.map((s) => `/solutions/${s.slug}`),
    ...customerStories.map((c) => `/case-studies/${c.slug}`),
  ];

  return [...staticRoutes, ...dynamic].map((path) => ({
    url: `${BASE}${path}`,
    changeFrequency: "weekly",
    priority: path === "" ? 1 : 0.7,
  }));
}
