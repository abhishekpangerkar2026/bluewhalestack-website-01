import { redirect } from "next/navigation";
import type { Metadata } from "next";
import { Editor } from "./Editor";
import { getStore } from "@/lib/builder/store";
import { emptyPage, normalizePath } from "@/lib/builder/types";
import { fontClass } from "@/lib/fonts";

export const metadata: Metadata = { title: "Edit page" };
export const dynamic = "force-dynamic";

export default async function EditPage({ searchParams }: { searchParams: Promise<{ path?: string }> }) {
  const { path: raw } = await searchParams;
  if (!raw) redirect("/builder");
  const path = normalizePath(raw);
  const page = await getStore().getPage(path);
  if (!page) redirect(`/builder?missing=${encodeURIComponent(path)}`);
  const data = page.draft ?? page.published ?? emptyPage(page.title);
  return (
    <div className="h-dvh">
      <Editor path={path} initialData={data} title={page.title} fontClass={fontClass} hasPublished={Boolean(page.published)} />
    </div>
  );
}
