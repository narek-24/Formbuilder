import type {
  FormSchema,
  FormSchemaField,
} from "../builder/schemas/form-schemas";
import z from "zod";
import type { ZodTypeAny } from "zod/v3";

const REQUIRED_MESSAGE = "This field is required";

function applyStringRules(
  schema: z.ZodString | z.ZodEmail,
  isRequired: boolean
): any {
  schema = schema.max(600, { message: "Must be at most 600 characters" });
  return isRequired
    ? schema.min(1, { message: REQUIRED_MESSAGE })
    : schema.optional().or(z.literal(""));
}

function createFieldSchema(field: FormSchemaField): ZodTypeAny {
  if (field.category !== "input") throw Error("");

  switch (field.type) {
    case "text": {
      return applyStringRules(z.string().trim(), field.isRequired);
    }

    default:
      throw new Error("Unsupported field type");
  }
}

function getDefaultValue(field: FormSchemaField) {
  switch (field.type) {
    default:
      return "";
  }
}

export function createValidationSchema(form: FormSchema) {
  const shape: Record<string, ZodTypeAny> = {};
  const defaultValues: Record<string, any> = {};

  form
    .filter((f) => f.category === "input")
    .forEach((field) => {
      defaultValues[field.id] = getDefaultValue(field);
      shape[field.id] = createFieldSchema(field);
    });

  return { schema: z.object(shape), defaultValues };
}
