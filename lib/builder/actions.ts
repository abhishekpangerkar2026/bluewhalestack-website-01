"use server";

import { revalidatePath, revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { randomBytes } from "node:crypto";
import type { Data } from "@puckeditor/core";
import { getStore } from "./store";
import { getSession, hashPassword, requireSession, verifyPassword } from "./auth";
import { SESSION_COOKIE, SESSION_DAYS, signSession } from "./session";
import { emptyPage, normalizePath, type PageRecord, type UserRole } from "./types";
import { importPage } from "./import";
import { SITE_ROUTES } from "./routes";

const now = () => new Date().toISOString();

function revalidate(path: string) {
  revalidateTag("builder");
  revalidateTag(`builder:${path}`);
  revalidatePath(path);
  revalidatePath("/sitemap.xml");
}

async function setCookie(token: string) {
  const jar = await cookies();
  jar.set(SESSION_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: SESSION_DAYS * 86400,
  });
}

// ── accounts ────────────────────────────────────────────────────
export async function hasUsers(): Promise<boolean> {
  return (await getStore().listUsers()).length > 0;
}

/** First run: the first account becomes the administrator. */
export async function setupFirstUser(form: FormData): Promise<{ error?: string }> {
  if (await hasUsers()) return { error: "The builder is already set up — sign in instead." };
  const name = String(form.get("name") ?? "").trim();
  const email = String(form.get("email") ?? "").trim().toLowerCase();
  const password = String(form.get("password") ?? "");
  if (!name || !email || password.length < 8) return { error: "Name, email and a password of at least 8 characters are required." };
  const user = { id: randomBytes(8).toString("hex"), name, email, role: "admin" as UserRole, passwordHash: hashPassword(password), createdAt: now() };
  await getStore().saveUser(user);
  await setCookie(await signSession({ id: user.id, name, email, role: "admin" }));
  redirect("/builder");
}

export async function login(form: FormData): Promise<{ error?: string }> {
  const email = String(form.get("email") ?? "").trim().toLowerCase();
  const password = String(form.get("password") ?? "");
  const next = String(form.get("next") ?? "/builder");
  const user = (await getStore().listUsers()).find((u) => u.email === email);
  if (!user || !verifyPassword(password, user.passwordHash)) return { error: "Wrong email or password." };
  await setCookie(await signSession({ id: user.id, name: user.name, email: user.email, role: user.role }));
  redirect(next.startsWith("/builder") ? next : "/builder");
}

export async function logout(): Promise<void> {
  const jar = await cookies();
  jar.delete(SESSION_COOKIE);
  redirect("/builder/login");
}

export async function addUser(form: FormData): Promise<{ error?: string }> {
  const me = await requireSession();
  if (me.role !== "admin") return { error: "Only an administrator can add people." };
  const name = String(form.get("name") ?? "").trim();
  const email = String(form.get("email") ?? "").trim().toLowerCase();
  const password = String(form.get("password") ?? "");
  const role = (String(form.get("role") ?? "editor") === "admin" ? "admin" : "editor") as UserRole;
  if (!name || !email || password.length < 8) return { error: "Name, email and a password of at least 8 characters are required." };
  const store = getStore();
  if ((await store.listUsers()).some((u) => u.email === email)) return { error: "That email already has an account." };
  await store.saveUser({ id: randomBytes(8).toString("hex"), name, email, role, passwordHash: hashPassword(password), createdAt: now() });
  revalidatePath("/builder/team");
  return {};
}

export async function removeUser(id: string): Promise<{ error?: string }> {
  const me = await requireSession();
  if (me.role !== "admin") return { error: "Only an administrator can remove people." };
  if (me.id === id) return { error: "You cannot remove your own account." };
  await getStore().deleteUser(id);
  revalidatePath("/builder/team");
  return {};
}

export async function changePassword(form: FormData): Promise<{ error?: string; ok?: boolean }> {
  const me = await requireSession();
  const password = String(form.get("password") ?? "");
  if (password.length < 8) return { error: "Use at least 8 characters." };
  const store = getStore();
  const user = (await store.listUsers()).find((u) => u.id === me.id);
  if (!user) return { error: "Account not found." };
  await store.saveUser({ ...user, passwordHash: hashPassword(password) });
  return { ok: true };
}

// ── pages ───────────────────────────────────────────────────────
export async function createPage(form: FormData): Promise<void> {
  const fail = (message: string): never => redirect(`/builder?error=${encodeURIComponent(message)}`);
  await requireSession();
  const title = String(form.get("title") ?? "").trim();
  const path = normalizePath(String(form.get("path") ?? ""));
  if (!title) fail("Give the page a title.");
  if (path.startsWith("/builder") || path.startsWith("/api") || path.startsWith("/media")) fail("That address is reserved.");
  const store = getStore();
  if (await store.getPage(path)) fail(`A page already exists at ${path}.`);
  const fromPath = String(form.get("copyFrom") ?? "");
  const source = fromPath ? await store.getPage(fromPath) : null;
  // taking over a coded page starts from its current content; anything else starts empty
  const imported = !source && SITE_ROUTES.some((r) => r.path === path) ? await importPage(path).catch((e) => { console.error("[builder] import failed", e); return null; }) : null;
  const data: Data = source ? structuredClone(source.draft ?? source.published ?? emptyPage(title)) : imported ?? emptyPage(title);
  data.root = { ...data.root, props: { ...(data.root?.props ?? {}), title } };
  const record: PageRecord = { path, title, draft: data, published: null, createdAt: now(), updatedAt: now() };
  await store.savePage(record);
  redirect(`/builder/edit?path=${encodeURIComponent(path)}`);
}

export async function saveDraft(path: string, data: Data): Promise<{ ok: true; updatedAt: string }> {
  const me = await requireSession();
  const store = getStore();
  const existing = await store.getPage(path);
  const title = String(data.root?.props?.title ?? existing?.title ?? path);
  const record: PageRecord = {
    path,
    title,
    draft: data,
    published: existing?.published ?? null,
    createdAt: existing?.createdAt ?? now(),
    publishedAt: existing?.publishedAt,
    updatedAt: now(),
    updatedBy: me.name,
  };
  await store.savePage(record);
  return { ok: true, updatedAt: record.updatedAt };
}

export async function publishPage(path: string, data: Data): Promise<{ ok: true; publishedAt: string }> {
  const me = await requireSession();
  const store = getStore();
  const existing = await store.getPage(path);
  const title = String(data.root?.props?.title ?? existing?.title ?? path);
  const stamp = now();
  await store.savePage({ path, title, draft: data, published: data, createdAt: existing?.createdAt ?? stamp, updatedAt: stamp, updatedBy: me.name, publishedAt: stamp });
  revalidate(path);
  return { ok: true, publishedAt: stamp };
}

export async function unpublishPage(path: string): Promise<{ ok: boolean }> {
  await requireSession();
  const store = getStore();
  const existing = await store.getPage(path);
  if (!existing) return { ok: false };
  await store.savePage({ ...existing, published: null, publishedAt: undefined, updatedAt: now() });
  revalidate(path);
  revalidatePath("/builder");
  return { ok: true };
}

export async function deletePage(path: string): Promise<{ ok: boolean }> {
  await requireSession();
  await getStore().deletePage(path);
  revalidate(path);
  revalidatePath("/builder");
  return { ok: true };
}

export async function discardDraft(path: string): Promise<{ ok: boolean }> {
  await requireSession();
  const store = getStore();
  const existing = await store.getPage(path);
  if (!existing) return { ok: false };
  await store.savePage({ ...existing, draft: existing.published, updatedAt: now() });
  return { ok: true };
}

/** For the header status line: whether the current visitor is signed in (used by client shells). */
export async function whoAmI() {
  return getSession();
}
