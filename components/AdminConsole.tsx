"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

type Enquiry = { id: number; name: string; organisation: string | null; email: string; partner_type: string | null; message: string; status: string; created_at: string };
type Subscriber = { id: number; email: string; created_at: string };
type Post = { id: number; tag: string; title: string; excerpt: string | null; file_url: string | null; published: boolean; created_at: string };
type Doc = { id: number; title: string; note: string | null; status: string; file_url: string | null };
type Data = { enquiries: Enquiry[]; subscribers: Subscriber[]; posts: Post[]; documents: Doc[] };

const VIEWS = [
  ["overview", "Overview"],
  ["news", "News & Updates"],
  ["reports", "Reports"],
  ["enquiries", "Enquiries"],
  ["subscribers", "Subscribers"],
] as const;

const DOC_STATUSES = ["On request", "After launch", "Annually", "Published"];

const chip = (tone: "green" | "gold" | "grey") =>
  "rounded-full px-3 py-1 text-[12px] font-bold " +
  (tone === "green" ? "bg-green-100 text-green-700" : tone === "gold" ? "bg-gold-100 text-gold-700" : "bg-sand-200 text-sand-700");

const date = (value: string) => new Date(value).toLocaleDateString("en-GB", { day: "numeric", month: "short" });

export default function AdminConsole() {
  const [key, setKey] = useState("");
  const [authed, setAuthed] = useState(false);
  const [view, setView] = useState<string>("overview");
  const [data, setData] = useState<Data | null>(null);
  const [error, setError] = useState("");
  const [draft, setDraft] = useState({ tag: "", title: "", excerpt: "", fileUrl: "" });

  useEffect(() => {
    const stored = window.sessionStorage.getItem("nafaqo-admin-key");
    if (stored) {
      setKey(stored);
      setAuthed(true);
    }
  }, []);

  const load = useCallback(async (adminKey: string) => {
    const response = await fetch("/api/admin/data", { headers: { "x-admin-key": adminKey }, cache: "no-store" });
    if (!response.ok) {
      const body = await response.json().catch(() => ({}));
      throw new Error(body.error ?? "Could not load the dashboard.");
    }
    setData(await response.json());
  }, []);

  useEffect(() => {
    if (!authed || !key) return;
    load(key).catch((err: Error) => {
      setError(err.message);
      setAuthed(false);
    });
  }, [authed, key, load]);

  async function act(payload: Record<string, unknown>) {
    setError("");
    const response = await fetch("/api/admin/action", {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-admin-key": key },
      body: JSON.stringify(payload),
    });
    if (!response.ok) {
      const body = await response.json().catch(() => ({}));
      setError(body.error ?? "The change could not be saved.");
      return;
    }
    await load(key);
  }

  if (!authed) {
    return (
      <div className="flex min-h-screen items-center justify-center p-6">
        <form
          onSubmit={(event) => {
            event.preventDefault();
            window.sessionStorage.setItem("nafaqo-admin-key", key);
            setError("");
            setAuthed(true);
          }}
          className="w-full max-w-[380px] rounded-lg bg-ground p-8 shadow-lg"
        >
          <h1 className="text-[22px]">Nafaqo dashboard</h1>
          <p className="mt-2 text-[14.5px] text-sand-700">Enter the admin key to continue.</p>
          <input
            type="password"
            value={key}
            onChange={(event) => setKey(event.target.value)}
            className="mt-5 w-full rounded-md border border-divider px-4 py-3 text-[15px]"
            placeholder="Admin key"
          />
          <button type="submit" className="mt-4 w-full rounded-full bg-green-700 px-6 py-3 text-[15px] font-bold text-white">
            Sign in
          </button>
          {error ? <p className="mt-3 text-[14px] text-gold-700">{error}</p> : null}
        </form>
      </div>
    );
  }

  const newCount = data?.enquiries.filter((item) => item.status === "new").length ?? 0;
  const drafts = data?.posts.filter((item) => !item.published).length ?? 0;

  return (
    <div className="grid min-h-screen grid-cols-1 md:grid-cols-[238px_1fr]">
      <aside className="sticky top-0 flex h-auto flex-col gap-6 bg-green-900 p-5 text-white/70 md:h-screen">
        <Image src="/assets/nafaqo-logo-light.png" alt="Nafaqo Kitchen" width={170} height={38} className="h-[38px] w-auto" />
        <div className="text-[12px] text-white/50">Content &amp; operations</div>
        <nav className="flex flex-col gap-0.5">
          {VIEWS.map(([id, label]) => {
            const badge = id === "enquiries" ? newCount : id === "news" ? drafts : 0;
            return (
              <button
                key={id}
                type="button"
                onClick={() => setView(id)}
                className={
                  "flex items-center justify-between gap-2 rounded-[10px] px-3 py-2.5 text-left text-[14.5px] " +
                  (view === id ? "bg-white/[0.12] font-bold text-white" : "font-medium text-white/70 hover:text-white")
                }
              >
                {label}
                {badge > 0 ? <span className="rounded-full bg-gold-400 px-2 py-0.5 text-[11.5px] font-bold text-green-900">{badge}</span> : null}
              </button>
            );
          })}
        </nav>
      </aside>

      <main className="min-w-0">
        <header className="sticky top-0 z-10 flex flex-wrap items-center justify-between gap-3 border-b border-divider bg-ground px-7 py-4">
          <h1 className="text-[21px]">{VIEWS.find(([id]) => id === view)?.[1]}</h1>
          <button
            type="button"
            onClick={() => load(key).catch((err: Error) => setError(err.message))}
            className="rounded-full bg-green-700 px-5 py-2.5 text-[14px] font-bold text-white"
          >
            Refresh
          </button>
        </header>

        <div className="flex flex-col gap-5 px-7 py-6 pb-16">
          {error ? <p className="rounded-md bg-gold-100 px-4 py-3 text-[14px] text-gold-700">{error}</p> : null}
          {!data ? <p className="text-[15px] text-sand-700">Loading…</p> : null}

          {data && view === "overview" ? (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {[
                ["New enquiries", newCount, "Waiting for a reply"],
                ["Subscribers", data.subscribers.length, "On the update list"],
                ["Posts live", data.posts.filter((item) => item.published).length, drafts + " in draft"],
                ["Documents", data.documents.length, "Listed on Reports"],
              ].map(([label, value, note]) => (
                <div key={String(label)} className="rounded-md border border-divider bg-ground p-5">
                  <div className="text-[12.5px] font-bold uppercase tracking-[0.07em] text-sand-700">{label}</div>
                  <div className="mt-2 font-head text-[32px] font-semibold leading-none">{value}</div>
                  <div className="mt-1.5 text-[13px] text-sand-700">{note}</div>
                </div>
              ))}
            </div>
          ) : null}

          {data && view === "news" ? (
            <div className="grid grid-cols-1 items-start gap-5 lg:grid-cols-2">
              <div className="overflow-hidden rounded-md border border-divider bg-ground">
                {data.posts.map((post) => (
                  <div key={post.id} className="flex items-start justify-between gap-3 border-b border-divider p-4">
                    <div className="min-w-0">
                      <div className="text-[12px] font-bold text-gold-700">{post.tag}</div>
                      <div className="mt-1 font-head text-[16px] font-semibold">{post.title}</div>
                      {post.excerpt ? <div className="mt-1 text-[13.5px] text-sand-700">{post.excerpt}</div> : null}
                      {post.file_url ? <a href={post.file_url} className="mt-2 inline-block text-[13px] font-bold">Attached PDF</a> : null}
                    </div>
                    <div className="flex flex-none flex-col items-end gap-2">
                      <span className={chip(post.published ? "green" : "grey")}>{post.published ? "Published" : "Draft"}</span>
                      <button type="button" onClick={() => act({ type: "post.publish", id: post.id, published: !post.published })} className="rounded-full border border-divider px-3 py-1.5 text-[12.5px] font-bold">
                        {post.published ? "Unpublish" : "Publish"}
                      </button>
                      <button type="button" onClick={() => act({ type: "post.delete", id: post.id })} className="text-[12.5px] font-bold text-gold-700">
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
                {data.posts.length === 0 ? <p className="p-5 text-[14.5px] text-sand-700">No posts yet.</p> : null}
              </div>

              <div className="rounded-md border border-divider bg-ground p-5">
                <h2 className="text-[16px]">New post</h2>
                <div className="mt-4 flex flex-col gap-3">
                  {([["tag", "Category"], ["title", "Title"], ["excerpt", "Summary"], ["fileUrl", "PDF link (optional)"]] as const).map(([field, label]) => (
                    <label key={field} className="text-[13px] font-bold">
                      {label}
                      <input
                        value={draft[field]}
                        onChange={(event) => setDraft({ ...draft, [field]: event.target.value })}
                        className="mt-1.5 w-full rounded-[10px] border border-divider px-3 py-2.5 text-[14.5px] font-normal"
                      />
                    </label>
                  ))}
                  <button
                    type="button"
                    onClick={async () => {
                      await act({ type: "post.create", ...draft });
                      setDraft({ tag: "", title: "", excerpt: "", fileUrl: "" });
                    }}
                    className="self-start rounded-full bg-green-700 px-5 py-2.5 text-[14px] font-bold text-white"
                  >
                    Save as draft
                  </button>
                </div>
              </div>
            </div>
          ) : null}

          {data && view === "reports" ? (
            <div className="overflow-hidden rounded-md border border-divider bg-ground">
              {data.documents.map((doc) => (
                <div key={doc.id} className="flex flex-wrap items-center justify-between gap-3 border-b border-divider p-4">
                  <div>
                    <div className="font-head text-[16px] font-semibold">{doc.title}</div>
                    {doc.note ? <div className="mt-1 text-[13.5px] text-sand-700">{doc.note}</div> : null}
                    <div className="mt-1.5 text-[13px] font-bold text-green-700">{doc.file_url ? doc.file_url : "No PDF linked yet"}</div>
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    <select
                      value={doc.status}
                      onChange={(event) => act({ type: "document.update", id: doc.id, status: event.target.value, fileUrl: doc.file_url ?? "" })}
                      className="rounded-full border border-divider px-3 py-2 text-[13px] font-bold"
                    >
                      {DOC_STATUSES.map((status) => (
                        <option key={status}>{status}</option>
                      ))}
                    </select>
                    <input
                      defaultValue={doc.file_url ?? ""}
                      placeholder="https://…/report.pdf"
                      onBlur={(event) => {
                        if (event.target.value !== (doc.file_url ?? "")) {
                          act({ type: "document.update", id: doc.id, status: doc.status, fileUrl: event.target.value });
                        }
                      }}
                      className="w-[240px] rounded-full border border-divider px-3 py-2 text-[13px]"
                    />
                  </div>
                </div>
              ))}
            </div>
          ) : null}

          {data && view === "enquiries" ? (
            <div className="flex flex-col gap-4">
              <p className="rounded-md border border-gold-300 bg-gold-100 px-4 py-3 text-[13.5px] text-gold-700">
                Every submission is stored here and emailed to the address set in the form handler.
              </p>
              <div className="overflow-hidden rounded-md border border-divider bg-ground">
                {data.enquiries.map((enquiry) => (
                  <div key={enquiry.id} className="border-b border-divider p-4">
                    <div className="flex flex-wrap items-baseline justify-between gap-3">
                      <div>
                        <span className="font-head text-[16px] font-semibold">{enquiry.name}</span>
                        <span className="ml-2 text-[13.5px] text-sand-700">
                          {enquiry.organisation ?? "—"} · {enquiry.email}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[13px] text-sand-700">{date(enquiry.created_at)}</span>
                        <span className={chip(enquiry.status === "new" ? "gold" : "green")}>{enquiry.status}</span>
                        <a href={"mailto:" + enquiry.email + "?subject=" + encodeURIComponent("Re: your enquiry to Nafaqo Kitchen")} className="rounded-full bg-green-700 px-3.5 py-1.5 text-[12.5px] font-bold text-white no-underline">
                          Reply by email
                        </a>
                        <button
                          type="button"
                          onClick={() => act({ type: "enquiry.status", id: enquiry.id, status: enquiry.status === "new" ? "replied" : "new" })}
                          className="rounded-full bg-green-100 px-3.5 py-1.5 text-[12.5px] font-bold text-green-800"
                        >
                          {enquiry.status === "new" ? "Mark replied" : "Reopen"}
                        </button>
                      </div>
                    </div>
                    <p className="mt-2 max-w-[76ch] text-[14.5px] leading-[1.6] text-sand-700">{enquiry.message}</p>
                  </div>
                ))}
                {data.enquiries.length === 0 ? <p className="p-5 text-[14.5px] text-sand-700">No enquiries yet.</p> : null}
              </div>
            </div>
          ) : null}

          {data && view === "subscribers" ? (
            <div className="overflow-hidden rounded-md border border-divider bg-ground">
              <div className="border-b border-divider p-4 text-[16px] font-bold">{data.subscribers.length} subscribers</div>
              {data.subscribers.map((subscriber) => (
                <div key={subscriber.id} className="flex items-center justify-between border-b border-divider px-4 py-3">
                  <span className="text-[14.5px]">{subscriber.email}</span>
                  <span className="text-[13px] text-sand-700">{date(subscriber.created_at)}</span>
                </div>
              ))}
            </div>
          ) : null}
        </div>
      </main>
    </div>
  );
}
