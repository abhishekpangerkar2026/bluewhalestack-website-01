import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Check, ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { Stat } from "@/components/ui/Stat";
import { Placeholder } from "@/components/ui/Placeholder";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { ArchitectureDiagram } from "@/components/diagrams/ArchitectureDiagram";
import { getSolutions, getSolution, getModule, getEdition } from "@/lib/content";

export function generateStaticParams() {
  return getSolutions().map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const s = getSolution(slug);
  if (!s) return {};
  return { title: s.name, description: s.summary };
}

export default async function SolutionDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const solution = getSolution(slug);
  if (!solution) notFound();

  const relatedModules = solution.modules
    .map((m) => getModule(m))
    .filter((m): m is NonNullable<typeof m> => Boolean(m));
  const recEditions = (solution.editions ?? [])
    .map((e) => getEdition(e))
    .filter((e): e is NonNullable<typeof e> => Boolean(e));

  return (
    <>
      {/* ── Hero: light band, oversized title ── */}
      <section className="border-b border-line bg-sunken py-24 sm:py-32">
        <Container>
          <div className="max-w-3xl">
            <div className="flex items-center gap-3">
              <span className="grid h-12 w-12 place-items-center rounded-lg bg-primary text-primary-fg shadow-sm">
                <Icon name={solution.icon} className="h-6 w-6" />
              </span>
              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
                Solution
              </span>
            </div>
            <h1 className="mt-7 font-display text-4xl font-bold leading-[1.04] tracking-tight text-ink sm:text-5xl lg:text-6xl">
              {solution.name}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted sm:text-xl">
              {solution.summary}
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Button href="/contact" size="lg">
                Book a demo
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button href="#architecture" size="lg" variant="secondary">
                View architecture
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* ── The challenge: big editorial statement, left-aligned ── */}
      <section className="bg-canvas py-20 sm:py-24">
        <Container>
          <div className="grid gap-x-16 gap-y-8 lg:grid-cols-[0.35fr_0.65fr]">
            <Reveal>
              <div className="flex items-center gap-3">
                <span className="font-display text-sm font-bold text-accent num">
                  01
                </span>
                <span aria-hidden className="h-px w-8 bg-line-strong" />
                <span className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
                  The challenge
                </span>
              </div>
            </Reveal>
            <Reveal delay={80}>
              <p className="font-display text-2xl font-bold leading-snug tracking-tight text-ink sm:text-3xl">
                {solution.problem}
              </p>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* ── Architecture: tinted band, left heading ── */}
      <section
        id="architecture"
        className="scroll-mt-24 border-y border-line bg-sunken py-20 sm:py-24"
      >
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="Reference architecture"
              title={`How ${solution.name} works`}
            />
          </Reveal>
          <Reveal delay={100}>
            <div className="mt-12">
              {solution.architectureId ? (
                <ArchitectureDiagram id={solution.architectureId} />
              ) : (
                <Placeholder
                  label={`${solution.name} — architecture diagram`}
                  ratio="21/9"
                  tone="brand"
                />
              )}
            </div>
          </Reveal>

          {solution.flow && solution.flow.length > 0 && (
            <Reveal delay={140}>
              <ol className="mt-12 grid gap-x-10 gap-y-6 sm:grid-cols-2">
                {solution.flow.map((step, i) => (
                  <li
                    key={step}
                    className="flex items-start gap-4 border-t-2 border-line-strong pt-4"
                  >
                    <span className="font-display text-2xl font-bold text-accent num">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="pt-1 leading-relaxed text-muted">
                      {step}
                    </span>
                  </li>
                ))}
              </ol>
            </Reveal>
          )}
        </Container>
      </section>

      {/* ── Approach: asymmetric, what's included + sticky editions panel ── */}
      <section className="bg-canvas py-20 sm:py-24">
        <Container>
          <div className="grid gap-x-16 gap-y-12 lg:grid-cols-[1.1fr_0.9fr]">
            <Reveal>
              <div>
                <SectionHeading title="What's included" />
                <ul className="mt-8 flex flex-col">
                  {solution.features.map((f) => (
                    <li
                      key={f}
                      className="flex items-start gap-4 border-t border-line py-4 first:border-t-0 first:pt-0"
                    >
                      <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-brand-50 text-accent">
                        <Check className="h-3.5 w-3.5" />
                      </span>
                      <span className="text-base leading-relaxed text-muted">
                        {f}
                      </span>
                    </li>
                  ))}
                </ul>
                {relatedModules.length > 0 && (
                  <div className="mt-10">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-faint">
                      Modules used
                    </p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {relatedModules.map((m) => (
                        <Link
                          key={m.slug}
                          href={`/modules/${m.slug}`}
                          className="inline-flex items-center gap-1.5 rounded-full border border-line bg-surface px-3.5 py-1.5 text-sm font-medium text-muted transition-colors hover:border-line-strong hover:text-accent"
                        >
                          {m.name} <ArrowRight className="h-3 w-3" />
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </Reveal>

            {/* Recommended editions */}
            <Reveal delay={120}>
              <div className="lg:sticky lg:top-28 lg:self-start">
                <div className="rounded-lg border border-line bg-surface p-7 shadow-sm">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
                    Recommended editions
                  </p>
                  <div className="mt-5 space-y-3">
                    {(recEditions.length ? recEditions : []).map((e) => (
                      <Link
                        key={e.slug}
                        href={`/editions/${e.slug}`}
                        className="group flex items-center justify-between rounded-md border border-line bg-canvas p-4 transition-colors hover:border-line-strong"
                      >
                        <div>
                          <div className="font-display font-bold text-ink">
                            {e.name}
                          </div>
                          <div className="text-xs text-muted">{e.tagline}</div>
                        </div>
                        <ArrowRight className="h-4 w-4 text-accent transition-transform group-hover:translate-x-0.5" />
                      </Link>
                    ))}
                    {recEditions.length === 0 && (
                      <Link
                        href="/editions"
                        className="group flex items-center justify-between rounded-md border border-line bg-canvas p-4 transition-colors hover:border-line-strong"
                      >
                        <span className="font-medium text-ink">
                          Compare all editions
                        </span>
                        <ArrowRight className="h-4 w-4 text-accent transition-transform group-hover:translate-x-0.5" />
                      </Link>
                    )}
                  </div>
                  <p className="mt-6 border-t border-line pt-5 text-sm leading-relaxed text-muted">
                    <span className="font-semibold text-ink">
                      Who it&apos;s for:
                    </span>{" "}
                    {solution.audience}
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* ── Outcomes: huge numbers on brand statement band ── */}
      <section className="bg-primary py-20 text-primary-fg">
        <Container>
          <Reveal>
            <SectionHeading eyebrow="Impact" title="Measurable outcomes" inverse />
          </Reveal>
          <div className="mt-12 grid grid-cols-2 gap-x-8 gap-y-12 lg:grid-cols-4">
            {solution.outcomes.map((o, i) => (
              <Reveal key={o.label} delay={i * 70}>
                <Stat value={o.value} label={o.label} inverse />
              </Reveal>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
