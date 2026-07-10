"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { resources, resourceTypes, type ResourceType } from "@/content/resources";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/utils";

export function ResourceLibrary() {
  const [filter, setFilter] = useState<ResourceType | "All">("All");
  const list =
    filter === "All" ? resources : resources.filter((r) => r.type === filter);

  return (
    <div>
      {/* filters — left-aligned, with a live count */}
      <div className="flex flex-col gap-5 border-b border-line pb-6 sm:flex-row sm:items-end sm:justify-between">
        <div className="flex flex-wrap gap-2">
          {(["All", ...resourceTypes] as const).map((t) => (
            <button
              key={t}
              onClick={() => setFilter(t)}
              className={cn(
                "rounded-full px-4 py-2 text-sm font-semibold transition-all",
                filter === t
                  ? "bg-primary text-primary-fg shadow-sm"
                  : "border border-line bg-surface text-muted hover:border-line-strong hover:text-accent",
              )}
            >
              {t}
            </button>
          ))}
        </div>
        <span className="text-sm font-bold tabular-nums text-faint">
          {String(list.length).padStart(2, "0")}{" "}
          {list.length === 1 ? "resource" : "resources"}
        </span>
      </div>

      {/* grid — first item runs full-width as a feature */}
      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((r, i) => (
          <Link
            key={r.slug}
            href={`/contact?intent=resource&resource=${r.slug}`}
            className={cn(
              "group relative flex h-full flex-col overflow-hidden rounded-lg border border-line bg-surface p-6 shadow-sm transition-all hover:-translate-y-1 hover:border-line-strong hover:shadow-md",
              i === 0 && "sm:col-span-2 lg:col-span-2",
            )}
          >
            <span
              aria-hidden
              className="absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-primary transition-transform duration-300 group-hover:scale-x-100"
            />
            <div className="flex items-center justify-between">
              <Badge tone="accent">{r.type}</Badge>
              <span className="text-xs text-faint">{r.meta}</span>
            </div>
            <h3
              className={cn(
                "mt-4 font-bold leading-snug text-ink group-hover:text-accent",
                i === 0 ? "text-2xl" : "text-lg",
              )}
            >
              {r.title}
            </h3>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
              {r.summary}
            </p>
            <div className="mt-5 flex items-center justify-between border-t border-line pt-4">
              <span className="text-xs font-semibold uppercase tracking-wide text-faint">
                {r.topic}
              </span>
              <span className="inline-flex items-center gap-1 text-xs font-semibold text-accent">
                Request access
                <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
