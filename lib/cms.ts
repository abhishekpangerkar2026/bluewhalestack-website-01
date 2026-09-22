import { createClient, type SanityClient } from "@sanity/client";
import type { CmsImage } from "@/content/cmsTypes";

/**
 * The CMS seam. When NEXT_PUBLIC_SANITY_PROJECT_ID is unset (or a query
 * fails, or a document does not exist yet) every getter in lib/content.ts
 * falls back to the typed content files, so the site never depends on the
 * CMS being filled in. Reads are cached by Next and tagged; the webhook at
 * /api/revalidate clears the tag on every publish.
 */
export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
export const cmsEnabled = Boolean(projectId);
export const CMS_TAG = "cms";

let client: SanityClient | null = null;

export function getClient(): SanityClient | null {
  if (!cmsEnabled) return null;
  client ??= createClient({
    projectId,
    dataset,
    apiVersion: "2025-09-01",
    useCdn: false,
    perspective: "published",
  });
  return client;
}

export async function cmsFetch<T>(query: string, params: Record<string, unknown> = {}, tags: string[] = []): Promise<T | null> {
  const c = getClient();
  if (!c) return null;
  try {
    return await c.fetch<T>(query, params, { next: { revalidate: 3600, tags: [CMS_TAG, ...tags] } });
  } catch (error) {
    console.error("[cms] fetch failed — using the typed content fallback", error);
    return null;
  }
}

/** GROQ projection that turns an image field into a CmsImage. */
export const imageProjection = (field = "image") =>
  `"${field}": select(defined(${field}.asset) => {
    "src": ${field}.asset->url,
    "alt": coalesce(${field}.alt, ""),
    "width": ${field}.asset->metadata.dimensions.width,
    "height": ${field}.asset->metadata.dimensions.height,
    "hotspot": ${field}.hotspot
  }, null)`;

/** GROQ projection for an uploaded-or-linked video. */
export const videoProjection = `"video": select(defined(video.asset) => { "src": video.asset->url }, defined(videoUrl) => { "src": videoUrl }, null)`;

type RawImage = { src: string; alt?: string; width?: number; height?: number; hotspot?: { x: number; y: number } | null } | null;

/** Normalise a projected image: hotspot → CSS object-position. */
export function toCmsImage(raw: RawImage | undefined): CmsImage | undefined {
  if (!raw?.src) return undefined;
  const focal = raw.hotspot ? `${Math.round(raw.hotspot.x * 100)}% ${Math.round(raw.hotspot.y * 100)}%` : undefined;
  return { src: raw.src, alt: raw.alt || undefined, width: raw.width, height: raw.height, focal };
}

/** A sized, auto-formatted URL for a Sanity CDN image (other hosts are returned unchanged). */
export function imageUrl(src: string, width: number): string {
  if (!src.includes("cdn.sanity.io")) return src;
  const u = new URL(src);
  u.searchParams.set("w", String(width));
  u.searchParams.set("auto", "format");
  u.searchParams.set("q", "82");
  return u.toString();
}

export function imageSrcSet(src: string, widths: number[] = [640, 1024, 1536]): string | undefined {
  if (!src.includes("cdn.sanity.io")) return undefined;
  return widths.map((w) => `${imageUrl(src, w)} ${w}w`).join(", ");
}
