import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Check, MapPin, User } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Stat } from "@/components/ui/Stat";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { clouds, regions, compliance, offices } from "@/content/company";
import {
  aboutHero,
  companyFacts,
  missionVision,
  story,
  principles,
  milestones,
  productFamily,
  leadership,
  trustPoints,
} from "@/content/about";

export const metadata: Metadata = {
  title: "About Us",
  description: aboutHero.mission,
};

const numbers = [
  { value: `${clouds.length}+`, label: "Clouds & hypervisors" },
  { value: `${regions.length}`, label: "Global regions" },
  { value: "5", label: "Platform editions" },
  { value: "10+", label: "Compliance frameworks" },
];

export default function AboutPage() {
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
                    {aboutHero.eyebrow}
                  </span>
                </div>
                <h1 className="text-[2.6rem] font-bold leading-[1.02] tracking-tight text-ink sm:text-6xl">
                  The command center for{" "}
                  <span className="text-accent">every cloud</span> you run.
                </h1>
              </div>
            </Reveal>
            <Reveal delay={90}>
              <div className="lg:pb-2">
                <p className="text-lg leading-relaxed text-muted">
                  {aboutHero.mission}
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Button href="/contact" size="lg">
                    Book a demo
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                  <Button href="/careers" size="lg" variant="secondary">
                    See careers
                  </Button>
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* At a glance — quiet fact strip */}
      <section className="border-b border-line bg-sunken py-10">
        <Container>
          <dl className="grid grid-cols-2 gap-x-6 gap-y-7 sm:grid-cols-3 lg:grid-cols-5">
            {companyFacts.map((f) => (
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
                  eyebrow="Our story"
                  title={
                    <>
                      Cloud got complex.
                      <br />
                      <span className="text-faint">
                        We built the answer.
                      </span>
                    </>
                  }
                />
              </div>
            </Reveal>
            <div className="flex flex-col">
              {story.map((s, i) => (
                <Reveal key={s.heading} delay={i * 100}>
                  <div className="group flex items-start gap-6 border-t border-line py-8 first:border-t-0 first:pt-0">
                    <span className="num text-2xl font-bold text-accent/40">
                      0{i + 1}
                    </span>
                    <div>
                      <h3 className="text-xl font-bold text-ink">
                        {s.heading}
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
      <section className="border-y border-line bg-brand-50 py-24 sm:py-32">
        <Container>
          <div className="grid gap-x-16 gap-y-12 lg:grid-cols-2">
            <Reveal>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
                  Our mission
                </p>
                <p className="mt-6 text-2xl font-bold leading-[1.25] tracking-tight text-ink sm:text-3xl">
                  {missionVision.mission}
                </p>
              </div>
            </Reveal>
            <Reveal delay={120}>
              <div className="lg:border-l lg:border-line-strong lg:pl-16">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
                  Our vision
                </p>
                <p className="mt-6 text-2xl font-bold leading-[1.25] tracking-tight text-muted sm:text-3xl">
                  {missionVision.vision}
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
            <SectionHeading
              eyebrow="What we stand for"
              title="Four principles guide everything we build"
            />
          </Reveal>
          <div className="mt-14 grid gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
            {principles.map((p, i) => (
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
            <SectionHeading
              eyebrow="Our journey"
              title="From a conviction to a platform"
              description="How BlueWhale Stack has grown — and where it's headed."
            />
          </Reveal>
          <div className="mt-14 grid gap-x-12 gap-y-10 sm:grid-cols-2">
            {milestones.map((m, i) => (
              <Reveal key={`${m.year}-${m.title}`} delay={(i % 2) * 90}>
                <div className="flex gap-6 border-t-2 border-ink pt-5">
                  <span className="num shrink-0 text-4xl font-bold leading-none text-accent/20">
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
      <section className="bg-sunken py-24 sm:py-32">
        <Container>
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <Reveal>
              <SectionHeading
                eyebrow="What we build"
                title="The BlueWhale Stack family"
                description="A core cloud-management platform, surrounded by tools and ventures that extend it."
              />
            </Reveal>
            <Reveal delay={80}>
              <Button href="/editions" variant="secondary" className="shrink-0">
                Explore editions
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Reveal>
          </div>
          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {productFamily.map((p, i) => (
              <Reveal key={p.name} delay={(i % 3) * 80}>
                <Link href={p.href} className="block h-full">
                  <Card interactive className="flex h-full flex-col">
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
                      Learn more
                      <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover/card:translate-x-1" />
                    </span>
                  </Card>
                </Link>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* ── By the numbers: stats on brand band ── */}
      <section className="bg-brand-500 py-20 text-white">
        <Container>
          <div className="grid grid-cols-2 gap-x-8 gap-y-12 lg:grid-cols-4">
            {numbers.map((n, i) => (
              <Reveal key={n.label} delay={i * 70}>
                <Stat value={n.value} label={n.label} inverse />
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* ── Global presence: split heading + office cards ── */}
      <section className="bg-canvas py-24 sm:py-32">
        <Container>
          <div className="grid gap-x-16 gap-y-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
            <Reveal>
              <SectionHeading
                eyebrow="Global presence"
                title="Where we are"
                description="Headquartered in India, with a presence in the UAE — serving customers across the globe."
              />
            </Reveal>
            <div className="grid gap-5 sm:grid-cols-2">
              {offices.map((o, i) => (
                <Reveal key={o.city} delay={i * 90}>
                  <Card className="h-full">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-5 w-5 text-accent" />
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
                  </Card>
                </Reveal>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* ── Leadership: quiet surface band, heading + portrait grid ── */}
      <section className="border-y border-line bg-sunken py-24 sm:py-32">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="Leadership"
              title="The team behind the platform"
            />
          </Reveal>
          <div className="mt-14 grid gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
            {leadership.map((l, i) => (
              <Reveal key={l.role} delay={(i % 4) * 70}>
                <div className="h-full bg-surface p-7 text-center">
                  <div className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-brand-50 text-accent ring-1 ring-line">
                    <User className="h-8 w-8" />
                  </div>
                  <div className="mt-4 font-bold text-ink">
                    To be announced
                  </div>
                  <div className="mt-1 text-sm text-muted">{l.role}</div>
                </div>
              </Reveal>
            ))}
          </div>
          <p className="mt-6 text-sm text-faint">
            Leadership bios &amp; photos to be added — share them and we&apos;ll
            drop them in.
          </p>
        </Container>
      </section>

      {/* ── Certifications & trust: asymmetric split ── */}
      <section className="bg-canvas py-24 sm:py-32">
        <Container>
          <div className="grid gap-x-16 gap-y-12 lg:grid-cols-[1.1fr_0.9fr]">
            <Reveal>
              <div>
                <SectionHeading
                  eyebrow="Certifications & trust"
                  title="Earning trust, by design"
                />
                <ul className="mt-10 space-y-4">
                  {trustPoints.map((t) => (
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
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
                  Compliance frameworks
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {compliance.map((c) => (
                    <span
                      key={c}
                      className="rounded-full border border-line bg-canvas px-3 py-1 text-sm text-muted"
                    >
                      {c}
                    </span>
                  ))}
                </div>
                <div className="mt-7 rounded-lg border border-line bg-brand-50 p-5">
                  <div className="flex items-center gap-2 text-sm font-bold text-accent">
                    Join us
                    <ArrowUpRight className="h-4 w-4" />
                  </div>
                  <p className="mt-1.5 text-sm text-muted">
                    We&apos;re hiring across engineering, product and
                    go-to-market.{" "}
                    <Link
                      href="/careers"
                      className="font-semibold text-accent"
                    >
                      See open roles →
                    </Link>
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>
    </>
  );
}
