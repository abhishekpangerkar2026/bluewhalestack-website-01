"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ProductScene } from "./ProductScene";

/**
 * Client-side loader for the live Solutions scene: code-splits three.js,
 * shows the static platform scene while it loads, and keeps the static scene
 * permanently where WebGL is unavailable.
 */
function Fallback() {
  return <ProductScene scene="platform" tilt={false} className="mx-auto w-full max-w-[680px]" />;
}

const SolutionsScene = dynamic(() => import("./SolutionsScene").then((m) => m.SolutionsScene), {
  ssr: false,
  loading: () => <Fallback />,
});

export function SolutionsSceneLoader() {
  const router = useRouter();
  const [webgl, setWebgl] = useState<boolean | null>(null);

  useEffect(() => {
    try {
      const c = document.createElement("canvas");
      setWebgl(Boolean(c.getContext("webgl2") || c.getContext("webgl")));
    } catch {
      setWebgl(false);
    }
  }, []);

  if (webgl === false) return <Fallback />;

  return (
    <div className="mx-auto w-full max-w-[720px]">
      <SolutionsScene
        onOpen={(slug) => router.push(`/solutions/${slug}`)}
        className="relative aspect-[16/11] w-full cursor-grab select-none active:cursor-grabbing"
      />
      <p className="mt-2 text-center text-xs text-faint">
        Drag to rotate · hover a tile to lift it · click to open the solution
      </p>
    </div>
  );
}
