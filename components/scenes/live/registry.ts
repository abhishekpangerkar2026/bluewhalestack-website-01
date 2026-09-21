/**
 * The 3D product scenes, as data. One definition drives both the live WebGL
 * scene (components/scenes/live/LiveScene.tsx) and the static captures the
 * site falls back to (scripts/capture-scenes.mjs → content/scenes.generated.ts).
 *
 * `layout: "console"` — the platform console on a royal-blue slab, three
 * shelves of estate objects, provider pills cabled into the console.
 * `layout: "stack"`   — the six-layer Digital Experience Platform architecture
 * as an exploded stack.
 */

export type CenterKey =
  | "inventory" | "whalenomics" | "whale-ai" | "migration" | "audit" | "sovereign" | "platform"
  | "connectors" | "provisioning" | "landing-zone" | "whaleforge" | "identity" | "observe" | "itsm"
  | "datacenter" | "fabric" | "tenancy" | "estate" | "standard" | "enterprise" | "telco" | "government"
  | "sol-inventory" | "sol-provisioning" | "sol-observe" | "sol-migration" | "sol-security" | "sol-sovereign";

export interface SceneDef {
  title: string;
  tagline: string;
  layout?: "console" | "stack";
  ui: { title: string; search: string; buttons: string[] };
  groups: [string, string, string];
  center: CenterKey;
  /** provider pills above the console; [] hides pills and cables */
  providers?: string[];
  baseLabel?: string;
  /** stack layout only: layer names, bottom to top */
  layers?: string[];
}

export const DEFAULT_PROVIDERS = ["AWS", "Azure", "GCP", "Oracle", "Alibaba", "Huawei", "On-prem"];

export const SCENES: Record<string, SceneDef> = {
  /* ── platform-level ─────────────────────────────────────────── */
  estate: {
    title: "Every estate, one control plane",
    tagline: "Every cloud. One control plane.",
    ui: { title: "BlueWhale Stack — one console", search: "Search estates, workloads, policies, bills…", buttons: ["Govern", "Observe", "Bill"] },
    groups: ["Public cloud", "Private & virtual", "Hybrid & edge"],
    center: "estate",
  },
  platform: {
    title: "Digital Experience Multi-Cloud Platform",
    tagline: "One Platform. Every Industry. Every Estate.",
    ui: { title: "BlueWhale Stack — one console", search: "Search estates, tenants, policies, bills…", buttons: ["Govern", "Observe", "Bill"] },
    groups: ["Public cloud", "Private & virtual", "Hybrid & edge"],
    center: "platform",
  },
  architecture: {
    title: "The architecture, top to bottom",
    tagline: "Six layers. One platform build.",
    layout: "stack",
    ui: { title: "", search: "", buttons: [] },
    groups: ["", "", ""],
    center: "platform",
    providers: [],
    baseLabel: "BlueWhale Stack — Digital Experience Platform",
    layers: ["Deployment modes — SaaS · BYOC · on-prem · air-gapped · edge", "Every estate — 6 public clouds · private · hybrid · sovereign", "Integrations — OSS/BSS · ServiceNow · Jira · billing · SSO · API", "Unified Platform Core — nine capability families", "Digital Experience Layer — portals · catalog · metering · SLA", "Industry segments — enterprise · operators · government"],
  },

  /* ── modules ────────────────────────────────────────────────── */
  inventory: {
    title: "Unified Cloud Inventory", tagline: "One inventory. Every cloud. Full control.",
    ui: { title: "Unified Cloud Inventory", search: "Search assets, workloads, tags…", buttons: ["Discover", "Manage", "Retire"] },
    groups: ["Compute", "Databases", "Storage"], center: "inventory",
  },
  "cloud-connectors": {
    title: "Cloud Connectors", tagline: "Connect once. Govern everywhere.",
    ui: { title: "Cloud Connectors — estates", search: "Search accounts, subscriptions, sites…", buttons: ["Connect", "Verify", "Sync"] },
    groups: ["Public cloud", "Private & virtual", "Edge Agent"], center: "connectors",
  },
  identity: {
    title: "Identity & Access", tagline: "One identity fabric. Every estate.",
    ui: { title: "Identity & Access — fabric", search: "Search users, roles, providers…", buttons: ["Federate", "Provision", "Review"] },
    groups: ["Providers", "Roles", "Access"], center: "identity",
  },
  provisioning: {
    title: "Service Catalog", tagline: "Approved resources. No consoles.",
    ui: { title: "Service Catalog — request", search: "Search catalog items, blueprints…", buttons: ["Request", "Approve", "Deploy"] },
    groups: ["Catalog", "Approvals", "Deployed"], center: "provisioning",
  },
  itsm: {
    title: "ITSM", tagline: "Service management, cloud-ops native.",
    ui: { title: "ITSM — incidents & changes", search: "Search incidents, changes, CIs…", buttons: ["Incidents", "Changes", "CMDB"] },
    groups: ["Incidents", "Changes", "CMDB"], center: "itsm",
  },
  observe: {
    title: "Observe", tagline: "Logs, metrics, traces, SLOs — included.",
    ui: { title: "Observe — service health", search: "Search services, SLOs, traces…", buttons: ["Metrics", "Traces", "SLOs"] },
    groups: ["Logs", "Metrics & traces", "SLOs"], center: "observe",
  },
  whalenomics: {
    title: "Whalenomics · FinOps", tagline: "Every dollar resolves to a workload and an owner.",
    ui: { title: "Whalenomics — cost intelligence", search: "Search accounts, tenants, workloads…", buttons: ["Forecast", "Allocate", "Optimize"] },
    groups: ["Budgets", "Chargeback", "Optimization"], center: "whalenomics",
  },
  migration: {
    title: "Migration Engine", tagline: "Entry, movement and exit — scored and rehearsed.",
    ui: { title: "Migration Engine — wave planner", search: "Search workloads, dependencies, waves…", buttons: ["Assess", "Plan waves", "Execute"] },
    groups: ["Discover", "6R assess", "Waves"], center: "migration",
  },
  whaleforge: {
    title: "WhaleForge IaC", tagline: "YAML in. Terraform and diagrams out.",
    ui: { title: "WhaleForge — compile", search: "stack.yaml — 3 modules, 14 resources", buttons: ["Compile", "Diagram", "Export"] },
    groups: ["YAML", "Terraform", "Diagrams"], center: "whaleforge",
  },
  "landing-zone": {
    title: "Landing Zone Builder", tagline: "Compliant foundations, designed visually.",
    ui: { title: "Landing Zone Builder — design", search: "Search accounts, OUs, guardrails…", buttons: ["Design", "Generate", "Apply"] },
    groups: ["Accounts", "Guardrails", "Baseline"], center: "landing-zone",
  },
  "cloud-audit": {
    title: "Cloud Audit & Evidence", tagline: "Controls monitored continuously. Evidence on demand.",
    ui: { title: "Cloud Audit & Evidence — control monitor", search: "Search controls, regimes, evidence…", buttons: ["Controls", "Evidence", "Report"] },
    groups: ["Policies", "Controls", "Evidence"], center: "audit",
  },
  "whale-ai": {
    title: "Whale AI — including offline", tagline: "AI in every family. Inside the perimeter.",
    ui: { title: "Whale AI — ask anything about your estate", search: "Why did Frankfurt spend rise 18% this month?", buttons: ["Spark", "Tide", "Abyss"] },
    groups: ["Operations", "Documentation", "Compliance"], center: "whale-ai",
  },
  tenancy: {
    title: "Tenancy & Monetization", tagline: "Revenue per tenant, on capacity you own.",
    ui: { title: "Tenancy — operator services", search: "Search tenants, catalogs, meters…", buttons: ["Tenants", "Catalog", "Billing"] },
    groups: ["Tenants", "Marketplace", "Metering"], center: "tenancy",
  },
  "sovereign-operations": {
    title: "Sovereign Operations", tagline: "Sovereignty as a property of the architecture.",
    ui: { title: "Sovereign Operations — national estate", search: "Search directorates, zones, classes…", buttons: ["In-country", "Air-gapped", "Edge"] },
    groups: ["Zones", "Directorates", "Edge sites"], center: "sovereign",
    providers: ["GovCloud", "Azure Gov", "GDC", "National", "On-prem", "Air-gapped", "Edge"],
  },

  /* ── industries ─────────────────────────────────────────────── */
  "industry-government": {
    title: "Government", tagline: "Sovereign operations, air-gapped when required.",
    ui: { title: "Government — sovereign estate", search: "Search ministries, zones, classes…", buttons: ["In-country", "Air-gapped", "Audit"] },
    groups: ["Ministries", "Agencies", "Edge sites"], center: "sovereign",
    providers: ["GovCloud", "Azure Gov", "GDC", "National", "On-prem", "Air-gapped", "Edge"],
  },
  "industry-bfsi": {
    title: "BFSI", tagline: "Answer an inspection from a system of record.",
    ui: { title: "BFSI — regulated estate", search: "Search controls, regimes, evidence…", buttons: ["Controls", "Evidence", "Report"] },
    groups: ["Core banking", "Channels", "Analytics"], center: "audit",
  },
  "industry-healthcare": {
    title: "Healthcare", tagline: "Clinical systems governed in-country.",
    ui: { title: "Healthcare — clinical estate", search: "Search clinical systems, PII, regions…", buttons: ["Identity", "Residency", "Audit"] },
    groups: ["Clinical systems", "Research", "Digital health"], center: "identity",
  },
  "industry-regulated-enterprise": {
    title: "Regulated Enterprise", tagline: "Six clouds and the datacenter floor, one estate.",
    ui: { title: "Regulated enterprise — multi-cloud estate", search: "Search estates, policies, findings…", buttons: ["Govern", "Observe", "Bill"] },
    groups: ["Public cloud", "Private", "Hybrid"], center: "platform",
  },
  "industry-saas": {
    title: "SaaS & Digital Native", tagline: "Governed from the first account.",
    ui: { title: "SaaS — multi-cloud, one bill", search: "Search environments, spend, SLOs…", buttons: ["Deploy", "Observe", "Optimize"] },
    groups: ["Production", "Staging", "Data"], center: "whalenomics",
    providers: ["AWS", "Azure", "GCP"],
  },
  "industry-telco": {
    title: "Telco & MSP", tagline: "Operators become cloud providers.",
    ui: { title: "Telco — network & tenant fabric", search: "Search tenants, sites, slices…", buttons: ["Tenants", "Edge", "Billing"] },
    groups: ["Core", "Edge", "Tenants"], center: "tenancy",
    providers: ["AWS", "Azure", "GCP", "VNF/CNF", "5G core", "MEC", "Tenants"],
  },
  "industry-datacenter": {
    title: "Datacenter & Colocation", tagline: "Rent per megawatt becomes revenue per tenant.",
    ui: { title: "Datacenter — racks to tenants", search: "Search racks, power, tenants…", buttons: ["DCIM", "Tenants", "Billing"] },
    groups: ["Racks", "Power & cooling", "Tenants"], center: "datacenter",
    providers: ["AWS", "Azure", "GCP", "Racks", "Power", "Cooling", "Tenants"],
  },
  fabric: {
    title: "BlueWhale Stack Fabric", tagline: "Every datacenter. One fabric.",
    ui: { title: "Fabric — one market, one sovereign cloud", search: "Search operators, regions, policies…", buttons: ["Place", "Meter", "Govern"] },
    groups: ["Tier 1", "Tier 2", "Tier 3"], center: "fabric",
    providers: ["Hyperscale", "National", "Regional", "Edge", "GPU", "Sovereign", "Tenants"],
  },

  /* ── editions ───────────────────────────────────────────────── */
  "edition-standard": {
    title: "Standard Edition", tagline: "Governed cloud for a single estate.",
    ui: { title: "Standard — one estate, three clouds", search: "Search accounts, resources, budgets…", buttons: ["Inventory", "Catalog", "Cost"] },
    groups: ["AWS", "Azure", "GCP"], center: "standard",
    providers: ["AWS", "Azure", "GCP", "SaaS", "BYOC"],
  },
  "edition-enterprise": {
    title: "Enterprise Edition", tagline: "Every estate answerable from one console.",
    ui: { title: "Enterprise — all nine families, every estate", search: "Search estates, controls, waves, bills…", buttons: ["Govern", "Migrate", "Audit"] },
    groups: ["Public cloud", "Private & virtual", "Hybrid & edge"], center: "enterprise",
  },
  "edition-telco-datacenter": {
    title: "Telco & Datacenter Edition", tagline: "Operators become cloud providers.",
    ui: { title: "Telco & Datacenter — operator platform", search: "Search tenants, racks, slices, meters…", buttons: ["Tenants", "DCIM", "Billing"] },
    groups: ["Network fabric", "Racks & power", "Tenants"], center: "telco",
    providers: ["AWS", "Azure", "GCP", "VNF/CNF", "MEC", "Racks", "Tenants"],
  },
  "edition-government": {
    title: "Government Edition", tagline: "Sovereignty demonstrated by the architecture.",
    ui: { title: "Government — air-gapped sovereign estate", search: "Search directorates, classes, evidence…", buttons: ["In-country", "Air-gapped", "PAM"] },
    groups: ["Directorates", "Air-gapped class", "Edge sites"], center: "government",
    providers: ["GovCloud", "Azure Gov", "GDC", "National", "On-prem", "Air-gapped", "Edge"],
  },

  /* ── solutions ──────────────────────────────────────────────── */
  "solution-unified-cloud-inventory": {
    title: "Unified Cloud Inventory", tagline: "Six clouds and on-prem, one live map.",
    ui: { title: "Inventory — every resource, one map", search: "Search 4,821 resources across 212 workloads…", buttons: ["Workloads", "Owners", "Export"] },
    groups: ["Discover", "Group by workload", "Act & export"], center: "sol-inventory",
  },
  "solution-ai-native-provisioning": {
    title: "AI-Native Provisioning", tagline: "Approved resources, right-sized, no consoles.",
    ui: { title: "Service Catalog — request with Whale AI sizing", search: "Request EC2 · S3 · RDS · VPC · EFS…", buttons: ["Request", "Approve", "Provision"] },
    groups: ["Catalog", "Whale AI sizing", "Approved & live"], center: "sol-provisioning",
  },
  "solution-bundled-observability": {
    title: "Bundled Observability", tagline: "Logs, metrics, traces and SLOs — in the licence.",
    ui: { title: "Observe — SLOs and burn rate", search: "Search services, SLOs, traces, alerts…", buttons: ["Metrics", "Traces", "Incidents"] },
    groups: ["Ingest", "SLOs", "Incidents"], center: "sol-observe",
  },
  "solution-cloud-migration": {
    title: "Cloud Migration", tagline: "Scored, sequenced, rehearsed.",
    ui: { title: "Migration — 6R assessment and waves", search: "Search 410 workloads, 6 waves, 17 blockers…", buttons: ["Assess", "Waves", "Rollback"] },
    groups: ["On-prem estate", "6R assessment", "Target clouds"], center: "sol-migration",
  },
  "solution-security-compliance": {
    title: "Security & Compliance", tagline: "One identity fabric. One audit trail.",
    ui: { title: "Security — identity, controls, evidence", search: "Search users, controls, findings, regimes…", buttons: ["Federate", "Controls", "Evidence"] },
    groups: ["Identity fabric", "Controls", "Evidence"], center: "sol-security",
  },
  "solution-sovereign-cloud": {
    title: "Sovereign Cloud", tagline: "In-country. Air-gapped. In-region AI.",
    ui: { title: "Sovereign — in-country control plane", search: "Search zones, classes, residency, updates…", buttons: ["Residency", "Air-gapped", "Offline AI"] },
    groups: ["In-country", "Air-gapped class", "In-region AI"], center: "sol-sovereign",
    providers: ["GovCloud", "Azure Gov", "GDC", "National", "BYOC", "On-prem", "Air-gapped"],
  },
};

/** Keys whose scene is captured to a static image. */
export const SCENE_KEYS = Object.keys(SCENES);
