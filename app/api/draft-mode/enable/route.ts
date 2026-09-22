import { validatePreviewUrl } from "@sanity/preview-url-secret";
import { draftMode } from "next/headers";
import { redirect } from "next/navigation";
import { getPreviewClient } from "@/lib/cms";

/**
 * Entered by the Studio's Presentation tool: it appends a short-lived secret
 * it has stored in the dataset. We validate it with the read token, switch
 * this browser into draft mode (unpublished edits become visible, with the
 * click-to-edit overlays) and send it to the requested page.
 */
export async function GET(request: Request) {
  const client = getPreviewClient();
  if (!client) return new Response("Preview is not configured on this deployment.", { status: 404 });
  const { isValid, redirectTo = "/" } = await validatePreviewUrl(client, request.url);
  if (!isValid) return new Response("Invalid or expired preview link.", { status: 401 });
  (await draftMode()).enable();
  redirect(redirectTo);
}
