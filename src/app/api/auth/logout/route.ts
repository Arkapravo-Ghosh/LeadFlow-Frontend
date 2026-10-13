import { NextResponse } from "next/server";
import { apiRequest, ApiError } from "@/lib/server/api";
import { trustedAuthOrigin } from "@/lib/server/auth-origin";
import { clearSession } from "@/lib/server/session";

export async function POST(request: Request) {
  if (!trustedAuthOrigin(request)) return NextResponse.json({ message: "Unable to verify this request." }, { status: 403 });
  try {
    await apiRequest("/auth/logout", { method: "POST" }, "optional");
  } catch (error) {
    // An unavailable backend must be retried so we can guarantee revocation.
    if (!(error instanceof ApiError && error.status === 401)) {
      return NextResponse.json({ message: "Unable to sign out. Please try again." }, { status: 503 });
    }
  }
  await clearSession();
  return NextResponse.json({ ok: true }, { headers: { "Cache-Control": "no-store" } });
}
