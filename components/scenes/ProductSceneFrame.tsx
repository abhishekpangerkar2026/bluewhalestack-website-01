"use client";

import { useState, type ReactNode } from "react";
import { LiveSceneMount } from "./live/LiveSceneMount";
import type { Studio } from "./live/LiveScene";

/**
 * The stage of a ProductScene: holds the static poster (children) and, once
 * the live scene has drawn its first frame, fades the poster out. Fills its
 * parent; the parent decides the aspect ratio.
 */
export function ProductSceneFrame({ sceneKey, studio, live, children }: { sceneKey: string; studio: Studio; live: boolean; children: ReactNode }) {
  const [ready, setReady] = useState(false);
  return (
    <div className="absolute inset-0">
      <div className={`absolute inset-0 transition-opacity duration-700 ${ready ? "opacity-0" : "opacity-100"}`} aria-hidden={ready}>
        {children}
      </div>
      {live && <LiveSceneMount sceneKey={sceneKey} studio={studio} onReady={() => setReady(true)} />}
      {ready && (
        <p className={`pointer-events-none absolute bottom-3 right-3 inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[11px] font-semibold shadow-sm ${studio === "dark" ? "border-white/15 bg-white/10 text-white/80" : "border-line bg-surface/90 text-muted"}`}>
          <span aria-hidden>↻</span> Live 3D · drag to rotate
        </p>
      )}
    </div>
  );
}
