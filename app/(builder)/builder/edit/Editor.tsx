"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { Puck, createUsePuck, type Data } from "@puckeditor/core";
import "@puckeditor/core/puck.css";
import { ArrowLeft, Check, Eye, Loader2, Save } from "lucide-react";
import { config } from "@/lib/builder/config";
import { publishPage, saveDraft } from "@/lib/builder/actions";

const usePuck = createUsePuck();

type Status = { kind: "idle" | "dirty" | "saving" | "saved" | "published" | "error"; at?: string; message?: string };

/** The visual editor for one page: drag blocks, type on the canvas, save a draft or publish. */
export function Editor({ path, initialData, title, fontClass, hasPublished }: { path: string; initialData: Data; title: string; fontClass: string; hasPublished: boolean }) {
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const latest = useRef<Data>(initialData);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const save = useCallback(async (data: Data) => {
    setStatus({ kind: "saving" });
    try {
      const res = await saveDraft(path, data);
      setStatus({ kind: "saved", at: res.updatedAt });
    } catch (e) {
      setStatus({ kind: "error", message: (e as Error).message });
    }
  }, [path]);

  // autosave the draft a few seconds after the last change
  const onChange = useCallback((data: Data) => {
    latest.current = data;
    setStatus((s) => (s.kind === "saving" ? s : { kind: "dirty" }));
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => save(latest.current), 4000);
  }, [save]);

  useEffect(() => () => { if (timer.current) clearTimeout(timer.current); }, []);

  const publish = useCallback(async (data: Data) => {
    if (timer.current) clearTimeout(timer.current);
    setStatus({ kind: "saving" });
    try {
      const res = await publishPage(path, data);
      setStatus({ kind: "published", at: res.publishedAt });
    } catch (e) {
      setStatus({ kind: "error", message: (e as Error).message });
    }
  }, [path]);

  return (
    <Puck
      config={config}
      data={initialData}
      onChange={onChange}
      onPublish={publish}
      headerTitle={title}
      headerPath={path}
      viewports={[
        { width: 390, height: "auto", label: "Phone", icon: "Smartphone" },
        { width: 820, height: "auto", label: "Tablet", icon: "Tablet" },
        { width: 1280, height: "auto", label: "Laptop", icon: "Monitor" },
        { width: 1536, height: "auto", label: "Desktop", icon: "Monitor" },
      ]}
      iframe={{ waitForStyles: true }}
      overrides={{
        iframe: ({ children, document }) => <FrameSetup document={document} fontClass={fontClass}>{children}</FrameSetup>,
        headerActions: ({ children }) => (
          <HeaderActions status={status} path={path} hasPublished={hasPublished} onSave={() => save(latest.current)}>
            {children}
          </HeaderActions>
        ),
      }}
    />
  );
}

/** The preview frame is a separate document: give it the site's fonts and the light theme. */
function FrameSetup({ document, fontClass, children }: { document?: Document; fontClass: string; children: ReactNode }) {
  useEffect(() => {
    if (!document) return;
    fontClass.split(/\s+/).filter(Boolean).forEach((c) => document.documentElement.classList.add(c));
    document.documentElement.setAttribute("data-theme", "light");
    document.documentElement.lang = "en";
    document.body.classList.add("font-sans", "antialiased", "bg-white");
  }, [document, fontClass]);
  return <>{children}</>;
}

function HeaderActions({ status, path, hasPublished, onSave, children }: { status: Status; path: string; hasPublished: boolean; onSave: () => void; children: ReactNode }) {
  const data = usePuck((s) => s.appState.data);
  const label =
    status.kind === "saving" ? "Saving…" :
    status.kind === "saved" ? "Draft saved" :
    status.kind === "published" ? "Published — live on the site" :
    status.kind === "dirty" ? "Unsaved changes" :
    status.kind === "error" ? `Could not save: ${status.message}` : hasPublished ? "Live on the site" : "Not published yet";
  return (
    <>
      <span className={`hidden items-center gap-1.5 text-xs md:inline-flex ${status.kind === "error" ? "text-red-600" : status.kind === "published" ? "text-emerald-700" : "text-[#667085]"}`}>
        {status.kind === "saving" ? <Loader2 size={12} className="animate-spin" /> : status.kind === "saved" || status.kind === "published" ? <Check size={12} /> : null}
        {label}
      </span>
      <a href="/builder" className="inline-flex h-9 items-center gap-1.5 rounded-md border border-[#e4e9f2] bg-white px-3 text-xs font-semibold text-[#101828] hover:border-[#002ca0]"><ArrowLeft size={14} /> Pages</a>
      <a href={path} target="_blank" rel="noopener" className="inline-flex h-9 items-center gap-1.5 rounded-md border border-[#e4e9f2] bg-white px-3 text-xs font-semibold text-[#101828] hover:border-[#002ca0]"><Eye size={14} /> View page</a>
      <button type="button" onClick={onSave} disabled={status.kind === "saving"} className="inline-flex h-9 items-center gap-1.5 rounded-md border border-[#e4e9f2] bg-white px-3 text-xs font-semibold text-[#101828] hover:border-[#002ca0] disabled:opacity-50">
        <Save size={14} /> Save draft
      </button>
      {/* the default Publish button — it calls onPublish with the current data */}
      <span data-count={data?.content?.length ?? 0}>{children}</span>
    </>
  );
}
