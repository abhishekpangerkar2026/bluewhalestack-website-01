import { NextResponse, type NextRequest } from "next/server";
import { SESSION_COOKIE, verifySession } from "@/lib/builder/session";

/** The website builder lives under /builder and needs a signed-in editor. */
export async function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  if (pathname === "/builder/login" || pathname === "/builder/setup" || pathname.startsWith("/builder/api/")) {
    return NextResponse.next();
  }
  const session = await verifySession(request.cookies.get(SESSION_COOKIE)?.value);
  if (!session) {
    const login = new URL("/builder/login", request.url);
    login.searchParams.set("next", pathname + search);
    return NextResponse.redirect(login);
  }
  return NextResponse.next();
}

export const config = { matcher: ["/builder/:path*", "/api/builder/:path*"] };
