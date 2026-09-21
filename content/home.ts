/**
 * Home page content — copy taken from the official Master Brief and the
 * explainer-video script (September 2026): the one-sentence story, the
 * messaging bank, the six differentiators and the four-product portfolio.
 */

export const hero = {
  badge: "Digital Experience Multi-Cloud Platform — Cloud & Datacenter",
  title: "Every cloud. One control plane.",
  highlight: "One control plane",
  description:
    "Your cloud estate didn't get complicated on purpose — it happened one platform at a time. BlueWhale Stack puts every estate you run — public, private, sovereign, edge — under one console, one identity, one policy and one bill. Nothing has to move first.",
  primaryCta: { label: "Book the discovery workshop", href: "/contact?intent=demo" },
  primaryNote: "Half a day · your technology and finance leads · then 90 days on your estate at no licence cost",
  secondaryCta: { label: "Explore the platform", href: "/platform" },
  /** the official at-a-glance numbers */
  facts: [
    { value: 54, label: "capabilities" },
    { value: 9, label: "capability families" },
    { value: 4, label: "editions, one architecture" },
    { value: 6, label: "platform classes governed" },
  ],
};

/** The narrative in three beats — the video script's hook, problem and turn. */
export const story = {
  eyebrow: "The story",
  hook: "Your cloud estate didn't get complicated on purpose.",
  problem:
    "AWS here. Azure there. VMware in the datacenter, a sovereign stack for the regulator — each with its own console, its own identities, its own bill nobody can explain.",
  turn: "BlueWhale Stack changes the question. Not “which cloud?” — but “why can't they all answer to one control plane?”",
};

/** Proof strip: outcomes from delivered engagements, each linked to its case study. */
export const proofStrip = [
  {
    value: "Weeks → days",
    label: "Inspection preparation under two regulators",
    source: "Two banks, Singapore & Qatar",
    href: "/case-studies/bfsi-singapore-qatar",
  },
  {
    value: "Minutes",
    label: "Audit query answered from a system of record",
    source: "Defence & Interior ministries, Middle East",
    href: "/case-studies/government-middle-east-defence",
  },
  {
    value: "Months",
    label: "To first cloud-services revenue on owned capacity",
    source: "Telco & DC operators, Qatar · KSA · South Africa",
    href: "/case-studies/telco-datacenter-qatar-ksa-safrica",
  },
  {
    value: "Zero",
    label: "External AI data exposure across a global newsroom",
    source: "Global media network, Doha",
    href: "/case-studies/media-qatar-network",
  },
];

export const problems = [
  {
    icon: "Network",
    title: "Every estate is its own island",
    body: "Six cloud consoles, a vCenter, an air-gapped site: six identity systems, six bills, six audit stories. Nobody has one current map of what the organisation runs.",
    cost: "The inventory is rebuilt by hand for every audit, migration and cost review.",
  },
  {
    icon: "TrendingUp",
    title: "Four tools where one would do",
    body: "A CMP here, a monitoring contract there, an IaC tool, a migration suite — each with its own identity, its own data model and its own bill.",
    cost: "Four renewals, four integrations to maintain, and answers that never agree.",
  },
  {
    icon: "ShieldAlert",
    title: "Audit evidence assembled after the fact",
    body: "Regulators ask where data lives and who can touch it. The answer is screenshots gathered estate by estate in the two weeks before the inspection.",
    cost: "Weeks of senior time per inspection, and an exit plan nobody has rehearsed.",
  },
];

export const promise = {
  title: "One layer over everything you run.",
  body: "Connect an account and discovery completes in under 15 minutes. From then on every estate reports into the same inventory, identity fabric and policy engine, so cost, security, tickets, migration and audit evidence come from one system of record instead of four tools and a spreadsheet.",
};

/** What makes it different — the six points from the Master Brief. */
export const differentiators = {
  eyebrow: "What makes it different",
  title: "Govern first. Migrate never — unless you choose to.",
  description:
    "Six design decisions separate a control plane from another tool in the estate. Each one is demonstrable in the 90-day prototype.",
  items: [
    {
      icon: "Plug",
      title: "Govern without migrating",
      body: "Adoption starts on the estates you already run; nothing is re-hosted to begin. The platform connects where workloads already are.",
    },
    {
      icon: "FileCheck",
      title: "Evidence-first design",
      body: "Every action is logged into an evidence store. Audit reporting becomes a query, not a project — the evidence exists before the request arrives.",
    },
    {
      icon: "Sparkles",
      title: "AI inside your perimeter",
      body: "Whale AI runs inside the customer's boundary, on the customer's choice of model — including fully air-gapped.",
    },
    {
      icon: "Landmark",
      title: "Sovereign by architecture",
      body: "In-country deployment, programme segregation and disconnected classes are product features, not professional-services promises.",
    },
    {
      icon: "Building2",
      title: "Operator-grade tenancy",
      body: "The same engine that serves internal business units can sell governed cloud services under an operator's own brand.",
    },
    {
      icon: "Layers",
      title: "One architecture across editions",
      body: "Standard to Government on one architecture — an upgrade is a licence change, never a rebuild.",
    },
  ],
};

/** Why-BlueWhale differentiators — kept for pages that still read the four pillars. */
export const whyBluewhale = {
  eyebrow: "Why BlueWhale Stack",
  title: "One platform where the market sells you four",
  description:
    "Most teams stitch together a CMP, a monitoring tool, an IaC tool and a migration suite. BlueWhale Stack covers all four under one licence, with AI in every family and deployment modes down to fully air-gapped.",
  pillars: [
    {
      title: "Nine families, one inventory",
      body: "Inventory, provisioning, cost, identity, audit, AI, migration, observability and tenancy all read from and write to the same resource model — so a cost anomaly, a finding and a ticket point at the same workload and the same owner.",
    },
    {
      title: "Whale AI in every family — including offline",
      body: "50+ use cases across cost, security, ITSM, operations, migration and governance, each grounded in your live inventory, billing and tickets with citations. Runs on hosted models, your own model, or fully offline inside the perimeter.",
    },
    {
      title: "Six public clouds and the datacenter floor",
      body: "AWS, Azure, Google Cloud, Oracle, Alibaba and Huawei by API. VMware, Hyper-V, Nutanix, OpenShift and KVM by Edge Agent over outbound HTTPS on port 443 — no inbound firewall rules, no vendor dependency.",
    },
    {
      title: "Sovereign by architecture",
      body: "SaaS in Singapore, Mumbai, Frankfurt or Los Angeles; BYOC in your own accounts; on-premises; fully air-gapped with signed offline updates; or edge. The same build in every mode, with in-region AI and a WORM-backed audit log where the mandate requires it.",
    },
  ],
};

export const howItWorks = [
  {
    step: "01",
    title: "Connect",
    body: "Add cloud accounts with read-only credentials — an IAM role, an Entra app registration, a Viewer service account. Register one Edge Agent per on-prem site; it connects outbound on 443.",
    detail: "A 500-resource AWS account is inventoried in under 90 seconds.",
  },
  {
    step: "02",
    title: "Govern",
    body: "Federate your IdP over SAML or OIDC, map directory groups to platform roles with SCIM, and write policy once — residency, encryption, tagging, access — for every estate.",
    detail: "Every evaluation and every action is written to the audit log.",
  },
  {
    step: "03",
    title: "Provision and move",
    body: "Teams request approved resources from the catalog with Whale AI sizing (AWS live). The Migration Engine scores on-prem workloads with a 6R assessment and plans waves with rollback.",
    detail: "Assessment is live; execution hooks are in progress.",
  },
  {
    step: "04",
    title: "Observe and prove",
    body: "Logs, metrics, traces and SLOs are included; incidents open automatically. Cloud Audit & Evidence monitors controls continuously and produces the report per regime on demand.",
    detail: "Run it as SaaS, BYOC, on-prem, air-gapped or at the edge.",
  },
];

/** Three ways in, for readers who arrive knowing what they need. */
export const paths = [
  {
    icon: "MoveRight",
    title: "By outcome",
    body: "Inventory, provisioning, observability, migration, security and compliance, sovereign cloud — each with its reference architecture.",
    href: "/solutions",
    label: "Six solutions",
  },
  {
    icon: "Landmark",
    title: "By industry",
    body: "Government, BFSI, healthcare, regulated enterprise, SaaS, telco, datacenter and media — with the regimes each one answers to.",
    href: "/industries",
    label: "Eight industries",
  },
  {
    icon: "Layers",
    title: "By edition",
    body: "Standard at $24,000 a year, Enterprise at $120,000, and operator and government editions shaped to the estate. An upgrade is a licence change.",
    href: "/editions",
    label: "Compare editions",
  },
];

/** Four products, one platform DNA — from the Master Brief's portfolio section. */
export const portfolio = {
  eyebrow: "The product portfolio",
  title: "Four products. One platform DNA.",
  description:
    "One identity, policy, audit and tenancy engine underneath everything — a customer entering through any product inherits the whole governed story, and an upgrade to the full platform is an extension, never a migration.",
  products: [
    {
      name: "BlueWhale Stack",
      role: "The flagship — the unified multi-cloud control plane",
      body: "Nine capability families, four editions, five deployment modes. Annual licence by edition.",
      status: "Available",
      href: "/platform",
      photo: "platform-stack",
    },
    {
      name: "WhaleDocs",
      role: "Governed enterprise content",
      body: "Document management and viewer, retention and legal holds, e-signature, customer and partner portals — separately branded, powered by the Stack's identity, audit and tenancy engine.",
      status: "Powered by BlueWhale Stack",
      href: "/contact?intent=sales",
      photo: "editions-rack",
    },
    {
      name: "BlueWhale Public Cloud",
      role: "The platform as consumable regions",
      body: "Governed and sovereign regions on owned and partner capacity, metered on the Stack's tenancy engine. First footprint planned for Mumbai and Pune.",
      status: "Planned",
      href: "/fabric",
      photo: "sovereign-regions",
    },
    {
      name: "BlueWhale Appliance — OEM",
      role: "The platform, rack-ready",
      body: "OEM-partnered hardware with the platform pre-installed and burned in — for sovereign, air-gapped, edge and datacenter floors, including Whale AI offline on the box.",
      status: "Roadmap",
      href: "/contact?intent=sales",
      photo: "appliance-enclosure",
    },
  ] as const,
  note: "WhaleForge developer tooling ships within the platform suite. Roadmap items are directional, not contractual.",
};
