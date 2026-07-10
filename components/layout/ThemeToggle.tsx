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
      aria-label="Toggle dark mode"
      className={
        "inline-grid h-9 w-9 place-items-center rounded-md text-muted transition-colors hover:bg-sunken hover:text-ink " +
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
