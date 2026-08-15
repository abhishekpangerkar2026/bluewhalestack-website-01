import { NextResponse } from "next/server";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { certifications } from "@/content/trust";

const ACCESS_COOKIE = "bws_trust_access";

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
 * Streams a certificate PDF — only after the visitor has submitted the
 * Trust Center request form (see /api/trust/certificate-request), which
 * grants the bws_trust_access cookie checked below.
 */
export async function GET(
  req: Request,
  { params }: { params: Promise<{ certId: string }> },
) {
  const { certId } = await params;
  const cert = certifications.find((c) => c.id === certId && c.downloadable);
  if (!cert) {
    return NextResponse.json({ ok: false, error: "Certificate not found." }, { status: 404 });
  }

  if (getCookie(req, ACCESS_COOKIE) !== "1") {
    return NextResponse.json(
      { ok: false, error: "Submit the request form to unlock certificate downloads." },
      { status: 403 },
    );
  }

  const filePath = path.join(process.cwd(), "certificates", `${cert.id}.pdf`);
  let bytes: Buffer;
  try {
    bytes = await readFile(filePath);
  } catch {
    return NextResponse.json({ ok: false, error: "Certificate file unavailable." }, { status: 404 });
  }

  const downloadName = `BlueWhale Stack - ${cert.fullName}.pdf`.replace(/[\\/:*?"<>|]/g, "-");

  return new NextResponse(new Uint8Array(bytes), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="${downloadName}"`,
      "Cache-Control": "private, no-store",
    },
  });
}
