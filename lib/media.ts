import { getSql } from "./db";

let ready = false;

export async function ensureMediaTable(): Promise<void> {
  if (ready) return;
  const sql = getSql();
  await sql`
    create table if not exists media (
      id          bigserial primary key,
      mime        text not null,
      data        text not null,
      created_at  timestamptz not null default now()
    )`;
  ready = true;
}

/** Uploaded photos are served from /api/media/<id>; next/image should not re-process them. */
export function isUploaded(src: string): boolean {
  return src.startsWith("/api/media/");
}
