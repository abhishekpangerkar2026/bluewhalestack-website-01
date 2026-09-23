import { InnerPage, PageIndex } from "@/components/layout/InnerPage";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { ControlPlaneMap } from "@/components/diagrams/ControlPlaneMap";
import { LayerStack, LayerList } from "@/components/diagrams/LayerStack";
import { CmsPhotoHero } from "@/components/sections/CmsPhotoHero";
import { CountUp } from "@/components/ui/CountUp";
import { ProductShowcase } from "@/components/sections/ProductShowcase";
import { PrototypeOffer } from "@/components/sections/PrototypeOffer";
import { FAQ } from "@/components/sections/FAQ";
import { ClosingCTA } from "@/components/sections/ClosingCTA";
import { Iso, FAMILY_ISO, DEPLOY_ISO } from "@/components/illustrations/Iso";
import { platformHero } from "@/content/platform";
import { platformPageSpec } from "@/content/cms/docs/platformPage";
import { platformPage } from "@/content/sections/platformPage";
import { getPageDoc } from "@/lib/cms-page";
import { editAttr, imageUrl } from "@/lib/cms";
import { getFamilies, getModules, getSiteSettings } from "@/lib/content";
import { builtMetadata, builtPage } from "@/lib/builder/render";

const getContent = () => getPageDoc(platformPageSpec, platformPage);

export async function generateMetadata(): Promise<Metadata> {
  const builtMeta = await builtMetadata("/platform");
  if (builtMeta) return builtMeta;
  const c = await getContent();
  return { title: c.seoTitle, description: c.seoDescription };
}

export default async function PlatformPage() {
  const built = await builtPage("/platform");
  if (built) return built;
  const [c, families, modules, settings] = await Promise.all([getContent(), getFamilies(), getModules(), getSiteSettings()]);
  const statusTone = (status: string) => (status === "GA" ? "success" : status.startsWith("Enterprise") ? "neutral" : "warning");
  return (
    <InnerPage category="platform" current="/platform">
      {/* ── Hero ── */}
      <CmsPhotoHero
        route="/platform"
        photo="estates-row"
        eyebrow={platformHero.eyebrow}
        title={<>One Platform. <span className="text-accent">Every Industry. Every Estate.</span></>}
        description={platformHero.description}
        below={
          <div className="border-t border-line bg-sunken">
            <Container>
              <div className="grid grid-cols-2 gap-y-6 sm:grid-cols-4 sm:divide-x sm:divide-line">
                {c.hero.stats.map((s) => (
                  <div key={s.label} className="py-6 sm:px-6 sm:first:pl-0 sm:last:pr-0">
                    <p className="num text-3xl font-extrabold text-accent sm:text-4xl"><CountUp value={s.value} /></p>
                    <p className="mt-1 text-sm leading-snug text-muted">{s.label}</p>
                  </div>
                ))}
              </div>
            </Container>
          </div>
        }
      >
        <p className="text-base font-semibold text-ink">{c.hero.tagline}</p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <div>
            <Button href={c.hero.primary.href} size="lg" variant="primary">
              {c.hero.primary.label}
              <ArrowRight className="h-4 w-4" />
            </Button>
            {c.hero.primary.note && <p className="mt-2 text-xs text-faint">{c.hero.primary.note}</p>}
          </div>
          <Button href={c.hero.secondary.href} size="lg" variant="outline">
            {c.hero.secondary.label}
          </Button>
        </div>
      </CmsPhotoHero>

      <PageIndex items={c.hero.pageIndex} />

      {/* ── Who it is for ── */}
      <section className="py-20 sm:py-24">
        <Container>
          <Reveal>
            <SectionHeading {...c.who.heading} />
          </Reveal>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {c.who.cards.map((w, i) => (
              <Reveal key={w.title} delay={i * 80}>
                <Link href={w.href} className="block h-full">
                  <Card interactive className="flex h-full flex-col border-l-4 border-l-primary">
                    <div className="grid h-11 w-11 place-items-center rounded-lg bg-[var(--bg-active)] text-accent">
                      <Icon name={w.icon} className="h-5 w-5" />
                    </div>
                    <h3 className="mt-4 text-lg font-bold text-ink">{w.title}</h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{w.body}</p>
                    <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-accent">
                      {c.who.cardLink} <ArrowRight className="h-3.5 w-3.5" />
                    </span>
                  </Card>
                </Link>
              </Reveal>
            ))}
          </div>
          <Reveal delay={120}>
            <div className="mt-8 rounded-lg border-l-4 border-amber-400 bg-sunken p-5 text-sm leading-relaxed text-ink">
              <span className="font-bold">{c.who.whyNowLabel}</span> {c.who.whyNow}
            </div>
          </Reveal>
        </Container>
      </section>

      {/* ── What it replaces ── */}
      <section id="replaces" className="scroll-mt-20 border-t border-line bg-sunken py-20 sm:py-24">
        <Container>
          <Reveal>
            <SectionHeading {...c.replaces.heading} />
          </Reveal>
          <Reveal delay={100}>
            <div className="mt-12 overflow-x-auto rounded-lg border border-line bg-surface shadow-sm">
              <table className="w-full min-w-[720px] border-collapse text-sm">
                <thead>
                  <tr className="bg-primary text-left text-primary-fg">
                    {c.replaces.columns.map((h) => <th key={h} className="px-5 py-3 font-semibold">{h}</th>)}
                  </tr>
                </thead>
                <tbody className="divide-y divide-line">
                  {c.replaces.rows.map((r) => (
                    <tr key={r.category} className="align-top">
                      <td className="w-64 px-5 py-4 font-semibold text-ink">{r.category}</td>
                      <td className="px-5 py-4 leading-relaxed text-muted">{r.answer}</td>
                      <td className="w-56 px-5 py-4">
                        <Badge tone={statusTone(r.status)}>{r.status}</Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* ── 3D product architecture view ── */}
      <section id="architecture" className="scroll-mt-20 border-t border-line bg-sunken py-20 sm:py-24">
        <Container>
          <Reveal>
            <SectionHeading {...c.architecture.heading} />
          </Reveal>
          <div className="mt-12 grid items-center gap-10 lg:grid-cols-[1fr_0.9fr]">
            <Reveal delay={100}><LayerStack /></Reveal>
            <Reveal delay={140}><LayerList /></Reveal>
          </div>
          <Reveal delay={160}>
            <figure className="mt-14 overflow-hidden rounded-2xl border border-line bg-white shadow-lg">
              {c.architecture.figure ? (
                <a href={c.architecture.figure.src} target="_blank" rel="noopener" aria-label="Open the architecture picture at full size">
                  <img
                    data-sanity={editAttr(c.architecture.figure.sanity)}
                    src={imageUrl(c.architecture.figure.src, 1600)}
                    alt={c.architecture.figure.alt ?? ""}
                    width={c.architecture.figure.width}
                    height={c.architecture.figure.height}
                    loading="lazy"
                    className="w-full"
                  />
                </a>
              ) : (
                <a href="/architecture/product-architecture-wide-2400.webp" target="_blank" rel="noopener" aria-label="Open the 3D product architecture at full size">
                  <img
                    data-sanity={editAttr(c.cmsId ? { id: c.cmsId, type: "platformPage", path: "architecture.figure" } : undefined)}
                    src="/architecture/product-architecture-wide-1600.webp"
                    srcSet="/architecture/product-architecture-wide-1000.webp 1000w, /architecture/product-architecture-wide-1600.webp 1600w, /architecture/product-architecture-wide-2400.webp 2400w"
                    sizes="(min-width:1280px) 1200px, 100vw"
                    alt="BlueWhale Stack 3D product architecture — industry segments, the Digital Experience Layer, the Unified Platform Core, integrations, every estate and the deployment modes"
                    width={5413}
                    height={3045}
                    loading="lazy"
                    className="w-full"
                  />
                </a>
              )}
              <figcaption className="flex flex-wrap items-center justify-between gap-3 border-t border-line px-5 py-3 text-xs text-faint">
                <span>{c.architecture.figureCaption}</span>
                <span className="font-semibold text-accent">{c.architecture.figureLink}</span>
              </figcaption>
            </figure>
          </Reveal>

          {/* How to read the architecture */}
          <Reveal delay={140}>
            <div className="mt-12">
              <p className="eyebrow">{c.architecture.howToRead}</p>
              <div className="mt-4 overflow-hidden rounded-lg border border-line bg-surface shadow-sm">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-primary text-left text-primary-fg">
                      {c.architecture.columns.map((h) => <th key={h} className="px-5 py-3 font-semibold">{h}</th>)}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-line">
                    {c.architecture.layers.map((l) => (
                      <tr key={l.n}>
                        <td className="w-56 px-5 py-3.5 align-top font-semibold text-ink">
                          <span className="num text-accent">{l.n}</span> · {l.name}
                        </td>
                        <td className="px-5 py-3.5 leading-relaxed text-muted">{l.body}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* ── The nine capability families ── */}
      <section id="families" className="scroll-mt-20 py-20 sm:py-24">
        <Container>
          <Reveal>
            <SectionHeading {...c.families.heading} />
          </Reveal>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {families.map((fam, i) => {
              const ships = modules.filter((m) => m.group === fam.key);
              return (
                <Reveal key={fam.key} delay={(i % 3) * 70}>
                  <Link href={`/modules#${fam.key}`} className="block h-full">
                    <Card interactive className="flex h-full flex-col">
                      <Iso name={FAMILY_ISO[fam.key]} className="mb-3 h-28 w-auto self-start" />
                      <div className="flex items-center gap-3">
                        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-primary text-primary-fg">
                          <Icon name={fam.icon} className="h-5 w-5" />
                        </span>
                        <h3 className="text-base font-bold text-ink">{fam.name}</h3>
                      </div>
                      <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">
                        {fam.blurb}
                      </p>
                      {ships.length > 0 && (
                        <div className="mt-4 flex flex-wrap gap-1.5">
                          {ships.map((m) => (
                            <span
                              key={m.slug}
                              className="rounded-md border border-line bg-sunken px-2 py-0.5 text-[11px] font-medium text-muted"
                            >
                              {m.name}
                            </span>
                          ))}
                        </div>
                      )}
                    </Card>
                  </Link>
                </Reveal>
              );
            })}
          </div>
          <p className="mt-4 text-xs text-faint">{c.families.note}</p>

          {/* Three everyday moments */}
          <Reveal delay={80}>
            <div className="mt-14">
              <h3 className="text-xl font-bold text-ink">{c.families.momentsTitle}</h3>
              <div className="mt-6 grid gap-5 md:grid-cols-3">
                {c.families.moments.map((m) => (
                  <div
                    key={m.title}
                    className="rounded-lg border border-line border-l-4 border-l-primary bg-surface p-5 shadow-sm"
                  >
                    <div className="flex items-center gap-3">
                      <span className="grid h-9 w-9 place-items-center rounded-full bg-primary text-primary-fg">
                        <Icon name={m.icon} className="h-4 w-4" />
                      </span>
                      <h4 className="text-sm font-bold text-ink">{m.title}</h4>
                    </div>
                    <p className="mt-3 text-sm leading-relaxed text-muted">{m.body}</p>
                  </div>
                ))}
              </div>
              <div className="mt-6 rounded-lg border-l-4 border-amber-400 bg-sunken p-5 text-sm leading-relaxed text-ink">
                <span className="font-bold">{c.families.designRuleLabel}</span> {c.families.designRule}
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* ── Control plane map (dark band) ── */}
      <section className="relative overflow-hidden bg-brand-900 py-20 text-white sm:py-24">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-dot-grid opacity-[0.13] [mask-image:radial-gradient(ellipse_55%_70%_at_88%_0%,black,transparent_70%)]"
        />
        <Container className="relative">
          <Reveal>
            <SectionHeading {...c.controlPlane.heading} inverse />
          </Reveal>
          <Reveal delay={100}>
            <div className="mt-12">
              <ControlPlaneMap />
            </div>
          </Reveal>
          <div className="mt-12 grid gap-4 md:grid-cols-3">
            {c.controlPlane.estates.map((e, i) => (
              <Reveal key={e.title} delay={i * 70}>
                <div className="h-full rounded-xl border border-white/10 bg-white/[0.04] p-5">
                  <div className="flex items-center gap-3">
                    <span className="grid h-9 w-9 place-items-center rounded-lg bg-white/10 text-brand-100">
                      <Icon name={e.icon} className="h-4 w-4" />
                    </span>
                    <h3 className="text-sm font-bold text-white">{e.title}</h3>
                  </div>
                  <ul className="mt-3 flex flex-wrap gap-1.5">
                    {e.items.map((it) => (
                      <li
                        key={it}
                        className="rounded-md bg-white/[0.08] px-2.5 py-1 text-xs font-medium text-white/85"
                      >
                        {it}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
          <p className="mt-4 text-xs text-white/50">{c.controlPlane.note}</p>
        </Container>
      </section>

      {/* ── Why BlueWhale Stack — 6 pillars ── */}
      <section className="py-20 sm:py-24">
        <Container>
          <Reveal>
            <SectionHeading {...c.pillars.heading} />
          </Reveal>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {c.pillars.items.map((p, i) => (
              <Reveal key={p.title} delay={(i % 3) * 80}>
                <Card className="h-full">
                  <div className="grid h-11 w-11 place-items-center rounded-xl bg-[var(--bg-active)] text-accent">
                    <Icon name={p.icon} className="h-5 w-5" />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold text-ink">{p.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{p.body}</p>
                </Card>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* ── Whale AI ── */}
      <section className="bg-sunken py-20 sm:py-24">
        <Container>
          <div className="overflow-hidden rounded-2xl bg-[var(--brand-deep)] px-8 py-14 text-center sm:px-14">
            <div className="mb-3 flex items-center justify-center gap-3">
              <span aria-hidden className="h-px w-8 bg-white/30" />
              <span className="eyebrow text-[var(--gold)]">{c.whaleAi.kicker}</span>
              <span aria-hidden className="h-px w-8 bg-white/30" />
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">{c.whaleAi.title}</h2>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-white/70">{c.whaleAi.body}</p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              {c.whaleAi.tiers.map((t) => (
                <div
                  key={t.name}
                  className="min-w-[190px] max-w-[260px] flex-1 rounded-lg border border-white/15 bg-white/8 p-5 text-left"
                >
                  <div className="text-base font-bold text-white">{t.name}</div>
                  <div className="mt-0.5 text-xs font-medium text-white/50">{t.edition}</div>
                  <p className="mt-3 text-sm leading-relaxed text-white/70">{t.body}</p>
                </div>
              ))}
            </div>
            <div className="mt-8">
              <Button href={c.whaleAi.cta.href} variant="white" size="md">
                {c.whaleAi.cta.label}
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* ── Product showcase ── */}
      <section className="py-20 sm:py-24">
        <Container>
          <Reveal>
            <SectionHeading {...c.showcase.heading} />
          </Reveal>
          <Reveal delay={100}>
            <div className="mt-12">
              <ProductShowcase />
            </div>
          </Reveal>
        </Container>
      </section>

      {/* ── Included in every edition ── */}
      <section className="border-t border-line py-20 sm:py-24">
        <Container>
          <Reveal>
            <SectionHeading {...c.included.heading} />
          </Reveal>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {c.included.items.map((x, i) => (
              <Reveal key={x.title} delay={i * 60}>
                <div className="flex h-full flex-col items-center rounded-lg border border-line bg-surface p-6 text-center shadow-sm">
                  <span className="grid h-12 w-12 place-items-center rounded-full bg-primary text-primary-fg">
                    <Icon name={x.icon} className="h-5 w-5" />
                  </span>
                  <h3 className="mt-4 text-base font-bold text-ink">{x.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted">{x.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Button href={c.included.cta.href} variant="outline">
              {c.included.cta.label}
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </Container>
      </section>

      {/* ── Deployment modes ── */}
      <section id="deployment" className="scroll-mt-20 border-t border-line bg-sunken py-20 sm:py-24">
        <Container>
          <Reveal>
            <SectionHeading {...c.deployment.heading} />
          </Reveal>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
            {c.deployment.modes.map((d, i) => (
              <Reveal key={d.name} delay={(i % 5) * 60}>
                <Card className="h-full">
                  <Iso name={DEPLOY_ISO[i] ?? DEPLOY_ISO[0]} className="mb-3 h-24 w-auto" />
                  <Badge tone="accent">{d.badge}</Badge>
                  <h3 className="mt-3 text-base font-bold text-ink">{d.name}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{d.body}</p>
                </Card>
              </Reveal>
            ))}
          </div>
          <p className="mt-6 text-sm italic leading-relaxed text-faint">{c.deployment.note}</p>
        </Container>
      </section>

      {/* ── Support & service model ── */}
      <section className="py-20 sm:py-24">
        <Container>
          <Reveal>
            <SectionHeading {...c.support.heading} />
          </Reveal>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {c.support.items.map((s, i) => (
              <Reveal key={s.title} delay={i * 80}>
                <Card className="h-full border-l-4 border-l-primary">
                  <div className="flex items-center gap-3">
                    <span className="grid h-10 w-10 place-items-center rounded-full bg-primary text-primary-fg">
                      <Icon name={s.icon} className="h-4.5 w-4.5" />
                    </span>
                    <h3 className="text-base font-bold text-ink">{s.title}</h3>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-muted">{s.body}</p>
                </Card>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* ── The 90-day prototype ── */}
      <PrototypeOffer tinted offer={c.prototype} />

      {/* ── Trust & sovereignty ── */}
      <section className="py-20 sm:py-24">
        <Container>
          <Reveal>
            <SectionHeading {...c.trust.heading} />
          </Reveal>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {c.trust.pillars.map((t, i) => (
              <Reveal key={t.title} delay={(i % 4) * 70}>
                <div className="flex h-full flex-col items-center rounded-lg border border-line bg-surface p-6 text-center shadow-sm">
                  <div className="grid h-12 w-12 place-items-center rounded-full bg-[var(--bg-active)] text-accent">
                    <Icon name={t.icon} className="h-5 w-5" />
                  </div>
                  <h3 className="mt-4 text-base font-bold text-ink">{t.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{t.body}</p>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Security posture + compliance */}
          <Reveal delay={80}>
            <div className="mt-14 grid gap-10 lg:grid-cols-2">
              <div>
                <p className="eyebrow">{c.trust.postureLabel}</p>
                <ul className="mt-4 space-y-3">
                  {c.trust.posture.map((s) => (
                    <li key={s} className="flex items-start gap-3">
                      <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-[var(--bg-active)] text-accent">
                        <Check className="h-3 w-3" />
                      </span>
                      <span className="text-sm text-ink">{s}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-lg border border-line bg-sunken p-6">
                <p className="eyebrow">{c.trust.complianceLabel}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {settings.compliance.map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-line bg-surface px-3 py-1 text-sm text-muted"
                    >
                      {item}
                    </span>
                  ))}
                </div>
                <p className="mt-4 text-xs text-faint">{c.trust.complianceNote}</p>
                <div className="mt-5">
                  <Button href={c.trust.cta.href} variant="secondary" size="sm">
                    {c.trust.cta.label}
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      <FAQ
        items={c.faq.items}
        eyebrow={c.faq.heading.eyebrow}
        title={c.faq.heading.title}
        description={c.faq.heading.description}
        tinted
      />

      <ClosingCTA {...c.closing} />
    </InnerPage>
  );
}
