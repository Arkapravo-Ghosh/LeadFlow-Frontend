import "server-only";

/** Private service configuration is never exported to browser bundles. */
export function serverConfig() {
  const apiUrl = process.env.BACKEND_API_URL;
  const apiKey = process.env.BACKEND_API_KEY;
  const timezone = process.env.APP_TIMEZONE ?? "Asia/Kolkata";
  if (!apiUrl || !apiKey || apiKey.length < 16) {
    throw new Error("LeadFlow server configuration is incomplete.");
  }
  new Intl.DateTimeFormat("en-IN", { timeZone: timezone });
  return { apiUrl, apiKey, timezone };
}
