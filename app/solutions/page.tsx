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
    "Outcome-focused solutions for unified inventory, governed provisioning, bundled observability, cloud migration, security & compliance, and sovereign cloud.",
};

export default function SolutionsPage() {
  const solutions = getSolutions();
  const [featured, ...rest] = solutions;

  return (
    <>
      {/* ── Editorial intro split ── */}
      <section className="bg-canvas py-20 sm:py-28">
        <Container>
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <Reveal>
              <div className="max-w-2xl">
                <div className="mb-5 flex items-center gap-3">
                  <span aria-hidden className="h-px w-8 bg-accent/50" />
                  <span className="eyebrow text-accent">Solutions</span>
                </div>
                <h1 className="display-1 text-ink">
                  Cloud challenges,{" "}
                  <span className="text-accent">solved.</span>
                </h1>
                <p className="mt-6 text-lg leading-relaxed text-muted">
                  Six outcome-focused solutions — unified inventory, governed
                  provisioning, bundled observability, cloud migration,
                  security &amp; compliance and sovereign cloud — each with a
                  real reference architecture, across every deployment model.
                </p>
              </div>
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
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {/* Featured: brand statement card, same footprint as its siblings so the 3×2 grid stays clean */}
            {featured && (
              <Reveal>
                <Link
                  href={`/solutions/${featured.slug}`}
                  className="group/card block h-full"
                >
                  <Card
                    interactive
                    className="flex h-full flex-col border-transparent bg-primary text-primary-fg"
                  >
                    <div className="flex items-center justify-between">
                      <span className="grid h-11 w-11 place-items-center rounded-lg bg-white/15 text-primary-fg ring-1 ring-inset ring-white/20">
                        <Icon name={featured.icon} className="h-5 w-5" />
                      </span>
                      <span className="text-sm font-bold text-primary-fg/70 num">
                        01
                      </span>
                    </div>
                    <h2 className="mt-5 text-lg font-bold text-primary-fg">
                      {featured.name}
                    </h2>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-primary-fg/80">
                      {featured.summary}
                    </p>
                    <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-primary-fg">
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
                      <span className="text-sm font-bold text-faint num">
                        {String(i + 2).padStart(2, "0")}
                      </span>
                    </div>
                    <h3 className="mt-5 text-lg font-bold text-ink">
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
