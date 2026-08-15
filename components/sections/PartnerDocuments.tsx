"use client";

import { useEffect, useState } from "react";
import { Download, Loader2, Lock, X } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { programDocuments, tracks } from "@/content/partners";

const UNLOCK_KEY = "bws_partner_doc_unlocked";

const inputCls =
  "h-11 w-full rounded-lg border border-line bg-surface px-3 text-sm text-ink placeholder:text-faint focus:border-accent focus:outline-none focus:ring-2 focus:ring-[var(--bg-active)]";
const labelCls = "mb-1.5 block text-sm font-medium text-ink";

function triggerDownload(url: string) {
  const a = document.createElement("a");
  a.href = url;
  a.download = "";
  document.body.appendChild(a);
  a.click();
  a.remove();
}

/** Gated PDF program guides — one per partner track, same pattern as the Trust Center certificate vault. */
export function PartnerDocuments() {
  const [unlocked, setUnlocked] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const [pendingDocId, setPendingDocId] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (sessionStorage.getItem(UNLOCK_KEY) === "1") setUnlocked(true);
  }, []);

  function openGate(docId: string) {
    if (unlocked) {
      triggerDownload(`/api/partners/document/${docId}`);
      return;
    }
    setPendingDocId(docId);
    setError("");
    setFormOpen(true);
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    const fd = new FormData(e.currentTarget);
    const payload = Object.fromEntries(fd.entries());
    payload.consent = fd.get("consent") ? "true" : "";
    payload.docId = pendingDocId ?? "";
    try {
      const res = await fetch("/api/partners/document-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json();
      if (!res.ok || !json.ok) {
        setError(json.error ?? "Something went wrong. Please try again.");
        setSubmitting(false);
        return;
      }
      setUnlocked(true);
      sessionStorage.setItem(UNLOCK_KEY, "1");
      setFormOpen(false);
      setSubmitting(false);
      if (pendingDocId) triggerDownload(`/api/partners/document/${pendingDocId}`);
    } catch {
      setError("Network error. Please try again.");
      setSubmitting(false);
    }
  }

  return (
    <section id="documents" className="scroll-mt-24 bg-sunken py-24 sm:py-32">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="Program guides"
            title="Download the full program guide for your track"
            description="Each PDF covers the commercial model, benefits and onboarding journey — the LSP guide also includes the full margin-tier table."
          />
        </Reveal>

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {programDocuments.map((doc, i) => {
            const track = tracks.find((t) => t.slug === doc.trackSlug);
            return (
              <Reveal key={doc.id} delay={i * 80}>
                <Card className="flex h-full flex-col">
                  <span className="grid h-11 w-11 place-items-center rounded-lg bg-primary text-primary-fg">
                    <Icon name={track?.icon ?? "FileText"} className="h-5 w-5" />
                  </span>
                  <h3 className="mt-5 text-lg font-bold text-ink">{doc.title}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
                    {doc.summary}
                  </p>
                  <button
                    type="button"
                    onClick={() => openGate(doc.id)}
                    className="mt-5 inline-flex items-center justify-center gap-2 rounded-md border border-line-strong px-4 py-2.5 text-sm font-semibold text-ink transition-colors hover:border-accent hover:text-accent"
                  >
                    {unlocked ? (
                      <Download className="h-4 w-4" />
                    ) : (
                      <Lock className="h-4 w-4" />
                    )}
                    Download PDF
                  </button>
                </Card>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={200}>
          <p className="mt-8 text-sm text-faint">
            Margin and commitment figures in the LSP guide are illustrative —
            final terms are confirmed in your signed Partner Agreement.
          </p>
        </Reveal>
      </Container>

      {/* Gate form */}
      {formOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          onClick={() => !submitting && setFormOpen(false)}
        >
          <div
            className="w-full max-w-md rounded-2xl border border-line bg-surface p-6 shadow-lg sm:p-7"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-5 flex items-start justify-between">
              <div>
                <h3 className="text-lg font-bold text-ink">Download program guide</h3>
                <p className="mt-1 text-sm text-muted">
                  Tell us a bit about you — we&apos;ll also send a copy to your inbox.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setFormOpen(false)}
                aria-label="Close"
                className="text-faint hover:text-ink"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={onSubmit}>
              {/* honeypot */}
              <input
                type="text"
                name="company_website"
                tabIndex={-1}
                autoComplete="off"
                className="hidden"
                aria-hidden
              />

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className={labelCls} htmlFor="pd-firstName">
                    First name *
                  </label>
                  <input id="pd-firstName" name="firstName" required className={inputCls} />
                </div>
                <div>
                  <label className={labelCls} htmlFor="pd-lastName">
                    Last name *
                  </label>
                  <input id="pd-lastName" name="lastName" required className={inputCls} />
                </div>
              </div>
              <div className="mt-4">
                <label className={labelCls} htmlFor="pd-email">
                  Work email *
                </label>
                <input id="pd-email" name="email" type="email" required className={inputCls} />
              </div>
              <div className="mt-4">
                <label className={labelCls} htmlFor="pd-company">
                  Company *
                </label>
                <input id="pd-company" name="company" required className={inputCls} />
              </div>

              <label className="mt-4 flex items-start gap-2.5 text-xs text-muted">
                <input
                  type="checkbox"
                  name="consent"
                  required
                  className="mt-0.5 h-4 w-4 rounded border-line text-accent focus:ring-accent"
                />
                <span>I agree to be contacted about BlueWhale Stack and accept the privacy policy. *</span>
              </label>

              {error && (
                <p className="mt-4 rounded-lg bg-[var(--warning-bg)] px-3 py-2 text-sm text-[var(--warning-fg)]">
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={submitting}
                className="mt-5 inline-flex h-11 w-full items-center justify-center gap-2 rounded-md bg-primary px-6 text-sm font-semibold text-primary-fg transition-colors hover:bg-[var(--primary-hover)] disabled:opacity-60"
              >
                {submitting && <Loader2 className="h-4 w-4 animate-spin" />}
                {submitting ? "Unlocking…" : "Unlock & download"}
              </button>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}
