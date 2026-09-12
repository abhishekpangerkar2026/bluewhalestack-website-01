import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { Hero } from "@/components/sections/Hero";
import { QuickLinks } from "@/components/sections/QuickLinks";
import { ProductShowcase } from "@/components/sections/ProductShowcase";
import { MotionStrip } from "@/components/sections/MotionStrip";
import { GlobalInfra } from "@/components/sections/GlobalInfra";
import { CustomerStories } from "@/components/sections/CustomerStories";
import { PrototypeOffer } from "@/components/sections/PrototypeOffer";
import { ClosingCTA } from "@/components/sections/ClosingCTA";
import { Iso, EDITION_ISO } from "@/components/illustrations/Iso";
import { ProductScene } from "@/components/scenes/ProductScene";
import { proofStrip, problems, promise, whyBluewhale, howItWorks, paths } from "@/content/home";
import { CloudLogo, cloudLogoNames } from "@/components/brand/CloudLogos";
import { getEditions } from "@/lib/content";

export default function HomePage() {
  const editions = getEditions();
  const marquee = [...cloudLogoNames, ...cloudLogoNames];

  return (
    <>
      <Hero />
      <QuickLinks />

      {/* Proof strip — outcomes from delivered engagements, not catalog counts */}
      <section className="border-b border-line bg-canvas py-12">
        <Container>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <p className="eyebrow text-faint">From delivered engagements · anonymized under confidentiality</p>
            <Link href="/case-studies" className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent hover:gap-2.5">
              All case studies <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
          <div className="mt-6 grid gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
            {proofStrip.map((p, i) => (
              <Reveal key={p.href} delay={i * 60}>
                <Link href={p.href} className="group flex h-full flex-col bg-surface p-5 transition-colors hover:bg-sunken">
                  <span className="text-2xl font-bold tracking-tight text-ink">{p.value}</span>
                  <span className="mt-1 text-sm leading-snug text-muted">{p.label}</span>
                  <span className="mt-3 text-xs font-medium text-faint group-hover:text-accent">{p.source}</span>
                </Link>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Cloud marquee */}
      <section className="border-b border-line bg-surface py-10">
        <Container>
          <p className="text-center eyebrow text-faint">
            Six public clouds by API · VMware, Hyper-V, Nutanix, OpenShift and KVM by Edge Agent
          </p>
        </Container>
        <div className="group relative mt-7 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
          <div className="flex w-max animate-marquee items-center gap-14 pr-14 will-change-transform group-hover:[animation-play-state:paused]">
            {marquee.map((c, i) => (
              <CloudLogo
                key={`${c}-${i}`}
                name={c}
                className="shrink-0 opacity-80 transition-all duration-300 hover:scale-110 hover:opacity-100"
              />
            ))}
          </div>
        </div>
      </section>

      {/* Problem → Promise */}
      <section className="bg-canvas py-20 sm:py-24">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="The problem"
              title="Cloud got complex. Control didn't keep up."
              description="Most teams run several clouds, a hypervisor estate and a datacenter floor through a dozen disconnected consoles — and pay for four tools that never agree with each other."
            />
          </Reveal>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {problems.map((p, i) => (
              <Reveal key={p.title} delay={i * 80}>
                <Card className="flex h-full flex-col">
                  <div className="grid h-11 w-11 place-items-center rounded-md bg-[var(--bg-active)] text-accent">
                    <Icon name={p.icon} className="h-5 w-5" />
                  </div>
                  <h3 className="mt-4 text-lg font-bold text-ink">{p.title}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{p.body}</p>
                  <p className="mt-4 border-t border-line pt-3 text-sm font-medium text-ink">
                    <span className="text-faint">What it costs: </span>
                    {p.cost}
                  </p>
                </Card>
              </Reveal>
            ))}
          </div>
          <Reveal delay={120}>
            <div className="mt-8 grid items-center gap-8 rounded-xl border border-line bg-sunken p-6 sm:p-8 lg:grid-cols-[1.15fr_0.85fr]">
              <ProductScene scene="architecture" className="w-full" />
              <div>
                <h3 className="text-2xl font-bold text-ink">{promise.title}</h3>
                <p className="mt-3 max-w-2xl text-muted">{promise.body}</p>
                <Link href="/platform" className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-accent hover:gap-2.5">
                  How the platform is put together <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* See the product */}
      <section className="border-y border-line bg-surface py-20 sm:py-24">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="See the product"
              title="The console, by job"
              description="Cost, inventory and security posture — three of the screens teams live in. Every module page shows its own."
            />
          </Reveal>
          <Reveal delay={100}>
            <div className="mt-12">
              <ProductShowcase />
            </div>
          </Reveal>
        </Container>
      </section>

      {/* The platform in motion — short films of the 3D scenes */}
      <MotionStrip />

      {/* How it works */}
      <section className="bg-canvas py-20 sm:py-24">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="How it works"
              title="Connect, govern, provision, prove"
              description="Read-only credentials in, one system of record out. The mechanics — ports, permissions, timings — are the ones the docs describe."
            />
          </Reveal>
          <div className="relative mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {howItWorks.map((s, i) => (
              <Reveal key={s.step} delay={i * 90}>
                <div className="flex h-full flex-col border-t-2 border-ink pt-5">
                  <span className="num text-sm font-bold text-accent">STEP {String(i + 1).padStart(2, "0")}</span>
                  <h3 className="mt-2 text-lg font-bold text-ink">{s.title}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{s.body}</p>
                  <p className="mt-3 text-xs font-medium text-faint">{s.detail}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <div className="mt-10 flex flex-wrap gap-3">
            <Button href="/docs/quick-start" variant="outline">
              Read the quick start
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Button href="/docs/cloud-integration" variant="secondary">
              Connector permissions, per cloud
            </Button>
          </div>
        </Container>
      </section>

      {/* Why BlueWhale — numbered rows, not icon cards */}
      <section className="border-y border-line bg-sunken py-20 sm:py-24">
        <Container>
          <div className="grid gap-x-16 gap-y-10 lg:grid-cols-[0.8fr_1.2fr]">
            <Reveal>
              <div className="lg:sticky lg:top-28 lg:self-start">
                <SectionHeading
                  eyebrow={whyBluewhale.eyebrow}
                  title={whyBluewhale.title}
                  description={whyBluewhale.description}
                />
                <Button href="/platform" variant="outline" className="mt-8">
                  What the platform replaces
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </Reveal>
            <div className="flex flex-col">
              {whyBluewhale.pillars.map((p, i) => (
                <Reveal key={p.title} delay={i * 70}>
                  <div className="flex items-start gap-5 border-t border-line py-6 first:border-t-0 first:pt-0">
                    <span className="num pt-0.5 text-lg font-bold text-accent/60">{String(i + 1).padStart(2, "0")}</span>
                    <div>
                      <h3 className="text-lg font-bold text-ink">{p.title}</h3>
                      <p className="mt-2 leading-relaxed text-muted">{p.body}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Choose your path */}
      <section className="bg-canvas py-20 sm:py-24">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="Find your way in"
              title="Three ways to read the rest of the site"
              description="Start from the outcome you need, the regime you answer to, or the licence you would buy — every route ends at the same platform."
            />
          </Reveal>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {paths.map((p, i) => (
              <Reveal key={p.href} delay={i * 80}>
                <Link href={p.href} className="group block h-full">
                  <Card interactive className="flex h-full flex-col border-l-4 border-l-primary">
                    <div className="flex items-center gap-3">
                      <span className="grid h-10 w-10 place-items-center rounded-lg bg-primary text-primary-fg">
                        <Icon name={p.icon} className="h-5 w-5" />
                      </span>
                      <h3 className="text-lg font-bold text-ink">{p.title}</h3>
                    </div>
                    <p className="mt-4 flex-1 text-sm leading-relaxed text-muted">{p.body}</p>
                    <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-accent">
                      {p.label}
                      <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                    </span>
                  </Card>
                </Link>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Editions */}
      <section className="border-t border-line bg-surface py-20 sm:py-24">
        <Container>
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <Reveal>
              <SectionHeading
                eyebrow="Editions"
                title="Four editions, one architecture"
                description="Standard and Enterprise carry published prices; the operator and government editions are shaped to the estate. Moving up is a licence change on the same deployment."
              />
            </Reveal>
            <Reveal delay={80}>
              <Button href="/editions" variant="outline" className="shrink-0">
                Compare editions
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Reveal>
          </div>
          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {editions.map((e, i) => (
              <Reveal key={e.slug} delay={(i % 4) * 60}>
                <Link href={`/editions/${e.slug}`} className="block h-full">
                  <Card
                    interactive
                    className={`relative flex h-full flex-col ${e.featured ? "ring-1 ring-[var(--border-accent)]" : ""}`}
                  >
                    {e.featured && (
                      <span className="absolute right-4 top-4 inline-flex rounded-full bg-amber-400 px-2.5 py-0.5 text-xs font-bold uppercase tracking-wide text-brand-900">
                        Most deployed
                      </span>
                    )}
                    <Iso name={EDITION_ISO[e.slug]} className="mb-3 h-28 w-auto self-start" />
                    <h3 className="pr-16 text-lg font-bold leading-tight text-ink">{e.name}</h3>
                    <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-accent">{e.tagline}</p>
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">{e.audience}</p>
                    <p className="mt-3 text-sm font-bold text-ink">
                      {e.priceAnchor}
                      {e.comingSoon && <span className="ml-2 text-xs font-medium text-faint">preview · GA {e.gaTarget}</span>}
                    </p>
                    <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-accent">
                      Who it is for, and who it is not <ArrowRight className="h-3.5 w-3.5" />
                    </span>
                  </Card>
                </Link>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Global infrastructure */}
      <GlobalInfra />

      {/* BlueWhale Stack Fabric teaser */}
      <section className="relative overflow-hidden bg-brand-900 py-16 text-white sm:py-20">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-24 top-0 h-72 w-72 rounded-full bg-brand-500/30 blur-[110px]"
        />
        <Container className="relative">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <p className="eyebrow text-brand-200">BlueWhale Stack Fabric</p>
              <h2 className="mt-5 text-3xl font-bold leading-[1.05] tracking-tight sm:text-4xl">
                Every datacenter. <span className="text-brand-100">One fabric.</span>
              </h2>
              <p className="mt-5 max-w-xl text-lg leading-relaxed text-white/70">
                A market&apos;s datacenter capacity — every operator, every tier — unified on one platform and consumed as a
                single sovereign cloud: one catalog, one identity, one bill. Launching in India, built for every country.
              </p>
            </div>
            <Button href="/fabric" size="lg" variant="white" className="shrink-0">
              Explore the Fabric
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </Container>
      </section>

      {/* The 90-day prototype — the standing offer */}
      <PrototypeOffer />

      {/* Customer stories */}
      <CustomerStories />

      <ClosingCTA
        eyebrow="Next step"
        title="See the platform on one of your own accounts."
        body="A 45-minute working session with a solutions engineer: we connect one cloud account read-only, walk the inventory, cost and audit screens on your real resources, and leave you with the export. No slides."
        primary={{
          label: "Book a working session",
          href: "/contact?intent=demo",
          note: "45 minutes · read-only credentials · nothing installed on your side",
        }}
        secondary={{
          label: "Start the 90-day prototype",
          href: "/platform#prototype",
          note: "Half-day discovery workshop, then 90 days on your estate with no licence cost.",
        }}
        tertiary={{ label: "Published pricing", href: "/pricing", note: "Standard $24,000 · Enterprise $120,000 a year" }}
      />
    </>
  );
}
