import { InnerPage, PageIndex } from "@/components/layout/InnerPage";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { PhotoHero } from "@/components/sections/PhotoHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { Iso, SOLUTION_ISO } from "@/components/illustrations/Iso";
import { StoryVisual } from "@/components/sections/CustomerStories";
import { ClosingCTA } from "@/components/sections/ClosingCTA";
import { getSolutions, getIndustries, getEdition } from "@/lib/content";
import { customerStories } from "@/content/customers";

export const metadata: Metadata = {
  title: "Solutions",
  description:
    "Outcome-focused solutions, industry solutions for government, BFSI, healthcare, telco and datacenter operators, and the customer success stories and case studies behind them.",
};

export default function SolutionsPage() {
  const solutions = getSolutions();
  const industries = getIndustries();

  return (
    <InnerPage category="solutions" current="/solutions">
      {/* ── Hero ── */}
      <PhotoHero
        photo="hybrid-bridge"
        eyebrow="Solutions · six outcomes, one control plane"
        title="Six things teams buy the platform for."
        description="One inventory across every cloud, provisioning without console access, observability included in the licence, a scored migration plan, one identity fabric with continuous audit evidence, and a sovereign deployment that proves where data lives. Each solution page shows the data path, the console, the modules involved and a delivered engagement."
      >
        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <div>
            <Button href="/contact?intent=demo" size="lg">
              See it on your estate
              <ArrowRight className="h-4 w-4" />
            </Button>
            <p className="mt-2 text-xs text-faint">45 minutes · one of your accounts, connected read-only</p>
          </div>
          <Button href="/case-studies" size="lg" variant="outline">
            Read the case studies
          </Button>
        </div>
        {/* the six solutions as icon chips — a jump list */}
        <div className="mt-8 flex flex-wrap gap-2">
          {solutions.map((s) => (
            <Link
              key={s.slug}
              href={`/solutions/${s.slug}`}
              className="inline-flex items-center gap-1.5 rounded-full border border-line bg-white px-3 py-1.5 text-xs font-semibold text-muted shadow-sm transition-colors hover:border-accent hover:text-accent"
            >
              <Icon name={s.icon} className="h-3.5 w-3.5 text-accent" />
              {s.name}
            </Link>
          ))}
        </div>
      </PhotoHero>

      <PageIndex items={[
        { label: "By outcome", href: "#outcomes" },
        { label: "By industry", href: "#industries" },
        { label: "Customer stories", href: "#customers" },
      ]} />

      {/* ── By outcome ── */}
      <section id="outcomes" className="scroll-mt-24 border-b border-line bg-sunken py-20 sm:py-24">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="By outcome"
              title="Six solutions, one control plane"
              description="Five are generally available today; Cloud Migration ships its assessment now and execution hooks next. Each links to its reference architecture, the modules it uses and the editions that include it."
            />
          </Reveal>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {solutions.map((s, i) => (
              <Reveal key={s.slug} delay={(i % 3) * 80}>
                <Link href={`/solutions/${s.slug}`} className="group/card block h-full">
                  <Card interactive className="flex h-full flex-col">
                    <Iso name={SOLUTION_ISO[s.slug] ?? "cloud-slab"} className="mb-3 h-32 w-auto self-start" />
                    <div className="flex items-center justify-between">
                      <span className="grid h-10 w-10 place-items-center rounded-lg bg-primary text-primary-fg">
                        <Icon name={s.icon} className="h-5 w-5" />
                      </span>
                      <span className="text-sm font-bold text-faint num">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <h3 className="mt-4 text-lg font-bold text-ink">{s.name}</h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{s.summary}</p>
                    <p className="mt-3 text-xs font-medium text-faint">{s.facts[0].value} · {s.facts[0].label}</p>
                    <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-accent">
                      How it works
                      <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover/card:translate-x-0.5" />
                    </span>
                  </Card>
                </Link>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* ── Industry solutions ── */}
      <section id="industries" className="scroll-mt-24 bg-canvas py-20 sm:py-24">
        <Container>
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <Reveal>
              <SectionHeading
                eyebrow="Industry solutions"
                title="Packaged for your sector"
                description="The same solutions, shaped to each industry's regime, workloads and edition — government, BFSI, healthcare, telco, datacenter, regulated enterprise and digital natives."
              />
            </Reveal>
            <Reveal delay={80}>
              <Button href="/industries" variant="outline" className="shrink-0">
                All industries
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Reveal>
          </div>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {industries.map((ind, i) => {
              const edition = getEdition(ind.edition);
              return (
                <Reveal key={ind.slug} delay={(i % 4) * 60}>
                  <Link href={`/industries/${ind.slug}`} className="group/card block h-full">
                    <Card interactive className="flex h-full flex-col">
                      <div className="flex items-center justify-between">
                        <span className="grid h-10 w-10 place-items-center rounded-lg bg-[var(--bg-active)] text-accent">
                          <Icon name={ind.icon} className="h-5 w-5" />
                        </span>
                        {edition?.comingSoon ? (
                          <Badge tone="warning">Preview</Badge>
                        ) : (
                          <Badge tone="success">Available</Badge>
                        )}
                      </div>
                      <h3 className="mt-4 text-base font-bold text-ink">{ind.name}</h3>
                      <p className="mt-1 text-sm font-medium text-accent">{ind.title}</p>
                      <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{ind.outcome}</p>
                      <span className="mt-4 text-xs text-faint">
                        {edition ? `${edition.name} Edition` : ""}
                      </span>
                    </Card>
                  </Link>
                </Reveal>
              );
            })}
          </div>
        </Container>
      </section>

      {/* ── Customer success stories ── */}
      <section id="customers" className="scroll-mt-24 border-y border-line bg-sunken py-20 sm:py-24">
        <Container>
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <Reveal>
              <SectionHeading
                eyebrow="Customer success stories"
                title="Proven in regulated estates"
                description="Delivered engagements across banking, government, telco and datacenter operators, and media — anonymized under confidentiality, real in every outcome."
              />
            </Reveal>
            <Reveal delay={80}>
              <div className="flex shrink-0 flex-wrap gap-3">
                <Button href="/customers" variant="outline">
                  All success stories
                  <ArrowRight className="h-4 w-4" />
                </Button>
                <Button href="/case-studies" variant="secondary">
                  Case studies
                </Button>
              </div>
            </Reveal>
          </div>
          <div className="mt-12 grid gap-5 md:grid-cols-2">
            {customerStories.map((s, i) => (
              <Reveal key={s.slug} delay={(i % 2) * 80}>
                <Link href={`/case-studies/${s.slug}`} className="group/card block h-full">
                  <Card interactive className="flex h-full flex-col overflow-hidden p-0">
                    <StoryVisual story={s} compact />
                    <div className="flex flex-1 flex-col p-6">
                      <div className="flex items-center gap-2">
                        <Badge tone="brand">{s.industry}</Badge>
                        <span className="text-xs text-faint">{s.edition}</span>
                      </div>
                      <h3 className="mt-3 text-lg font-bold leading-snug text-ink">{s.headline}</h3>
                      <dl className="mt-4 grid grid-cols-3 gap-3 border-t border-line pt-4">
                        {s.metrics.map((m) => (
                          <div key={m.label}>
                            <dt className="text-base font-bold text-accent">{m.value}</dt>
                            <dd className="mt-0.5 text-[11px] leading-tight text-muted">{m.label}</dd>
                          </div>
                        ))}
                      </dl>
                      <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-accent">
                        Read the case study
                        <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover/card:translate-x-1" />
                      </span>
                    </div>
                  </Card>
                </Link>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <ClosingCTA
        eyebrow="Next step"
        title="Bring your hardest problem to a working session."
        body="We connect one of your accounts read-only, map your estate to the solutions above, and walk the one that matters most on your real resources — before any commercial conversation."
        primary={{
          label: "Book a working session",
          href: "/contact?intent=demo",
          note: "45 minutes · a solutions engineer, not a sales deck · nothing installed on your side",
        }}
        secondary={{
          label: "Start the 90-day prototype",
          href: "/platform#prototype",
          note: "Half-day discovery workshop, then 90 days on your estate with no licence cost.",
        }}
        tertiary={{ label: "Compare the four editions", href: "/editions", note: "which edition includes which solution" }}
      />
    </InnerPage>
  );
}
