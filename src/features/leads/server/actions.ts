"use server";

import { revalidatePath } from "next/cache";
import { apiRequest, resultOf } from "@/lib/server/api";
import { serverConfig } from "@/lib/server/config";
import { followUpToUtc } from "@/lib/followup-input";
import { discussionSchema, idSchema, leadSchema, statusSchema } from "../schemas";
import type { ActionResult, Discussion, DiscussionSaved, Lead, Timeline } from "../types";

function invalid<T>(fields: Record<string, string>): ActionResult<T> {
  return { ok: false, message: "Check the highlighted fields.", fields };
}

/** Mutations are validated here and independently in FastAPI. */
export async function createLead(input: unknown): Promise<ActionResult<Lead>> {
  const parsed = leadSchema.safeParse(input);
  if (!parsed.success) return invalid(Object.fromEntries(
    parsed.error.issues.map(issue => [issue.path.join("."), issue.message]),
  ));
  return resultOf(async () => {
    const lead = await apiRequest<Lead>("/leads", {
      method: "POST", body: JSON.stringify(parsed.data),
    });
    revalidatePath("/");
    return lead;
  });
}

export async function changeStatus(
  leadId: unknown, status: unknown,
): Promise<ActionResult<Lead>> {
  const id = idSchema.safeParse(leadId);
  const value = statusSchema.safeParse(status);
  if (!id.success || !value.success) return invalid({ status: "Choose a valid lead and status." });
  return resultOf(async () => {
    const lead = await apiRequest<Lead>(`/leads/${id.data}`, {
      method: "PATCH", body: JSON.stringify({ status: value.data }),
    });
    revalidatePath("/");
    return lead;
  });
}

export async function loadTimeline(leadId: unknown): Promise<ActionResult<Timeline>> {
  const id = idSchema.safeParse(leadId);
  if (!id.success) return invalid({ lead: "Choose a valid lead." });
  return resultOf(async () => {
    const [lead, discussions] = await Promise.all([
      apiRequest<Lead>(`/leads/${id.data}`),
      apiRequest<Discussion[]>(`/leads/${id.data}/discussions`),
    ]);
    return { lead, discussions };
  });
}

export async function saveDiscussion(
  input: unknown,
): Promise<ActionResult<DiscussionSaved>> {
  const parsed = discussionSchema.safeParse(input);
  if (!parsed.success) return invalid(Object.fromEntries(
    parsed.error.issues.map(issue => [issue.path.join("."), issue.message]),
  ));
  const { leadId, note, followUpLocal } = parsed.data;
  let followUp: string | undefined;
  if (followUpLocal) {
    try {
      followUp = followUpToUtc(followUpLocal, serverConfig().timezone);
    } catch {
      return invalid({ followUpLocal: "Choose an unambiguous date and time in the displayed timezone." });
    }
  }
  return resultOf(async () => {
    const saved = await apiRequest<DiscussionSaved>(`/leads/${leadId}/discussions`, {
      method: "POST", body: JSON.stringify({ note, follow_up_at: followUp }),
    });
    revalidatePath("/");
    return saved;
  });
}
