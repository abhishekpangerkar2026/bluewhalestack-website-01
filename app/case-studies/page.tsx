import { InnerPage } from "@/components/layout/InnerPage";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { CmsPhotoHero } from "@/components/sections/CmsPhotoHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { Iso, INDUSTRY_ISO } from "@/components/illustrations/Iso";
import { caseStudiesPageSpec } from "@/content/cms/docs/caseStudiesPage";
import { caseStudiesPage } from "@/content/sections/caseStudiesPage";
import { getPageDoc } from "@/lib/cms-page";
import { getCustomerStories } from "@/lib/content";

const getContent = () => getPageDoc(caseStudiesPageSpec, caseStudiesPage);

export async function generateMetadata(): Promise<Metadata> {
  const c = await getContent();
  return { title: c.seoTitle, description: c.seoDescription };
}

export default async function CaseStudiesPage() {
  const [c, customerStories] = await Promise.all([getContent(), getCustomerStories()]);
  return (
    <InnerPage category="solutions" current="/case-studies">
      {/* ── Hero ── */}
      <CmsPhotoHero
        route="/case-studies"
        photo="dark-gateway"
        tone="dark"
        eyebrow="Case studies · situation, work, outcome"
        title="Four estates, written up the way an architect reads them."
        description="Four delivered engagements, written up the way an architect or a CFO would want to read them — what the estate looked like, what BlueWhale Stack changed, and what the auditor, the board and the bill said afterwards."
      >
        <div className="flex flex-wrap gap-3">
          <Button href={c.hero.primary.href} size="lg" variant="white">
            {c.hero.primary.label}
            <ArrowRight className="h-4 w-4" />
          </Button>
          <Button
            href={c.hero.secondary.href}
            size="lg"
            variant="outline"
            className="border-white/30 text-white hover:border-white hover:bg-white/10 hover:text-white"
          >
            {c.hero.secondary.label}
          </Button>
        </div>
      </CmsPhotoHero>

      {/* ── Index ── */}
      <section className="bg-canvas py-20 sm:py-24">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow={c.index.eyebrow}
              title={`${customerStories.length}${c.index.titleAfterCount}`}
              description={c.index.description}
            />
          </Reveal>
          <div className="mt-12 flex flex-col">
            {customerStories.map((s, i) => (
              <Reveal key={s.slug} delay={(i % 2) * 70}>
                <Link
                  href={`/case-studies/${s.slug}`}
                  className="group grid gap-6 border-t border-line py-8 transition-colors hover:bg-sunken/60 lg:grid-cols-[180px_1fr_auto] lg:items-center lg:gap-10"
                >
                  <div className="hidden w-44 lg:block">
                    <Iso name={INDUSTRY_ISO[s.industry] ?? "stacked-slabs"} />
                  </div>
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-sm font-bold text-faint num">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <Badge tone="brand">{s.industry}</Badge>
                      <span className="text-xs text-faint">{s.edition}</span>
                    </div>
                    <h2 className="mt-3 text-2xl font-bold leading-snug text-ink group-hover:text-accent">
                      {s.headline}
                    </h2>
                    <p className="mt-1 text-sm font-medium text-muted">{s.org}</p>
                    <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted">{s.challenge}</p>
                    <dl className="mt-4 flex flex-wrap gap-x-8 gap-y-2">
                      {s.metrics.map((m) => (
                        <div key={m.label} className="flex items-baseline gap-2">
                          <dt className="text-lg font-bold text-accent">{m.value}</dt>
                          <dd className="text-xs text-muted">{m.label}</dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                  <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent">
                    {c.index.readLabel}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>
    </InnerPage>
  );
}
