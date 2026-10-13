import type { LeadStatus } from "./types";

export const statuses: { value: LeadStatus; label: string }[] = [
  { value: "new", label: "New" },
  { value: "contacted", label: "Contacted" },
  { value: "qualified", label: "Qualified" },
  { value: "proposal_sent", label: "Proposal Sent" },
  { value: "won", label: "Won" },
  { value: "lost", label: "Lost" },
];

export const statusLabels = Object.fromEntries(
  statuses.map(({ value, label }) => [value, label]),
) as Record<LeadStatus, string>;
