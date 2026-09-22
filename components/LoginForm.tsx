"use client";

import { useState } from "react";

export default function LoginForm() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

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
    const next = new URLSearchParams(window.location.search).get("next");
    window.location.href = next && next.startsWith("/admin") ? next : "/admin";
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-surface p-6">
      <form onSubmit={submit} className="w-full max-w-[380px] rounded-lg bg-ground p-8 shadow-lg">
        <h1 className="text-[22px]">Nafaqo dashboard</h1>
        <p className="mt-2 text-[14.5px] text-sand-700">Enter the dashboard password to continue.</p>
        <input
          type="password"
          autoComplete="current-password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          className="mt-5 w-full rounded-md border border-divider px-4 py-3 text-[15px]"
          placeholder="Password"
        />
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