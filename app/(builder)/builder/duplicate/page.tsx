import { redirect } from "next/navigation";
import { createPage } from "@/lib/builder/actions";
import { getStore } from "@/lib/builder/store";
import { normalizePath } from "@/lib/builder/types";

export const dynamic = "force-dynamic";

/** "Duplicate" from the pages list: pick a new title and address for the copy. */
export default async function DuplicatePage({ searchParams }: { searchParams: Promise<{ path?: string }> }) {
  const { path: raw } = await searchParams;
  if (!raw) redirect("/builder");
  const path = normalizePath(raw);
  const source = await getStore().getPage(path);
  if (!source) redirect("/builder");
  return (
    <main className="mx-auto max-w-xl px-5 py-16">
      <p className="eyebrow">Duplicate page</p>
      <h1 className="mt-2 text-2xl font-bold text-ink">Copy “{source.title}”</h1>
      <form action={createPage} className="mt-6 grid gap-3 rounded-xl border border-line bg-white p-6 shadow-sm">
        <input type="hidden" name="copyFrom" value={path} />
        <label className="text-sm font-medium text-ink">New title<input name="title" required defaultValue={`${source.title} (copy)`} className="mt-1 h-11 w-full rounded-md border border-line px-3 text-sm font-normal" /></label>
        <label className="text-sm font-medium text-ink">New address<input name="path" required defaultValue={`${path === "/" ? "" : path}-copy`} className="mt-1 h-11 w-full rounded-md border border-line px-3 text-sm font-normal" /></label>
        <div className="flex gap-2">
          <button type="submit" className="h-11 rounded-md bg-primary px-5 text-sm font-semibold text-primary-fg">Create the copy</button>
          <a href="/builder" className="inline-flex h-11 items-center rounded-md border border-line px-4 text-sm font-medium text-ink">Cancel</a>
        </div>
      </form>
    </main>
  );
}
