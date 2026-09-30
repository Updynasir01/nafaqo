import { getSql } from "@/lib/db";
import { ensureMediaTable } from "@/lib/media";

export const dynamic = "force-dynamic";

/** Serves photos uploaded from the dashboard's page editor. */
export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const numeric = Number(id);
  if (!Number.isInteger(numeric) || numeric <= 0 || !process.env.DATABASE_URL) {
    return new Response("Not found", { status: 404 });
  }

  try {
    await ensureMediaTable();
    const sql = getSql();
    const rows = await sql`select mime, data from media where id = ${numeric} limit 1`;
    const row = rows[0] as { mime: string; data: string } | undefined;
    if (!row) return new Response("Not found", { status: 404 });

    const bytes = new Uint8Array(Buffer.from(row.data, "base64"));
    return new Response(bytes, {
      headers: {
        "Content-Type": row.mime,
        // Each upload gets a new id, so the file behind a URL never changes.
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch (error) {
    console.error("media unavailable", error);
    return new Response("Not found", { status: 404 });
  }
}
