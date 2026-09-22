import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin";
import { getSql } from "@/lib/db";
import { hashPassword, verifyPassword } from "@/lib/password";
import { SESSION_COOKIE, createSession } from "@/lib/session";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const denied = await requireAdmin();
  if (denied) return denied;
  if (!process.env.DATABASE_URL) {
    return NextResponse.json({ error: "A database is required to change the password." }, { status: 500 });
  }

  let current = "";
  let next = "";
  try {
    const body = (await request.json()) as { current?: string; next?: string };
    current = String(body.current ?? "");
    next = String(body.next ?? "");
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  if (next.length < 10) {
    return NextResponse.json({ error: "Use at least 10 characters." }, { status: 422 });
  }

  try {
    const sql = getSql();
    const rows = await sql`select value from app_settings where key = 'admin_password' limit 1`;
    const stored = (rows[0]?.value as string) ?? null;

    const ok = stored ? await verifyPassword(current, stored) : current === process.env.ADMIN_KEY;
    if (!ok) return NextResponse.json({ error: "The current password is not correct." }, { status: 401 });

    await sql`
      insert into app_settings (key, value) values ('admin_password', ${await hashPassword(next)})
      on conflict (key) do update set value = excluded.value, updated_at = now()`;

    // Refresh the session so the signed-in tab stays signed in.
    const response = NextResponse.json({ ok: true });
    response.cookies.set(SESSION_COOKIE, await createSession(), {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 12 * 60 * 60,
    });
    return response;
  } catch (error) {
    console.error("password change failed", error);
    return NextResponse.json({ error: "The password could not be changed." }, { status: 500 });
  }
}
