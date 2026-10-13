import { TZDate } from "react-day-picker";

/** Calendar dates stay in the app's zone, even when the browser is elsewhere. */
export function calendarDate(value: string, timezone: string): Date | undefined {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return undefined;
  const [year, month, day] = value.split("-").map(Number);
  return new TZDate(year, month - 1, day, 12, 0, 0, timezone);
}

/** Read calendar fields rather than converting the selected date to a UTC day. */
export function calendarDateValue(date: Date): string {
  const pad = (value: number) => String(value).padStart(2, "0");
  return `${String(date.getFullYear()).padStart(4, "0")}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}
