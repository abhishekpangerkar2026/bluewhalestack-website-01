import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";

const TILES = [
  {
    icon: "MoveRight",
    title: "Solutions",
    sub: "Navigate every cloud scenario",
    href: "/solutions",
  },
  {
    icon: "Layers",
    title: "Editions",
    sub: "Five editions, one platform",
    href: "/editions",
  },
  {
    icon: "Network",
    title: "Global network",
    sub: "4 regions, governed locally",
    href: "/#global-infrastructure",
  },
  {
    icon: "LayoutTemplate",
    title: "Explore the platform",
    sub: "11 modules, one control plane",
    href: "/platform",
  },
];

/** Huawei-style quick-link tile strip directly under the hero. */
export function QuickLinks() {
  return (
    <section className="border-b border-line bg-surface">
      <Container className="px-0">
        <div className="grid divide-y divide-line sm:grid-cols-2 sm:divide-y-0 lg:grid-cols-4 lg:divide-x">
          {TILES.map((t) => (
            <Link
              key={t.title}
              href={t.href}
              className="group flex items-center gap-4 px-5 py-6 transition-colors hover:bg-sunken"
            >
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-[var(--bg-active)] text-accent">
                <Icon name={t.icon} className="h-5 w-5" />
              </span>
              <div className="min-w-0">
                <div className="flex items-center gap-1 text-sm font-bold text-ink">
                  {t.title}
                  <ArrowRight className="h-3.5 w-3.5 text-accent transition-transform group-hover:translate-x-0.5" />
                </div>
                <div className="truncate text-xs text-muted">{t.sub}</div>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
