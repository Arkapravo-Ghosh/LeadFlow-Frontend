"use client";

import { useState } from "react";
import { RiLogoutBoxRLine } from "@remixicon/react";
import { Spinner } from "@/components/ui/spinner";
import { Button } from "@/components/ui/button";

export function SignOutButton() {
  const [pending, setPending] = useState(false);
  const [error, setError] = useState(false);
  async function signOut() {
    setPending(true); setError(false);
    try {
      const response = await fetch("/api/auth/logout", { method: "POST" });
      if (!response.ok) throw new Error();
      window.location.replace("/login");
    } catch {
      setError(true); setPending(false);
    }
  }
  return <div className="flex flex-col items-end gap-1">
    <Button variant="ghost" size="icon" aria-label="Sign out" title="Sign out"
      disabled={pending} aria-busy={pending} onClick={signOut}>{pending ? <Spinner aria-hidden="true" /> : <RiLogoutBoxRLine aria-hidden />}</Button>
    {error && <span role="alert" className="text-xs text-destructive">Sign-out failed. Retry.</span>}
  </div>;
}
