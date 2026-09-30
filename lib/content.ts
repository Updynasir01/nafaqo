import { cache } from "react";
import { getSql } from "./db";
import { DEFAULTS, cloneValue, type Content, type Item } from "./content-schema";

const SETTING_KEY = "site_content";
let ready = false;

async function ensureSettingsTable(): Promise<void> {
  if (ready) return;
  const sql = getSql();
  await sql`
    create table if not exists app_settings (
      key         text primary key,
      value       text not null,
      updated_at  timestamptz not null default now()
    )`;
  ready = true;
}

async function readOverrides(): Promise<Record<string, unknown>> {
  await ensureSettingsTable();
  const sql = getSql();
  const rows = await sql`select value from app_settings where key = ${SETTING_KEY} limit 1`;
  const raw = rows[0]?.value as string | undefined;
  if (!raw) return {};
  try {
    const parsed = JSON.parse(raw) as unknown;
    return parsed && typeof parsed === "object" && !Array.isArray(parsed) ? (parsed as Record<string, unknown>) : {};
  } catch {
    return {};
  }
}

/** Coerces a stored value into the same shape as its default, or falls back to the default. */
function clean(fallback: unknown, value: unknown): unknown {
  if (typeof fallback === "string") return typeof value === "string" ? value : fallback;
  if (!Array.isArray(fallback) || !Array.isArray(value)) return fallback;
  if (fallback.length === 0 || typeof fallback[0] === "string") {
    return value.filter((entry): entry is string => typeof entry === "string");
  }
  const defaults = fallback as Item[];
  const template = Object.keys(defaults[0]);
  const icons = defaults.map((entry) => entry.icon).filter((icon): icon is string => Boolean(icon));
  return value
    .filter((entry) => entry !== null && typeof entry === "object")
    .map((entry, index) => {
      const source = entry as Record<string, unknown>;
      const item: Item = {};
      for (const key of template) {
        if (key === "num") {
          item.num = String(index + 1).padStart(2, "0");
        } else if (key === "icon") {
          const chosen = typeof source.icon === "string" && icons.includes(source.icon) ? source.icon : icons[index % Math.max(icons.length, 1)];
          item.icon = chosen ?? "";
        } else {
          item[key] = typeof source[key] === "string" ? (source[key] as string) : "";
        }
      }
      return item;
    });
}

/** The website's content: defaults with whatever the dashboard has saved on top. */
export const getContent = cache(async (): Promise<Content> => {
  const content = cloneValue(DEFAULTS);
  if (!process.env.DATABASE_URL) return content;
  try {
    const overrides = await readOverrides();
    const target = content as Record<string, unknown>;
    for (const key of Object.keys(DEFAULTS)) {
      if (key in overrides) target[key] = clean((DEFAULTS as Record<string, unknown>)[key], overrides[key]);
    }
  } catch (error) {
    console.error("site content unavailable, using defaults", error);
  }
  return content;
});

/** Saves edited fields. Unknown keys are ignored. */
export async function saveContent(values: Record<string, unknown>): Promise<void> {
  const current = await readOverrides();
  for (const key of Object.keys(values)) {
    if (key in DEFAULTS) current[key] = clean((DEFAULTS as Record<string, unknown>)[key], values[key]);
  }
  const sql = getSql();
  const json = JSON.stringify(current);
  await sql`
    insert into app_settings (key, value) values (${SETTING_KEY}, ${json})
    on conflict (key) do update set value = excluded.value, updated_at = now()`;
}
