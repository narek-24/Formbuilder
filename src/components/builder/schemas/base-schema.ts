import z from "zod";

const followUp = z.object({
  parentId: z.string(),
  valueToMatch: z.any(),
});

const CATEGORIES_VALUES = ["input", "layout"] as const;

export const CATEGORIES: Record<Category, string> = {
  input: "Input Fields",
  layout: "Layout Fields",
} as const;

export const baseFieldSchema = z.object({
  id: z.string(),
  isSaved: z.boolean(),
  category: z.enum(CATEGORIES_VALUES),
  followUps: followUp.optional(),
});

export type FollowUpProps = z.infer<typeof followUp>;
export type Category = (typeof CATEGORIES_VALUES)[number];
