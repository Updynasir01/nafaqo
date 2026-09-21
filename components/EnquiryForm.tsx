"use client";

import { useState } from "react";

const TYPES = [
  "Government or education authority",
  "Producer or service partner",
  "School, parent or community",
  "Technical or development partner",
];

export default function EnquiryForm() {
  const [state, setState] = useState<{ status: "idle" | "sending" | "done" | "error"; message?: string }>({ status: "idle" });

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    setState({ status: "sending" });
    try {
      const response = await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const body = await response.json();
      if (!response.ok) throw new Error(body?.error ?? "Something went wrong.");
      form.reset();
      setState({ status: "done", message: "Thank you \u2014 we will be in touch." });
    } catch (error) {
      setState({ status: "error", message: error instanceof Error ? error.message : "Something went wrong." });
    }
  }

  const field = "w-full rounded-md border border-divider bg-ground px-4 py-3 text-[15px] text-ink";
  const label = "mb-1.5 block text-[12px] font-bold uppercase tracking-[0.12em] text-green-700";

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4">
      <div>
        <label htmlFor="name" className={label}>Name</label>
        <input id="name" name="name" required className={field} />
      </div>
      <div>
        <label htmlFor="organisation" className={label}>Organisation</label>
        <input id="organisation" name="organisation" className={field} />
      </div>
      <div>
        <label htmlFor="email" className={label}>Email</label>
        <input id="email" name="email" type="email" required className={field} />
      </div>
      <div>
        <label htmlFor="partnerType" className={label}>You are</label>
        <select id="partnerType" name="partnerType" className={field} defaultValue="">
          <option value="">Select one</option>
          {TYPES.map((type) => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="message" className={label}>Message</label>
        <textarea id="message" name="message" required rows={5} className={field} />
      </div>
      <button
        type="submit"
        disabled={state.status === "sending"}
        className="self-start rounded-full bg-green-800 px-7 py-4 text-[15px] font-bold text-white transition-colors hover:bg-green-700 disabled:opacity-45"
      >
        {state.status === "sending" ? "Sending\u2026" : "Send enquiry"}
      </button>
      {state.message ? (
        <p role="status" className={"text-[14.5px] " + (state.status === "error" ? "text-gold-700" : "text-green-700")}>
          {state.message}
        </p>
      ) : null}
    </form>
  );
}
