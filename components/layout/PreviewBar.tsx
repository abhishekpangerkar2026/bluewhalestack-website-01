"use client";

import { VisualEditing } from "@sanity/visual-editing/react";
import { useRouter } from "next/navigation";

/**
 * Shown only in draft mode: the click-to-edit overlays that talk to the
 * Studio's Presentation tool (re-rendering the page on every edit), plus a
 * small badge to leave preview.
 */
export function PreviewBar() {
  const router = useRouter();
  return (
    <>
      <VisualEditing
        portal={false}
        zIndex={70}
        refresh={async () => {
          router.refresh();
        }}
      />
      <a
        href="/api/draft-mode/disable"
        className="fixed bottom-4 left-4 z-[60] inline-flex items-center gap-2 rounded-full border border-[var(--gold)] bg-[var(--brand-deep)] px-3.5 py-2 text-[11px] font-bold uppercase tracking-[0.12em] text-white shadow-lg"
      >
        <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-[var(--gold)]" />
        Preview · exit
      </a>
    </>
  );
}
