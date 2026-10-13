import Link from "next/link";
import { connection } from "next/server";
import { redirect } from "next/navigation";
import { ThemeToggle } from "@/components/theme-toggle";
import { apiRequest, ApiError } from "@/lib/server/api";
import { sessionToken } from "@/lib/server/session";
import { AuthForm } from "../components/auth-form";
import type { AuthMode } from "../schemas";

/** Both account pages reuse the same server session check and themed shell. */
export async function AuthScreen({ mode }: { mode: AuthMode }) {
  await connection();
  let signedIn = false;
  if (await sessionToken()) {
    try {
      await apiRequest("/auth/me", {}, "optional");
      signedIn = true;
    } catch (error) {
      if (!(error instanceof ApiError)) throw error;
    }
  }
  if (signedIn) redirect("/");
  const signup = mode === "signup";
  return <main className="flex min-h-dvh items-center justify-center px-6 py-12">
    <div className="w-full max-w-sm space-y-8">
      <div className="flex items-center justify-between gap-4">
        <span className="text-lg font-semibold tracking-tight">LeadFlow</span><ThemeToggle />
      </div>
      <div className="space-y-2"><h1 className="text-3xl font-semibold tracking-tight">{signup ? "Create your account." : "Welcome back."}</h1>
        <p className="text-sm text-muted-foreground">{signup ? "Your own workspace for leads, conversations, and next steps." : "Sign in to your leads, conversations, and next steps."}</p></div>
      <AuthForm mode={mode} />
      <p className="text-center text-sm text-muted-foreground">
        {signup ? "Already have an account? " : "New to LeadFlow? "}
        <Link href={signup ? "/login" : "/signup"} className="text-foreground underline underline-offset-4">
          {signup ? "Sign in" : "Create account"}
        </Link>
      </p>
    </div>
  </main>;
}
