"use client";

import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Field, FieldLabel } from "@/components/ui/field";

export function LoginForm() {
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const fields = new FormData(form);
    setPending(true); setError("");
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: fields.get("username"), password: fields.get("password") }),
      });
      const result = await response.json();
      if (!response.ok) { setError(result.message); return; }
      form.reset();
      // A new document clears any prior user's router cache and client state.
      window.location.replace("/");
    } catch {
      setError("Sign-in is temporarily unavailable. Please try again.");
    } finally {
      setPending(false);
    }
  }

  return <form onSubmit={submit} className="flex flex-col gap-6">
    <Field><FieldLabel htmlFor="username">Username</FieldLabel>
      <Input id="username" name="username" autoComplete="username" autoCapitalize="none"
        spellCheck={false} required minLength={3} maxLength={64} disabled={pending} /></Field>
    <Field><FieldLabel htmlFor="password">Password</FieldLabel>
      <Input id="password" name="password" type="password" autoComplete="current-password"
        required maxLength={128} disabled={pending} /></Field>
    {error && <p role="alert" className="text-sm text-destructive">{error}</p>}
    <Button type="submit" disabled={pending}>{pending ? "Signing in…" : "Sign in"}</Button>
  </form>;
}
