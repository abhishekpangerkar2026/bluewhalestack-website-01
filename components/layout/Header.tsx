"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Menu, X, ChevronDown, ArrowUpRight } from "lucide-react";
import { Logo } from "./Logo";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { ThemeToggle } from "./ThemeToggle";
import {
  primaryNav,
  utilityNav,
  type NavItem,
  type NavLink,
} from "@/content/company";
import { modulesBySlug } from "@/content/modules";
import { industriesBySlug } from "@/content/industries";
import { solutionsBySlug } from "@/content/solutions";
import { cn } from "@/lib/utils";

const EDITION_ICONS: Record<string, string> = {
  community: "Cloud",
  standard: "Cloud",
  enterprise: "Layers",
  "enterprise-plus": "Building2",
  sovereign: "Landmark",
};
const STATIC_ICONS: Record<string, string> = {
  "/platform": "Cloud",
  "/modules": "Boxes",
  "/editions": "Layers",
  "/pricing": "CreditCard",
  "/products/whaleforge": "Boxes",
  "/partners": "Handshake",
  "/about": "Building2",
  "/about#family": "Boxes",
  "/about/leadership": "Users",
  "/careers": "GraduationCap",
  "/newsroom": "ScrollText",
  "/contact": "Mail",
  "/resources": "FileCheck",
  "/docs": "ScrollText",
};

/** Resolve a lucide icon name for a nav link from content data. */
function iconForLink(l: NavLink): string {
  if (l.external) return "ArrowUpRight";
  const h = l.href;
  if (h.startsWith("/modules/")) return modulesBySlug[h.split("/")[2]]?.icon ?? "Boxes";
  if (h.startsWith("/editions/")) return EDITION_ICONS[h.split("/")[2]] ?? "Layers";
  if (h.startsWith("/industries/")) return industriesBySlug[h.split("/")[2]]?.icon ?? "Building2";
  if (h.startsWith("/solutions/")) return solutionsBySlug[h.split("/")[2]]?.icon ?? "Workflow";
  return STATIC_ICONS[h] ?? STATIC_ICONS[h.split("#")[0]] ?? "ArrowRight";
}

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  function openMenu(label: string) {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpen(label);
  }
  function scheduleClose() {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpen(null), 180);
  }

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b bg-surface/95 backdrop-blur transition-all duration-200",
        scrolled ? "border-line shadow-sm" : "border-line",
      )}
    >
      <div className="container-x relative flex h-16 items-center justify-between gap-4">
        <Logo />

        {/* Desktop primary nav */}
        <nav className="hidden lg:block" aria-label="Primary" onMouseLeave={scheduleClose}>
          <ul className="flex items-center gap-1">
            {primaryNav.map((item) => (
              <li key={item.label} onMouseEnter={() => openMenu(item.label)}>
                <Link
                  href={item.href}
                  className={cn(
                    "inline-flex items-center gap-1 whitespace-nowrap rounded-md px-2.5 py-2 text-sm font-medium transition-colors xl:px-3",
                    open === item.label
                      ? "bg-sunken text-ink"
                      : "text-muted hover:bg-sunken hover:text-ink",
                  )}
                  aria-haspopup={item.columns ? "true" : undefined}
                  aria-expanded={open === item.label}
                  onFocus={() => item.columns && openMenu(item.label)}
                  onClick={() => setOpen(null)}
                >
                  {item.label}
                  {item.columns && (
                    <ChevronDown
                      className={cn(
                        "h-3.5 w-3.5 opacity-60 transition-transform",
                        open === item.label && "rotate-180",
                      )}
                    />
                  )}
                </Link>
              </li>
            ))}
          </ul>

          {primaryNav.map(
            (item) =>
              item.columns &&
              open === item.label && (
                <MegaPanel
                  key={item.label}
                  item={item}
                  onEnter={() => openMenu(item.label)}
                  onClose={() => setOpen(null)}
                />
              ),
          )}
        </nav>

        {/* Right: utility + CTA */}
        <div className="hidden items-center gap-1 lg:flex">
          {utilityNav.map((u) => (
            <Link
              key={u.href}
              href={u.href}
              className="rounded-md px-3 py-2 text-sm font-medium text-muted hover:bg-sunken hover:text-ink"
            >
              {u.label}
            </Link>
          ))}
          <a
            href="https://app.bluewhalestack.com"
            className="rounded-md px-3 py-2 text-sm font-medium text-muted hover:bg-sunken hover:text-ink"
          >
            Login
          </a>
          <ThemeToggle className="ml-1" />
          <Button href="/contact" size="sm" className="ml-1">
            Book a demo
          </Button>
        </div>

        {/* Mobile toggle */}
        <div className="flex items-center gap-1 lg:hidden">
          <ThemeToggle />
          <button
            className="inline-flex h-10 w-10 items-center justify-center rounded-md text-ink hover:bg-sunken"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {mobileOpen && <MobileDrawer onNavigate={() => setMobileOpen(false)} />}
    </header>
  );
}

/* ── Desktop mega-menu panel ─────────────────────────────────── */
function MegaPanel({
  item,
  onEnter,
  onClose,
}: {
  item: NavItem;
  onEnter: () => void;
  onClose: () => void;
}) {
  return (
    <div onMouseEnter={onEnter} className="absolute left-0 right-0 top-full z-40 pt-3">
      <div className="animate-fade-up overflow-hidden rounded-xl border border-line bg-surface shadow-xl">
        <div className="grid grid-cols-4 divide-x divide-line">
          {item.columns!.map((col) => (
            <div key={col.heading} className={cn("p-4", col.featured && "bg-sunken")}>
              <p className="mb-2.5 px-2 text-[11px] font-semibold uppercase tracking-wider text-accent">
                {col.heading}
              </p>
              <ul className="space-y-0.5">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link
                      href={l.href}
                      onClick={onClose}
                      target={l.external ? "_blank" : undefined}
                      className="group flex items-start gap-3 rounded-lg px-2 py-2 transition-colors hover:bg-hover"
                    >
                      <span className="grid h-8 w-8 shrink-0 place-items-center rounded-md bg-sunken text-accent transition-colors group-hover:bg-primary group-hover:text-primary-fg">
                        <Icon name={iconForLink(l)} className="h-4 w-4" />
                      </span>
                      <span className="min-w-0">
                        <span className="flex items-center gap-1 text-sm font-medium text-ink group-hover:text-accent">
                          {l.label}
                          {l.external && <ArrowUpRight className="h-3 w-3 opacity-60" />}
                        </span>
                        {l.desc && <span className="block text-xs text-muted">{l.desc}</span>}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── Mobile drawer ───────────────────────────────────────────── */
function MobileDrawer({ onNavigate }: { onNavigate: () => void }) {
  const [openItem, setOpenItem] = useState<string | null>(null);
  return (
    <div className="border-t border-line bg-surface lg:hidden">
      <nav className="container-x max-h-[calc(100vh-4rem)] overflow-y-auto py-4">
        <ul className="flex flex-col">
          {primaryNav.map((item) => (
            <li key={item.label} className="border-b border-line">
              <button
                className="flex w-full items-center justify-between py-3 text-base font-semibold text-ink"
                onClick={() => setOpenItem((v) => (v === item.label ? null : item.label))}
                aria-expanded={openItem === item.label}
              >
                {item.label}
                <ChevronDown
                  className={cn(
                    "h-4 w-4 text-faint transition-transform",
                    openItem === item.label && "rotate-180",
                  )}
                />
              </button>
              {openItem === item.label && item.columns && (
                <div className="pb-3">
                  {item.columns.map((col) => (
                    <div key={col.heading} className="mb-3">
                      <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-accent">
                        {col.heading}
                      </p>
                      <ul className="space-y-0.5">
                        {col.links.map((l) => (
                          <li key={l.label}>
                            <Link
                              href={l.href}
                              onClick={onNavigate}
                              target={l.external ? "_blank" : undefined}
                              className="block rounded-md px-2 py-1.5 text-sm text-muted hover:bg-sunken hover:text-ink"
                            >
                              {l.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              )}
            </li>
          ))}
        </ul>

        <div className="mt-4 flex flex-col gap-1">
          {utilityNav.map((u) => (
            <Link
              key={u.href}
              href={u.href}
              onClick={onNavigate}
              className="rounded-md px-2 py-2 text-sm font-medium text-muted hover:bg-sunken hover:text-ink"
            >
              {u.label}
            </Link>
          ))}
          <a
            href="https://app.bluewhalestack.com"
            className="rounded-md px-2 py-2 text-sm font-medium text-muted hover:bg-sunken hover:text-ink"
          >
            Login
          </a>
        </div>

        <div className="mt-4">
          <Button href="/contact" className="w-full" onClick={onNavigate}>
            Book a demo
          </Button>
        </div>
      </nav>
    </div>
  );
}
