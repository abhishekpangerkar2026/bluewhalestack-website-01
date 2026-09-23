import { defineDocuments, defineLocations, type PresentationPluginOptions } from "sanity/presentation";
import { singletonSpecs, collectionSpecs } from "../content/cms/index";

/**
 * Presentation tool: the live website inside the Studio, with click-to-edit.
 * `locations` tells the Studio which page(s) a document appears on;
 * `mainDocuments` tells it which document a page belongs to.
 */
export const previewOrigin = process.env.SANITY_STUDIO_PREVIEW_ORIGIN ?? "https://bluewhalestack-website-production-6507.up.railway.app";

const detail = (base: string, label: string) =>
  defineLocations({
    select: { name: "name", slug: "slug.current" },
    resolve: (doc) => ({
      locations: [
        { title: doc?.name ?? label, href: `${base}/${doc?.slug ?? ""}` },
        { title: `All ${label.toLowerCase()}`, href: base },
      ],
    }),
  });

/** Locations for the spec-driven documents: fixed pages, or a detail route by slug. */
const specLocations = Object.fromEntries(
  [...singletonSpecs, ...collectionSpecs].map((spec) => {
    if (spec.detailRoute) {
      const base = spec.detailRoute.replace("/:slug", "");
      return [
        spec.name,
        defineLocations({
          select: { title: "title", slug: "slug.current" },
          resolve: (doc) => ({
            locations: [
              { title: doc?.title ?? spec.title, href: `${base}/${doc?.slug ?? ""}` },
              ...(spec.locations ?? []),
            ],
          }),
        }),
      ];
    }
    return [spec.name, defineLocations({ message: spec.singleton ? `${spec.title} — the whole page` : `Shown on ${(spec.locations ?? []).map((l) => l.title).join(", ") || "the site"}`, locations: spec.locations ?? [] })];
  }),
);

/** The page document that "owns" each route — what opens in the side panel when you navigate there. */
const pageRoutes = singletonSpecs
  .filter((s) => s.name !== "siteSettings" && s.locations?.[0]?.href)
  .map((s) => ({ route: s.locations![0].href, filter: `_type == "${s.name}"` }));

export const presentationOptions: PresentationPluginOptions = {
  previewUrl: {
    origin: previewOrigin,
    preview: "/",
    previewMode: { enable: "/api/draft-mode/enable", disable: "/api/draft-mode/disable" },
  },
  resolve: {
    locations: {
      homePage: defineLocations({ message: "The landing page", locations: [{ title: "Home page", href: "/" }] }),
      pageHero: defineLocations({
        select: { route: "route", pageName: "pageName" },
        resolve: (doc) => ({ locations: [{ title: doc?.pageName ?? doc?.route ?? "Page", href: doc?.route ?? "/" }] }),
      }),
      edition: detail("/editions", "Editions"),
      module: detail("/modules", "Modules"),
      industry: detail("/industries", "Industries"),
      solution: detail("/solutions", "Solutions"),
      customerStory: defineLocations({
        select: { headline: "headline", slug: "slug.current" },
        resolve: (doc) => ({
          locations: [
            { title: doc?.headline ?? "Case study", href: `/case-studies/${doc?.slug ?? ""}` },
            { title: "All case studies", href: "/case-studies" },
            { title: "Home page (spotlight)", href: "/" },
          ],
        }),
      }),
      teamMember: defineLocations({ message: "Shown on the leadership page and the careers page", locations: [{ title: "Leadership", href: "/about/leadership" }, { title: "Careers", href: "/careers" }] }),
      post: defineLocations({ message: "Shown on the newsroom page", locations: [{ title: "Newsroom", href: "/newsroom" }] }),
      collateralDoc: defineLocations({ message: "Listed on the resources page", locations: [{ title: "Resources", href: "/resources" }] }),
      ...specLocations,
    },
    mainDocuments: defineDocuments([
      { route: "/", filter: `_type == "homePage"` },
      { route: "/editions/:slug", filter: `_type == "edition" && slug.current == $slug` },
      { route: "/modules/:slug", filter: `_type == "module" && slug.current == $slug` },
      { route: "/industries/:slug", filter: `_type == "industry" && slug.current == $slug` },
      { route: "/solutions/:slug", filter: `_type == "solution" && slug.current == $slug` },
      { route: "/case-studies/:slug", filter: `_type == "customerStory" && slug.current == $slug` },
      { route: "/legal/:slug", filter: `_type == "legalPage" && slug.current == $slug` },
      { route: "/docs/:slug", filter: `_type == "docPage" && slug.current == $slug` },
      ...pageRoutes,
      { route: "/:page", filter: `_type == "pageHero" && route == "/" + $page` },
    ]),
  },
};
