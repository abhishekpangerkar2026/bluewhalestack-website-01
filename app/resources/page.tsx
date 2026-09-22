import { InnerPage } from "@/components/layout/InnerPage";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Download } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { CmsPhotoHero } from "@/components/sections/CmsPhotoHero";
import { getCollateral } from "@/lib/content";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { ResourceLibrary } from "@/components/sections/ResourceLibrary";
import { ClosingCTA } from "@/components/sections/ClosingCTA";

export const metadata: Metadata = {
  title: "Resources",
  description:
    "Whitepapers, case studies, webinars and expert insights on cloud management, FinOps and enterprise cloud strategy.",
};

export default async function ResourcesPage() {
  const collateral = await getCollateral();
  return (
    <InnerPage category="resources" current="/resources">
      {/* ── Hero ── */}
      <CmsPhotoHero
        route="/resources"
        photo="discovery-lens"
        eyebrow="Resources"
        title="Datasheets, briefs, whitepapers and case studies — read online or download."
        description="The documents a procurement or architecture review asks for: the official collateral kit as finished PDFs, plus a datasheet per edition, a brief per solution and per industry, four case studies and the company profile as reading pages. No form, no email required."
      >
        <div className="flex flex-wrap gap-2">
          {[
            { label: "The platform overview", href: "/resources/platform-overview" },
            { label: "The capability guide", href: "/resources/capability-guide" },
            { label: "Trust & compliance", href: "/resources/trust-and-compliance-summary" },
            { label: "Official collateral (PDF)", href: "#collateral" },
          ].map((l) => (
            <Link key={l.href} href={l.href} className="inline-flex items-center gap-1.5 rounded-full border border-line bg-white px-3.5 py-2 text-xs font-semibold text-muted shadow-sm transition-colors hover:border-accent hover:text-accent">
              {l.label} <ArrowUpRight className="h-3 w-3" />
            </Link>
          ))}
        </div>
      </CmsPhotoHero>

      {/* ── Official collateral: the finished PDFs ── */}
      <section id="collateral" className="scroll-mt-20 border-b border-line bg-canvas py-20 sm:py-24">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="Official collateral"
              title="The documents we hand to prospects — as finished PDFs"
              description="The Product Overview with the 3D architecture view, the Company Profile, the Mastering Multi-Cloud whitepaper, and a datasheet and whitepaper for each edition. Direct downloads, no form."
            />
          </Reveal>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {collateral.map((d, i) => (
              <Reveal key={d.file} delay={(i % 3) * 60}>
                <a href={d.url} target="_blank" rel="noopener" className="card-lift group flex h-full flex-col rounded-xl border border-line bg-surface p-6 shadow-sm">
                  <div className="flex items-center justify-between">
                    <span className="rounded-full border border-line bg-sunken px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-muted">{d.kind}</span>
                    <span className="text-xs text-faint">PDF · {d.size}</span>
                  </div>
                  <h3 className="mt-4 text-[15px] font-bold leading-snug text-ink">{d.title}</h3>
                  <p className="mt-2 flex-1 text-[13px] leading-relaxed text-muted">{d.blurb}</p>
                  <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-accent"><Download className="h-3.5 w-3.5" /> Download</span>
                </a>
              </Reveal>
            ))}
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
