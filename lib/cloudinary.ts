/**
 * Self-service images: once NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME is set (Railway
 * env var), image slots wired through `cld()` are served from Cloudinary
 * instead of the bundled file in /public — so replacing a photo in the
 * Cloudinary media library (a drag-and-drop dashboard, cloudinary.com/console)
 * updates the live site with no code change and no redeploy.
 *
 * Until that env var exists, `cld()` returns the local fallback path
 * unchanged, so the site behaves exactly as it does today. See
 * docs/image-uploads.md for the setup steps and the public-ID convention.
 */

const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

/** True once a Cloudinary account is connected. */
export const cloudinaryEnabled = Boolean(CLOUD_NAME);

/**
 * Resolve an image src: the Cloudinary delivery URL for `publicId` once
 * connected, otherwise `fallback` (a local /public path) unchanged.
 * `width` requests an f_auto,q_auto responsive transform at that size —
 * omit it to let Cloudinary serve the asset as uploaded.
 */
export function cld(publicId: string, fallback: string, width?: number): string {
  if (!CLOUD_NAME) return fallback;
  const transforms = ["f_auto", "q_auto"];
  if (width) transforms.push(`w_${width}`, "c_limit");
  return `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/${transforms.join(",")}/${publicId}`;
}

/** "/team/abhishek-pangerkar.jpg" → "bluewhalestack/team/abhishek-pangerkar" — the convention every image slot follows. */
export function publicIdFromPath(localPath: string, folder: string): string {
  const name = localPath.split("/").pop()!.replace(/\.[^.]+$/, "");
  return `bluewhalestack/${folder}/${name}`;
}
