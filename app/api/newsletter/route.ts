import { NextResponse } from "next/server";
import { sendNotificationEmail } from "@/lib/email";

const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

/** Newsletter subscription handler. */
export async function POST(req: Request) {
  let data: Record<string, unknown>;
  try {
    data = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request body" }, { status: 400 });
  }

  if (typeof data.email !== "string" || !EMAIL_RE.test(data.email)) {
    return NextResponse.json({ ok: false, error: "Enter a valid email." }, { status: 422 });
  }

  // eslint-disable-next-line no-console
  console.log("[newsletter] subscribe", { email: data.email });

  const result = await sendNotificationEmail({
    subject: "New newsletter subscriber",
    text: `New newsletter signup on bluewhalestack.com:\n\nEmail: ${data.email}`,
    replyTo: data.email,
  });

  return NextResponse.json({ ok: true, delivered: result.delivered });
}
