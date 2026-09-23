import { Fragment } from "react";
import { InnerPage } from "@/components/layout/InnerPage";
import type { Metadata } from "next";
import { ArrowRight, Check } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { CmsPhotoHero } from "@/components/sections/CmsPhotoHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { ClosingCTA } from "@/components/sections/ClosingCTA";
import { whaleAiPageSpec } from "@/content/cms/docs/whaleAiPage";
import { whaleAiPage } from "@/content/sections/whaleAiPage";
import { getPageDoc } from "@/lib/cms-page";
import { getModules } from "@/lib/content";

const getContent = () => getPageDoc(whaleAiPageSpec, whaleAiPage);

export async function generateMetadata(): Promise<Metadata> {
  const c = await getContent();
  return { title: c.seoTitle, description: c.seoDescription };
}

export default async function WhaleAIPage() {
  const [c, modules] = await Promise.all([getContent(), getModules()]);
  // The modules Whale AI runs across — the real catalog minus Whale AI itself,
  // so this list can never drift from /modules.
  const fabricModules = modules.filter((m) => m.slug !== "whale-ai");
  return (
    <InnerPage category="platform" current="/products/whale-ai">
      {/* ── Hero: the brand band, the night studio ── */}
      <CmsPhotoHero
        route="/products/whale-ai"
        photo="dark-gateway"
        tone="dark"
        eyebrow="Whale AI · Horizontal intelligence layer"
        title={<>AI that answers from <span className="text-[var(--gold)]">your live estate</span></>}
        description="Whale AI is an intelligence layer inside every module of the platform. Each of its 50+ use cases declares the live data it reads — inventory, billing, tickets, findings — and cites it in the answer. It runs in three tiers by task complexity, on hosted models, your own model, or fully offline inside the perimeter for sovereign estates."
      >
        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <div>
            <Button href={c.hero.primary.href} size="lg" variant="white">
              {c.hero.primary.label}
              <ArrowRight className="h-4 w-4" />
            </Button>
            {c.hero.primary.note && <p className="mt-2 text-xs text-white/50">{c.hero.primary.note}</p>}
          </div>
          <Button
            href={c.hero.secondary.href}
            size="lg"
            variant="outline"
            className="border-white/30 text-white hover:border-white hover:bg-white/10 hover:text-white"
          >
            {c.hero.secondary.label}
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </CmsPhotoHero>

      {/* Stats strip */}
      <section className="bg-brand-900 pb-14 text-white">
        <Container>
          <div className="grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-white/15 bg-white/10 sm:grid-cols-4">
            {c.hero.stats.map((s) => (
              <div key={s.label} className="px-5 py-4">
                <p className="text-2xl font-bold text-white num">{s.value}</p>
                <p className="mt-0.5 text-xs font-medium text-white/70">{s.label}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ── What is Whale AI ── */}
      <section className="py-20 sm:py-24">
        <Container>
          <div className="grid gap-14 lg:grid-cols-2 lg:items-start">
            <Reveal>
              <div>
                <SectionHeading {...c.what.heading} />
                {c.what.points.map((p, i) => (
                  <Fragment key={p.title}>
                    <h3 className={`${i === 0 ? "mt-8" : "mt-6"} text-xl font-bold text-ink`}>{p.title}</h3>
                    <p className="mt-3 text-base leading-relaxed text-muted">{p.body}</p>
                  </Fragment>
                ))}
              </div>
            </Reveal>

            {/* Fabric diagram */}
            <Reveal delay={100}>
              <div className="relative overflow-hidden rounded-lg border border-line bg-sunken p-8">
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 bg-dot-grid opacity-50 [mask-image:radial-gradient(ellipse_70%_60%_at_50%_30%,black,transparent)]"
                />
                <div className="relative">
                  <div className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-primary text-primary-fg shadow-lg">
                    <Icon name="Sparkles" className="h-9 w-9" />
                  </div>
                  <p className="mt-4 text-center text-base font-bold text-ink">
                    {c.what.fabricTitle}
                  </p>
                  <p className="mt-1 text-center text-sm text-muted">
                    {c.what.fabricSubtitleBefore} {fabricModules.length} {c.what.fabricSubtitleAfter}
                  </p>
                  <div className="mt-6 flex flex-wrap justify-center gap-2">
                    {fabricModules.map((m) => (
                      <span
                        key={m.slug}
                        className="inline-flex items-center gap-1.5 rounded-md border border-line bg-surface px-3 py-1.5 text-xs font-semibold text-ink shadow-[3px_3px_0_0_rgba(0,45,161,0.10)]"
                      >
                        <Icon name={m.icon} className="h-3.5 w-3.5 text-accent" />
                        {m.name}
                      </span>
                    ))}
                  </div>
                  <div className="mt-6 rounded-lg border border-line bg-surface p-4">
                    <p className="eyebrow mb-3 ">
                      {c.what.groundingKicker}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {c.what.grounding.map((g) => (
                        <span
                          key={g}
                          className="rounded-md border border-line bg-sunken px-2 py-0.5 font-mono text-xs text-muted"
                        >
                          {g}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* ── Three Tiers ── */}
      <section className="bg-sunken py-20 sm:py-24">
        <Container>
          <Reveal>
            <SectionHeading {...c.tiers.heading} />
          </Reveal>
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {c.tiers.items.map((t, i) => (
              <Reveal key={t.key} delay={i * 80}>
                <div className="relative flex h-full flex-col overflow-hidden rounded-xl border border-line bg-surface shadow-sm">
                  {/* Colored top bar */}
                  <div className="h-1 w-full" style={{ background: t.topGrad }} />
                  <div className="flex flex-1 flex-col p-6">
                    <div
                      className="mb-4 inline-flex items-center gap-2 self-start rounded-full px-3 py-1 text-xs font-bold"
                      style={{
                        background: `${t.accentColor}18`,
                        color: t.accentColor,
                      }}
                    >
                      {t.name}
                      <span
                        className="rounded-sm px-1.5 py-0.5 text-xs"
                        style={{ background: `${t.accentColor}25` }}
                      >
                        {t.badge}
                      </span>
                    </div>
                    <p className="mb-1 text-sm text-muted">{t.tagline}</p>
                    <ul className="mt-4 flex-1 space-y-0">
                      {t.features.map((f) => (
                        <li
                          key={f}
                          className="flex items-start gap-2.5 border-b border-line py-2.5 text-sm text-muted last:border-0"
                        >
                          <Check
                            className="mt-0.5 h-3.5 w-3.5 shrink-0"
                            style={{ color: t.accentColor }}
                          />
                          {f}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {t.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-md border border-line bg-sunken px-2 py-0.5 font-mono text-xs text-muted"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* ── Use Case Categories ── */}
      <section className="py-20 sm:py-24">
        <Container>
          <Reveal>
            <SectionHeading {...c.categories.heading} />
          </Reveal>
          <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {c.categories.items.map((cat, i) => (
              <Reveal key={cat.name} delay={(i % 5) * 50}>
                <div className="flex h-full flex-col items-center rounded-lg border border-line bg-surface p-4 text-center shadow-sm transition-all hover:-translate-y-0.5 hover:border-accent/40 hover:shadow-md">
                  <div className="grid h-10 w-10 place-items-center rounded-lg bg-[var(--bg-active)] text-accent">
                    <Icon name={cat.icon} className="h-5 w-5" />
                  </div>
                  <p className="mt-3 text-sm font-bold text-ink">{cat.name}</p>
                  <p className="mt-1 text-xs text-muted">{cat.count} use cases</p>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Featured use cases three-column */}
          <Reveal delay={80}>
            <div className="mt-10 grid gap-6 rounded-xl border border-line bg-sunken p-6 sm:grid-cols-3">
              {c.categories.featured.map((col) => (
                <div key={col.heading}>
                  <p className="eyebrow mb-3 ">
                    {col.heading}
                  </p>
                  <ul className="space-y-0">
                    {col.items.map((item) => (
                      <li
                        key={item}
                        className="border-b border-line py-2 text-sm text-muted last:border-0"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </Reveal>
        </Container>
      </section>

      {/* ── How It Works ── */}
      <section className="bg-sunken py-20 sm:py-24">
        <Container>
          <Reveal>
            <SectionHeading {...c.how.heading} />
          </Reveal>
          <div className="relative mt-14 grid gap-0 sm:grid-cols-4">
            {/* Connector line */}
            <div
              aria-hidden
              className="absolute left-[12.5%] right-[12.5%] top-9 hidden h-px bg-line sm:block"
            />
            {c.how.steps.map((s, i) => (
              <Reveal key={s.step} delay={i * 70}>
                <div className="relative z-10 flex flex-col items-center px-4 text-center">
                  <div className="grid h-[72px] w-[72px] place-items-center rounded-full bg-primary text-white shadow-md">
                    <Icon name={s.icon} className="h-6 w-6" />
                  </div>
                  <p className="eyebrow mt-2 ">
                    {s.step}
                  </p>
                  <h3 className="mt-3 text-base font-bold text-ink">{s.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{s.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* ── Key Differentiators ── */}
      <section className="py-20 sm:py-24">
        <Container>
          <Reveal>
            <SectionHeading {...c.differentiators.heading} />
          </Reveal>
          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            {c.differentiators.items.map((d, i) => (
              <Reveal key={d.title} delay={(i % 2) * 80}>
                <Card className="h-full">
                  <div className="flex items-start gap-4">
                    <div className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-[var(--bg-active)] text-accent">
                      <Icon name={d.icon} className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-ink">{d.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-muted">{d.body}</p>
                    </div>
                  </div>
                </Card>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* ── Comparison table ── */}
      <section className="bg-sunken py-20 sm:py-24">
        <Container>
          <Reveal>
            <SectionHeading {...c.comparison.heading} />
          </Reveal>
          <Reveal delay={80}>
            <div className="mt-10 overflow-x-auto rounded-xl border border-line bg-surface shadow-sm">
              <table className="w-full min-w-[680px] border-collapse text-sm">
                <thead>
                  <tr className="border-b border-line bg-primary">
                    <th className="py-3 pl-5 pr-4 text-left text-xs font-semibold text-white/80">
                      {c.comparison.firstColumn}
                    </th>
                    {c.comparison.columns.map((h, i) => (
                      <th
                        key={h}
                        className={`px-4 py-3 text-center text-xs font-semibold ${i === 0 ? "text-white" : "text-white/60"}`}
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {c.comparison.rows.map((row, i) => (
                    <tr key={row.cells[0]} className={`border-b border-line last:border-0 ${i % 2 === 1 ? "bg-sunken/50" : ""}`}>
                      <td className="py-3 pl-5 pr-4 font-medium text-muted">{row.cells[0]}</td>
                      {row.cells.slice(1).map((cell, j) => (
                        <td
                          key={j}
                          className={`px-4 py-3 text-center text-xs font-semibold ${
                            j === 0
                              ? "text-accent"
                              : cell.startsWith("✗")
                              ? "text-faint"
                              : "text-muted"
                          }`}
                        >
                          {cell}
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

      <ClosingCTA {...c.closing} />
    </InnerPage>
  );
}
