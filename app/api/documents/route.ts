import { NextResponse } from "next/server";
import { documents } from "@/content/documents";

/** Document index used by scripts/build-docs.mjs (and handy for integrations). */
export function GET() {
  return NextResponse.json(
    documents.map((d) => ({ slug: d.slug, type: d.type, title: d.title, topic: d.topic, updated: d.updated, pdf: `/docs/${d.slug}.pdf`, url: `/resources/${d.slug}` })),
  );
}
