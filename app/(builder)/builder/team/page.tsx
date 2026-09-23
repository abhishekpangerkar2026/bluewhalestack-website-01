import Link from "next/link";
import { getSession } from "@/lib/builder/auth";
import { getStore } from "@/lib/builder/store";
import { TeamForms } from "./TeamForms";

export const dynamic = "force-dynamic";

export default async function TeamPage() {
  const [me, users] = await Promise.all([getSession(), getStore().listUsers()]);
  return (
    <main className="mx-auto max-w-3xl px-5 py-10 sm:px-8">
      <p className="eyebrow"><Link href="/builder" className="hover:text-accent">Website builder</Link> · Team</p>
      <h1 className="mt-2 text-3xl font-bold tracking-tight text-ink">Who can edit</h1>
      <p className="mt-1 text-sm text-muted">Editors can create, edit and publish pages. Administrators can also manage this list.</p>
      <TeamForms me={{ id: me!.id, role: me!.role }} users={users.map((u) => ({ id: u.id, name: u.name, email: u.email, role: u.role }))} />
    </main>
  );
}
