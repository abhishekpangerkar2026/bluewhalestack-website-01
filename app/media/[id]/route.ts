import { NextResponse } from "next/server";
import { getStore } from "@/lib/builder/store";

/** Serves builder uploads when they are stored on disk (the file backend); Sanity uploads are CDN URLs. */
export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const store = getStore();
  const media = store.readMedia ? await store.readMedia(id) : null;
  if (!media) return new NextResponse("Not found", { status: 404 });
  return new NextResponse(new Uint8Array(media.bytes), {
    headers: {
      "Content-Type": media.type,
      "Content-Length": String(media.bytes.length),
      "Cache-Control": "public, max-age=31536000, immutable",
      "Content-Disposition": `inline; filename="${encodeURIComponent(media.name)}"`,
    },
  });
}
