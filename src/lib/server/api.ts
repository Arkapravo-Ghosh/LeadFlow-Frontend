import "server-only";
import { redirect } from "next/navigation";
import { sessionToken } from "./session";
import { serverConfig } from "./config";
import type { ActionResult, FormErrors } from "@/features/leads/types";

export class ApiError extends Error {
  constructor(message: string, readonly fields: FormErrors = {}, readonly status = 500) {
    super(message);
  }
}

export class AuthRequiredError extends Error {}

/** Only fixed application paths can be requested; never accept a caller's URL. */
export async function apiRequest<T>(
  path: string, init: RequestInit = {}, auth: "required" | "optional" | "none" = "required",
): Promise<T> {
  const token = auth === "none" ? undefined : await sessionToken();
  if (auth === "required" && !token) throw new AuthRequiredError();
  const { apiUrl, apiKey, timezone } = serverConfig();
  const url = new URL(`/api/v1${path}`, apiUrl);
  url.searchParams.set("timezone", timezone);
  let response: Response;
  try {
    response = await fetch(url, {
      ...init, cache: "no-store", signal: AbortSignal.timeout(15000),
      headers: { "Content-Type": "application/json", "X-API-Key": apiKey,
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    });
  } catch {
    throw new ApiError("LeadFlow is temporarily unavailable. Please try again.");
  }
  if (response.status === 401 && auth === "required") throw new AuthRequiredError();
  if (!response.ok) {
    const body = await response.json().catch(() => null);
    throw new ApiError(
      body?.error?.message ?? "Unable to complete the request.",
      body?.error?.fields ?? {}, response.status,
    );
  }
  if (response.status === 204) return undefined as T;
  return response.json() as Promise<T>;
}

/** Expected errors remain readable; private infrastructure errors are redacted. */
export async function resultOf<T>(
  operation: () => Promise<T>,
): Promise<ActionResult<T>> {
  try {
    return { ok: true, data: await operation() };
  } catch (error) {
    if (error instanceof AuthRequiredError) redirect("/login");
    return error instanceof ApiError
      ? { ok: false, message: error.message, fields: error.fields }
      : { ok: false, message: "Unable to complete the request. Please try again.", fields: {} };
  }
}
