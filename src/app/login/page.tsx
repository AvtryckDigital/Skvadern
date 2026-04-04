"use client";

import { useActionState } from "react";
import { login } from "./actions";

export default function LoginPage() {
  const [state, action, pending] = useActionState(login, null);

  return (
    <div
      className="min-h-[calc(100vh-80px)] flex items-center justify-center px-6 py-20"
      style={{ backgroundColor: "var(--bg)" }}
    >
      <div className="w-full max-w-sm">
        {/* Header */}
        <div className="text-center mb-10">
          <p
            className="text-xs uppercase tracking-[0.3em] mb-3"
            style={{ color: "var(--gold)" }}
          >
            Intern åtkomst
          </p>
          <h1
            className="text-4xl font-bold"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Logga in
          </h1>
          <div
            className="w-8 h-px mx-auto mt-4"
            style={{ backgroundColor: "var(--gold)" }}
          />
        </div>

        {/* Form */}
        <form action={action} className="flex flex-col gap-5">
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="email"
              className="text-xs uppercase tracking-widest"
              style={{ color: "var(--text-light)" }}
            >
              E-post
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              autoComplete="email"
              className="px-4 py-3 text-sm border bg-transparent outline-none"
              style={{
                borderColor: "var(--border)",
                color: "var(--text-dark)",
                backgroundColor: "var(--bg-subtle)",
              }}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="password"
              className="text-xs uppercase tracking-widest"
              style={{ color: "var(--text-light)" }}
            >
              Lösenord
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              autoComplete="current-password"
              className="px-4 py-3 text-sm border bg-transparent outline-none"
              style={{
                borderColor: "var(--border)",
                color: "var(--text-dark)",
                backgroundColor: "var(--bg-subtle)",
              }}
            />
          </div>

          {state?.error && (
            <p
              className="text-sm text-center py-2 px-4 border"
              style={{
                color: "#e07070",
                borderColor: "rgba(224,112,112,0.3)",
                backgroundColor: "rgba(224,112,112,0.07)",
              }}
            >
              {state.error}
            </p>
          )}

          <button
            type="submit"
            disabled={pending}
            className="mt-2 px-8 py-3 text-sm uppercase tracking-widest font-medium transition-all duration-200 disabled:opacity-50"
            style={{
              backgroundColor: "var(--gold)",
              color: "var(--bg)",
            }}
          >
            {pending ? "Loggar in…" : "Logga in"}
          </button>
        </form>
      </div>
    </div>
  );
}
