/**
 * About / company page content.
 *
 * NOTE: The mission/vision, at-a-glance facts, and milestones below are
 * **reference/draft copy** — placeholders to make the page feel complete.
 * Swap them for approved content when supplied (each block is isolated).
 */

export const aboutHero = {
  eyebrow: "About Us",
  title: "Building the command center for every cloud",
  mission:
    "We believe every organisation should govern all of its cloud — public, private, hybrid, and sovereign — from one control plane, without lock-in. BlueWhale Stack exists to make that possible.",
};

/** Compact "at a glance" facts shown under the hero. (Reference data.) */
export const companyFacts = [
  { label: "Founded", value: "2024" },
  { label: "Headquarters", value: "Pune, India" },
  { label: "Presence", value: "India · UAE" },
  { label: "Category", value: "Cloud Management Platform" },
  { label: "Delivery", value: "SaaS · BYOC · Sovereign" },
];

/** Mission & vision statements. (Reference data — refine with approved copy.) */
export const missionVision = {
  mission:
    "To give every organisation one control plane for all of its cloud — unifying visibility, governance, cost, security, and migration across public, private, hybrid, and sovereign environments, without lock-in.",
  vision:
    "A world where any organisation — from a fast-moving startup to a national government — can run every cloud it touches with the same clarity, control, and confidence, on its own terms.",
};

export const story = [
  {
    heading: "Why we exist",
    body: "Cloud got complex faster than the tools to govern it. Teams run AWS, Azure, GCP, private cloud, and on-premise data centers in separate consoles — with no single view of cost, risk, or compliance. Meanwhile, data-sovereignty rules demand to know exactly where data lives and who can touch it.",
  },
  {
    heading: "Our answer",
    body: "A hyperscaler-neutral cloud management platform that unifies inventory, AI-native provisioning, bundled observability, ITSM, migration and governance in one control plane — delivered as SaaS, in your own cloud, or fully air-gapped. One platform, five editions, every operating model.",
  },
];

export const principles = [
  {
    icon: "Boxes",
    title: "Unified",
    body: "One control plane, not ten consoles. Everything in one place, governed consistently.",
  },
  {
    icon: "Sparkles",
    title: "AI-native",
    body: "Whale AI runs across every module — intelligence built in, not bolted on.",
  },
  {
    icon: "Layers",
    title: "Open",
    body: "Helm-deployable anywhere, hyperscaler-neutral. No lock-in, ever.",
  },
  {
    icon: "Landmark",
    title: "Sovereign-ready",
    body: "Air-gapped and in-region by design, for the most regulated environments on earth.",
  },
];

export const productFamily = [
  {
    name: "BlueWhale Stack CMP",
    badge: "Core",
    href: "/editions",
    body: "The unified cloud management platform — five editions from Community to Sovereign, all on one control plane.",
  },
  {
    name: "WhaleForge",
    badge: "Beta",
    href: "/products/whaleforge",
    body: "Infrastructure-as-code: a YAML DSL that generates real Terraform HCL with live HLD/LLD/TOGAF diagrams.",
  },
  {
    name: "Whale AI",
    badge: "GA",
    href: "/products/whale-ai",
    body: "A horizontal AI layer — 50+ use cases across every module, in Spark/Tide/Abyss tiers.",
  },
];

/**
 * Company journey / milestones. (Reference timeline — indicative, to be
 * confirmed with approved dates and details.)
 */
export const milestones = [
  {
    year: "2024",
    title: "BlueWhale Stack founded",
    body: "Started with a simple conviction: cloud got complex faster than the tools to govern it. The platform architecture and hyperscaler-neutral control plane were defined.",
  },
  {
    year: "2025",
    title: "Core platform ships",
    body: "Standard and Enterprise editions go live — unified inventory, provisioning, ITSM and observability across AWS, Azure, GCP and on-prem, with the first design partners onboarded.",
  },
  {
    year: "2025",
    title: "Editions & global regions",
    body: "Community, Enterprise Plus and Sovereign editions round out the lineup; deployment regions span Singapore, Mumbai, Frankfurt and Los Angeles, with air-gapped sovereign delivery.",
  },
  {
    year: "2026",
    title: "AI-native & sovereign-ready",
    body: "Whale AI ships across every module in Spark/Tide/Abyss tiers with 50+ use cases, and ISO 27001:2022 and SOC 2 Type II certifications are achieved — extending the platform to the most regulated environments.",
  },
];

/** Leadership — placeholder cards until bios & photos are supplied. */
export const leadership = [
  { role: "Chief Executive Officer" },
  { role: "Chief Technology Officer" },
  { role: "Chief Product Officer" },
  { role: "VP, Engineering" },
];

export const trustPoints = [
  "ISO 27001:2022 certified",
  "SOC 2 Type II certified",
  "Data-residency commitments: DPDP, GDPR, PDPA, NCA-ECC",
  "Air-gapped & in-region deployment for sovereign customers",
];
