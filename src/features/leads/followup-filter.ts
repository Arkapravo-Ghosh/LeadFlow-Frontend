import type { Lead } from "./types";

export type FollowupFilter = "all" | "today" | "overdue" | "unscheduled";
export const followupFilters: { value: FollowupFilter; label: string }[] = [
  { value: "all", label: "All schedules" },
  { value: "today", label: "Today" },
  { value: "overdue", label: "Overdue" },
  { value: "unscheduled", label: "Unscheduled" },
];

/** Follow-up filters compose with name/status filters before list grouping. */
export function matchesFollowup(lead: Lead, filter: FollowupFilter): boolean {
  switch (filter) {
    case "today": return lead.is_today;
    case "overdue": return lead.is_overdue;
    case "unscheduled": return lead.follow_up_at === null;
    default: return true;
  }
}
