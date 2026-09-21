import { InnerPage, IntroPanel, IntroPanelLink } from "@/components/layout/InnerPage";
import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { ResourceLibrary } from "@/components/sections/ResourceLibrary";
import { ClosingCTA } from "@/components/sections/ClosingCTA";

export const metadata: Metadata = {
  title: "Resources",
  description:
    "Whitepapers, case studies, webinars and expert insights on cloud management, FinOps and enterprise cloud strategy.",
};

export default function ResourcesPage() {
  return (
    <InnerPage category="resources" current="/resources">
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
                  Datasheets, briefs, whitepapers and case studies — read online or download.
                </h1>
                <p className="mt-6 text-lg leading-relaxed text-muted">
                  The documents a procurement or architecture review asks for: a datasheet per edition, a brief per
                  solution and per industry, the platform overview and capability guide, four case studies, the trust
                  summary and the company profile. Every one is written from the same content as the product pages,
                  readable here and downloadable as a PDF — no form, no email required.
                </p>
              </div>
            </Reveal>
            <Reveal delay={90}>
              <IntroPanel eyebrow="The essential reading" dark>
                <IntroPanelLink index="01" title="The platform overview" description="The architecture, capabilities and deployment models." href="/resources/platform-overview" />
                <IntroPanelLink index="02" title="The capability guide" description="Explore the families inside the control plane." href="/resources/capability-guide" />
                <IntroPanelLink index="03" title="Trust & compliance" description="Security posture and the supporting evidence." href="/resources/trust-and-compliance-summary" />
                <p className="mt-3 text-xs leading-relaxed text-white/60">Read online or download. No form required.</p>
              </IntroPanel>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* ── Library: filterable grid ── */}
      <section id="library" className="bg-sunken py-20 sm:py-24">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="Library"
              title="Browse the collection"
              description="Filter by type. Each document opens as a reading page with a table of contents; the PDF is the same content laid out for print, A4, with page numbers."
            />
          </Reveal>
          <div className="mt-12">
            <ResourceLibrary />
          </div>
        </Container>
      </section>

      <ClosingCTA
        eyebrow="Something specific?"
        title="Need a document written for your estate or your regulator?"
        body="We prepare custom control mappings for a named regime, sector sheets for industries not listed here, and datasheets sized to an estate — usually within a week, before any commercial conversation."
        primary={{ label: "Request a custom document", href: "/contact?intent=resource", note: "Name the regime, sector or estate; a solutions engineer writes it" }}
        secondary={{ label: "Book a working session", href: "/contact?intent=demo", note: "45 minutes · one of your accounts connected read-only" }}
        tertiary={{ label: "Trust Center", href: "/trust", note: "signed certificates to download" }}
      />
    </InnerPage>
  );
}
