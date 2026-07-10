import type { Metadata } from "next";
import { ArrowRight, Check } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";

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
    title: "Native, not bolted on",
    body: "Whale AI was designed as a first-class architectural component. Every module exposes its data as grounding providers, and every screen has an Ask Whale entry point — the AI has access to everything the platform knows about your estate.",
  },
  {
    icon: "DatabaseBackup",
    title: "Grounded in your live data",
    body: "Whale AI never fabricates numbers. Before answering, the grounding layer queries your actual cost facts, real resource inventory, open incidents, and security findings — the AI reasons over your data, not training-time approximations.",
  },
  {
    icon: "Lock",
    title: "Enterprise security model",
    body: "Complete tenant isolation — every AI call is scoped to the authenticated tenant. No cross-tenant data leakage is architecturally possible. Spend caps enforced per tenant. Conversations persisted under your data residency region.",
  },
  {
    icon: "Zap",
    title: "Streaming with instant feedback",
    body: "Responses stream token-by-token — no waiting for a blank screen to fill. Stop mid-stream, copy answers, rate quality, and export to PDF or Excel in one click. The feedback loop continuously improves answer quality.",
  },
];

const MODULES = [
  "Cloud Inventory",
  "Whale Nomics (FinOps)",
  "Whale Helm (ITSM)",
  "WhaleForge IaC",
  "Whale Observe",
  "Whale Security",
  "Migration Engine",
  "Landing Zone",
];

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
          <div className="max-w-3xl">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-widest text-white/70">
              ✦ Whale AI · Horizontal Intelligence Layer
            </div>
            <h1 className="text-[2.6rem] font-bold leading-[1.03] tracking-tight sm:text-5xl lg:text-[3.5rem]">
              Your cloud operations{" "}
              <span className="text-[#a5b4fc]">intelligence co-pilot</span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/70">
              Whale AI is not a chatbot bolted onto a dashboard. It is a deeply integrated
              intelligence layer woven into every module — grounded in your live data, reasoning
              over your real estate, and acting within your governance boundaries.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="/contact" size="lg" variant="white">
                Book a demo
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button
                href="/platform"
                size="lg"
                variant="ghost"
                className="text-white hover:bg-white/10"
              >
                See the platform
              </Button>
            </div>
          </div>

          {/* Stats strip */}
          <div className="mt-14 grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-white/15 bg-white/10 sm:grid-cols-4">
            {STATS.map((s) => (
              <div key={s.label} className="px-5 py-4">
                <p className="text-2xl font-bold text-white num">{s.value}</p>
                <p className="mt-0.5 text-xs font-medium text-white/50">{s.label}</p>
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
                <span className="text-xs font-bold uppercase tracking-[0.18em] text-accent">
                  What is Whale AI
                </span>
                <h2 className="mt-3 text-3xl font-bold tracking-tight text-ink sm:text-4xl">
                  AI that knows your cloud — not just cloud AI
                </h2>
                <p className="mt-4 text-base leading-relaxed text-muted">
                  Most enterprise AI tools answer generic questions. Whale AI answers questions
                  about <em>your</em> actual resources, <em>your</em> real spend, <em>your</em>{" "}
                  open incidents — pulled live from your connected estate.
                </p>
                <h3 className="mt-8 text-xl font-bold text-ink">
                  A horizontal fabric, not a feature
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  Whale AI is architected as a horizontal intelligence layer that runs across every
                  vertical module. It is not another module — it is the connective tissue between
                  all of them. Every module contributes grounding data: FinOps feeds live cost
                  facts, Inventory feeds resource state, ITSM feeds open incidents, Scanner feeds
                  security findings.
                </p>
                <h3 className="mt-6 text-xl font-bold text-ink">Grounded, not hallucinating</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  Every use case declares its data dependencies. Before generating a response, the
                  grounding layer queries the live database, appends your real tenant data to the
                  context window, and only then reasons over it. There is no guessing, no
                  fabrication of numbers.
                </p>
              </div>
            </Reveal>

            {/* Fabric diagram */}
            <Reveal delay={100}>
              <div className="rounded-2xl border border-line bg-sunken p-8">
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-primary text-3xl shadow-lg">
                  🐋
                </div>
                <p className="mt-4 text-center text-base font-bold text-ink">
                  Whale AI Fabric
                </p>
                <p className="mt-1 text-center text-xs text-faint">
                  Horizontal intelligence layer across all modules
                </p>
                <div className="mt-6 flex flex-wrap justify-center gap-2">
                  {MODULES.map((m) => (
                    <span
                      key={m}
                      className="rounded-lg border border-line bg-surface px-3 py-1.5 text-xs font-semibold text-muted"
                    >
                      {m}
                    </span>
                  ))}
                </div>
                <div className="mt-6 rounded-xl border border-line bg-surface p-4">
                  <p className="mb-3 text-[10px] font-bold uppercase tracking-wider text-accent">
                    Grounding Providers
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {GROUNDING.map((g) => (
                      <span
                        key={g}
                        className="rounded-md border border-line bg-sunken px-2 py-0.5 font-mono text-[10px] text-faint"
                      >
                        {g}
                      </span>
                    ))}
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
                        className="rounded-sm px-1.5 py-0.5 text-[10px]"
                        style={{ background: `${t.accentColor}25` }}
                      >
                        {t.badge}
                      </span>
                    </div>
                    <p className="mb-1 text-[11px] text-faint">{t.tagline}</p>
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
                          className="rounded-md border border-line bg-sunken px-2 py-0.5 font-mono text-[10px] text-faint"
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
                  <p className="mt-3 text-xs font-bold text-ink">{c.name}</p>
                  <p className="mt-1 text-[11px] text-faint">{c.count} use cases</p>
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
                  <p className="mb-3 text-[11px] font-bold uppercase tracking-wider text-accent">
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
                  <p className="mt-1 text-[10px] font-bold uppercase tracking-wider text-accent">
                    {s.step}
                  </p>
                  <h3 className="mt-3 text-sm font-bold text-ink">{s.title}</h3>
                  <p className="mt-2 text-xs leading-relaxed text-muted">{s.body}</p>
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
              title="What makes Whale AI different"
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
              eyebrow="Market comparison"
              title="Whale AI vs. point solutions"
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
                    {["Whale AI", "Generic AI", "Dynatrace Davis", "ServiceNow"].map((h) => (
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

      {/* ── CTA ── */}
      <section className="py-20 sm:py-24">
        <Container>
          <Reveal>
            <div className="overflow-hidden rounded-2xl bg-primary px-8 py-14 text-center text-primary-fg sm:px-14">
              <p className="mb-2 text-3xl">🐋</p>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Ready to explore Whale AI?
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed opacity-80">
                Start with a demo to see Whale AI reasoning over your live cloud estate — cost,
                security, incidents, and beyond.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <Button href="/contact" size="lg" variant="white">
                  Book a demo
                  <ArrowRight className="h-4 w-4" />
                </Button>
                <Button
                  href="/platform"
                  size="lg"
                  variant="ghost"
                  className="text-white hover:bg-white/10"
                >
                  See the platform
                </Button>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
