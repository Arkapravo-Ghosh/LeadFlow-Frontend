import { NextResponse } from "next/server";
import { z } from "zod";
import { apiRequest, ApiError } from "@/lib/server/api";
import { trustedAuthOrigin } from "@/lib/server/auth-origin";
import { setSession } from "@/lib/server/session";
import type { components } from "@/lib/api-types";

const loginSchema = z.object({
  username: z.string().trim().min(3).max(64).regex(/^[a-zA-Z0-9][a-zA-Z0-9_.-]*$/),
  password: z.string().min(1).max(128),
}).strict();

/** Credentials travel in a POST body; no tokens or submitted values are echoed. */
export async function POST(request: Request) {
  const reply = (message: string, status: number) =>
    NextResponse.json({ message }, { status, headers: { "Cache-Control": "no-store" } });
  if (!trustedAuthOrigin(request)) return reply("Unable to verify this request.", 403);
  const data = loginSchema.safeParse(await request.json().catch(() => null));
  if (!data.success) return reply("Enter a valid username and password.", 400);
  try {
    const result = await apiRequest<components["schemas"]["LoginResult"]>(
      "/auth/login", { method: "POST", body: JSON.stringify(data.data) }, "none",
    );
    await setSession(result.token, result.expires_at);
    return NextResponse.json({ ok: true }, { headers: { "Cache-Control": "no-store" } });
  } catch (error) {
    if (error instanceof ApiError) return reply(error.message, error.status === 401 || error.status === 429 ? error.status : 503);
    return reply("Sign-in is temporarily unavailable. Please try again.", 503);
  }
}
