/**
 * /products — every section's copy as the code ships it: the fallback for the
 * CMS "Products page" document and what the seed script loads into it. The
 * portfolio cards themselves come from the home page document (getHomePage()).
 */
import type { ProductsPage } from "@/content/cms/docs/productsPage";

export const productsPage: ProductsPage = {
  seoTitle: "Products — four products, one platform DNA",
  seoDescription:
    "BlueWhale Stack, the flagship control plane; WhaleDocs for governed enterprise content; BlueWhale Public Cloud as consumable governed regions; and the OEM Appliance, rack-ready. One identity, policy, audit and tenancy engine underneath all four.",
  hero: {
    primary: { label: "The flagship platform", href: "/platform" },
    secondary: { label: "Talk to sales", href: "/contact?intent=sales" },
  },
  portfolio: {
    cardLink: "Learn more",
  },
  earns: {
    heading: {
      eyebrow: "How the products earn",
      title: "Four doors, one governed story.",
      description:
        "A customer entering through any product inherits the same identity, policy, audit and tenancy engine — and an upgrade to the full platform is an extension, never a migration.",
    },
    columns: ["Product", "Revenue model"],
    rows: [
      { product: "BlueWhale Stack", model: "Annual licence by edition — renewable, upgradeable" },
      { product: "WhaleDocs", model: "Per-seat / per-repository subscription" },
      { product: "BlueWhale Public Cloud", model: "Metered consumption on governed regions" },
      { product: "BlueWhale Appliance — OEM", model: "Hardware margin plus the attached platform subscription" },
    ],
  },
  foundations: {
    heading: { eyebrow: "Shared foundations", title: "Built once. Inherited by every product." },
    items: [
      "One trust story — the certification set (ISO/IEC 27001 · 22301 · 27017 · 27018 · 27701, GDPR and CSA STAR Level 1 assessments, SOC 2 Type II readiness assessed) and the Trust Center cover the product line.",
      "One identity, policy and audit engine — built once in the Stack, inherited by every product.",
      "One support model — L1/L2 with the customer or partner, L3 with BlueWhale, a 24×7 critical bridge at 99.9%.",
      "One roadmap discipline — quarterly releases; no forced upgrades on sovereign estates.",
    ],
  },
  closing: {
    eyebrow: "Next step",
    title: "Start with the platform — every other product inherits it.",
    body: "The discovery workshop puts the control plane on your estate's shape in half a day; the 90-day prototype proves it on your real environments before any commercial conversation.",
    primary: { label: "Book the discovery workshop", href: "/contact?intent=demo", note: "Half a day · your technology and finance leads" },
    secondary: { label: "Compare the editions", href: "/editions", note: "Standard · Enterprise · Telco & Datacenter · Government" },
    tertiary: { label: "Trust Center", href: "/trust", note: "certificates and the compliance posture behind every product" },
  },
};
