import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { SESSION_COOKIE, verifySession } from "./session";

/**
 * Route-level gate. The middleware already blocks unauthenticated requests to
 * /admin and /api/admin/*; this is the second line of defence so a route can
 * never be reached with a missing or forged session.
 */
export async function requireAdmin(): Promise<NextResponse | null> {
  if (!process.env.ADMIN_KEY) {
    return NextResponse.json({ error: "ADMIN_KEY is not configured." }, { status: 500 });
  }
  const store = await cookies();
  const ok = await verifySession(store.get(SESSION_COOKIE)?.value);
  return ok ? null : NextResponse.json({ error: "Not authorised." }, { status: 401 });
}
