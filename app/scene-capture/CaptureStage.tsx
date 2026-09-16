"use client";

import { Suspense, useCallback, useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import dynamic from "next/dynamic";
import { STUDIO_BG, type Studio } from "@/components/scenes/live/LiveScene";

const LiveScene = dynamic(() => import("@/components/scenes/live/LiveScene").then((m) => m.LiveScene), { ssr: false });

declare global {
  interface Window {
    __sceneReady?: boolean;
    __setAngle?: (a: number) => void;
  }
}

function Stage() {
  const q = useSearchParams();
  const key = q.get("key") ?? "platform";
  const w = Number(q.get("w") ?? 2000);
  const h = Number(q.get("h") ?? 2000);
  const studio: Studio = q.get("studio") === "dark" ? "dark" : "light";
  const bg = STUDIO_BG[studio];
  const [angle, setAngle] = useState(Number(q.get("angle") ?? 0));
  const angleRef = useRef(angle);
  angleRef.current = angle;
  const still = q.get("live") !== "1";

  useEffect(() => {
    window.__setAngle = (a: number) => {
      // same angle as the current frame: nothing re-renders, so the frame is already ready
      if (a === angleRef.current) { window.__sceneReady = true; return; }
      window.__sceneReady = false;
      setAngle(a);
    };
    document.documentElement.style.background = bg;
    document.body.style.background = bg;
    document.body.style.margin = "0";
    // the capture must contain nothing but the stage: hide header, footer, chat widget, dev indicators
    document.body.querySelectorAll<HTMLElement>(":scope > *:not(main)").forEach((el) => { el.style.display = "none"; });
    const main = document.body.querySelector<HTMLElement>(":scope > main");
    if (main) { main.style.margin = "0"; main.style.padding = "0"; }
  }, [bg]);

  const onReady = useCallback(() => { window.__sceneReady = true; }, []);

  return (
    <div style={{ width: w, height: h, background: bg }}>
      <LiveScene sceneKey={key} studio={studio} angle={angle} interactive={false} animate={false} still={still} dpr={1} onReady={onReady} className="h-full w-full" />
    </div>
  );
}

export function CaptureStage() {
  return (
    <Suspense fallback={null}>
      <Stage />
    </Suspense>
  );
}
