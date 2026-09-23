import Link from "next/link";
import { AlertTriangle, ExternalLink, FilePlus2, Pencil, Users } from "lucide-react";
import { getStore } from "@/lib/builder/store";
import { getSession } from "@/lib/builder/auth";
import { createPage, logout } from "@/lib/builder/actions";
import { PageRow } from "./PageRow";
import { SITE_ROUTES } from "@/lib/builder/routes";

export const dynamic = "force-dynamic";

const when = (iso?: string) => (iso ? new Date(iso).toLocaleString("en-GB", { day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit" }) : "—");

export default async function BuilderHome({ searchParams }: { searchParams: Promise<{ missing?: string; error?: string }> }) {
  const [session, pages, { missing, error }] = await Promise.all([getSession(), getStore().listPages(), searchParams]);
  const store = getStore();
  const built = new Set(pages.map((p) => p.path));
  return (
    <main className="mx-auto max-w-5xl px-5 py-10 sm:px-8">
      <header className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="eyebrow">Website builder</p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-ink">Pages</h1>
          <p className="mt-1 text-sm text-muted">Signed in as {session?.name} · <Link href="/builder/team" className="font-semibold text-accent">Team</Link> · <Link href="/" className="font-semibold text-accent">Open the website ↗</Link></p>
        </div>
        <form action={logout}><button type="submit" className="rounded-md border border-line bg-white px-3 py-2 text-sm font-medium text-ink hover:border-accent">Sign out</button></form>
      </header>

      {!store.persistent && (
        <div className="mt-6 flex items-start gap-3 rounded-lg border border-amber-300 bg-amber-50 p-4 text-sm text-amber-900">
          <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
          <p><strong>Temporary storage.</strong> Pages and uploads are being kept on the server's disk and will be lost on the next deployment. Connect the CMS write token (SANITY_API_WRITE_TOKEN) to store them permanently.</p>
        </div>
      )}
      {error && <p className="mt-6 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">{error}</p>}
      {missing && <p className="mt-6 rounded-lg border border-line bg-white p-4 text-sm text-muted">No page exists at <code>{missing}</code> yet — create it below.</p>}

      <section className="mt-8 rounded-xl border border-line bg-white p-6 shadow-sm">
        <h2 className="flex items-center gap-2 text-lg font-bold text-ink"><FilePlus2 className="h-5 w-5 text-accent" /> New page</h2>
        <form action={createPage} className="mt-4 grid gap-3 sm:grid-cols-[1fr_1fr_auto]">
          <input name="title" required placeholder="Page title, e.g. Webinars" className="h-11 rounded-md border border-line px-3 text-sm" />
          <input name="path" required placeholder="Address, e.g. /webinars" className="h-11 rounded-md border border-line px-3 text-sm" />
          <button type="submit" className="h-11 rounded-md bg-primary px-5 text-sm font-semibold text-primary-fg hover:bg-[var(--primary-hover)]">Create &amp; open</button>
        </form>
        <p className="mt-2 text-xs text-faint">Use an existing address (for example <code>/about</code>) to take over that page: the moment you publish, your version replaces the coded one; unpublish to hand it back.</p>
      </section>

      <section className="mt-8">
        <h2 className="text-lg font-bold text-ink">Your pages</h2>
        {pages.length === 0 ? (
          <p className="mt-3 text-sm text-muted">Nothing yet. Create a page above.</p>
        ) : (
          <div className="mt-3 overflow-hidden rounded-xl border border-line bg-white shadow-sm">
            <table className="w-full text-sm">
              <thead><tr className="border-b border-line bg-sunken text-left text-xs uppercase tracking-wider text-faint"><th className="px-4 py-3">Page</th><th className="px-4 py-3">Status</th><th className="px-4 py-3">Last change</th><th className="px-4 py-3 text-right">Actions</th></tr></thead>
              <tbody className="divide-y divide-line">
                {pages.map((p) => (
                  <PageRow key={p.path} path={p.path} title={p.title} published={Boolean(p.published)} draftAhead={Boolean(p.draft) && JSON.stringify(p.draft) !== JSON.stringify(p.published)} updated={when(p.updatedAt)} updatedBy={p.updatedBy} />
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      <section className="mt-10">
        <h2 className="text-lg font-bold text-ink">Website pages</h2>
        <p className="mt-1 text-sm text-muted">Every page the site has today. Take one over to redesign it here; the rest keep working as they are (and stay editable in the CMS).</p>
        <ul className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {SITE_ROUTES.map((r) => (
            <li key={r.path} className="flex items-center justify-between gap-3 rounded-lg border border-line bg-white px-4 py-3 text-sm">
              <div className="min-w-0"><p className="truncate font-semibold text-ink">{r.title}</p><p className="truncate text-xs text-faint">{r.path}</p></div>
              {built.has(r.path) ? (
                <Link href={`/builder/edit?path=${encodeURIComponent(r.path)}`} className="inline-flex shrink-0 items-center gap-1 text-xs font-semibold text-accent"><Pencil size={12} /> Edit</Link>
              ) : (
                <form action={createPage}><input type="hidden" name="title" value={r.title} /><input type="hidden" name="path" value={r.path} /><button type="submit" className="inline-flex shrink-0 items-center gap-1 text-xs font-semibold text-muted hover:text-accent"><FilePlus2 size={12} /> Take over</button></form>
              )}
            </li>
          ))}
        </ul>
      </section>

      <p className="mt-10 inline-flex items-center gap-2 text-xs text-faint"><Users size={12} /> Add colleagues under <Link href="/builder/team" className="font-semibold text-accent">Team</Link>. Catalog content (editions, modules, industries, people, certifications) is still edited in the CMS <a href="https://bluewhalestack.sanity.studio" target="_blank" rel="noopener" className="inline-flex items-center gap-1 font-semibold text-accent">Studio <ExternalLink size={11} /></a>.</p>
    </main>
  );
}
