import { Temporal } from "@js-temporal/polyfill";

/** Interpret datetime-local in the displayed zone, rejecting ambiguous DST times. */
export function followUpToUtc(local: string, timezone: string): string {
  const parsed = Temporal.PlainDateTime.from(local);
  return parsed.toZonedDateTime(timezone, { disambiguation: "reject" })
    .toInstant().toString();
}
