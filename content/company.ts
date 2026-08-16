/**
 * Company-level facts, navigation, and global content.
 * Single source of truth — consumed by layout, footer, about, contact.
 */

export const company = {
  name: "BlueWhale Stack",
  tagline: "Every cloud. One control plane.",
  metaDescription:
    "BlueWhale Stack is a hyperscaler-neutral cloud management platform: unified inventory, AI-native provisioning, bundled observability, migration and governance across public cloud, on-prem and hybrid — one control plane, with BYOC and sovereign options.",
  emails: {
    sales: "sales@bluewhalestack.com",
    careers: "careers@bluewhalestack.com",
    partners: "partners@bluewhalestack.com",
    contact: "contact@bluewhalestack.com",
  },
  phones: [
    { region: "India", number: "+91 20 4660 1234", hours: "Mon–Fri, 9am–6pm IST" },
    { region: "UAE", number: "+971 6 382 5678", hours: "Mon–Fri, 9am–6pm GST" },
  ],
  social: {
    linkedin: "https://www.linkedin.com/company/bluewhalestack",
    twitter: "https://twitter.com/bluewhalestack",
  },
} as const;

export const offices = [
  {
    city: "Mumbai",
    label: "India — Headquarters",
    entity: "BlueWhale Stack Consulting and Technologies Pvt Ltd",
    address:
      "Innov8 Ackruti Star, 3rd Floor, 301, Ackruti Star, Central Road, Marol MIDC, near Marol Telephone Exchange, Andheri (E), Mumbai, Maharashtra 400093, India",
  },
  {
    city: "Ajman",
    label: "UAE",
    entity: "BlueWhale Stack Consulting and Technologies FZE LLC",
    address:
      "BC 892084, 26th Floor, Amber Gem Tower, Ajman, United Arab Emirates",
  },
  {
    city: "Wilmington",
    label: "USA",
    entity: "BlueWhale Stack Consulting and Technologies Inc",
    address:
      "221 W 9th St, PMB 1099, Wilmington, Delaware 19801, New Castle County, USA",
  },
] as const;

export const clouds = [
  "AWS",
  "Microsoft Azure",
  "Google Cloud",
  "Oracle Cloud",
  "IBM Cloud",
  "Alibaba Cloud",
  "On-prem (VMware · Nutanix · Hyper-V)",
] as const;

export const regions = [
  { code: "SIN", city: "Singapore" },
  { code: "BOM", city: "Mumbai" },
  { code: "FRA", city: "Frankfurt" },
  { code: "LAX", city: "Los Angeles" },
] as const;

export const compliance = [
  "ISO 27001:2022",
  "ISO 27017 (cloud security)",
  "ISO 27018 (PII in cloud)",
  "ISO 27701 (privacy ISMS)",
  "ISO 22301 (business continuity)",
  "CSA STAR Level 1",
  "SOC 2 Type II (readiness)",
  "GDPR",
  "India DPDP Act 2023",
] as const;

/** Headline metrics shown on Home/About — grounded in shipped product facts. */
export const headlineStats = [
  { value: "6", label: "Public clouds + on-prem & hybrid" },
  { value: "11", label: "Modules, one control plane" },
  { value: "50+", label: "Whale AI use cases" },
  { value: "4", label: "Deployment regions" },
] as const;

// ── Partner Portal (external app — partners.bluewhalestack.com) ─
// The portal is a separate, already-built product. The website only links to it.
export const partnerPortal = {
  url: "https://partner.bluewhalestack.com",
  login: "https://partner.bluewhalestack.com/login",
  register: "https://partner.bluewhalestack.com/register",
};

// ── Primary navigation (mega-menu) ────────────────────────────
export type NavLink = {
  label: string;
  href: string;
  desc?: string;
  external?: boolean;
};
export type NavColumn = { heading: string; links: NavLink[]; featured?: boolean };
export type NavItem = { label: string; href: string; columns?: NavColumn[] };

export const primaryNav: NavItem[] = [
  {
    label: "Products",
    href: "/platform",
    columns: [
      {
        heading: "Platform",
        links: [
          { label: "Platform overview", href: "/platform", desc: "Every cloud, one control plane" },
          { label: "Whale AI", href: "/products/whale-ai", desc: "AI across every module" },
          { label: "Cloud Connectors", href: "/modules/cloud-connectors", desc: "6 public clouds + on-prem" },
          { label: "BlueWhale Stack Fabric", href: "/fabric", desc: "All of India's datacenters, one fabric" },
        ],
      },
      {
        heading: "Editions",
        links: [
          { label: "Standard", href: "/editions/standard" },
          { label: "Enterprise", href: "/editions/enterprise" },
          { label: "Telco", href: "/editions/telco" },
          { label: "Government", href: "/editions/government" },
          { label: "Datacenter", href: "/editions/datacenter" },
        ],
      },
      {
        heading: "Modules",
        links: [
          { label: "Inventory & Discovery", href: "/modules/inventory" },
          { label: "Migration Engine", href: "/modules/migration" },
          { label: "Observe", href: "/modules/observe" },
          { label: "ITSM", href: "/modules/itsm" },
          { label: "All modules", href: "/modules" },
        ],
      },
      {
        heading: "Featured",
        featured: true,
        links: [
          { label: "Compare editions", href: "/editions", desc: "Standard → Datacenter matrix" },
          { label: "All modules", href: "/modules" },
          { label: "Pricing", href: "/pricing" },
        ],
      },
    ],
  },
  {
    label: "Solutions",
    href: "/solutions",
    columns: [
      {
        heading: "By outcome",
        links: [
          { label: "Unified Cloud Inventory", href: "/solutions/unified-cloud-inventory" },
          { label: "AI-Native Provisioning", href: "/solutions/ai-native-provisioning" },
          { label: "Bundled Observability", href: "/solutions/bundled-observability" },
        ],
      },
      {
        heading: "More outcomes",
        links: [
          { label: "Cloud Migration", href: "/solutions/cloud-migration" },
          { label: "Security & Compliance", href: "/solutions/security-compliance" },
          { label: "Sovereign Cloud", href: "/solutions/sovereign-cloud" },
        ],
      },
      {
        heading: "By deployment",
        links: [
          { label: "SaaS", href: "/platform" },
          { label: "BYOC", href: "/platform" },
          { label: "Sovereign / air-gapped", href: "/editions/government" },
        ],
      },
      {
        heading: "Featured",
        featured: true,
        links: [
          { label: "Every cloud, one control plane", href: "/solutions/unified-cloud-inventory", desc: "See the whole estate" },
          { label: "All solutions", href: "/solutions" },
        ],
      },
    ],
  },
  {
    label: "Industries",
    href: "/industries",
    columns: [
      {
        heading: "Regulated",
        links: [
          { label: "Government", href: "/industries/government" },
          { label: "BFSI", href: "/industries/bfsi" },
          { label: "Healthcare", href: "/industries/healthcare" },
        ],
      },
      {
        heading: "Operators",
        links: [
          { label: "Telco & MSP", href: "/industries/telco" },
          { label: "Datacenter & Colocation", href: "/industries/datacenter" },
          { label: "Regulated Enterprise", href: "/industries/regulated-enterprise" },
          { label: "SaaS & Digital Native", href: "/industries/saas" },
        ],
      },
      {
        heading: "Deployment",
        links: [
          { label: "Sovereign / air-gapped", href: "/editions/government" },
          { label: "All industries", href: "/industries" },
        ],
      },
      {
        heading: "Featured",
        featured: true,
        links: [
          { label: "Government Edition — sovereign & air-gapped", href: "/editions/government", desc: "Air-gapped & in-region" },
          { label: "All industries", href: "/industries" },
        ],
      },
    ],
  },
  {
    label: "Partners",
    href: "/partners",
    columns: [
      {
        heading: "Partner tracks",
        links: [
          { label: "License Service Provider", href: "/partners#tracks" },
          { label: "System Implementation Partner", href: "/partners#tracks" },
          { label: "Strategic Partner", href: "/partners#tracks" },
        ],
      },
      {
        heading: "Partner Portal",
        links: [
          { label: "Deal registration", href: "/partners#portal" },
          { label: "Two-sided invoicing", href: "/partners#portal" },
          { label: "Margins & tiers", href: "/partners#portal" },
        ],
      },
      {
        heading: "Get started",
        links: [
          { label: "The partner journey", href: "/partners#journey" },
          { label: "Download program guides", href: "/partners#documents" },
          { label: "Become a partner", href: partnerPortal.register, external: true },
          { label: "Partner login", href: partnerPortal.login, external: true },
        ],
      },
      {
        heading: "Featured",
        featured: true,
        links: [
          { label: "Open Partner Portal", href: partnerPortal.login, external: true, desc: "partner.bluewhalestack.com" },
          { label: "Partner tracks", href: "/partners#tracks" },
        ],
      },
    ],
  },
  {
    label: "About",
    href: "/about",
    columns: [
      {
        heading: "Company",
        links: [
          { label: "Our story & mission", href: "/about" },
          { label: "Leadership & team", href: "/about/leadership" },
          { label: "The BlueWhale family", href: "/about#family" },
        ],
      },
      {
        heading: "Connect",
        links: [
          { label: "Careers", href: "/careers" },
          { label: "Newsroom", href: "/newsroom" },
          { label: "Contact", href: "/contact" },
        ],
      },
      {
        heading: "Trust",
        links: [
          { label: "Trust Center", href: "/trust", desc: "Certifications & compliance" },
          { label: "Privacy policy", href: "/legal/privacy" },
          { label: "Terms of service", href: "/legal/terms" },
        ],
      },
      {
        heading: "Featured",
        featured: true,
        links: [
          { label: "We're hiring", href: "/careers", desc: "Open roles across the team" },
          { label: "Trust Center", href: "/trust", desc: "9 certifications — all current" },
        ],
      },
    ],
  },
];

export const utilityNav: NavLink[] = [
  { label: "Resources", href: "/resources" },
  { label: "Docs", href: "/docs" },
];

export const footerNav = [
  {
    heading: "Platform",
    links: [
      { label: "Overview", href: "/platform" },
      { label: "Modules", href: "/modules" },
      { label: "Editions", href: "/editions" },
      { label: "Pricing", href: "/pricing" },
      { label: "Solutions", href: "/solutions" },
      { label: "BlueWhale Stack Fabric", href: "/fabric" },
    ],
  },
  {
    heading: "Editions",
    links: [
      { label: "Standard", href: "/editions/standard" },
      { label: "Enterprise", href: "/editions/enterprise" },
      { label: "Telco", href: "/editions/telco" },
      { label: "Government", href: "/editions/government" },
      { label: "Datacenter", href: "/editions/datacenter" },
    ],
  },
  {
    heading: "Industries",
    links: [
      { label: "Government", href: "/industries/government" },
      { label: "BFSI", href: "/industries/bfsi" },
      { label: "Healthcare", href: "/industries/healthcare" },
      { label: "Regulated Enterprise", href: "/industries/regulated-enterprise" },
      { label: "SaaS & Digital Native", href: "/industries/saas" },
      { label: "Telco & MSP", href: "/industries/telco" },
      { label: "Datacenter & Colocation", href: "/industries/datacenter" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Careers", href: "/careers" },
      { label: "Partners", href: "/partners" },
      { label: "Resources", href: "/resources" },
      { label: "Contact", href: "/contact" },
      { label: "Trust Center", href: "/trust" },
    ],
  },
] as const;
