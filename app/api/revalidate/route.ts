import { revalidatePath, revalidateTag } from "next/cache";
import { NextResponse } from "next/server";
import { CMS_TAG } from "@/lib/cms";

/**
 * Sanity → site: called by the CMS webhook on every publish. Clears the
 * cached content reads (and the page cache) so the change is live within
 * seconds, without a redeploy. Configure the webhook URL as
 *   https://<site>/api/revalidate?secret=<SANITY_REVALIDATE_SECRET>
 */
export async function POST(request: Request) {
  const secret = process.env.SANITY_REVALIDATE_SECRET;
  const provided = new URL(request.url).searchParams.get("secret");
  if (!secret || provided !== secret) {
    return NextResponse.json({ ok: false, error: "invalid secret" }, { status: 401 });
  }
  let type: string | undefined;
  try {
    const body = (await request.json()) as { _type?: string };
    type = body._type;
  } catch {
    /* no body — revalidate everything */
  }
  revalidateTag(CMS_TAG);
  if (type) revalidateTag(type);
  revalidatePath("/", "layout");
  return NextResponse.json({ ok: true, revalidated: type ?? "all", at: new Date().toISOString() });
}
