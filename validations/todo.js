import { z } from "zod";

export const createTodSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(100, "Title must not exceed 100 characters")
    .trim(),
  description: z.string
    .max(500, "Description must not exceed 500 characters")
    .optional(),
  priority: z.enum(["low", "medium", "high"]).default("medium"),
});
