import type { components } from "@/lib/api-types";

export type Lead = components["schemas"]["LeadSummary"];
export type LeadListData = components["schemas"]["LeadList"];
export type LeadStatus = components["schemas"]["LeadStatus"];
export type Discussion = components["schemas"]["DiscussionRead"];
export type DiscussionSaved = components["schemas"]["DiscussionSaved"];
export type Timeline = { lead: Lead; discussions: Discussion[] };
export type FormErrors = Record<string, string>;
export type ActionResult<T> =
  | { ok: true; data: T }
  | { ok: false; message: string; fields: FormErrors };
