/**
 * /products/whaleforge — every section's copy as the code ships it: the
 * fallback for the CMS "WhaleForge page" document and what the seed script
 * loads into it. The page has no photo hero, so the whole hero lives here.
 */
import type { WhaleForgePage } from "@/content/cms/docs/whaleForgePage";

export const whaleForgePage: WhaleForgePage = {
  seoTitle: "WhaleForge — Infrastructure as Code",
  seoDescription:
    "WhaleForge is a declarative YAML-to-Terraform IaC engine with live HLD/LLD/TOGAF architecture diagrams, Git import and industry landing-zone packs — currently in public beta.",
  hero: {
    badge: "Beta",
    kicker: "Product · WhaleForge",
    title: "Infrastructure as Code,",
    titleAccent: "without the complexity",
    titleSuffix: ".",
    description:
      "Write infrastructure in plain YAML. WhaleForge compiles it to real Terraform HCL for AWS, Azure and GCP — with live architecture diagrams that stay in sync with your code.",
    codeFile: "stack.yaml",
    codeOutput: "→ terraform/main.tf · hld.pdf",
    // the DSL itself — a marketing page for a language should show the language
    code: `stack: payments-core
provider: aws
region: ap-south-1

network:
  vpc: 10.40.0.0/16
  subnets:
    - { name: private-a, cidr: 10.40.1.0/24, az: a }
    - { name: private-b, cidr: 10.40.2.0/24, az: b }

compute:
  app:
    type: autoscaling
    instance: m6i.large
    min: 2
    max: 6

data:
  primary:
    engine: postgres
    size: db.r6g.large
    encrypted: true      # customer-managed key

policies:
  residency: in-country
  tags: [owner, cost-centre]`,
    includesKicker: "What you get today",
    includes: [
      "YAML DSL → Terraform HCL (AWS · Azure · GCP)",
      "Live HLD / LLD / TOGAF diagrams",
      "PDF export & Git import",
      "Industry landing-zone packs",
    ],
    comingNext: "Deployment runner — coming next",
    cta: { label: "Request beta access", href: "/contact" },
  },
  stats: [
    { value: "3", label: "Cloud targets (AWS · Azure · GCP)" },
    { value: "3", label: "Diagram formats (HLD · LLD · TOGAF)" },
    { value: "4", label: "Industry landing-zone packs" },
    { value: "Beta", label: "Available now — free to try" },
  ],
  capabilities: {
    heading: {
      eyebrow: "Capabilities",
      title: "Everything you need to design and ship infrastructure",
      description:
        "WhaleForge combines an IaC compiler with a visual architecture tool — so the design and the deployment artefact are the same file.",
    },
    items: [
      {
        icon: "Code2",
        title: "YAML DSL → real Terraform",
        body: "Write infrastructure in a readable YAML DSL. WhaleForge compiles it to production-ready Terraform HCL for AWS, Azure and GCP — no manual HCL authoring required.",
        chips: ["AWS", "Azure", "GCP", "Real HCL output"],
      },
      {
        icon: "Network",
        title: "Live architecture diagrams",
        body: "Every resource you define renders as a live architecture diagram in HLD, LLD and TOGAF formats. The diagram and the code stay in sync — change one, the other updates.",
        chips: ["HLD", "LLD", "TOGAF", "Auto-sync"],
      },
      {
        icon: "FileDown",
        title: "PDF export & Git import",
        body: "Export your architecture diagrams as PDF for stakeholders, or import existing Terraform from a Git repository to visualise and manage infrastructure you already own.",
        chips: ["PDF export", "Git import", "Share with stakeholders"],
      },
      {
        icon: "LayoutTemplate",
        title: "Industry landing-zone packs",
        body: "Start from a pre-built, compliance-ready foundation for Banking, Telco, Healthcare or Fintech. Each pack enforces guardrails, tags and account structure from day one.",
        chips: ["Banking", "Telco", "Healthcare", "Fintech"],
      },
    ],
  },
  workflow: {
    heading: {
      eyebrow: "Workflow",
      title: "From YAML to deployed infrastructure",
      description: "Four steps from a blank file to a reviewed, compiled Terraform artefact.",
    },
    steps: [
      {
        step: "01",
        title: "Define in YAML",
        body: "Describe your infrastructure resources — compute, networking, storage, IAM — in a clean, readable YAML DSL. No Terraform syntax knowledge needed.",
      },
      {
        step: "02",
        title: "Review the live diagram",
        body: "WhaleForge renders an HLD/LLD/TOGAF architecture diagram in real time as you type. Catch topology errors before they reach a cloud account.",
      },
      {
        step: "03",
        title: "Generate HCL",
        body: "Click compile and receive production-grade Terraform HCL for AWS, Azure or GCP. The output is clean, modular and ready to commit.",
      },
      {
        step: "04",
        title: "Export & deploy",
        body: "Export diagrams as PDF for architecture review. Apply the HCL with your existing Terraform workflow. Deployment automation is coming in the next release.",
      },
    ],
  },
  diagrams: {
    heading: {
      eyebrow: "Architecture diagrams",
      title: "Three diagram formats, one source file",
      description:
        "The same YAML that generates your Terraform also renders live diagrams in HLD, LLD and TOGAF formats — kept in sync automatically.",
    },
    types: [
      {
        name: "HLD",
        label: "High-Level Design",
        body: "A logical overview of your architecture — services, connectivity and zones — suitable for leadership and architecture review boards.",
      },
      {
        name: "LLD",
        label: "Low-Level Design",
        body: "A detailed blueprint covering compute, storage, networking and IAM — accurate enough for engineers to implement.",
      },
      {
        name: "TOGAF",
        label: "TOGAF-aligned",
        body: "Enterprise Architecture views aligned to the TOGAF ADM — useful for regulated industries and government contracts that require EA framework compliance.",
      },
    ],
  },
  packs: {
    heading: {
      eyebrow: "Landing-zone packs",
      title: "Start from a compliant cloud foundation",
      description:
        "Industry packs give you a pre-built, compliance-aware account structure so your cloud is governed from the first resource, not retrofitted later.",
    },
    items: [
      {
        name: "Banking",
        icon: "Banknote",
        features: [
          "Multi-account baseline with isolation",
          "PCI-DSS network segmentation guardrails",
          "Audit-trail tagging enforced",
          "Data residency controls",
        ],
      },
      {
        name: "Telco",
        icon: "RadioTower",
        features: [
          "Multi-tenant account structure",
          "Service mesh and connectivity layers",
          "Edge workload topology",
          "High-availability by default",
        ],
      },
      {
        name: "Healthcare",
        icon: "HeartPulse",
        features: [
          "HIPAA / DPDP-aligned foundation",
          "Data classification tagging",
          "Encrypted storage defaults",
          "In-region residency controls",
        ],
      },
      {
        name: "Fintech",
        icon: "TrendingUp",
        features: [
          "Fast-scale multi-environment layout",
          "SOC 2 guardrails built in",
          "CI/CD-friendly account baseline",
          "Cost tagging enforced from day one",
        ],
      },
    ],
  },
  availability: {
    heading: {
      eyebrow: "Availability",
      title: "Included from Standard edition",
      description:
        "WhaleForge is available in Standard, Enterprise and all higher editions. Landing-zone packs and advanced Git import are Enterprise and above.",
    },
    editionChips: ["Standard", "Enterprise", "Telco & Datacenter", "Government"],
    note: "Landing-zone packs and advanced Git import: Enterprise and above only.",
  },
  closing: {
    kicker: "Beta · Free to try",
    title: "Define your infrastructure in YAML. Ship real Terraform.",
    body: "Request beta access and get WhaleForge inside your BlueWhale Stack environment. No lock-in, no extra contract.",
    primary: { label: "Request beta access", href: "/contact" },
    secondary: { label: "Compare editions", href: "/editions" },
  },
};
