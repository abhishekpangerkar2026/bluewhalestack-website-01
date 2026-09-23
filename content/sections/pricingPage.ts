/**
 * /pricing — every section's copy as the code ships it: the fallback for the
 * CMS "Pricing page" document and what the seed script loads into it.
 */
import type { PricingPage } from "@/content/cms/docs/pricingPage";

export const pricingPage: PricingPage = {
  seoTitle: "Pricing",
  seoDescription:
    "BlueWhale Stack pricing — four editions from Standard to Government, with a feature-by-edition comparison.",
  hero: {
    unitLabel: "The unit:",
    unitText:
      "a Managed Resource Unit (MRU) is one discovered resource under management — an instance, a bucket, a database, a VM. Standard includes 1,000; Enterprise includes up to 1,000,000 across 100 cloud accounts.",
    primary: { label: "Get a quote for your resource count", href: "/contact?intent=sales" },
    secondary: { label: "Module-by-edition matrix", href: "#compare" },
    cells: [
      { kicker: "Standard", value: "$24,000", note: "Per year · 1,000 managed resource units included" },
      { kicker: "Enterprise", value: "$120,000", note: "Per year · up to 1,000,000 resources across 100 cloud accounts" },
      {
        kicker: "Telco & Datacenter · Government",
        value: "Scoped",
        note: "Operator licensing and sovereign programmes, shaped to the estate · 2-yr −10% · 3-yr −15%",
      },
    ],
  },
  tiers: {
    heading: {
      eyebrow: "Editions",
      title: "Pick where you start",
      description: "Every edition runs the same control plane. The featured plan is where most teams begin.",
    },
    previewLabel: "Preview",
    popularLabel: "Most popular",
    previewCta: "Join the preview",
    quoteCta: "Get a quote",
    salesCta: "Talk to sales",
    detailsLink: "Edition details",
    forLabel: "For:",
  },
  drivers: {
    heading: {
      eyebrow: "What drives the price",
      title: "Four inputs, and a worked example",
      description:
        "Every proposal is built from the same four numbers. Bring them to the quote and the answer comes back in days, not a procurement cycle.",
    },
    items: [
      { label: "Managed resources", body: "Discovered resources under management (MRU). Standard 1,000 · Enterprise up to 1,000,000." },
      { label: "Cloud accounts", body: "Standard 5 · Enterprise 100. On-prem sites connect through the Edge Agent and count by resource." },
      { label: "Deployment mode", body: "SaaS in four regions, BYOC in your accounts, on-premises, sovereign air-gapped or edge." },
      { label: "Operator or sovereign scope", body: "Telco & Datacenter is metered per network element or per rack; Government per contract and accreditation scope." },
    ],
    exampleLabel: "Worked example:",
    example:
      "a bank with 60 AWS and Azure accounts, 180,000 discovered resources and two VMware sites, deployed BYOC in its own accounts, fits inside Enterprise at $120,000 a year — all twelve modules, 1,000 users and Whale AI at 100M tokens a month included. On a three-year term the list price is $102,000 a year.",
  },
  compare: {
    heading: {
      eyebrow: "Compare",
      title: "Every module, mapped to every edition",
      description:
        "Fourteen modules across four editions. A tick means included in the licence; the module pages carry each one's current maturity.",
    },
    moduleColumn: "Module",
  },
  faq: {
    heading: {
      eyebrow: "FAQ",
      title: "Pricing questions, answered",
      description: "Licensing unit, upgrade path, Whale AI allowances, sovereign deployment and proof-of-concept terms.",
    },
    cta: { label: "Get a quote for your resource count", href: "/contact?intent=sales" },
    items: [
      {
        q: "What's included in each edition?",
        a: "Every edition runs the same control plane. Standard is scoped to three public clouds (AWS/Azure/GCP) and a single tenant. Enterprise unlocks all six public clouds, on-prem via Edge Agent, and multi-tenancy. Telco & Datacenter and Government are full Enterprise plus domain-specific layers. See the comparison table below.",
      },
      {
        q: "Can I upgrade to a higher edition later?",
        a: "Yes — editions are licensing configurations of one platform, not separate products. Upgrading from Standard to Enterprise (or from Enterprise to Telco & Datacenter or Government) is a licensing change, not a migration or re-deployment.",
      },
      {
        q: "How does Managed Resource Unit (MRU) pricing work?",
        a: "Standard includes 1,000 MRU at the base price, with overage bands available. Enterprise includes 100 cloud accounts and up to 1,000,000 managed resources at $120K list. The Telco & Datacenter Edition is metered per network element (telecom operators) or per rack (datacenter operators).",
      },
      {
        q: "How is Whale AI priced?",
        a: "Each edition includes a Whale AI tier with a monthly token allowance — Spark (1M) for Standard, Spark/Tide/Abyss (100M) for Enterprise and above. Additional token packs are available as add-ons.",
      },
      {
        q: "Do you offer BYOC or air-gapped sovereign deployment?",
        a: "Yes. Enterprise supports SaaS, BYOC, and Sovereign. The Government edition is purpose-built for air-gapped sovereign deployment — FIPS crypto, PAM always-on, WORM audit log, in-region AI only, and offline update channel.",
      },
      {
        q: "Is there a proof-of-concept option?",
        a: "Yes — the 90-day prototype. A half-day discovery workshop agrees the success criteria, then the platform runs on your own estate for 90 days with no licence cost and is scored on those criteria before any licensing decision. Conversion pricing is agreed up front.",
      },
      {
        q: "Which currencies and procurement routes do you support?",
        a: "USD list prices; INR and AED invoicing through the Indian and UAE entities; USD through the Delaware entity. Government buys through tender or empanelment on 3–5 year fixed-bid terms; partners can transact through the Partner Portal.",
      },
      {
        q: "What about the DPA and security review?",
        a: "A DPA covering GDPR Article 28 and DPDP is standard. Five ISO certifications, a SOC 2 Type II readiness assessment and a CSA STAR Level 1 self-assessment are downloadable from the Trust Center; full audit reports are available under NDA.",
      },
    ],
  },
  closing: {
    eyebrow: "Two ways to buy",
    title: "A proposal for your estate, or a prototype on it.",
    body: "Send your account and resource counts and a written proposal comes back within the week. Or start with the 90-day prototype and decide on evidence.",
    primary: {
      label: "Get a proposal for your estate",
      href: "/contact?intent=sales",
      note: "Account and resource counts in, a written proposal out — usually within a week",
    },
    secondary: {
      label: "Start the 90-day prototype",
      href: "/platform#prototype",
      note: "Half-day discovery workshop, then 90 days on your estate with no licence cost.",
    },
    tertiary: { label: "Trust Center", href: "/trust", note: "certificates and the DPA for procurement" },
  },
};
