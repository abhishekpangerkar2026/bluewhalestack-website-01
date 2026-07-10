"use client";

import { useState } from "react";
import { Check, Loader2 } from "lucide-react";

export function NewsletterForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "done" | "error">("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const email = new FormData(e.currentTarget).get("email");
    setStatus("submitting");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      setStatus(res.ok ? "done" : "error");
    } catch {
      setStatus("error");
    }
  }

  if (status === "done") {
    return (
      <p className="mt-6 inline-flex items-center gap-2 text-sm text-emerald-300">
        <Check className="h-4 w-4" /> You&apos;re subscribed — thanks!
      </p>
    );
  }

  return (
    <form className="mt-6" onSubmit={onSubmit}>
      <label className="text-xs font-semibold uppercase tracking-wider text-slate-500">
        Cloud insights, monthly
      </label>
      <div className="mt-2 flex gap-2">
        <input
          type="email"
          name="email"
          required
          placeholder="you@company.com"
          className="h-10 w-full rounded-lg border border-white/10 bg-white/5 px-3 text-sm text-white placeholder:text-slate-500 focus:border-brand-400 focus:outline-none"
        />
        <button
          type="submit"
          disabled={status === "submitting"}
          className="inline-flex h-10 shrink-0 items-center gap-1.5 rounded-lg bg-brand-600 px-4 text-sm font-medium text-white transition-colors hover:bg-brand-500 disabled:opacity-60"
        >
          {status === "submitting" && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
          Subscribe
        </button>
      </div>
      {status === "error" && (
        <p className="mt-2 text-xs text-red-300">Please enter a valid email.</p>
      )}
    </form>
  );
}
