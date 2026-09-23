/**
 * /resources — every section's copy as the code ships it: the fallback for
 * the CMS "Resources page" document and what the seed script loads into it.
 * The collateral PDFs come from getCollateral(); the library grid keeps its
 * own component.
 */
import type { ResourcesPage } from "@/content/cms/docs/resourcesPage";

export const resourcesPage: ResourcesPage = {
  seoTitle: "Resources",
  seoDescription:
    "Whitepapers, case studies, webinars and expert insights on cloud management, FinOps and enterprise cloud strategy.",
  hero: {
    chips: [
      { label: "The platform overview", href: "/resources/platform-overview" },
      { label: "The capability guide", href: "/resources/capability-guide" },
      { label: "Trust & compliance", href: "/resources/trust-and-compliance-summary" },
      { label: "Official collateral (PDF)", href: "#collateral" },
    ],
  },
  collateral: {
    heading: {
      eyebrow: "Official collateral",
      title: "The documents we hand to prospects — as finished PDFs",
      description:
        "The Product Overview with the 3D architecture view, the Company Profile, the Mastering Multi-Cloud whitepaper, and a datasheet and whitepaper for each edition. Direct downloads, no form.",
    },
    downloadLabel: "Download",
  },
  library: {
    heading: {
      eyebrow: "Library",
      title: "Browse the collection",
      description:
        "Filter by type. Each document opens as a reading page with a table of contents; the PDF is the same content laid out for print, A4, with page numbers.",
    },
  },
  closing: {
    eyebrow: "Something specific?",
    title: "Need a document written for your estate or your regulator?",
    body: "We prepare custom control mappings for a named regime, sector sheets for industries not listed here, and datasheets sized to an estate — usually within a week, before any commercial conversation.",
    primary: {
      label: "Request a custom document",
      href: "/contact?intent=resource",
      note: "Name the regime, sector or estate; a solutions engineer writes it",
    },
    secondary: {
      label: "Book a working session",
      href: "/contact?intent=demo",
      note: "45 minutes · one of your accounts connected read-only",
    },
    tertiary: { label: "Trust Center", href: "/trust", note: "signed certificates to download" },
  },
};
