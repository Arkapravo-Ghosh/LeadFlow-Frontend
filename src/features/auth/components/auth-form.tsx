"use client";

import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field";
import { loginSchema, signupSchema, type AuthMode } from "../schemas";

/** One form shares field validation and session navigation for both entry paths. */
export function AuthForm({ mode }: { mode: AuthMode }) {
  const signup = mode === "signup";
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const fields = new FormData(form);
    const data = (signup ? signupSchema : loginSchema).safeParse({
      username: fields.get("username"), password: fields.get("password"),
      ...(signup ? { confirmation: fields.get("confirmation") } : {}),
    });
    setError("");
    if (!data.success) { setError(data.error.issues[0].message); return; }
    setPending(true);
    try {
      const response = await fetch(`/api/auth/${mode}`, {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data.data),
      });
      const result: { message?: string } = await response.json();
      if (!response.ok) { setError(result.message ?? "Unable to access your account."); return; }
      form.reset();
      // A new document clears any prior user's router cache and client state.
      window.location.replace("/");
    } catch {
      setError("Account access is temporarily unavailable. Please try again.");
    } finally {
      setPending(false);
    }
  }

  return <form onSubmit={submit} className="flex flex-col gap-6" aria-busy={pending}>
    <Field><FieldLabel htmlFor="username">Username</FieldLabel>
      <Input id="username" name="username" autoComplete="username" autoCapitalize="none"
        spellCheck={false} required minLength={3} maxLength={64} disabled={pending}
        aria-describedby={signup ? "username-hint" : undefined} />
      {signup && <FieldDescription id="username-hint">3–64 letters, numbers, dots, underscores or hyphens. Start with a letter or number.</FieldDescription>}
    </Field>
    <Field><FieldLabel htmlFor="password">Password</FieldLabel>
      <Input id="password" name="password" type="password" autoComplete={signup ? "new-password" : "current-password"}
        required minLength={signup ? 12 : 1} maxLength={128} disabled={pending}
        aria-describedby={signup ? "password-hint" : undefined} />
      {signup && <FieldDescription id="password-hint">Use a unique password with 12–128 characters.</FieldDescription>}
    </Field>
    {signup && <Field><FieldLabel htmlFor="confirmation">Confirm password</FieldLabel>
      <Input id="confirmation" name="confirmation" type="password" autoComplete="new-password"
        required maxLength={128} disabled={pending} /></Field>}
    {error && <p role="alert" className="text-sm text-destructive">{error}</p>}
    <Button type="submit" disabled={pending}>{pending ? (signup ? "Creating account…" : "Signing in…") : (signup ? "Create account" : "Sign in")}</Button>
  </form>;
}
