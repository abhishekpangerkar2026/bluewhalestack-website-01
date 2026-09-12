import { cn } from "@/lib/utils";
import { product3d, type Product3DKey } from "@/content/product3d";

/**
 * One of the official 3D product-architecture renders. Plain <img> with a
 * 960px/1600px srcSet — the files are pre-optimised in /public, so no runtime
 * image optimizer is involved. `framed` adds the white card frame used on
 * light and dark bands alike.
 */
export function Product3D({
  name,
  className,
  priority = false,
  framed = true,
  sizes = "(min-width: 1024px) 50vw, 100vw",
}: {
  name: Product3DKey | string;
  className?: string;
  priority?: boolean;
  framed?: boolean;
  sizes?: string;
}) {
  const img = product3d[name as Product3DKey];
  if (!img) return null;
  return (
    <figure
      className={cn(
        "overflow-hidden rounded-xl",
        framed && "border border-line bg-white shadow-lg",
        className,
      )}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={img.src}
        srcSet={`${img.src960} 960w, ${img.src} 1600w`}
        sizes={sizes}
        width={1600}
        height={900}
        alt={img.alt}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        className="block h-auto w-full"
      />
    </figure>
  );
}
