import { NextResponse } from "next/server";
import { getSql } from "@/lib/db";
import { hashPassword, verifyPassword } from "@/lib/password";
import { SESSION_COOKIE, createSession } from "@/lib/session";

export const dynamic = "force-dynamic";

async function storedHash(): Promise<string | null> {
  if (!process.env.DATABASE_URL) return null;
  try {
    const sql = getSql();
    const rows = await sql`select value from app_settings where key = 'admin_password' limit 1`;
    return (rows[0]?.value as string) ?? null;
  } catch {
    return null;
  }
}

export async function POST(request: Request) {
  const envKey = process.env.ADMIN_KEY;
  if (!envKey) return NextResponse.json({ error: "ADMIN_KEY is not configured." }, { status: 500 });

  let password = "";
  try {
    password = String(((await request.json()) as { password?: string }).password ?? "");
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }
  if (!password) return NextResponse.json({ error: "Enter the password." }, { status: 422 });

  const hash = await storedHash();
  let ok = false;

  if (hash) {
    ok = await verifyPassword(password, hash);
  } else if (password === envKey) {
    // First sign-in: seed the stored password from ADMIN_KEY so it can be changed in Settings.
    ok = true;
    if (process.env.DATABASE_URL) {
      try {
        const sql = getSql();
        const seeded = await hashPassword(password);
        await sql`
          insert into app_settings (key, value) values ('admin_password', ${seeded})
          on conflict (key) do update set value = excluded.value, updated_at = now()`;
      } catch (error) {
        console.error("could not seed the admin password", error);
      }
    }
  }

  if (!ok) return NextResponse.json({ error: "That password is not correct." }, { status: 401 });

  const response = NextResponse.json({ ok: true });
  response.cookies.set(SESSION_COOKIE, await createSession(), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 12 * 60 * 60,
  });
  return response;
}
