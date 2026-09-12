"use client";

import { useCallback, useEffect, useState } from "react";
import { Maximize2, Minimize2, X, ExternalLink, ZoomIn } from "lucide-react";
import { cn } from "@/lib/utils";
import { POSTER_LAYERS, posterSrc, type IndustryPoster } from "@/content/industryPosters";

/**
 * The official industry reference-architecture sheet, shown as a real
 * figure: the poster at 2400 px with a 1200 px source for phones, a
 * full-screen viewer that switches between fit and readable 1:1 zoom, the
 * seven-band key beneath it, and the sector gold-marked modules and modes
 * transcribed so the same facts are legible where the poster text is not.
 */
export function IndustryArchitecturePoster({ poster, sector }: { poster: IndustryPoster; sector: string }) {
  const [open, setOpen] = useState(false);
  const [zoom, setZoom] = useState(false);
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

  const chip = "rounded-full border border-[#e2c57c] bg-[#fdf6e3] px-2.5 py-1 text-xs font-semibold text-[#7a5a12]";
  const action =
    "inline-flex h-9 items-center gap-1.5 rounded-md border border-line-strong px-3 text-[13px] font-medium text-ink transition-colors hover:border-accent hover:text-accent";

  return (
    <>
      <figure className="overflow-hidden rounded-xl border border-line bg-surface shadow-sm">
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="group relative block w-full cursor-zoom-in bg-[#0b1f4d] text-left focus-visible:outline-none focus-visible:shadow-[var(--shadow-focus)]"
          aria-label={`Open the ${poster.title} sheet full screen`}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={posterSrc(poster, 2400)}
            srcSet={`${posterSrc(poster, 1200)} 1200w, ${posterSrc(poster, 2400)} 2400w`}
            sizes="(min-width: 1280px) 1152px, 100vw"
            width={2400}
            height={1387}
            alt={alt}
            loading="lazy"
            decoding="async"
            className="block h-auto w-full"
          />
          <span className="pointer-events-none absolute bottom-3 right-3 inline-flex items-center gap-1.5 rounded-md bg-white/95 px-2.5 py-1.5 text-xs font-semibold text-[#0b1f4d] shadow-sm transition-opacity sm:opacity-0 sm:group-hover:opacity-100 sm:group-focus-visible:opacity-100">
            <ZoomIn className="h-3.5 w-3.5" /> Open full screen
          </span>
        </button>

        <figcaption className="border-t border-line">
          <div className="flex flex-col gap-3 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="min-w-0">
              <p className="font-semibold text-ink">{poster.title}</p>
              <p className="mt-0.5 text-sm text-muted">{poster.subtitle}</p>
            </div>
            <div className="flex shrink-0 flex-wrap gap-2">
              <button type="button" onClick={() => setOpen(true)} className={action}>
                <Maximize2 className="h-3.5 w-3.5" /> Full screen
              </button>
              <a href={posterSrc(poster, "full")} target="_blank" rel="noopener noreferrer" className={action}>
                <ExternalLink className="h-3.5 w-3.5" /> Original, 5400 px
              </a>
            </div>
          </div>

          <div className="grid gap-px border-t border-line bg-line lg:grid-cols-[1.15fr_0.85fr]">
            <div className="bg-surface p-5 sm:p-6">
              <p className="eyebrow text-faint">How to read it</p>
              <ol className="mt-3 grid gap-x-6 gap-y-2 sm:grid-cols-2">
                {POSTER_LAYERS.map((l) => (
                  <li key={l.n} className="flex items-start gap-3 text-sm">
                    <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full border border-[#c9a24a] text-[11px] font-bold text-[#8a6a1e] num">
                      {l.n}
                    </span>
                    <span className="leading-snug text-muted">
                      <span className="font-semibold text-ink">{l.name}</span> — {l.what}
                    </span>
                  </li>
                ))}
              </ol>
            </div>
            <div className="bg-surface p-5 sm:p-6">
              <p className="eyebrow text-faint">Gold-marked for {sector}</p>
              <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-faint">Modules that lead</p>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {poster.modules.map((m) => (
                  <span key={m} className={chip}>
                    {m}
                  </span>
                ))}
              </div>
              <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-faint">Deployment modes that fit</p>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {poster.modes.map((m) => (
                  <span key={m} className={chip}>
                    {m}
                  </span>
                ))}
              </div>
              <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-faint">Plugs into</p>
              <p className="mt-1.5 text-sm leading-relaxed text-muted">{poster.integrations.join(" · ")}</p>
            </div>
          </div>
        </figcaption>
      </figure>

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`${poster.title} — full screen`}
          className="fixed inset-0 z-[100] flex flex-col bg-[#050b1c]/95 backdrop-blur-sm"
        >
          <div className="flex items-center justify-between gap-3 border-b border-white/10 px-4 py-3 text-white sm:px-6">
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold">{poster.title}</p>
              <p className="hidden truncate text-xs text-white/60 sm:block">{poster.subtitle}</p>
            </div>
            <div className="flex shrink-0 items-center gap-2">
              <button
                type="button"
                onClick={() => setZoom((z) => !z)}
                className="inline-flex h-9 items-center gap-1.5 rounded-md border border-white/20 px-3 text-[13px] font-medium text-white transition-colors hover:bg-white/10"
              >
                {zoom ? <Minimize2 className="h-3.5 w-3.5" /> : <ZoomIn className="h-3.5 w-3.5" />}
                {zoom ? "Fit to screen" : "Zoom to read"}
              </button>
              <a
                href={posterSrc(poster, "full")}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden h-9 items-center gap-1.5 rounded-md border border-white/20 px-3 text-[13px] font-medium text-white transition-colors hover:bg-white/10 sm:inline-flex"
              >
                <ExternalLink className="h-3.5 w-3.5" /> Original
              </a>
              <button
                type="button"
                onClick={close}
                aria-label="Close"
                className="grid h-9 w-9 place-items-center rounded-md border border-white/20 text-white transition-colors hover:bg-white/10"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>
          <div
            className={cn("min-h-0 flex-1 overflow-auto p-3 sm:p-6", zoom ? "cursor-zoom-out" : "cursor-zoom-in")}
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
                "mx-auto block rounded-md shadow-2xl",
                zoom ? "h-auto w-[2400px] max-w-none" : "h-auto max-h-[calc(100vh-88px)] w-auto max-w-full object-contain",
              )}
            />
          </div>
        </div>
      )}
    </>
  );
}
