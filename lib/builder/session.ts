/**
 * Signed session cookie for the builder. Web Crypto only, so the same code
 * verifies sessions in the middleware (edge runtime) and in server actions.
 */
export const SESSION_COOKIE = "bws_builder";
export const SESSION_DAYS = 30;

export interface SessionPayload {
  id: string;
  name: string;
  email: string;
  role: "admin" | "editor";
  exp: number;
}

const secret = () => process.env.BUILDER_SECRET ?? process.env.SANITY_REVALIDATE_SECRET ?? "bluewhale-builder-dev-secret";

const enc = new TextEncoder();
const b64 = (bytes: ArrayBuffer | Uint8Array) => {
  const arr = bytes instanceof Uint8Array ? bytes : new Uint8Array(bytes);
  let s = "";
  for (const b of arr) s += String.fromCharCode(b);
  return btoa(s).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
};
const unb64 = (s: string) => {
  const padded = s.replace(/-/g, "+").replace(/_/g, "/") + "=".repeat((4 - (s.length % 4)) % 4);
  return Uint8Array.from(atob(padded), (c) => c.charCodeAt(0));
};

async function hmac(data: string): Promise<string> {
  const key = await crypto.subtle.importKey("raw", enc.encode(secret()), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  return b64(await crypto.subtle.sign("HMAC", key, enc.encode(data)));
}

export async function signSession(payload: Omit<SessionPayload, "exp">): Promise<string> {
  const body = b64(enc.encode(JSON.stringify({ ...payload, exp: Date.now() + SESSION_DAYS * 86400_000 })));
  return `${body}.${await hmac(body)}`;
}

export async function verifySession(token: string | undefined | null): Promise<SessionPayload | null> {
  if (!token) return null;
  const [body, sig] = token.split(".");
  if (!body || !sig) return null;
  if ((await hmac(body)) !== sig) return null;
  try {
    const payload = JSON.parse(new TextDecoder().decode(unb64(body))) as SessionPayload;
    return payload.exp > Date.now() ? payload : null;
  } catch {
    return null;
  }
}
