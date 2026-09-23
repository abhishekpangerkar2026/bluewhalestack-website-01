import { InnerPage, IntroPanel, IntroPanelLink } from "@/components/layout/InnerPage";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { docsPageSpec } from "@/content/cms/docs/docsPage";
import { docsPage } from "@/content/sections/docsPage";
import { getPageDoc } from "@/lib/cms-page";

const getContent = () => getPageDoc(docsPageSpec, docsPage);

export async function generateMetadata(): Promise<Metadata> {
  const c = await getContent();
  return { title: c.seoTitle, description: c.seoDescription };
}

export default async function DocsPage() {
  const c = await getContent();
  return (
    <InnerPage category="resources" current="/docs">
      {/* ── Hero: editorial split, oversized statement left ── */}
      <section className="border-b border-line bg-surface py-20 sm:py-28">
        <Container>
          <div className="grid gap-x-16 gap-y-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
            <Reveal>
              <div className="max-w-2xl">
                <div className="mb-5 flex items-center gap-3">
                  <span aria-hidden className="h-px w-8 bg-accent/50" />
                  <span className="eyebrow">
                    {c.hero.kicker}
                  </span>
                </div>
                <h1 className="display-1 text-ink">
                  {c.hero.title}
                </h1>
                <p className="mt-6 text-lg leading-relaxed text-muted">
                  {c.hero.description}
                </p>
                <p className="eyebrow mt-8 ">
                  {c.hero.jumpLabel}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {c.hero.quickLinks.map((q) => (
                    <Link
                      key={q.href}
                      href={q.href}
                      className="rounded-full border border-line bg-sunken px-3 py-1.5 text-xs font-semibold text-muted transition-colors hover:border-line-strong hover:text-accent"
                    >
                      {q.label}
                    </Link>
                  ))}
                </div>
              </div>
            </Reveal>
            <Reveal delay={90}>
              <IntroPanel eyebrow={c.hero.panelKicker} dark>
                {c.hero.panelLinks.map((l) => (
                  <IntroPanelLink key={l.href} index={l.index} href={l.href} title={l.title} description={l.description} />
                ))}
              </IntroPanel>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* ── Guides: bold heading + asymmetric numbered grid (non-clickable) ── */}
      <section className="py-24 sm:py-32">
        <Container>
          <Reveal>
            <SectionHeading {...c.guides.heading} />
          </Reveal>
          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {c.guides.cards.map((d, i) => (
              <Reveal key={d.title} delay={(i % 3) * 70}>
                <Link href={`/docs/${d.slug}`} className="group block h-full">
                  <Card
                    interactive
                    className="flex h-full flex-col transition-colors group-hover:border-accent/40"
                  >
                    <div className="flex items-center justify-between">
                      <span className="grid h-11 w-11 place-items-center rounded-md bg-[var(--bg-active)] text-accent">
                        <Icon name={d.icon} className="h-5 w-5" />
                      </span>
                      <span className="text-sm font-bold tabular-nums text-faint">
                        0{i + 1}
                      </span>
                    </div>
                    <h3 className="mt-5 text-lg font-bold text-ink transition-colors group-hover:text-accent">
                      {d.title}
                    </h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
                      {d.body}
                    </p>
                    <div className="mt-5 flex flex-wrap gap-1.5">
                      {d.tags.map((t) => (
                        <span
                          key={t}
                          className="rounded-md bg-sunken px-2 py-0.5 text-[11px] font-medium text-faint"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                    <div className="mt-4 flex items-center gap-1 text-xs font-semibold text-accent">
                      {c.guides.cardLink}
                      <ArrowRight className="h-3 w-3" />
                    </div>
                  </Card>
                </Link>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* ── API CTA: full-bleed dark statement band (hairline keeps it off the footer) ── */}
      <section className="relative overflow-hidden border-b border-white/10 bg-brand-900 py-20 text-white sm:py-24">
        <Container className="relative">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <Reveal>
              <SectionHeading {...c.api.heading} inverse />
            </Reveal>
            <Reveal delay={90}>
              <div className="flex shrink-0 flex-wrap gap-3">
                <Button href={c.api.primary.href} size="lg" variant="white">
                  {c.api.primary.label}
                  <ArrowRight className="h-4 w-4" />
                </Button>
                <Button
                  href={c.api.secondary.href}
                  size="lg"
                  variant="outline"
                  className="border-white/30 text-white hover:border-white hover:bg-white/10 hover:text-white"
                >
                  {c.api.secondary.label}
                </Button>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>
    </InnerPage>
  );
}
