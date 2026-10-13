import Link from "next/link";
import type { ReactNode } from "react";
import { ThemeToggle } from "@/components/theme-toggle";
import { BrandLink } from "@/components/brand-link";
import type { AuthMode } from "../schemas";

/** Keep branding, theme and navigation stable while the account form streams. */
export function AuthShell({ mode, children }: { mode: AuthMode; children: ReactNode }) {
  const signup = mode === "signup";
  return <main className="flex min-h-dvh items-center justify-center px-6 py-12">
    <div className="flex w-full max-w-sm flex-col gap-8">
      <div className="flex items-center justify-between gap-4">
        <BrandLink />
        <ThemeToggle />
      </div>
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-semibold tracking-tight">{signup ? "Create your account." : "Welcome back."}</h1>
        <p className="text-sm text-muted-foreground">{signup ? "Your own workspace for leads, conversations, and next steps." : "Sign in to your leads, conversations, and next steps."}</p>
      </div>
      {children}
      <p className="text-center text-sm text-muted-foreground">
        {signup ? "Already have an account? " : "New to LeadFlow? "}
        <Link href={signup ? "/login" : "/signup"} className="text-foreground underline underline-offset-4">
          {signup ? "Sign in" : "Create account"}
        </Link>
      </p>
    </div>
  </main>;
}
