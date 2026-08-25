"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, FileText, PlayCircle, Presentation, Newspaper, BookOpen } from "lucide-react";
import { resources, type ResourceType } from "@/content/resources";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/utils";

/** Only offer filters for types that actually have resources — no empty tabs. */
const presentTypes = Array.from(new Set(resources.map((r) => r.type))) as ResourceType[];

const COVER_ICON: Record<string, React.ComponentType<{ className?: string }>> = {
  Video: PlayCircle,
  Webinar: Presentation,
  Blog: Newspaper,
  Whitepaper: FileText,
  Guide: BookOpen,
};

const COVER_TONE: Record<string, string> = {
  Video: "from-brand-700 to-brand-900",
  Webinar: "from-brand-600 to-brand-800",
  Blog: "from-brand-500 to-brand-700",
  Whitepaper: "from-brand-800 to-brand-900",
  Guide: "from-brand-600 to-brand-900",
};

export function ResourceLibrary() {
  const [filter, setFilter] = useState<ResourceType | "All">("All");
  const list =
    filter === "All" ? resources : resources.filter((r) => r.type === filter);

  return (
    <div>
      {/* filters — left-aligned, with a live count */}
      <div className="flex flex-col gap-5 border-b border-line pb-6 sm:flex-row sm:items-end sm:justify-between">
        <div className="flex flex-wrap gap-2">
          {(["All", ...presentTypes] as const).map((t) => (
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

      {/* grid — uniform cards, each with a typed cover so the library reads as a library */}
      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((r) => {
          const CoverIcon = COVER_ICON[r.type] ?? FileText;
          const tone = COVER_TONE[r.type] ?? "from-brand-600 to-brand-900";
          return (
            <Link
              key={r.slug}
              href={`/contact?intent=resource&resource=${r.slug}`}
              className="group relative flex h-full flex-col overflow-hidden rounded-lg border border-line bg-surface shadow-sm transition-all hover:-translate-y-1 hover:border-line-strong hover:shadow-md"
            >
              {/* cover */}
              <div
                className={cn(
                  "relative flex aspect-[16/7] items-center justify-between bg-gradient-to-br px-5 text-white",
                  tone,
                )}
              >
                <div
                  aria-hidden
                  className="absolute inset-0 opacity-[0.14]"
                  style={{
                    backgroundImage:
                      "linear-gradient(to right, rgba(255,255,255,.5) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,.5) 1px, transparent 1px)",
                    backgroundSize: "28px 28px",
                  }}
                />
                <span className="relative eyebrow text-white/80">{r.type}</span>
                <CoverIcon className="relative h-9 w-9 text-white/80" />
              </div>

              <div className="flex flex-1 flex-col p-6">
                <div className="flex items-center justify-between">
                  <Badge tone="accent">{r.topic}</Badge>
                  <span className="text-xs text-faint">{r.meta}</span>
                </div>
                <h3 className="mt-4 text-lg font-bold leading-snug text-ink group-hover:text-accent">
                  {r.title}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
                  {r.summary}
                </p>
                <div className="mt-5 flex items-center justify-end border-t border-line pt-4">
                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-accent">
                    Request access
                    <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {list.length === 0 && (
        <div className="mt-8 rounded-lg border border-dashed border-line bg-sunken p-10 text-center">
          <p className="font-semibold text-ink">Nothing here yet</p>
          <p className="mt-1 text-sm text-muted">
            We&apos;re adding {filter.toLowerCase()} resources — ask us and we&apos;ll send
            what&apos;s in the pipeline.
          </p>
        </div>
      )}
    </div>
  );
}
