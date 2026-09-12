"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Download, FileText, BookOpen, Building2, Landmark, Layers, Newspaper } from "lucide-react";
import { resources, resourceTypes, type ResourceType } from "@/content/resources";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/utils";

/** Only offer filters for types that actually have resources — no empty tabs. */
const presentTypes = resourceTypes.filter((t) => resources.some((r) => r.type === t));

const COVER_ICON: Record<ResourceType, React.ComponentType<{ className?: string }>> = {
  Whitepaper: BookOpen,
  Datasheet: FileText,
  "Solution brief": Layers,
  "Industry brief": Landmark,
  "Case study": Newspaper,
  Company: Building2,
};

const COVER_TONE: Record<ResourceType, string> = {
  Whitepaper: "from-brand-800 to-brand-900",
  Datasheet: "from-brand-600 to-brand-800",
  "Solution brief": "from-brand-500 to-brand-700",
  "Industry brief": "from-brand-700 to-brand-900",
  "Case study": "from-[#0b2a7a] to-brand-900",
  Company: "from-brand-600 to-brand-900",
};

export function ResourceLibrary() {
  const [filter, setFilter] = useState<ResourceType | "All">("All");
  const list = filter === "All" ? resources : resources.filter((r) => r.type === filter);

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
              <span className="ml-1.5 text-xs opacity-70">{t === "All" ? resources.length : resources.filter((r) => r.type === t).length}</span>
            </button>
          ))}
        </div>
        <span className="text-sm font-bold tabular-nums text-faint">
          {String(list.length).padStart(2, "0")} {list.length === 1 ? "document" : "documents"}
        </span>
      </div>

      {/* grid — uniform cards; the title opens the reading page, the PDF link downloads */}
      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((r) => {
          const CoverIcon = COVER_ICON[r.type] ?? FileText;
          const tone = COVER_TONE[r.type] ?? "from-brand-600 to-brand-900";
          return (
            <article
              key={r.slug}
              className="group relative flex h-full flex-col overflow-hidden rounded-lg border border-line bg-surface shadow-sm transition-all hover:-translate-y-1 hover:border-line-strong hover:shadow-md"
            >
              <Link href={r.href} className={cn("relative flex aspect-[16/7] items-center justify-between bg-gradient-to-br px-5 text-white", tone)}>
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
              </Link>

              <div className="flex flex-1 flex-col p-6">
                <div className="flex items-center justify-between">
                  <Badge tone="accent">{r.topic}</Badge>
                  <span className="text-xs text-faint">{r.meta}</span>
                </div>
                <h3 className="mt-4 text-lg font-bold leading-snug text-ink">
                  <Link href={r.href} className="hover:text-accent">{r.title}</Link>
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{r.summary}</p>
                <div className="mt-5 flex items-center justify-between border-t border-line pt-4">
                  <Link href={r.href} className="inline-flex items-center gap-1 text-xs font-semibold text-accent">
                    Read online
                    <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
                  </Link>
                  <a href={r.pdf} download className="inline-flex items-center gap-1 rounded-md border border-line px-2.5 py-1 text-xs font-semibold text-ink transition-colors hover:border-accent hover:text-accent">
                    <Download className="h-3 w-3" /> PDF
                  </a>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {list.length === 0 && (
        <div className="mt-8 rounded-lg border border-dashed border-line bg-sunken p-10 text-center">
          <p className="font-semibold text-ink">Nothing here yet</p>
          <p className="mt-1 text-sm text-muted">Ask us and we&apos;ll send what&apos;s in the pipeline.</p>
        </div>
      )}
    </div>
  );
}
