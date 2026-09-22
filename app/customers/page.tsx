import { InnerPage } from "@/components/layout/InnerPage";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { CmsPhotoHero } from "@/components/sections/CmsPhotoHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Stat } from "@/components/ui/Stat";
import { Reveal } from "@/components/ui/Reveal";
import { Iso } from "@/components/illustrations/Iso";
import { StoryVisual } from "@/components/sections/CustomerStories";
import { getCustomerStories } from "@/lib/content";

export const metadata: Metadata = {
  title: "Customer success stories",
  description:
    "Delivered BlueWhale Stack engagements across banking, government, telco and datacenter operators and media — anonymized under confidentiality, real in every outcome.",
};

const MARKETS = ["Singapore", "Qatar", "Saudi Arabia", "South Africa", "UAE", "India"];

export default async function CustomersPage() {
  const customerStories = await getCustomerStories();
  return (
    <InnerPage category="solutions" current="/customers">
      {/* ── Hero ── */}
      <CmsPhotoHero
        route="/customers"
        photo="enterprise-campus"
        eyebrow="Customer success stories · four delivered engagements"
        title="Banks, ministries, operators and a newsroom — what changed for each."
        description="Banks under two regulators, defence ministries with air-gapped estates, telcos and datacenter operators becoming cloud providers, a global newsroom under sustained cyber threat. Client identities are withheld under confidentiality; the challenges, the solutions and the outcomes are as delivered."
      >
        <div className="flex flex-wrap gap-3">
          <Button href="/case-studies" size="lg">
            Read the case studies
            <ArrowRight className="h-4 w-4" />
          </Button>
          <Button href="/contact?intent=demo" size="lg" variant="outline">
            Talk to us about yours
          </Button>
        </div>
      </CmsPhotoHero>

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
