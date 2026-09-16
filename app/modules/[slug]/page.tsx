import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight, BookOpen, Check, Minus } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { FactStrip } from "@/components/ui/FactStrip";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { ModuleDiagram } from "@/components/diagrams/ModuleDiagram";
import { HeroArt, HeroArtMobile } from "@/components/scenes/ProductScene";
import { ConsoleMockup } from "@/components/sections/mockups/ConsoleMockup";
import { FAQ } from "@/components/sections/FAQ";
import { ClosingCTA } from "@/components/sections/ClosingCTA";
import { getModules, getModule, getSolutions, getIndustries } from "@/lib/content";
import { moduleGroups, modules } from "@/content/modules";
import { editions } from "@/content/editions";
import { moduleDetails } from "@/content/moduleDetails";

/** Module → the documentation page that covers it, where one exists. */
const DOCS: Record<string, { slug: string; label: string }> = {
  "cloud-connectors": { slug: "cloud-integration", label: "Cloud integration guide" },
  inventory: { slug: "quick-start", label: "Quick start — first discovery" },
  identity: { slug: "identity-access", label: "SSO, SCIM & RBAC guide" },
  provisioning: { slug: "service-catalog", label: "Service catalog guide" },
  itsm: { slug: "api-reference", label: "Webhooks & events reference" },
  observe: { slug: "api-reference", label: "Events & API reference" },
};

const stripStatus = (tagline: string) => tagline.replace(/\s*\([^)]*\)\s*$/, "");

export function generateStaticParams() {
  return getModules().map((m) => ({ slug: m.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const m = getModule(slug);
  if (!m) return {};
  const d = moduleDetails[slug];
  return { title: `${m.name} — ${stripStatus(m.tagline)}`, description: d?.summary ?? m.description };
}

export default async function ModuleDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const mod = getModule(slug);
  const detail = moduleDetails[slug];
  if (!mod || !detail) notFound();

  const docs = DOCS[slug];
  const siblings = modules.filter((m) => m.group === mod.group && m.slug !== slug);
  const usedBySolutions = getSolutions().filter((s) => s.modules.includes(slug));
  const usedByIndustries = getIndustries().filter((i) =>
    i.useCases?.some((u) => u.modules?.includes(slug)),
  );
  const stepsTitle = detail.howItWorks.map((s) => s.title).join(" → ");

  return (
    <>
      {/* ── Hero ── */}
      <section className="relative overflow-hidden border-b border-line bg-white py-12 sm:py-16 lg:min-h-[620px]">
        <HeroArt scene={mod.slug} />
        <Container className="pointer-events-none relative">
          <Breadcrumbs
            className="pointer-events-auto"
            items={[
              { label: "Platform", href: "/platform" },
              { label: moduleGroups[mod.group], href: `/modules#${mod.group}` },
              { label: mod.name },
            ]}
          />
          <div className="pointer-events-auto mt-10 lg:max-w-[46%]">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <Badge tone={detail.status.tone}>{detail.status.label}</Badge>
                <Badge tone="neutral">{moduleGroups[mod.group]}</Badge>
              </div>
              <h1 className="display-1 mt-6 text-ink">{mod.name}</h1>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">{detail.summary}</p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <div>
                  <Button href="/contact?intent=demo" size="lg">
                    See it on your estate
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                  <p className="mt-2 text-xs text-faint">45 minutes · one of your accounts, connected read-only</p>
                </div>
                {docs ? (
                  <Button href={`/docs/${docs.slug}`} size="lg" variant="outline">
                    <BookOpen className="h-4 w-4" />
                    {docs.label}
                  </Button>
                ) : (
                  <Button href="/editions" size="lg" variant="outline">
                    Which edition includes it
                  </Button>
                )}
              </div>
            </div>
          </div>
          <HeroArtMobile scene={mod.slug} />
        </Container>
      </section>
      <section className="border-b border-line bg-sunken py-8">
        <Container>
          <Reveal delay={120}>
            <FactStrip facts={detail.facts} />
          </Reveal>
        </Container>
      </section>

      {/* ── What it does ── */}
      <section className="bg-canvas py-20 sm:py-24">
        <Container>
          <div className="grid gap-x-16 gap-y-10 lg:grid-cols-[0.8fr_1.2fr]">
            <Reveal>
              <div className="lg:sticky lg:top-28 lg:self-start">
                <SectionHeading
                  eyebrow="What it does"
                  title={stripStatus(mod.tagline)}
                  description={mod.description}
                />
              </div>
            </Reveal>
            <div className="grid gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-2">
              {detail.capabilities.map((c, i) => (
                <Reveal key={c.title} delay={(i % 2) * 70}>
                  <div className="flex h-full flex-col bg-surface p-6 sm:p-7">
                    <span className="num text-sm font-bold text-accent">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="mt-3 text-lg font-bold leading-snug text-ink">{c.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted">{c.body}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* ── How it works + the console ── */}
      <section className="border-y border-line bg-sunken py-20 sm:py-24">
        <Container>
          <div className="grid items-start gap-x-16 gap-y-12 lg:grid-cols-[0.85fr_1.15fr]">
            <Reveal>
              <div>
                <SectionHeading eyebrow="How it works" title={stepsTitle} />
                <ol className="mt-8 flex flex-col">
                  {detail.howItWorks.map((s, i) => (
                    <li
                      key={s.title}
                      className="flex items-start gap-4 border-t border-line py-5 first:border-t-0 first:pt-0"
                    >
                      <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-primary text-sm font-bold text-primary-fg">
                        {i + 1}
                      </span>
                      <div>
                        <h3 className="font-bold text-ink">{s.title}</h3>
                        <p className="mt-1 text-sm leading-relaxed text-muted">{s.body}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            </Reveal>
            <Reveal delay={100} className="min-w-0">
              <div className="min-w-0">
                <ConsoleMockup screen={detail.screen} />
                <p className="mt-3 text-xs text-faint">
                  {mod.name} in the console — {detail.screen.title.toLowerCase()}. Illustrative screen with sample data.
                </p>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* ── Where it fits ── */}
      <section className="bg-canvas py-20 sm:py-24">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="Where it fits"
              title="One module of one platform"
              description={`${mod.name} reads from and writes to the same inventory, identity and policy plane as every other family — which is why it shows up inside solutions, industries and editions rather than as a separate product.`}
            />
          </Reveal>
          <div className="mt-12 grid items-start gap-x-16 gap-y-12 lg:grid-cols-[1fr_0.9fr]">
            <Reveal className="min-w-0">
              <div className="min-w-0 overflow-hidden">
                <ModuleDiagram module={mod} />
              </div>
            </Reveal>
            <Reveal delay={100}>
              <div className="flex flex-col gap-8">
                {/* editions */}
                <div>
                  <p className="eyebrow text-accent">Included in</p>
                  <ul className="mt-3 divide-y divide-line rounded-lg border border-line bg-surface">
                    {editions.map((e) => {
                      const included = e.modules.includes(slug);
                      return (
                        <li key={e.slug} className="flex items-center justify-between gap-4 px-4 py-3 text-sm">
                          <Link href={`/editions/${e.slug}`} className="font-semibold text-ink hover:text-accent">
                            {e.name} Edition
                            {e.comingSoon && (
                              <span className="ml-2 text-xs font-medium text-faint">
                                preview · GA {e.gaTarget}
                              </span>
                            )}
                          </Link>
                          {included ? (
                            <span className="inline-flex items-center gap-1.5 text-[var(--success-fg)]">
                              <Check className="h-4 w-4" /> Included
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1.5 text-faint">
                              <Minus className="h-4 w-4" /> Not in this edition
                            </span>
                          )}
                        </li>
                      );
                    })}
                  </ul>
                </div>

                {/* solutions */}
                {usedBySolutions.length > 0 && (
                  <div>
                    <p className="eyebrow text-accent">Solutions that use it</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {usedBySolutions.map((s) => (
                        <Link
                          key={s.slug}
                          href={`/solutions/${s.slug}`}
                          className="inline-flex items-center gap-1.5 rounded-full border border-line bg-surface px-3.5 py-1.5 text-sm font-medium text-muted transition-colors hover:border-accent hover:text-accent"
                        >
                          <Icon name={s.icon} className="h-3.5 w-3.5" />
                          {s.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                {/* industries */}
                {usedByIndustries.length > 0 && (
                  <div>
                    <p className="eyebrow text-accent">Industries that rely on it</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {usedByIndustries.map((i) => (
                        <Link
                          key={i.slug}
                          href={`/industries/${i.slug}`}
                          className="inline-flex items-center gap-1.5 rounded-full border border-line bg-surface px-3.5 py-1.5 text-sm font-medium text-muted transition-colors hover:border-accent hover:text-accent"
                        >
                          <Icon name={i.icon} className="h-3.5 w-3.5" />
                          {i.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                {/* siblings */}
                {siblings.length > 0 && (
                  <div>
                    <p className="eyebrow text-accent">Also in {moduleGroups[mod.group]}</p>
                    <ul className="mt-3 flex flex-col gap-2">
                      {siblings.map((m) => (
                        <li key={m.slug}>
                          <Link
                            href={`/modules/${m.slug}`}
                            className="group flex items-center justify-between rounded-lg border border-line bg-surface px-4 py-3 transition-colors hover:border-line-strong"
                          >
                            <span>
                              <span className="block font-semibold text-ink">{m.name}</span>
                              <span className="block text-xs text-muted">{stripStatus(m.tagline)}</span>
                            </span>
                            <ArrowRight className="h-4 w-4 shrink-0 text-accent transition-transform group-hover:translate-x-0.5" />
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {docs && (
                  <Link
                    href={`/docs/${docs.slug}`}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-accent hover:gap-3"
                  >
                    <BookOpen className="h-4 w-4" />
                    {docs.label}
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                )}
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      <FAQ
        items={detail.faq}
        title="Questions teams ask before turning it on"
        description="Scope, permissions and maturity — answered the way we answer them in an evaluation."
        tinted
      />

      <ClosingCTA
        eyebrow="See it on your data"
        title={`${mod.name}, on your own estate — in one working session.`}
        body="Bring one cloud account or one on-prem site. We connect it read-only during the call, walk the module on your real resources, and leave you with the export."
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
    </>
  );
}
