import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin";
import { getSql } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const denied = await requireAdmin();
  if (denied) return denied;

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const type = String(body.type ?? "");
  const id = Number(body.id ?? 0);
  const sql = getSql();

  try {
    if (type === "enquiry.status") {
      const status = String(body.status ?? "new");
      await sql`update partner_enquiries set status = ${status} where id = ${id}`;
    } else if (type === "post.create") {
      const title = String(body.title ?? "").trim();
      if (!title) return NextResponse.json({ error: "A title is required." }, { status: 422 });
      await sql`
        insert into posts (tag, title, excerpt, body, file_url, published)
        values (${String(body.tag ?? "Update")}, ${title}, ${String(body.excerpt ?? "")},
                ${String(body.body ?? "")}, ${String(body.fileUrl ?? "") || null}, false)`;
    } else if (type === "post.publish") {
      await sql`update posts set published = ${Boolean(body.published)} where id = ${id}`;
    } else if (type === "post.delete") {
      await sql`delete from posts where id = ${id}`;
    } else if (type === "document.update") {
      await sql`
        update documents
           set status = ${String(body.status ?? "On request")},
               file_url = ${String(body.fileUrl ?? "") || null},
               updated_at = now()
         where id = ${id}`;
    } else {
      return NextResponse.json({ error: "Unknown action." }, { status: 400 });
    }
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("admin action failed", error);
    return NextResponse.json({ error: "The change could not be saved." }, { status: 500 });
  }
}
