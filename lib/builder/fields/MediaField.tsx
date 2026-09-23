"use client";

import { useEffect, useRef, useState } from "react";
import { ImagePlus, Link2, Loader2, Trash2, Upload, X } from "lucide-react";
import type { MediaRecord } from "../types";

export interface MediaValue {
  url: string;
  alt?: string;
  width?: number;
  height?: number;
  name?: string;
}

type Kind = "image" | "video";

async function dimensions(file: File): Promise<{ width?: number; height?: number }> {
  if (!file.type.startsWith("image/")) return {};
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve({ width: img.naturalWidth, height: img.naturalHeight });
    img.onerror = () => resolve({});
    img.src = URL.createObjectURL(file);
  });
}

async function upload(file: File): Promise<MediaRecord> {
  const form = new FormData();
  form.append("file", file);
  const dims = await dimensions(file);
  if (dims.width) form.append("width", String(dims.width));
  if (dims.height) form.append("height", String(dims.height));
  const res = await fetch("/api/builder/media", { method: "POST", body: form });
  const json = await res.json();
  if (!res.ok) throw new Error(json.error ?? "Upload failed");
  return json as MediaRecord;
}

function Preview({ value, kind }: { value: MediaValue; kind: Kind }) {
  return kind === "video" ? (
    <video src={value.url} muted playsInline controls className="h-32 w-full rounded-md bg-black object-cover" />
  ) : (
    // eslint-disable-next-line @next/next/no-img-element -- editor preview of an arbitrary upload
    <img src={value.url} alt={value.alt ?? ""} className="h-32 w-full rounded-md border border-line bg-[#f6f7fa] object-cover" />
  );
}

/** The upload / library / link picker rendered inside the editor's field panel. */
export function MediaPicker({ value, onChange, kind, label }: { value?: MediaValue; onChange: (v: MediaValue | undefined) => void; kind: Kind; label: string }) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [library, setLibrary] = useState<MediaRecord[] | null>(null);
  const [showLibrary, setShowLibrary] = useState(false);
  const [showUrl, setShowUrl] = useState(false);
  const input = useRef<HTMLInputElement>(null);
  const accept = kind === "video" ? "video/mp4,video/webm,video/quicktime" : "image/*";

  useEffect(() => {
    if (!showLibrary || library) return;
    fetch("/api/builder/media").then((r) => r.json()).then((rows: MediaRecord[]) => setLibrary(rows.filter((m) => (kind === "video" ? m.type.startsWith("video/") : m.type.startsWith("image/"))))).catch(() => setLibrary([]));
  }, [showLibrary, library, kind]);

  async function onFile(file: File | undefined) {
    if (!file) return;
    setBusy(true);
    setError(null);
    try {
      const rec = await upload(file);
      onChange({ url: rec.url, alt: value?.alt ?? "", width: rec.width, height: rec.height, name: rec.name });
      setLibrary(null);
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="space-y-2">
      <div className="text-[14px] font-semibold text-[#101828]">{label}</div>
      {value?.url ? (
        <div className="relative">
          <Preview value={value} kind={kind} />
          <button type="button" onClick={() => onChange(undefined)} className="absolute right-1.5 top-1.5 grid h-7 w-7 place-items-center rounded-md bg-white/90 text-ink shadow hover:bg-white" aria-label={`Remove ${label}`}>
            <Trash2 size={14} />
          </button>
        </div>
      ) : (
        <div
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => { e.preventDefault(); onFile(e.dataTransfer.files?.[0]); }}
          onClick={() => input.current?.click()}
          className="grid h-24 cursor-pointer place-items-center rounded-md border border-dashed border-line-strong bg-white text-xs text-muted hover:border-accent hover:text-accent"
        >
          <span className="inline-flex items-center gap-2">{busy ? <Loader2 size={14} className="animate-spin" /> : <ImagePlus size={14} />} {busy ? "Uploading…" : `Drop a ${kind} here or click to upload`}</span>
        </div>
      )}
      <input ref={input} type="file" accept={accept} className="hidden" onChange={(e) => onFile(e.target.files?.[0])} />
      <div className="flex flex-wrap gap-1.5">
        <button type="button" onClick={() => input.current?.click()} disabled={busy} className="inline-flex items-center gap-1 rounded-md border border-line bg-white px-2 py-1 text-[11px] font-medium text-ink hover:border-accent">
          <Upload size={12} /> Upload
        </button>
        <button type="button" onClick={() => setShowLibrary((v) => !v)} className="inline-flex items-center gap-1 rounded-md border border-line bg-white px-2 py-1 text-[11px] font-medium text-ink hover:border-accent">
          <ImagePlus size={12} /> Library
        </button>
        <button type="button" onClick={() => setShowUrl((v) => !v)} className="inline-flex items-center gap-1 rounded-md border border-line bg-white px-2 py-1 text-[11px] font-medium text-ink hover:border-accent">
          <Link2 size={12} /> Use a link
        </button>
      </div>
      {showUrl && (
        <input
          type="url"
          placeholder={kind === "video" ? "https://…/clip.mp4" : "https://…/picture.jpg"}
          defaultValue={value?.url ?? ""}
          onBlur={(e) => { const u = e.currentTarget.value.trim(); if (u) onChange({ ...(value ?? {}), url: u }); }}
          className="h-8 w-full rounded-md border border-line px-2 text-xs"
        />
      )}
      {showLibrary && (
        <div className="max-h-56 overflow-auto rounded-md border border-line bg-white p-1.5">
          {library === null ? (
            <p className="p-2 text-xs text-muted">Loading…</p>
          ) : library.length === 0 ? (
            <p className="p-2 text-xs text-muted">Nothing uploaded yet.</p>
          ) : (
            <div className="grid grid-cols-3 gap-1.5">
              {library.map((m) => (
                <button key={m.id} type="button" title={m.name} onClick={() => { onChange({ url: m.url, alt: value?.alt ?? "", width: m.width, height: m.height, name: m.name }); setShowLibrary(false); }} className="group relative aspect-square overflow-hidden rounded border border-line hover:border-accent">
                  {m.type.startsWith("video/") ? <video src={m.url} muted className="h-full w-full object-cover" /> : /* eslint-disable-next-line @next/next/no-img-element */ <img src={m.url} alt={m.name} className="h-full w-full object-cover" />}
                </button>
              ))}
            </div>
          )}
        </div>
      )}
      {kind === "image" && value?.url && (
        <input
          type="text"
          placeholder="Describe the picture (alt text)"
          value={value.alt ?? ""}
          onChange={(e) => onChange({ ...value, alt: e.target.value })}
          className="h-8 w-full rounded-md border border-line px-2 text-xs"
        />
      )}
      {error && <p className="inline-flex items-center gap-1 text-[11px] text-red-600"><X size={12} /> {error}</p>}
    </div>
  );
}

