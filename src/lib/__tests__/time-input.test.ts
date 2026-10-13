import { describe, expect, it } from "vitest";
import { timeParts, timeValue, type TimePeriod } from "../time-input";
import { followUpToUtc } from "../followup-input";

describe("12-hour follow-up time selection", () => {
  it.each([
    ["12", "00", "AM", "00:00"], ["12", "00", "PM", "12:00"],
    ["01", "34", "AM", "01:34"], ["01", "34", "PM", "13:34"],
    ["11", "59", "PM", "23:59"],
  ])("converts %s:%s %s without shifting the date", (hour, minute, period, expected) => {
    const parts = { hour, minute, period: period as TimePeriod };
    expect(timeValue(parts)).toBe(expected); expect(timeParts(expected)).toEqual(parts);
  });
  it("retains the minute while the hour is still unselected", () => {
    expect(timeParts(timeValue({ hour: "", minute: "34", period: "AM" }))).toEqual({ hour: "", minute: "34", period: "AM" });
  });
  it("saves a PM choice in the configured timezone", () => {
    const time = timeValue({ hour: "01", minute: "34", period: "PM" });
    expect(followUpToUtc(`2026-10-24T${time}`, "Asia/Kolkata")).toBe("2026-10-24T08:04:00Z");
  });
});
