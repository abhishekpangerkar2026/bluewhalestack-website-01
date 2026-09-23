import type { StructureResolver } from "sanity/structure";
import { singletonSpecs, collectionSpecs } from "../content/cms/index";

/** Documents that exist exactly once. */
export const SINGLETONS = new Set(["homePage", ...singletonSpecs.map((s) => s.name)]);

const collectionTitles: Record<string, string> = {
  capabilityFamily: "Capability families",
  certification: "Trust Center — certifications",
  jobOpening: "Careers — open roles",
  partnerTrack: "Partner tracks",
  legalPage: "Legal pages",
  docPage: "Documentation guides",
};

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Website")
    .items([
      S.listItem().title("Site settings").id("siteSettings").child(S.document().schemaType("siteSettings").documentId("siteSettings")),
      S.divider(),
      S.listItem()
        .title("Pages")
        .id("pages")
        .child(
          S.list()
            .title("Pages — every section of every page")
            .items([
              S.listItem().title("Home page").id("homePage").child(S.document().schemaType("homePage").documentId("homePage")),
              ...singletonSpecs
                .filter((s) => s.name !== "siteSettings")
                .map((s) => S.listItem().title(s.title).id(s.name).child(S.document().schemaType(s.name).documentId(s.name))),
            ]),
        ),
      S.listItem()
        .title("Page heroes")
        .schemaType("pageHero")
        .child(S.documentTypeList("pageHero").title("Page heroes — headline, photo or video per page").defaultOrdering([{ field: "route", direction: "asc" }])),
      S.divider(),
      S.documentTypeListItem("edition").title("Editions"),
      S.documentTypeListItem("capabilityFamily").title(collectionTitles.capabilityFamily),
      S.documentTypeListItem("module").title("Modules (capabilities)"),
      S.documentTypeListItem("industry").title("Industries"),
      S.documentTypeListItem("solution").title("Solutions"),
      S.documentTypeListItem("customerStory").title("Customer stories & case studies"),
      S.divider(),
      S.documentTypeListItem("post").title("Newsroom"),
      S.documentTypeListItem("teamMember").title("Leadership & team"),
      S.documentTypeListItem("jobOpening").title(collectionTitles.jobOpening),
      S.documentTypeListItem("partnerTrack").title(collectionTitles.partnerTrack),
      S.divider(),
      S.documentTypeListItem("certification").title(collectionTitles.certification),
      S.documentTypeListItem("legalPage").title(collectionTitles.legalPage),
      S.documentTypeListItem("docPage").title(collectionTitles.docPage),
      S.documentTypeListItem("collateralDoc").title("Official collateral (PDFs)"),
      ...collectionSpecs
        .filter((s) => !(s.name in collectionTitles))
        .map((s) => S.documentTypeListItem(s.name).title(s.title)),
      S.divider(),
      S.documentTypeListItem("builderPage").title("Website builder — pages (raw)"),
      S.documentTypeListItem("builderMedia").title("Website builder — uploads"),
    ]);
