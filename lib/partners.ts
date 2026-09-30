import { getSql } from "./db";

export type Partner = { id: number; name: string; logo_url: string | null; website_url: string | null };

let ready = false;

/** Creates the partners table on first use, so no manual migration is needed. */
export async function ensurePartnersTable(): Promise<void> {
  if (ready) return;
  const sql = getSql();
  await sql`
    create table if not exists partners (
      id           bigserial primary key,
      name         text not null,
      logo_url     text,
      website_url  text,
      sort_order   integer not null default 0,
      created_at   timestamptz not null default now()
    )`;
  ready = true;
}

export async function listPartners(): Promise<Partner[]> {
  if (!process.env.DATABASE_URL) return [];
  try {
    await ensurePartnersTable();
    const sql = getSql();
    const rows = await sql`select id, name, logo_url, website_url from partners order by sort_order, id`;
    return rows as Partner[];
  } catch (error) {
    console.error("partners unavailable", error);
    return [];
  }
}
