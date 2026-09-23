import type { Data } from "@puckeditor/core";

/** A page composed in the builder: a draft the team is working on and the version the site serves. */
export interface PageRecord {
  path: string;
  title: string;
  draft: Data | null;
  published: Data | null;
  createdAt: string;
  updatedAt: string;
  updatedBy?: string;
  publishedAt?: string;
}

export interface MediaRecord {
  id: string;
  url: string;
  name: string;
  type: string;
  size: number;
  width?: number;
  height?: number;
  createdAt: string;
}

export type UserRole = "admin" | "editor";

export interface UserRecord {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  passwordHash: string;
  createdAt: string;
}

export interface Backend {
  name: "sanity" | "file";
  /** false when pages live on the container's disk and vanish on redeploy */
  persistent: boolean;
  listPages(): Promise<PageRecord[]>;
  getPage(path: string): Promise<PageRecord | null>;
  savePage(page: PageRecord): Promise<void>;
  deletePage(path: string): Promise<void>;
  listMedia(): Promise<MediaRecord[]>;
  saveMedia(input: { name: string; type: string; bytes: Buffer; width?: number; height?: number }): Promise<MediaRecord>;
  readMedia?(id: string): Promise<{ bytes: Buffer; type: string; name: string } | null>;
  deleteMedia(id: string): Promise<void>;
  listUsers(): Promise<UserRecord[]>;
  saveUser(user: UserRecord): Promise<void>;
  deleteUser(id: string): Promise<void>;
}

/** "/About Us/" → "/about-us" */
export function normalizePath(input: string): string {
  const cleaned = "/" + input.trim().toLowerCase().replace(/^\/+|\/+$/g, "").split("/").filter(Boolean)
    .map((seg) => seg.replace(/[^a-z0-9-_]+/g, "-").replace(/^-+|-+$/g, ""))
    .filter(Boolean)
    .join("/");
  return cleaned === "/" ? "/" : cleaned;
}

export const pathToId = (path: string) => (path === "/" ? "home" : path.replace(/^\//, "").replace(/[^a-z0-9-]+/gi, "-").toLowerCase());

export const emptyPage = (title: string): Data => ({ content: [], root: { props: { title } } });
