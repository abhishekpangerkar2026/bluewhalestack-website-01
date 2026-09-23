"use client";

import { useActionState } from "react";
import { login } from "@/lib/builder/actions";

export function LoginForm({ next }: { next: string }) {
  const [state, action, pending] = useActionState(async (_prev: { error?: string }, form: FormData) => login(form), {});
  return (
    <form action={action} className="mt-6 grid gap-3">
      <input type="hidden" name="next" value={next} />
      <label className="text-sm font-medium text-ink">Email<input name="email" type="email" required autoComplete="email" className="mt-1 h-11 w-full rounded-md border border-line px-3 text-sm font-normal" /></label>
      <label className="text-sm font-medium text-ink">Password<input name="password" type="password" required autoComplete="current-password" className="mt-1 h-11 w-full rounded-md border border-line px-3 text-sm font-normal" /></label>
      {state.error && <p className="text-sm text-red-600">{state.error}</p>}
      <button type="submit" disabled={pending} className="mt-2 h-11 rounded-md bg-primary text-sm font-semibold text-primary-fg disabled:opacity-60">{pending ? "Signing in…" : "Sign in"}</button>
    </form>
  );
}
