import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Logo } from "@/components/layout/Logo";
import { DocumentView } from "@/components/documents/DocumentView";
import { PrintChrome } from "../PrintChrome";
import { documents, documentsBySlug } from "@/content/documents";
import { scenes } from "@/content/scenes.generated";
import { company } from "@/content/company";

export const metadata: Metadata = { robots: { index: false, follow: false } };

export function generateStaticParams() {
  return documents.map((d) => ({ slug: d.slug }));
}

/**
 * Print layout for a document — what scripts/build-docs.mjs turns into the
 * PDF under public/docs. A4, brand cover, then the shared DocumentView in
 * print mode. Site chrome is hidden by PrintChrome.
 */
export default async function PrintDocumentPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const doc = documentsBySlug[slug];
  if (!doc) notFound();
  const scene = (scenes as Record<string, { src: string; width: number; height: number }>)[doc.scene];

  return (
    <div className="doc-page mx-auto bg-white text-ink" style={{ maxWidth: "182mm" }}>
      <PrintChrome />
      {/* cover */}
      <div className="break-inside-avoid overflow-hidden rounded-xl bg-brand-900 px-8 pb-8 pt-7 text-white">
        <div className="flex items-center justify-between">
          <Logo inverse href={null} className="h-8" />
          <span className="text-[9pt] font-semibold uppercase tracking-[0.18em] text-white/70">{doc.type}</span>
        </div>
        <h1 className="mt-10 text-[26pt] font-bold leading-[1.08] tracking-tight">{doc.title}</h1>
        <p className="mt-3 max-w-[140mm] text-[12pt] leading-relaxed text-white/80">{doc.subtitle}</p>
        <p className="mt-8 text-[9pt] text-white/60">
          {doc.updated} · Version {doc.version} · {company.name} · www.bluewhalestack.com
        </p>
      </div>
      {scene && (
        <div className="mt-4 break-inside-avoid overflow-hidden rounded-xl border border-line bg-[#f4f7ff] px-6 pt-4">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={scene.src} width={scene.width} height={scene.height} alt="" className="mx-auto block h-auto w-[86%]" />
        </div>
      )}
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
