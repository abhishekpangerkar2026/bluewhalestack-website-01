import { defineDoc, defineObject, f, type InferDoc } from "../spec";
import { closingCta, cta, sectionHeading } from "../objects";

const productRevenueRow = defineObject("productRevenueRow", "Revenue row", {
  product: f.str("Product"),
  model: f.str("Revenue model"),
}, { title: "product", subtitle: "model" });

export const productsPageSpec = defineDoc(
  "productsPage",
  "Products page",
  {
    seoTitle: f.str("Browser / search title", { group: "hero" }),
    seoDescription: f.text("Search description", { group: "hero" }),
    hero: f.obj("Hero extras", {
      primary: f.obj("Primary button", cta.fields),
      secondary: f.obj("Secondary button", cta.fields),
    }, { group: "hero" }),

    portfolio: f.obj("Portfolio cards", {
      cardLink: f.str("Card link label"),
    }, { group: "sections" }),

    earns: f.obj("How the products earn", {
      heading: f.obj("Heading", sectionHeading.fields),
      columns: f.strings("Table column headings"),
      rows: f.arr("Rows", productRevenueRow),
    }, { group: "sections" }),

    foundations: f.obj("Shared foundations", {
      heading: f.obj("Heading", sectionHeading.fields),
      items: f.strings("Items"),
    }, { group: "sections" }),

    closing: f.obj("Closing call to action", closingCta.fields, { group: "sections" }),
  },
  {
    singleton: true,
    groups: [
      { name: "hero", title: "Hero & SEO", default: true },
      { name: "sections", title: "Sections" },
    ],
    locations: [{ title: "Products", href: "/products" }],
  },
);

export type ProductsPage = InferDoc<typeof productsPageSpec>;
