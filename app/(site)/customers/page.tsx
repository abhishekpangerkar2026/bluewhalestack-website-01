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
import { customersPageSpec } from "@/content/cms/docs/customersPage";
import { customersPage } from "@/content/sections/customersPage";
import { getPageDoc } from "@/lib/cms-page";
import { getCustomerStories } from "@/lib/content";
import { builtMetadata, builtPage } from "@/lib/builder/render";

const getContent = () => getPageDoc(customersPageSpec, customersPage);

export async function generateMetadata(): Promise<Metadata> {
  const builtMeta = await builtMetadata("/customers");
  if (builtMeta) return builtMeta;
  const c = await getContent();
  return { title: c.seoTitle, description: c.seoDescription };
}

export default async function CustomersPage() {
  const built = await builtPage("/customers");
  if (built) return built;
  const [c, customerStories] = await Promise.all([getContent(), getCustomerStories()]);
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
          <Button href={c.hero.primary.href} size="lg">
            {c.hero.primary.label}
            <ArrowRight className="h-4 w-4" />
          </Button>
          <Button href={c.hero.secondary.href} size="lg" variant="outline">
            {c.hero.secondary.label}
          </Button>
        </div>
      </CmsPhotoHero>

      {/* ── Stats ── */}
      <section className="border-b border-line bg-sunken py-12">
        <Container>
          <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
            <Stat value={String(customerStories.length)} label={c.stats.engagementsLabel} />
            <Stat value={c.stats.sectors.value} label={c.stats.sectors.label} />
            <Stat value={String(c.markets.length)} label={c.stats.marketsLabel} />
            <Stat value={c.stats.editions.value} label={c.stats.editions.label} />
          </div>
          <div className="mt-8 flex flex-wrap gap-2">
            {c.markets.map((m) => (
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
            <SectionHeading {...c.stories.heading} />
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
                      <div className="mt-5 border-l-2 border-accent/30 pl-4"><p className="text-[10px] font-semibold uppercase tracking-widest text-accent">{c.stories.outcomeLabel}</p><p className="mt-2 text-sm leading-relaxed text-muted">{s.summary}</p></div>
                      <dl className="mt-5 grid grid-cols-3 gap-3 border-t border-line pt-4">
                        {s.metrics.map((m) => (
                          <div key={m.label}>
                            <dt className="text-lg font-bold text-accent">{m.value}</dt>
                            <dd className="mt-0.5 text-[11px] leading-tight text-muted">{m.label}</dd>
                          </div>
                        ))}
                      </dl>
                      <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-accent">
                        {c.stories.readLabel}
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
            <SectionHeading {...c.closing.heading} />
            <Button href={c.closing.cta.href} size="lg" className="shrink-0">
              {c.closing.cta.label}
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </Container>
      </section>
    </InnerPage>
  );
}
