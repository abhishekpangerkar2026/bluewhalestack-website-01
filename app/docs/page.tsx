import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { docCards, docQuickLinks } from "@/content/docs";

export const metadata: Metadata = {
  title: "Docs",
  description:
    "Technical documentation, API reference, quick-start guides and integration tutorials for BlueWhale Stack.",
};

export default function DocsPage() {
  return (
    <>
      {/* ── Hero: editorial split, oversized statement left ── */}
      <section className="border-b border-line bg-surface py-20 sm:py-28">
        <Container>
          <div className="grid gap-x-16 gap-y-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
            <Reveal>
              <div>
                <div className="mb-5 flex items-center gap-3">
                  <span className="text-sm font-bold tabular-nums text-accent">
                    00
                  </span>
                  <span aria-hidden className="h-px w-8 bg-accent/50" />
                  <span className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
                    Documentation
                  </span>
                </div>
                <h1 className="text-[2.6rem] font-bold leading-[1.02] tracking-tight text-ink sm:text-6xl">
                  Everything you need to{" "}
                  <span className="text-accent">build &amp; deploy</span>.
                </h1>
                <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
                  Full technical reference, API docs, quick-start guides and
                  integration tutorials for every edition.
                </p>
              </div>
            </Reveal>
            <Reveal delay={90}>
              <div className="lg:pb-2">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-faint">
                  Jump to
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {docQuickLinks.map((q) => (
                    <span
                      key={q}
                      className="rounded-full border border-line bg-sunken px-3 py-1.5 text-xs font-semibold text-muted"
                    >
                      {q}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* ── Guides: bold heading + asymmetric numbered grid (non-clickable) ── */}
      <section className="py-24 sm:py-32">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="Guides"
              title="Start here"
              description="The reference set most teams open first — from a platform overview to the full REST API."
            />
          </Reveal>
          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {docCards.map((d, i) => (
              <Reveal key={d.title} delay={(i % 3) * 70}>
                <Link href={`/docs/${d.slug}`} className="group block h-full">
                  <Card
                    interactive
                    className="flex h-full flex-col transition-colors group-hover:border-accent/40"
                  >
                    <div className="flex items-center justify-between">
                      <span className="grid h-11 w-11 place-items-center rounded-md bg-[var(--bg-active)] text-accent">
                        <Icon name={d.icon} className="h-5 w-5" />
                      </span>
                      <span className="text-sm font-bold tabular-nums text-faint">
                        0{i + 1}
                      </span>
                    </div>
                    <h3 className="mt-5 text-lg font-bold text-ink transition-colors group-hover:text-accent">
                      {d.title}
                    </h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
                      {d.body}
                    </p>
                    <div className="mt-5 flex flex-wrap gap-1.5">
                      {d.tags.map((t) => (
                        <span
                          key={t}
                          className="rounded-md bg-sunken px-2 py-0.5 text-[11px] font-medium text-faint"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                    <div className="mt-4 flex items-center gap-1 text-xs font-semibold text-accent opacity-0 transition-opacity group-hover:opacity-100">
                      Read guide
                      <ArrowRight className="h-3 w-3" />
                    </div>
                  </Card>
                </Link>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* ── API CTA: full-bleed dark statement band ── */}
      <section className="relative overflow-hidden bg-brand-900 py-20 text-white sm:py-24">
        <Container className="relative">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <Reveal>
              <div className="max-w-2xl">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/80">
                  Developer reference
                </p>
                <h2 className="mt-5 text-3xl font-bold leading-[1.1] tracking-tight text-white sm:text-4xl">
                  Looking for the <span className="text-white/70">API?</span>
                </h2>
                <p className="mt-5 text-lg leading-relaxed text-white/70">
                  Full REST reference with OAuth2, webhooks, and Python &amp; Go
                  SDKs.
                </p>
              </div>
            </Reveal>
            <Reveal delay={90}>
              <Button href="/contact" size="lg" variant="white" className="shrink-0">
                Request docs access
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Reveal>
          </div>
        </Container>
      </section>
    </>
  );
}
