"use client";

import { useEffect } from "react";

/** Hides header, footer, chat widget and dev overlays so only the document prints. */
export function PrintChrome() {
  useEffect(() => {
    document.body.querySelectorAll<HTMLElement>(":scope > *:not(main)").forEach((el) => { el.style.display = "none"; });
    const main = document.body.querySelector<HTMLElement>(":scope > main");
    if (main) { main.style.padding = "0"; main.style.margin = "0"; }
    document.documentElement.setAttribute("data-theme", "light");
    document.body.style.background = "#ffffff";
    document.body.classList.add("printing-document");
  }, []);
  return null;
}
