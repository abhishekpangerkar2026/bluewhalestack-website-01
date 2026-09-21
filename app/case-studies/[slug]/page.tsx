import { InnerPage } from "@/components/layout/InnerPage";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Check } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Stat } from "@/components/ui/Stat";
import { Reveal } from "@/components/ui/Reveal";
import { Iso, INDUSTRY_ISO } from "@/components/illustrations/Iso";
import { StoryVisual } from "@/components/sections/CustomerStories";
import { customerStories } from "@/content/customers";
import { editions } from "@/content/editions";
import { industries } from "@/content/industries";

/** Story industry label → industry page slug. */
const INDUSTRY_SLUG: Record<string, string> = {
  BFSI: "bfsi",
  Government: "government",
  "Telco & Datacenter": "telco",
  Media: "regulated-enterprise",
};

export function generateStaticParams() {
  return customerStories.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const s = customerStories.find((c) => c.slug === slug);
  if (!s) return {};
  return { title: `${s.headline} — case study`, description: s.challenge };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const story = customerStories.find((c) => c.slug === slug);
  if (!story) notFound();

  const edition = editions.find((e) => `${e.name} Edition` === story.edition);
  const industry = industries.find((i) => i.slug === INDUSTRY_SLUG[story.industry]);
  const others = customerStories.filter((c) => c.slug !== story.slug);

  return (
    <InnerPage category="solutions" current="/case-studies">
      {/* ── Hero ── */}
      <section className="relative overflow-hidden bg-brand-900 text-white">
        <div
          aria-hidden
          className="pointer-events-none absolute -left-20 top-0 h-80 w-80 rounded-full bg-brand-500/30 blur-[110px]"
        />
        <Container className="relative">
          <div className="grid items-center gap-12 py-20 sm:py-28 lg:grid-cols-[1.1fr_0.9fr]">
            <Reveal>
              <div className="max-w-2xl">
                <div className="flex flex-wrap items-center gap-2">
                  <Link href="/case-studies" className="eyebrow text-white/70 hover:text-white">
                    Case study
                  </Link>
                  <span className="text-white/30">·</span>
                  <Badge tone="neutral" className="bg-white/10 text-white">{story.industry}</Badge>
                  <Badge tone="neutral" className="bg-white/10 text-white">{story.edition}</Badge>
                </div>
                <h1 className="display-1 mt-6 text-white">{story.headline}</h1>
                <p className="mt-4 text-lg font-semibold text-brand-100">{story.org}</p>
                {story.note && <p className="mt-1 text-sm text-white/60">{story.note}</p>}
                <p className="mt-5 max-w-xl text-lg leading-relaxed text-white/70">{story.summary}</p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Button href="/contact?intent=demo" size="lg" variant="white">
                    Discuss a similar estate
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                  {edition && (
                    <Button
                      href={`/editions/${edition.slug}`}
                      size="lg"
                      variant="outline"
                      className="border-white/30 text-white hover:border-white hover:bg-white/10 hover:text-white"
                    >
                      {edition.name} Edition
                    </Button>
                  )}
                </div>
              </div>
            </Reveal>
            <Reveal delay={100}>
              <StoryVisual story={story} />
            </Reveal>
          </div>
        </Container>
      </section>

      {/* ── Results band ── */}
      <section className="border-b border-line bg-sunken py-12">
        <Container>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
            {story.metrics.map((m, i) => (
              <Reveal key={m.label} delay={i * 70}>
                <Stat value={m.value} label={m.label} />
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* ── The situation / what we did ── */}
      <section className="bg-canvas py-20 sm:py-24">
        <Container>
          <div className="grid gap-x-16 gap-y-14 lg:grid-cols-[1fr_0.9fr]">
            <div className="flex flex-col gap-14">
              <Reveal>
                <div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-bold text-accent num">01</span>
                    <span aria-hidden className="h-px w-8 bg-line-strong" />
                    <h2 className="eyebrow text-accent">The situation</h2>
                  </div>
                  <p className="mt-5 text-xl leading-relaxed text-ink sm:text-2xl sm:leading-relaxed">
                    {story.challenge}
                  </p>
                </div>
              </Reveal>
              <Reveal delay={80}>
                <div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-bold text-accent num">02</span>
                    <span aria-hidden className="h-px w-8 bg-line-strong" />
                    <h2 className="eyebrow text-accent">What BlueWhale Stack did</h2>
                  </div>
                  <p className="mt-5 text-lg leading-relaxed text-muted">{story.solution}</p>
                  {edition && (
                    <ul className="mt-6 flex flex-col gap-2">
                      {edition.includes.map((inc) => (
                        <li key={inc} className="flex items-start gap-3 text-sm text-ink">
                          <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-brand-50 text-accent">
                            <Check className="h-3 w-3" />
                          </span>
                          {inc}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </Reveal>
              <Reveal delay={120}>
                <div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-bold text-accent num">03</span>
                    <span aria-hidden className="h-px w-8 bg-line-strong" />
                    <h2 className="eyebrow text-accent">The outcome</h2>
                  </div>
                  <div className="mt-5 border-l-2 border-accent/30 pl-4"><p className="text-[10px] font-semibold uppercase tracking-widest text-accent">Engagement outcome</p><p className="mt-2 text-sm leading-relaxed text-muted">{story.summary}</p></div>
                </div>
              </Reveal>
            </div>

            {/* Sidebar */}
            <Reveal delay={100}>
              <aside className="lg:sticky lg:top-28">
                <div className="rounded-lg border border-line bg-surface p-6 shadow-sm">
                  <Iso name={INDUSTRY_ISO[story.industry] ?? "stacked-slabs"} className="mx-auto max-w-[260px]" />
                  <dl className="mt-4 divide-y divide-line text-sm">
                    <div className="flex justify-between gap-4 py-3">
                      <dt className="text-faint">Sector</dt>
                      <dd className="text-right font-semibold text-ink">{story.industry}</dd>
                    </div>
                    <div className="flex justify-between gap-4 py-3">
                      <dt className="text-faint">Edition</dt>
                      <dd className="text-right font-semibold text-ink">{story.edition}</dd>
                    </div>
                    <div className="flex justify-between gap-4 py-3">
                      <dt className="text-faint">Deployment</dt>
                      <dd className="text-right font-semibold text-ink">{edition?.deploy.join(" · ") ?? "—"}</dd>
                    </div>
                    {industry && (
                      <div className="flex justify-between gap-4 py-3">
                        <dt className="text-faint">Industry solution</dt>
                        <dd className="text-right">
                          <Link href={`/industries/${industry.slug}`} className="font-semibold text-accent hover:underline">
                            {industry.name}
                          </Link>
                        </dd>
                      </div>
                    )}
                  </dl>
                  <div className="mt-5 flex flex-col gap-2">
                    <Button href="/contact?intent=demo">Discuss a similar estate</Button>
                    <p className="text-xs text-faint">45 minutes with a solutions engineer, on your own accounts</p>
                    <Button href="/case-studies" variant="secondary">
                      All case studies
                    </Button>
                  </div>
                </div>
              </aside>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* ── More case studies ── */}
      <section className="border-t border-line bg-sunken py-20 sm:py-24">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="More case studies"
              title="Other estates, other outcomes"
              description="Three more delivered engagements — banking, government, operators and media — written up the same way: situation, work, outcome."
            />
          </Reveal>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {others.map((s, i) => (
              <Reveal key={s.slug} delay={i * 70}>
                <Link
                  href={`/case-studies/${s.slug}`}
                  className="group flex h-full flex-col rounded-lg border border-line bg-surface p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:border-line-strong hover:shadow-md"
                >
                  <Badge tone="brand">{s.industry}</Badge>
                  <h3 className="mt-3 flex-1 text-base font-bold leading-snug text-ink">{s.headline}</h3>
                  <p className="mt-2 text-xs text-muted">{s.org}</p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-accent">
                    Read
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
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
