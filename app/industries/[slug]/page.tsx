import { InnerPage } from "@/components/layout/InnerPage";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { FactStrip } from "@/components/ui/FactStrip";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { ArchitectureDiagram } from "@/components/diagrams/ArchitectureDiagram";
import { StoryVisual } from "@/components/sections/CustomerStories";
import { FAQ } from "@/components/sections/FAQ";
import { ClosingCTA } from "@/components/sections/ClosingCTA";
import { INDUSTRY_POSTER } from "@/content/industryPosters";
import { IndustryArchitecturePoster } from "@/components/diagrams/IndustryArchitecturePoster";
import { customerStories } from "@/content/customers";
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
  return { title: `${i.name} — ${i.title}`, description: i.description };
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
  const preview = Boolean(edition?.comingSoon);
  const story = industry.story ? customerStories.find((c) => c.slug === industry.story) : undefined;
  const poster = INDUSTRY_POSTER[industry.slug];

  return (
    <InnerPage category="solutions" current="/industries">
      {/* ── Hero ── */}
      <section className="border-b border-line bg-white py-12 sm:py-16">
        <Container>
          <Breadcrumbs items={[{ label: "Industries", href: "/industries" }, { label: industry.name }]} />
          <div className="mt-10 max-w-3xl">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="grid h-11 w-11 place-items-center rounded-lg bg-primary text-primary-fg">
                  <Icon name={industry.icon} className="h-5 w-5" />
                </span>
                <Badge tone="neutral">BlueWhale Stack for {industry.name}</Badge>
                {edition &&
                  (preview ? (
                    <Badge tone="warning">
                      {edition.name} Edition in preview{edition.gaTarget ? ` · GA ${edition.gaTarget}` : ""}
                    </Badge>
                  ) : (
                    <Badge tone="success">Available now on {edition.name} Edition</Badge>
                  ))}
              </div>
              <h1 className="mt-6 display-1 text-ink">{industry.title}</h1>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">{industry.description}</p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <div>
                  <Button href={preview ? "/contact?intent=preview" : "/contact?intent=demo"} size="lg">
                    {preview ? `Join the ${edition?.gaTarget ?? ""} preview`.replace("  ", " ") : "See it on your estate"}
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                  <p className="mt-2 text-xs text-faint">
                    {preview
                      ? "Design partners deploy on their own infrastructure with BlueWhale engineers"
                      : "45 minutes · one of your accounts, connected read-only"}
                  </p>
                </div>
                {edition && (
                  <Button href={`/editions/${edition.slug}`} size="lg" variant="outline">
                    {edition.name} Edition
                  </Button>
                )}
              </div>
            </div>
          </div>
        </Container>
      </section>
      <section className="border-b border-line bg-sunken py-8">
        <Container>
          <Reveal delay={120}>
            <FactStrip facts={industry.kpis} />
          </Reveal>
        </Container>
      </section>

      {/* ── Regulatory reality: a table, not a chip cloud ── */}
      <section className="bg-canvas py-20 sm:py-24">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="Regulatory reality"
              title="The regimes, and the control that answers each"
              description={`Mapped here: ${industry.compliance.join(" · ")}. Each row names what the regime actually demands and the platform control that produces the evidence.`}
            />
          </Reveal>
          <Reveal delay={100}>
            <div className="mt-12 overflow-x-auto rounded-lg border border-line bg-surface shadow-sm">
              <table className="w-full min-w-[720px] border-collapse text-sm">
                <thead>
                  <tr className="bg-primary text-left text-primary-fg">
                    <th className="px-5 py-3 font-semibold">Regime</th>
                    <th className="px-5 py-3 font-semibold">What it demands</th>
                    <th className="px-5 py-3 font-semibold">The control that answers it</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-line">
                  {industry.regimes.map((r) => (
                    <tr key={r.name} className="align-top">
                      <td className="w-56 px-5 py-4 font-semibold text-ink">{r.name}</td>
                      <td className="px-5 py-4 leading-relaxed text-muted">{r.demands}</td>
                      <td className="px-5 py-4 leading-relaxed text-ink">{r.control}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* ── Why + who: editorial split ── */}
      <section className="border-y border-line bg-sunken py-20 sm:py-28">
        <Container>
          <div className="grid gap-x-16 gap-y-14 lg:grid-cols-[1fr_1fr]">
            <Reveal>
              <div>
                <SectionHeading
                  eyebrow="Why BlueWhale Stack"
                  title={`What ${industry.name} teams get`}
                  description={`${industry.why.length} things the platform does for this sector, each with the mechanism behind it.`}
                />
                <ul className="mt-10 flex flex-col">
                  {industry.why.map((w, i) => (
                    <li key={w} className="flex items-start gap-5 border-t border-line py-5 first:border-t-0 first:pt-0">
                      <span className="text-xl font-bold text-accent num">{String(i + 1).padStart(2, "0")}</span>
                      <span className="pt-0.5 text-base leading-relaxed text-muted sm:text-lg">{w}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            <Reveal delay={120}>
              <div className="lg:sticky lg:top-28 lg:self-start">
                <div className="rounded-lg border border-line bg-surface p-8 shadow-sm">
                  <p className="eyebrow text-accent">Who it&apos;s for</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {industry.targets.map((t) => (
                      <span key={t} className="rounded-full border border-line bg-canvas px-3 py-1 text-sm text-muted">
                        {t}
                      </span>
                    ))}
                  </div>
                  {edition && (
                    <div className="mt-8 border-t border-line pt-6">
                      <p className="eyebrow text-faint">Edition</p>
                      <p className="mt-2 font-bold text-ink">
                        {edition.name} Edition
                        {preview && <span className="ml-2 text-xs font-medium text-faint">preview · GA {edition.gaTarget}</span>}
                      </p>
                      <p className="mt-1 text-sm text-muted">{edition.tagline} · {edition.priceAnchor}</p>
                      <p className="mt-3 text-sm leading-relaxed text-muted">{edition.outcome}</p>
                      <Link
                        href={`/editions/${edition.slug}`}
                        className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-accent hover:gap-2.5"
                      >
                        What the edition includes <ArrowRight className="h-3.5 w-3.5" />
                      </Link>
                    </div>
                  )}
                  <div className="mt-8 border-t border-line pt-6">
                    <p className="eyebrow text-faint">Platform certifications</p>
                    <p className="mt-2 text-sm leading-relaxed text-muted">
                      ISO/IEC 27001, 27017, 27018, 27701 and ISO 22301, independently audited; SOC 2 Type II readiness assessment
                      complete.
                    </p>
                    <Link href="/trust" className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-accent hover:gap-2.5">
                      Trust Center <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Reference architecture — the official sector sheet where one exists, else the code diagram */}
      {poster ? (
        <section id="architecture" className="scroll-mt-24 bg-canvas py-20 sm:py-28">
          <Container>
            <Reveal>
              <SectionHeading
                eyebrow="Reference architecture"
                title={poster.subtitle}
                description={`The official ${poster.title} sheet, read top to bottom in seven bands: who uses it, the Digital Experience Layer, the Unified Platform Core, what it integrates with, the estates and data it governs, the path every request takes, and the deployment modes that fit. Gold marks the modules and modes that lead in ${industry.name.toLowerCase()} estates. Open it full screen to read every label.`}
              />
            </Reveal>
            <Reveal delay={100}>
              <div className="mt-12">
                {industry.architectureId && <ArchitectureDiagram id={industry.architectureId} />}
                <details className="mt-8 border-y border-line">
                  <summary className="cursor-pointer py-6 text-sm font-semibold text-ink">Explore the detailed seven-layer architecture sheet</summary>
                  <div className="pb-8"><IndustryArchitecturePoster poster={poster} sector={industry.name} /></div>
                </details>
              </div>
            </Reveal>
          </Container>
        </section>
      ) : (
        industry.architectureId && (
          <section id="architecture" className="scroll-mt-24 bg-canvas py-20 sm:py-28">
            <Container>
              <Reveal>
                <SectionHeading
                  eyebrow="Reference architecture"
                  title="The estates, the control plane, and what comes out"
                  description={`Read left to right: the estates a ${industry.name.toLowerCase()} organisation runs, the shared control plane over them, and the outcome delivered back — ${industry.outcome.toLowerCase()}.`}
                />
              </Reveal>
              <Reveal delay={100}>
                <div className="mt-12">
                  <ArchitectureDiagram id={industry.architectureId} />
                </div>
              </Reveal>
            </Container>
          </section>
        )
      )}

      {/* ── Use cases ── */}
      {industry.useCases && industry.useCases.length > 0 && (
        <section className="border-t border-line bg-sunken py-20 sm:py-28">
          <Container>
            <Reveal>
              <SectionHeading
                eyebrow="Use cases"
                title="Four workflows, mapped to the modules that run them"
                description={`How ${industry.name} teams use the platform day to day — each one linked to the module pages that explain the mechanism.`}
              />
            </Reveal>
            <div className="mt-14 grid gap-px overflow-hidden rounded-lg border border-line bg-line md:grid-cols-2">
              {industry.useCases.map((u, i) => (
                <Reveal key={u.title} delay={(i % 2) * 80}>
                  <div className="flex h-full flex-col bg-surface p-8">
                    <span className="text-sm font-bold text-faint num">{String(i + 1).padStart(2, "0")}</span>
                    <h3 className="mt-4 text-xl font-bold text-ink">{u.title}</h3>
                    <p className="mt-3 flex-1 leading-relaxed text-muted">{u.body}</p>
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

      {/* ── Sector case study ── */}
      {story && (
        <section className="border-t border-line bg-canvas py-20 sm:py-24">
          <Container>
            <div className="grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr]">
              <Reveal>
                <StoryVisual story={story} />
              </Reveal>
              <Reveal delay={100}>
                <div>
                  <p className="eyebrow text-accent">Delivered engagement</p>
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
              </Reveal>
            </div>
          </Container>
        </section>
      )}

      <FAQ
        items={industry.faq}
        title="Procurement, hosting and integration questions"
        description={`The questions ${industry.name} teams ask before an evaluation — answered the way we answer them in one.`}
        tinted
      />

      <ClosingCTA
        eyebrow={preview ? `In preview — GA ${edition?.gaTarget}` : "Next step"}
        title={preview ? `Shape the ${edition?.name} Edition on your own infrastructure.` : `Bring your ${industry.name} estate to a working session.`}
        body={
          preview
            ? "Design partners deploy the edition with BlueWhale engineers, run it on real tenants, and move to general-availability licensing on a pre-agreed basis."
            : `We connect one of your accounts read-only during the session, walk the ${industry.name} workflows above on your real resources, and leave you with the control mapping for your regimes.`
        }
        primary={
          preview
            ? { label: "Join the preview programme", href: "/contact?intent=preview", note: "Design-partner terms · your infrastructure · GA licensing agreed up front" }
            : { label: "Book a working session", href: "/contact?intent=demo", note: "45 minutes · a solutions engineer, not a sales deck · nothing installed on your side" }
        }
        secondary={{
          label: `Read the ${industry.name} brief`,
          href: `/resources/industry-${industry.slug}`,
          note: `${industry.regimes.map((r) => r.name).join(", ")} — each obligation mapped to a platform control, online or as a PDF.`,
        }}
        tertiary={edition ? { label: `${edition.name} Edition details`, href: `/editions/${edition.slug}`, note: edition.priceAnchor } : undefined}
      />
    </InnerPage>
  );
}
