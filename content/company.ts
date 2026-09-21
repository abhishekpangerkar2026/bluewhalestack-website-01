/**
 * Company-level facts, navigation, and global content.
 * Single source of truth — consumed by layout, footer, about, contact.
 */

export const company = {
  name: "BlueWhale Stack",
  tagline: "Every cloud. One control plane.",
  metaDescription:
    "BlueWhale Stack is the Digital Experience Multi-Cloud Platform for cloud and datacenter estates — one control plane across public, private, virtualization, hybrid, sovereign and edge: 54 capabilities in nine families, four editions on one architecture, delivered as SaaS, BYOC, on-premise, sovereign air-gapped or at the edge.",
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
    blurb: "Engineering, product and delivery. The core platform and Whale AI are built here.",
    address:
      "Innov8 Ackruti Star, 3rd Floor, 301, Ackruti Star, Central Road, Marol MIDC, near Marol Telephone Exchange, Andheri (E), Mumbai, Maharashtra 400093, India",
  },
  {
    city: "Ajman",
    label: "UAE",
    entity: "BlueWhale Stack Consulting and Technologies FZE LLC",
    blurb: "Sovereign and government focus — Government, Telco and Enterprise customers across the GCC.",
    address:
      "BC 892084, 26th Floor, Amber Gem Tower, Ajman, United Arab Emirates",
  },
  {
    city: "Wilmington",
    label: "USA",
    entity: "BlueWhale Stack Consulting and Technologies Inc",
    blurb: "Product entity and customers across the United States.",
    address:
      "221 W 9th St, PMB 1099, Wilmington, Delaware 19801, New Castle County, USA",
  },
] as const;

export const clouds = [
  "AWS",
  "Microsoft Azure",
  "Google Cloud",
  "Oracle Cloud",
  "Alibaba Cloud",
  "Huawei Cloud",
  "Private & virtualization (VMware · Hyper-V · Nutanix · OpenShift · KVM)",
  "Hybrid & sovereign stacks (Azure Stack · Huawei Cloud Stack · Alibaba Apsara Stack)",
] as const;

/** Every estate — managed as one (Product Overview, layer 5). */
export const estates = [
  {
    title: "Public cloud",
    icon: "Cloud",
    items: ["AWS", "Microsoft Azure", "Google Cloud", "Oracle OCI", "Alibaba Cloud", "Huawei Cloud"],
  },
  {
    title: "Private cloud & virtualization",
    icon: "Server",
    items: ["VMware", "Microsoft Hyper-V", "Nutanix", "Red Hat OpenShift", "Bare metal & KVM estates"],
  },
  {
    title: "Hybrid & sovereign stacks",
    icon: "ShieldCheck",
    items: ["Azure Stack", "Huawei Cloud Stack", "Alibaba Apsara Stack", "Air-gapped & edge (Edge Agent)"],
  },
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
  { value: "54", label: "Capabilities shipped across the platform" },
  { value: "9", label: "Capability families under one console" },
  { value: "4", label: "Editions on one architecture" },
  { value: "6", label: "Platform classes — public, private, virtual, hybrid, sovereign, edge" },
] as const;

// ── Partner Portal (external app — partners.bluewhalestack.com) ─
// The portal is a separate, already-built product. The website only links to it.
export const partnerPortal = {
  url: "https://partners.bluewhalestack.com",
  login: "https://partners.bluewhalestack.com/login",
  register: "https://partners.bluewhalestack.com/register",
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
          { label: "Platform overview", href: "/platform", desc: "One platform. Every industry. Every estate." },
          { label: "Whale AI", href: "/products/whale-ai", desc: "AI across every family — incl. offline" },
          { label: "Cloud Connectors", href: "/modules/cloud-connectors", desc: "6 public clouds + private, hybrid & edge" },
          { label: "BlueWhale Stack Fabric", href: "/fabric", desc: "Every datacenter, one sovereign fabric — per market" },
        ],
      },
      {
        heading: "Editions",
        links: [
          { label: "Standard", href: "/editions/standard", desc: "AWS · Azure · GCP, single tenant — $24,000 / yr" },
          { label: "Enterprise", href: "/editions/enterprise", desc: "All nine families, every estate — $120,000 / yr" },
          { label: "Telco & Datacenter", href: "/editions/telco-datacenter", desc: "Operators sell governed cloud — preview, GA Q4 2026" },
          { label: "Government", href: "/editions/government", desc: "Air-gapped, FIPS, WORM audit, in-region AI" },
        ],
      },
      {
        heading: "Modules",
        links: [
          { label: "Inventory & Discovery", href: "/modules/inventory", desc: "One live map of every resource" },
          { label: "Migration Engine", href: "/modules/migration", desc: "6R assessment and rehearsed waves" },
          { label: "Whalenomics · FinOps", href: "/modules/finops", desc: "A bill that resolves to an owner" },
          { label: "Cloud Audit & Evidence", href: "/modules/cloud-audit", desc: "Controls monitored continuously" },
          { label: "All nine families", href: "/modules", desc: "14 modules, gated per edition" },
        ],
      },
      {
        heading: "Featured",
        featured: true,
        links: [
          { label: "Compare editions", href: "/editions", desc: "Standard → Government matrix" },
          { label: "All modules", href: "/modules", desc: "Nine families, 14 modules" },
          { label: "Pricing", href: "/pricing", desc: "Published list prices" },
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
          { label: "Unified Cloud Inventory", href: "/solutions/unified-cloud-inventory", desc: "Six clouds and on-prem in one map" },
          { label: "AI-Native Provisioning", href: "/solutions/ai-native-provisioning", desc: "Governed catalog, no console access" },
          { label: "Bundled Observability", href: "/solutions/bundled-observability", desc: "Logs, metrics, traces, SLOs — included" },
          { label: "Cloud Migration", href: "/solutions/cloud-migration", desc: "6R assessment, dependency-aware waves" },
          { label: "Security & Compliance", href: "/solutions/security-compliance", desc: "One identity fabric, one audit trail" },
          { label: "Sovereign Cloud", href: "/solutions/sovereign-cloud", desc: "In-country, air-gapped, in-region AI" },
        ],
      },
      {
        heading: "Industry solutions",
        links: [
          { label: "Government", href: "/industries/government", desc: "Sovereign, air-gapped operations" },
          { label: "BFSI", href: "/industries/bfsi", desc: "RBI, CERT-In, SEBI, DPDP at the platform layer" },
          { label: "Healthcare", href: "/industries/healthcare", desc: "Clinical systems governed in-country" },
          { label: "Telco & MSP", href: "/industries/telco", desc: "Governed cloud on your network" },
          { label: "Datacenter & Colocation", href: "/industries/datacenter", desc: "Racks to the U position, beside your clouds" },
          { label: "All industry solutions", href: "/solutions#industries", desc: "Seven sectors" },
        ],
      },
      {
        heading: "Customer proof",
        links: [
          { label: "Customer success stories", href: "/customers", desc: "Delivered engagements, by sector" },
          { label: "Case studies", href: "/case-studies", desc: "Situation · work · outcome" },
          { label: "Trust Center", href: "/trust", desc: "Certifications & compliance" },
        ],
      },
      {
        heading: "Featured",
        featured: true,
        links: [
          { label: "Audit-ready across two regulatory regimes", href: "/case-studies/bfsi-singapore-qatar", desc: "BFSI case study — Singapore & Qatar" },
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
          { label: "Government", href: "/industries/government", desc: "Sovereign, air-gapped operations" },
          { label: "BFSI", href: "/industries/bfsi", desc: "Inspection evidence from a system of record" },
          { label: "Healthcare", href: "/industries/healthcare", desc: "Patient data in-country, access from the directory" },
        ],
      },
      {
        heading: "Operators & enterprise",
        links: [
          { label: "Telco & MSP", href: "/industries/telco", desc: "Governed cloud services on your network" },
          { label: "Datacenter & Colocation", href: "/industries/datacenter", desc: "DCIM beside the cloud estate" },
          { label: "Regulated Enterprise", href: "/industries/regulated-enterprise", desc: "Six clouds and the floor, one estate" },
          { label: "SaaS & Digital Native", href: "/industries/saas", desc: "Governed from the first account" },
        ],
      },
      {
        heading: "Deployment",
        links: [
          { label: "Sovereign / air-gapped", href: "/editions/government", desc: "Government Edition" },
          { label: "All industries", href: "/industries", desc: "Seven sectors, one control plane" },
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
          { label: "Open Partner Portal", href: partnerPortal.login, external: true, desc: "partners.bluewhalestack.com" },
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
          { label: "Our story & mission", href: "/about", desc: "Founded 2018, platform launched 2026" },
          { label: "Leadership & team", href: "/about/leadership", desc: "Mumbai · Ajman · Wilmington" },
          { label: "The BlueWhale family", href: "/about#family", desc: "Platform, families, Fabric and services" },
        ],
      },
      {
        heading: "Connect",
        links: [
          { label: "Careers", href: "/careers", desc: "Open roles across three offices" },
          { label: "Newsroom", href: "/newsroom", desc: "Releases and certifications" },
          { label: "Contact", href: "/contact", desc: "Sales, partners and support" },
        ],
      },
      {
        heading: "Trust",
        links: [
          { label: "Trust Center", href: "/trust", desc: "Certifications & compliance" },
          { label: "Privacy policy", href: "/legal/privacy", desc: "GDPR Art. 28 and DPDP" },
          { label: "Terms of service", href: "/legal/terms", desc: "Licensing terms" },
        ],
      },
      {
        heading: "Featured",
        featured: true,
        links: [
          { label: "We're hiring", href: "/careers", desc: "Open roles across the team" },
          { label: "Trust Center", href: "/trust", desc: "Five ISO certifications, independently audited" },
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
    heading: "Product",
    links: [
      { label: "Platform overview", href: "/platform" },
      { label: "Modules", href: "/modules" },
      { label: "Whale AI", href: "/products/whale-ai" },
      { label: "WhaleForge IaC", href: "/products/whaleforge" },
      { label: "Editions & pricing", href: "/pricing" },
      { label: "BlueWhale Stack Fabric", href: "/fabric" },
    ],
  },
  {
    heading: "Solutions",
    links: [
      { label: "By outcome", href: "/solutions" },
      { label: "Government", href: "/industries/government" },
      { label: "BFSI", href: "/industries/bfsi" },
      { label: "Healthcare", href: "/industries/healthcare" },
      { label: "Telco & MSP", href: "/industries/telco" },
      { label: "Datacenter & Colocation", href: "/industries/datacenter" },
      { label: "Customer stories", href: "/customers" },
      { label: "Case studies", href: "/case-studies" },
    ],
  },
  {
    heading: "Developers",
    links: [
      { label: "Documentation", href: "/docs" },
      { label: "Quick start", href: "/docs/quick-start" },
      { label: "Cloud integration", href: "/docs/cloud-integration" },
      { label: "Identity & access", href: "/docs/identity-access" },
      { label: "API reference", href: "/docs/api-reference" },
      { label: "Partner Portal", href: "https://partners.bluewhalestack.com" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About us", href: "/about" },
      { label: "Leadership", href: "/about/leadership" },
      { label: "Careers", href: "/careers" },
      { label: "Partners", href: "/partners" },
      { label: "Newsroom", href: "/newsroom" },
      { label: "Resources", href: "/resources" },
      { label: "Trust Center", href: "/trust" },
      { label: "Contact", href: "/contact" },
    ],
  },
] as const;
