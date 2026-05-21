import { z } from "zod";
import { type FormSchemaField } from "./form-schemas";
import { baseFieldSchema } from "./base-schema";

const baseInputFieldSchema = baseFieldSchema.extend({
  label: z.string().trim().min(1, { error: "Label is required" }),
  isRequired: z.boolean(),
  description: z.string().trim(),
  category: z.literal("input"),
});

export const textFieldSchema = baseInputFieldSchema.extend({
  type: z.literal("text"),
  longAnswer: z.boolean(),
  placeholder: z.string(),
});

const option = z.object({
  value: z.string().trim().min(1, { error: "Required" }),
});

export const optionsFieldSchema = baseInputFieldSchema.extend({
  type: z.literal("options"),
  multipleAnswers: z.boolean(),
  options: z.array(option).min(1),
});

export const numberFieldSchema = baseInputFieldSchema.extend({
  type: z.literal("number"),
  min: z.union([z.literal(""), z.coerce.number().optional()]),
  max: z.union([z.literal(""), z.coerce.number().optional()]),
});

// **** TYPE GUARD HELPERS ****
export type InputField = Extract<FormSchemaField, { category: "input" }>;

export function isInputField(field: FormSchemaField): field is InputField {
  return field.category === "input";
}
