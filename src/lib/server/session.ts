import "server-only";
import { cookies } from "next/headers";

export const SESSION_COOKIE = "leadflow-session";
export const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  path: "/",
};

/** Opaque token is never returned to Client Components or browser JavaScript. */
export async function sessionToken() {
  return (await cookies()).get(SESSION_COOKIE)?.value;
}

export async function setSession(token: string, expiresAt: string) {
  (await cookies()).set(SESSION_COOKIE, token, {
    ...cookieOptions, expires: new Date(expiresAt),
  });
}

export async function clearSession() {
  (await cookies()).set(SESSION_COOKIE, "", { ...cookieOptions, maxAge: 0 });
}
