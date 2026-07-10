"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Icon } from "@/components/ui/Icon";
import { modules, moduleGroups, type ModuleGroup } from "@/content/modules";
import { cn } from "@/lib/utils";

const ORDER: ModuleGroup[] = [
  "foundation",
  "operations",
  "builder",
  "datacenter",
  "ai",
];

/** Interactive module map — switch groups to explore the 11 modules. */
export function ModuleExplorer() {
  const [group, setGroup] = useState<ModuleGroup>("foundation");
  const list = modules.filter((m) => m.group === group);

  return (
    <div>
      {/* group tabs */}
      <div
        role="tablist"
        aria-label="Module groups"
        className="flex flex-wrap gap-2"
      >
        {ORDER.map((g) => (
          <button
            key={g}
            role="tab"
            aria-selected={group === g}
            onClick={() => setGroup(g)}
            className={cn(
              "rounded-full px-4 py-2 text-sm font-medium transition-all",
              group === g
                ? "bg-primary text-primary-fg shadow-sm"
                : "border border-line bg-surface text-muted hover:border-line-strong hover:text-accent",
            )}
          >
            {moduleGroups[g]}
          </button>
        ))}
      </div>

      {/* module grid — staggered numbering for an intentional rhythm */}
      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((m, i) => (
          <Link
            key={m.slug}
            href={`/modules/${m.slug}`}
            className="group flex h-full flex-col rounded-lg border border-line bg-surface p-5 shadow-sm transition-all hover:-translate-y-1 hover:border-line-strong hover:shadow-md"
          >
            <div className="flex items-start justify-between">
              <div className="grid h-10 w-10 place-items-center rounded-lg bg-primary text-primary-fg">
                <Icon name={m.icon} className="h-5 w-5" />
              </div>
              <span className="text-sm font-bold tabular-nums num text-faint">
                {String(i + 1).padStart(2, "0")}
              </span>
            </div>
            <h3 className="mt-4 text-lg font-bold text-ink">
              {m.name}
            </h3>
            <p className="mt-1.5 flex-1 text-sm leading-relaxed text-muted">
              {m.tagline}
            </p>
            <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-accent">
              Explore
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
