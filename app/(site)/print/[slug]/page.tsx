import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Logo } from "@/components/layout/Logo";
import { DocumentView } from "@/components/documents/DocumentView";
import { PrintChrome } from "../PrintChrome";
import { documents } from "@/content/documents";
import { getDocument, getSiteSettings } from "@/lib/content";
import { scenes } from "@/content/scenes.generated";

export const metadata: Metadata = { robots: { index: false, follow: false } };

export function generateStaticParams() {
  return documents.map((d) => ({ slug: d.slug }));
}

/**
 * Print layout for a document — what scripts/build-docs.mjs turns into the
 * PDF under public/docs. A4, a typographic cover (logo, title, tagline — no
 * imagery, matching the site), then the shared DocumentView in print mode.
 * Site chrome is hidden by PrintChrome.
 */
export default async function PrintDocumentPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [doc, { company }] = await Promise.all([getDocument(slug), getSiteSettings()]);
  if (!doc) notFound();
  const scene = (scenes as Record<string, { src: string; width: number; height: number; tagline: string }>)[doc.scene];

  return (
    <div className="doc-page mx-auto bg-white text-ink" style={{ maxWidth: "182mm" }}>
      <PrintChrome />
      {/* cover: white studio poster */}
      <div className="break-inside-avoid overflow-hidden rounded-xl border border-line bg-white">
        <div className="flex items-center justify-between px-8 pt-7">
          <Logo href={null} className="h-11" />
          <span className="rounded-full border border-line bg-sunken px-3 py-1 text-[8.5pt] font-semibold uppercase tracking-[0.16em] text-muted">{doc.type}</span>
        </div>
        <div className="px-8 pt-8">
          <h1 className="text-[26pt] font-bold leading-[1.08] tracking-tight text-ink">{doc.title}</h1>
          <p className="mt-3 max-w-[140mm] text-[11.5pt] leading-relaxed text-muted">{doc.subtitle}</p>
        </div>
        <div className="mt-8 flex items-center justify-between border-t border-line px-8 py-4">
          <p className="text-[10.5pt] font-semibold text-brand-700">{scene?.tagline}</p>
          <p className="text-[8.5pt] text-faint">
            {doc.updated} · Version {doc.version} · www.bluewhalestack.com
          </p>
        </div>
      </div>
      <p className="mt-4 text-[10.5pt] leading-relaxed text-muted">{doc.summary}</p>

      <DocumentView doc={doc} print />

      <div className="mt-8 break-inside-avoid border-t border-line pt-4 text-[8.5pt] leading-relaxed text-faint">
        <p>
          © {new Date().getFullYear()} {company.name}. Product, edition and maturity statements are as of {doc.updated}; certifications are described exactly as their issuing bodies allow.
          Customer engagements are anonymized under confidentiality. Contact: {company.emails.sales}.
        </p>
      </div>
    </div>
  );
}
