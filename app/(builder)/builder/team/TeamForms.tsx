"use client";

import { useActionState, useTransition } from "react";
import { Trash2 } from "lucide-react";
import { addUser, changePassword, removeUser } from "@/lib/builder/actions";

type U = { id: string; name: string; email: string; role: "admin" | "editor" };

export function TeamForms({ me, users }: { me: { id: string; role: "admin" | "editor" }; users: U[] }) {
  const [addState, addAction, adding] = useActionState(async (_p: { error?: string }, f: FormData) => addUser(f), {});
  const [pwState, pwAction, changing] = useActionState(async (_p: { error?: string; ok?: boolean }, f: FormData) => changePassword(f), {});
  const [pending, start] = useTransition();
  return (
    <div className="mt-8 grid gap-8">
      <section className="overflow-hidden rounded-xl border border-line bg-white shadow-sm">
        <table className="w-full text-sm">
          <thead><tr className="border-b border-line bg-sunken text-left text-xs uppercase tracking-wider text-faint"><th className="px-4 py-3">Name</th><th className="px-4 py-3">Email</th><th className="px-4 py-3">Role</th><th className="px-4 py-3" /></tr></thead>
          <tbody className="divide-y divide-line">
            {users.map((u) => (
              <tr key={u.id} className={pending ? "opacity-60" : undefined}>
                <td className="px-4 py-3 font-semibold text-ink">{u.name}{u.id === me.id && <span className="ml-2 text-xs font-normal text-faint">(you)</span>}</td>
                <td className="px-4 py-3 text-muted">{u.email}</td>
                <td className="px-4 py-3 text-muted">{u.role === "admin" ? "Administrator" : "Editor"}</td>
                <td className="px-4 py-3 text-right">
                  {me.role === "admin" && u.id !== me.id && (
                    <button type="button" onClick={() => { if (confirm(`Remove ${u.name}?`)) start(async () => { await removeUser(u.id); }); }} className="inline-flex items-center gap-1 rounded-md border border-line px-2.5 py-1.5 text-xs font-semibold text-red-700 hover:border-red-400"><Trash2 size={12} /> Remove</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {me.role === "admin" && (
        <section className="rounded-xl border border-line bg-white p-6 shadow-sm">
          <h2 className="text-lg font-bold text-ink">Add a colleague</h2>
          <form action={addAction} className="mt-4 grid gap-3 sm:grid-cols-2">
            <input name="name" required placeholder="Name" className="h-11 rounded-md border border-line px-3 text-sm" />
            <input name="email" type="email" required placeholder="Email" className="h-11 rounded-md border border-line px-3 text-sm" />
            <input name="password" type="password" required minLength={8} placeholder="Temporary password (8+ characters)" className="h-11 rounded-md border border-line px-3 text-sm" />
            <select name="role" className="h-11 rounded-md border border-line px-3 text-sm"><option value="editor">Editor</option><option value="admin">Administrator</option></select>
            {addState.error && <p className="text-sm text-red-600 sm:col-span-2">{addState.error}</p>}
            <button type="submit" disabled={adding} className="h-11 rounded-md bg-primary px-5 text-sm font-semibold text-primary-fg disabled:opacity-60 sm:col-span-2">{adding ? "Adding…" : "Add"}</button>
          </form>
          <p className="mt-2 text-xs text-faint">Share the temporary password privately; they can change it below after signing in.</p>
        </section>
      )}

      <section className="rounded-xl border border-line bg-white p-6 shadow-sm">
        <h2 className="text-lg font-bold text-ink">Change your password</h2>
        <form action={pwAction} className="mt-4 flex flex-wrap gap-3">
          <input name="password" type="password" required minLength={8} placeholder="New password (8+ characters)" className="h-11 flex-1 rounded-md border border-line px-3 text-sm" />
          <button type="submit" disabled={changing} className="h-11 rounded-md border border-line bg-white px-5 text-sm font-semibold text-ink hover:border-accent disabled:opacity-60">{changing ? "Saving…" : "Save"}</button>
        </form>
        {pwState.error && <p className="mt-2 text-sm text-red-600">{pwState.error}</p>}
        {pwState.ok && <p className="mt-2 text-sm text-emerald-700">Password changed.</p>}
      </section>
    </div>
  );
}
