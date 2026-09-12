/** Home page content blocks. */

export const hero = {
  badge: "Digital Experience Platform · 54 capabilities · 9 families · 4 editions",
  title: "Every cloud. One control plane.",
  highlight: "One control plane",
  description:
    "BlueWhale Stack is one control plane over six public clouds, your VMware, Hyper-V and Nutanix estates, and your air-gapped sites. Enterprises, operators and governments use it to get one inventory, one identity fabric and one explainable bill — with audit evidence generated continuously instead of assembled before each inspection.",
  primaryCta: { label: "See it on your estate", href: "/contact?intent=demo" },
  primaryNote: "45 minutes · one account connected read-only · nothing to install",
  secondaryCta: { label: "Explore the platform", href: "/platform" },
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

/** Why-BlueWhale differentiators — the four reasons teams choose the platform. */
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
    body: "Government, BFSI, healthcare, regulated enterprise, SaaS, telco and datacenter operators — with the regimes each one answers to.",
    href: "/industries",
    label: "Seven industries",
  },
  {
    icon: "Layers",
    title: "By edition",
    body: "Standard at $24,000 a year, Enterprise at $120,000, and operator and government editions shaped to the estate. An upgrade is a licence change.",
    href: "/editions",
    label: "Compare editions",
  },
];
