import { Suspense } from "react";
import { connection } from "next/server";
import { redirect } from "next/navigation";
import { ThemeToggle } from "@/components/theme-toggle";
import { LoginForm } from "@/features/auth/components/login-form";
import { apiRequest, ApiError } from "@/lib/server/api";
import { sessionToken } from "@/lib/server/session";

async function SignIn() {
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
  return <main className="flex min-h-dvh items-center justify-center px-6 py-12">
    <div className="w-full max-w-sm space-y-8">
      <div className="flex items-center justify-between gap-4">
        <span className="text-lg font-semibold tracking-tight">LeadFlow</span><ThemeToggle />
      </div>
      <div className="space-y-2"><h1 className="text-3xl font-semibold tracking-tight">Welcome back.</h1>
        <p className="text-sm text-muted-foreground">Sign in to your leads, conversations, and next steps.</p></div>
      <LoginForm />
    </div>
  </main>;
}

export const metadata = { title: "Sign in · LeadFlow" };
export default function LoginPage() {
  return <Suspense fallback={<main className="p-8 text-sm text-muted-foreground">Loading sign-in…</main>}><SignIn /></Suspense>;
}
