/**
 * /modules — every section's copy as the code ships it: the fallback for the
 * CMS "Modules page" document and what the seed script loads into it. The
 * families come from getFamilies() and the modules from getModules(); the
 * family and module counts in the hero are computed in the page.
 */
import type { ModulesPage } from "@/content/cms/docs/modulesPage";

export const modulesPage: ModulesPage = {
  seoTitle: "Modules",
  seoDescription:
    "What lives in the BlueWhale Stack platform core — 54 capabilities across nine families: Management & Delivery, Whalenomics · FinOps, Security & Identity, Governance & Audit, Whale AI, Migration & Discovery, Observability & ITSM, Tenancy & Monetization and Sovereign Operations — gated per edition.",
  hero: {
    note: "One identity, one inventory and one policy plane. The full 54-capability list with edition mapping is in the technical datasheet, on request.",
    statCapabilities: { value: "54", label: "capabilities shipped across the platform" },
    statFamiliesLabel: "capability families under one console",
    statModulesLabel: "modules, each with its own page and maturity",
    statEditions: { value: "4", label: "editions on one architecture — upgrade is a licence change" },
  },
  families: {
    navLabel: "Explore families",
    // verbatim from the page as it shipped — "{n}" is replaced by the count
    shipsOne: "{n} module ship in this family",
    shipsMany: "{n} modules ship in this family",
    cardLink: "What it does, how it works, FAQ",
  },
  closing: {
    heading: {
      title: "Not sure which families you need?",
      description:
        "Tell us how you run today — we will map the families and edition to your estate, and show it running on your estate's shape in the discovery workshop.",
    },
    cta: { label: "Book the discovery workshop", href: "/contact?intent=demo" },
  },
};
