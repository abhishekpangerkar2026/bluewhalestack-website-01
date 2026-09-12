"use client";

import { useState, type ReactNode } from "react";
import { LiveSceneMount } from "./live/LiveSceneMount";

/**
 * The 16:9 stage of a ProductScene: holds the static image (children) and,
 * once the live scene has drawn its first frame, fades the image out.
 */
export function ProductSceneFrame({ sceneKey, live, children }: { sceneKey: string; live: boolean; children: ReactNode }) {
  const [ready, setReady] = useState(false);
  return (
    <div className="relative aspect-[16/9] w-full">
      <div className={`absolute inset-0 transition-opacity duration-500 ${ready ? "opacity-0" : "opacity-100"}`} aria-hidden={ready}>
        {children}
      </div>
      {live && <LiveSceneMount sceneKey={sceneKey} onReady={() => setReady(true)} />}
      {ready && (
        <p className="pointer-events-none absolute bottom-1 right-2 inline-flex items-center gap-1 rounded-full border border-line bg-surface/90 px-2 py-0.5 text-[11px] font-semibold text-muted shadow-sm">
          <span aria-hidden>↻</span> Live 3D · drag to rotate
        </p>
      )}
    </div>
  );
}
