import z from "zod";

export const CATEGORIES = ["input", "layout"] as const;

const followUp = z.object({
  parentId: z.string(),
  valueToMatch: z.any(),
});

export const baseFieldSchema = z.object({
  id: z.string(),
  isSaved: z.boolean(),
  category: z.enum(CATEGORIES),
  followUps: followUp.optional(),
});

export type Category = (typeof CATEGORIES)[number];
