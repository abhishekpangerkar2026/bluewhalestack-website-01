"use client";

import { useEffect, useRef } from "react";
import createGlobe from "cobe";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { globalRegions, globalStats, globalIntro } from "@/content/global";

/** Global infrastructure section: 3D Earth + connected regions. */
export function GlobalInfra() {
  return (
    <section
      id="global-infrastructure"
      className="relative scroll-mt-24 overflow-hidden bg-brand-900 py-24 text-white sm:py-32"
    >
      <Container className="relative">
        <Reveal>
          <SectionHeading
            inverse
            eyebrow={globalIntro.eyebrow}
            title={globalIntro.title}
            description={globalIntro.description}
          />
        </Reveal>

        {/* asymmetric: globe column narrower, region detail wider */}
        <div className="mt-14 grid items-center gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          {/* globe */}
          <Reveal>
            <div className="relative mx-auto flex w-full max-w-md items-center justify-center">
              <div className="pointer-events-none absolute inset-0 rounded-full bg-brand-500/15 blur-3xl" />
              <Earth />
            </div>
          </Reveal>

          {/* region list */}
          <Reveal delay={120}>
            <div>
              <div className="grid gap-3 sm:grid-cols-2">
                {globalRegions.map((r) => (
                  <div
                    key={r.code}
                    className="rounded-lg border border-white/10 bg-white/[0.04] p-4"
                  >
                    <div className="flex items-center justify-between">
                      <div className="font-bold text-white">
                        {r.city}
                      </div>
                      <span className="rounded-md bg-white/10 px-2 py-0.5 text-[10px] font-semibold text-white/70">
                        {r.code}
                      </span>
                    </div>
                    <div className="text-xs text-white/60">
                      {r.country} · {r.serves}
                    </div>
                    <div className="mt-2 flex flex-wrap gap-1">
                      {r.compliance.map((c) => (
                        <span
                          key={c}
                          className="rounded-full border border-white/10 px-2 py-0.5 text-[10px] text-white/70"
                        >
                          {c}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-7 grid grid-cols-4 gap-4 border-t border-white/10 pt-7">
                {globalStats.map((s) => (
                  <div key={s.label}>
                    <div className="text-3xl font-bold leading-none tracking-tight text-white num sm:text-4xl">
                      {s.value}
                    </div>
                    <div className="mt-1.5 text-[11px] text-white/60">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

function Earth() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    let phi = 0;
    let width = 0;
    const onResize = () => (width = canvas.offsetWidth);
    window.addEventListener("resize", onResize);
    onResize();

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const globe = createGlobe(canvas, {
      devicePixelRatio: 2,
      width: width * 2,
      height: width * 2,
      phi: 0,
      theta: 0.25,
      dark: 1,
      diffuse: 1.2,
      mapSamples: 16000,
      mapBrightness: 6,
      baseColor: [0.12, 0.22, 0.55],
      markerColor: [0.22, 0.85, 1],
      glowColor: [0.14, 0.28, 0.85],
      markers: globalRegions.map((r) => ({ location: r.coords, size: 0.08 })),
      onRender: (state) => {
        if (!reduce) phi += 0.004;
        state.phi = phi;
        state.width = width * 2;
        state.height = width * 2;
      },
    });

    canvas.style.opacity = "0";
    const t = setTimeout(() => {
      canvas.style.transition = "opacity 1s ease";
      canvas.style.opacity = "1";
    }, 80);

    return () => {
      clearTimeout(t);
      globe.destroy();
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="relative"
      style={{ width: "100%", aspectRatio: "1", maxWidth: 440, contain: "layout paint size" }}
      aria-label="Global regions: Singapore, Frankfurt, Mumbai, Los Angeles"
    />
  );
}
