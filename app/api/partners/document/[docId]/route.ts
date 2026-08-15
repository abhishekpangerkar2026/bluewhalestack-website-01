import { NextResponse } from "next/server";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { programDocuments } from "@/content/partners";

const ACCESS_COOKIE = "bws_partner_doc_access";

function getCookie(req: Request, name: string): string | undefined {
  const header = req.headers.get("cookie");
  if (!header) return undefined;
  for (const part of header.split(";")) {
    const [k, ...v] = part.trim().split("=");
    if (k === name) return decodeURIComponent(v.join("="));
  }
  return undefined;
}

/**
 * Streams a partner program guide PDF — only after the visitor has submitted
 * the request form (see /api/partners/document-request), which grants the
 * bws_partner_doc_access cookie checked below.
 */
export async function GET(
  req: Request,
  { params }: { params: Promise<{ docId: string }> },
) {
  const { docId } = await params;
  const doc = programDocuments.find((d) => d.id === docId);
  if (!doc) {
    return NextResponse.json({ ok: false, error: "Document not found." }, { status: 404 });
  }

  if (getCookie(req, ACCESS_COOKIE) !== "1") {
    return NextResponse.json(
      { ok: false, error: "Submit the request form to unlock this download." },
      { status: 403 },
    );
  }

  const filePath = path.join(process.cwd(), "partner-documents", `${doc.id}.pdf`);
  let bytes: Buffer;
  try {
    bytes = await readFile(filePath);
  } catch {
    return NextResponse.json({ ok: false, error: "Document file unavailable." }, { status: 404 });
  }

  const downloadName = `BlueWhale Stack - ${doc.title}.pdf`.replace(/[\\/:*?"<>|]/g, "-");

  return new NextResponse(new Uint8Array(bytes), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="${downloadName}"`,
      "Cache-Control": "private, no-store",
    },
  });
}
