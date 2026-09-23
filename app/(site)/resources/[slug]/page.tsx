import { InnerPage } from "@/components/layout/InnerPage";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight, Download, Clock, FileText } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { PhotoHero } from "@/components/sections/PhotoHero";
import type { PhotoKey } from "@/content/photos";

/** a studio photograph per document type */
const DOC_PHOTO: Record<string, PhotoKey> = {
  Whitepaper: "editions-rack",
  Datasheet: "estates-row",
  "Solution brief": "hybrid-bridge",
  "Industry brief": "enterprise-campus",
  "Case study": "discovery-lens",
  Company: "sovereign-regions",
};
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Reveal } from "@/components/ui/Reveal";
import { DocumentView, sectionHeading, sectionId } from "@/components/documents/DocumentView";
import { ClosingCTA } from "@/components/sections/ClosingCTA";
import { documents as staticDocuments } from "@/content/documents";
import { getDocument, getDocuments } from "@/lib/content";

export function generateStaticParams() {
  return staticDocuments.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const d = await getDocument(slug);
  if (!d) return {};
  return { title: `${d.title} — ${d.type}`, description: d.summary };
}

export default async function ResourceDocumentPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [doc, documents] = await Promise.all([getDocument(slug), getDocuments()]);
  if (!doc) notFound();
  const toc = doc.sections.map((s, i) => ({ id: sectionId(i), label: sectionHeading(s) })).filter((t): t is { id: string; label: string } => Boolean(t.label));
  const siblings = documents.filter((d) => d.type === doc.type && d.slug !== doc.slug).slice(0, 3);
  const pdf = `/docs/${doc.slug}.pdf`;

  return (
    <InnerPage category="resources" current="/resources" document>
      {/* ── Hero ── */}
      <PhotoHero
        photo={DOC_PHOTO[doc.type] ?? "editions-rack"}
        minHeight="lg:min-h-[560px]"
        above={
          <div className="mb-8">
            <Breadcrumbs items={[{ label: "Resources", href: "/resources" }, { label: doc.type, href: "/resources" }, { label: doc.title }]} />
            <div className="mt-8 flex flex-wrap items-center gap-2">
              <Badge tone="brand">{doc.type}</Badge>
              <Badge tone="neutral">{doc.topic}</Badge>
            </div>
          </div>
        }
        title={doc.title}
        description={doc.subtitle}
      >
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-faint">
          <span className="inline-flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" /> {doc.meta}</span>
          <span>Updated {doc.updated} · v{doc.version}</span>
        </div>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <div>
            <Button href={pdf} size="lg" external>
              <Download className="h-4 w-4" />
              Download the PDF
            </Button>
            <p className="mt-2 text-xs text-faint">A4 · no form, no email required</p>
          </div>
          <Button href="/contact?intent=demo" size="lg" variant="outline">
            Talk to us about it
          </Button>
        </div>
      </PhotoHero>

      <section className="bg-canvas py-16 sm:py-20">
        <Container>
          <div className="grid gap-x-16 gap-y-12 lg:grid-cols-[minmax(0,1fr)_260px]">
            <article className="min-w-0 max-w-3xl">
              <DocumentView doc={doc} />
            </article>
            <aside className="lg:sticky lg:top-28 lg:self-start">
              {toc.length > 0 && (
                <div className="rounded-lg border border-line bg-surface p-5 shadow-sm">
                  <p className="eyebrow">In this document</p>
                  <ol className="mt-3 space-y-1.5">
                    {toc.map((t, i) => (
                      <li key={t.id}>
                        <a href={`#${t.id}`} className="flex gap-2 text-sm text-muted hover:text-accent">
                          <span className="num shrink-0 text-faint">{String(i + 1).padStart(2, "0")}</span>
                          <span>{t.label}</span>
                        </a>
                      </li>
                    ))}
                  </ol>
                </div>
              )}
              <div className="mt-5 rounded-lg border border-line bg-surface p-5 shadow-sm">
                <p className="eyebrow">Related</p>
                <ul className="mt-3 space-y-2">
                  {doc.related.map((r) => (
                    <li key={r.href}>
                      <Link href={r.href} className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink hover:text-accent">
                        {r.label} <ArrowRight className="h-3.5 w-3.5 text-accent" />
                      </Link>
                    </li>
                  ))}
                </ul>
                {siblings.length > 0 && (
                  <>
                    <p className="eyebrow mt-6 ">More {doc.type.toLowerCase()}s</p>
                    <ul className="mt-3 space-y-2">
                      {siblings.map((d) => (
                        <li key={d.slug}>
                          <Link href={`/resources/${d.slug}`} className="inline-flex items-start gap-1.5 text-sm text-muted hover:text-accent">
                            <FileText className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent" />
                            <span>{d.title}</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </>
                )}
              </div>
            </aside>
          </div>
        </Container>
      </section>

      <ClosingCTA
        eyebrow="Next step"
        title="Take this from paper to your own estate."
        body="A 45-minute working session with a solutions engineer: one of your accounts connected read-only, the parts of this document that matter to you shown on your real resources."
        primary={{ label: "Book a working session", href: "/contact?intent=demo", note: "45 minutes · read-only credentials · nothing installed on your side" }}
        secondary={{ label: "Request a custom document", href: "/contact?intent=resource", note: "A control mapping for your regimes, or a datasheet for your estate — usually within a week." }}
        tertiary={{ label: "All documents", href: "/resources", note: `${documents.length} in the library` }}
      />
    </InnerPage>
  );
}
