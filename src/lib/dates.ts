/** Render timestamps consistently on the server and hydrated client. */
export function formatDate(value: string, timezone: string): string {
  return new Intl.DateTimeFormat("en-IN", {
    timeZone: timezone, day: "numeric", month: "short",
    year: "numeric", hour: "numeric", minute: "2-digit",
  }).format(new Date(value));
}

export function relativeTime(value: string | null, now: string): string {
  if (!value) return "No discussions yet";
  const seconds = Math.max(0, (Date.parse(now) - Date.parse(value)) / 1000);
  if (seconds < 60) return "Just now";
  for (const [unit, scale] of [
    ["year", 31536000], ["month", 2592000], ["day", 86400],
    ["hour", 3600], ["minute", 60],
  ] as const) {
    if (seconds >= scale) {
      return new Intl.RelativeTimeFormat("en", { numeric: "auto" })
        .format(-Math.floor(seconds / scale), unit);
    }
  }
  return "Just now";
}
