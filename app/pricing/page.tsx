import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check, Minus } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { getEditions } from "@/lib/content";
import { modules } from "@/content/modules";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "BlueWhale Stack pricing — five editions from Standard to fully sovereign, with a feature-by-edition comparison.",
};

const faqs = [
  {
    q: "What's included in each edition?",
    a: "Every edition runs the same control plane. Standard is scoped to three public clouds (AWS/Azure/GCP) and a single tenant. Enterprise unlocks all six public clouds, on-prem via Edge Agent, and multi-tenancy. Telco, Government, and Datacenter are full Enterprise plus domain-specific layers. See the comparison table below.",
  },
  {
    q: "Can I upgrade to a higher edition later?",
    a: "Yes — editions are licensing configurations of one platform, not separate products. Upgrading from Standard to Enterprise (or from Enterprise to Telco/Government/Datacenter) is a licensing change, not a migration or re-deployment.",
  },
  {
    q: "How does Managed Resource Unit (MRU) pricing work?",
    a: "Standard includes 1,000 MRU at the base price, with overage bands available. Enterprise includes 100 cloud accounts and up to 1,000,000 managed resources at $120K list. Telco and Datacenter have their own per-element and per-rack metrics respectively.",
  },
  {
    q: "How is Whale AI priced?",
    a: "Each edition includes a Whale AI tier with a monthly token allowance — Spark (1M) for Standard, Spark/Tide/Abyss (100M) for Enterprise and above. Additional token packs are available as add-ons.",
  },
  {
    q: "Do you offer BYOC or air-gapped sovereign deployment?",
    a: "Yes. Enterprise supports SaaS, BYOC, and Sovereign. The Government edition is purpose-built for air-gapped sovereign deployment — FIPS crypto, PAM always-on, WORM audit log, in-region AI only, and offline update channel.",
  },
  {
    q: "Is there a proof-of-concept option?",
    a: "We run structured POCs (30–60 days, fixed scope, pre-agreed conversion price) for Enterprise, Telco, Government, and Datacenter evaluations. Book a demo and we'll scope one with you.",
  },
];

export default function PricingPage() {
  const editions = getEditions();
  return (
    <>
      {/* ── Hero: editorial split, oversized statement left ── */}
      <section className="border-b border-line bg-surface py-20 sm:py-28">
        <Container>
          <div className="grid gap-x-16 gap-y-10 lg:grid-cols-[1.25fr_0.75fr] lg:items-end">
            <Reveal>
              <div>
                <div className="mb-5 flex items-center gap-3">
                  <span aria-hidden className="h-px w-8 bg-accent/50" />
                  <span className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
                    Pricing
                  </span>
                </div>
                <h1 className="text-[2.6rem] font-bold leading-[1.02] tracking-tight text-ink sm:text-6xl">
                  Priced to how you{" "}
                  <span className="text-accent">operate</span>, not how
                  big you are.
                </h1>
              </div>
            </Reveal>
            <Reveal delay={90}>
              <p className="text-lg leading-relaxed text-muted lg:pb-2">
                Standard and Enterprise have flat, published list prices —
                $24,000 and $120,000 a year. Telco, Government and Datacenter
                are contact-sales — shaped around your scale, region and
                regulatory requirements.
              </p>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* ── Tier cards: asymmetric, featured edition pulled forward ── */}
      <section className="bg-canvas py-20 sm:py-24">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="Editions"
              title="Pick where you start"
              description="Every edition runs the same control plane. The featured plan is where most teams begin."
            />
          </Reveal>
          <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {editions.map((e, i) => (
              <Reveal key={e.slug} delay={(i % 5) * 60}>
                <div
                  className={`group relative flex h-full flex-col overflow-hidden rounded-lg p-6 transition-all duration-200 ${
                    e.comingSoon
                      ? "border border-line bg-surface opacity-70"
                      : e.featured
                      ? "bg-surface shadow-md ring-2 ring-primary hover:-translate-y-0.5"
                      : "border border-line bg-surface shadow-sm hover:-translate-y-0.5 hover:border-line-strong hover:shadow-md"
                  }`}
                >
                  <div className="relative flex flex-1 flex-col">
                    <div className="flex items-center justify-between">
                      {e.comingSoon ? (
                        <Badge tone="neutral">
                          Preview{e.gaTarget ? ` · GA ${e.gaTarget}` : ""}
                        </Badge>
                      ) : e.featured ? (
                        <Badge tone="brand" className="self-start">
                          Most popular
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
                      <p className="mt-1 text-[11px] leading-snug text-faint">
                        {e.priceSub}
                      </p>
                    )}
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">
                      {e.headline}
                    </p>
                    <div className="mt-4 text-xs text-faint">
                      {e.deploy.join(" · ")}
                    </div>
                    <Button
                      href="/contact"
                      size="sm"
                      variant={e.featured ? "primary" : "secondary"}
                      className="mt-5"
                    >
                      {e.comingSoon
                        ? "Join the preview"
                        : ["standard", "enterprise"].includes(e.slug)
                        ? "Get started"
                        : "Contact sales"}
                    </Button>
                    <Link
                      href={`/editions/${e.slug}`}
                      className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-accent"
                    >
                      Edition details <ArrowRight className="h-3 w-3" />
                    </Link>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* ── Comparison matrix ── */}
      <section className="bg-sunken py-20 sm:py-24">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="Compare"
              title="Every module, mapped to every edition"
            />
          </Reveal>
          <Reveal delay={80}>
            <div className="mt-12 overflow-x-auto rounded-lg border border-line bg-surface shadow-sm">
              <table className="w-full min-w-[760px] border-collapse text-sm">
                <thead>
                  <tr className="border-b border-line">
                    <th className="py-4 pl-6 pr-4 text-left font-bold text-ink">
                      Module
                    </th>
                    {editions.map((e) => (
                      <th
                        key={e.slug}
                        className="px-3 py-4 text-center font-bold"
                      >
                        <span className={e.comingSoon ? "text-faint" : "text-ink"}>{e.name}</span>
                        {e.comingSoon && (
                          <span className="block text-[10px] font-normal text-faint">
                            Preview{e.gaTarget ? ` · GA ${e.gaTarget}` : ""}
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
                <SectionHeading
                  eyebrow="FAQ"
                  title="Pricing questions, answered"
                  description="Still unsure which edition fits? Book a demo and we'll scope it with you."
                />
                <Button href="/contact" variant="secondary" className="mt-8">
                  Talk to sales
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </Reveal>
            <div className="flex flex-col">
              {faqs.map((f, i) => (
                <Reveal key={f.q} delay={i * 70}>
                  <div className="group flex items-start gap-6 border-t border-line py-7 first:border-t-0 first:pt-0">
                    <span className="num text-2xl font-bold text-accent/40">
                      0{i + 1}
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
    </>
  );
}
