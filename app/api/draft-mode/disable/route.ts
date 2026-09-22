import { draftMode } from "next/headers";
import { redirect } from "next/navigation";

/** Leave preview mode — back to the published site. */
export async function GET(request: Request) {
  (await draftMode()).disable();
  const to = new URL(request.url).searchParams.get("to") ?? "/";
  redirect(to.startsWith("/") ? to : "/");
}
