"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { modules, moduleGroups, type ModuleGroup } from "@/content/modules";

const GROUP_ORDER: ModuleGroup[] = [
  "foundation",
  "operations",
  "builder",
  "datacenter",
  "ai",
];

/** Clean, product-matched icon tile — consistent accent per category. */
const GROUP_COLOR: Record<ModuleGroup, string> = {
  foundation: "bg-[var(--bg-active)] text-accent ring-line",
  operations: "bg-[var(--bg-active)] text-accent ring-line",
  builder: "bg-[var(--bg-active)] text-accent ring-line",
  datacenter: "bg-[var(--bg-active)] text-accent ring-line",
  ai: "bg-[var(--bg-active)] text-accent ring-line",
};

/** Curated "Featured" set — a spread across all groups. */
const FEATURED = [
  "cloud-connectors",
  "finops",
  "security-compliance",
  "inventory",
  "migration",
  "itsm",
  "dcim",
  "whale-ai",
];

type Tab = "featured" | ModuleGroup;

const TABS: { key: Tab; label: string }[] = [
  { key: "featured", label: "Featured" },
  ...GROUP_ORDER.map((g) => ({ key: g, label: moduleGroups[g] })),
];

export function ProductCatalog() {
  const [tab, setTab] = useState<Tab>("featured");

  const visible =
    tab === "featured"
      ? FEATURED.map((s) => modules.find((m) => m.slug === s)).filter(
          (m): m is NonNullable<typeof m> => Boolean(m),
        )
      : modules.filter((m) => m.group === tab);

  return (
    <section className="bg-sunken py-24 sm:py-32">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="The platform"
            title={
              <>
                Seventeen modules.
                <br />
                <span className="text-faint">One control plane.</span>
              </>
            }
            description="Adopt what you need today, switch on the rest as you grow. Every module shares one identity, one audit trail, and one data tier."
          />
        </Reveal>

        {/* Tabs — left-aligned, magazine-style filter row */}
        <Reveal delay={60}>
          <div className="mt-12 flex flex-wrap gap-x-7 gap-y-2 border-b border-line">
            {TABS.map((t) => {
              const active = t.key === tab;
              return (
                <button
                  key={t.key}
                  type="button"
                  onClick={() => setTab(t.key)}
                  className={`relative -mb-px border-b-2 px-1 pb-3 text-sm font-semibold transition-colors ${
                    active
                      ? "border-primary text-accent"
                      : "border-transparent text-muted hover:text-ink"
                  }`}
                >
                  {t.label}
                </button>
              );
            })}
          </div>
        </Reveal>

        {/* Cards — first tile spans two columns to break the uniform grid */}
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {visible.map((m, i) => {
            const featured = i === 0;
            return (
              <Reveal key={m.slug} delay={(i % 4) * 60}>
                <Link
                  href={`/modules/${m.slug}`}
                  className={`group flex h-full flex-col rounded-lg border border-line bg-surface p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:border-line-strong hover:shadow-md ${
                    featured ? "sm:col-span-2 sm:p-7" : ""
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <span
                      className={`grid place-items-center rounded-xl ring-1 ring-inset ${GROUP_COLOR[m.group]} ${
                        featured ? "h-14 w-14" : "h-12 w-12"
                      }`}
                    >
                      <Icon name={m.icon} className={featured ? "h-7 w-7" : "h-6 w-6"} />
                    </span>
                    <ArrowUpRight className="h-4 w-4 text-faint transition-colors group-hover:text-accent" />
                  </div>
                  <h3
                    className={`mt-4 font-bold text-ink ${
                      featured ? "text-2xl" : "text-base"
                    }`}
                  >
                    {m.name}
                  </h3>
                  <p
                    className={`mt-1.5 flex-1 leading-relaxed text-muted ${
                      featured ? "max-w-md text-base" : "text-sm"
                    }`}
                  >
                    {m.tagline}
                  </p>
                  <span className="mt-3 text-[11px] font-semibold uppercase tracking-wider text-faint">
                    {moduleGroups[m.group]}
                  </span>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
