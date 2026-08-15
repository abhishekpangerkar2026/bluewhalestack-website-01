import { NextResponse } from "next/server";
import { sendNotificationEmail } from "@/lib/email";
import { certifications } from "@/content/trust";

const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
const ACCESS_COOKIE = "bws_trust_access";

/**
 * Trust Center certificate gate. Validates the requester's details, logs +
 * emails the lead (same pattern as /api/contact), then grants a short-lived
 * download cookie so /api/trust/certificate/[certId] will stream the PDF.
 */
export async function POST(req: Request) {
  let data: Record<string, unknown>;
  try {
    data = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request body" }, { status: 400 });
  }

  // honeypot — bots fill hidden fields
  if (typeof data.company_website === "string" && data.company_website.length > 0) {
    return NextResponse.json({ ok: true, reference: "SPAM0000" });
  }

  const required = ["firstName", "lastName", "email", "company", "consent"];
  const missing = required.filter((k) => !data[k]);
  if (missing.length) {
    return NextResponse.json(
      { ok: false, error: "Please complete the required fields.", missing },
      { status: 422 },
    );
  }
  if (typeof data.email !== "string" || !EMAIL_RE.test(data.email)) {
    return NextResponse.json(
      { ok: false, error: "Please enter a valid work email.", missing: ["email"] },
      { status: 422 },
    );
  }

  const certId = typeof data.certId === "string" ? data.certId : "";
  const cert = certifications.find((c) => c.id === certId && c.downloadable);

  const reference = globalThis.crypto.randomUUID().slice(0, 8).toUpperCase();
  const ip = req.headers.get("x-forwarded-for") ?? "local";

  const fields: [string, unknown][] = [
    ["Reference", reference],
    ["Name", `${data.firstName} ${data.lastName}`],
    ["Email", data.email],
    ["Company", data.company],
    ["Phone", data.phone],
    ["Job title", data.jobTitle],
    ["Triggered by", cert ? cert.fullName : "Trust Center (unlock all)"],
    ["IP", ip],
  ];
  const body = fields
    .filter(([, v]) => v != null && v !== "")
    .map(([k, v]) => `${k}: ${v}`)
    .join("\n");

  // eslint-disable-next-line no-console
  console.log("[trust] certificate request", { reference, email: data.email });

  const result = await sendNotificationEmail({
    subject: `Trust Center certificate request — ${data.company} (${reference})`,
    text: `A visitor unlocked certificate downloads on bluewhalestack.com/trust:\n\n${body}`,
    replyTo: typeof data.email === "string" ? data.email : undefined,
  });

  const res = NextResponse.json({ ok: true, reference, delivered: result.delivered });
  const secure = process.env.NODE_ENV === "production" ? "; Secure" : "";
  res.headers.append(
    "Set-Cookie",
    `${ACCESS_COOKIE}=1; Path=/; Max-Age=3600; HttpOnly; SameSite=Lax${secure}`,
  );
  return res;
}
