import { z } from "zod";
import { baseFieldSchema } from "./base-schema";

export const SPACING_LEVELS = ["1", "2", "3"] as const;

export const headingFieldSchema = baseFieldSchema.extend({
  type: z.literal("heading"),
  text: z.string().min(1, { error: "Text is required" }),
  space: z.enum(SPACING_LEVELS),
  category: z.literal("layout"),
});

export const dividerFieldSchema = baseFieldSchema.extend({
  type: z.literal("divider"),
  space: z.enum(SPACING_LEVELS),
  category: z.literal("layout"),
});
