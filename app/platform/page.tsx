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
import { ArchitectureDiagram } from "@/components/diagrams/ArchitectureDiagram";
import { ProductShowcase } from "@/components/sections/ProductShowcase";
import { PrototypeOffer } from "@/components/sections/PrototypeOffer";
import { FAQ } from "@/components/sections/FAQ";
import { ClosingCTA } from "@/components/sections/ClosingCTA";
import { Iso, FAMILY_ISO, DEPLOY_ISO } from "@/components/illustrations/Iso";
import { ProductScene } from "@/components/scenes/ProductScene";
import { compliance, estates } from "@/content/company";
import {
  modules,
  moduleGroups,
  moduleGroupOrder,
  moduleGroupBlurbs,
  moduleGroupIcons,
} from "@/content/modules";
import {
  platformHero,
  heroStats,
  whoItIsFor,
  whyNow,
  pillars,
  everydayMoments,
  designRule,
  architectureLayers,
  includedInEveryEdition,
  deploymentModes,
  deploymentNote,
  supportModel,
  whaleTiers,
  trustPillars,
  securityPosture,
  whatItReplaces,
  platformFaq,
} from "@/content/platform";

export const metadata: Metadata = {
  title: "Platform — Digital Experience Platform",
  description:
    "One Platform. Every Industry. Every Estate. BlueWhale Stack is one control plane for every cloud an organization runs — 54 capabilities in nine families, four editions on one architecture, six platform classes, five deployment modes.",
};

export default function PlatformPage() {
  return (
    <InnerPage category="platform" current="/platform">
      {/* ── Hero ── */}
      <section className="relative overflow-hidden border-b border-line bg-canvas text-ink">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-dot-grid opacity-60 [mask-image:radial-gradient(ellipse_70%_60%_at_50%_0%,black,transparent_75%)]"
        />
        <Container className="relative">
          <div className="grid items-center gap-12 pt-20 sm:pt-28 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="max-w-3xl">
              <div className="mb-6 flex items-center gap-3">
                <span aria-hidden className="h-px w-8 bg-accent/60" />
                <span className="eyebrow text-accent">{platformHero.eyebrow}</span>
              </div>
              <h1 className="display-1">
                One Platform.{" "}
                <span className="text-accent">Every Industry. Every Estate.</span>
              </h1>
              <p className="mt-7 text-lg leading-relaxed text-muted sm:text-xl">
                {platformHero.description}
              </p>
              <p className="mt-5 text-base font-semibold text-ink">
                {platformHero.tagline}
              </p>
              <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <div>
                  <Button href="/contact?intent=demo" size="lg" variant="primary">
                    Book the discovery workshop
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                  <p className="mt-2 text-xs text-faint">Half a day · your technology and finance leads · success criteria agreed</p>
                </div>
                <Button href="#replaces" size="lg" variant="outline">
                  What it replaces
                </Button>
              </div>
            </div>
            <Reveal delay={100}>
              <ProductScene scene="architecture" priority tagline className="w-full aspect-[4/3]" />
            </Reveal>
          </div>

          {/* Stats strip — the official at-a-glance numbers */}
          <Reveal delay={120}>
            <div className="mt-14 mb-0 grid grid-cols-2 gap-px overflow-hidden rounded-t-lg border-x border-t border-line bg-line sm:grid-cols-4">
              {heroStats.map((s) => (
                <div key={s.label} className="border-t-[3px] border-t-primary bg-surface px-5 py-5">
                  <p className="num text-3xl font-bold text-accent sm:text-4xl">{s.value}</p>
                  <p className="mt-1 text-sm leading-snug text-muted">{s.label}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </Container>
      </section>

      <PageIndex items={[
        { label: "What it replaces", href: "#replaces" },
        { label: "Architecture", href: "#architecture" },
        { label: "Capabilities", href: "#families" },
        { label: "Deployment", href: "#deployment" },
        { label: "90-day prototype", href: "#prototype" },
      ]} />

      {/* ── Who it is for ── */}
      <section className="py-20 sm:py-24">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="Who it is for"
              title="Three kinds of estate. One platform."
              description="Enterprises, operators and governments consume governed services — each through its own edition of the same platform."
            />
          </Reveal>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {whoItIsFor.map((w, i) => (
              <Reveal key={w.title} delay={i * 80}>
                <Link href={w.href} className="block h-full">
                  <Card interactive className="flex h-full flex-col border-l-4 border-l-primary">
                    <div className="grid h-11 w-11 place-items-center rounded-lg bg-[var(--bg-active)] text-accent">
                      <Icon name={w.icon} className="h-5 w-5" />
                    </div>
                    <h3 className="mt-4 text-lg font-bold text-ink">{w.title}</h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{w.body}</p>
                    <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-accent">
                      See the edition <ArrowRight className="h-3.5 w-3.5" />
                    </span>
                  </Card>
                </Link>
              </Reveal>
            ))}
          </div>
          <Reveal delay={120}>
            <div className="mt-8 rounded-lg border-l-4 border-amber-400 bg-sunken p-5 text-sm leading-relaxed text-ink">
              <span className="font-bold">Why now:</span> {whyNow}
            </div>
          </Reveal>
        </Container>
      </section>

      {/* ── What it replaces ── */}
      <section id="replaces" className="scroll-mt-20 border-t border-line bg-sunken py-20 sm:py-24">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="What it replaces"
              title="Seven tool categories, one licence"
              description="The consolidation arithmetic, tool by tool — with the honest status of each replacement, so you can plan which contracts retire this year and which next."
            />
          </Reveal>
          <Reveal delay={100}>
            <div className="mt-12 overflow-x-auto rounded-lg border border-line bg-surface shadow-sm">
              <table className="w-full min-w-[720px] border-collapse text-sm">
                <thead>
                  <tr className="bg-primary text-left text-primary-fg">
                    <th className="px-5 py-3 font-semibold">You run today</th>
                    <th className="px-5 py-3 font-semibold">In BlueWhale Stack</th>
                    <th className="px-5 py-3 font-semibold">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-line">
                  {whatItReplaces.map((r) => (
                    <tr key={r.category} className="align-top">
                      <td className="w-64 px-5 py-4 font-semibold text-ink">{r.category}</td>
                      <td className="px-5 py-4 leading-relaxed text-muted">{r.answer}</td>
                      <td className="w-56 px-5 py-4">
                        <Badge tone={r.status === "GA" ? "success" : r.status.startsWith("Enterprise") ? "neutral" : "warning"}>
                          {r.status}
                        </Badge>
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
            <SectionHeading
              eyebrow="Platform architecture"
              title="The architecture, top to bottom"
              description="The platform in one picture — read top-down, the way value flows: from the industries served, through the Digital Experience Layer and the Unified Platform Core, down to the integrations, every estate, and the modes it deploys in."
            />
          </Reveal>
          <Reveal delay={100}>
            <div className="mt-12">
              <ArchitectureDiagram id="platform-dxp" />
            </div>
          </Reveal>

          {/* How to read the architecture */}
          <Reveal delay={140}>
            <div className="mt-12">
              <p className="eyebrow text-accent">How to read the architecture</p>
              <div className="mt-4 overflow-hidden rounded-lg border border-line bg-surface shadow-sm">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-primary text-left text-primary-fg">
                      <th className="px-5 py-3 font-semibold">Layer</th>
                      <th className="px-5 py-3 font-semibold">What it means for you</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-line">
                    {architectureLayers.map((l) => (
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
            <SectionHeading
              eyebrow="The nine capability families"
              title="What lives in the platform core"
              description="Nine families under one console, one identity, one policy and one bill — 54 capabilities in all. Every family reads from and writes to the same inventory, identity and policy plane."
            />
          </Reveal>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {moduleGroupOrder.map((g, i) => {
              const ships = modules.filter((m) => m.group === g);
              return (
                <Reveal key={g} delay={(i % 3) * 70}>
                  <Link href={`/modules#${g}`} className="block h-full">
                    <Card interactive className="flex h-full flex-col">
                      <Iso name={FAMILY_ISO[g]} className="mb-3 h-28 w-auto self-start" />
                      <div className="flex items-center gap-3">
                        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-primary text-primary-fg">
                          <Icon name={moduleGroupIcons[g]} className="h-5 w-5" />
                        </span>
                        <h3 className="text-base font-bold text-ink">{moduleGroups[g]}</h3>
                      </div>
                      <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">
                        {moduleGroupBlurbs[g]}
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
          <p className="mt-4 text-xs text-faint">
            Full capability list (54 capabilities with edition mapping) available in the technical datasheet on request.
          </p>

          {/* Three everyday moments */}
          <Reveal delay={80}>
            <div className="mt-14">
              <h3 className="text-xl font-bold text-ink">
                How the families work together — three everyday moments
              </h3>
              <div className="mt-6 grid gap-5 md:grid-cols-3">
                {everydayMoments.map((m) => (
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
                <span className="font-bold">The design rule behind all nine:</span> {designRule}
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
            <SectionHeading
              eyebrow="Every estate — managed as one"
              title="One control plane over six platform classes"
              description="Public clouds, private and virtualization estates, hybrid and sovereign stacks — discovered, governed and billed as one, down to air-gapped and edge sites."
              inverse
            />
          </Reveal>
          <Reveal delay={100}>
            <div className="mt-12">
              <ControlPlaneMap />
            </div>
          </Reveal>
          <div className="mt-12 grid gap-4 md:grid-cols-3">
            {estates.map((e, i) => (
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
          <p className="mt-4 text-xs text-white/50">
            Vendor marks identify supported platforms; no partnership or endorsement is implied.
          </p>
        </Container>
      </section>

      {/* ── Why BlueWhale Stack — 6 pillars ── */}
      <section className="py-20 sm:py-24">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="Why BlueWhale Stack"
              title="One platform, end to end"
              description="Connect an estate once and everything — inventory, cost, observability, tickets, security, migration, evidence — flows into a single control plane the whole organisation works from."
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

      {/* ── Whale AI ── */}
      <section className="bg-sunken py-20 sm:py-24">
        <Container>
          <div className="overflow-hidden rounded-2xl bg-[var(--brand-deep)] px-8 py-14 text-center sm:px-14">
            <div className="mb-3 flex items-center justify-center gap-3">
              <span aria-hidden className="h-px w-8 bg-white/30" />
              <span className="eyebrow text-white/60">✦ Whale AI — incl. offline</span>
              <span aria-hidden className="h-px w-8 bg-white/30" />
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              AI in every family — including inside the perimeter
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-white/70">
              Whale AI is a horizontal layer across the whole platform — AI for operations,
              documentation and compliance, grounded in your live data, with 50+ ready use
              cases. Your choice of model, able to run fully offline inside the perimeter.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              {whaleTiers.map((t) => (
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
              <Button href="/products/whale-ai" variant="white" size="md">
                Explore Whale AI
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
            <SectionHeading
              eyebrow="See the product"
              title="The console, by job"
              description="Cost, inventory and security posture — three of the screens teams live in. Every module page shows its own screen alongside how it works."
            />
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
            <SectionHeading
              eyebrow="Editions"
              title="Five things every edition includes"
              description="Whatever the licence — Standard at $24,000 a year through Government — these five are always on, and moving up is a licence change on the same deployment."
            />
          </Reveal>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {includedInEveryEdition.map((x, i) => (
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
            <Button href="/editions" variant="outline">
              Compare the four editions
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </Container>
      </section>

      {/* ── Deployment modes ── */}
      <section id="deployment" className="scroll-mt-20 border-t border-line bg-sunken py-20 sm:py-24">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="Deployment"
              title="The same product, wherever it must run"
              description="Five deployment modes on one platform build — moving between them is an operational decision, not a re-implementation."
            />
          </Reveal>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
            {deploymentModes.map((d, i) => (
              <Reveal key={d.name} delay={(i % 5) * 60}>
                <Card className="h-full">
                  <Iso name={DEPLOY_ISO[i]} className="mb-3 h-24 w-auto" />
                  <Badge tone="accent">{d.badge}</Badge>
                  <h3 className="mt-3 text-base font-bold text-ink">{d.name}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{d.body}</p>
                </Card>
              </Reveal>
            ))}
          </div>
          <p className="mt-6 text-sm italic leading-relaxed text-faint">{deploymentNote}</p>
        </Container>
      </section>

      {/* ── Support & service model ── */}
      <section className="py-20 sm:py-24">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="Support & service model"
              title="Who runs it with you after go-live"
              description="L1/L2 with you or your partner and L3 with BlueWhale, a 24×7 critical bridge at 99.9%, quarterly releases, and no forced upgrades on sovereign estates."
            />
          </Reveal>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {supportModel.map((s, i) => (
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
      <PrototypeOffer tinted />

      {/* ── Trust & sovereignty ── */}
      <section className="py-20 sm:py-24">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="Trust & Sovereignty"
              title="Certified, and proven before commitment"
              description="Built for regulated industries from the foundation up — independently certified management systems, and the compliance alignment engineered into the platform itself."
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
                <p className="eyebrow text-accent">Security posture</p>
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
                <p className="eyebrow text-accent">Compliance frameworks</p>
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
                <p className="mt-4 text-xs text-faint">
                  Certified entity: BlueWhale Stack Consulting and Technologies FZE LLC. Certificates are verifiable through the Trust Center.
                </p>
                <div className="mt-5">
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

      <FAQ
        items={platformFaq}
        title="What buyers ask about the platform"
        description="Permissions, deployment modes, what is GA and what is not, and where Whale AI sends your data."
        tinted
      />

      <ClosingCTA
        eyebrow="Next step"
        title="See the platform on one of your own accounts."
        body="A 45-minute working session with a solutions engineer: one cloud account connected read-only, the inventory, cost and audit screens on your real resources, and the export left with you. Bring your hardest audit finding."
        primary={{
          label: "Book a working session",
          href: "/contact?intent=demo",
          note: "45 minutes · read-only credentials · nothing installed on your side",
        }}
        secondary={{
          label: "Start the 90-day prototype",
          href: "#prototype",
          note: "Half-day discovery workshop, then 90 days on your estate with no licence cost.",
        }}
        tertiary={{ label: "Compare the four editions", href: "/editions", note: "quotas, SLAs and prices side by side" }}
      />
    </InnerPage>
  );
}
