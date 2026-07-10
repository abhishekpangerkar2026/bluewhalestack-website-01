import Link from "next/link";
import { ArrowRight, ArrowUpRight, Check } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Stat } from "@/components/ui/Stat";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { Hero } from "@/components/sections/Hero";
import { QuickLinks } from "@/components/sections/QuickLinks";
import { ProductCatalog } from "@/components/sections/ProductCatalog";
import { GlobalInfra } from "@/components/sections/GlobalInfra";
import { CustomerStories } from "@/components/sections/CustomerStories";
import { problems, promise, whyBluewhale, howItWorks } from "@/content/home";
import { headlineStats } from "@/content/company";
import { CloudLogo, cloudLogoNames } from "@/components/brand/CloudLogos";
import { getEditions, getIndustries, getSolutions } from "@/lib/content";

export default function HomePage() {
  const editions = getEditions();
  const industries = getIndustries();
  const solutions = getSolutions();
  const marquee = [...cloudLogoNames, ...cloudLogoNames];

  return (
    <>
      <Hero />
      <QuickLinks />

      {/* Cloud marquee */}
      <section className="border-b border-line bg-surface py-10">
        <Container>
          <p className="text-center text-xs font-semibold uppercase tracking-[0.14em] text-faint">
            One control plane for every major cloud, hypervisor &amp; private platform
          </p>
        </Container>
        <div className="relative mt-7 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
          <div className="flex w-max animate-marquee items-center gap-14 pr-14">
            {marquee.map((c, i) => (
              <CloudLogo key={`${c}-${i}`} name={c} className="shrink-0" />
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
              description="Most teams run several clouds, hypervisors, and a data-center floor through a dozen disconnected consoles — with no single map, no shared governance, and no clear ownership."
            />
          </Reveal>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {problems.map((p, i) => (
              <Reveal key={p.title} delay={i * 80}>
                <Card className="h-full">
                  <div className="grid h-11 w-11 place-items-center rounded-md bg-[var(--bg-active)] text-accent">
                    <Icon name={p.icon} className="h-5 w-5" />
                  </div>
                  <h3 className="mt-4 text-lg font-bold text-ink">{p.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{p.body}</p>
                </Card>
              </Reveal>
            ))}
          </div>
          <Reveal delay={120}>
            <div className="mt-8 rounded-xl border border-line bg-sunken p-8 text-center">
              <h3 className="text-2xl font-bold text-ink">{promise.title}</h3>
              <p className="mx-auto mt-3 max-w-2xl text-muted">{promise.body}</p>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* Solutions */}
      <section className="border-y border-line bg-surface py-20 sm:py-24">
        <Container>
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <Reveal>
              <SectionHeading
                eyebrow="Solutions"
                title="Solve your toughest cloud challenges"
                description="Outcome-focused, each with a real reference architecture — migration, cost, security, operations, and sovereignty."
              />
            </Reveal>
            <Reveal delay={80}>
              <Button href="/solutions" variant="outline" className="shrink-0">
                All solutions
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Reveal>
          </div>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {solutions.map((s, i) => (
              <Reveal key={s.slug} delay={(i % 3) * 80}>
                <Link href={`/solutions/${s.slug}`} className="block h-full">
                  <Card interactive className="flex h-full flex-col">
                    <div className="grid h-11 w-11 place-items-center rounded-md bg-primary text-primary-fg">
                      <Icon name={s.icon} className="h-5 w-5" />
                    </div>
                    <h3 className="mt-4 text-lg font-bold text-ink">{s.name}</h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
                      {s.summary}
                    </p>
                    <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-accent">
                      View architecture <ArrowRight className="h-3.5 w-3.5" />
                    </span>
                  </Card>
                </Link>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Platform module catalog (tabbed) */}
      <ProductCatalog />

      {/* Why BlueWhale */}
      <section className="border-y border-line bg-surface py-20 sm:py-24">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow={whyBluewhale.eyebrow}
              title={whyBluewhale.title}
              description={whyBluewhale.description}
            />
          </Reveal>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {whyBluewhale.pillars.map((p, i) => (
              <Reveal key={p.title} delay={(i % 4) * 70}>
                <Card className="h-full">
                  <span className="grid h-11 w-11 place-items-center rounded-md bg-[var(--bg-active)] text-accent">
                    <Icon name={p.icon} className="h-5 w-5" />
                  </span>
                  <h3 className="mt-4 text-lg font-bold text-ink">{p.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{p.body}</p>
                </Card>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Editions */}
      <section className="bg-canvas py-20 sm:py-24">
        <Container>
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <Reveal>
              <SectionHeading
                eyebrow="Editions"
                title="One platform. Five editions."
                description="From a free Community tier to a fully sovereign, air-gapped deployment — an edition shaped to how you operate."
              />
            </Reveal>
            <Reveal delay={80}>
              <Button href="/editions" variant="outline" className="shrink-0">
                Compare editions
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Reveal>
          </div>
          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-5">
            {editions.map((e, i) => (
              <Reveal key={e.slug} delay={(i % 5) * 60}>
                <Link href={`/editions/${e.slug}`} className="block h-full">
                  <Card
                    interactive
                    className={`flex h-full flex-col ${e.featured ? "ring-1 ring-[var(--border-accent)]" : ""}`}
                  >
                    {e.featured && (
                      <span className="mb-3 inline-flex w-fit rounded-full bg-primary px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-primary-fg">
                        Most popular
                      </span>
                    )}
                    <h3 className="text-lg font-bold text-ink">{e.name}</h3>
                    <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-accent">
                      {e.tagline}
                    </p>
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">
                      {e.headline}
                    </p>
                    <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-accent">
                      Learn more <ArrowRight className="h-3.5 w-3.5" />
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

      {/* Industries */}
      <section className="border-y border-line bg-surface py-20 sm:py-24">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="Industries"
              title="Purpose-built for regulated, multi-cloud operators"
              description="Government, telco, banking, healthcare, and large enterprise — with the governance and sovereignty each sector demands."
            />
          </Reveal>
          <Reveal delay={80}>
            <div className="mt-10 flex flex-wrap gap-3">
              {industries.map((i) => (
                <Link
                  key={i.slug}
                  href={`/industries/${i.slug}`}
                  className="group inline-flex items-center gap-2.5 rounded-md border border-line bg-surface px-4 py-3 text-sm font-semibold text-ink transition-all hover:-translate-y-0.5 hover:border-line-strong hover:text-accent"
                >
                  <Icon name={i.icon} className="h-4 w-4 text-accent" />
                  {i.name}
                  <ArrowUpRight className="h-3.5 w-3.5 text-faint transition-colors group-hover:text-accent" />
                </Link>
              ))}
            </div>
          </Reveal>
        </Container>
      </section>

      {/* How it works */}
      <section className="bg-canvas py-20 sm:py-24">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="How it works"
              title="From cloud chaos to control in four steps"
            />
          </Reveal>
          <div className="relative mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {howItWorks.map((s, i) => (
              <Reveal key={s.step} delay={i * 90}>
                <div className="border-t-2 border-ink pt-5">
                  <span className="num text-sm font-bold text-accent">
                    STEP {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-2 text-lg font-bold text-ink">{s.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{s.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Stats band */}
      <section className="bg-[var(--brand-deep)] py-16 text-white">
        <Container>
          <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
            {headlineStats.map((s, i) => (
              <Reveal key={s.label} delay={i * 70}>
                <Stat value={s.value} label={s.label} inverse />
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Customer stories */}
      <CustomerStories />
    </>
  );
}
