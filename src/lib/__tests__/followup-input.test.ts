import { describe, expect, it } from "vitest";
import { followUpToUtc } from "../followup-input";
import { relativeTime } from "../dates";

describe("follow-up calendar input", () => {
  it("interprets input in the configured zone rather than browser timezone", () => {
    expect(followUpToUtc("2026-10-13T16:00", "Asia/Kolkata"))
      .toBe("2026-10-13T10:30:00Z");
  });
  it.each(["2026-03-08T02:30", "2026-11-01T01:30"])(
    "rejects nonexistent or ambiguous New York time %s", (value) => {
      expect(() => followUpToUtc(value, "America/New_York")).toThrow();
    },
  );
  it("rejects malformed calendar input", () => {
    expect(() => followUpToUtc("bad-date", "Asia/Kolkata")).toThrow();
  });
});

describe("relative discussion timestamps", () => {
  const now = "2026-10-13T10:30:00Z";
  it("distinguishes missing notes from recently saved notes", () => {
    expect(relativeTime(null, now)).toBe("No discussions yet");
    expect(relativeTime(now, now)).toBe("Just now");
  });
  it("uses the supplied server clock", () => {
    expect(relativeTime("2026-10-13T08:30:00Z", now)).toBe("2 hours ago");
  });
});
