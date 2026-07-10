import type { Metadata } from "next";
import { ArrowRight, Check } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { ControlPlaneMap } from "@/components/diagrams/ControlPlaneMap";
import { PlatformLayers } from "@/components/diagrams/PlatformLayers";
import { ModuleExplorer } from "@/components/sections/ModuleExplorer";
import { ProductShowcase } from "@/components/sections/ProductShowcase";
import { compliance } from "@/content/company";
import {
  platformHero,
  heroStats,
  pillars,
  capabilities,
  deploymentModels,
  whaleTiers,
  trustPillars,
  securityPosture,
} from "@/content/platform";

export const metadata: Metadata = {
  title: "Platform",
  description: platformHero.description,
};

export default function PlatformPage() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="relative overflow-hidden border-b border-line bg-canvas text-ink">
        <Container className="relative">
          <div className="max-w-4xl pt-20 sm:pt-28">
            <div className="mb-6 flex items-center gap-3">
              <span aria-hidden className="h-px w-8 bg-accent/60" />
              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
                {platformHero.eyebrow}
              </span>
            </div>
            <h1 className="text-[2.6rem] font-bold leading-[1.03] tracking-tight sm:text-5xl lg:text-6xl">
              Every cloud.{" "}
              <span className="text-accent">One control plane.</span>
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-relaxed text-muted sm:text-xl">
              {platformHero.description}
            </p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <Button href="/contact" size="lg" variant="primary">
                Book a demo
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button href="/editions" size="lg" variant="outline">
                See editions
              </Button>
            </div>
          </div>

          {/* Stats strip */}
          <Reveal delay={120}>
            <div className="mt-14 mb-0 grid grid-cols-2 gap-px overflow-hidden rounded-t-lg border-x border-t border-line bg-line sm:grid-cols-4">
              {heroStats.map((s) => (
                <div key={s.label} className="bg-surface px-5 py-4">
                  <p className="text-sm font-bold text-ink">{s.value}</p>
                  <p className="mt-0.5 text-xs text-faint">{s.label}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </Container>
      </section>

      {/* ── Why BlueWhale Stack — 6 pillars ── */}
      <section className="py-20 sm:py-24">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="Why BlueWhale Stack"
              title="One platform, end to end"
              description="Connect a cloud once and everything — inventory, cost, observability, tickets, security, migration — flows into a single control plane the whole organisation works from."
            />
          </Reveal>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {pillars.map((p, i) => (
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

      {/* ── Control plane map ── */}
      <section className="relative overflow-hidden bg-sunken py-20 sm:py-24">
        <Container className="relative">
          <Reveal>
            <SectionHeading
              eyebrow="Unified control plane"
              title="See the whole estate at a glance"
              description="Every cloud and data center connected, governed, and visible from one layer."
            />
          </Reveal>
          <Reveal delay={100}>
            <div className="mt-12">
              <ControlPlaneMap />
            </div>
          </Reveal>
        </Container>
      </section>

      {/* ── Platform architecture (7 layers) ── */}
      <section className="py-20 sm:py-24">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="Platform Architecture"
              title="Built as capability layers"
              description="From the industry you serve down to the way you deploy — one coherent platform, composable to your needs."
            />
          </Reveal>
          <Reveal delay={100}>
            <div className="mt-12">
              <PlatformLayers />
            </div>
          </Reveal>
        </Container>
      </section>

      {/* ── Capabilities — 5 groups ── */}
      <section className="bg-sunken py-20 sm:py-24">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="Capabilities"
              title="Compose what you need"
              description="Five capability groups, one shared model. Start where the value is, and switch on the rest as you grow."
            />
          </Reveal>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {capabilities.map((cap, i) => (
              <Reveal key={cap.title} delay={(i % 5) * 60}>
                <div className="h-full rounded-lg border border-line bg-surface p-5 shadow-sm">
                  <div className="grid h-9 w-9 place-items-center rounded-lg bg-[var(--bg-active)] text-accent">
                    <Icon name={cap.icon} className="h-4 w-4" />
                  </div>
                  <h3 className="mt-3 text-sm font-bold text-ink">{cap.title}</h3>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {cap.chips.map((chip) => (
                      <span
                        key={chip}
                        className="rounded-md border border-line bg-sunken px-2 py-0.5 text-[11px] font-medium text-muted"
                      >
                        {chip}
                      </span>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* ── Whale AI ── */}
      <section className="py-20 sm:py-24">
        <Container>
          <div className="overflow-hidden rounded-2xl bg-[var(--brand-deep)] px-8 py-14 text-center sm:px-14">
            <div className="mb-3 flex items-center justify-center gap-3">
              <span aria-hidden className="h-px w-8 bg-white/30" />
              <span className="text-xs font-bold uppercase tracking-[0.18em] text-white/60">
                ✦ Whale AI
              </span>
              <span aria-hidden className="h-px w-8 bg-white/30" />
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              AI in every module, not a bolt-on
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-white/70">
              Whale AI is a horizontal layer across the whole platform — grounded in your live
              data, with an assistant wherever you work and 50+ ready use cases from cost
              narratives to migration plans.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              {whaleTiers.map((t) => (
                <div
                  key={t.name}
                  className="min-w-[190px] max-w-[240px] flex-1 rounded-lg border border-white/15 bg-white/8 p-5 text-left"
                >
                  <div className="text-base font-bold text-white">{t.name}</div>
                  <div className="mt-0.5 text-xs font-medium text-white/50">{t.edition}</div>
                  <p className="mt-3 text-sm leading-relaxed text-white/70">{t.body}</p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* ── Product showcase ── */}
      <section className="bg-sunken py-20 sm:py-24">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="See the product"
              title="One console for every team"
              description="The same control plane — from cost to inventory to security."
            />
          </Reveal>
          <Reveal delay={100}>
            <div className="mt-12">
              <ProductShowcase />
            </div>
          </Reveal>
        </Container>
      </section>

      {/* ── Module explorer ── */}
      <section className="py-20 sm:py-24">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="Modules"
              title="Explore the 11 modules"
              description="A shared platform, gated per edition. Switch groups to see what each layer delivers."
            />
          </Reveal>
          <Reveal delay={100}>
            <div className="mt-12">
              <ModuleExplorer />
            </div>
          </Reveal>
        </Container>
      </section>

      {/* ── Deployment models ── */}
      <section className="bg-sunken py-20 sm:py-24">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="Deployment"
              title="Run it your way"
              description="The same platform — delivered as SaaS, in your own cloud, or fully air-gapped."
            />
          </Reveal>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {deploymentModels.map((d, i) => (
              <Reveal key={d.name} delay={(i % 4) * 70}>
                <Card className="h-full">
                  <Badge tone="accent">{d.badge}</Badge>
                  <h3 className="mt-3 text-lg font-bold text-ink">{d.name}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{d.body}</p>
                </Card>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* ── Trust & sovereignty ── */}
      <section className="py-20 sm:py-24">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="Trust & Sovereignty"
              title="Your data, your region"
              description="Built for regulated industries from the foundation up."
            />
          </Reveal>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {trustPillars.map((t, i) => (
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
                <p className="text-xs font-semibold uppercase tracking-wider text-accent">
                  Security posture
                </p>
                <ul className="mt-4 space-y-3">
                  {securityPosture.map((s) => (
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
                <p className="text-xs font-semibold uppercase tracking-wider text-accent">
                  Compliance frameworks
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {compliance.map((c) => (
                    <span
                      key={c}
                      className="rounded-full border border-line bg-surface px-3 py-1 text-sm text-muted"
                    >
                      {c}
                    </span>
                  ))}
                </div>
                <div className="mt-6">
                  <Button href="/trust" variant="secondary" size="sm">
                    Trust Center
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* ── Final CTA ── */}
      <section className="bg-sunken py-20 sm:py-24">
        <Container>
          <Reveal>
            <div className="overflow-hidden rounded-2xl bg-primary px-8 py-14 text-center text-primary-fg sm:px-14">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                See your entire cloud in one place
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed opacity-80">
                One control plane across every cloud, on-prem, and hybrid — with AI in every
                module.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <Button href="/contact" size="lg" variant="white">
                  Get a demo
                  <ArrowRight className="h-4 w-4" />
                </Button>
                <Button
                  href="/editions"
                  size="lg"
                  variant="ghost"
                  className="text-white hover:bg-white/10"
                >
                  See editions
                </Button>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
