"use client";

import { useEffect, useRef, useState } from "react";

/**
 * A number that counts up once when it scrolls into view. Renders the final
 * value immediately for reduced-motion users and for anything that is not a
 * plain number (e.g. "< 15 min").
 */
export function CountUp({
  value,
  prefix = "",
  suffix = "",
  duration = 1500,
  className,
}: {
  value: number | string;
  prefix?: string;
  suffix?: string;
  duration?: number;
  className?: string;
}) {
  const target = typeof value === "number" ? value : Number.parseFloat(String(value).replace(/[^0-9.]/g, ""));
  const animatable = typeof value === "number" || (/^\s*[0-9][0-9,.]*\s*$/.test(String(value)) && Number.isFinite(target));
  const ref = useRef<HTMLSpanElement>(null);
  const [shown, setShown] = useState<number>(animatable ? 0 : target);
  const [done, setDone] = useState(!animatable);

  useEffect(() => {
    if (!animatable || done) return;
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) { setShown(target); setDone(true); return; }
    const io = new IntersectionObserver(
      (entries) => {
        if (!entries.some((e) => e.isIntersecting)) return;
        io.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          const t = Math.min(1, (now - start) / duration);
          const eased = 1 - Math.pow(2, -10 * t); // ease-out expo
          setShown(target * (t >= 1 ? 1 : eased));
          if (t < 1) requestAnimationFrame(tick);
          else setDone(true);
        };
        requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [animatable, done, duration, target]);

  if (!animatable) return <span ref={ref} className={className}>{prefix}{value}{suffix}</span>;
  const decimals = Number.isInteger(target) ? 0 : 1;
  const text = (done ? target : shown).toLocaleString("en-US", { maximumFractionDigits: decimals, minimumFractionDigits: decimals });
  return <span ref={ref} className={className}>{prefix}{text}{suffix}</span>;
}
