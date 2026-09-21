"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

/** Light/dark toggle — persists to localStorage 'bws-theme', mirrors the product app. */
export function ThemeToggle({ className }: { className?: string }) {
  const [dark, setDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored = (() => {
      try {
        return localStorage.getItem("bws-theme");
      } catch {
        return null;
      }
    })();
    const prefersDark =
      window.matchMedia("(prefers-color-scheme: dark)").matches;
    setDark(stored ? stored === "dark" : prefersDark);
    const observer = new MutationObserver(() => {
      const current = document.documentElement.getAttribute("data-theme");
      setDark(current ? current === "dark" : window.matchMedia("(prefers-color-scheme: dark)").matches);
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    return () => observer.disconnect();
  }, []);

  function toggle() {
    const next = !dark;
    setDark(next);
    const theme = next ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", theme);
    try {
      localStorage.setItem("bws-theme", theme);
    } catch {
      /* ignore */
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={dark ? "Switch to light appearance" : "Switch to dark appearance"}
      aria-pressed={dark}
      className={
        "inline-grid h-10 w-10 shrink-0 place-items-center rounded-lg text-muted transition-colors hover:bg-sunken hover:text-ink " +
        (className ?? "")
      }
    >
      {mounted && dark ? (
        <Sun className="h-4.5 w-4.5" />
      ) : (
        <Moon className="h-[18px] w-[18px]" />
      )}
    </button>
  );
}
