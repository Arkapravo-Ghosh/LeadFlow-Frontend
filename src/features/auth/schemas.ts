import { z } from "zod";

export type AuthMode = "login" | "signup";

/** Shared boundary rules; passwords preserve whitespace exactly as entered. */
export const loginSchema = z.object({
  username: z.string().trim().min(3, "Use at least 3 characters for your username.")
    .max(64).regex(/^[a-zA-Z0-9][a-zA-Z0-9_.-]*$/, "Use letters, numbers, dots, underscores or hyphens; start with a letter or number."),
  password: z.string().min(1, "Enter your password.").max(128),
}).strict();

export const signupSchema = loginSchema.extend({
  password: z.string().min(12, "Use at least 12 characters for your password.").max(128),
  confirmation: z.string().min(1, "Confirm your password."),
}).refine((data) => data.password === data.confirmation, {
  message: "Passwords do not match.", path: ["confirmation"],
});
