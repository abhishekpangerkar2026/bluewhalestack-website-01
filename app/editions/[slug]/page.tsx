import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowRight, Check, Clock } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { Placeholder } from "@/components/ui/Placeholder";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { ArchitectureDiagram } from "@/components/diagrams/ArchitectureDiagram";
import { getEditions, getEdition, getModulesForEdition } from "@/lib/content";
import { editions, editionSpecs } from "@/content/editions";

export function generateStaticParams() {
  return getEditions().map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const e = getEdition(slug);
  if (!e) return {};
  return { title: `${e.name} Edition`, description: e.positioning };
}

export default async function EditionDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const edition = getEdition(slug);
  if (!edition) notFound();
  const mods = getModulesForEdition(slug);

  return (
    <>
      {/* ── Coming Soon banner (Telco / Datacenter) ── */}
      {edition.comingSoon && (
        <div className="border-b border-line bg-sunken">
          <Container>
            <div className="flex items-center gap-3 py-4">
              <Clock className="h-4 w-4 shrink-0 text-muted" />
              <p className="text-sm text-muted">
                <span className="font-semibold text-ink">
                  {edition.name} Edition — Coming Soon.
                </span>{" "}
                This edition is in active development. Register your interest and we'll notify you when it becomes available.
              </p>
              <a
                href="/contact"
                className="ml-auto shrink-0 rounded-md border border-line bg-surface px-3 py-1.5 text-xs font-semibold text-ink hover:border-line-strong"
              >
                Register interest
              </a>
            </div>
          </Container>
        </div>
      )}

      {/* ── Hero: dark, oversized, asymmetric ── */}
      <section className={`relative overflow-hidden bg-brand-900 text-white ${edition.comingSoon ? "opacity-90" : ""}`}>
        <div
          aria-hidden
          className="pointer-events-none absolute -left-20 top-0 h-80 w-80 rounded-full bg-brand-500/30 blur-[110px]"
        />
        <Container className="relative">
          <div className="max-w-3xl py-20 sm:py-28">
            <div className="flex flex-wrap items-center gap-3">
              <Badge tone="neutral" className="bg-white/10 text-white">
                {edition.badge}
              </Badge>
              {edition.comingSoon && (
                <Badge tone="neutral" className="bg-amber-500/20 text-amber-300">
                  Coming Soon
                </Badge>
              )}
            </div>
            <h1 className="mt-6 text-[2.6rem] font-bold leading-[1.02] tracking-tight sm:text-5xl lg:text-6xl">
              {edition.headline}
            </h1>
            <p className="mt-4 text-lg font-semibold text-brand-100">
              {edition.tagline}
            </p>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/70">
              {edition.positioning}
            </p>
            <p className="mt-5 text-sm text-white/60">
              <span className="font-semibold text-white/80">For:</span>{" "}
              {edition.audience}
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              {edition.comingSoon ? (
                <>
                  <Button href="/contact" size="lg" variant="white">
                    Register interest
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                  <Button
                    href="/editions"
                    size="lg"
                    variant="ghost"
                    className="text-white hover:bg-white/10"
                  >
                    See available editions
                  </Button>
                </>
              ) : (
                <>
                  <Button href="/contact" size="lg" variant="white">
                    Book a demo
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                  <Button
                    href="/editions"
                    size="lg"
                    variant="ghost"
                    className="text-white hover:bg-white/10"
                  >
                    Compare editions
                  </Button>
                </>
              )}
            </div>
          </div>
        </Container>
      </section>

      {/* ── Key specs: hairline-divided strip ── */}
      <section className="border-b border-line bg-sunken py-12">
        <Container>
          <div className="grid gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-3">
            <Spec label="Deployment" value={edition.deploy.join(" · ")} />
            <Spec label="AI tier" value={edition.aiTier} />
            <Spec label="Price" value={edition.priceAnchor} />
          </div>
        </Container>
      </section>

      {/* ── Reference architecture ── */}
      <section className="bg-canvas py-20 sm:py-28">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="Reference architecture"
              title={`How ${edition.name} is deployed`}
            />
          </Reveal>
          <Reveal delay={100}>
            <div className="mt-12">
              {edition.architectureId ? (
                <ArchitectureDiagram id={edition.architectureId} />
              ) : (
                <Placeholder label={edition.diagram} ratio="21/9" tone="brand" />
              )}
            </div>
          </Reveal>
        </Container>
      </section>

      {/* ── What's included + quotas: editorial split on tinted band ── */}
      <section className="border-y border-line bg-sunken py-20 sm:py-28">
        <Container>
          <div className="grid gap-x-16 gap-y-14 lg:grid-cols-[1fr_1fr]">
            {/* Highlights */}
            <Reveal>
              <div>
                <SectionHeading
                  eyebrow="What's included"
                  title={`Inside ${edition.name}`}
                />
                <ul className="mt-10 flex flex-col">
                  {edition.highlights.map((h, i) => (
                    <li
                      key={h}
                      className="flex items-start gap-5 border-t border-line py-5 first:border-t-0 first:pt-0"
                    >
                      <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-brand-50 text-accent">
                        <Check className="h-3.5 w-3.5" />
                      </span>
                      <span className="text-lg leading-relaxed text-muted">
                        {h}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            {/* Quotas / specs */}
            <Reveal delay={120}>
              <div className="lg:sticky lg:top-28 lg:self-start">
                <div className="rounded-lg border border-line bg-surface p-8 shadow-sm">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
                    Specs &amp; quotas
                  </p>
                  <dl className="mt-5 divide-y divide-line">
                    {editionSpecs.map((row) => (
                      <div
                        key={row.label}
                        className="flex items-center justify-between gap-4 py-3"
                      >
                        <dt className="text-sm text-faint">{row.label}</dt>
                        <dd className="text-right text-sm font-semibold text-ink">
                          {row.values[slug] ?? "—"}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* ── Modules ── */}
      <section className="bg-canvas py-20 sm:py-28">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="Modules"
              title={`Modules in ${edition.name}`}
              description={`Every edition runs the same platform — these ${mods.length} modules are included by default.`}
            />
          </Reveal>
          <div className="mt-14 grid gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
            {mods.map((m, i) => (
              <Reveal key={m.slug} delay={(i % 3) * 60}>
                <div className="flex h-full flex-col bg-surface p-7">
                  <div className="grid h-11 w-11 place-items-center rounded-lg bg-brand-50 text-accent">
                    <Icon name={m.icon} className="h-5 w-5" />
                  </div>
                  <h3 className="mt-4 text-lg font-bold text-ink">
                    {m.name}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted">
                    {m.tagline}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* ── Scale comparison strip on tinted band ── */}
      <section className="border-t border-line bg-sunken py-20 sm:py-28">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="Compare"
              title={`How ${edition.name} compares`}
              description="Scale, deployment and support across every edition — your edition is highlighted."
            />
          </Reveal>
          <Reveal delay={100}>
            <div className="mt-12 overflow-x-auto rounded-lg border border-line bg-surface shadow-sm">
              <table className="w-full min-w-[820px] border-collapse text-sm">
                <thead>
                  <tr className="border-b border-line">
                    <th className="py-4 pl-5 pr-4 text-left font-semibold text-ink">
                      Dimension
                    </th>
                    {editions.map((e) => (
                      <th
                        key={e.slug}
                        className={`px-3 py-4 text-center font-semibold ${
                          e.slug === slug
                            ? "bg-brand-50 text-accent"
                            : "text-ink"
                        }`}
                      >
                        {e.name}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {editionSpecs.map((row) => (
                    <tr key={row.label} className="border-b border-line last:border-0">
                      <td className="py-3 pl-5 pr-4 text-left font-medium text-muted">
                        {row.label}
                      </td>
                      {editions.map((e) => (
                        <td
                          key={e.slug}
                          className={`px-3 py-3 text-center ${
                            e.slug === slug
                              ? "bg-brand-50 font-semibold text-accent"
                              : "text-muted"
                          }`}
                        >
                          {row.values[e.slug] ?? "—"}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>
          <div className="mt-8">
            <Button href="/editions" variant="secondary">
              See modules by edition
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}

function Spec({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-surface p-6">
      <dt className="text-xs font-semibold uppercase tracking-[0.18em] text-faint">
        {label}
      </dt>
      <dd className="mt-2 text-lg font-bold text-ink">{value}</dd>
    </div>
  );
}
