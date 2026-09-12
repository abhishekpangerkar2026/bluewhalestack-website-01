"use client";

import { useRef, useState, type ReactNode } from "react";

/**
 * Subtle pointer-driven 3D tilt for the product scenes: ±5° on hover, spring
 * back on leave. Touch devices and reduced-motion users get a static scene.
 */
export function TiltFrame({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [t, setT] = useState({ rx: 0, ry: 0, active: false });

  function onMove(e: React.PointerEvent<HTMLDivElement>) {
    if (e.pointerType !== "mouse") return;
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    setT({ rx: -py * 8, ry: px * 10, active: true });
  }

  return (
    <div ref={ref} onPointerMove={onMove} onPointerLeave={() => setT({ rx: 0, ry: 0, active: false })} className={className} style={{ perspective: "1400px" }}>
      <div
        style={{
          transform: `rotateX(${t.rx}deg) rotateY(${t.ry}deg)`,
          transition: t.active ? "transform 120ms ease-out" : "transform 600ms cubic-bezier(0.22, 1, 0.36, 1)",
          transformStyle: "preserve-3d",
          willChange: "transform",
        }}
      >
        {children}
      </div>
    </div>
  );
}
