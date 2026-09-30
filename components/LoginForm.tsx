"use client";

import { useState } from "react";

export default function LoginForm() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [shown, setShown] = useState(false);

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    setBusy(true);
    setError("");
    const response = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    setBusy(false);
    if (!response.ok) {
      const body = await response.json().catch(() => ({}));
      setError(body.error ?? "Could not sign in.");
      return;
    }
    // A full page load, not router.replace: the App Router caches the RSC payload
    // for /admin from the unauthenticated redirect, and would re-render that.
    const next = new URLSearchParams(window.location.search).get("next");
    window.location.href = next && next.startsWith("/admin") ? next : "/admin";
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-surface p-6">
      <form onSubmit={submit} className="w-full max-w-[380px] rounded-lg bg-ground p-8 shadow-lg">
        <h1 className="text-[22px]">Nafaqo dashboard</h1>
        <p className="mt-2 text-[14.5px] text-sand-700">Enter the dashboard password to continue.</p>
        <div className="relative mt-5">
          <input
            type={shown ? "text" : "password"}
            autoComplete="current-password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="w-full rounded-md border border-divider px-4 py-3 pr-12 text-[15px]"
            placeholder="Password"
          />
          <button
            type="button"
            onClick={() => setShown((v) => !v)}
            aria-label={shown ? "Hide password" : "Show password"}
            title={shown ? "Hide password" : "Show password"}
            className="absolute right-1.5 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full text-sand-700 hover:bg-surface"
          >
            {shown ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
                <path d="M10.7 5.1A9.8 9.8 0 0 1 12 5c6 0 10 7 10 7a17.6 17.6 0 0 1-2.4 3.2M6.6 6.6A17.8 17.8 0 0 0 2 12s4 7 10 7a9.6 9.6 0 0 0 4.2-.9" />
                <path d="M9.9 9.9a3 3 0 0 0 4.2 4.2" />
                <path d="m2 2 20 20" />
              </svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
                <path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7-10-7-10-7Z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
            )}
          </button>
        </div>
        <button
          type="submit"
          disabled={busy}
          className="mt-4 w-full rounded-full bg-green-700 px-6 py-3 text-[15px] font-bold text-white disabled:opacity-60"
        >
          {busy ? "Signing in…" : "Sign in"}
        </button>
        {error ? <p className="mt-3 text-[14px] text-gold-700">{error}</p> : null}
      </form>
    </div>
  );
}
