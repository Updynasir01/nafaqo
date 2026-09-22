import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin";
import { getSql } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET() {
  const denied = await requireAdmin();
  if (denied) return denied;

  try {
    const sql = getSql();
    const [enquiries, subscribers, posts, documents] = await Promise.all([
      sql`select id, name, organisation, email, partner_type, message, status, created_at
          from partner_enquiries order by created_at desc limit 200`,
      sql`select id, email, created_at from subscribers order by created_at desc limit 500`,
      sql`select id, tag, title, excerpt, file_url, published, created_at from posts order by created_at desc`,
      sql`select id, title, note, status, file_url, updated_at from documents order by id`,
    ]);
    return NextResponse.json({ enquiries, subscribers, posts, documents });
  } catch (error) {
    console.error("admin data failed", error);
    return NextResponse.json({ error: "Could not load the dashboard data." }, { status: 500 });
  }
}
