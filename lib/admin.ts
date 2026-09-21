import { NextResponse } from "next/server";

/** Shared-secret gate for the /admin console. Set ADMIN_KEY in the environment. */
export function requireAdmin(request: Request): NextResponse | null {
  const expected = process.env.ADMIN_KEY;
  if (!expected) {
    return NextResponse.json({ error: "ADMIN_KEY is not configured." }, { status: 500 });
  }
  if (request.headers.get("x-admin-key") !== expected) {
    return NextResponse.json({ error: "Not authorised." }, { status: 401 });
  }
  return null;
}
