import "server-only";
import { createHash } from "node:crypto";
import { isIP } from "node:net";
import { NextResponse } from "next/server";
import { loginSchema, signupSchema, type AuthMode } from "@/features/auth/schemas";
import { apiRequest, ApiError } from "./api";
import { trustedAuthOrigin } from "./auth-origin";
import { setSession } from "./session";
import type { components } from "@/lib/api-types";

/** Trust Vercel's protected IP header only on Vercel; other hosts share a bucket. */
function registrationSource(request: Request): string {
  const address = process.env.VERCEL === "1" ? request.headers.get("x-vercel-forwarded-for") : null;
  const source = address && isIP(address) ? address : "shared";
  return createHash("sha256").update(source).digest("hex");
}

/** Route Handlers never echo credentials or expose the backend's bearer token. */
export async function handleAuth(request: Request, mode: AuthMode): Promise<NextResponse> {
  const reply = (message: string, status: number) =>
    NextResponse.json({ message }, { status, headers: { "Cache-Control": "no-store" } });
  if (!trustedAuthOrigin(request)) return reply("Unable to verify this request.", 403);
  const schema = mode === "signup" ? signupSchema : loginSchema;
  const data = schema.safeParse(await request.json().catch(() => null));
  if (!data.success) return reply(data.error.issues[0]?.message ?? "Enter valid account details.", 400);
  try {
    const { username, password } = data.data;
    const result = await apiRequest<components["schemas"]["LoginResult"]>(
      `/auth/${mode}`, {
        method: "POST", body: JSON.stringify({ username, password }),
        ...(mode === "signup" ? { headers: { "X-Registration-Source": registrationSource(request) } } : {}),
      }, "none",
    );
    await setSession(result.token, result.expires_at);
    return NextResponse.json({ ok: true }, {
      status: mode === "signup" ? 201 : 200, headers: { "Cache-Control": "no-store" },
    });
  } catch (error) {
    if (error instanceof ApiError && [401, 409, 429].includes(error.status)) return reply(error.message, error.status);
    return reply("Account access is temporarily unavailable. Please try again.", 503);
  }
}
