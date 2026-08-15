import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { ArchitectureDiagram } from "@/components/diagrams/ArchitectureDiagram";
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
    <>
      {/* ── Intro: editorial split, big statement left / count right ── */}
      <section className="bg-canvas py-20 sm:py-28">
        <Container>
          <div className="grid gap-x-16 gap-y-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
            <Reveal>
              <SectionHeading
                eyebrow="Industry solutions"
                title={
                  <>
                    Purpose-built for{" "}
                    <span className="text-accent">your sector.</span>
                  </>
                }
                description="BlueWhale Stack adapts to the governance, regulatory, and commercial realities of every industry — the same platform, shaped to how each one runs. Standard, Enterprise and Government editions are generally available today; Telco and Datacenter editions are in preview ahead of GA in Q4 2026."
              />
            </Reveal>
            <Reveal delay={90}>
              <div className="lg:text-right">
                <span className="block text-6xl font-bold tracking-tight text-faint num sm:text-7xl">
                  {String(industries.length).padStart(2, "0")}
                </span>
                <p className="mt-1 text-sm font-semibold uppercase tracking-[0.18em] text-faint">
                  Sectors served
                </p>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* ── Cross-industry reference architecture ── */}
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

      {/* ── Featured industry + asymmetric grid ── */}
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
                      <span className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
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
                    <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-accent">
                      Explore {featured.name}
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2 lg:justify-end">
                    {featured.compliance.map((c) => (
                      <span
                        key={c}
                        className="rounded-full border border-line bg-sunken px-3 py-1 text-sm font-medium text-muted"
                      >
                        {c}
                      </span>
                    ))}
                  </div>
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
                    <span className="mt-2 inline-flex w-fit items-center rounded-full border border-amber-300 bg-amber-50 px-2.5 py-0.5 text-xs font-semibold text-amber-700">
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

      {/* ── Closing statement band ── */}
      <section className="relative overflow-hidden bg-brand-900 py-20 sm:py-24">
        <Container className="relative">
          <Reveal>
            <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-2xl">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-200">
                  Don&apos;t see your sector?
                </p>
                <h2 className="mt-5 text-3xl font-bold leading-[1.05] tracking-tight text-white sm:text-4xl">
                  The platform is neutral. The{" "}
                  <span className="text-brand-100">configuration is yours.</span>
                </h2>
                <p className="mt-5 text-lg leading-relaxed text-white/70">
                  Every industry runs the same control plane — we shape governance,
                  compliance, and deployment to your regulatory reality.
                </p>
              </div>
              <Button href="/contact" size="lg" variant="white" className="shrink-0">
                Talk to us
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
