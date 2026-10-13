import { describe, expect, it } from "vitest";
import { calendarDate, calendarDateValue } from "../calendar-input";
import { followUpToUtc } from "../followup-input";
import { discussionSchema } from "../../features/leads/schemas";

describe("calendar selection across timezones", () => {
  it.each(["Asia/Kolkata", "America/New_York", "Pacific/Kiritimati"])(
    "preserves the selected calendar day in %s", timezone => {
      expect(calendarDateValue(calendarDate("2026-10-24", timezone)!)).toBe("2026-10-24");
    },
  );
  it("saves a Kolkata selection at the intended UTC instant", () => {
    const date = calendarDateValue(calendarDate("2026-10-24", "Asia/Kolkata")!);
    expect(followUpToUtc(`${date}T13:03`, "Asia/Kolkata")).toBe("2026-10-24T07:33:00Z");
  });
  it.each(["", "2026-10-24T", "T13:03"])("rejects incomplete selection %s", followUpLocal => {
    expect(discussionSchema.safeParse({ leadId: "00000000-0000-4000-8000-000000000000", note: "A note", followUpLocal }).success).toBe(false);
  });
});
