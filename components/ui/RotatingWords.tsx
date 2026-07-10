"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

/** Cycles through words with a fade-up transition. */
export function RotatingWords({
  words,
  interval = 2200,
  className,
}: {
  words: string[];
  interval?: number;
  className?: string;
}) {
  const [i, setI] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(() => setI((p) => (p + 1) % words.length), interval);
    return () => clearInterval(t);
  }, [words.length, interval]);

  // widest word reserves space to avoid layout shift
  const widest = words.reduce((a, b) => (b.length > a.length ? b : a), "");

  return (
    <span className="relative inline-grid align-bottom">
      <span className="invisible col-start-1 row-start-1" aria-hidden>
        {widest}
      </span>
      <span
        key={i}
        className={cn(
          "col-start-1 row-start-1 animate-fade-up text-gradient",
          className,
        )}
      >
        {words[i]}
      </span>
    </span>
  );
}
