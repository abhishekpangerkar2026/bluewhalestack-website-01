import { readFile } from "node:fs/promises";
import path from "node:path";

export const runtime = "nodejs";
export const alt = "BlueWhale Stack — Every cloud. One control plane";
export const size = { width: 2400, height: 1260 };
export const contentType = "image/png";

/** The bespoke social artwork is bundled with the site, without an external fetch. */
export default async function OpenGraphImage() {
  const image = await readFile(path.join(process.cwd(), "public", "og.png"));
  return new Response(new Uint8Array(image), {
    headers: { "Content-Type": contentType, "Cache-Control": "public, max-age=86400" },
  });
}
