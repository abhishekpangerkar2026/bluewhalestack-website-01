import { NextResponse } from "next/server";
import { getSession } from "@/lib/builder/auth";
import { getStore } from "@/lib/builder/store";

const MAX_IMAGE = 15 * 1024 * 1024;
const MAX_FILE = 80 * 1024 * 1024;

/** Media library: list uploads, or upload a file (multipart "file", optional "width"/"height"). */
export async function GET() {
  if (!(await getSession())) return NextResponse.json({ error: "Not signed in" }, { status: 401 });
  return NextResponse.json(await getStore().listMedia());
}

export async function POST(request: Request) {
  if (!(await getSession())) return NextResponse.json({ error: "Not signed in" }, { status: 401 });
  const form = await request.formData();
  const file = form.get("file");
  if (!(file instanceof File)) return NextResponse.json({ error: "No file" }, { status: 400 });
  const isImage = file.type.startsWith("image/");
  if (file.size > (isImage ? MAX_IMAGE : MAX_FILE)) {
    return NextResponse.json({ error: `Too large — images up to ${MAX_IMAGE / 1024 / 1024} MB, videos and files up to ${MAX_FILE / 1024 / 1024} MB.` }, { status: 413 });
  }
  const bytes = Buffer.from(await file.arrayBuffer());
  const num = (k: string) => { const v = Number(form.get(k)); return Number.isFinite(v) && v > 0 ? Math.round(v) : undefined; };
  try {
    const rec = await getStore().saveMedia({ name: file.name, type: file.type || "application/octet-stream", bytes, width: num("width"), height: num("height") });
    return NextResponse.json(rec);
  } catch (error) {
    console.error("[builder] upload failed", error);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  if (!(await getSession())) return NextResponse.json({ error: "Not signed in" }, { status: 401 });
  const { id } = (await request.json()) as { id?: string };
  if (!id) return NextResponse.json({ error: "No id" }, { status: 400 });
  await getStore().deleteMedia(id);
  return NextResponse.json({ ok: true });
}
