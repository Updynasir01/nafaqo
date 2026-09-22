import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { SESSION_COOKIE, verifySession } from "./lib/session";

const PUBLIC_ADMIN_PATHS = ["/api/admin/login", "/api/admin/logout"];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (PUBLIC_ADMIN_PATHS.includes(pathname)) return NextResponse.next();

  const authorised = await verifySession(request.cookies.get(SESSION_COOKIE)?.value);
  if (!authorised) return NextResponse.json({ error: "Not authorised." }, { status: 401 });
  return NextResponse.next();
}

export const config = {
  matcher: ["/api/admin/:path*"],
};
