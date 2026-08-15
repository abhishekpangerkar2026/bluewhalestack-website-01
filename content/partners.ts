/**
 * Partner programme + Partner Portal marketing content.
 * The Partner Portal is a separate, already-built product at
 * partner.bluewhalestack.com — this content only describes & links to it.
 *
 * Three partner tracks, by how a partner engages with BlueWhale Stack:
 *  - LSP          — resells licenses, owns the commercial relationship.
 *  - Implementation — delivers and supports the platform for end customers.
 *  - Strategic     — an official, country-specific partner operating a market.
 */

export type PartnerTrack = {
  slug: "lsp" | "implementation" | "strategic";
  icon: string;
  name: string;
  shortName: string;
  tagline: string;
  description: string;
  idealFor: string;
  benefits: string[];
  journey: { title: string; body: string }[];
};

export const tracks: PartnerTrack[] = [
  {
    slug: "lsp",
    icon: "KeyRound",
    name: "License Service Provider (LSP)",
    shortName: "LSP",
    tagline: "Resell BlueWhale Stack licenses and own the commercial relationship.",
    description:
      "LSPs bring BlueWhale Stack to their customers as a licensed product — you register the deal, invoice locally and earn margin, while BlueWhale Stack remains accountable for the platform itself. The fastest way to add a hyperscaler-neutral platform to your catalog without taking on delivery.",
    idealFor:
      "VARs, IT resellers, distributors and cloud consultancies with an existing customer base.",
    benefits: [
      "Deal registration with SLA-based approval and opportunity protection",
      "Two-sided invoicing — receive wholesale, bill retail, with local tax handled automatically (GST / VAT / sales tax)",
      "Tiered margins that grow with your committed volume",
      "Marketplace listing and co-sell support from the BlueWhale Stack team",
    ],
    journey: [
      {
        title: "Apply",
        body: "Submit your company and territory details through the Partner Portal.",
      },
      {
        title: "Verify & sign",
        body: "Business/tax-ID verification and the LSP agreement — commercial terms and your starting margin tier.",
      },
      {
        title: "Onboard to the portal",
        body: "Get access: catalog browsing, deal registration and invoicing tools.",
      },
      {
        title: "Register your first deal",
        body: "Register a customer opportunity and get it protected while you close it.",
      },
      {
        title: "Sell & invoice",
        body: "Provision the tenant, invoice your customer, and BlueWhale Stack invoices you at wholesale.",
      },
    ],
  },
  {
    slug: "implementation",
    icon: "Workflow",
    name: "System Implementation Partner",
    shortName: "Implementation",
    tagline: "Design, deploy and support BlueWhale Stack for your end customers.",
    description:
      "Implementation Partners do the technical work: discovery, migration planning, configuration, integration with existing tools and infrastructure, and ongoing operational support. You may deliver alongside an LSP or a direct BlueWhale Stack agreement — your value is delivery, not the license itself.",
    idealFor:
      "Systems integrators, cloud consultancies and MSPs with hands-on delivery and migration teams.",
    benefits: [
      "Technical certification for your engineers, per module and edition you deliver",
      "Sandbox environment plus implementation playbooks and reference architectures",
      "Co-delivery with BlueWhale Stack's own delivery team on your first engagements",
      "Direct escalation path to product & engineering during implementation",
      "Listed as a certified implementation partner in the marketplace",
    ],
    journey: [
      {
        title: "Apply",
        body: "Tell us which modules, editions and industries your delivery team wants to certify on.",
      },
      {
        title: "Certify your team",
        body: "Engineers complete technical training and certification per module/edition.",
      },
      {
        title: "Get sandbox access",
        body: "A hands-on environment, plus implementation playbooks and reference architectures.",
      },
      {
        title: "Co-deliver your first project",
        body: "BlueWhale Stack's delivery team shadows or co-leads your first customer rollout.",
      },
      {
        title: "Deliver independently",
        body: "Run implementations solo, backed by an ongoing support and escalation channel.",
      },
    ],
  },
  {
    slug: "strategic",
    icon: "Globe",
    name: "Strategic Partner",
    shortName: "Strategic",
    tagline: "Operate as the official BlueWhale Stack partner for your country.",
    description:
      "Strategic Partners procure BlueWhale Stack licenses in advance, in volume, and operate the commercial and support presence for their territory under an exclusive or preferred arrangement. This is the deepest partnership tier — for organizations ready to represent BlueWhale Stack officially in a market.",
    idealFor:
      "National telcos, systems houses and government-facing operators able to commit to volume and represent the brand locally.",
    benefits: [
      "Exclusive or preferred rights to operate in an agreed territory",
      "Advance / wholesale license procurement at the deepest available margins",
      "Local legal, tax and data-residency alignment for your market",
      "Co-branded local marketing and joint go-to-market planning",
      "A dedicated BlueWhale Stack executive relationship and quarterly business reviews",
    ],
    journey: [
      {
        title: "Apply & qualify",
        body: "Share your territory, business case and committed volume for review.",
      },
      {
        title: "Commercial & legal agreement",
        body: "Negotiate the territory, pricing and license-procurement terms.",
      },
      {
        title: "Enable your organization",
        body: "Sales and technical certification for your local team, plus portal and marketing setup.",
      },
      {
        title: "Launch officially",
        body: "Go live as the named BlueWhale Stack partner for your territory.",
      },
      {
        title: "Grow the territory",
        body: "Joint business planning, renewal of committed volume, and expansion into new segments.",
      },
    ],
  },
];

/** Real Partner Portal capabilities (read from the bws-partner-portal app). */
export const portalFeatures = [
  {
    icon: "FileCheck",
    title: "Deal registration",
    body: "Register cloud (AWS/Azure/GCP/Oracle) or BlueWhale-licensed deals with SLA-based approval and opportunity protection.",
  },
  {
    icon: "ReceiptText",
    title: "Two-sided invoicing",
    body: "Receive wholesale invoices from BlueWhale and issue retail invoices to your customers — with automatic tax (India GST, UAE VAT, US sales tax).",
  },
  {
    icon: "Users",
    title: "Customer management",
    body: "Onboard end customers with verified tax IDs (GSTIN / TRN / EIN) and manage them from one place.",
  },
  {
    icon: "Percent",
    title: "Margins & discounts",
    body: "Configure per-product and per-cloud margins, with a discount-request approval workflow and a live price waterfall.",
  },
  {
    icon: "CreditCard",
    title: "Payments & collections",
    body: "Collect customer payments via Razorpay (India) and Stripe (UAE/US), with a collections dashboard and reconciliation.",
  },
  {
    icon: "Boxes",
    title: "Provisioning & catalog",
    body: "Browse the service catalog and provision BlueWhale Stack tenants for customers straight from an approved deal.",
  },
];

/**
 * LSP margin tiers. Strategic Partners operate above Platinum via a bespoke
 * agreement (no fixed tier — negotiated per territory).
 *
 * `margin`/`commitment` are ILLUSTRATIVE placeholders, not published pricing —
 * finance/leadership must confirm real figures before these are treated as
 * commercial fact. See `tiersNote` for the disclaimer shown alongside them.
 */
export type PartnerTier = {
  name: string;
  note: string;
  margin: string;
  commitment: string;
  perks: string[];
};

export const tiersNote =
  "Illustrative figures for planning purposes only — final margins and commitments are confirmed in your signed Partner Agreement.";

export const tiers: PartnerTier[] = [
  {
    name: "Registered",
    note: "Entry tier — onboarding & catalog access",
    margin: "Standard published margin",
    commitment: "No minimum commitment",
    perks: ["Portal access", "Deal registration", "Self-serve catalog"],
  },
  {
    name: "Silver",
    note: "Base margins & deal registration",
    margin: "Standard + 5 pts",
    commitment: "USD 50,000 / year committed",
    perks: ["Everything in Registered", "Priority deal-approval SLA"],
  },
  {
    name: "Gold",
    note: "Higher margins & marketing funds",
    margin: "Standard + 10 pts",
    commitment: "USD 200,000 / year committed",
    perks: ["Everything in Silver", "Marketing development funds", "Named partner manager"],
  },
  {
    name: "Platinum",
    note: "Top margins, dedicated support & revenue share",
    margin: "Standard + 15 pts",
    commitment: "USD 500,000 / year committed",
    perks: ["Everything in Gold", "Revenue share", "Dedicated technical support line"],
  },
];

/** Downloadable PDF program guides, gated the same way as Trust Center certificates. */
export type ProgramDocument = {
  id: string;
  trackSlug: PartnerTrack["slug"];
  title: string;
  summary: string;
};

export const programDocuments: ProgramDocument[] = [
  {
    id: "lsp-program-guide",
    trackSlug: "lsp",
    title: "LSP Program Guide",
    summary: "Commercial model, margin tiers and the deal-to-invoice flow for License Service Providers.",
  },
  {
    id: "implementation-program-guide",
    trackSlug: "implementation",
    title: "System Implementation Partner Guide",
    summary: "Certification path, delivery playbooks and support model for Implementation Partners.",
  },
  {
    id: "strategic-program-guide",
    trackSlug: "strategic",
    title: "Strategic Partner Guide",
    summary: "Territory rights, advance procurement and the enablement path for Strategic Partners.",
  },
];

export const whyPartner = [
  {
    icon: "TrendingUp",
    title: "Revenue growth",
    body: "Sell a hyperscaler-neutral platform across six public clouds plus on-prem — a position no single cloud vendor can match.",
  },
  {
    icon: "Layers",
    title: "Differentiated portfolio",
    body: "Resell five editions from Community to Sovereign — with unified inventory, bundled observability, migration and Whale AI built in.",
  },
  {
    icon: "GraduationCap",
    title: "Enablement & support",
    body: "Full sales and technical training, deal protection, and a self-serve portal that runs your reselling business.",
  },
];
