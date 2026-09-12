import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Stat } from "@/components/ui/Stat";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { ArchitectureDiagram } from "@/components/diagrams/ArchitectureDiagram";
import { ProductScene } from "@/components/scenes/ProductScene";
import { editionsBySlug } from "@/content/editions";
import {
  fabricHero,
  fabricStats,
  fabricStatsNote,
  fabricProblems,
  fabricTiers,
  fabricStakeholders,
  fabricRevenueStreams,
  fabricPhases,
  fabricAtAGlance,
  fabricGettingStarted,
  fabricMarkets,
} from "@/content/fabric";

export const metadata: Metadata = {
  title: "BlueWhale Stack Fabric",
  description:
    "A market's datacenter capacity — every operator, every tier — unified on one platform and consumed as a single sovereign cloud. One catalog, one identity, one bill. Launching in India, built for every country.",
};

export default function FabricPage() {
  const platformEdition = editionsBySlug["telco-datacenter"];
  return (
    <>
      {/* ── Hero: dark, two-column — copy left, tier→fabric illustration right ── */}
      <section className="relative overflow-hidden bg-brand-900 text-white">
        <div
          aria-hidden
          className="pointer-events-none absolute -left-20 top-0 h-80 w-80 rounded-full bg-brand-500/30 blur-[110px]"
        />
        <Container className="relative">
          <div className="grid items-center gap-12 py-20 sm:py-28 lg:grid-cols-[1.05fr_0.95fr]">
            <div>
              <div className="flex flex-wrap items-center gap-3">
                <span className="eyebrow text-white/80">{fabricHero.eyebrow}</span>
                {platformEdition?.comingSoon && (
                  <Badge tone="neutral" className="bg-amber-500/20 text-amber-300">
                    Preview{platformEdition.gaTarget ? ` · GA ${platformEdition.gaTarget}` : ""}
                  </Badge>
                )}
              </div>
              <h1 className="display-1 mt-6 text-white">
                {fabricHero.title}
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/70">
                {fabricHero.description}
              </p>
              <div className="mt-9 flex flex-wrap gap-3">
                <Button href="/contact" size="lg" variant="white">
                  Request a fabric workshop
                  <ArrowRight className="h-4 w-4" />
                </Button>
                <Button
                  href="/editions/telco-datacenter"
                  size="lg"
                  variant="outline"
                  className="border-white/30 text-white hover:border-white hover:bg-white/10 hover:text-white"
                >
                  Runs on Telco &amp; Datacenter Edition
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <ProductScene scene="fabric" variant="dark" priority className="mx-auto w-full max-w-[660px]" />
          </div>
        </Container>
      </section>

      {/* ── Stats band ── */}
      <section className="border-b border-line bg-sunken py-14">
        <Container>
          <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
            {fabricStats.map((s, i) => (
              <Reveal key={s.label} delay={i * 70}>
                <Stat value={s.value} label={s.label} />
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* ── The problem ── */}
      <section className="bg-canvas py-20 sm:py-28">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="Why now"
              title="Strong datacenters, fragmented consumption"
              description="Every growing market builds world-class datacenter capacity fast — but for the buyer, it arrives fragmented: every operator is its own island, with its own portal, contract, billing and compliance posture."
            />
          </Reveal>
          <div className="mt-14 grid gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-2">
            {fabricProblems.map((p, i) => (
              <Reveal key={p.title} delay={(i % 2) * 80}>
                <div className="flex h-full flex-col bg-surface p-7">
                  <span className="text-sm font-bold text-accent num">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-4 text-lg font-bold text-ink">
                    {p.title}
                  </h3>
                  <p className="mt-2 leading-relaxed text-muted">{p.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* ── Architecture ── */}
      <section className="border-y border-line bg-sunken py-20 sm:py-28">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="Reference architecture"
              title="One catalog. One identity. Placement by policy."
              description="A workload enters the fabric with a policy — residency zone, latency bound, compliance class, price ceiling, GPU class — and the platform places it on qualifying capacity, meters it per customer, and governs it identically wherever it lands."
            />
          </Reveal>
          <Reveal delay={100}>
            <div className="mt-12">
              <ArchitectureDiagram id="fabric" />
            </div>
          </Reveal>
        </Container>
      </section>

      {/* ── Supply: three tiers ── */}
      <section className="border-t border-line bg-canvas py-20 sm:py-28">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="The supply"
              title="Every operator, every tier — federated per market"
              description="In any market the datacenter sector sorts into three tiers. The fabric federates all three, so the buyer's policy can land on hyperscale, national or regional capacity — and move between them."
            />
          </Reveal>
          <div className="mt-14 grid gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-3">
            {fabricTiers.map((t, i) => (
              <Reveal key={t.name} delay={i * 90}>
                <div className="flex h-full flex-col bg-surface p-7">
                  <span className="eyebrow text-accent">
                    {t.name}
                  </span>
                  <p className="mt-1 text-sm font-semibold text-ink">
                    {t.label}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-muted">
                    {t.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
          <p className="mt-6 text-xs italic text-faint">
            Tier structure is illustrative; specific operator names, agreements
            and federations are confirmed individually per market and are not
            implied here.
          </p>
        </Container>
      </section>

      {/* ── Where the fabric runs ── */}
      <section className="border-t border-line bg-sunken py-20 sm:py-28">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="Where the fabric runs"
              title="Launching in India. Built for every market."
              description="The fabric plane is the same everywhere — what changes per market is the operator roster, the residency regime and the sovereign classes. India is the launch market; the Gulf and the United States follow from BlueWhale's own entities there."
            />
          </Reveal>
          <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {fabricMarkets.map((m, i) => (
              <Reveal key={m.name} delay={i * 80}>
                <div
                  className={`flex h-full flex-col rounded-lg border bg-surface p-6 shadow-sm ${
                    i === 0 ? "border-amber-300 ring-1 ring-amber-200" : "border-line"
                  }`}
                >
                  <span
                    className={`self-start rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                      i === 0 ? "bg-amber-100 text-amber-800" : "bg-[var(--bg-active)] text-accent"
                    }`}
                  >
                    {m.status}
                  </span>
                  <h3 className="mt-4 text-lg font-bold text-ink">{m.name}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{m.body}</p>
                  {m.stats && (
                    <dl className="mt-5 grid grid-cols-2 gap-3 border-t border-line pt-4">
                      {m.stats.map((s) => (
                        <div key={s.label}>
                          <dt className="text-[11px] font-semibold uppercase tracking-wider text-faint">
                            {s.label}
                          </dt>
                          <dd className="num text-xl font-bold text-accent">{s.value}</dd>
                        </div>
                      ))}
                    </dl>
                  )}
                </div>
              </Reveal>
            ))}
          </div>
          <p className="mt-6 text-xs text-faint">{fabricStatsNote}</p>
        </Container>
      </section>

      {/* ── Who gains what ── */}
      <section className="border-y border-line bg-sunken py-20 sm:py-28">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="Value, by stakeholder"
              title="Who gains what — four parties, one fabric"
              description="The fabric only works if every party is better inside it than outside it."
            />
          </Reveal>
          <div className="mt-14 grid gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-2">
            {fabricStakeholders.map((s, i) => (
              <Reveal key={s.title} delay={(i % 2) * 80}>
                <div className="flex h-full flex-col bg-surface p-7">
                  <span className="grid h-11 w-11 place-items-center rounded-lg bg-brand-50 text-accent">
                    <Icon name={s.icon} className="h-5 w-5" />
                  </span>
                  <h3 className="mt-4 text-lg font-bold text-ink">
                    {s.title}
                  </h3>
                  <ul className="mt-3 flex flex-col gap-2.5">
                    {s.points.map((pt) => (
                      <li
                        key={pt}
                        className="flex items-start gap-2.5 text-sm leading-relaxed text-muted"
                      >
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                        {pt}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* ── Revenue streams ── */}
      <section className="bg-canvas py-20 sm:py-28">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="Commercial model"
              title="Six revenue streams, none requiring new construction"
              description="All metered, governed and billable from the phase that launches them — on capacity operators already own."
            />
          </Reveal>
          <div className="mt-14 grid gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
            {fabricRevenueStreams.map((r, i) => (
              <Reveal key={r.name} delay={(i % 3) * 70}>
                <div className="flex h-full flex-col bg-surface p-7">
                  <span className="eyebrow text-accent">
                    {r.character}
                  </span>
                  <h3 className="mt-3 text-lg font-bold text-ink">
                    {r.name}
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
                    {r.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* ── Phased delivery ── */}
      <section className="border-t border-line bg-sunken py-20 sm:py-28">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="Phased delivery"
              title="From anchor to institutionalized, in four phases"
            />
          </Reveal>
          <div className="relative mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {fabricPhases.map((p, i) => (
              <Reveal key={p.name} delay={i * 90}>
                <div className="border-t-2 border-ink pt-5">
                  <span className="num text-sm font-bold text-accent">
                    {p.timeframe}
                  </span>
                  <h3 className="mt-2 text-lg font-bold text-ink">
                    {p.name}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    {p.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* ── At a glance + getting started ── */}
      <section className="bg-canvas py-20 sm:py-28">
        <Container>
          <div className="grid gap-x-16 gap-y-14 lg:grid-cols-[1fr_1fr]">
            <Reveal>
              <div>
                <SectionHeading eyebrow="At a glance" title="The fabric, summarized" />
                <dl className="mt-10 flex flex-col">
                  {fabricAtAGlance.map((row) => (
                    <div
                      key={row.label}
                      className="flex items-start justify-between gap-6 border-t border-line py-5 first:border-t-0 first:pt-0"
                    >
                      <dt className="text-sm text-faint">{row.label}</dt>
                      <dd className="text-right text-sm font-semibold text-ink">
                        {row.value}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            </Reveal>
            <Reveal delay={120}>
              <div className="rounded-lg border border-line bg-sunken p-8">
                <p className="eyebrow text-accent">
                  Getting started
                </p>
                <ol className="mt-6 flex flex-col">
                  {fabricGettingStarted.map((s, i) => (
                    <li
                      key={s.step}
                      className="flex items-start gap-5 border-t border-line py-5 first:border-t-0 first:pt-0"
                    >
                      <span className="pt-0.5 text-sm font-bold text-accent num">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <div>
                        <div className="flex flex-wrap items-baseline gap-x-2">
                          <h4 className="font-bold text-ink">{s.step}</h4>
                          <span className="text-xs font-semibold text-faint">
                            {s.duration}
                          </span>
                        </div>
                        <p className="mt-1 text-sm leading-relaxed text-muted">
                          {s.body}
                        </p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* ── Closing CTA ── */}
      <section className="relative overflow-hidden bg-brand-900 py-20 sm:py-24">
        <Container className="relative">
          <Reveal>
            <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-xl">
                <p className="eyebrow text-brand-200">
                  No market needs another datacenter
                </p>
                <h2 className="display-2 mt-5 text-white">
                  It needs a fabric that lets buyers{" "}
                  <span className="whitespace-nowrap text-brand-100">pick a policy.</span>
                </h2>
              </div>
              <div className="flex shrink-0 flex-wrap gap-3">
                <Button href="/contact" size="lg" variant="white">
                  Request a fabric workshop
                  <ArrowRight className="h-4 w-4" />
                </Button>
                <Button
                  href="/industries/datacenter"
                  size="lg"
                  variant="outline"
                  className="border-white/30 text-white hover:border-white hover:bg-white/10 hover:text-white"
                >
                  For datacenter operators
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
