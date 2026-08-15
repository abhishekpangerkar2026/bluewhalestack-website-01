import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Check, ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Stat } from "@/components/ui/Stat";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { ArchitectureDiagram } from "@/components/diagrams/ArchitectureDiagram";
import { IndustryVisual } from "@/components/diagrams/IndustryVisual";
import { getIndustries, getIndustry, getEdition, getModule } from "@/lib/content";

export function generateStaticParams() {
  return getIndustries().map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const i = getIndustry(slug);
  if (!i) return {};
  return { title: `${i.name} Cloud`, description: i.description };
}

export default async function IndustryDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const industry = getIndustry(slug);
  if (!industry) notFound();
  const edition = getEdition(industry.edition);

  return (
    <>
      {/* ── Hero: asymmetric split, oversized title left / visual right ── */}
      <section className="relative overflow-hidden border-b border-line bg-sunken py-16 sm:py-24">
        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
            <div>
              <div className="flex flex-wrap items-center gap-3">
                <span className="grid h-12 w-12 place-items-center rounded-lg bg-primary text-primary-fg">
                  <Icon name={industry.icon} className="h-6 w-6" />
                </span>
                <Badge tone="neutral">{industry.name}</Badge>
                {edition?.comingSoon ? (
                  <Badge
                    tone="neutral"
                    className="border-amber-300 bg-amber-50 text-amber-700"
                  >
                    {edition.name} Edition in preview
                    {edition.gaTarget ? ` · GA ${edition.gaTarget}` : ""}
                  </Badge>
                ) : (
                  edition && (
                    <Badge
                      tone="neutral"
                      className="border-emerald-300 bg-emerald-50 text-emerald-700"
                    >
                      Available now on {edition.name} Edition
                    </Badge>
                  )
                )}
              </div>
              <h1 className="mt-6 text-[2.4rem] font-bold leading-[1.03] tracking-tight text-ink sm:text-5xl lg:text-6xl">
                {industry.title}
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
                {industry.description}
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button href="/contact" size="lg">
                  {edition?.comingSoon ? "Join the preview" : "Book a demo"}
                  <ArrowRight className="h-4 w-4" />
                </Button>
                {edition && (
                  <Button href={`/editions/${edition.slug}`} size="lg" variant="secondary">
                    {edition.name} Edition
                  </Button>
                )}
              </div>
            </div>
            <IndustryVisual industry={industry} />
          </div>
        </Container>
      </section>

      {/* ── KPIs: huge numbers on a dark band ── */}
      <section className="relative overflow-hidden bg-brand-900 py-16 text-white">
        <Container className="relative">
          <div className="grid grid-cols-2 gap-x-8 gap-y-10 lg:grid-cols-4">
            {industry.kpis.map((k, i) => (
              <Reveal key={k.label} delay={i * 70}>
                <Stat value={k.value} label={k.label} inverse />
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* ── Why + compliance: editorial split ── */}
      <section className="bg-canvas py-20 sm:py-28">
        <Container>
          <div className="grid gap-x-16 gap-y-14 lg:grid-cols-[1fr_1fr]">
            <Reveal>
              <div>
                <SectionHeading
                  eyebrow="Why BlueWhale Stack"
                  title={`Built for ${industry.name}`}
                />
                <ul className="mt-10 flex flex-col">
                  {industry.why.map((w, i) => (
                    <li
                      key={w}
                      className="flex items-start gap-5 border-t border-line py-5 first:border-t-0 first:pt-0"
                    >
                      <span className="text-xl font-bold text-accent num">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="pt-0.5 text-lg leading-relaxed text-muted">
                        {w}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            <Reveal delay={120}>
              <div className="lg:sticky lg:top-28 lg:self-start">
                <div className="rounded-lg border border-line bg-sunken p-8">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
                    Compliance &amp; controls
                  </p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {industry.compliance.map((c) => (
                      <Badge key={c} tone="brand">
                        {c}
                      </Badge>
                    ))}
                  </div>
                  <h3 className="mt-9 text-xs font-semibold uppercase tracking-[0.18em] text-faint">
                    Who it&apos;s for
                  </h3>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {industry.targets.map((t) => (
                      <span
                        key={t}
                        className="rounded-full border border-line bg-surface px-3 py-1 text-sm text-muted"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  <Link
                    href="/industries"
                    className="mt-9 inline-flex items-center gap-1.5 text-sm font-semibold text-accent hover:gap-2.5"
                  >
                    All industries <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Reference architecture */}
      {industry.architectureId && (
        <section className="border-y border-line bg-sunken py-20 sm:py-28">
          <Container>
            <Reveal>
              <SectionHeading
                eyebrow="Reference architecture"
                title={`How BlueWhale Stack serves ${industry.name}`}
              />
            </Reveal>
            <Reveal delay={100}>
              <div className="mt-12">
                <ArchitectureDiagram id={industry.architectureId} />
              </div>
            </Reveal>
          </Container>
        </section>
      )}

      {/* ── Use cases: asymmetric numbered grid ── */}
      {industry.useCases && industry.useCases.length > 0 && (
        <section className="bg-canvas py-20 sm:py-28">
          <Container>
            <Reveal>
              <SectionHeading
                eyebrow="Use cases"
                title={`What ${industry.name} teams build`}
                description="Concrete scenarios, mapped to the platform modules that deliver them."
              />
            </Reveal>
            <div className="mt-14 grid gap-px overflow-hidden rounded-lg border border-line bg-line md:grid-cols-2">
              {industry.useCases.map((u, i) => (
                <Reveal key={u.title} delay={(i % 2) * 80}>
                  <div className="flex h-full flex-col bg-surface p-8">
                    <span className="text-sm font-bold text-faint num">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="mt-4 text-xl font-bold text-ink">
                      {u.title}
                    </h3>
                    <p className="mt-3 flex-1 leading-relaxed text-muted">
                      {u.body}
                    </p>
                    {u.modules && u.modules.length > 0 && (
                      <div className="mt-5 flex flex-wrap gap-2">
                        {u.modules.map((mslug) => {
                          const m = getModule(mslug);
                          return m ? (
                            <Link
                              key={mslug}
                              href={`/modules/${mslug}`}
                              className="inline-flex items-center gap-1 rounded-full border border-line px-2.5 py-1 text-xs font-semibold text-muted transition-colors hover:border-accent hover:text-accent"
                            >
                              {m.name}
                            </Link>
                          ) : null;
                        })}
                      </div>
                    )}
                  </div>
                </Reveal>
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* ── Closing CTA band ── */}
      <section className="relative overflow-hidden bg-brand-900 py-20 sm:py-24">
        <Container className="relative">
          <Reveal>
            <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-2xl">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-200">
                  {edition?.comingSoon
                    ? `In preview${edition.gaTarget ? ` — GA ${edition.gaTarget}` : ""}`
                    : "Ready when you are"}
                </p>
                <h2 className="mt-5 text-3xl font-bold leading-[1.05] tracking-tight text-white sm:text-4xl">
                  Run {industry.name} on{" "}
                  <span className="text-brand-100">one control plane.</span>
                </h2>
              </div>
              <div className="flex flex-wrap gap-3">
                <Button href="/contact" size="lg" variant="white">
                  {edition?.comingSoon ? "Join the preview" : "Book a demo"}
                  <ArrowRight className="h-4 w-4" />
                </Button>
                {edition && (
                  <Button
                    href={`/editions/${edition.slug}`}
                    size="lg"
                    variant="ghost"
                    className="text-white hover:bg-white/10"
                  >
                    {edition.name} Edition
                  </Button>
                )}
              </div>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
