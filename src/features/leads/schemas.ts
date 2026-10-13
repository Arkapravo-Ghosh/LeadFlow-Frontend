import { z } from "zod";

export const leadSchema = z.object({
  name: z.string().trim().min(1, "Enter a name.").max(120),
  company: z.string().trim().max(120),
  phone: z.string().trim().max(40),
}).strict();

export const idSchema = z.uuid();
export const statusSchema = z.enum([
  "new", "contacted", "qualified", "proposal_sent", "won", "lost",
]);
export const discussionSchema = z.object({
  leadId: idSchema,
  note: z.string().trim().min(1, "Write a discussion note.").max(5000),
  followUpLocal: z.string().max(16).optional(),
}).strict();
