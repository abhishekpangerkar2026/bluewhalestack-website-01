import { InnerPage, IntroPanel, IntroPanelStat } from "@/components/layout/InnerPage";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { ArchitectureDiagram } from "@/components/diagrams/ArchitectureDiagram";
import { IndustryVisual } from "@/components/diagrams/IndustryVisual";
import { ClosingCTA } from "@/components/sections/ClosingCTA";
import { POSTER_GALLERY } from "@/content/industryPosters";
import { getIndustries, getEdition } from "@/lib/content";

export const metadata: Metadata = {
  title: "Industries",
  description:
    "Purpose-built cloud management for Government, BFSI, Healthcare, Regulated Enterprise, SaaS & Digital Native, Telco & MSP, and Datacenter & Colocation.",
};

export default function IndustriesPage() {
  const industries = getIndustries();
  const [featured, ...rest] = industries;

  return (
    <InnerPage category="solutions" current="/industries">
      {/* ── Intro: editorial split, big statement left / count right ── */}
      <section className="bg-canvas py-20 sm:py-28">
        <Container>
          <div className="grid gap-x-16 gap-y-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
            <Reveal>
              <div className="max-w-2xl">
                <div className="mb-6 flex items-center gap-3">
                  <span className="grid h-11 w-11 place-items-center rounded-lg bg-primary text-primary-fg shadow-sm">
                    <Icon name="Landmark" className="h-5 w-5" />
                  </span>
                  <span className="eyebrow text-accent">Industry solutions</span>
                  <span aria-hidden className="h-px w-8 bg-accent/50" />
                  <span className="text-xs font-semibold text-faint">Seven sectors · one control plane</span>
                </div>
                <h1 className="display-1 text-ink">
                  Seven sectors, and the regimes each one answers to.
                </h1>
                <p className="mt-6 text-lg leading-relaxed text-muted">
                  Every industry page names the regulators and frameworks that sector actually faces — RBI and
                  CERT-In, DPDP and GDPR, accreditation and air-gap mandates, carrier SLAs — and the platform control
                  that answers each. Standard, Enterprise and Government editions are generally available today; the
                  Telco &amp; Datacenter Edition is in preview ahead of GA in Q4 2026.
                </p>
              </div>
            </Reveal>
            <Reveal delay={90}>
              <IntroPanel eyebrow="Industry-specific. Platform-wide." dark>
                <IntroPanelStat value={String(industries.length).padStart(2, "0")} label="SECTORS SERVED" detail="Every estate brings its own regulatory reality." />
                <div className="flex flex-wrap gap-2 border-t border-white/15 pt-5">
                  {industries.map((industry) => <Link key={industry.slug} href={`/industries/${industry.slug}`} className="rounded-full border border-white/20 px-3 py-2 text-xs text-white/75 transition-colors hover:border-white/50 hover:text-white">{industry.name}</Link>)}
                </div>
              </IntroPanel>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* ── Cross-industry reference architecture ── */}
      <section className="border-t border-line bg-sunken py-20 sm:py-28">
        <Container>
          {featured && (
            <Reveal>
              <Link
                href={`/industries/${featured.slug}`}
                className="group block"
              >
                <div className="relative grid gap-8 overflow-hidden rounded-lg border border-line bg-surface p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-line-strong hover:shadow-md sm:p-10 lg:grid-cols-[1fr_1fr] lg:items-center">
                  <span
                    aria-hidden
                    className="absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-primary transition-transform duration-300 group-hover:scale-x-100"
                  />
                  <div>
                    <div className="flex items-center gap-3">
                      <span className="grid h-12 w-12 place-items-center rounded-lg bg-primary text-primary-fg">
                        <Icon name={featured.icon} className="h-6 w-6" />
                      </span>
                      <span className="eyebrow text-accent">
                        Featured sector
                      </span>
                    </div>
                    <h3 className="mt-6 text-3xl font-bold tracking-tight text-ink">
                      {featured.name}
                    </h3>
                    <p className="mt-2 text-lg font-semibold text-accent">
                      {featured.title}
                    </p>
                    <p className="mt-4 max-w-xl leading-relaxed text-muted">
                      {featured.description}
                    </p>
                    <div className="mt-5 flex flex-wrap gap-2">
                      {featured.compliance.map((c) => (
                        <span
                          key={c}
                          className="rounded-full border border-line bg-sunken px-3 py-1 text-sm font-medium text-muted"
                        >
                          {c}
                        </span>
                      ))}
                    </div>
                    <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-accent">
                      Explore {featured.name}
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                  <IndustryVisual industry={featured} />
                </div>
              </Link>
            </Reveal>
          )}

          <div className="mt-6 grid gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
            {rest.map((i, idx) => {
              const edition = getEdition(i.edition);
              return (
              <Reveal key={i.slug} delay={(idx % 3) * 70}>
                <Link
                  href={`/industries/${i.slug}`}
                  className="group flex h-full flex-col bg-surface p-7 transition-colors hover:bg-sunken"
                >
                  <div className="flex items-center justify-between">
                    <span className="grid h-11 w-11 place-items-center rounded-lg bg-brand-50 text-accent transition-colors group-hover:bg-primary group-hover:text-primary-fg">
                      <Icon name={i.icon} className="h-5 w-5" />
                    </span>
                    <span className="text-sm font-bold text-faint num">
                      {String(idx + 2).padStart(2, "0")}
                    </span>
                  </div>
                  <h3 className="mt-5 text-lg font-bold text-ink">
                    {i.name}
                  </h3>
                  <p className="mt-1 text-sm font-semibold text-accent">
                    {i.title}
                  </p>
                  {edition?.comingSoon && (
                    <span className="mt-2 inline-flex w-fit items-center rounded-full bg-[var(--warning-bg)] px-2.5 py-0.5 text-xs font-semibold text-[var(--warning-fg)]">
                      {edition.name} Edition preview
                      {edition.gaTarget ? ` · GA ${edition.gaTarget}` : ""}
                    </span>
                  )}
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">
                    {i.description}
                  </p>
                  <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-accent">
                    Learn more
                    <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </Link>
              </Reveal>
              );
            })}
          </div>
        </Container>
      </section>

      <section className="border-t border-line bg-canvas py-20 sm:py-28">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="Reference architecture"
              title="One control plane. Every industry."
              description="Seven sectors, seven different regulatory realities — solved by the same shared control plane, and delivered back out as a compliant, audited, in-region outcome for each one."
            />
          </Reveal>
          <Reveal delay={100}>
            <div className="mt-12">
              <ArchitectureDiagram id="industries-overview" />
            </div>
          </Reveal>
        </Container>
      </section>

      {/* ── Sector architecture sheets ── */}
      <section className="border-t border-line bg-canvas py-20 sm:py-28">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="Sector architecture sheets"
              title="Five sectors, drawn on the same seven layers."
              description="Each sheet is the same platform read for one sector: the consoles its people use, the Digital Experience Layer, the nine-module core with the modules that lead marked in gold, the systems it plugs into, the estates it governs, the seven-step request flow, and the deployment modes that fit. Open one to read every label full screen."
            />
          </Reveal>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {POSTER_GALLERY.map(({ poster, href, sector }, i) => (
              <Reveal key={poster.file} delay={(i % 3) * 80}>
                <Link
                  href={href}
                  className="group flex h-full flex-col overflow-hidden rounded-lg border border-line bg-surface shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-line-strong hover:shadow-md"
                >
                  <div className="bg-[#101114] p-7">
                    <div className="flex items-center justify-between border-b border-white/15 pb-4">
                      <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-white/55">Reference architecture</p>
                      <span className="font-mono text-[10px] text-white/40">0{i + 1}</span>
                    </div>
                    <p className="mt-6 text-2xl font-medium tracking-tight text-white">{sector}</p>
                    <div className="mt-6 flex flex-col gap-2">
                      {poster.estates.map((estate) => <span key={estate} className="flex items-center gap-2 border border-white/15 bg-white/[0.04] px-3 py-2 text-[11px] text-white/75"><span aria-hidden className="h-1 w-1 bg-[#89a9ff]" />{estate}</span>)}
                    </div>
                    <div aria-hidden className="mx-auto h-5 w-px bg-white/20" />
                    <p className="border border-[#6286ff]/40 bg-[#2458f5]/20 py-2.5 text-center text-[10px] font-semibold uppercase tracking-widest text-[#bed0ff]">One control plane</p>
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <p className="eyebrow text-accent">{sector}</p>
                    <h3 className="mt-2 text-lg font-bold leading-snug text-ink">{poster.subtitle}</h3>
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {poster.modules.map((m) => (
                        <span key={m} className="rounded-full border border-[#e2c57c] bg-[#fdf6e3] px-2 py-0.5 text-[11px] font-semibold text-[#7a5a12]">
                          {m}
                        </span>
                      ))}
                    </div>
                    <span className="mt-auto inline-flex items-center gap-1.5 pt-5 text-sm font-semibold text-accent transition-all group-hover:gap-2.5">
                      Open the sheet <ArrowRight className="h-3.5 w-3.5" />
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
            <Reveal delay={160}>
              <div className="flex h-full flex-col justify-between rounded-lg border border-dashed border-line-strong bg-sunken p-6">
                <div>
                  <p className="eyebrow text-faint">Your sector</p>
                  <h3 className="mt-2 text-lg font-bold leading-snug text-ink">Healthcare, SaaS, manufacturing, utilities — the sheet is drawn per engagement.</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted">
                    Tell us the regulators and frameworks you answer to and the estates you run. We return the same seven-layer sheet for your sector with the control mapping alongside it, before any commercial conversation.
                  </p>
                </div>
                <Link
                  href="/contact?intent=resource"
                  className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-accent hover:gap-2.5"
                >
                  Request your sector sheet <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* ── Featured industry + asymmetric grid ── */}


      <ClosingCTA
        eyebrow="Don't see your sector?"
        title="Every sector runs the same control plane; the regime mapping is what changes."
        body="Manufacturing, utilities, education, media — tell us the regulators and frameworks you answer to and we come back with the control mapping and the edition that fits, before any commercial conversation."
        primary={{
          label: "Request a control mapping for your sector",
          href: "/contact?intent=resource",
          note: "Name your regimes; we map each obligation to a platform control",
        }}
        secondary={{
          label: "Book a working session",
          href: "/contact?intent=demo",
          note: "45 minutes · one of your accounts connected read-only",
        }}
        tertiary={{ label: "Read the case studies", href: "/case-studies", note: "banking, government, operators, media" }}
      />
    </InnerPage>
  );
}
