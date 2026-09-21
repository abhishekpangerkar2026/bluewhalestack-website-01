import { InnerPage } from "@/components/layout/InnerPage";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Stat } from "@/components/ui/Stat";
import { Reveal } from "@/components/ui/Reveal";
import { Iso } from "@/components/illustrations/Iso";
import { StoryVisual } from "@/components/sections/CustomerStories";
import { customerStories } from "@/content/customers";

export const metadata: Metadata = {
  title: "Customer success stories",
  description:
    "Delivered BlueWhale Stack engagements across banking, government, telco and datacenter operators and media — anonymized under confidentiality, real in every outcome.",
};

const MARKETS = ["Singapore", "Qatar", "Saudi Arabia", "South Africa", "UAE", "India"];

export default function CustomersPage() {
  return (
    <InnerPage category="solutions" current="/customers">
      {/* ── Hero ── */}
      <section className="relative overflow-hidden border-b border-line bg-canvas">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-dot-grid opacity-60 [mask-image:radial-gradient(ellipse_70%_60%_at_50%_0%,black,transparent_75%)]"
        />
        <Container className="relative">
          <div className="grid items-center gap-12 py-20 sm:py-28 lg:grid-cols-[1.1fr_0.9fr]">
            <Reveal>
              <div className="max-w-2xl">
                <div className="mb-6 flex items-center gap-3">
                  <span className="grid h-11 w-11 place-items-center rounded-lg bg-primary text-primary-fg shadow-sm">
                    <Icon name="Users" className="h-5 w-5" />
                  </span>
                  <span className="eyebrow text-accent">Customer success stories</span>
                  <span aria-hidden className="h-px w-8 bg-accent/50" />
                  <span className="text-xs font-semibold text-faint">Four delivered engagements</span>
                </div>
                <h1 className="display-1 text-ink">
                  Banks, ministries, operators and a newsroom — what changed for each.
                </h1>
                <p className="mt-6 text-lg leading-relaxed text-muted">
                  Banks under two regulators, defence ministries with air-gapped
                  estates, telcos and datacenter operators becoming cloud
                  providers, a global newsroom under sustained cyber threat.
                  Client identities are withheld under confidentiality; the
                  challenges, the solutions and the outcomes are as delivered.
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Button href="/case-studies" size="lg">
                    Read the case studies
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                  <Button href="/contact?intent=demo" size="lg" variant="outline">
                    Talk to us about yours
                  </Button>
                </div>
              </div>
            </Reveal>
            <Reveal delay={100}>
              <div className="mx-auto w-full max-w-[480px]">
                <Iso name="network" title="Customers across markets connected to one platform" />
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* ── Stats ── */}
      <section className="border-b border-line bg-sunken py-12">
        <Container>
          <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
            <Stat value={String(customerStories.length)} label="Delivered engagements told here" />
            <Stat value="4" label="Sectors — BFSI, government, telco & DC, media" />
            <Stat value={String(MARKETS.length)} label="Markets across Asia, the Gulf and Africa" />
            <Stat value="3" label="Editions in production" />
          </div>
          <div className="mt-8 flex flex-wrap gap-2">
            {MARKETS.map((m) => (
              <span key={m} className="rounded-full border border-line bg-surface px-3 py-1 text-xs font-medium text-muted">
                {m}
              </span>
            ))}
          </div>
        </Container>
      </section>

      {/* ── Stories ── */}
      <section className="bg-canvas py-20 sm:py-24">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="The stories"
              title="Four estates, four outcomes"
              description="Each story links to its full case study — the situation, what BlueWhale Stack did, and the result."
            />
          </Reveal>
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {customerStories.map((s, i) => (
              <Reveal key={s.slug} delay={(i % 2) * 80}>
                <Link href={`/case-studies/${s.slug}`} className="group/card block h-full">
                  <Card interactive className="flex h-full flex-col overflow-hidden p-0">
                    <StoryVisual story={s} compact />
                    <div className="flex flex-1 flex-col p-6">
                      <div className="flex flex-wrap items-center gap-2">
                        <Badge tone="brand">{s.industry}</Badge>
                        <span className="text-xs text-faint">{s.edition}</span>
                      </div>
                      <h2 className="mt-3 text-xl font-bold leading-snug text-ink">{s.headline}</h2>
                      <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">{s.challenge}</p>
                      <div className="mt-5 border-l-2 border-accent/30 pl-4"><p className="text-[10px] font-semibold uppercase tracking-widest text-accent">Engagement outcome</p><p className="mt-2 text-sm leading-relaxed text-muted">{s.summary}</p></div>
                      <dl className="mt-5 grid grid-cols-3 gap-3 border-t border-line pt-4">
                        {s.metrics.map((m) => (
                          <div key={m.label}>
                            <dt className="text-lg font-bold text-accent">{m.value}</dt>
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
      <section className="border-t border-line bg-sunken py-20 sm:py-24">
        <Container>
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <SectionHeading
              title="Your estate is the next story."
              description="Bring your hardest audit finding and your least explainable cloud bill to a half-day discovery workshop — then a 90-day prototype on your own estate, before any licensing decision."
            />
            <Button href="/contact?intent=demo" size="lg" className="shrink-0">
              Book the discovery workshop
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </Container>
      </section>
    </InnerPage>
  );
}
