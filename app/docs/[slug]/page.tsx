import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Clock, ChevronRight } from "lucide-react";
import type { Metadata } from "next";

import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import {
  docPages,
  docPagesBySlug,
  type ContentBlock,
  type DocPageDef,
} from "@/content/docs";

// ─── Static params ────────────────────────────────────────────────────────────

export function generateStaticParams() {
  return docPages.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const page = docPagesBySlug[slug];
  if (!page) return {};
  return {
    title: `${page.title} — Docs`,
    description: page.description,
  };
}

// ─── Content block renderer ───────────────────────────────────────────────────

function RenderBlock({ block }: { block: ContentBlock }) {
  switch (block.type) {
    case "p":
      return (
        <p className="mt-4 text-base leading-relaxed text-muted first:mt-0">
          {block.text}
        </p>
      );

    case "h3":
      return (
        <h3 className="mt-8 text-lg font-bold text-ink first:mt-0">
          {block.text}
        </h3>
      );

    case "callout": {
      const styles = {
        note: "border-accent/40 bg-accent/5 text-accent",
        tip: "border-emerald-400/40 bg-emerald-400/5 text-emerald-700 dark:text-emerald-400",
        warning: "border-amber-400/40 bg-amber-400/5 text-amber-700 dark:text-amber-400",
      } as const;
      const labels = { note: "Note", tip: "Tip", warning: "Warning" } as const;
      return (
        <div
          className={`mt-5 rounded-lg border-l-4 px-5 py-4 text-sm leading-relaxed ${styles[block.variant]}`}
        >
          <span className="font-bold">{labels[block.variant]}: </span>
          {block.text}
        </div>
      );
    }

    case "code":
      return (
        <div className="mt-5 overflow-hidden rounded-lg border border-line">
          {block.label && (
            <div className="border-b border-line bg-sunken px-4 py-2 text-xs font-semibold text-faint">
              {block.label}
            </div>
          )}
          <pre className="overflow-x-auto bg-[#0d1117] px-5 py-4 text-sm leading-relaxed text-[#e6edf3]">
            <code>{block.code}</code>
          </pre>
        </div>
      );

    case "steps":
      return (
        <ol className="mt-5 space-y-5">
          {block.items.map((step, i) => (
            <li key={i} className="flex gap-4">
              <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent text-xs font-bold text-white">
                {i + 1}
              </span>
              <div className="flex-1">
                <p className="font-semibold text-ink">{step.title}</p>
                <p className="mt-1 text-sm leading-relaxed text-muted">
                  {step.body}
                </p>
                {step.code && (
                  <pre className="mt-3 overflow-x-auto rounded-lg bg-[#0d1117] px-4 py-3 text-xs leading-relaxed text-[#e6edf3]">
                    <code>{step.code}</code>
                  </pre>
                )}
              </div>
            </li>
          ))}
        </ol>
      );

    case "list":
      return (
        <ul className="mt-4 space-y-2">
          {block.items.map((item, i) => (
            <li key={i} className="flex gap-3 text-sm leading-relaxed text-muted">
              <ChevronRight className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      );

    case "grid":
      return (
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          {block.items.map((item, i) => (
            <div
              key={i}
              className="rounded-lg border border-line bg-surface p-5 shadow-sm"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-md bg-[var(--bg-active)] text-accent">
                <Icon name={item.icon} className="h-4 w-4" />
              </div>
              <p className="mt-3 font-semibold text-ink">{item.title}</p>
              <p className="mt-1 text-sm leading-relaxed text-muted">
                {item.body}
              </p>
            </div>
          ))}
        </div>
      );

    default:
      return null;
  }
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function DocSlugPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page: DocPageDef | undefined = docPagesBySlug[slug];
  if (!page) notFound();

  return (
    <>
      {/* ── Breadcrumb + hero ── */}
      <section className="border-b border-line bg-surface py-14 sm:py-20">
        <Container>
          {/* Breadcrumb */}
          <Reveal>
            <nav className="mb-6 flex items-center gap-2 text-xs font-semibold text-faint">
              <Link
                href="/docs"
                className="flex items-center gap-1 transition-colors hover:text-accent"
              >
                <ArrowLeft className="h-3 w-3" />
                Docs
              </Link>
              <span>/</span>
              <span className="text-muted">{page.title}</span>
            </nav>
          </Reveal>

          <div className="grid gap-x-16 gap-y-6 lg:grid-cols-[1fr_auto]">
            <Reveal>
              <div>
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-md bg-[var(--bg-active)] text-accent">
                    <Icon name={page.icon} className="h-5 w-5" />
                  </div>
                  <div className="flex items-center gap-2 text-xs font-semibold text-faint">
                    <Clock className="h-3.5 w-3.5" />
                    {page.readTime}
                  </div>
                </div>
                <h1 className="text-[2rem] font-bold leading-tight tracking-tight text-ink sm:text-4xl">
                  {page.title}
                </h1>
                <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted">
                  {page.description}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {page.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded-md bg-sunken px-2.5 py-1 text-xs font-medium text-faint"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>

            {/* Table of contents — visible on desktop in hero column */}
            <Reveal delay={80}>
              <div className="hidden lg:block">
                <p className="mb-3 text-xs font-semibold uppercase tracking-[0.15em] text-faint">
                  On this page
                </p>
                <nav className="space-y-2">
                  {page.sections.map((s) => (
                    <a
                      key={s.id}
                      href={`#${s.id}`}
                      className="flex items-center gap-2 text-sm text-muted transition-colors hover:text-accent"
                    >
                      <span className="h-px w-4 bg-line" />
                      {s.heading}
                    </a>
                  ))}
                </nav>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* ── Content ── */}
      <section className="py-16 sm:py-20">
        <Container>
          <div className="mx-auto max-w-3xl">
            {/* Mobile TOC */}
            <div className="mb-10 rounded-lg border border-line bg-sunken p-5 lg:hidden">
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.15em] text-faint">
                On this page
              </p>
              <nav className="space-y-2">
                {page.sections.map((s) => (
                  <a
                    key={s.id}
                    href={`#${s.id}`}
                    className="flex items-center gap-2 text-sm text-muted transition-colors hover:text-accent"
                  >
                    <ChevronRight className="h-3.5 w-3.5 text-accent" />
                    {s.heading}
                  </a>
                ))}
              </nav>
            </div>

            {/* Sections */}
            <div className="space-y-16">
              {page.sections.map((section, si) => (
                <Reveal key={section.id} delay={si * 50}>
                  <article id={section.id} className="scroll-mt-24">
                    <div className="mb-5 flex items-center gap-4">
                      <span className="text-xs font-bold tabular-nums text-accent">
                        {String(si + 1).padStart(2, "0")}
                      </span>
                      <span aria-hidden className="h-px flex-1 bg-line" />
                    </div>
                    <h2 className="text-2xl font-bold tracking-tight text-ink">
                      {section.heading}
                    </h2>
                    <div className="mt-5">
                      {section.blocks.map((block, bi) => (
                        <RenderBlock key={bi} block={block} />
                      ))}
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* ── Prev / Next navigation ── */}
      {(page.prev || page.next) && (
        <section className="border-t border-line py-10">
          <Container>
            <div className="mx-auto flex max-w-3xl items-center justify-between gap-4">
              {page.prev ? (
                <Link
                  href={`/docs/${page.prev.slug}`}
                  className="group flex items-center gap-3 text-sm"
                >
                  <ArrowLeft className="h-4 w-4 text-faint transition-colors group-hover:text-accent" />
                  <div>
                    <p className="text-xs text-faint">Previous</p>
                    <p className="font-semibold text-ink transition-colors group-hover:text-accent">
                      {page.prev.title}
                    </p>
                  </div>
                </Link>
              ) : (
                <div />
              )}
              {page.next ? (
                <Link
                  href={`/docs/${page.next.slug}`}
                  className="group flex items-center gap-3 text-sm text-right"
                >
                  <div>
                    <p className="text-xs text-faint">Next</p>
                    <p className="font-semibold text-ink transition-colors group-hover:text-accent">
                      {page.next.title}
                    </p>
                  </div>
                  <ArrowRight className="h-4 w-4 text-faint transition-colors group-hover:text-accent" />
                </Link>
              ) : (
                <div />
              )}
            </div>
          </Container>
        </section>
      )}

      {/* ── Need help CTA ── */}
      <section className="border-t border-line bg-sunken py-14">
        <Container>
          <div className="mx-auto flex max-w-3xl flex-col items-start gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="font-bold text-ink">Have a question or hit a blocker?</p>
              <p className="mt-1 text-sm text-muted">
                Our support team and account engineers are here to help.
              </p>
            </div>
            <Button href="/contact" variant="primary" size="sm" className="shrink-0">
              Contact support
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}
