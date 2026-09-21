import { InnerPage } from "@/components/layout/InnerPage";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { Iso, INDUSTRY_ISO } from "@/components/illustrations/Iso";
import { customerStories } from "@/content/customers";

export const metadata: Metadata = {
  title: "Case studies",
  description:
    "BlueWhale Stack case studies — the situation, what the platform did and the outcome, for banks, ministries, telco and datacenter operators and a global media network.",
};

export default function CaseStudiesPage() {
  return (
    <InnerPage category="solutions" current="/case-studies">
      {/* ── Hero ── */}
      <section className="relative overflow-hidden bg-brand-900 text-white">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-dot-grid opacity-[0.13] [mask-image:radial-gradient(ellipse_55%_70%_at_12%_0%,black,transparent_70%)]"
        />
        <Container className="relative">
          <div className="grid items-center gap-12 py-20 sm:py-28 lg:grid-cols-[1.1fr_0.9fr]">
            <Reveal>
              <div className="max-w-2xl">
                <div className="mb-6 flex items-center gap-3">
                  <span className="grid h-11 w-11 place-items-center rounded-lg bg-white/15 text-white ring-1 ring-white/25">
                    <Icon name="FileText" className="h-5 w-5" />
                  </span>
                  <span className="eyebrow text-white/80">Case studies</span>
                  <span aria-hidden className="h-px w-8 bg-white/40" />
                  <span className="text-xs font-semibold text-white/60">Situation · work · outcome</span>
                </div>
                <h1 className="display-1 text-white">
                  Four estates, written up the way an architect reads them.
                </h1>
                <p className="mt-6 text-lg leading-relaxed text-white/70">
                  Four delivered engagements, written up the way an architect
                  or a CFO would want to read them — what the estate looked
                  like, what BlueWhale Stack changed, and what the auditor,
                  the board and the bill said afterwards.
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Button href="/contact?intent=demo" size="lg" variant="white">
                    Discuss a similar estate
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                  <Button
                    href="/customers"
                    size="lg"
                    variant="outline"
                    className="border-white/30 text-white hover:border-white hover:bg-white/10 hover:text-white"
                  >
                    Success stories overview
                  </Button>
                </div>
              </div>
            </Reveal>
            <Reveal delay={100}>
              <div className="mx-auto w-full max-w-[460px]">
                <Iso name="audit" variant="dark" title="Evidence, documented" />
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* ── Index ── */}
      <section className="bg-canvas py-20 sm:py-24">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="Index"
              title={`${customerStories.length} case studies`}
              description="Anonymized under confidentiality; challenge, solution and outcome facts are as delivered."
            />
          </Reveal>
          <div className="mt-12 flex flex-col">
            {customerStories.map((s, i) => (
              <Reveal key={s.slug} delay={(i % 2) * 70}>
                <Link
                  href={`/case-studies/${s.slug}`}
                  className="group grid gap-6 border-t border-line py-8 transition-colors hover:bg-sunken/60 lg:grid-cols-[180px_1fr_auto] lg:items-center lg:gap-10"
                >
                  <div className="hidden w-44 lg:block">
                    <Iso name={INDUSTRY_ISO[s.industry] ?? "stacked-slabs"} />
                  </div>
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-sm font-bold text-faint num">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <Badge tone="brand">{s.industry}</Badge>
                      <span className="text-xs text-faint">{s.edition}</span>
                    </div>
                    <h2 className="mt-3 text-2xl font-bold leading-snug text-ink group-hover:text-accent">
                      {s.headline}
                    </h2>
                    <p className="mt-1 text-sm font-medium text-muted">{s.org}</p>
                    <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted">{s.challenge}</p>
                    <dl className="mt-4 flex flex-wrap gap-x-8 gap-y-2">
                      {s.metrics.map((m) => (
                        <div key={m.label} className="flex items-baseline gap-2">
                          <dt className="text-lg font-bold text-accent">{m.value}</dt>
                          <dd className="text-xs text-muted">{m.label}</dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                  <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent">
                    Read
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
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
