import { InnerPage } from "@/components/layout/InnerPage";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Check, ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { PhotoHero } from "@/components/sections/PhotoHero";
import { SOLUTION_PHOTO } from "@/content/photos";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { FactStrip } from "@/components/ui/FactStrip";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { ArchitectureDiagram } from "@/components/diagrams/ArchitectureDiagram";
import { ConsoleMockup } from "@/components/sections/mockups/ConsoleMockup";
import { FAQ } from "@/components/sections/FAQ";
import { ClosingCTA } from "@/components/sections/ClosingCTA";
import { moduleDetails } from "@/content/moduleDetails";
import { getSolutions, getSolution, getModules, getEditions, getCustomerStories } from "@/lib/content";

export async function generateStaticParams() {
  return (await getSolutions()).map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const s = await getSolution(slug);
  if (!s) return {};
  return { title: s.name, description: s.description };
}

export default async function SolutionDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const solution = await getSolution(slug);
  if (!solution) notFound();
  const [allModules, allEditions, allSolutions, customerStories] = await Promise.all([getModules(), getEditions(), getSolutions(), getCustomerStories()]);

  const relatedModules = solution.modules
    .map((m) => allModules.find((x) => x.slug === m))
    .filter((m): m is NonNullable<typeof m> => Boolean(m));
  const recEditions = (solution.editions ?? [])
    .map((e) => allEditions.find((x) => x.slug === e))
    .filter((e): e is NonNullable<typeof e> => Boolean(e));
  const primaryModule = relatedModules[0];
  const screen = primaryModule ? moduleDetails[primaryModule.slug]?.screen : undefined;
  const story = solution.story ? customerStories.find((c) => c.slug === solution.story) : undefined;
  const siblings = allSolutions.filter((s) => s.slug !== slug).slice(0, 3);

  return (
    <InnerPage category="solutions" current="/solutions">
      {/* ── Hero ── */}
      <PhotoHero
        photo={SOLUTION_PHOTO[solution.slug] ?? "hybrid-bridge"}
        image={solution.cmsImage}
        edit={solution.cmsId ? { id: solution.cmsId, type: "solution", path: "image" } : undefined}
        above={
          <div className="mb-8">
            <Breadcrumbs items={[{ label: "Solutions", href: "/solutions" }, { label: solution.name }]} />
            <div className="mt-8 flex items-center gap-3">
              <span className="grid h-11 w-11 place-items-center rounded-lg bg-primary text-primary-fg shadow-sm">
                <Icon name={solution.icon} className="h-5 w-5" />
              </span>
              <span className="eyebrow">Solution</span>
            </div>
          </div>
        }
        title={solution.name}
        description={solution.description}
      >
        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <div>
            <Button href="/contact?intent=demo" size="lg">
              See it on your estate
              <ArrowRight className="h-4 w-4" />
            </Button>
            <p className="mt-2 text-xs text-faint">45 minutes · one of your accounts, connected read-only</p>
          </div>
          <Button href="#architecture" size="lg" variant="outline">
            How it works
          </Button>
        </div>
      </PhotoHero>
      <section className="border-b border-line bg-sunken py-8">
        <Container>
          <Reveal delay={120}>
            <FactStrip facts={solution.facts} />
          </Reveal>
        </Container>
      </section>

      {/* ── The challenge, with its symptoms ── */}
      <section className="bg-canvas py-20 sm:py-24">
        <Container>
          <div className="grid gap-x-16 gap-y-8 lg:grid-cols-[0.35fr_0.65fr]">
            <Reveal>
              <div className="flex items-center gap-3">
                <span aria-hidden className="h-px w-8 bg-accent/50" />
                <span className="eyebrow">The challenge</span>
              </div>
            </Reveal>
            <Reveal delay={80}>
              <div>
                <p className="text-2xl font-bold leading-snug tracking-tight text-ink text-balance sm:text-3xl">
                  {solution.problem}
                </p>
                <ul className="mt-8 grid gap-4 sm:grid-cols-3">
                  {solution.symptoms.map((s, i) => (
                    <li key={s} className="border-t-2 border-line-strong pt-4">
                      <span className="num text-sm font-bold text-accent">{String(i + 1).padStart(2, "0")}</span>
                      <p className="mt-2 text-sm leading-relaxed text-muted">{s}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* ── How it works: architecture + steps ── */}
      <section id="architecture" className="scroll-mt-24 border-y border-line bg-sunken py-20 sm:py-24">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="How it works"
              title="The data path, end to end"
              description="The diagram shows the estates involved, the control plane over them and where the data flows. The steps beneath are what an operator sees at each stage."
            />
          </Reveal>
          {solution.architectureId && (
            <Reveal delay={100}>
              <div className="mt-12">
                <ArchitectureDiagram id={solution.architectureId} />
              </div>
            </Reveal>
          )}
          {solution.flow && solution.flow.length > 0 && (
            <Reveal delay={140}>
              <ol className="mt-12 grid gap-x-10 gap-y-6 sm:grid-cols-2">
                {solution.flow.map((step, i) => (
                  <li
                    key={step}
                    className="flex items-start gap-4 border-t-2 border-line-strong pt-4 sm:[&:last-child:nth-child(odd)]:col-span-2"
                  >
                    <span className="text-2xl font-bold text-accent num">{String(i + 1).padStart(2, "0")}</span>
                    <span className="pt-1 leading-relaxed text-muted">{step}</span>
                  </li>
                ))}
              </ol>
            </Reveal>
          )}
        </Container>
      </section>

      {/* ── In the product: what's included + the console ── */}
      <section className="bg-canvas py-20 sm:py-24">
        <Container>
          <div className="grid items-start gap-x-16 gap-y-12 lg:grid-cols-[0.85fr_1.15fr]">
            <Reveal>
              <div>
                <SectionHeading
                  eyebrow="What's included"
                  title="What you switch on"
                  description={`${solution.features.length} capabilities across ${relatedModules.map((m) => m.name).join(", ")} — all in the editions listed below.`}
                />
                <ul className="mt-8 flex flex-col">
                  {solution.features.map((f) => (
                    <li key={f} className="flex items-start gap-4 border-t border-line py-4 first:border-t-0 first:pt-0">
                      <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-brand-50 text-accent">
                        <Check className="h-3.5 w-3.5" />
                      </span>
                      <span className="text-base leading-relaxed text-muted">{f}</span>
                    </li>
                  ))}
                </ul>
                {relatedModules.length > 0 && (
                  <div className="mt-8">
                    <p className="eyebrow">Modules used</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {relatedModules.map((m) => (
                        <Link
                          key={m.slug}
                          href={`/modules/${m.slug}`}
                          className="inline-flex items-center gap-1.5 rounded-full border border-line bg-surface px-3.5 py-1.5 text-sm font-medium text-muted transition-colors hover:border-accent hover:text-accent"
                        >
                          {m.name} <ArrowRight className="h-3 w-3" />
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </Reveal>
            {screen && primaryModule && (
              <Reveal delay={100} className="min-w-0">
                <div className="min-w-0">
                  <ConsoleMockup screen={screen} />
                  <p className="mt-3 text-xs text-faint">
                    {primaryModule.name} in the console — {screen.title.toLowerCase()}. Illustrative screen with sample data.
                  </p>
                </div>
              </Reveal>
            )}
          </div>
        </Container>
      </section>

      {/* ── Proof + fit ── */}
      <section className="border-t border-line bg-sunken py-20 sm:py-24">
        <Container>
          <div className="grid items-start gap-x-16 gap-y-12 lg:grid-cols-[1.1fr_0.9fr]">
            <Reveal>
              {story ? (
                <div>
                  <p className="eyebrow">Delivered engagement</p>
                  <div className="mt-4 flex flex-wrap items-center gap-2">
                    <Badge tone="brand">{story.industry}</Badge>
                    <span className="text-xs text-faint">{story.org}</span>
                  </div>
                  <h2 className="mt-4 text-2xl font-bold leading-snug text-ink sm:text-3xl">{story.headline}</h2>

                  <div className="mt-5 border-l-2 border-accent/30 pl-4"><p className="text-[10px] font-semibold uppercase tracking-widest text-accent">Engagement outcome</p><p className="mt-2 text-sm leading-relaxed text-muted">{story.summary}</p></div>
                  <dl className="mt-6 grid grid-cols-3 gap-4 border-t border-line pt-5">
                    {story.metrics.map((m) => (
                      <div key={m.label}>
                        <dt className="text-xl font-bold text-accent">{m.value}</dt>
                        <dd className="mt-0.5 text-xs leading-tight text-muted">{m.label}</dd>
                      </div>
                    ))}
                  </dl>
                  <Link
                    href={`/case-studies/${story.slug}`}
                    className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-accent hover:gap-2.5"
                  >
                    Read the full case study <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              ) : (
                <div>
                  <p className="eyebrow">Proven before commitment</p>
                  <h2 className="mt-4 text-2xl font-bold leading-snug text-ink sm:text-3xl">
                    Run it on your estate for 90 days before any licensing decision.
                  </h2>
                  <p className="mt-4 leading-relaxed text-muted">
                    A half-day discovery workshop sets the success criteria with your technology and finance leaders. Then the
                    platform runs on your own estate for 90 days with no licence cost — inventory live, cost decomposed, one audit
                    report, one AI use case — and is scored against those criteria on day 90.
                  </p>
                  <Link href="/platform#prototype" className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-accent hover:gap-2.5">
                    How the 90-day prototype works <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              )}
            </Reveal>

            <Reveal delay={120}>
              <div className="lg:sticky lg:top-28 lg:self-start">
                <div className="rounded-lg border border-line bg-surface p-7 shadow-sm">
                  <p className="eyebrow">Recommended editions</p>
                  <div className="mt-5 space-y-3">
                    {recEditions.map((e) => (
                      <Link
                        key={e.slug}
                        href={`/editions/${e.slug}`}
                        className="group flex items-center justify-between rounded-md border border-line bg-canvas p-4 transition-colors hover:border-line-strong"
                      >
                        <div>
                          <div className="font-bold text-ink">
                            {e.name}
                            {e.comingSoon && <span className="ml-2 text-xs font-medium text-faint">preview · GA {e.gaTarget}</span>}
                          </div>
                          <div className="text-xs text-muted">{e.tagline} · {e.priceAnchor}</div>
                        </div>
                        <ArrowRight className="h-4 w-4 shrink-0 text-accent transition-transform group-hover:translate-x-0.5" />
                      </Link>
                    ))}
                  </div>
                  <p className="mt-6 border-t border-line pt-5 text-sm leading-relaxed text-muted">
                    <span className="font-semibold text-ink">Who it&apos;s for:</span> {solution.audience}
                  </p>
                  <div className="mt-6 border-t border-line pt-5">
                    <p className="eyebrow">Related solutions</p>
                    <ul className="mt-3 space-y-2">
                      {siblings.map((s) => (
                        <li key={s.slug}>
                          <Link href={`/solutions/${s.slug}`} className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink hover:text-accent">
                            <Icon name={s.icon} className="h-3.5 w-3.5 text-accent" />
                            {s.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      <FAQ
        items={solution.faq}
        title="Questions teams ask in the evaluation"
        description="Scope, permissions, integrations and what is live today."
      />

      <ClosingCTA
        eyebrow="Next step"
        title={`${solution.name}, on your own estate.`}
        body="Bring one cloud account or one on-prem site. We connect it read-only during the session, walk this workflow on your real resources, and leave you with the export."
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
        tertiary={{ label: "Compare the four editions", href: "/editions", note: "see which one includes it" }}
      />
    </InnerPage>
  );
}
