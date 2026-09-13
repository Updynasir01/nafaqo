import { NextResponse } from "next/server";
import { getSql } from "@/lib/db";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const name = String(body.name ?? "").trim();
  const email = String(body.email ?? "").trim().toLowerCase();
  const message = String(body.message ?? "").trim();
  const organisation = String(body.organisation ?? "").trim() || null;
  const partnerType = String(body.partnerType ?? "").trim() || null;

  if (!name || !message || !EMAIL.test(email)) {
    return NextResponse.json({ error: "Name, a valid email and a message are required." }, { status: 422 });
  }

  try {
    const sql = getSql();
    await sql`
      insert into partner_enquiries (name, organisation, email, partner_type, message)
      values (${name}, ${organisation}, ${email}, ${partnerType}, ${message})
    `;
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("enquiry failed", error);
    return NextResponse.json({ error: "Could not send your message. Please try again." }, { status: 500 });
  }
}
