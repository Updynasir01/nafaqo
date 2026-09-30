"use client";

import { useEffect, useState } from "react";
import {
  DEFAULTS,
  PAGES,
  cloneValue,
  type Content,
  type ContentKey,
  type Field,
  type Item,
} from "@/lib/content-schema";

type Value = string | string[] | Item[];

const input = "mt-1.5 w-full rounded-[10px] border border-divider bg-ground px-3 py-2.5 text-[14.5px] font-normal text-ink";
const small = "rounded-full border border-divider px-3 py-1.5 text-[12.5px] font-bold text-ink hover:bg-surface";

/** Resizes a photo in the browser before upload, so pages stay fast. */
async function resizePhoto(file: File): Promise<string> {
  const objectUrl = URL.createObjectURL(file);
  try {
    const img = await new Promise<HTMLImageElement>((resolve, reject) => {
      const el = new window.Image();
      el.onload = () => resolve(el);
      el.onerror = () => reject(new Error("That photo could not be read."));
      el.src = objectUrl;
    });
    const scale = Math.min(1, 1920 / Math.max(img.naturalWidth || 1, img.naturalHeight || 1));
    const canvas = document.createElement("canvas");
    canvas.width = Math.max(1, Math.round((img.naturalWidth || 1) * scale));
    canvas.height = Math.max(1, Math.round((img.naturalHeight || 1) * scale));
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("That photo could not be read.");
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    const webp = canvas.toDataURL("image/webp", 0.84);
    return webp.startsWith("data:image/webp") ? webp : canvas.toDataURL("image/jpeg", 0.84);
  } finally {
    URL.revokeObjectURL(objectUrl);
  }
}

export default function PageEditor({ content, onSaved }: { content: Content; onSaved: () => Promise<void> }) {
  const [pageId, setPageId] = useState(PAGES[0].id);
  const [draft, setDraft] = useState<Content>(() => cloneValue(content));
  const [dirty, setDirty] = useState(false);
  const [status, setStatus] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!dirty) setDraft(cloneValue(content));
  }, [content, dirty]);

  const page = PAGES.find((entry) => entry.id === pageId) ?? PAGES[0];
  const get = (key: ContentKey) => draft[key] as Value;
  const set = (key: ContentKey, value: Value) => {
    setDraft((current) => ({ ...current, [key]: value }) as Content);
    setDirty(true);
    setStatus("");
  };

  function switchPage(id: string) {
    if (dirty && !window.confirm("You have unsaved changes on this page. Leave without saving?")) return;
    setDirty(false);
    setDraft(cloneValue(content));
    setPageId(id);
    setStatus("");
  }

  async function save() {
    setBusy(true);
    setStatus("");
    const values: Record<string, unknown> = {};
    for (const field of page.fields) values[field.key] = draft[field.key];
    const response = await fetch("/api/admin/action", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: "content.save", values }),
    });
    setBusy(false);
    if (!response.ok) {
      const body = await response.json().catch(() => ({}));
      setStatus(body.error ?? "The changes could not be saved.");
      return;
    }
    setDirty(false);
    setStatus("Saved. The live page now shows these changes.");
    await onSaved();
  }

  async function upload(key: ContentKey, file: File) {
    setStatus("Uploading photo\u2026");
    try {
      const dataUrl = await resizePhoto(file);
      const response = await fetch("/api/admin/media", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ dataUrl }),
      });
      const body = await response.json().catch(() => ({}));
      if (!response.ok || !body.url) {
        setStatus(body.error ?? "The photo could not be uploaded.");
        return;
      }
      set(key, String(body.url));
      setStatus("Photo uploaded. Save the page to publish it.");
    } catch (err) {
      setStatus(err instanceof Error ? err.message : "The photo could not be uploaded.");
    }
  }

  function renderField(field: Field) {
    const value = get(field.key);

    if (field.type === "text" || field.type === "textarea") {
      const text = typeof value === "string" ? value : "";
      return field.type === "text" ? (
        <input value={text} onChange={(event) => set(field.key, event.target.value)} className={input} />
      ) : (
        <textarea rows={3} value={text} onChange={(event) => set(field.key, event.target.value)} className={input + " leading-[1.55]"} />
      );
    }

    if (field.type === "image") {
      const src = typeof value === "string" ? value : "";
      return (
        <div className="mt-1.5 flex flex-wrap items-center gap-4">
          <span className="flex h-[96px] w-[160px] items-center justify-center overflow-hidden rounded-[10px] border border-divider bg-surface">
            {src ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={src} alt="" className="h-full w-full object-cover" />
            ) : (
              <span className="text-[12.5px] text-sand-700">No photo</span>
            )}
          </span>
          <label className="cursor-pointer rounded-full border border-dashed border-divider bg-surface px-4 py-2.5 text-[13.5px] font-bold">
            Upload new photo
            <input
              type="file"
              accept="image/png,image/jpeg,image/webp"
              className="hidden"
              onChange={(event) => {
                const file = event.target.files?.[0];
                event.target.value = "";
                if (file) upload(field.key, file);
              }}
            />
          </label>
          {src ? (
            <button type="button" className={small} onClick={() => set(field.key, "")}>
              Hide photo
            </button>
          ) : null}
        </div>
      );
    }

    if (field.type === "lines") {
      const lines = Array.isArray(value) ? (value as string[]) : [];
      return (
        <div className="mt-1.5 flex flex-col gap-2">
          {lines.map((line, index) => (
            <div key={index} className="flex items-start gap-2">
              <textarea
                rows={line.length > 90 ? 3 : 1}
                value={line}
                onChange={(event) => set(field.key, lines.map((entry, i) => (i === index ? event.target.value : entry)))}
                className={input + " mt-0 leading-[1.55]"}
              />
              <button type="button" className={small + " mt-1 flex-none"} onClick={() => set(field.key, lines.filter((_, i) => i !== index))}>
                Remove
              </button>
            </div>
          ))}
          <button type="button" className={small + " self-start"} onClick={() => set(field.key, [...lines, ""])}>
            Add another
          </button>
        </div>
      );
    }

    const items = Array.isArray(value) ? (value as Item[]) : [];
    const template = ((DEFAULTS[field.key] as unknown as Item[])[0] ?? {}) as Item;
    const move = (from: number, to: number) => {
      if (to < 0 || to >= items.length) return;
      const next = [...items];
      const [picked] = next.splice(from, 1);
      next.splice(to, 0, picked);
      set(field.key, next);
    };
    return (
      <div className="mt-1.5 flex flex-col gap-3">
        {items.map((item, index) => (
          <div key={index} className="rounded-md border border-divider bg-surface/50 p-4">
            <div className="mb-2 flex items-center justify-between gap-2">
              <span className="text-[12.5px] font-bold text-sand-700">{String(index + 1).padStart(2, "0")}</span>
              <div className="flex gap-1.5">
                <button type="button" className={small} onClick={() => move(index, index - 1)} aria-label="Move up">
                  Up
                </button>
                <button type="button" className={small} onClick={() => move(index, index + 1)} aria-label="Move down">
                  Down
                </button>
                <button type="button" className={small} onClick={() => set(field.key, items.filter((_, i) => i !== index))}>
                  Remove
                </button>
              </div>
            </div>
            {(field.itemFields ?? []).map((sub) => (
              <label key={sub.key} className="mt-2 block text-[12.5px] font-bold text-sand-700">
                {sub.label}
                {sub.multiline ? (
                  <textarea
                    rows={3}
                    value={item[sub.key] ?? ""}
                    onChange={(event) => set(field.key, items.map((entry, i) => (i === index ? { ...entry, [sub.key]: event.target.value } : entry)))}
                    className={input + " leading-[1.55]"}
                  />
                ) : (
                  <input
                    value={item[sub.key] ?? ""}
                    onChange={(event) => set(field.key, items.map((entry, i) => (i === index ? { ...entry, [sub.key]: event.target.value } : entry)))}
                    className={input}
                  />
                )}
              </label>
            ))}
          </div>
        ))}
        <button
          type="button"
          className={small + " self-start"}
          onClick={() => {
            const blank: Item = {};
            for (const key of Object.keys(template)) blank[key] = key === "icon" ? template.icon ?? "" : "";
            set(field.key, [...items, blank]);
          }}
        >
          Add item
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-wrap gap-2">
        {PAGES.map((entry) => (
          <button
            key={entry.id}
            type="button"
            onClick={() => switchPage(entry.id)}
            className={
              "rounded-full px-4 py-2 text-[13.5px] font-bold transition-colors " +
              (entry.id === pageId ? "bg-green-800 text-white" : "border border-divider bg-ground text-ink hover:bg-surface")
            }
          >
            {entry.label}
          </button>
        ))}
      </div>

      <div className="rounded-md border border-divider bg-ground">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-divider p-5">
          <div>
            <h2 className="text-[17px]">{page.label}</h2>
            <p className="mt-1 text-[13px] text-sand-700">Edit the text and photos, then save. Changes go live straight away.</p>
          </div>
          <a href={page.path} target="_blank" rel="noopener noreferrer" className="text-[13.5px] font-bold">
            View live page
          </a>
        </div>

        <div className="flex flex-col divide-y divide-divider">
          {page.fields.map((field) => (
            <div key={page.id + field.key} className="p-5">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <span className="text-[13.5px] font-bold text-ink">{field.label}</span>
                <button
                  type="button"
                  onClick={() => set(field.key, cloneValue(DEFAULTS[field.key]) as Value)}
                  className="text-[12.5px] font-bold text-gold-700"
                >
                  Restore original
                </button>
              </div>
              {field.help ? <p className="mt-1 text-[12.5px] text-sand-700">{field.help}</p> : null}
              {renderField(field)}
            </div>
          ))}
        </div>

        <div className="sticky bottom-0 flex flex-wrap items-center gap-3 border-t border-divider bg-ground/95 p-4 backdrop-blur">
          <button
            type="button"
            onClick={save}
            disabled={busy || !dirty}
            className="rounded-full bg-green-700 px-6 py-2.5 text-[14px] font-bold text-white disabled:opacity-50"
          >
            {busy ? "Saving\u2026" : "Save changes"}
          </button>
          {dirty ? <span className="text-[13px] font-bold text-gold-700">Unsaved changes</span> : null}
          {status ? <span className="text-[13px] font-bold text-green-700">{status}</span> : null}
        </div>
      </div>
    </div>
  );
}
