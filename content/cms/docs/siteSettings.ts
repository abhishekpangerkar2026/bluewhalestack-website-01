import { defineDoc, f } from "../spec";
import { contextNav, link, linkGroup, navItem, navLink, office, phone, region } from "../objects";

/** Site-wide settings: company facts, contact details, navigation and footer. */
export const siteSettingsSpec = defineDoc(
  "siteSettings",
  "Site settings",
  {
    company: f.obj("Company", {
      name: f.str("Company name"),
      tagline: f.str("Tagline"),
      metaDescription: f.text("Default meta description (search engines)", { rows: 4 }),
      emails: f.obj("Email addresses", {
        sales: f.str("Sales"),
        careers: f.str("Careers"),
        partners: f.str("Partners"),
        contact: f.str("General contact / press"),
      }),
      phones: f.arr("Phone lines", phone),
      social: f.obj("Social links", {
        linkedin: f.str("LinkedIn URL"),
        twitter: f.str("X / Twitter URL"),
      }),
      appUrl: f.str("Product login URL (header 'Log in')"),
    }, { group: "company" }),
    offices: f.arr("Offices", office, { group: "company" }),
    regions: f.arr("SaaS regions", region, { group: "company" }),
    compliance: f.strings("Compliance badges (footer, Trust strips)", { group: "company" }),
    partnerPortal: f.obj("Partner Portal", {
      url: f.str("Portal URL"),
      login: f.str("Login URL"),
      register: f.str("Registration URL"),
    }, { group: "company" }),

    header: f.obj("Header", {
      primaryNav: f.arr("Primary navigation (mega-menu)", navItem),
      utilityNav: f.arr("Utility links (Resources, Docs…)", navLink),
      loginLabel: f.str("Log-in link label"),
      cta: f.obj("Header button", link.fields),
    }, { group: "header" }),

    footer: f.obj("Footer", {
      tagline: f.str("Big line"),
      blurb: f.text("Description under the tagline"),
      followLabel: f.str("LinkedIn link label"),
      newsletterKicker: f.str("Newsletter kicker"),
      newsletterTitle: f.str("Newsletter title"),
      newsletterBody: f.text("Newsletter body", { rows: 2 }),
      columns: f.arr("Link columns", linkGroup),
      trustLabel: f.str("Trust link label"),
      copyright: f.str("Copyright line (after the year)"),
      legalLinks: f.arr("Legal links", navLink),
    }, { group: "footer" }),

    contextNav: f.arr("Section navigation bars (the strip under the header on inner pages)", contextNav, { group: "header" }),
    contextAction: f.obj("Section bar action link", link.fields, { group: "header" }),
  },
  {
    singleton: true,
    groups: [
      { name: "company", title: "Company & contact", default: true },
      { name: "header", title: "Header & navigation" },
      { name: "footer", title: "Footer" },
    ],
    locations: [{ title: "Every page", href: "/" }],
  },
);

export type SiteSettings = import("../spec").InferDoc<typeof siteSettingsSpec>;
