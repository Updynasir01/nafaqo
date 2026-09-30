import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin";
import { getSql } from "@/lib/db";
import { ensurePartnersTable } from "@/lib/partners";
import { sanitizeHtml } from "@/lib/sanitize";
import { saveContent } from "@/lib/content";

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
                ${sanitizeHtml(String(body.body ?? ""))}, ${String(body.fileUrl ?? "") || null}, false)`;
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
    } else if (type === "content.save") {
      const values = body.values;
      if (!values || typeof values !== "object" || Array.isArray(values)) {
        return NextResponse.json({ error: "Nothing to save." }, { status: 422 });
      }
      await saveContent(values as Record<string, unknown>);
    } else if (type === "partner.create") {
      const name = String(body.name ?? "").trim();
      const logo = String(body.logoUrl ?? "").trim();
      const website = String(body.websiteUrl ?? "").trim();
      if (!name) return NextResponse.json({ error: "A partner name is required." }, { status: 422 });
      if (logo && !/^data:image\/(png|jpeg|webp|gif);base64,/i.test(logo) && !/^https:\/\//i.test(logo)) {
        return NextResponse.json({ error: "The logo must be an uploaded image or an https:// link." }, { status: 422 });
      }
      if (logo.length > 1500000) {
        return NextResponse.json({ error: "That image is too large. Try a smaller file." }, { status: 413 });
      }
      if (website && !/^https?:\/\//i.test(website)) {
        return NextResponse.json({ error: "The website must start with https://" }, { status: 422 });
      }
      await ensurePartnersTable();
      await sql`
        insert into partners (name, logo_url, website_url, sort_order)
        values (${name}, ${logo || null}, ${website || null},
                (select coalesce(max(sort_order), 0) + 1 from partners))`;
    } else if (type === "partner.delete") {
      await ensurePartnersTable();
      await sql`delete from partners where id = ${id}`;
    } else {
      return NextResponse.json({ error: "Unknown action." }, { status: 400 });
    }
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("admin action failed", error);
    return NextResponse.json({ error: "The change could not be saved." }, { status: 500 });
  }
}
