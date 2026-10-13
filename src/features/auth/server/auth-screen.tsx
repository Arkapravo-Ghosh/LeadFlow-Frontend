import { connection } from "next/server";
import { redirect } from "next/navigation";
import { apiRequest, ApiError } from "@/lib/server/api";
import { sessionToken } from "@/lib/server/session";
import { AuthForm } from "../components/auth-form";
import type { AuthMode } from "../schemas";

/** Resolve the current session before rendering an interactive account form. */
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
  if (signedIn) redirect("/workspace");
  return <AuthForm mode={mode} />;
}
