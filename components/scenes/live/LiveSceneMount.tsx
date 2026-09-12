"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

/**
 * Progressive enhancement for ProductScene: on desktop pointers with WebGL,
 * mount the live scene over the static image and fade the image out once
 * the first frame has rendered. Phones and reduced-capability devices keep
 * the static capture.
 */
const LiveScene = dynamic(() => import("./LiveScene").then((m) => m.LiveScene), { ssr: false });

export function LiveSceneMount({ sceneKey, onReady }: { sceneKey: string; onReady: () => void }) {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    try {
      // laptops, desktops and tablets rotate; phones keep the static capture
      const capable = window.matchMedia("(min-width: 768px)").matches;
      if (!capable) return;
      const c = document.createElement("canvas");
      const gl = c.getContext("webgl2") || c.getContext("webgl");
      if (!gl) return;
      // give the static image and the page's own JS the first moment; the scene is a nicety
      const id = window.setTimeout(() => setEnabled(true), 400);
      return () => window.clearTimeout(id);
    } catch {
      /* stay static */
    }
  }, []);

  if (!enabled) return null;
  return <LiveScene sceneKey={sceneKey} className="absolute inset-0 cursor-grab active:cursor-grabbing" onReady={onReady} />;
}
