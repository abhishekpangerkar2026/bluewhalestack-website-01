/**
 * /products/whale-ai — every section's copy as the code ships it: the
 * fallback for the CMS "Whale AI page" document and what the seed script
 * loads into it. The module chips in the fabric diagram come from
 * getModules(), not from here.
 */
import type { WhaleAiPage } from "@/content/cms/docs/whaleAiPage";

export const whaleAiPage: WhaleAiPage = {
  seoTitle: "Whale AI — Horizontal Intelligence Layer",
  seoDescription:
    "Whale AI is a horizontal intelligence layer woven into every module of BlueWhale Stack — grounded in your live data, reasoning over your real estate, and acting within your governance boundaries.",
  hero: {
    primary: {
      label: "See it on your estate",
      href: "/contact?intent=demo",
      note: "45 minutes · one account connected read-only · ask it about your own bill",
    },
    secondary: { label: "Module page and FAQ", href: "/modules/whale-ai" },
    stats: [
      { value: "50+", label: "Production use cases" },
      { value: "10", label: "Capability categories" },
      { value: "3", label: "Intelligence tiers" },
      { value: "<3s", label: "Avg. response (Spark)" },
    ],
  },
  what: {
    heading: {
      eyebrow: "What is Whale AI",
      title: "Questions about your resources, your spend and your incidents",
      description:
        "Whale AI answers about the estate you have connected — pulled live at question time, scoped to your tenant and your permissions.",
    },
    points: [
      {
        title: "A layer every module feeds",
        body: "Whale AI runs across every module rather than beside them. Each module contributes grounding data: Whalenomics feeds live cost facts, Inventory feeds resource state, ITSM feeds open incidents, the scanner feeds security findings — and the assistant drawer on each screen already knows what you are looking at.",
      },
      {
        title: "Grounded before it reasons",
        body: "Every use case declares its data dependencies. Before generating a response, the grounding layer queries the live database, appends your real tenant rows to the context window, and only then reasons over them — so the numbers in an answer are the platform's numbers, and the answer cites where each one came from.",
      },
    ],
    fabricTitle: "Whale AI Fabric",
    fabricSubtitleBefore: "One intelligence layer across all",
    fabricSubtitleAfter: "modules",
    groundingKicker: "Grounding providers",
    grounding: [
      "resource_inventory",
      "cost_summary",
      "cost_recommendations",
      "scanner_findings",
      "open_incidents",
      "tenant_metadata",
    ],
  },
  tiers: {
    heading: {
      eyebrow: "Intelligence Tiers",
      title: "Right model for every task",
      description:
        "Whale AI automatically routes each use case to the appropriate tier — balancing depth of reasoning with response speed and cost.",
    },
    items: [
      {
        key: "abyss",
        name: "Whale-Abyss",
        badge: "Flagship",
        tagline: "For the hardest problems that require multi-step analysis",
        accentColor: "#4f46e5",
        topGrad: "#002ca0",
        features: [
          "Executive monthly cost narratives with trend analysis",
          "Security root cause analysis across multi-cloud",
          "Architecture review and risk assessment",
          "Complex incident post-mortem generation",
          "Compliance gap analysis against frameworks",
          "Business case generation for cloud investment",
        ],
        tags: ["exec-monthly-report", "security-rca", "architecture-review"],
      },
      {
        key: "tide",
        name: "Whale-Tide",
        badge: "Balanced",
        tagline: "The daily workhorse for operational intelligence",
        accentColor: "#0284c7",
        topGrad: "#5f82f7",
        features: [
          "Cost optimization recommendations per account",
          "Capacity planning and right-sizing analysis",
          "Incident triage and prioritization guidance",
          "IaC template review and security checks",
          "Multi-cloud resource inventory analysis",
          "Change request risk assessment",
        ],
        tags: ["cost-optimization", "capacity-planning", "iac-review"],
      },
      {
        key: "spark",
        name: "Whale-Spark",
        badge: "Fast",
        tagline: "Instant answers for interactive, conversational use",
        accentColor: "#d97706",
        topGrad: "#b9cafb",
        features: [
          "Ask Whale drawer — context-aware per resource",
          "Quick resource summaries and state checks",
          "Tag compliance spot-checks",
          "Runbook lookups and step-by-step guidance",
          "Alert explanation and next-action suggestion",
          "Dashboard metric interpretation",
        ],
        tags: ["resource-chat", "alert-explain", "runbook-lookup"],
      },
    ],
  },
  categories: {
    heading: {
      eyebrow: "Use Case Catalog",
      title: "50+ production-ready use cases",
      description:
        "Every use case ships with a hardened system prompt, declared data dependencies, pre-configured intelligence tier, and grounding providers — ready to use from day one.",
    },
    items: [
      { icon: "Wallet", name: "FinOps & Cost", count: 12 },
      { icon: "ShieldCheck", name: "Security", count: 10 },
      { icon: "Headset", name: "ITSM & Incidents", count: 8 },
      { icon: "Cloud", name: "Cloud Operations", count: 8 },
      { icon: "Server", name: "Infrastructure", count: 6 },
      { icon: "Activity", name: "Observability", count: 5 },
      { icon: "TrendingUp", name: "Executive Intelligence", count: 4 },
      { icon: "MoveRight", name: "Migration", count: 3 },
      { icon: "ScrollText", name: "Governance", count: 4 },
      { icon: "Gauge", name: "Performance", count: 3 },
    ],
    featured: [
      {
        heading: "Featured FinOps",
        items: [
          "Executive Monthly Cost Report",
          "Cost Optimization Recommendations",
          "Spend Narrative Generator",
          "Anomaly Explanation & Root Cause",
          "Budget Forecast & Variance Analysis",
        ],
      },
      {
        heading: "Featured Security",
        items: [
          "Security RCA — Root Cause Analysis",
          "Compliance Gap Assessment",
          "IAM Posture Review",
          "Network Exposure Analysis",
          "Remediation Playbook Generator",
        ],
      },
      {
        heading: "Featured ITSM",
        items: [
          "Incident RCA Generator",
          "Change Risk Assessor",
          "Post-Mortem Writer",
          "Smart Ticket Classifier",
          "Runbook Auto-Generator",
        ],
      },
    ],
  },
  how: {
    heading: {
      eyebrow: "How it works",
      title: "From question to grounded answer",
      description:
        "Four stages, the same for every use case: the question, the live grounding query, tier selection and reasoning, then a streamed, exportable answer.",
    },
    steps: [
      {
        icon: "Eye",
        step: "01",
        title: "User Prompt",
        body: "User asks a question or selects a use case from any module in the platform.",
      },
      {
        icon: "Plug",
        step: "02",
        title: "Live Grounding",
        body: "Context providers query the live BlueWhale database — cost facts, inventory state, incidents, security findings.",
      },
      {
        icon: "Sparkles",
        step: "03",
        title: "AI Reasoning",
        body: "The appropriate intelligence tier reasons over the grounded context with a hardened system prompt.",
      },
      {
        icon: "FileText",
        step: "04",
        title: "Streamed Answer",
        body: "Response streams token-by-token. Export as PDF, Excel, or Markdown in one click.",
      },
    ],
  },
  differentiators: {
    heading: {
      eyebrow: "Key differentiators",
      title: "Four properties you can verify in the product",
      description:
        "Where the data comes from, how tenants are isolated, and what the answer looks like — each one is observable in the console, not a claim.",
    },
    items: [
      {
        icon: "Layers",
        title: "Built into every module",
        body: "Every module exposes its data as a grounding provider, and every screen has an Ask Whale entry point — so the AI reads everything the platform knows about your estate, from the screen you are on.",
      },
      {
        icon: "DatabaseBackup",
        title: "Grounded in your live data, with citations",
        body: "Every use case declares the providers it reads. Before the model answers, the grounding layer queries the live database — resource_inventory, cost_summary, cost_recommendations, scanner_findings, open_incidents, tenant_metadata — and appends your tenant's real rows to the context. Numbers come from the platform, and the answer cites them.",
      },
      {
        icon: "Lock",
        title: "Enterprise security model",
        body: "Every AI call is scoped to the authenticated tenant, and tenant isolation is enforced at the database layer with Postgres row-level security. Spend caps are enforced per tenant, and conversations are persisted in your data-residency region.",
      },
      {
        icon: "Zap",
        title: "Streaming with instant feedback",
        body: "Responses stream token-by-token — no waiting for a blank screen to fill. Stop mid-stream, copy answers, rate quality, and export to PDF or Excel in one click. The feedback loop continuously improves answer quality.",
      },
    ],
  },
  comparison: {
    heading: {
      eyebrow: "Compared by category",
      title: "Whale AI against the three usual alternatives",
      description:
        "A general-purpose assistant, an APM vendor's AI and an ITSM vendor's AI each ground in one slice of the estate. The comparison is by category, based on public documentation as of September 2026.",
    },
    firstColumn: "Capability",
    columns: ["Whale AI", "General-purpose assistant", "APM-native AI", "ITSM-native AI"],
    rows: [
      { cells: ["Grounded in live cost data", "✓ Real-time", "✗ Training cutoff", "⊘ APM only", "✗"] },
      { cells: ["Native platform integration", "✓ All modules", "✗ External", "⊘ APM only", "⊘ ITSM only"] },
      { cells: ["Multi-cloud inventory awareness", "✓ 6 clouds + on-prem", "✗", "⊘ Limited", "✗"] },
      { cells: ["Streaming token-by-token", "✓", "✓", "✗", "✗"] },
      { cells: ["Exportable reports (PDF / Excel)", "✓ Built-in", "✗ Manual", "⊘ Dashboard", "⊘ ITSM only"] },
      { cells: ["Usage metering & spend caps", "✓ Per-tenant", "✗", "✗", "✗"] },
      { cells: ["FinOps-specific use cases", "✓ 12 use cases", "⊘ Generic", "✗", "✗"] },
    ],
  },
  closing: {
    eyebrow: "Next step",
    title: "Ask Whale AI about your own bill.",
    body: "In a 45-minute working session we connect one of your accounts read-only and put a real question to Whale AI — why a cost line rose, what a finding means, which instances to rightsize — and you see the grounding and the citations behind the answer.",
    primary: {
      label: "Book a working session",
      href: "/contact?intent=demo",
      note: "45 minutes · read-only credentials · your data stays in your region",
    },
    secondary: {
      label: "Start the 90-day prototype",
      href: "/platform#prototype",
      note: "One AI use case on your estate is part of the prototype scope.",
    },
    tertiary: { label: "Whale AI module page", href: "/modules/whale-ai", note: "capabilities, tiers and FAQ" },
  },
};
