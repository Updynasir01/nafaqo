"use client";

import { useState } from "react";

type State = { status: "idle" | "sending" | "done" | "error"; message?: string };

export default function SubscribeForm() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<State>({ status: "idle" });

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState({ status: "sending" });
    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data?.error ?? "Something went wrong.");
      setEmail("");
      setState({ status: "done", message: "Thank you \u2014 you are on the list." });
    } catch (error) {
      setState({ status: "error", message: error instanceof Error ? error.message : "Something went wrong." });
    }
  }

  return (
    <form onSubmit={onSubmit} className="max-w-[400px]">
      <div className="flex flex-wrap gap-2">
        <label htmlFor="subscribe-email" className="sr-only">Email address</label>
        <input
          id="subscribe-email"
          type="email"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="Enter your email"
          className="min-w-0 flex-1 basis-[180px] rounded-full border border-white/30 bg-transparent px-[18px] py-[13px] text-[14.5px] text-sand-100"
        />
        <button
          type="submit"
          disabled={state.status === "sending"}
          className="rounded-full bg-sand-100 px-[22px] py-[13px] text-[14.5px] font-bold text-green-900 transition-colors hover:bg-gold-300 disabled:opacity-45"
        >
          {state.status === "sending" ? "Sending\u2026" : "Subscribe"}
        </button>
      </div>
      {state.message ? (
        <p
          role="status"
          className={"mt-3 text-[14px] " + (state.status === "error" ? "text-gold-300" : "text-sand-100")}
        >
          {state.message}
        </p>
      ) : null}
    </form>
  );
}
