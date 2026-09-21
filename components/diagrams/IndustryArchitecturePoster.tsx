"use client";

import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Maximize2, Minimize2, X, ExternalLink, ZoomIn } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/Badge";
import {
  POSTER_LAYERS,
  posterSrc,
  type IndustryPoster,
} from "@/content/industryPosters";

/**
 * The official industry reference-architecture sheet, presented as a plate in
 * a technical document: a mono-captioned frame, the artwork on a deliberate
 * navy mat (the sheets are royal blue on white, so the mat is what stops them
 * floating on warm paper), and a full-screen viewer that switches between fit
 * and readable 1:1 zoom.
 *
 * The gold chips are not decoration. Each poster marks the modules and
 * deployment modes that lead in its sector in gold; the chips transcribe those
 * marks, which is the only way that information is legible on a phone. They
 * use the site's own `warning` badge tone so the gold stays theme-aware and
 * consistent with the rest of the system.
 */

/** The navy mat behind the artwork — matched to the sheets' own header blue. */
const MAT = "#0b1f4d";

export function IndustryArchitecturePoster({
  poster,
  sector,
}: {
  poster: IndustryPoster;
  sector: string;
}) {
  const [open, setOpen] = useState(false);
  const [zoom, setZoom] = useState(false);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const alt = `BlueWhale Stack ${poster.title} — seven-layer reference architecture sheet: channels and users, Digital Experience Layer, Unified Platform Core, integrations, estates and data, request flow, deployment modes`;

  const close = useCallback(() => {
    setOpen(false);
    setZoom(false);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, close]);

  const mono =
    "font-mono text-[10px] font-medium uppercase leading-relaxed tracking-[0.1em]";
  const action = cn(
    mono,
    "inline-flex h-8 items-center gap-1.5 rounded-[2px] border border-line px-2.5 text-muted transition-colors hover:border-accent hover:text-accent",
  );
  const label = cn(mono, "text-faint");

  return (
    <>
      <figure className="rounded-[3px] border border-line bg-surface">
        {/* Plate header — this is a figure in a spec sheet, and says so */}
        <div className="flex items-center justify-between gap-4 border-b border-line px-4 py-2.5">
          <p className={cn(mono, "truncate text-ink")}>
            Fig · {sector} — reference architecture
          </p>
          <p className={cn(mono, "shrink-0 text-faint")}>5400 × 3120</p>
        </div>

        {/* The artwork, on its navy mat */}
        <button
          type="button"
          onClick={() => setOpen(true)}
          style={{ background: MAT }}
          className="group relative block w-full cursor-zoom-in p-3 text-left focus-visible:outline-none focus-visible:shadow-[var(--shadow-focus)] sm:p-5"
          aria-label={`Open the ${poster.title} sheet full screen`}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={posterSrc(poster, 2400)}
            srcSet={`${posterSrc(poster, 1200)} 1200w, ${posterSrc(poster, 2400)} 2400w`}
            sizes="(min-width: 1280px) 1100px, 100vw"
            width={2400}
            height={1387}
            alt={alt}
            loading="lazy"
            decoding="async"
            className="block h-auto w-full"
          />
          <span
            className={cn(
              mono,
              "pointer-events-none absolute bottom-6 right-6 hidden items-center gap-1.5 rounded-[2px] bg-white px-2 py-1.5 text-[#0b1f4d] opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100 sm:inline-flex",
            )}
          >
            <ZoomIn className="h-3 w-3" /> Open full screen
          </span>
        </button>

        <figcaption>
          <div className="flex flex-col gap-3 border-t border-line px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="min-w-0">
              <p className="font-medium text-ink">{poster.title}</p>
              <p className="mt-0.5 text-sm text-muted">{poster.subtitle}</p>
            </div>
            <div className="flex shrink-0 flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setOpen(true)}
                className={action}
              >
                <Maximize2 className="h-3 w-3" /> Full screen
              </button>
              <a
                href={posterSrc(poster, "full")}
                target="_blank"
                rel="noopener noreferrer"
                className={action}
              >
                <ExternalLink className="h-3 w-3" /> Original
              </a>
            </div>
          </div>

          <div className="grid border-t border-line lg:grid-cols-[1.15fr_0.85fr]">
            <div className="border-line px-4 py-5 lg:border-r">
              <p className={label}>How to read it</p>
              <ol className="mt-3.5 grid gap-x-6 gap-y-2.5 sm:grid-cols-2">
                {POSTER_LAYERS.map((l) => (
                  <li key={l.n} className="flex items-start gap-2.5 text-sm">
                    <span
                      className={cn(
                        mono,
                        "mt-0.5 grid h-4 w-4 shrink-0 place-items-center rounded-[2px] border border-line-strong text-faint",
                      )}
                    >
                      {l.n}
                    </span>
                    <span className="leading-snug text-muted">
                      <span className="font-medium text-ink">{l.name}</span> —{" "}
                      {l.what}
                    </span>
                  </li>
                ))}
              </ol>
            </div>
            <div className="border-t border-line px-4 py-5 lg:border-t-0">
              <p className={label}>Gold-marked for {sector}</p>
              <p className={cn(label, "mt-3.5")}>Modules that lead</p>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {poster.modules.map((m) => (
                  <Badge key={m} tone="warning">
                    {m}
                  </Badge>
                ))}
              </div>
              <p className={cn(label, "mt-4")}>Deployment modes that fit</p>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {poster.modes.map((m) => (
                  <Badge key={m} tone="warning">
                    {m}
                  </Badge>
                ))}
              </div>
              <p className={cn(label, "mt-4")}>Plugs into</p>
              <p className="mt-1.5 text-sm leading-relaxed text-muted">
                {poster.integrations.join(" · ")}
              </p>
            </div>
          </div>
        </figcaption>
      </figure>

      {/* Rendered into <body>: a `position: fixed` overlay is sized by the
          nearest containing block, and inside the page's animated wrappers
          that is not the viewport. A portal guarantees it fills the screen. */}
      {open &&
        mounted &&
        createPortal(
          <div
            role="dialog"
            aria-modal="true"
            aria-label={`${poster.title} — full screen`}
            className="fixed inset-0 z-[100] flex flex-col bg-[#050b1c]/95 backdrop-blur-sm"
          >
            <div className="flex items-center justify-between gap-3 border-b border-white/10 px-4 py-2.5 text-white sm:px-6">
              <div className="min-w-0">
                <p className={cn(mono, "truncate")}>
                  Fig · {sector} — reference architecture
                </p>
                <p className="hidden truncate text-xs text-white/55 sm:block">
                  {poster.subtitle}
                </p>
              </div>
              <div className="flex shrink-0 items-center gap-2">
                <button
                  type="button"
                  onClick={() => setZoom((z) => !z)}
                  className={cn(
                    mono,
                    "inline-flex h-8 items-center gap-1.5 rounded-[2px] border border-white/25 px-2.5 text-white transition-colors hover:bg-white/10",
                  )}
                >
                  {zoom ? (
                    <Minimize2 className="h-3 w-3" />
                  ) : (
                    <ZoomIn className="h-3 w-3" />
                  )}
                  {zoom ? "Fit to screen" : "Zoom to read"}
                </button>
                <a
                  href={posterSrc(poster, "full")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    mono,
                    "hidden h-8 items-center gap-1.5 rounded-[2px] border border-white/25 px-2.5 text-white transition-colors hover:bg-white/10 sm:inline-flex",
                  )}
                >
                  <ExternalLink className="h-3 w-3" /> Original
                </a>
                <button
                  type="button"
                  onClick={close}
                  aria-label="Close"
                  className="grid h-8 w-8 place-items-center rounded-[2px] border border-white/25 text-white transition-colors hover:bg-white/10"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
            <div
              className={cn(
                "min-h-0 flex-1 overflow-auto p-3 sm:p-6",
                zoom ? "cursor-zoom-out" : "cursor-zoom-in",
              )}
              onClick={(e) => {
                if (e.target === e.currentTarget) close();
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={posterSrc(poster, "full")}
                alt={alt}
                onClick={() => setZoom((z) => !z)}
                className={cn(
                  "mx-auto block rounded-[2px]",
                  zoom
                    ? "h-auto w-[2400px] max-w-none"
                    : "h-auto max-h-[calc(100vh-80px)] w-auto max-w-full object-contain",
                )}
              />
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}
