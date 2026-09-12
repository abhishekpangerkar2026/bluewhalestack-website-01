import type { Metadata } from "next";
import { ArrowRight, Check } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { ProductScene } from "@/components/scenes/ProductScene";
import { Card } from "@/components/ui/Card";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { ClosingCTA } from "@/components/sections/ClosingCTA";
import { modules } from "@/content/modules";

export const metadata: Metadata = {
  title: "Whale AI — Horizontal Intelligence Layer",
  description:
    "Whale AI is a horizontal intelligence layer woven into every module of BlueWhale Stack — grounded in your live data, reasoning over your real estate, and acting within your governance boundaries.",
};

const STATS = [
  { value: "50+", label: "Production use cases" },
  { value: "10", label: "Capability categories" },
  { value: "3", label: "Intelligence tiers" },
  { value: "<3s", label: "Avg. response (Spark)" },
];

const TIERS = [
  {
    key: "abyss",
    name: "Whale-Abyss",
    badge: "Flagship",
    tagline: "For the hardest problems that require multi-step analysis",
    accentColor: "#4f46e5",
    topGrad: "linear-gradient(90deg,#1e40af,#6366f1)",
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
    topGrad: "linear-gradient(90deg,#0ea5e9,#14b8a6)",
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
    topGrad: "linear-gradient(90deg,#f59e0b,#f97316)",
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
];

const CATEGORIES = [
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
];

const HOW_STEPS = [
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
];

const DIFFERENTIATORS = [
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
];

// The modules Whale AI runs across — the real catalog minus Whale AI itself,
// so this list can never drift from /modules.
const MODULES = modules.filter((m) => m.slug !== "whale-ai");

const GROUNDING = [
  "resource_inventory",
  "cost_summary",
  "cost_recommendations",
  "scanner_findings",
  "open_incidents",
  "tenant_metadata",
];

export default function WhaleAIPage() {
  return (
    <>
      {/* ── Hero: dark brand band ── */}
      <section className="relative overflow-hidden bg-[var(--brand-deep)] text-white">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-32 top-0 h-[500px] w-[500px] rounded-full bg-[#6366f1]/20 blur-[120px]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-20 -left-20 h-[300px] w-[300px] rounded-full bg-[#0ea5e9]/15 blur-[100px]"
        />
        <Container className="relative py-20 sm:py-28">
          <div className="grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="max-w-3xl">
            <div className="mb-5 flex items-center gap-3">
              <span aria-hidden className="h-px w-8 bg-white/40" />
              <span className="eyebrow text-white/80">
                Whale AI · Horizontal intelligence layer
              </span>
            </div>
            <h1 className="display-1 text-white">
              AI that answers from{" "}
              <span className="text-[#a5b4fc]">your live estate</span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/70">
              Whale AI is an intelligence layer inside every module of the platform. Each of its 50+ use cases
              declares the live data it reads — inventory, billing, tickets, findings — and cites it in the answer.
              It runs in three tiers by task complexity, on hosted models, your own model, or fully offline inside
              the perimeter for sovereign estates.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <div>
                <Button href="/contact?intent=demo" size="lg" variant="white">
                  See it on your estate
                  <ArrowRight className="h-4 w-4" />
                </Button>
                <p className="mt-2 text-xs text-white/50">45 minutes · one account connected read-only · ask it about your own bill</p>
              </div>
              <Button
                href="/modules/whale-ai"
                size="lg"
                variant="outline"
                className="border-white/30 text-white hover:border-white hover:bg-white/10 hover:text-white"
              >
                Module page and FAQ
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <ProductScene scene="whale-ai" variant="dark" priority className="mx-auto w-full max-w-[660px]" />
          </div>

          {/* Stats strip */}
          <div className="mt-14 grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-white/15 bg-white/10 sm:grid-cols-4">
            {STATS.map((s) => (
              <div key={s.label} className="px-5 py-4">
                <p className="text-2xl font-bold text-white num">{s.value}</p>
                <p className="mt-0.5 text-xs font-medium text-white/70">{s.label}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ── What is Whale AI ── */}
      <section className="py-20 sm:py-24">
        <Container>
          <div className="grid gap-14 lg:grid-cols-2 lg:items-start">
            <Reveal>
              <div>
                <SectionHeading
                  eyebrow="What is Whale AI"
                  title="Questions about your resources, your spend and your incidents"
                  description="Whale AI answers about the estate you have connected — pulled live at question time, scoped to your tenant and your permissions."
                />
                <h3 className="mt-8 text-xl font-bold text-ink">
                  A layer every module feeds
                </h3>
                <p className="mt-3 text-base leading-relaxed text-muted">
                  Whale AI runs across every module rather than beside them. Each module contributes grounding
                  data: Whalenomics feeds live cost facts, Inventory feeds resource state, ITSM feeds open incidents,
                  the scanner feeds security findings — and the assistant drawer on each screen already knows what
                  you are looking at.
                </p>
                <h3 className="mt-6 text-xl font-bold text-ink">Grounded before it reasons</h3>
                <p className="mt-3 text-base leading-relaxed text-muted">
                  Every use case declares its data dependencies. Before generating a response, the grounding layer
                  queries the live database, appends your real tenant rows to the context window, and only then
                  reasons over them — so the numbers in an answer are the platform&apos;s numbers, and the answer
                  cites where each one came from.
                </p>
              </div>
            </Reveal>

            {/* Fabric diagram */}
            <Reveal delay={100}>
              <div className="relative overflow-hidden rounded-lg border border-line bg-sunken p-8">
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 bg-dot-grid opacity-50 [mask-image:radial-gradient(ellipse_70%_60%_at_50%_30%,black,transparent)]"
                />
                <div className="relative">
                  <div className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-primary text-primary-fg shadow-lg">
                    <Icon name="Sparkles" className="h-9 w-9" />
                  </div>
                  <p className="mt-4 text-center text-base font-bold text-ink">
                    Whale AI Fabric
                  </p>
                  <p className="mt-1 text-center text-sm text-muted">
                    One intelligence layer across all {MODULES.length} modules
                  </p>
                  <div className="mt-6 flex flex-wrap justify-center gap-2">
                    {MODULES.map((m) => (
                      <span
                        key={m.slug}
                        className="inline-flex items-center gap-1.5 rounded-md border border-line bg-surface px-3 py-1.5 text-xs font-semibold text-ink shadow-[3px_3px_0_0_rgba(0,45,161,0.10)]"
                      >
                        <Icon name={m.icon} className="h-3.5 w-3.5 text-accent" />
                        {m.name}
                      </span>
                    ))}
                  </div>
                  <div className="mt-6 rounded-lg border border-line bg-surface p-4">
                    <p className="eyebrow mb-3 text-accent">
                      Grounding providers
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {GROUNDING.map((g) => (
                        <span
                          key={g}
                          className="rounded-md border border-line bg-sunken px-2 py-0.5 font-mono text-xs text-muted"
                        >
                          {g}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* ── Three Tiers ── */}
      <section className="bg-sunken py-20 sm:py-24">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="Intelligence Tiers"
              title="Right model for every task"
              description="Whale AI automatically routes each use case to the appropriate tier — balancing depth of reasoning with response speed and cost."
            />
          </Reveal>
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {TIERS.map((t, i) => (
              <Reveal key={t.key} delay={i * 80}>
                <div className="relative flex h-full flex-col overflow-hidden rounded-xl border border-line bg-surface shadow-sm">
                  {/* Colored top bar */}
                  <div className="h-1 w-full" style={{ background: t.topGrad }} />
                  <div className="flex flex-1 flex-col p-6">
                    <div
                      className="mb-4 inline-flex items-center gap-2 self-start rounded-full px-3 py-1 text-xs font-bold"
                      style={{
                        background: `${t.accentColor}18`,
                        color: t.accentColor,
                      }}
                    >
                      {t.name}
                      <span
                        className="rounded-sm px-1.5 py-0.5 text-xs"
                        style={{ background: `${t.accentColor}25` }}
                      >
                        {t.badge}
                      </span>
                    </div>
                    <p className="mb-1 text-sm text-muted">{t.tagline}</p>
                    <ul className="mt-4 flex-1 space-y-0">
                      {t.features.map((f) => (
                        <li
                          key={f}
                          className="flex items-start gap-2.5 border-b border-line py-2.5 text-sm text-muted last:border-0"
                        >
                          <Check
                            className="mt-0.5 h-3.5 w-3.5 shrink-0"
                            style={{ color: t.accentColor }}
                          />
                          {f}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {t.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-md border border-line bg-sunken px-2 py-0.5 font-mono text-xs text-muted"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* ── Use Case Categories ── */}
      <section className="py-20 sm:py-24">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="Use Case Catalog"
              title="50+ production-ready use cases"
              description="Every use case ships with a hardened system prompt, declared data dependencies, pre-configured intelligence tier, and grounding providers — ready to use from day one."
            />
          </Reveal>
          <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {CATEGORIES.map((c, i) => (
              <Reveal key={c.name} delay={(i % 5) * 50}>
                <div className="flex h-full flex-col items-center rounded-lg border border-line bg-surface p-4 text-center shadow-sm transition-all hover:-translate-y-0.5 hover:border-accent/40 hover:shadow-md">
                  <div className="grid h-10 w-10 place-items-center rounded-lg bg-[var(--bg-active)] text-accent">
                    <Icon name={c.icon} className="h-5 w-5" />
                  </div>
                  <p className="mt-3 text-sm font-bold text-ink">{c.name}</p>
                  <p className="mt-1 text-xs text-muted">{c.count} use cases</p>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Featured use cases three-column */}
          <Reveal delay={80}>
            <div className="mt-10 grid gap-6 rounded-xl border border-line bg-sunken p-6 sm:grid-cols-3">
              {[
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
              ].map((col) => (
                <div key={col.heading}>
                  <p className="eyebrow mb-3 text-accent">
                    {col.heading}
                  </p>
                  <ul className="space-y-0">
                    {col.items.map((item) => (
                      <li
                        key={item}
                        className="border-b border-line py-2 text-sm text-muted last:border-0"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </Reveal>
        </Container>
      </section>

      {/* ── How It Works ── */}
      <section className="bg-sunken py-20 sm:py-24">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="How it works"
              title="From question to grounded answer"
              description="Four stages, the same for every use case: the question, the live grounding query, tier selection and reasoning, then a streamed, exportable answer."
            />
          </Reveal>
          <div className="relative mt-14 grid gap-0 sm:grid-cols-4">
            {/* Connector line */}
            <div
              aria-hidden
              className="absolute left-[12.5%] right-[12.5%] top-9 hidden h-px bg-line sm:block"
            />
            {HOW_STEPS.map((s, i) => (
              <Reveal key={s.step} delay={i * 70}>
                <div className="relative z-10 flex flex-col items-center px-4 text-center">
                  <div className="grid h-[72px] w-[72px] place-items-center rounded-full bg-primary text-white shadow-md">
                    <Icon name={s.icon} className="h-6 w-6" />
                  </div>
                  <p className="eyebrow mt-2 text-accent">
                    {s.step}
                  </p>
                  <h3 className="mt-3 text-base font-bold text-ink">{s.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{s.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* ── Key Differentiators ── */}
      <section className="py-20 sm:py-24">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="Key differentiators"
              title="Four properties you can verify in the product"
              description="Where the data comes from, how tenants are isolated, and what the answer looks like — each one is observable in the console, not a claim."
            />
          </Reveal>
          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            {DIFFERENTIATORS.map((d, i) => (
              <Reveal key={d.title} delay={(i % 2) * 80}>
                <Card className="h-full">
                  <div className="flex items-start gap-4">
                    <div className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-[var(--bg-active)] text-accent">
                      <Icon name={d.icon} className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-ink">{d.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-muted">{d.body}</p>
                    </div>
                  </div>
                </Card>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* ── Comparison table ── */}
      <section className="bg-sunken py-20 sm:py-24">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="Compared by category"
              title="Whale AI against the three usual alternatives"
              description="A general-purpose assistant, an APM vendor's AI and an ITSM vendor's AI each ground in one slice of the estate. The comparison is by category, based on public documentation as of September 2026."
            />
          </Reveal>
          <Reveal delay={80}>
            <div className="mt-10 overflow-x-auto rounded-xl border border-line bg-surface shadow-sm">
              <table className="w-full min-w-[680px] border-collapse text-sm">
                <thead>
                  <tr className="border-b border-line bg-primary">
                    <th className="py-3 pl-5 pr-4 text-left text-xs font-semibold text-white/80">
                      Capability
                    </th>
                    {["Whale AI", "General-purpose assistant", "APM-native AI", "ITSM-native AI"].map((h) => (
                      <th
                        key={h}
                        className={`px-4 py-3 text-center text-xs font-semibold ${h === "Whale AI" ? "text-white" : "text-white/60"}`}
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["Grounded in live cost data", "✓ Real-time", "✗ Training cutoff", "⊘ APM only", "✗"],
                    ["Native platform integration", "✓ All modules", "✗ External", "⊘ APM only", "⊘ ITSM only"],
                    ["Multi-cloud inventory awareness", "✓ 6 clouds + on-prem", "✗", "⊘ Limited", "✗"],
                    ["Streaming token-by-token", "✓", "✓", "✗", "✗"],
                    ["Exportable reports (PDF / Excel)", "✓ Built-in", "✗ Manual", "⊘ Dashboard", "⊘ ITSM only"],
                    ["Usage metering & spend caps", "✓ Per-tenant", "✗", "✗", "✗"],
                    ["FinOps-specific use cases", "✓ 12 use cases", "⊘ Generic", "✗", "✗"],
                  ].map((row, i) => (
                    <tr key={row[0]} className={`border-b border-line last:border-0 ${i % 2 === 1 ? "bg-sunken/50" : ""}`}>
                      <td className="py-3 pl-5 pr-4 font-medium text-muted">{row[0]}</td>
                      {row.slice(1).map((cell, j) => (
                        <td
                          key={j}
                          className={`px-4 py-3 text-center text-xs font-semibold ${
                            j === 0
                              ? "text-accent"
                              : cell.startsWith("✗")
                              ? "text-faint"
                              : "text-muted"
                          }`}
                        >
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>
        </Container>
      </section>

      <ClosingCTA
        eyebrow="Next step"
        title="Ask Whale AI about your own bill."
        body="In a 45-minute working session we connect one of your accounts read-only and put a real question to Whale AI — why a cost line rose, what a finding means, which instances to rightsize — and you see the grounding and the citations behind the answer."
        primary={{
          label: "Book a working session",
          href: "/contact?intent=demo",
          note: "45 minutes · read-only credentials · your data stays in your region",
        }}
        secondary={{
          label: "Start the 90-day prototype",
          href: "/platform#prototype",
          note: "One AI use case on your estate is part of the prototype scope.",
        }}
        tertiary={{ label: "Whale AI module page", href: "/modules/whale-ai", note: "capabilities, tiers and FAQ" }}
      />
    </>
  );
}
