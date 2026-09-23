"use client";

import Link from "next/link";
import { useState, useTransition } from "react";
import { Copy, Eye, EyeOff, Pencil, Trash2 } from "lucide-react";
import { deletePage, unpublishPage } from "@/lib/builder/actions";

export function PageRow({ path, title, published, draftAhead, updated, updatedBy }: { path: string; title: string; published: boolean; draftAhead: boolean; updated: string; updatedBy?: string }) {
  const [pending, start] = useTransition();
  const [gone, setGone] = useState(false);
  if (gone) return null;
  return (
    <tr className={pending ? "opacity-50" : undefined}>
      <td className="px-4 py-3"><p className="font-semibold text-ink">{title}</p><p className="text-xs text-faint">{path}</p></td>
      <td className="px-4 py-3">
        {published ? <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-semibold text-emerald-700">Live</span> : <span className="rounded-full bg-sunken px-2 py-0.5 text-xs font-semibold text-muted">Draft</span>}
        {published && draftAhead && <span className="ml-1 text-xs text-amber-700">· unpublished edits</span>}
      </td>
      <td className="px-4 py-3 text-xs text-muted">{updated}{updatedBy ? ` · ${updatedBy}` : ""}</td>
      <td className="px-4 py-3">
        <div className="flex justify-end gap-1">
          <Link href={`/builder/edit?path=${encodeURIComponent(path)}`} className="inline-flex items-center gap-1 rounded-md border border-line px-2.5 py-1.5 text-xs font-semibold text-ink hover:border-accent"><Pencil size={12} /> Edit</Link>
          <a href={path} target="_blank" rel="noopener" className="inline-flex items-center gap-1 rounded-md border border-line px-2.5 py-1.5 text-xs font-semibold text-ink hover:border-accent"><Eye size={12} /> View</a>
          <form action="/builder" method="get" className="hidden" />
          <Link href={`/builder/duplicate?path=${encodeURIComponent(path)}`} className="inline-flex items-center gap-1 rounded-md border border-line px-2.5 py-1.5 text-xs font-semibold text-ink hover:border-accent"><Copy size={12} /> Duplicate</Link>
          {published && (
            <button type="button" onClick={() => start(async () => { await unpublishPage(path); })} className="inline-flex items-center gap-1 rounded-md border border-line px-2.5 py-1.5 text-xs font-semibold text-ink hover:border-accent"><EyeOff size={12} /> Unpublish</button>
          )}
          <button type="button" onClick={() => { if (confirm(`Delete "${title}" (${path})? This cannot be undone.`)) start(async () => { await deletePage(path); setGone(true); }); }} className="inline-flex items-center gap-1 rounded-md border border-line px-2.5 py-1.5 text-xs font-semibold text-red-700 hover:border-red-400"><Trash2 size={12} /> Delete</button>
        </div>
      </td>
    </tr>
  );
}
