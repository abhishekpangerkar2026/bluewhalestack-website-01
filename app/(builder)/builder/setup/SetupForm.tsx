"use client";

import { useActionState } from "react";
import { setupFirstUser } from "@/lib/builder/actions";

export function SetupForm() {
  const [state, action, pending] = useActionState(async (_prev: { error?: string }, form: FormData) => setupFirstUser(form), {});
  return (
    <form action={action} className="mt-6 grid gap-3">
      <label className="text-sm font-medium text-ink">Your name<input name="name" required autoComplete="name" className="mt-1 h-11 w-full rounded-md border border-line px-3 text-sm font-normal" /></label>
      <label className="text-sm font-medium text-ink">Email<input name="email" type="email" required autoComplete="email" className="mt-1 h-11 w-full rounded-md border border-line px-3 text-sm font-normal" /></label>
      <label className="text-sm font-medium text-ink">Password (8+ characters)<input name="password" type="password" required minLength={8} autoComplete="new-password" className="mt-1 h-11 w-full rounded-md border border-line px-3 text-sm font-normal" /></label>
      {state.error && <p className="text-sm text-red-600">{state.error}</p>}
      <button type="submit" disabled={pending} className="mt-2 h-11 rounded-md bg-primary text-sm font-semibold text-primary-fg disabled:opacity-60">{pending ? "Creating…" : "Create account"}</button>
    </form>
  );
}
