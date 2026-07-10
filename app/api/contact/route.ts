import { NextResponse } from "next/server";
import { sendNotificationEmail } from "@/lib/email";

const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

/**
 * Demo / contact form handler.
 * Validates and acknowledges the submission. Email/CRM/DB delivery plugs in
 * here once provider credentials are configured (Resend/SMTP, HubSpot, etc.).
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

  const reference = globalThis.crypto.randomUUID().slice(0, 8).toUpperCase();
  const ip = req.headers.get("x-forwarded-for") ?? "local";

  const fields: [string, unknown][] = [
    ["Reference", reference],
    ["Name", `${data.firstName} ${data.lastName}`],
    ["Email", data.email],
    ["Company", data.company],
    ["Phone", data.phone],
    ["Job title", data.jobTitle],
    ["Country", data.country],
    ["Intent", data.intent],
    ["Message", data.message],
    ["IP", ip],
  ];
  const body = fields
    .filter(([, v]) => v != null && v !== "")
    .map(([k, v]) => `${k}: ${v}`)
    .join("\n");

  // eslint-disable-next-line no-console
  console.log("[contact] demo request", { reference, email: data.email });

  const result = await sendNotificationEmail({
    subject: `New demo request — ${data.company} (${reference})`,
    text: `A new demo request was submitted on bluewhalestack.com:\n\n${body}`,
    replyTo: typeof data.email === "string" ? data.email : undefined,
  });

  // Acknowledge to the user regardless — the lead is logged even if email
  // delivery is not yet configured (see lib/email.ts). `delivered` lets the
  // dashboard/monitoring distinguish configured vs not.
  return NextResponse.json({ ok: true, reference, delivered: result.delivered });
}
