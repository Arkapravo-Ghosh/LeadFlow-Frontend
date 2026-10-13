import "server-only";

/** Login/logout POSTs must originate from the configured frontend domain. */
export function trustedAuthOrigin(request: Request): boolean {
  const origin = request.headers.get("origin");
  const configured = process.env.APP_URL;
  if (!origin || !configured) return false;
  try {
    return origin === new URL(configured).origin;
  } catch {
    return false;
  }
}
