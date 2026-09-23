import { InnerPage } from "@/components/layout/InnerPage";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Check, MapPin } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { CmsPhotoHero } from "@/components/sections/CmsPhotoHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { LocationVisual } from "@/components/diagrams/LocationVisual";
import { Iso, type IsoName } from "@/components/illustrations/Iso";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { LeadershipMini } from "@/components/sections/LeadershipCard";
import { ClosingCTA } from "@/components/sections/ClosingCTA";
import { aboutHero } from "@/content/about";
import { aboutPageSpec } from "@/content/cms/docs/aboutPage";
import { aboutPage } from "@/content/sections/aboutPage";
import { getPageDoc } from "@/lib/cms-page";
import { getSiteSettings, getTeam } from "@/lib/content";

const getContent = () => getPageDoc(aboutPageSpec, aboutPage);

export async function generateMetadata(): Promise<Metadata> {
  const c = await getContent();
  return { title: c.seoTitle, description: c.seoDescription };
}

export default async function AboutPage() {
  const [c, settings, team] = await Promise.all([getContent(), getSiteSettings(), getTeam()]);
  const { offices, regions, compliance } = settings;
  const announcedLeaders = team.filter((l) => l.name);
  // "On the record": the SaaS-region count and cities come from the site settings; the rest from the page document.
  const numbers = [
    c.record.entities,
    c.record.certifications,
    { value: `${regions.length} ${c.record.regionsLabel}`, label: regions.map((r) => r.city).join(" · ") },
    c.record.capabilities,
  ];
  return (
    <InnerPage category="company" current="/about">
      {/* ── Hero: editorial split, oversized statement left ── */}
      <CmsPhotoHero
        route="/about"
        photo="sovereign-regions"
        eyebrow={aboutHero.eyebrow}
        title="A consulting firm that turned eight years of field work into a platform."
        description="BlueWhale Stack was founded in Mumbai in 2018 as a cloud consultancy. After eight years of migrations, audits and datacenter modernisations for telcos, banks, governments and hospitals in India and the GCC, the same gap kept appearing — no single view of the estate — and in 2026 we shipped the platform that closes it. Three entities today: the United States, the UAE and India."
        below={
          <div className="border-t border-line bg-sunken">
            <Container>
              <div className="grid divide-y divide-line sm:grid-cols-3 sm:divide-x sm:divide-y-0">
                {offices.map((office, i) => (
                  <div key={office.city} className="py-6 sm:px-6 sm:first:pl-0 sm:last:pr-0">
                    <p className="eyebrow">0{i + 1} · {office.label}</p>
                    <h2 className="mt-2 text-2xl font-bold tracking-[-0.02em] text-ink">{office.city}</h2>
                    <p className="mt-1.5 text-[13px] leading-relaxed text-muted">{office.blurb}</p>
                  </div>
                ))}
              </div>
            </Container>
          </div>
        }
      >
        <div className="flex flex-wrap gap-3">
          <Button href={c.hero.primary.href} size="lg">
            {c.hero.primary.label}
            <ArrowRight className="h-4 w-4" />
          </Button>
          <Button href={c.hero.secondary.href} size="lg" variant="secondary">
            {c.hero.secondary.label}
          </Button>
        </div>
      </CmsPhotoHero>

      {/* At a glance — quiet fact strip */}
      <section className="border-b border-line bg-sunken py-10">
        <Container>
          <dl className="grid grid-cols-2 gap-x-6 gap-y-7 sm:grid-cols-3">
            {c.facts.map((f) => (
              <div
                key={f.label}
                className="border-l-2 border-accent/30 pl-4"
              >
                <dt className="text-xs font-semibold uppercase tracking-wider text-faint">
                  {f.label}
                </dt>
                <dd className="mt-1 font-bold text-ink">
                  {f.value}
                </dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      {/* ── Story: split editorial, heading left / two stacked panels right ── */}
      <section className="bg-canvas py-24 sm:py-32">
        <Container>
          <div className="grid gap-x-16 gap-y-12 lg:grid-cols-[0.85fr_1.15fr]">
            <Reveal>
              <div className="lg:sticky lg:top-28 lg:self-start">
                <SectionHeading
                  eyebrow={c.story.eyebrow}
                  title={
                    <>
                      {c.story.title}
                      <br />
                      <span className="text-faint">
                        {c.story.titleAccent}
                      </span>
                    </>
                  }
                />
              </div>
            </Reveal>
            <div className="flex flex-col">
              {c.story.items.map((s, i) => (
                <Reveal key={s.title} delay={i * 100}>
                  <div className="group flex items-start gap-6 border-t border-line py-8 first:border-t-0 first:pt-0">
                    <span className="num text-2xl font-bold text-accent/40">
                      0{i + 1}
                    </span>
                    <div>
                      <h3 className="text-xl font-bold text-ink">
                        {s.title}
                      </h3>
                      <p className="mt-3 leading-relaxed text-muted">
                        {s.body}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* ── Mission & Vision: brand-tinted statement band ── */}
      <section className="border-y border-line bg-surface py-24 sm:py-32">
        <Container>
          <div className="grid gap-x-16 gap-y-12 lg:grid-cols-2">
            <Reveal>
              <div>
                <p className="eyebrow">
                  {c.missionVision.missionKicker}
                </p>
                <p className="mt-6 text-2xl font-bold leading-[1.25] tracking-tight text-ink sm:text-3xl">
                  {c.missionVision.mission}
                </p>
              </div>
            </Reveal>
            <Reveal delay={120}>
              <div className="lg:border-l lg:border-line-strong lg:pl-16">
                <p className="eyebrow">
                  {c.missionVision.visionKicker}
                </p>
                <p className="mt-6 text-2xl font-bold leading-[1.25] tracking-tight text-ink sm:text-3xl">
                  {c.missionVision.vision}
                </p>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* ── Principles: bold heading + asymmetric numbered grid ── */}
      <section className="bg-sunken py-24 sm:py-32">
        <Container>
          <Reveal>
            <SectionHeading {...c.principles.heading} />
          </Reveal>
          <div className="mt-14 grid gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
            {c.principles.items.map((p, i) => (
              <Reveal key={p.title} delay={(i % 4) * 70}>
                <div className="h-full bg-surface p-7">
                  <div className="flex items-center justify-between">
                    <span className="grid h-11 w-11 place-items-center rounded-lg bg-primary text-primary-fg">
                      <Icon name={p.icon} className="h-5 w-5" />
                    </span>
                    <span className="num text-sm font-bold text-faint">
                      0{i + 1}
                    </span>
                  </div>
                  <h3 className="mt-5 text-lg font-bold text-ink">
                    {p.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    {p.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* ── Our journey: numbered editorial timeline ── */}
      <section className="bg-canvas py-24 sm:py-32">
        <Container>
          <Reveal>
            <SectionHeading {...c.journey.heading} />
          </Reveal>
          <div className="mt-14 grid gap-x-12 gap-y-10 sm:grid-cols-2">
            {c.journey.items.map((m, i) => (
              <Reveal key={`${m.year}-${m.title}`} delay={(i % 2) * 90}>
                <div className="flex gap-6 border-t-2 border-ink pt-5">
                  <span className="num shrink-0 text-4xl font-bold leading-none text-accent/50">
                    0{i + 1}
                  </span>
                  <div>
                    <div className="num text-sm font-bold tracking-wide text-accent">
                      {m.year}
                    </div>
                    <h3 className="mt-1 text-xl font-bold text-ink">
                      {m.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted">
                      {m.body}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* ── What we build: bold heading + product cards ── */}
      <section id="family" className="scroll-mt-24 bg-sunken py-24 sm:py-32">
        <Container>
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <Reveal>
              <SectionHeading {...c.products.heading} />
            </Reveal>
            <Reveal delay={80}>
              <Button href={c.products.cta.href} variant="secondary" className="shrink-0">
                {c.products.cta.label}
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Reveal>
          </div>
          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {c.products.items.map((p, i) => (
              <Reveal key={p.name} delay={(i % 3) * 80}>
                <Link href={p.href} className="block h-full">
                  <Card interactive className="flex h-full flex-col">
                    <Iso name={p.iso as IsoName} className="mb-4 h-32 w-auto self-start" />
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-bold text-ink">
                        {p.name}
                      </h3>
                      <Badge tone={p.badge === "Core" ? "brand" : "neutral"}>
                        {p.badge}
                      </Badge>
                    </div>
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">
                      {p.body}
                    </p>
                    <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-accent">
                      {c.products.cardLink}
                      <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover/card:translate-x-1" />
                    </span>
                  </Card>
                </Link>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* ── Service offerings: consulting and implementation ── */}
      <section className="border-t border-line bg-canvas py-24 sm:py-32">
        <Container>
          <Reveal>
            <SectionHeading {...c.services.heading} />
          </Reveal>
          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {c.services.items.map((s, i) => (
              <Reveal key={s.name} delay={(i % 4) * 80}>
                <Card className="flex h-full flex-col border-l-4 border-l-primary">
                  <Iso name={s.iso as IsoName} className="h-32 w-auto self-start" />
                  <h3 className="mt-4 text-lg font-bold text-ink">{s.name}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{s.body}</p>
                </Card>
              </Reveal>
            ))}
          </div>
          <Reveal delay={120}>
            <p className="mx-auto mt-10 max-w-3xl rounded-lg border border-amber-300 bg-surface px-6 py-4 text-center text-sm font-semibold text-ink shadow-sm">
              {c.services.note}
            </p>
          </Reveal>
        </Container>
      </section>

      {/* ── Proof we're real: entities, registrations, certificates ── */}
      <section className="bg-brand-900 py-16 text-white">
        <Container>
          <p className="eyebrow text-[var(--gold)]">{c.record.kicker}</p>
          <div className="mt-6 grid gap-px overflow-hidden rounded-lg border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
            {numbers.map((n, i) => (
              <Reveal key={n.label} delay={i * 70}>
                <div className="h-full bg-brand-900 px-5 py-5">
                  <p className="text-xl font-bold text-white">{n.value}</p>
                  <p className="mt-1 text-sm leading-snug text-white/60">{n.label}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* ── Global presence: heading, then a full-width 3-up office grid ── */}
      <section className="bg-canvas py-24 sm:py-32">
        <Container>
          <Reveal>
            <SectionHeading {...c.presence.heading} />
          </Reveal>
          <div className="mt-14">
            <div className="grid items-stretch gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {offices.map((o, i) => (
                <Reveal key={o.city} delay={i * 90} className="h-full">
                  <Card className="flex h-full flex-col overflow-hidden p-0">
                    <LocationVisual city={o.city} className="aspect-[20/9]" />
                    <div className="flex flex-1 flex-col p-6">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-5 w-5 shrink-0 text-accent" />
                        <h3 className="text-lg font-bold text-ink">
                          {o.city}
                        </h3>
                      </div>
                      <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-accent">
                        {o.label}
                      </p>
                      <p className="mt-3 text-sm leading-relaxed text-muted">
                        {o.address}
                      </p>
                      <p className="mt-auto border-t border-line pt-3 text-xs text-faint">
                        {o.entity}
                      </p>
                    </div>
                  </Card>
                </Reveal>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* ── Leadership: compact roster; full bios live on /about/leadership ── */}
      <section className="border-y border-line bg-sunken py-24 sm:py-32">
        <Container>
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <Reveal>
              <SectionHeading {...c.leadership.heading} />
            </Reveal>
            <Reveal delay={80}>
              <Button href={c.leadership.cta.href} variant="secondary" className="shrink-0">
                {c.leadership.cta.label}
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Reveal>
          </div>
          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
            {announcedLeaders.map((l, i) => (
              <Reveal key={l.name} delay={(i % 5) * 60} className="h-full">
                <LeadershipMini member={l} />
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* ── Certifications & trust: asymmetric split ── */}
      <section className="bg-canvas py-24 sm:py-32">
        <Container>
          <div className="grid gap-x-16 gap-y-12 lg:grid-cols-[1.1fr_0.9fr]">
            <Reveal>
              <div>
                <SectionHeading {...c.trust.heading} />
                <ul className="mt-10 space-y-4">
                  {c.trust.points.map((t) => (
                    <li key={t} className="flex items-start gap-3">
                      <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-brand-50 text-accent">
                        <Check className="h-3 w-3" />
                      </span>
                      <span className="text-muted">{t}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
            <Reveal delay={120}>
              <div className="rounded-lg border border-line bg-surface p-7 shadow-sm">
                <p className="eyebrow">
                  {c.trust.complianceLabel}
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {compliance.map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-line bg-canvas px-3 py-1 text-sm text-muted"
                    >
                      {item}
                    </span>
                  ))}
                </div>
                <div className="mt-7 rounded-lg border border-line bg-[var(--bg-active)] p-5">
                  <div className="flex items-center gap-2 text-sm font-bold text-accent">
                    {c.trust.hiringTitle}
                    <ArrowUpRight className="h-4 w-4" />
                  </div>
                  <p className="mt-1.5 text-sm text-muted">
                    {c.trust.hiringBody}{" "}
                    <Link
                      href={c.trust.hiringLink.href}
                      className="font-semibold text-accent"
                    >
                      {c.trust.hiringLink.label}
                    </Link>
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      <ClosingCTA {...c.closing} />
    </InnerPage>
  );
}
