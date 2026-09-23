/**
 * Where the builder keeps its pages, media and users.
 *
 *  - Sanity (when SANITY_API_WRITE_TOKEN is set): page documents are stored
 *    as `builderPage` documents, uploads as Sanity assets (CDN URLs), users
 *    as *draft* `builderUser` documents — drafts are never public, so the
 *    password hashes stay private even though the dataset is public.
 *  - Files (otherwise): a `.builder/` folder next to the app — right for local
 *    development, and a stop-gap in production (the folder does not survive
 *    a redeploy; the builder shows a warning in that case).
 */
import { createClient, type SanityClient } from "@sanity/client";
import { promises as fs, accessSync, constants } from "node:fs";
import os from "node:os";
import path from "node:path";
import { randomBytes } from "node:crypto";
import type { Backend, MediaRecord, PageRecord, UserRecord } from "./types";
import { pathToId } from "./types";

const newId = () => randomBytes(9).toString("base64url");

// ── file backend ────────────────────────────────────────────────
function fileBackend(): Backend {
  // the production container runs as a non-root user and its app folder is read-only → fall back to the temp dir
  const writable = (dir: string) => { try { accessSync(dir, constants.W_OK); return true; } catch { return false; } };
  const root = process.env.BUILDER_DATA_DIR ?? (writable(process.cwd()) ? path.join(process.cwd(), ".builder") : path.join(os.tmpdir(), "bws-builder"));
  const pagesDir = path.join(root, "pages");
  const mediaDir = path.join(root, "media");
  const usersFile = path.join(root, "users.json");
  const mediaFile = path.join(root, "media.json");
  const ensure = async () => {
    await fs.mkdir(pagesDir, { recursive: true });
    await fs.mkdir(mediaDir, { recursive: true });
  };
  const readJson = async <T>(file: string, fallback: T): Promise<T> => {
    try { return JSON.parse(await fs.readFile(file, "utf8")) as T; } catch { return fallback; }
  };
  const pageFile = (p: string) => path.join(pagesDir, `${pathToId(p)}.json`);
  return {
    name: "file",
    persistent: process.env.NODE_ENV !== "production",
    async listPages() {
      await ensure();
      const files = (await fs.readdir(pagesDir)).filter((f) => f.endsWith(".json"));
      const pages = await Promise.all(files.map((f) => readJson<PageRecord | null>(path.join(pagesDir, f), null)));
      return pages.filter((p): p is PageRecord => Boolean(p)).sort((a, b) => a.path.localeCompare(b.path));
    },
    async getPage(p) { await ensure(); return readJson<PageRecord | null>(pageFile(p), null); },
    async savePage(page) { await ensure(); await fs.writeFile(pageFile(page.path), JSON.stringify(page)); },
    async deletePage(p) { await ensure(); await fs.rm(pageFile(p), { force: true }); },
    async listMedia() { await ensure(); return readJson<MediaRecord[]>(mediaFile, []); },
    async saveMedia({ name, type, bytes, width, height }) {
      await ensure();
      const id = newId();
      const ext = (name.split(".").pop() ?? "bin").toLowerCase().replace(/[^a-z0-9]/g, "") || "bin";
      await fs.writeFile(path.join(mediaDir, `${id}.${ext}`), bytes);
      const rec: MediaRecord = { id: `${id}.${ext}`, url: `/media/${id}.${ext}`, name, type, size: bytes.length, width, height, createdAt: new Date().toISOString() };
      const all = await readJson<MediaRecord[]>(mediaFile, []);
      await fs.writeFile(mediaFile, JSON.stringify([rec, ...all]));
      return rec;
    },
    async readMedia(id) {
      await ensure();
      const all = await readJson<MediaRecord[]>(mediaFile, []);
      const rec = all.find((m) => m.id === id);
      if (!rec) return null;
      try { return { bytes: await fs.readFile(path.join(mediaDir, id)), type: rec.type, name: rec.name }; } catch { return null; }
    },
    async deleteMedia(id) {
      await ensure();
      const all = await readJson<MediaRecord[]>(mediaFile, []);
      await fs.writeFile(mediaFile, JSON.stringify(all.filter((m) => m.id !== id)));
      await fs.rm(path.join(mediaDir, id), { force: true });
    },
    async listUsers() { await ensure(); return readJson<UserRecord[]>(usersFile, []); },
    async saveUser(user) {
      await ensure();
      const all = (await readJson<UserRecord[]>(usersFile, [])).filter((u) => u.id !== user.id);
      await fs.writeFile(usersFile, JSON.stringify([...all, user]));
    },
    async deleteUser(id) {
      await ensure();
      const all = await readJson<UserRecord[]>(usersFile, []);
      await fs.writeFile(usersFile, JSON.stringify(all.filter((u) => u.id !== id)));
    },
  };
}

// ── Sanity backend ──────────────────────────────────────────────
function sanityBackend(projectId: string, dataset: string, token: string): Backend {
  const client: SanityClient = createClient({ projectId, dataset, token, apiVersion: "2025-09-01", useCdn: false, perspective: "raw" });
  const pageId = (p: string) => `builderPage-${pathToId(p)}`;
  type PageDoc = { _id: string; path: string; title: string; draft?: string; published?: string; createdAt: string; updatedAt: string; updatedBy?: string; publishedAt?: string };
  const fromDoc = (d: PageDoc): PageRecord => ({
    path: d.path, title: d.title, createdAt: d.createdAt, updatedAt: d.updatedAt, updatedBy: d.updatedBy, publishedAt: d.publishedAt,
    draft: d.draft ? JSON.parse(d.draft) : null,
    published: d.published ? JSON.parse(d.published) : null,
  });
  type UserDoc = Omit<UserRecord, "id"> & { _id: string };
  const userId = (id: string) => `drafts.builderUser-${id}`;
  return {
    name: "sanity",
    persistent: true,
    async listPages() {
      const rows = await client.fetch<PageDoc[]>(`*[_type == "builderPage" && !(_id in path("drafts.**"))] | order(path asc)`);
      return rows.map(fromDoc);
    },
    async getPage(p) {
      const row = await client.fetch<PageDoc | null>(`*[_type == "builderPage" && _id == $id && !(_id in path("drafts.**"))][0]`, { id: pageId(p) });
      return row ? fromDoc(row) : null;
    },
    async savePage(page) {
      await client.createOrReplace({
        _id: pageId(page.path), _type: "builderPage",
        path: page.path, title: page.title, createdAt: page.createdAt, updatedAt: page.updatedAt, updatedBy: page.updatedBy, publishedAt: page.publishedAt,
        draft: page.draft ? JSON.stringify(page.draft) : undefined,
        published: page.published ? JSON.stringify(page.published) : undefined,
      });
    },
    async deletePage(p) { await client.delete(pageId(p)); },
    async listMedia() {
      return client.fetch<MediaRecord[]>(`*[_type == "builderMedia"] | order(createdAt desc){ "id": _id, url, name, type, size, width, height, createdAt }`);
    },
    async saveMedia({ name, type, bytes, width, height }) {
      const kind = type.startsWith("image/") && !type.includes("svg") ? "image" : "file";
      const asset = await client.assets.upload(kind, bytes, { filename: name, contentType: type });
      const rec: MediaRecord = { id: `builderMedia-${asset._id.replace(/[^a-zA-Z0-9-]/g, "-")}`, url: asset.url, name, type, size: bytes.length, width, height, createdAt: new Date().toISOString() };
      await client.createOrReplace({ _id: rec.id, _type: "builderMedia", url: rec.url, name, type, size: rec.size, width, height, createdAt: rec.createdAt, assetId: asset._id });
      return rec;
    },
    async deleteMedia(id) {
      const doc = await client.fetch<{ assetId?: string } | null>(`*[_id == $id][0]{assetId}`, { id });
      await client.delete(id);
      if (doc?.assetId) { try { await client.delete(doc.assetId); } catch { /* still referenced elsewhere — keep the asset */ } }
    },
    async listUsers() {
      const rows = await client.fetch<UserDoc[]>(`*[_type == "builderUser" && _id in path("drafts.**")] | order(createdAt asc)`);
      return rows.map(({ _id, ...u }) => ({ ...u, id: _id.replace(/^drafts\.builderUser-/, "") }));
    },
    async saveUser(user) {
      const { id, ...rest } = user;
      await client.createOrReplace({ _id: userId(id), _type: "builderUser", ...rest });
    },
    async deleteUser(id) { await client.delete(userId(id)); },
  };
}

let backend: Backend | null = null;
export function getStore(): Backend {
  if (backend) return backend;
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  const token = process.env.SANITY_API_WRITE_TOKEN;
  backend = projectId && token ? sanityBackend(projectId, process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production", token) : fileBackend();
  return backend;
}
