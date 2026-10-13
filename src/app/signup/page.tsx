import { Suspense } from "react";
import { AuthScreen } from "@/features/auth/server/auth-screen";

export const metadata = { title: "Create account · LeadFlow" };
export default function SignupPage() {
  return <Suspense fallback={<main className="p-8 text-sm text-muted-foreground">Loading sign-up…</main>}><AuthScreen mode="signup" /></Suspense>;
}
