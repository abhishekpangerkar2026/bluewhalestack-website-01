/**
 * Declarative architecture-diagram specs. Rendered by
 * components/diagrams/ArchitectureDiagram.tsx as code-based SVG/HTML.
 *
 * Two diagram kinds:
 *  - "stack" — layered top→bottom (sources → control plane → data → experience)
 *  - "flow"  — left→right steps (a data/process flow)
 */

import { industries } from "./industries";
import { modulesBySlug } from "./modules";

export type ArchTone =
  | "source"
  | "plane"
  | "data"
  | "experience"
  | "ai";

export interface ArchNode {
  label: string;
  sub?: string;
  icon?: string;
}
export interface ArchLayer {
  title: string;
  tone?: ArchTone;
  nodes: ArchNode[];
  highlight?: boolean;
}
export type ArchDiagram =
  | { kind: "stack"; caption?: string; layers: ArchLayer[] }
  | { kind: "flow"; caption?: string; steps: ArchNode[] };

export const diagrams: Record<string, ArchDiagram> = {
  // ── Overall platform ──────────────────────────────────────────
  platform: {
    kind: "stack",
    caption:
      "One control plane connects every cloud and data center, governs centrally, and serves a single experience.",
    layers: [
      {
        title: "Your clouds, hypervisors & data centers",
        tone: "source",
        nodes: [
          { label: "AWS", icon: "Cloud" },
          { label: "Azure", icon: "Cloud" },
          { label: "Google Cloud", icon: "Cloud" },
          { label: "Oracle · IBM · Alibaba", icon: "Cloud" },
          { label: "VMware · Hyper-V · On-prem", icon: "Server" },
          { label: "Edge agents (Go · outbound HTTPS)", icon: "HardDrive" },
        ],
      },
      {
        title: "Control plane · api-gateway (NestJS)",
        tone: "plane",
        highlight: true,
        nodes: [
          { label: "Inventory (URM)", icon: "Boxes" },
          { label: "Provisioning", icon: "PackagePlus" },
          { label: "FinOps", icon: "Wallet" },
          { label: "Security & Compliance", icon: "ShieldCheck" },
          { label: "ITSM", icon: "Headset" },
          { label: "Observe", icon: "Activity" },
          { label: "Migration", icon: "MoveRight" },
          { label: "Landing Zone", icon: "LayoutTemplate" },
          { label: "Whale AI", icon: "Sparkles" },
        ],
      },
      {
        title: "Data & workflow tier",
        tone: "data",
        nodes: [
          { label: "Postgres (RLS · Drizzle)", icon: "Boxes" },
          { label: "Redis", icon: "Boxes" },
          { label: "Meilisearch", icon: "Eye" },
          { label: "Queue-driven workers", icon: "Workflow" },
        ],
      },
      {
        title: "Experience",
        tone: "experience",
        nodes: [
          { label: "Web portal (Next.js)", icon: "LayoutTemplate" },
          { label: "REST & tRPC APIs", icon: "ScrollText" },
          { label: "Whale AI assistant", icon: "Sparkles" },
        ],
      },
    ],
  },

  // ── FinOps allocation flow ────────────────────────────────────
  finops: {
    kind: "flow",
    caption:
      "Billing flows in from every cloud, Whale AI finds waste and anomalies, costs are allocated per business unit, and budgets are forecast.",
    steps: [
      { label: "Ingest billing", sub: "All clouds, normalized", icon: "Wallet" },
      { label: "Analyze & detect", sub: "Whale AI finds waste & anomalies", icon: "Sparkles" },
      { label: "Rightsize & optimize", sub: "Idle, oversized, storage tiers", icon: "TrendingDown" },
      { label: "Allocate & chargeback", sub: "Per team · project · BU", icon: "Percent" },
      { label: "Forecast & alert", sub: "Budgets & predictions", icon: "Activity" },
    ],
  },

  // ── Migration wave factory ────────────────────────────────────
  migration: {
    kind: "flow",
    caption:
      "Agentless discovery scores readiness, dependencies are grouped into waves, workloads replicate continuously, and every cut-over is validated before and after.",
    steps: [
      { label: "Discover & assess", sub: "Agentless, readiness score", icon: "Eye" },
      { label: "Plan waves", sub: "Dependency-grouped batches", icon: "Layers" },
      { label: "Replicate", sub: "Continuous, RPO < 1hr", icon: "DatabaseBackup" },
      { label: "Cut-over & validate", sub: "Automated pre/post checks", icon: "FileCheck" },
      { label: "Optimize", sub: "Rightsize on the new estate", icon: "Gauge" },
    ],
  },

  // ── Security & compliance (layered defense) ───────────────────
  security: {
    kind: "stack",
    caption:
      "Findings stream in from every cloud, are scored and prioritized, governed by one policy & compliance engine, and exported as tamper-evident audit evidence.",
    layers: [
      {
        title: "Estate under management",
        tone: "source",
        nodes: [
          { label: "AWS · Azure · GCP", icon: "Cloud" },
          { label: "Private cloud & VMware", icon: "Server" },
          { label: "Identities & secrets", icon: "KeyRound" },
        ],
      },
      {
        title: "Detect & prioritize",
        tone: "data",
        nodes: [
          { label: "CSPM scanning (Prowler)", icon: "Eye" },
          { label: "Vulnerability mgmt", icon: "ShieldAlert" },
          { label: "Zero-trust access checks", icon: "KeyRound" },
        ],
      },
      {
        title: "Policy & compliance engine",
        tone: "plane",
        highlight: true,
        nodes: [
          { label: "Policy-as-code guardrails", icon: "ScrollText" },
          { label: "CIS · NIST · ISO 27001 · HIPAA", icon: "FileCheck" },
          { label: "Continuous remediation", icon: "ShieldCheck" },
        ],
      },
      {
        title: "Evidence & assurance",
        tone: "experience",
        nodes: [
          { label: "Tamper-evident audit trail", icon: "ScrollText" },
          { label: "Compliance score & reports", icon: "FileCheck" },
          { label: "Privileged session records", icon: "Eye" },
        ],
      },
    ],
  },

  // ── Datacenter operations (DCIM + edge) ───────────────────────
  datacenter: {
    kind: "stack",
    caption:
      "Edge agents stream power, thermal and hardware telemetry from the floor into one DCIM control plane — with capacity forecasting and predictive ops on top.",
    layers: [
      {
        title: "Physical infrastructure",
        tone: "source",
        nodes: [
          { label: "Sites · rooms · rows · racks", icon: "Building2" },
          { label: "Servers & bare metal", icon: "Server" },
          { label: "Power & cooling", icon: "Zap" },
        ],
      },
      {
        title: "Edge collection (mTLS)",
        tone: "data",
        nodes: [
          { label: "Redfish · IPMI · SNMP agents", icon: "Plug" },
          { label: "BMC bridge", icon: "HardDrive" },
          { label: "PUE / WUE telemetry", icon: "Gauge" },
        ],
      },
      {
        title: "DCIM control plane",
        tone: "plane",
        highlight: true,
        nodes: [
          { label: "Unified inventory & hierarchy", icon: "Boxes" },
          { label: "Bare-metal lifecycle", icon: "HardDrive" },
          { label: "Backup & DR runbooks", icon: "DatabaseBackup" },
        ],
      },
      {
        title: "Plan & predict",
        tone: "ai",
        nodes: [
          { label: "Capacity forecasting", icon: "Gauge" },
          { label: "Predictive Ops (Whale AI)", icon: "Sparkles" },
          { label: "Efficiency analytics", icon: "Activity" },
        ],
      },
    ],
  },

  // ── Automation & DevOps pipeline ──────────────────────────────
  automation: {
    kind: "flow",
    caption:
      "Events, schedules and tickets trigger durably-orchestrated workflows that execute changes, validate the result, and close the loop back into ITSM.",
    steps: [
      { label: "Trigger", sub: "Event · schedule · ticket", icon: "Zap" },
      { label: "Orchestrate", sub: "Durable saga (WhaleFlow)", icon: "Workflow" },
      { label: "Execute", sub: "Provision & remediate", icon: "PackagePlus" },
      { label: "Validate", sub: "Policy & health checks", icon: "FileCheck" },
      { label: "Close in ITSM", sub: "Auto-update the ticket", icon: "Headset" },
    ],
  },

  // ── Edition: Standard (SaaS, single region) ───────────────────
  "edition-standard": {
    kind: "stack",
    caption:
      "A multi-tenant SaaS control plane in Singapore over your AWS, Azure and GCP accounts — see, secure and govern without the enterprise sprawl.",
    layers: [
      {
        title: "Your public clouds (single region)",
        tone: "source",
        nodes: [
          { label: "AWS", icon: "Cloud" },
          { label: "Azure", icon: "Cloud" },
          { label: "Google Cloud", icon: "Cloud" },
        ],
      },
      {
        title: "Standard SaaS control plane",
        tone: "plane",
        highlight: true,
        nodes: [
          { label: "Inventory & URM", icon: "Boxes" },
          { label: "Provisioning", icon: "PackagePlus" },
          { label: "Security (CSPM)", icon: "ShieldCheck" },
          { label: "ITSM-lite", icon: "Headset" },
          { label: "Whale AI · Spark", icon: "Sparkles" },
        ],
      },
      {
        title: "Data tier",
        tone: "data",
        nodes: [
          { label: "Postgres (RLS)", icon: "Boxes" },
          { label: "Redis", icon: "Boxes" },
        ],
      },
      {
        title: "Experience",
        tone: "experience",
        nodes: [
          { label: "Web portal", icon: "LayoutTemplate" },
          { label: "REST API", icon: "ScrollText" },
        ],
      },
    ],
  },

  // ── Edition: Enterprise (full, multi-region) ──────────────────
  "edition-enterprise": {
    kind: "stack",
    caption:
      "The full platform across every cloud and region — available as SaaS, customer-hosted BYOC, or air-gapped Sovereign.",
    layers: [
      {
        title: "Every cloud, region & data center",
        tone: "source",
        nodes: [
          { label: "AWS · Azure · GCP", icon: "Cloud" },
          { label: "Oracle · IBM · Alibaba", icon: "Cloud" },
          { label: "VMware · On-prem", icon: "Server" },
        ],
      },
      {
        title: "Enterprise control plane",
        tone: "plane",
        highlight: true,
        nodes: [
          { label: "Inventory", icon: "Boxes" },
          { label: "Provisioning", icon: "PackagePlus" },
          { label: "FinOps", icon: "Wallet" },
          { label: "Security", icon: "ShieldCheck" },
          { label: "ITSM", icon: "Headset" },
          { label: "Observe", icon: "Activity" },
          { label: "Migration", icon: "MoveRight" },
          { label: "Landing Zone", icon: "LayoutTemplate" },
          { label: "Whale AI · Abyss", icon: "Sparkles" },
        ],
      },
      {
        title: "Data & workflow tier",
        tone: "data",
        nodes: [
          { label: "Postgres (RLS · Drizzle)", icon: "Boxes" },
          { label: "Redis", icon: "Boxes" },
          { label: "Meilisearch", icon: "Eye" },
          { label: "Queue-driven workers", icon: "Workflow" },
        ],
      },
      {
        title: "Experience",
        tone: "experience",
        nodes: [
          { label: "Web portal", icon: "LayoutTemplate" },
          { label: "REST & tRPC APIs", icon: "ScrollText" },
          { label: "Whale AI assistant", icon: "Sparkles" },
        ],
      },
    ],
  },

  // ── Edition: Datacenter (operator fleet) ──────────────────────
  "edition-datacenter": {
    kind: "stack",
    caption:
      "An operator control plane over a multi-facility fleet — DCIM and bare metal on the floor, white-label managed cloud and per-tenant billing on top.",
    layers: [
      {
        title: "Multi-facility fleet",
        tone: "source",
        nodes: [
          { label: "Sites · racks · servers", icon: "Building2" },
          { label: "Bare metal pool", icon: "HardDrive" },
          { label: "Public clouds", icon: "Cloud" },
        ],
      },
      {
        title: "Edge collection (mTLS)",
        tone: "data",
        nodes: [
          { label: "Redfish · IPMI · SNMP agents", icon: "Plug" },
          { label: "Power & thermal telemetry", icon: "Gauge" },
        ],
      },
      {
        title: "Operator control plane",
        tone: "plane",
        highlight: true,
        nodes: [
          { label: "DCIM", icon: "Server" },
          { label: "Bare-metal lifecycle", icon: "HardDrive" },
          { label: "Capacity planning", icon: "Gauge" },
          { label: "Cross-DC migration", icon: "MoveRight" },
          { label: "Per-tenant billing", icon: "CreditCard" },
          { label: "Predictive Ops", icon: "Sparkles" },
        ],
      },
      {
        title: "Experience",
        tone: "experience",
        nodes: [
          { label: "Operator portal", icon: "LayoutTemplate" },
          { label: "White-label tenant portals", icon: "Users" },
        ],
      },
    ],
  },

  // ── Edition: Government (sovereign, air-gapped) ───────────────
  "edition-government": {
    kind: "stack",
    caption:
      "An air-gapped sovereign deployment inside national borders — in-region AI, no call-home, and centralized governance across ministries.",
    layers: [
      {
        title: "In-country infrastructure",
        tone: "source",
        nodes: [
          { label: "Sovereign region", icon: "Landmark" },
          { label: "On-prem & air-gapped", icon: "Server" },
        ],
      },
      {
        title: "Sovereign control plane",
        tone: "plane",
        highlight: true,
        nodes: [
          { label: "Identity & RBAC", icon: "KeyRound" },
          { label: "Inventory", icon: "Boxes" },
          { label: "Security & Compliance", icon: "ShieldCheck" },
          { label: "Migration", icon: "MoveRight" },
          { label: "Landing Zone", icon: "LayoutTemplate" },
          { label: "Whale AI · in-region", icon: "Sparkles" },
        ],
      },
      {
        title: "Residency & assurance",
        tone: "data",
        nodes: [
          { label: "Data-residency enforcement", icon: "Landmark" },
          { label: "No call-home", icon: "ShieldCheck" },
          { label: "Sovereign audit trail", icon: "ScrollText" },
        ],
      },
      {
        title: "Experience",
        tone: "experience",
        nodes: [
          { label: "Inter-agency portal", icon: "LayoutTemplate" },
          { label: "Audit-ready reporting", icon: "FileCheck" },
        ],
      },
    ],
  },

  // ── Edition: Telco & MSP (multi-tenant) ───────────────────────
  "edition-telco": {
    kind: "stack",
    caption:
      "A multi-tenant control plane with enterprise isolation — launch branded, white-label cloud services with tenant-level billing and governance.",
    layers: [
      {
        title: "Underlying infrastructure",
        tone: "source",
        nodes: [
          { label: "Public clouds", icon: "Cloud" },
          { label: "Operator infrastructure", icon: "Server" },
        ],
      },
      {
        title: "Multi-tenant control plane",
        tone: "plane",
        highlight: true,
        nodes: [
          { label: "Tenant isolation", icon: "Layers" },
          { label: "Provisioning & catalog", icon: "PackagePlus" },
          { label: "FinOps & billing", icon: "Wallet" },
          { label: "Security & Compliance", icon: "ShieldCheck" },
          { label: "Whale AI · Tide", icon: "Sparkles" },
        ],
      },
      {
        title: "Data tier (per-tenant RLS)",
        tone: "data",
        nodes: [
          { label: "Postgres (RLS per tenant)", icon: "Boxes" },
          { label: "Meilisearch (faceted search)", icon: "Eye" },
        ],
      },
      {
        title: "Experience",
        tone: "experience",
        nodes: [
          { label: "White-label portals", icon: "LayoutTemplate" },
          { label: "Branded catalogs", icon: "Users" },
          { label: "Tenant billing & invoicing", icon: "CreditCard" },
        ],
      },
    ],
  },

  // ── Sovereign cloud (air-gapped) ──────────────────────────────
  sovereign: {
    kind: "stack",
    caption:
      "Deployed inside national borders — an air-gapped control plane enforces data residency, runs in-region AI, and proves sovereignty on demand.",
    layers: [
      {
        title: "In-country infrastructure",
        tone: "source",
        nodes: [
          { label: "National / sovereign region", icon: "Landmark" },
          { label: "On-prem & air-gapped", icon: "Server" },
          { label: "Apsara · Huawei Cloud Stack", icon: "Cloud" },
        ],
      },
      {
        title: "Sovereign control plane",
        tone: "plane",
        highlight: true,
        nodes: [
          { label: "Air-gapped deployment", icon: "ShieldCheck" },
          { label: "In-country key custody", icon: "KeyRound" },
          { label: "Landing-zone governance", icon: "LayoutTemplate" },
        ],
      },
      {
        title: "Residency & sovereignty controls",
        tone: "data",
        nodes: [
          { label: "Geo data-residency enforcement", icon: "Landmark" },
          { label: "Operator-access boundaries", icon: "ShieldCheck" },
          { label: "Attestation & evidence", icon: "FileCheck" },
        ],
      },
      {
        title: "In-region intelligence & audit",
        tone: "ai",
        nodes: [
          { label: "In-region AI models", icon: "Sparkles" },
          { label: "Sovereign audit trail", icon: "ScrollText" },
        ],
      },
    ],
  },

  // ── Cross-industry overview ────────────────────────────────────
  // Seven different regulatory realities, one control plane, seven
  // governed outcomes. Nodes are generated from content/industries.ts
  // and content/modules.ts so this stays in sync automatically.
  "industries-overview": {
    kind: "stack",
    caption:
      "Every sector brings a different regulatory reality — the same BlueWhale Stack control plane governs all of them, and each comes out the other side compliant, audited and in-region.",
    layers: [
      {
        title: "Seven industries, seven realities",
        tone: "source",
        nodes: industries.map((i) => ({
          label: i.name,
          sub: i.kpis[0]?.value,
          icon: i.icon,
        })),
      },
      {
        title: "One BlueWhale Stack control plane",
        tone: "plane",
        highlight: true,
        nodes: [
          "inventory",
          "identity",
          "provisioning",
          "itsm",
          "observe",
          "finops",
          "whale-ai",
        ].map((slug) => ({
          label: modulesBySlug[slug].name,
          icon: modulesBySlug[slug].icon,
        })),
      },
      {
        title: "Governed outcomes, per industry",
        tone: "experience",
        nodes: industries.map((i) => ({
          label: i.name,
          sub: i.outcome,
          icon: i.icon,
        })),
      },
    ],
  },

  // ══ Industry reference architectures ══════════════════════════
  // Grounded in the real platform: Next.js web → NestJS api-gateway
  // → Postgres (RLS) / Redis / Meilisearch → workers + AWS/Azure/GCP
  // connectors + Go edge agent + Prowler scanner.

  "industry-government": {
    kind: "stack",
    caption:
      "Air-gapped sovereign deployment: directories and on-prem estate feed one control plane, governed by Whale IAM + PAM with a tamper-evident audit chain.",
    layers: [
      {
        title: "In-country infrastructure & directories",
        tone: "source",
        nodes: [
          { label: "Sovereign region (air-gapped)", icon: "Landmark" },
          { label: "On-prem via Edge Agent", icon: "Plug" },
          { label: "Entra ID · AD · Keycloak", icon: "KeyRound" },
        ],
      },
      {
        title: "Sovereign control plane · api-gateway (NestJS)",
        tone: "plane",
        highlight: true,
        nodes: [
          { label: "Whale IAM + PAM", icon: "ShieldCheck" },
          { label: "Inventory (URM)", icon: "Boxes" },
          { label: "Security (CIS · DPDP)", icon: "Eye" },
          { label: "Landing Zone (GovCloud)", icon: "LayoutTemplate" },
          { label: "ITSM + CAB approvals", icon: "Headset" },
          { label: "Whale AI · in-region", icon: "Sparkles" },
        ],
      },
      {
        title: "Governed data tier",
        tone: "data",
        nodes: [
          { label: "Postgres (row-level security)", icon: "Boxes" },
          { label: "Tamper-evident audit (SHA-256 chain)", icon: "ScrollText" },
          { label: "Meilisearch", icon: "Eye" },
        ],
      },
      {
        title: "Assurance & inter-agency delivery",
        tone: "experience",
        nodes: [
          { label: "Centralized multi-ministry governance", icon: "Landmark" },
          { label: "Audit-verify endpoint", icon: "FileCheck" },
          { label: "SOC 2 CC6 evidence", icon: "ShieldCheck" },
        ],
      },
    ],
  },

  "industry-telco": {
    kind: "stack",
    caption:
      "Multi-tenant white-label operations: one control plane with per-tenant row-level isolation, a branded Partner Portal, provisioning catalog, and billing passthrough.",
    layers: [
      {
        title: "Operator & cloud infrastructure",
        tone: "source",
        nodes: [
          { label: "Public clouds (AWS · Azure · GCP)", icon: "Cloud" },
          { label: "Operator data centers", icon: "Server" },
          { label: "Edge & distributed sites", icon: "Plug" },
        ],
      },
      {
        title: "Multi-tenant control plane · api-gateway",
        tone: "plane",
        highlight: true,
        nodes: [
          { label: "Partner Portal (white-label)", icon: "Handshake" },
          { label: "Provisioning catalog (100+)", icon: "PackagePlus" },
          { label: "Whalenomics billing", icon: "Wallet" },
          { label: "Whale IAM + PAM", icon: "ShieldCheck" },
          { label: "ITSM + SLA tracking", icon: "Headset" },
        ],
      },
      {
        title: "Tenant-isolated data tier",
        tone: "data",
        nodes: [
          { label: "Postgres RLS (per-tenant)", icon: "Boxes" },
          { label: "Meilisearch (millions of resources)", icon: "Eye" },
          { label: "Redis", icon: "Boxes" },
        ],
      },
      {
        title: "Branded, monetized delivery",
        tone: "experience",
        nodes: [
          { label: "White-label tenant portals", icon: "Users" },
          { label: "Billing passthrough (Stripe)", icon: "CreditCard" },
          { label: "Per-tenant SLA & usage", icon: "Activity" },
        ],
      },
    ],
  },

  "industry-bfsi": {
    kind: "stack",
    caption:
      "Regulated, audit-ready operations: every privileged action passes Whale PAM approval gates and lands in a tamper-evident chain, with FinOps chargeback for the CFO.",
    layers: [
      {
        title: "Estate & identity",
        tone: "source",
        nodes: [
          { label: "AWS · Azure · GCP", icon: "Cloud" },
          { label: "Core systems on-prem (Edge)", icon: "Plug" },
          { label: "Entra ID · Okta", icon: "KeyRound" },
        ],
      },
      {
        title: "Governed control plane · api-gateway",
        tone: "plane",
        highlight: true,
        nodes: [
          { label: "Whale IAM + PAM (approval gates)", icon: "ShieldCheck" },
          { label: "Whalenomics (cost + chargeback)", icon: "Wallet" },
          { label: "Migration (legacy → cloud)", icon: "MoveRight" },
          { label: "Security (PCI · SOC 2)", icon: "Eye" },
          { label: "Observe", icon: "Activity" },
        ],
      },
      {
        title: "Audit-grade data tier",
        tone: "data",
        nodes: [
          { label: "Postgres (RLS)", icon: "Boxes" },
          { label: "Tamper-evident audit chain", icon: "ScrollText" },
          { label: "Anomaly detection (2.5σ)", icon: "TrendingUp" },
        ],
      },
      {
        title: "Regulatory outcomes",
        tone: "experience",
        nodes: [
          { label: "RBI · MAS · FCA reporting", icon: "FileCheck" },
          { label: "Business-unit chargeback", icon: "Percent" },
          { label: "Audit-ready evidence", icon: "ShieldCheck" },
        ],
      },
    ],
  },

  "industry-healthcare": {
    kind: "stack",
    caption:
      "Data-resident clinical cloud: workloads and audit stay in-region, security is scoped to HIPAA, and every production change is CAB-gated through ITSM + PAM.",
    layers: [
      {
        title: "Clinical estate (in-region)",
        tone: "source",
        nodes: [
          { label: "On-prem clinical systems (Edge)", icon: "Plug" },
          { label: "Mumbai region (DPDP)", icon: "Landmark" },
          { label: "Entra ID · AD", icon: "KeyRound" },
        ],
      },
      {
        title: "Compliant control plane · api-gateway",
        tone: "plane",
        highlight: true,
        nodes: [
          { label: "Security (HIPAA · Prowler)", icon: "Eye" },
          { label: "Whale IAM + PAM", icon: "ShieldCheck" },
          { label: "ITSM change control (CAB)", icon: "Headset" },
          { label: "Inventory (URM)", icon: "Boxes" },
          { label: "Landing Zone", icon: "LayoutTemplate" },
        ],
      },
      {
        title: "Resident data tier",
        tone: "data",
        nodes: [
          { label: "Postgres RLS (in-country)", icon: "Boxes" },
          { label: "Tamper-evident audit chain", icon: "ScrollText" },
          { label: "Backup & DR", icon: "DatabaseBackup" },
        ],
      },
      {
        title: "Compliance outcomes",
        tone: "experience",
        nodes: [
          { label: "100% data residency", icon: "Landmark" },
          { label: "HIPAA / ADHICS evidence", icon: "FileCheck" },
          { label: "CAB-gated changes", icon: "ShieldCheck" },
        ],
      },
    ],
  },

  "industry-manufacturing": {
    kind: "stack",
    caption:
      "Edge-first hybrid: a Go agent on the plant floor discovers OT-adjacent systems over outbound-only HTTPS — credentials never leave site — feeding one multi-plant control plane.",
    layers: [
      {
        title: "Plant floor & cloud",
        tone: "source",
        nodes: [
          { label: "Edge Agent (vSphere · Hyper-V · Nutanix)", icon: "Plug" },
          { label: "OT-adjacent systems", icon: "Factory" },
          { label: "Public clouds", icon: "Cloud" },
        ],
      },
      {
        title: "Multi-plant control plane · api-gateway",
        tone: "plane",
        highlight: true,
        nodes: [
          { label: "Edge orchestration", icon: "Plug" },
          { label: "Migration (ERP → cloud)", icon: "MoveRight" },
          { label: "Landing Zone (hub-spoke)", icon: "LayoutTemplate" },
          { label: "Observe", icon: "Activity" },
          { label: "Inventory (URM)", icon: "Boxes" },
        ],
      },
      {
        title: "Data tier (outbound-only)",
        tone: "data",
        nodes: [
          { label: "Postgres", icon: "Boxes" },
          { label: "Meilisearch", icon: "Eye" },
          { label: "On-prem creds stay on-site", icon: "ShieldCheck" },
        ],
      },
      {
        title: "Plant operations outcomes",
        tone: "experience",
        nodes: [
          { label: "Unified multi-plant view", icon: "Boxes" },
          { label: "Project-based cost visibility", icon: "Wallet" },
          { label: "Self-healing automation", icon: "Workflow" },
        ],
      },
    ],
  },

  "industry-energy": {
    kind: "stack",
    caption:
      "Critical-infrastructure governance: distributed sites and multi-region clouds under Zero-Trust PAM, with FinOps cost + carbon and anomaly detection across the estate.",
    layers: [
      {
        title: "Distributed & multi-region estate",
        tone: "source",
        nodes: [
          { label: "Remote sites (Edge)", icon: "Plug" },
          { label: "Multi-region clouds", icon: "Cloud" },
          { label: "DR region", icon: "DatabaseBackup" },
        ],
      },
      {
        title: "Control plane · api-gateway",
        tone: "plane",
        highlight: true,
        nodes: [
          { label: "Whalenomics (cost + carbon)", icon: "Wallet" },
          { label: "Recommendations engine", icon: "TrendingDown" },
          { label: "Whale IAM + PAM (budget gates)", icon: "ShieldCheck" },
          { label: "Security (NERC-CIP · Zero Trust)", icon: "Eye" },
          { label: "Backup & DR", icon: "DatabaseBackup" },
        ],
      },
      {
        title: "Data & analytics tier",
        tone: "data",
        nodes: [
          { label: "Postgres", icon: "Boxes" },
          { label: "Tamper-evident audit chain", icon: "ScrollText" },
          { label: "Anomaly detection (2.5σ)", icon: "TrendingUp" },
        ],
      },
      {
        title: "Outcomes",
        tone: "experience",
        nodes: [
          { label: "ESG / carbon reporting", icon: "Gauge" },
          { label: "RPO < 1hr · RTO < 4hr", icon: "DatabaseBackup" },
          { label: "Cross-vendor cost reconciliation", icon: "Percent" },
        ],
      },
    ],
  },

  "industry-media": {
    kind: "stack",
    caption:
      "Elastic, multi-region media pipeline: provision render nodes on spot, track every asset across clouds in one inventory, and attribute cost per studio and project.",
    layers: [
      {
        title: "Multi-region clouds & object stores",
        tone: "source",
        nodes: [
          { label: "AWS · Azure · GCP (multi-region)", icon: "Cloud" },
          { label: "S3 · Blob · Cloud Storage", icon: "HardDrive" },
        ],
      },
      {
        title: "Control plane · api-gateway",
        tone: "plane",
        highlight: true,
        nodes: [
          { label: "Provisioning (render nodes · spot)", icon: "PackagePlus" },
          { label: "Inventory (relationship graph)", icon: "Boxes" },
          { label: "Whalenomics (by project · studio)", icon: "Wallet" },
          { label: "Whale AI (asset lineage)", icon: "Sparkles" },
          { label: "Observe", icon: "Activity" },
        ],
      },
      {
        title: "Data tier",
        tone: "data",
        nodes: [
          { label: "Postgres", icon: "Boxes" },
          { label: "Meilisearch (asset search)", icon: "Eye" },
          { label: "Redis", icon: "Boxes" },
        ],
      },
      {
        title: "Delivery outcomes",
        tone: "experience",
        nodes: [
          { label: "Elastic scale for demand peaks", icon: "TrendingUp" },
          { label: "Per-studio cost attribution", icon: "Percent" },
          { label: "24/7 streaming SLA", icon: "Activity" },
        ],
      },
    ],
  },

  "industry-enterprise-saas": {
    kind: "stack",
    caption:
      "Standardized multi-tenant operations: identities sync from your IdP with JIT provisioning, every cloud is governed in one plane, and cost is charged back per department.",
    layers: [
      {
        title: "Clouds & identity providers",
        tone: "source",
        nodes: [
          { label: "AWS · Azure · GCP", icon: "Cloud" },
          { label: "Okta · Auth0 · Entra ID", icon: "KeyRound" },
        ],
      },
      {
        title: "Control plane · api-gateway",
        tone: "plane",
        highlight: true,
        nodes: [
          { label: "Identity sync + JIT (Whale IAM)", icon: "KeyRound" },
          { label: "License & Billing", icon: "CreditCard" },
          { label: "Inventory (URM)", icon: "Boxes" },
          { label: "Whalenomics (chargeback)", icon: "Wallet" },
          { label: "ITSM", icon: "Headset" },
          { label: "Whale AI", icon: "Sparkles" },
        ],
      },
      {
        title: "Multi-tenant data tier",
        tone: "data",
        nodes: [
          { label: "Postgres RLS (per-tenant)", icon: "Boxes" },
          { label: "Meilisearch", icon: "Eye" },
          { label: "Redis", icon: "Boxes" },
        ],
      },
      {
        title: "Operating outcomes",
        tone: "experience",
        nodes: [
          { label: "Per-department chargeback", icon: "Percent" },
          { label: "Standardized service delivery", icon: "PackagePlus" },
          { label: "ITSM-integrated cloud ops", icon: "Workflow" },
        ],
      },
    ],
  },

  // ── BlueWhale Stack Fabric ─────────────────────────────────────
  fabric: {
    kind: "stack",
    caption:
      "One catalog and one identity sit above India's datacenter capacity — placement by policy, per-customer metering, and uniform governance across every underlying facility.",
    layers: [
      {
        title: "Demand — every kind of Indian customer",
        tone: "source",
        nodes: [
          { label: "Enterprise & BFSI", icon: "Building2" },
          { label: "Government & PSUs", icon: "Landmark" },
          { label: "Manufacturing & health", icon: "Factory" },
          { label: "AI / GPU consumers", icon: "Sparkles" },
          { label: "Startups & SMEs", icon: "Rocket" },
        ],
      },
      {
        title: "The Fabric Plane — operated on BlueWhale Stack",
        tone: "plane",
        highlight: true,
        nodes: [
          { label: "Multi-DC Federation", icon: "Network" },
          { label: "Placement Policy Engine", icon: "Workflow" },
          { label: "Whalenomics · FinOps", icon: "Wallet" },
          { label: "Tenant & Partner Program", icon: "Handshake" },
          { label: "White-Label Marketplace", icon: "Layers" },
          { label: "Cloud Audit", icon: "FileCheck" },
        ],
      },
      {
        title: "Indian datacenter capacity, all three tiers",
        tone: "data",
        nodes: [
          { label: "Tier 1 — hyperscale anchors", icon: "Server" },
          { label: "Tier 2 — national & regional", icon: "Building2" },
          { label: "Tier 3 — the long tail", icon: "HardDrive" },
          { label: "Public cloud, kept at the edge", icon: "Cloud" },
        ],
      },
      {
        title: "What the customer gets",
        tone: "experience",
        nodes: [
          { label: "One bill, one contract", icon: "CreditCard" },
          { label: "No lock-in — re-placement is a policy", icon: "RefreshCw" },
          { label: "Sovereign DR across operators", icon: "ShieldCheck" },
          { label: "In-India by construction", icon: "Globe" },
        ],
      },
    ],
  },
};
