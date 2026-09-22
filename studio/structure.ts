import type { StructureResolver } from "sanity/structure";

/** Documents that exist exactly once. */
export const SINGLETONS = new Set(["homePage"]);

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Website")
    .items([
      S.listItem().title("Home page").id("homePage").child(S.document().schemaType("homePage").documentId("homePage")),
      S.listItem()
        .title("Page heroes")
        .schemaType("pageHero")
        .child(S.documentTypeList("pageHero").title("Page heroes — headline, photo or video per page").defaultOrdering([{ field: "route", direction: "asc" }])),
      S.divider(),
      S.documentTypeListItem("edition").title("Editions"),
      S.documentTypeListItem("module").title("Modules (capabilities)"),
      S.documentTypeListItem("industry").title("Industries"),
      S.documentTypeListItem("solution").title("Solutions"),
      S.documentTypeListItem("customerStory").title("Customer stories & case studies"),
      S.divider(),
      S.documentTypeListItem("post").title("Newsroom"),
      S.documentTypeListItem("teamMember").title("Leadership & team"),
      S.documentTypeListItem("collateralDoc").title("Official collateral (PDFs)"),
    ]);
