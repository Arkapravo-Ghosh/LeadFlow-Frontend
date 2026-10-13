import { Suspense } from "react";
import { AuthShell } from "@/features/auth/components/auth-shell";
import { AuthSkeleton } from "@/features/auth/components/auth-skeleton";
import { AuthScreen } from "@/features/auth/server/auth-screen";

export const metadata = { title: "Create account · LeadFlow" };
export default function SignupPage() {
  return <AuthShell mode="signup">
    <Suspense fallback={<AuthSkeleton mode="signup" />}><AuthScreen mode="signup" /></Suspense>
  </AuthShell>;
}
