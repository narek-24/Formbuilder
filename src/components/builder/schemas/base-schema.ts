import z from "zod";

const followUp = z.object({
  parentId: z.string(),
  valueToMatch: z.any(),
});

export const CATEGORIES = ["input", "layout"] as const;

export const baseFieldSchema = z.object({
  id: z.string(),
  isSaved: z.boolean(),
  category: z.enum(CATEGORIES),
  followUps: followUp.optional(),
});

export type Category = (typeof CATEGORIES)[number];
