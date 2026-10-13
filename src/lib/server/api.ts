import "server-only";
import { serverConfig } from "./config";
import type { ActionResult, FormErrors } from "@/features/leads/types";

export class ApiError extends Error {
  constructor(message: string, readonly fields: FormErrors = {}) {
    super(message);
  }
}

/** Only fixed application paths can be requested; never accept a caller's URL. */
export async function apiRequest<T>(
  path: string, init: RequestInit = {},
): Promise<T> {
  const { apiUrl, apiKey, timezone } = serverConfig();
  const url = new URL(`/api/v1${path}`, apiUrl);
  url.searchParams.set("timezone", timezone);
  let response: Response;
  try {
    response = await fetch(url, {
      ...init, cache: "no-store", signal: AbortSignal.timeout(15000),
      headers: { "Content-Type": "application/json", "X-API-Key": apiKey },
    });
  } catch {
    throw new ApiError("LeadFlow is temporarily unavailable. Please try again.");
  }
  if (!response.ok) {
    const body = await response.json().catch(() => null);
    throw new ApiError(
      body?.error?.message ?? "Unable to complete the request.",
      body?.error?.fields ?? {},
    );
  }
  return response.json() as Promise<T>;
}

/** Expected errors remain readable; private infrastructure errors are redacted. */
export async function resultOf<T>(
  operation: () => Promise<T>,
): Promise<ActionResult<T>> {
  try {
    return { ok: true, data: await operation() };
  } catch (error) {
    return error instanceof ApiError
      ? { ok: false, message: error.message, fields: error.fields }
      : { ok: false, message: "Unable to complete the request. Please try again.", fields: {} };
  }
}
