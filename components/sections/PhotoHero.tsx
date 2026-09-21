import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Container } from "@/components/ui/Container";
import { photos, photoSrc, photoSrcSet, type PhotoKey } from "@/content/photos";

/**
 * Image-with-text hero. The studio photograph bleeds off the right edge and
 * fades into the page behind the copy; on phones it becomes an in-flow
 * picture under the copy. `tone="dark"` puts the same composition on the
 * brand gradient.
 */
export function PhotoHero({
  photo,
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
  return (
    <section
      className={cn(
        "relative overflow-hidden",
        dark ? "bg-brand-gradient text-white sheen" : "border-b border-line bg-white",
        className,
      )}
    >
      <div className="relative">
      {/* desktop: the photograph off the right edge */}
      <div
        aria-hidden
        className={cn(
          "pointer-events-none absolute inset-y-0 right-0 hidden w-[58%] lg:block",
          dark ? "[mask-image:linear-gradient(to_right,transparent_0%,black_30%)]" : "[mask-image:linear-gradient(to_right,transparent_0%,black_26%)]",
        )}
      >
        <img
          src={photoSrc(photo, 1536)}
          srcSet={photoSrcSet(photo)}
          sizes="60vw"
          alt=""
          width={p.width}
          height={p.height}
          fetchPriority={priority ? "high" : undefined}
          decoding={priority ? "sync" : "async"}
          className="photo-drift h-full w-full object-cover"
          style={{ objectPosition: p.focal ?? "center" }}
        />
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

        {/* phones and tablets: the photograph in flow */}
        <figure className="-mx-5 mb-2 sm:-mx-10 lg:hidden">
          <img
            src={photoSrc(photo, 1024)}
            srcSet={photoSrcSet(photo)}
            sizes="100vw"
            alt={p.alt}
            width={p.width}
            height={p.height}
            loading={priority ? "eager" : "lazy"}
            className={cn("aspect-[3/2] w-full object-cover", dark && "[mask-image:linear-gradient(to_bottom,transparent,black_25%)]")}
            style={{ objectPosition: p.focal ?? "center" }}
          />
        </figure>
      </Container>
      </div>
      {below}
    </section>
  );
}
