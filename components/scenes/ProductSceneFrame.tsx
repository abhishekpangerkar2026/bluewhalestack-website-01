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
        <p className="pointer-events-none absolute inset-x-0 -bottom-1 text-center text-[10px] font-medium text-faint">
          Drag to rotate
        </p>
      )}
    </div>
  );
}
