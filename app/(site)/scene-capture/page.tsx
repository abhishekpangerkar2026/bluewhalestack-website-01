import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CaptureStage } from "./CaptureStage";

export const metadata: Metadata = { title: "Scene capture", robots: { index: false, follow: false } };

/**
 * Internal page used by scripts/capture-scenes.mjs and capture-video.mjs to
 * render one product scene at a fixed angle on a transparent canvas. Only
 * available in development or when SCENE_CAPTURE=1 is set.
 */
export default function SceneCapturePage() {
  if (process.env.NODE_ENV === "production" && process.env.SCENE_CAPTURE !== "1") notFound();
  return <CaptureStage />;
}
