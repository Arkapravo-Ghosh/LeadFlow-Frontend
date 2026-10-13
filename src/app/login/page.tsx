import { Suspense } from "react";
import { AuthScreen } from "@/features/auth/server/auth-screen";

export const metadata = { title: "Sign in · LeadFlow" };
export default function LoginPage() {
  return <Suspense fallback={<main className="p-8 text-sm text-muted-foreground">Loading sign-in…</main>}><AuthScreen mode="login" /></Suspense>;
}
