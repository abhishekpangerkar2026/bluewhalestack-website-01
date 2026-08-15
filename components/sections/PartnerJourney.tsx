"use client";

import { useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { tracks } from "@/content/partners";
import { cn } from "@/lib/utils";

/** Tabbed onboarding journey — pick a track, see its path from apply to launch. */
export function PartnerJourney() {
  const [slug, setSlug] = useState<(typeof tracks)[number]["slug"]>(
    tracks[0].slug,
  );
  const track = tracks.find((t) => t.slug === slug) ?? tracks[0];

  return (
    <div>
      <div role="tablist" aria-label="Partner tracks" className="flex flex-wrap gap-2">
        {tracks.map((t) => (
          <button
            key={t.slug}
            role="tab"
            aria-selected={slug === t.slug}
            onClick={() => setSlug(t.slug)}
            className={cn(
              "flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all",
              slug === t.slug
                ? "bg-primary text-primary-fg shadow-sm"
                : "border border-line bg-surface text-muted hover:border-line-strong hover:text-accent",
            )}
          >
            <Icon name={t.icon} className="h-4 w-4" />
            {t.shortName}
          </button>
        ))}
      </div>

      <ol className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
        {track.journey.map((step, i) => (
          <li
            key={step.title}
            className="relative flex h-full flex-col rounded-lg border border-line bg-surface p-5 shadow-sm"
          >
            <span className="num text-2xl font-bold text-accent/40">
              0{i + 1}
            </span>
            <h4 className="mt-3 text-sm font-bold leading-snug text-ink">
              {step.title}
            </h4>
            <p className="mt-1.5 flex-1 text-xs leading-relaxed text-muted">
              {step.body}
            </p>
            {i < track.journey.length - 1 && (
              <span
                aria-hidden
                className="absolute right-0 top-1/2 hidden h-px w-5 -translate-y-1/2 translate-x-full bg-line-strong lg:block"
              />
            )}
          </li>
        ))}
      </ol>
    </div>
  );
}
