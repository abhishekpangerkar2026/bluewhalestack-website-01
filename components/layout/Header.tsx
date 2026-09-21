"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight, ArrowUpRight, ChevronDown, Menu, X } from "lucide-react";
import { Logo } from "./Logo";
import { ThemeToggle } from "./ThemeToggle";
import { Button } from "@/components/ui/Button";
import { primaryNav, utilityNav, type NavItem } from "@/content/company";
import { cn } from "@/lib/utils";

const menuId = (label: string) => `navigation-${label.toLowerCase().replace(/\s+/g, "-")}`;
const focusable = 'a[href], button:not([disabled]), input:not([disabled]), [tabindex="0"]';

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const rootRef = useRef<HTMLElement>(null);
  const mobileToggle = useRef<HTMLButtonElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setOpen(null); setMobileOpen(false); }, [pathname]);

  useEffect(() => {
    const outside = (event: PointerEvent) => { if (!rootRef.current?.contains(event.target as Node)) setOpen(null); };
    document.addEventListener("pointerdown", outside);
    return () => {
      document.removeEventListener("pointerdown", outside);
    };
  }, []);

  useEffect(() => {
    if (!mobileOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    drawerRef.current?.querySelector<HTMLElement>(focusable)?.focus();
    const media = window.matchMedia("(min-width: 1280px)");
    const onResize = () => { if (media.matches) setMobileOpen(false); };
    media.addEventListener("change", onResize);
    return () => {
      document.body.style.overflow = previousOverflow;
      media.removeEventListener("change", onResize);
    };
  }, [mobileOpen]);

  function closeMobile() { setMobileOpen(false); mobileToggle.current?.focus(); }

  return (
    <header ref={rootRef} className={cn("site-header sticky top-0 z-50 border-b border-line bg-surface/95 backdrop-blur-xl transition-shadow duration-300", scrolled && "shadow-md")}>
      <div className="container-x relative flex h-16 items-center justify-between gap-5">
        <div className="shrink-0"><Logo className="!h-9 sm:!h-10" /></div>
        <nav aria-label="Primary navigation" className="hidden xl:block">
          <ul className="flex items-center gap-0.5">
            {primaryNav.map((item) => (
              <li key={item.label}
                onBlur={(event) => { if (!event.currentTarget.contains(event.relatedTarget as Node)) setOpen(null); }}
                onKeyDown={(event) => {
                  if (event.key === "Escape") {
                    setOpen(null);
                    event.currentTarget.querySelector<HTMLButtonElement>("button")?.focus();
                    event.stopPropagation();
                  }
                }}
              >
                {item.columns ? (
                  <button type="button"
                    className={cn("flex h-10 items-center gap-1.5 rounded-md px-2.5 text-[13px] font-medium transition-colors", open === item.label ? "bg-sunken text-ink" : "text-muted hover:text-ink")}
                    aria-expanded={open === item.label} aria-controls={menuId(item.label)}
                    onClick={() => setOpen(open === item.label ? null : item.label)}
                    onKeyDown={(event) => {
                      if (event.key === "ArrowDown") {
                        event.preventDefault(); setOpen(item.label);
                        requestAnimationFrame(() => document.getElementById(menuId(item.label))?.querySelector<HTMLAnchorElement>("a")?.focus());
                      }
                    }}
                  >{item.label}<ChevronDown aria-hidden className={cn("h-3 w-3 text-faint transition-transform", open === item.label && "rotate-180")} /></button>
                ) : <Link href={item.href} className="inline-flex h-10 items-center px-3 text-[13px] font-medium text-muted hover:text-ink">{item.label}</Link>}
                {item.columns && open === item.label && <MegaPanel item={item} onNavigate={() => setOpen(null)} />}
              </li>
            ))}
          </ul>
        </nav>
        <div className="hidden items-center gap-5 xl:flex">
          <nav aria-label="Resources" className="flex items-center gap-4">
            {utilityNav.map((item) => <Link key={item.href} href={item.href} className="text-[12px] font-medium text-muted transition-colors hover:text-ink">{item.label}</Link>)}
          </nav>
          <div className="flex items-center gap-3 border-l border-line pl-4">
            <a href="https://app.bluewhalestack.com" className="text-[12px] font-medium text-muted hover:text-ink">Log in</a>
            <ThemeToggle />
            <Button href="/contact?intent=demo" size="sm">Book a demo <ArrowUpRight aria-hidden className="h-3.5 w-3.5" /></Button>
          </div>
        </div>
        <div className="flex items-center gap-2 xl:hidden">
          <ThemeToggle />
          <button ref={mobileToggle} type="button" aria-label={mobileOpen ? "Close navigation" : "Open navigation"} aria-expanded={mobileOpen} aria-controls="mobile-navigation" onClick={() => setMobileOpen((value) => !value)} className="grid h-11 w-11 place-items-center rounded-lg border border-line text-ink transition-colors hover:bg-sunken">{mobileOpen ? <X aria-hidden className="h-5 w-5" /> : <Menu aria-hidden className="h-5 w-5" />}</button>
        </div>
      </div>
      {mobileOpen && (
        <div ref={drawerRef} id="mobile-navigation" role="dialog" aria-modal="true" aria-label="Website navigation" className="fixed inset-x-0 top-16 h-[calc(100dvh-4rem)] overflow-y-auto border-t border-line bg-surface xl:hidden"
          onKeyDown={(event) => {
            if (event.key === "Escape") { event.preventDefault(); closeMobile(); }
            if (event.key === "Tab") {
              const elements = Array.from(event.currentTarget.querySelectorAll<HTMLElement>(focusable)).filter((element) => element.getClientRects().length > 0);
              const first = elements[0], last = elements[elements.length - 1];
              if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
              if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
            }
          }}
        ><MobileDrawer onNavigate={closeMobile} /></div>
      )}
    </header>
  );
}

function MegaPanel({ item, onNavigate }: { item: NavItem; onNavigate: () => void }) {
  return (
    <div id={menuId(item.label)} className="absolute inset-x-5 top-full pt-3">
      <div className="overflow-hidden rounded-md border border-line bg-surface shadow-lg">
        <div className="flex items-center justify-between border-b border-line bg-sunken px-7 py-3.5">
          <span className="eyebrow text-faint">Explore {item.label}</span>
          <Link href={item.href} onClick={onNavigate} className="inline-flex items-center gap-2 text-xs font-semibold text-accent">{item.label} overview <ArrowRight aria-hidden className="h-3.5 w-3.5" /></Link>
        </div>
        <div className="grid grid-cols-4 divide-x divide-line p-3">
          {item.columns!.map((column) => (
            <div key={column.heading} className={cn("p-4", column.featured && "rounded bg-sunken")}>
              <h2 className="mb-3 px-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-faint">{column.heading}</h2>
              <ul className="space-y-1">
                {column.links.map((link) => (
                  <li key={link.label}><Link href={link.href} target={link.external ? "_blank" : undefined} rel={link.external ? "noopener noreferrer" : undefined} onClick={onNavigate} className="group block rounded-lg px-2 py-2.5 transition-colors hover:bg-sunken">
                    <span className="flex items-center gap-1.5 text-[13px] font-semibold leading-snug text-ink group-hover:text-accent">{link.label}{link.external && <ArrowUpRight aria-hidden className="h-3 w-3" />}</span>
                    {link.desc && <span className="mt-1 block text-[11px] leading-relaxed text-muted">{link.desc}</span>}
                  </Link></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function MobileDrawer({ onNavigate }: { onNavigate: () => void }) {
  const [openItem, setOpenItem] = useState<string | null>(null);
  return (
    <div className="container-x pb-10 pt-4">
      <div className="mb-2 flex items-center justify-between"><p className="eyebrow text-faint">Explore BlueWhale Stack</p><button type="button" onClick={onNavigate} aria-label="Close navigation" className="grid h-10 w-10 place-items-center rounded-lg hover:bg-sunken"><X aria-hidden className="h-5 w-5" /></button></div>
      <nav aria-label="Mobile primary navigation"><ul>
        {primaryNav.map((item) => (
          <li key={item.label} className="border-b border-line">
            <div className="flex items-center justify-between py-2">
              <Link href={item.href} onClick={onNavigate} className="py-3 font-display text-lg font-semibold text-ink">{item.label}</Link>
              {item.columns && <button type="button" aria-label={`Show ${item.label} links`} aria-expanded={openItem === item.label} aria-controls={`mobile-${menuId(item.label)}`} onClick={() => setOpenItem(openItem === item.label ? null : item.label)} className="grid h-11 w-11 place-items-center rounded-lg bg-sunken text-muted"><ChevronDown aria-hidden className={cn("h-4 w-4 transition-transform", openItem === item.label && "rotate-180")} /></button>}
            </div>
            {openItem === item.label && item.columns && <div id={`mobile-${menuId(item.label)}`} className="grid gap-6 pb-6 pt-2 sm:grid-cols-2">
              {item.columns.map((column) => <div key={column.heading}><p className="eyebrow mb-2 text-faint">{column.heading}</p><ul>{column.links.map((link) => <li key={link.label}><Link href={link.href} onClick={onNavigate} target={link.external ? "_blank" : undefined} rel={link.external ? "noopener noreferrer" : undefined} className="flex items-center gap-1.5 rounded-lg py-2 text-sm text-muted hover:text-accent">{link.label}{link.external && <ArrowUpRight aria-hidden className="h-3 w-3" />}</Link></li>)}</ul></div>)}
            </div>}
          </li>
        ))}
      </ul></nav>
      <div className="my-6 flex flex-wrap gap-x-7 gap-y-4">{utilityNav.map((item) => <Link key={item.href} href={item.href} onClick={onNavigate} className="text-sm font-medium text-muted">{item.label}</Link>)}<a href="https://app.bluewhalestack.com" className="text-sm font-medium text-muted">Log in <ArrowUpRight aria-hidden className="inline h-3.5 w-3.5" /></a></div>
      <Button href="/contact?intent=demo" onClick={onNavigate} size="lg" className="w-full">Book a demo <ArrowUpRight aria-hidden className="h-4 w-4" /></Button>
    </div>
  );
}
