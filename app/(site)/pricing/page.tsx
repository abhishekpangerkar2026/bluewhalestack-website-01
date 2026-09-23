import { InnerPage } from "@/components/layout/InnerPage";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check, Minus } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { CmsPhotoHero } from "@/components/sections/CmsPhotoHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { ClosingCTA } from "@/components/sections/ClosingCTA";
import { pricingPageSpec } from "@/content/cms/docs/pricingPage";
import { pricingPage } from "@/content/sections/pricingPage";
import { getPageDoc } from "@/lib/cms-page";
import { getEditions, getModules } from "@/lib/content";
import { builtMetadata, builtPage } from "@/lib/builder/render";

const getContent = () => getPageDoc(pricingPageSpec, pricingPage);

export async function generateMetadata(): Promise<Metadata> {
  const builtMeta = await builtMetadata("/pricing");
  if (builtMeta) return builtMeta;
  const c = await getContent();
  return { title: c.seoTitle, description: c.seoDescription };
}

export default async function PricingPage() {
  const built = await builtPage("/pricing");
  if (built) return built;
  const [c, editions, modules] = await Promise.all([getContent(), getEditions(), getModules()]);
  return (
    <InnerPage category="pricing" current="/pricing">
      {/* ── Hero: editorial split, oversized statement left ── */}
      <CmsPhotoHero
        route="/pricing"
        photo="finops-balance"
        eyebrow="Pricing"
        title="Two published prices. Two shaped to the estate."
        description="Standard is $24,000 a year and Enterprise is $120,000 a year — flat, published, on 1-, 3- or 5-year terms with 10% off for two years and 15% off for three. The Telco & Datacenter and Government editions are priced per operator or per contract, because they are metered on network elements, racks or sovereignty scope rather than on cloud accounts."
        below={
          <div className="border-t border-line bg-sunken">
            <Container>
              <div className="grid gap-y-6 sm:grid-cols-3 sm:divide-x sm:divide-line">
                {c.hero.cells.map((cell, i) => {
                  // first · middle · last cells share the row; the last is the scoped, non-numeric one
                  const last = i === c.hero.cells.length - 1;
                  return (
                    <div key={cell.kicker} className={`py-6 ${i === 0 ? "sm:pr-6" : last ? "sm:pl-6" : "sm:px-6"}`}>
                      <p className="eyebrow">{cell.kicker}</p>
                      <p className={last ? "mt-2 text-3xl font-extrabold text-ink" : "num mt-2 text-3xl font-extrabold text-accent"}>{cell.value}</p>
                      <p className="mt-1 text-sm text-muted">{cell.note}</p>
                    </div>
                  );
                })}
              </div>
            </Container>
          </div>
        }
      >
        <p className="text-sm leading-relaxed text-muted">
          <span className="font-semibold text-ink">{c.hero.unitLabel}</span> {c.hero.unitText}
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Button href={c.hero.primary.href} size="lg">
            {c.hero.primary.label}
            <ArrowRight className="h-4 w-4" />
          </Button>
          <Button href={c.hero.secondary.href} size="lg" variant="outline">
            {c.hero.secondary.label}
          </Button>
        </div>
      </CmsPhotoHero>

      {/* ── Tier cards: asymmetric, featured edition pulled forward ── */}
      <section className="bg-canvas py-20 sm:py-24">
        <Container>
          <Reveal>
            <SectionHeading {...c.tiers.heading} />
          </Reveal>
          <div className="mt-14 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {editions.map((e, i) => (
              <Reveal key={e.slug} delay={(i % 4) * 60}>
                <div
                  className={`group relative flex h-full flex-col overflow-hidden rounded-lg p-6 transition-all duration-200 ${
                    e.comingSoon
                      ? "border border-line bg-sunken"
                      : e.featured
                      ? "bg-surface shadow-md ring-2 ring-primary hover:-translate-y-0.5"
                      : "border border-line bg-surface shadow-sm hover:-translate-y-0.5 hover:border-line-strong hover:shadow-md"
                  }`}
                >
                  <div className="relative flex flex-1 flex-col">
                    <div className="flex items-center justify-between">
                      {e.comingSoon ? (
                        <Badge tone="neutral">
                          {c.tiers.previewLabel}{e.gaTarget ? ` · GA ${e.gaTarget}` : ""}
                        </Badge>
                      ) : e.featured ? (
                        <Badge tone="brand" className="self-start">
                          {c.tiers.popularLabel}
                        </Badge>
                      ) : (
                        <span className="num text-sm font-bold text-faint">
                          0{i + 1}
                        </span>
                      )}
                    </div>
                    <h3 className="mt-4 text-xl font-bold text-ink">
                      {e.name}
                    </h3>
                    <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-accent">
                      {e.tagline}
                    </p>
                    <div className="mt-4 num text-lg font-bold text-ink">
                      {e.priceAnchor}
                    </div>
                    {e.priceSub && (
                      <p className="mt-1 text-xs leading-snug text-faint">
                        {e.priceSub}
                      </p>
                    )}
                    <p className="mt-3 text-sm leading-relaxed text-muted">
                      <span className="font-semibold text-ink">{c.tiers.forLabel}</span> {e.audience}
                    </p>
                    <ul className="mt-3 flex-1 space-y-1.5">
                      {e.includes.map((x) => (
                        <li key={x} className="flex items-start gap-2 text-sm text-ink">
                          <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                          {x}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-4 text-xs text-faint">
                      {e.deploy.join(" · ")}
                    </div>
                    <Button
                      href={e.comingSoon ? "/contact?intent=preview" : "/contact?intent=sales"}
                      size="sm"
                      variant={e.featured ? "primary" : "secondary"}
                      className="mt-5"
                    >
                      {e.comingSoon
                        ? c.tiers.previewCta
                        : ["standard", "enterprise"].includes(e.slug)
                        ? c.tiers.quoteCta
                        : c.tiers.salesCta}
                    </Button>
                    <Link
                      href={`/editions/${e.slug}`}
                      className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-accent"
                    >
                      {c.tiers.detailsLink} <ArrowRight className="h-3 w-3" />
                    </Link>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* ── What drives the price ── */}
      <section className="border-t border-line bg-canvas py-20 sm:py-24">
        <Container>
          <Reveal>
            <SectionHeading {...c.drivers.heading} />
          </Reveal>
          <div className="mt-12 grid gap-px overflow-hidden rounded-lg border border-line bg-line md:grid-cols-2 lg:grid-cols-4">
            {c.drivers.items.map((d) => (
              <div key={d.label} className="bg-surface p-6">
                <p className="font-bold text-ink">{d.label}</p>
                <p className="mt-2 text-sm leading-relaxed text-muted">{d.body}</p>
              </div>
            ))}
          </div>
          <Reveal delay={100}>
            <div className="mt-8 rounded-lg border-l-4 border-amber-400 bg-sunken p-6 text-sm leading-relaxed text-ink">
              <span className="font-bold">{c.drivers.exampleLabel}</span> {c.drivers.example}
            </div>
          </Reveal>
        </Container>
      </section>

      {/* ── Comparison matrix ── */}
      <section id="compare" className="scroll-mt-20 bg-sunken py-20 sm:py-24">
        <Container>
          <Reveal>
            <SectionHeading {...c.compare.heading} />
          </Reveal>
          <Reveal delay={80}>
            <div className="mt-12 overflow-x-auto rounded-lg border border-line bg-surface shadow-sm">
              <table className="w-full min-w-[760px] border-collapse text-sm">
                <thead>
                  <tr className="border-b border-line">
                    <th className="py-4 pl-6 pr-4 text-left font-bold text-ink">
                      {c.compare.moduleColumn}
                    </th>
                    {editions.map((e) => (
                      <th
                        key={e.slug}
                        className="px-3 py-4 text-center font-bold"
                      >
                        <span className={e.comingSoon ? "text-faint" : "text-ink"}>{e.name}</span>
                        {e.comingSoon && (
                          <span className="mt-0.5 block text-xs font-medium text-faint">
                            {c.tiers.previewLabel}{e.gaTarget ? ` · GA ${e.gaTarget}` : ""}
                          </span>
                        )}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {modules.map((m, i) => (
                    <tr
                      key={m.slug}
                      className={`border-b border-line last:border-0 ${i % 2 === 1 ? "bg-sunken/60" : ""}`}
                    >
                      <td className="py-3 pl-6 pr-4 text-left font-medium text-muted">
                        {m.name}
                      </td>
                      {editions.map((e) => (
                        <td key={e.slug} className="px-3 py-3 text-center">
                          {e.modules.includes(m.slug) ? (
                            <Check className="mx-auto h-4 w-4 text-accent" />
                          ) : (
                            <Minus className="mx-auto h-4 w-4 text-faint" />
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* ── FAQ: split editorial — heading left, numbered list right ── */}
      <section className="bg-canvas py-20 sm:py-24">
        <Container>
          <div className="grid gap-x-16 gap-y-12 lg:grid-cols-[0.8fr_1.2fr]">
            <Reveal>
              <div className="lg:sticky lg:top-28 lg:self-start">
                <SectionHeading {...c.faq.heading} />
                <Button href={c.faq.cta.href} variant="secondary" className="mt-8">
                  {c.faq.cta.label}
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </Reveal>
            <div className="flex flex-col">
              {c.faq.items.map((f, i) => (
                <Reveal key={f.q} delay={i * 70}>
                  <div className="group flex items-start gap-6 border-t border-line py-7 first:border-t-0 first:pt-0">
                    <span className="num text-2xl font-bold text-accent/40">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <h3 className="text-lg font-bold text-ink">
                        {f.q}
                      </h3>
                      <p className="mt-2 leading-relaxed text-muted">
                        {f.a}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <ClosingCTA {...c.closing} />
    </InnerPage>
  );
}
