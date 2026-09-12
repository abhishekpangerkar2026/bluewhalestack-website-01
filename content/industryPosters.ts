/**
 * Official industry reference-architecture posters (5400×3120 originals,
 * served as WebP from public/industry-architecture/).
 *
 * Every poster reads the same seven bands top to bottom — channels, the
 * Digital Experience Layer, the Unified Platform Core, integrations, estates
 * and data, the request flow, deployment modes — with the modules and modes
 * that lead in that sector marked in gold. `modules` and `modes` below
 * transcribe those gold marks so the same information is readable on a
 * phone, where the poster text is too small.
 */

export interface IndustryPoster {
  /** file stem under public/industry-architecture/ */
  file: string;
  /** poster title as printed on the sheet */
  title: string;
  /** poster subtitle as printed on the sheet */
  subtitle: string;
  /** the personas across the top band */
  personas: string[];
  /** gold-marked modules — the ones that lead in this sector */
  modules: string[];
  /** gold-marked deployment modes */
  modes: string[];
  /** integrations band, as printed */
  integrations: string[];
  /** the three estate cards, as printed */
  estates: string[];
}

export const POSTER_LAYERS: { n: string; name: string; what: string }[] = [
  { n: "1", name: "Channels & users", what: "The consoles and portals each persona works in" },
  { n: "2", name: "Digital Experience Layer", what: "Catalog, self-service, metering and SLA per service — multi-tenant by design" },
  { n: "3", name: "Unified Platform Core", what: "Nine modules under one console, one identity, one policy and one bill" },
  { n: "4", name: "Integrations", what: "How the platform plugs into the systems the estate already runs" },
  { n: "5", name: "Estates & data", what: "Every estate managed as one, and the data stores that hold the evidence" },
  { n: "6", name: "Request flow", what: "The seven steps every call takes — identity, policy, orchestration, evidence" },
  { n: "7", name: "Deployment modes", what: "SaaS, BYOC, on-premise, sovereign air-gapped and edge — the same build" },
];

const posters: Record<string, IndustryPoster> = {
  bfsi: {
    file: "bfsi",
    title: "Banking & Financial Services architecture",
    subtitle: "Governed multi-cloud for banks and regulated financial institutions",
    personas: ["Group Technology", "Risk & Compliance", "Finance & FinOps", "Digital Banking Ops", "Internal Audit", "Supervisor view"],
    modules: ["Whalenomics · FinOps", "Security & Identity", "Governance & Audit", "Migration & Discovery"],
    modes: ["BYOC — your clouds", "On-premise"],
    integrations: ["Core banking & payments", "GRC & risk systems", "ITSM · ServiceNow", "GL & finance feeds", "Bank IdP — SSO", "API & connectors"],
    estates: ["Public cloud — approved regions", "Core datacenters", "Exit-ready & sovereign"],
  },
  government: {
    file: "government",
    title: "Government & Public Sector architecture",
    subtitle: "Sovereign digital infrastructure for ministries, agencies and national programmes",
    personas: ["National Cloud Console", "Directorate consoles", "State audit view", "Programme management", "Field & edge operations", "Service platform teams"],
    modules: ["Security & Identity", "Governance & Audit", "Whale AI — incl. offline", "Migration & Discovery", "Sovereign Operations"],
    modes: ["Sovereign · air-gapped", "Edge (offline-tolerant)"],
    integrations: ["National identity & SSO", "Government service bus", "ITSM & service desk", "Budget & finance systems", "Document & records", "API & connectors"],
    estates: ["Sovereign national cloud", "Directorate estates", "Air-gapped & field edge"],
  },
  "telco-datacenter": {
    file: "telco-datacenter",
    title: "Telco & Datacenter Operator architecture",
    subtitle: "From capacity provider to cloud provider — on the capacity you already own",
    personas: ["Operator NOC console", "Product & catalog management", "Tenant self-service", "Billing & BSS operations", "Enterprise customer view", "Partner & ISV portal"],
    modules: ["Management & Delivery", "Whalenomics · FinOps", "Observability & ITSM", "Tenancy & Monetization"],
    modes: ["On-premise", "Edge (offline-tolerant)"],
    integrations: ["OSS integration", "BSS & billing", "ITSM & service desk", "Payment & invoicing", "Operator IdP — SSO", "API & connectors"],
    estates: ["Operator regions", "Virtualization & bare metal", "Customer BYOC & edge"],
  },
  media: {
    file: "media",
    title: "Media & Broadcasting architecture",
    subtitle: "Governed cloud and in-perimeter AI for media networks and broadcasters",
    personas: ["Broadcast IT console", "Newsroom systems ops", "Archive & MAM teams", "Finance & FinOps", "Security & Compliance", "Bureau & field ops"],
    modules: ["Security & Identity", "Whale AI — incl. offline", "Observability & ITSM", "Sovereign Operations"],
    modes: ["On-premise", "Edge (offline-tolerant)"],
    integrations: ["MAM & archive systems", "Playout & production", "ITSM & service desk", "Rights & finance systems", "Network IdP — SSO", "API & connectors"],
    estates: ["Production & playout", "Public cloud — burst & OTT", "Bureaus & field edge"],
  },
  "enterprise-multicloud": {
    file: "enterprise-multicloud",
    title: "Enterprise Multi-Cloud architecture",
    subtitle: "One governed layer across the whole enterprise estate — nothing re-hosted to adopt it",
    personas: ["Enterprise IT console", "Business-unit self-service", "Finance & FinOps", "Security operations", "Internal audit", "Developer platform — API"],
    modules: ["Management & Delivery", "Whalenomics · FinOps", "Governance & Audit", "Observability & ITSM"],
    modes: ["SaaS", "BYOC — your clouds"],
    integrations: ["ERP & finance systems", "ITSM · ServiceNow · Jira", "DevOps toolchain", "GL & chargeback feeds", "Enterprise IdP — SSO", "API & connectors"],
    estates: ["Multi public cloud", "Private DC & virtualization", "Subsidiaries & edge"],
  },
};

/** Industry slug (content/industries.ts) → poster. Telco and Datacenter share one sheet. */
export const INDUSTRY_POSTER: Record<string, IndustryPoster> = {
  bfsi: posters.bfsi,
  government: posters.government,
  telco: posters["telco-datacenter"],
  datacenter: posters["telco-datacenter"],
  "regulated-enterprise": posters["enterprise-multicloud"],
};

/** Gallery order for the /industries index; `href` is where the sheet lives on the site. */
export const POSTER_GALLERY: { poster: IndustryPoster; href: string; sector: string }[] = [
  { poster: posters.bfsi, href: "/industries/bfsi#architecture", sector: "BFSI" },
  { poster: posters.government, href: "/industries/government#architecture", sector: "Government" },
  { poster: posters["telco-datacenter"], href: "/industries/telco#architecture", sector: "Telco & Datacenter" },
  { poster: posters["enterprise-multicloud"], href: "/industries/regulated-enterprise#architecture", sector: "Regulated Enterprise" },
  { poster: posters.media, href: "/case-studies/media-qatar-network", sector: "Media & Broadcasting" },
];

export const posterSrc = (p: IndustryPoster, w: 1200 | 2400 | "full") => `/industry-architecture/${p.file}-${w}.webp`;
