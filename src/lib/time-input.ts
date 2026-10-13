export type TimePeriod = "AM" | "PM";
export type TimeParts = { hour: string; minute: string; period: TimePeriod };

/** Preserve partial selections so changing one segment does not discard another. */
export function timeParts(value: string): TimeParts {
  const [hour = "", minute = ""] = value.split(":");
  return {
    hour: hour ? String(Number(hour) % 12 || 12).padStart(2, "0") : "",
    minute, period: hour && Number(hour) >= 12 ? "PM" : "AM",
  };
}

/** Convert display segments to wall time; incomplete values remain invalid until completed. */
export function timeValue({ hour, minute, period }: TimeParts): string {
  if (!hour && !minute) return "";
  const hour24 = hour ? String(Number(hour) % 12 + (period === "PM" ? 12 : 0)).padStart(2, "0") : "";
  return `${hour24}:${minute}`;
}
