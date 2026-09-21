import { NextResponse } from "next/server";
import { getSql } from "@/lib/db";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export async function POST(request: Request) {
  let email = "";
  try {
    const body = await request.json();
    email = String(body?.email ?? "").trim().toLowerCase();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  if (!EMAIL.test(email) || email.length > 254) {
    return NextResponse.json({ error: "Enter a valid email address." }, { status: 422 });
  }

  try {
    const sql = getSql();
    await sql`
      insert into subscribers (email, source)
      values (${email}, ${"website_footer"})
      on conflict (email) do nothing
    `;
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("subscribe failed", error);
    return NextResponse.json({ error: "Could not save your email. Please try again." }, { status: 500 });
  }
}
