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
        <p className={`pointer-events-none absolute bottom-2.5 right-2.5 inline-flex items-center gap-1.5 rounded-[2px] border px-2 py-1 font-mono text-[9px] font-medium uppercase tracking-[0.08em] ${studio === "dark" ? "border-white/20 bg-[#0d1330]/85 text-white/75" : "border-line bg-white/90 text-faint"}`}>
          <span aria-hidden>↻</span> Live 3D · drag to rotate
        </p>
      )}
    </div>
  );
}
