/**
 * About / company page content.
 *
 * Founding dates and milestones are grounded in the "About BlueWhale
 * Stack" section repeated verbatim across every 2026 solution document
 * (BFSI, Fabric, Telco Edition, Datacenter Edition — business/technical
 * solutions and whitepapers): founded 2018 as a cloud consulting firm,
 * platform launched 2026 after eight years of field experience across
 * telecom, banking, government, healthcare, manufacturing and datacenter
 * modernization. This superseded an earlier draft "Founded 2024" fact
 * that conflicted with the story section below — now reconciled.
 */

import type { IsoName } from "@/components/illustrations/Iso";

export const aboutHero = {
  eyebrow: "About Us",
  title: "Building the command center for every cloud",
  mission:
    "We help organizations and digital infrastructure providers cut through the complexity of modern cloud environments. BlueWhale Stack gives them one platform to accelerate cloud adoption, optimize infrastructure operations, and unlock the full potential of the cloud.",
};

/** Compact "at a glance" facts shown under the hero. */
export const companyFacts = [
  { label: "Founded", value: "2018" },
  { label: "Platform launched", value: "2026" },
  { label: "Headquarters", value: "Mumbai, India" },
  { label: "Presence", value: "India · UAE · USA" },
  { label: "Category", value: "Cloud Management Platform" },
  { label: "Delivery", value: "SaaS · BYOC · On-prem · Sovereign · Edge" },
];

/** Mission & vision statements, from the platform deck's Executive Summary. */
export const missionVision = {
  mission:
    "To empower organizations and digital infrastructure providers with the tools they need to accelerate cloud adoption, optimize infrastructure operations, and unlock the full potential of the cloud.",
  vision:
    "To simplify how organizations manage the complexity of modern cloud environments — enabling enterprises to seamlessly operate across hybrid and multi-cloud ecosystems while maintaining visibility, governance, and operational efficiency.",
};

export const story = [
  {
    heading: "Where we started",
    body: "BlueWhale Stack Consulting and Technologies was founded in 2018 with a focus on cloud consulting — helping organizations with cloud strategy, infrastructure transformation, cloud migration, and hybrid cloud operations, alongside consulting practices in App Modernization, Infra Modernization, Data Modernization, and AI Design & Modernization.",
  },
  {
    heading: "What we learned",
    body: "Across eight years of engagements — spanning telecom, banking and financial services, government, healthcare, manufacturing and datacenter modernization in India and the GCC — we saw the same problem surface again and again: organizations struggling to manage complex hybrid and multi-cloud environments, with no single view of visibility, governance, cost control, or operational complexity across platforms.",
  },
  {
    heading: "What we built",
    body: "Inspired by these industry challenges, we productized that field experience into BlueWhale Stack — a single unified platform that lets enterprises and digital infrastructure providers discover, migrate, manage, and optimize workloads across hybrid and multi-cloud environments, launched in 2026 alongside the ongoing consulting practice.",
  },
];

export const principles = [
  {
    icon: "Boxes",
    title: "Unified",
    body: "Nine families read from and write to one inventory, one identity fabric and one policy plane, so a finding, a cost anomaly and a ticket point at the same workload and owner.",
  },
  {
    icon: "Sparkles",
    title: "AI-native",
    body: "Whale AI is a layer every module exposes data to and every screen can ask — grounded in live inventory, billing and tickets, with citations.",
  },
  {
    icon: "Layers",
    title: "Open",
    body: "Helm-deployable on your own Kubernetes; the same build runs as SaaS, BYOC, on-premises, air-gapped or at the edge. Six public clouds are first-class and none is a dependency.",
  },
  {
    icon: "Landmark",
    title: "Sovereign-ready",
    body: "Deployed air-gapped for defence and interior ministries and in-country for banks under two regulators — with in-region AI and a WORM-backed audit log where the mandate requires it.",
  },
];

/** Product offerings — the platform and what ships inside it (Company Profile, "Our offerings"). */
export const productFamily: { name: string; badge: string; href: string; body: string; iso: IsoName }[] = [
  {
    name: "BlueWhale Stack Platform",
    badge: "Core",
    href: "/platform",
    iso: "stacked-slabs",
    body: "One control plane across public, private, virtualization, hybrid and edge — 54 capabilities · nine families · four editions.",
  },
  {
    name: "Whalenomics · FinOps",
    badge: "Family",
    href: "/modules/finops",
    iso: "chart",
    body: "Budgets, forecasts, chargeback, continuous optimization — spend decomposed to workload, department or tenant.",
  },
  {
    name: "Whale AI — incl. offline",
    badge: "GA",
    href: "/products/whale-ai",
    iso: "ai-cube",
    body: "AI for operations, documentation and compliance — your choice of model, able to run fully inside the perimeter.",
  },
  {
    name: "Migration Engine",
    badge: "Family",
    href: "/modules/migration",
    iso: "migration",
    body: "6R assessment live today — auto-classification, cost, effort and blocker scoring, dependency-aware waves with rollback. Execution hooks in development.",
  },
  {
    name: "Cloud Audit & Evidence",
    badge: "Family",
    href: "/modules/cloud-audit",
    iso: "audit",
    body: "Controls monitored continuously across every estate; the report the board, the auditor and the regulator ask for, generated per regime on demand.",
  },
  {
    name: "BlueWhale Stack Fabric",
    badge: "Flagship initiative",
    href: "/fabric",
    iso: "datacenter",
    body: "A market's datacenter capacity — every operator, every tier — unified into one sovereign cloud: operator monetization plus a sovereign fabric. Launching in India, built for every country.",
  },
];

/** Service offerings — consulting and implementation, delivered globally, with or without the platform. */
export const services: { icon: string; iso: IsoName; name: string; body: string }[] = [
  {
    icon: "LayoutTemplate",
    iso: "app-window",
    name: "App Modernization",
    body: "Legacy applications re-architected cloud-native — microservices, containers and governed landing zones, without downtime.",
  },
  {
    icon: "Server",
    iso: "racks",
    name: "Infrastructure Modernization",
    body: "Datacenter and virtualization estates modernized — hybrid architectures and a rehearsed migration factory.",
  },
  {
    icon: "Database",
    iso: "data",
    name: "Data Modernization",
    body: "One governed data platform — pipelines, quality and shared definitions feeding analytics and every AI use case.",
  },
  {
    icon: "Sparkles",
    iso: "network",
    name: "AI Design & Modernization",
    body: "AI adoption inside the perimeter — use-case design, Whale AI deployment, custom models the customer owns outright.",
  },
];

export const servicesNote =
  "Delivered by BlueWhale or certified partners — every engagement lands governed on the platform.";

/** Company journey / milestones — grounded in the "About BlueWhale Stack" facts repeated across every 2026 solution document. */
export const milestones = [
  {
    year: "2018",
    title: "BlueWhale Stack Consulting founded",
    body: "Started as a cloud consulting firm — cloud strategy, infrastructure transformation, migration and hybrid cloud operations for enterprise and government clients, alongside App, Infra, Data and AI Design & Modernization practices.",
  },
  {
    year: "2018–2025",
    title: "Consulting at scale",
    body: "Engagements across telecom, banking and financial services, government, healthcare, manufacturing and datacenter modernization in India and the GCC. The same problem surfaced in every one — no single view of the estate — and it defined the product.",
  },
  {
    year: "2026",
    title: "The platform launches",
    body: "Eight years of field experience productised into one control plane: Standard, Enterprise and Government editions generally available, six public clouds plus private, hybrid and edge estates, and Whale AI across every family — including offline.",
  },
  {
    year: "2026",
    title: "Global footprint",
    body: "Three registered entities — United States (Delaware), United Arab Emirates (Ajman) and India (Mumbai) — product, sovereign focus and delivery. The Telco & Datacenter Edition reaches general availability in Q4 2026, alongside BlueWhale Stack Fabric — the multi-operator sovereign cloud fabric, launching in India and built for every market.",
  },
  {
    year: "Today",
    title: "Partner-led growth",
    body: "The Partner Portal is live — deal registration, licensing and tenant provisioning — so License Service Providers, Implementation Partners and Strategic Partners sell, deliver and operate the platform in their markets.",
  },
];

/** Leadership — profiles are added one by one; unfilled roles render as "To be announced". */
export type LeadershipMember = {
  /** editor-uploaded photograph (CMS) */
  cmsImage?: import("@/content/cmsTypes").CmsImage;
  /** CMS document id (click-to-edit) */
  cmsId?: string;
  name?: string;
  role: string;
  bio?: string;
  /** Path under /public, e.g. "/team/anil-pakale.jpg". */
  image?: string;
  linkedin?: string;
};

export const leadership: LeadershipMember[] = [
  {
    name: "Abhishek Pangerkar",
    role: "Founder & CEO",
    image: "/team/abhishek-pangerkar.jpg",
    linkedin: "https://www.linkedin.com/in/abhishek-p-a376b561/",
    bio: "Abhishek Pangerkar founded BlueWhale Stack in 2018 as a cloud consulting firm and leads the company today as Founder & CEO. His vision — to simplify how organizations manage the complexity of modern cloud environments — became the platform: eight years of field experience across telecom, banking, government, healthcare, manufacturing and datacenter modernization, productized in 2026 into a single unified control plane for hybrid and multi-cloud operations.",
  },
  {
    name: "Anil Pakale",
    role: "General Manager — Middle East, US & Asia",
    image: "/team/anil-pakale.jpg",
    linkedin: "https://www.linkedin.com/in/anil-pakale-70a15636/",
    bio: "Anil Pakale brings over 40 years of experience across manufacturing, engineering, sales, business development, and product management to BlueWhale Stack. A Mechanical Engineering graduate from VJTI, Mumbai, he has delivered landmark projects across the Middle East — including chillers for The Pearl-Qatar, Emirates Palace, Etihad Towers, and the Sheikh Zayed Grand Mosque — spanning the HVAC, industrial, construction machinery and technology sectors. At BlueWhale Stack, he focuses on helping enterprises accelerate digital transformation through intelligent cloud management solutions that improve operational visibility and infrastructure performance.",
  },
  {
    name: "Asawari More",
    role: "Legal, Partner & Customer Enablement — Middle East, Asia & US",
    image: "/team/asawari-more.jpg",
    linkedin: "https://www.linkedin.com/in/asawari-more-82308b70/",
    bio: "Asawari More leads Legal, Partner & Customer Enablement at BlueWhale Stack, building and scaling high-impact partner ecosystems that accelerate revenue growth and deliver measurable business outcomes. She works closely with cross-functional teams to design structured onboarding and enablement programs, translating complex product capabilities into clear, value-driven partner narratives that speed adoption and strengthen collaboration. Her focus spans partner strategy, channel growth, training program design, and data-driven performance optimization — aligning partner goals with organizational strategy to build sustainable, win-win partnerships.",
  },
  {
    name: "Ganesh Muthusamy",
    role: "Head of Product Development",
    image: "/team/ganesh-muthusamy.jpg",
    linkedin: "https://www.linkedin.com/in/ganezm",
    bio: "Ganesh Muthusamy is a Product & Technology Leader with over 18 years of experience designing, building, and scaling enterprise software platforms across cloud, AI, and SaaS ecosystems. As Head of Product Development at BlueWhale Stack, he leads the strategy, architecture, and engineering execution of the company's Unified Multi-Cloud Management Platform — delivering enterprise-grade solutions for cloud governance, FinOps, security, and compliance across public, private, hybrid, and sovereign environments. He specializes in cloud-native architectures and AI-powered platforms that help organizations accelerate digital transformation.",
  },
  {
    name: "Parag Ware",
    role: "Senior Account Director — Middle East & Asia",
    image: "/team/parag-ware.jpg",
    linkedin: "https://www.linkedin.com/in/parag-ware-03227814/",
    bio: "Parag Ware brings over 25 years of experience in program and project management, consulting, and large-scale GIS implementation to BlueWhale Stack. He has led client relationships, pre-sales, and delivery for utility companies across the US, UK, and Middle East, government bodies including MHADA and CSPDCL, and defense and law-enforcement agencies such as DRDO and Maharashtra Police. Most recently Vice President – Operations at Replete Business Solutions, he brings deep expertise in full project lifecycle management, business process mapping, and building high-performance operations teams.",
  },
];

export const trustPoints = [
  "ISO/IEC 27001:2022, 27017, 27018, 27701 and ISO 22301 certified — independently audited",
  "SOC 2 Type II readiness assessment complete; CSA STAR Level 1 self-assessment; GDPR compliance assessment",
  "SaaS residency in Singapore, Mumbai, Frankfurt and Los Angeles; in-country by BYOC, on-prem or air-gapped elsewhere",
  "Air-gapped & in-region deployment for sovereign customers",
];
