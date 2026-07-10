/**
 * Partner programme + Partner Portal marketing content.
 * The Partner Portal is a separate, already-built product at
 * partners.bluewhalestack.com — this content only describes & links to it.
 */

export const programmes = [
  {
    name: "Technology Partners",
    icon: "Plug",
    description:
      "ISVs, cloud providers and infrastructure vendors that integrate with BlueWhale Stack through published APIs and certified partnerships.",
    benefits: [
      "Co-developed, validated integrations",
      "Listing in the BlueWhale Stack marketplace",
      "Joint go-to-market & co-selling",
      "Development sandbox access",
    ],
  },
  {
    name: "Channel & Resellers",
    icon: "Handshake",
    description:
      "VARs, system integrators and consultancies that resell BlueWhale Stack to enterprise and government customers.",
    benefits: [
      "Tiered margins (Silver / Gold / Platinum)",
      "Deal registration & opportunity protection",
      "Sales & technical certification",
      "Co-funded marketing development funds",
    ],
  },
  {
    name: "Managed Service Providers",
    icon: "Server",
    description:
      "Telcos, DC providers and CSPs who use BlueWhale Stack as the commercial backbone for managed cloud services.",
    benefits: [
      "Full MSP licensing with tenant-level billing",
      "White-label portal & branding",
      "B2B & B2C programme frameworks",
      "Revenue share & dedicated support",
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

export const tiers = [
  { name: "Registered", note: "Entry tier — onboarding & catalog access" },
  { name: "Silver", note: "Base margins & deal registration" },
  { name: "Gold", note: "Higher margins & marketing funds" },
  { name: "Platinum", note: "Top margins, dedicated support & revenue share" },
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
