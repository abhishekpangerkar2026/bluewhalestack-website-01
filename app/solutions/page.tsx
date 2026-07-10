import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { getSolutions } from "@/lib/content";

export const metadata: Metadata = {
  title: "Solutions",
  description:
    "Outcome-focused solutions for cloud migration, FinOps, security, automation, data center management, and sovereign cloud.",
};

export default function SolutionsPage() {
  const solutions = getSolutions();
  const [featured, ...rest] = solutions;

  return (
    <>
      {/* ── Editorial intro split ── */}
      <section className="bg-canvas py-24 sm:py-32">
        <Container>
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <Reveal>
              <SectionHeading
                eyebrow="Solutions"
                title={
                  <>
                    Cloud challenges,{" "}
                    <span className="text-accent">solved.</span>
                  </>
                }
                description="Outcome-focused solutions for migration, cost optimization, security governance, and automated operations — each with a real reference architecture, across every deployment model."
              />
            </Reveal>
            <Reveal delay={80}>
              <Button href="/contact" variant="secondary" className="shrink-0">
                Talk to an architect
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* ── Featured-first + asymmetric grid on tinted band ── */}
      <section className="border-y border-line bg-sunken py-20 sm:py-24">
        <Container>
          <div className="grid gap-5 lg:grid-cols-3">
            {/* Featured: spans two columns, brand statement card */}
            {featured && (
              <Reveal className="lg:col-span-2">
                <Link
                  href={`/solutions/${featured.slug}`}
                  className="group/card block h-full"
                >
                  <Card
                    interactive
                    className="flex h-full flex-col justify-between gap-10 border-transparent bg-primary text-primary-fg sm:p-10"
                  >
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="grid h-12 w-12 place-items-center rounded-lg bg-white/15 text-primary-fg ring-1 ring-inset ring-white/20">
                          <Icon name={featured.icon} className="h-6 w-6" />
                        </span>
                        <span className="font-display text-sm font-bold text-primary-fg/70 num">
                          01
                        </span>
                      </div>
                      <h2 className="mt-7 max-w-xl font-display text-3xl font-bold leading-[1.05] tracking-tight text-primary-fg sm:text-4xl">
                        {featured.name}
                      </h2>
                      <p className="mt-4 max-w-xl text-base leading-relaxed text-primary-fg/80">
                        {featured.summary}
                      </p>
                    </div>
                    <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary-fg">
                      View architecture
                      <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover/card:translate-x-1" />
                    </span>
                  </Card>
                </Link>
              </Reveal>
            )}

            {/* Remaining solutions */}
            {rest.map((s, i) => (
              <Reveal key={s.slug} delay={(i % 3) * 80}>
                <Link href={`/solutions/${s.slug}`} className="group/card block h-full">
                  <Card interactive className="flex h-full flex-col">
                    <div className="flex items-center justify-between">
                      <span className="grid h-11 w-11 place-items-center rounded-lg bg-primary text-primary-fg">
                        <Icon name={s.icon} className="h-5 w-5" />
                      </span>
                      <span className="font-display text-sm font-bold text-faint num">
                        {String(i + 2).padStart(2, "0")}
                      </span>
                    </div>
                    <h3 className="mt-5 font-display text-lg font-bold text-ink">
                      {s.name}
                    </h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
                      {s.summary}
                    </p>
                    <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-accent">
                      View architecture
                      <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover/card:translate-x-0.5" />
                    </span>
                  </Card>
                </Link>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
