import { Suspense } from "react";
import { AuthShell } from "@/features/auth/components/auth-shell";
import { AuthSkeleton } from "@/features/auth/components/auth-skeleton";
import { AuthScreen } from "@/features/auth/server/auth-screen";

export const metadata = { title: "Sign in · LeadFlow" };
export default function LoginPage() {
  return <AuthShell mode="login">
    <Suspense fallback={<AuthSkeleton mode="login" />}><AuthScreen mode="login" /></Suspense>
  </AuthShell>;
}
