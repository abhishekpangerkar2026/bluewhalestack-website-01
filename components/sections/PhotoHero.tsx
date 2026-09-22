import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Container } from "@/components/ui/Container";
import { photos, photoSrc, photoSrcSet, type PhotoKey } from "@/content/photos";
import type { CmsImage, CmsVideo } from "@/content/cmsTypes";
import { imageSrcSet, imageUrl } from "@/lib/cms";

/**
 * Image-with-text hero. The studio photograph bleeds off the right edge and
 * fades into the page behind the copy; on phones it becomes an in-flow
 * picture under the copy. `tone="dark"` puts the same composition on the
 * brand gradient. An editor-supplied `image` or `video` (from the CMS)
 * replaces the built-in photograph.
 */
export function PhotoHero({
  photo,
  image,
  video,
  tone = "light",
  eyebrow,
  title,
  description,
  children,
  above,
  below,
  className,
  copyClassName,
  minHeight = "lg:min-h-[640px]",
  priority = true,
}: {
  photo: PhotoKey;
  /** CMS image — overrides `photo` */
  image?: CmsImage;
  /** CMS video — plays muted behind the copy; the photograph is the poster */
  video?: CmsVideo;
  tone?: "light" | "dark";
  eyebrow?: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  /** CTAs and notes under the description */
  children?: ReactNode;
  /** breadcrumbs / badges above the eyebrow */
  above?: ReactNode;
  /** a strip that spans the full width under the composition */
  below?: ReactNode;
  className?: string;
  copyClassName?: string;
  minHeight?: string;
  priority?: boolean;
}) {
  const p = photos[photo];
  const dark = tone === "dark";
  const pic = image
    ? {
        src: imageUrl(image.src, 1536),
        srcSet: imageSrcSet(image.src),
        mobileSrc: imageUrl(image.src, 1024),
        alt: image.alt ?? "",
        width: image.width ?? 1536,
        height: image.height ?? 1024,
        focal: image.focal ?? "center",
      }
    : {
        src: photoSrc(photo, 1536),
        srcSet: photoSrcSet(photo),
        mobileSrc: photoSrc(photo, 1024),
        alt: p.alt,
        width: p.width,
        height: p.height,
        focal: p.focal ?? "center",
      };

  const media = (mobile: boolean) =>
    video ? (
      <video
        src={video.src}
        poster={mobile ? pic.mobileSrc : pic.src}
        autoPlay
        muted
        loop
        playsInline
        preload={mobile ? "metadata" : "auto"}
        aria-hidden
        className={cn("h-full w-full object-cover", mobile && "aspect-[3/2]")}
        style={{ objectPosition: pic.focal }}
      />
    ) : (
      <img
        src={mobile ? pic.mobileSrc : pic.src}
        srcSet={pic.srcSet}
        sizes={mobile ? "100vw" : "60vw"}
        alt={mobile ? pic.alt : ""}
        width={pic.width}
        height={pic.height}
        fetchPriority={!mobile && priority ? "high" : undefined}
        decoding={priority ? "sync" : "async"}
        loading={mobile && !priority ? "lazy" : undefined}
        className={cn(mobile ? "aspect-[3/2] w-full object-cover" : "photo-drift h-full w-full object-cover", mobile && dark && "[mask-image:linear-gradient(to_bottom,transparent,black_25%)]")}
        style={{ objectPosition: pic.focal }}
      />
    );

  return (
    <section
      className={cn(
        "relative overflow-hidden",
        dark ? "bg-brand-gradient text-white sheen" : "border-b border-line bg-white",
        className,
      )}
    >
      <div className="relative">
      {/* desktop: the photograph (or video) off the right edge */}
      <div
        aria-hidden
        className={cn(
          "pointer-events-none absolute inset-y-0 right-0 hidden w-[58%] lg:block",
          dark ? "[mask-image:linear-gradient(to_right,transparent_0%,black_30%)]" : "[mask-image:linear-gradient(to_right,transparent_0%,black_26%)]",
        )}
      >
        {media(false)}
        {!dark && (
          <div aria-hidden className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-white to-transparent" />
        )}
      </div>

      <Container className={cn("relative", minHeight, "flex flex-col justify-center")}>
        <div className={cn("py-14 sm:py-20 lg:max-w-[46%]", copyClassName)}>
          {above}
          {eyebrow && (
            <p className={cn("eyebrow mb-5 flex items-center gap-3", dark && "text-[var(--gold)]")}>
              <span aria-hidden className="h-px w-8 bg-[var(--gold)]" />
              {eyebrow}
            </p>
          )}
          <h1 className={cn("display-1", dark ? "text-white" : "text-ink")}>{title}</h1>
          {description && (
            <p className={cn("mt-6 max-w-xl text-lg leading-relaxed", dark ? "text-white/78" : "text-muted")}>
              {description}
            </p>
          )}
          {children && <div className="mt-8">{children}</div>}
        </div>

        {/* phones and tablets: the picture in flow */}
        <figure className="-mx-5 mb-2 sm:-mx-10 lg:hidden">{media(true)}</figure>
      </Container>
      </div>
      {below}
    </section>
  );
}
