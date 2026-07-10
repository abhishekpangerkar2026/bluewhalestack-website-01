import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { ResourceLibrary } from "@/components/sections/ResourceLibrary";

export const metadata: Metadata = {
  title: "Resources",
  description:
    "Whitepapers, case studies, webinars and expert insights on cloud management, FinOps and enterprise cloud strategy.",
};

export default function ResourcesPage() {
  return (
    <>
      {/* ── Hero: editorial split, oversized statement left ── */}
      <section className="border-b border-line bg-surface py-20 sm:py-28">
        <Container>
          <div className="grid gap-x-16 gap-y-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
            <Reveal>
              <div>
                <div className="mb-5 flex items-center gap-3">
                  <span className="text-sm font-bold tabular-nums text-accent">
                    00
                  </span>
                  <span aria-hidden className="h-px w-8 bg-accent/50" />
                  <span className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
                    Resources
                  </span>
                </div>
                <h1 className="text-[2.6rem] font-bold leading-[1.02] tracking-tight text-ink sm:text-6xl">
                  Cloud intelligence at your{" "}
                  <span className="text-accent">fingertips</span>.
                </h1>
              </div>
            </Reveal>
            <Reveal delay={90}>
              <p className="text-lg leading-relaxed text-muted lg:pb-2">
                Whitepapers, case studies, webinars and expert insights on cloud
                management, FinOps and enterprise cloud strategy.
              </p>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* ── Library: filterable grid ── */}
      <section className="bg-sunken py-20 sm:py-24">
        <Container>
          <Reveal>
            <SectionHeading eyebrow="Library" title="Browse the collection" />
          </Reveal>
          <div className="mt-12">
            <ResourceLibrary />
          </div>
        </Container>
      </section>
    </>
  );
}
