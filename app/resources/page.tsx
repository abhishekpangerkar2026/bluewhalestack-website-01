import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Iso } from "@/components/illustrations/Iso";
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
          <div className="grid gap-x-16 gap-y-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
            <Reveal>
              <div className="max-w-2xl">
                <div className="mb-5 flex items-center gap-3">
                  <span aria-hidden className="h-px w-8 bg-accent/50" />
                  <span className="eyebrow text-accent">
                    Resources
                  </span>
                </div>
                <h1 className="display-1 text-ink">
                  Datasheets, solution briefs and the company profile.
                </h1>
                <p className="mt-6 text-lg leading-relaxed text-muted">
                  The documents a procurement or architecture review asks for — edition datasheets, the technical
                  capability list with edition mapping, industry solution briefs and the company profile. Request one
                  and it is sent by email, usually the same working day.
                </p>
              </div>
            </Reveal>
            <Reveal delay={90}>
              <div className="mx-auto w-full max-w-[380px]">
                <Iso name="data" title="Whitepapers, datasheets and insights" />
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* ── Library: filterable grid ── */}
      <section className="bg-sunken py-20 sm:py-24">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="Library"
              title="Browse the collection"
              description="Filter by type. Every item is a real document from the product or company pack; request it and we send it directly."
            />
          </Reveal>
          <div className="mt-12">
            <ResourceLibrary />
          </div>
        </Container>
      </section>
    </>
  );
}
