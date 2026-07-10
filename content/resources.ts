/** Resource library content. */

export type ResourceType =
  | "Whitepaper"
  | "Case Study"
  | "Webinar"
  | "Blog"
  | "Video";

export interface ResourceDef {
  slug: string;
  type: ResourceType;
  title: string;
  summary: string;
  meta: string; // read time / duration
  topic: string;
}

export const resourceTypes: ResourceType[] = [
  "Whitepaper",
  "Case Study",
  "Webinar",
  "Blog",
  "Video",
];

export const resources: ResourceDef[] = [
  {
    slug: "multi-cloud-cio-guide",
    type: "Whitepaper",
    title: "Multi-Cloud Management: A CIO Strategic Guide",
    summary:
      "A board-ready framework for governing AWS, Azure, GCP, Oracle and on-prem from one control plane.",
    meta: "12 min read",
    topic: "Strategy",
  },
  {
    slug: "one-control-plane-overview",
    type: "Whitepaper",
    title: "Every Cloud, One Control Plane: Platform Overview",
    summary:
      "How 11 modules — inventory, provisioning, observability, migration and more — share one identity and audit tier.",
    meta: "10 min read",
    topic: "Platform",
  },
  {
    slug: "unified-inventory-deep-dive",
    type: "Blog",
    title: "Unified Inventory Across Six Public Clouds + On-Prem",
    summary:
      "What it takes to discover every asset across cloud and on-prem and group it by workload in one place.",
    meta: "8 min read",
    topic: "Inventory",
  },
  {
    slug: "government-cloud-sovereignty-patterns",
    type: "Whitepaper",
    title: "Government Cloud Sovereignty: Architecture Patterns",
    summary:
      "Reference patterns for data residency, air-gap and in-region AI in sovereign deployments.",
    meta: "18 min read",
    topic: "Sovereignty",
  },
  {
    slug: "enterprise-edition-walkthrough",
    type: "Video",
    title: "BlueWhale Stack Enterprise Edition: Product Walkthrough",
    summary:
      "A guided tour of inventory, provisioning, observability, migration, ITSM and Whale AI in Enterprise.",
    meta: "20 min",
    topic: "Product",
  },
  {
    slug: "bundled-observability-vs-datadog",
    type: "Blog",
    title: "Bundled Observability: Logs, Metrics, Traces & SLOs Built In",
    summary:
      "Why folding observability into the control plane removes a separate contract and a stack of integrations.",
    meta: "6 min read",
    topic: "Observability",
  },
  {
    slug: "whale-ai-use-cases",
    type: "Webinar",
    title: "Whale AI in Practice: 40+ Use Cases Across the Platform",
    summary:
      "A walkthrough of Whale AI tiers — Spark, Tide and Abyss — and where they show up across every module.",
    meta: "45 min",
    topic: "AI",
  },
  {
    slug: "ai-native-provisioning",
    type: "Blog",
    title: "AI-Native Provisioning: Catalogs Without Consoles",
    summary:
      "How governed catalogs, approval workflows and Whale AI sizing replace per-cloud console sprawl.",
    meta: "5 min read",
    topic: "Provisioning",
  },
  {
    slug: "migration-6r-assessment",
    type: "Whitepaper",
    title: "The 6R Migration Assessment, Operationalized",
    summary:
      "Auto-classify on-prem workloads and score each for cost, effort and blockers before you move a thing.",
    meta: "14 min read",
    topic: "Migration",
  },
  {
    slug: "beyond-single-cloud",
    type: "Blog",
    title: "Why CIOs Are Moving Away from Single-Cloud Strategies",
    summary:
      "Resilience, neutrality and sovereignty are pushing enterprises to hyperscaler-neutral platforms.",
    meta: "5 min read",
    topic: "Strategy",
  },
  {
    slug: "whaleforge-iac-overview",
    type: "Webinar",
    title: "WhaleForge: YAML DSL to Real Terraform HCL",
    summary:
      "Author infrastructure in a YAML DSL, generate real Terraform HCL, and produce live HLD/LLD diagrams.",
    meta: "35 min",
    topic: "IaC",
  },
  {
    slug: "identity-federation-patterns",
    type: "Blog",
    title: "Identity Federation Across 9+ Providers",
    summary:
      "Federate Entra, Okta, Auth0, AWS Identity Center and more with auto-provisioning across every cloud.",
    meta: "6 min read",
    topic: "Security",
  },
];
