/**
 * Lead / notification email delivery.
 *
 * Uses the Resend REST API directly via `fetch` (no SDK dependency). Configure
 * with environment variables — see .env.example:
 *   RESEND_API_KEY   — Resend API key (required to actually send)
 *   LEAD_TO_EMAIL    — where demo requests / signups are delivered
 *   LEAD_FROM_EMAIL  — verified sender, e.g. "BlueWhale Stack <noreply@bluewhalestack.com>"
 *
 * If RESEND_API_KEY is not set, delivery is skipped gracefully (the submission
 * is still logged) so local/dev and pre-credential environments don't error.
 */

type SendArgs = {
  subject: string;
  /** Plain-text body (also wrapped into a minimal HTML email). */
  text: string;
  /** Optional reply-to (e.g. the lead's own email). */
  replyTo?: string;
};

export type SendResult = { delivered: boolean; skipped?: boolean; error?: string };

export async function sendNotificationEmail({
  subject,
  text,
  replyTo,
}: SendArgs): Promise<SendResult> {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.LEAD_TO_EMAIL;
  const from =
    process.env.LEAD_FROM_EMAIL ?? "BlueWhale Stack <onboarding@resend.dev>";

  if (!apiKey || !to) {
    // Not configured yet — log so nothing is silently lost, and report skipped.
    // eslint-disable-next-line no-console
    console.warn(
      "[email] RESEND_API_KEY / LEAD_TO_EMAIL not set — email delivery skipped.",
      { subject },
    );
    return { delivered: false, skipped: true };
  }

  const html = `<pre style="font:14px/1.6 ui-monospace,monospace;white-space:pre-wrap">${escapeHtml(
    text,
  )}</pre>`;

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        subject,
        text,
        html,
        ...(replyTo ? { reply_to: replyTo } : {}),
      }),
    });

    if (!res.ok) {
      const detail = await res.text().catch(() => "");
      // eslint-disable-next-line no-console
      console.error("[email] Resend send failed", res.status, detail);
      return { delivered: false, error: `Resend ${res.status}` };
    }
    return { delivered: true };
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error("[email] Resend request errored", err);
    return { delivered: false, error: "request failed" };
  }
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}
