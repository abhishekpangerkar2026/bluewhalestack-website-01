import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { Iso, SOLUTION_ISO, INDUSTRY_ISO } from "@/components/illustrations/Iso";
import { StoryVisual } from "@/components/sections/CustomerStories";
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
    <>
      {/* ── Hero: statement left, 3D art right ── */}
      <section className="relative overflow-hidden border-b border-line bg-canvas">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-dot-grid opacity-60 [mask-image:radial-gradient(ellipse_70%_60%_at_50%_0%,black,transparent_75%)]"
        />
        <Container className="relative">
          <div className="grid items-center gap-12 py-20 sm:py-28 lg:grid-cols-[1.1fr_0.9fr]">
            <Reveal>
              <div className="max-w-2xl">
                <div className="mb-5 flex items-center gap-3">
                  <span aria-hidden className="h-px w-8 bg-accent/50" />
                  <span className="eyebrow text-accent">Solutions</span>
                </div>
                <h1 className="display-1 text-ink">
                  Cloud challenges,{" "}
                  <span className="text-accent">solved.</span>
                </h1>
                <p className="mt-6 text-lg leading-relaxed text-muted">
                  Six outcome-focused solutions, each with a real reference
                  architecture — then the industry solutions built on them, and
                  the customer stories and case studies that prove them in
                  regulated, multi-cloud estates.
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Button href="/contact?intent=demo" size="lg">
                    Talk to an architect
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                  <Button href="/case-studies" size="lg" variant="outline">
                    Read the case studies
                  </Button>
                </div>
              </div>
            </Reveal>
            <Reveal delay={100}>
              <div className="mx-auto w-full max-w-[480px]">
                <Iso name="solutions" title="Three governed steps up to a sovereign estate" />
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* ── By outcome ── */}
      <section id="outcomes" className="scroll-mt-24 border-b border-line bg-sunken py-20 sm:py-24">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="By outcome"
              title="Six solutions, one control plane"
              description="Unified inventory, governed provisioning, bundled observability, cloud migration, security & compliance and sovereign cloud — across every deployment mode."
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
                    <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-accent">
                      View architecture
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

      {/* ── CTA ── */}
      <section className="bg-canvas py-20 sm:py-24">
        <Container>
          <Reveal>
            <div className="flex flex-col gap-8 rounded-2xl bg-primary px-8 py-12 text-primary-fg lg:flex-row lg:items-center lg:justify-between sm:px-12">
              <div className="flex items-center gap-6">
                <div className="hidden w-40 shrink-0 sm:block">
                  <Iso name={INDUSTRY_ISO.Government} variant="dark" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold sm:text-3xl">Bring your hardest problem.</h2>
                  <p className="mt-2 max-w-xl opacity-80">
                    Half a day with your technology and finance leaders — we map your estate to
                    the solutions above and show it running on your estate&apos;s shape.
                  </p>
                </div>
              </div>
              <Button href="/contact?intent=demo" size="lg" variant="white" className="shrink-0">
                Book the discovery workshop
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
