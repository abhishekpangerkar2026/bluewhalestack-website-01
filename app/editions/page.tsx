import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check, Minus } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Reveal } from "@/components/ui/Reveal";
import { getEditions } from "@/lib/content";
import { modules } from "@/content/modules";

export const metadata: Metadata = {
  title: "Editions",
  description:
    "Compare BlueWhale Stack editions — Standard, Enterprise, Datacenter, Government, and Telco & MSP.",
};

export default function EditionsPage() {
  const editions = getEditions();

  return (
    <>
      {/* ── Intro: editorial split ── */}
      <section className="bg-canvas py-20 sm:py-28">
        <Container>
          <div className="grid gap-x-16 gap-y-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
            <Reveal>
              <SectionHeading
                eyebrow="Editions"
                title={
                  <>
                    One platform.{" "}
                    <span className="text-faint">Five editions.</span>
                  </>
                }
                description="The same hyperscaler-neutral platform, shaped for how you operate — from a single-region SaaS team to a sovereign government cloud or a datacenter operator."
              />
            </Reveal>
            <Reveal delay={90}>
              <div className="lg:text-right">
                <span className="block text-6xl font-bold tracking-tight text-faint num sm:text-7xl">
                  {String(editions.length).padStart(2, "0")}
                </span>
                <p className="mt-1 text-sm font-semibold uppercase tracking-[0.18em] text-faint">
                  Ways to deploy
                </p>
              </div>
            </Reveal>
          </div>

          <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {editions.map((e, i) => (
              <Reveal key={e.slug} delay={(i % 3) * 70}>
                <Card
                  interactive={!e.comingSoon}
                  className={`flex h-full flex-col ${e.featured ? "ring-1 ring-accent" : ""} ${e.comingSoon ? "opacity-75" : ""}`}
                >
                  <div className="flex items-center justify-between">
                    {e.comingSoon ? (
                      <Badge tone="neutral">
                        Preview{e.gaTarget ? ` · GA ${e.gaTarget}` : ""}
                      </Badge>
                    ) : e.featured ? (
                      <Badge>Most popular</Badge>
                    ) : (
                      <span aria-hidden className="h-[26px]" />
                    )}
                    <span className="text-sm font-bold text-faint num">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h3 className="mt-4 text-xl font-bold text-ink">
                    {e.name}
                  </h3>
                  <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-accent">
                    {e.tagline}
                  </p>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">
                    {e.positioning}
                  </p>
                  <dl className="mt-5 space-y-1.5 border-t border-line pt-5 text-sm">
                    <div className="flex justify-between gap-3">
                      <dt className="text-faint">Deploy</dt>
                      <dd className="text-right font-medium text-ink">
                        {e.deploy.join(" · ")}
                      </dd>
                    </div>
                    <div className="flex justify-between gap-3">
                      <dt className="text-faint">Price</dt>
                      <dd className="text-right font-medium text-ink">
                        {e.priceAnchor}
                      </dd>
                    </div>
                  </dl>
                  {e.comingSoon ? (
                    <Link
                      href="/contact"
                      className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-muted hover:text-accent"
                    >
                      Join the preview <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  ) : (
                    <Link
                      href={`/editions/${e.slug}`}
                      className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-accent hover:gap-2.5"
                    >
                      Explore {e.name} <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  )}
                </Card>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* ── Comparison matrix on a tinted band ── */}
      <section className="border-t border-line bg-sunken py-20 sm:py-28">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="Compare"
              title="Modules by edition"
              description="Every edition runs the same platform — these are the modules included by default."
            />
          </Reveal>
          <Reveal delay={100}>
            <div className="mt-12 overflow-x-auto rounded-lg border border-line bg-surface shadow-sm">
              <table className="w-full min-w-[760px] border-collapse text-sm">
                <thead>
                  <tr className="border-b border-line">
                    <th className="py-4 pl-5 pr-4 text-left font-semibold text-ink">
                      Module
                    </th>
                    {editions.map((e) => (
                      <th
                        key={e.slug}
                        className="px-3 py-4 text-center font-semibold text-ink"
                      >
                        <span className={e.comingSoon ? "text-faint" : ""}>{e.name}</span>
                        {e.comingSoon && (
                          <span className="block text-[10px] font-medium text-faint mt-0.5">
                            Preview{e.gaTarget ? ` · GA ${e.gaTarget}` : ""}
                          </span>
                        )}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {modules.map((m) => (
                    <tr key={m.slug} className="border-b border-line last:border-0">
                      <td className="py-3 pl-5 pr-4 text-left font-medium text-muted">
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
    </>
  );
}
